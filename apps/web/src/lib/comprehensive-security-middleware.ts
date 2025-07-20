/**
 * COMPREHENSIVE SECURITY MIDDLEWARE
 * Combines all security measures into a unified protection system
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateRequest, ValidationMiddlewareOptions } from './validation-middleware';
import { sessionMiddleware, SessionMiddlewareOptions, SessionContext } from './session-middleware';
import { csrfMiddleware } from './csrf-protection';
import { enforceRateLimit } from './secure-rate-limiter';
import { logSecurityEvent } from './structured-logger';
import { currentEnvironment } from './env';
import { z } from 'zod';

/**
 * Comprehensive security configuration
 */
export interface SecurityConfig {
  // Rate limiting
  rateLimit?: {
    limiterType: 'authentication' | 'magicLink' | 'apiGeneral' | 'handleCheck' | 'adminOperations';
    bypass?: boolean;
  };
  
  // Input validation
  validation?: {
    schema?: z.ZodSchema<any>;
    validateBody?: boolean;
    validateQuery?: boolean;
    securityLevel: 'AUTHENTICATION' | 'USER_DATA' | 'CONTENT_CREATION' | 'PUBLIC_READ' | 'ADMIN';
    operation: string;
  };
  
  // Session management
  session?: SessionMiddlewareOptions & {
    bypass?: boolean;
  };
  
  // CSRF protection
  csrf?: {
    enabled: boolean;
    exemptMethods?: string[];
    strictMode?: boolean;
  };
  
  // Security headers
  headers?: {
    enabled: boolean;
    customHeaders?: Record<string, string>;
  };
  
  // Logging
  logging?: {
    operation: string;
    logSuccess?: boolean;
    logFailures?: boolean;
  };
}

/**
 * Security middleware result
 */
export interface SecurityResult {
  allowed: boolean;
  response?: NextResponse;
  context: {
    session?: SessionContext;
    validatedData?: any;
    csrfToken?: string;
    securityLevel: 'safe' | 'elevated' | 'restricted';
    violations: string[];
  };
}

/**
 * Comprehensive security middleware
 */
