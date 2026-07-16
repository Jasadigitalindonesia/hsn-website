"use client";

import Image from 'next/image';
import { Award, FileText } from 'lucide-react';
import { Product } from '@/data/mockData';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onRequestQuote: (productName: string, productId: string) => void;
}

export default function ProductCard({ product, onViewDetails, onRequestQuote }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-3xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:border-accent/35 transition-all duration-500 flex flex-col h-full hover:-translate-y-2 glow-gold">
      
      {/* Product Image Wrapper */}
      <div className="relative w-full h-[220px] rounded-2xl bg-gray-50 overflow-hidden mb-5">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-primary-dark/90 backdrop-blur-md text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full border border-white/10">
          {product.category}
        </span>
      </div>

      {/* Brand & Name */}
      <div className="flex-grow flex flex-col">
        <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase text-accent tracking-widest mb-1.5">
          <Award size={12} />
          <span>{product.brand}</span>
        </div>
        <h4 className="font-display font-bold text-base text-primary leading-tight tracking-tight mb-2.5 group-hover:text-accent-dark transition-colors duration-300">
          {product.name}
        </h4>
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
          {product.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 pt-4 border-t border-gray-50">
        <button
          onClick={() => onRequestQuote(product.name, product.id)}
          className="w-full text-center bg-gradient-to-r from-accent to-accent-dark hover:from-accent-light hover:to-accent text-primary-dark font-display font-extrabold text-[11px] uppercase tracking-wider py-3 rounded-xl transition-all duration-300 shadow-md shadow-accent/10 cursor-pointer"
        >
          Request Quotation
        </button>
        <button
          onClick={() => onViewDetails(product)}
          className="w-full flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-primary-hover hover:text-white text-gray-600 font-display font-bold text-[11px] uppercase tracking-wider py-3 rounded-xl transition-all duration-300"
        >
          <FileText size={12} />
          <span>Lihat Detail</span>
        </button>
      </div>
    </div>
  );
}
