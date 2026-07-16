"use client";

import { Award } from 'lucide-react';
import { DEFAULT_BRANDS } from '@/data/mockData';

export default function BrandsSlider() {
  // Duplicate brands array to make infinite seamless loop
  const brands = [...DEFAULT_BRANDS, ...DEFAULT_BRANDS, ...DEFAULT_BRANDS];

  return (
    <div className="w-full bg-white py-12 border-y border-gray-100 overflow-hidden relative">
      {/* Edge gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div className="flex overflow-x-hidden">
        <div className="animate-scroll flex gap-8 items-center">
          {brands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex items-center gap-3 px-8 py-4 bg-gray-50/60 rounded-2xl border border-gray-100 hover:border-accent/40 shadow-sm transition-all duration-300 hover:scale-105 group min-w-[200px]"
            >
              <div className="w-8 h-8 rounded-lg bg-primary-dark/5 flex items-center justify-center text-primary-dark group-hover:text-accent transition-colors">
                <Award size={18} />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-sm text-primary-dark">
                  {brand.name}
                </span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  Official Partner
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
