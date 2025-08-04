import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lightweight auth validation for middleware (Edge Runtime compatible)
function isProductionEnvironment(): boolean {
  return process.env.NODE_ENV === 'production' || 
         process.env.VERCEL_ENV === 'production';
}

// Simple token validation without Firebase Admin (Edge Runtime compatible)
async function validateTokenFormat(token: string): Promise<{ valid: boolean; reason?: string }> {
  if (!token || typeof token !== 'string' || token.length < 10) {
    return { valid: false, reason: 'invalid_format' };
  }

  // Check for forbidden development tokens
  const forbiddenTokens = ['test-token', 'dev-token', 'DEV_MODE', 'development-token'];
  if (forbiddenTokens.includes(token)) {
    return { valid: false, reason: 'forbidden_token' };
  }

  // Basic JWT format check (has 3 parts separated by dots)
  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, reason: 'invalid_jwt_format' };
  }

  return { valid: true };
}

// Minimal security logging for Edge Runtime
async function logSecurityEvent(event: string, details: any): Promise<void> {
  // In Edge Runtime, just use console.log for now
  console.warn(`[SECURITY] ${event}:`, details);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow static files, Next.js internals, and development files to pass through
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/__nextjs') ||
    pathname.includes('hot-update') ||
    pathname.includes('.') && !pathname.includes('/api/')
  ) {
    return NextResponse.next();
  }

  // Skip all middleware processing in development for faster reloads
  if (!isProductionEnvironment()) {
    return NextResponse.next();
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/landing', '/auth/login', '/auth/verify', '/auth/expired', '/onboarding', '/schools', '/waitlist'];
  
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // For API routes, enforce authentication
  if (pathname.startsWith('/api/')) {
    // Skip health check and public endpoints
    if (pathname === '/api/health' || pathname.startsWith('/api/auth/')) {
      return NextResponse.next();
    }

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      await logSecurityEvent('unauthorized_api_access', {
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
        path: pathname,
        tags: { reason: 'missing_auth_header' }
      });
      
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // In production, validate token format (full validation happens in API routes)
    if (isProductionEnvironment()) {
      const validation = await validateTokenFormat(token);

      if (!validation.valid) {
        await logSecurityEvent('invalid_token_api_access', {
          ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          userAgent: request.headers.get('user-agent'),
          path: pathname,
          reason: validation.reason || 'invalid_token'
        });

        return new NextResponse(
          JSON.stringify({ error: 'Invalid authentication token' }),
          { status: 401, headers: { 'content-type': 'application/json' } }
        );
      }

      // Let the API route handle full Firebase validation
      return NextResponse.next();
    }
  }


  // For protected dashboard routes, check session
  const sessionToken = request.cookies.get('session-token')?.value || 
                      request.headers.get('authorization')?.replace('Bearer ', '');

  if (!sessionToken) {
    // Redirect to login with return URL
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('returnTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // In production, validate session token format (full validation happens on auth pages)
  if (isProductionEnvironment()) {
    const validation = await validateTokenFormat(sessionToken);

    if (!validation.valid) {
      await logSecurityEvent('invalid_session_page_access', {
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
        path: pathname,
        reason: validation.reason || 'invalid_session'
      });

      // Clear invalid session and redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('session-token');
      return response;
    }

    // Let pages handle full Firebase validation
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};