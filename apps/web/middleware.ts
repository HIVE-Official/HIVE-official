/**
 * HIVE Authentication Middleware - Production Ready
 * Protects routes and validates user sessions
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, RATE_LIMITS } from './src/lib/rate-limiter';
import { getSession, clearSessionCookie } from './src/lib/session';
import { auditLogger, AuditEvent, auditAdminAccess, auditSecurityEvent } from './src/lib/audit-logger';

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/schools',
  '/auth/login',
  '/auth/verify',
  '/auth/expired',
  '/legal/terms',
  '/legal/privacy',
  '/legal/community-guidelines',
  '/help',
  '/api/auth/send-magic-link',
  '/api/auth/verify-magic-link',
  '/api/schools',
  '/api/waitlist/join',
  '/api/spaces/resolve-slug', // For slug resolution
];

// Static assets and Next.js internals
const STATIC_ROUTES = [
  '/_next',
  '/favicon.ico',
  '/images',
  '/fonts',
  '/manifest.json',
];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname, hostname } = request.nextUrl;

  // Handle subdomain routing
  const isAdminSubdomain = hostname === 'admin.hive.college' || hostname === 'admin.localhost';

  if (isAdminSubdomain) {
    // For admin subdomain, rewrite all requests to admin routes
    if (pathname === '/') {
      // Root of admin subdomain goes to admin dashboard
      const adminUrl = new URL('/admin', request.url);
      return NextResponse.rewrite(adminUrl);
    } else if (!pathname.startsWith('/admin')) {
      // Other paths on admin subdomain get admin prefix
      const adminUrl = new URL(`/admin${pathname}`, request.url);
      return NextResponse.rewrite(adminUrl);
    }
  }

  // Allow static assets and Next.js internals
  if (STATIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // RATE LIMITING - REAL IMPLEMENTATION
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
             request.headers.get('x-real-ip') ||
             'unknown';

  // Determine rate limit config based on route
  let rateLimitConfig;
  if (pathname.startsWith('/api/auth')) {
    rateLimitConfig = { ...RATE_LIMITS.auth, identifier: ip };
  } else if (pathname.startsWith('/api/admin')) {
    rateLimitConfig = { ...RATE_LIMITS.adminApi, identifier: ip, isAdmin: true };
  } else if (pathname.startsWith('/api')) {
    rateLimitConfig = { ...RATE_LIMITS.api, identifier: ip };
  }

  // Apply rate limiting for API routes
  if (rateLimitConfig) {
    const { limited, remaining, resetAt } = checkRateLimit(rateLimitConfig);

    if (limited) {
      console.warn(`[RATE LIMIT] Blocked request from ${ip} to ${pathname}`);
      await auditLogger.log(AuditEvent.RATE_LIMIT_EXCEEDED, request, {
        metadata: { ip, pathname }
      });
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((resetAt - Date.now()) / 1000)
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': String(rateLimitConfig.maxRequests),
            'X-RateLimit-Remaining': String(remaining),
            'X-RateLimit-Reset': new Date(resetAt).toISOString(),
            'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000))
          }
        }
      );
    }
  }

  // SMART ROUTING REDIRECTS - Clean up legacy routes

  // Remove /signin -> /auth/login
  if (pathname.startsWith('/signin')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // SPEC: NO HANDLE in URLs - profiles use user ID
  // Profile URLs remain as /profile/[id] - no redirect needed

  // Remove /profile -> /settings (when editing own profile)
  if (pathname === '/profile' || pathname === '/profile/edit') {
    return NextResponse.redirect(new URL('/settings', request.url));
  }

  // Old space ID pattern -> new slug pattern
  if (pathname.startsWith('/spaces/') && pathname.split('/').length === 3) {
    const segment = pathname.split('/')[2];
    // Check if it's a legacy space ID (not 'create', 'browse', 's', etc.)
    if (!['create', 'browse', 'search', 's'].includes(segment) && segment.length > 10) {
      // This looks like a space ID, redirect to slug resolver
      return NextResponse.redirect(new URL(`/spaces/s/${segment}`, request.url));
    }
  }

  // Landing page -> root for consistency
  if (pathname === '/landing') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // /@handle -> /user/handle pattern
  if (pathname.startsWith('/@') && pathname.length > 2) {
    const handle = pathname.substring(2);
    return NextResponse.redirect(new URL(`/user/${handle}`, request.url));
  }

  // Check if this is a public route
  const isPublicRoute = PUBLIC_ROUTES.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  ) || pathname.startsWith('/user/'); // user profile routes are public

  // Get verified session from cookies
  const session = await getSession(request);
  const hasSession = !!session;

  // Protected route logic
  if (!isPublicRoute && !hasSession) {
    // No session and trying to access protected route
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('from', pathname);

    // Log security event
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    console.warn(`[SECURITY] Unauthenticated access attempt to ${pathname} from ${ip}`);
    await auditSecurityEvent(request, AuditEvent.SUSPICIOUS_ACTIVITY,
      `Unauthenticated access attempt to ${pathname}`);

    return NextResponse.redirect(loginUrl);
  }

  // Validate session if present (even for public routes, to set user context)
  if (hasSession && session) {
    try {
      // Session is already verified by JWT, check additional constraints
      const sessionAge = Date.now() - new Date(session.verifiedAt).getTime();
      const maxAge = session.isAdmin ? 4 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

      if (sessionAge > maxAge) {
        // Session expired - clear it and redirect to login
        await auditLogger.log(AuditEvent.SESSION_EXPIRED, request, {
          userId: session.userId,
          userEmail: session.email
        });
        const response = NextResponse.redirect(new URL('/auth/login', request.url));
        return clearSessionCookie(response);
      }

      // CRITICAL: Validate campus isolation
      const campusId = session.campusId;
      if (campusId !== 'ub-buffalo' && process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
        console.error(`[SECURITY] Invalid campus access attempt: ${campusId}`);
        await auditSecurityEvent(request, AuditEvent.SUSPICIOUS_ACTIVITY,
          `Invalid campus access: ${campusId}`, session.userId);
        const response = NextResponse.redirect(new URL('/auth/login', request.url));
        return clearSessionCookie(response);
      }

      // ADMIN ROUTE PROTECTION - REAL SECURITY WITH JWT
      const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
      if (isAdminRoute) {
        const ADMIN_EMAILS = ['jwrhineh@buffalo.edu', 'noahowsh@gmail.com'];
        const userEmail = session.email;

        // Check if user is admin (session must have isAdmin flag)
        if (!session.isAdmin || !userEmail || !ADMIN_EMAILS.includes(userEmail)) {
          console.error(`[SECURITY] Unauthorized admin access attempt by ${userEmail || 'unknown'}`);

          // Log the security event
          const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
          console.error(`[ADMIN BREACH ATTEMPT] Email: ${userEmail}, IP: ${ip}, Path: ${pathname}`);
          await auditAdminAccess(request, session.userId, userEmail || 'unknown', false, pathname);

          // Return 403 Forbidden for admin routes
          return new NextResponse(
            JSON.stringify({ error: 'Admin access required' }),
            {
              status: 403,
              headers: {
                'Content-Type': 'application/json',
                'X-Admin-Denied': 'true'
              }
            }
          );
        }

        // For API routes, require CSRF token
        if (pathname.startsWith('/api/admin')) {
          const csrfToken = request.headers.get('X-CSRF-Token');
          if (!session.csrf || session.csrf !== csrfToken) {
            console.error(`[SECURITY] CSRF validation failed for admin API: ${pathname}`);
            await auditLogger.log(AuditEvent.CSRF_VALIDATION_FAILED, request, {
              userId: session.userId,
              userEmail,
              metadata: { pathname }
            });
            return new NextResponse(
              JSON.stringify({ error: 'CSRF validation failed' }),
              {
                status: 403,
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRF-Failed': 'true'
                }
              }
            );
          }
        }

        console.info(`[ADMIN ACCESS] ${userEmail} accessing ${pathname}`);
        await auditAdminAccess(request, session.userId, userEmail, true, pathname);
      }

      // Session is valid - continue with security headers
      const response = NextResponse.next();

      // Add security headers
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'SAMEORIGIN');
      response.headers.set('X-XSS-Protection', '1; mode=block');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

      // Add subdomain-specific headers
      if (isAdminSubdomain) {
        response.headers.set('X-Admin-Portal', 'HIVE-Enterprise');
        response.headers.set('X-Admin-Version', '2.0');
        // Stricter security for admin subdomain
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
      }

      // Add user context headers for downstream use
      response.headers.set('X-User-Id', session.userId);
      response.headers.set('X-Campus-Id', campusId);
      if (session.isAdmin && session.csrf) {
        response.headers.set('X-CSRF-Token', session.csrf);
      }

      return response;

    } catch (error) {
      // Session validation error - clear it
      console.error(`[AUTH] Session validation error:`, error);
      await auditLogger.log(AuditEvent.INVALID_SESSION, request, {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      return clearSessionCookie(response);
    }
  }

  // Public route with no session - just add security headers
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};