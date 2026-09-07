import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './db.js';
import productsRouter from './routes/products.js';
import checkoutRouter from './routes/checkout.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve frontend build in production
const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientDist, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`🚀 1Fi SQLite Server running on http://localhost:${PORT}`);
});
