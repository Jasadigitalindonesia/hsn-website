import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata: Metadata = {
  title: "Artikel & Berita Medis Terbaru | PT Harvest Selaras Nusantara",
  description: "Dapatkan informasi terbaru, tips, dan wawasan seputar teknologi medis, alat kesehatan, dan estetika dari ahli kami.",
};
export default async function Page({ params }: { params: any }) {
   const lang = (await Promise.resolve(params))?.lang || "id";
  const dict = await (require("@/i18n/getDictionary").getDictionary(lang as any));
  const pageDict = (dict as any)['news'];

  // Fetch dynamic articles
  const dbArticles = await prisma.newsArticle.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const t = lang === 'en' ? {
    journal: "HSN Journal",
    heroTitle1: "Latest Insights in",
    heroTitle2: "Healthcare",
    heroDesc: "Explore the latest medical technology trends, aesthetic tips, and trusted industry news from our experts.",
    readArticle: "Read Article",
    searchTopic: "Search Topic",
    searchPlaceholder: "Keywords...",
    catTitle: "Journal Categories",
    trending: "Trending Now",
    medicalInsight: "Medical Insight",
    categories: ["Medical Education", "Aesthetic Tech", "Product Info", "Event & Promo", "Regulations"]
  } : {
    journal: "Jurnal HSN",
    heroTitle1: "Wawasan Terbaru Dunia",
    heroTitle2: "Kesehatan",
    heroDesc: "Eksplorasi tren teknologi medis terkini, tips estetika, dan berita industri terpercaya dari para ahli kami.",
    readArticle: "Baca Artikel",
    searchTopic: "Cari Topik",
    searchPlaceholder: "Kata kunci...",
    catTitle: "Kategori Jurnal",
    trending: "Sedang Tren",
    medicalInsight: "Insight Medis",
    categories: ["Edukasi Medis", "Teknologi Estetika", "Info Produk", "Event & Promo", "Regulasi"]
  };

  const articles = dbArticles.map((a: any) => ({
    id: a.id,
    title: a.title,
    date: a.date || new Date(a.createdAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
    author: a.author || "Redaksi HSN",
    img: a.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    desc: a.excerpt || a.content.substring(0, 150) + '...',
    cat: t.medicalInsight
  }));

  const recentPosts = articles.slice(0, 4);
  const categories = t.categories;

  return (
    <main className="flex min-h-screen flex-col bg-[#f8f9fa] overflow-hidden">
      <Navbar lang={lang} dict={dict.navigation} />
      
      {/* Header Banner - Editorial Style */}
      <div className="relative pt-32 pb-24 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-luminosity"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fade-up" className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-6">
              {t.journal}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              {t.heroTitle1} <span className="text-primary italic">{t.heroTitle2}</span>
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl">
              {t.heroDesc}
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content - Blog Grid */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {articles.map((article: any, i: number) => (
                <AnimatedSection key={article.id || i} delay={i * 0.1} animation="fade-up">
                  <article className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 border border-gray-100 group flex flex-col h-full">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                        {article.cat}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-5 font-bold uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-primary" />
                          {article.date}
                        </div>
                      </div>
                      <h3 className="font-black text-gray-900 text-2xl mb-4 leading-snug group-hover:text-primary transition-colors line-clamp-3">
                        <Link href={`/artikel/detail`}>{article.title}</Link>
                      </h3>
                      <p className="text-gray-500 mb-8 flex-grow line-clamp-3 leading-relaxed font-light text-lg">
                        {article.desc}
                      </p>
                      <Link href={`/artikel/detail`} className="inline-flex items-center gap-2 text-gray-900 font-bold hover:text-primary transition-colors mt-auto group/btn">
                        {t.readArticle} <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-20">
              <nav className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                <Link href={`/${lang}/artikel`} className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-gray-400 hover:bg-gray-50 transition-colors">
                  &lt;
                </Link>
                <Link href={`/${lang}/artikel`} className="w-12 h-12 rounded-xl bg-gray-900 text-white font-bold flex items-center justify-center shadow-lg">
                  1
                </Link>
                <Link href={`/${lang}/artikel`} className="w-12 h-12 rounded-xl font-bold text-gray-600 hover:bg-gray-50 hover:text-primary flex items-center justify-center transition-colors">
                  2
                </Link>
                <span className="w-12 text-center text-gray-400 font-bold">...</span>
                <Link href={`/${lang}/artikel`} className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
                  &gt;
                </Link>
              </nav>
            </div>
          </div>
          
          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 xl:w-1/4 space-y-10">
            
            {/* Search Widget */}
            <AnimatedSection animation="slide-right">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-black text-gray-900 mb-6">{t.searchTopic}</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-5 pr-12 py-4 rounded-2xl border-none bg-gray-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-gray-700"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </AnimatedSection>

            {/* Categories Widget */}
            <AnimatedSection animation="slide-right" delay={0.1}>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-black text-gray-900 mb-6">{t.catTitle}</h3>
                <ul className="space-y-3">
                  {categories.map((cat, i) => (
                    <li key={i}>
                      <Link href={`/artikel/kategori`} className="flex items-center justify-between p-3 rounded-xl text-gray-600 hover:bg-primary/5 hover:text-primary transition-all font-bold group">
                        <span className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors"></span>
                          {cat}
                        </span>
                        <span className="text-gray-400 text-xs font-black bg-gray-50 px-2 py-1 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">{Math.floor(Math.random() * 20) + 1}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Trending Posts Widget */}
            <AnimatedSection animation="slide-right" delay={0.2}>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-black text-gray-900 mb-6">{t.trending}</h3>
                <div className="space-y-6">
                  {recentPosts.map((post: any, i: number) => (
                    <div key={i} className="flex gap-5 group items-center">
                      <h4 className="text-3xl font-black text-gray-200 group-hover:text-primary/20 transition-colors italic w-8 text-center shrink-0">
                        {i + 1}
                      </h4>
                      <div>
                        <Link href={`/artikel/detail`} className="font-bold text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                          {post.title}
                        </Link>
                        <span className="text-xs text-primary font-bold uppercase tracking-wider">{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            
          </aside>
          
        </div>
      </div>

      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}
