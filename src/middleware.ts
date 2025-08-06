import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUser } from './app/(home)/_actions/action';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register');
  const isDashboardPage = pathname.startsWith('/dashboard');

  // If no token and trying to access dashboard, redirect to login
  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl.origin));
  }

  // If token exists, get user data
  let userData;
  if (token) {
    try {
      userData = await getUser(); // should return { success, message, user: { id, name, email, role } }
      console.log("middleware.....", userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  const userRole = userData?.user?.role;

  // If token exists and user is trying to access auth page, redirect to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin));
  }

  // If token exists and role is not admin, but trying to access dashboard, redirect to home or another page
  if (token && userRole === 'user' && isDashboardPage) {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin)); // or any other appropriate page
  }

  // All other cases: proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/auth/login', '/auth/register'],
};
