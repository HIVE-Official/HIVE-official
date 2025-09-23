/**
 * API error handling middleware for consistent error responses and monitoring
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { trackApiCall } from './error-monitoring';

/**
 * Standard API error response
 */
export interface ApiErrorResponse {
  error: string;
  details?: any;
  errorId?: string;
  timestamp: string;
  path: string;
  method: string;
}

/**
 * API error types
 */
export class ApiError extends Error {
  public statusCode: number;
  public code: string;
  public details?: any;

  constructor(message: string, statusCode: number = 500, code?: string, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code || 'INTERNAL_ERROR';
    this.details = details;
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends ApiError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND_ERROR');
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 409, 'CONFLICT_ERROR', details);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends ApiError {
  constructor(message: string = 'Rate limit exceeded', retryAfter?: number) {
    super(message, 429, 'RATE_LIMIT_ERROR', { retryAfter });
    this.name = 'RateLimitError';
  }
}

/**
 * Extract request context for error monitoring
 */
function getRequestContext(request: NextRequest): {
  path: string;
  method: string;
  userAgent?: string;
  ip?: string;
  requestId: string;
} {
  const url = new URL(request.url);
  
  return {
    path: url.pathname,
    method: request.method,
    userAgent: request.headers.get('user-agent') || undefined,
    ip: request.headers.get('x-forwarded-for') || 
        request.headers.get('x-real-ip') || 
        request.headers.get('cf-connecting-ip') || undefined,
    requestId: request.headers.get('x-request-id') || 
               `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };
}

/**
 * Handle and format API errors consistently with security
 */
export async function handleApiError(
  error: unknown,
  request: NextRequest,
  userId?: string
): Promise<NextResponse<ApiErrorResponse>> {
  // Use secure error handler for all error processing
  const { handleSecureError } = await import('./secure-error-handler');
  
  return handleSecureError(error, request, {
    userId,
    operation: 'api_call'
  }) as unknown as Promise<NextResponse<ApiErrorResponse>>;
}

/**
 * Wrapper for API route handlers to provide consistent error handling
 */
export function withErrorHandler<T extends any[]>(
  handler: (_request: NextRequest, ..._args: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      return await handler(request, ...args);
    } catch (error) {
      return handleApiError(error, request);
    }
  };
}

/**
 * Async wrapper for API handlers with error boundary
 */
export function asyncHandler(
  handler: (_request: NextRequest, _context: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, context: any = {}): Promise<NextResponse> => {
    const startTime = Date.now();
    
    try {
      const response = await handler(request, context);
      
      // Track successful API calls
      const duration = Date.now() - startTime;
      const requestContext = getRequestContext(request);
      
      await trackApiCall(
        requestContext.method,
        requestContext.path,
        response.status,
        duration,
        {
          requestId: requestContext.requestId,
          success: true
        }
      );
      
      return response;
    } catch (error) {
      return handleApiError(error, request);
    }
  };
}

/**
 * Validate request body with Zod schema
 */
export async function validateRequest<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>
): Promise<T> {
  try {
    const body = await request.json();
    return schema.parse(body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Invalid request data', {
        validationErrors: error.errors,
        receivedData: error.format()
      });
    }
    throw new ValidationError('Invalid JSON in request body');
  }
}

/**
 * Extract user ID from request for error context
 */
export function getUserId(request: NextRequest): string | undefined {
  // Try to get user ID from authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    // This would need to be decoded based on your auth implementation
    // For now, return undefined - you can implement JWT decoding here
    return undefined;
  }
  
  // Try to get from custom header
  return request.headers.get('x-user-id') || undefined;
}