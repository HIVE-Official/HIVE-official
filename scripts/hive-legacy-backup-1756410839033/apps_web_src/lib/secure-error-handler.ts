/**
 * Secure error handling and sanitization
 * Prevents information disclosure while maintaining debugging capabilities
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isDevelopment } from './env';
import { captureError, LogLevel } from './error-monitoring';
import { logSecurityEvent } from './structured-logger';

/**
 * Classification of error types by security risk
 */
export enum ErrorSecurityLevel {
   
  SAFE = 'safe',           // Can be shown to users
   
  INTERNAL = 'internal',   // Should be logged but not exposed
   
  SENSITIVE = 'sensitive', // Contains secrets or internal paths
   
  CRITICAL = 'critical'    // Security-related errors
}

/**
 * Standard error response structure
 */
export interface SecureErrorResponse {
  error: string;
  code?: string;
  timestamp: string;
  requestId: string;
  // Only included in development
  details?: any;
  stack?: string;
}

/**
 * Error classification patterns
 */
const ERROR_PATTERNS = {
  [ErrorSecurityLevel.SAFE]: [
    /invalid email/i,
    /email required/i,
    /password.*weak/i,
    /username.*taken/i,
    /handle.*taken/i,
    /invalid.*format/i,
    /field.*required/i,
    /too.*short/i,
    /too.*long/i
  ],
  
  [ErrorSecurityLevel.INTERNAL]: [
    /database.*connection/i,
    /timeout/i,
    /service.*unavailable/i,
    /rate.*limit/i,
    /quota.*exceeded/i,
    /network.*error/i
  ],
  
  [ErrorSecurityLevel.SENSITIVE]: [
    /firebase.*private.*key/i,
    /credential/i,
    /secret/i,
    /token.*invalid/i,
    /authentication.*failed/i,
    /unauthorized/i,
    /permission.*denied/i,
    /access.*denied/i,
    /\/home\//i,
    /\/users\//i,
    /\/var\//i,
    /c:\\/i,
    /node_modules/i
  ],
  
  [ErrorSecurityLevel.CRITICAL]: [
    /bypass/i,
    /dev.*mode/i,
    /test.*token/i,
    /debug/i,
    /development.*key/i,
    /admin.*access/i,
    /sql.*injection/i,
    /xss/i,
    /csrf/i
  ]
};

/**
 * Classify error message by security level
 */
function classifyError(message: string): ErrorSecurityLevel {
  const lowerMessage = message.toLowerCase();
  
  // Check critical first (highest security risk)
  if (ERROR_PATTERNS[ErrorSecurityLevel.CRITICAL].some(pattern => pattern.test(lowerMessage))) {
    return ErrorSecurityLevel.CRITICAL;
  }
  
  // Check sensitive
  if (ERROR_PATTERNS[ErrorSecurityLevel.SENSITIVE].some(pattern => pattern.test(lowerMessage))) {
    return ErrorSecurityLevel.SENSITIVE;
  }
  
  // Check internal
  if (ERROR_PATTERNS[ErrorSecurityLevel.INTERNAL].some(pattern => pattern.test(lowerMessage))) {
    return ErrorSecurityLevel.INTERNAL;
  }
  
  // Default to safe
  return ErrorSecurityLevel.SAFE;
}

/**
 * Sanitize error message for public consumption
 */
function sanitizeErrorMessage(
  message: string, 
  securityLevel: ErrorSecurityLevel
): string {
  switch (securityLevel) {
    case ErrorSecurityLevel.SAFE:
      return message; // Safe to expose
      
    case ErrorSecurityLevel.INTERNAL:
      return "A service error occurred. Please try again later.";
      
    case ErrorSecurityLevel.SENSITIVE:
      return "Authentication failed. Please check your credentials.";
      
    case ErrorSecurityLevel.CRITICAL:
      return "Request could not be processed.";
      
    default:
      return "An error occurred. Please try again.";
  }
}

/**
 * Sanitize validation errors (Zod errors)
 */
