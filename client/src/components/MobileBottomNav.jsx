import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, TrendingUp, User } from 'lucide-react';

export default function MobileBottomNav() {
  const location = useLocation();
  const isShopActive = location.pathname === '/' || location.pathname === '/shop' || location.pathname.startsWith('/products');

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-6 shadow-lg">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Home */}
        <Link
          to="/"
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        {/* Shop (Active) */}
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isShopActive ? 'text-[#5E2BE9]' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#5E2BE9] rounded-full" />
          </div>
          <span className="text-[10px] font-bold">Shop</span>
        </Link>

        {/* Portfolio */}
        <button
          onClick={() =>
            alert(
              '1Fi Portfolio: ₹3,50,000 mutual fund units active. Credit limit against holdings: ₹1,75,000 with 0% interest eligibility.'
            )
          }
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px] font-medium">Portfolio</span>
        </button>

        {/* Profile */}
        <button
          onClick={() =>
            alert('Verified 1Fi Investor Profile: Abhijeet Kumar • KYC Verified')
          }
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Account</span>
        </button>
      </div>
    </nav>
  );
}
