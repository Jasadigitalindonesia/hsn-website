import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Eye, ShieldCheck, Award, HeartHandshake, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tentang Kami | PT Harvest Selaras Nusantara",
  description: "Pelajari lebih lanjut tentang PT Harvest Selaras Nusantara, distributor B2B terkemuka alat medis dan estetika berstandar internasional di Indonesia.",
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
    home: "Home",
    about: "About Us",
    quality: "No. 1 Quality",
    distributor: "Official Distributor"
  } : {
    home: "Beranda",
    about: "Tentang Kami",
    quality: "Kualitas No. 1",
    distributor: "Distributor Resmi"
  };

  if (lang === 'en') {
    settings.profil_hero_title = "Get to Know HSN Closer";
    settings.profil_about_subtitle = "Our History";
    settings.profil_about_title = "Dedication to Indonesian Healthcare";
    settings.profil_about_desc1 = "PT Harvest Selaras Nusantara is a trusted B2B distributor presenting world-class medical and aesthetic device innovations.";
    settings.profil_about_desc2 = "We believe that the right technology can improve service quality, strengthen patient trust, and support the business growth of our partners. Therefore, we not only provide products but also offer professional consultation, installation, training, and after-sales support.";
    settings.profil_about_desc3 = "With a team of reliable technicians and a wide distribution network, HSN is ready to be your strategic partner.";
    settings.profil_vision_title = "Our Vision";
    settings.profil_vision_desc = "To become the leading medical and aesthetic device distributor company in Indonesia trusted for product excellence, technological innovation, and reliable after-sales service.";
    settings.profil_mission_title = "Our Mission";
    settings.profil_mission_list = "Providing international standard medical and aesthetic products that are safe, effective, and innovative.\nProviding excellent customer service, including technical consultation, device usage training, and fast repair services.";
  }

  return (
    <main className="flex min-h-screen flex-col bg-white overflow-hidden">
      <Navbar lang={lang} dict={dict.navigation} />
      
      {/* 1. Page Header - Glassmorphism */}
      <div className="relative pt-32 pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection animation="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
              {settings.profil_hero_title || (lang === 'en' ? 'Get to Know HSN Closer' : 'Mengenal HSN Lebih Dekat')}
            </h1>
            <div className="flex items-center justify-center space-x-3 text-white/90 text-sm font-bold uppercase tracking-widest">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">{t.home}</Link>
              <span className="opacity-50">/</span>
              <span className="text-white">{t.about}</span>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* 2. Main About Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <AnimatedSection animation="slide-right" className="w-full lg:w-1/2">
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6">
                  {settings.profil_about_subtitle || 'Sejarah Kami'}
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tight">
                  {settings.profil_about_title || 'Dedikasi Untuk Kesehatan Indonesia'}
                </h2>
                
                <div className="prose prose-lg text-gray-500 max-w-none relative z-10 space-y-6">
                  <p className="font-medium text-gray-800 text-2xl leading-relaxed">
                    {settings.profil_about_desc1 || 'PT Harvest Selaras Nusantara merupakan distributor B2B terpercaya yang menghadirkan inovasi alat medis dan estetika kelas dunia.'}
                  </p>
                  <p className="leading-relaxed font-light">
                    {settings.profil_about_desc2 || 'Kami percaya bahwa teknologi yang tepat mampu meningkatkan kualitas pelayanan, memperkuat kepercayaan pasien, dan mendukung pertumbuhan bisnis setiap mitra kami. Oleh karena itu, kami tidak hanya menyediakan produk, tetapi juga menghadirkan layanan konsultasi, instalasi, pelatihan, serta dukungan purna jual yang profesional.'}
                  </p>
                  <p className="leading-relaxed font-light">
                    {settings.profil_about_desc3 || 'Dengan tim teknisi handal dan jaringan distribusi luas, HSN siap menjadi partner strategis Anda.'}
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="scale-up" delay={0.2} className="w-full lg:w-1/2">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-[3rem] transform translate-x-6 translate-y-6"></div>
                <div className="relative rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Doctor with patient" 
                    className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                
                {/* Floating Card */}
                <div className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 hidden md:block">
                  <div className="flex items-center gap-5">
                    <div className="bg-primary p-4 rounded-2xl text-white shadow-lg shadow-primary/40">
                      <ShieldCheck size={32} />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-xl">{t.quality}</h4>
                      <p className="text-gray-500 font-medium">{t.distributor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Section */}
      <section className="py-32 bg-[#0a0a0a] text-white relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)' , backgroundSize: '40px 40px'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-primary/20 blur-[150px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <AnimatedSection animation="fade-up" className="bg-[#141414] p-12 rounded-[3rem] border border-[#2a2a2a] relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="absolute -right-12 -top-12 text-primary/5 transform rotate-12 group-hover:rotate-6 transition-transform duration-700">
                <Eye size={250} />
              </div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-white transition-colors duration-500 shadow-[0_0_30px_rgba(217,185,105,0.1)]">
                  <Eye size={40} />
                </div>
                <h3 className="text-4xl font-black text-white mb-6 tracking-tight">{settings.profil_vision_title || 'Visi Kami'}</h3>
                <p className="text-xl text-gray-400 leading-relaxed font-light">
                  {settings.profil_vision_desc || 'Menjadi perusahaan distributor alat medis dan estetika terdepan di Indonesia yang dipercaya karena keunggulan produk, inovasi teknologi, dan layanan purna jual yang andal.'}
                </p>
              </div>
            </AnimatedSection>

            {/* Mission */}
            <AnimatedSection animation="fade-up" delay={0.2} className="bg-[#141414] p-12 rounded-[3rem] border border-[#2a2a2a] relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="absolute -right-12 -top-12 text-primary/5 transform -rotate-12 group-hover:-rotate-6 transition-transform duration-700">
                <Target size={250} />
              </div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-white transition-colors duration-500 shadow-[0_0_30px_rgba(217,185,105,0.1)]">
                  <Target size={40} />
                </div>
                <h3 className="text-4xl font-black text-white mb-8 tracking-tight">{settings.profil_mission_title || 'Misi Kami'}</h3>
                <ul className="space-y-6">
                  {(settings.profil_mission_list || 'Menyediakan produk medis dan estetika berstandar internasional yang aman, efektif, dan inovatif.\nMemberikan pelayanan pelanggan yang prima, termasuk konsultasi teknis, pelatihan penggunaan alat, dan layanan perbaikan yang cepat.')
                    .split('\n').filter(Boolean).map((mission: string, index: number) => (
                    <li key={index} className="flex items-start gap-5">
                      <div className="mt-1.5 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-gray-400 text-lg leading-relaxed font-light">{mission}</span>
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
