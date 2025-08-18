/**
 * HIVE Profile Domain Model
 * Unified data structure for all profile-related functionality
 * Following atomic design principles and HIVE brand system
 */

// Core Profile Identity
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

// Academic Information
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

// Personal Information  
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

// Privacy & Preferences
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

// Builder Status & Capabilities
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

// Activity & Engagement Stats
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

// Timestamp Information
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

// Verification & Status
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

// Unified HIVE Profile Model
export interface HiveProfile {
  // Core identity
  identity: HiveProfileIdentity;
  
  // Academic context
  academic: HiveAcademicInfo;
  
  // Personal information
  personal: HivePersonalInfo;
  
  // Privacy settings
  privacy: HivePrivacySettings;
  
  // Builder information
  builder: HiveBuilderInfo;
  
  // Activity statistics
  stats: HiveActivityStats;
  
  // System timestamps
  timestamps: HiveTimestamps;
  
  // Verification status
  verification: HiveVerificationStatus;
}

// Profile Update Data (for PATCH operations)
export interface HiveProfileUpdateData {
  identity?: Partial<Pick<HiveProfileIdentity, 'fullName' | 'avatarUrl'>>;
  academic?: Partial<HiveAcademicInfo>;
  personal?: Partial<HivePersonalInfo>;
  privacy?: Partial<HivePrivacySettings>;
  builder?: Partial<Pick<HiveBuilderInfo, 'builderOptIn' | 'specializations'>>;
}

// Profile Creation Data (for new accounts)
export interface HiveProfileCreateData {
  identity: Omit<HiveProfileIdentity, 'id'>;
  academic?: Partial<HiveAcademicInfo>;
  personal?: Partial<HivePersonalInfo>;
  privacy?: Partial<HivePrivacySettings>;
  builder?: Partial<Pick<HiveBuilderInfo, 'builderOptIn'>>;
}

// Profile API Response
export interface HiveProfileResponse {
  success: boolean;
  profile?: HiveProfile;
  message?: string;
  error?: string;
}

// Profile Dashboard Data
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

// Profile Analytics Data
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

// Utility Types
export type HiveProfileVisibility = 'public' | 'private' | 'limited';
export type HiveOnlineStatus = 'online' | 'away' | 'busy' | 'offline';
export type HiveActivityType = 'space_visit' | 'tool_use' | 'social_interaction' | 'content_creation';

// Default Values
export const DEFAULT_PRIVACY_SETTINGS: HivePrivacySettings = {
  isPublic: true,
  showActivity: true,
  showSpaces: true,
  showConnections: true,
  allowDirectMessages: true,
  showOnlineStatus: true,
  ghostMode: {
    enabled: false,
    level: 'minimal'
  }
};

export const DEFAULT_BUILDER_INFO: HiveBuilderInfo = {
  isBuilder: false,
  builderOptIn: false,
  builderLevel: 'beginner',
  specializations: [],
  toolsCreated: 0
};

// Validation Functions
export function isValidHandle(handle: string): boolean {
  // Handle must be 3-20 characters, alphanumeric + underscore
  return /^[a-zA-Z0-9_]{3,20}$/.test(handle);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getProfileCompleteness(profile: HiveProfile): number {
  const fields = [
    profile.identity.fullName,
    profile.identity.avatarUrl,
    profile.academic.major,
    profile.academic.academicYear,
    profile.personal.bio,
    profile.academic.housing,
    profile.academic.pronouns
  ];
  
  const completedFields = fields.filter(field => field && field.length > 0).length;
  return Math.round((completedFields / fields.length) * 100);
}

// Profile Helper Functions
export function getDisplayName(profile: HiveProfile): string {
  return profile.identity.fullName || profile.identity.handle || 'Anonymous';
}

export function getProfileUrl(profile: HiveProfile): string {
  return `/profile/${profile.identity.handle}`;
}

export function isProfilePublic(profile: HiveProfile): boolean {
  return profile.privacy.isPublic && !profile.privacy.ghostMode.enabled;
}

export function canViewProfile(
  viewerProfile: HiveProfile | null, 
  targetProfile: HiveProfile
): boolean {
  // Public profiles are always viewable
  if (isProfilePublic(targetProfile)) return true;
  
  // Own profile is always viewable
  if (viewerProfile?.identity.id === targetProfile.identity.id) return true;
  
  // Private profiles require connection (would check connections here)
  return false;
}