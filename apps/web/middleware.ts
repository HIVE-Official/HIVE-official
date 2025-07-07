import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect development routes in production
  if (request.nextUrl.pathname.startsWith('/dev/')) {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.redirect(new URL('/404', request.url));
    }
  }

  // Protect debug routes in production
  if (request.nextUrl.pathname.startsWith('/debug-client')) {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.redirect(new URL('/404', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dev/:path*', '/debug-client']
};