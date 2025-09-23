/**
 * HIVE Profile System Types
 * Complete type definitions matching the Profile PRD
 * Mobile-first, real-time, connection-aware
 */

import { Timestamp } from 'firebase-admin/firestore';

// ============================================
// Module 1: Identity System
// ============================================

export interface PhotoCarouselItem {
  id: string;
  url: string;
  thumbnailUrl?: string;
  order: number;
  tags: string[];
  uploadedAt: Date;
  context?: 'academic' | 'social' | 'residential' | 'activities';
}

export interface PhotoCarousel {
  photos: PhotoCarouselItem[];
  currentIndex: number;
  rotationInterval: 30000; // 30 seconds
  lastUpdated: Date;
  freshnessThreshold: number; // 6 weeks in milliseconds
}

export interface AcademicIdentity {
  name: string; // Required
  year: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate';
  majors: string[];
  minors: string[];
  pronouns?: string;
  graduationYear: number;
}

export interface Badge {
  id: string;
  type: 'builder' | 'student_leader' | 'contributor' | 'early_adopter';
  name: string;
  description: string;
  earnedAt: Date;
  displayOrder: number;
}

// ============================================
// Module 2: Connection System
// ============================================

export enum ConnectionType {
  NONE = 'none',
  CONNECTION = 'connection', // Automatic from shared spaces
  FRIEND = 'friend' // Intentional with mutual approval
}

export interface Connection {
  userId: string;
  type: ConnectionType;
  sharedSpaces: string[];
  connectedAt: Date;
  lastInteraction?: Date;
}

export interface Friend extends Connection {
  type: ConnectionType.FRIEND;
  friendsSince: Date;
  mutualFriends: number;
}

// ============================================
// Module 3: Presence System
// ============================================

export type VibeStatus =
  | '😮‍💨 Surviving'
  | '🎯 Thriving'
  | '🔥 Chaos mode'
  | '☕ Seeking caffeine'
  | '🏆 Victory lap'
  | string; // Custom up to 30 chars

export interface AvailabilityBeacon {
  active: boolean;
  duration: 1 | 2 | 4; // hours
  message?: string; // 20 chars max
  expiresAt: Date;
  visibilityRules: {
    friends: 'always';
    connections: 'sharedSpacesOnly';
    campus?: 'never';
  };
}

export interface PresenceState {
  vibe: VibeStatus;
  vibeUpdatedAt: Date;
  beacon?: AvailabilityBeacon;
  lastActive: Date;
  isOnline: boolean;
  currentActivity?: {
    type: 'studying' | 'in_space' | 'at_event' | 'available';
    context?: string;
  };
}

// ============================================
// Module 4: Bento Grid System
// ============================================

export type GridSize = '1x1' | '2x1' | '2x2' | '1x2';

export interface BentoCard {
  id: string;
  type: 'spaces_hub' | 'friends_network' | 'schedule_overlap' |
        'active_now' | 'discovery' | 'vibe_check' | 'custom';
  position: { x: number; y: number };
  size: GridSize;
  visible: boolean;
  config?: Record<string, any>;
}

export interface BentoGridLayout {
  cards: BentoCard[];
  mobileLayout: BentoCard[]; // Separate mobile layout
  lastModified: Date;
}

// ============================================
// Module 5: Privacy Controls
// ============================================

export enum VisibilityLevel {
  GHOST = 'ghost',
  FRIENDS_ONLY = 'friends',
  CONNECTIONS = 'connections',
  CAMPUS = 'campus'
}

export interface PrivacySettings {
  ghostMode: boolean;
  visibilityLevel: VisibilityLevel;
  scheduleSharing: {
    friends: boolean;
    connections: boolean;
  };
  availabilityBroadcast: {
    friends: boolean;
    connections: boolean;
    campus: boolean;
  };
  discoveryParticipation: boolean;
  spaceActivityVisibility: Map<string, boolean>; // Per-space settings
}

// ============================================
// Module 6: Intelligence Layer
// ============================================

export interface ScheduleBlock {
  id: string;
  title: string;
  type: 'class' | 'study' | 'work' | 'personal' | 'extracurricular';
  startTime: Date;
  endTime: Date;
  location?: string;
  recurring?: {
    pattern: 'daily' | 'weekly' | 'monthly';
    endDate?: Date;
  };
}

export interface ScheduleOverlap {
  userId: string;
  overlapWindows: Array<{
    start: Date;
    end: Date;
    duration: number; // minutes
  }>;
  rarity: 'common' | 'uncommon' | 'rare';
  suggestedMeetup?: {
    time: Date;
    location: string;
    confidence: number; // 0-1
  };
}

