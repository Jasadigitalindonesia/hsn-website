import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const articles = await prisma.newsArticle.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, data: articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const article = await prisma.newsArticle.create({
      data: {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        image: body.image,
        author: body.author || 'Admin HSN',
        date: body.date,
        readTime: body.readTime,
      }
    });
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json({ success: false, error: 'Failed to create article' }, { status: 500 });
  }
}
