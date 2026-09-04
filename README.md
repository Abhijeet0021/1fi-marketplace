# 1Fi Marketplace — Full-Stack Mutual Fund Backed Affordability Web App

A clean, production-ready full-stack web application built for the **1Fi SDE1 Assignment**. This project implements the **1Fi Marketplace** inside the 1Fi **Shop** page alongside the **Top Brands** and **Nearby Stores** sections, fully consistent with the 1Fi fintech design language.

It allows users to browse smartphones, select colors and storage variants, explore dynamic EMI plans backed by their mutual fund portfolio, and proceed with their chosen plan through an instant digital lien flow.

---

## 🛠️ Clean Tech Stack

| Layer | Technology |
|---|---|
| **Frontend (JavaScript)** | **React 18** (Pure JavaScript / JSX), **Tailwind CSS**, **Lucide Icons**, **Vite**, **React Router v6** |
| **Backend** | **Node.js**, **Express 4.x** REST API server (`cors`, `dotenv`) |
| **Database** | **SQLite** (`server/database.sqlite` via Node built-in SQLite engine — zero external daemons, instant setup) |
| **Theme & UI** | 1Fi Fintech Design System (Signature Indigo `#5E2BE9`, Mint Green `#10B981`) |

---

## 📸 Reference Design Fidelity

The product detail page for **iPhone 17 Pro** replicates the exact layout, typography, finishes, and EMI figures specified in the assignment reference:

- **Product Image**: Exact iPhone 17 Pro unibody Cosmic Orange visual from the assignment reference (`/images/iphone-17-pro-cosmic-orange.jpg`).
- **Price**: ₹1,27,400 (MRP ₹1,34,900 — Save ₹7,500)
- **Available Finishes**: 3 finishes (**Cosmic Orange**, **Silver**, **Deep Blue**) with interactive color swatches.
- **Storage Options**: 256GB, 512GB, 1TB.
- **EMI Plans Backed by Mutual Funds**:
  - `₹44,967 x 3 months` • **0% interest** • Additional cashback of ₹7,500
  - `₹22,483 x 6 months` • **0% interest** • Additional cashback of ₹7,500
  - `₹11,242 x 12 months` • **0% interest** • Additional cashback of ₹7,500
  - `₹5,621 x 24 months` • **0% interest** • Additional cashback of ₹7,500
  - `₹4,297 x 36 months` • **10.5% interest** • Additional cashback of ₹7,500
  - `₹3,385 x 48 months` • **10.5% interest** • Additional cashback of ₹7,500
  - `₹2,842 x 60 months` • **10.5% interest** • Additional cashback of ₹7,500
- **Action**: "Proceed with Selected Plan" interactive application modal with instant mutual fund lien approval.

---

## 🚀 Key Features

1. **Shop Page with 3 Sections**:
   - **Top Brands**: Blank/placeholder state as per assignment specifications.
   - **Nearby Stores**: Blank/placeholder state as per assignment specifications.
   - **1Fi Marketplace**: Fully implemented interactive catalog with search, category filtering, product cards, pricing, and EMI badges.
2. **Dynamic Product Pages (`/products/:slug`)**:
   - Unique URLs for each product (e.g., `/products/iphone-17-pro`, `/products/samsung-s24-ultra`, `/products/google-pixel-9-pro`).
   - Dynamic variant selector (switches color and storage in real time).
   - Selectable EMI plans with visual active states.
   - Interactive checkout modal with instant approval reference ID.
3. **Database-Driven Backend API**:
   - Zero hardcoded product or EMI data in the frontend.
   - Powered by SQLite (`server/database.sqlite`).
   - Express REST API endpoints on `http://localhost:5001`.

---

## 📂 Clean Project Structure

```text
onefi-marketplace/
├── client/                      # Frontend: React (JavaScript / JSX) + Tailwind CSS + Vite
│   ├── public/images/           # Exact iPhone 17 Pro Cosmic Orange, Silver, and Deep Blue images
│   ├── src/
│   │   ├── components/          # Navbar.jsx, ShopTabs.jsx, ProductCard.jsx, EmiPlanCard.jsx, CheckoutModal.jsx
│   │   ├── pages/               # ShopPage.jsx, ProductDetailPage.jsx
│   │   ├── App.jsx              # React Router configuration
│   │   ├── main.jsx             # React DOM entrypoint
│   │   └── index.css            # Tailwind directives
│   ├── index.html
│   ├── vite.config.js           # API proxy to Express backend (port 5001)
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── server/                      # Backend: Node.js + Express + SQLite
│   ├── routes/
│   │   ├── products.js          # GET /api/products, GET /api/products/:slug
│   │   └── checkout.js          # POST /api/checkout
│   ├── database.sqlite          # SQLite database file
│   ├── db.js                    # Database connection & schema tables initialization
│   ├── seed.js                  # Database seed script with reference data
│   ├── server.js                # Express app entrypoint
│   └── package.json
│
├── package.json                 # Monorepo script ("npm run dev" to run both concurrently)
├── .gitignore                   # Ignores node_modules, dist, logs
└── README.md                    # Setup, API docs, schema, and video demo guide
```

