import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function Page({ params }: { params: any }) {
  const lang = (await Promise.resolve(params))?.lang || "id";
  const dict = await (require("@/i18n/getDictionary").getDictionary(lang as any));
  const pageDict = (dict as any)['products'];

  const t = lang === 'en' ? {
    title: "Product Solutions for Your Needs",
    desc: "We offer various product categories designed to meet the needs of modern healthcare facilities and aesthetic clinics.",
    aesDesc: "Modern aesthetic devices for various facial, skin, and body care needs.",
    medDesc: "High-quality medical equipment to support professional healthcare services.",
    consDesc: "Consumables that support medical and aesthetic procedures safely and efficiently.",
    accDesc: "Various supporting equipment to ensure optimal device performance."
  } : {
    title: "Solusi Produk Sesuai Kebutuhan Anda",
    desc: "Kami menghadirkan berbagai kategori produk yang dirancang untuk memenuhi kebutuhan fasilitas kesehatan dan klinik estetika modern.",
    aesDesc: "Perangkat estetika modern untuk berbagai kebutuhan perawatan wajah, kulit, dan tubuh.",
    medDesc: "Peralatan medis berkualitas tinggi untuk menunjang pelayanan kesehatan profesional.",
    consDesc: "Produk habis pakai yang mendukung prosedur medis dan estetika secara aman dan efisien.",
    accDesc: "Berbagai perlengkapan pendukung untuk memastikan performa perangkat tetap optimal."
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navbar lang={lang} dict={dict.navigation} />
      <div className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{pageDict?.title || 'kategori'}</h1>
          <div className="w-24 h-1 bg-gold-gradient mx-auto"></div>
        </div>
      </div>
      <div className="flex-grow py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-primary mb-8">{t.title}</h2>
          <div className="prose prose-lg text-gray-600 space-y-6">
            <p>{t.desc}</p>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <li className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primary mr-3"></span> Aesthetic Equipment
                </h3>
                <p className="text-gray-600">{t.aesDesc}</p>
              </li>
              <li className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primary mr-3"></span> Medical Equipment
                </h3>
                <p className="text-gray-600">{t.medDesc}</p>
              </li>
              <li className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primary mr-3"></span> Consumables
                </h3>
                <p className="text-gray-600">{t.consDesc}</p>
              </li>
              <li className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primary mr-3"></span> Accessories
                </h3>
                <p className="text-gray-600">{t.accDesc}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}
