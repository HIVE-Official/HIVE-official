/**
 * Space Type Rule System
 *
 * Defines behavioral rules for each space type without fragmenting the UI.
 * All spaces use the same unified interface, but rules determine behavior.
 */

export type SpaceType =
  | 'student_organizations'    // Student clubs, academic groups, interests
  | 'university_organizations' // Official university entities
  | 'greek_life_spaces'       // Fraternities, sororities, honor societies
  | 'residential_spaces';     // Dorms, floors, off-campus housing

export type MembershipRule = {
  maxSpaces: number | 'unlimited';
  joinMethod: 'instant' | 'approval' | 'invitation_only' | 'automatic';
  leaveRestriction?: 'housing_change_only' | 'semester_end' | 'none';
  approvalProcess?: 'simple' | 'rush_system' | 'faculty_approval';
  specialRoles?: string[];
};

export type VisibilityRule = {
  memberProfiles: 'public' | 'limited_external' | 'members_only' | 'role_based';
  posts: 'public' | 'campus_visible' | 'members_only' | 'space_only';
  events: 'public_calendar' | 'campus_calendar' | 'members_only' | 'invitation_controlled';
  spaceDiscoverable: boolean;
};

export type ToolRule = {
  allowedTypes: string[];
  defaultPosition: 'inline' | 'contextual' | 'leader_choice';
  maxTools?: number;
  requireApproval?: boolean;
};

export interface SpaceTypeRules {
  membership: MembershipRule;
  visibility: VisibilityRule;
  tools: ToolRule;
  specialFeatures?: string[];
  compliance?: string[];
}

/**
 * Complete rule definitions for each space type
 */
export const SPACE_TYPE_RULES: Record<SpaceType, SpaceTypeRules> = {

  student_organizations: {
    membership: {
      maxSpaces: 'unlimited',
      joinMethod: 'approval', // Can be instant for some, approval for others
      leaveRestriction: 'none',
      approvalProcess: 'simple',
      specialRoles: ['president', 'vice_president', 'treasurer', 'secretary']
    },
    visibility: {
      memberProfiles: 'public',
      posts: 'campus_visible',
      events: 'public_calendar',
      spaceDiscoverable: true
    },
    tools: {
      allowedTypes: [
        'project_management',
        'skill_matching',
        'analytics',
        'event_coordination',
        'member_onboarding',
        'goal_tracking'
      ],
      defaultPosition: 'leader_choice',
      maxTools: 10
    },
    specialFeatures: ['external_partnerships', 'fundraising', 'competitions']
  },

  university_organizations: {
    membership: {
      maxSpaces: 'unlimited',
      joinMethod: 'approval',
      leaveRestriction: 'none',
      approvalProcess: 'faculty_approval',
      specialRoles: ['faculty_advisor', 'admin', 'student_leader']
    },
    visibility: {
      memberProfiles: 'role_based', // Faculty see more than students
      posts: 'campus_visible',
      events: 'public_calendar',
      spaceDiscoverable: true
    },
    tools: {
      allowedTypes: [
        'administrative',
        'reporting',
        'campus_integration',
        'compliance_tracking',
        'resource_allocation',
        'student_services'
      ],
      defaultPosition: 'contextual',
      maxTools: 15,
      requireApproval: true
    },
    specialFeatures: ['university_systems', 'official_communications', 'resource_access'],
    compliance: ['ferpa', 'accessibility', 'university_policies']
  },

  greek_life_spaces: {
    membership: {
      maxSpaces: 'unlimited', // Can be in multiple Greek orgs
      joinMethod: 'invitation_only',
      leaveRestriction: 'none',
      approvalProcess: 'rush_system',
      specialRoles: ['president', 'vice_president', 'rush_chair', 'social_chair', 'pledge_educator']
    },
    visibility: {
      memberProfiles: 'limited_external', // Non-members see limited info
      posts: 'members_only',
      events: 'invitation_controlled',
      spaceDiscoverable: false // Private by default
    },
    tools: {
      allowedTypes: [
        'social_planning',
        'member_development',
        'alumni_network',
        'rush_management',
        'philanthropy_tracking',
        'brotherhood_sisterhood'
      ],
      defaultPosition: 'inline', // Social tools work better inline
      maxTools: 8
    },
    specialFeatures: ['alumni_connections', 'traditions', 'philanthropy', 'recruitment']
  },

  residential_spaces: {
    membership: {
      maxSpaces: 1, // Can only be in one residential space
      joinMethod: 'automatic', // Based on housing assignment
      leaveRestriction: 'housing_change_only',
      specialRoles: ['ra', 'floor_president', 'building_coordinator']
    },
    visibility: {
      memberProfiles: 'members_only', // Neighbors see full profiles
      posts: 'space_only',
      events: 'members_only',
      spaceDiscoverable: false // Based on housing assignment
    },
    tools: {
      allowedTypes: [
        'resource_booking',
        'issue_reporting',
        'social_coordination',
        'maintenance_requests',
        'package_tracking',
        'community_guidelines'
      ],
      defaultPosition: 'contextual', // Living tools work better in sidebar
      maxTools: 6
    },
    specialFeatures: ['housing_integration', 'maintenance_systems', 'community_resources']
  }
};

