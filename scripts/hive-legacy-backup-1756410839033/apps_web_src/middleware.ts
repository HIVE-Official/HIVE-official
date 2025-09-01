import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * HIVE Edge Runtime Middleware - Basic Token Validation
 * 
 * Lightweight middleware that works in Edge Runtime
 * Firebase token verification is delegated to API routes
 */

// Security logging for production
function logSecurityEvent(event: string, details: any): void {
  console.warn(`[HIVE SECURITY] ${event}:`, {
    timestamp: new Date().toISOString(),
    ...details
  });
}

// Basic token format validation (detailed verification happens in API routes)
function hasValidTokenFormat(token: string): boolean {
  if (!token || typeof token !== 'string') return false;
  
  // Development token format
  if (process.env.NODE_ENV === 'development' && token.startsWith('dev_token_') && token.length > 20) {
    return true;
  }
  
  // JWT token format (both Firebase production and emulator)
  if (token.includes('.')) {
    const parts = token.split('.');
    // JWT should have 3 parts: header.payload.signature
    if (parts.length === 3 && parts.every(part => part.length > 0)) {
      // In development, accept shorter JWTs from emulator
      if (process.env.NODE_ENV === 'development') {
        return true;
      }
      // In production, require longer tokens (Firebase production JWTs are typically 900+ chars)
      return token.length > 100;
    }
  }
  
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/__nextjs') ||
    pathname.includes('hot-update') ||
    (pathname.includes('.') && !pathname.includes('/api/'))
  ) {
    return NextResponse.next();
  }

  // Public routes that don't require authentication
  const publicRoutes = [
    '/schools',
    '/auth/login', 
    '/auth/verify',
    '/auth/expired',
    '/landing',
    '/waitlist',
    // Development routes (only in development)
    ...(process.env.NODE_ENV === 'development' ? ['/debug-auth', '/dev-login'] : [])
  ];
  
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // API routes authentication
  if (pathname.startsWith('/api/')) {
    // Public API endpoints
    const publicApiRoutes = ['/api/health', '/api/auth/', '/api/schools'];
    
    if (publicApiRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.next();
    }

    // All other API routes require authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      await logSecurityEvent('unauthorized_api_access', {
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
        path: pathname,
        reason: 'missing_auth_header'
      });
      
      return new NextResponse(
        JSON.stringify({ 
          error: 'Authentication required',
          code: 'UNAUTHORIZED' 
        }),
        { 
          status: 401, 
          headers: { 'content-type': 'application/json' } 
        }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer '
    
    // Basic token format validation (detailed verification in API routes)
    if (!hasValidTokenFormat(token)) {
      logSecurityEvent('invalid_token_format_api_access', {
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
        path: pathname,
        reason: 'malformed_token'
      });

      return new NextResponse(
        JSON.stringify({ 
          error: 'Invalid authentication token format',
          code: 'INVALID_TOKEN' 
        }),
        { 
          status: 401, 
          headers: { 'content-type': 'application/json' } 
        }
      );
    }

    // Token format looks valid - let API routes handle detailed verification
    return NextResponse.next();
  }

  // Protected page routes - check for session
  const sessionToken = request.cookies.get('session-token')?.value || 
                      request.headers.get('authorization')?.replace('Bearer ', '');

  // No session token - redirect to login
  if (!sessionToken) {
    // No session token, redirecting to schools page
    
    const loginUrl = new URL('/schools', request.url);
    loginUrl.searchParams.set('returnTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Basic session token format validation
  if (!hasValidTokenFormat(sessionToken)) {
    logSecurityEvent('invalid_session_format_page_access', {
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      userAgent: request.headers.get('user-agent'),
      path: pathname,
      reason: 'malformed_session_token'
    });

    // Clear invalid session and redirect
    const loginUrl = new URL('/schools', request.url);
    loginUrl.searchParams.set('returnTo', pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('session-token');
    return response;
  }

  // Token format looks valid - detailed verification will happen on page load via useAuth
  // Session token present - delegating verification to client auth
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};