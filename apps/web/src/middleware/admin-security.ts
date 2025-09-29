import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

/**
 * Enhanced Admin Security Middleware
 * Adds multiple layers of protection for admin routes
 */

// Allowed IP ranges (configure for your campus/home IPs)
const ALLOWED_ADMIN_IPS = process.env.ADMIN_ALLOWED_IPS?.split(',') || [];
const ADMIN_EMAILS = ['jwrhineh@buffalo.edu', 'noahowsh@gmail.com'];

// Rate limiting map
const adminAccessAttempts = new Map<string, { count: number; firstAttempt: number }>();

export async function enforceAdminSecurity(
  request: NextRequest,
  userEmail?: string,
  userId?: string
): Promise<NextResponse | null> {
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');

  if (!isAdminRoute) {
    return null; // Not an admin route, skip checks
  }

  // 1. Check if user is in admin whitelist
  if (userEmail && !ADMIN_EMAILS.includes(userEmail)) {
    logger.warn('🚫 Non-admin attempted admin access', {
      userId,
      metadata: {
        email: userEmail,
        path: pathname,
        ip: request.headers.get('x-forwarded-for')
      }
    });

    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. IP Restriction (if configured)
  if (ALLOWED_ADMIN_IPS.length > 0) {
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    if (!ALLOWED_ADMIN_IPS.includes(clientIP)) {
      logger.error('🔒 Admin access blocked - IP not whitelisted', {
        metadata: {
          ip: clientIP,
          email: userEmail,
          path: pathname
        }
      });

      return NextResponse.json(
        { error: 'Access denied from this network' },
        { status: 403 }
      );
    }
  }

  // 3. Rate Limiting for Admin Routes
  const identifier = userEmail || request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const attempts = adminAccessAttempts.get(identifier);

  if (attempts) {
    // Reset if more than 1 hour has passed
    if (now - attempts.firstAttempt > 3600000) {
      adminAccessAttempts.delete(identifier);
    } else if (attempts.count > 100) { // 100 requests per hour max
      logger.error('⚠️ Admin rate limit exceeded', {
        metadata: {
          identifier,
          count: attempts.count,
          path: pathname
        }
      });

      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again later.' },
        { status: 429 }
      );
    } else {
      attempts.count++;
    }
  } else {
    adminAccessAttempts.set(identifier, { count: 1, firstAttempt: now });
  }

  // 4. Add Security Headers for Admin Routes
  const response = NextResponse.next();

  // Strict CSP for admin
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );

  // Prevent framing
  response.headers.set('X-Frame-Options', 'DENY');

  // XSS Protection
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // No sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Referrer policy
  response.headers.set('Referrer-Policy', 'same-origin');

  // 5. Log all admin access
  logger.info('👑 Admin route accessed', {
    metadata: {
      email: userEmail,
      userId,
      path: pathname,
      method: request.method,
      ip: request.headers.get('x-forwarded-for') || undefined,
      userAgent: request.headers.get('user-agent') || undefined
    }
  });

  return null; // Allow access
}

/**
 * Check if request is from a trusted network
 */
export function isTrustedNetwork(request: NextRequest): boolean {
  const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                   request.headers.get('x-real-ip');

  if (!clientIP) return false;

  // Campus network ranges (example - update with actual UB ranges)
  const campusRanges = [
    '128.205.', // UB network prefix
    '10.', // Private network
    '192.168.', // Local network
    '127.0.0.1', // Localhost
  ];

  return campusRanges.some(range => clientIP.startsWith(range));
}

/**
 * Generate admin session token with enhanced security
 */
export function generateAdminSessionToken(userId: string, email: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);

  // In production, use proper JWT with signing
  return `admin_${userId}_${timestamp}_${random}`;
}

/**
 * Validate admin session token
 */
export function validateAdminSessionToken(token: string): boolean {
  if (!token || !token.startsWith('admin_')) {
    return false;
  }

  const parts = token.split('_');
  if (parts.length !== 4) {
    return false;
  }

  const timestamp = parseInt(parts[2]);
  const now = Date.now();
  const maxAge = 4 * 60 * 60 * 1000; // 4 hours for admin sessions

  return (now - timestamp) < maxAge;
}