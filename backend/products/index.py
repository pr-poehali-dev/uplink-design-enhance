import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
    'Access-Control-Max-Age': '86400'
}

def response(status, body):
    return {
        'statusCode': status,
        'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
        'body': json.dumps(body, ensure_ascii=False),
        'isBase64Encoded': False
    }

VALID_TYPES = ('camera', 'kit', 'recorder', 'switch', 'other')

def check_admin(event):
    admin_pw = os.environ.get('ADMIN_PASSWORD', '')
    if not admin_pw:
        print(f"DEBUG: ADMIN_PASSWORD env is empty")
        return False
    body = event.get('body', '{}')
    try:
        data = json.loads(body) if body else {}
    except Exception:
        data = {}
    password = data.get('admin_password', '')
    if not password:
        params = event.get('queryStringParameters', {}) or {}
        password = params.get('admin_password', '')
    print(f"DEBUG: received_pw='{password}', admin_pw='{admin_pw[:3]}...', match={password == admin_pw}")
    return password != '' and password == admin_pw

def handler(event, context):
    '''API каталога товаров — камеры и комплекты видеонаблюдения'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    db_url = os.environ.get('DATABASE_URL')
    if not db_url:
        return response(500, {'error': 'Database not configured'})

    conn = psycopg2.connect(db_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)

    if method == 'GET':
        cur.execute('SELECT id, type, name, description, price, old_price, image_url, specs, is_active, sort_order FROM products ORDER BY sort_order, id')
        products = cur.fetchall()
        result = []
        for p in products:
            result.append({
                'id': p['id'],
                'type': p['type'],
                'name': p['name'],
                'description': p['description'],
                'price': p['price'],
                'old_price': p['old_price'],
                'image_url': p['image_url'],
                'specs': p['specs'] if p['specs'] else {},
                'is_active': p['is_active'],
                'sort_order': p['sort_order']
            })
        cur.close()
        conn.close()
        return response(200, result)

    if not check_admin(event):
        cur.close()
        conn.close()
        return response(403, {'error': 'Access denied'})

    if method == 'POST':
        data = json.loads(event.get('body', '{}'))
        name = data.get('name', '').strip()
        product_type = data.get('type', 'camera')
        if not name:
            cur.close()
            conn.close()
            return response(400, {'error': 'Name is required'})
        if product_type not in VALID_TYPES:
            product_type = 'camera'
        cur.execute(
            'INSERT INTO products (type, name, description, price, old_price, image_url, specs, sort_order) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id',
            (
                product_type,
                name,
                data.get('description', ''),
                data.get('price', 0),
                data.get('old_price'),
                data.get('image_url', ''),
                json.dumps(data.get('specs', {})),
                data.get('sort_order', 0)
            )
        )
        new_id = cur.fetchone()['id']
        conn.commit()
        cur.close()
        conn.close()
        return response(201, {'success': True, 'id': new_id})

    if method == 'PUT':
        data = json.loads(event.get('body', '{}'))
        product_id = data.get('id')
        if not product_id:
            cur.close()
            conn.close()
            return response(400, {'error': 'Product ID is required'})
        fields = []
        values = []
        for field in ['type', 'name', 'description', 'price', 'old_price', 'image_url', 'is_active', 'sort_order']:
            if field in data:
                fields.append(f'{field} = %s')
                values.append(data[field])
        if 'specs' in data:
            fields.append('specs = %s')
            values.append(json.dumps(data['specs']))
        if not fields:
            cur.close()
            conn.close()
            return response(400, {'error': 'No fields to update'})
        fields.append('updated_at = CURRENT_TIMESTAMP')
        values.append(product_id)
        cur.execute(f'UPDATE products SET {", ".join(fields)} WHERE id = %s', values)
        conn.commit()
        cur.close()
        conn.close()
        return response(200, {'success': True})

    if method == 'DELETE':
        query_params = event.get('queryStringParameters', {}) or {}
        product_id = query_params.get('id')
        if not product_id:
            cur.close()
            conn.close()
            return response(400, {'error': 'Product ID is required'})
        cur.execute('DELETE FROM products WHERE id = %s', (product_id,))
        conn.commit()
        cur.close()
        conn.close()
        return response(200, {'success': True})

    cur.close()
    conn.close()
    return response(405, {'error': 'Method not allowed'})