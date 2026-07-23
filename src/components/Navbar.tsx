"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Phone, Mail, Globe, MessageCircle, ShoppingCart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar({ lang, dict }: { lang: string, dict: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = (newLang: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    if (segments[1] === "id" || segments[1] === "en") {
      segments[1] = newLang;
      return segments.join("/") || "/";
    }
    return `/${newLang}${pathname}`;
  };

  const navLinks = [
    { name: dict.home, href: `/${lang}` },
    { name: dict.profile, href: `/${lang}/profil` },
    { name: dict.category, href: `/${lang}/kategori` },
    { name: dict.product, href: `/${lang}/produk` },
    { name: dict.ekatalog, href: `/${lang}/katalog` },
    { name: dict.news, href: `/${lang}/artikel` },
    { name: dict.contact, href: `/${lang}/kontak` },
  ];

  return (
    <header 
      className={cn(
        "w-full sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-md py-1" : "bg-white shadow-sm py-2"
      )}
    >
      {/* Top Bar - Hides on Scroll */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="hidden md:block border-b border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-2 flex justify-between items-center text-xs text-gray-500 font-medium">
              <div className="flex space-x-6">
                <a href="mailto:magdalena@hsnmedica.com" className="flex items-center hover:text-primary transition-colors group">
                  <Mail className="w-3.5 h-3.5 mr-2 group-hover:scale-110 transition-transform" /> magdalena@hsnmedica.com
                </a>
                <a href="https://wa.me/6285284222200" className="flex items-center hover:text-primary transition-colors group">
                  <Phone className="w-3.5 h-3.5 mr-2 group-hover:scale-110 transition-transform" /> +62 852 8422 2200
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-4 border-r pr-4 border-gray-200">
                  <a href="#" className="hover:text-primary transition-colors" title="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="hover:text-primary transition-colors" title="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold">
                  <Link href={switchLanguage('en')} className={cn("hover:text-primary transition-colors", lang === 'en' ? 'text-primary' : '')}>EN</Link>
                  <span className="text-gray-300">|</span>
                  <Link href={switchLanguage('id')} className={cn("hover:text-primary transition-colors", lang === 'id' ? 'text-primary' : '')}>ID</Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link href={`/${lang || 'id'}`} className="flex items-center z-50">
          <motion.img 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            src="/logo.png" 
            alt="HSN Logo" 
            className="h-14 md:h-16 w-auto object-contain origin-left ml-2" 
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
            >
              <Link 
                href={link.href}
                className="relative text-sm font-bold text-gray-700 hover:text-primary transition-colors uppercase group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-600 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100/50"
          >
            <Search className="w-5 h-5" />
          </motion.button>
          
          <Link
            href={`/${lang || 'id'}/kontak`}
            className="hidden md:flex bg-primary hover:bg-[#b0924b] text-white px-5 py-2 rounded-full text-sm font-bold items-center gap-2 shadow-lg shadow-primary/30 transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" /> {dict.contact || "Hubungi Kami"}
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-gray-800 hover:text-primary z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="w-7 h-7" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu className="w-7 h-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl origin-top"
          >
            <nav className="flex flex-col px-6 py-6 space-y-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                >
                  <Link 
                    href={link.href}
                    className="block text-lg font-bold text-gray-800 hover:text-primary hover:translate-x-2 transition-all uppercase"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-6 mt-4 border-t border-gray-200"
              >
                <a href="https://wa.me/6285284222200" className="flex justify-center items-center gap-2 bg-primary text-white py-3 rounded-xl font-bold w-full">
                  <MessageCircle className="w-5 h-5" /> Chat via WhatsApp
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
