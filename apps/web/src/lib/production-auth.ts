/**
 * Production-safe authentication service
 * NO DEVELOPMENT BYPASSES - PRODUCTION ONLY
 */

import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { NextRequest } from 'next/server';
import { currentEnvironment } from './env';
import { captureError, LogLevel } from './error-monitoring';
import { logSecurityEvent } from './structured-logger';

/**
 * CRITICAL: List of FORBIDDEN tokens that should NEVER work in any environment
 */
const FORBIDDEN_TOKENS = [
  'test-token',
  'dev-token',
  'DEV_MODE',
  'development-token',
  'bypass-token',
  'admin-token',
  'debug-token'
] as const;

/**
 * Production authentication error types
 */
export class ProductionAuthError extends Error {
  constructor(
    message: string,
    public readonly _code: string,
    public readonly _statusCode: number = 401
  ) {
    super(message);
    this.name = 'ProductionAuthError';
  }
}

/**
 * Validated token result
 */
export interface ValidatedToken {
  uid: string;
  email: string;
  emailVerified: boolean;
  customClaims?: Record<string, any>;
  iat: number;
  exp: number;
}

/**
 * PRODUCTION-SAFE token validation - NO BYPASSES ALLOWED
 */
export async function validateProductionToken(
  token: string,
  request: NextRequest,
  context?: {
    operation?: string;
    requireEmailVerification?: boolean;
  }
): Promise<ValidatedToken> {
  const startTime = Date.now();
  const requestId = request.headers.get('x-request-id') || 'unknown';
  
  // SECURITY: Check for forbidden development tokens
  if (FORBIDDEN_TOKENS.includes(token as any)) {
    const securityIncident = {
      severity: 'CRITICAL',
      type: 'forbidden_token_attempt',
      token: token,
      environment: currentEnvironment,
      action: context?.operation,
      requestId,
      ip: request.headers.get('x-forwarded-for') ||
          request.headers.get('x-real-ip') ||
          request.headers.get('cf-connecting-ip') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      timestamp: new Date().toISOString()
    };

    // Log security incident
    
    // Send to monitoring
    await logSecurityEvent('bypass_attempt', {
      requestId,
      ip: securityIncident.ip,
      userAgent: securityIncident.userAgent,
      action: context?.operation || 'token_validation',
      tags: {
        severity: 'critical',
        tokenType: 'forbidden',
        environment: currentEnvironment
      },
      extra: securityIncident
    });

    // Capture in error monitoring
    await captureError(new Error('Forbidden token attempted in production'), {
      level: LogLevel.ERROR,
      tags: {
        security_incident: 'true',
        forbidden_token: 'true',
        environment: currentEnvironment
      },
      extra: securityIncident
    });

    throw new ProductionAuthError(
      'Authentication failed',
      'FORBIDDEN_TOKEN',
      403
    );
  }

  // SECURITY: Basic token format validation
  if (!token || typeof token !== 'string' || token.length < 10) {
    throw new ProductionAuthError(
      'Invalid token format',
      'INVALID_FORMAT',
      400
    );
  }

  // SECURITY: Check for suspicious patterns
  const suspiciousPatterns = [
    /dev_/i,
    /test_/i,
    /debug/i,
    /bypass/i,
    /admin_/i,
    /mock/i
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(token)) {
      await logSecurityEvent('bypass_attempt', {
        requestId,
        action: context?.operation || 'token_validation',
        tags: {
          severity: 'high',
          pattern: pattern.toString(),
          environment: currentEnvironment
        }
      });

      throw new ProductionAuthError(
        'Authentication failed',
        'SUSPICIOUS_TOKEN',
        403
      );
    }
  }

  try {
    // Use Firebase Admin SDK for token validation
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token, true); // checkRevoked = true

    // Additional security checks
    const now = Math.floor(Date.now() / 1000);
    
    // Check token expiration with buffer
    if (decodedToken.exp <= now) {
      throw new ProductionAuthError(
        'Token expired',
        'TOKEN_EXPIRED',
        401
      );
    }

    // Check token age (not too old)
    const maxAge = 24 * 60 * 60; // 24 hours
    if (now - decodedToken.iat > maxAge) {
      throw new ProductionAuthError(
        'Token too old',
        'TOKEN_TOO_OLD',
        401
      );
    }

    // Require email verification if specified
    if (context?.requireEmailVerification && !decodedToken.email_verified) {
      throw new ProductionAuthError(
        'Email verification required',
        'EMAIL_NOT_VERIFIED',
        403
      );
    }

    // Validate required fields
    if (!decodedToken.id || !decodedToken.email) {
      throw new ProductionAuthError(
        'Invalid token claims',
        'INVALID_CLAIMS',
        400
      );
    }

    const duration = Date.now() - startTime;
    
    // Log successful validation (but not the token itself)
    await logSecurityEvent('invalid_token', {
      requestId,
      userId: decodedToken.id,
      action: context?.operation || 'token_validation',
      tags: {
        result: 'success',
        duration: duration.toString()
      }
    });

    return {
      uid: decodedToken.id,
      email: decodedToken.email!,
      emailVerified: decodedToken.email_verified || false,
      customClaims: decodedToken.customClaims,
      iat: decodedToken.iat,
      exp: decodedToken.exp
    };

  } catch (error) {
    const duration = Date.now() - startTime;

    // Log failed validation
    await logSecurityEvent('invalid_token', {
      requestId,
      action: context?.operation || 'token_validation',
      tags: {
        result: 'failure',
        duration: duration.toString(),
        errorType: error instanceof Error ? error.constructor.name : 'unknown'
      }
    });

    // Handle Firebase-specific errors
    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as { code: string; message: string };
      
      switch (firebaseError.code) {
        case 'auth/id-token-expired':
          throw new ProductionAuthError('Token expired', 'TOKEN_EXPIRED', 401);
        case 'auth/id-token-revoked':
          throw new ProductionAuthError('Token revoked', 'TOKEN_REVOKED', 401);
        case 'auth/invalid-id-token':
          throw new ProductionAuthError('Invalid token', 'INVALID_TOKEN', 401);
        case 'auth/user-disabled':
          throw new ProductionAuthError('Account disabled', 'ACCOUNT_DISABLED', 403);
        case 'auth/user-not-found':
          throw new ProductionAuthError('Account not found', 'ACCOUNT_NOT_FOUND', 404);
        default:
          throw new ProductionAuthError('Authentication failed', 'AUTH_FAILED', 401);
      }
    }

    // Re-throw ProductionAuthError as-is
    if (error instanceof ProductionAuthError) {
      throw error;
    }

    // Generic error
    throw new ProductionAuthError('Authentication failed', 'AUTH_FAILED', 401);
  }
}

