"use client";

import React from 'react';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';

export default function HeroSlider({ lang, dict }: { lang: string, dict: any }) {
  const slide = {
    image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Distributor of Medical & Aesthetic Equipments",
  };

  return (
    <div className="relative h-[600px] md:h-[700px] w-full overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-l from-primary/90 via-primary/70 to-transparent z-10"></div>
        <img 
          src={slide.image} 
          alt="HSN Hero" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full relative z-20 flex items-center justify-end text-right">
        <div className="max-w-4xl ml-auto">
          
          <AnimatedSection delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg animate-shine">
              {slide.title}
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={0.4} className="flex gap-4 justify-end">
            <Link 
              href={`/produk`}
              className="inline-block bg-white text-primary hover:bg-[#d9b969] hover:text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-primary/50 text-lg"
            >
              Jelajahi Produk
            </Link>
            <Link 
              href={`/kontak`}
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-primary/50 text-lg"
            >
              Hubungi Kami
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
