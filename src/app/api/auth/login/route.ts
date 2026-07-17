import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const validUsername = process.env.ADMIN_USERNAME || 'admin_hsn';
    const validPassword = process.env.ADMIN_PASSWORD || 'HsnSecure2026#';

    if (username === validUsername && password === validPassword) {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'fallback_secret_key_dont_use_in_prod'
      );
      
      const alg = 'HS256';
      
      const jwt = await new SignJWT({ user: username, role: 'admin' })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('8h')
        .sign(secret);

      const response = NextResponse.json({ success: true }, { status: 200 });
      
      response.cookies.set({
        name: 'hsn_admin_token',
        value: jwt,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 8 * 60 * 60, // 8 hours
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Kredensial tidak valid' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
