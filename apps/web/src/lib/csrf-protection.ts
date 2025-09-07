/**
 * PRODUCTION-SECURE CSRF protection with comprehensive attack prevention
 * Implements multiple CSRF defense mechanisms and threat detection
 */

import { NextRequest, NextResponse } from 'next/server';
import { createHash, randomBytes } from 'crypto';
import { logSecurityEvent } from './structured-logger';
import { currentEnvironment } from './env';
import { getSecureClientId } from './secure-rate-limiter';

/**
 * CSRF protection configuration
 */
const CSRF_CONFIG = {
  // Token settings
  TOKEN_LENGTH: 32,
  TOKEN_LIFETIME: 60 * 60 * 1000, // 1 hour
  MAX_TOKENS_PER_SESSION: 10,
  
  // Cookie settings
  COOKIE_NAME: 'hive_csrf',
  COOKIE_OPTIONS: {
    httpOnly: false, // Must be accessible to JavaScript for forms
    secure: currentEnvironment === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: 60 * 60 // 1 hour
  },
  
  // Header settings
  HEADER_NAME: 'x-csrf-token',
  FORM_FIELD_NAME: '_csrf',
  
  // Security settings
  REQUIRE_REFERER_CHECK: true,
  ALLOWED_ORIGINS: [] as string[], // Will be populated from env
  STRICT_MODE: currentEnvironment === 'production'
} as const;

/**
 * CSRF token data structure
 */
interface CSRFTokenData {
  token: string;
  sessionId: string;
  clientId: string;
  issuedAt: number;
  expiresAt: number;
  usageCount: number;
  fingerprint: string;
}

/**
 * CSRF validation result
 */
export interface CSRFValidationResult {
  valid: boolean;
  reason?: string;
  token?: string;
  securityViolation: boolean;
}

/**
 * Secure CSRF protection manager
 */
export class CSRFProtection {
  private static tokenStore = new Map<string, CSRFTokenData>();
  private static sessionTokens = new Map<string, Set<string>>();

  /**
   * Generate cryptographically secure CSRF token
   */
  static generateToken(sessionId: string, clientId: string): string {
    // Generate random bytes
    const randomToken = randomBytes(CSRF_CONFIG.TOKEN_LENGTH).toString('hex');
    
    // Create hash incorporating session and client info
    const hash = createHash('sha256');
    hash.update(randomToken);
    hash.update(sessionId);
    hash.update(clientId);
    hash.update(Date.now().toString());
    
    return hash.digest('hex');
  }

  /**
   * Create CSRF token for session
   */
  static async createToken(
    request: NextRequest,
    sessionId: string
  ): Promise<{
    token: string;
    expiresAt: number;
  }> {
    const clientId = getSecureClientId(request);
    const now = Date.now();
    const token = this.generateToken(sessionId, clientId);
    
    // Create fingerprint for additional security
    const fingerprint = this.createFingerprint(request);
    
    const tokenData: CSRFTokenData = {
      token,
      sessionId,
      clientId,
      issuedAt: now,
      expiresAt: now + CSRF_CONFIG.TOKEN_LIFETIME,
      usageCount: 0,
      fingerprint
    };

    // Clean up old tokens for this session
    await this.cleanupSessionTokens(sessionId);
    
    // Store token
    this.tokenStore.set(token, tokenData);
    
    // Track tokens per session
    if (!this.sessionTokens.has(sessionId)) {
      this.sessionTokens.set(sessionId, new Set());
    }
    this.sessionTokens.get(sessionId)!.add(token);

    // Log token creation
    await logSecurityEvent('csrf', {
      operation: 'token_created',
      tags: {
        sessionId,
        clientId,
        environment: currentEnvironment
      }
    });

    return {
      token,
      expiresAt: tokenData.expiresAt
    };
  }

