import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const revalidate = 0; // Force real-time updates

export default async function Page() {
  const dict = require("@/i18n/dictionaries/id.json"); const lang: string = "";
  
  let settings: Record<string, string> = {};
  try {
    const res = await fetch('https://www.harvestselarasnusantara.com/api/settings', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        settings = data.data;
      }
    }
  } catch (error) {
    console.error("Fetch Settings Error:", error);
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navbar lang={lang} dict={dict.navigation} />
      
      {/* 1. Page Header (Hero) */}
      <div className="relative pt-32 pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url('${settings.kontak_hero_bg || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}')` }}></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight shadow-sm">
            {settings.kontak_hero_title || 'Hubungi Kami'}
          </h1>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full mb-6"></div>
          <div className="flex items-center justify-center space-x-2 text-white/80 text-sm font-medium">
            <Link href={`/`} className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Kontak</span>
          </div>
        </div>
      </div>

      <div className="flex-grow py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-8 leading-tight">
                Mari Diskusikan Kebutuhan Medis & Estetika Anda Bersama Kami.
              </h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                Tim ahli kami siap memberikan konsultasi, penawaran harga terbaik, serta dukungan teknis untuk semua produk alat kesehatan dan estetika.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary shrink-0 mt-1">
                    <MapPin size={28} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-1">Kantor Pusat</h4>
                    {settings.footer_address || 'Grand Harvest Cluster Belvoir BC 19, Kel. Balas Klumprik Kec.Wiyung Kota Surabaya, Jawa Timur 60222'}
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mr-4">
                    <Phone className="text-primary w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-1">Telepon / WhatsApp</h4>
                    <p className="text-gray-600 leading-relaxed mb-1">{settings.footer_phone || '+6285284222200'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mr-4">
                    <Mail className="text-primary w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600 leading-relaxed">{settings.footer_email || 'info@harvestselarasnusantara.com'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary shrink-0 mt-1">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Jam Operasional</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Senin - Jumat: 08.00 - 17.00 WIB<br />
                      Sabtu, Minggu, Hari Libur: Tutup
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{settings.kontak_form_title || 'Punya Pertanyaan? Kirim Pesan'}</h3>
              <p className="text-gray-500 mb-8">{settings.kontak_form_desc || 'Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.'}</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap *</label>
                    <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-gray-50 focus:bg-white transition-colors" placeholder="Cth: Dr. Budi Santoso" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Instansi / Klinik</label>
                    <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-gray-50 focus:bg-white transition-colors" placeholder="Cth: RS Medika Jaya" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">No. HP / WhatsApp *</label>
                    <input type="tel" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-gray-50 focus:bg-white transition-colors" placeholder="0812xxxxxx" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Email *</label>
                    <input type="email" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-gray-50 focus:bg-white transition-colors" placeholder="email@contoh.com" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Pesan / Pertanyaan *</label>
                  <textarea rows={4} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-gray-50 focus:bg-white transition-colors" placeholder="Tuliskan spesifikasi produk yang Anda butuhkan atau pertanyaan lainnya..."></textarea>
                </div>
                
                <button type="button" className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-3">
                  Kirim Pesan Sekarang <Send size={20} />
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="w-full h-96 bg-gray-200">
        <iframe 
          src={settings.footer_map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kawan%20Lama%20Sejahtera!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"}
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy" 
          title="Map Location">
        </iframe>
      </div>
      
      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}
