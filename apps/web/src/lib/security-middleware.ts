/**
 * Security Middleware
 * Critical security checks for all API routes
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, validateCampusAccess } from '@hive/firebase';
import { logger } from './logger';

interface SecurityContext {
  userId: string;
  campusId: string;
  email: string;
  ipAddress: string;
  userAgent: string;
}

/**
 * NEVER allow dev bypasses in production
 */
export function blockDevBypassesInProduction(): boolean {
  if (process.env.NODE_ENV === 'production') {
    // Check for dev bypass environment variables
    const dangerousVars = [
      'NEXT_PUBLIC_BYPASS_AUTH',
      'NEXT_PUBLIC_USE_EMULATOR',
      'BYPASS_RATE_LIMIT',
      'SKIP_AUTH_CHECK',
      'DEV_MODE'
    ];

    for (const varName of dangerousVars) {
      if (process.env[varName] === 'true' || process.env[varName] === '1') {
        logger.error('CRITICAL: Dev bypass detected in production!', {
          variable: varName,
          value: process.env[varName]
        });

        // Kill the server in production if bypasses are detected
        if (process.env.NODE_ENV === 'production') {
          throw new Error(`Security violation: ${varName} cannot be enabled in production`);
        }
      }
    }
  }

  return true;
}

/**
 * Enforce campus isolation
 */
export function enforceCampusIsolation(
  userCampusId: string,
  requestedCampusId: string,
  context?: string
): boolean {
  if (!validateCampusAccess(userCampusId, requestedCampusId)) {
    logger.warn('Campus isolation violation', {
      userCampusId,
      requestedCampusId,
      context,
      timestamp: new Date().toISOString()
    });

    // In production, this is a critical security violation
    if (process.env.NODE_ENV === 'production') {
      return false;
    }
  }

  return true;
}

/**
 * Rate limiting with IP-based tracking
 */
export function enforceRateLimit(
  request: NextRequest,
  identifier?: string,
  maxRequests: number = 60,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  // Get IP address
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';

  // Create rate limit key
  const rateLimitKey = identifier ? `${identifier}:${ip}` : ip;

  // Check rate limit
  const allowed = checkRateLimit(rateLimitKey, maxRequests, windowMs);

  if (!allowed) {
    logger.warn('Rate limit exceeded', {
      identifier: rateLimitKey,
      ip,
      maxRequests,
      window: `${windowMs}ms`
    });
  }

  return {
    allowed,
    remaining: allowed ? maxRequests - 1 : 0,
    resetTime: Date.now() + windowMs
  };
}

/**
 * Validate request origin
 */
export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');

  // In production, enforce strict origin checking
  if (process.env.NODE_ENV === 'production') {
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL,
      'https://hive.college',
      'https://www.hive.college',
      'https://app.hive.college'
    ].filter(Boolean);

    if (origin && !allowedOrigins.includes(origin)) {
      logger.warn('Invalid origin detected', {
        origin,
        referer: referer || undefined,
        allowedOrigins
      });
      return false;
    }
  }

  return true;
}

/**
 * Sanitize user input
 */
export function sanitizeInput<T extends Record<string, any>>(
  input: T,
  allowedFields: string[]
): Partial<T> {
  const sanitized: Partial<T> = {};

  for (const field of allowedFields) {
    if (field in input) {
      const value = input[field];

      // Remove any potential XSS attempts
      if (typeof value === 'string') {
        // Remove script tags and event handlers
        const cleaned = value
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
          .replace(/on\w+\s*=\s*'[^']*'/gi, '')
          .replace(/javascript:/gi, '');

        sanitized[field as keyof T] = cleaned as any;
      } else {
        sanitized[field as keyof T] = value;
      }
    }
  }

  return sanitized;
}

/**
 * Validate email domain for campus
 */
export function validateEmailDomain(email: string, allowedDomain: string): boolean {
  const emailDomain = email.split('@')[1]?.toLowerCase();
  return emailDomain === allowedDomain.toLowerCase();
}

/**
 * Create secure session token
 */
export function createSecureToken(data: any, secret: string): string {
  const crypto = require('crypto');

  // Create payload with expiration
  const payload = {
    ...data,
    exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    iat: Date.now()
  };

  // Create signature
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(JSON.stringify(payload));
  const signature = hmac.digest('hex');

  // Combine payload and signature
  const token = Buffer.from(JSON.stringify(payload)).toString('base64') + '.' + signature;

  return token;
}

/**
 * Verify secure token
 */
export function verifySecureToken(token: string, secret: string): { valid: boolean; data?: any } {
  try {
    const crypto = require('crypto');
    const [payloadBase64, signature] = token.split('.');

    if (!payloadBase64 || !signature) {
      return { valid: false };
    }

    // Decode payload
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());

    // Check expiration
    if (payload.exp && payload.exp < Date.now()) {
      return { valid: false };
    }

    // Verify signature
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(JSON.stringify(payload));
    const expectedSignature = hmac.digest('hex');

    if (signature !== expectedSignature) {
      return { valid: false };
    }

    return { valid: true, data: payload };
  } catch (error) {
    logger.error('Token verification failed', { error: error instanceof Error ? error.message : String(error) });
    return { valid: false };
  }
}

/**
 * Security headers for API responses
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.firebase.com https://*.firebaseio.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.firebase.com https://*.firebaseio.com wss://*.firebaseio.com"
  };
}

/**
 * Main security middleware
 */
export async function withSecurity(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    // Block dev bypasses in production
    blockDevBypassesInProduction();

    // Validate origin
    if (!validateOrigin(request)) {
      return NextResponse.json(
        { error: 'Invalid origin' },
        { status: 403, headers: getSecurityHeaders() }
      );
    }

    // Apply rate limiting
    const rateLimitResult = enforceRateLimit(request);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            ...getSecurityHeaders(),
            'Retry-After': String(Math.ceil(rateLimitResult.resetTime / 1000)),
            'X-RateLimit-Limit': '60',
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(rateLimitResult.resetTime)
          }
        }
      );
    }

    // Execute handler
    const response = await handler(request);

    // Add security headers to response
    const securityHeaders = getSecurityHeaders();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value as string);
    });

    return response;
  } catch (error) {
    logger.error('Security middleware error', { error: error instanceof Error ? error.message : String(error) });

    return NextResponse.json(
      { error: 'Security check failed' },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

// Initialize on module load
blockDevBypassesInProduction();