import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function updateDB() {
  const address = 'Grand Harvest Cluster Belvoir BC 39, Kel. Balas Klumprik Kec.Wiyung Kota Surabaya, Jawa Timur Kode pos 60222';
  const phone = '+6285284222200';
  const email = 'info@harvestselarasnusantara.com';

  const settingsToUpdate = [
    { key: 'footer_address', value: address, category: 'kontak' },
    { key: 'footer_phone', value: phone, category: 'kontak' },
    { key: 'footer_email', value: email, category: 'kontak' },
    { key: 'cta_whatsapp_url', value: `https://wa.me/${phone.replace(/\\D/g, '')}`, category: 'kontak' }
  ];

  try {
    for (const s of settingsToUpdate) {
      await prisma.$executeRawUnsafe(
        'INSERT INTO "SiteSetting" (key, value, category, "updatedAt") VALUES ($1, $2, $3, NOW()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, "updatedAt" = NOW()',
        s.key, s.value, s.category
      );
      console.log(`Updated ${s.key}`);
    }
  } catch(e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
updateDB();
