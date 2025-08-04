/**
 * HIVE Profile Domain Model
 * Unified data structure for all profile-related functionality
 * Following atomic design principles and HIVE brand system
 */
export interface HiveProfileIdentity {
    /** Unique user identifier */
    id: string;
    /** Full display name */
    fullName: string;
    /** Unique username handle */
    handle: string;
    /** Email address */
    email: string;
    /** Profile avatar URL */
    avatarUrl?: string;
}
export interface HiveAcademicInfo {
    /** Academic major/program */
    major?: string;
    /** Academic year classification */
    academicYear?: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate' | 'alumni' | 'faculty';
    /** Expected graduation year */
    graduationYear?: number;
    /** School/university identifier */
    schoolId?: string;
    /** Housing information */
    housing?: string;
    /** Preferred pronouns */
    pronouns?: string;
}
export interface HivePersonalInfo {
    /** Personal bio/description */
    bio?: string;
    /** Current status message */
    statusMessage?: string;
    /** Location information */
    location?: string;
    /** Personal interests/tags */
    interests: string[];
}
export interface HivePrivacySettings {
    /** Profile visibility */
    isPublic: boolean;
    /** Show activity to others */
    showActivity: boolean;
    /** Show spaces membership */
    showSpaces: boolean;
    /** Show connections/network */
    showConnections: boolean;
    /** Allow direct messages */
    allowDirectMessages: boolean;
    /** Show online status */
    showOnlineStatus: boolean;
    /** Ghost mode settings */
    ghostMode: {
        enabled: boolean;
        level: 'minimal' | 'moderate' | 'maximum';
    };
}
export interface HiveBuilderInfo {
    /** Is user a HIVE builder */
    isBuilder: boolean;
    /** Has opted into builder program */
    builderOptIn: boolean;
    /** Builder experience level */
    builderLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    /** Builder specializations */
    specializations: string[];
    /** Tools created count */
    toolsCreated: number;
}
export interface HiveActivityStats {
    /** Spaces joined */
    spacesJoined: number;
    /** Spaces actively participating in */
    spacesActive: number;
    /** Spaces leading/moderating */
    spacesLed: number;
    /** Tools used */
    toolsUsed: number;
    /** Social connections count */
    connectionsCount: number;
    /** Total platform activity score */
    totalActivity: number;
    /** Current activity streak (days) */
    currentStreak: number;
    /** Longest activity streak */
    longestStreak: number;
    /** Reputation/helpfulness score */
    reputation: number;
    /** Achievement count */
    achievements: number;
}
export interface HiveTimestamps {
    /** Account creation timestamp */
    createdAt: string;
    /** Last profile update */
    updatedAt: string;
    /** Last activity timestamp */
    lastActiveAt: string;
    /** Last seen timestamp */
    lastSeenAt: string;
}
export interface HiveVerificationStatus {
    /** Email verified */
    emailVerified: boolean;
    /** Profile verified by admin */
    profileVerified: boolean;
    /** Account status */
    accountStatus: 'active' | 'suspended' | 'deactivated';
    /** User type classification */
    userType: 'student' | 'alumni' | 'faculty' | 'staff';
    /** Onboarding completion status */
    onboardingCompleted: boolean;
}
export interface HiveProfile {
    identity: HiveProfileIdentity;
    academic: HiveAcademicInfo;
    personal: HivePersonalInfo;
    privacy: HivePrivacySettings;
    builder: HiveBuilderInfo;
    stats: HiveActivityStats;
    timestamps: HiveTimestamps;
    verification: HiveVerificationStatus;
}
export interface HiveProfileUpdateData {
    identity?: Partial<Pick<HiveProfileIdentity, 'fullName' | 'avatarUrl'>>;
    academic?: Partial<HiveAcademicInfo>;
    personal?: Partial<HivePersonalInfo>;
    privacy?: Partial<HivePrivacySettings>;
    builder?: Partial<Pick<HiveBuilderInfo, 'builderOptIn' | 'specializations'>>;
}
export interface HiveProfileCreateData {
    identity: Omit<HiveProfileIdentity, 'id'>;
    academic?: Partial<HiveAcademicInfo>;
    personal?: Partial<HivePersonalInfo>;
    privacy?: Partial<HivePrivacySettings>;
    builder?: Partial<Pick<HiveBuilderInfo, 'builderOptIn'>>;
}
export interface HiveProfileResponse {
    success: boolean;
    profile?: HiveProfile;
    message?: string;
    error?: string;
}
export interface HiveProfileDashboard {
    profile: HiveProfile;
    recentSpaces: Array<{
        id: string;
        name: string;
        type: string;
        lastActivity: string;
        memberCount: number;
        role: string;
    }>;
    recentTools: Array<{
        id: string;
        name: string;
        category: string;
        lastUsed: string;
        usageCount: number;
        isCreated: boolean;
    }>;
    recentActivity: Array<{
        id: string;
        type: 'space' | 'tool' | 'social' | 'academic';
        action: string;
        title: string;
        timestamp: string;
    }>;
    upcomingEvents: Array<{
        id: string;
        title: string;
        startDate: string;
        type: 'personal' | 'space';
        spaceId?: string;
    }>;
}
export interface HiveProfileAnalytics {
    weeklyActivity: Array<{
        week: string;
        spacesActive: number;
        toolsUsed: number;
        timeSpent: number;
    }>;
    topSpaces: Array<{
        id: string;
        name: string;
        timeSpent: number;
        engagement: number;
    }>;
    topTools: Array<{
        id: string;
        name: string;
        usageCount: number;
        productivity: number;
    }>;
    socialMetrics: {
        connectionsGrowth: number;
        engagementRate: number;
        helpfulnessScore: number;
    };
}
export type HiveProfileVisibility = 'public' | 'private' | 'limited';
export type HiveOnlineStatus = 'online' | 'away' | 'busy' | 'offline';
export type HiveActivityType = 'space_visit' | 'tool_use' | 'social_interaction' | 'content_creation';
export declare const DEFAULT_PRIVACY_SETTINGS: HivePrivacySettings;
export declare const DEFAULT_BUILDER_INFO: HiveBuilderInfo;
export declare function isValidHandle(handle: string): boolean;
export declare function isValidEmail(email: string): boolean;
export declare function getProfileCompleteness(profile: HiveProfile): number;
export declare function getDisplayName(profile: HiveProfile): string;
export declare function getProfileUrl(profile: HiveProfile): string;
export declare function isProfilePublic(profile: HiveProfile): boolean;
export declare function canViewProfile(viewerProfile: HiveProfile | null, targetProfile: HiveProfile): boolean;
//# sourceMappingURL=profile.d.ts.map