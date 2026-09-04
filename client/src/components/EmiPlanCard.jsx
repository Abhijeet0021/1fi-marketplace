import React from 'react';
import { Check } from 'lucide-react';

export default function EmiPlanCard({ plan, isSelected, onSelect }) {
  const isZeroInterest = plan.interestRate === 0 || plan.isZeroInterest;

  return (
    <div
      onClick={() => onSelect(plan)}
      className={`cursor-pointer w-full transition-all duration-200 rounded-xl p-3.5 sm:p-4 border flex items-center justify-between relative select-none ${
        isSelected
          ? 'border-[#5E2BE9] bg-[#5E2BE9]/[0.03] shadow-sm shadow-[#5E2BE9]/10 ring-1 ring-[#5E2BE9]'
          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
      }`}
    >
      <div className="flex items-center gap-3.5">
        {/* Radio Indicator */}
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
            isSelected
              ? 'border-[#5E2BE9] bg-[#5E2BE9]'
              : 'border-slate-300 bg-white'
          }`}
        >
          {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
        </div>

        {/* Plan Details */}
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              ₹{plan.monthlyAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-sm font-semibold text-slate-700">
              x {plan.tenureMonths} months
            </span>
          </div>

          {plan.cashbackText && (
            <p className="text-xs font-semibold text-emerald-600 mt-0.5">
              {plan.cashbackText}
            </p>
          )}
        </div>
      </div>

      {/* Right Interest Rate Badge */}
      <div className="text-right flex flex-col items-end">
        <span
          className={`text-xs sm:text-sm font-bold px-2.5 py-1 rounded-md ${
            isZeroInterest
              ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/80'
              : 'text-slate-600 bg-slate-100 border border-slate-200'
          }`}
        >
          {isZeroInterest ? '0% interest' : `${plan.interestRate}% interest`}
        </span>
      </div>
    </div>
  );
}
