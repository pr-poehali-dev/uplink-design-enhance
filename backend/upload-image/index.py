import json
import os
import base64
import uuid
import boto3

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
}

ALLOWED_TYPES = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
}

MAX_SIZE = 5 * 1024 * 1024

def response(status, body):
    return {
        'statusCode': status,
        'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
        'body': json.dumps(body, ensure_ascii=False),
        'isBase64Encoded': False
    }

def handler(event, context):
    '''Загрузка изображений товаров в S3-хранилище'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    if method != 'POST':
        return response(405, {'error': 'Method not allowed'})

    admin_pw = os.environ.get('ADMIN_PASSWORD', '')
    body = event.get('body', '{}')
    try:
        data = json.loads(body) if body else {}
    except Exception:
        return response(400, {'error': 'Invalid JSON'})

    if not admin_pw or data.get('admin_password', '') != admin_pw:
        return response(403, {'error': 'Access denied'})

    image_data = data.get('image', '')
    content_type = data.get('content_type', 'image/jpeg')

    if not image_data:
        return response(400, {'error': 'No image provided'})

    if content_type not in ALLOWED_TYPES:
        return response(400, {'error': f'Unsupported image type: {content_type}'})

    try:
        image_bytes = base64.b64decode(image_data)
    except Exception:
        return response(400, {'error': 'Invalid base64 data'})

    if len(image_bytes) > MAX_SIZE:
        return response(400, {'error': 'Image too large (max 5MB)'})

    ext = ALLOWED_TYPES[content_type]
    filename = f"products/{uuid.uuid4().hex}{ext}"

    access_key = os.environ['AWS_ACCESS_KEY_ID']
    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=access_key,
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    s3.put_object(
        Bucket='files',
        Key=filename,
        Body=image_bytes,
        ContentType=content_type
    )

    cdn_url = f"https://cdn.poehali.dev/projects/{access_key}/bucket/{filename}"

    return response(200, {'url': cdn_url})
