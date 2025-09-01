/**
 * Firebase Profile Service
 * Handles all profile-related Firebase operations including real-time sync
 */
interface Unsubscribe {
    (): void;
}
export interface UserProfileDocument {
    uid: string;
    email: string;
    displayName: string;
    profilePhotoURL?: string;
    bio: string;
    campusId: 'ub-buffalo';
    academicInfo: {
        year: string;
        major: string;
        school: string;
        housing?: string;
        graduationYear?: number;
    };
    builderStatus: boolean;
    isVerified: boolean;
    onlineStatus: {
        isOnline: boolean;
        lastSeen: Date;
        ghostMode: boolean;
    };
    preferences: {
        profileLayout: string;
        theme: 'light' | 'dark' | 'auto';
        notifications: {
            email: boolean;
            push: boolean;
            inApp: boolean;
        };
    };
    privacy: {
        profileVisibility: 'public' | 'university' | 'private';
        showActivity: boolean;
        showOnlineStatus: boolean;
        showSpaces: boolean;
    };
    metadata: {
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt: Date;
        profileCompleteness: number;
    };
}
export interface SpaceMembershipDocument {
    uid: string;
    spaceId: string;
    campusId: 'ub-buffalo';
    role: 'member' | 'moderator' | 'admin' | 'founder';
    status: 'active' | 'pending' | 'invited' | 'banned';
    joinedAt: Date;
    invitedBy?: string;
    permissions: string[];
    metadata: {
        lastActive: Date;
        messageCount: number;
        reputation: number;
    };
}
export interface NotificationDocument {
    id: string;
    recipientId: string;
    campusId: 'ub-buffalo';
    type: 'space' | 'tool' | 'social' | 'academic' | 'system' | 'ritual' | 'campus';
    category: 'mention' | 'like' | 'comment' | 'join' | 'invite' | 'update' | 'reminder' | 'announcement' | 'achievement';
    title: string;
    message: string;
    isRead: boolean;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    sourceId: string;
    sourceType: 'user' | 'space' | 'tool' | 'system';
    actionData?: Record<string, any>;
    expiresAt?: Date;
    createdAt: Date;
}
export interface GhostModeDocument {
    uid: string;
    isEnabled: boolean;
    level: 'light' | 'medium' | 'full';
    settings: {
        hideOnlineStatus: boolean;
        hideActivity: boolean;
        hideLocation: boolean;
        hideSpaces: boolean;
        hideTools: boolean;
        muteNotifications: boolean;
    };
    automation: {
        quietHours: {
            enabled: boolean;
            start: string;
            end: string;
        };
        autoEnabled: boolean;
    };
    duration: 'temporary' | 'session' | 'indefinite';
    expiresAt?: Date;
    updatedAt: Date;
}
export interface ToolDocument {
    id: string;
    creatorId: string;
    campusId: 'ub-buffalo';
    name: string;
    description: string;
    type: 'form' | 'calculator' | 'tracker' | 'game' | 'utility' | 'social' | 'academic';
    status: 'draft' | 'testing' | 'published' | 'archived';
    config: Record<string, any>;
    permissions: {
        isPublic: boolean;
        allowedSpaces: string[];
        collaborators: {
            uid: string;
            role: 'owner' | 'editor' | 'viewer';
        }[];
    };
    analytics: {
        totalUses: number;
        uniqueUsers: number;
        ratings: {
            average: number;
            count: number;
        };
    };
    metadata: {
        createdAt: Date;
        updatedAt: Date;
        publishedAt?: Date;
        featuredAt?: Date;
    };
}
export declare class ProfileFirebaseService {
    private db;
    private auth;
    private storage;
    private listeners;
    constructor();
    getUserProfile(uid: string): Promise<UserProfileDocument | null>;
    updateUserProfile(uid: string, updates: Partial<UserProfileDocument>): Promise<void>;
    uploadProfilePhoto(uid: string, file: File): Promise<string>;
    subscribeToProfile(uid: string, callback: (profile: UserProfileDocument | null) => void): Unsubscribe;
    getUserSpaces(uid: string): Promise<SpaceMembershipDocument[]>;
    getUserNotifications(uid: string, limit?: number): Promise<NotificationDocument[]>;
    markNotificationRead(notificationId: string): Promise<void>;
    updateGhostMode(uid: string, settings: Partial<GhostModeDocument>): Promise<void>;
    getUserTools(uid: string): Promise<ToolDocument[]>;
    updateProfileAnalytics(uid: string, event: string, data?: Record<string, any>): Promise<void>;
    cleanup(): void;
}
export declare const FIRESTORE_SECURITY_RULES = "\nrules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    // Profile documents\n    match /profiles/{userId} {\n      allow read: if request.auth != null && \n        (request.auth.uid == userId || \n         resource.data.privacy.profileVisibility == 'public' ||\n         (resource.data.privacy.profileVisibility == 'university' && \n          request.auth.token.email.matches('.*@buffalo\\.edu$')));\n      \n      allow write: if request.auth != null && \n        request.auth.uid == userId &&\n        request.auth.token.email.matches('.*@buffalo\\.edu$') &&\n        resource.data.campusId == 'ub-buffalo';\n    }\n    \n    // Space memberships\n    match /spaceMemberships/{membershipId} {\n      allow read: if request.auth != null &&\n        (request.auth.uid == resource.data.uid ||\n         exists(/databases/$(database)/documents/spaceMemberships/$(request.auth.uid + '_' + resource.data.spaceId)));\n      \n      allow write: if request.auth != null &&\n        request.auth.uid == resource.data.uid &&\n        resource.data.campusId == 'ub-buffalo';\n    }\n    \n    // Notifications\n    match /notifications/{notificationId} {\n      allow read, write: if request.auth != null &&\n        request.auth.uid == resource.data.recipientId &&\n        resource.data.campusId == 'ub-buffalo';\n    }\n    \n    // Ghost mode settings\n    match /ghostMode/{userId} {\n      allow read, write: if request.auth != null &&\n        request.auth.uid == userId;\n    }\n    \n    // Tools\n    match /tools/{toolId} {\n      allow read: if request.auth != null &&\n        (resource.data.permissions.isPublic == true ||\n         request.auth.uid == resource.data.creatorId ||\n         request.auth.uid in resource.data.permissions.collaborators[].uid);\n      \n      allow write: if request.auth != null &&\n        request.auth.uid == resource.data.creatorId &&\n        resource.data.campusId == 'ub-buffalo';\n    }\n  }\n}\n";
export declare const CLOUD_FUNCTIONS: {
    calculateProfileCompleteness: (uid: string) => Promise<number>;
    sendNotification: (notification: Partial<NotificationDocument>) => Promise<void>;
    autoJoinSpaces: (uid: string, academicInfo: any) => Promise<void>;
    evaluateBuilderStatus: (uid: string) => Promise<boolean>;
};
export declare const profileFirebaseService: ProfileFirebaseService;
export {};
//# sourceMappingURL=profile-service.d.ts.map