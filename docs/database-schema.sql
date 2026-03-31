-- ==========================================
-- Debilingo Database Schema
-- ==========================================
-- Run this in your Supabase SQL Editor to set up the database

-- 1. Користувачі (Users)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- 2. Словники (Dictionaries)
CREATE TABLE dictionaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  main_language TEXT NOT NULL,
  secondary_language TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- 3. Слова (Words)
CREATE TABLE words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dictionary_id UUID REFERENCES dictionaries(id) ON DELETE CASCADE,
  source_word TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- 4. Переклади (Translations)
CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word_id UUID REFERENCES words(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  order_index INT DEFAULT 0
);
-- 5. Дефініції (Definitions)
CREATE TABLE definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word_id UUID REFERENCES words(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  order_index INT DEFAULT 0
);
-- 6. Приклади (Examples)
CREATE TABLE examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word_id UUID REFERENCES words(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  order_index INT DEFAULT 0
);
-- ==========================================
-- Row Level Security (RLS)
-- ==========================================
-- Enable RLS to ensure users can only access their own data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE dictionaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE words ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE examples ENABLE ROW LEVEL SECURITY;
-- Add RLS policies here (if needed for your implementation)