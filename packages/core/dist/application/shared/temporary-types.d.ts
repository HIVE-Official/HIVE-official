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
export { Ritual } from '../../domain/rituals/aggregates/ritual.aggregate';
export { Profile } from '../../domain/profile/aggregates/profile.aggregate';
export { Connection } from '../../domain/profile/aggregates/connection';
export { FeedItem } from '../../domain/feed/feed-item';
export type { RitualReward as Reward } from '../../domain/rituals/aggregates/ritual.aggregate';
export declare function getProfileCompleteness(profile: any): number;
export declare function getDefaultActionCodeSettings(continueUrl?: string): {
    url: string;
    handleCodeInApp: boolean;
    dynamicLinkDomain: undefined;
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
        error: null;
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
        error: null;
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
    createdBy?: any | undefined;
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
    constructor(id: any, name: any, description: string, category: string, campusId: string, createdBy?: any | undefined);
    static create(data: any): {
        isSuccess: boolean;
        isFailure: boolean;
        getValue: () => Space;
        error: null;
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
export interface Tool {
    id: string;
    name: string;
    description: string;
    creatorId: string;
    version: string;
    elements: ElementInstance[];
    settings: ToolSettings;
    analytics?: ToolAnalytics;
    permissions: ToolPermissions;
    createdAt: Date | any;
    updatedAt?: Date | any;
    publishedAt?: Date | any;
    campusId: string;
}
export interface ElementInstance {
    id: string;
    type: string;
    config: any;
    position: {
        x: number;
        y: number;
    };
    size?: {
        width: number;
        height: number;
    };
    style?: any;
    data?: any;
}
export interface Element {
    id: string;
    type: string;
    category: string;
    name: string;
    description: string;
    defaultConfig: any;
    schema?: any;
}
export interface ToolSettings {
    isPublic: boolean;
    allowComments: boolean;
    allowSharing: boolean;
    requireAuth: boolean;
    maxUsers?: number;
}
export interface ToolAnalytics {
    views: number;
    uses: number;
    shares: number;
    rating?: number;
    reviews?: number;
}
export interface ToolPermissions {
    canEdit: string[];
    canView: string[];
    canShare: string[];
    canDelete: string[];
}
export declare const ToolSchema: {
    parse: (data: any) => any;
    safeParse: (data: any) => {
        success: boolean;
        data: any;
    };
};
export declare const CreateToolSchema: {
    parse: (data: any) => any;
    safeParse: (data: any) => {
        success: boolean;
        data: any;
    };
};
export declare const UpdateToolSchema: {
    parse: (data: any) => any;
    safeParse: (data: any) => {
        success: boolean;
        data: any;
    };
};
export declare const ShareToolSchema: {
    parse: (data: any) => any;
    safeParse: (data: any) => {
        success: boolean;
        data: any;
    };
};
export declare function canUserEditTool(tool: Tool, userId: string): boolean;
export declare function canUserViewTool(tool: Tool, userId: string): boolean;
export declare function getNextVersion(currentVersion: string): string;
export declare function determineChangeType(changes: any): 'major' | 'minor' | 'patch';
export declare function validateToolStructure(tool: any): boolean;
export declare function validateElementConfig(element: any): boolean;
export declare function generateShareToken(toolId: string, userId: string): string;
export declare function createToolDefaults(): Partial<Tool>;
//# sourceMappingURL=temporary-types.d.ts.map