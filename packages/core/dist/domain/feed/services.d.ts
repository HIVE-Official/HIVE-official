/**
 * Feed Domain Services
 * Business logic that doesn't naturally fit within aggregates
 */
import { FeedItem } from './feed';
import { ProfileId, SpaceId } from './feed';
import { ContentSource, FeedFilter } from './value-objects';
/**
 * Feed Personalization Service
 * Personalizes feed content based on user behavior and preferences
 */
export interface FeedPersonalizationService {
    /**
     * Calculate personalized relevance scores for content
     */
    calculatePersonalizedScore(userId: ProfileId, content: {
        authorId: ProfileId;
        spaceId?: SpaceId;
        tags: string[];
        createdAt: Date;
    }): Promise<number>;
    /**
     * Get user's content preferences based on their history
     */
    getUserPreferences(userId: ProfileId): Promise<{
        preferredSpaces: SpaceId[];
        preferredAuthors: ProfileId[];
        preferredTags: string[];
        engagementPatterns: {
            timeOfDay: number[];
            dayOfWeek: number[];
        };
    }>;
    /**
     * Update user preferences based on interaction
     */
    updatePreferencesFromInteraction(userId: ProfileId, itemId: string, interactionType: string): Promise<void>;
}
/**
 * Feed Recommendation Service
 * Generates content recommendations for users
 */
export interface FeedRecommendationService {
    /**
     * Get recommended content for a user
     */
    getRecommendations(userId: ProfileId, limit: number, excludeIds: string[]): Promise<FeedItem[]>;
    /**
     * Find similar content to a given item
     */
    findSimilarContent(itemId: string, limit: number): Promise<FeedItem[]>;
    /**
     * Get trending content for campus
     */
    getTrendingContent(campusId: string, timeWindow: 'hour' | 'day' | 'week', limit: number): Promise<FeedItem[]>;
    /**
     * Get content from user's network (friends, connections)
     */
    getNetworkContent(userId: ProfileId, limit: number): Promise<FeedItem[]>;
}
/**
 * Feed Content Aggregation Service
 * Aggregates content from multiple sources
 */
export declare class FeedContentAggregationService {
    private readonly sources;
    constructor(sources: Map<string, ContentSource>);
    /**
     * Aggregate content from all registered sources
     */
    aggregateContent(filter: FeedFilter, limit?: number): Promise<FeedItem[]>;
    /**
     * Register a new content source
     */
    registerSource(name: string, source: ContentSource): void;
    /**
     * Unregister a content source
     */
    unregisterSource(name: string): void;
    private fetchFromSource;
    private sortAndDeduplicate;
}
/**
 * Feed Moderation Service
 * Handles content moderation and filtering
 */
export declare class FeedModerationService {
    private readonly blockedKeywords;
    private readonly flaggedUsers;
    /**
     * Check if content should be filtered
     */
    shouldFilterContent(item: FeedItem): boolean;
    /**
     * Add keywords to block list
     */
    addBlockedKeywords(keywords: string[]): void;
    /**
     * Flag a user for moderation
     */
    flagUser(userId: string, reason: string): void;
    /**
     * Unflag a user
     */
    unflagUser(userId: string): void;
    /**
     * Check content for violations
     */
    checkContentViolations(content: string): Promise<{
        hasViolations: boolean;
        violations: string[];
        severity: 'low' | 'medium' | 'high';
    }>;
    private calculateSeverity;
}
/**
 * Feed Analytics Service
 * Tracks and analyzes feed usage patterns
 */
export declare class FeedAnalyticsService {
    /**
     * Track feed view event
     */
    trackFeedView(userId: ProfileId, feedId: string, metadata: {
        filter: string;
        itemCount: number;
        sessionId: string;
    }): Promise<void>;
    /**
     * Track item interaction
     */
    trackInteraction(userId: ProfileId, itemId: string, interactionType: string, metadata: Record<string, unknown>): Promise<void>;
    /**
     * Get feed engagement metrics
     */
    getEngagementMetrics(feedId: string, timeRange: {
        start: Date;
        end: Date;
    }): Promise<{
        views: number;
        uniqueViewers: number;
        averageViewDuration: number;
        interactionRate: number;
        topInteractionTypes: Array<{
            type: string;
            count: number;
        }>;
    }>;
    /**
     * Get user engagement patterns
     */
    getUserEngagementPatterns(userId: ProfileId): Promise<{
        mostActiveHours: number[];
        preferredContentTypes: string[];
        averageSessionDuration: number;
        interactionFrequency: Record<string, number>;
    }>;
}
//# sourceMappingURL=services.d.ts.map