/**
 * Get rules for a specific space type
 */
export function getSpaceTypeRules(spaceType: SpaceType): SpaceTypeRules {
  return SPACE_TYPE_RULES[spaceType];
}

/**
 * Check if a user can join a space based on type rules
 */
export function canUserJoinSpace(
  spaceType: SpaceType,
  userCurrentSpaces: { type: SpaceType }[],
  joinMethod?: string
): { canJoin: boolean; reason?: string } {
  const rules = getSpaceTypeRules(spaceType);

  // Check max spaces limit
  if (rules.membership.maxSpaces !== 'unlimited') {
    const sameTypeSpaces = userCurrentSpaces.filter(s => s.type === spaceType);
    if (sameTypeSpaces.length >= rules.membership.maxSpaces) {
      return {
        canJoin: false,
        reason: `Maximum ${rules.membership.maxSpaces} ${spaceType.replace('_', ' ')} allowed`
      };
    }
  }

  // Check join method compatibility
  if (rules.membership.joinMethod === 'invitation_only' && joinMethod !== 'invitation') {
    return {
      canJoin: false,
      reason: 'This space is invitation only'
    };
  }

  return { canJoin: true };
}

/**
 * Get allowed tools for a space type
 */
export function getAllowedToolsForSpaceType(spaceType: SpaceType): string[] {
  return getSpaceTypeRules(spaceType).tools.allowedTypes;
}

/**
 * Get default tool position for a space type
 */
export function getDefaultToolPosition(spaceType: SpaceType): 'inline' | 'contextual' | 'leader_choice' {
  return getSpaceTypeRules(spaceType).tools.defaultPosition;
}

/**
 * Check if a tool is allowed in a space type
 */
export function isToolAllowedInSpaceType(toolType: string, spaceType: SpaceType): boolean {
  const allowedTools = getAllowedToolsForSpaceType(spaceType);
  return allowedTools.includes(toolType);
}

/**
 * Get visibility settings for content in a space
 */
export function getContentVisibility(spaceType: SpaceType, contentType: 'posts' | 'events' | 'members') {
  const rules = getSpaceTypeRules(spaceType);

  // Fallback to safe defaults if rules are not found
  if (!rules || !rules.visibility) {
    return 'members_only'; // Safe default for all content types
  }

  switch (contentType) {
    case 'posts':
      return rules.visibility.posts || 'members_only';
    case 'events':
      return rules.visibility.events || 'members_only';
    case 'members':
      return rules.visibility.memberProfiles || 'members_only';
    default:
      return 'members_only';
  }
}