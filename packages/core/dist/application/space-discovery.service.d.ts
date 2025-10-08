/**
 * Space Discovery Service
 * Orchestrates space discovery, joining, and management flows
 */
import { BaseApplicationService, ApplicationServiceContext, ServiceResult } from './base.service';
import { Result } from '../domain/shared/base/Result';
import { Space } from '../domain/spaces/aggregates/space.aggregate';
import { ISpaceRepository, IProfileRepository, IFeedRepository } from '../infrastructure/repositories/interfaces';
export interface SpaceCreationData {
    name: string;
    description: string;
    spaceType: 'general' | 'study-group' | 'social' | 'event' | 'resource';
    visibility: 'public' | 'private';
    settings?: {
        allowInvites?: boolean;
        requireApproval?: boolean;
        allowRSS?: boolean;
    };
    rssUrl?: string;
}
export interface SpaceDiscoveryFilters {
    spaceType?: string;
    searchQuery?: string;
    sortBy?: 'trending' | 'members' | 'activity' | 'new';
    includePrivate?: boolean;
    limit?: number;
}
export interface SpaceJoinResult {
    space: Space;
    role: 'member' | 'moderator' | 'admin';
    welcomeMessage?: string;
    suggestedActions: Array<{
        action: string;
        description: string;
    }>;
}
export interface SpaceActivityData {
    spaceId: string;
    recentPosts: Array<{
        id: string;
        content: string;
        authorName: string;
        timestamp: Date;
    }>;
    activeMembers: number;
    todaysPosts: number;
    trendingTopics: string[];
}
export declare class SpaceDiscoveryService extends BaseApplicationService {
    private spaceRepo;
    private profileRepo;
    private feedRepo;
    constructor(context?: Partial<ApplicationServiceContext>, spaceRepo?: ISpaceRepository, profileRepo?: IProfileRepository, feedRepo?: IFeedRepository);
    /**
     * Discover spaces based on user preferences and filters
     */
    discoverSpaces(filters?: SpaceDiscoveryFilters): Promise<Result<ServiceResult<Space[]>>>;
    /**
     * Get personalized space recommendations for a user
     */
    getRecommendedSpaces(userId: string): Promise<Result<ServiceResult<Space[]>>>;
    /**
     * Create a new space
     */
    createSpace(creatorId: string, data: SpaceCreationData): Promise<Result<Space>>;
    /**
     * Join a space
     */
    joinSpace(userId: string, spaceId: string): Promise<Result<ServiceResult<SpaceJoinResult>>>;
    /**
     * Leave a space
     */
    leaveSpace(userId: string, spaceId: string): Promise<Result<void>>;
    /**
     * Get space activity summary
     */
    getSpaceActivity(spaceId: string): Promise<Result<ServiceResult<SpaceActivityData>>>;
    private sortSpaces;
    private extractTrendingTopics;
    private scheduleRSSFetch;
}
//# sourceMappingURL=space-discovery.service.d.ts.map