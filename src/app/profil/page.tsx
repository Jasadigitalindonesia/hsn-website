import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Eye, ShieldCheck, Award, HeartHandshake, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const revalidate = 0; // Force real-time updates

export default async function Page() {
  const dict = require("@/i18n/dictionaries/id.json"); const lang: string = "";
  
  // @ts-ignore - Bypass VSCode TS Server cache issue
  const dbSettings = await prisma.siteSetting.findMany({ where: { category: 'profil' } });
  const settings = dbSettings.reduce((acc: Record<string, string>, curr: { key: string; value: string }) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navbar lang={lang} dict={dict.navigation} />
      
      {/* 1. Page Header (Hero) */}
      <div className="relative pt-32 pb-24 bg-primary overflow-hidden">
        <div className={`absolute inset-0 opacity-10 bg-cover bg-center`} style={{ backgroundImage: `url('${settings.profil_hero_bg || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}')` }}></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight shadow-sm">
              {settings.profil_hero_title || 'Tentang PT Harvest Selaras Nusantara'}
            </h1>
            <div className="w-24 h-1 bg-white/50 mx-auto rounded-full mb-6"></div>
            <div className="flex items-center justify-center space-x-2 text-white/80 text-sm font-medium">
              <Link href={`/`} className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Tentang Kami</span>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* 2. Main About Section */}
      <section className="py-20 lg:py-28 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <AnimatedSection className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                <h4 className="text-primary font-bold uppercase tracking-widest mb-3 text-sm relative z-10">
                  {settings.profil_about_subtitle || 'Tentang Kami'}
                </h4>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 leading-tight relative z-10">
                  {settings.profil_about_title || 'Tentang PT Harvest Selaras Nusantara'}
                </h2>
                
                <div className="prose prose-lg text-gray-600 max-w-none relative z-10">
                  <p className="font-medium text-gray-800 text-xl leading-relaxed mb-6">
                    {settings.profil_about_desc1 || 'PT Harvest Selaras Nusantara merupakan distributor B2B alat medis dan estetika yang berkomitmen menghadirkan produk berkualitas internasional untuk mendukung perkembangan industri kesehatan dan estetika di Indonesia.'}
                  </p>
                  <p className="mb-6 leading-relaxed">
                    {settings.profil_about_desc2 || 'Kami percaya bahwa teknologi yang tepat mampu meningkatkan kualitas pelayanan, memperkuat kepercayaan pasien, dan mendukung pertumbuhan bisnis setiap mitra kami. Oleh karena itu, kami tidak hanya menyediakan produk, tetapi juga menghadirkan layanan konsultasi, instalasi, pelatihan, serta dukungan purna jual yang profesional.'}
                  </p>
                  <p className="leading-relaxed">
                    {settings.profil_about_desc3 || 'Dengan dukungan tim teknisi yang andal dan jaringan distribusi yang luas di berbagai wilayah, HSN siap menjadi partner strategis yang dapat diandalkan oleh rumah sakit, klinik, maupun dokter spesialis dalam memberikan layanan medis yang unggul.'}
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection className="w-full lg:w-1/2 flex justify-center lg:justify-end" delay={0.2}>
              <div className="relative w-full max-w-lg">
                <div className="absolute top-0 -left-4 w-full h-full border-2 border-accent rounded-3xl transform translate-x-4 translate-y-4"></div>
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Doctor with patient" 
                  className="rounded-3xl shadow-2xl relative z-10 object-cover h-[500px] w-full"
                />
                <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-full text-primary">
                      <ShieldCheck size={32} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Terpercaya</h4>
                      <p className="text-gray-500 text-sm font-medium">Distributor Resmi</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Section */}
      <section className="py-20 lg:py-28 bg-[#f8f9fa] border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Vision */}
            <AnimatedSection className="bg-white p-10 lg:p-12 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute -right-10 -top-10 text-primary/5 transform rotate-12 group-hover:rotate-6 transition-transform duration-500">
                <Eye size={200} />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/30">
                  <Eye size={32} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{settings.profil_vision_title || 'Visi Kami'}</h3>
                <p className="text-xl text-gray-600 leading-relaxed font-medium">
                  {settings.profil_vision_desc || 'Menjadi perusahaan distributor alat medis dan estetika terdepan di Indonesia yang dipercaya karena keunggulan produk, inovasi teknologi, dan layanan purna jual yang andal.'}
                </p>
              </div>
            </AnimatedSection>

            {/* Mission */}
            <AnimatedSection className="bg-white p-10 lg:p-12 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow" delay={0.2}>
              <div className="absolute -right-10 -top-10 text-accent/5 transform -rotate-12 group-hover:-rotate-6 transition-transform duration-500">
                <Target size={200} />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-accent/30">
                  <Target size={32} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{settings.profil_mission_title || 'Misi Kami'}</h3>
                <ul className="space-y-5">
                  {(settings.profil_mission_list || 'Menyediakan produk medis dan estetika berstandar internasional yang aman, efektif, dan inovatif.\nMemberikan pelayanan pelanggan yang prima, termasuk konsultasi teknis, pelatihan penggunaan alat, dan layanan perbaikan yang cepat.\nMembangun kemitraan strategis dengan rumah sakit, klinik kecantikan, dan profesional medis di seluruh Indonesia.\nTerus mengikuti perkembangan teknologi medis terkini untuk memberikan solusi yang relevan dengan kebutuhan pasar.\nMendukung peningkatan standar fasilitas kesehatan di Indonesia melalui ketersediaan perangkat berkualitas tinggi.')
                    .split('\n').filter(Boolean).map((mission, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="mt-1 bg-accent/10 p-1 rounded text-accent shrink-0">
                        <CheckCircle2 size={18} />
                      </div>
                      <span className="text-gray-700 text-lg leading-relaxed">{mission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}