export interface DiscoverySuggestion {
  userId: string;
  score: number;
  reasons: string[];
  factors: {
    mutualFriends: number;
    sharedSpaces: number;
    scheduleOverlap: number;
    academicMatch: number;
    interactionStyle: number;
  };
}

// ============================================
// Main Profile System Interface
// ============================================

export interface ProfileSystem {
  // Core Identity
  userId: string;
  campusId: string; // 'ub-buffalo' for vBETA
  handle: string;

  // Module 1: Identity
  identity: {
    academic: AcademicIdentity;
    photoCarousel: PhotoCarousel;
    badges: Badge[];
  };

  // Module 2: Connections
  connections: {
    friends: Friend[];
    connections: Connection[];
    pendingRequests: string[];
    blockedUsers: string[];
  };

  // Module 3: Presence
  presence: PresenceState;

  // Module 4: Display
  grid: BentoGridLayout;

  // Module 5: Privacy
  privacy: PrivacySettings;

  // Module 6: Intelligence
  intelligence: {
    schedule: ScheduleBlock[];
    overlaps: ScheduleOverlap[];
    suggestions: DiscoverySuggestion[];
    lastCalculated: Date;
  };

  // Metadata
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
  completeness: number; // 0-100
  isSetupComplete: boolean;
}

// ============================================
// API Response Types
// ============================================

export interface ProfileView {
  // What others see based on connection level
  userId: string;
  handle: string;
  identity: Partial<ProfileSystem['identity']>;
  presence?: Partial<PresenceState>;
  connectionType: ConnectionType;
  sharedContext?: {
    spaces: string[];
    mutualFriends: number;
  };
}

export interface ProfileUpdate {
  // Partial updates to profile
  identity?: Partial<ProfileSystem['identity']>;
  presence?: Partial<PresenceState>;
  privacy?: Partial<PrivacySettings>;
  grid?: Partial<BentoGridLayout>;
}

// ============================================
// Real-time Event Types
// ============================================

export interface ProfileRealtimeEvent {
  type: 'presence_update' | 'beacon_activated' | 'vibe_changed' |
        'friend_request' | 'connection_created' | 'ghost_mode_toggled';
  userId: string;
  timestamp: Date;
  data: any;
}

// ============================================
// Component Props Types
// ============================================

export interface ProfilePageProps {
  profile: ProfileSystem;
  viewerConnectionType: ConnectionType;
  isOwnProfile: boolean;
  onUpdate?: (update: ProfileUpdate) => void;
  onConnectionAction?: (action: 'friend' | 'unfriend' | 'block') => void;
}

export interface BentoCardProps {
  card: BentoCard;
  profile: ProfileSystem;
  onConfigure?: (config: Record<string, any>) => void;
  onResize?: (size: GridSize) => void;
  onMove?: (position: { x: number; y: number }) => void;
  isMobile: boolean;
}

export interface PhotoCarouselProps {
  carousel: PhotoCarousel;
  editable: boolean;
  onPhotoUpload?: (file: File, tags: string[]) => void;
  onPhotoDelete?: (photoId: string) => void;
  onReorder?: (photos: PhotoCarouselItem[]) => void;
}

// ============================================
// Utility Types
// ============================================

export type ProfileCompleteness = {
  percentage: number;
  missingFields: string[];
  suggestions: Array<{
    field: string;
    importance: 'critical' | 'important' | 'nice_to_have';
    action: string;
  }>;
};

export type ProfileAnalytics = {
  profileViews: number;
  connectionRequests: number;
  beaconActivations: number;
  discoveryAppearances: number;
  period: 'day' | 'week' | 'month';
};

// ============================================
// Hook Return Types
// ============================================

export interface UseProfileReturn {
  profile: ProfileSystem | null;
  isLoading: boolean;
  error: Error | null;

  // Actions
  updateProfile: (update: ProfileUpdate) => Promise<void>;
  uploadPhoto: (file: File, tags: string[]) => Promise<void>;
  setVibe: (status: VibeStatus) => Promise<void>;
  activateBeacon: (duration: 1 | 2 | 4, message?: string) => Promise<void>;
  toggleGhostMode: () => Promise<void>;

  // Grid management
  saveGridLayout: (layout: BentoGridLayout) => Promise<void>;
  resetGrid: () => Promise<void>;

  // Connection actions
  sendFriendRequest: (userId: string) => Promise<void>;
  acceptFriendRequest: (userId: string) => Promise<void>;
  removeFriend: (userId: string) => Promise<void>;

  // Real-time subscriptions
  subscribeToPresence: (userIds: string[]) => () => void;
  subscribeToBeacons: () => () => void;
}

// Export all types
export * from './profile-system';