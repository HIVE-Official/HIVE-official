/**
 * PRODUCTION-SECURE API Authentication Middleware
 * Zero tolerance for dev bypasses in production
 */

import { NextRequest, NextResponse } from 'next/server';
import { DecodedIdToken } from 'firebase-admin/auth';
import { authAdmin } from './firebase-admin';
import { isAdminEmail } from './admin/roles';
import { logger } from './logger';
import {
  checkRedisRateLimit,
  getRateLimitHeaders,
  checkIpRateLimit,
  checkUserRateLimit
} from './rate-limiter-redis';
import {
  blockDevBypassesInProduction,
  validateOrigin,
  getSecurityHeaders,
  enforceCampusIsolation,
  sanitizeInput
} from './security-middleware';
import { getSession, validateCSRF } from './session';

interface ApiAuthOptions {
  requireAdmin?: boolean;
  allowAnonymous?: boolean;
  campusId?: string;
  rateLimit?: {
    type: string;
    identifier?: string;
  };
  allowedFields?: string[]; // For input sanitization
}

/**
 * PRODUCTION-SECURE authentication wrapper
 * Returns a function that handles the request
 * NO DEV BYPASSES - EVER
 */
export function withSecureAuth<T extends any[]>(
  handler: (request: NextRequest, token: DecodedIdToken, ...args: T) => Promise<NextResponse>,
  options: ApiAuthOptions = {}
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    // CRITICAL: Block all dev bypasses in production
    blockDevBypassesInProduction();

    const {
      requireAdmin = false,
      allowAnonymous = false,
      campusId = 'ub-buffalo', // Default to UB for vBETA
      rateLimit,
      allowedFields
    } = options;

    try {
      // 1. Validate request origin
      if (!validateOrigin(request)) {
        logger.warn('Invalid origin attempted API access', {
          origin: request.headers.get('origin'),
          referer: request.headers.get('referer'),
          url: request.url
        });

        return NextResponse.json(
          { error: 'Invalid origin' },
          { status: 403, headers: getSecurityHeaders() }
        );
      }

      // 2. Rate limiting checks
      if (rateLimit) {
        const ip = request.headers.get('x-forwarded-for') || 'unknown';

        // IP-based rate limiting
        const ipLimitResult = await checkIpRateLimit(ip, rateLimit.type);
        if (!ipLimitResult.allowed) {
          return NextResponse.json(
            { error: 'Too many requests' },
            {
              status: 429,
              headers: {
                ...getSecurityHeaders(),
                ...getRateLimitHeaders(ipLimitResult)
              }
            }
          );
        }
      }

      // 3. Check for anonymous access
      if (allowAnonymous) {
        // Still apply rate limiting and security checks
        return handler(request, {} as DecodedIdToken);
      }

      // 4. Validate authentication via header or secure session cookie
      const authHeader = request.headers.get('authorization');
      let decodedToken: DecodedIdToken | null = null;
      let authMode: 'header' | 'cookie' | 'none' = 'none';

      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.replace('Bearer ', '');
        // Prefer Firebase header auth when supplied
        try {
          decodedToken = await authAdmin.verifyIdToken(token);
          authMode = 'header';
        } catch (error) {
          logger.error('Token verification failed', {
            error,
            url: request.url
          });
          return NextResponse.json(
            { error: 'Invalid authentication token' },
            { status: 401, headers: getSecurityHeaders() }
          );
        }
      } else {
        // Fallback: verify secure HttpOnly session cookie
        const session = await getSession(request);
        if (session) {
          decodedToken = {
            // Minimal shape to satisfy downstream use (uid/email checks)
            uid: session.userId,
            email: session.email,
          } as unknown as DecodedIdToken;
          authMode = 'cookie';
        } else {
          logger.warn('Missing authentication (no header or valid session cookie)', {
            url: request.url
          });
          return NextResponse.json(
            { error: 'Authentication required' },
            { status: 401, headers: getSecurityHeaders() }
          );
        }
      }

      // 5. Admin CSRF enforcement for mutating requests
      if (requireAdmin && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
        const session = await getSession(request);
        const csrf = request.headers.get('x-csrf-token');

        if (!session || !session.isAdmin) {
          logger.warn('Admin mutation without valid admin session', { url: request.url });
          return NextResponse.json(
            { error: 'Admin session required' },
            { status: 403, headers: getSecurityHeaders() }
          );
        }

        if (!validateCSRF(session, csrf)) {
          logger.warn('Invalid CSRF token for admin mutation', { url: request.url });
          return NextResponse.json(
            { error: 'Invalid CSRF token' },
            { status: 403, headers: getSecurityHeaders() }
          );
        }
      }

      // 6. User-based rate limiting
      if (rateLimit && decodedToken) {
        const userLimitResult = await checkUserRateLimit(
          decodedToken.uid as unknown as string,
          rateLimit.type
        );

        if (!userLimitResult.allowed) {
          return NextResponse.json(
            { error: 'Too many requests for user' },
            {
              status: 429,
              headers: {
                ...getSecurityHeaders(),
                ...getRateLimitHeaders(userLimitResult)
              }
            }
          );
        }
      }

      // 7. Check admin requirements
      if (requireAdmin && decodedToken) {
        // For cookie-based sessions, decodedToken.email may be present via session mapping
        if (!isAdminEmail((decodedToken as any).email || '')) {
          logger.warn('Non-admin attempted admin access', {
            userId: decodedToken.uid,
            email: (decodedToken as any).email,
            url: request.url
          });

          return NextResponse.json(
            { error: 'Admin access required' },
            { status: 403, headers: getSecurityHeaders() }
          );
        }
      }

      // 8. Campus isolation check
      if (campusId) {
        if (authMode === 'header') {
          const tokenAny = decodedToken as unknown as { email?: string; campusId?: string; schoolId?: string };
          const userCampusId =
            tokenAny?.campusId ||
            tokenAny?.schoolId ||
            (tokenAny?.email?.toLowerCase().endsWith('@buffalo.edu') ? 'ub-buffalo' : undefined) ||
            'unknown';

          if (!enforceCampusIsolation(userCampusId, campusId)) {
            logger.warn('Campus isolation violation', {
              userId: decodedToken?.uid,
              expectedCampus: campusId,
              userEmail: (decodedToken as any)?.email,
              userCampus: userCampusId
            });
            return NextResponse.json(
              { error: 'Access denied for this campus' },
              { status: 403, headers: getSecurityHeaders() }
            );
          }
        } else if (authMode === 'cookie') {
          // For cookie-based sessions, validate campus directly from session cookie
          const session = await getSession(request);
          if (!session || session.campusId !== campusId) {
            logger.warn('Campus isolation violation (cookie auth)', {
              userId: session?.userId,
              sessionCampus: session?.campusId,
              expectedCampus: campusId
            });
            return NextResponse.json(
              { error: 'Access denied for this campus' },
              { status: 403, headers: getSecurityHeaders() }
            );
          }
        }
      }

      // 9. Input sanitization if body exists
      if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH') {
        try {
          const body = await request.json();
          const sanitized = sanitizeInput(body, allowedFields);

          // Create a new request with sanitized body
          const sanitizedRequest = new NextRequest(request.url, {
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(sanitized)
          });

          return handler(sanitizedRequest, decodedToken, ...args);
        } catch (error) {
          logger.error('Request body processing failed', {
            error,
            url: request.url
          });

          return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400, headers: getSecurityHeaders() }
          );
        }
      }

      // 10. Execute handler with authenticated context
      return handler(request, decodedToken as DecodedIdToken, ...args);

    } catch (error) {
      logger.error('Auth middleware error', {
        error,
        url: request.url
      });

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500, headers: getSecurityHeaders() }
      );
    }
  };
}
import 'server-only';
