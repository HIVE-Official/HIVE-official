/**
 * SECURITY-FIRST validation middleware for API routes
 * Provides consistent input validation across all endpoints
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { validateWithSecurity, SecurityScanner } from './secure-input-validation';
import { enforceRateLimit, getSecureClientId } from './secure-rate-limiter';
import { logSecurityEvent } from './structured-logger';
import { currentEnvironment } from './env';

/**
 * Security levels for different endpoint types
 */
export const ENDPOINT_SECURITY_LEVELS = {
  // Critical security endpoints
  AUTHENTICATION: {
    rateLimiter: 'authentication' as const,
    blockDangerous: true,
    logSuspicious: true,
    requireSecureHeaders: true
  },
  
  // Sensitive data endpoints
  USER_DATA: {
    rateLimiter: 'apiGeneral' as const,
    blockDangerous: true,
    logSuspicious: true,
    requireSecureHeaders: true
  },
  
  // Content creation endpoints
  CONTENT_CREATION: {
    rateLimiter: 'apiGeneral' as const,
    blockDangerous: true,
    logSuspicious: true,
    requireSecureHeaders: false
  },
  
  // Public read endpoints
  PUBLIC_READ: {
    rateLimiter: 'apiGeneral' as const,
    blockDangerous: false,
    logSuspicious: true,
    requireSecureHeaders: false
  },
  
  // Admin endpoints
  ADMIN: {
    rateLimiter: 'adminOperations' as const,
    blockDangerous: true,
    logSuspicious: true,
    requireSecureHeaders: true
  }
} as const;

/**
 * Request validation result
 */
export interface ValidationMiddlewareResult {
  success: boolean;
  data?: any;
  errors?: Array<{
    field: string;
    message: string;
    code: string;
  }>;
  securityLevel: 'safe' | 'suspicious' | 'dangerous';
  blocked: boolean;
  reason?: string;
}

/**
 * Validation middleware options
 */
export interface ValidationMiddlewareOptions {
  schema?: z.ZodSchema<any>;
  securityLevel: keyof typeof ENDPOINT_SECURITY_LEVELS;
  operation: string;
  validateBody?: boolean;
  validateQuery?: boolean;
  requireAuth?: boolean;
  customValidation?: (data: any) => Promise<ValidationMiddlewareResult>;
}

/**
 * Core validation middleware
 */
