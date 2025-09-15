/**
 * SESSION MIDDLEWARE with automatic token rotation and security enforcement
 * Provides seamless session management across all API endpoints
 */

import { NextRequest, NextResponse } from 'next/server';
import { SecureSessionManager, type SessionData } from './secure-session-manager';
import { logSecurityEvent } from './utils/structured-logger';
import { currentEnvironment } from './env';

/**
 * Session middleware options
 */
export interface SessionMiddlewareOptions {
  required?: boolean;
  allowRefresh?: boolean;
  securityLevel?: 'standard' | 'elevated' | 'restricted';
  requireElevated?: boolean;
}

/**
 * Session context for request handlers
 */
export interface SessionContext {
  isAuthenticated: boolean;
  user?: {
    userId: string;
    email: string;
    handle: string;
    schoolId: string;
  };
  session?: SessionData;
  securityLevel: 'standard' | 'elevated' | 'restricted';
  rotated: boolean;
}

/**
 * Session middleware result
 */
interface SessionMiddlewareResult {
  success: boolean;
  context: SessionContext;
  response?: NextResponse;
  newTokens?: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  };
}

/**
 * Core session middleware
 */
export async function sessionMiddleware(
  request: NextRequest,
  options: SessionMiddlewareOptions = {}
): Promise<SessionMiddlewareResult> {
  const {
    required = false,
    allowRefresh = true,
    requireElevated = false
  } = options;

  try {
    // Validate current session
    const validationResult = await SecureSessionManager.validateSession(request);

    // Handle valid sessions
    if (validationResult.valid && validationResult.session) {
      const session = validationResult.session;
      
      // Check security level requirements
      if (requireElevated && session.securityLevel === 'standard') {
        await logSecurityEvent('session', {
          operation: 'insufficient_security_level',
          tags: {
            userId: session.userId,
            sessionId: session.sessionId,
            required: 'elevated',
            current: session.securityLevel
          }
        });

        return {
          success: false,
          context: {
            isAuthenticated: false,
            securityLevel: 'standard',
            rotated: false
          },
          response: NextResponse.json(
            { error: 'Elevated security required' },
            { status: 403 }
          )
        };
      }

      // Handle token rotation if needed
      if (validationResult.needsRotation && allowRefresh) {
        const newTokens = await SecureSessionManager.rotateSession(session, request);
        
        if (newTokens) {
          return {
            success: true,
            context: {
              isAuthenticated: true,
              user: {
                userId: session.userId,
                email: session.email,
                handle: session.handle,
                schoolId: session.schoolId
              },
              session,
              securityLevel: session.securityLevel,
              rotated: true
            },
            newTokens
          };
        } else {
          // Rotation failed - revoke session for security
          await SecureSessionManager.revokeSession(session.sessionId, 'rotation_failed');
          
          return {
            success: false,
            context: {
              isAuthenticated: false,
              securityLevel: 'standard',
              rotated: false
            },
            response: NextResponse.json(
              { error: 'Session rotation failed' },
              { status: 401 }
            )
          };
        }
      }

      // Session is valid and no rotation needed
      return {
        success: true,
        context: {
          isAuthenticated: true,
          user: {
            userId: session.userId,
            email: session.email,
            handle: session.handle,
            schoolId: session.schoolId
          },
          session,
          securityLevel: session.securityLevel,
          rotated: false
        }
      };
    }

    // Handle invalid sessions
    if (validationResult.securityViolation) {
      // Log security violations
      await logSecurityEvent('session', {
        operation: 'session_security_violation',
        tags: {
          violation: validationResult.securityViolation,
          environment: currentEnvironment,
          userAgent: request.headers.get('user-agent') || 'unknown'
        }
      });

      // Immediate block for security violations
      return {
        success: false,
        context: {
          isAuthenticated: false,
          securityLevel: 'standard',
          rotated: false
        },
        response: NextResponse.json(
          { error: 'Security violation detected' },
          { status: 403 }
        )
      };
    }

    // Handle unauthenticated requests
    if (required) {
      return {
        success: false,
        context: {
          isAuthenticated: false,
          securityLevel: 'standard',
          rotated: false
        },
        response: NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      };
    }

    // Allow unauthenticated access
    return {
      success: true,
      context: {
        isAuthenticated: false,
        securityLevel: 'standard',
        rotated: false
      }
    };

  } catch (error) {
    console.error('Session middleware error:', error);
    
    await logSecurityEvent('session', {
      operation: 'session_middleware_error',
      tags: {
        error: error instanceof Error ? error.message : 'unknown',
        environment: currentEnvironment
      }
    });

    // Fail securely - block access on middleware errors
    return {
      success: false,
      context: {
        isAuthenticated: false,
        securityLevel: 'standard',
        rotated: false
      },
      response: NextResponse.json(
        { error: 'Authentication service unavailable' },
        { status: 503 }
      )
    };
  }
}

