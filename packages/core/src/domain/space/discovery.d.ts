import { z } from "zod";
/**
 * Space Discovery System for HIVE vBETA
 * Implements the 5 canonical space sections with discovery algorithm
 */
/**
 * Space Section Categories (5 canonical sections)
 */
export declare enum SpaceSection {
    STUDENT_ORGS = "student_orgs",// Student organizations (club, hobby groups)
    GREEK_LIFE = "greek_life",// Greek organizations (invite-only)
    UNIVERSITY_ORGS = "university_orgs",// Official university/faculty spaces
    RESIDENTIAL = "residential",// Dorm floors, residential communities
    ACADEMIC = "academic"
}
/**
 * Space Status for Discovery
 */
export declare enum SpaceStatus {
    PREVIEW_LOCKED = "preview_locked",// Visible but not joinable
    OPEN = "open",// Open for joining
    INVITE_ONLY = "invite_only",// Requires invitation
    AUTO_JOIN = "auto_join",// Automatically joined based on profile
    BUILDER_OPENING = "builder_opening"
}
/**
 * Space Ownership Types
 */
export declare enum SpaceOwnerType {
    BUILDER = "builder",// Student Builder ownership
    OFFICER = "officer",// Greek Life officer
    FACULTY = "faculty",// Faculty owner
    ADMIN = "admin",// University admin
    SYSTEM = "system"
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
    isVisible: boolean;
    isJoinable: boolean;
    requiresApproval: boolean;
    isAutoJoin: boolean;
    memberCount: number;
    postCount: number;
    lastActivity?: Date;
    createdAt: Date;
    openedAt?: Date;
    crestUrl?: string;
    organizationType?: string;
    contactEmail?: string;
    discoveryScore: number;
    trendingScore: number;
    activityScore: number;
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
export declare const SpaceDiscoverySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    section: z.ZodNativeEnum<typeof SpaceSection>;
    status: z.ZodNativeEnum<typeof SpaceStatus>;
    ownerType: z.ZodNativeEnum<typeof SpaceOwnerType>;
    ownerId: z.ZodOptional<z.ZodString>;
    isVisible: z.ZodBoolean;
    isJoinable: z.ZodBoolean;
    requiresApproval: z.ZodBoolean;
    isAutoJoin: z.ZodBoolean;
    memberCount: z.ZodNumber;
    postCount: z.ZodNumber;
    lastActivity: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    openedAt: z.ZodOptional<z.ZodDate>;
    crestUrl: z.ZodOptional<z.ZodString>;
    organizationType: z.ZodOptional<z.ZodString>;
    contactEmail: z.ZodOptional<z.ZodString>;
    discoveryScore: z.ZodNumber;
    trendingScore: z.ZodNumber;
    activityScore: z.ZodNumber;
    unlockConditions: z.ZodOptional<z.ZodObject<{
        requiresMajor: z.ZodOptional<z.ZodString>;
        requiresDorm: z.ZodOptional<z.ZodString>;
        requiresYear: z.ZodOptional<z.ZodString>;
        requiresInvite: z.ZodOptional<z.ZodBoolean>;
        builderCanOpen: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        requiresMajor?: string | undefined;
        requiresDorm?: string | undefined;
        requiresYear?: string | undefined;
        requiresInvite?: boolean | undefined;
        builderCanOpen?: boolean | undefined;
    }, {
        requiresMajor?: string | undefined;
        requiresDorm?: string | undefined;
        requiresYear?: string | undefined;
        requiresInvite?: boolean | undefined;
        builderCanOpen?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: SpaceStatus;
    name: string;
    createdAt: Date;
    isVisible: boolean;
    requiresApproval: boolean;
    memberCount: number;
    section: SpaceSection;
    ownerType: SpaceOwnerType;
    isJoinable: boolean;
    isAutoJoin: boolean;
    postCount: number;
    discoveryScore: number;
    trendingScore: number;
    activityScore: number;
    description?: string | undefined;
    ownerId?: string | undefined;
    lastActivity?: Date | undefined;
    openedAt?: Date | undefined;
    crestUrl?: string | undefined;
    organizationType?: string | undefined;
    contactEmail?: string | undefined;
    unlockConditions?: {
        requiresMajor?: string | undefined;
        requiresDorm?: string | undefined;
        requiresYear?: string | undefined;
        requiresInvite?: boolean | undefined;
        builderCanOpen?: boolean | undefined;
    } | undefined;
}, {
    id: string;
    status: SpaceStatus;
    name: string;
    createdAt: Date;
    isVisible: boolean;
    requiresApproval: boolean;
    memberCount: number;
    section: SpaceSection;
    ownerType: SpaceOwnerType;
    isJoinable: boolean;
    isAutoJoin: boolean;
    postCount: number;
    discoveryScore: number;
    trendingScore: number;
    activityScore: number;
    description?: string | undefined;
    ownerId?: string | undefined;
    lastActivity?: Date | undefined;
    openedAt?: Date | undefined;
    crestUrl?: string | undefined;
    organizationType?: string | undefined;
    contactEmail?: string | undefined;
    unlockConditions?: {
        requiresMajor?: string | undefined;
        requiresDorm?: string | undefined;
        requiresYear?: string | undefined;
        requiresInvite?: boolean | undefined;
        builderCanOpen?: boolean | undefined;
    } | undefined;
}>;
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
    hasActivity?: boolean;
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
export declare class SpaceDiscoveryEngine {
    /**
     * Calculate discovery score for a space based on multiple factors
     */
    static calculateDiscoveryScore(space: SpaceDiscoveryData, userContext: UserDiscoveryContext): number;
    /**
     * Calculate personalization bonus based on user context
     */
    private static calculatePersonalizationBonus;
    /**
     * Determine space visibility for a user
     */
    static calculateSpaceVisibility(space: SpaceDiscoveryData, userContext: UserDiscoveryContext): {
        isVisible: boolean;
        isJoinable: boolean;
        reason?: string;
    };
    /**
     * Check if user meets unlock conditions for a space
     */
    private static checkUnlockConditions;
    /**
     * Get spaces for discovery with filters and personalization
     */
    static discoverSpaces(spaces: SpaceDiscoveryData[], userContext: UserDiscoveryContext, filters?: DiscoveryFilters): Promise<DiscoveryResult>;
    /**
     * Get section-specific discovery results
     */
    static discoverBySection(spaces: SpaceDiscoveryData[], section: SpaceSection, userContext: UserDiscoveryContext, limit?: number): Promise<SpaceDiscoveryData[]>;
    /**
     * Get trending spaces across all sections
     */
    static getTrendingSpaces(spaces: SpaceDiscoveryData[], userContext: UserDiscoveryContext, limit?: number): Promise<SpaceDiscoveryData[]>;
}
//# sourceMappingURL=discovery.d.ts.map