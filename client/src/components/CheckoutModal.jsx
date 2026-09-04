import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, TrendingUp, Loader2, ArrowRight } from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  product,
  selectedVariant,
  selectedPlan,
}) {
  const [applicantName, setApplicantName] = useState('Abhijeet Kumar');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [panNumber, setPanNumber] = useState('ABCDE1234F');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);

  if (!isOpen || !product || !selectedPlan) return null;

  const currentPrice = selectedVariant?.price || product.basePrice;
  const requiredPledge = Math.round(currentPrice * 1.3);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          variantName: selectedVariant?.name || 'Default Variant',
          tenureMonths: selectedPlan.tenureMonths,
          monthlyAmount: selectedPlan.monthlyAmount,
          interestRate: selectedPlan.interestRate,
          cashbackAmount: product.cashbackAmount || 7500,
          totalPrice: currentPrice,
          applicantName,
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setSubmittedOrder(resData.data);
      } else {
        alert(resData.error || 'Failed to submit application');
      }
    } catch (err) {
      alert('Network error while processing application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5E2BE9] to-[#4318c4] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center font-black">
              ↑Fi
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">
                {submittedOrder ? 'Application Approved!' : 'Avail Mutual Fund Backed EMI'}
              </h3>
              <p className="text-xs text-white/80 font-medium">
                Instant digital pledge • 0% interest financing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {submittedOrder ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Zero-Cost EMI Sanctioned
            </span>

            <h4 className="text-xl font-black text-slate-900 mt-2">
              Congratulations, {submittedOrder.applicantName}!
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Your mutual fund backed EMI application for{' '}
              <strong className="text-slate-800">{submittedOrder.productName}</strong> has been approved.
            </p>

            {/* Sanction Receipt Box */}
            <div className="mt-5 bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/70">
                <span className="text-slate-500">Application Number</span>
                <span className="font-mono font-bold text-[#5E2BE9]">
                  {submittedOrder.applicationNumber}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/70">
                <span className="text-slate-500">Selected Product</span>
                <span className="font-bold text-slate-900">{submittedOrder.productName} ({submittedOrder.variantName})</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/70">
                <span className="text-slate-500">EMI Monthly Installment</span>
                <span className="font-extrabold text-slate-900">
                  ₹{submittedOrder.monthlyAmount.toLocaleString('en-IN')} / mo x {submittedOrder.tenureMonths} mos
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/70">
                <span className="text-slate-500">Interest Rate</span>
                <span className="font-bold text-emerald-600">
                  {submittedOrder.interestRate === 0 ? '0% Interest (Zero-Cost)' : `${submittedOrder.interestRate}%`}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Cashback Eligible</span>
                <span className="font-bold text-emerald-600">
                  ₹{submittedOrder.cashbackAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Collateral Assurance */}
            <div className="mt-4 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-left flex items-start gap-2.5">
              <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-emerald-900 leading-snug font-medium">
                Your mutual funds of <strong className="font-bold">₹{submittedOrder.mutualFundCollateral.toLocaleString('en-IN')}</strong> remain 100% invested in the market, continuing to compound wealth while you pay monthly EMIs.
              </p>
            </div>

            <button
              onClick={onClose}
              className="mt-5 w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-colors"
            >
              Done & Return to Store
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Selected Plan Summary Banner */}
            <div className="bg-[#5E2BE9]/5 border border-[#5E2BE9]/20 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-[#5E2BE9] tracking-wider">
                  Selected EMI Plan
                </p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-black text-slate-900">
                    ₹{selectedPlan.monthlyAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    x {selectedPlan.tenureMonths} months
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-emerald-600">
                  {selectedPlan.interestRate === 0 ? '0% Interest' : `${selectedPlan.interestRate}% Interest`} • ₹{product.cashbackAmount || 7500} Cashback
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400">Total Price</span>
                <p className="text-sm font-bold text-slate-800">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Why Mutual Fund Backed EMI */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-[#5E2BE9]" />
                <span>1Fi Smart Affordability Guarantee</span>
              </div>
              <ul className="text-[11px] text-slate-600 space-y-1 pl-6 list-disc">
                <li>Zero down payment required.</li>
                <li>₹{requiredPledge.toLocaleString('en-IN')} Mutual Fund lien marked digitally via OTP.</li>
                <li>Your portfolio continues to earn compounding market returns throughout the tenure.</li>
              </ul>
            </div>

            {/* Applicant Details */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Applicant Name
                </label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5E2BE9]/30 focus:border-[#5E2BE9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5E2BE9]/30 focus:border-[#5E2BE9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    PAN Card (for MF Lien)
                  </label>
                  <input
                    type="text"
                    required
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 uppercase focus:outline-none focus:ring-2 focus:ring-[#5E2BE9]/30 focus:border-[#5E2BE9]"
                  />
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#5E2BE9] to-[#4318c4] hover:opacity-95 text-white font-bold text-sm shadow-md shadow-[#5E2BE9]/25 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Marking Digital MF Lien...</span>
                </>
              ) : (
                <>
                  <span>Confirm & Avail 0% EMI</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
