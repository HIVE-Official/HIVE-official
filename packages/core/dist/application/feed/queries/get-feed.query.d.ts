/**
 * Get Feed Query
 * Fetches the personalized feed for a user
 */
import { FeedItem } from '../../../domain/feed/feed-item';
export interface GetFeedQuery {
    userId: string;
    campusId: string;
    limit?: number;
    offset?: number;
    filters?: {
        spaceIds?: string[];
        types?: string[];
        sortBy?: 'recent' | 'popular' | 'relevant';
    };
}
export interface GetFeedQueryResult {
    items: FeedItem[];
    hasMore: boolean;
    nextOffset: number;
    totalCount?: number;
}
export declare class GetFeedQueryHandler {
    private readonly feedService?;
    constructor(feedService?: any | undefined);
    execute(query: GetFeedQuery): Promise<GetFeedQueryResult>;
    private buildFeedQuery;
    private applySorting;
}
//# sourceMappingURL=get-feed.query.d.ts.map