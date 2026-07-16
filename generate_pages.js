const fs = require('fs');
const path = require('path');
const pages = [
  {name: 'profil', key: 'profile'},
  {name: 'kategori', key: 'products'},
  {name: 'produk', key: 'products'},
  {name: 'e-katalog', key: 'ekatalog'},
  {name: 'cdakb', key: 'cdakb'},
  {name: 'berita', key: 'news'},
  {name: 'promo', key: 'promo'},
  {name: 'kontak', key: 'contact'}
];
pages.forEach(p => {
  const dir = path.join('c:/Users/USER/Desktop/hsn-website/src/app', '[lang]', p.name);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});
  const content = `import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n.config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);
  const pageDict = (dict as any)['${p.key}'];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navbar lang={lang} dict={dict.navigation} />
      <div className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{pageDict?.title || '${p.name}'}</h1>
          <div className="w-24 h-1 bg-gold-gradient mx-auto"></div>
        </div>
      </div>
      <div className="flex-grow py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-primary mb-8">{pageDict?.heading || ''}</h2>
          <div className="prose prose-lg text-gray-600 space-y-6">
            {pageDict?.p1 && <p>{pageDict.p1}</p>}
            {pageDict?.p2 && <p>{pageDict.p2}</p>}
            {pageDict?.p3 && <p>{pageDict.p3}</p>}
            {pageDict?.p4 && <p>{pageDict.p4}</p>}
            {pageDict?.desc1 && <p>{pageDict.desc1}</p>}
            {pageDict?.desc2 && <p>{pageDict.desc2}</p>}
            {pageDict?.categories && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {pageDict.categories.map((cat: string, i: number) => (
                  <li key={i} className="flex items-center text-primary font-medium">
                    <span className="w-2 h-2 rounded-full bg-primary mr-3"></span> {cat}
                  </li>
                ))}
              </ul>
            )}
            {pageDict?.desc3 && <p className="mt-8">{pageDict.desc3}</p>}
          </div>
        </div>
      </div>
      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}
`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});
