import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database.sqlite');
export const db = new DatabaseSync(dbPath);

// Initialize Tables
export const initDB = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      badge TEXT,
      description TEXT NOT NULL,
      category TEXT DEFAULT 'Smartphones',
      base_price REAL NOT NULL,
      base_mrp REAL NOT NULL,
      cashback_amount REAL DEFAULT 7500,
      image_url TEXT NOT NULL,
      rating REAL DEFAULT 4.9,
      review_count INTEGER DEFAULT 1420,
      available_finishes INTEGER DEFAULT 3,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS product_variants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      storage TEXT NOT NULL,
      color_name TEXT NOT NULL,
      color_hex TEXT NOT NULL,
      price REAL NOT NULL,
      mrp REAL NOT NULL,
      image_url TEXT NOT NULL,
      in_stock INTEGER DEFAULT 1,
      is_default INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS emi_plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      tenure_months INTEGER NOT NULL,
      monthly_amount REAL NOT NULL,
      interest_rate REAL NOT NULL,
      is_zero_interest INTEGER DEFAULT 0,
      cashback_text TEXT,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_number TEXT UNIQUE NOT NULL,
      product_name TEXT NOT NULL,
      variant_name TEXT NOT NULL,
      tenure_months INTEGER NOT NULL,
      monthly_amount REAL NOT NULL,
      interest_rate REAL NOT NULL,
      cashback_amount REAL DEFAULT 0,
      total_price REAL NOT NULL,
      mutual_fund_collateral REAL NOT NULL,
      applicant_name TEXT DEFAULT 'Verified 1Fi Investor',
      status TEXT DEFAULT 'APPROVED',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Auto seed if database is empty
  const countRow = db.prepare('SELECT COUNT(*) as count FROM products').get();
  if (countRow.count === 0) {
    import('./seed.js').then(({ seedDatabase }) => {
      seedDatabase();
    });
  }
};
