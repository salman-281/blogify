import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUser } from './app/(home)/_actions/action';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  let userData = await getUser();

  console.log("middleware.....", userData);

  const isAuthPage = pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register');
  const isDashboardPage = pathname.startsWith('/dashboard');


  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl.origin));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/auth/login', '/auth/register'],
};
