import { NextResponse } from 'next/server';

export function proxy(request) {
  const { pathname } = request.nextUrl;
  
  // Protect dashboard routes
  const protectedRoutes = ['/admin', '/partner', '/employee'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Decode JWT for routing
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      const userRole = payload.role;

      // Ensure user is accessing their own role's dashboard
      if (pathname.startsWith('/admin') && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      if (pathname.startsWith('/partner') && userRole !== 'partner') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      if (pathname.startsWith('/employee') && userRole !== 'employee') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/partner/:path*', '/employee/:path*'],
};