export async function comprehensiveSecurityMiddleware(
  request: NextRequest,
  config: SecurityConfig
): Promise<SecurityResult> {
  const violations: string[] = [];
  let securityLevel: 'safe' | 'elevated' | 'restricted' = 'safe';
  let sessionContext: SessionContext | undefined;
  let validatedData: any;
  let csrfToken: string | undefined;

  try {
    // 1. RATE LIMITING (First line of defense)
    if (config.rateLimit && !config.rateLimit.bypass) {
      const rateLimitResult = await enforceRateLimit(config.rateLimit.limiterType, request);
      
      if (!rateLimitResult.allowed) {
        violations.push('rate_limit_exceeded');
        
        await logSecurityEvent('security_middleware', {
          operation: `${config.logging?.operation || 'unknown'}_rate_limited`,
          tags: {
            limiterType: config.rateLimit.limiterType,
            environment: currentEnvironment
          }
        });

        return {
          allowed: false,
          response: NextResponse.json(
            { error: rateLimitResult.error },
            { 
              status: rateLimitResult.status,
              headers: rateLimitResult.headers
            }
          ),
          context: {
            securityLevel: 'restricted',
            violations
          }
        };
      }
    }

    // 2. INPUT VALIDATION (Prevent malicious input)
    if (config.validation) {
      const validationResult = await validateRequest(request, {
        schema: config.validation.schema,
        securityLevel: config.validation.securityLevel,
        operation: config.validation.operation,
        validateBody: config.validation.validateBody,
        validateQuery: config.validation.validateQuery
      });

      if (!validationResult.success) {
        violations.push('input_validation_failed');
        
        if (validationResult.blocked) {
          await logSecurityEvent('security_middleware', {
            operation: `${config.validation.operation}_input_blocked`,
            tags: {
              reason: validationResult.reason || 'validation_failed',
              securityLevel: validationResult.securityLevel,
              environment: currentEnvironment
            }
          });

          return {
            allowed: false,
            response: NextResponse.json(
              { error: 'Input validation failed' },
              { status: 400 }
            ),
            context: {
              securityLevel: 'restricted',
              violations
            }
          };
        }
        
        // Set elevated security level for suspicious inputs
        if (validationResult.securityLevel === 'suspicious') {
          securityLevel = 'elevated';
        } else if (validationResult.securityLevel === 'dangerous') {
          securityLevel = 'restricted';
        }
      }

      validatedData = validationResult.data;
    }

    // 3. SESSION MANAGEMENT (Authentication & authorization)
    if (config.session && !config.session.bypass) {
      const sessionResult = await sessionMiddleware(request, config.session);
      
      if (!sessionResult.success && sessionResult.response) {
        violations.push('session_validation_failed');
        
        await logSecurityEvent('security_middleware', {
          operation: `${config.logging?.operation || 'unknown'}_session_failed`,
          tags: {
            environment: currentEnvironment
          }
        });

        return {
          allowed: false,
          response: sessionResult.response,
          context: {
            securityLevel: 'restricted',
            violations
          }
        };
      }

      sessionContext = sessionResult.context;
      
      // Elevate security level based on session context
      if (sessionContext.securityLevel === 'elevated') {
        securityLevel = 'elevated';
      } else if (sessionContext.securityLevel === 'restricted') {
        securityLevel = 'restricted';
      }
    }

    // 4. CSRF PROTECTION (Prevent cross-site request forgery)
    if (config.csrf?.enabled && sessionContext?.session?.sessionId) {
      const csrfResult = await csrfMiddleware(
        request,
        sessionContext.session.sessionId,
        {
          exemptMethods: config.csrf.exemptMethods,
          requireToken: true
        }
      );

      if (!csrfResult.valid && csrfResult.response) {
        violations.push('csrf_validation_failed');
        
        await logSecurityEvent('security_middleware', {
          operation: `${config.logging?.operation || 'unknown'}_csrf_failed`,
          tags: {
            sessionId: sessionContext.session.sessionId,
            environment: currentEnvironment
          }
        });

        return {
          allowed: false,
          response: csrfResult.response,
          context: {
            session: sessionContext,
            securityLevel: 'restricted',
            violations
          }
        };
      }

      csrfToken = csrfResult.token;
    }

    // 5. SECURITY HEADERS (Apply protective headers)
    // This will be handled in the response phase

    // 6. SUCCESS LOGGING
    if (config.logging?.logSuccess) {
      await logSecurityEvent('security_middleware', {
        operation: `${config.logging.operation}_success`,
        tags: {
          securityLevel,
          authenticated: sessionContext?.isAuthenticated.toString() || 'false',
          violations: violations.length.toString(),
          environment: currentEnvironment
        }
      });
    }

    return {
      allowed: true,
      context: {
        session: sessionContext,
        validatedData,
        csrfToken,
        securityLevel,
        violations
      }
    };

  } catch (error) {
    console.error('Comprehensive security middleware error:', error);
    
    violations.push('middleware_error');
    
    await logSecurityEvent('security_middleware', {
      operation: `${config.logging?.operation || 'unknown'}_error`,
      tags: {
        error: error instanceof Error ? error.message : 'unknown',
        environment: currentEnvironment
      }
    });

    // Fail securely - block access on middleware errors
    return {
      allowed: false,
      response: NextResponse.json(
        { error: 'Security middleware unavailable' },
        { status: 503 }
      ),
      context: {
        securityLevel: 'restricted',
        violations
      }
    };
  }
}

/**
 * Apply security headers to response
 */
export function applySecurityHeaders(
  response: NextResponse,
  config: SecurityConfig['headers'] = { enabled: true }
): NextResponse {
  if (!config.enabled) {
    return response;
  }

  // Basic security headers
  const securityHeaders = {
    // Prevent clickjacking
    'X-Frame-Options': 'DENY',
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // XSS protection
    'X-XSS-Protection': '1; mode=block',
    
    // Referrer policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'"
    ].join('; '),
    
    // HSTS (HTTPS only)
    ...(currentEnvironment === 'production' && {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    }),
    
    // Permissions policy
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()'
    ].join(', '),
    
    // Custom headers
    ...config.customHeaders
  };

  // Apply headers
  Object.entries(securityHeaders).forEach(([name, value]) => {
    if (value) {
      response.headers.set(name, value);
    }
  });

  return response;
}

