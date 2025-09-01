import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { authAdmin as _authAdmin } from '@/lib/firebase-admin';

/**
 * HIVE Production Middleware - Real Firebase Token Validation
 * 
 * This replaces the broken middleware with actual Firebase Admin verification
 * NO development bypasses in production routes
 */

// Security logging for production
async function logSecurityEvent(event: string, details: any): Promise<void> {
  console.warn(`[HIVE SECURITY] ${event}:`, {
    timestamp: new Date().toISOString(),
    ...details
  });
}

// Verify Firebase ID token with Firebase Admin
async function verifyFirebaseToken(token: string): Promise<{ valid: boolean; uid?: string; reason?: string }> {
  try {
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);
    
    return {
      valid: true,
      uid: decodedToken.uid
    };
  } catch (error) {
    let reason = 'invalid_token';
    
    if (error instanceof Error) {
      if (error.message.includes('expired')) {
        reason = 'token_expired';
      } else if (error.message.includes('revoked')) {
        reason = 'token_revoked';
      } else if (error.message.includes('invalid')) {
        reason = 'token_invalid';
      }
    }
    
    return { valid: false, reason };
  }
}

// Development token validation (only for development environment)
async function verifyDevelopmentToken(token: string): Promise<{ valid: boolean; uid?: string; reason?: string }> {
  if (process.env.NODE_ENV !== 'development') {
    return { valid: false, reason: 'dev_tokens_not_allowed_in_production' };
  }
  
  // Allow development session tokens
  if (token.startsWith('dev_token_') && token.length > 20) {
    const uid = token.replace('dev_token_', '').split('_')[0];
    return { valid: true, uid: `dev_${uid}_user` };
  }
  
  return { valid: false, reason: 'invalid_dev_token' };
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
    const publicApiRoutes = ['/api/health', '/api/auth/', '/api/schools', '/api/campus/detect'];
    
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
    
    // Verify token with Firebase Admin
    let verification;
    
    if (process.env.NODE_ENV === 'development' && token.startsWith('dev_token_')) {
      verification = await verifyDevelopmentToken(token);
    } else {
      verification = await verifyFirebaseToken(token);
    }

    if (!verification.valid) {
      await logSecurityEvent('invalid_token_api_access', {
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
        path: pathname,
        reason: verification.reason
      });

      return new NextResponse(
        JSON.stringify({ 
          error: 'Invalid or expired authentication token',
          code: 'INVALID_TOKEN' 
        }),
        { 
          status: 401, 
          headers: { 'content-type': 'application/json' } 
        }
      );
    }

    // Add user context to request headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-hive-user-uid', verification.uid!);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Protected page routes - check for session
  const sessionToken = request.cookies.get('session-token')?.value || 
                      request.headers.get('authorization')?.replace('Bearer ', '');

  // No session token - redirect to login
  if (!sessionToken) {
    console.log(`🔒 No session token for ${pathname}, redirecting to schools`);
    
    const loginUrl = new URL('/schools', request.url);
    loginUrl.searchParams.set('returnTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify session token
  let verification;
  
  if (process.env.NODE_ENV === 'development' && sessionToken.startsWith('dev_token_')) {
    verification = await verifyDevelopmentToken(sessionToken);
  } else {
    verification = await verifyFirebaseToken(sessionToken);
  }

  if (!verification.valid) {
    await logSecurityEvent('invalid_session_page_access', {
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      userAgent: request.headers.get('user-agent'),
      path: pathname,
      reason: verification.reason
    });

    // Clear invalid session and redirect
    const loginUrl = new URL('/schools', request.url);
    loginUrl.searchParams.set('returnTo', pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('session-token');
    return response;
  }

  console.log(`✅ Valid session for user ${verification.uid} accessing ${pathname}`);
  
  // Add user context to request headers for pages
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-hive-user-uid', verification.uid!);
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};