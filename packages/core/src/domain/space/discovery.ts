import { z } from "zod";

/**
 * Space Discovery System for HIVE vBETA
 * Implements the 5 canonical space sections with discovery algorithm
 */

/**
 * Space Section Categories (5 canonical sections)
 */
export enum SpaceSection {
  STUDENT_ORGS = "student_orgs", // Student organizations (club, hobby groups)
  GREEK_LIFE = "greek_life", // Greek organizations (invite-only)
  UNIVERSITY_ORGS = "university_orgs", // Official university/faculty spaces
  RESIDENTIAL = "residential", // Dorm floors, residential communities
  ACADEMIC = "academic", // Majors, courses, academic cohorts
}

/**
 * Space Status for Discovery
 */
export enum SpaceStatus {
  PREVIEW_LOCKED = "preview_locked", // Visible but not joinable
  OPEN = "open", // Open for joining
  INVITE_ONLY = "invite_only", // Requires invitation
  AUTO_JOIN = "auto_join", // Automatically joined based on profile
  BUILDER_OPENING = "builder_opening", // Waiting for Builder to open
}

/**
 * Space Ownership Types
 */
export enum SpaceOwnerType {
  BUILDER = "builder", // Student Builder ownership
  OFFICER = "officer", // Greek Life officer
  FACULTY = "faculty", // Faculty owner
  ADMIN = "admin", // University admin
  SYSTEM = "system", // System-generated (Residential/Academic)
}

/**
 * Space Discovery Metadata
 */
export interface SpaceDiscoveryData {
  id: string;
  name: string;
  description?: string;
  section: SpaceSection;
  status: SpaceStatus;
  ownerType: SpaceOwnerType;
  ownerId?: string;

  // Visibility & Access
  isVisible: boolean;
  isJoinable: boolean;
  requiresApproval: boolean;
  isAutoJoin: boolean;

  // Metadata
  memberCount: number;
  postCount: number;
  lastActivity?: Date;
  createdAt: Date;
  openedAt?: Date; // When Builder opened the space

  // University-specific data
  crestUrl?: string;
  organizationType?: string; // "club", "greek", "department", etc.
  contactEmail?: string;

  // Discovery Algorithm Data
  discoveryScore: number;
  trendingScore: number;
  activityScore: number;

  // Unlock conditions
  unlockConditions?: {
    requiresMajor?: string;
    requiresDorm?: string;
    requiresYear?: string;
    requiresInvite?: boolean;
    builderCanOpen?: boolean;
  };
}

/**
 * Validation Schema
 */
export const SpaceDiscoverySchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  section: z.nativeEnum(SpaceSection),
  status: z.nativeEnum(SpaceStatus),
  ownerType: z.nativeEnum(SpaceOwnerType),
  ownerId: z.string().optional(),

  isVisible: z.boolean(),
  isJoinable: z.boolean(),
  requiresApproval: z.boolean(),
  isAutoJoin: z.boolean(),

  memberCount: z.number().min(0),
  postCount: z.number().min(0),
  lastActivity: z.date().optional(),
  createdAt: z.date(),
  openedAt: z.date().optional(),

  crestUrl: z.string().url().optional(),
  organizationType: z.string().optional(),
  contactEmail: z.string().email().optional(),

  discoveryScore: z.number().min(0).max(100),
  trendingScore: z.number().min(0).max(100),
  activityScore: z.number().min(0).max(100),

  unlockConditions: z
    .object({
      requiresMajor: z.string().optional(),
      requiresDorm: z.string().optional(),
      requiresYear: z.string().optional(),
      requiresInvite: z.boolean().optional(),
      builderCanOpen: z.boolean().optional(),
    })
    .optional(),
});

/**
 * User Context for Discovery Personalization
 */
export interface UserDiscoveryContext {
  userId: string;
  major?: string;
  dorm?: string;
  graduationYear?: string;
  joinedSpaces: string[];
  interests?: string[];
  isBuilder: boolean;
  isGreekMember: boolean;
}

/**
 * Discovery Filter Options
 */
export interface DiscoveryFilters {
  section?: SpaceSection;
  status?: SpaceStatus[];
  search?: string;
  memberCountMin?: number;
  memberCountMax?: number;
  hasActivity?: boolean; // Activity in last 7 days
  isJoinable?: boolean;
  sortBy?: "relevance" | "activity" | "members" | "name" | "newest";
  limit?: number;
  offset?: number;
}

/**
 * Discovery Result Set
 */
export interface DiscoveryResult {
  spaces: SpaceDiscoveryData[];
  totalCount: number;
  hasMore: boolean;
  sections: {
    section: SpaceSection;
    count: number;
    spaces: SpaceDiscoveryData[];
  }[];
}

