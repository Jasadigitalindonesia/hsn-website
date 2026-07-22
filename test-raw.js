import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function test() {
  try {
    const res = await prisma.$queryRawUnsafe('SELECT * FROM "SiteSetting" LIMIT 1');
    console.log('SiteSetting success:', res);
    const img = await prisma.$queryRawUnsafe('SELECT id FROM "ImageStorage" LIMIT 1');
    console.log('ImageStorage success:', img);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
test();
