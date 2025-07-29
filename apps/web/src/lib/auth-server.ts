import { NextRequest } from 'next/server';
import { authAdmin as adminAuth } from '@/lib/firebase-admin';

export interface AuthenticatedUser {
  uid: string;
  email?: string;
  email_verified?: boolean;
}

/**
 * Extract and verify auth token from request headers
 * Returns null if authentication fails
 */
export async function getCurrentUser(request: NextRequest): Promise<AuthenticatedUser | null> {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.replace('Bearer ', '');
    
    // For development, accept test tokens
    if (process.env.NODE_ENV === 'development' && token === 'test-token') {
      return {
        uid: 'test-user-id',
        email: 'test@example.com',
        email_verified: true
      };
    }

    // Verify Firebase ID token
    const decodedToken = await adminAuth.verifyIdToken(token);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      email_verified: decodedToken.email_verified
    };
  } catch (error) {
    console.error('Authentication failed:', error);
    return null;
  }
}

/**
 * Middleware-style auth check for API routes
 * Returns user if authenticated, throws error if not
 */
export async function requireAuth(request: NextRequest): Promise<AuthenticatedUser> {
  const user = await getCurrentUser(request);
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

/**
 * Alias for requireAuth for compatibility
 */
export const validateAuth = requireAuth;