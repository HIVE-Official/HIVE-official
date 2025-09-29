/**
 * SPEC-COMPLIANT HIVE PROFILE SYSTEM
 *
 * This is the authoritative profile schema that matches SPEC.md requirements exactly.
 * Key principles:
 * - NO HANDLE DISPLAY: Handles are backend only, never shown to users
 * - CAMPUS ISOLATION: All profiles must have campusId: 'ub-buffalo' for vBETA
 * - PRIVACY WIDGETS: Three-tier system (Visible/Private/Ghost) per widget
 * - TWO-LAYER SOCIAL: Connections (automatic) → Friends (manual requests)
 * - 70% COMPLETION: Behavioral psychology for profile setup
 */
export interface SpecProfileIdentity {
    /** Unique user identifier - used in URLs instead of handle */
    id: string;
    /** Backend-only username - NEVER displayed to users per SPEC */
    username: string;
    /** Email address - display only, cannot be changed */
    email: string;
    /** Full display name - this is what users see */
    fullName: string;
    /** Profile bio - 0-500 characters */
    bio: string;
    /** Avatar URL - portrait format 3:4 ratio (450x600px) */
    avatar: string;
}
export interface SpecAcademicInfo {
    /** Major - REQUIRED field per SPEC */
    major: string;
    /** Graduation year */
    graduationYear: number;
    /** Campus identifier - MUST be 'ub-buffalo' for vBETA */
    campusId: 'ub-buffalo';
    /** User type classification */
    userType: 'student' | 'alumni' | 'faculty' | 'staff';
    /** Faculty verification status - shows blue checkmark when true */
    facultyVerified: boolean;
}
export interface SpecInterests {
    /** Selected interests from HIVE_INTERESTS.md categories */
    selectedInterests: string[];
}
export type PrivacyLevel = 'visible' | 'private' | 'ghost';
export type ProfileVisibility = 'public' | 'campus' | 'connections';
export interface SpecPrivacySettings {
    /** Overall profile visibility */
    profileVisibility: ProfileVisibility;
    /** Whether profile appears in searches */
    searchable: boolean;
    /** Widget-level privacy controls - SPEC requirement */
    widgets: {
        /** My Activity widget privacy */
        myActivity: PrivacyLevel;
        /** My Spaces widget privacy */
        mySpaces: PrivacyLevel;
        /** My Connections widget privacy */
        myConnections: PrivacyLevel;
    };
    /** Additional privacy options */
    showActivity: boolean;
    showJoinedSpaces: boolean;
    analyticsTracking: boolean;
}
export interface SpecSocialGraph {
    /** Follower count */
    followerCount: number;
    /** Following count */
    followingCount: number;
    /** Connection strength score (0-100) */
    connectionStrength: number;
    /** Connections - automatic mutual follows */
    connections: {
        /** List of user IDs who are connections */
        connectionIds: string[];
        /** Count of mutual connections */
        mutualConnectionsCount: number;
    };
    /** Friends - manual requests within connections */
    friends: {
        /** List of user IDs who are friends */
        friendIds: string[];
        /** Pending friend requests sent */
        pendingRequestsSent: string[];
        /** Pending friend requests received */
        pendingRequestsReceived: string[];
    };
}
export interface SpecActivity {
    /** Spaces the user has joined */
    joinedSpaces: string[];
    /** Last active timestamp */
    lastActive: string;
    /** Profile completion percentage (0-100) */
    profileCompletionScore: number;
    /** Online status - respects ghost mode */
    onlineStatus: {
        isOnline: boolean;
        lastSeen: string;
        statusMessage?: string;
    };
}
export interface SpecVerificationStatus {
    /** Account active status */
    isActive: boolean;
    /** Email verification status */
    isVerified: boolean;
    /** Moderator privileges */
    isModerator: boolean;
    /** Faculty verification - shows blue checkmark */
    facultyVerified: boolean;
    /** Student leader status - shows gold star */
    isStudentLeader: boolean;
    /** Timestamps */
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}
export interface SpecBlockingInfo {
    /** List of blocked user IDs */
    blockedUsers: string[];
    /** Users who have reported this profile */
    reportedBy: string[];
    /** Auto-block status after multiple reports */
    autoBlocked: boolean;
}
export interface SpecProfileWidgets {
    /** My Classes widget - Faculty only */
    myClasses?: {
        /** List of academic space IDs they teach */
        teachingSpaceIds: string[];
        /** Privacy level for this widget */
        privacy: PrivacyLevel;
    };
    /** My Activity widget */
    myActivity: {
        /** Recent posts */
        recentPosts: Array<{
            id: string;
            content: string;
            timestamp: string;
            spaceId: string;
        }>;
        /** Recent comments */
        recentComments: Array<{
            id: string;
            content: string;
            timestamp: string;
            postId: string;
        }>;
        /** Recent reactions */
        recentReactions: Array<{
            type: string;
            targetId: string;
            timestamp: string;
        }>;
        /** Privacy level for this widget */
        privacy: PrivacyLevel;
    };
    /** My Spaces widget */
    mySpaces: {
        /** Joined spaces with details */
        spaces: Array<{
            spaceId: string;
            name: string;
            memberCount: number;
            role: 'member' | 'leader' | 'moderator';
            joinedAt: string;
        }>;
        /** Privacy level for this widget */
        privacy: PrivacyLevel;
    };
    /** My Connections widget */
    myConnections: {
        /** Connection count */
        connectionsCount: number;
        /** Friends count */
        friendsCount: number;
        /** Recent connections */
        recentConnections: Array<{
            userId: string;
            connectedAt: string;
            isFriend: boolean;
        }>;
        /** Privacy level for this widget */
        privacy: PrivacyLevel;
    };
    /** HiveLab widget - shows tool access */
    hiveLab: {
        /** Whether user has HiveLab access */
        hasAccess: boolean;
        /** Tools created by user */
        toolsCreated: number;
        /** Teaser message if no access */
        teaserMessage?: string;
    };
}
export interface ConnectionStrengthFactors {
    /** Number of interactions between users */
    interactions: number;
    /** Number of shared spaces */
    sharedSpaces: number;
    /** Number of mutual connections */
    mutualConnections: number;
}
/**
 * Calculate connection strength based on SPEC formula
 * Strength = (Interactions × 0.4) + (SharedSpaces × 0.3) + (MutualConnections × 0.3)
 */
