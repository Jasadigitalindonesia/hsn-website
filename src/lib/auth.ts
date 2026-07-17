import { cookies } from 'next/headers';

export async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('hsn_admin_token')?.value;
  const expectedToken = process.env.JWT_SECRET || 'fallback_secret_key_dont_use_in_prod';
  
  if (!token || token !== expectedToken) {
    return false;
  }
  return true;
}
