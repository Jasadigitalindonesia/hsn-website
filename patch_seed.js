const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const settings = [
    // About Us
    { key: 'about_subtitle', value: 'Tentang Singkat', category: 'about' },
    { key: 'about_title', value: 'Membangun Masa Depan Industri Medis & Estetika Indonesia', category: 'about' },
    { key: 'about_description', value: 'PT Harvest Selaras Nusantara Medica adalah perusahaan yang bergerak di bidang distribusi alat medis dan teknologi estetika untuk memenuhi kebutuhan rumah sakit, klinik kecantikan, dokter spesialis, hingga fasilitas kesehatan di seluruh Indonesia. Dengan komitmen terhadap kualitas, inovasi, dan pelayanan, kami hadir sebagai mitra terpercaya dalam menghadirkan solusi terbaik bagi industri kesehatan dan estetika.', category: 'about' },
    { key: 'about_image', value: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', category: 'about' },
    
    // CTA
    { key: 'cta_title', value: 'Siap Mengembangkan Klinik atau Fasilitas Kesehatan Anda?', category: 'cta' },
    { key: 'cta_description', value: 'Temukan solusi Medical & Aesthetic Equipment terbaik bersama PT Harvest Selaras Nusantara Medica.', category: 'cta' },
    { key: 'cta_whatsapp_url', value: 'https://wa.me/6281234567890', category: 'cta' },
    { key: 'cta_bg_image', value: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=2000&q=80', category: 'cta' },
    
    // Footer
    { key: 'footer_description', value: 'Distributor alat kesehatan dan estetika terpercaya untuk solusi fasilitas medis masa depan.', category: 'footer' },
    { key: 'footer_address', value: 'Graha Cibinong Blok E1 No 11', category: 'footer' },
    { key: 'footer_phone', value: '0812-3456-7890', category: 'footer' },
    { key: 'footer_email', value: 'magdalena@hsnmedica.com', category: 'footer' },
    { key: 'footer_map_url', value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126915.22238466601!2d106.74533081054688!3d-6.249767222396165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1692881234567!5m2!1sid!2sid', category: 'footer' }
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, category: s.category },
      create: s
    });
  }
  console.log('Seed completed successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
