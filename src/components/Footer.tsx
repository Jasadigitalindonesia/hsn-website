"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Globe, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function Footer({ dict, lang, settings = {} }: { dict: any, lang: string, settings?: Record<string, string> }) {
  return (
    <footer className="bg-[#0a0a0a] text-[#999999] text-sm pt-20 pb-8 border-t-[5px] border-primary relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          {/* Column 1: About */}
          <motion.div variants={itemVariants}>
            <div className="text-3xl font-black tracking-tighter text-white mb-6">HSN<span className="text-primary">.</span></div>
            <p className="mb-8 leading-relaxed text-gray-400">
              {settings.footer_description || dict.about_desc}
            </p>
            <div className="flex space-x-4">
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg" title="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg" title="Website">
                <Globe className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Useful Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold text-lg mb-6 relative pb-3 before:absolute before:bottom-0 before:left-0 before:w-12 before:h-1 before:bg-primary before:rounded-full">{dict.links_title}</h3>
            <ul className="space-y-4">
              {[
                { name: "Tentang Kami", href: `/${lang || 'id'}/profil` },
                { name: "Kategori Produk", href: `/${lang || 'id'}/kategori` },
                { name: "Semua Produk", href: `/${lang || 'id'}/produk` },
                { name: "E-Katalog", href: `/${lang || 'id'}/katalog` },
                { name: "Artikel & Berita", href: `/${lang || 'id'}/artikel` },
                { name: "Hubungi Kami", href: `/${lang || 'id'}/kontak` },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="group flex items-center text-gray-400 hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4 mr-2 text-primary group-hover:translate-x-2 transition-transform" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold text-lg mb-6 relative pb-3 before:absolute before:bottom-0 before:left-0 before:w-12 before:h-1 before:bg-primary before:rounded-full">{dict.contact_title}</h3>
            <ul className="space-y-6">
              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center mr-4 shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mt-1">
                  {settings.footer_address || "Grand Harvest Cluster Belvoir BC 39, Kel. Balas Klumprik Kec.Wiyung Kota Surabaya, Jawa Timur Kode pos 60222"}
                </p>
              </div>
              <div className="flex items-center group">
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center mr-4 shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <p className="text-gray-400 text-sm font-medium">
                  {settings.footer_phone || "+62 852 8422 2200"}
                </p>
              </div>
              <div className="flex items-center group">
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center mr-4 shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <p className="text-gray-400 text-sm font-medium">
                  <a href={settings.footer_email ? `mailto:${settings.footer_email}` : "mailto:magdalena@hsnmedica.com"} className="hover:text-primary transition-colors">
                    {settings.footer_email || "magdalena@hsnmedica.com"}
                  </a>
                </p>
              </div>
            </ul>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold text-lg mb-6 relative pb-3 before:absolute before:bottom-0 before:left-0 before:w-12 before:h-1 before:bg-primary before:rounded-full">{dict.newsletter_title}</h3>
            <p className="mb-6 text-gray-400 leading-relaxed">{dict.newsletter_desc}</p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="email" 
                  placeholder={dict.newsletter_placeholder} 
                  className="w-full bg-[#1a1a1a] border border-[#333333] pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all rounded-xl"
                  required
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="bg-primary hover:bg-[#b0924b] text-white font-bold py-4 px-4 rounded-xl transition-colors shadow-lg shadow-primary/20"
              >
                {dict.newsletter_button}
              </motion.button>
            </form>
          </motion.div>

        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-[#222222] pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500"
        >
          <p>&copy; {new Date().getFullYear()} PT Harvest Selaras Nusantara Medica. {dict.rights}</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-medium">
            <Link href={`/privacy-policy`} className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href={`/terms`} className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
