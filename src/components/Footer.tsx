"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Globe, MessageCircle, ArrowRight } from "lucide-react";

export default function Footer({ dict, lang }: { dict: any, lang: string }) {
  return (
    <footer className="bg-[#111111] text-[#999999] text-sm pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: About */}
          <div>
            <div className="text-2xl font-black tracking-tighter text-white mb-6">HSN</div>
            <p className="mb-6 leading-relaxed">
              {dict.about_desc}
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center hover:bg-primary hover:text-white transition-colors" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center hover:bg-primary hover:text-white transition-colors" title="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center hover:bg-primary hover:text-white transition-colors" title="Website">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative pb-3 before:absolute before:bottom-0 before:left-0 before:w-12 before:h-0.5 before:bg-primary">{dict.links_title}</h3>
            <ul className="space-y-3">
              <li><Link href={`/${lang}/profil`} className="hover:text-primary transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Tentang Kami</Link></li>
              <li><Link href={`/${lang}/kategori`} className="hover:text-primary transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Kategori</Link></li>
              <li><Link href={`/${lang}/produk`} className="hover:text-primary transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Produk</Link></li>
              <li><Link href={`/${lang}/katalog`} className="hover:text-primary transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Katalog</Link></li>
              <li><Link href={`/${lang}/artikel`} className="hover:text-primary transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Artikel</Link></li>
              <li><Link href={`/${lang}/kontak`} className="hover:text-primary transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Kontak</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative pb-3 before:absolute before:bottom-0 before:left-0 before:w-12 before:h-0.5 before:bg-primary">{dict.contact_title}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
                <span>Grand Harvest Cluster Belvoir BC 19, Kel. Balas Klumprik Kec.Wiyung Kota Surabaya, Jawa Timur 60222</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-3 shrink-0" />
                <a href="https://wa.me/6285284222200" className="hover:text-primary transition-colors">+6285284222200</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-3 shrink-0" />
                <a href="mailto:info@harvestselarasnusantara.com" className="hover:text-primary transition-colors">info@harvestselarasnusantara.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative pb-3 before:absolute before:bottom-0 before:left-0 before:w-12 before:h-0.5 before:bg-primary">{dict.newsletter_title}</h3>
            <p className="mb-4">{dict.newsletter_desc}</p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={dict.newsletter_placeholder} 
                className="bg-[#222222] border border-[#333333] px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors rounded"
                required
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-4 rounded transition-colors"
              >
                {dict.newsletter_button}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#222222] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} PT Harvest Selaras Nusantara. {dict.rights}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href={`/${lang}/privacy-policy`} className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href={`/${lang}/terms`} className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
