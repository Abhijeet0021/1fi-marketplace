import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// POST /api/checkout
router.post('/', (req, res) => {
  try {
    const {
      productName,
      variantName,
      tenureMonths,
      monthlyAmount,
      interestRate,
      cashbackAmount,
      totalPrice,
      applicantName,
    } = req.body;

    if (!productName || !tenureMonths || !monthlyAmount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: productName, tenureMonths, or monthlyAmount',
      });
    }

    const applicationNumber = `1FI-${Date.now().toString().slice(-6)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const mutualFundCollateral = Math.round(Number(totalPrice) * 1.3);

    const insertOrder = db.prepare(`
      INSERT INTO orders (application_number, product_name, variant_name, tenure_months, monthly_amount, interest_rate, cashback_amount, total_price, mutual_fund_collateral, applicant_name, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertOrder.run(
      applicationNumber,
      productName,
      variantName || 'Standard Variant',
      Number(tenureMonths),
      Number(monthlyAmount),
      Number(interestRate || 0),
      Number(cashbackAmount || 0),
      Number(totalPrice),
      mutualFundCollateral,
      applicantName || 'Verified 1Fi Investor',
      'APPROVED'
    );

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: 'Mutual fund backed EMI application approved instantly!',
      data: {
        id: order.id,
        applicationNumber: order.application_number,
        productName: order.product_name,
        variantName: order.variant_name,
        tenureMonths: order.tenure_months,
        monthlyAmount: order.monthly_amount,
        interestRate: order.interest_rate,
        cashbackAmount: order.cashback_amount,
        totalPrice: order.total_price,
        mutualFundCollateral: order.mutual_fund_collateral,
        applicantName: order.applicant_name,
        status: order.status,
        createdAt: order.created_at,
      },
    });
  } catch (error) {
    console.error('Error in checkout:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