function sanitizeValidationError(zodError: z.ZodError): {
  message: string;
  details?: any;
} {
  // In production, only show field names, not full validation details
  if (!isDevelopment) {
    const fieldNames = zodError.errors.map(err => {
      const path = err.path.join('.');
      return path || 'field';
    });
    
    const uniqueFields = [...new Set(fieldNames)];
    
    return {
      message: `Validation failed for: ${uniqueFields.join(', ')}`,
    };
  }
  
  // In development, show more details but sanitize sensitive patterns
  const sanitizedErrors = zodError.errors.map(err => {
    let message = err.message;
    
    // Remove file paths and sensitive info from validation messages
    message = message.replace(/\/[^\s]+/g, '[PATH_REMOVED]');
    message = message.replace(/[A-Z]:\\[^\s]+/g, '[PATH_REMOVED]');
    
    return {
      path: err.path,
      message,
      code: err.code
    };
  });
  
  return {
    message: "Validation failed",
    details: sanitizedErrors
  };
}

/**
 * Sanitize stack traces
 */
function sanitizeStackTrace(stack?: string): string | undefined {
  if (!stack || !isDevelopment) {
    return undefined;
  }
  
  // Remove sensitive paths from stack traces
  return stack
    .replace(/\/home\/[^/\s]+/g, '/home/[USER]')
    .replace(/\/Users\/[^/\s]+/g, '/Users/[USER]')
    .replace(/C:\\Users\\[^\\]+/g, 'C:\\Users\\[USER]')
    .replace(/node_modules\/[^/\s]+/g, 'node_modules/[MODULE]')
    .replace(/\.env[^\s]*/g, '[ENV_FILE]')
    .replace(/[a-zA-Z0-9]{32,}/g, '[TOKEN_REMOVED]'); // Remove potential tokens
}

/**
 * Main secure error handler
 */
