/**
 * Production-ready API authentication middleware
 * NO DEVELOPMENT BYPASSES - ENFORCE REAL AUTH
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateAuthToken } from './security-service';
import { isProductionEnvironment } from './production-auth';
import { logSecurityEvent } from './structured-logger';

export interface AuthContext {
  userId: string;
  token: string;
  isAdmin?: boolean;
}

export interface AuthOptions {
  requireAdmin?: boolean;
  operation?: string;
  allowDevelopmentBypass?: boolean; // ONLY for non-sensitive endpoints
}

/**
 * Validate API request authentication
 * Returns user context or throws appropriate HTTP error
 */
export async function validateApiAuth(
  request: NextRequest,
  options: AuthOptions = {}
): Promise<AuthContext> {
  const { requireAdmin = false, operation, allowDevelopmentBypass = false } = options;
  
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    await logSecurityEvent('unauthorized_api_access', {
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      userAgent: request.headers.get('user-agent'),
      path: new URL(request.url).pathname,
      operation,
      tags: { reason: 'missing_auth_header' }
    });

    throw new Response(
      JSON.stringify({ error: 'Authentication required' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  }

  const token = authHeader.replace('Bearer ', '');

  // In production, never allow development bypasses for sensitive operations
  if (isProductionEnvironment() && !allowDevelopmentBypass) {
    const validation = await validateAuthToken(token, request, {
      operation,
      requireRealAuth: true
    });

    if (!validation.valid) {
      await logSecurityEvent('invalid_token_api_access', {
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
        path: new URL(request.url).pathname,
        operation,
        tags: { reason: validation.reason || 'invalid_token' }
      });

      const status = validation.securityAlert ? 403 : 401;
      throw new Response(
        JSON.stringify({ error: 'Invalid authentication token' }),
        { status, headers: { 'content-type': 'application/json' } }
      );
    }

    // Check admin requirements
    if (requireAdmin && !await isAdminUser(validation.userId!)) {
      await logSecurityEvent('unauthorized_admin_access', {
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
        path: new URL(request.url).pathname,
        operation,
        tags: { userId: validation.userId, reason: 'insufficient_permissions' }
      });

      throw new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { 'content-type': 'application/json' } }
      );
    }

    return {
      userId: validation.userId!,
      token,
      isAdmin: requireAdmin ? true : await isAdminUser(validation.userId!)
    };
  }

  // Development mode handling
  if (!isProductionEnvironment()) {
    // Allow development tokens only in development
    if (token === 'test-token' || token.startsWith('dev_token_')) {
      if (allowDevelopmentBypass) {
        console.warn(`🔓 Development bypass allowed for ${operation || 'unknown operation'}`);
        return {
          userId: 'test-user',
          token,
          isAdmin: requireAdmin
        };
      } else {
        console.warn(`⚠️ Development bypass denied for sensitive operation: ${operation}`);
        throw new Response(
          JSON.stringify({ error: 'Real authentication required for this operation' }),
          { status: 401, headers: { 'content-type': 'application/json' } }
        );
      }
    }

    // Still validate real tokens in development
    const validation = await validateAuthToken(token, request, { operation });
    if (!validation.valid) {
      throw new Response(
        JSON.stringify({ error: 'Invalid authentication token' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }

    return {
      userId: validation.userId!,
      token,
      isAdmin: requireAdmin ? true : await isAdminUser(validation.userId!)
    };
  }

  // Should never reach here in production
  throw new Response(
    JSON.stringify({ error: 'Authentication service error' }),
    { status: 500, headers: { 'content-type': 'application/json' } }
  );
}

/**
 * Check if user has admin privileges
 */
async function isAdminUser(userId: string): Promise<boolean> {
  try {
    // In development, allow test users to be admin
    if (!isProductionEnvironment() && userId === 'test-user') {
      return true;
    }

    // TODO: Implement real admin check against database
    // For now, return false to be safe
    return false;
  } catch (error) {
    console.error('Admin check failed:', error);
    return false;
  }
}

/**
 * Wrapper for API routes that need authentication
 */
export function withAuth<T extends any[]>(
  handler: (request: NextRequest, context: AuthContext, ...args: T) => Promise<Response> | Response,
  options: AuthOptions = {}
) {
  return async (request: NextRequest, ...args: T): Promise<Response> => {
    try {
      const authContext = await validateApiAuth(request, options);
      return await handler(request, authContext, ...args);
    } catch (error) {
      if (error instanceof Response) {
        return error;
      }
      
      console.error('Auth middleware error:', error);
      return new Response(
        JSON.stringify({ error: 'Authentication service error' }),
        { status: 500, headers: { 'content-type': 'application/json' } }
      );
    }
  };
}

/**
 * Create standardized API responses
 */
export class ApiResponse {
  static success(data: any, status = 200) {
    return NextResponse.json({ success: true, data }, { status });
  }

  static error(message: string, code?: string, status = 400) {
    return NextResponse.json({ 
      success: false, 
      error: { message, code } 
    }, { status });
  }

  static unauthorized(message = 'Authentication required') {
    return NextResponse.json({ 
      success: false, 
      error: { message, code: 'UNAUTHORIZED' } 
    }, { status: 401 });
  }

  static forbidden(message = 'Access denied') {
    return NextResponse.json({ 
      success: false, 
      error: { message, code: 'FORBIDDEN' } 
    }, { status: 403 });
  }
}