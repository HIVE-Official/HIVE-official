import { DecodedIdToken } from 'firebase-admin/auth';
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { HttpStatus } from '@/lib/http-status';

export interface AdminUser {
  uid: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
  spacePermissions?: Record<string, string[]>;
}

export interface AdminContext {
  user: AdminUser;
  token: DecodedIdToken;
  isSystemAdmin: boolean;
}

/**
 * Admin permission levels
 */
export const AdminPermissions = {
  // System-wide permissions
  SYSTEM_ADMIN: 'system.admin',
  MANAGE_USERS: 'users.manage',
  VIEW_USERS: 'users.view',
  DELETE_USERS: 'users.delete',
  MANAGE_SPACES: 'spaces.manage',
  DELETE_SPACES: 'spaces.delete',
  MANAGE_CONTENT: 'content.manage',
  DELETE_CONTENT: 'content.delete',
  VIEW_ANALYTICS: 'analytics.view',
  MANAGE_SETTINGS: 'settings.manage',
  
  // Space-specific permissions
  SPACE_ADMIN: 'space.admin',
  SPACE_MODERATE: 'space.moderate',
  SPACE_ANALYTICS: 'space.analytics',
  SPACE_MEMBERS: 'space.members',
  SPACE_CONTENT: 'space.content',
  SPACE_SETTINGS: 'space.settings'
} as const;

/**
 * Verify admin token and get admin context
 */
export async function verifyAdminToken(token: string): Promise<AdminContext | null> {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    // Check custom claims for admin role
    if (!decodedToken.admin && !decodedToken.moderator && !decodedToken.superAdmin) {
      logger.warn('Non-admin user attempted admin access', { uid: decodedToken.uid });
      return null;
    }

    // Build admin user object
    const adminUser: AdminUser = {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
      role: decodedToken.superAdmin ? 'super_admin' : 
            decodedToken.admin ? 'admin' : 'moderator',
      permissions: buildPermissions(decodedToken),
      spacePermissions: decodedToken.spacePermissions
    };

    return {
      user: adminUser,
      token: decodedToken,
      isSystemAdmin: decodedToken.superAdmin === true
    };
  } catch (error) {
    logger.error('Failed to verify admin token', { error });
    return null;
  }
}

/**
 * Build permission array from token claims
 */
function buildPermissions(token: DecodedIdToken): string[] {
  const permissions: string[] = [];

  if (token.superAdmin) {
    // Super admin has all permissions
    return Object.values(AdminPermissions);
  }

  if (token.admin) {
    permissions.push(
      AdminPermissions.MANAGE_USERS,
      AdminPermissions.VIEW_USERS,
      AdminPermissions.MANAGE_SPACES,
      AdminPermissions.MANAGE_CONTENT,
      AdminPermissions.VIEW_ANALYTICS,
      AdminPermissions.MANAGE_SETTINGS
    );
  }

  if (token.moderator) {
    permissions.push(
      AdminPermissions.VIEW_USERS,
      AdminPermissions.MANAGE_CONTENT,
      AdminPermissions.VIEW_ANALYTICS
    );
  }

  // Add custom permissions if specified
  if (token.permissions && Array.isArray(token.permissions)) {
    permissions.push(...token.permissions);
  }

  return [...new Set(permissions)]; // Remove duplicates
}

/**
 * Check if admin has specific permission
 */
export function hasPermission(
  context: AdminContext, 
  permission: string, 
  spaceId?: string
): boolean {
  // System admin has all permissions
  if (context.isSystemAdmin) {
    return true;
  }

  // Check global permissions
  if (context.user.permissions.includes(permission)) {
    return true;
  }

  // Check space-specific permissions if spaceId provided
  if (spaceId && context.user.spacePermissions) {
    const spacePerms = context.user.spacePermissions[spaceId];
    if (spacePerms && spacePerms.includes(permission)) {
      return true;
    }
  }

  return false;
}

/**
 * Admin authentication middleware
 */
export async function withAdminAuth(
  handler: (req: NextRequest, context: AdminContext) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      // Extract token from header
      const authHeader = req.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Missing or invalid authorization header' },
          { status: HttpStatus.UNAUTHORIZED }
        );
      }

      const token = authHeader.substring(7);
      const context = await verifyAdminToken(token);

      if (!context) {
        return NextResponse.json(
          { error: 'Invalid admin credentials' },
          { status: HttpStatus.FORBIDDEN }
        );
      }

      // Log admin action
      logger.info('Admin action', {
        adminId: context.user.uid,
        role: context.user.role,
        path: req.url,
        method: req.method
      });

      // Call the handler with admin context
      return await handler(req, context);
    } catch (error) {
      logger.error('Admin auth middleware error', { error, url: req.url });
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: HttpStatus.INTERNAL_SERVER_ERROR }
      );
    }
  };
}

/**
 * Require specific permission middleware
 */
export function requirePermission(permission: string, spaceId?: string) {
  return (handler: (req: NextRequest, context: AdminContext) => Promise<NextResponse>) => {
    return withAdminAuth(async (req: NextRequest, context: AdminContext) => {
      if (!hasPermission(context, permission, spaceId)) {
        logger.warn('Permission denied', {
          adminId: context.user.uid,
          permission,
          spaceId
        });
        
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: HttpStatus.FORBIDDEN }
        );
      }

      return handler(req, context);
    });
  };
}

