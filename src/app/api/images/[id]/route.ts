import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const images = await prisma.$queryRawUnsafe('SELECT * FROM "ImageStorage" WHERE id = $1', params.id) as any[];
    const image = images[0];
    
    if (!image) {
      return new NextResponse('Image not found', { status: 404 });
    }
    
    const base64Data = image.data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': image.mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (e) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
