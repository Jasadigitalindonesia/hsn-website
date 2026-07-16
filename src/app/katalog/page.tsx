import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Download, FileText, Search } from 'lucide-react';

export default async function Page() {
    const dict = require("@/i18n/dictionaries/id.json"); const lang: string = "";
  const pageDict = (dict as any)['ekatalog']; // Note: in dictionary we kept "ekatalog" as key but changed text to Katalog

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
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 shadow-sm">Katalog Produk</h1>
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{pageDict?.heading || 'Unduh Katalog Resmi Kami'}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Dapatkan informasi lengkap mengenai spesifikasi, fitur, dan detail produk-produk medis serta estetika kami melalui katalog elektronik (PDF) yang tersedia di bawah ini.
            </p>
          </div>

          <div className="flex justify-between items-center mb-8 flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-80">
              <input 
                type="text" 
                placeholder="Cari katalog..." 
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white shadow-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <select className="bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium shadow-sm w-full sm:w-auto">
              <option>Semua Kategori</option>
              <option>Medical Equipment</option>
              <option>Aesthetic Equipment</option>
              <option>Laboratory</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalogs.map((katalog, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img src={katalog.img} alt={katalog.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      <span className="text-sm font-semibold uppercase tracking-wider">PDF</span>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded backdrop-blur-sm">{katalog.size}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-900 text-xl mb-3 line-clamp-2">{katalog.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 flex-grow">{katalog.desc}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-400 font-medium">Diperbarui: {katalog.date}</span>
                    <a href="#" className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
                      <Download className="w-4 h-4" /> Unduh
                    </a>
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
