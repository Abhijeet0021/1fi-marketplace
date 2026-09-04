import { db, initDB } from './db.js';

export const seedDatabase = () => {
  initDB();
  console.log('🌱 Seeding SQLite database for 1Fi Marketplace with remote hosted URLs...');

  const insertProduct = db.prepare(`
    INSERT INTO products (slug, name, brand, badge, description, category, base_price, base_mrp, cashback_amount, image_url, rating, review_count, available_finishes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertVariant = db.prepare(`
    INSERT INTO product_variants (product_id, name, storage, color_name, color_hex, price, mrp, image_url, in_stock, is_default)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertEmiPlan = db.prepare(`
    INSERT INTO emi_plans (product_id, tenure_months, monthly_amount, interest_rate, is_zero_interest, cashback_text, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // Clear existing data
  db.exec(`
    DELETE FROM emi_plans;
    DELETE FROM product_variants;
    DELETE FROM products;
    DELETE FROM orders;
  `);

  db.exec('BEGIN TRANSACTION;');

  try {
    // Exact iPhone 17 Pro Cosmic Orange unibody image from reference document (Snapmint CDN)
    const iphoneCosmicOrangeUrl = 'https://images.snapmint.com/product_assets/images/001/154/792/large/open-uri20251021-2855301-1lwknri?1761017541';
    const iphoneSilverUrl = 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80';
    const iphoneBlueUrl = 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80';

    // 1. iPhone 17 Pro
    const iphoneResult = insertProduct.run(
      'iphone-17-pro',
      'iPhone 17 Pro',
      'Apple',
      'NEW',
      'Heat-forged aluminium unibody, A19 Pro chip, 48MP Fusion triple-camera system with 8x optical zoom, breakthrough battery life, and durable Ceramic Shield front and back. Backed by 1Fi Mutual Fund pledge with 0% EMI.',
      'Smartphones',
      127400,
      134900,
      7500,
      iphoneCosmicOrangeUrl,
      4.9,
      1420,
      3
    );
    const iphoneId = iphoneResult.lastInsertRowid;

    // iPhone Variants (3 finishes matching assignment reference)
    insertVariant.run(iphoneId, '256GB - Cosmic Orange', '256GB', 'Cosmic Orange', '#E37A3F', 127400, 134900, iphoneCosmicOrangeUrl, 1, 1);
    insertVariant.run(iphoneId, '256GB - Silver', '256GB', 'Silver', '#E2E4E5', 127400, 134900, iphoneSilverUrl, 1, 0);
    insertVariant.run(iphoneId, '256GB - Deep Blue', '256GB', 'Deep Blue', '#2B3340', 127400, 134900, iphoneBlueUrl, 1, 0);
    insertVariant.run(iphoneId, '512GB - Cosmic Orange', '512GB', 'Cosmic Orange', '#E37A3F', 147400, 154900, iphoneCosmicOrangeUrl, 1, 0);
    insertVariant.run(iphoneId, '1TB - Cosmic Orange', '1TB', 'Cosmic Orange', '#E37A3F', 167400, 174900, iphoneCosmicOrangeUrl, 1, 0);

    // iPhone EMI Plans (Exact match with assignment document)
    insertEmiPlan.run(iphoneId, 3, 44967, 0.0, 1, 'Additional cashback of ₹7,500', 1);
    insertEmiPlan.run(iphoneId, 6, 22483, 0.0, 1, 'Additional cashback of ₹7,500', 2);
    insertEmiPlan.run(iphoneId, 12, 11242, 0.0, 1, 'Additional cashback of ₹7,500', 3);
    insertEmiPlan.run(iphoneId, 24, 5621, 0.0, 1, 'Additional cashback of ₹7,500', 4);
    insertEmiPlan.run(iphoneId, 36, 4297, 10.5, 0, 'Additional cashback of ₹7,500', 5);
    insertEmiPlan.run(iphoneId, 48, 3385, 10.5, 0, 'Additional cashback of ₹7,500', 6);
    insertEmiPlan.run(iphoneId, 60, 2842, 10.5, 0, 'Additional cashback of ₹7,500', 7);

    // 2. Samsung Galaxy S24 Ultra
    const samsungImageUrl = 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5g-sm-s928-stylus.jpg';
    const samsungResult = insertProduct.run(
      'samsung-s24-ultra',
      'Samsung Galaxy S24 Ultra',
      'Samsung',
      'TOP SELLER',
      'Galaxy AI with Circle to Search, Live Translate, and ProVisual Engine. Titanium chassis with Corning Gorilla Armor and integrated S Pen stylus.',
      'Smartphones',
      119999,
      134999,
      6000,
      samsungImageUrl,
      4.8,
      980,
      3
    );
    const samsungId = samsungResult.lastInsertRowid;

    insertVariant.run(samsungId, '256GB - Titanium Gray', '256GB', 'Titanium Gray', '#6F7074', 119999, 134999, samsungImageUrl, 1, 1);
    insertVariant.run(samsungId, '256GB - Titanium Black', '256GB', 'Titanium Black', '#2B2B2D', 119999, 134999, samsungImageUrl, 1, 0);
    insertVariant.run(samsungId, '512GB - Titanium Violet', '512GB', 'Titanium Violet', '#4A4453', 131999, 146999, samsungImageUrl, 1, 0);

    insertEmiPlan.run(samsungId, 3, 39999, 0.0, 1, 'Additional cashback of ₹6,000', 1);
    insertEmiPlan.run(samsungId, 6, 19999, 0.0, 1, 'Additional cashback of ₹6,000', 2);
    insertEmiPlan.run(samsungId, 12, 9999, 0.0, 1, 'Additional cashback of ₹6,000', 3);
    insertEmiPlan.run(samsungId, 24, 5350, 0.0, 1, 'Additional cashback of ₹6,000', 4);
    insertEmiPlan.run(samsungId, 36, 4045, 10.5, 0, 'Additional cashback of ₹6,000', 5);
    insertEmiPlan.run(samsungId, 48, 3190, 10.5, 0, 'Additional cashback of ₹6,000', 6);
    insertEmiPlan.run(samsungId, 60, 2680, 10.5, 0, 'Additional cashback of ₹6,000', 7);

    // 3. Google Pixel 9 Pro
    const pixelImageUrl = 'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-9-pro-.jpg';
    const pixelResult = insertProduct.run(
      'google-pixel-9-pro',
      'Google Pixel 9 Pro',
      'Google',
      'AI PHONE',
      'Powered by Google Tensor G4 with 16GB of RAM, pro triple camera system with 30x Super Res Zoom, and 7 years of Pixel Feature Drops.',
      'Smartphones',
      109999,
      124999,
      5000,
      pixelImageUrl,
      4.7,
      740,
      4
    );
    const pixelId = pixelResult.lastInsertRowid;

    insertVariant.run(pixelId, '128GB - Obsidian', '128GB', 'Obsidian', '#27282A', 109999, 124999, pixelImageUrl, 1, 1);
    insertVariant.run(pixelId, '256GB - Porcelain', '256GB', 'Porcelain', '#EDECE8', 119999, 134999, pixelImageUrl, 1, 0);
    insertVariant.run(pixelId, '256GB - Hazel', '256GB', 'Hazel', '#8F9489', 119999, 134999, pixelImageUrl, 1, 0);
    insertVariant.run(pixelId, '256GB - Rose Quartz', '256GB', 'Rose Quartz', '#DFB7B4', 119999, 134999, pixelImageUrl, 1, 0);

    insertEmiPlan.run(pixelId, 3, 36666, 0.0, 1, 'Additional cashback of ₹5,000', 1);
    insertEmiPlan.run(pixelId, 6, 18333, 0.0, 1, 'Additional cashback of ₹5,000', 2);
    insertEmiPlan.run(pixelId, 12, 9166, 0.0, 1, 'Additional cashback of ₹5,000', 3);
    insertEmiPlan.run(pixelId, 24, 4890, 0.0, 1, 'Additional cashback of ₹5,000', 4);
    insertEmiPlan.run(pixelId, 36, 3710, 10.5, 0, 'Additional cashback of ₹5,000', 5);
    insertEmiPlan.run(pixelId, 48, 2920, 10.5, 0, 'Additional cashback of ₹5,000', 6);
    insertEmiPlan.run(pixelId, 60, 2455, 10.5, 0, 'Additional cashback of ₹5,000', 7);

    db.exec('COMMIT;');
    console.log('✅ SQLite database seeded with remote hosted URLs for all products!');
  } catch (err) {
    db.exec('ROLLBACK;');
    console.error('❌ Failed to seed SQLite:', err);
    throw err;
  }
};

if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase();
}