/**
 * Space Discovery Engine
 * Core logic for space discovery algorithm and visibility
 */
export class SpaceDiscoveryEngine {
  /**
   * Calculate discovery score for a space based on multiple factors
   */
  static calculateDiscoveryScore(
    space: SpaceDiscoveryData,
    userContext: UserDiscoveryContext
  ): number {
    let score = 0;

    // Base score from activity (0-40 points)
    const activityWeight = Math.min((space.activityScore / 100) * 40, 40);
    score += activityWeight;

    // Member count bonus (0-20 points)
    const memberBonus = Math.min(Math.log(space.memberCount + 1) * 5, 20);
    score += memberBonus;

    // Personalization bonus (0-30 points)
    const personalBonus = this.calculatePersonalizationBonus(
      space,
      userContext
    );
    score += personalBonus;

    // Recency bonus for newly opened spaces (0-10 points)
    if (space.openedAt) {
      const daysOpen =
        (Date.now() - space.openedAt.getTime()) / (1000 * 60 * 60 * 24);
      const recencyBonus = Math.max(10 - daysOpen, 0);
      score += recencyBonus;
    }

    return Math.min(score, 100);
  }

  /**
   * Calculate personalization bonus based on user context
   */
  private static calculatePersonalizationBonus(
    space: SpaceDiscoveryData,
    userContext: UserDiscoveryContext
  ): number {
    let bonus = 0;

    // Major match bonus
    if (
      space.section === SpaceSection.ACADEMIC &&
      space.unlockConditions?.requiresMajor === userContext.major
    ) {
      bonus += 15;
    }

    // Dorm match bonus
    if (
      space.section === SpaceSection.RESIDENTIAL &&
      space.unlockConditions?.requiresDorm === userContext.dorm
    ) {
      bonus += 15;
    }

    // Year cohort bonus
    if (space.unlockConditions?.requiresYear === userContext.graduationYear) {
      bonus += 10;
    }

    // Builder preference bonus
    if (userContext.isBuilder && space.ownerType === SpaceOwnerType.BUILDER) {
      bonus += 5;
    }

    // Greek member bonus
    if (
      userContext.isGreekMember &&
      space.section === SpaceSection.GREEK_LIFE
    ) {
      bonus += 10;
    }

    return Math.min(bonus, 30);
  }

  /**
   * Determine space visibility for a user
   */
  static calculateSpaceVisibility(
    space: SpaceDiscoveryData,
    userContext: UserDiscoveryContext
  ): {
    isVisible: boolean;
    isJoinable: boolean;
    reason?: string;
  } {
    // Already joined
    if (userContext.joinedSpaces.includes(space.id)) {
      return { isVisible: true, isJoinable: false, reason: "already_joined" };
    }

    // Basic visibility check
    if (!space.isVisible) {
      return { isVisible: false, isJoinable: false, reason: "not_visible" };
    }

    // Check unlock conditions
    const unlockCheck = this.checkUnlockConditions(space, userContext);
    if (!unlockCheck.canAccess) {
      return {
        isVisible: true,
        isJoinable: false,
        reason: unlockCheck.reason,
      };
    }

    // Status-based logic
    switch (space.status) {
      case SpaceStatus.OPEN:
        return { isVisible: true, isJoinable: true };

      case SpaceStatus.AUTO_JOIN:
        return { isVisible: true, isJoinable: true, reason: "auto_join" };

      case SpaceStatus.INVITE_ONLY:
        return {
          isVisible: true,
          isJoinable: false,
          reason: "invite_only",
        };

      case SpaceStatus.PREVIEW_LOCKED:
        return {
          isVisible: true,
          isJoinable: false,
          reason: "preview_locked",
        };

      case SpaceStatus.BUILDER_OPENING:
        return {
          isVisible: true,
          isJoinable: false,
          reason: "builder_opening",
        };

      default:
        return {
          isVisible: false,
          isJoinable: false,
          reason: "unknown_status",
        };
    }
  }