/**
 * Higher-order function to wrap API handlers with session management
 */
export function withSession(
  handler: (_request: NextRequest, _context: SessionContext, _params?: any) => Promise<NextResponse>,
  options: SessionMiddlewareOptions = {}
) {
  return async (request: NextRequest, params?: any): Promise<NextResponse> => {
    const middlewareResult = await sessionMiddleware(request, options);

    // Return error response if middleware failed
    if (!middlewareResult.success && middlewareResult.response) {
      return middlewareResult.response;
    }

    try {
      // Call the actual handler
      const response = await handler(request, middlewareResult.context, params);

      // Add new tokens to response if rotated
      if (middlewareResult.newTokens) {
        SecureSessionManager.setSessionCookies(response, middlewareResult.newTokens);
        
        // Add rotation headers for client awareness
        response.headers.set('X-Session-Rotated', 'true');
        response.headers.set('X-Token-Expires', middlewareResult.newTokens.expiresAt.toString());
      }

      return response;
    } catch (error) {
      console.error('Handler error:', error);
      
      // Log handler errors with session context
      if (middlewareResult.context.isAuthenticated) {
        await logSecurityEvent('session', {
          operation: 'authenticated_handler_error',
          tags: {
            userId: middlewareResult.context.user?.userId || 'unknown',
            error: error instanceof Error ? error.message : 'unknown',
            endpoint: request.url
          }
        });
      }

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

/**
 * Pre-configured session middleware for common use cases
 */
export const SessionMiddlewares = {
  /**
   * Require authentication
   */
  requireAuth: (handler: (_req: NextRequest, _ctx: SessionContext) => Promise<NextResponse>) =>
    withSession(handler, { required: true }),

  /**
   * Optional authentication
   */
  optionalAuth: (handler: (_req: NextRequest, _ctx: SessionContext) => Promise<NextResponse>) =>
    withSession(handler, { required: false }),

  /**
   * Require elevated security
   */
  requireElevated: (handler: (_req: NextRequest, _ctx: SessionContext) => Promise<NextResponse>) =>
    withSession(handler, { required: true, requireElevated: true }),

  /**
   * Public endpoint with session context
   */
  public: (handler: (_req: NextRequest, _ctx: SessionContext) => Promise<NextResponse>) =>
    withSession(handler, { required: false, allowRefresh: false }),

  /**
   * Admin endpoint
   */
  admin: (handler: (_req: NextRequest, _ctx: SessionContext) => Promise<NextResponse>) =>
    withSession(handler, { required: true, requireElevated: true, securityLevel: 'elevated' })
};

/**
 * Session-aware request context helper
 */
export function getSessionContext(request: NextRequest): Promise<SessionContext> {
  return sessionMiddleware(request, { required: false }).then(result => result.context);
}

/**
 * Utility to check if user has permission for resource
 */
export function hasResourcePermission(
  context: SessionContext,
  resourceUserId: string,
  action: 'read' | 'write' | 'delete' = 'read'
): boolean {
  if (!context.isAuthenticated || !context.user) {
    return false;
  }

  // User can always access their own resources
  if (context.user.userId === resourceUserId) {
    return true;
  }

  // Additional permission logic based on action and security level
  // This is a placeholder - implement based on your authorization model
  switch (action) {
    case 'read':
      // Maybe allow elevated users to read others' public content
      return context.securityLevel === 'elevated';
    case 'write':
    case 'delete':
      // Only allow users to modify their own resources
      return false;
    default:
      return false;
  }
}

/**
 * Middleware to validate resource ownership
 */
export function withResourceOwnership(
  handler: (_req: NextRequest, _ctx: SessionContext, _params: any) => Promise<NextResponse>,
  getUserIdFromParams: (_params: any) => string,
  action: 'read' | 'write' | 'delete' = 'read'
) {
  return withSession(async (request, context, params) => {
    const resourceUserId = getUserIdFromParams(params);
    
    if (!hasResourcePermission(context, resourceUserId, action)) {
      await logSecurityEvent('session', {
        operation: 'unauthorized_resource_access',
        tags: {
          userId: context.user?.userId || 'anonymous',
          resourceUserId,
          action,
          endpoint: request.url
        }
      });

      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    return handler(request, context, params);
  }, { required: true });
}

/**
 * Session status endpoint helper
 */
export async function getSessionStatus(request: NextRequest): Promise<{
  authenticated: boolean;
  user?: any;
  expiresIn?: number;
  securityLevel?: string;
}> {
  const context = await getSessionContext(request);
  
  if (!context.isAuthenticated) {
    return { authenticated: false };
  }

  const expiresIn = context.session 
    ? Math.max(0, context.session.expiresAt - Date.now())
    : 0;

  return {
    authenticated: true,
    user: context.user,
    expiresIn,
    securityLevel: context.securityLevel
  };
}