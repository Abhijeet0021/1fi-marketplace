import React from 'react';
import { Store, ShoppingBag, MapPin } from 'lucide-react';

export default function ShopTabs({ activeTab, onTabChange }) {
  const tabs = [
    {
      id: 'top-brands',
      label: 'Top Brands',
      icon: Store,
      badge: 'Partner Hub',
    },
    {
      id: 'nearby-stores',
      label: 'Nearby Stores',
      icon: MapPin,
      badge: 'Local Stores',
    },
    {
      id: '1fi-marketplace',
      label: '1Fi Marketplace',
      icon: ShoppingBag,
      badge: '0% MF EMI',
    },
  ];

  return (
    <div className="w-full">
      <div className="bg-slate-100/90 p-1.5 rounded-2xl flex items-center gap-1.5 shadow-inner border border-slate-200/70">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-semibold text-sm transition-all duration-200 relative ${
                isActive
                  ? 'bg-white text-slate-900 shadow-md shadow-slate-200/80 scale-[1.01]'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-[#5E2BE9]' : 'text-slate-400'
                }`}
              />
              <span className="truncate">{tab.label}</span>

              {tab.id === '1fi-marketplace' && (
                <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#5E2BE9] text-white">
                  Live
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
