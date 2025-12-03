CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    text TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_date ON reviews(date DESC);