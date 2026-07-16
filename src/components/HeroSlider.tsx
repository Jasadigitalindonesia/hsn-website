"use client";

import React from 'react';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';

export default function HeroSlider({ lang, dict }: { lang: string, dict: any }) {
  // Hanya menggunakan 1 slide statis agar tidak bergerak (tidak slider)
  const slide = {
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Distributor of Medical & Aesthetic Equipments",
    link: `/${lang}/produk`
  };

  return (
    <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent z-10"></div>
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
          
          <AnimatedSection delay={0.4}>
            <Link 
              href={slide.link}
              className="inline-block bg-white text-primary hover:bg-[#d9b969] hover:text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-primary/50 text-lg"
            >
              Lihat Produk Kami
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
