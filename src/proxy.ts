import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except API auth)
  const isAdminRoute = pathname.startsWith('/admin');
  
  // Protect all API routes except public ones
  const isApiRoute = pathname.startsWith('/api/');
  const isPublicApi = pathname.startsWith('/api/images') || pathname.startsWith('/api/auth/');

  if ((isAdminRoute || isApiRoute) && !isPublicApi) {
    const token = request.cookies.get('hsn_admin_token')?.value;

    if (!token) {
      if (isApiRoute) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
      // Return normal response for admin page (handled by client-side redirect if needed, but we can't redirect easily here without breaking the UI if it expects CSR rendering, but it's safe to just let it load and fail the API calls. Actually, let's let the page load but block APIs).
      // If we block /admin here, the user can't even see the login form!
      // So we ONLY block API routes. The admin page will be protected because its API calls will fail.
      // Wait, let's just let the /admin page load. It handles its own login state (we will update it to check an endpoint).
      if (isAdminRoute) {
        return NextResponse.next();
      }
    }

    try {
      if (token) {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET || 'fallback_secret_key_dont_use_in_prod'
        );
        await jwtVerify(token, secret);
        return NextResponse.next();
      } else {
         if (isApiRoute) {
             return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
         }
      }
    } catch (error) {
      if (isApiRoute) {
        return NextResponse.json({ success: false, error: 'Invalid Token' }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
