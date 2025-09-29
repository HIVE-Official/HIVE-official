/**
 * Feed Generation Service
 * Orchestrates personalized feed generation with SPEC.md algorithm
 */

import { BaseApplicationService, ApplicationServiceContext, ServiceResult } from './base.service';
import { Result } from '../domain/shared/base/Result';
import { EnhancedFeed } from '../domain/feed/enhanced-feed';
import { FeedItem } from '../domain/feed/feed-item';
import { ProfileId } from '../domain/profile/value-objects/profile-id.value';
import { SpaceId } from '../domain/spaces/value-objects/space-id.value';
import { EnhancedProfile } from '../domain/profile/aggregates/enhanced-profile';
import { EnhancedSpace } from '../domain/spaces/aggregates/enhanced-space';
import {
  getFeedRepository,
  getProfileRepository,
  getSpaceRepository,
  getRitualRepository
} from '../infrastructure/repositories/factory';
import {
  IFeedRepository,
  IProfileRepository,
  ISpaceRepository,
  IRitualRepository
} from '../infrastructure/repositories/interfaces';

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

export class FeedGenerationService extends BaseApplicationService {
  private feedRepo: IFeedRepository;
  private profileRepo: IProfileRepository;
  private spaceRepo: ISpaceRepository;
  private ritualRepo: IRitualRepository;

  constructor(context?: Partial<ApplicationServiceContext>) {
    super(context);
    this.feedRepo = getFeedRepository();
    this.profileRepo = getProfileRepository();
    this.spaceRepo = getSpaceRepository();
    this.ritualRepo = getRitualRepository();
  }

  /**
   * Generate personalized feed for a user
   * Implements SPEC.md algorithm with weighted factors
   */
  async generateFeed(
    userId: string,
    options: FeedGenerationOptions = {}
  ): Promise<Result<ServiceResult<FeedContent>>> {
    return this.execute(async () => {
      // Get user profile and context
      const userProfileId = ProfileId.create(userId).getValue();
      const profileResult = await this.profileRepo.findById(userProfileId.id);

      if (profileResult.isFailure) {
        return Result.fail<ServiceResult<FeedContent>>('User profile not found');
      }

      const profile = profileResult.getValue();
      const profileData = profile; // ProfileDTO doesn't need toData()

      // Get user's feed configuration
      const feedResult = await this.feedRepo.findByUserId(userProfileId);
      if (feedResult.isFailure) {
        return Result.fail<ServiceResult<FeedContent>>(feedResult.error!);
      }

      const feed = feedResult.getValue();

      // Get user's spaces and connections
      const userSpacesResult = await this.spaceRepo.findByMember(userProfileId.id);
      const userSpaces = userSpacesResult.isSuccess
        ? userSpacesResult.getValue().map((s: any) => s.id)
        : [];

      const userConnectionIds = profileData.connections;

      // Apply feed preferences from options
      if (options.includeSpacePosts !== undefined) {
        feed.updatePreferences({
          showSpacePosts: options.includeSpacePosts
        });
      }

      // Get feed content with algorithm
      const contentResult = await this.feedRepo.getFeedContent(
        userProfileId.id,
        userSpaces,
        userConnectionIds,
        options.limit || 20
      );

      if (contentResult.isFailure) {
        return Result.fail<ServiceResult<FeedContent>>(contentResult.error!);
      }

      let items = contentResult.getValue();

      // Apply additional filtering based on options
      items = this.applyContentFilters(items, options);

      // Sort based on preference
      if (options.sortBy === 'recent') {
        items = items.sort((a: any, b: any) =>
          b.toData().createdAt.getTime() - a.toData().createdAt.getTime()
        );
      } else if (options.sortBy === 'engagement') {
        items = items.sort((a: any, b: any) =>
          b.toData().engagementCount - a.toData().engagementCount
        );
      }
      // Default is 'algorithm' which is already applied

      // Generate insights
      const insights = this.generateFeedInsights(items, feed);

      // Apply pagination
      const offset = options.offset || 0;
      const paginatedItems = items.slice(offset, offset + (options.limit || 20));

      const result: ServiceResult<FeedContent> = {
        data: {
          items: paginatedItems,
          insights,
          nextOffset: offset + paginatedItems.length,
          hasMore: offset + paginatedItems.length < items.length
        },
        metadata: {
          totalCount: items.length,
          pageSize: options.limit || 20,
          pageNumber: Math.floor(offset / (options.limit || 20)) + 1
        }
      };

      // Update feed last accessed
      await this.feedRepo.saveFeed(feed);

      return Result.ok<ServiceResult<FeedContent>>(result);
    }, 'FeedGeneration.generateFeed');
  }

