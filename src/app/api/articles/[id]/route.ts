import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const article = await prisma.newsArticle.update({
      where: { id: id },
      data: {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        image: body.image,
        author: body.author,
        date: body.date,
        readTime: body.readTime,
      }
    });
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json({ success: false, error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.newsArticle.delete({
      where: { id: id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json({ success: false, error: 'Failed to delete article' }, { status: 500 });
  }
}
