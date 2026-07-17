import { NextResponse } from 'next/server';

// Dummy proxy to prevent Next.js 16 from crashing if this file exists on Vercel
export function proxy() {
  return NextResponse.next();
}
