/**
 * Permission Cascading System
 *
 * Resolves permissions hierarchically: Space Rules → User Role → Tool Requirements
 * Ensures consistent permission handling across the unified interface
 */

import type { SpaceType, SpaceTypeRules } from './space-type-rules';

export type UserRole = 'owner' | 'admin' | 'moderator' | 'member' | 'guest';

export type Permission =
  // Content permissions
  | 'posts:create' | 'posts:edit' | 'posts:delete' | 'posts:pin'
  | 'events:create' | 'events:edit' | 'events:delete' | 'events:manage'
  | 'members:view' | 'members:invite' | 'members:remove' | 'members:promote'

  // Tool permissions
  | 'tools:view' | 'tools:install' | 'tools:configure' | 'tools:remove'

  // Space permissions
  | 'space:settings' | 'space:delete' | 'space:transfer'

  // Data permissions
  | 'data:export' | 'analytics:view' | 'moderation:access';

export interface UserPermissions {
  userId: string;
  spaceId: string;
  role: UserRole;
  customPermissions?: Permission[];
  restrictions?: Permission[];
}

export interface ToolPermissions {
  toolId: string;
  requiredRole?: UserRole;
  requiredPermissions?: Permission[];
  restrictedInSpaceTypes?: SpaceType[];
  specialRequirements?: string[];
}

/**
 * Base permission matrix for user roles
 */
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  owner: [
    // All permissions
    'posts:create', 'posts:edit', 'posts:delete', 'posts:pin',
    'events:create', 'events:edit', 'events:delete', 'events:manage',
    'members:view', 'members:invite', 'members:remove', 'members:promote',
    'tools:view', 'tools:install', 'tools:configure', 'tools:remove',
    'space:settings', 'space:delete', 'space:transfer',
    'data:export', 'analytics:view', 'moderation:access'
  ],

  admin: [
    'posts:create', 'posts:edit', 'posts:delete', 'posts:pin',
    'events:create', 'events:edit', 'events:delete', 'events:manage',
    'members:view', 'members:invite', 'members:remove', 'members:promote',
    'tools:view', 'tools:install', 'tools:configure', 'tools:remove',
    'space:settings',
    'data:export', 'analytics:view', 'moderation:access'
  ],

  moderator: [
    'posts:create', 'posts:edit', 'posts:delete', 'posts:pin',
    'events:create', 'events:edit', 'events:delete',
    'members:view', 'members:invite',
    'tools:view',
    'moderation:access'
  ],

  member: [
    'posts:create', 'posts:edit',
    'events:create',
    'members:view',
    'tools:view'
  ],

  guest: [
    'members:view'
  ]
};

/**
 * Space type permission modifications
 */
const SPACE_TYPE_PERMISSION_MODIFIERS: Record<SpaceType, {
  restrictions: Permission[];
  additions: Record<UserRole, Permission[]>;
}> = {
  student_organizations: {
    restrictions: [],
    additions: {
      owner: [],
      admin: [],
      moderator: [],
      member: ['events:create'], // Members can create events
      guest: []
    }
  },

  university_organizations: {
    restrictions: ['space:delete'], // University orgs can't be deleted by users
    additions: {
      owner: ['data:export'], // Enhanced data access
      admin: ['data:export'],
      moderator: [],
      member: [],
      guest: []
    }
  },

  greek_life_spaces: {
    restrictions: ['members:view'], // Member info is more restricted
    additions: {
      owner: [],
      admin: [],
      moderator: [],
      member: ['events:create'], // Members can plan social events
      guest: []
    }
  },

  residential_spaces: {
    restrictions: ['space:delete', 'space:transfer'], // Housing managed spaces
    additions: {
      owner: [],
      admin: ['tools:install'], // RAs can install maintenance tools
      moderator: [],
      member: ['tools:view'], // Residents can use booking tools
      guest: []
    }
  }
};

/**
 * Resolve effective permissions for a user in a space
 */
export function resolveUserPermissions(
  userPermissions: UserPermissions,
  spaceType: SpaceType,
  spaceRules: SpaceTypeRules
): Permission[] {
  // Start with base role permissions
  let effectivePermissions = [...ROLE_PERMISSIONS[userPermissions.role]];

  // Apply space type modifications
  const spaceModifiers = SPACE_TYPE_PERMISSION_MODIFIERS[spaceType];

  // Add space-type specific permissions
  const additionalPermissions = spaceModifiers.additions[userPermissions.role] || [];
  effectivePermissions.push(...additionalPermissions);

  // Remove space-type restrictions
  effectivePermissions = effectivePermissions.filter(
    permission => !spaceModifiers.restrictions.includes(permission)
  );

  // Apply custom permissions (additions)
  if (userPermissions.customPermissions) {
    effectivePermissions.push(...userPermissions.customPermissions);
  }

  // Apply restrictions (removals)
  if (userPermissions.restrictions) {
    effectivePermissions = effectivePermissions.filter(
      permission => !userPermissions.restrictions!.includes(permission)
    );
  }

  // Remove duplicates
  return [...new Set(effectivePermissions)];
}

