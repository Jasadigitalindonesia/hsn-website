import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Eye, ShieldCheck, Award, HeartHandshake, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';

export default async function Page() {
    const dict = require("@/i18n/dictionaries/id.json"); const lang: string = "";
  const aboutDict = (dict as any)['about'];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navbar lang={lang} dict={dict.navigation} />
      
      {/* 1. Page Header (Hero) */}
      <div className="relative pt-32 pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight shadow-sm">
              Tentang PT Harvest Selaras Nusantara
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

      {/* 2. Main About Section (Kenali Lebih Dekat) */}
      <section className="py-20 lg:py-28 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <AnimatedSection className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                <h4 className="text-primary font-bold uppercase tracking-widest mb-3 text-sm relative z-10">Tentang Kami</h4>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 leading-tight relative z-10">
                  Tentang PT Harvest Selaras Nusantara
                </h2>
                
                <div className="prose prose-lg text-gray-600 max-w-none relative z-10">
                  <p className="font-medium text-gray-800 text-xl leading-relaxed mb-6">
                    PT Harvest Selaras Nusantara merupakan distributor B2B alat medis dan estetika yang berkomitmen menghadirkan produk berkualitas internasional untuk mendukung perkembangan industri kesehatan dan estetika di Indonesia.
                  </p>
                  <p className="mb-6 leading-relaxed">
                    Kami percaya bahwa teknologi yang tepat mampu meningkatkan kualitas pelayanan, memperkuat kepercayaan pasien, dan mendukung pertumbuhan bisnis setiap mitra kami. Oleh karena itu, kami tidak hanya menyediakan produk, tetapi juga menghadirkan layanan konsultasi, instalasi, pelatihan, serta dukungan purna jual yang profesional.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <div className="w-full lg:w-1/2">
              <div className="relative grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80" alt="Hospital" className="rounded-2xl w-full h-[300px] object-cover shadow-lg transform translate-y-8" />
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80" alt="Doctor" className="rounded-2xl w-full h-[300px] object-cover shadow-lg" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-2xl z-20 text-center w-48">
                  <div className="text-4xl font-black text-primary mb-1">10+</div>
                  <div className="text-sm font-bold text-gray-800 uppercase tracking-wider">Tahun Pengalaman</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission */}
      <section className="py-20 bg-[#f8f9fa] border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Visi & Misi Perusahaan</h2>
            <div className="w-24 h-1 bg-gold-gradient mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
            <div className="flex-1 bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <Eye className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Visi Kami</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Menjadi distributor Medical & Aesthetic Equipment terpercaya di Indonesia yang menghadirkan solusi inovatif, berkualitas, dan bernilai bagi dunia kesehatan dan estetika.
              </p>
            </div>
            
            <div className="flex-1 bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <Target className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Misi Kami</h3>
              <ul className="space-y-4 text-gray-600 text-lg">
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 shrink-0 mt-0.5" />
                  <span>Menyediakan produk berkualitas internasional.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 shrink-0 mt-0.5" />
                  <span>Memberikan pelayanan profesional kepada setiap pelanggan.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 shrink-0 mt-0.5" />
                  <span>Menghadirkan solusi teknologi yang inovatif.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 shrink-0 mt-0.5" />
                  <span>Menjalin kemitraan jangka panjang.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 shrink-0 mt-0.5" />
                  <span>Mendukung perkembangan industri kesehatan dan estetika di Indonesia.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-primary font-bold uppercase tracking-widest mb-2 text-sm">{aboutDict?.why_us_sub}</h4>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">{aboutDict?.why_us}</h2>
          <div className="w-24 h-1 bg-gold-gradient mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-16 leading-relaxed">
            {aboutDict?.why_us_desc}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {aboutDict?.reasons?.map((reason: any, index: number) => {
              const icons = [<ShieldCheck />, <HeartHandshake />, <Zap />, <Target />, <Award />, <Eye />];
              const Icon = icons[index % icons.length];
              
              return (
                <div key={index} className="text-left bg-[#f8f9fa] p-8 rounded-2xl hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
                  <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                    {Icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{reason.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}

