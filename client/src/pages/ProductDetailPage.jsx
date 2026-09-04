import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  ChevronRight,
  Check,
  Info,
} from 'lucide-react';
import EmiPlanCard from '../components/EmiPlanCard.jsx';
import CheckoutModal from '../components/CheckoutModal.jsx';

export default function ProductDetailPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();

        if (!data.success) {
          setError(data.error || 'Product not found');
          return;
        }

        const prod = data.data;
        setProduct(prod);

        const defaultVar =
          prod.variants?.find((v) => v.isDefault) || prod.variants?.[0];
        setSelectedVariant(defaultVar);

        if (prod.emiPlans && prod.emiPlans.length > 0) {
          const defaultPlan =
            prod.emiPlans.find((p) => p.tenureMonths === 24) ||
            prod.emiPlans.find((p) => p.isZeroInterest) ||
            prod.emiPlans[0];
          setSelectedPlan(defaultPlan);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch product data');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-[450px] bg-slate-200 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-8 bg-slate-200 rounded w-3/4" />
            <div className="h-6 bg-slate-200 rounded w-1/2" />
            <div className="h-16 bg-slate-200 rounded" />
            <div className="h-64 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-lg mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Info className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">{error || "The requested product couldn't be loaded."}</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to 1Fi Marketplace
        </Link>
      </div>
    );
  }

  const currentPrice = selectedVariant ? selectedVariant.price : product.basePrice;
  const currentMrp = selectedVariant ? selectedVariant.mrp : product.baseMrp;
  const savings = Math.max(0, currentMrp - currentPrice);

  const storages = Array.from(
    new Set((product.variants || []).map((v) => v.storage))
  );

  const uniqueColors = (product.variants || []).filter(
    (v, index, self) =>
      index === self.findIndex((t) => t.colorName === v.colorName)
  );

  const handleColorSelect = (colorName) => {
    const match =
      product.variants.find(
        (v) =>
          v.colorName === colorName &&
          v.storage === (selectedVariant?.storage || storages[0])
      ) ||
      product.variants.find((v) => v.colorName === colorName);

    if (match) setSelectedVariant(match);
  };

  const handleStorageSelect = (storage) => {
    const match =
      product.variants.find(
        (v) =>
          v.storage === storage &&
          v.colorName === (selectedVariant?.colorName || uniqueColors[0]?.colorName)
      ) ||
      product.variants.find((v) => v.storage === storage);

    if (match) setSelectedVariant(match);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-900 transition-colors">
          Shop
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/" className="hover:text-slate-900 transition-colors">
          1Fi Marketplace
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-800">{product.name}</span>
      </nav>

      {/* Main Reference Layout (2 Columns matching Reference Image) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ================= LEFT COLUMN: Product Details & Media ================= */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Product Badge */}
              {product.badge && (
                <div className="mb-2">
                  <span className="inline-block text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#5E2BE9] text-white">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Product Name & Current Storage */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm font-semibold text-slate-500 mt-0.5">
                {selectedVariant?.storage || '256GB'}
              </p>

              {/* Product Image */}
              <div className="relative my-6 py-6 bg-gradient-to-b from-slate-50/80 to-slate-100/50 rounded-2xl flex items-center justify-center min-h-[320px]">
                <img
                  src={selectedVariant?.imageUrl || product.imageUrl}
                  alt={`${product.name} - ${selectedVariant?.colorName}`}
                  className="max-h-72 max-w-full object-contain drop-shadow-xl transition-all duration-300 transform hover:scale-105"
                />
              </div>

              {/* Finishes Swatch Selector (Matches Reference Image "Available in 3 finishes") */}
              <div className="space-y-2 text-center sm:text-left">
                <p className="text-xs text-slate-500 font-medium">
                  Available in {product.availableFinishes} finishes:
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  {uniqueColors.map((c) => {
                    const isColorActive =
                      selectedVariant?.colorName === c.colorName;
                    return (
                      <button
                        key={c._id || c.name}
                        onClick={() => handleColorSelect(c.colorName)}
                        title={c.colorName}
                        className={`w-7 h-7 rounded-full transition-all flex items-center justify-center border-2 ${
                          isColorActive
                            ? 'border-[#5E2BE9] ring-2 ring-[#5E2BE9]/30 scale-110 shadow-sm'
                            : 'border-white hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.colorHex }}
                      >
                        {isColorActive && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow stroke-[3]" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {selectedVariant?.colorName && (
                  <p className="text-xs font-semibold text-slate-700">
                    Finish: <span className="font-bold">{selectedVariant.colorName}</span>
                  </p>
                )}
              </div>

              {/* Storage Capacity Selector Pills */}
              {storages.length > 1 && (
                <div className="mt-5 space-y-1.5">
                  <p className="text-xs text-slate-500 font-medium">Select Storage:</p>
                  <div className="flex flex-wrap gap-2">
                    {storages.map((storage) => {
                      const isStorageActive =
                        selectedVariant?.storage === storage;
                      return (
                        <button
                          key={storage}
                          onClick={() => handleStorageSelect(storage)}
                          className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all border ${
                            isStorageActive
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {storage}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Value Props & Mutual Fund Pledge Info */}
            <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50/60 p-4 rounded-2xl border">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-[#5E2BE9]" />
                <span>Mutual Fund Affordability</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Pledge mutual fund units through CAMS/KFintech without redemption. No breaking your SIPs or losing market gains!
              </p>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Pricing & EMI Plans (Matches Assignment Reference) ================= */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Pricing Header */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                {currentMrp > currentPrice && (
                  <span className="text-base text-slate-400 line-through">
                    ₹{currentMrp.toLocaleString('en-IN')}
                  </span>
                )}
                {savings > 0 && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Save ₹{savings.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Subtitle Header from Reference Image */}
              <div className="mt-2 mb-4 flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-slate-800">
                  EMI plans backed by mutual funds
                </h3>
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  Up to ₹{product.cashbackAmount?.toLocaleString('en-IN') || '7,500'} Cashback
                </span>
              </div>

              {/* List of Available EMI Plans (Selectable) */}
              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {product.emiPlans && product.emiPlans.length > 0 ? (
                  product.emiPlans.map((plan) => (
                    <EmiPlanCard
                      key={plan._id || plan.tenureMonths}
                      plan={plan}
                      isSelected={selectedPlan?.tenureMonths === plan.tenureMonths}
                      onSelect={(p) => setSelectedPlan(p)}
                    />
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No EMI plans configured for this product.
                  </div>
                )}
              </div>
            </div>

            {/* Action Section: Proceed with Selected Plan (Requirement 3) */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left w-full sm:w-auto">
                <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                  Selected Plan
                </p>
                {selectedPlan ? (
                  <p className="text-sm font-extrabold text-slate-900">
                    ₹{selectedPlan.monthlyAmount.toLocaleString('en-IN')}/mo{' '}
                    <span className="text-slate-500 font-medium">
                      ({selectedPlan.tenureMonths} Months • {selectedPlan.interestRate === 0 ? '0% Interest' : `${selectedPlan.interestRate}%`})
                    </span>
                  </p>
                ) : (
                  <p className="text-xs text-slate-400">Please select an EMI plan</p>
                )}
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                disabled={!selectedPlan}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5E2BE9] to-[#4318c4] hover:opacity-95 text-white text-sm font-bold shadow-lg shadow-[#5E2BE9]/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:pointer-events-none"
              >
                <span>Proceed with Selected Plan</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Checkout Modal */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        selectedVariant={selectedVariant}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}