export async function validateRequest(
  request: NextRequest,
  options: ValidationMiddlewareOptions
): Promise<ValidationMiddlewareResult> {
  const {
    schema,
    securityLevel: securityLevelKey,
    operation,
    validateBody = true,
    validateQuery = false,
    requireAuth = false,
    customValidation
  } = options;

  const securityConfig = ENDPOINT_SECURITY_LEVELS[securityLevelKey];
  const clientId = getSecureClientId(request);

  try {
    // SECURITY: Rate limiting enforcement
    const rateLimitResult = await enforceRateLimit(securityConfig.rateLimiter, request);
    if (!rateLimitResult.allowed) {
      return {
        success: false,
        blocked: true,
        reason: 'rate_limit_exceeded',
        securityLevel: 'dangerous'
      };
    }

    // SECURITY: Validate secure headers if required
    if (securityConfig.requireSecureHeaders) {
      const headerValidation = validateSecureHeaders(request);
      if (!headerValidation.valid) {
        await logSecurityEvent('input_validation', {
          operation: `${operation}_header_validation_failed`,
          tags: {
            clientId,
            missingHeaders: headerValidation.missing.join(','),
            environment: currentEnvironment
          }
        });

        return {
          success: false,
          blocked: securityConfig.blockDangerous,
          reason: 'missing_security_headers',
          securityLevel: 'suspicious'
        };
      }
    }

    let validationData: any = {};

    // SECURITY: Validate request body
    if (validateBody && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
      try {
        const body = await request.json();
        
        if (schema) {
          const bodyValidation = await validateWithSecurity(body, schema, {
            operation: `${operation}_body`,
            ip: clientId
          });

          if (!bodyValidation.success) {
            return {
              success: false,
              errors: bodyValidation.errors,
              securityLevel: bodyValidation.securityLevel,
              blocked: securityConfig.blockDangerous && bodyValidation.securityLevel === 'dangerous'
            };
          }

          // Block dangerous inputs if configured
          if (securityConfig.blockDangerous && bodyValidation.securityLevel === 'dangerous') {
            await logSecurityEvent('input_validation', {
              operation: `${operation}_dangerous_input_blocked`,
              tags: {
                clientId,
                securityLevel: bodyValidation.securityLevel,
                environment: currentEnvironment
              }
            });

            return {
              success: false,
              blocked: true,
              reason: 'dangerous_input_detected',
              securityLevel: 'dangerous'
            };
          }

          // Log suspicious inputs if configured
          if (securityConfig.logSuspicious && bodyValidation.securityLevel === 'suspicious') {
            await logSecurityEvent('input_validation', {
              operation: `${operation}_suspicious_input`,
              tags: {
                clientId,
                securityLevel: bodyValidation.securityLevel,
                environment: currentEnvironment
              }
            });
          }

          validationData.body = bodyValidation.data;
        } else {
          // Even without schema, scan for security threats
          const bodyStr = JSON.stringify(body);
          const securityScan = SecurityScanner.scanInput(bodyStr, 'request_body');
          
          if (securityConfig.blockDangerous && securityScan.level === 'dangerous') {
            await logSecurityEvent('input_validation', {
              operation: `${operation}_dangerous_content_blocked`,
              tags: {
                clientId,
                threats: securityScan.threats.join(','),
                environment: currentEnvironment
              }
            });

            return {
              success: false,
              blocked: true,
              reason: 'dangerous_content_detected',
              securityLevel: 'dangerous'
            };
          }

          validationData.body = body;
        }
      } catch (jsonError) {
        return {
          success: false,
          errors: [{
            field: 'body',
            message: 'Invalid JSON in request body',
            code: 'INVALID_JSON'
          }],
          securityLevel: 'suspicious',
          blocked: false
        };
      }
    }

    // SECURITY: Validate query parameters
    if (validateQuery) {
      const url = new URL(request.url);
      const queryParams = Object.fromEntries(url.searchParams.entries());

      // Scan query parameters for security threats
      for (const [key, value] of Object.entries(queryParams)) {
        const securityScan = SecurityScanner.scanInput(value, `query_${key}`);
        
        if (securityConfig.blockDangerous && securityScan.level === 'dangerous') {
          await logSecurityEvent('input_validation', {
            operation: `${operation}_dangerous_query_blocked`,
            tags: {
              clientId,
              parameter: key,
              threats: securityScan.threats.join(','),
              environment: currentEnvironment
            }
          });

          return {
            success: false,
            blocked: true,
            reason: 'dangerous_query_parameter',
            securityLevel: 'dangerous'
          };
        }
      }

      validationData.query = queryParams;
    }

    // SECURITY: Custom validation if provided
    if (customValidation) {
      const customResult = await customValidation(validationData);
      if (!customResult.success) {
        return customResult;
      }
    }

    // SECURITY: Authentication check if required
    if (requireAuth) {
      const authResult = await validateAuthentication(request);
      if (!authResult.valid) {
        return {
          success: false,
          blocked: true,
          reason: 'authentication_required',
          securityLevel: 'dangerous'
        };
      }
      validationData.auth = authResult.user;
    }

    return {
      success: true,
      data: validationData,
      securityLevel: 'safe',
      blocked: false
    };

  } catch (error) {
    console.error('Validation middleware error:', error);
    
    await logSecurityEvent('input_validation', {
      operation: `${operation}_validation_error`,
      tags: {
        clientId,
        error: error instanceof Error ? error.message : 'unknown',
        environment: currentEnvironment
      }
    });

    return {
      success: false,
      blocked: securityConfig.blockDangerous,
      reason: 'validation_error',
      securityLevel: 'dangerous'
    };
  }
}

/**
 * Validate security headers
 */
