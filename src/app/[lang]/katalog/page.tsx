import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Download, FileText, Search, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata: Metadata = {
  title: "Katalog Produk | PT Harvest Selaras Nusantara",
  description: "Unduh katalog produk terbaru kami, mulai dari Hospital Furniture, Ultrasound Systems, hingga Aesthetic Equipment.",
};
export const revalidate = 0; // Force real-time updates

export default async function Page({ params }: { params: any }) {
   const lang = (await Promise.resolve(params))?.lang || "id";
  const dict = await (require("@/i18n/getDictionary").getDictionary(lang as any));
  
  let settings: Record<string, string> = {};
  try {
    const rawSettings = await prisma.$queryRawUnsafe('SELECT * FROM "SiteSetting"') as any[];
    settings = rawSettings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  } catch (error) {
    console.error("Fetch Settings DB Error:", error);
  }

  // Mock catalogs
  const catalogs = [
    { title: "Katalog Hospital Furniture 2026", desc: "Koleksi lengkap ranjang pasien, meja operasi, dan kursi roda.", size: "4.2 MB", date: "Jan 2026", img: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=600&q=80" },
    { title: "Katalog Patient Monitor & ECG", desc: "Spesifikasi detail untuk semua tipe patient monitor dan ECG.", size: "3.1 MB", date: "Feb 2026", img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80" },
    { title: "Katalog Ultrasound Systems", desc: "Brosur USG 2D, 3D, 4D, dan Color Doppler.", size: "5.5 MB", date: "Mar 2026", img: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80" },
    { title: "Katalog Aesthetic Equipment", desc: "Alat-alat kecantikan, laser, dan perlengkapan klinik estetika.", size: "2.8 MB", date: "Apr 2026", img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=600&q=80" },
    { title: "Katalog Laboratorium", desc: "Hematology analyzer, sentrifus, dan perlengkapan lab.", size: "3.7 MB", date: "Mei 2026", img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80" },
    { title: "Katalog Consumables", desc: "Daftar lengkap bahan habis pakai medis.", size: "1.9 MB", date: "Jun 2026", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80" },
  ];

  const t = lang === 'en' ? {
    heroTitle: "Official E-Catalog",
    home: "Home",
    katalog: "Catalog",
    contentTitle: "Catalog Download Center",
    contentDesc: "Find complete information about all the products we distribute. Download our digital catalog to see detailed specifications.",
    searchPlaceholder: "Search catalog (Example: Hospital Furniture)...",
    searchBtn: "Search Catalog",
    clickDownload: "Click to Download",
    downloadPdf: "Download PDF"
  } : {
    heroTitle: "E-Katalog Resmi",
    home: "Beranda",
    katalog: "Katalog",
    contentTitle: "Pusat Unduhan Katalog",
    contentDesc: "Temukan informasi lengkap mengenai seluruh produk yang kami distribusikan. Unduh katalog digital kami untuk melihat spesifikasi detail.",
    searchPlaceholder: "Cari katalog (Contoh: Hospital Furniture)...",
    searchBtn: "Cari Katalog",
    clickDownload: "Klik untuk Unduh",
    downloadPdf: "Unduh PDF"
  };

  // If language is English, override the database settings for catalogs
  if (lang === 'en') {
    settings.katalog_hero_title = t.heroTitle;
    settings.katalog_content_title = t.contentTitle;
    settings.katalog_content_desc = t.contentDesc;
    
    catalogs[0].title = "Hospital Furniture Catalog 2026";
    catalogs[0].desc = "Complete collection of patient beds, operating tables, and wheelchairs.";
    catalogs[1].title = "Patient Monitor & ECG Catalog";
    catalogs[1].desc = "Detailed specifications for all patient monitor and ECG types.";
    catalogs[2].title = "Ultrasound Systems Catalog";
    catalogs[2].desc = "Brochure for 2D, 3D, 4D, and Color Doppler Ultrasound.";
    catalogs[3].title = "Aesthetic Equipment Catalog";
    catalogs[3].desc = "Beauty devices, lasers, and aesthetic clinic equipment.";
    catalogs[4].title = "Laboratory Catalog";
    catalogs[4].desc = "Hematology analyzer, centrifuge, and lab equipment.";
    catalogs[5].title = "Consumables Catalog";
    catalogs[5].desc = "Complete list of medical consumables.";
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#f8f9fa] overflow-hidden">
      <Navbar lang={lang} dict={dict.navigation} />
      
      {/* Header Banner - Glassmorphism Style */}
      <div className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary"></div>
        <div className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url('${settings.katalog_hero_bg || 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}')` }}></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/20 blur-[100px] rounded-full"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection animation="scale-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-md">{settings.katalog_hero_title || t.heroTitle}</h1>
            <div className="flex justify-center items-center space-x-3 text-white/90 text-sm font-bold tracking-wide uppercase">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">{t.home}</Link>
              <span>/</span>
              <span className="text-white">{t.katalog}</span>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="flex-grow py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight">{settings.katalog_content_title || t.contentTitle}</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-4 font-light">
              {settings.katalog_content_desc || t.contentDesc}
            </p>
          </AnimatedSection>

          {/* Search Bar - Modern Floating Style */}
          <AnimatedSection delay={0.2} animation="fade-up" className="max-w-4xl mx-auto mb-20 -mt-8">
            <div className="flex flex-col md:flex-row gap-4 bg-white p-3 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="relative flex-grow">
                <input type="text" placeholder={t.searchPlaceholder} className="w-full pl-12 pr-4 py-4 rounded-xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-800 transition-all font-medium" />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <button className="bg-primary hover:bg-[#b0924b] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-primary/30 flex items-center justify-center whitespace-nowrap gap-2">
                {t.searchBtn} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </AnimatedSection>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalogs.map((katalog, index) => (
              <AnimatedSection key={index} delay={index * 0.1} animation="fade-up">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group flex flex-col h-full transform hover:-translate-y-2">
                  <div className="h-56 overflow-hidden relative bg-gray-50 p-4">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center gap-3">
                      <div className="bg-white text-primary p-4 rounded-full transform scale-50 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                        <Download size={24} />
                      </div>
                      <span className="text-white font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{t.clickDownload}</span>
                    </div>
                    <img src={katalog.img} alt={katalog.title} className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out shadow-sm" />
                  </div>
                  
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">{katalog.title}</h3>
                    <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed font-light">{katalog.desc}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 text-primary rounded-lg text-xs font-bold">
                        <FileText size={14} />
                        {katalog.size}
                      </div>
                      <button className="flex items-center text-gray-900 font-bold hover:text-primary text-sm gap-2 group/btn transition-colors">
                        {t.downloadPdf} <Download size={16} className="transform group-hover/btn:-translate-y-1 group-hover/btn:text-primary transition-all" />
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </div>
      
      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}
