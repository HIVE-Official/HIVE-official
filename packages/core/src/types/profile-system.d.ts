/**
 * HIVE Profile System Types
 * Complete type definitions matching the Profile PRD
 * Mobile-first, real-time, connection-aware
 */
import { Timestamp } from 'firebase-admin/firestore';
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
    rotationInterval: 30000;
    lastUpdated: Date;
    freshnessThreshold: number;
}
export interface AcademicIdentity {
    name: string;
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
export declare enum ConnectionType {
    NONE = "none",
    CONNECTION = "connection",// Automatic from shared spaces
    FRIEND = "friend"
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
export type VibeStatus = '😮‍💨 Surviving' | '🎯 Thriving' | '🔥 Chaos mode' | '☕ Seeking caffeine' | '🏆 Victory lap' | string;
export interface AvailabilityBeacon {
    active: boolean;
    duration: 1 | 2 | 4;
    message?: string;
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
export type GridSize = '1x1' | '2x1' | '2x2' | '1x2';
export interface BentoCard {
    id: string;
    type: 'spaces_hub' | 'friends_network' | 'schedule_overlap' | 'active_now' | 'discovery' | 'vibe_check' | 'custom';
    position: {
        x: number;
        y: number;
    };
    size: GridSize;
    visible: boolean;
    config?: Record<string, any>;
}
export interface BentoGridLayout {
    cards: BentoCard[];
    mobileLayout: BentoCard[];
    lastModified: Date;
}
export declare enum VisibilityLevel {
    GHOST = "ghost",
    FRIENDS_ONLY = "friends",
    CONNECTIONS = "connections",
    CAMPUS = "campus"
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
    spaceActivityVisibility: Map<string, boolean>;
}
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
        duration: number;
    }>;
    rarity: 'common' | 'uncommon' | 'rare';
    suggestedMeetup?: {
        time: Date;
        location: string;
        confidence: number;
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
export interface ProfileSystem {
    userId: string;
    campusId: string;
    handle: string;
    identity: {
        academic: AcademicIdentity;
        photoCarousel: PhotoCarousel;
        badges: Badge[];
    };
    connections: {
        friends: Friend[];
        connections: Connection[];
        pendingRequests: string[];
        blockedUsers: string[];
    };
    presence: PresenceState;
    grid: BentoGridLayout;
    privacy: PrivacySettings;
    intelligence: {
        schedule: ScheduleBlock[];
        overlaps: ScheduleOverlap[];
        suggestions: DiscoverySuggestion[];
        lastCalculated: Date;
    };
    createdAt: Date | Timestamp;
    updatedAt: Date | Timestamp;
    completeness: number;
    isSetupComplete: boolean;
}
export interface ProfileView {
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
    identity?: Partial<ProfileSystem['identity']>;
    presence?: Partial<PresenceState>;
    privacy?: Partial<PrivacySettings>;
    grid?: Partial<BentoGridLayout>;
}
export interface ProfileRealtimeEvent {
    type: 'presence_update' | 'beacon_activated' | 'vibe_changed' | 'friend_request' | 'connection_created' | 'ghost_mode_toggled';
    userId: string;
    timestamp: Date;
    data: any;
}
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
    onMove?: (position: {
        x: number;
        y: number;
    }) => void;
    isMobile: boolean;
}
export interface PhotoCarouselProps {
    carousel: PhotoCarousel;
    editable: boolean;
    onPhotoUpload?: (file: File, tags: string[]) => void;
    onPhotoDelete?: (photoId: string) => void;
    onReorder?: (photos: PhotoCarouselItem[]) => void;
}
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
export interface UseProfileReturn {
    profile: ProfileSystem | null;
    isLoading: boolean;
    error: Error | null;
    updateProfile: (update: ProfileUpdate) => Promise<void>;
    uploadPhoto: (file: File, tags: string[]) => Promise<void>;
    setVibe: (status: VibeStatus) => Promise<void>;
    activateBeacon: (duration: 1 | 2 | 4, message?: string) => Promise<void>;
    toggleGhostMode: () => Promise<void>;
    saveGridLayout: (layout: BentoGridLayout) => Promise<void>;
    resetGrid: () => Promise<void>;
    sendFriendRequest: (userId: string) => Promise<void>;
    acceptFriendRequest: (userId: string) => Promise<void>;
    removeFriend: (userId: string) => Promise<void>;
    subscribeToPresence: (userIds: string[]) => () => void;
    subscribeToBeacons: () => () => void;
}
export * from './profile-system';
//# sourceMappingURL=profile-system.d.ts.map