/**
 * Extract and validate token from Authorization header
 */
export async function extractAndValidateToken(
  request: NextRequest,
  context?: {
    operation?: string;
    requireEmailVerification?: boolean;
  }
): Promise<ValidatedToken> {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    throw new ProductionAuthError(
      'Authorization header required',
      'MISSING_AUTH_HEADER',
      401
    );
  }

  if (!authHeader.startsWith('Bearer ')) {
    throw new ProductionAuthError(
      'Invalid authorization format',
      'INVALID_AUTH_FORMAT',
      401
    );
  }

  const token = authHeader.substring(7).trim();
  
  if (!token) {
    throw new ProductionAuthError(
      'Token required',
      'MISSING_TOKEN',
      401
    );
  }

  return validateProductionToken(token, request, context);
}

/**
 * PRODUCTION ONLY: No development features allowed
 */
export function isProductionEnvironment(): boolean {
  // In production, this should ALWAYS return true
  // Never allow development features in production builds
  return process.env.NODE_ENV === 'production' || 
         process.env.VERCEL_ENV === 'production' ||
         currentEnvironment === 'production';
}

/**
 * Security audit log for authentication events
 */
export async function auditAuthEvent(
  event: 'success' | 'failure' | 'forbidden' | 'suspicious',
  request: NextRequest,
  context?: {
    userId?: string;
    operation?: string;
    error?: string;
    threats?: string;
    securityLevel?: string;
  }
): Promise<void> {
  const auditData = {
    event,
    timestamp: new Date().toISOString(),
    environment: currentEnvironment,
    requestId: request.headers.get('x-request-id') || undefined,
    userId: context?.userId,
    action: context?.operation,
    ip: request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        request.headers.get('cf-connecting-ip') || undefined,
    userAgent: request.headers.get('user-agent') || undefined,
    path: new URL(request.url).pathname,
    error: context?.error
  };

  // Always log security events

  // Send to structured logging
  await logSecurityEvent('invalid_token', {
    requestId: auditData.requestId || undefined,
    userId: auditData.userId,
    ip: auditData.ip || undefined,
    userAgent: auditData.userAgent || undefined,
    action: auditData.operation || 'auth_event',
    tags: {
      authEvent: event,
      environment: auditData.environment,
      path: auditData.path
    },
    extra: auditData
  });
}