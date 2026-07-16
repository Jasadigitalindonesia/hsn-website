import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, ChevronRight, Filter } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { prisma } from '@/lib/prisma';

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const sp = await searchParams;
  const currentPage = typeof sp.page === 'string' ? parseInt(sp.page) : 1;
  const dict = require("@/i18n/dictionaries/id.json"); const lang: string = "";
  const productsDict = (dict as any)['products'];

  const categories = productsDict?.categories || [
    "Medical Equipment", "Aesthetic Equipment", "Diagnostic Devices", "Laboratory Equipment"
  ];

  // Fetch dynamic products from Supabase
  const dbProducts = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const allProducts = dbProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    cat: p.category || p.categoryId || 'Uncategorized',
    img: p.image || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80',
    isNew: p.isFeatured
  }));

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.max(1, Math.ceil(allProducts.length / ITEMS_PER_PAGE));

  return (
    <main className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <Navbar lang={lang} dict={dict.navigation} />
      
      {/* Header Banner */}
      <div className="bg-primary pt-16 pb-16 border-b border-primary-hover relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{productsDict?.title || 'Produk Kami'}</h1>
              <div className="flex items-center space-x-2 text-white/80 text-sm font-medium">
                <Link href={`/`} className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-white">{productsDict?.title || 'Produk'}</span>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <input 
                type="text" 
                placeholder="Cari produk..." 
                className="w-full pl-4 pr-10 py-3 rounded-full border-none focus:ring-2 focus:ring-white bg-white/10 text-white placeholder-white/60 outline-none backdrop-blur-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <Filter className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-gray-900">Kategori Produk</h3>
              </div>
              
              <ul className="space-y-2">
                <li>
                  <Link href={`/produk`} className="flex items-center justify-between p-3 rounded-lg bg-primary/5 text-primary font-bold transition-colors">
                    <span>Semua Produk</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </li>
                {categories.map((cat: string, i: number) => (
                  <li key={i}>
                    <Link href={`/kategori/${cat.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center justify-between p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors font-medium group">
                      <span>{cat}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          
          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{productsDict?.heading || 'Solusi Medis Terbaik'}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{productsDict?.desc1}</p>
              <p className="text-gray-600 leading-relaxed">{productsDict?.desc3}</p>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-500 text-sm font-medium">Menampilkan {allProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}–{Math.min(currentPage * ITEMS_PER_PAGE, allProducts.length)} dari {allProducts.length} hasil</p>
              <select className="bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-lg outline-none focus:border-primary text-sm font-medium">
                <option>Urutkan Berdasarkan Kategori</option>
                <option>Produk Terbaru</option>
                <option>Nama (A-Z)</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((prod: any, i: number) => (
                <AnimatedSection key={prod.id || i} delay={i * 0.1}>
                  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                    <div className="relative overflow-hidden aspect-[4/3] bg-gray-50">
                      <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      {prod.isNew && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Featured
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link href={`/produk/detail`} className="bg-white text-primary hover:bg-primary-hover hover:text-white font-bold py-2 px-6 rounded-full transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                          Detail Produk
                        </Link>
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <p className="text-xs text-primary font-bold mb-2 uppercase tracking-wide">{prod.cat}</p>
                      <h3 className="font-bold text-gray-900 text-lg mb-4 flex-grow leading-snug hover:text-primary transition-colors">
                        <Link href={`/produk/detail`}>{prod.name}</Link>
                      </h3>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
              
              {allProducts.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400">
                  <p>Belum ada produk yang ditambahkan.</p>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-2">
                  <Link 
                    href={`/produk?page=${Math.max(1, currentPage - 1)}`} 
                    className={`w-10 h-10 rounded-lg border border-gray-200 text-gray-500 hover:border-[#d9b969] hover:text-[#d9b969] flex items-center justify-center transition-colors ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    &lt;
                  </Link>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link 
                      key={page}
                      href={`/produk?page=${page}`} 
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        currentPage === page 
                          ? 'bg-primary hover:bg-[#d9b969] text-white font-bold shadow-md' 
                          : 'border border-gray-200 text-gray-700 hover:border-[#d9b969] hover:text-[#d9b969] font-medium'
                      }`}
                    >
                      {page}
                    </Link>
                  ))}
                  <Link 
                    href={`/produk?page=${Math.min(totalPages, currentPage + 1)}`} 
                    className={`w-10 h-10 rounded-lg border border-gray-200 text-gray-500 hover:border-[#d9b969] hover:text-[#d9b969] flex items-center justify-center transition-colors ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    &gt;
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}

