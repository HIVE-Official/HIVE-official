"use strict";
/**
 * Feed Generation Flow - Integration Test
 * Tests the feed generation, personalization, and content filtering integration between services and repositories
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const feed_generation_service_1 = require("../../application/feed-generation.service");
const Result_1 = require("../../domain/shared/base/Result");
// Mock Firebase
vitest_1.vi.mock('@hive/firebase', () => ({
    db: {},
    auth: {}
}));
vitest_1.vi.mock('firebase/firestore', () => ({
    collection: vitest_1.vi.fn(),
    doc: vitest_1.vi.fn(),
    getDoc: vitest_1.vi.fn(),
    getDocs: vitest_1.vi.fn(),
    setDoc: vitest_1.vi.fn(),
    updateDoc: vitest_1.vi.fn(),
    deleteDoc: vitest_1.vi.fn(),
    query: vitest_1.vi.fn(),
    where: vitest_1.vi.fn(),
    orderBy: vitest_1.vi.fn(),
    limit: vitest_1.vi.fn(),
    addDoc: vitest_1.vi.fn(),
    onSnapshot: vitest_1.vi.fn(),
    increment: vitest_1.vi.fn(),
    Timestamp: {
        now: vitest_1.vi.fn(() => ({ seconds: Date.now() / 1000, nanoseconds: 0 })),
        fromDate: vitest_1.vi.fn((date) => ({ seconds: date.getTime() / 1000, nanoseconds: 0 }))
    }
}));
// Create mock repositories
const mockFeedRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByUserId: vitest_1.vi.fn(),
    findByCampus: vitest_1.vi.fn(),
    saveFeed: vitest_1.vi.fn(),
    getFeedContent: vitest_1.vi.fn(),
    getTrendingContent: vitest_1.vi.fn(),
    getEventContent: vitest_1.vi.fn(),
    getRitualContent: vitest_1.vi.fn(),
    recordInteraction: vitest_1.vi.fn(),
    addFeedItem: vitest_1.vi.fn(),
    findAll: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn()
};
const mockProfileRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByHandle: vitest_1.vi.fn(),
    findByEmail: vitest_1.vi.fn(),
    findByCampus: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn()
};
const mockSpaceRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByType: vitest_1.vi.fn(),
    findTrending: vitest_1.vi.fn(),
    findByCategory: vitest_1.vi.fn(),
    findPublicSpaces: vitest_1.vi.fn(),
    searchSpaces: vitest_1.vi.fn(),
    addMember: vitest_1.vi.fn(),
    removeMember: vitest_1.vi.fn(),
    getMemberCount: vitest_1.vi.fn(),
    findMemberSpaces: vitest_1.vi.fn(),
    findByMember: vitest_1.vi.fn(),
    findAll: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn()
};
const mockRitualRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findActive: vitest_1.vi.fn(),
    findByParticipant: vitest_1.vi.fn(),
    findParticipation: vitest_1.vi.fn(),
    saveParticipation: vitest_1.vi.fn(),
    findLeaderboard: vitest_1.vi.fn(),
    subscribeToRitual: vitest_1.vi.fn(),
    subscribeToActiveRituals: vitest_1.vi.fn(),
    findAll: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn()
};
// Custom service class for testing that allows dependency injection
class TestFeedGenerationService extends feed_generation_service_1.FeedGenerationService {
    constructor(context, feedRepo, profileRepo, spaceRepo, ritualRepo) {
        super(context);
        // Override the repositories with our mocks
        this.feedRepo = feedRepo;
        this.profileRepo = profileRepo;
        this.spaceRepo = spaceRepo;
        this.ritualRepo = ritualRepo;
    }
}
(0, vitest_1.describe)('Feed Generation Flow - Integration', () => {
    let feedGenerationService;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        // Create test service with injected mock repositories
        feedGenerationService = new TestFeedGenerationService({ campusId: 'ub-buffalo' }, mockFeedRepo, mockProfileRepo, mockSpaceRepo, mockRitualRepo);
    });
    // Test data factory
    const createMockProfile = (overrides = {}) => ({
        id: 'profile_user_123',
        handle: 'johndoe',
        personalInfo: {
            firstName: 'John',
            lastName: 'Doe',
            major: 'Computer Science'
        },
        connections: ['profile_friend_1', 'profile_friend_2'],
        interests: ['Programming', 'Basketball'],
        ...overrides
    });
    const createMockFeed = (overrides = {}) => ({
        id: 'feed_user_123',
        userId: 'profile_user_123',
        preferences: {
            showSpacePosts: true,
            showRSSPosts: true,
            showConnectionActivity: true,
            showEvents: true,
            showRituals: true
        },
        lastAccessedAt: new Date(),
        updatePreferences: vitest_1.vi.fn(),
        applyContentFilters: vitest_1.vi.fn((items, filters) => items),
        generateInsights: vitest_1.vi.fn(() => ({
            primaryContentType: 'space_posts',
            engagementRate: 0.85,
            averageScore: 4.2,
            topSpaces: ['CS Study Group', 'Basketball Club'],
            suggestedAdjustments: ['More ritual content recommended']
        })),
        toData: () => ({
            id: 'feed_user_123',
            userId: 'profile_user_123',
            preferences: {
                showSpacePosts: true,
                showRSSPosts: true,
                showConnectionActivity: true,
                showEvents: true,
                showRituals: true
            }
        }),
        ...overrides
    });
    const createMockFeedItems = () => [
        {
            id: 'item_1',
            type: 'space_post',
            content: 'Check out this cool coding tutorial!',
            authorId: 'profile_friend_1',
            spaceId: 'space_cs_001',
            createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            engagementCount: 15,
            score: 4.5,
            toData: () => ({
                id: 'item_1',
                type: 'space_post',
                content: 'Check out this cool coding tutorial!',
                createdAt: new Date(Date.now() - 1000 * 60 * 30),
                engagementCount: 15
            })
        },
        {
            id: 'item_2',
            type: 'rss_post',
            content: 'Latest tech news from RSS feed',
            authorId: 'rss_techcrunch',
            spaceId: 'space_tech_news',
            createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
            engagementCount: 8,
            score: 3.8,
            toData: () => ({
                id: 'item_2',
                type: 'rss_post',
                content: 'Latest tech news from RSS feed',
                createdAt: new Date(Date.now() - 1000 * 60 * 60),
                engagementCount: 8
            })
        },
        {
            id: 'item_3',
            type: 'event',
            content: 'Basketball game tonight at 7 PM',
            authorId: 'profile_friend_2',
            spaceId: 'space_basketball',
            createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
            engagementCount: 25,
            score: 4.8,
            toData: () => ({
                id: 'item_3',
                type: 'event',
                content: 'Basketball game tonight at 7 PM',
                createdAt: new Date(Date.now() - 1000 * 60 * 15),
                engagementCount: 25
            })
        }
    ];
    const createMockSpaces = () => [
        { id: 'space_cs_001', name: 'CS Study Group' },
        { id: 'space_basketball', name: 'Basketball Club' },
        { id: 'space_tech_news', name: 'Tech News' }
    ];
    (0, vitest_1.describe)('Personalized Feed Generation Integration', () => {
        (0, vitest_1.it)('should generate personalized feed through repository layer', async () => {
            const mockProfile = createMockProfile();
            const mockFeed = createMockFeed();
            const mockSpaces = createMockSpaces();
            const mockFeedItems = createMockFeedItems();
            // Mock successful repository calls
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(mockProfile));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(mockFeed));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok(mockSpaces));
            mockFeedRepo.getFeedContent.mockResolvedValue(Result_1.Result.ok(mockFeedItems));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok());
            // Execute feed generation
            const result = await feedGenerationService.generateFeed('profile_user_123', {
                limit: 20,
                includeSpacePosts: true,
                includeRSSPosts: true,
                sortBy: 'algorithm'
            });
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockProfileRepo.findById).toHaveBeenCalledWith('profile_user_123');
            (0, vitest_1.expect)(mockFeedRepo.findByUserId).toHaveBeenCalled();
            (0, vitest_1.expect)(mockSpaceRepo.findByMember).toHaveBeenCalledWith('profile_user_123');
            (0, vitest_1.expect)(mockFeedRepo.getFeedContent).toHaveBeenCalledWith('profile_user_123', ['space_cs_001', 'space_basketball', 'space_tech_news'], ['profile_friend_1', 'profile_friend_2'], 20);
            (0, vitest_1.expect)(mockFeedRepo.saveFeed).toHaveBeenCalledWith(mockFeed);
            const feedContent = result.getValue();
            (0, vitest_1.expect)(feedContent.data.items).toHaveLength(3);
            (0, vitest_1.expect)(feedContent.data.insights).toBeDefined();
            (0, vitest_1.expect)(feedContent.data.insights.primaryContentType).toBe('space_posts');
            (0, vitest_1.expect)(feedContent.data.hasMore).toBe(false);
            (0, vitest_1.expect)(feedContent.metadata?.totalCount).toBe(3);
        });
        (0, vitest_1.it)('should handle profile not found during feed generation', async () => {
            // Mock profile not found
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.fail('User profile not found'));
            // Execute feed generation
            const result = await feedGenerationService.generateFeed('nonexistent_user');
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('User profile not found');
            // Verify no further repository calls were made
            (0, vitest_1.expect)(mockFeedRepo.findByUserId).not.toHaveBeenCalled();
            (0, vitest_1.expect)(mockSpaceRepo.findByMember).not.toHaveBeenCalled();
            (0, vitest_1.expect)(mockFeedRepo.getFeedContent).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle feed repository errors gracefully', async () => {
            const mockProfile = createMockProfile();
            // Mock profile found but feed repository error
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(mockProfile));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.fail('Feed service unavailable'));
            // Execute feed generation
            const result = await feedGenerationService.generateFeed('profile_user_123');
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Feed service unavailable');
            // Verify profile was retrieved but further operations stopped
            (0, vitest_1.expect)(mockProfileRepo.findById).toHaveBeenCalled();
            (0, vitest_1.expect)(mockFeedRepo.findByUserId).toHaveBeenCalled();
            (0, vitest_1.expect)(mockFeedRepo.getFeedContent).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('Feed Content Filtering Integration', () => {
        (0, vitest_1.it)('should apply content filters through domain logic', async () => {
            const mockProfile = createMockProfile();
            const mockFeed = createMockFeed();
            const mockSpaces = createMockSpaces();
            const mockFeedItems = createMockFeedItems();
            // Setup mocks
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(mockProfile));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(mockFeed));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok(mockSpaces));
            mockFeedRepo.getFeedContent.mockResolvedValue(Result_1.Result.ok(mockFeedItems));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok());
            // Mock feed to filter out RSS posts
            mockFeed.applyContentFilters.mockImplementation((items, filters) => {
                if (filters.includeRSSPosts === false) {
                    return items.filter((item) => item.type !== 'rss_post');
                }
                return items;
            });
            // Execute feed generation with filters
            const result = await feedGenerationService.generateFeed('profile_user_123', {
                includeSpacePosts: true,
                includeRSSPosts: false,
                includeEvents: true
            });
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockFeed.applyContentFilters).toHaveBeenCalledWith(mockFeedItems, vitest_1.expect.objectContaining({
                includeSpacePosts: true,
                includeRSSPosts: false,
                includeEvents: true
            }));
            // Since applyContentFilters is mocked to filter out RSS posts
            const feedContent = result.getValue();
            (0, vitest_1.expect)(feedContent.data.items).toHaveLength(2); // RSS post filtered out
        });
        (0, vitest_1.it)('should sort content based on options', async () => {
            const mockProfile = createMockProfile();
            const mockFeed = createMockFeed();
            const mockSpaces = createMockSpaces();
            const mockFeedItems = createMockFeedItems();
            // Setup mocks
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(mockProfile));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(mockFeed));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok(mockSpaces));
            mockFeedRepo.getFeedContent.mockResolvedValue(Result_1.Result.ok(mockFeedItems));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok());
            // Execute feed generation with engagement sorting
            const result = await feedGenerationService.generateFeed('profile_user_123', {
                sortBy: 'engagement'
            });
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const feedContent = result.getValue();
            const items = feedContent.data.items;
            // Verify items are sorted by engagement (highest first)
            // item_3 (25), item_1 (15), item_2 (8)
            (0, vitest_1.expect)(items[0].toData().engagementCount).toBe(25);
            (0, vitest_1.expect)(items[1].toData().engagementCount).toBe(15);
            (0, vitest_1.expect)(items[2].toData().engagementCount).toBe(8);
        });
    });
    (0, vitest_1.describe)('Trending Feed Integration', () => {
        (0, vitest_1.it)('should get trending content through repository layer', async () => {
            const mockTrendingItems = [
                {
                    id: 'trending_1',
                    type: 'space_post',
                    content: 'Viral campus event announcement',
                    engagementCount: 150,
                    score: 4.9
                },
                {
                    id: 'trending_2',
                    type: 'event',
                    content: 'Popular basketball tournament',
                    engagementCount: 120,
                    score: 4.7
                }
            ];
            // Mock successful repository call
            mockFeedRepo.getTrendingContent.mockResolvedValue(Result_1.Result.ok(mockTrendingItems));
            // Execute trending feed retrieval
            const result = await feedGenerationService.getTrendingFeed(10);
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockFeedRepo.getTrendingContent).toHaveBeenCalledWith('ub-buffalo', 10);
            const trendingContent = result.getValue();
            (0, vitest_1.expect)(trendingContent.data).toHaveLength(2);
            (0, vitest_1.expect)(trendingContent.metadata?.totalCount).toBe(2);
        });
        (0, vitest_1.it)('should handle trending content repository errors', async () => {
            // Mock repository error
            mockFeedRepo.getTrendingContent.mockResolvedValue(Result_1.Result.fail('Trending service down'));
            // Execute trending feed retrieval
            const result = await feedGenerationService.getTrendingFeed(10);
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Trending service down');
        });
    });
    (0, vitest_1.describe)('Events Feed Integration', () => {
        (0, vitest_1.it)('should get events content through repository layer', async () => {
            const mockEventItems = [
                {
                    id: 'event_1',
                    type: 'event',
                    content: 'Career fair next week',
                    eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    location: 'Student Union'
                },
                {
                    id: 'event_2',
                    type: 'event',
                    content: 'Study group session',
                    eventDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                    location: 'Library'
                }
            ];
            // Mock successful repository call
            mockFeedRepo.getEventContent.mockResolvedValue(Result_1.Result.ok(mockEventItems));
            // Execute events feed retrieval
            const result = await feedGenerationService.getEventsFeed(15);
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockFeedRepo.getEventContent).toHaveBeenCalledWith('ub-buffalo', 15);
            const eventsContent = result.getValue();
            (0, vitest_1.expect)(eventsContent.data).toHaveLength(2);
            (0, vitest_1.expect)(eventsContent.metadata?.totalCount).toBe(2);
        });
        (0, vitest_1.it)('should handle events content repository errors', async () => {
            // Mock repository error
            mockFeedRepo.getEventContent.mockResolvedValue(Result_1.Result.fail('Events service offline'));
            // Execute events feed retrieval
            const result = await feedGenerationService.getEventsFeed(15);
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Events service offline');
        });
    });
    (0, vitest_1.describe)('Rituals Feed Integration', () => {
        (0, vitest_1.it)('should get rituals content through repository layer', async () => {
            const mockRitualItems = [
                {
                    id: 'ritual_1',
                    type: 'ritual',
                    content: 'Daily wellness check-in',
                    ritualType: 'anticipatory',
                    participantCount: 245
                },
                {
                    id: 'ritual_2',
                    type: 'ritual',
                    content: 'Study streak challenge',
                    ritualType: 'short',
                    participantCount: 189
                }
            ];
            // Mock successful repository call
            mockFeedRepo.getRitualContent.mockResolvedValue(Result_1.Result.ok(mockRitualItems));
            // Execute rituals feed retrieval
            const result = await feedGenerationService.getRitualsFeed(12);
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockFeedRepo.getRitualContent).toHaveBeenCalledWith('ub-buffalo', 12);
            const ritualsContent = result.getValue();
            (0, vitest_1.expect)(ritualsContent.data).toHaveLength(2);
            (0, vitest_1.expect)(ritualsContent.metadata?.totalCount).toBe(2);
        });
        (0, vitest_1.it)('should handle rituals content repository errors', async () => {
            // Mock repository error
            mockFeedRepo.getRitualContent.mockResolvedValue(Result_1.Result.fail('Rituals service maintenance'));
            // Execute rituals feed retrieval
            const result = await feedGenerationService.getRitualsFeed(12);
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Rituals service maintenance');
        });
    });
    (0, vitest_1.describe)('Repository Integration Coordination', () => {
        (0, vitest_1.it)('should coordinate multiple repository calls in feed generation', async () => {
            const mockProfile = createMockProfile();
            const mockFeed = createMockFeed();
            const mockSpaces = createMockSpaces();
            const mockFeedItems = createMockFeedItems();
            // Mock all repository operations
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(mockProfile));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(mockFeed));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok(mockSpaces));
            mockFeedRepo.getFeedContent.mockResolvedValue(Result_1.Result.ok(mockFeedItems));
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok());
            // Execute feed generation
            const result = await feedGenerationService.generateFeed('profile_user_123');
            // Verify all repositories were called
            (0, vitest_1.expect)(mockProfileRepo.findById).toHaveBeenCalled();
            (0, vitest_1.expect)(mockFeedRepo.findByUserId).toHaveBeenCalled();
            (0, vitest_1.expect)(mockSpaceRepo.findByMember).toHaveBeenCalled();
            (0, vitest_1.expect)(mockFeedRepo.getFeedContent).toHaveBeenCalled();
            (0, vitest_1.expect)(mockFeedRepo.saveFeed).toHaveBeenCalled();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should handle partial repository failures gracefully', async () => {
            const mockProfile = createMockProfile();
            const mockFeed = createMockFeed();
            // Mock profile and feed found but spaces lookup fails
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(mockProfile));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.ok(mockFeed));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.fail('Spaces service down'));
            // Execute feed generation
            const result = await feedGenerationService.generateFeed('profile_user_123');
            // Service should handle spaces failure gracefully and continue with empty spaces
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockProfileRepo.findById).toHaveBeenCalled();
            (0, vitest_1.expect)(mockFeedRepo.findByUserId).toHaveBeenCalled();
            (0, vitest_1.expect)(mockSpaceRepo.findByMember).toHaveBeenCalled();
            // getFeedContent should be called with empty spaces array due to spaces service failure
            (0, vitest_1.expect)(mockFeedRepo.getFeedContent).toHaveBeenCalledWith('profile_user_123', [], // Empty spaces due to service failure
            ['profile_friend_1', 'profile_friend_2'], 20);
        });
    });
});
//# sourceMappingURL=feed-generation-flow.integration.test.js.map