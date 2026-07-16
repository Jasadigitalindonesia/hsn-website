"use client";

import { MessageSquare, Download, Laptop, ChevronRight } from 'lucide-react';
import { NewsArticle } from '@/data/mockData';

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  latestNews: NewsArticle[];
  onSelectNews: (article: NewsArticle) => void;
  onRequestDemo: () => void;
  onDownloadCatalog: () => void;
}

export default function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  latestNews,
  onSelectNews,
  onRequestDemo,
  onDownloadCatalog
}: SidebarProps) {
  return (
    <aside className="w-full lg:w-76 flex flex-col gap-6 shrink-0">
      {/* Product Categories Box */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-display font-bold text-base tracking-wide text-primary border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-accent rounded-full"></span>
          Kategori Produk
        </h3>
        <ul className="flex flex-col gap-1">
          <li>
            <button
              onClick={() => onSelectCategory('All')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-display text-sm font-semibold transition-all flex justify-between items-center ${
                selectedCategory === 'All'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <span>Semua Kategori</span>
              <ChevronRight size={14} className={selectedCategory === 'All' ? 'opacity-100' : 'opacity-40'} />
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => onSelectCategory(cat)}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-display text-sm font-semibold transition-all flex justify-between items-center ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`}
              >
                <span>{cat}</span>
                <ChevronRight size={14} className={selectedCategory === cat ? 'opacity-100' : 'opacity-40'} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Consultation Box */}
      <div className="bg-gradient-to-br from-primary-dark to-primary text-white rounded-2xl p-6 shadow-xl border border-white/5 relative overflow-hidden">
        {/* Glow Element */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
        
        <h3 className="font-display font-bold text-base tracking-wide text-accent border-b border-white/10 pb-3 mb-4">
          Butuh Konsultasi?
        </h3>
        <p className="text-xs text-gray-300 mb-5 leading-relaxed">
          Hubungi spesialis kami untuk demo unit, spesifikasi lengkap, dan penawaran khusus.
        </p>

        <div className="flex flex-col gap-3">
          {/* WhatsApp Specialist */}
          <a
            href="https://wa.me/6285235321338?text=Halo%20PT%20Harvest%20Selaras%20Nusantara,%20saya%20tertarik%20untuk%20konsultasi%20mengenai%20alat%20medis."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
          >
            <MessageSquare size={14} />
            <span>WhatsApp Specialist</span>
          </a>

          {/* Download Catalogue */}
          <button
            onClick={onDownloadCatalog}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/10 text-xs font-bold uppercase py-3 rounded-xl transition-all duration-300"
          >
            <Download size={14} className="text-accent" />
            <span>Download Catalogue</span>
          </button>

          {/* Request Demo */}
          <button
            onClick={onRequestDemo}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-light hover:to-accent text-primary-dark text-xs font-bold uppercase py-3 rounded-xl transition-all duration-300 shadow-md shadow-accent/15"
          >
            <Laptop size={14} />
            <span>Request Demo</span>
          </button>
        </div>
      </div>

      {/* Latest News Sidebar Widget */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-display font-bold text-base tracking-wide text-primary border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-accent rounded-full"></span>
          Berita Terbaru
        </h3>
        <div className="flex flex-col gap-4">
          {latestNews.slice(0, 3).map((article) => (
            <article 
              key={article.id}
              onClick={() => onSelectNews(article)}
              className="group cursor-pointer border-b border-gray-50 last:border-b-0 pb-3 last:pb-0"
            >
              <h4 className="text-xs font-bold text-gray-800 leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-2">
                {article.title}
              </h4>
              <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400 font-semibold">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
