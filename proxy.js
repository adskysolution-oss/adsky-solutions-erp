import { NextResponse } from 'next/server';

/**
 * AdSky 25X Subdomain Sentinel (V5 - Enterprise Production)
 * Advanced multi-tenant routing for adskysolution.com
 */

export function proxy(req) {
  const url = req.nextUrl;
  
  // 1. Get Hostname from multiple possible headers (Vercel compatibility)
  const hostname = 
    req.headers.get('x-forwarded-host') || 
    req.headers.get('host') || 
    '';

  // 2. Skip internal Next.js paths, APIs, and static files
  if (
    url.pathname.startsWith('/_next') || 
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 3. Extract Subdomain (Optimized for adskysolution.com)
  const currentHost = hostname.split(':')[0]; // Remove port if present
  const parts = currentHost.split('.');
  
  let subdomain = null;

  // Case: admin.adskysolution.com (Length 3)
  if (parts.length >= 3) {
    subdomain = parts[0].toLowerCase();
  }

  // 4. Clean Subdomain (Remove www)
  if (subdomain === 'www') {
    subdomain = parts.length > 3 ? parts[1].toLowerCase() : null;
  }

  // 5. Routing Logic & Auth Sentinel
  const validSubdomains = ['admin', 'partner', 'field', 'farmer'];
  
  if (subdomain && validSubdomains.includes(subdomain)) {
    console.log(`[AdSky Sentinel] Subdomain: ${subdomain} | Path: ${url.pathname}`);

    // EXEMPTIONS: Don't check for token on the login page itself
    if (url.pathname === '/login') {
      return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
    }

    // CHECK FOR AUTH TOKEN
    const token = req.cookies.get('token')?.value;

    if (!token) {
      // Redirect to login on the SAME subdomain
      console.log(`[AdSky Sentinel] No token found. Redirecting to /login`);
      return NextResponse.rewrite(new URL(`/${subdomain}/login`, req.url));
    }
    
    // Internal rewrite: URL remains subdomain, but serves from folder
    // Safety check: Don't infinite loop if already at the rewritten path
    if (!url.pathname.startsWith(`/${subdomain}`)) {
      return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
    }
  }

  // Fallback to main website
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
