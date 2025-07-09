import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString:
    "postgresql://postgres:ceBUkYcnDpcAzITXVQLHdhujxtKEbiKe@yamabiko.proxy.rlwy.net:12584/railway", // Βάλε Railway PostgreSQL URL
});

const createTables = async () => {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        user_name TEXT NOT NULL UNIQUE,
        user_email TEXT NOT NULL UNIQUE,
        user_password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS items (
        item_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        image_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS item_translations (
        id SERIAL PRIMARY KEY,
        item_id INTEGER REFERENCES items(item_id) ON DELETE CASCADE,
        language_code VARCHAR(2) NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        UNIQUE (item_id, language_code)
      );
    `);
    console.log("✅ Tables created");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  } finally {
    client.release();
  }
};

createTables();
