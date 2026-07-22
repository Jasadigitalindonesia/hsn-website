const fs = require('fs');

function unpatch(file, replacements) {
    let c = fs.readFileSync(file, 'utf8');
    for (const [id, en] of replacements) {
        c = c.split(`{lang === 'en' ? "${en}" : "${id}"}`).join(id);
    }
    fs.writeFileSync(file, c);
    console.log('Unpatched', file);
}

unpatch('src/app/[lang]/kategori/page.tsx', [
    ['Solusi Produk Sesuai Kebutuhan Anda', 'Product Solutions for Your Needs'],
    ['Kami menghadirkan berbagai kategori produk yang dirancang untuk memenuhi kebutuhan fasilitas kesehatan dan klinik estetika modern.', 'We offer various product categories designed to meet the needs of modern healthcare facilities and aesthetic clinics.'],
    ['Perangkat estetika modern untuk berbagai kebutuhan perawatan wajah, kulit, dan tubuh.', 'Modern aesthetic devices for various facial, skin, and body care needs.'],
    ['Peralatan medis berkualitas tinggi untuk menunjang pelayanan kesehatan profesional.', 'High-quality medical equipment to support professional healthcare services.'],
    ['Produk habis pakai yang mendukung prosedur medis dan estetika secara aman dan efisien.', 'Consumables that support medical and aesthetic procedures safely and efficiently.'],
    ['Berbagai perlengkapan pendukung untuk memastikan performa perangkat tetap optimal.', 'Various supporting equipment to ensure optimal device performance.']
]);

unpatch('src/app/[lang]/produk/page.tsx', [
    ['Koleksi Produk', 'Product Collection'],
    ['Beranda', 'Home'],
    ['Produk', 'Products'],
    ['Cari alat medis atau estetika...', 'Search medical or aesthetic equipment...'],
    ['Kategori', 'Categories'],
    ['Semua Produk', 'All Products'],
    ['Teknologi Medis & Estetika Terbaik', 'Best Medical & Aesthetic Technology'],
    ['PT Harvest Selaras Nusantara menghadirkan berbagai produk pilihan dari brand terpercaya yang telah memenuhi standar kualitas internasional.', 'PT Harvest Selaras Nusantara presents a variety of selected products from trusted brands that meet international quality standards.'],
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

unpatch('src/app/[lang]/katalog/page.tsx', [
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

unpatch('src/app/[lang]/profil/page.tsx', [
    ['Profil Perusahaan', 'Company Profile'],
    ['Beranda', 'Home'],
    ['Tentang Kami', 'About Us'],
    ['PT Harvest Selaras Nusantara didirikan dengan visi menjadi penyedia utama solusi peralatan medis dan estetika di Indonesia. Kami berkomitmen untuk menghadirkan teknologi terbaru yang aman, efektif, dan berkualitas tinggi untuk mendukung para profesional kesehatan.', 'PT Harvest Selaras Nusantara was founded with the vision of becoming the main provider of medical and aesthetic equipment solutions in Indonesia. We are committed to bringing the latest safe, effective, and high-quality technology to support healthcare professionals.'],
    ['Tujuan Kami', 'Our Goal'],
    ['Meningkatkan standar pelayanan kesehatan di Indonesia dengan menyediakan produk-produk berteknologi mutakhir dengan layanan purna jual yang andal.', 'To improve healthcare service standards in Indonesia by providing state-of-the-art technology products with reliable after-sales service.'],
    ['Visi', 'Vision'],
    ['Menjadi distributor perangkat medis dan estetika terkemuka yang berkontribusi nyata pada kemajuan industri kesehatan di tingkat nasional.', 'To become a leading distributor of medical and aesthetic devices that makes a real contribution to the advancement of the healthcare industry at the national level.'],
    ['Misi', 'Mission'],
    ['Menyediakan peralatan dengan standar keamanan internasional.', 'Provide equipment with international safety standards.'],
    ['Memberikan layanan pelanggan dan edukasi teknis terbaik.', 'Provide the best customer service and technical education.'],
    ['Membangun kemitraan jangka panjang dengan klien dan prinsipal.', 'Build long-term partnerships with clients and principals.']
]);

unpatch('src/app/[lang]/artikel/page.tsx', [
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

unpatch('src/app/[lang]/kontak/page.tsx', [
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
