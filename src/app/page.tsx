import dict from '@/i18n/dictionaries/id.json';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, Mail, Award, HeadphonesIcon, Lightbulb, ThumbsUp } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const revalidate = 0; // Force real-time updates

export default async function Home() {
    const lang: string = "";

  let dbSettings: any[] = [];
  let settings: Record<string, string> = {};
  let featuredProducts: any[] = [];

  try {
    // @ts-ignore
    dbSettings = await prisma.siteSetting.findMany();
    settings = dbSettings.reduce((acc: Record<string, string>, curr: { key: string; value: string }) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  } catch (error) {
    console.error("DB Settings Error:", error);
  }

  const categories = [
    { title: "Aesthetic Equipment", img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=300&q=80" },
    { title: "Medical Equipment", img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300&q=80" },
    { title: "Consumables", img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=300&q=80" },
    { title: "Accessories", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300&q=80" },
  ];

  try {
    const dbFeaturedProducts = await prisma.product.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: { category: true }
    });

    featuredProducts = dbFeaturedProducts.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category?.name || p.categoryId || 'Uncategorized',
      image: p.image || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80',
    }));

    if (featuredProducts.length === 0) {
      const latestProducts = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        take: 3,
        include: { category: true }
      });
      featuredProducts = latestProducts.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category?.name || p.categoryId || 'Uncategorized',
        image: p.image || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80',
      }));
    }
  } catch (error) {
    console.error("DB Products Error:", error);
    // Fallback products if DB fails
    featuredProducts = [
      { id: '1', name: 'Laser Hair Removal System', category: 'Aesthetic', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80' },
      { id: '2', name: 'Ultrasound Scanner', category: 'Medical', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80' },
      { id: '3', name: 'Surgical Light', category: 'Equipment', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80' }
    ];
  }

  const articles = [
    { title: "Pentingnya Kalibrasi Alat Medis Secara Berkala", date: "15 Jul 2026", img: "https://images.unsplash.com/photo-1582719478250-c89af14eb363?auto=format&fit=crop&w=500&q=80" },
    { title: "Inovasi Teknologi USG 4D di Tahun 2026", date: "10 Jul 2026", img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=500&q=80" },
    { title: "Standar Keselamatan Pasien di Ruang ICU", date: "05 Jul 2026", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=500&q=80" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navbar lang={lang} dict={dict.navigation} />
      
      {/* 1. HERO SLIDER */}
      <HeroSlider settings={settings} />

      {/* 2. ABOUT US (Welcome Section) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <AnimatedSection className="w-full lg:w-1/2">
              <h4 className="text-primary font-bold uppercase tracking-widest mb-2 text-sm">{settings.about_subtitle || "Tentang Singkat"}</h4>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight whitespace-pre-line">
                {settings.about_title || "Membangun Masa Depan Industri Medis & Estetika Indonesia"}
              </h2>
              <div className="w-20 h-1 bg-gold-gradient mb-6"></div>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed whitespace-pre-line">
                {settings.about_description || "PT Harvest Selaras Nusantara adalah perusahaan yang bergerak di bidang distribusi alat medis dan teknologi estetika untuk memenuhi kebutuhan rumah sakit, klinik kecantikan, dokter spesialis, hingga fasilitas kesehatan di seluruh Indonesia. Dengan komitmen terhadap kualitas, inovasi, dan pelayanan, kami hadir sebagai mitra terpercaya dalam menghadirkan solusi terbaik bagi industri kesehatan dan estetika."}
              </p>
              <Link href={`/profil`} className="inline-flex items-center gap-2 bg-primary hover:bg-[#b0924b] text-white font-semibold py-3 px-6 rounded transition-colors">
                Baca Selengkapnya <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>
            <AnimatedSection className="w-full lg:w-1/2" delay={0.2}>
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img src={settings.about_image || "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"} alt="About HSN" className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 border-4 border-white opacity-20 m-4 rounded"></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategori Produk Unggulan</h2>
            <div className="w-24 h-1 bg-gold-gradient mx-auto"></div>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Link href={`/kategori`} className="group block relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                  <div className="aspect-square relative overflow-hidden">
                    <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-4">
                      <h3 className="font-bold text-white text-lg text-center group-hover:text-primary transition-colors">{cat.title}</h3>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection className="text-center mt-12" delay={0.2}>
            <Link href={`/kategori`} className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary-hover hover:text-white font-semibold py-3 px-8 rounded transition-colors">
              Lihat Semua Produk
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Produk Pilihan</h2>
            <div className="w-24 h-1 bg-gold-gradient mx-auto"></div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, i: number) => (
              <AnimatedSection key={product.id || i} delay={0.2 + (i * 0.1)}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">{product.category}</div>
                    <h3 className="text-xl font-bold text-primary mb-4 leading-tight">{product.name}</h3>
                    <Link href={`/produk/detail`} className="inline-flex items-center text-primary font-bold hover:text-accent transition-colors">
                      Lihat Detail <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
            {featuredProducts.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-400">
                <p>Belum ada produk unggulan yang ditambahkan.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-20 bg-[#111111] text-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h4 className="text-primary font-bold uppercase tracking-widest mb-2 text-sm">Keunggulan Kami</h4>
            <h2 className="text-3xl font-bold text-white mb-4">Mengapa Memilih Kami?</h2>
            <div className="w-24 h-1 bg-gold-gradient mx-auto"></div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            <AnimatedSection delay={0.1} className="p-6 border border-[#222] rounded-lg hover:border-primary transition-colors bg-[#1a1a1a]">
              <div className="w-16 h-16 bg-[#222] text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Produk Berkualitas Internasional</h3>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="p-6 border border-[#222] rounded-lg hover:border-primary transition-colors bg-[#1a1a1a]">
              <div className="w-16 h-16 bg-[#222] text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <HeadphonesIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Konsultasi Profesional</h3>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3} className="p-6 border border-[#222] rounded-lg hover:border-primary transition-colors bg-[#1a1a1a]">
              <div className="w-16 h-16 bg-[#222] text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Dukungan Teknis Berpengalaman</h3>
            </AnimatedSection>
            
            <AnimatedSection delay={0.4} className="p-6 border border-[#222] rounded-lg hover:border-primary transition-colors bg-[#1a1a1a]">
              <div className="w-16 h-16 bg-[#222] text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <ThumbsUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instalasi & Pelatihan</h3>
            </AnimatedSection>
            
            <AnimatedSection delay={0.5} className="p-6 border border-[#222] rounded-lg hover:border-primary transition-colors bg-[#1a1a1a]">
              <div className="w-16 h-16 bg-[#222] text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <ThumbsUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Layanan Purna Jual</h3>
            </AnimatedSection>
            
            <AnimatedSection delay={0.6} className="p-6 border border-[#222] rounded-lg hover:border-primary transition-colors bg-[#1a1a1a]">
              <div className="w-16 h-16 bg-[#222] text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <ThumbsUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Distribusi ke Seluruh Indonesia</h3>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 6. LATEST ARTICLES */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Berita & Artikel</h2>
              <div className="w-24 h-1 bg-gold-gradient"></div>
            </div>
            <Link href={`/artikel`} className="hidden md:flex items-center gap-2 text-primary font-semibold hover:underline">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art, i) => (
              <AnimatedSection key={i} delay={i * 0.2}>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={art.img} alt={art.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-gray-500 mb-2 block">{art.date}</span>
                    <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2">{art.title}</h3>
                    <Link href={`/artikel`} className="text-primary text-sm font-semibold hover:underline">Baca Selengkapnya</Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection className="mt-8 text-center md:hidden" delay={0.4}>
            <Link href={`/artikel`} className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* 7. PARTNER BISNIS KAMI */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Partner Bisnis Kami</h2>
            <p className="text-gray-600 mb-0 max-w-2xl mx-auto">Kami memiliki jaringan yang luas untuk pendistribusian alat kesehatan berkualitas dengan harga kompetitif.</p>
          </AnimatedSection>
          
          <div className="flex flex-wrap justify-center items-center -mt-4 md:-mt-8">
            {/* Kemenkes & Gakeslab */}
            <div className="w-64 md:w-80 transition-transform duration-300 hover:scale-105">
              <img src="/kemenkes-partner.png" alt="Partner Resmi" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA CONTACT */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url('${settings.cta_bg_image || "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"}')` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 whitespace-pre-line">{settings.cta_title || "Siap Mengembangkan Klinik atau Fasilitas Kesehatan Anda?"}</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto whitespace-pre-line">{settings.cta_description || "Temukan solusi Medical & Aesthetic Equipment terbaik bersama PT Harvest Selaras Nusantara dan tingkatkan kualitas layanan dengan teknologi terpercaya."}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={settings.cta_whatsapp_url || "https://wa.me/6285284222200"} className="bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg">
                Konsultasi Sekarang
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer dict={dict.footer} lang={lang} settings={settings} />
    </main>
  );
}

