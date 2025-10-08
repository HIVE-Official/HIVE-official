/**
 * Profile UI Types - Spec Compliant
 * Based on spec.md User Profile Schema (lines 2231-2249)
 */
/**
 * Privacy levels for profile widgets
 * @see spec.md:2161-2165
 */
export type PrivacyLevel = 'visible' | 'private' | 'ghost';
/**
 * User types in the system
 */
export type UserType = 'student' | 'faculty' | 'staff' | 'admin';
/**
 * Connection types between users
 */
export type ConnectionType = 'connection' | 'friend';
/**
 * Badge variants for profile display
 */
export interface ProfileBadge {
    label: string;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
    icon?: React.ReactNode;
}
/**
 * Privacy settings for profile widgets
 * Each widget can have independent privacy controls
 */
export interface WidgetPrivacy {
    level: PrivacyLevel;
    customMessage?: string;
}
/**
 * Profile Identity (Core identifying information)
 * @see spec.md:2232
 */
export interface ProfileIdentity {
    id: string;
    /** Backend only - never displayed to users */
    username?: string;
    email: string;
    fullName: string;
    bio?: string;
    /** Primary avatar URL */
    avatarUrl?: string;
    /** Photo carousel (max 5 photos, 3:4 aspect ratio) */
    photos?: string[];
    pronouns?: string;
}
/**
 * Academic Information
 * @see spec.md:2233
 */
export interface ProfileAcademic {
    /** REQUIRED field per spec */
    major: string;
    graduationYear?: number;
    academicYear?: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate';
    campusId: 'ub-buffalo';
    userType: UserType;
    facultyVerified?: boolean;
    /** Faculty only: List of courses they teach */
    courses?: string[];
}
/**
 * Interests from HIVE_INTERESTS.md
 * @see spec.md:2234
 */
export interface ProfileInterests {
    selectedInterests: string[];
    categories?: string[];
}
/**
 * Social Metrics
 * @see spec.md:2235
 */
export interface ProfileSocial {
    followerCount: number;
    followingCount: number;
    connectionCount: number;
    friendCount: number;
    /** Connection strength scores (userId -> strength 0-1) */
    connectionStrength?: Record<string, number>;
    mutualConnections?: string[];
    mutualSpaces?: string[];
}
/**
 * Privacy Settings
 * @see spec.md:2236
 */
export interface ProfilePrivacy {
    /** Overall profile visibility */
    profileVisibility: 'public' | 'campus' | 'connections';
    /** Appear in member searches */
    searchable: boolean;
    /** Widget-level privacy controls */
    widgets: {
        myActivity: WidgetPrivacy;
        mySpaces: WidgetPrivacy;
        myConnections: WidgetPrivacy;
        myClasses?: WidgetPrivacy;
        hivelab?: WidgetPrivacy;
    };
}
/**
 * Activity Tracking
 * @see spec.md:2237
 */
export interface ProfileActivity {
    joinedSpaces: string[];
    lastActive: Date;
    profileCompletionScore: number;
    recentActivity?: ProfileActivityItem[];
}
/**
 * Individual activity item
 * @see spec.md:2246-2249
 */
export interface ProfileActivityItem {
    id: string;
    userId: string;
    activityType: 'post' | 'comment' | 'reaction' | 'space_join' | 'connection';
    targetId: string;
    targetType: string;
    timestamp: Date;
    campusId: 'ub-buffalo';
    isPublic: boolean;
    title?: string;
    description?: string;
    metadata?: Record<string, any>;
}
/**
 * Account Status
 * @see spec.md:2238
 */
export interface ProfileStatus {
    isActive: boolean;
    isVerified: boolean;
    isModerator: boolean;
    isSpaceLeader: boolean;
    facultyVerified?: boolean;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Complete Profile (Spec-Compliant)
 * Main profile interface matching spec.md schema
 */
export interface Profile {
    identity: ProfileIdentity;
    academic: ProfileAcademic;
    interests: ProfileInterests;
    social: ProfileSocial;
    privacy: ProfilePrivacy;
    activity: ProfileActivity;
    status: ProfileStatus;
}
/**
 * Connection between users
 * @see spec.md:2240-2244
 */
export interface Connection {
    userId1: string;
    userId2: string;
    connectionType: ConnectionType;
    campusId: 'ub-buffalo';
    connectionStrength: number;
    mutualConnectionCount: number;
    sharedSpaceCount: number;
    status: 'pending' | 'accepted' | 'blocked';
    createdAt: Date;
    acceptedAt?: Date;
    lastInteraction?: Date;
}
/**
 * Simplified profile for UI components
 * Flattened version for easier component consumption
 */
export interface UIProfile {
    id: string;
    fullName: string;
    email: string;
    handle: string;
    avatarUrl?: string;
    photos?: string[];
    bio?: string;
    pronouns?: string;
    major: string;
    graduationYear?: number;
    academicYear?: string;
    userType: UserType;
    facultyVerified?: boolean;
    courses?: string[];
    connectionCount: number;
    friendCount: number;
    spaceCount: number;
    postCount: number;
    mutualConnections?: number;
    mutualSpaces?: number;
    verified: boolean;
    isOwnProfile: boolean;
    isConnected: boolean;
    isSpaceLeader: boolean;
    profileVisibility: 'public' | 'campus' | 'connections';
    widgetPrivacy: ProfilePrivacy['widgets'];
    badges: ProfileBadge[];
    completionScore: number;
    lastActive?: Date;
}
/**
 * Convert spec Profile to UIProfile
 * Adapter for component consumption
 */
export declare function profileToUIProfile(profile: Profile, viewerContext?: {
    isOwnProfile?: boolean;
    isConnected?: boolean;
    mutualConnections?: number;
    mutualSpaces?: number;
}): UIProfile;
/**
 * Check if widget should be visible based on privacy settings
 */
export declare function canViewWidget(widget: WidgetPrivacy, viewerContext: {
    isOwnProfile: boolean;
    isConnected: boolean;
}): boolean;
/**
 * Get privacy indicator for UI display
 */
export declare function getPrivacyIndicator(level: PrivacyLevel): {
    icon: string;
    label: string;
    description: string;
};
//# sourceMappingURL=profile-types.d.ts.map