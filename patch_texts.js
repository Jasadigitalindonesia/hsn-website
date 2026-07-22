const fs = require('fs');

const pagePath = 'src/app/[lang]/page.tsx';
let c = fs.readFileSync(pagePath, 'utf8');

const tInject = `
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
`;

c = c.replace(/const articles = \[/, tInject + '\n  const articles = [');

// Now replace hardcoded texts
c = c.replace(/{settings\.about_subtitle \|\| "Tentang Singkat"}/g, '{settings.about_subtitle || t.aboutSub}');
c = c.replace(/Tahun Pengalaman/g, '{t.yearsExp}');
c = c.replace(/Klien Aktif/g, '{t.activeClients}');
c = c.replace(/Pelajari Lebih Lanjut/g, '{t.learnMore}');
c = c.replace(/Sertifikasi Resmi/g, '{t.cert}');

c = c.replace(/Kategori Produk/g, '{t.catTitle}');
c = c.replace(/Eksplorasi rangkaian lengkap peralatan medis dan estetika berkualitas tinggi dari brand terkemuka dunia\./g, '{t.catDesc}');
c = c.replace(/Lihat Katalog/g, '{t.viewCat}');

c = c.replace(/Produk Unggulan/g, '{t.prodSub}');
c = c.replace(/Teknologi Terbaru Untuk Anda/g, '{t.prodTitle}');
c = c.replace(/Lihat Semua Produk/g, '{t.viewAllProd}');
c = c.replace(/>Top Brand</g, '>{t.topBrand}<');
c = c.replace(/>Detail Lengkap</g, '>{t.fullDetail}<');

c = c.replace(/Standar Pelayanan <span className="text-primary">Premium<\/span>/g, '{t.servTitle.split(" ")[0]} {t.servTitle.split(" ")[1]} <span className="text-primary">{t.servTitle.split(" ").slice(2).join(" ") || "Premium"}</span>');
c = c.replace(/Kami tidak hanya menjual produk, tetapi memberikan solusi komprehensif untuk kesuksesan fasilitas kesehatan Anda\./g, '{t.servDesc}');

c = c.replace(/Kualitas Global/g, '{t.qualGlobal}');
c = c.replace(/Produk dengan sertifikasi internasional \(FDA, CE, KEMENKES\)\./g, '{t.qualGlobalDesc}');
c = c.replace(/Konsultasi Ahli/g, '{t.expertCons}');
c = c.replace(/Tim ahli yang siap membantu Anda memilih alat yang paling tepat\./g, '{t.expertConsDesc}');
c = c.replace(/Dukungan Teknis/g, '{t.techSupport}');
c = c.replace(/Teknisi bersertifikat untuk memastikan alat beroperasi optimal\./g, '{t.techSupportDesc}');
c = c.replace(/Pelatihan Pengguna/g, '{t.userTraining}');
c = c.replace(/Sesi training komprehensif untuk dokter dan operator\./g, '{t.userTrainingDesc}');
c = c.replace(/Purna Jual Terjamin/g, '{t.afterSales}');
c = c.replace(/Garansi resmi, sparepart asli, dan perbaikan yang cepat\./g, '{t.afterSalesDesc}');
c = c.replace(/Distribusi Nasional/g, '{t.natDist}');
c = c.replace(/Pengiriman aman dan instalasi ke seluruh pelosok Indonesia\./g, '{t.natDistDesc}');

c = c.replace(/Artikel Terkini/g, '{t.artTitle}');
c = c.replace(/Berita, tips, dan inovasi seputar dunia medis\./g, '{t.artDesc}');
c = c.replace(/Lihat Semua Artikel/g, '{t.viewAllArt}');
c = c.replace(/Baca Selengkapnya/g, '{t.readMore}');

c = c.replace(/Konsultasi WhatsApp/g, '{t.chatWA}');
c = c.replace(/>\s*Kirim Pesan\s*<\/Link>/g, '>{t.sendMsg}</Link>');

// Link hrefs update
c = c.replace(/href={`\/produk`}/g, 'href={`/${lang}/produk`}');
c = c.replace(/href={`\/kontak`}/g, 'href={`/${lang}/kontak`}');
c = c.replace(/href={`\/profil`}/g, 'href={`/${lang}/profil`}');
c = c.replace(/href={`\/artikel`}/g, 'href={`/${lang}/artikel`}');
c = c.replace(/href={`\/kategori`}/g, 'href={`/${lang}/kategori`}');
c = c.replace(/href={`\/produk\/detail`}/g, 'href={`/${lang}/produk/detail`}');

// HeroSlider update
c = c.replace(/<HeroSlider settings={settings} \/>/, '<HeroSlider settings={settings} lang={lang} />');

fs.writeFileSync(pagePath, c);

const heroPath = 'src/components/HeroSlider.tsx';
let hero = fs.readFileSync(heroPath, 'utf8');
hero = hero.replace(/export default function HeroSlider\({ settings }: { settings\?: any }\) {/, 'export default function HeroSlider({ settings, lang }: { settings?: any, lang?: string }) {');
hero = hero.replace(/Jelajahi Produk/, '{lang === "en" ? "Explore Products" : "Jelajahi Produk"}');
hero = hero.replace(/Hubungi Kami/, '{lang === "en" ? "Contact Us" : "Hubungi Kami"}');
hero = hero.replace(/href={`\/produk`}/g, 'href={`/${lang || "id"}/produk`}');
hero = hero.replace(/href={`\/kontak`}/g, 'href={`/${lang || "id"}/kontak`}');
fs.writeFileSync(heroPath, hero);
console.log('Done!');
