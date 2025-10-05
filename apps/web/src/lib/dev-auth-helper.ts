/**
 * DEVELOPMENT-ONLY Authentication Helper
 * SECURITY: This file is completely disabled in production
 * Provides secure development testing without compromising production security
 */

// CRITICAL SECURITY: Throw error if this is imported in production
if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
  throw new Error('SECURITY VIOLATION: dev-auth-helper cannot be used in production');
}

import { NextRequest, NextResponse } from 'next/server';
import { SecureSessionManager } from './secure-session-manager';
import { currentEnvironment } from './env';
import { logSecurityEvent } from './structured-logger';

/**
 * Development user profiles for testing
 */
const DEV_USERS = {
  'student@test.edu': {
    userId: 'dev-user-1',
    email: 'student@test.edu',
    handle: 'test-student',
    schoolId: 'test-university',
    role: 'student'
  },
  'faculty@test.edu': {
    userId: 'dev-user-2',
    email: 'faculty@test.edu',
    handle: 'test-faculty',
    schoolId: 'test-university',
    role: 'faculty'
  },
  'admin@test.edu': {
    userId: 'dev-user-3',
    email: 'admin@test.edu',
    handle: 'test-admin',
    schoolId: 'test-university',
    role: 'admin'
  },
  'jacob@test.edu': {
    userId: 'dev-user-jacob',
    email: 'jacob@test.edu',
    handle: 'jacob-founder',
    schoolId: 'test-university',
    role: 'founder'
  },
  // UB development users for testing
  'sarah.chen@buffalo.edu': {
    userId: 'dev-user-ub-sarah',
    email: 'sarah.chen@buffalo.edu',
    handle: 'sarah.chen.cs',
    schoolId: 'ub',
    role: 'student'
  },
  'admin@buffalo.edu': {
    userId: 'dev-user-ub-admin',
    email: 'admin@buffalo.edu',
    handle: 'ub-admin',
    schoolId: 'ub',
    role: 'admin'
  }
} as const;

/**
 * Development schools for testing
 */
const DEV_SCHOOLS = {
  'test-university': {
    id: 'test-university',
    name: 'Test University',
    domain: 'test.edu',
    active: true
  },
  'ub': {
    id: 'ub',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    active: true
  }
};

/**
 * Create development session (DEVELOPMENT ONLY)
 */
export async function createDevSession(
  email: string,
  request: NextRequest
): Promise<{
  success: boolean;
  tokens?: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  };
  user?: any;
  error?: string;
}> {
  // SECURITY: Only allow in development
  if (currentEnvironment !== 'development') {
    await logSecurityEvent('invalid_token', {
      action: 'dev_session_blocked_in_production',
      tags: {
        email,
        environment: currentEnvironment,
        blocked: 'true'
      }
    });
    
    return {
      success: false,
      error: 'Development authentication not available in production'
    };
  }

  // Check if user exists in dev profiles
  if (!(email in DEV_USERS)) {
    return {
      success: false,
      error: 'Development user not found. Use: student@test.edu, faculty@test.edu, admin@test.edu, or jacob@test.edu'
    };
  }

  const user = DEV_USERS[email as keyof typeof DEV_USERS];

  try {
    // Create secure session using the same system as production
    const tokens = await SecureSessionManager.createSession(
      {
        userId: user.userId,
        email: user.email,
        handle: user.handle,
        schoolId: user.schoolId
      },
      request
    );

    await logSecurityEvent('invalid_token', {
      action: 'dev_session_created',
      tags: {
        userId: user.userId,
        email: user.email,
        role: user.role,
        environment: currentEnvironment
      }
    });

    return {
      success: true,
      tokens,
      user
    };
  } catch (error) {
    console.error('Development session creation failed:', error);
    return {
      success: false,
      error: 'Failed to create development session'
    };
  }
}

/**
 * Development authentication endpoint
 */
export async function handleDevAuth(request: NextRequest): Promise<NextResponse> {
  if (currentEnvironment !== 'development') {
    return NextResponse.json(
      { error: 'Development authentication not available' },
      { status: 403 }
    );
  }

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const result = await createDevSession(email, request);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: result.user,
      message: 'Development session created'
    });

    // Set secure session cookies
    if (result.tokens) {
      SecureSessionManager.setSessionCookies(response, result.tokens);
    }

    return response;
  } catch (error) {
    console.error('Development auth error:', error);
    return NextResponse.json(
      { error: 'Development authentication failed' },
      { status: 500 }
    );
  }
}

/**
 * Get development users list
 */
export function getDevUsers() {
  if (currentEnvironment !== 'development') {
    return [];
  }

  return Object.entries(DEV_USERS).map(([email, user]) => ({
    email,
    handle: user.handle,
    role: user.role
  }));
}

/**
 * Get development school
 */
export function getDevSchool(schoolId?: string) {
  if (currentEnvironment !== 'development') {
    return null;
  }

  if (schoolId && schoolId in DEV_SCHOOLS) {
    return DEV_SCHOOLS[schoolId as keyof typeof DEV_SCHOOLS];
  }

  return DEV_SCHOOLS['test-university']; // Default
}

/**
 * Check if email is a development user
 */
export function isDevUser(email: string): boolean {
  const isLocalEnv = currentEnvironment === 'development' || !process.env.VERCEL;
  return isLocalEnv && email in DEV_USERS;
}

/**
 * Validate development school
 */
export function validateDevSchool(schoolId: string): boolean {
  const isLocalEnv = currentEnvironment === 'development' || !process.env.VERCEL;
  return isLocalEnv && schoolId in DEV_SCHOOLS;
}