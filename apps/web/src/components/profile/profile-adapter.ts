import type {
  ProfileSystem,
  Connection,
  Friend,
  BentoGridLayout,
  Badge,
} from "@hive/core/types/profile-system";
import { ConnectionType } from "@hive/core/types/profile-system";

type ViewerMeta = {
  relationship: "self" | "friend" | "connection" | "campus";
  isOwnProfile: boolean;
  isConnection: boolean;
  isFriend: boolean;
};

type ApiConnection = {
  id: string;
  name: string;
  avatarUrl?: string | null;
  sharedSpaces?: string[];
  isFriend?: boolean;
  connectionStrength?: number;
  mutualConnections?: number;
  lastInteractionAt?: string | null;
};

type ApiSpace = {
  id: string;
  name: string;
  role: string;
  memberCount: number;
  lastActivityAt?: string;
  headline?: string;
};

type ApiSuggestion = {
  id: string;
  name: string;
  reason: string;
  category?: string;
};

export type ProfileV2ApiResponse = {
  profile: {
    id: string;
    handle: string;
    fullName: string;
    firstName: string;
    lastName: string;
    campusId: string;
    avatarUrl?: string | null;
    pronouns?: string | null;
    bio?: string;
    major?: string;
    graduationYear?: number | null;
    interests?: string[];
    badges?: string[];
    presence?: {
      status?: string;
      lastSeen?: string | null;
      isGhostMode?: boolean;
    };
    stats?: {
      spacesJoined?: number;
      connections?: number;
      friends?: number;
      toolsCreated?: number;
      activeRituals?: number;
      reputation?: number;
      currentStreak?: number;
    };
  };
  grid: {
    cards: Array<Record<string, unknown>>;
    mobileLayout: Array<Record<string, unknown>>;
    lastModified?: string;
  };
  stats: ProfileV2ApiResponse["profile"]["stats"];
  spaces: ApiSpace[];
  connections: ApiConnection[];
  activities: Array<Record<string, unknown>>;
  intelligence?: {
    suggestions?: ApiSuggestion[];
  };
  viewer: ViewerMeta;
  privacy: {
    profileLevel: string;
    widgets: Record<string, string | undefined>;
  };
};

const toDate = (value: string | number | Date | null | undefined): Date => {
  if (!value) return new Date();
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};

const buildConnections = (connections: ApiConnection[]): {
  friends: Friend[];
  others: Connection[];
  summaries: Array<Connection & { displayName?: string; avatarUrl?: string | null }>;
} => {
  const friends: Friend[] = [];
  const others: Connection[] = [];
  const summaries: Array<Connection & { displayName?: string; avatarUrl?: string | null }> = [];

  connections.forEach((conn) => {
    const sharedSpaces = Array.isArray(conn.sharedSpaces) ? conn.sharedSpaces : [];
    const connectedAt = toDate(conn.lastInteractionAt);

    if (conn.isFriend) {
      const friend: Friend = {
        userId: conn.id,
        type: ConnectionType.FRIEND,
        sharedSpaces,
        connectedAt,
        lastInteraction: connectedAt,
        mutualFriends: conn.mutualConnections ?? 0,
        friendsSince: connectedAt,
      };
      friends.push(friend);
      summaries.push({ ...friend, displayName: conn.name, avatarUrl: conn.avatarUrl ?? null });
    } else {
      const connection: Connection = {
        userId: conn.id,
        type: ConnectionType.CONNECTION,
        sharedSpaces,
        connectedAt,
        lastInteraction: conn.lastInteractionAt ? connectedAt : undefined,
      };
      others.push(connection);
      summaries.push({ ...connection, displayName: conn.name, avatarUrl: conn.avatarUrl ?? null });
    }
  });

  return { friends, others, summaries };
};

const buildSuggestions = (suggestions: ApiSuggestion[] | undefined) => {
  if (!Array.isArray(suggestions)) return [];
  return suggestions.map((suggestion) => ({
    userId: suggestion.id,
    score: 0.75,
    name: suggestion.name,
    reason: suggestion.reason,
    reasons: [suggestion.reason],
    factors: {
      mutualFriends: 0,
      sharedSpaces: 0,
      scheduleOverlap: 0,
      academicMatch: 0,
      interactionStyle: 0,
    },
  }));
};

const buildGrid = (grid: ProfileV2ApiResponse["grid"]): BentoGridLayout => ({
  cards: grid.cards as any,
  mobileLayout: grid.mobileLayout as any,
  lastModified: toDate(grid.lastModified ?? Date.now()),
});