/**
 * Grant admin role to user
 */
export async function grantAdminRole(
  userId: string, 
  role: 'admin' | 'moderator', 
  permissions?: string[],
  grantedBy?: string
): Promise<void> {
  try {
    const user = await adminAuth.getUser(userId);
    
    // Set custom claims
    const claims = {
      ...user.customClaims,
      [role]: true,
      permissions: permissions || [],
      grantedAt: new Date().toISOString(),
      grantedBy
    };

    await adminAuth.setCustomUserClaims(userId, claims);
    
    logger.info('Admin role granted', {
      userId,
      role,
      permissions,
      grantedBy
    });
  } catch (error) {
    logger.error('Failed to grant admin role', { error, userId, role });
    throw error;
  }
}

/**
 * Revoke admin role from user
 */
export async function revokeAdminRole(
  userId: string, 
  role: 'admin' | 'moderator',
  revokedBy?: string
): Promise<void> {
  try {
    const user = await adminAuth.getUser(userId);
    
    // Remove role from custom claims
    const claims = { ...user.customClaims };
    delete claims[role];
    
    // Remove all permissions if no admin roles left
    if (!claims.admin && !claims.moderator && !claims.superAdmin) {
      delete claims.permissions;
      delete claims.spacePermissions;
    }

    claims.revokedAt = new Date().toISOString();
    claims.revokedBy = revokedBy;

    await adminAuth.setCustomUserClaims(userId, claims);
    
    logger.info('Admin role revoked', {
      userId,
      role,
      revokedBy
    });
  } catch (error) {
    logger.error('Failed to revoke admin role', { error, userId, role });
    throw error;
  }
}

/**
 * Grant space-specific admin permissions
 */
export async function grantSpacePermissions(
  userId: string,
  spaceId: string,
  permissions: string[],
  grantedBy?: string
): Promise<void> {
  try {
    const user = await adminAuth.getUser(userId);
    
    const currentClaims = user.customClaims || {};
    const spacePermissions = currentClaims.spacePermissions || {};
    
    spacePermissions[spaceId] = permissions;
    
    const claims = {
      ...currentClaims,
      spacePermissions,
      spacePermissionsUpdatedAt: new Date().toISOString(),
      spacePermissionsUpdatedBy: grantedBy
    };

    await adminAuth.setCustomUserClaims(userId, claims);
    
    logger.info('Space permissions granted', {
      userId,
      spaceId,
      permissions,
      grantedBy
    });
  } catch (error) {
    logger.error('Failed to grant space permissions', { error, userId, spaceId });
    throw error;
  }
}

/**
 * Check if user is admin (for client-side checks)
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    const user = await adminAuth.getUser(userId);
    const claims = user.customClaims || {};
    
    return claims.superAdmin === true || 
           claims.admin === true || 
           claims.moderator === true;
  } catch (error) {
    logger.error('Failed to check admin status', { error, userId });
    return false;
  }
}

/**
 * Get all admin users
 */
export async function getAdminUsers(): Promise<AdminUser[]> {
  try {
    const admins: AdminUser[] = [];
    let pageToken: string | undefined;

    do {
      const listResult = await adminAuth.listUsers(1000, pageToken);
      
      for (const user of listResult.users) {
        const claims = user.customClaims || {};
        
        if (claims.superAdmin || claims.admin || claims.moderator) {
          admins.push({
            uid: user.uid,
            email: user.email || '',
            role: claims.superAdmin ? 'super_admin' : 
                  claims.admin ? 'admin' : 'moderator',
            permissions: buildPermissions(claims as DecodedIdToken),
            spacePermissions: claims.spacePermissions
          });
        }
      }
      
      pageToken = listResult.pageToken;
    } while (pageToken);

    return admins;
  } catch (error) {
    logger.error('Failed to get admin users', { error });
    throw error;
  }
}

/**
 * Validate admin session (for SSR)
 */
export async function validateAdminSession(sessionCookie: string): Promise<AdminContext | null> {
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    
    if (!decodedClaims.admin && !decodedClaims.moderator && !decodedClaims.superAdmin) {
      return null;
    }

    const adminUser: AdminUser = {
      uid: decodedClaims.uid,
      email: decodedClaims.email || '',
      role: decodedClaims.superAdmin ? 'super_admin' : 
            decodedClaims.admin ? 'admin' : 'moderator',
      permissions: buildPermissions(decodedClaims),
      spacePermissions: decodedClaims.spacePermissions
    };

    return {
      user: adminUser,
      token: decodedClaims,
      isSystemAdmin: decodedClaims.superAdmin === true
    };
  } catch (error) {
    logger.error('Failed to validate admin session', { error });
    return null;
  }
}

/**
 * Log admin activity for audit trail
 */
export async function logAdminActivity(
  adminId: string,
  action: string,
  details?: any
): Promise<void> {
  try {
    logger.info('Admin activity', {
      adminId,
      action,
      details,
      timestamp: new Date().toISOString()
    });
    
    // In production, this would also write to a dedicated audit log
    // For now, we're just logging to the standard logger
  } catch (error) {
    logger.error('Failed to log admin activity', { error, adminId, action });
  }
}