/**
 * Profile Data Transformers
 * Bridges HiveProfile format (API/backend) with ProfileSystem format (@hive/ui components)
 */

import type { HiveProfile, HiveProfileDashboard } from '@hive/core';
// Define types locally until they're exported from @hive/core
interface ProfileSystem {
  userId: string;
  campusId: string;
  handle: string;
  identity?: any;
  presence?: any;
  connections?: any;
  grid?: any;
  privacy?: any;
  intelligence?: any;
  createdAt?: any;
  updatedAt?: any;
  completeness?: any;
  isSetupComplete?: any;
  profile?: any;
  dashboard?: any;
  analytics?: any;
  navigation?: any;
}

interface BentoGridLayout {
  cards?: any[];
  items?: any[];
  mobileLayout?: any[];
  lastModified?: string;
}

enum VisibilityLevel {
  PUBLIC = 'public',
  FRIENDS = 'friends',
  CONNECTIONS = 'connections',
  PRIVATE = 'private'
}

// Re-export types for other modules
export type { ProfileSystem, BentoGridLayout };
export { VisibilityLevel };

/**
 * Transform HiveProfile to ProfileSystem format for @hive/ui components
 */
export function transformHiveProfileToProfileSystem(
  hiveProfile: HiveProfile,
  dashboard?: HiveProfileDashboard
): ProfileSystem {
  const now = new Date();

  return {
    userId: hiveProfile.identity.id,
    campusId: 'ub-buffalo', // UB-specific for vBETA
    handle: hiveProfile.identity.handle,

    identity: {
      academic: {
        name: hiveProfile.identity.fullName,
        year: hiveProfile.academic.academicYear || 'student',
        majors: hiveProfile.academic.major ? [hiveProfile.academic.major] : [],
        minors: [], // Not currently tracked in HiveProfile
        pronouns: hiveProfile.academic.pronouns || '',
        graduationYear: hiveProfile.academic.graduationYear || new Date().getFullYear() + 1
      },
      photoCarousel: {
        photos: hiveProfile.identity.avatarUrl ? [hiveProfile.identity.avatarUrl] : [],
        currentIndex: 0,
        rotationInterval: 30000,
        lastUpdated: new Date(hiveProfile.timestamps.updatedAt),
        freshnessThreshold: 6 * 7 * 24 * 60 * 60 * 1000 // 6 weeks
      },
      badges: generateProfileBadges(hiveProfile)
    },

    connections: {
      friends: [], // Would need to fetch from connections collection
      connections: [], // Would need to fetch from connections collection
      pendingRequests: [],
      blockedUsers: []
    },

    presence: {
      vibe: generateVibeFromProfile(hiveProfile),
      vibeUpdatedAt: new Date(hiveProfile.timestamps.lastActiveAt),
      lastActive: new Date(hiveProfile.timestamps.lastActiveAt),
      isOnline: isRecentlyActive(hiveProfile.timestamps.lastActiveAt),
      currentActivity: {
        type: 'available',
        context: hiveProfile.personal.statusMessage || 'Building on HIVE'
      }
    },

    grid: generateBentoGridLayout(hiveProfile, dashboard),

    privacy: {
      ghostMode: hiveProfile.privacy.ghostMode.enabled,
      visibilityLevel: determineVisibilityLevel(hiveProfile.privacy),
      scheduleSharing: {
        friends: hiveProfile.privacy.showActivity,
        connections: hiveProfile.privacy.showConnections
      },
      availabilityBroadcast: {
        friends: hiveProfile.privacy.showOnlineStatus,
        connections: hiveProfile.privacy.showConnections,
        campus: hiveProfile.privacy.isPublic
      },
      discoveryParticipation: hiveProfile.privacy.isPublic,
      spaceActivityVisibility: new Map() // Would need to populate from space-specific settings
    },

    intelligence: {
      schedule: [], // Would need to fetch from calendar integration
      overlaps: [], // Would need to calculate from schedule
      suggestions: [], // Would need to generate from recommendation engine
      lastCalculated: now
    },

    createdAt: new Date(hiveProfile.timestamps.createdAt),
    updatedAt: new Date(hiveProfile.timestamps.updatedAt),
    completeness: calculateProfileCompleteness(hiveProfile),
    isSetupComplete: hiveProfile.verification.onboardingCompleted
  };
}

