import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, ChevronRight, Filter, ShoppingBag, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { prisma } from '@/lib/prisma';
import { cn } from '@/lib/utils';

export default async function Page({ params, searchParams }: { params: any, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const sp = await searchParams;
  const currentPage = typeof sp.page === 'string' ? parseInt(sp.page) : 1;
   const lang = (await Promise.resolve(params))?.lang || "id";
  const dict = await (require("@/i18n/getDictionary").getDictionary(lang as any));
  const productsDict = (dict as any)['products'];

  const categories = productsDict?.categories || [
    "Medical Equipment", "Aesthetic Equipment", "Diagnostic Devices", "Laboratory Equipment"
  ];

  // Fetch dynamic products
  const dbProducts = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const allProducts = dbProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    cat: p.category || p.categoryId || 'Uncategorized',
    img: p.image || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    isNew: p.isFeatured
  }));

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.max(1, Math.ceil(allProducts.length / ITEMS_PER_PAGE));

  const t = lang === 'en' ? {
    title: "Product Collection",
    home: "Home",
    prod: "Products",
    search: "Search medical or aesthetic equipment...",
    cat: "Categories",
    allProd: "All Products",
    techTitle: "Best Medical & Aesthetic Technology",
    techDesc: "PT Harvest Selaras Nusantara presents a variety of selected products from trusted brands that meet international quality standards.",
    warranty: "Official Warranty",
    showing: "Showing",
    of: "of",
    sortByCat: "Sort by Category",
    newest: "Newest Products",
    nameAz: "Name (A-Z)",
    new: "New",
    viewDetails: "View Details",
    noProd: "No products have been added yet."
  } : {
    title: "Koleksi Produk",
    home: "Beranda",
    prod: "Produk",
    search: "Cari alat medis atau estetika...",
    cat: "Kategori",
    allProd: "Semua Produk",
    techTitle: "Teknologi Medis & Estetika Terbaik",
    techDesc: "PT Harvest Selaras Nusantara menghadirkan berbagai produk pilihan dari brand terpercaya yang telah memenuhi standar kualitas internasional.",
    warranty: "Garansi Resmi",
    showing: "Menampilkan",
    of: "dari",
    sortByCat: "Urutkan Berdasarkan Kategori",
    newest: "Produk Terbaru",
    nameAz: "Nama (A-Z)",
    new: "Baru",
    viewDetails: "Lihat Detail",
    noProd: "Belum ada produk yang ditambahkan."
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#f8f9fa] overflow-hidden">
      <Navbar lang={lang} dict={dict.navigation} />
      
      {/* Header Banner - Glassmorphism */}
      <div className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fade-up" className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-md">{t.title}</h1>
              <div className="flex items-center space-x-3 text-white/90 text-sm font-bold tracking-wide uppercase">
                <Link href={`/${lang}`} className="hover:text-white transition-colors">{t.home}</Link>
                <span>/</span>
                <span className="text-white">{t.prod}</span>
              </div>
            </div>
            
            {/* Search Bar - Glassmorphism */}
            <div className="relative w-full md:w-96">
              <input 
                type="text" 
                placeholder={t.search}
                className="w-full pl-6 pr-12 py-4 rounded-2xl border border-white/20 bg-white/10 text-white placeholder-white/70 outline-none backdrop-blur-md focus:bg-white/20 focus:border-white/40 transition-all font-medium shadow-lg"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar - Pro Max Style */}
          <aside className="w-full lg:w-1/4 flex-shrink-0">
            <AnimatedSection animation="slide-right" className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 sticky top-32">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Filter className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Kategori</h3>
              </div>
              
              <ul className="space-y-3">
                <li>
                  <Link href={`/${lang}/produk`} className="group flex items-center justify-between p-4 rounded-2xl bg-gray-900 text-white font-bold transition-all shadow-md hover:shadow-lg hover:bg-primary">
                    <span className="flex items-center gap-3"><ShoppingBag className="w-4 h-4 text-primary group-hover:text-white transition-colors" /> Semua Produk</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </li>
                {categories.map((cat: string, i: number) => (
                  <li key={i}>
                    <Link href={`/kategori/${cat.toLowerCase().replace(/\s+/g, '-')}`} className="group flex items-center justify-between p-4 rounded-2xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all font-semibold">
                      <span>{cat}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </aside>
          
          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <AnimatedSection animation="fade-up" className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10 mb-10">
              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">{t.techTitle}</h2>
              <p className="text-gray-500 leading-relaxed mb-6 font-light text-lg">{t.techDesc}</p>
              
              <div className="flex flex-wrap gap-3">
                {['FDA Approved', 'CE Mark', 'KEMENKES RI', t.warranty].map(badge => (
                  <span key={badge} className="px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider border border-primary/10">
                    {badge}
                  </span>
                ))}
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={0.1} className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-sm font-bold">{t.showing} <span className="text-gray-900">{allProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}–{Math.min(currentPage * ITEMS_PER_PAGE, allProducts.length)}</span> {t.of} {allProducts.length} {t.prod.toLowerCase()}</p>
              <select className="bg-gray-50 border-none text-gray-900 py-3 px-6 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold cursor-pointer transition-shadow">
                <option>{t.sortByCat}</option>
                <option>{t.newest}</option>
                <option>{t.nameAz}</option>
              </select>
            </AnimatedSection>

            {/* Product Grid - Pro Max Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((prod: any, i: number) => (
                <AnimatedSection key={prod.id || i} delay={i * 0.1} animation="scale-up">
                  <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group flex flex-col h-full">
                    <div className="relative overflow-hidden aspect-[4/3] bg-gray-50 p-6 flex items-center justify-center">
                      {/* Glow overlay */}
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <img src={prod.img} alt={prod.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 z-10" />
                      
                      {prod.isNew && (
                        <div className="absolute top-4 left-4 bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider z-20 shadow-md">
                          {t.new}
                        </div>
                      )}
                      
                      {/* Hover Action */}
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                        <Link href={`/${lang}/produk/detail`} className="bg-white text-gray-900 hover:text-primary font-bold py-3 px-8 rounded-full transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl flex items-center gap-2">
                          {t.viewDetails} <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col relative z-10 bg-white">
                      <p className="text-xs text-primary font-bold mb-3 uppercase tracking-wider">{prod.cat}</p>
                      <h3 className="font-black text-gray-900 text-xl mb-4 flex-grow leading-snug group-hover:text-primary transition-colors">
                        <Link href={`/${lang}/produk/detail`} className="line-clamp-2">{prod.name}</Link>
                      </h3>
                      <div className="w-8 h-1 bg-gray-200 rounded-full group-hover:bg-primary transition-colors group-hover:w-16 duration-300"></div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
              
              {allProducts.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-gray-100">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium text-lg">{t.noProd}</p>
                </div>
              )}
            </div>
            
            {/* Pagination - Premium Style */}
            {totalPages > 1 && (
              <AnimatedSection animation="fade-up" delay={0.2} className="flex justify-center mt-16">
                <nav className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                  <Link 
                    href={`/produk?page=${Math.max(1, currentPage - 1)}`} 
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all font-bold",
                      currentPage === 1 ? "text-gray-300 pointer-events-none" : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                    )}
                  >
                    &lt;
                  </Link>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link 
                      key={page}
                      href={`/produk?page=${page}`} 
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all font-bold text-lg",
                        currentPage === page 
                          ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20" 
                          : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                      )}
                    >
                      {page}
                    </Link>
                  ))}
                  <Link 
                    href={`/produk?page=${Math.min(totalPages, currentPage + 1)}`} 
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all font-bold",
                      currentPage === totalPages ? "text-gray-300 pointer-events-none" : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                    )}
                  >
                    &gt;
                  </Link>
                </nav>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>

      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}