  /**
   * Get trending content across campus
   */
  async getTrendingFeed(
    limit: number = 20
  ): Promise<Result<ServiceResult<FeedItem[]>>> {
    return this.execute(async () => {
      const trendingResult = await this.feedRepo.getTrendingContent(
        this.context.campusId,
        limit
      );

      if (trendingResult.isFailure) {
        return Result.fail<ServiceResult<FeedItem[]>>(trendingResult.error!);
      }

      const result: ServiceResult<FeedItem[]> = {
        data: trendingResult.getValue(),
        metadata: {
          totalCount: trendingResult.getValue().length
        }
      };

      return Result.ok<ServiceResult<FeedItem[]>>(result);
    }, 'FeedGeneration.getTrendingFeed');
  }

  /**
   * Get event-focused feed content
   */
  async getEventsFeed(
    limit: number = 20
  ): Promise<Result<ServiceResult<FeedItem[]>>> {
    return this.execute(async () => {
      const eventsResult = await this.feedRepo.getEventContent(
        this.context.campusId,
        limit
      );

      if (eventsResult.isFailure) {
        return Result.fail<ServiceResult<FeedItem[]>>(eventsResult.error!);
      }

      const result: ServiceResult<FeedItem[]> = {
        data: eventsResult.getValue(),
        metadata: {
          totalCount: eventsResult.getValue().length
        }
      };

      return Result.ok<ServiceResult<FeedItem[]>>(result);
    }, 'FeedGeneration.getEventsFeed');
  }

  /**
   * Get ritual-focused feed content
   */
  async getRitualsFeed(
    limit: number = 20
  ): Promise<Result<ServiceResult<FeedItem[]>>> {
    return this.execute(async () => {
      const ritualsResult = await this.feedRepo.getRitualContent(
        this.context.campusId,
        limit
      );

      if (ritualsResult.isFailure) {
        return Result.fail<ServiceResult<FeedItem[]>>(ritualsResult.error!);
      }

      const result: ServiceResult<FeedItem[]> = {
        data: ritualsResult.getValue(),
        metadata: {
          totalCount: ritualsResult.getValue().length
        }
      };

      return Result.ok<ServiceResult<FeedItem[]>>(result);
    }, 'FeedGeneration.getRitualsFeed');
  }

  /**
   * Record user interaction with feed item
   */
  async recordInteraction(
    userId: string,
    itemId: string,
    interactionType: 'view' | 'like' | 'comment' | 'share' | 'hide'
  ): Promise<Result<void>> {
    return this.execute(async () => {
      const userProfileId = ProfileId.create(userId).getValue();

      // Record the interaction
      const recordResult = await this.feedRepo.recordInteraction(
        userProfileId.id,
        itemId,
        interactionType,
        {
          timestamp: Date.now(),
          context: this.context
        }
      );

      if (recordResult.isFailure) {
        return Result.fail<void>(recordResult.error!);
      }

      // Update algorithm weights based on interaction
      if (interactionType === 'like' || interactionType === 'comment') {
        await this.updateAlgorithmWeights(userId, itemId, 'positive');
      } else if (interactionType === 'hide') {
        await this.updateAlgorithmWeights(userId, itemId, 'negative');
      }

      return Result.ok<void>();
    }, 'FeedGeneration.recordInteraction');
  }

  /**
   * Update user's feed preferences
   */
  async updateFeedPreferences(
    userId: string,
    preferences: {
      showSpacePosts?: boolean;
      showRSSPosts?: boolean;
      showConnectionActivity?: boolean;
      showEventPosts?: boolean;
      showRitualPosts?: boolean;
    }
  ): Promise<Result<void>> {
    return this.execute(async () => {
      const userProfileId = ProfileId.create(userId).getValue();

      // Get user's feed
      const feedResult = await this.feedRepo.findByUserId(userProfileId);
      if (feedResult.isFailure) {
        return Result.fail<void>(feedResult.error!);
      }

      const feed = feedResult.getValue();

      // Update preferences
      feed.updatePreferences(preferences);

      // Save updated feed
      const saveResult = await this.feedRepo.saveFeed(feed);
      if (saveResult.isFailure) {
        return Result.fail<void>(saveResult.error!);
      }

      return Result.ok<void>();
    }, 'FeedGeneration.updateFeedPreferences');
  }

  /**
   * Subscribe to real-time feed updates
   */
  subscribeToFeedUpdates(
    userId: string,
    callback: (items: FeedItem[]) => void
  ): () => void {
    const userProfileId = ProfileId.create(userId).getValue();
    return this.feedRepo.subscribeToFeed(userProfileId.id, callback);
  }

