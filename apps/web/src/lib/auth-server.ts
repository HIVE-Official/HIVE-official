/**
 * Server-Side Authentication Utilities
 * 
 * This module provides authentication utilities for server-side operations
 * in Next.js API routes and server components. It uses Firebase Admin SDK
 * to verify tokens and manage user sessions securely on the server.
 * 
 * Key features:
 * - Token verification using Firebase Admin
 * - User session management
 * - Role-based access control
 * - Secure cookie handling
 * - Rate limiting support
 */

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { adminAuth, adminDb } from './firebase-admin';
import { logger } from './structured-logger';
import type { DecodedIdToken } from 'firebase-admin/auth';

// Cookie configuration
const SESSION_COOKIE_NAME = 'hive_session';
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * User object returned from auth functions
 */
export interface AuthenticatedUser {
  uid: string;
  email: string | undefined;
  emailVerified: boolean;
  displayName?: string;
  photoURL?: string;
  role?: 'user' | 'admin' | 'moderator' | 'developer';
  customClaims?: Record<string, any>;
  token?: DecodedIdToken;
}

/**
 * Get the current authenticated user from the request
 * 
 * This function extracts and verifies the authentication token from:
 * 1. Authorization header (Bearer token)
 * 2. Session cookie
 * 3. Custom auth header
 * 
 * @param request - The Next.js request object
 * @returns The authenticated user or null if not authenticated
 */
export async function getCurrentUser(
  request?: NextRequest
): Promise<AuthenticatedUser | null> {
  try {
    // Try to get token from various sources
    let token: string | null = null;

    // 1. Check Authorization header
    if (request) {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    // 2. Check session cookie
    if (!token) {
      const cookieStore = cookies();
      const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
      if (sessionCookie) {
        token = sessionCookie.value;
      }
    }

    // 3. Check custom auth header (for internal services)
    if (!token && request) {
      token = request.headers.get('x-auth-token') || null;
    }

    if (!token) {
      return null;
    }

    // Verify the token with Firebase Admin
    const decodedToken = await verifyIdToken(token);
    if (!decodedToken) {
      return null;
    }

    // Get additional user data from Firestore if needed
    const userDoc = await adminDb
      .collection('users')
      .doc(decodedToken.uid)
      .get();

    const userData = userDoc.exists ? userDoc.data() : {};

    // Construct the authenticated user object
    const user: AuthenticatedUser = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified || false,
      displayName: userData?.displayName || decodedToken.name,
      photoURL: userData?.photoURL || decodedToken.picture,
      role: userData?.role || decodedToken.role || 'user',
      customClaims: decodedToken,
      token: decodedToken
    };

    return user;
  } catch (error) {
    logger.error('Failed to get current user', error as Error);
    return null;
  }
}

/**
 * Verify a Firebase ID token
 * 
 * @param token - The ID token to verify
 * @returns The decoded token or null if invalid
 */
export async function verifyIdToken(
  token: string
): Promise<DecodedIdToken | null> {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    // Check if token is expired
    const now = Date.now() / 1000;
    if (decodedToken.exp < now) {
      logger.warn('Token expired', { uid: decodedToken.uid });
      return null;
    }
    
    return decodedToken;
  } catch (error) {
    logger.error('Failed to verify ID token', error as Error);
    return null;
  }
}

/**
 * Create a session cookie for the user
 * 
 * @param idToken - The Firebase ID token
 * @param expiresIn - Cookie expiration time in seconds
 * @returns The session cookie string or null if failed
 */
export async function createSessionCookie(
  idToken: string,
  expiresIn: number = SESSION_COOKIE_MAX_AGE
): Promise<string | null> {
  try {
    // Create session cookie using Firebase Admin
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: expiresIn * 1000 // Convert to milliseconds
    });

    return sessionCookie;
  } catch (error) {
    logger.error('Failed to create session cookie', error as Error);
    return null;
  }
}

/**
 * Verify a session cookie
 * 
 * @param sessionCookie - The session cookie to verify
 * @returns The decoded token or null if invalid
 */
export async function verifySessionCookie(
  sessionCookie: string
): Promise<DecodedIdToken | null> {
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(
      sessionCookie,
      true // Check if revoked
    );
    
    return decodedClaims;
  } catch (error) {
    logger.error('Failed to verify session cookie', error as Error);
    return null;
  }
}

/**
 * Require authentication for an API route
 * 
 * This is a helper function that can be used to protect API routes.
 * It will return a 401 response if the user is not authenticated.
 * 
 * @param request - The Next.js request object
 * @returns The authenticated user
 * @throws Will throw an error response if not authenticated
 */
