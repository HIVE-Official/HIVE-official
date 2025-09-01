import { authenticatedFetch } from './auth-utils';

export type SpaceRole = 'owner' | 'admin' | 'moderator' | 'member' | 'guest';

export interface SpaceMember {
  id: string;
  uid: string;
  role: SpaceRole;
  joinedAt: string;
  lastActive?: string;
  permissions: {
    canManageMembers: boolean;
    canModerateContent: boolean;
    canEditSpace: boolean;
    canViewAnalytics: boolean;
    canManageEvents: boolean;
  };
}

export interface SpaceMembership {
  spaceId: string;
  userId: string;
  role: SpaceRole;
  joinedAt: Date;
  permissions: SpaceMember['permissions'];
}

// Permission hierarchy for spaces
const ROLE_HIERARCHY: Record<SpaceRole, number> = {
  owner: 5,
  admin: 4,
  moderator: 3,
  member: 2,
  guest: 1
};

// Default permissions by role
const DEFAULT_PERMISSIONS: Record<SpaceRole, SpaceMember['permissions']> = {
  owner: {
    canManageMembers: true,
    canModerateContent: true,
    canEditSpace: true,
    canViewAnalytics: true,
    canManageEvents: true
  },
  admin: {
    canManageMembers: true,
    canModerateContent: true,
    canEditSpace: true,
    canViewAnalytics: true,
    canManageEvents: true
  },
  moderator: {
    canManageMembers: false,
    canModerateContent: true,
    canEditSpace: false,
    canViewAnalytics: true,
    canManageEvents: true
  },
  member: {
    canManageMembers: false,
    canModerateContent: false,
    canEditSpace: false,
    canViewAnalytics: false,
    canManageEvents: false
  },
  guest: {
    canManageMembers: false,
    canModerateContent: false,
    canEditSpace: false,
    canViewAnalytics: false,
    canManageEvents: false
  }
};

/**
 * Get user's membership and role in a specific space
 */
export async function getUserSpaceMembership(spaceId: string): Promise<SpaceMembership | null> {
  try {
    const response = await authenticatedFetch(`/api/spaces/${spaceId}/membership`);
    
    if (response.status === 404 || response.status === 403) {
      return null; // User is not a member
    }
    
    if (!response.ok) {
      throw new Error(`Failed to fetch membership: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract user's membership from the response
    const userMembership = data.membership || data.userMembership;
    
    if (!userMembership) {
      return null;
    }
    
    return {
      spaceId,
      userId: userMembership.uid,
      role: userMembership.role,
      joinedAt: new Date(userMembership.joinedAt),
      permissions: userMembership.permissions || DEFAULT_PERMISSIONS[userMembership.role]
    };
  } catch (error) {
    console.error('Error fetching user space membership:', error);
    return null;
  }
}

/**
 * Check if user has a specific permission in a space
 */
export async function hasSpacePermission(
  spaceId: string, 
  permission: keyof SpaceMember['permissions']
): Promise<boolean> {
  const membership = await getUserSpaceMembership(spaceId);
  
  if (!membership) {
    return false;
  }
  
  return membership.permissions[permission];
}

/**
 * Check if user has a specific role or higher in a space
 */
export async function hasMinimumSpaceRole(spaceId: string, minimumRole: SpaceRole): Promise<boolean> {
  const membership = await getUserSpaceMembership(spaceId);
  
  if (!membership) {
    return false;
  }
  
  return ROLE_HIERARCHY[membership.role] >= ROLE_HIERARCHY[minimumRole];
}

/**
 * Check if user is a leader (admin or above) in a space
 */
export async function isSpaceLeader(spaceId: string): Promise<boolean> {
  return hasMinimumSpaceRole(spaceId, 'moderator');
}

/**
 * Check if user is an admin (admin or owner) in a space
 */
export async function isSpaceAdmin(spaceId: string): Promise<boolean> {
  return hasMinimumSpaceRole(spaceId, 'admin');
}

/**
 * Get all permissions for a user in a space
 */
export async function getUserSpacePermissions(spaceId: string): Promise<SpaceMember['permissions'] | null> {
  const membership = await getUserSpaceMembership(spaceId);
  return membership?.permissions || null;
}

/**
 * Check if user can access analytics for a space
 */
export async function canAccessAnalytics(spaceId: string): Promise<boolean> {
  return hasSpacePermission(spaceId, 'canViewAnalytics');
}

/**
 * Check if user can manage members in a space
 */
export async function canManageMembers(spaceId: string): Promise<boolean> {
  return hasSpacePermission(spaceId, 'canManageMembers');
}

/**
 * Check if user can manage events in a space
 */
export async function canManageEvents(spaceId: string): Promise<boolean> {
  return hasSpacePermission(spaceId, 'canManageEvents');
}

/**
 * Check if user can edit space settings
 */
export async function canEditSpace(spaceId: string): Promise<boolean> {
  return hasSpacePermission(spaceId, 'canEditSpace');
}

/**
 * Check if user can moderate content in a space
 */
export async function canModerateContent(spaceId: string): Promise<boolean> {
  return hasSpacePermission(spaceId, 'canModerateContent');
}

/**
 * Utility function to get role hierarchy level
 */
export function getRoleLevel(role: SpaceRole): number {
  return ROLE_HIERARCHY[role];
}

/**
 * Check if one role is higher than another
 */
export function isRoleHigher(role1: SpaceRole, role2: SpaceRole): boolean {
  return ROLE_HIERARCHY[role1] > ROLE_HIERARCHY[role2];
}