  // Private helper methods

  private applyContentFilters(
    items: FeedItem[],
    options: FeedGenerationOptions
  ): FeedItem[] {
    return items.filter(item => {
      const itemData = item.toData ? item.toData() : item;

      if (options.includeSpacePosts === false && itemData.type === 'space_post') {
        return false;
      }

      if (options.includeRSSPosts === false && itemData.type === 'rss_post') {
        return false;
      }

      if (options.includeConnectionActivity === false && itemData.type === 'connection_activity') {
        return false;
      }

      if (options.includeEvents === false && itemData.type === 'event') {
        return false;
      }

      if (options.includeRituals === false && itemData.type === 'ritual') {
        return false;
      }

      return true;
    });
  }

  private generateFeedInsights(items: FeedItem[], feed: EnhancedFeed): FeedInsights {
    if (items.length === 0) {
      return {
        primaryContentType: 'none',
        engagementRate: 0,
        averageScore: 0,
        topSpaces: [],
        suggestedAdjustments: ['Follow more spaces to see content']
      };
    }

    // Analyze content types
    const typeCounts = new Map<string, number>();
    let totalEngagement = 0;
    let totalScore = 0;
    const spaceCounts = new Map<string, number>();

    items.forEach(item => {
      const data = item.toData ? item.toData() : item;
      typeCounts.set(data.type, (typeCounts.get(data.type) || 0) + 1);
      totalEngagement += data.engagementCount;
      totalScore += data.score;

      if (data.spaceId) {
        spaceCounts.set(data.spaceId.id, (spaceCounts.get(data.spaceId.id) || 0) + 1);
      }
    });

    // Find primary content type
    const primaryContentType = Array.from(typeCounts.entries())
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'mixed';

    // Calculate engagement rate
    const engagementRate = items.length > 0
      ? totalEngagement / items.length
      : 0;

    // Calculate average score
    const averageScore = items.length > 0
      ? totalScore / items.length
      : 0;

    // Get top spaces
    const topSpaces = Array.from(spaceCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([spaceId]) => spaceId);

    // Generate suggestions based on analysis
    const suggestedAdjustments = this.generateAdjustmentSuggestions(
      feed,
      primaryContentType,
      engagementRate,
      averageScore
    );

    return {
      primaryContentType,
      engagementRate,
      averageScore,
      topSpaces,
      suggestedAdjustments
    };
  }

  private generateAdjustmentSuggestions(
    feed: EnhancedFeed,
    primaryContentType: string,
    engagementRate: number,
    averageScore: number
  ): string[] {
    const suggestions: string[] = [];
    const feedData = feed.toData?.() || feed;

    // Low engagement suggestions
    if (engagementRate < 1) {
      suggestions.push('Your feed has low engagement. Try following more active spaces.');
    }

    // Content diversity suggestions
    if (primaryContentType === 'space_post' && feedData.algorithm.spaceRelevance > 0.5) {
      suggestions.push('Your feed is heavily focused on space posts. Consider adjusting to see more diverse content.');
    }

    // Score optimization suggestions
    if (averageScore < 0.5) {
      suggestions.push('Feed content scores are low. The algorithm is learning your preferences.');
    }

    // Algorithm weight suggestions
    if (feedData.algorithm.recency > 0.5) {
      suggestions.push('Your feed prioritizes recent content. Consider balancing with engagement metrics.');
    }

    if (suggestions.length === 0) {
      suggestions.push('Your feed is well-balanced!');
    }

    return suggestions;
  }

  private async updateAlgorithmWeights(
    userId: string,
    itemId: string,
    feedback: 'positive' | 'negative'
  ): Promise<void> {
    try {
      const userProfileId = ProfileId.create(userId).getValue();
      const feedResult = await this.feedRepo.findByUserId(userProfileId);

      if (feedResult.isSuccess) {
        const feed = feedResult.getValue();

        // Adjust algorithm weights based on feedback
        // This is a simplified version - production would use ML
        const adjustment = feedback === 'positive' ? 0.01 : -0.01;

        feed.adjustAlgorithmWeights({
          recency: adjustment * 0.5,
          engagement: adjustment * 1.5,
          socialProximity: adjustment * 1.0,
          spaceRelevance: adjustment * 0.8,
          trendingBoost: adjustment * 0.3
        });

        await this.feedRepo.saveFeed(feed);
      }
    } catch (error) {
      console.error('Failed to update algorithm weights:', error);
    }
  }
}