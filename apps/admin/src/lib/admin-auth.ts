import { getAuth } from 'firebase-admin/auth';
import { NextRequest } from 'next/server';

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
 * Verify admin token from request
 */
export async function verifyAdminToken(request: NextRequest): Promise<AdminUser | null> {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    let userId: string;

    // Handle test tokens in development
    if (token === 'test-token' && process.env.NODE_ENV === 'development') {
      userId = 'test-user';
    } else {
      try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (authError) {
        console.error('Token verification failed:', authError);
        return null;
      }
    }

    return await getAdminUser(userId);
  } catch (error) {
    console.error('Admin token verification error:', error);
    return null;
  }
}

/**
 * Verify admin session from cookies
 */
export async function verifyAdminSession(): Promise<AdminUser | null> {
  try {
    // TODO: Implement cookies() properly for Next.js 14+
    // const cookieStore = cookies();
    // const sessionToken = cookieStore.get('admin-session')?.value;
    const sessionToken = 'test-session'; // Mock for development
    
    if (!sessionToken) {
      return null;
    }

    // Handle test session in development
    if (sessionToken === 'test-session' && process.env.NODE_ENV === 'development') {
      return await getAdminUser('test-user');
    }

    // TODO: Implement proper session verification with JWT
    // For now, assume the session token is the user ID
    return await getAdminUser(sessionToken);
  } catch (error) {
    console.error('Admin session verification error:', error);
    return null;
  }
}

/**
 * Create admin session
 */
export function createAdminSession(userId: string): string {
  // TODO: Implement proper JWT session creation
  // For now, return the user ID as the session token
  return userId;
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
  details?: Record<string, unknown>,
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