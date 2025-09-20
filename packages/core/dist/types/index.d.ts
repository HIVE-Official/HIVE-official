/**
 * HIVE Core Type Definitions
 * Centralized type definitions to eliminate duplication across packages
 *
 * This is the single source of truth for all core domain types.
 * Import these types from @hive/core in other packages.
 */
export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
export type UserRole = 'student' | 'alumni' | 'faculty' | 'staff' | 'admin';
export type SpaceCategory = 'academic' | 'social' | 'professional' | 'hobby' | 'other';
export interface Profile {
    bio?: string;
    major?: string;
    year?: string;
    interests?: string[];
}
export interface User extends BaseEntity {
    email: string;
    displayName?: string;
    photoURL?: string;
    role: UserRole;
    schoolEmail?: string;
    isEmailVerified: boolean;
    profile?: Profile;
}
export interface Space extends BaseEntity {
    name: string;
    description: string;
    category: SpaceCategory;
    leaderId: string;
    memberCount: number;
    isPublic: boolean;
    schoolId?: string;
    tags?: string[];
    coverImage?: string;
    settings?: SpaceSettings;
}
export interface SpaceSettings {
    allowPosts: boolean;
    requireApproval: boolean;
    allowEvents: boolean;
    allowTools: boolean;
    maxMembers?: number;
}
export interface Tool extends BaseEntity {
    name: string;
    description: string;
    spaceId?: string;
    creatorId: string;
    category: string;
    icon?: string;
    config: Record<string, unknown>;
    isPublic: boolean;
    usageCount: number;
    rating?: number;
}
export type { Post } from '../domain/firestore/post';
export interface Profile extends BaseEntity {
    userId: string;
    displayName: string;
    photoURL?: string;
    bio?: string;
    school?: string;
    major?: string;
    graduationYear?: number;
    interests?: string[];
    isVerified?: boolean;
    privacySettings?: PrivacySettings;
}
export interface PrivacySettings {
    profileVisibility: 'public' | 'school' | 'private';
    showEmail: boolean;
    showActivity: boolean;
    showSpaces: boolean;
    showConnections: boolean;
    showOnlineStatus: boolean;
    showLocation?: boolean;
    showSchedule?: boolean;
    allowDirectMessages: boolean;
    allowSpaceInvites: boolean;
    allowEventInvites: boolean;
    allowPersonalization: boolean;
    ghostMode?: {
        enabled: boolean;
        level: 'minimal' | 'moderate' | 'maximum';
        hideActivity: boolean;
        hideOnlineStatus: boolean;
        hideMemberships: boolean;
    };
}
export interface Member extends BaseEntity {
    userId: string;
    spaceId: string;
    role: 'leader' | 'moderator' | 'member';
    joinedAt: Date;
    lastActiveAt?: Date;
    contributions: number;
}
export interface Event extends BaseEntity {
    spaceId: string;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    location?: string;
    virtualLink?: string;
    attendees: string[];
    maxAttendees?: number;
    isRecurring?: boolean;
    recurringPattern?: string;
}
export interface Ritual extends BaseEntity {
    spaceId: string;
    name: string;
    description: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    nextOccurrence: Date;
    participants: string[];
    rewards?: RitualReward[];
    isActive: boolean;
}
export interface RitualReward {
    type: 'badge' | 'points' | 'achievement';
    value: string | number;
    condition: string;
}
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
}[Keys];
export declare enum PostType {
    TEXT = "text",
    IMAGE = "image",
    VIDEO = "video",
    LINK = "link",
    POLL = "poll",
    EVENT = "event"
}
//# sourceMappingURL=index.d.ts.map