/**
 * Generate default bento grid layout based on profile data
 */
function generateBentoGridLayout(
  profile: HiveProfile,
  dashboard?: HiveProfileDashboard
): BentoGridLayout {
  const cards = [
    {
      id: 'spaces_hub',
      type: 'spaces_hub' as const,
      position: { x: 0, y: 0 },
      size: '2x2' as const,
      visible: profile.privacy.showSpaces
    },
    {
      id: 'friends_network',
      type: 'friends_network' as const,
      position: { x: 2, y: 0 },
      size: '2x2' as const,
      visible: profile.privacy.showConnections
    },
    {
      id: 'active_now',
      type: 'active_now' as const,
      position: { x: 0, y: 2 },
      size: '1x1' as const,
      visible: profile.privacy.showActivity
    },
    {
      id: 'discovery',
      type: 'discovery' as const,
      position: { x: 1, y: 2 },
      size: '1x1' as const,
      visible: true
    }
  ];

  // Add builder-specific cards if user is a builder
  if (profile.builder.isBuilder) {
    cards.push({
      id: 'vibe_check',
      type: 'discovery' as const,
      position: { x: 2, y: 2 },
      size: '1x1' as const,
      visible: true
    });
  }

  return {
    cards: cards,
    mobileLayout: [
      {
        id: 'spaces_hub',
        type: 'spaces_hub' as const,
        position: { x: 0, y: 0 },
        size: '2x1' as const,
        visible: profile.privacy.showSpaces
      },
      {
        id: 'active_now',
        type: 'active_now' as const,
        position: { x: 0, y: 1 },
        size: '1x1' as const,
        visible: profile.privacy.showActivity
      },
      {
        id: 'friends_network',
        type: 'friends_network' as const,
        position: { x: 1, y: 1 },
        size: '1x1' as const,
        visible: profile.privacy.showConnections
      }
    ],
    lastModified: new Date(profile.timestamps.updatedAt).toISOString()
  };
}

/**
 * Generate profile badges based on achievements and status
 */
function generateProfileBadges(profile: HiveProfile) {
  const badges = [];

  if (profile.builder.isBuilder) {
    badges.push({
      id: 'builder',
      type: 'builder' as const,
      name: 'Builder',
      description: `${profile.builder.builderLevel} • ${profile.builder.toolsCreated} tools created`,
      earnedAt: new Date(profile.timestamps.createdAt),
      displayOrder: 1
    });
  }

  if (profile.verification.profileVerified) {
    badges.push({
      id: 'verified',
      type: 'verification' as const,
      name: 'Verified',
      description: 'Verified student profile',
      earnedAt: new Date(profile.timestamps.createdAt),
      displayOrder: 2
    });
  }

  if (profile.stats.spacesLed > 0) {
    badges.push({
      id: 'leader',
      type: 'leadership' as const,
      name: 'Space Leader',
      description: `Leading ${profile.stats.spacesLed} space${profile.stats.spacesLed > 1 ? 's' : ''}`,
      earnedAt: new Date(profile.timestamps.createdAt),
      displayOrder: 3
    });
  }

  return badges;
}

/**
 * Generate vibe based on profile activity and status
 */
function generateVibeFromProfile(profile: HiveProfile): string {
  const vibes = [
    '🎯 Thriving',
    '🚀 Building',
    '📚 Studying',
    '🤝 Connecting',
    '⚡ Energized',
    '🌟 Inspired'
  ];

  // Smart vibe selection based on profile data
  if (profile.builder.isBuilder && profile.builder.toolsCreated > 0) {
    return '🚀 Building';
  }

  if (profile.stats.currentStreak > 5) {
    return '🎯 Thriving';
  }

  if (profile.stats.spacesActive > 3) {
    return '🤝 Connecting';
  }

  // Default to a positive vibe
  return vibes[Math.floor(Math.random() * vibes.length)];
}