const buildBadges = (badges: string[] | undefined): Badge[] => {
  if (!Array.isArray(badges)) return [];
  return badges.map((badge, index): Badge => ({
    id: badge,
    type: "builder",
    name: badge,
    description: badge,
    earnedAt: new Date(Date.now() - index * 86400000),
    displayOrder: index,
  }));
};

export const profileApiResponseToProfileSystem = (payload: ProfileV2ApiResponse): ProfileSystem => {
  const { profile, grid, connections, intelligence, stats } = payload;
  const now = new Date();
  const { friends, others, summaries } = buildConnections(connections);
  const suggestions = buildSuggestions(intelligence?.suggestions);
  const primaryStats = (stats ?? profile.stats ?? {}) as any;

  const system: ProfileSystem = {
    userId: profile.id,
    campusId: profile.campusId || 'ub-buffalo',
    handle: profile.handle || '',
    identity: {
      academic: {
        name: profile.fullName,
        majors: profile.major ? [profile.major] : [],
        minors: [],
        year: 'junior' as any,
        pronouns: profile.pronouns ?? undefined,
        graduationYear: profile.graduationYear ?? now.getFullYear(),
      },
      photoCarousel: {
        photos: [],
        currentIndex: 0,
        rotationInterval: 30000,
        lastUpdated: now,
        freshnessThreshold: 1000 * 60 * 60 * 24 * 42,
      },
      badges: buildBadges(profile.badges),
    },
    connections: {
      friends,
      connections: others,
      pendingRequests: [],
      blockedUsers: [],
    },
    presence: {
      vibe: profile.presence?.status === 'online' ? '🎯 Thriving' : '😮‍💨 Surviving',
      vibeUpdatedAt: now,
      lastActive: toDate(profile.presence?.lastSeen ?? Date.now()),
      isOnline: profile.presence?.status === 'online',
    },
    grid: buildGrid(grid),
    privacy: {
      ghostMode: profile.presence?.isGhostMode ?? false,
      visibilityLevel: (payload.privacy?.profileLevel ?? 'public') as any,
      scheduleSharing: { friends: true, connections: true },
      availabilityBroadcast: { friends: true, connections: false, campus: false },
      discoveryParticipation: true,
      spaceActivityVisibility: new Map<string, boolean>(),
    },
    intelligence: {
      schedule: [],
      overlaps: [],
      suggestions,
      lastCalculated: now,
    },
    createdAt: now,
    updatedAt: now,
    completeness: primaryStats?.completionPercentage ?? 70,
    isSetupComplete: true,
  };

  (system as any).stats = {
    ...primaryStats,
  };
  (system as any).spaces = payload.spaces;
  (system as any).activities = payload.activities;
  (system as any).connectionSummaries = summaries;
  (system as any).viewer = payload.viewer;

  return system;
};

// Retained helper for edit page bootstrap when only partial profile is available
export function toProfileSystemFromMinimal(specLike: any): ProfileSystem {
  const now = new Date();
  return {
    userId: specLike.userId || 'me',
    campusId: specLike.campusId || 'ub-buffalo',
    handle: specLike.handle || '',
    identity: {
      academic: {
        name: specLike.identity?.academic?.name || specLike.fullName || 'Student',
        year: (specLike.identity?.academic?.year || 'junior') as any,
        majors: specLike.identity?.academic?.majors || (specLike.major ? [specLike.major] : []),
        minors: specLike.identity?.academic?.minors || [],
        pronouns: specLike.identity?.academic?.pronouns,
        graduationYear: specLike.identity?.academic?.graduationYear || new Date().getFullYear(),
      },
      photoCarousel: {
        photos: [],
        currentIndex: 0,
        rotationInterval: 30000,
        lastUpdated: now,
        freshnessThreshold: 1000 * 60 * 60 * 24 * 42,
      },
      badges: [],
    },
    connections: { friends: [], connections: [], pendingRequests: [], blockedUsers: [] },
    presence: {
      vibe: specLike.presence?.vibe || '🎯 Thriving',
      vibeUpdatedAt: now,
      lastActive: now,
      isOnline: true,
    },
    grid: specLike.grid || ({ cards: [], mobileLayout: [], lastModified: now } as any),
    privacy: specLike.privacy || {
      ghostMode: false,
      visibilityLevel: 'campus',
      scheduleSharing: { friends: true, connections: false },
      availabilityBroadcast: { friends: true, connections: false, campus: false },
      discoveryParticipation: true,
      spaceActivityVisibility: new Map<string, boolean>(),
    },
    intelligence: { schedule: [], overlaps: [], suggestions: [], lastCalculated: now },
    createdAt: specLike.createdAt || now,
    updatedAt: specLike.updatedAt || now,
    completeness: specLike.completeness || 60,
    isSetupComplete: specLike.isSetupComplete ?? true,
  };
}
