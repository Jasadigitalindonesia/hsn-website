import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except API auth)
  const isAdminRoute = pathname.startsWith('/admin');
  
  // Protect all API routes except public ones
  const isApiRoute = pathname.startsWith('/api/');
  const isPublicApi = pathname.startsWith('/api/images') || pathname.startsWith('/api/auth/');

  if ((isAdminRoute || isApiRoute) && !isPublicApi) {
    const token = request.cookies.get('hsn_admin_token')?.value;
    const expectedToken = process.env.JWT_SECRET || 'fallback_secret_key_dont_use_in_prod';

    if (!token || token !== expectedToken) {
      if (isApiRoute) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
      if (isAdminRoute) {
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
