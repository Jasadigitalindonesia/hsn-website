"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSlider({ settings, lang }: { settings?: any, lang?: string }) {
  const slide = {
    image: (settings?.hero_image && !settings.hero_image.includes('photo-1620288627223-53302f4e8c74')) ? settings.hero_image : "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: settings?.hero_title || "Distributor of Medical & Aesthetic Equipments",
  };

  const layout = settings?.hero_layout || 'right';

  let containerClass = "container mx-auto px-4 h-full relative z-20 flex items-center";
  let contentClass = "max-w-4xl";
  let gradientClass = "absolute inset-0 z-10";
  let justifyClass = "flex flex-col sm:flex-row gap-4";

  if (layout === 'left') {
    containerClass += " justify-start text-left";
    gradientClass += " bg-gradient-to-r from-primary/95 via-primary/60 to-transparent";
  } else if (layout === 'center') {
    containerClass += " justify-center text-center";
    contentClass += " mx-auto";
    gradientClass += " bg-primary/70";
    justifyClass += " justify-center";
  } else {
    // right
    containerClass += " justify-end text-right";
    contentClass += " ml-auto";
    gradientClass += " bg-gradient-to-l from-primary/95 via-primary/60 to-transparent";
    justifyClass += " justify-end";
  }

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as const, // Custom easing for premium feel
        delay: 0.2
      } 
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.4
      } 
    }
  };

  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image with Slow Zoom (Cinematic Effect) */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
      >
        <div className={gradientClass}></div>
        <img 
          src={slide.image} 
          alt="HSN Hero" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Decorative Glow */}
      <div className="absolute inset-0 z-10 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-white rounded-full blur-[200px]"></div>
      </div>

      {/* Content */}
      <div className={containerClass}>
        <div className={contentClass}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={contentVariants}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-[1.1] drop-shadow-2xl bg-gradient-to-r from-[#d9b969] via-[#ffeba3] to-[#d9b969] bg-[length:200%_auto] text-transparent bg-clip-text"
              variants={{
                hidden: { backgroundPosition: "0% center" },
                visible: { backgroundPosition: ["0% center", "200% center"], transition: { duration: 10, ease: "linear", repeat: Infinity } }
              }}
            >
              {slide.title}
            </motion.h1>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            className={justifyClass}
          >
            <Link 
              href={`/${lang || "id"}/produk`}
              className="inline-flex justify-center items-center bg-white text-primary hover:bg-gray-100 font-bold py-4 px-10 rounded-full transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)] text-lg"
            >
              {lang === "en" ? "Explore Products" : "Jelajahi Produk"}
            </Link>
            <Link 
              href={`/${lang || "id"}/kontak`}
              className="inline-flex justify-center items-center bg-transparent border-2 border-white/70 text-white hover:bg-white hover:text-primary font-bold py-4 px-10 rounded-full transition-colors backdrop-blur-sm text-lg"
            >
              {lang === "en" ? "Contact Us" : "Hubungi Kami"}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
