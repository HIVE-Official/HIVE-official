/**
 * FeedGenerationService Tests
 * Tests for personalized feed generation and orchestration
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FeedGenerationService, FeedGenerationOptions } from '../feed-generation.service';
import { EnhancedFeed } from '../../domain/feed/enhanced-feed';
import { FeedItem } from '../../domain/feed/feed-item';
import { FeedItemId } from '../../domain/feed/value-objects/feed-item-id.value';
import { ProfileId } from '../../domain/profile/value-objects/profile-id.value';
import { Profile } from '../../domain/profile/aggregates/profile.aggregate';
import { UBEmail } from '../../domain/profile/value-objects/ub-email.value';
import { ProfileHandle } from '../../domain/profile/value-objects/profile-handle.value';
import { UserType } from '../../domain/profile/value-objects/user-type.value';
import { CampusId } from '../../domain/profile/value-objects/campus-id.value';
import { SpaceId } from '../../domain/spaces/value-objects/space-id.value';
import { ProfilePrivacy } from '../../domain/profile/value-objects/profile-privacy.value';
import { Result } from '../../domain/shared/base/Result';

// Mock repositories
const mockFeedRepo = {
  findByUserId: vi.fn(),
  saveFeed: vi.fn(),
  getFeedContent: vi.fn(),
  getTrendingContent: vi.fn(),
  getEventContent: vi.fn(),
  getRitualContent: vi.fn(),
  recordInteraction: vi.fn(),
  subscribeToFeed: vi.fn(),
  save: vi.fn(),
  findById: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn()
};

const mockProfileRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findByHandle: vi.fn(),
  findByEmail: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn()
};

const mockSpaceRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findByMember: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn()
};

const mockRitualRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn()
};

// Mock the factory functions
vi.mock('../../infrastructure/repositories/factory', () => ({
  getFeedRepository: () => mockFeedRepo,
  getProfileRepository: () => mockProfileRepo,
  getSpaceRepository: () => mockSpaceRepo,
  getRitualRepository: () => mockRitualRepo
}));

describe('FeedGenerationService', () => {
  let service: FeedGenerationService;

  beforeEach(() => {
    service = new FeedGenerationService({ campusId: 'ub-buffalo', userId: 'user_test_123' });
    vi.clearAllMocks();
  });

  // Helper to create a valid profile
  const createValidProfile = (): Profile => {
    const profileId = ProfileId.create('profile_test_123').getValue();
    const email = UBEmail.create('testuser@buffalo.edu').getValue();
    const handle = ProfileHandle.create('testuser').getValue();
    const userType = UserType.createStudent().getValue();
    const campusId = CampusId.create('ub-buffalo').getValue();
    const privacy = ProfilePrivacy.createPublic().getValue();

    return Profile.create({
      profileId,
      email,
      handle,
      userType,
      campusId,
      personalInfo: {
        firstName: 'Test',
        lastName: 'User',
        bio: 'Test bio'
      },
      privacy
    }).getValue();
  };

  // Helper to create a valid feed
  const createValidFeed = (): EnhancedFeed => {
    const profileId = ProfileId.create('profile_test_123').getValue();
    const campusId = CampusId.create('ub-buffalo').getValue();

    return EnhancedFeed.create(profileId, campusId).getValue();
  };

  // Helper to create a valid feed item
  const createValidFeedItem = (overrides?: any): FeedItem => {
    const itemId = FeedItemId.create(overrides?.id || 'item_test_123').getValue();
    const spaceId = SpaceId.create(overrides?.spaceId || 'space_123').getValue();

    // Create fake interactions if engagementCount is specified
    const interactions = [];
    if (overrides?.engagementCount) {
      for (let i = 0; i < overrides.engagementCount; i++) {
        const userId = ProfileId.create(`user_${i}`).getValue();
        interactions.push({
          type: 'like' as const,
          userId,
          timestamp: new Date()
        });
      }
    }

    const feedItem = FeedItem.create({
      itemId,
      content: {
        text: overrides?.content || 'Test content',
        mediaUrls: overrides?.mediaUrls || [],
        authorId: overrides?.authorId || 'author_123',
        authorName: overrides?.authorName || 'Test Author'
      },
      source: {
        type: overrides?.contentType || 'space',
        spaceId
      },
      relevanceScore: overrides?.relevanceScore || 0.8,
      isVisible: overrides?.isVisible !== undefined ? overrides.isVisible : true,
      isTrending: overrides?.isTrending || false,
      isPinned: overrides?.isPinned || false,
      createdAt: overrides?.createdAt
    }, overrides?.id).getValue();

    // Manually set interactions if provided (since create() sets to empty array)
    if (interactions.length > 0) {
      for (const interaction of interactions) {
        feedItem.addInteraction(interaction);
      }
    }

    return feedItem;
  };

  describe('generateFeed()', () => {
    it('should successfully generate personalized feed', async () => {
      // Arrange
      const profile = createValidProfile();
      const feed = createValidFeed();
      const feedItems = [
        createValidFeedItem(),
        createValidFeedItem({ id: 'item_2' })
      ];

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(feed));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok([]));
      mockFeedRepo.getFeedContent.mockResolvedValue(Result.ok(feedItems));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.generateFeed('profile_test_123');

      // Assert
      if (result.isFailure) {
        console.log('Test failed with error:', result.error);
      }
      expect(result.isSuccess).toBe(true);
      const feedContent = result.getValue().data;
      expect(feedContent.items).toBeDefined();
      expect(feedContent.insights).toBeDefined();
      expect(feedContent.hasMore).toBeDefined();
    });

    it('should fail when user profile not found', async () => {
      // Arrange
      mockProfileRepo.findById.mockResolvedValue(Result.fail('Not found'));

      // Act
      const result = await service.generateFeed('nonexistent');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('User profile not found');
    });

    it('should fail when feed not found', async () => {
      // Arrange
      const profile = createValidProfile();

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.fail('Feed not found'));

      // Act
      const result = await service.generateFeed('profile_test_123');

      // Assert
      expect(result.isFailure).toBe(true);
    });

    it('should apply content filtering options', async () => {
      // Arrange
      const profile = createValidProfile();
      const feed = createValidFeed();
      const feedItems = [createValidFeedItem()];
      const options: FeedGenerationOptions = {
        includeSpacePosts: true,
        includeRSSPosts: false,
        includeEvents: true
      };

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(feed));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok([]));
      mockFeedRepo.getFeedContent.mockResolvedValue(Result.ok(feedItems));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.generateFeed('profile_test_123', options);

      // Assert
      expect(result.isSuccess).toBe(true);
    });

    it('should sort by recent when specified', async () => {
      // Arrange
      const profile = createValidProfile();
      const feed = createValidFeed();
      const oldItem = createValidFeedItem({ id: 'old', createdAt: new Date('2024-01-01') });
      const newItem = createValidFeedItem({ id: 'new', createdAt: new Date('2024-12-01') });
      const feedItems = [oldItem, newItem];

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(feed));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok([]));
      mockFeedRepo.getFeedContent.mockResolvedValue(Result.ok(feedItems));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.generateFeed('profile_test_123', { sortBy: 'recent' });

      // Assert
      expect(result.isSuccess).toBe(true);
      const items = result.getValue().data.items;
      expect(items[0].toData().id).toBe('new');
    });

    it('should sort by engagement when specified', async () => {
      // Arrange
      const profile = createValidProfile();
      const feed = createValidFeed();
      const lowEngagement = createValidFeedItem({ id: 'low', engagementCount: 5 });
      const highEngagement = createValidFeedItem({ id: 'high', engagementCount: 50 });
      const feedItems = [lowEngagement, highEngagement];

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(feed));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok([]));
      mockFeedRepo.getFeedContent.mockResolvedValue(Result.ok(feedItems));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.generateFeed('profile_test_123', { sortBy: 'engagement' });

      // Assert
      expect(result.isSuccess).toBe(true);
      const items = result.getValue().data.items;
      expect(items[0].toData().id).toBe('high');
    });

    it('should apply pagination with limit and offset', async () => {
      // Arrange
      const profile = createValidProfile();
      const feed = createValidFeed();
      const feedItems = Array(50).fill(null).map((_, i) => createValidFeedItem({ id: `item_${i}` }));

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(feed));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok([]));
      mockFeedRepo.getFeedContent.mockResolvedValue(Result.ok(feedItems));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.generateFeed('profile_test_123', { limit: 10, offset: 20 });

      // Assert
      expect(result.isSuccess).toBe(true);
      const feedContent = result.getValue().data;
      expect(feedContent.items.length).toBe(10);
      expect(feedContent.nextOffset).toBe(30);
      expect(feedContent.hasMore).toBe(true);
    });

    it('should update feed last accessed timestamp', async () => {
      // Arrange
      const profile = createValidProfile();
      const feed = createValidFeed();
      const feedItems = [createValidFeedItem()];

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(feed));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok([]));
      mockFeedRepo.getFeedContent.mockResolvedValue(Result.ok(feedItems));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok(undefined));

      // Act
      await service.generateFeed('profile_test_123');

      // Assert
      expect(mockFeedRepo.saveFeed).toHaveBeenCalledWith(feed);
    });
  });

  describe('getTrendingFeed()', () => {
    it('should get trending content', async () => {
      // Arrange
      const trendingItems = [
        createValidFeedItem({ id: 'trending_1' }),
        createValidFeedItem({ id: 'trending_2' })
      ];

      mockFeedRepo.getTrendingContent.mockResolvedValue(Result.ok(trendingItems));

      // Act
      const result = await service.getTrendingFeed(20);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockFeedRepo.getTrendingContent).toHaveBeenCalledWith('ub-buffalo', 20);
      expect(result.getValue().data.length).toBe(2);
    });

    it('should use default limit if not specified', async () => {
      // Arrange
      mockFeedRepo.getTrendingContent.mockResolvedValue(Result.ok([]));

      // Act
      await service.getTrendingFeed();

      // Assert
      expect(mockFeedRepo.getTrendingContent).toHaveBeenCalledWith('ub-buffalo', 20);
    });

    it('should fail when repository fails', async () => {
      // Arrange
      mockFeedRepo.getTrendingContent.mockResolvedValue(Result.fail('Database error'));

      // Act
      const result = await service.getTrendingFeed();

      // Assert
      expect(result.isFailure).toBe(true);
    });
  });

  describe('getEventsFeed()', () => {
    it('should get event-focused content', async () => {
      // Arrange
      const eventItems = [
        createValidFeedItem({ id: 'event_1', contentType: 'event' }),
        createValidFeedItem({ id: 'event_2', contentType: 'event' })
      ];

      mockFeedRepo.getEventContent.mockResolvedValue(Result.ok(eventItems));

      // Act
      const result = await service.getEventsFeed(20);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockFeedRepo.getEventContent).toHaveBeenCalledWith('ub-buffalo', 20);
      expect(result.getValue().data.length).toBe(2);
    });

    it('should use default limit if not specified', async () => {
      // Arrange
      mockFeedRepo.getEventContent.mockResolvedValue(Result.ok([]));

      // Act
      await service.getEventsFeed();

      // Assert
      expect(mockFeedRepo.getEventContent).toHaveBeenCalledWith('ub-buffalo', 20);
    });

    it('should fail when repository fails', async () => {
      // Arrange
      mockFeedRepo.getEventContent.mockResolvedValue(Result.fail('Database error'));

      // Act
      const result = await service.getEventsFeed();

      // Assert
      expect(result.isFailure).toBe(true);
    });
  });

  describe('getRitualsFeed()', () => {
    it('should get ritual-focused content', async () => {
      // Arrange
      const ritualItems = [
        createValidFeedItem({ id: 'ritual_1', contentType: 'ritual' }),
        createValidFeedItem({ id: 'ritual_2', contentType: 'ritual' })
      ];

      mockFeedRepo.getRitualContent.mockResolvedValue(Result.ok(ritualItems));

      // Act
      const result = await service.getRitualsFeed(20);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockFeedRepo.getRitualContent).toHaveBeenCalledWith('ub-buffalo', 20);
      expect(result.getValue().data.length).toBe(2);
    });

    it('should use default limit if not specified', async () => {
      // Arrange
      mockFeedRepo.getRitualContent.mockResolvedValue(Result.ok([]));

      // Act
      await service.getRitualsFeed();

      // Assert
      expect(mockFeedRepo.getRitualContent).toHaveBeenCalledWith('ub-buffalo', 20);
    });

    it('should fail when repository fails', async () => {
      // Arrange
      mockFeedRepo.getRitualContent.mockResolvedValue(Result.fail('Database error'));

      // Act
      const result = await service.getRitualsFeed();

      // Assert
      expect(result.isFailure).toBe(true);
    });
  });

  describe('recordInteraction()', () => {
    it('should successfully record view interaction', async () => {
      // Arrange
      mockFeedRepo.recordInteraction.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.recordInteraction('profile_test_123', 'item_123', 'view');

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockFeedRepo.recordInteraction).toHaveBeenCalled();
    });

    it('should adjust weights for positive interactions', async () => {
      // Arrange
      const feed = createValidFeed();

      mockFeedRepo.recordInteraction.mockResolvedValue(Result.ok(undefined));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(feed));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.recordInteraction('profile_test_123', 'item_123', 'like');

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockFeedRepo.saveFeed).toHaveBeenCalled();
    });

    it('should adjust weights for negative interactions', async () => {
      // Arrange
      const feed = createValidFeed();

      mockFeedRepo.recordInteraction.mockResolvedValue(Result.ok(undefined));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(feed));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.recordInteraction('profile_test_123', 'item_123', 'hide');

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockFeedRepo.saveFeed).toHaveBeenCalled();
    });

    it('should handle comment interactions', async () => {
      // Arrange
      const feed = createValidFeed();

      mockFeedRepo.recordInteraction.mockResolvedValue(Result.ok(undefined));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(feed));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.recordInteraction('profile_test_123', 'item_123', 'comment');

      // Assert
      expect(result.isSuccess).toBe(true);
    });

    it('should fail when repository fails', async () => {
      // Arrange
      mockFeedRepo.recordInteraction.mockResolvedValue(Result.fail('Database error'));

      // Act
      const result = await service.recordInteraction('profile_test_123', 'item_123', 'view');

      // Assert
      expect(result.isFailure).toBe(true);
    });
  });

  describe('updateFeedPreferences()', () => {
    it('should update feed preferences', async () => {
      // Arrange
      const feed = createValidFeed();
      const preferences = {
        showSpacePosts: true,
        showRSSPosts: false,
        showEventPosts: true
      };

      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(feed));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.updateFeedPreferences('profile_test_123', preferences);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockFeedRepo.saveFeed).toHaveBeenCalledWith(feed);
    });

    it('should fail when feed not found', async () => {
      // Arrange
      mockFeedRepo.findByUserId.mockResolvedValue(Result.fail('Feed not found'));

      // Act
      const result = await service.updateFeedPreferences('profile_test_123', {});

      // Assert
      expect(result.isFailure).toBe(true);
    });

    it('should fail when save fails', async () => {
      // Arrange
      const feed = createValidFeed();

      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(feed));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.fail('Save error'));

      // Act
      const result = await service.updateFeedPreferences('profile_test_123', {});

      // Assert
      expect(result.isFailure).toBe(true);
    });
  });

  describe('subscribeToFeedUpdates()', () => {
    it('should subscribe to feed updates', () => {
      // Arrange
      const callback = vi.fn();
      const unsubscribe = vi.fn();
      mockFeedRepo.subscribeToFeed.mockReturnValue(unsubscribe);

      // Act
      const result = service.subscribeToFeedUpdates('profile_test_123', callback);

      // Assert
      expect(mockFeedRepo.subscribeToFeed).toHaveBeenCalled();
      expect(result).toBe(unsubscribe);
    });
  });

  describe('Real-world Scenarios', () => {
    it('should handle complete feed generation flow', async () => {
      // Arrange
      const profile = createValidProfile();
      const feed = createValidFeed();
      const feedItems = Array(30).fill(null).map((_, i) =>
        createValidFeedItem({
          id: `item_${i}`,
          contentType: i % 3 === 0 ? 'event' : 'post',
          createdAt: new Date(Date.now() - i * 60000) // Different timestamps
        })
      );

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(feed));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok([]));
      mockFeedRepo.getFeedContent.mockResolvedValue(Result.ok(feedItems));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.generateFeed('profile_test_123', {
        limit: 20,
        includeEvents: true,
        sortBy: 'algorithm'
      });

      // Assert
      expect(result.isSuccess).toBe(true);
      const feedContent = result.getValue().data;
      expect(feedContent.items.length).toBe(20);
      expect(feedContent.hasMore).toBe(true);
      expect(feedContent.insights).toBeDefined();
    });

    it('should handle user interaction tracking workflow', async () => {
      // Arrange
      const feed = createValidFeed();

      mockFeedRepo.recordInteraction.mockResolvedValue(Result.ok(undefined));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(feed));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok(undefined));

      // Act - User views, then likes a post
      const viewResult = await service.recordInteraction('profile_test_123', 'item_123', 'view');
      const likeResult = await service.recordInteraction('profile_test_123', 'item_123', 'like');

      // Assert
      expect(viewResult.isSuccess).toBe(true);
      expect(likeResult.isSuccess).toBe(true);
      expect(mockFeedRepo.recordInteraction).toHaveBeenCalledTimes(2);
    });
  });
});
