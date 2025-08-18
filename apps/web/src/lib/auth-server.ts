import { NextRequest } from 'next/server';
import { authAdmin as adminAuth } from '@/lib/firebase-admin';

export interface AuthenticatedUser {
  uid: string;
  email?: string;
  email_verified?: boolean;
  displayName?: string;
}

/**
 * Debug user profiles for development sessions
 */
const DEBUG_USERS = {
  'debug-user': {
    uid: 'debug-user',
    email: 'debug@test.edu',
    email_verified: true,
    displayName: 'Debug User'
  },
  'dev-user-1': {
    uid: 'dev-user-1',
    email: 'student@test.edu',
    email_verified: true,
    displayName: 'Test Student'
  },
  'dev-user-2': {
    uid: 'dev-user-2',
    email: 'faculty@test.edu',
    email_verified: true,
    displayName: 'Test Faculty'
  },
  'dev-user-3': {
    uid: 'dev-user-3',
    email: 'admin@test.edu',
    email_verified: true,
    displayName: 'Test Admin'
  },
  'dev-user-jacob': {
    uid: 'dev-user-jacob',
    email: 'jacob@test.edu',
    email_verified: true,
    displayName: 'Jacob Founder'
  }
} as const;

/**
 * Extract user information from debug session token
 * Debug tokens format: dev_session_userId_timestamp_random
 */
function extractDebugUserFromToken(token: string): AuthenticatedUser | null {
  // Only allow in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!token.startsWith('dev_session_')) {
    return null;
  }

  try {
    // Parse token: dev_session_userId_timestamp_random
    const parts = token.split('_');
    if (parts.length < 3) {
      // Fallback for tokens without timestamp/random parts
      return DEBUG_USERS['debug-user'];
    }

    // Extract userId (everything between dev_session_ and the last two parts)
    // Handle cases where there are at least 4 parts (dev, session, userId, timestamp, random)
    let userId: string;
    if (parts.length >= 4) {
      userId = parts.slice(2, -2).join('_');
      // If userId is empty after slicing, use all parts after dev_session_
      if (!userId) {
        userId = parts.slice(2).join('_');
      }
    } else {
      // For shorter tokens, take everything after dev_session_
      userId = parts.slice(2).join('_');
    }
    
    // Look up user in debug profiles
    if (userId && userId in DEBUG_USERS) {
      return DEBUG_USERS[userId as keyof typeof DEBUG_USERS];
    }

    // Fallback to default debug user if userId not found
    return DEBUG_USERS['debug-user'];
  } catch (error) {
    console.error('Failed to extract debug user from token:', error);
    return DEBUG_USERS['debug-user'];
  }
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
    
    // DEVELOPMENT ONLY: Handle debug session tokens
    if (process.env.NODE_ENV === 'development') {
      // Handle legacy test token
      if (token === 'test-token') {
        return {
          uid: 'test-user-id',
          email: 'test@example.com',
          email_verified: true,
          displayName: 'Test User'
        };
      }

      // Handle debug session tokens (dev_session_userId_timestamp_random)
      if (token.startsWith('dev_session_')) {
        const debugUser = extractDebugUserFromToken(token);
        if (debugUser) {
          
          return debugUser;
        }
      }
    }

    // PRODUCTION: Verify Firebase ID token
    const decodedToken = await adminAuth.verifyIdToken(token);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      email_verified: decodedToken.email_verified,
      displayName: decodedToken.name
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