  /**
   * Check if user meets unlock conditions for a space
   */
  private static checkUnlockConditions(
    space: SpaceDiscoveryData,
    userContext: UserDiscoveryContext
  ): { canAccess: boolean; reason?: string } {
    const conditions = space.unlockConditions;

    if (!conditions) {
      return { canAccess: true };
    }

    // Major requirement
    if (
      conditions.requiresMajor &&
      userContext.major !== conditions.requiresMajor
    ) {
      return { canAccess: false, reason: "major_required" };
    }

    // Dorm requirement
    if (
      conditions.requiresDorm &&
      userContext.dorm !== conditions.requiresDorm
    ) {
      return { canAccess: false, reason: "dorm_required" };
    }

    // Year requirement
    if (
      conditions.requiresYear &&
      userContext.graduationYear !== conditions.requiresYear
    ) {
      return { canAccess: false, reason: "year_required" };
    }

    // Invite requirement
    if (
      conditions.requiresInvite &&
      space.section === SpaceSection.GREEK_LIFE
    ) {
      return { canAccess: false, reason: "invite_required" };
    }

    return { canAccess: true };
  }

  /**
   * Get spaces for discovery with filters and personalization
   */
  static async discoverSpaces(
    spaces: SpaceDiscoveryData[],
    userContext: UserDiscoveryContext,
    filters: DiscoveryFilters = {}
  ): Promise<DiscoveryResult> {
    // Apply basic filters
    const filteredSpaces = spaces.filter((space) => {
      // Section filter
      if (filters.section && space.section !== filters.section) {
        return false;
      }

      // Status filter
      if (filters.status && !filters.status.includes(space.status)) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const nameMatch = space.name.toLowerCase().includes(searchLower);
        const descMatch = space.description
          ?.toLowerCase()
          .includes(searchLower);
        if (!nameMatch && !descMatch) {
          return false;
        }
      }

      // Member count filters
      if (
        filters.memberCountMin &&
        space.memberCount < filters.memberCountMin
      ) {
        return false;
      }
      if (
        filters.memberCountMax &&
        space.memberCount > filters.memberCountMax
      ) {
        return false;
      }

      // Activity filter (last 7 days)
      if (filters.hasActivity && space.lastActivity) {
        const daysSinceActivity =
          (Date.now() - space.lastActivity.getTime()) / (1000 * 60 * 60 * 24);
        if (daysSinceActivity > 7) {
          return false;
        }
      }

      // Joinability filter
      const visibility = this.calculateSpaceVisibility(space, userContext);
      if (filters.isJoinable && !visibility.isJoinable) {
        return false;
      }

      return true;
    });

    // Calculate discovery scores for each space
    const spacesWithScores = filteredSpaces.map((space) => {
      const discoveryScore = this.calculateDiscoveryScore(space, userContext);
      return {
        ...space,
        discoveryScore,
      };
    });

    // Sort spaces
    const sortBy = filters.sortBy || "relevance";
    spacesWithScores.sort((a, b) => {
      switch (sortBy) {
        case "relevance":
          return b.discoveryScore - a.discoveryScore;
        case "activity":
          return b.activityScore - a.activityScore;
        case "members":
          return b.memberCount - a.memberCount;
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
          return (b.openedAt?.getTime() || 0) - (a.openedAt?.getTime() || 0);
        default:
          return b.discoveryScore - a.discoveryScore;
      }
    });

    // Apply pagination
    const offset = filters.offset || 0;
    const limit = filters.limit || 20;
    const paginatedSpaces = spacesWithScores.slice(offset, offset + limit);

    // Group by sections
    const sections = Object.values(SpaceSection).map((section) => ({
      section,
      count: spacesWithScores.filter((s) => s.section === section).length,
      spaces: spacesWithScores.filter((s) => s.section === section).slice(0, 5), // Top 5 per section
    }));

    return {
      spaces: paginatedSpaces,
      totalCount: spacesWithScores.length,
      hasMore: offset + limit < spacesWithScores.length,
      sections,
    };
  }

  /**
   * Get section-specific discovery results
   */
  static async discoverBySection(
    spaces: SpaceDiscoveryData[],
    section: SpaceSection,
    userContext: UserDiscoveryContext,
    limit: number = 10
  ): Promise<SpaceDiscoveryData[]> {
    const result = await this.discoverSpaces(spaces, userContext, {
      section,
      limit,
      sortBy: "relevance",
    });

    return result.spaces;
  }

  /**
   * Get trending spaces across all sections
   */
  static async getTrendingSpaces(
    spaces: SpaceDiscoveryData[],
    userContext: UserDiscoveryContext,
    limit: number = 5
  ): Promise<SpaceDiscoveryData[]> {
    // Filter for spaces with recent activity and high engagement
    const trendingCandidates = spaces.filter((space) => {
      if (!space.lastActivity) return false;

      const daysSinceActivity =
        (Date.now() - space.lastActivity.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceActivity <= 3 && space.activityScore >= 30;
    });

    const result = await this.discoverSpaces(trendingCandidates, userContext, {
      limit,
      sortBy: "activity",
      hasActivity: true,
    });

    return result.spaces;
  }
}