export declare function calculateConnectionStrength(factors: ConnectionStrengthFactors): number;
export interface SpecCompliantProfile {
    /** Core identity information */
    identity: SpecProfileIdentity;
    /** Academic information */
    academic: SpecAcademicInfo;
    /** Selected interests */
    interests: SpecInterests;
    /** Privacy settings with widget-level control */
    privacy: SpecPrivacySettings;
    /** Two-layer social graph */
    social: SpecSocialGraph;
    /** Activity and status */
    activity: SpecActivity;
    /** Verification and badges */
    verification: SpecVerificationStatus;
    /** Blocking and moderation */
    blocking: SpecBlockingInfo;
    /** Profile widgets with privacy controls */
    widgets: SpecProfileWidgets;
}
export interface ProfileCompletionStage {
    /** Stage identifier */
    id: string;
    /** Display name for the stage */
    name: string;
    /** Fields required for this stage */
    requiredFields: string[];
    /** Reward for completing this stage */
    reward: {
        type: 'badge' | 'feature_unlock' | 'social_proof';
        value: string;
    };
    /** Percentage weight of this stage */
    weight: number;
}
/** Profile completion stages designed for 70% completion rate */
export declare const PROFILE_COMPLETION_STAGES: ProfileCompletionStage[];
/**
 * Calculate profile completion percentage with behavioral psychology
 * Designed to achieve 70% completion rate for habit formation
 */
export declare function calculateProfileCompletion(profile: SpecCompliantProfile): {
    percentage: number;
    completedStages: string[];
    nextStage: ProfileCompletionStage | null;
    rewards: Array<{
        type: string;
        value: string;
    }>;
};
/**
 * Check if a user can view a profile widget based on privacy settings
 */
export declare function canViewWidget(widget: {
    privacy: PrivacyLevel;
}, viewerProfile: SpecCompliantProfile | null, targetProfile: SpecCompliantProfile): boolean;
/**
 * Sanitize profile data based on viewer permissions
 */
export declare function sanitizeProfileForViewer(profile: SpecCompliantProfile, viewerProfile: SpecCompliantProfile | null): Partial<SpecCompliantProfile>;
/**
 * Validate profile data against SPEC requirements
 */
export declare function validateProfile(profile: Partial<SpecCompliantProfile>): {
    isValid: boolean;
    errors: string[];
};
export declare function isSpecCompliantProfile(obj: any): obj is SpecCompliantProfile;
export declare const DEFAULT_SPEC_PRIVACY: SpecPrivacySettings;
export declare function createEmptyProfile(userId: string, email: string): SpecCompliantProfile;
export declare const DEFAULT_SPEC_PROFILE: Partial<SpecCompliantProfile>;
//# sourceMappingURL=spec-compliant-profile.d.ts.map