import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './db.js';
import productsRouter from './routes/products.js';
import checkoutRouter from './routes/checkout.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Initialize SQLite database and tables
initDB();

// Middleware
app.use(cors());
app.use(express.json());

// REST API Endpoints
app.use('/api/products', productsRouter);
app.use('/api/checkout', checkoutRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    database: 'SQLite',
    service: '1Fi Marketplace API',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 1Fi SQLite Server running on http://localhost:${PORT}`);
});
