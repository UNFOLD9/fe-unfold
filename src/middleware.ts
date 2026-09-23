import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/home', '/pause', '/discover', '/my-space'];
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('unfold_session');
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isAuthRoute = authRoutes.some(route => path.startsWith(route));

  if (!cookie && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (cookie && isAuthRoute) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (path === '/') {
    if (cookie) {
      return NextResponse.redirect(new URL('/home', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
