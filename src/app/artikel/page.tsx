import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Artikel & Berita Medis Terbaru | PT Harvest Selaras Nusantara",
  description: "Dapatkan informasi terbaru, tips, dan wawasan seputar teknologi medis, alat kesehatan, dan estetika dari ahli kami.",
};
export default async function Page() {
    const dict = require("@/i18n/dictionaries/id.json"); const lang: string = "";
  const pageDict = (dict as any)['news']; // we map "news" to Artikel

  // Fetch dynamic articles from Supabase
  const dbArticles = await prisma.newsArticle.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const articles = dbArticles.map((a: any) => ({
    id: a.id,
    title: a.title,
    date: a.date || new Date(a.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }),
    author: a.author || "Admin",
    img: a.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    desc: a.excerpt || a.content.substring(0, 150) + '...',
    cat: 'Berita' // We don't have categories for news yet in schema, default to Berita
  }));

  const recentPosts = articles.slice(0, 3);
  const categories = ["Edukasi Medis", "Teknologi Estetika", "Info Produk", "Event & Promo", "Regulasi Kesehatan"];

  return (
    <main className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <Navbar lang={lang} dict={dict.navigation} />
      
      {/* Header Banner */}
      <div className="bg-primary pt-16 pb-16 border-b border-primary-hover relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 shadow-sm">Artikel & Wawasan</h1>
            <div className="w-24 h-1 bg-white/50 mx-auto rounded-full mb-6"></div>
            <div className="flex justify-center items-center space-x-2 text-white/80 text-sm font-medium">
              <Link href={`/`} className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Artikel</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content - Blog Grid */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel & Wawasan</h2>
              <p className="text-gray-600 leading-relaxed">
                Ikuti berbagai informasi terbaru mengenai perkembangan teknologi medis dan estetika, inovasi produk, serta tips yang bermanfaat bagi klinik dan fasilitas kesehatan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.map((article: any, i: number) => (
                <article key={article.id || i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {article.cat}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary" />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-primary" />
                        {article.author}
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/artikel/detail`}>{article.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
                      {article.desc}
                    </p>
                    <Link href={`/artikel/detail`} className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-hover transition-colors mt-auto group/btn">
                      Baca Selengkapnya <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
              {articles.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400">
                  <p>Belum ada artikel yang ditambahkan.</p>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-2">
                <Link href={`/artikel`} className="w-10 h-10 rounded-lg border border-gray-200 text-gray-500 hover:border-primary hover:text-primary flex items-center justify-center transition-colors">
                  &lt;
                </Link>
                <Link href={`/artikel`} className="w-10 h-10 rounded-lg bg-primary text-white font-bold flex items-center justify-center shadow-md">
                  1
                </Link>
                <Link href={`/artikel`} className="w-10 h-10 rounded-lg border border-gray-200 text-gray-700 hover:border-primary hover:text-primary font-medium flex items-center justify-center transition-colors">
                  2
                </Link>
                <span className="text-gray-400">...</span>
                <Link href={`/artikel`} className="w-10 h-10 rounded-lg border border-gray-200 text-gray-500 hover:border-primary hover:text-primary flex items-center justify-center transition-colors">
                  &gt;
                </Link>
              </nav>
            </div>
          </div>
          
          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 xl:w-1/4 space-y-8">
            
            {/* Search Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                Cari Artikel
              </h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ketik kata kunci..." 
                  className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-gray-50"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                Kategori
              </h3>
              <ul className="space-y-2">
                {categories.map((cat, i) => (
                  <li key={i}>
                    <Link href={`/artikel/kategori`} className="flex items-center justify-between p-2 rounded-lg text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors font-medium group">
                      <span className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                        {cat}
                      </span>
                      <span className="bg-gray-100 text-gray-500 text-xs py-1 px-2 rounded-md group-hover:bg-primary/10 group-hover:text-primary">{Math.floor(Math.random() * 15) + 1}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                Artikel Terbaru
              </h3>
              <div className="space-y-4">
                {recentPosts.map((post: any, i: number) => (
                  <div key={i} className="flex gap-4 group">
                    <Link href={`/artikel/detail`} className="shrink-0">
                      <div className="w-20 h-20 rounded-lg overflow-hidden">
                        <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link href={`/artikel/detail`} className="font-bold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                      </Link>
                      <span className="text-xs text-gray-500 font-medium">{post.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </aside>
          
        </div>
      </div>

      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}

