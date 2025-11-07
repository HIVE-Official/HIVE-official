import type { Tool as DomainTool } from '../../domain/creation/tool';
import type { ElementInstance as DomainElementInstance } from '../../domain/creation/elements';
/**
 * Temporary type exports for backward compatibility
 * These re-export from proper domain models
 * This file will be deleted once all references are updated
 */
export { ProfileId } from '../../domain/profile/value-objects/profile-id.value';
export { SpaceId } from '../../domain/spaces/value-objects/space-id.value';
export { SpaceName } from '../../domain/spaces/value-objects/space-name.value';
export { RitualId } from '../../domain/rituals/value-objects/ritual-id.value';
export { CampusId } from '../../domain/profile/value-objects/campus-id.value';
export { ConnectionId } from '../../domain/profile/value-objects/connection-id.value';
export { EnhancedFeed } from '../../domain/feed/enhanced-feed';
export { EnhancedRitual } from '../../domain/rituals/aggregates/enhanced-ritual';
export { EnhancedSpace } from '../../domain/spaces/aggregates/enhanced-space';
export { EnhancedProfile } from '../../domain/profile/aggregates/enhanced-profile';
export { Connection } from '../../domain/profile/aggregates/connection';
export { FeedItem } from '../../domain/feed/feed-item';
export type { Milestone, Reward } from '../../domain/rituals/aggregates/enhanced-ritual';
export declare function getProfileCompleteness(profile: any): number;
export declare function getDefaultActionCodeSettings(continueUrl?: string): {
    url: string;
    handleCodeInApp: boolean;
    dynamicLinkDomain: any;
};
export declare function validateEmailDomain(email: string, allowedDomains?: string[]): boolean;
export interface Feed {
    userId: string;
    lastUpdated: Date;
    toData?: () => any;
}
export interface PostContent {
    text: string;
    mediaUrls: string[];
}
export declare class FeedFilter {
    type: string;
    value: any;
    constructor(type: string, value: any);
    static create(type: string): {
        isSuccess: boolean;
        isFailure: boolean;
        getValue: () => FeedFilter;
        error: any;
    };
}
export declare class Ritual {
    id: string;
    name: string;
    description: string;
    milestones: any[];
    participants: number;
    isActive: boolean;
    settings: {
        isVisible: boolean;
    };
    startDate?: Date;
    endDate?: Date;
    constructor(id: string, name: string, description: string, milestones: any[]);
    static create(data: any): {
        isSuccess: boolean;
        isFailure: boolean;
        getValue: () => Ritual;
        error: any;
    };
    addParticipant(profileId: string): {
        isSuccess: boolean;
        isFailure: boolean;
    };
    updateMilestoneProgress(milestoneId: string, progress: number): {
        isSuccess: boolean;
        isFailure: boolean;
    };
    toData(): {
        id: string;
        name: string;
        description: string;
        milestones: any[];
        participants: number;
        isActive: boolean;
        settings: {
            isVisible: boolean;
        };
        startDate: Date;
        endDate: Date;
    };
}
export declare class Participation {
    id: string;
    profileId: any;
    ritualId: any;
    completedMilestones: string[];
    progress: number;
    streak: number;
    achievements: any[];
    totalPoints: number;
    constructor(id: string, profileId: any, ritualId: any, completedMilestones?: string[], progress?: number);
    static create(data: any): {
        isSuccess: boolean;
        isFailure: boolean;
        getValue: () => Participation;
        error: any;
    };
    toData(): {
        id: string;
        profileId: any;
        ritualId: any;
        completedMilestones: string[];
        progress: number;
        streak: number;
        achievements: any[];
        totalPoints: number;
    };
    updateMilestoneProgress(milestoneId: string, progress: number): {
        isSuccess: boolean;
        isFailure: boolean;
    };
    completeMilestone(milestoneId: string): {
        isSuccess: boolean;
        isFailure: boolean;
    };
}
export declare enum SpaceType {
    GENERAL = "general",
    ACADEMIC = "academic",
    SOCIAL = "social",
    PROFESSIONAL = "professional",
    MARKETPLACE = "marketplace",
    EVENT = "event"
}
export declare class Space {
    id: any;
    name: any;
    description: string;
    category: string;
    campusId: string;
    createdBy?: any;
    visibility: string;
    memberCount: number;
    lastActivityAt: Date;
    createdAt: Date;
    spaceType: string;
    posts: any[];
    settings: any;
    members: Array<{
        profileId: any;
        role: string;
    }>;
    private memberSet;
    constructor(id: any, name: any, description: string, category: string, campusId: string, createdBy?: any);
    static create(data: any): {
        isSuccess: boolean;
        isFailure: boolean;
        getValue: () => Space;
        error: any;
    };
    addMember(profileId: string | any): {
        isSuccess: boolean;
        isFailure: boolean;
    };
    removeMember(profileId: string | any): {
        isSuccess: boolean;
        isFailure: boolean;
    };
    isMember(profileId: string | any): boolean;
    getAdminCount(): number;
    getMemberCount(): number;
    toData(): {
        id: any;
        name: any;
        description: string;
        category: string;
        campusId: string;
        visibility: string;
        memberCount: number;
        lastActivityAt: Date;
        createdAt: Date;
        spaceType: string;
        posts: any[];
        settings: any;
        members: {
            profileId: any;
            role: string;
        }[];
    };
}
export interface Post {
    id: string;
    spaceId: string;
    authorId: string;
    content: {
        text: string;
        mediaUrls?: string[];
        mentions?: string[];
    };
    metadata: {
        likes: number;
        comments: number;
        shares: number;
        views: number;
    };
    createdAt: Date | any;
    updatedAt?: Date | any;
    isPromoted?: boolean;
    isPinned?: boolean;
    visibility?: 'public' | 'members' | 'private';
    campusId: string;
}
export interface School {
    id: string;
    name: string;
    domain: string;
    logo?: string;
    location: {
        city: string;
        state: string;
        country: string;
    };
    stats: {
        studentCount: number;
        facultyCount: number;
    };
    campusId: string;
    isActive: boolean;
    createdAt: Date | any;
    updatedAt?: Date | any;
}
export interface User {
    id: string;
    email: string;
    displayName?: string;
    handle?: string;
    profileId?: string;
    photoURL?: string;
    emailVerified: boolean;
    campusId: string;
    role?: 'student' | 'faculty' | 'alumni' | 'staff' | 'admin';
    createdAt: Date | any;
    lastActive?: Date | any;
    metadata?: {
        school?: string;
        major?: string;
        graduationYear?: number;
        interests?: string[];
    };
}
export type Tool = DomainTool;
export type ElementInstance = DomainElementInstance;
export interface Element {
    id: string;
    type: string;
    category: string;
    name: string;
    description: string;
    defaultConfig: any;
    schema?: any;
}
export { ElementType, ElementInstanceSchema, validateElementConfig, } from '../../domain/creation/elements';
export { ToolSchema, CreateToolSchema, UpdateToolSchema, ShareToolSchema, ToolStatus, ToolConfigSchema, ToolMetadataSchema, ToolVersionSchema, createToolDefaults, generateShareToken, canUserEditTool, canUserViewTool, getNextVersion, determineChangeType, validateToolStructure, } from '../../domain/creation/tool';
export { PlacedToolSchema, PlacementTargetType, PlacementPermissionsSchema, PlacementSettingsSchema, getPlacementCollectionPath, getPlacementDocPath, encodePlacementCompositeId, decodePlacementCompositeId, tryDecodePlacementCompositeId, PLACED_TOOL_COLLECTION_NAME, } from '../../domain/creation/placement';
//# sourceMappingURL=temporary-types.d.ts.map