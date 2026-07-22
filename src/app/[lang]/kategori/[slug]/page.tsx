import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dict = require("@/i18n/dictionaries/id.json"); const lang: string = "";
  
  // Format slug to readable name if needed
  const categoryName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <main className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <Navbar lang={lang} dict={dict.navigation} />
      
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Kategori: {categoryName}</h1>
          <p className="text-gray-600 mb-10 text-lg">Halaman filter produk berdasarkan kategori sedang dalam tahap pengembangan CMS. (Placeholder)</p>
          
          <Link href={`/produk`} className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Semua Produk
          </Link>
        </div>
      </div>

      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}
