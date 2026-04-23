-- PostgreSQL mirror schema for analytics/BI workloads

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  role VARCHAR(40) NOT NULL DEFAULT 'member',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  stage VARCHAR(50) NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  release_date DATE
);

CREATE TABLE IF NOT EXISTS deals (
  id SERIAL PRIMARY KEY,
  partner VARCHAR(200) NOT NULL,
  deal_type VARCHAR(120) NOT NULL,
  amount NUMERIC(12,2),
  status VARCHAR(80) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS revenues (
  id SERIAL PRIMARY KEY,
  source VARCHAR(120) NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  period VARCHAR(20) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
