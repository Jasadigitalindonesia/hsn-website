import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const locales = ['id', 'en']
const defaultLocale = 'id'
 
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return NextResponse.next()
 
  // Use rewrite so URL stays clean (e.g. hsnmedica.com) without redirecting to /id in URL bar
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.rewrite(request.nextUrl)
}
 
export const config = {
  matcher: [
    '/((?!_next|api|admin|favicon.ico).*)',
  ],
}
