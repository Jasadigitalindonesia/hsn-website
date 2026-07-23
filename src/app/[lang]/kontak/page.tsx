import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata: Metadata = {
  title: "Hubungi Kami | PT Harvest Selaras Nusantara Medica",
  description: "Hubungi PT Harvest Selaras Nusantara Medica untuk konsultasi, penawaran harga, dan dukungan teknis alat kesehatan & estetika.",
};
export const revalidate = 0;

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

  const t = lang === 'en' ? {
    heroTitle: "Let's Collaborate.",
    heroDesc: "Our expert team is ready to provide the best medical & aesthetic solutions for your business.",
    loc: "Office Location",
    hq: "HSN Headquarters",
    comm: "Communication Channels",
    mobile: "Mobile Phone",
    helpEmail: "Help Email",
    hours: "Operational Hours",
    monFri: "Monday - Friday",
    formTitle: "Send Message",
    formDesc: "Our sales and technical team will reply to your inquiries within 1x24 business hours.",
    fullName: "Full Name *",
    inst: "Institution / Clinic",
    phone: "Mobile No. / WhatsApp *",
    emailAdd: "Email Address *",
    msgLabel: "Message / Question *",
    msgPlace: "Write down the product specifications you need or other questions...",
    sendEmail: "Send Email",
    chatWA: "Chat via WhatsApp",
    distCenter: "HSN Distribution Center",
    visitUs: "Visit our headquarters for product demonstrations and direct consultation with experts."
  } : {
    heroTitle: "Mari Berkolaborasi.",
    heroDesc: "Tim ahli kami siap memberikan solusi medis & estetika terbaik untuk bisnis Anda.",
    loc: "Lokasi Kantor",
    hq: "Kantor Pusat HSN",
    comm: "Saluran Komunikasi",
    mobile: "Telepon Seluler",
    helpEmail: "Email Bantuan",
    hours: "Jam Operasional",
    monFri: "Senin - Jumat",
    formTitle: "Kirim Pesan",
    formDesc: "Tim sales dan teknis kami akan membalas pertanyaan Anda maksimal dalam 1x24 jam kerja.",
    fullName: "Nama Lengkap *",
    inst: "Instansi / Klinik",
    phone: "No. HP / WhatsApp *",
    emailAdd: "Alamat Email *",
    msgLabel: "Pesan / Pertanyaan *",
    msgPlace: "Tuliskan spesifikasi produk yang Anda butuhkan atau pertanyaan lainnya...",
    sendEmail: "Kirim Email",
    chatWA: "Chat via WhatsApp",
    distCenter: "Pusat Distribusi HSN",
    visitUs: "Kunjungi kantor pusat kami untuk demonstrasi produk dan konsultasi secara langsung dengan ahlinya."
  };

  if (lang === 'en') {
    settings.kontak_form_title = t.formTitle + " Langsung"; // To keep the "Langsung" part or translate it completely
    settings.kontak_form_title = "Send a Direct Message";
    settings.kontak_form_desc = t.formDesc;
  }

  return (
    <main className="flex min-h-screen flex-col bg-white overflow-hidden">
      <Navbar lang={lang} dict={dict.navigation} />
      
      {/* 1. Page Header (Hero) - Minimalist Premium */}
      <div className="relative pt-40 pb-20 bg-gray-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fade-up" className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]">
              {t.heroTitle}
            </h1>
            <p className="text-2xl text-gray-500 font-light leading-relaxed">
              {t.heroDesc}
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="flex-grow py-24 bg-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Contact Info */}
            <div className="w-full lg:w-5/12">
              <AnimatedSection animation="slide-right">
                <div className="space-y-12">
                  <div className="group">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{t.loc}</h4>
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <MapPin className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">{t.hq}</h3>
                        <p className="text-gray-500 text-lg leading-relaxed font-light">
                          {settings.footer_address || 'Grand Harvest Cluster Belvoir BC 39, Kel. Balas Klumprik Kec.Wiyung Kota Surabaya, Jawa Timur Kode pos 60222'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{t.comm}</h4>
                    <div className="flex flex-col gap-6">
                      <a href={`tel:${settings.footer_phone || '+6285284222200'}`} className="flex items-center gap-6 group/item">
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                          <Phone className="w-6 h-6 text-gray-900 group-hover/item:text-white transition-colors" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover/item:text-primary transition-colors">{settings.footer_phone || '+62 852 8422 2200'}</h3>
                          <p className="text-gray-500 text-sm">{t.mobile}</p>
                        </div>
                      </a>
                      
                      <a href={`mailto:${settings.footer_email || 'magdalena@hsnmedica.com'}`} className="flex items-center gap-6 group/item">
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                          <Mail className="w-6 h-6 text-gray-900 group-hover/item:text-white transition-colors" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover/item:text-primary transition-colors">{settings.footer_email || 'magdalena@hsnmedica.com'}</h3>
                          <p className="text-gray-500 text-sm">{t.helpEmail}</p>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="group">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{t.hours}</h4>
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Clock className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{t.monFri}</h3>
                        <p className="text-gray-500 text-lg font-light">08.00 - 17.00 WIB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form Component */}
            <div className="w-full lg:w-7/12">
              <AnimatedSection animation="fade-up" delay={0.2}>
                <ContactForm t={t} settings={settings} />
              </AnimatedSection>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Map Section - Borderless Premium */}
      <AnimatedSection animation="fade-up" className="w-full h-[600px] bg-gray-100 relative">
        <div className="absolute top-10 left-10 z-20 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white max-w-sm hidden md:block">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-black text-xl text-gray-900 mb-2">{t.distCenter}</h3>
          <p className="text-gray-500 font-light leading-relaxed">{t.visitUs}</p>
        </div>
        <iframe 
          src={(settings.footer_map_url && settings.footer_map_url.includes('embed')) ? settings.footer_map_url : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kawan%20Lama%20Sejahtera!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"}
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }} 
          allowFullScreen={false} 
          loading="lazy" 
          title="Map Location">
        </iframe>
      </AnimatedSection>
      
      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}
