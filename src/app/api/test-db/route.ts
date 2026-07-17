import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    return NextResponse.json({ status: 'ok', count: settings.length });
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'error', 
      message: error.message, 
      stack: error.stack,
      name: error.name
    }, { status: 500 });
  }
}
