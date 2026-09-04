import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// GET /api/products
router.get('/', (req, res) => {
  try {
    const { category, search } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (name LIKE ? OR brand LIKE ? OR description LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    query += ' ORDER BY base_price DESC';

    const products = db.prepare(query).all(...params);

    const getVariants = db.prepare(
      'SELECT id, name, storage, color_name as colorName, color_hex as colorHex, price, mrp, image_url as imageUrl, in_stock as inStock, is_default as isDefault FROM product_variants WHERE product_id = ? ORDER BY price ASC'
    );

    const getEmiPlans = db.prepare(
      'SELECT id, tenure_months as tenureMonths, monthly_amount as monthlyAmount, interest_rate as interestRate, is_zero_interest as isZeroInterest, cashback_text as cashbackText, order_index as orderIndex FROM emi_plans WHERE product_id = ? ORDER BY tenure_months ASC'
    );

    const formatted = products.map((p) => {
      const variants = getVariants.all(p.id);
      const emiPlans = getEmiPlans.all(p.id);

      const sortedPlans = [...emiPlans].sort((a, b) => a.monthlyAmount - b.monthlyAmount);
      const lowestMonthlyEmi = sortedPlans[0]?.monthlyAmount || 0;
      const maxTenureMonths = Math.max(...emiPlans.map((ep) => ep.tenureMonths), 0);
      const zeroInterestPlans = emiPlans.filter((ep) => ep.isZeroInterest === 1 || ep.interestRate === 0);

      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        brand: p.brand,
        badge: p.badge,
        description: p.description,
        category: p.category,
        basePrice: p.base_price,
        baseMrp: p.base_mrp,
        cashbackAmount: p.cashback_amount,
        imageUrl: p.image_url,
        rating: p.rating,
        reviewCount: p.review_count,
        availableFinishes: p.available_finishes,
        variants,
        emiPlans,
        lowestMonthlyEmi,
        maxTenureMonths,
        hasZeroInterest: zeroInterestPlans.length > 0,
        zeroInterestTenures: zeroInterestPlans.map((ep) => ep.tenureMonths),
      };
    });

    res.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/products/:slug
router.get('/:slug', (req, res) => {
  try {
    const { slug } = req.params;

    const product = db
      .prepare('SELECT * FROM products WHERE slug = ? OR id = ?')
      .get(slug, slug);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product not found for: ${slug}`,
      });
    }

    const variants = db
      .prepare(
        'SELECT id, name, storage, color_name as colorName, color_hex as colorHex, price, mrp, image_url as imageUrl, in_stock as inStock, is_default as isDefault FROM product_variants WHERE product_id = ? ORDER BY is_default DESC, price ASC'
      )
      .all(product.id);

    const emiPlans = db
      .prepare(
        'SELECT id, tenure_months as tenureMonths, monthly_amount as monthlyAmount, interest_rate as interestRate, is_zero_interest as isZeroInterest, cashback_text as cashbackText, order_index as orderIndex FROM emi_plans WHERE product_id = ? ORDER BY order_index ASC'
      )
      .all(product.id);

    const defaultVariant = variants.find((v) => v.isDefault === 1) || variants[0];
    const requiredPledge = Math.round(product.base_price * 1.3);

    res.json({
      success: true,
      data: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        badge: product.badge,
        description: product.description,
        category: product.category,
        basePrice: product.base_price,
        baseMrp: product.base_mrp,
        cashbackAmount: product.cashback_amount,
        imageUrl: product.image_url,
        rating: product.rating,
        reviewCount: product.review_count,
        availableFinishes: product.available_finishes,
        variants,
        emiPlans,
        defaultVariant,
        financialSummary: {
          requiredPledge,
          instantApprovalLimit: 250000,
          zeroInterestAvailable: emiPlans.some((ep) => ep.interestRate === 0 || ep.isZeroInterest === 1),
          cashbackTotal: product.cashback_amount,
        },
      },
    });
  } catch (error) {
    console.error(`Error fetching product ${req.params.slug}:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
