"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Phone, Mail, Globe, MessageCircle, ShoppingCart } from "lucide-react";

export default function Navbar({ lang, dict }: { lang: string, dict: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
    { name: dict.home, href: `/` },
    { name: dict.profile, href: `/profil` },
    { name: dict.category, href: `/kategori` },
    { name: dict.product, href: `/produk` },
    { name: dict.ekatalog, href: `/katalog` },
    { name: dict.news, href: `/artikel` },
    { name: dict.contact, href: `/kontak` },
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 hidden md:block">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-xs text-gray-500">
          <div className="flex space-x-4">
            <a href="mailto:info@harvestselarasnusantara.com" className="flex items-center hover:text-primary transition-colors">
              <Mail className="w-3 h-3 mr-1" /> info@harvestselarasnusantara.com
            </a>
            <a href="https://wa.me/6285284222200" className="flex items-center hover:text-primary transition-colors">
              <Phone className="w-3 h-3 mr-1" /> +6285284222200
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex space-x-3 border-r pr-3 border-gray-200">
              <a href="#" className="hover:text-primary transition-colors" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="#" className="hover:text-primary transition-colors" title="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="hover:text-primary transition-colors" title="Website">
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Link href={switchLanguage('en')} className={`cursor-pointer hover:text-primary font-medium ${lang === 'en' ? 'text-primary' : ''}`}>EN</Link>
              <span>|</span>
              <Link href={switchLanguage('id')} className={`cursor-pointer hover:text-primary font-medium ${lang === 'id' ? 'text-primary' : ''}`}>ID</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="HSN Logo" className="h-14 md:h-16 w-auto object-contain scale-[1.3] md:scale-[1.5] origin-left ml-2" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-semibold text-gray-700 hover:text-primary transition-colors uppercase"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-gray-600 hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full">
          <nav className="flex flex-col px-4 py-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="py-3 border-b border-gray-50 text-sm font-medium text-gray-700 hover:text-primary uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
