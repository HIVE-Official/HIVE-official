"use strict";
/**
 * FeedGenerationService Tests
 * Tests for personalized feed generation and orchestration
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const feed_generation_service_1 = require("../feed-generation.service");
const enhanced_feed_1 = require("../../domain/feed/enhanced-feed");
const feed_item_1 = require("../../domain/feed/feed-item");
const feed_item_id_value_1 = require("../../domain/feed/value-objects/feed-item-id.value");
const profile_id_value_1 = require("../../domain/profile/value-objects/profile-id.value");
const profile_aggregate_1 = require("../../domain/profile/aggregates/profile.aggregate");
const ub_email_value_1 = require("../../domain/profile/value-objects/ub-email.value");
const profile_handle_value_1 = require("../../domain/profile/value-objects/profile-handle.value");
const user_type_value_1 = require("../../domain/profile/value-objects/user-type.value");
const campus_id_value_1 = require("../../domain/profile/value-objects/campus-id.value");
const space_id_value_1 = require("../../domain/spaces/value-objects/space-id.value");
const profile_privacy_value_1 = require("../../domain/profile/value-objects/profile-privacy.value");
const Result_1 = require("../../domain/shared/base/Result");
// Mock repositories
const mockFeedRepo = {
    findByUserId: vitest_1.vi.fn(),
    saveFeed: vitest_1.vi.fn(),
    getFeedContent: vitest_1.vi.fn(),
    getTrendingContent: vitest_1.vi.fn(),
    getEventContent: vitest_1.vi.fn(),
    getRitualContent: vitest_1.vi.fn(),
    recordInteraction: vitest_1.vi.fn(),
    subscribeToFeed: vitest_1.vi.fn(),
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findAll: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn()
};
const mockProfileRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByHandle: vitest_1.vi.fn(),
    findByEmail: vitest_1.vi.fn(),
    findAll: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn()
};
const mockSpaceRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByMember: vitest_1.vi.fn(),
    findAll: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn()
};
const mockRitualRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findAll: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn()
};
// Mock the factory functions
vitest_1.vi.mock('../../infrastructure/repositories/factory', () => ({
    getFeedRepository: () => mockFeedRepo,
    getProfileRepository: () => mockProfileRepo,
    getSpaceRepository: () => mockSpaceRepo,
    getRitualRepository: () => mockRitualRepo
}));
(0, vitest_1.describe)('FeedGenerationService', () => {
    let service;
    (0, vitest_1.beforeEach)(() => {
        service = new feed_generation_service_1.FeedGenerationService({ campusId: 'ub-buffalo', userId: 'user_test_123' });
        vitest_1.vi.clearAllMocks();
    });
    // Helper to create a valid profile
    const createValidProfile = () => {
        const profileId = profile_id_value_1.ProfileId.create('profile_test_123').getValue();
        const email = ub_email_value_1.UBEmail.create('testuser@buffalo.edu').getValue();
        const handle = profile_handle_value_1.ProfileHandle.create('testuser').getValue();
        const userType = user_type_value_1.UserType.createStudent().getValue();
        const campusId = campus_id_value_1.CampusId.create('ub-buffalo').getValue();
        const privacy = profile_privacy_value_1.ProfilePrivacy.createPublic().getValue();
        return profile_aggregate_1.Profile.create({
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
    const createValidFeed = () => {
        const profileId = profile_id_value_1.ProfileId.create('profile_test_123').getValue();
        const campusId = campus_id_value_1.CampusId.create('ub-buffalo').getValue();
        return enhanced_feed_1.EnhancedFeed.create(profileId, campusId).getValue();
    };
    // Helper to create a valid feed item
    const createValidFeedItem = (overrides) => {
        const itemId = feed_item_id_value_1.FeedItemId.create(overrides?.id || 'item_test_123').getValue();
        const spaceId = space_id_value_1.SpaceId.create(overrides?.spaceId || 'space_123').getValue();
        // Create fake interactions if engagementCount is specified
        const interactions = [];
        if (overrides?.engagementCount) {
            for (let i = 0; i < overrides.engagementCount; i++) {
                const userId = profile_id_value_1.ProfileId.create(`user_${i}`).getValue();
                interactions.push({
                    type: 'like',
                    userId,
                    timestamp: new Date()
                });
            }
        }
        const feedItem = feed_item_1.FeedItem.create({
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
    (0, vitest_1.describe)('generateFeed()', () => {
        (0, vitest_1.it)('should successfully generate personalized feed', async () => {
            // Arrange
            const profile = createValidProfile();
            const feed = createValidFeed();
            const feedItems = [
                createValidFeedItem(),
                createValidFeedItem({ id: 'item_2' })
            ];
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(feed));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok([]));
            mockFeedRepo.getFeedContent.mockResolvedValue(Result_1.Result.ok(feedItems));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.generateFeed('profile_test_123');
            // Assert
            if (result.isFailure) {
                console.log('Test failed with error:', result.error);
            }
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const feedContent = result.getValue().data;
            (0, vitest_1.expect)(feedContent.items).toBeDefined();
            (0, vitest_1.expect)(feedContent.insights).toBeDefined();
            (0, vitest_1.expect)(feedContent.hasMore).toBeDefined();
        });
        (0, vitest_1.it)('should fail when user profile not found', async () => {
            // Arrange
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.fail('Not found'));
            // Act
            const result = await service.generateFeed('nonexistent');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('User profile not found');
        });
        (0, vitest_1.it)('should fail when feed not found', async () => {
            // Arrange
            const profile = createValidProfile();
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.fail('Feed not found'));
            // Act
            const result = await service.generateFeed('profile_test_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should apply content filtering options', async () => {
            // Arrange
            const profile = createValidProfile();
            const feed = createValidFeed();
            const feedItems = [createValidFeedItem()];
            const options = {
                includeSpacePosts: true,
                includeRSSPosts: false,
                includeEvents: true
            };
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(feed));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok([]));
            mockFeedRepo.getFeedContent.mockResolvedValue(Result_1.Result.ok(feedItems));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.generateFeed('profile_test_123', options);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should sort by recent when specified', async () => {
            // Arrange
            const profile = createValidProfile();
            const feed = createValidFeed();
            const oldItem = createValidFeedItem({ id: 'old', createdAt: new Date('2024-01-01') });
            const newItem = createValidFeedItem({ id: 'new', createdAt: new Date('2024-12-01') });
            const feedItems = [oldItem, newItem];
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(feed));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok([]));
            mockFeedRepo.getFeedContent.mockResolvedValue(Result_1.Result.ok(feedItems));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.generateFeed('profile_test_123', { sortBy: 'recent' });
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const items = result.getValue().data.items;
            (0, vitest_1.expect)(items[0].toData().id).toBe('new');
        });
        (0, vitest_1.it)('should sort by engagement when specified', async () => {
            // Arrange
            const profile = createValidProfile();
            const feed = createValidFeed();
            const lowEngagement = createValidFeedItem({ id: 'low', engagementCount: 5 });
            const highEngagement = createValidFeedItem({ id: 'high', engagementCount: 50 });
            const feedItems = [lowEngagement, highEngagement];
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(feed));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok([]));
            mockFeedRepo.getFeedContent.mockResolvedValue(Result_1.Result.ok(feedItems));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.generateFeed('profile_test_123', { sortBy: 'engagement' });
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const items = result.getValue().data.items;
            (0, vitest_1.expect)(items[0].toData().id).toBe('high');
        });
        (0, vitest_1.it)('should apply pagination with limit and offset', async () => {
            // Arrange
            const profile = createValidProfile();
            const feed = createValidFeed();
            const feedItems = Array(50).fill(null).map((_, i) => createValidFeedItem({ id: `item_${i}` }));
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(feed));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok([]));
            mockFeedRepo.getFeedContent.mockResolvedValue(Result_1.Result.ok(feedItems));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.generateFeed('profile_test_123', { limit: 10, offset: 20 });
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const feedContent = result.getValue().data;
            (0, vitest_1.expect)(feedContent.items.length).toBe(10);
            (0, vitest_1.expect)(feedContent.nextOffset).toBe(30);
            (0, vitest_1.expect)(feedContent.hasMore).toBe(true);
        });
        (0, vitest_1.it)('should update feed last accessed timestamp', async () => {
            // Arrange
            const profile = createValidProfile();
            const feed = createValidFeed();
            const feedItems = [createValidFeedItem()];
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(feed));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok([]));
            mockFeedRepo.getFeedContent.mockResolvedValue(Result_1.Result.ok(feedItems));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            await service.generateFeed('profile_test_123');
            // Assert
            (0, vitest_1.expect)(mockFeedRepo.saveFeed).toHaveBeenCalledWith(feed);
        });
    });
    (0, vitest_1.describe)('getTrendingFeed()', () => {
        (0, vitest_1.it)('should get trending content', async () => {
            // Arrange
            const trendingItems = [
                createValidFeedItem({ id: 'trending_1' }),
                createValidFeedItem({ id: 'trending_2' })
            ];
            mockFeedRepo.getTrendingContent.mockResolvedValue(Result_1.Result.ok(trendingItems));
            // Act
            const result = await service.getTrendingFeed(20);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockFeedRepo.getTrendingContent).toHaveBeenCalledWith('ub-buffalo', 20);
            (0, vitest_1.expect)(result.getValue().data.length).toBe(2);
        });
        (0, vitest_1.it)('should use default limit if not specified', async () => {
            // Arrange
            mockFeedRepo.getTrendingContent.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            await service.getTrendingFeed();
            // Assert
            (0, vitest_1.expect)(mockFeedRepo.getTrendingContent).toHaveBeenCalledWith('ub-buffalo', 20);
        });
        (0, vitest_1.it)('should fail when repository fails', async () => {
            // Arrange
            mockFeedRepo.getTrendingContent.mockResolvedValue(Result_1.Result.fail('Database error'));
            // Act
            const result = await service.getTrendingFeed();
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
    });
    (0, vitest_1.describe)('getEventsFeed()', () => {
        (0, vitest_1.it)('should get event-focused content', async () => {
            // Arrange
            const eventItems = [
                createValidFeedItem({ id: 'event_1', contentType: 'event' }),
                createValidFeedItem({ id: 'event_2', contentType: 'event' })
            ];
            mockFeedRepo.getEventContent.mockResolvedValue(Result_1.Result.ok(eventItems));
            // Act
            const result = await service.getEventsFeed(20);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockFeedRepo.getEventContent).toHaveBeenCalledWith('ub-buffalo', 20);
            (0, vitest_1.expect)(result.getValue().data.length).toBe(2);
        });
        (0, vitest_1.it)('should use default limit if not specified', async () => {
            // Arrange
            mockFeedRepo.getEventContent.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            await service.getEventsFeed();
            // Assert
            (0, vitest_1.expect)(mockFeedRepo.getEventContent).toHaveBeenCalledWith('ub-buffalo', 20);
        });
        (0, vitest_1.it)('should fail when repository fails', async () => {
            // Arrange
            mockFeedRepo.getEventContent.mockResolvedValue(Result_1.Result.fail('Database error'));
            // Act
            const result = await service.getEventsFeed();
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
    });
    (0, vitest_1.describe)('getRitualsFeed()', () => {
        (0, vitest_1.it)('should get ritual-focused content', async () => {
            // Arrange
            const ritualItems = [
                createValidFeedItem({ id: 'ritual_1', contentType: 'ritual' }),
                createValidFeedItem({ id: 'ritual_2', contentType: 'ritual' })
            ];
            mockFeedRepo.getRitualContent.mockResolvedValue(Result_1.Result.ok(ritualItems));
            // Act
            const result = await service.getRitualsFeed(20);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockFeedRepo.getRitualContent).toHaveBeenCalledWith('ub-buffalo', 20);
            (0, vitest_1.expect)(result.getValue().data.length).toBe(2);
        });
        (0, vitest_1.it)('should use default limit if not specified', async () => {
            // Arrange
            mockFeedRepo.getRitualContent.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            await service.getRitualsFeed();
            // Assert
            (0, vitest_1.expect)(mockFeedRepo.getRitualContent).toHaveBeenCalledWith('ub-buffalo', 20);
        });
        (0, vitest_1.it)('should fail when repository fails', async () => {
            // Arrange
            mockFeedRepo.getRitualContent.mockResolvedValue(Result_1.Result.fail('Database error'));
            // Act
            const result = await service.getRitualsFeed();
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
    });
    (0, vitest_1.describe)('recordInteraction()', () => {
        (0, vitest_1.it)('should successfully record view interaction', async () => {
            // Arrange
            mockFeedRepo.recordInteraction.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.recordInteraction('profile_test_123', 'item_123', 'view');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockFeedRepo.recordInteraction).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should adjust weights for positive interactions', async () => {
            // Arrange
            const feed = createValidFeed();
            mockFeedRepo.recordInteraction.mockResolvedValue(Result_1.Result.ok(undefined));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(feed));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.recordInteraction('profile_test_123', 'item_123', 'like');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockFeedRepo.saveFeed).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should adjust weights for negative interactions', async () => {
            // Arrange
            const feed = createValidFeed();
            mockFeedRepo.recordInteraction.mockResolvedValue(Result_1.Result.ok(undefined));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(feed));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.recordInteraction('profile_test_123', 'item_123', 'hide');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockFeedRepo.saveFeed).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle comment interactions', async () => {
            // Arrange
            const feed = createValidFeed();
            mockFeedRepo.recordInteraction.mockResolvedValue(Result_1.Result.ok(undefined));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(feed));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.recordInteraction('profile_test_123', 'item_123', 'comment');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should fail when repository fails', async () => {
            // Arrange
            mockFeedRepo.recordInteraction.mockResolvedValue(Result_1.Result.fail('Database error'));
            // Act
            const result = await service.recordInteraction('profile_test_123', 'item_123', 'view');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
    });
    (0, vitest_1.describe)('updateFeedPreferences()', () => {
        (0, vitest_1.it)('should update feed preferences', async () => {
            // Arrange
            const feed = createValidFeed();
            const preferences = {
                showSpacePosts: true,
                showRSSPosts: false,
                showEventPosts: true
            };
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(feed));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.updateFeedPreferences('profile_test_123', preferences);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockFeedRepo.saveFeed).toHaveBeenCalledWith(feed);
        });
        (0, vitest_1.it)('should fail when feed not found', async () => {
            // Arrange
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.fail('Feed not found'));
            // Act
            const result = await service.updateFeedPreferences('profile_test_123', {});
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should fail when save fails', async () => {
            // Arrange
            const feed = createValidFeed();
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(feed));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.fail('Save error'));
            // Act
            const result = await service.updateFeedPreferences('profile_test_123', {});
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
    });
    (0, vitest_1.describe)('subscribeToFeedUpdates()', () => {
        (0, vitest_1.it)('should subscribe to feed updates', () => {
            // Arrange
            const callback = vitest_1.vi.fn();
            const unsubscribe = vitest_1.vi.fn();
            mockFeedRepo.subscribeToFeed.mockReturnValue(unsubscribe);
            // Act
            const result = service.subscribeToFeedUpdates('profile_test_123', callback);
            // Assert
            (0, vitest_1.expect)(mockFeedRepo.subscribeToFeed).toHaveBeenCalled();
            (0, vitest_1.expect)(result).toBe(unsubscribe);
        });
    });
    (0, vitest_1.describe)('Real-world Scenarios', () => {
        (0, vitest_1.it)('should handle complete feed generation flow', async () => {
            // Arrange
            const profile = createValidProfile();
            const feed = createValidFeed();
            const feedItems = Array(30).fill(null).map((_, i) => createValidFeedItem({
                id: `item_${i}`,
                contentType: i % 3 === 0 ? 'event' : 'post',
                createdAt: new Date(Date.now() - i * 60000) // Different timestamps
            }));
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(feed));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok([]));
            mockFeedRepo.getFeedContent.mockResolvedValue(Result_1.Result.ok(feedItems));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.generateFeed('profile_test_123', {
                limit: 20,
                includeEvents: true,
                sortBy: 'algorithm'
            });
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const feedContent = result.getValue().data;
            (0, vitest_1.expect)(feedContent.items.length).toBe(20);
            (0, vitest_1.expect)(feedContent.hasMore).toBe(true);
            (0, vitest_1.expect)(feedContent.insights).toBeDefined();
        });
        (0, vitest_1.it)('should handle user interaction tracking workflow', async () => {
            // Arrange
            const feed = createValidFeed();
            mockFeedRepo.recordInteraction.mockResolvedValue(Result_1.Result.ok(undefined));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(feed));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act - User views, then likes a post
            const viewResult = await service.recordInteraction('profile_test_123', 'item_123', 'view');
            const likeResult = await service.recordInteraction('profile_test_123', 'item_123', 'like');
            // Assert
            (0, vitest_1.expect)(viewResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(likeResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockFeedRepo.recordInteraction).toHaveBeenCalledTimes(2);
        });
    });
});
//# sourceMappingURL=feed-generation.service.test.js.map