/**
 * Check if user has specific permission
 */
export function hasPermission(
  userPermissions: UserPermissions,
  spaceType: SpaceType,
  spaceRules: SpaceTypeRules,
  requiredPermission: Permission
): boolean {
  const effectivePermissions = resolveUserPermissions(userPermissions, spaceType, spaceRules);
  return effectivePermissions.includes(requiredPermission);
}

/**
 * Check if user can use a specific tool
 */
export function canUseToolInSpace(
  userPermissions: UserPermissions,
  spaceType: SpaceType,
  spaceRules: SpaceTypeRules,
  toolPermissions: ToolPermissions
): { canUse: boolean; reason?: string } {
  // Check if tool is restricted in this space type
  if (toolPermissions.restrictedInSpaceTypes?.includes(spaceType)) {
    return {
      canUse: false,
      reason: `This tool is not available in ${spaceType.replace('_', ' ')} spaces`
    };
  }

  // Check minimum role requirement
  if (toolPermissions.requiredRole) {
    const roleHierarchy: Record<UserRole, number> = {
      guest: 0,
      member: 1,
      moderator: 2,
      admin: 3,
      owner: 4
    };

    if (roleHierarchy[userPermissions.role] < roleHierarchy[toolPermissions.requiredRole]) {
      return {
        canUse: false,
        reason: `This tool requires ${toolPermissions.requiredRole} role or higher`
      };
    }
  }

  // Check specific permission requirements
  if (toolPermissions.requiredPermissions) {
    const effectivePermissions = resolveUserPermissions(userPermissions, spaceType, spaceRules);

    for (const requiredPermission of toolPermissions.requiredPermissions) {
      if (!effectivePermissions.includes(requiredPermission)) {
        return {
          canUse: false,
          reason: `Missing required permission: ${requiredPermission}`
        };
      }
    }
  }

  return { canUse: true };
}

/**
 * Get permission summary for debugging/admin interface
 */
export function getPermissionSummary(
  userPermissions: UserPermissions,
  spaceType: SpaceType,
  spaceRules: SpaceTypeRules
): {
  role: UserRole;
  basePermissions: Permission[];
  spaceModifications: {
    additions: Permission[];
    restrictions: Permission[];
  };
  customModifications: {
    additions: Permission[];
    restrictions: Permission[];
  };
  effectivePermissions: Permission[];
} {
  const basePermissions = ROLE_PERMISSIONS[userPermissions.role];
  const spaceModifiers = SPACE_TYPE_PERMISSION_MODIFIERS[spaceType];
  const effectivePermissions = resolveUserPermissions(userPermissions, spaceType, spaceRules);

  return {
    role: userPermissions.role,
    basePermissions,
    spaceModifications: {
      additions: spaceModifiers.additions[userPermissions.role] || [],
      restrictions: spaceModifiers.restrictions
    },
    customModifications: {
      additions: userPermissions.customPermissions || [],
      restrictions: userPermissions.restrictions || []
    },
    effectivePermissions
  };
}

/**
 * Tool permission presets for common tool types
 */
export const TOOL_PERMISSION_PRESETS: Record<string, ToolPermissions> = {
  // Project management tools
  project_management: {
    toolId: 'generic_project_management',
    requiredRole: 'member',
    requiredPermissions: ['posts:create', 'events:create']
  },

  // Administrative tools
  administrative: {
    toolId: 'generic_administrative',
    requiredRole: 'admin',
    requiredPermissions: ['space:settings', 'data:export']
  },

  // Social planning tools
  social_planning: {
    toolId: 'generic_social_planning',
    requiredRole: 'member',
    requiredPermissions: ['events:create']
  },

  // Resource booking tools
  resource_booking: {
    toolId: 'generic_resource_booking',
    requiredRole: 'member',
    restrictedInSpaceTypes: ['greek_life_spaces'] // May not be relevant for Greek life
  },

  // Member development tools
  member_development: {
    toolId: 'generic_member_development',
    requiredRole: 'moderator',
    requiredPermissions: ['members:view']
  },

  // Analytics tools
  analytics: {
    toolId: 'generic_analytics',
    requiredRole: 'admin',
    requiredPermissions: ['analytics:view', 'data:export']
  }
};

/**
 * Get tool permissions based on tool type
 */
export function getToolPermissions(toolType: string, customPermissions?: Partial<ToolPermissions>): ToolPermissions {
  const preset = TOOL_PERMISSION_PRESETS[toolType];

  if (!preset) {
    // Default permissions for unknown tool types
    return {
      toolId: 'unknown',
      requiredRole: 'member',
      requiredPermissions: ['tools:view'],
      ...customPermissions
    };
  }

  return {
    ...preset,
    ...customPermissions
  };
}