-- Создание таблицы для отзывов клиентов
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    text TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индекса для быстрой сортировки по дате
CREATE INDEX IF NOT EXISTS idx_reviews_date ON reviews(date DESC);