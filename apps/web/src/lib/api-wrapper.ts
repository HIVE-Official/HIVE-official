/**
 * Global API middleware wrapper for consistent handling across all routes
 * Provides authentication, validation, error handling, rate limiting, and monitoring
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authenticateRequest, AuthConfig, AuthContext } from './auth-middleware';
import { handleApiError, validateRequest } from './api-error-handler';
import { trackApiCall } from './error-monitoring';
import { createRequestLogger, logApiCall, logPerformance } from './structured-logger';
import { authRateLimit, apiRateLimit, strictRateLimit } from './rate-limit-simple';

/**
 * API handler configuration
 */
export interface ApiConfig {
  auth?: AuthConfig;
  rateLimit?: 'auth' | 'api' | 'strict';
  validation?: {
    body?: z.ZodSchema<any>;
    query?: z.ZodSchema<any>;
  };
  methods?: ('GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH')[];
  public?: boolean; // Skip authentication entirely
}

/**
 * API handler context passed to route handlers
 */
export interface ApiContext {
  request: NextRequest;
  auth: AuthContext | null;
  body?: any;
  query?: any;
  startTime: number;
  requestId: string;
  logger: any; // StructuredLogger instance
}

/**
 * API handler function type
 */
export type ApiHandler = (
  _context: ApiContext,
  _params?: any
) => Promise<NextResponse>;

/**
 * Global API wrapper that provides consistent middleware
 */