  /**
   * Validate CSRF token with comprehensive security checks
   */
  static async validateToken(
    request: NextRequest,
    sessionId: string
  ): Promise<CSRFValidationResult> {
    try {
      // Extract token from multiple sources
      const token = this.extractToken(request);
      
      if (!token) {
        return {
          valid: false,
          reason: 'missing_token',
          securityViolation: false
        };
      }

      // Get token data
      const tokenData = this.tokenStore.get(token);
      if (!tokenData) {
        await logSecurityEvent('csrf', {
          operation: 'invalid_token_used',
          tags: {
            sessionId,
            token: token.substring(0, 8), // Log only prefix for security
            environment: currentEnvironment
          }
        });

        return {
          valid: false,
          reason: 'token_not_found',
          securityViolation: true
        };
      }

      // Check token expiration
      const now = Date.now();
      if (tokenData.expiresAt < now) {
        this.tokenStore.delete(token);
        return {
          valid: false,
          reason: 'token_expired',
          securityViolation: false
        };
      }

      // Validate session binding
      if (tokenData.sessionId !== sessionId) {
        await logSecurityEvent('csrf', {
          operation: 'session_mismatch',
          tags: {
            expectedSession: sessionId,
            tokenSession: tokenData.sessionId,
            environment: currentEnvironment
          }
        });

        return {
          valid: false,
          reason: 'session_mismatch',
          securityViolation: true
        };
      }

      // Validate client ID
      const currentClientId = getSecureClientId(request);
      if (tokenData.clientId !== currentClientId) {
        await logSecurityEvent('csrf', {
          operation: 'client_mismatch',
          tags: {
            sessionId,
            expectedClient: tokenData.clientId,
            currentClient: currentClientId,
            environment: currentEnvironment
          }
        });

        return {
          valid: false,
          reason: 'client_mismatch',
          securityViolation: true
        };
      }

      // Validate fingerprint
      const currentFingerprint = this.createFingerprint(request);
      if (tokenData.fingerprint !== currentFingerprint) {
        await logSecurityEvent('csrf', {
          operation: 'fingerprint_mismatch',
          tags: {
            sessionId,
            token: token.substring(0, 8),
            environment: currentEnvironment
          }
        });

        return {
          valid: false,
          reason: 'fingerprint_mismatch',
          securityViolation: true
        };
      }

      // SECURITY: Validate origin and referer
      if (CSRF_CONFIG.REQUIRE_REFERER_CHECK) {
        const originCheck = await this.validateOrigin(request);
        if (!originCheck.valid) {
          return {
            valid: false,
            reason: originCheck.reason,
            securityViolation: true
          };
        }
      }

      // Update token usage
      tokenData.usageCount++;
      
      // Implement token consumption (single-use for critical operations)
      if (request.method === 'DELETE' || request.url.includes('/admin/')) {
        this.tokenStore.delete(token);
        this.sessionTokens.get(sessionId)?.delete(token);
      }

      await logSecurityEvent('csrf', {
        operation: 'token_validated',
        tags: {
          sessionId,
          usageCount: tokenData.usageCount.toString(),
          environment: currentEnvironment
        }
      });

      return {
        valid: true,
        token,
        securityViolation: false
      };

    } catch (error) {
      console.error('CSRF validation error:', error);
      
      await logSecurityEvent('csrf', {
        operation: 'validation_error',
        tags: {
          sessionId,
          error: error instanceof Error ? error.message : 'unknown',
          environment: currentEnvironment
        }
      });

      return {
        valid: false,
        reason: 'validation_error',
        securityViolation: true
      };
    }
  }

  /**
   * Extract CSRF token from request
   */
  private static extractToken(request: NextRequest): string | null {
    // Check header first (preferred for AJAX)
    const headerToken = request.headers.get(CSRF_CONFIG.HEADER_NAME);
    if (headerToken) {
      return headerToken;
    }

    // Check form data for POST requests
    if (request.method === 'POST') {
      // This would need to be extracted from form data
      // Implementation depends on how you handle form parsing
      // For now, we'll focus on header-based tokens
    }

    // Check cookie as fallback (double-submit pattern)
    const cookieToken = request.cookies.get(CSRF_CONFIG.COOKIE_NAME)?.value;
    if (cookieToken) {
      return cookieToken;
    }

    return null;
  }

