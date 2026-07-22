import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
const prisma = new PrismaClient();

async function test() {
  try {
    const id = crypto.randomUUID();
    const mimeType = 'image/png';
    const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // 1x1 transparent png
    
    await prisma.$executeRawUnsafe(
      'INSERT INTO "ImageStorage" (id, data, "mimeType", "createdAt") VALUES ($1, $2, $3, NOW())',
      id,
      `data:${mimeType};base64,${base64}`,
      mimeType
    );
    console.log('Inserted image with id:', id);
    
    const fetched = await prisma.$queryRawUnsafe('SELECT * FROM "ImageStorage" WHERE id = $1', id);
    console.log('Fetched:', fetched);
  } catch (e) {
    console.error('Insert failed:', e);
  } finally {
    await prisma.$disconnect();
  }
}
test();