/**
 * Determine visibility level from privacy settings
 */
function determineVisibilityLevel(privacy: HiveProfile['privacy']): VisibilityLevel {
  if (privacy.ghostMode.enabled) {
    return VisibilityLevel.PRIVATE;
  }

  if (privacy.isPublic) {
    return VisibilityLevel.PUBLIC;
  }

  return VisibilityLevel.CONNECTIONS;
}

/**
 * Check if user has been recently active (within last hour)
 */
function isRecentlyActive(lastActiveAt: string): boolean {
  const lastActive = new Date(lastActiveAt);
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  return lastActive > oneHourAgo;
}

/**
 * Calculate profile completeness percentage
 */
function calculateProfileCompleteness(profile: HiveProfile): number {
  const fields = [
    profile.identity.fullName,
    profile.identity.avatarUrl,
    profile.academic.major,
    profile.academic.academicYear,
    profile.personal.bio,
    profile.academic.housing,
    profile.academic.pronouns,
    profile.personal.interests.length > 0 ? 'interests' : null
  ];

  const completedFields = fields.filter(field => field && field.length > 0).length;
  return Math.round((completedFields / fields.length) * 100);
}

/**
 * Transform ProfileSystem back to HiveProfile (for updates)
 */
export function transformProfileSystemToHiveProfile(profileSystem: ProfileSystem): Partial<HiveProfile> {
  return {
    identity: {
      id: profileSystem.userId,
      fullName: profileSystem.identity.academic.name,
      handle: profileSystem.handle,
      email: '', // Not available in ProfileSystem
      avatarUrl: profileSystem.identity.photoCarousel.photos[0] || undefined
    },
    academic: {
      major: profileSystem.identity.academic.majors[0] || undefined,
      academicYear: profileSystem.identity.academic.year as any,
      graduationYear: profileSystem.identity.academic.graduationYear,
      schoolId: profileSystem.campusId,
      pronouns: profileSystem.identity.academic.pronouns
    },
    personal: {
      bio: '', // Not directly available in ProfileSystem
      statusMessage: profileSystem.presence.currentActivity.context,
      location: '', // Not directly available
      interests: [] // Not directly available
    }
  };
}

/**
 * Create mock ProfileSystem for development/testing
 */
export function createMockProfileSystem(userId: string = 'mock-user'): ProfileSystem {
  const mockHiveProfile: HiveProfile = {
    identity: {
      id: userId,
      fullName: 'Jacob Rhinehart',
      handle: 'jacob',
      email: 'jacob@hive.com',
      avatarUrl: ''
    },
    academic: {
      major: 'Business Administration',
      academicYear: 'senior',
      graduationYear: 2025,
      schoolId: 'ub-buffalo',
      pronouns: 'he/him'
    },
    personal: {
      bio: 'Building the future of campus collaboration 🚀',
      statusMessage: 'Shipping HIVE',
      location: 'Buffalo, NY',
      interests: ['entrepreneurship', 'product-design', 'campus-life']
    },
    privacy: {
      isPublic: true,
      showActivity: true,
      showSpaces: true,
      showConnections: true,
      allowDirectMessages: true,
      showOnlineStatus: true,
      ghostMode: { enabled: false, level: 'minimal' }
    },
    builder: {
      isBuilder: true,
      builderOptIn: true,
      builderLevel: 'advanced',
      specializations: ['product-management'],
      toolsCreated: 3
    },
    stats: {
      spacesJoined: 8,
      spacesActive: 5,
      spacesLed: 3,
      toolsUsed: 12,
      connectionsCount: 156,
      totalActivity: 342,
      currentStreak: 7,
      longestStreak: 21,
      reputation: 89,
      achievements: 12
    },
    timestamps: {
      createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString()
    },
    verification: {
      emailVerified: true,
      profileVerified: true,
      accountStatus: 'active',
      userType: 'student',
      onboardingCompleted: true
    }
  };

  return transformHiveProfileToProfileSystem(mockHiveProfile);
}