/**
 * Centralized authentication middleware for API routes
 * Provides secure token validation and prevents bypass vulnerabilities
 */

import { NextRequest } from 'next/server';
import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { validateAuthToken, blockDevPatternsInProduction } from './security-service';
import { AuthenticationError, AuthorizationError } from './api-error-handler';

export interface AuthContext {
  userId: string;
  email?: string;
  isTestUser: boolean;
  isDevelopmentMode: boolean;
}

/**
 * Authentication configuration
 */
export interface AuthConfig {
  required?: boolean;
  allowTestTokens?: boolean;
  allowAnonymous?: boolean;
  operation?: string;
}

/**
 * Centralized authentication middleware
 * Use this instead of manual token validation in API routes
 */
export async function authenticateRequest(
  request: NextRequest,
  config: AuthConfig = {}
): Promise<AuthContext | null> {
  const {
    required = true,
    allowTestTokens = process.env.NODE_ENV === 'development',
    allowAnonymous = false,
    operation = 'api_access'
  } = config;

  // Check for security violations
  const securityCheck = await blockDevPatternsInProduction(request);
  if (securityCheck.blocked) {
    throw new AuthenticationError(`Security violation: ${securityCheck.reason}`);
  }

  // Get token from Authorization header
  const authHeader = request.headers.get('authorization');
  
  // Handle missing auth header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    if (allowAnonymous) {
      return null;
    }
    if (required) {
      throw new AuthenticationError('Authorization header required');
    }
    return null;
  }

  const token = authHeader.substring(7).trim();
  
  if (!token) {
    if (required) {
      throw new AuthenticationError('Token required');
    }
    return null;
  }

  // Use centralized security service for validation
  const tokenValidation = await validateAuthToken(token, request, {
    operation,
    requireRealAuth: !allowTestTokens
  });

  if (!tokenValidation.valid) {
    if (tokenValidation.securityAlert) {
      throw new AuthorizationError(`Security violation: ${tokenValidation.reason}`);
    }
    throw new AuthenticationError(tokenValidation.reason || 'Invalid token');
  }

  // Handle development test tokens
  if (tokenValidation.userId && tokenValidation.reason === 'Development bypass token') {
    return {
      userId: tokenValidation.userId,
      email: 'test@example.com',
      isTestUser: true,
      isDevelopmentMode: true
    };
  }

  // Handle production Firebase tokens
  try {
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);
    
    return {
      userId: decodedToken.id,
      email: decodedToken.email,
      isTestUser: false,
      isDevelopmentMode: false
    };
  } catch (firebaseError) {
    console.error('Firebase token verification failed:', firebaseError);
    throw new AuthenticationError('Invalid token');
  }
}

/**
 * Require authentication wrapper for API handlers
 * Throws appropriate errors if authentication fails
 */
export async function requireAuth(
  request: NextRequest,
  config?: AuthConfig
): Promise<AuthContext> {
  const authContext = await authenticateRequest(request, { ...config, required: true });
  
  if (!authContext) {
    throw new AuthenticationError('Authentication required');
  }
  
  return authContext;
}

/**
 * Optional authentication wrapper for API handlers
 * Returns null if no valid authentication is found
 */
export async function optionalAuth(
  request: NextRequest,
  config?: AuthConfig
): Promise<AuthContext | null> {
  return authenticateRequest(request, { ...config, required: false });
}

/**
 * Extract user ID from request for backwards compatibility
 * @deprecated Use authenticateRequest instead
 */
export async function getUserIdFromRequest(request: NextRequest): Promise<string | null> {
  try {
    const authContext = await authenticateRequest(request, { required: false });
    return authContext?.userId || null;
  } catch {
    return null;
  }
}

/**
 * Check if request is from a test user
 */
export function isTestUser(authContext: AuthContext | null): boolean {
  return authContext?.isTestUser === true;
}

/**
 * Check if request is in development mode
 */
export function isDevelopmentAuth(authContext: AuthContext | null): boolean {
  return authContext?.isDevelopmentMode === true;
}

/**
 * Admin authentication wrapper
 * Requires additional admin role verification
 */
export async function requireAdminAuth(
  request: NextRequest,
  config?: AuthConfig
): Promise<AuthContext> {
  const authContext = await requireAuth(request, { ...config, action: 'admin_access' });
  
  // For test users in development, allow admin access
  if (authContext.isTestUser && authContext.isDevelopmentMode) {
    return authContext;
  }
  
  // TODO: Add real admin role verification from Firestore/custom claims
  // For now, this is a placeholder that would check user roles
  
  throw new AuthorizationError('Admin access required');
}

/**
 * Audit log for authentication events using structured logging
 */
export async function logAuthEvent(
  event: 'login' | 'logout' | 'token_validation' | 'auth_failure',
  request: NextRequest,
  authContext?: AuthContext,
  details?: any
) {
  const { logAuthEvent: structuredLogAuthEvent } = await import('./structured-logger');

  // Map event types to structured logger types
  const mappedEvent = event === 'token_validation' ? 'verify' :
                      event === 'auth_failure' ? 'failed_login' :
                      event as 'login' | 'logout' | 'register' | 'verify' | 'failed_login';

  await structuredLogAuthEvent(mappedEvent, {
    requestId: request.headers.get('x-request-id') || undefined,
    userId: authContext?.userId,
    isTestUser: authContext?.isTestUser,
    ip: request.headers.get('x-forwarded-for') || 
        request.headers.get('x-real-ip') || 
        request.headers.get('cf-connecting-ip') || undefined,
    userAgent: request.headers.get('user-agent') || undefined,
    action: `auth_${event}`,
    tags: {
      authEvent: event,
      path: new URL(request.url).pathname
    },
    extra: details
  });
}