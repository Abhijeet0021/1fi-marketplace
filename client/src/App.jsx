import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';

import MobileBottomNav from './components/MobileBottomNav.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FD] text-slate-900 selection:bg-[#5E2BE9]/20 selection:text-[#5E2BE9] pb-16 sm:pb-0">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <MobileBottomNav />
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[#5E2BE9] text-white font-bold flex items-center justify-center text-xs">
              ↑Fi
            </span>
            <span className="font-bold text-slate-800">1Fi Technologies</span>
            <span className="text-slate-400">• Mutual Fund Affordability Platform</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hover:text-slate-700 cursor-pointer">Security & SEBI Compliance</span>
            <span className="hover:text-slate-700 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-slate-700 cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
