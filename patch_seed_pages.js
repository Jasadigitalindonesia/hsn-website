const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newSettings = [
    // Profil Page
    { key: 'profil_hero_title', value: 'Tentang PT Harvest Selaras Nusantara Medica', category: 'profil' },
    { key: 'profil_hero_bg', value: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', category: 'profil' },
    { key: 'profil_about_subtitle', value: 'Tentang Kami', category: 'profil' },
    { key: 'profil_about_title', value: 'Tentang PT Harvest Selaras Nusantara Medica', category: 'profil' },
    { key: 'profil_about_desc1', value: 'PT Harvest Selaras Nusantara Medica merupakan distributor B2B alat medis dan estetika yang berkomitmen menghadirkan produk berkualitas internasional untuk mendukung perkembangan industri kesehatan dan estetika di Indonesia.', category: 'profil' },
    { key: 'profil_about_desc2', value: 'Kami percaya bahwa teknologi yang tepat mampu meningkatkan kualitas pelayanan, memperkuat kepercayaan pasien, dan mendukung pertumbuhan bisnis setiap mitra kami. Oleh karena itu, kami tidak hanya menyediakan produk, tetapi juga menghadirkan layanan konsultasi, instalasi, pelatihan, serta dukungan purna jual yang profesional.', category: 'profil' },
    { key: 'profil_about_desc3', value: 'Dengan dukungan tim teknisi yang andal dan jaringan distribusi yang luas di berbagai wilayah, HSN siap menjadi partner strategis yang dapat diandalkan oleh rumah sakit, klinik, maupun dokter spesialis dalam memberikan layanan medis yang unggul.', category: 'profil' },
    { key: 'profil_vision_title', value: 'Visi Kami', category: 'profil' },
    { key: 'profil_vision_desc', value: 'Menjadi perusahaan distributor alat medis dan estetika terdepan di Indonesia yang dipercaya karena keunggulan produk, inovasi teknologi, dan layanan purna jual yang andal.', category: 'profil' },
    { key: 'profil_mission_title', value: 'Misi Kami', category: 'profil' },
    { key: 'profil_mission_list', value: 'Menyediakan produk medis dan estetika berstandar internasional yang aman, efektif, dan inovatif.\nMemberikan pelayanan pelanggan yang prima, termasuk konsultasi teknis, pelatihan penggunaan alat, dan layanan perbaikan yang cepat.\nMembangun kemitraan strategis dengan rumah sakit, klinik kecantikan, dan profesional medis di seluruh Indonesia.\nTerus mengikuti perkembangan teknologi medis terkini untuk memberikan solusi yang relevan dengan kebutuhan pasar.\nMendukung peningkatan standar fasilitas kesehatan di Indonesia melalui ketersediaan perangkat berkualitas tinggi.', category: 'profil' },
    
    // Katalog Page
    { key: 'katalog_hero_title', value: 'Katalog Produk', category: 'katalog' },
    { key: 'katalog_hero_bg', value: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', category: 'katalog' },
    { key: 'katalog_content_title', value: 'Katalog Produk', category: 'katalog' },
    { key: 'katalog_content_desc', value: 'Temukan informasi lengkap mengenai seluruh produk yang kami distribusikan melalui katalog digital resmi PT Harvest Selaras Nusantara Medica.', category: 'katalog' },
    
    // Kontak Page
    { key: 'kontak_hero_title', value: 'Hubungi Kami', category: 'kontak' },
    { key: 'kontak_hero_bg', value: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', category: 'kontak' },
    { key: 'kontak_form_title', value: 'Punya Pertanyaan? Kirim Pesan', category: 'kontak' },
    { key: 'kontak_form_desc', value: 'Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.', category: 'kontak' }
  ];

  for (const s of newSettings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, category: s.category },
      create: { key: s.key, value: s.value, category: s.category }
    });
  }
  console.log('Seeded pages settings!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
