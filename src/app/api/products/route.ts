import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        brand: body.brand,
        categoryId: body.categoryId || null,
        image: body.image,
        description: body.description,
        specs: body.specs,
        priceRange: body.priceRange,
        isFeatured: body.isFeatured || false,
      }
    });
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}
