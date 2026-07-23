const fs = require('fs');
const path = require('path');

function processFile(filePath, replacements) {
    let c = fs.readFileSync(filePath, 'utf8');
    
    // Fix signature if missing params
    c = c.replace(/export default async function Page\(\) \{/, 'export default async function Page({ params }: { params: any }) {');
    c = c.replace(/export default async function Page\(\{ searchParams \}: \{ searchParams: Promise<\{ \[key: string\]: string \| string\[\] \| undefined \}> \}\) \{/, 'export default async function Page({ params, searchParams }: { params: any, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {');
    
    // Fix kategori specifically
    if (filePath.includes('kategori')) {
        c = c.replace(/const dict = require\("@\/i18n\/dictionaries\/id\.json"\); const lang: string = "";/, '');
        if (!c.includes('const lang =')) {
            c = c.replace(/export default async function Page\(\{ params \}: \{ params: any \}\) \{/, 'export default async function Page({ params }: { params: any }) {\n  const lang = (await Promise.resolve(params))?.lang || "id";\n  const dict = await (require("@/i18n/getDictionary").getDictionary(lang as any));');
        }
    }

    // Common href fixes
    c = c.replace(/href={`\/`}/g, 'href={`/${lang}`}');
    c = c.replace(/href={`\/produk`}/g, 'href={`/${lang}/produk`}');
    c = c.replace(/href={`\/kategori`/g, 'href={`/${lang}/kategori`');
    c = c.replace(/href={`\/katalog`}/g, 'href={`/${lang}/katalog`}');
    c = c.replace(/href={`\/profil`}/g, 'href={`/${lang}/profil`}');
    c = c.replace(/href={`\/artikel`}/g, 'href={`/${lang}/artikel`}');
    c = c.replace(/href={`\/kontak`}/g, 'href={`/${lang}/kontak`}');

    // Apply specific translations
    for (const [id, en] of replacements) {
        // We use split/join to replace all occurrences without worrying about regex escaping
        c = c.split(id).join(`{lang === 'en' ? "${en}" : "${id}"}`);
    }

    fs.writeFileSync(filePath, c);
    console.log(`Patched ${filePath}`);
}

// 1. Kategori
processFile('src/app/[lang]/kategori/page.tsx', [
    ['Solusi Produk Sesuai Kebutuhan Anda', 'Product Solutions for Your Needs'],
    ['Kami menghadirkan berbagai kategori produk yang dirancang untuk memenuhi kebutuhan fasilitas kesehatan dan klinik estetika modern.', 'We offer various product categories designed to meet the needs of modern healthcare facilities and aesthetic clinics.'],
    ['Perangkat estetika modern untuk berbagai kebutuhan perawatan wajah, kulit, dan tubuh.', 'Modern aesthetic devices for various facial, skin, and body care needs.'],
    ['Peralatan medis berkualitas tinggi untuk menunjang pelayanan kesehatan profesional.', 'High-quality medical equipment to support professional healthcare services.'],
    ['Produk habis pakai yang mendukung prosedur medis dan estetika secara aman dan efisien.', 'Consumables that support medical and aesthetic procedures safely and efficiently.'],
    ['Berbagai perlengkapan pendukung untuk memastikan performa perangkat tetap optimal.', 'Various supporting equipment to ensure optimal device performance.']
]);

// 2. Produk
processFile('src/app/[lang]/produk/page.tsx', [
    ['Koleksi Produk', 'Product Collection'],
    ['Beranda', 'Home'],
    ['Produk', 'Products'],
    ['Cari alat medis atau estetika...', 'Search medical or aesthetic equipment...'],
    ['Kategori', 'Categories'],
    ['Semua Produk', 'All Products'],
    ['Teknologi Medis & Estetika Terbaik', 'Best Medical & Aesthetic Technology'],
    ['PT Harvest Selaras Nusantara Medica menghadirkan berbagai produk pilihan dari brand terpercaya yang telah memenuhi standar kualitas internasional.', 'PT Harvest Selaras Nusantara Medica presents a variety of selected products from trusted brands that meet international quality standards.'],
    ['Garansi Resmi', 'Official Warranty'],
    ['Menampilkan', 'Showing'],
    ['dari', 'of'],
    ['produk', 'products'],
    ['Urutkan Berdasarkan Kategori', 'Sort by Category'],
    ['Produk Terbaru', 'Newest Products'],
    ['Nama (A-Z)', 'Name (A-Z)'],
    ['Baru', 'New'],
    ['Lihat Detail', 'View Details'],
    ['Belum ada produk yang ditambahkan.', 'No products have been added yet.']
]);

// 3. Katalog
processFile('src/app/[lang]/katalog/page.tsx', [
    ['E-Katalog Resmi', 'Official E-Catalog'],
    ['Beranda', 'Home'],
    ['Katalog', 'Catalog'],
    ['Pusat Unduhan Katalog', 'Catalog Download Center'],
    ['Temukan informasi lengkap mengenai seluruh produk yang kami distribusikan. Unduh katalog digital kami untuk melihat spesifikasi detail.', 'Find complete information about all the products we distribute. Download our digital catalog to see detailed specifications.'],
    ['Cari katalog (Contoh: Hospital Furniture)...', 'Search catalog (Example: Hospital Furniture)...'],
    ['Cari Katalog', 'Search Catalog'],
    ['Klik untuk Unduh', 'Click to Download'],
    ['Unduh PDF', 'Download PDF']
]);

// 4. Profil
processFile('src/app/[lang]/profil/page.tsx', [
    ['Profil Perusahaan', 'Company Profile'],
    ['Beranda', 'Home'],
    ['Tentang Kami', 'About Us'],
    ['PT Harvest Selaras Nusantara Medica didirikan dengan visi menjadi penyedia utama solusi peralatan medis dan estetika di Indonesia. Kami berkomitmen untuk menghadirkan teknologi terbaru yang aman, efektif, dan berkualitas tinggi untuk mendukung para profesional kesehatan.', 'PT Harvest Selaras Nusantara Medica was founded with the vision of becoming the main provider of medical and aesthetic equipment solutions in Indonesia. We are committed to bringing the latest safe, effective, and high-quality technology to support healthcare professionals.'],
    ['Tujuan Kami', 'Our Goal'],
    ['Meningkatkan standar pelayanan kesehatan di Indonesia dengan menyediakan produk-produk berteknologi mutakhir dengan layanan purna jual yang andal.', 'To improve healthcare service standards in Indonesia by providing state-of-the-art technology products with reliable after-sales service.'],
    ['Visi', 'Vision'],
    ['Menjadi distributor perangkat medis dan estetika terkemuka yang berkontribusi nyata pada kemajuan industri kesehatan di tingkat nasional.', 'To become a leading distributor of medical and aesthetic devices that makes a real contribution to the advancement of the healthcare industry at the national level.'],
    ['Misi', 'Mission'],
    ['Menyediakan peralatan dengan standar keamanan internasional.', 'Provide equipment with international safety standards.'],
    ['Memberikan layanan pelanggan dan edukasi teknis terbaik.', 'Provide the best customer service and technical education.'],
    ['Membangun kemitraan jangka panjang dengan klien dan prinsipal.', 'Build long-term partnerships with clients and principals.']
]);

// 5. Artikel
processFile('src/app/[lang]/artikel/page.tsx', [
    ['Artikel & Berita', 'Articles & News'],
    ['Beranda', 'Home'],
    ['Artikel', 'Articles'],
    ['Pusat Informasi Kesehatan & Medis', 'Health & Medical Information Center'],
    ['Temukan wawasan terbaru seputar teknologi medis, inovasi estetika, dan tips kesehatan dari para ahli di industri.', 'Discover the latest insights on medical technology, aesthetic innovations, and health tips from industry experts.'],
    ['Cari artikel, topik, atau berita...', 'Search articles, topics, or news...'],
    ['Cari', 'Search'],
    ['Kategori Populer', 'Popular Categories'],
    ['Semua Kategori', 'All Categories'],
    ['Tips & Edukasi', 'Tips & Education'],
    ['Inovasi Medis', 'Medical Innovations'],
    ['Teknologi Estetika', 'Aesthetic Technology'],
    ['Berita Perusahaan', 'Company News'],
    ['Baca Artikel', 'Read Article']
]);

// 6. Kontak
processFile('src/app/[lang]/kontak/page.tsx', [
    ['Hubungi Kami', 'Contact Us'],
    ['Beranda', 'Home'],
    ['Kontak', 'Contact'],
    ['Kami Siap Membantu Anda', 'We Are Ready to Help You'],
    ['Punya pertanyaan tentang produk kami, butuh penawaran, atau ingin menjadwalkan demonstrasi alat? Jangan ragu untuk menghubungi tim kami.', 'Have questions about our products, need a quote, or want to schedule an equipment demonstration? Do not hesitate to contact our team.'],
    ['Informasi Kontak', 'Contact Information'],
    ['Alamat Kantor', 'Office Address'],
    ['Telepon & WhatsApp', 'Phone & WhatsApp'],
    ['Kirim Pesan', 'Send Message'],
    ['Tim kami akan membalas pesan Anda secepatnya dalam jam kerja.', 'Our team will reply to your message as soon as possible during business hours.'],
    ['Nama Lengkap', 'Full Name'],
    ['Masukkan nama Anda', 'Enter your name'],
    ['Email', 'Email'],
    ['Masukkan alamat email', 'Enter email address'],
    ['Subjek', 'Subject'],
    ['Pilih topik pesan', 'Choose message topic'],
    ['Pertanyaan Produk', 'Product Inquiry'],
    ['Permintaan Penawaran', 'Quote Request'],
    ['Dukungan Teknis', 'Technical Support'],
    ['Pesan', 'Message'],
    ['Tuliskan pertanyaan atau kebutuhan Anda di sini...', 'Write your questions or needs here...'],
    ['Kirim Pesan Sekarang', 'Send Message Now']
]);
