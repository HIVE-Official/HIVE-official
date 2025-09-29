/**
 * Feed Aggregate - Content Discovery Domain
 * Based on SPEC.md: Read-only discovery layer that aggregates content from spaces
 */
import { FeedItemId, ContentSource, FeedFilter, RelevanceScore, TimeWindow, FeedInteraction, InteractionType, Result } from './value-objects';
import { ProfileId } from '../profile/value-objects';
import { SpaceId } from '../spaces/value-objects';
export interface FeedItemContent {
    title?: string;
    text: string;
    mediaUrls: string[];
    authorId: ProfileId;
    authorName: string;
    authorPhoto?: string;
}
export interface FeedItem {
    id: FeedItemId;
    source: ContentSource;
    content: FeedItemContent;
    relevanceScore: RelevanceScore;
    createdAt: Date;
    interactions: FeedInteraction[];
    isVisible: boolean;
    isTrending: boolean;
    toData?: () => any;
}
export interface FeedAlgorithmFactors {
    recency: number;
    engagement: number;
    socialProximity: number;
    spaceRelevance: number;
    trendingBoost: number;
}
export interface FeedData {
    items: FeedItem[];
    lastUpdated: Date;
    filter: FeedFilter;
    userId: ProfileId;
    algorithm?: any;
}
/**
 * Feed Aggregate Root
 * Represents a user's personalized content discovery feed
 */
export declare class Feed {
    private data;
    private constructor();
    get items(): FeedItem[];
    get allItems(): FeedItem[];
    get lastUpdated(): Date;
    get filter(): FeedFilter;
    get userId(): ProfileId;
    get itemCount(): number;
    static create(userId: ProfileId, filter?: FeedFilter): Result<Feed>;
    addContent(source: ContentSource, content: FeedItemContent, algorithmFactors: FeedAlgorithmFactors): Result<FeedItem>;
    applyFilter(filter: FeedFilter): Result<void>;
    recordInteraction(itemId: FeedItemId, interactionType: InteractionType, metadata?: Record<string, unknown>): Result<FeedInteraction>;
    getTrendingItems(limit?: number): FeedItem[];
    getMySpacesItems(limit?: number): FeedItem[];
    getEventItems(timeWindow?: TimeWindow): FeedItem[];
    refresh(newItems: FeedItem[]): Result<void>;
    getEngagementRate(): number;
    getActivitySummary(timeWindow: TimeWindow): {
        totalItems: number;
        engagements: number;
        hiddenItems: number;
        trendingItems: number;
    };
    private calculateRelevanceScore;
    private itemMatchesFilter;
    private sortByRelevance;
    updatePreferences(preferences: any): void;
    adjustAlgorithmWeights(weights: any): void;
    toData(): FeedData;
    static fromData(data: FeedData): Feed;
}
/**
 * Feed Algorithm Service
 * Implements the SPEC.md feed algorithm for content discovery
 */
export declare class FeedAlgorithm {
    static calculateFactors(content: {
        createdAt: Date;
        authorId: ProfileId;
        spaceId?: SpaceId;
        reactionCount: number;
        commentCount: number;
        repostCount: number;
    }, user: {
        id: ProfileId;
        spaceIds: SpaceId[];
        connectionIds: ProfileId[];
    }): FeedAlgorithmFactors;
    private static calculateRecencyScore;
    private static calculateEngagementScore;
    private static calculateSocialProximityScore;
    private static calculateSpaceRelevanceScore;
    private static calculateTrendingScore;
}
//# sourceMappingURL=feed.d.ts.map