export function createApiHandler(
  handler: ApiHandler,
  config: ApiConfig = {}
) {
  return async (request: NextRequest, params?: any): Promise<NextResponse> => {
    const startTime = Date.now();
    const requestId = request.headers.get('x-request-id') || 
                     `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    let authContext: AuthContext | null = null;
    let responseStatus = 200;
    let errorOccurred = false;

    try {
      // 1. Method validation
      if (config.methods && !config.methods.includes(request.method as any)) {
        return NextResponse.json(
          { error: `Method ${request.method} not allowed` },
          { status: 405, headers: { 'Allow': config.methods.join(', ') } }
        );
      }

      // 2. Rate limiting
      if (config.rateLimit) {
        const rateLimiter = config.rateLimit === 'auth' ? authRateLimit :
                           config.rateLimit === 'strict' ? strictRateLimit :
                           apiRateLimit;
        const clientId = request.headers.get('x-forwarded-for') ||
                        request.headers.get('x-real-ip') ||
                        request.headers.get('cf-connecting-ip') ||
                        'unknown';

        const result = rateLimiter.check(clientId);
        if (!result.success) {
          const response = NextResponse.json(
            {
              error: 'Rate limit exceeded',
              retryAfter: result.retryAfter
            },
            { status: 429 }
          );

          // Add rate limit headers
          response.headers.set('X-RateLimit-Limit', result.limit.toString());
          response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
          response.headers.set('X-RateLimit-Reset', result.resetTime.toString());
          
          if (result.retryAfter) {
            response.headers.set('Retry-After', result.retryAfter.toString());
          }

          return response;
        }
      }

      // 3. Authentication
      if (!config.public) {
        authContext = await authenticateRequest(request, config.auth);
      }

      // 4. Request validation
      let body, query;
      
      if (config.validation?.body && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
        body = await validateRequest(request, config.validation.body);
      }

      if (config.validation?.query) {
        const url = new URL(request.url);
        const queryParams = Object.fromEntries(url.searchParams.entries());
        query = config.validation.query.parse(queryParams);
      }

      // 5. Build context with structured logger
      const requestLogger = createRequestLogger(requestId, authContext?.userId);
      const context: ApiContext = {
        request,
        auth: authContext,
        body,
        query,
        startTime,
        requestId,
        logger: requestLogger
      };

      // 6. Call the actual handler
      const response = await handler(context, params);
      responseStatus = response.status;

      // 7. Add standard headers
      response.headers.set('X-Request-ID', requestId);
      response.headers.set('X-Powered-By', 'HIVE');

      return response;

    } catch (error) {
      errorOccurred = true;
      const errorResponse = await handleApiError(error, request, authContext?.userId);
      responseStatus = errorResponse.status;
      
      // Add request ID to error response
      errorResponse.headers.set('X-Request-ID', requestId);
      
      return errorResponse;
    } finally {
      // 8. Track API call metrics and structured logging
      const duration = Date.now() - startTime;
      const url = new URL(request.url);
      
      try {
        // Structured logging
        await logApiCall(
          request.method,
          url.pathname,
          responseStatus,
          duration,
          {
            requestId,
            userId: authContext?.userId,
            isTestUser: authContext?.isTestUser,
            ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
            userAgent: request.headers.get('user-agent') || undefined,
            tags: {
              rateLimit: config.rateLimit || 'none',
              authenticated: authContext ? 'true' : 'false',
              error: errorOccurred ? 'true' : 'false'
            }
          }
        );

        // Performance logging for slow requests
        if (duration > 1000) {
          await logPerformance(
            `${request.method} ${url.pathname}`,
            duration,
            {
              requestId,
              userId: authContext?.userId,
              tags: {
                slowRequest: 'true'
              }
            }
          );
        }

        // Legacy monitoring (keep for now)
        await trackApiCall(
          request.method,
          url.pathname,
          responseStatus,
          duration,
          {
            requestId,
            userId: authContext?.userId,
            isTestUser: authContext?.isTestUser,
            error: errorOccurred,
            rateLimit: config.rateLimit,
            authenticated: !!authContext
          }
        );
      } catch (trackingError) {
        console.error('Failed to track API call:', trackingError);
      }
    }
  };
}

/**
 * Utility function for simple GET endpoints
 */
export function createGetHandler(
  handler: (_context: ApiContext, _params?: any) => Promise<any>,
  config: Omit<ApiConfig, 'methods'> = {}
) {
  return createApiHandler(
    async (context, params) => {
      const result = await handler(context, params);
      return NextResponse.json(result);
    },
    { ...config, methods: ['GET'] }
  );
}

/**
 * Utility function for simple POST endpoints
 */
export function createPostHandler(
  handler: (_context: ApiContext, _params?: any) => Promise<any>,
  config: Omit<ApiConfig, 'methods'> = {}
) {
  return createApiHandler(
    async (context, params) => {
      const result = await handler(context, params);
      return NextResponse.json(result);
    },
    { ...config, methods: ['POST'] }
  );
}

/**
 * Utility function for CRUD endpoints
 */
export function createCrudHandler(
  handlers: {
    get?: (_context: ApiContext, _params?: any) => Promise<any>;
    post?: (_context: ApiContext, _params?: any) => Promise<any>;
    put?: (_context: ApiContext, _params?: any) => Promise<any>;
    delete?: (_context: ApiContext, _params?: any) => Promise<any>;
  },
  config: Omit<ApiConfig, 'methods'> = {}
) {
  const methods = Object.keys(handlers).map(method => method.toUpperCase()) as any[];
  
  return createApiHandler(
    async (context, params) => {
      const method = context.request.method.toLowerCase() as keyof typeof handlers;
      const handler = handlers[method];
      
      if (!handler) {
        return NextResponse.json(
          { error: `Method ${context.request.method} not allowed` },
          { status: 405 }
        );
      }
      
      const result = await handler(context, params);
      return NextResponse.json(result);
    },
    { ...config, methods }
  );
}

/**
 * Admin-only API wrapper
 */
export function createAdminHandler(
  handler: ApiHandler,
  config: Omit<ApiConfig, 'auth'> = {}
) {
  return createApiHandler(
    handler,
    {
      ...config,
      auth: {
        required: true,
        action: 'admin_access'
      }
    }
  );
}

/**
 * Public API wrapper (no authentication required)
 */
export function createPublicHandler(
  handler: ApiHandler,
  config: Omit<ApiConfig, 'public' | 'auth'> = {}
) {
  return createApiHandler(
    handler,
    { ...config, public: true }
  );
}

/**
 * Authenticated API wrapper (requires valid user)
 */
export function createAuthenticatedHandler(
  handler: ApiHandler,
  config: Omit<ApiConfig, 'auth'> = {}
) {
  return createApiHandler(
    handler,
    {
      ...config,
      auth: { required: true }
    }
  );
}

// Alias for backward compatibility with existing code
export const withAuthAndErrors = createAuthenticatedHandler;

/**
 * Example usage in API routes:
 *
 * export const GET = createGetHandler(async (context) => {
 *   return { message: 'Hello world', userId: context.auth?.userId };
 * }, {
 *   auth: { required: false },
 *   rateLimit: 'API'
 * });
 *
 * export const POST = createPostHandler(async (context) => {
 *   const { name } = context.body;
 *   return { message: `Hello ${name}` };
 * }, {
 *   validation: {
 *     body: z.object({ name: z.string() })
 *   },
 *   rateLimit: 'AUTH'
 * });
 */