---

## 🗄️ SQLite Database Schema

Defined in `server/db.js`:

### 1. `products` Table
```sql
CREATE TABLE products (
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
```

### 2. `product_variants` Table
```sql
CREATE TABLE product_variants (
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
```

### 3. `emi_plans` Table
```sql
CREATE TABLE emi_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tenure_months INTEGER NOT NULL,
  monthly_amount REAL NOT NULL,
  interest_rate REAL NOT NULL,
  is_zero_interest INTEGER DEFAULT 0,
  cashback_text TEXT,
  order_index INTEGER DEFAULT 0
);
```

### 4. `orders` Table
```sql
CREATE TABLE orders (
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
```

---

## 🔌 API Endpoints & Example Responses

### 1. `GET /api/products`
Retrieves all products with their variants and lowest available monthly EMI.

**Query Parameters (Optional)**:
- `category`: Filter by category or brand (`All`, `Apple`, `Samsung`, `Google`)
- `search`: Search query string

**Sample Request**:
```bash
curl http://localhost:5001/api/products
```

---

### 2. `GET /api/products/:slug`
Retrieves single product details, variants, and all configured EMI plans sorted by tenure.

**Sample Request**:
```bash
curl http://localhost:5001/api/products/iphone-17-pro
```

---

### 3. `POST /api/checkout`
Submits an EMI application and marks an instant digital lien against the user's mutual fund holdings.

**Sample Request**:
```bash
curl -X POST http://localhost:5001/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "iPhone 17 Pro",
    "variantName": "256GB - Cosmic Orange",
    "tenureMonths": 24,
    "monthlyAmount": 5621,
    "interestRate": 0,
    "cashbackAmount": 7500,
    "totalPrice": 127400,
    "applicantName": "Abhijeet Kumar"
  }'
```

---

## 💻 Setup and Run Instructions

### Prerequisites
- **Node.js**: v18+ (Tested on Node.js v20 / v22 / v26)
- **npm**

### Step-by-Step Run Command

```bash
# 1. Navigate to project root
cd /Users/abhijeetkumar/.gemini/antigravity/scratch/onefi-marketplace

# 2. Run both Backend (Port 5001) and Frontend (Port 5173) concurrently:
npm run dev
```

The app will open at:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5001](http://localhost:5001)

### Running Backend and Frontend Individually

**Backend**:
```bash
cd server
npm start
```

**Frontend**:
```bash
cd client
npm run dev
```

**Re-seeding the database**:
```bash
cd server
npm run seed
```

---

## 📹 2-5 Minute Video Showcase Guide

Use this recommended sequence when recording your demo video:

1. **Introduction (0:00 - 0:40)**:
   - Introduce the project: 1Fi Marketplace built with **React (JavaScript) + Tailwind CSS**, **Node.js (Express)**, and **SQLite**.
   - Explain the 1Fi value proposition: Zero-cost EMI backed by mutual fund investments without liquidating units.
2. **Shop Page & Tabs (0:40 - 1:20)**:
   - Show the **Shop** page header and 3 tabs:
     - Click **Top Brands** (demonstrate clean placeholder per requirements).
     - Click **Nearby Stores** (demonstrate clean placeholder per requirements).
     - Click **1Fi Marketplace** (show active catalog, hero banner, search bar, and category filters).
3. **Dynamic Product Page (`/products/iphone-17-pro`) (1:20 - 2:30)**:
   - Click on the **iPhone 17 Pro** card.
   - Highlight the exact layout matching the assignment document:
     - Exact unibody Cosmic Orange visual.
     - ₹1,27,400 price and ₹1,34,900 crossed-out MRP.
     - 3 finish swatches (Cosmic Orange, Silver, Deep Blue) and storage selectors.
     - EMI plan list from 3 to 60 months with ₹7,500 cashback.
   - Select different plans (e.g. 24 months 0% interest vs. 36 months 10.5%).
4. **Checkout Flow (2:30 - 3:15)**:
   - Click **Proceed with Selected Plan**.
   - Show the modal displaying mutual fund pledge requirements, enter details, and submit.
   - Show the instant approval screen and generated application number.
5. **Backend & Database Walkthrough (3:15 - 4:30)**:
   - Open terminal or Postman and trigger `GET /api/products` and `GET /api/products/iphone-17-pro`.
   - Show `server/database.sqlite`, `server/db.js`, and `server/routes/products.js`.
   - Conclude with architecture and submission readiness.
