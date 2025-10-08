/**
 * Server-side authentication utilities for HIVE
 * 
 * Provides proper typing for server-side auth operations
 * and replaces the broken getCurrentUser from auth-logic.
 */

import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { NextRequest } from 'next/server';

export interface AuthUser {
  uid: string;
  id: string; // Alias for uid for backwards compatibility
  email: string;
  emailVerified: boolean;
  displayName?: string;
  photoURL?: string;

  // HIVE-specific properties
  handle?: string;
  schoolId?: string;
  userType?: 'student' | 'faculty' | 'staff' | 'alumni';
  isOnboarded?: boolean;
  isBuilder?: boolean;

  // Firebase properties
  customClaims?: Record<string, any>;
}

export interface SessionUser {
  uid: string;
  id: string; // Alias for uid for backwards compatibility
  email: string;
  emailVerified: boolean;
  displayName?: string;
  photoURL?: string;
  handle?: string;
  schoolId?: string;
  userType?: 'student' | 'faculty' | 'staff' | 'alumni';
  isOnboarded?: boolean;
  isBuilder?: boolean;
}

/**
 * Get the current authenticated user from request headers
 */
export async function getCurrentUser(request?: NextRequest): Promise<AuthUser | null> {
  try {
    // In development, allow bypass for testing
    if (process.env.NODE_ENV === 'development') {
      const devBypass = process.env.DEV_AUTH_BYPASS;
      if (devBypass === 'true') {
        return {
          uid: 'dev-user-id',
          id: 'dev-user-id',
          email: 'dev@example.com',
          emailVerified: true,
          displayName: 'Dev User',
          handle: 'dev_user',
          schoolId: 'ub',
          userType: 'student',
          isOnboarded: true,
          isBuilder: true
        };
      }
    }

    // Get token from Authorization header
    const token = request?.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return null;
    }

    // Verify the token with Firebase Admin
    const decodedToken = await getAuth().verifyIdToken(token);
    
    return {
      uid: decodedToken.uid,
      id: decodedToken.uid, // Alias for backwards compatibility
      email: decodedToken.email || '',
      emailVerified: decodedToken.email_verified || false,
      displayName: decodedToken.name,
      photoURL: decodedToken.picture,
      handle: decodedToken.handle,
      schoolId: decodedToken.schoolId,
      userType: decodedToken.userType as 'student' | 'faculty' | 'staff' | 'alumni',
      isOnboarded: decodedToken.isOnboarded || false,
      isBuilder: decodedToken.isBuilder || false,
      customClaims: decodedToken
    };

  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Get user from session data (for non-request contexts)
 */
export async function getUserFromSession(sessionData: any): Promise<SessionUser | null> {
  if (!sessionData?.id) {
    return null;
  }

  return {
    uid: sessionData.id,
    id: sessionData.id, // Alias for backwards compatibility
    email: sessionData.email || '',
    emailVerified: sessionData.emailVerified || false,
    displayName: sessionData.displayName,
    photoURL: sessionData.photoURL,
    handle: sessionData.handle,
    schoolId: sessionData.schoolId,
    userType: sessionData.userType,
    isOnboarded: sessionData.isOnboarded || false,
    isBuilder: sessionData.isBuilder || false
  };
}

/**
 * Check if user has required permissions
 */
export function hasPermission(user: AuthUser | SessionUser | null, permission: string): boolean {
  if (!user) return false;
  
  // Basic permission checks
  switch (permission) {
    case 'read:profile':
      return true; // All authenticated users can read profiles
    case 'write:profile':
      return true; // All authenticated users can write their own profile
    case 'create:tools':
      return user.isBuilder || user.userType === 'faculty';
    case 'admin:spaces':
      return user.userType === 'faculty' || user.userType === 'staff';
    default:
      return false;
  }
}

/**
 * Check if user belongs to a specific school
 */
export function belongsToSchool(user: AuthUser | SessionUser | null, schoolId: string): boolean {
  return user?.schoolId === schoolId;
}