/**
 * Higher-order function for comprehensive security
 */
export function withComprehensiveSecurity(
  handler: (
    request: NextRequest,
    context: SecurityResult['context'],
    params?: any
  ) => Promise<NextResponse>,
  config: SecurityConfig
) {
  return async (request: NextRequest, params?: any): Promise<NextResponse> => {
    // Apply security middleware
    const securityResult = await comprehensiveSecurityMiddleware(request, config);
    
    // Return security response if blocked
    if (!securityResult.allowed && securityResult.response) {
      return applySecurityHeaders(securityResult.response, config.headers);
    }

    try {
      // Call the actual handler
      const response = await handler(request, securityResult.context, params);
      
      // Apply security headers to response
      const secureResponse = applySecurityHeaders(response, config.headers);
      
      // Handle session token rotation
      if (securityResult.context.session?.rotated) {
        // Session rotation is handled by session middleware
      }
      
      return secureResponse;
      
    } catch (error) {
      console.error('Handler error in security middleware:', error);
      
      // Log handler errors with security context
      await logSecurityEvent('security_middleware', {
        operation: `${config.logging?.operation || 'unknown'}_handler_error`,
        tags: {
          error: error instanceof Error ? error.message : 'unknown',
          authenticated: securityResult.context.session?.isAuthenticated.toString() || 'false',
          endpoint: request.url,
          environment: currentEnvironment
        }
      });

      const errorResponse = NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
      
      return applySecurityHeaders(errorResponse, config.headers);
    }
  };
}

/**
 * Pre-configured security profiles for common use cases
 */
export const SecurityProfiles = {
  /**
   * Authentication endpoints (magic link, login, etc.)
   */
  authentication: (operation: string, schema?: z.ZodSchema<any>): SecurityConfig => ({
    rateLimit: { limiterType: 'authentication' },
    validation: {
      schema,
      validateBody: true,
      securityLevel: 'AUTHENTICATION',
      operation
    },
    session: { required: false },
    csrf: { enabled: false }, // CSRF not needed for auth endpoints
    headers: { enabled: true },
    logging: { operation, logSuccess: true, logFailures: true }
  }),

  /**
   * User data endpoints
   */
  userData: (operation: string, schema?: z.ZodSchema<any>): SecurityConfig => ({
    rateLimit: { limiterType: 'apiGeneral' },
    validation: {
      schema,
      validateBody: true,
      securityLevel: 'USER_DATA',
      operation
    },
    session: { required: true },
    csrf: { enabled: true },
    headers: { enabled: true },
    logging: { operation, logFailures: true }
  }),

  /**
   * Content creation endpoints
   */
  contentCreation: (operation: string, schema?: z.ZodSchema<any>): SecurityConfig => ({
    rateLimit: { limiterType: 'apiGeneral' },
    validation: {
      schema,
      validateBody: true,
      securityLevel: 'CONTENT_CREATION',
      operation
    },
    session: { required: true },
    csrf: { enabled: true },
    headers: { enabled: true },
    logging: { operation, logFailures: true }
  }),

  /**
   * Public read endpoints
   */
  publicRead: (operation: string): SecurityConfig => ({
    rateLimit: { limiterType: 'apiGeneral' },
    validation: {
      validateQuery: true,
      securityLevel: 'PUBLIC_READ',
      operation
    },
    session: { required: false },
    csrf: { enabled: false },
    headers: { enabled: true },
    logging: { operation }
  }),

  /**
   * Admin endpoints
   */
  admin: (operation: string, schema?: z.ZodSchema<any>): SecurityConfig => ({
    rateLimit: { limiterType: 'adminOperations' },
    validation: {
      schema,
      validateBody: true,
      securityLevel: 'ADMIN',
      operation
    },
    session: { required: true, requireElevated: true },
    csrf: { enabled: true, strictMode: true },
    headers: { enabled: true },
    logging: { operation, logSuccess: true, logFailures: true }
  })
} as const;