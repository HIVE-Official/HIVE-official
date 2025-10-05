/**
 * PRODUCTION-SECURE API Authentication Middleware
 * Zero tolerance for dev bypasses in production
 */

import { NextRequest, NextResponse } from 'next/server';
import { DecodedIdToken } from 'firebase-admin/auth';
import { authAdmin } from './firebase-admin';
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
 * Returns a function that handles the request
 * NO DEV BYPASSES - EVER
 */
export function withSecureAuth(
  handler: (request: NextRequest, token: DecodedIdToken) => Promise<NextResponse>,
  options: ApiAuthOptions = {}
) {
  return async (request: NextRequest): Promise<NextResponse> => {
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

      // 4. Validate authentication token
      const authHeader = request.headers.get('authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        logger.warn('Missing or invalid auth header', {
          url: request.url,
          hasHeader: !!authHeader,
          headerStart: authHeader?.substring(0, 10)
        });

        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401, headers: getSecurityHeaders() }
        );
      }

      const token = authHeader.replace('Bearer ', '');

      // 5. Verify Firebase token
      let decodedToken: DecodedIdToken;
      try {
        decodedToken = await authAdmin.verifyIdToken(token);
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

      // 6. User-based rate limiting
      if (rateLimit) {
        const userLimitResult = await checkUserRateLimit(
          decodedToken.id,
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
      if (requireAdmin) {
        const adminEmails = [
          'jwrhineh@buffalo.edu',
          'noahowsh@gmail.com'
        ];

        if (!adminEmails.includes(decodedToken.email || '')) {
          logger.warn('Non-admin attempted admin access', {
            userId: decodedToken.id,
            email: decodedToken.email,
            url: request.url
          });

          return NextResponse.json(
            { error: 'Admin access required' },
            { status: 403, headers: getSecurityHeaders() }
          );
        }
      }

      // 8. Campus isolation check
      if (campusId && !enforceCampusIsolation(decodedToken, campusId)) {
        logger.warn('Campus isolation violation', {
          userId: decodedToken.id,
          expectedCampus: campusId,
          userEmail: decodedToken.email
        });

        return NextResponse.json(
          { error: 'Access denied for this campus' },
          { status: 403, headers: getSecurityHeaders() }
        );
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

          return handler(sanitizedRequest, decodedToken);
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
      return handler(request, decodedToken);

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