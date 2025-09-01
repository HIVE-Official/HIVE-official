/**
 * Firebase Collections Schema for HIVE Profile System
 * Complete PRD implementation with all required collections
 */

import { Timestamp } from 'firebase-admin/firestore';

// ==== PROFILE CORE COLLECTIONS ====

export interface UserProfile {
  // Basic Identity
  id: string;
  email: string;
  fullName: string;
  handle: string;
  pronouns?: string;
  bio?: string;
  avatarUrl?: string;
  profilePhoto?: string;
  
  // Academic Info (UB-specific)
  major: string;
  minor?: string;
  academicYear: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate';
  graduationYear: number;
  housing?: string;
  interests: string[];
  goals: string[];
  
  // Platform Status
  schoolId: string; // 'ub-buffalo' for vBETA
  userType: 'student' | 'faculty';
  builderStatus: boolean;
  emailVerified: boolean;
  onboardingCompleted: boolean;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastActiveAt: Timestamp;
}

export interface PrivacySettings {
  userId: string;
  
  // Ghost Mode
  ghostMode: boolean;
  ghostModeSchedule?: {
    enabled: boolean;
    startTime: string; // HH:mm format
    endTime: string;
    days: string[]; // ['monday', 'tuesday', etc]
  };
  
  // Profile Visibility
  profileVisibility: 'public' | 'connections' | 'private';
  showActivity: boolean;
  showConnections: boolean;
  showAcademicInfo: boolean;
  
  // Social Discovery
  socialDiscovery: boolean;
  friendRequests: 'everyone' | 'connections' | 'none';
  studyPartnerMatching: boolean;
  
  // Data Controls
  allowAnalytics: boolean;
  dataProcessing: {
    recommendations: boolean;
    personalization: boolean;
    research: boolean;
  };
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ==== DASHBOARD LAYOUT SYSTEM ====

export interface CardLayout {
  id: string;
  type: 'avatar' | 'calendar' | 'tools' | 'spaces' | 'activity' | 'privacy' | 'social' | 'analytics' | 'discovery' | 'quick-actions';
  position: { x: number; y: number };
  size: { width: number; height: number }; // Grid units
  visible: boolean;
  settings: Record<string, any>;
}

export interface DashboardLayout {
  userId: string;
  
  layouts: {
    mobile: CardLayout[];
    tablet: CardLayout[];
    desktop: CardLayout[];
  };
  
  cardVisibility: Record<string, boolean>;
  version: number;
  lastModified: Timestamp;
  
  // Quick Actions Customization
  quickActions: string[];
  defaultView: 'mobile' | 'tablet' | 'desktop';
}

// ==== SOCIAL FEATURES ====

export interface UserConnection {
  id: string;
  userId: string;
  connectedUserId: string;
  status: 'pending' | 'accepted' | 'blocked';
  type: 'friend' | 'study_partner' | 'classmate';
  
  // Connection Context
  mutualSpaces: string[];
  sharedInterests: string[];
  connectionReason?: string;
  
  // Metadata
  createdAt: Timestamp;
  acceptedAt?: Timestamp;
  lastInteraction?: Timestamp;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  
  // Academic Context
  subject: string;
  course?: string;
  academicYear?: string;
  
  // Members
  members: string[];
  pendingInvites: string[];
  maxMembers: number;
  
  // Schedule
  meetingSchedule?: {
    days: string[];
    time: string;
    location?: string;
    virtual?: boolean;
  };
  
  // Status
  isActive: boolean;
  isPrivate: boolean;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ==== EXTERNAL INTEGRATIONS ====

export interface UserIntegrations {
  userId: string;
  
  calendar: {
    google?: {
      accessToken: string;
      refreshToken: string;
      expiresAt: Timestamp;
      calendarId: string;
    };
    outlook?: {
      accessToken: string;
      refreshToken: string;
      expiresAt: Timestamp;
      calendarId: string;
    };
    apple?: {
      syncToken: string;
      calendarId: string;
    };
  };
  
  external: {
    preferences: Record<string, any>;
    lastSync: Record<string, Timestamp>;
    syncErrors: Record<string, string>;
  };
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ==== ACTIVITY & ANALYTICS ====

export interface ActivityRecord {
  id: string;
  userId: string;
  type: 'profile' | 'space' | 'tool' | 'social' | 'academic';
  action: string;
  
  // Context
  metadata: Record<string, any>;
  spaceId?: string;
  toolId?: string;
  targetUserId?: string;
  
  // Privacy
  isPrivate: boolean;
  visibleTo: string[]; // userIds who can see this activity
  
  timestamp: Timestamp;
}

export interface PersonalAnalytics {
  userId: string;
  period: 'daily' | 'weekly' | 'monthly';
  date: string; // YYYY-MM-DD format
  
  // Engagement Metrics
  platformTime: number; // minutes
  spacesVisited: string[];
  toolsUsed: string[];
  socialInteractions: number;
  
  // Academic Tracking
  studyTime?: number;
  assignmentsCompleted?: number;
  studyGroupSessions?: number;
  
  // Social Metrics
  connectionsAdded: number;
  messagesExchanged: number;
  eventsAttended: number;
  
  // Builder Metrics (if applicable)
  toolsBuilt?: number;
  elementsCreated?: number;
  communityImpact?: number;
  
  createdAt: Timestamp;
}

// ==== ACHIEVEMENTS & MILESTONES ====

export interface UserMilestone {
  id: string;
  userId: string;
  type: 'academic' | 'social' | 'builder' | 'platform' | 'campus';
  
  // Achievement Details
  title: string;
  description: string;
  iconUrl?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  
  // Progress
  progress: number; // 0-100
  target: number;
  unit: string;
  
  // Status
  isCompleted: boolean;
  isVisible: boolean;
  
  // Metadata
  earnedAt?: Timestamp;
  createdAt: Timestamp;
}

// ==== PREFERENCES & SETTINGS ====

export interface UserPreferences {
  userId: string;
  
  // UI/UX Preferences
  theme: 'dark' | 'light' | 'auto';
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  
  // Notification Preferences
  notifications: {
    friendRequests: boolean;
    spaceActivity: boolean;
    toolUpdates: boolean;
    studyReminders: boolean;
    achievements: boolean;
    weeklyDigest: boolean;
  };
  
  // Dashboard Preferences
  defaultCards: string[];
  cardSettings: Record<string, any>;
  
  // Academic Preferences
  studySchedule?: {
    preferredTimes: string[];
    studyDuration: number; // minutes
    breakDuration: number; // minutes
  };
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ==== FIREBASE COLLECTION NAMES ====

export const COLLECTIONS = {
  USERS: 'users',
  PRIVACY_SETTINGS: 'privacySettings',
  DASHBOARD_LAYOUTS: 'dashboardLayouts',
  USER_CONNECTIONS: 'userConnections',
  STUDY_GROUPS: 'studyGroups',
  USER_INTEGRATIONS: 'userIntegrations',
  ACTIVITY_RECORDS: 'activityRecords',
  PERSONAL_ANALYTICS: 'personalAnalytics',
  USER_MILESTONES: 'userMilestones',
  USER_PREFERENCES: 'userPreferences',
  
  // Activity Summaries (existing)
  ACTIVITY_SUMMARIES: 'activitySummaries',
} as const;

// ==== HELPER TYPES ====

export type CollectionName = typeof COLLECTIONS[keyof typeof COLLECTIONS];

export interface FirebaseDocument {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ==== SECURITY RULES INTERFACE ====

export interface SecurityContext {
  userId: string;
  isOwner: boolean;
  isPublic: boolean;
  hasPermission: boolean;
}