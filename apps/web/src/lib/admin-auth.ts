import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { NextRequest } from 'next/server';
import { validateAuthToken } from './security-service';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'moderator';
  permissions: string[];
  lastLogin: Date;
}

/**
 * Get admin user IDs from environment variables
 */
function getAdminUserIds(): string[] {
  const adminIds = process.env.ADMIN_USER_IDS;
  if (!adminIds) {
    console.warn('ADMIN_USER_IDS environment variable not set');
    return ['test-user']; // Fallback for development
  }
  return adminIds.split(',').map(id => id.trim());
}

/**
 * Check if user is an admin
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const adminUserIds = getAdminUserIds();
  return adminUserIds.includes(userId);
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
    console.error('Error getting admin user:', error);
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
      if (tokenValidation.securityAlert) {
        console.error('🚨 SECURITY ALERT: Admin bypass attempt blocked', {
          reason: tokenValidation.reason,
          ip: request.headers.get('x-forwarded-for'),
          userAgent: request.headers.get('user-agent')
        });
      }
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
      console.error('Firebase token verification failed:', authError);
      return null;
    }
  } catch (error) {
    console.error('Admin token verification error:', error);
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
    console.log(`[ADMIN] ${adminId} performed ${action}`, {
      timestamp: new Date().toISOString(),
      details,
      ipAddress
    });
  } catch (error) {
    console.error('Failed to log admin activity:', error);
  }
}