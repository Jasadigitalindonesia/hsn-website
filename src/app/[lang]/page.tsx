import dict from '@/i18n/dictionaries/id.json';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, Activity, Heart, Shield, Award, TrendingUp, ShieldCheck, MapPin, MessageCircle, HeadphonesIcon, Lightbulb, ThumbsUp } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { cn } from '@/lib/utils';

export const revalidate = 0; // Force real-time updates

export default async function Page({ params }: { params: any }) {
  const lang = (await Promise.resolve(params))?.lang || "id";
  const dict = await (require("@/i18n/getDictionary").getDictionary(lang as any));

  let dbSettings: any[] = [];
  let settings: Record<string, string> = {};
  let featuredProducts: any[] = [];

  try {
    const rawSettings = await prisma.$queryRawUnsafe('SELECT * FROM "SiteSetting"') as any[];
    settings = rawSettings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  } catch (error) {
    console.error("Fetch Settings DB Error:", error);
  }

  if (lang === 'en') {
    settings.about_subtitle = "Brief About";
    settings.about_title = "Building the Future of Indonesia's Medical Industry";
    settings.about_description = "PT Harvest Selaras Nusantara is a trusted distributor of medical and aesthetic technology. With a commitment to quality and innovation, we are here as the best partner for healthcare facilities throughout Indonesia.";
    settings.cta_title = "Improve Your Healthcare Service Quality Now";
    settings.cta_description = "Consult your clinic or hospital needs with our expert team to get the best solution.";
    settings.hero_title = "Distributor of Medical & Aesthetic Equipments";
  }

  const categories = [
    { title: "Aesthetic Equipment", icon: <TrendingUp className="w-8 h-8 text-primary mb-4" />, img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=600&q=80", colSpan: "col-span-1 md:col-span-2 row-span-2" },
    { title: "Medical Equipment", icon: <Activity className="w-6 h-6 text-primary mb-3" />, img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80", colSpan: "col-span-1" },
    { title: "Consumables", icon: <ShieldCheck className="w-6 h-6 text-primary mb-3" />, img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80", colSpan: "col-span-1" },
    { title: "Accessories", icon: <Award className="w-6 h-6 text-primary mb-3" />, img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80", colSpan: "col-span-1 md:col-span-2" },
  ];

  try {
    const dbFeaturedProducts = await prisma.product.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
      take: 4,
      include: { category: true }
    });

    featuredProducts = dbFeaturedProducts.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category?.name || p.categoryId || 'Uncategorized',
      image: p.image || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    }));

    if (featuredProducts.length === 0) {
      const latestProducts = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        take: 4,
        include: { category: true }
      });
      featuredProducts = latestProducts.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category?.name || p.categoryId || 'Uncategorized',
        image: p.image || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
      }));
    }
  } catch (error) {
    console.error("DB Products Error:", error);
    // Fallback
    featuredProducts = [
      { id: '1', name: 'Laser Hair Removal System', category: 'Aesthetic', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80' },
      { id: '2', name: 'Ultrasound Scanner 4D', category: 'Medical', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80' },
      { id: '3', name: 'Advanced Surgical Light', category: 'Equipment', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80' },
      { id: '4', name: 'Dental Chair Premium', category: 'Dental', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80' }
    ];
  }

  
  const t = lang === 'en' ? {
    aboutSub: "Brief About",
    yearsExp: "Years Experience",
    activeClients: "Active Clients",
    learnMore: "Learn More",
    cert: "Official Certification",
    catTitle: "Product Categories",
    catDesc: "Explore our complete range of high quality medical and aesthetic equipment from world leading brands.",
    viewCat: "View Catalog",
    prodSub: "Featured Products",
    prodTitle: "Latest Technology For You",
    viewAllProd: "View All Products",
    topBrand: "Top Brand",
    fullDetail: "Full Details",
    servTitle: "Premium Service Standards",
    servDesc: "We don't just sell products, we provide comprehensive solutions for the success of your healthcare facility.",
    qualGlobal: "Global Quality",
    qualGlobalDesc: "Products with international certification (FDA, CE, KEMENKES).",
    expertCons: "Expert Consultation",
    expertConsDesc: "Expert team ready to help you choose the right equipment.",
    techSupport: "Technical Support",
    techSupportDesc: "Certified technicians to ensure optimal equipment operation.",
    userTraining: "User Training",
    userTrainingDesc: "Comprehensive training sessions for doctors and operators.",
    afterSales: "Guaranteed After-Sales",
    afterSalesDesc: "Official warranty, original spare parts, and fast repairs.",
    natDist: "National Distribution",
    natDistDesc: "Safe delivery and installation throughout Indonesia.",
    artTitle: "Latest Articles",
    artDesc: "News, tips, and innovations in the medical world.",
    viewAllArt: "View All Articles",
    readMore: "Read More",
    chatWA: "Consultation via WhatsApp",
    sendMsg: "Send Message",
  } : {
    aboutSub: "Tentang Singkat",
    yearsExp: "Tahun Pengalaman",
    activeClients: "Klien Aktif",
    learnMore: "Pelajari Lebih Lanjut",
    cert: "Sertifikasi Resmi",
    catTitle: "Kategori Produk",
    catDesc: "Eksplorasi rangkaian lengkap peralatan medis dan estetika berkualitas tinggi dari brand terkemuka dunia.",
    viewCat: "Lihat Katalog",
    prodSub: "Produk Unggulan",
    prodTitle: "Teknologi Terbaru Untuk Anda",
    viewAllProd: "Lihat Semua Produk",
    topBrand: "Top Brand",
    fullDetail: "Detail Lengkap",
    servTitle: "Standar Pelayanan Premium",
    servDesc: "Kami tidak hanya menjual produk, tetapi memberikan solusi komprehensif untuk kesuksesan fasilitas kesehatan Anda.",
    qualGlobal: "Kualitas Global",
    qualGlobalDesc: "Produk dengan sertifikasi internasional (FDA, CE, KEMENKES).",
    expertCons: "Konsultasi Ahli",
    expertConsDesc: "Tim ahli yang siap membantu Anda memilih alat yang paling tepat.",
    techSupport: "Dukungan Teknis",
    techSupportDesc: "Teknisi bersertifikat untuk memastikan alat beroperasi optimal.",
    userTraining: "Pelatihan Pengguna",
    userTrainingDesc: "Sesi training komprehensif untuk dokter dan operator.",
    afterSales: "Purna Jual Terjamin",
    afterSalesDesc: "Garansi resmi, sparepart asli, dan perbaikan yang cepat.",
    natDist: "Distribusi Nasional",
    natDistDesc: "Pengiriman aman dan instalasi ke seluruh pelosok Indonesia.",
    artTitle: "Artikel Terkini",
    artDesc: "Berita, tips, dan inovasi seputar dunia medis.",
    viewAllArt: "Lihat Semua Artikel",
    readMore: "Baca Selengkapnya",
    chatWA: "Konsultasi WhatsApp",
    sendMsg: "Kirim Pesan",
  };

  const articles = [
    { title: lang === 'en' ? "The Importance of Regular Calibration of Medical Equipment" : "Pentingnya Kalibrasi Alat Medis Secara Berkala", date: "15 Jul 2026", img: "https://images.unsplash.com/photo-1582719478250-c89af14eb363?auto=format&fit=crop&w=600&q=80" },
    { title: lang === 'en' ? "4D Ultrasound Technology Innovations in 2026" : "Inovasi Teknologi USG 4D di Tahun 2026", date: "10 Jul 2026", img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80" },
    { title: lang === 'en' ? "Patient Safety Standards in the ICU" : "Standar Keselamatan Pasien di Ruang ICU", date: "05 Jul 2026", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-white overflow-hidden">
      <Navbar lang={lang} dict={dict.navigation} />
      
      {/* 1. HERO SLIDER */}
      <HeroSlider settings={settings} lang={lang} />

      {/* 2. ABOUT US (Premium Split Layout) */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <AnimatedSection animation="slide-right" className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                {settings.about_subtitle || t.aboutSub}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                {settings.about_title || "Membangun Masa Depan Industri Medis Indonesia"}
              </h2>
              <p className="text-gray-500 mb-8 text-lg leading-relaxed whitespace-pre-line font-light">
                {settings.about_description || "PT Harvest Selaras Nusantara adalah distributor alat medis dan teknologi estetika terpercaya. Dengan komitmen terhadap kualitas dan inovasi, kami hadir sebagai mitra terbaik fasilitas kesehatan di seluruh Indonesia."}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="text-3xl font-black text-gray-900">10+</h4>
                  <p className="text-sm text-gray-500 font-medium">{t.yearsExp}</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="text-3xl font-black text-gray-900">500+</h4>
                  <p className="text-sm text-gray-500 font-medium">{t.activeClients}</p>
                </div>
              </div>

              <Link href={`/${lang}/profil`} className="group inline-flex items-center justify-center gap-3 bg-gray-900 hover:bg-primary text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-xl shadow-gray-900/20 hover:shadow-primary/40">
                {t.learnMore} 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>
            
            <AnimatedSection animation="scale-up" delay={0.2} className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent rounded-[2.5rem] transform translate-x-4 translate-y-4"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img src={settings.about_image || "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"} alt="About HSN" className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">{t.cert}</p>
                      <p className="text-sm font-black text-gray-900">KEMENKES RI</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES (Bento Grid Style) */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">{t.catTitle}</h2>
            <p className="text-gray-500 text-lg">{t.catDesc}</p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {categories.map((cat, i) => (
              <AnimatedSection key={i} delay={i * 0.1} animation="scale-up" className={cn("group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-white", cat.colSpan)}>
                <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white/10 backdrop-blur-md w-max p-3 rounded-2xl mb-4 border border-white/20">
                      {cat.icon}
                    </div>
                    <h3 className="font-black text-white text-2xl mb-2">{cat.title}</h3>
                    <div className="flex items-center text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {t.viewCat} <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>
                <Link href={`/${lang}/kategori`} className="absolute inset-0 z-10"><span className="sr-only">{cat.title}</span></Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (Premium Cards with Glow) */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <AnimatedSection className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-4">{t.prodSub}</div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">{t.prodTitle}</h2>
            </div>
            <Link href={`/${lang}/produk`} className="group flex items-center gap-2 text-gray-600 font-bold hover:text-primary transition-colors">
              {t.viewAllProd} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, i: number) => (
              <AnimatedSection key={product.id || i} delay={i * 0.1} animation="fade-up">
                <Link href={`/${lang}/produk/detail`} className="block group h-full">
                  <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 relative h-full flex flex-col">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                    
                    <div className="relative h-64 overflow-hidden bg-gray-50 p-6 z-10 flex items-center justify-center">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm border border-gray-200">
                        Top Brand
                      </div>
                    </div>
                    
                    <div className="p-6 relative z-10 flex flex-col flex-grow">
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{product.category}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                      
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-400 group-hover:text-gray-900 transition-colors">{t.fullDetail}</span>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US (Dark Mode Section with Neon accents) */}
      <section className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.2 }}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">{t.servTitle.split(" ")[0]} {t.servTitle.split(" ")[1]} <span className="text-primary">{t.servTitle.split(" ").slice(2).join(" ") || "Premium"}</span></h2>
            <p className="text-gray-400 text-lg">{t.servDesc}</p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Award className="w-8 h-8" />, title: t.qualGlobal, desc: t.qualGlobalDesc },
              { icon: <HeadphonesIcon className="w-8 h-8" />, title: t.expertCons, desc: t.expertConsDesc },
              { icon: <Activity className="w-8 h-8" />, title: t.techSupport, desc: t.techSupportDesc },
              { icon: <TrendingUp className="w-8 h-8" />, title: t.userTraining, desc: t.userTrainingDesc },
              { icon: <ShieldCheck className="w-8 h-8" />, title: t.afterSales, desc: t.afterSalesDesc },
              { icon: <MapPin className="w-8 h-8" />, title: t.natDist, desc: t.natDistDesc },
            ].map((feature, i) => (
              <AnimatedSection key={i} delay={i * 0.1} animation="fade-up">
                <div className="group p-8 rounded-3xl bg-[#141414] border border-[#2a2a2a] hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(217,185,105,0.1)] group-hover:shadow-[0_0_30px_rgba(217,185,105,0.4)]">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LATEST ARTICLES (Editorial Style) */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">{t.artTitle}</h2>
              <p className="text-gray-500">{t.artDesc}</p>
            </div>
            <Link href={`/${lang}/artikel`} className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-gray-900 transition-colors">
              {t.viewAllArt} <ArrowRight className="w-5 h-5" />
            </Link>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art, i) => (
              <AnimatedSection key={i} delay={i * 0.1} animation="fade-up">
                <Link href={`/${lang}/artikel`} className="group block">
                  <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-900">
                        {art.date}
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="font-bold text-gray-900 text-xl mb-4 line-clamp-2 group-hover:text-primary transition-colors leading-snug">{art.title}</h3>
                      <div className="inline-flex items-center text-primary font-bold text-sm">
                        {t.readMore} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA CONTACT (Modern Glass Morphism Banner) */}
      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('${settings.cta_bg_image || "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"}')` }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div> {/* Overlay */}
        
        <div className="container mx-auto px-4 relative z-10 flex justify-center">
          <AnimatedSection animation="scale-up" className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 md:p-16 rounded-[3rem] text-center max-w-4xl shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 whitespace-pre-line tracking-tight">{settings.cta_title || "Tingkatkan Kualitas Layanan Kesehatan Anda Sekarang"}</h2>
            <p className="text-gray-200 text-lg mb-10 max-w-2xl mx-auto whitespace-pre-line">{settings.cta_description || "Konsultasikan kebutuhan klinik atau rumah sakit Anda dengan tim ahli kami untuk mendapatkan solusi terbaik."}</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={settings.cta_whatsapp_url || "https://wa.me/6285284222200"} className="bg-primary hover:bg-[#b0924b] text-white font-bold py-5 px-10 rounded-full transition-colors flex items-center justify-center gap-3 shadow-lg shadow-primary/30 text-lg">
                <MessageCircle className="w-6 h-6" /> {t.chatWA}
              </a>
              <Link href={`/${lang || 'id'}/kontak`} className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-5 px-10 rounded-full transition-colors flex items-center justify-center gap-3 text-lg">{t.sendMsg}</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer dict={dict.footer} lang={lang} settings={settings} />
    </main>
  );
}
