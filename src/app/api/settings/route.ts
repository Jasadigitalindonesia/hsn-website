import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { checkAuth } from '@/lib/auth';

const prisma = new PrismaClient();

// GET all settings
export async function GET() {
  try {
    // @ts-ignore - Bypass Vercel build cache issue
    const settings = await prisma.$queryRawUnsafe('SELECT * FROM "SiteSetting"') as any[];
    // Convert array to key-value object for easier frontend consumption
    const settingsMap = settings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    
    return NextResponse.json({ success: true, data: settingsMap });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// POST (Update or Create settings)
export async function POST(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const { settings } = body; // Expecting an array of { key, value, category }
    
    if (!Array.isArray(settings)) {
      return NextResponse.json({ success: false, error: 'Invalid data format' }, { status: 400 });
    }

    // Upsert all settings in a transaction
    await prisma.$transaction(
      settings.map((setting: any) =>
        prisma.$executeRawUnsafe(
          'INSERT INTO "SiteSetting" (key, value, category, "updatedAt") VALUES ($1, $2, $3, NOW()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, category = EXCLUDED.category, "updatedAt" = NOW()',
          setting.key,
          String(setting.value),
          setting.category || 'general'
        )
      )
    );

    return NextResponse.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}
