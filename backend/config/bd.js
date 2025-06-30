import pg from "pg";
import dotenv from "dotenv"; // πρόσθεσε αυτό

dotenv.config(); // φόρτωσε τις env vars

const { Pool } = pg;

let localPoolConfig = {
  user: process.env.DB_USER, // εδώ πρέπει να πάρεις τις τιμές από process.env
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : localPoolConfig;

const pool = new Pool(poolConfig);

export default pool;
