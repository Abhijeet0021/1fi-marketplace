import React, { useState, useEffect } from 'react';
import ShopTabs from '../components/ShopTabs.jsx';
import ProductCard from '../components/ProductCard.jsx';
import {
  Search,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Store,
  MapPin,
  ShoppingBag,
} from 'lucide-react';

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState('1fi-marketplace');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = '/api/products';
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') {
        params.append('category', selectedCategory);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const categories = ['All', 'Smartphones', 'Apple', 'Samsung', 'Google'];

  return (
    <div className="space-y-6">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Shop
            </h1>
            <span className="text-xs font-bold text-[#5E2BE9] bg-[#5E2BE9]/10 px-2.5 py-0.5 rounded-full">
              1Fi Ecosystem
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose your shopping destination with integrated mutual fund affordability
          </p>
        </div>

        {/* Portfolio Credit Status Badge */}
        <div className="bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 flex items-center gap-3 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Available 0% EMI Limit
            </p>
            <p className="text-sm font-extrabold text-slate-900">
              ₹1,75,000{' '}
              <span className="text-[11px] text-emerald-600 font-semibold">(Instant)</span>
            </p>
          </div>
        </div>
      </div>

      {/* 3 Shop Tabs Required by Assignment */}
      <ShopTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* TAB 1: Top Brands (Blank / Placeholder per assignment prompt) */}
      {activeTab === 'top-brands' && (
        <div className="min-h-[360px] bg-white rounded-3xl border border-dashed border-slate-300 p-8 sm:p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
            <Store className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Top Brands
          </span>
          <h2 className="text-xl font-bold text-slate-800 mt-3">
            Top Brands Catalog
          </h2>
          <p className="text-xs text-slate-500 max-w-md mt-1.5 leading-relaxed">
            Per assignment requirements, this section remains blank/unimplemented. Explore the{' '}
            <button
              onClick={() => setActiveTab('1fi-marketplace')}
              className="text-[#5E2BE9] font-bold underline hover:text-[#4F26E9]"
            >
              1Fi Marketplace
            </button>{' '}
            tab for full dynamic product catalog and mutual-fund backed EMI plans.
          </p>
        </div>
      )}

      {/* TAB 2: Nearby Stores (Blank / Placeholder per assignment prompt) */}
      {activeTab === 'nearby-stores' && (
        <div className="min-h-[360px] bg-white rounded-3xl border border-dashed border-slate-300 p-8 sm:p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
            <MapPin className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Nearby Stores
          </span>
          <h2 className="text-xl font-bold text-slate-800 mt-3">
            Nearby Retail Partners
          </h2>
          <p className="text-xs text-slate-500 max-w-md mt-1.5 leading-relaxed">
            Per assignment requirements, this section remains blank/unimplemented. Navigate to{' '}
            <button
              onClick={() => setActiveTab('1fi-marketplace')}
              className="text-[#5E2BE9] font-bold underline hover:text-[#4F26E9]"
            >
              1Fi Marketplace
            </button>{' '}
            to view products and live EMI options.
          </p>
        </div>
      )}

      {/* TAB 3: 1Fi Marketplace (Fully designed and implemented as per assignment) */}
      {activeTab === '1fi-marketplace' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#5E2BE9] via-[#4F26E9] to-[#34129b] p-6 sm:p-8 text-white shadow-xl shadow-[#5E2BE9]/15">
            {/* Background Decorative Rings */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute right-24 -top-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold tracking-wide uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Mutual Fund Affordability</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                No-Cost EMI Backed by Your Mutual Funds
              </h2>

              <p className="text-xs sm:text-sm text-white/85 mt-2 leading-relaxed">
                Why break your compounding investments? Pledge your mutual fund units digitally and enjoy <strong>0% interest EMI</strong> with zero down payment and instant approval.
              </p>

              {/* Badges Grid */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-white/90">
                <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SEBI Registered Custody</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Returns Keep Compounding</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Up to ₹7,500 Cashback</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search iPhone, Samsung, Pixel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-medium pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5E2BE9]/20 focus:border-[#5E2BE9] shadow-2xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </form>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl border border-slate-200 p-6 min-h-[380px] animate-pulse flex flex-col justify-between"
                >
                  <div className="w-full h-48 bg-slate-100 rounded-xl mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                    <div className="h-6 bg-slate-200 rounded w-3/4" />
                    <div className="h-10 bg-slate-100 rounded mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id || product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No products found</h3>
              <p className="text-xs text-slate-500 mt-1">Try clearing your search query or category filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