function validateSecureHeaders(request: NextRequest): {
  valid: boolean;
  missing: string[];
} {
  const requiredHeaders = [
    'user-agent',
    'accept',
    'content-type'
  ];
  
  const missing: string[] = [];
  
  for (const header of requiredHeaders) {
    if (!request.headers.get(header)) {
      missing.push(header);
    }
  }

  // Additional security header checks
  const userAgent = request.headers.get('user-agent');
  if (userAgent) {
    // Block suspicious user agents
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /^$/
    ];

    const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(userAgent));
    if (isSuspicious && currentEnvironment === 'production') {
      missing.push('valid-user-agent');
    }
  }

  return {
    valid: missing.length === 0,
    missing
  };
}

/**
 * Validate authentication (placeholder - implement based on your auth system)
 */
async function validateAuthentication(request: NextRequest): Promise<{
  valid: boolean;
  user?: any;
}> {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { valid: false };
  }

  const token = authHeader.substring(7);
  
  // Implement your token validation logic here
  // This is a placeholder - you should validate JWT tokens or session tokens
  
  return { valid: true, user: { id: 'placeholder' } };
}

/**
 * Create validation middleware wrapper for API routes
 */
export function withValidation(
  handler: (request: NextRequest, validatedData: any, context?: any) => Promise<NextResponse>,
  options: ValidationMiddlewareOptions
) {
  return async (request: NextRequest, context: any = {}): Promise<NextResponse> => {
    const validationResult = await validateRequest(request, options);
    
    if (!validationResult.success) {
      if (validationResult.blocked) {
        return NextResponse.json(
          { 
            error: validationResult.reason || 'Request validation failed',
            code: 'VALIDATION_FAILED'
          },
          { 
            status: validationResult.reason === 'rate_limit_exceeded' ? 429 : 400 
          }
        );
      }
      
      // Log but don't block for non-critical security levels
      if (validationResult.securityLevel !== 'safe') {
        console.warn('Validation warning:', validationResult);
      }
    }
    
    return handler(request, validationResult.data || {}, context);
  };
}

/**
 * Quick validation helpers for common patterns
 */
export const ValidationHelpers = {
  /**
   * Authentication endpoint validation
   */
  auth: (schema: z.ZodSchema<any>, operation: string) => 
    withValidation((req, data) => Promise.resolve(NextResponse.json({})), {
      schema,
      securityLevel: 'AUTHENTICATION',
      operation,
      validateBody: true,
      requireAuth: false
    }),

  /**
   * User data endpoint validation
   */
  userData: (schema: z.ZodSchema<any>, operation: string) =>
    withValidation((req, data) => Promise.resolve(NextResponse.json({})), {
      schema,
      securityLevel: 'USER_DATA',
      operation,
      validateBody: true,
      requireAuth: true
    }),

  /**
   * Content creation endpoint validation
   */
  content: (schema: z.ZodSchema<any>, operation: string) =>
    withValidation((req, data) => Promise.resolve(NextResponse.json({})), {
      schema,
      securityLevel: 'CONTENT_CREATION',
      operation,
      validateBody: true,
      requireAuth: true
    }),

  /**
   * Public read endpoint validation
   */
  publicRead: (operation: string) =>
    withValidation((req, data) => Promise.resolve(NextResponse.json({})), {
      securityLevel: 'PUBLIC_READ',
      operation,
      validateBody: false,
      validateQuery: true,
      requireAuth: false
    }),

  /**
   * Admin endpoint validation
   */
  admin: (schema: z.ZodSchema<any>, operation: string) =>
    withValidation((req, data) => Promise.resolve(NextResponse.json({})), {
      schema,
      securityLevel: 'ADMIN',
      operation,
      validateBody: true,
      requireAuth: true
    })
};

/**
 * Pre-configured validation schemas for common use cases
 */
export const CommonValidations = {
  /**
   * ID parameter validation
   */
  idParam: z.object({
    id: z.string()
      .min(1, 'ID is required')
      .max(50, 'ID too long')
      .regex(/^[a-zA-Z0-9_-]+$/, 'Invalid ID format')
  }),

  /**
   * Pagination validation
   */
  pagination: z.object({
    page: z.coerce.number().min(1).max(1000).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    sort: z.enum(['asc', 'desc']).default('desc'),
    orderBy: z.string().max(50).optional()
  }),

  /**
   * Search validation
   */
  search: z.object({
    query: z.string().min(1).max(200),
    type: z.enum(['users', 'spaces', 'posts']).default('posts')
  })
} as const;