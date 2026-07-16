"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { X, Award, ChevronRight, ShoppingBag } from 'lucide-react';
import { Product } from '@/data/mockData';

interface ProductDetailsProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: (productName: string, productId: string) => void;
}

export default function ProductDetails({ product, isOpen, onClose, onRequestQuote }: ProductDetailsProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-dark/85 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-accent/20 overflow-hidden relative flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] transition-all duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-primary transition-colors bg-white/80 hover:bg-white rounded-full shadow"
        >
          <X size={20} />
        </button>

        {/* Product Image Section */}
        <div className="w-full md:w-1/2 relative bg-gray-50 h-[300px] md:h-auto min-h-[300px] flex items-center justify-center overflow-hidden">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
          />
          {/* Brand Overlay Label */}
          <div className="absolute bottom-4 left-4 bg-primary-dark/95 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 border border-accent/20">
            <Award size={14} className="text-accent" />
            <span>Brand: {product.brand}</span>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="mb-6">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h3 className="font-display font-black text-2xl md:text-3xl text-primary tracking-tight mt-3">
              {product.name}
            </h3>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-2">
              Deskripsi Produk
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Technical Specifications */}
          <div className="mb-8 flex-grow">
            <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3">
              Spesifikasi Teknis
            </h4>
            <ul className="space-y-2.5">
              {product.specs.map((spec, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                  <ChevronRight size={14} className="text-accent shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onRequestQuote(product.name, product.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-light hover:to-accent text-primary-dark font-display font-black text-xs uppercase py-4 rounded-xl transition-all duration-300 shadow-md shadow-accent/15 cursor-pointer"
            >
              <ShoppingBag size={14} />
              <span>Hubungi Spesialis / Minta Penawaran</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-display font-bold transition-colors"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
