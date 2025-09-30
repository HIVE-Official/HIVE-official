/**
 * PRODUCTION-SECURE API Authentication Middleware
 * Zero tolerance for dev bypasses in production
 */

import { NextRequest, NextResponse } from 'next/server';
import { DecodedIdToken } from 'firebase-admin/auth';
import admin from './firebase-admin';
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
 * NO DEV BYPASSES - EVER
 */
export async function withSecureAuth(
  request: NextRequest,
  handler: (request: NextRequest, token: DecodedIdToken) => Promise<NextResponse>,
  options: ApiAuthOptions = {}
): Promise<NextResponse> {
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

    // 2. Apply IP-based rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') || // Cloudflare
      'unknown';

    // Check IP rate limit
    if (!await checkIpRateLimit(ip, request.nextUrl.pathname)) {
      logger.warn('IP rate limit exceeded', {
        ip,
        path: request.nextUrl.pathname
      });

      const rateLimitResult = await checkRedisRateLimit('api', ip);
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            ...getSecurityHeaders(),
            ...getRateLimitHeaders(rateLimitResult)
          }
        }
      );
    }

    // 3. Extract and validate auth token
    const authHeader = request.headers.get('authorization');

    // If anonymous access is allowed and no auth header provided
    if (allowAnonymous && !authHeader) {
      // Still apply rate limiting for anonymous requests
      const anonRateLimitResult = await checkRedisRateLimit('api', ip);
      if (!anonRateLimitResult.success) {
        return NextResponse.json(
          { error: 'Too many requests' },
          {
            status: 429,
            headers: {
              ...getSecurityHeaders(),
              ...getRateLimitHeaders(anonRateLimitResult)
            }
          }
        );
      }

      // Create anonymous token for handler
      const anonymousToken: DecodedIdToken = {
        uid: 'anonymous',
        email: undefined,
        email_verified: false,
        campusId,
        aud: '',
        auth_time: 0,
        exp: 0,
        firebase: { identities: {}, sign_in_provider: 'anonymous' },
        iat: 0,
        iss: '',
        sub: ''
      };

      return await handler(request, anonymousToken);
    }

    // Require auth header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn('Missing or invalid auth header', {
        ip,
        path: request.nextUrl.pathname,
        hasHeader: !!authHeader
      });

      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401, headers: getSecurityHeaders() }
      );
    }

    const token = authHeader.substring(7);

    // 4. Verify Firebase token
    let decodedToken: DecodedIdToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (error: any) {
      logger.error('Token verification failed', {
        error: error.message,
        code: error.code,
        ip,
        path: request.nextUrl.pathname
      });

      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401, headers: getSecurityHeaders() }
      );
    }

    // 5. Verify UB email for vBETA
    if (decodedToken.email && !decodedToken.email.endsWith('@buffalo.edu')) {
      logger.error('Non-UB email attempted access', {
        email: decodedToken.email,
        uid: decodedToken.uid,
        ip,
        path: request.nextUrl.pathname
      });

      return NextResponse.json(
        { error: 'Only @buffalo.edu emails are allowed during beta' },
        { status: 403, headers: getSecurityHeaders() }
      );
    }

    // 6. Add campus ID to token
    decodedToken.campusId = campusId;

    // 7. Check admin requirements
    if (requireAdmin) {
      const adminEmails = [
        'jwrhineh@buffalo.edu',
        'noahowsh@gmail.com'
      ];

      if (!decodedToken.email || !adminEmails.includes(decodedToken.email)) {
        logger.warn('Non-admin attempted admin endpoint', {
          email: decodedToken.email,
          uid: decodedToken.uid,
          ip,
          path: request.nextUrl.pathname
        });

        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403, headers: getSecurityHeaders() }
        );
      }
    }

    // 8. Apply user-specific rate limiting
    if (rateLimit) {
      const identifier = rateLimit.identifier || decodedToken.uid;
      const rateLimitResult = await checkRedisRateLimit(rateLimit.type, identifier);

      if (!rateLimitResult.success) {
        logger.warn('User rate limit exceeded', {
          uid: decodedToken.uid,
          type: rateLimit.type,
          identifier
        });

        return NextResponse.json(
          { error: 'Too many requests' },
          {
            status: 429,
            headers: {
              ...getSecurityHeaders(),
              ...getRateLimitHeaders(rateLimitResult)
            }
          }
        );
      }
    }

    // 9. Sanitize request body if fields are specified
    if (allowedFields && request.method !== 'GET') {
      try {
        const body = await request.json();
        const sanitizedBody = sanitizeInput(body, allowedFields);

        // Create new request with sanitized body
        const sanitizedRequest = new NextRequest(request.url, {
          method: request.method,
          headers: request.headers,
          body: JSON.stringify(sanitizedBody)
        });

        // Use sanitized request for handler
        const response = await handler(sanitizedRequest, decodedToken);

        // Add security headers
        const securityHeaders = getSecurityHeaders();
        Object.entries(securityHeaders).forEach(([key, value]) => {
          response.headers.set(key, value as string);
        });

        return response;
      } catch (error) {
        logger.error('Request body sanitization failed', { error: error instanceof Error ? error : new Error(String(error)) });
        return NextResponse.json(
          { error: 'Invalid request body' },
          { status: 400, headers: getSecurityHeaders() }
        );
      }
    }

    // 10. Execute handler with authenticated token
    const response = await handler(request, decodedToken);

    // 11. Add security headers to response
    const securityHeaders = getSecurityHeaders();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value as string);
    });

    return response;

  } catch (error) {
    logger.error('Auth middleware error', { error: error instanceof Error ? error : new Error(String(error)) });

    return NextResponse.json(
      { error: 'Authentication service error' },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

/**
 * Wrapper for public endpoints (no auth required but rate limited)
 */
export function withPublicAccess(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    // Block dev bypasses
    blockDevBypassesInProduction();

    // Validate origin
    if (!validateOrigin(request)) {
      return NextResponse.json(
        { error: 'Invalid origin' },
        { status: 403, headers: getSecurityHeaders() }
      );
    }

    // Apply rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') || 'unknown';

    if (!await checkIpRateLimit(ip, request.nextUrl.pathname)) {
      const rateLimitResult = await checkRedisRateLimit('api', ip);
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            ...getSecurityHeaders(),
            ...getRateLimitHeaders(rateLimitResult)
          }
        }
      );
    }

    // Execute handler
    const response = await handler(request);

    // Add security headers
    const securityHeaders = getSecurityHeaders();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value as string);
    });

    return response;
  };
}

/**
 * Wrapper for admin-only endpoints
 */
export function withAdminAuth(
  handler: (request: NextRequest, token: DecodedIdToken) => Promise<NextResponse>
) {
  return withSecureAuth(handler, {
    requireAdmin: true,
    rateLimit: { type: 'adminApi' }
  });
}

/**
 * Wrapper for authenticated user endpoints
 */
export function withUserAuth(
  handler: (request: NextRequest, token: DecodedIdToken) => Promise<NextResponse>,
  options: Omit<ApiAuthOptions, 'requireAdmin'> = {}
) {
  return withSecureAuth(handler, {
    ...options,
    requireAdmin: false,
    rateLimit: options.rateLimit || { type: 'api' }
  });
}

// Export types
export type { DecodedIdToken, ApiAuthOptions };