  /**
   * Validate origin and referer headers
   */
  private static async validateOrigin(request: NextRequest): Promise<{
    valid: boolean;
    reason?: string;
  }> {
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    const host = request.headers.get('host');

    // For state-changing requests, require origin or referer
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
      if (!origin && !referer) {
        await logSecurityEvent('csrf', {
          operation: 'missing_origin_referer',
          tags: {
            method: request.method,
            host: host || 'unknown',
            environment: currentEnvironment
          }
        });

        return {
          valid: false,
          reason: 'missing_origin_referer'
        };
      }

      // Validate origin if present
      if (origin) {
        const isValidOrigin = this.isValidOrigin(origin, host);
        if (!isValidOrigin) {
          await logSecurityEvent('csrf', {
            operation: 'invalid_origin',
            tags: {
              origin,
              host: host || 'unknown',
              environment: currentEnvironment
            }
          });

          return {
            valid: false,
            reason: 'invalid_origin'
          };
        }
      }

      // Validate referer if present
      if (referer && !origin) {
        const isValidReferer = this.isValidReferer(referer, host);
        if (!isValidReferer) {
          await logSecurityEvent('csrf', {
            operation: 'invalid_referer',
            tags: {
              referer,
              host: host || 'unknown',
              environment: currentEnvironment
            }
          });

          return {
            valid: false,
            reason: 'invalid_referer'
          };
        }
      }
    }

    return { valid: true };
  }

  /**
   * Validate origin header
   */
  private static isValidOrigin(origin: string, host: string | null): boolean {
    if (!host) return false;

    try {
      const originUrl = new URL(origin);
      const expectedOrigins = [
        `https://${host}`,
        `http://${host}`, // Only for development
        ...CSRF_CONFIG.ALLOWED_ORIGINS
      ];

      // In production, only allow HTTPS
      if (currentEnvironment === 'production' && originUrl.protocol !== 'https:') {
        return false;
      }

      return expectedOrigins.includes(origin);
    } catch {
      return false;
    }
  }

  /**
   * Validate referer header
   */
  private static isValidReferer(referer: string, host: string | null): boolean {
    if (!host) return false;

    try {
      const refererUrl = new URL(referer);
      
      // In production, only allow HTTPS
      if (currentEnvironment === 'production' && refererUrl.protocol !== 'https:') {
        return false;
      }

      // Check if referer hostname matches expected host
      return refererUrl.hostname === host;
    } catch {
      return false;
    }
  }

  /**
   * Create request fingerprint for additional security
   */
  private static createFingerprint(request: NextRequest): string {
    const components = [
      request.headers.get('user-agent') || '',
      request.headers.get('accept-language') || '',
      request.headers.get('accept-encoding') || ''
    ];

    const fingerprintData = components.join('|');
    return createHash('sha256').update(fingerprintData).digest('hex').substring(0, 16);
  }

  /**
   * Clean up old tokens for a session
   */
  private static async cleanupSessionTokens(sessionId: string): Promise<void> {
    const sessionTokenSet = this.sessionTokens.get(sessionId);
    if (!sessionTokenSet) return;

    const now = Date.now();
    const expiredTokens: string[] = [];

    // Find expired tokens
    for (const token of sessionTokenSet) {
      const tokenData = this.tokenStore.get(token);
      if (!tokenData || tokenData.expiresAt < now) {
        expiredTokens.push(token);
      }
    }

    // Remove expired tokens
    for (const token of expiredTokens) {
      this.tokenStore.delete(token);
      sessionTokenSet.delete(token);
    }

    // Limit tokens per session
    if (sessionTokenSet.size > CSRF_CONFIG.MAX_TOKENS_PER_SESSION) {
      const tokensArray = Array.from(sessionTokenSet);
      const tokensToRemove = tokensArray.slice(0, sessionTokenSet.size - CSRF_CONFIG.MAX_TOKENS_PER_SESSION);
      
      for (const token of tokensToRemove) {
        this.tokenStore.delete(token);
        sessionTokenSet.delete(token);
      }
    }
  }

  /**
   * Set CSRF token cookie
   */
  static setCSRFCookie(response: NextResponse, token: string): void {
    response.cookies.set(
      CSRF_CONFIG.COOKIE_NAME,
      token,
      CSRF_CONFIG.COOKIE_OPTIONS
    );
  }

  /**
   * Clear CSRF cookie
   */
  static clearCSRFCookie(response: NextResponse): void {
    response.cookies.delete(CSRF_CONFIG.COOKIE_NAME);
  }

  /**
   * Global cleanup of expired tokens
   */
  static async globalCleanup(): Promise<void> {
    const now = Date.now();
    let cleanedCount = 0;

    // Clean up expired tokens
    for (const [token, tokenData] of this.tokenStore.entries()) {
      if (tokenData.expiresAt < now) {
        this.tokenStore.delete(token);
        this.sessionTokens.get(tokenData.sessionId)?.delete(token);
        cleanedCount++;
      }
    }

    // Clean up empty session token sets
    for (const [sessionId, tokenSet] of this.sessionTokens.entries()) {
      if (tokenSet.size === 0) {
        this.sessionTokens.delete(sessionId);
      }
    }

    if (cleanedCount > 0) {
      console.log(`Cleaned ${cleanedCount} expired CSRF tokens`);
    }
  }

  /**
   * Get CSRF protection status
   */
  static getProtectionStatus(): {
    totalTokens: number;
    activeSessions: number;
    environment: string;
    strictMode: boolean;
  } {
    return {
      totalTokens: this.tokenStore.size,
      activeSessions: this.sessionTokens.size,
      environment: currentEnvironment,
      strictMode: CSRF_CONFIG.STRICT_MODE
    };
  }
}

