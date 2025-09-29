/**
 * Get Feed Query
 * Retrieves personalized feed for a user
 */
import { Query, IQueryHandler } from '../../shared/base';
import { Result } from '../../../domain/shared/base/Result';
import { IFeedRepository, ISpaceRepository, IProfileRepository } from '../../../infrastructure/repositories/interfaces';
export declare class GetFeedQuery extends Query {
    readonly filter: 'all' | 'my_spaces' | 'trending' | 'events' | 'rituals';
    readonly limit: number;
    readonly offset: number;
    constructor(filter: "all" | "my_spaces" | "trending" | "events" | "rituals" | undefined, limit: number | undefined, offset: number | undefined, userId: string, campusId: string);
}
export interface FeedItemResult {
    id: string;
    type: 'post' | 'event' | 'ritual_update' | 'requote';
    content: {
        text: string;
        mediaUrls: string[];
        author: {
            id: string;
            name: string;
            handle: string;
            avatar?: string;
            isVerified: boolean;
        };
    };
    source: {
        type: 'space' | 'event' | 'ritual';
        id: string;
        name: string;
    };
    engagement: {
        reactions: number;
        comments: number;
        reposts: number;
        requotes: number;
    };
    isPromoted: boolean;
    promotionReason?: string;
    createdAt: Date;
    relevanceScore: number;
}
export interface GetFeedResult {
    items: FeedItemResult[];
    hasMore: boolean;
    nextOffset: number;
    trendingTopics: string[];
}
export declare class GetFeedQueryHandler implements IQueryHandler<GetFeedQuery, GetFeedResult> {
    private readonly feedRepository;
    private readonly spaceRepository;
    private readonly profileRepository;
    constructor(feedRepository: IFeedRepository, spaceRepository: ISpaceRepository, profileRepository: IProfileRepository);
    execute(query: GetFeedQuery): Promise<Result<GetFeedResult>>;
    private extractTrendingTopics;
}
//# sourceMappingURL=get-feed.query.d.ts.map