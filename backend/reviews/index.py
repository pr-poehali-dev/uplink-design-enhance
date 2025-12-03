import json
import os
from datetime import datetime
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для работы с отзывами клиентов
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name
    Returns: HTTP response dict with reviews data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    db_url = os.environ.get('DATABASE_URL')
    if not db_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database connection not configured'}),
            'isBase64Encoded': False
        }
    
    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            cur.execute('SELECT id, name, company, text, rating, date FROM reviews ORDER BY date DESC')
            reviews = cur.fetchall()
            
            reviews_list = []
            for review in reviews:
                reviews_list.append({
                    'id': review['id'],
                    'name': review['name'],
                    'company': review['company'],
                    'text': review['text'],
                    'rating': review['rating'],
                    'date': review['date'].strftime('%d %B %Y') if review['date'] else ''
                })
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(reviews_list, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            name = body_data.get('name', '').strip()
            company = body_data.get('company', '').strip()
            text = body_data.get('text', '').strip()
            rating = body_data.get('rating', 5)
            
            if not name or not text:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Name and text are required'}),
                    'isBase64Encoded': False
                }
            
            if rating < 1 or rating > 5:
                rating = 5
            
            cur.execute(
                'INSERT INTO reviews (name, company, text, rating) VALUES (%s, %s, %s, %s) RETURNING id, date',
                (name, company if company else None, text, rating)
            )
            result = cur.fetchone()
            conn.commit()
            
            new_review = {
                'id': result['id'],
                'name': name,
                'company': company,
                'text': text,
                'rating': rating,
                'date': result['date'].strftime('%d %B %Y') if result['date'] else ''
            }
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(new_review, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        if 'conn' in locals():
            conn.close()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
