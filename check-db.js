import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  try {
    const settings = await prisma.$queryRawUnsafe('SELECT * FROM "SiteSetting"');
    console.log('Settings:', settings);
  } catch(e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
check();
