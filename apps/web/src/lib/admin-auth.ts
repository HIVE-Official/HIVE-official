import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { NextRequest } from 'next/server';
import { validateAuthToken } from './security-service';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin' | 'moderator';
  permissions: string[];
  lastLogin: Date;
}

// Hardcoded admin emails for ultimate security
const ADMIN_EMAILS = [
  'jwrhineh@buffalo.edu',  // Jacob Rhinehart - Super Admin
  'noahowsh@gmail.com',     // Noah - Admin
  'test-user@hive.com'      // Development testing
];

/**
 * Get admin user IDs from environment variables
 */
function getAdminUserIds(): string[] {
  const adminIds = process.env.ADMIN_USER_IDS;
  if (!adminIds) {
    return ['test-user']; // Fallback for development
  }
  return adminIds.split(',').map(id => id.trim());
}

/**
 * Check if user is an admin by ID or email
 */
export async function isAdmin(userId: string, userEmail?: string): Promise<boolean> {
  // Check by user ID first (legacy support)
  const adminUserIds = getAdminUserIds();
  if (adminUserIds.includes(userId)) {
    return true;
  }

  // Check by email (primary method)
  if (userEmail && ADMIN_EMAILS.includes(userEmail)) {
    return true;
  }

  // Check Firebase custom claims
  try {
    const auth = getAuth();
    const user = await auth.getUser(userId);
    if (user.customClaims?.isAdmin === true || user.customClaims?.role === 'admin' || user.customClaims?.role === 'super_admin') {
      return true;
    }
  } catch (error) {
  }

  // Check Firestore admins collection
  try {
    const db = getFirestore();
    const adminDoc = await db.collection('admins').doc(userId).get();
    if (adminDoc.exists && adminDoc.data()?.active === true) {
      return true;
    }
  } catch (error) {
  }

  return false;
}

/**
 * Require admin role for a userId (throws if not admin)
 */
export async function requireAdminRole(userId: string): Promise<void> {
  const isAdminUser = await isAdmin(userId);
  if (!isAdminUser) {
    throw new Error('Unauthorized: Admin access required');
  }
}

/**
 * Get admin user details
 */
export async function getAdminUser(userId: string): Promise<AdminUser | null> {
  if (!(await isAdmin(userId))) {
    return null;
  }

  try {
    const auth = getAuth();
    const userRecord = await auth.getUser(userId);
    
    // Get custom claims for permissions
    const customClaims = userRecord.customClaims || {};
    const role = customClaims.role || 'admin';
    const permissions = customClaims.permissions || ['read', 'write', 'delete'];

    return {
      id: userId,
      email: userRecord.email || '',
      role: role as 'admin' | 'moderator',
      permissions,
      lastLogin: new Date(),
    };
  } catch (error) {
    return null;
  }
}

/**
 * Verify admin token from request using centralized security service
 */
export async function verifyAdminToken(request: NextRequest): Promise<AdminUser | null> {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);

    // Use centralized security service for token validation
    const tokenValidation = await validateAuthToken(token, request, {
      operation: 'admin_access',
      requireRealAuth: false
    });

    if (!tokenValidation.valid) {
      return null;
    }

    // If we have a userId from the validation, use it
    if (tokenValidation.userId) {
      return await getAdminUser(tokenValidation.userId);
    }

    // For production tokens, verify with Firebase
    try {
      const auth = getAuth();
      const decodedToken = await auth.verifyIdToken(token);
      return await getAdminUser(decodedToken.uid);
    } catch (authError) {
      return null;
    }
  } catch (error) {
    return null;
  }
}

/**
 * Check if admin has permission
 */
export function hasPermission(admin: AdminUser, permission: string): boolean {
  return admin.permissions.includes(permission) || admin.role === 'admin';
}

/**
 * Admin authentication middleware
 */
export async function requireAdmin(request: NextRequest): Promise<{
  success: boolean;
  admin?: AdminUser;
  error?: string;
  status?: number;
}> {
  const admin = await verifyAdminToken(request);

  if (!admin) {
    return {
      success: false,
      error: 'Admin access required',
      status: 403
    };
  }

  return {
    success: true,
    admin
  };
}

/**
 * Log admin activity
 */
export async function logAdminActivity(
  adminId: string,
  action: string,
  details?: any,
  ipAddress?: string
) {
  try {
    // TODO: Implement admin activity logging to database
  } catch (error) {
  }
}
import 'server-only';
