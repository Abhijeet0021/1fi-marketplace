import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

export default function ProductCard({ product }) {
  const savings = Math.max(0, product.baseMrp - product.basePrice);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#5E2BE9]/40 shadow-xs hover:shadow-xl hover:shadow-[#5E2BE9]/8 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Media & Badges */}
      <div className="relative bg-gradient-to-b from-slate-50 to-slate-100/60 p-6 flex items-center justify-center min-h-[260px] overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#5E2BE9] text-white shadow-xs">
              {product.badge}
            </span>
          )}
          {product.hasZeroInterest && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
              0% Interest
            </span>
          )}
        </div>

        {/* Savings Badge */}
        {savings > 0 && (
          <div className="absolute top-3.5 right-3.5 z-10 text-[11px] font-bold text-slate-700 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs border border-slate-200">
            Save ₹{savings.toLocaleString('en-IN')}
          </div>
        )}

        {/* Product Image */}
        <div className="relative w-48 h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-out">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-full max-w-full object-contain drop-shadow-md"
            loading="lazy"
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Finishes preview */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold tracking-wide uppercase text-[11px] text-slate-400">
              {product.brand}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-500">
                {product.availableFinishes} finishes
              </span>
              {product.variants && (
                <div className="flex items-center -space-x-1 ml-1">
                  {product.variants.slice(0, 3).map((v) => (
                    <span
                      key={v._id || v.name}
                      className="w-3 h-3 rounded-full border border-white shadow-xs inline-block"
                      style={{ backgroundColor: v.colorHex }}
                      title={v.colorName}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Name */}
          <Link to={`/products/${product.slug}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#5E2BE9] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & EMI Highlight Box */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-slate-900">
              ₹{product.basePrice.toLocaleString('en-IN')}
            </span>
            {product.baseMrp > product.basePrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.baseMrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* EMI Callout */}
          <div className="mt-2.5 bg-[#5E2BE9]/5 border border-[#5E2BE9]/15 rounded-xl p-2.5 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold text-[#5E2BE9] tracking-wider">
                Mutual Fund Backed EMI
              </p>
              <p className="text-xs font-extrabold text-slate-900">
                From{' '}
                <span className="text-[#5E2BE9]">
                  ₹{Number(product.lowestMonthlyEmi || 2842).toLocaleString('en-IN')}
                </span>
                /month
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-2 py-0.5 rounded-full border border-emerald-200 inline-block">
                ₹{product.cashbackAmount?.toLocaleString('en-IN') || '7,500'} Cashback
              </span>
            </div>
          </div>

          {/* CTA Link */}
          <Link
            to={`/products/${product.slug}`}
            className="mt-3.5 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-[#5E2BE9] text-white text-xs font-bold transition-colors shadow-xs group-hover:shadow-[#5E2BE9]/20"
          >
            <span>Explore EMI Plans</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
