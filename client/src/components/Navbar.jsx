import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, TrendingUp, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5E2BE9] to-[#4318c4] flex items-center justify-center shadow-md shadow-[#5E2BE9]/20 group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-xl tracking-tighter flex items-center leading-none">
              <span className="text-lg font-extrabold mr-0.5">↑</span>Fi
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight group-hover:text-[#5E2BE9] transition-colors">
                1Fi
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#5E2BE9]/10 text-[#5E2BE9] px-2 py-0.5 rounded-full">
                Affordability
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium -mt-0.5">
              Zero-Cost EMI on Mutual Funds
            </span>
          </div>
        </Link>

        {/* Navigation center links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#5E2BE9] border-b-2 border-[#5E2BE9] pb-0.5"
          >
            <ShoppingBag className="w-4 h-4" />
            Shop
          </Link>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              alert(
                'Your connected Mutual Fund Portfolio: ₹3,50,000. Affordability Credit Limit: ₹1,75,000 with 0% interest eligibility!'
              );
            }}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <TrendingUp className="w-4 h-4" />
            My Portfolio
          </a>
        </nav>

        {/* Right side Portfolio Widget */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 bg-slate-50 border border-slate-200/90 rounded-full px-3.5 py-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wide">
                Pledgeable MF Balance
              </p>
              <p className="text-xs font-bold text-slate-900">
                ₹3,50,000{' '}
                <span className="text-[10px] text-emerald-600 font-semibold">(100% Active)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#5E2BE9]/10 text-[#5E2BE9] border border-[#5E2BE9]/20 px-2.5 py-1 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SEBI Backed</span>
          </div>
        </div>
      </div>
    </header>
  );
}
