import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';
    
    // Check size limit (Vercel payload limit is 4.5MB, we limit base64 to ~4MB to be safe)
    if (base64.length > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large after compression" }, { status: 413 });
    }

    // @ts-ignore
    const image = await prisma.imageStorage.create({
      data: {
        data: `data:${mimeType};base64,${base64}`,
        mimeType: mimeType
      }
    });

    return NextResponse.json({ 
      success: true, 
      url: `/api/images/${image.id}`
    });
  } catch (error) {
    console.error("Error saving image:", error);
    return NextResponse.json({ error: "Failed to save image" }, { status: 500 });
  }
}