export async function requireAuth(
  request: NextRequest
): Promise<AuthenticatedUser> {
  const user = await getCurrentUser(request);
  
  if (!user) {
    throw new Response('Unauthorized', { status: 401 });
  }
  
  return user;
}

/**
 * Require a specific role for an API route
 * 
 * @param request - The Next.js request object
 * @param allowedRoles - Array of allowed roles
 * @returns The authenticated user
 * @throws Will throw an error response if not authorized
 */
export async function requireRole(
  request: NextRequest,
  allowedRoles: string[]
): Promise<AuthenticatedUser> {
  const user = await requireAuth(request);
  
  if (!user.role || !allowedRoles.includes(user.role)) {
    throw new Response('Forbidden', { status: 403 });
  }
  
  return user;
}

/**
 * Set custom claims for a user
 * 
 * @param uid - The user's UID
 * @param claims - The custom claims to set
 */
export async function setCustomUserClaims(
  uid: string,
  claims: Record<string, any>
): Promise<void> {
  try {
    await adminAuth.setCustomUserClaims(uid, claims);
    
    // Also update in Firestore for persistence
    await adminDb.collection('users').doc(uid).update({
      customClaims: claims,
      updatedAt: new Date()
    });
    
    logger.info('Set custom claims for user', { uid, claims });
  } catch (error) {
    logger.error('Failed to set custom claims', error as Error, { uid });
    throw error;
  }
}

/**
 * Revoke all refresh tokens for a user
 * 
 * This will force the user to re-authenticate
 * 
 * @param uid - The user's UID
 */
export async function revokeUserTokens(uid: string): Promise<void> {
  try {
    await adminAuth.revokeRefreshTokens(uid);
    
    // Update user document to track revocation
    await adminDb.collection('users').doc(uid).update({
      tokensRevokedAt: new Date(),
      updatedAt: new Date()
    });
    
    logger.info('Revoked tokens for user', { uid });
  } catch (error) {
    logger.error('Failed to revoke tokens', error as Error, { uid });
    throw error;
  }
}

/**
 * Delete a user account
 * 
 * @param uid - The user's UID
 */
export async function deleteUser(uid: string): Promise<void> {
  try {
    // Delete from Firebase Auth
    await adminAuth.deleteUser(uid);
    
    // Mark as deleted in Firestore (soft delete)
    await adminDb.collection('users').doc(uid).update({
      deleted: true,
      deletedAt: new Date()
    });
    
    logger.info('Deleted user account', { uid });
  } catch (error) {
    logger.error('Failed to delete user', error as Error, { uid });
    throw error;
  }
}

/**
 * Get user by email
 * 
 * @param email - The user's email
 * @returns The user record or null
 */
export async function getUserByEmail(email: string): Promise<AuthenticatedUser | null> {
  try {
    const userRecord = await adminAuth.getUserByEmail(email);
    
    // Get additional data from Firestore
    const userDoc = await adminDb
      .collection('users')
      .doc(userRecord.uid)
      .get();
    
    const userData = userDoc.exists ? userDoc.data() : {};
    
    return {
      uid: userRecord.uid,
      email: userRecord.email,
      emailVerified: userRecord.emailVerified,
      displayName: userData?.displayName || userRecord.displayName,
      photoURL: userData?.photoURL || userRecord.photoURL,
      role: userData?.role || 'user',
      customClaims: userRecord.customClaims
    };
  } catch (error) {
    logger.error('Failed to get user by email', error as Error, { email });
    return null;
  }
}

/**
 * List users with pagination
 * 
 * @param limit - Maximum number of users to return
 * @param pageToken - Page token from previous request
 * @returns List of users and next page token
 */
export async function listUsers(
  limit: number = 100,
  pageToken?: string
): Promise<{
  users: AuthenticatedUser[];
  nextPageToken?: string;
}> {
  try {
    const listResult = await adminAuth.listUsers(limit, pageToken);
    
    const users: AuthenticatedUser[] = listResult.users.map(userRecord => ({
      uid: userRecord.uid,
      email: userRecord.email,
      emailVerified: userRecord.emailVerified,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      role: userRecord.customClaims?.role || 'user',
      customClaims: userRecord.customClaims
    }));
    
    return {
      users,
      nextPageToken: listResult.pageToken
    };
  } catch (error) {
    logger.error('Failed to list users', error as Error);
    throw error;
  }
}