export async function handleSecureError(
  error: unknown,
  request: NextRequest,
  context?: {
    userId?: string;
    operation?: string;
  }
): Promise<NextResponse<SecureErrorResponse>> {
  const requestId = request.headers.get('x-request-id') || `req_${Date.now()}`;
  const timestamp = new Date().toISOString();
  
  let errorMessage = 'An unexpected error occurred';
  let errorCode = 'UNKNOWN_ERROR';
  let statusCode = 500;
  let securityLevel = ErrorSecurityLevel.INTERNAL;
  const originalError = error;
  
  // Process different error types
  if (error instanceof z.ZodError) {
    const validationResult = sanitizeValidationError(error);
    errorMessage = validationResult.message;
    errorCode = 'VALIDATION_ERROR';
    statusCode = 400;
    securityLevel = ErrorSecurityLevel.SAFE;
    
    // Return early for validation errors with optional details
    const response: SecureErrorResponse = {
      error: errorMessage,
      code: errorCode,
      timestamp,
      requestId
    };
    
    if (isDevelopment && validationResult.details) {
      response.details = validationResult.details;
    }
    
    return NextResponse.json(response, { status: statusCode });
  }
  
  // Handle custom API errors (ValidationError, AuthenticationError, etc.)
  if (error && typeof error === 'object' && 'statusCode' in error) {
    const apiError = error as any;
    errorMessage = apiError.message || 'API Error';
    errorCode = apiError.code || 'API_ERROR';
    statusCode = apiError.statusCode || 500;
    securityLevel = statusCode < 500 ? ErrorSecurityLevel.SAFE : ErrorSecurityLevel.INTERNAL;
    
    // Return early for API errors
    const response: SecureErrorResponse = {
      error: errorMessage,
      code: errorCode,
      timestamp,
      requestId
    };
    
    if (isDevelopment && apiError.details) {
      response.details = apiError.details;
    }
    
    return NextResponse.json(response, { status: statusCode });
  }
  
  if (error instanceof Error) {
    errorMessage = error.message;
    securityLevel = classifyError(errorMessage);
    
    // Map common error types to HTTP status codes
    if (errorMessage.includes('not found')) {
      statusCode = 404;
      errorCode = 'NOT_FOUND';
    } else if (errorMessage.includes('unauthorized') || errorMessage.includes('authentication')) {
      statusCode = 401;
      errorCode = 'UNAUTHORIZED';
    } else if (errorMessage.includes('forbidden') || errorMessage.includes('permission')) {
      statusCode = 403;
      errorCode = 'FORBIDDEN';
    } else if (errorMessage.includes('already exists') || errorMessage.includes('conflict')) {
      statusCode = 409;
      errorCode = 'CONFLICT';
    } else if (errorMessage.includes('rate limit')) {
      statusCode = 429;
      errorCode = 'RATE_LIMITED';
    }
  }
  
  // Log security incidents for critical/sensitive errors
  if (securityLevel === ErrorSecurityLevel.CRITICAL) {
    await logSecurityEvent('bypass_attempt', {
      requestId,
      userId: context?.userId,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      userAgent: request.headers.get('user-agent'),
      operation: context?.operation || 'error_handling',
      tags: {
        errorLevel: 'critical',
        errorCode
      },
      extra: {
        sanitizedMessage: errorMessage,
        path: new URL(request.url).pathname
      }
    });
  }
  
  // Capture error for monitoring (with full details for internal use)
  try {
    await captureError(
      originalError instanceof Error ? originalError : new Error(String(originalError)),
      {
        level: securityLevel === ErrorSecurityLevel.CRITICAL ? LogLevel.ERROR : LogLevel.WARN,
        userId: context?.userId,
        requestId,
        tags: {
          securityLevel,
          errorCode,
          statusCode: statusCode.toString(),
          operation: context?.operation || 'unknown'
        },
        extra: {
          originalMessage: errorMessage,
          sanitizedMessage: sanitizeErrorMessage(errorMessage, securityLevel),
          url: request.url,
          method: request.method,
          userAgent: request.headers.get('user-agent'),
          timestamp
        }
      }
    );
  } catch (monitoringError) {
    console.error('Failed to capture error:', monitoringError);
  }
  
  // Create sanitized response
  const sanitizedMessage = sanitizeErrorMessage(errorMessage, securityLevel);
  
  const response: SecureErrorResponse = {
    error: sanitizedMessage,
    code: errorCode,
    timestamp,
    requestId
  };
  
  // Only include sensitive details in development
  if (isDevelopment) {
    response.details = {
      originalMessage: errorMessage,
      securityLevel,
      ...(originalError instanceof Error && { 
        name: originalError.name,
        stack: sanitizeStackTrace(originalError.stack)
      })
    };
  }
  
  // Set security headers
  const headers: Record<string, string> = {
    'X-Request-ID': requestId,
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store, must-revalidate'
  };
  
  return NextResponse.json(response, {
    status: statusCode,
    headers
  });
}

/**
 * Wrapper for API routes to use secure error handling
 */
export function withSecureErrorHandler<T extends any[]>(
  handler: (_request: NextRequest, ..._args: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      return await handler(request, ...args);
    } catch (error) {
      return handleSecureError(error, request);
    }
  };
}

/**
 * Pre-configured error responses for common scenarios
 */
export const SecureErrorResponses = {
  UNAUTHORIZED: (requestId: string) => NextResponse.json({
    error: "Authentication required",
    code: "UNAUTHORIZED",
    timestamp: new Date().toISOString(),
    requestId
  }, { status: 401 }),
  
  FORBIDDEN: (requestId: string) => NextResponse.json({
    error: "Access denied",
    code: "FORBIDDEN", 
    timestamp: new Date().toISOString(),
    requestId
  }, { status: 403 }),
  
  NOT_FOUND: (requestId: string) => NextResponse.json({
    error: "Resource not found",
    code: "NOT_FOUND",
    timestamp: new Date().toISOString(),
    requestId
  }, { status: 404 }),
  
  RATE_LIMITED: (requestId: string, retryAfter?: number) => {
    const headers: Record<string, string> = {
      'X-Request-ID': requestId
    };
    
    if (retryAfter) {
      headers['Retry-After'] = retryAfter.toString();
    }
    
    return NextResponse.json({
      error: "Rate limit exceeded",
      code: "RATE_LIMITED",
      timestamp: new Date().toISOString(),
      requestId
    }, { 
      status: 429,
      headers
    });
  }
};