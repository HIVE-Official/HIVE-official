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
  customMessage?: string; // Optional message when content is hidden
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
  campusId: 'ub-buffalo'; // Hardcoded for vBETA
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
  categories?: string[]; // Interest categories
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
    myClasses?: WidgetPrivacy; // Faculty only
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
  profileCompletionScore: number; // 0-100
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
  // Display fields
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
  isSpaceLeader: boolean; // Has HiveLab access
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
  // Metrics
  connectionStrength: number; // 0-1, formula: (Interactions × 0.4) + (SharedSpaces × 0.3) + (MutualConnections × 0.3)
  mutualConnectionCount: number;
  sharedSpaceCount: number;
  // Status
  status: 'pending' | 'accepted' | 'blocked';
  // Timestamps
  createdAt: Date;
  acceptedAt?: Date;
  lastInteraction?: Date;
}

/**
 * Simplified profile for UI components
 * Flattened version for easier component consumption
 */
export interface UIProfile {
  // Identity
  id: string;
  fullName: string;
  email: string;
  handle: string; // Derived from email (username@buffalo.edu)
  avatarUrl?: string;
  photos?: string[];
  bio?: string;
  pronouns?: string;

  // Academic
  major: string;
  graduationYear?: number;
  academicYear?: string;
  userType: UserType;
  facultyVerified?: boolean;
  courses?: string[]; // Faculty only

  // Social stats
  connectionCount: number;
  friendCount: number;
  spaceCount: number;
  postCount: number;
  mutualConnections?: number;
  mutualSpaces?: number;

  // Status
  verified: boolean;
  isOwnProfile: boolean;
  isConnected: boolean;
  isSpaceLeader: boolean;

  // Privacy
  profileVisibility: 'public' | 'campus' | 'connections';
  widgetPrivacy: ProfilePrivacy['widgets'];

  // Display
  badges: ProfileBadge[];
  completionScore: number;
  lastActive?: Date;
}

/**
 * Convert spec Profile to UIProfile
 * Adapter for component consumption
 */
export function profileToUIProfile(
  profile: Profile,
  viewerContext?: {
    isOwnProfile?: boolean;
    isConnected?: boolean;
    mutualConnections?: number;
    mutualSpaces?: number;
  }
): UIProfile {
  const handle = profile.identity.email.split('@')[0];

  // Generate badges based on status and type
  const badges: ProfileBadge[] = [];

  if (profile.academic.facultyVerified) {
    badges.push({ label: 'Faculty', variant: 'default' });
  }

  if (profile.status.isSpaceLeader) {
    badges.push({ label: 'Space Leader', variant: 'default' });
  }

  if (profile.status.isModerator) {
    badges.push({ label: 'Moderator', variant: 'secondary' });
  }

  // Check if recently active (within last 30 minutes)
  const isRecentlyActive = profile.activity.lastActive &&
    (Date.now() - profile.activity.lastActive.getTime()) < 30 * 60 * 1000;

  if (isRecentlyActive && viewerContext?.isOwnProfile) {
    badges.push({ label: 'Active Now', variant: 'secondary' });
  }

  return {
    id: profile.identity.id,
    fullName: profile.identity.fullName,
    email: profile.identity.email,
    handle,
    avatarUrl: profile.identity.avatarUrl,
    photos: profile.identity.photos,
    bio: profile.identity.bio,
    pronouns: profile.identity.pronouns,

    major: profile.academic.major,
    graduationYear: profile.academic.graduationYear,
    academicYear: profile.academic.academicYear,
    userType: profile.academic.userType,
    facultyVerified: profile.academic.facultyVerified,
    courses: profile.academic.courses,

    connectionCount: profile.social.connectionCount,
    friendCount: profile.social.friendCount,
    spaceCount: profile.activity.joinedSpaces.length,
    postCount: 0, // Would need to be calculated
    mutualConnections: viewerContext?.mutualConnections,
    mutualSpaces: viewerContext?.mutualSpaces,

    verified: profile.status.isVerified,
    isOwnProfile: viewerContext?.isOwnProfile ?? false,
    isConnected: viewerContext?.isConnected ?? false,
    isSpaceLeader: profile.status.isSpaceLeader,

    profileVisibility: profile.privacy.profileVisibility,
    widgetPrivacy: profile.privacy.widgets,

    badges,
    completionScore: profile.activity.profileCompletionScore,
    lastActive: profile.activity.lastActive,
  };
}

/**
 * Check if widget should be visible based on privacy settings
 */
export function canViewWidget(
  widget: WidgetPrivacy,
  viewerContext: {
    isOwnProfile: boolean;
    isConnected: boolean;
  }
): boolean {
  if (viewerContext.isOwnProfile) return true;

  switch (widget.level) {
    case 'visible':
      return true;
    case 'private':
      return viewerContext.isConnected;
    case 'ghost':
      return false;
    default:
      return false;
  }
}

/**
 * Get privacy indicator for UI display
 */
export function getPrivacyIndicator(level: PrivacyLevel): {
  icon: string;
  label: string;
  description: string;
} {
  switch (level) {
    case 'visible':
      return {
        icon: '🌍',
        label: 'Campus Visible',
        description: 'Everyone on campus can see this'
      };
    case 'private':
      return {
        icon: '🔒',
        label: 'Connections Only',
        description: 'Only your connections can see this'
      };
    case 'ghost':
      return {
        icon: '👻',
        label: 'Private',
        description: 'Hidden from everyone (you appear inactive)'
      };
  }
}
