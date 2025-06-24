-- ✅ 1. Ενεργοποίηση της επέκτασης UUID (μία φορά ανά βάση)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ✅ 2. Πίνακας χρηστών
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY INTEGER,
  user_name TEXT NOT NULL UNIQUE,
  user_email TEXT NOT NULL UNIQUE,
  user_password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ✅ 3. Πίνακας items (σύνδεση με user_id)
CREATE TABLE items (
  item_id SERIAL PRIMARY KEY  INTEGER,
  user_id REFERENCES users(user_id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ✅ 4. Πίνακας μεταφράσεων για κάθε item (multilingual υποστήριξη)
CREATE TABLE item_translations (
  id SERIAL PRIMARY KEY,
  item_id REFERENCES items(item_id) ON DELETE CASCADE,
  language_code VARCHAR(2) NOT NULL CHECK (language_code IN ('el', 'en', 'de')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  UNIQUE (item_id, language_code)
);
