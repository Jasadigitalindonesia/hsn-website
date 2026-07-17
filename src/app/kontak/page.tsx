import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default async function Page() {
    const dict = require("@/i18n/dictionaries/id.json"); const lang: string = "";
  const pageDict = (dict as any)['contact'];

  return (
    <main className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <Navbar lang={lang} dict={dict.navigation} />
      
      {/* Header Banner */}
      <div className="bg-primary pt-16 pb-16 border-b border-primary-hover relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 shadow-sm">Hubungi Kami</h1>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full mb-6"></div>
          <div className="flex justify-center items-center space-x-2 text-white/80 text-sm font-medium">
            <Link href={`/`} className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Kontak</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        
        {/* Intro text */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Hubungi Kami</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Kami siap membantu Anda mendapatkan solusi Medical & Aesthetic Equipment yang sesuai dengan kebutuhan bisnis dan pelayanan kesehatan Anda.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          
          {/* Contact Details */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex-grow">
              <h3 className="text-xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">Informasi Kontak</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Kantor Pusat</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Grand Harvest Cluster Belvoir BC 19,<br/>
                      Kel. Balas Klumprik Kec.Wiyung<br/>
                      Kota Surabaya, Jawa Timur 60222
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Telepon / WhatsApp</h4>
                    <a href="https://wa.me/6285284222200" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:text-primary transition-colors block mb-1">
                      +62 852-8422-2200
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                    <a href="mailto:info@harvestselarasnusantara.com" className="text-gray-600 text-sm hover:text-primary transition-colors">
                      info@harvestselarasnusantara.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Jam Operasional</h4>
                    <p className="text-gray-600 text-sm">
                      Senin - Jumat: 08:30 - 17:30<br/>
                      Sabtu & Minggu: Tutup
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Kirimkan Pesan Kepada Kami</h3>
              <p className="text-gray-500 mb-8 text-sm">Silakan isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Masukkan nama Anda" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Masukkan alamat email" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon / WA *</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Misal: 0812xxxxxx" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subjek Pesan</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white">
                      <option>Pertanyaan Umum</option>
                      <option>Informasi Produk / Harga</option>
                      <option>Layanan Purna Jual / Service</option>
                      <option>Kerja Sama / Kemitraan</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pesan Anda *</label>
                  <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Tuliskan detail pertanyaan atau kebutuhan Anda..." required></textarea>
                </div>
                
                <button type="button" className="bg-primary hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 w-full md:w-auto">
                  Kirim Pesan <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
          
        </div>

        {/* Google Maps Embed */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden h-[400px]">
          <iframe 
            src="https://maps.google.com/maps?q=Grand+Harvest+Cluster+Belvoir+Surabaya&t=&z=14&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0, borderRadius: '12px' }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Kantor PT. Harvest Selaras Nusantara"
          ></iframe>
        </div>

      </div>

      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}

