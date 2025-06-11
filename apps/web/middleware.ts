import { NextRequest, NextResponse } from 'next/server';
import {
  authMiddleware,
  AuthMiddlewareConfig,
} from 'next-firebase-auth-edge';
import { getTokens } from 'next-firebase-auth-edge/lib/next/tokens';

const PROTECTED_PATHS = ['/dashboard', '/profile', '/spaces'];

const config: AuthMiddlewareConfig = {
  loginPath: '/auth/login',
  logoutPath: '/auth/logout',
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  cookieName: 'AuthToken',
  cookieSignatureKeys: [process.env.COOKIE_SIGNATURE_KEY_A!, process.env.COOKIE_SIGNATURE_KEY_B!],
  cookieSerializeOptions: {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 12 * 60 * 60 * 24, // 12 days
  },
  serviceAccount: {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!,
  },
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('firebaseIdToken');
  const { pathname } = request.nextUrl;

  // Allow requests for auth pages, legal pages, and API routes
  if (pathname.startsWith('/auth') || pathname.startsWith('/legal') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // If no token and trying to access a protected route, redirect to login
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (our static assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
  ],
}; 