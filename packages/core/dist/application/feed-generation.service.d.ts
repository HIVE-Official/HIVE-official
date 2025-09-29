/**
 * Feed Generation Service
 * Orchestrates personalized feed generation with SPEC.md algorithm
 */
import { BaseApplicationService, ApplicationServiceContext, ServiceResult } from './base.service';
import { Result } from '../domain/shared/base/Result';
import { FeedItem } from '../domain/feed/feed-item';
export interface FeedGenerationOptions {
    limit?: number;
    offset?: number;
    includeSpacePosts?: boolean;
    includeRSSPosts?: boolean;
    includeConnectionActivity?: boolean;
    includeEvents?: boolean;
    includeRituals?: boolean;
    sortBy?: 'algorithm' | 'recent' | 'engagement';
}
export interface FeedInsights {
    primaryContentType: string;
    engagementRate: number;
    averageScore: number;
    topSpaces: string[];
    suggestedAdjustments: string[];
}
export interface FeedContent {
    items: FeedItem[];
    insights: FeedInsights;
    nextOffset: number;
    hasMore: boolean;
}
export declare class FeedGenerationService extends BaseApplicationService {
    private feedRepo;
    private profileRepo;
    private spaceRepo;
    private ritualRepo;
    constructor(context?: Partial<ApplicationServiceContext>);
    /**
     * Generate personalized feed for a user
     * Implements SPEC.md algorithm with weighted factors
     */
    generateFeed(userId: string, options?: FeedGenerationOptions): Promise<Result<ServiceResult<FeedContent>>>;
    /**
     * Get trending content across campus
     */
    getTrendingFeed(limit?: number): Promise<Result<ServiceResult<FeedItem[]>>>;
    /**
     * Get event-focused feed content
     */
    getEventsFeed(limit?: number): Promise<Result<ServiceResult<FeedItem[]>>>;
    /**
     * Get ritual-focused feed content
     */
    getRitualsFeed(limit?: number): Promise<Result<ServiceResult<FeedItem[]>>>;
    /**
     * Record user interaction with feed item
     */
    recordInteraction(userId: string, itemId: string, interactionType: 'view' | 'like' | 'comment' | 'share' | 'hide'): Promise<Result<void>>;
    /**
     * Update user's feed preferences
     */
    updateFeedPreferences(userId: string, preferences: {
        showSpacePosts?: boolean;
        showRSSPosts?: boolean;
        showConnectionActivity?: boolean;
        showEventPosts?: boolean;
        showRitualPosts?: boolean;
    }): Promise<Result<void>>;
    /**
     * Subscribe to real-time feed updates
     */
    subscribeToFeedUpdates(userId: string, callback: (items: FeedItem[]) => void): () => void;
    private applyContentFilters;
    private generateFeedInsights;
    private generateAdjustmentSuggestions;
    private updateAlgorithmWeights;
}
//# sourceMappingURL=feed-generation.service.d.ts.map