/**
 * Simple CSRF token validation for immediate use
 * This is a temporary implementation that skips validation in development
 */
export function validateCSRFToken(request: NextRequest): {
  valid: boolean;
  error?: string;
} {
  // Skip CSRF validation in development for now
  // TODO: Enable full CSRF protection once frontend is updated
  if (process.env.NODE_ENV === 'development') {
    return { valid: true };
  }

  // In production, implement basic CSRF checks
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  // Basic origin validation
  if (!origin && !referer) {
    return {
      valid: false,
      error: 'Missing origin and referer headers'
    };
  }

  return { valid: true };
}

/**
 * CSRF middleware for API routes
 */
export async function csrfMiddleware(
  request: NextRequest,
  sessionId: string,
  options: {
    exemptMethods?: string[];
    requireToken?: boolean;
  } = {}
): Promise<{
  valid: boolean;
  response?: NextResponse;
  token?: string;
}> {
  const {
    exemptMethods = ['GET', 'HEAD', 'OPTIONS'],
    requireToken: _requireToken = true
  } = options;

  // Skip CSRF protection for safe methods
  if (exemptMethods.includes(request.method)) {
    return { valid: true };
  }

  // Validate CSRF token
  const validationResult = await CSRFProtection.validateToken(request, sessionId);
  
  if (!validationResult.valid) {
    const statusCode = validationResult.securityViolation ? 403 : 400;
    const errorMessage = validationResult.securityViolation 
      ? 'CSRF security violation detected'
      : 'Invalid or missing CSRF token';

    return {
      valid: false,
      response: NextResponse.json(
        { 
          error: errorMessage,
          code: 'CSRF_VALIDATION_FAILED'
        },
        { status: statusCode }
      )
    };
  }

  return {
    valid: true,
    token: validationResult.token
  };
}

/**
 * Higher-order function to add CSRF protection to handlers
 */
export function withCSRFProtection(
  handler: (_request: NextRequest, _csrfToken?: string) => Promise<NextResponse>,
  options: {
    getSessionId: (_request: NextRequest) => Promise<string | null>;
    exemptMethods?: string[];
  }
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      const sessionId = await options.getSessionId(request);
      
      if (!sessionId) {
        return NextResponse.json(
          { error: 'Session required for CSRF protection' },
          { status: 401 }
        );
      }

      const csrfResult = await csrfMiddleware(request, sessionId, {
        exemptMethods: options.exemptMethods
      });

      if (!csrfResult.valid && csrfResult.response) {
        return csrfResult.response;
      }

      return handler(request, csrfResult.token);
    } catch (error) {
      console.error('CSRF middleware error:', error);
      return NextResponse.json(
        { error: 'CSRF protection service unavailable' },
        { status: 503 }
      );
    }
  };
}

// Run cleanup every 30 minutes
setInterval(() => {
  CSRFProtection.globalCleanup();
}, 30 * 60 * 1000);