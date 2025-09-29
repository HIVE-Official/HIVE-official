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
        error: null;
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
        startDate: Date | undefined;
        endDate: Date | undefined;
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
//# sourceMappingURL=temporary-types.d.ts.map