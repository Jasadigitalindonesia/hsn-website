import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Download, FileText, Search } from 'lucide-react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const revalidate = 0; // Force real-time updates

export default async function Page() {
  const dict = require("@/i18n/dictionaries/id.json"); const lang: string = "";
  
  // @ts-ignore - Bypass VSCode TS Server cache issue
  // @ts-ignore
  const dbSettings = await prisma.siteSetting.findMany({ where: { category: 'katalog' } });
  const settings = dbSettings.reduce((acc: Record<string, string>, curr: { key: string; value: string }) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  // Mock catalogs
  const catalogs = [
    { title: "Katalog Hospital Furniture 2026", desc: "Koleksi lengkap ranjang pasien, meja operasi, dan kursi roda.", size: "4.2 MB", date: "Jan 2026", img: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=300&q=80" },
    { title: "Katalog Patient Monitor & ECG", desc: "Spesifikasi detail untuk semua tipe patient monitor dan ECG.", size: "3.1 MB", date: "Feb 2026", img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300&q=80" },
    { title: "Katalog Ultrasound Systems", desc: "Brosur USG 2D, 3D, 4D, dan Color Doppler.", size: "5.5 MB", date: "Mar 2026", img: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=300&q=80" },
    { title: "Katalog Aesthetic Equipment", desc: "Alat-alat kecantikan, laser, dan perlengkapan klinik estetika.", size: "2.8 MB", date: "Apr 2026", img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=300&q=80" },
    { title: "Katalog Laboratorium", desc: "Hematology analyzer, sentrifus, dan perlengkapan lab.", size: "3.7 MB", date: "Mei 2026", img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=300&q=80" },
    { title: "Katalog Consumables", desc: "Daftar lengkap bahan habis pakai medis.", size: "1.9 MB", date: "Jun 2026", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300&q=80" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <Navbar lang={lang} dict={dict.navigation} />
      
      {/* Header Banner */}
      <div className="bg-primary pt-16 pb-16 border-b border-primary-hover relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url('${settings.katalog_hero_bg || 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}')` }}></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 shadow-sm">{settings.katalog_hero_title || 'Katalog Produk'}</h1>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full mb-6"></div>
          <div className="flex justify-center items-center space-x-2 text-white/80 text-sm font-medium">
            <Link href={`/`} className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Katalog</span>
          </div>
        </div>
      </div>

      <div className="flex-grow py-16">
        <div className="container mx-auto px-4">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{settings.katalog_content_title || 'Katalog Produk'}</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              {settings.katalog_content_desc || 'Temukan informasi lengkap mengenai seluruh produk yang kami distribusikan melalui katalog digital resmi PT Harvest Selaras Nusantara.'}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-12 max-w-4xl mx-auto">
            <div className="relative flex-grow">
              <input type="text" placeholder="Cari katalog (Contoh: Hospital Furniture, Patient Monitor)..." className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-800 shadow-sm transition-all" />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button className="bg-primary hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-sm flex items-center justify-center whitespace-nowrap">
              Cari Katalog
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalogs.map((katalog, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1">
                <div className="h-48 overflow-hidden relative border-b border-gray-100 bg-gray-50">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                    <div className="bg-white text-primary p-3 rounded-full transform scale-50 group-hover:scale-100 transition-transform duration-300">
                      <Download size={24} />
                    </div>
                  </div>
                  <img src={katalog.img} alt={katalog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">{katalog.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">{katalog.desc}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                      <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded">
                        <FileText size={14} className="text-gray-400" />
                        {katalog.size}
                      </div>
                      <div className="hidden">
                        {katalog.date}
                      </div>
                    </div>
                    <button className="flex items-center text-primary font-bold hover:text-primary-hover text-sm gap-1 group/btn">
                      Unduh <Download size={14} className="transform group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      
      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}
