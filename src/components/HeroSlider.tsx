"use client";

import React from 'react';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';

export default function HeroSlider({ lang, dict }: { lang: string, dict: any }) {
  const slide = {
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    subtitle: "Distributor of Medical & Aesthetic Equipments",
    title: "Distributor B2B Terpercaya Alat Medis & Estetika di Indonesia",
    desc: "Di era industri estetika yang terus berkembang, teknologi menjadi kunci untuk menghadirkan pelayanan yang unggul dan membangun kepercayaan pasien. PT Harvest Selaras Nusantara hadir sebagai mitra terpercaya dengan menghadirkan berbagai solusi Medical & Aesthetic Equipment berstandar internasional, didukung konsultasi profesional, pelatihan, instalasi, dan layanan purna jual yang andal. Bersama kami, wujudkan layanan kesehatan dan estetika yang lebih modern, berkualitas, dan siap berkembang di masa depan.",
  };

  return (
    <div className="relative h-[600px] md:h-[700px] w-full overflow-hidden group">
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
      <div className="container mx-auto px-4 h-full relative z-20 flex items-center justify-start text-left">
        <div className="max-w-4xl">
          <AnimatedSection delay={0.1}>
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{slide.subtitle}</h3>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg animate-shine">
              {slide.title}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed">
              {slide.desc}
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.4} className="flex gap-4">
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
