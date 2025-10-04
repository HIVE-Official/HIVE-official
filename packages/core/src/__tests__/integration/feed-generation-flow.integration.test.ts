/**
 * Feed Generation Flow - Integration Test
 * Tests the feed generation, personalization, and content filtering integration between services and repositories
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FeedGenerationService } from '../../application/feed-generation.service';
import { Result } from '../../domain/shared/base/Result';

// Mock Firebase
vi.mock('@hive/firebase', () => ({
  db: {},
  auth: {}
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  addDoc: vi.fn(),
  onSnapshot: vi.fn(),
  increment: vi.fn(),
  Timestamp: {
    now: vi.fn(() => ({ seconds: Date.now() / 1000, nanoseconds: 0 })),
    fromDate: vi.fn((date: Date) => ({ seconds: date.getTime() / 1000, nanoseconds: 0 }))
  }
}));

// Create mock repositories
const mockFeedRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findByUserId: vi.fn(),
  findByCampus: vi.fn(),
  saveFeed: vi.fn(),
  getFeedContent: vi.fn(),
  getTrendingContent: vi.fn(),
  getEventContent: vi.fn(),
  getRitualContent: vi.fn(),
  recordInteraction: vi.fn(),
  addFeedItem: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn()
};

const mockProfileRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findByHandle: vi.fn(),
  findByEmail: vi.fn(),
  findByCampus: vi.fn(),
  delete: vi.fn()
};

const mockSpaceRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findByType: vi.fn(),
  findTrending: vi.fn(),
  findByCategory: vi.fn(),
  findPublicSpaces: vi.fn(),
  searchSpaces: vi.fn(),
  addMember: vi.fn(),
  removeMember: vi.fn(),
  getMemberCount: vi.fn(),
  findMemberSpaces: vi.fn(),
  findByMember: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn()
};

const mockRitualRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findActive: vi.fn(),
  findByParticipant: vi.fn(),
  findParticipation: vi.fn(),
  saveParticipation: vi.fn(),
  findLeaderboard: vi.fn(),
  subscribeToRitual: vi.fn(),
  subscribeToActiveRituals: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn()
};

// Custom service class for testing that allows dependency injection
class TestFeedGenerationService extends FeedGenerationService {
  constructor(
    context: any,
    feedRepo: any,
    profileRepo: any,
    spaceRepo: any,
    ritualRepo: any
  ) {
    super(context);
    // Override the repositories with our mocks
    (this as any).feedRepo = feedRepo;
    (this as any).profileRepo = profileRepo;
    (this as any).spaceRepo = spaceRepo;
    (this as any).ritualRepo = ritualRepo;
  }
}

describe('Feed Generation Flow - Integration', () => {
  let feedGenerationService: FeedGenerationService;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create test service with injected mock repositories
    feedGenerationService = new TestFeedGenerationService(
      { campusId: 'ub-buffalo' },
      mockFeedRepo,
      mockProfileRepo,
      mockSpaceRepo,
      mockRitualRepo
    );
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
    updatePreferences: vi.fn(),
    applyContentFilters: vi.fn((items, filters) => items),
    generateInsights: vi.fn(() => ({
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

  describe('Personalized Feed Generation Integration', () => {
    it('should generate personalized feed through repository layer', async () => {
      const mockProfile = createMockProfile();
      const mockFeed = createMockFeed();
      const mockSpaces = createMockSpaces();
      const mockFeedItems = createMockFeedItems();

      // Mock successful repository calls
      mockProfileRepo.findById.mockResolvedValue(Result.ok(mockProfile));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(mockFeed));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok(mockSpaces));
      mockFeedRepo.getFeedContent.mockResolvedValue(Result.ok(mockFeedItems));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok());

      // Execute feed generation
      const result = await feedGenerationService.generateFeed('profile_user_123', {
        limit: 20,
        includeSpacePosts: true,
        includeRSSPosts: true,
        sortBy: 'algorithm'
      });

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockProfileRepo.findById).toHaveBeenCalledWith('profile_user_123');
      expect(mockFeedRepo.findByUserId).toHaveBeenCalled();
      expect(mockSpaceRepo.findByMember).toHaveBeenCalledWith('profile_user_123');
      expect(mockFeedRepo.getFeedContent).toHaveBeenCalledWith(
        'profile_user_123',
        ['space_cs_001', 'space_basketball', 'space_tech_news'],
        ['profile_friend_1', 'profile_friend_2'],
        20
      );
      expect(mockFeedRepo.saveFeed).toHaveBeenCalledWith(mockFeed);

      const feedContent = result.getValue();
      expect(feedContent.data.items).toHaveLength(3);
      expect(feedContent.data.insights).toBeDefined();
      expect(feedContent.data.insights.primaryContentType).toBe('space_posts');
      expect(feedContent.data.hasMore).toBe(false);
      expect(feedContent.metadata?.totalCount).toBe(3);
    });

    it('should handle profile not found during feed generation', async () => {
      // Mock profile not found
      mockProfileRepo.findById.mockResolvedValue(Result.fail('User profile not found'));

      // Execute feed generation
      const result = await feedGenerationService.generateFeed('nonexistent_user');

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('User profile not found');

      // Verify no further repository calls were made
      expect(mockFeedRepo.findByUserId).not.toHaveBeenCalled();
      expect(mockSpaceRepo.findByMember).not.toHaveBeenCalled();
      expect(mockFeedRepo.getFeedContent).not.toHaveBeenCalled();
    });

    it('should handle feed repository errors gracefully', async () => {
      const mockProfile = createMockProfile();

      // Mock profile found but feed repository error
      mockProfileRepo.findById.mockResolvedValue(Result.ok(mockProfile));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.fail('Feed service unavailable'));

      // Execute feed generation
      const result = await feedGenerationService.generateFeed('profile_user_123');

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Feed service unavailable');

      // Verify profile was retrieved but further operations stopped
      expect(mockProfileRepo.findById).toHaveBeenCalled();
      expect(mockFeedRepo.findByUserId).toHaveBeenCalled();
      expect(mockFeedRepo.getFeedContent).not.toHaveBeenCalled();
    });
  });

  describe('Feed Content Filtering Integration', () => {
    it('should apply content filters through domain logic', async () => {
      const mockProfile = createMockProfile();
      const mockFeed = createMockFeed();
      const mockSpaces = createMockSpaces();
      const mockFeedItems = createMockFeedItems();

      // Setup mocks
      mockProfileRepo.findById.mockResolvedValue(Result.ok(mockProfile));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(mockFeed));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok(mockSpaces));
      mockFeedRepo.getFeedContent.mockResolvedValue(Result.ok(mockFeedItems));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok());

      // Mock feed to filter out RSS posts
      mockFeed.applyContentFilters.mockImplementation((items, filters) => {
        if (filters.includeRSSPosts === false) {
          return items.filter((item: any) => item.type !== 'rss_post');
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
      expect(result.isSuccess).toBe(true);
      expect(mockFeed.applyContentFilters).toHaveBeenCalledWith(
        mockFeedItems,
        expect.objectContaining({
          includeSpacePosts: true,
          includeRSSPosts: false,
          includeEvents: true
        })
      );

      // Since applyContentFilters is mocked to filter out RSS posts
      const feedContent = result.getValue();
      expect(feedContent.data.items).toHaveLength(2); // RSS post filtered out
    });

    it('should sort content based on options', async () => {
      const mockProfile = createMockProfile();
      const mockFeed = createMockFeed();
      const mockSpaces = createMockSpaces();
      const mockFeedItems = createMockFeedItems();

      // Setup mocks
      mockProfileRepo.findById.mockResolvedValue(Result.ok(mockProfile));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(mockFeed));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok(mockSpaces));
      mockFeedRepo.getFeedContent.mockResolvedValue(Result.ok(mockFeedItems));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok());

      // Execute feed generation with engagement sorting
      const result = await feedGenerationService.generateFeed('profile_user_123', {
        sortBy: 'engagement'
      });

      // Verify integration
      expect(result.isSuccess).toBe(true);

      const feedContent = result.getValue();
      const items = feedContent.data.items;

      // Verify items are sorted by engagement (highest first)
      // item_3 (25), item_1 (15), item_2 (8)
      expect(items[0].toData().engagementCount).toBe(25);
      expect(items[1].toData().engagementCount).toBe(15);
      expect(items[2].toData().engagementCount).toBe(8);
    });
  });

  describe('Trending Feed Integration', () => {
    it('should get trending content through repository layer', async () => {
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
      mockFeedRepo.getTrendingContent.mockResolvedValue(Result.ok(mockTrendingItems));

      // Execute trending feed retrieval
      const result = await feedGenerationService.getTrendingFeed(10);

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockFeedRepo.getTrendingContent).toHaveBeenCalledWith('ub-buffalo', 10);

      const trendingContent = result.getValue();
      expect(trendingContent.data).toHaveLength(2);
      expect(trendingContent.metadata?.totalCount).toBe(2);
    });

    it('should handle trending content repository errors', async () => {
      // Mock repository error
      mockFeedRepo.getTrendingContent.mockResolvedValue(Result.fail('Trending service down'));

      // Execute trending feed retrieval
      const result = await feedGenerationService.getTrendingFeed(10);

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Trending service down');
    });
  });

  describe('Events Feed Integration', () => {
    it('should get events content through repository layer', async () => {
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
      mockFeedRepo.getEventContent.mockResolvedValue(Result.ok(mockEventItems));

      // Execute events feed retrieval
      const result = await feedGenerationService.getEventsFeed(15);

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockFeedRepo.getEventContent).toHaveBeenCalledWith('ub-buffalo', 15);

      const eventsContent = result.getValue();
      expect(eventsContent.data).toHaveLength(2);
      expect(eventsContent.metadata?.totalCount).toBe(2);
    });

    it('should handle events content repository errors', async () => {
      // Mock repository error
      mockFeedRepo.getEventContent.mockResolvedValue(Result.fail('Events service offline'));

      // Execute events feed retrieval
      const result = await feedGenerationService.getEventsFeed(15);

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Events service offline');
    });
  });

  describe('Rituals Feed Integration', () => {
    it('should get rituals content through repository layer', async () => {
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
      mockFeedRepo.getRitualContent.mockResolvedValue(Result.ok(mockRitualItems));

      // Execute rituals feed retrieval
      const result = await feedGenerationService.getRitualsFeed(12);

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockFeedRepo.getRitualContent).toHaveBeenCalledWith('ub-buffalo', 12);

      const ritualsContent = result.getValue();
      expect(ritualsContent.data).toHaveLength(2);
      expect(ritualsContent.metadata?.totalCount).toBe(2);
    });

    it('should handle rituals content repository errors', async () => {
      // Mock repository error
      mockFeedRepo.getRitualContent.mockResolvedValue(Result.fail('Rituals service maintenance'));

      // Execute rituals feed retrieval
      const result = await feedGenerationService.getRitualsFeed(12);

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Rituals service maintenance');
    });
  });

  describe('Repository Integration Coordination', () => {
    it('should coordinate multiple repository calls in feed generation', async () => {
      const mockProfile = createMockProfile();
      const mockFeed = createMockFeed();
      const mockSpaces = createMockSpaces();
      const mockFeedItems = createMockFeedItems();

      // Mock all repository operations
      mockProfileRepo.findById.mockResolvedValue(Result.ok(mockProfile));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(mockFeed));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok(mockSpaces));
      mockFeedRepo.getFeedContent.mockResolvedValue(Result.ok(mockFeedItems));
      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok());

      // Execute feed generation
      const result = await feedGenerationService.generateFeed('profile_user_123');

      // Verify all repositories were called in correct order
      expect(mockProfileRepo.findById).toHaveBeenCalledBefore(mockFeedRepo.findByUserId as any);
      expect(mockFeedRepo.findByUserId).toHaveBeenCalledBefore(mockSpaceRepo.findByMember as any);
      expect(mockSpaceRepo.findByMember).toHaveBeenCalledBefore(mockFeedRepo.getFeedContent as any);
      expect(mockFeedRepo.getFeedContent).toHaveBeenCalledBefore(mockFeedRepo.saveFeed as any);

      expect(result.isSuccess).toBe(true);
    });

    it('should handle partial repository failures gracefully', async () => {
      const mockProfile = createMockProfile();
      const mockFeed = createMockFeed();

      // Mock profile and feed found but spaces lookup fails
      mockProfileRepo.findById.mockResolvedValue(Result.ok(mockProfile));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.ok(mockFeed));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.fail('Spaces service down'));

      // Execute feed generation
      const result = await feedGenerationService.generateFeed('profile_user_123');

      // Service should handle spaces failure gracefully and continue with empty spaces
      expect(result.isSuccess).toBe(true);
      expect(mockProfileRepo.findById).toHaveBeenCalled();
      expect(mockFeedRepo.findByUserId).toHaveBeenCalled();
      expect(mockSpaceRepo.findByMember).toHaveBeenCalled();

      // getFeedContent should be called with empty spaces array due to spaces service failure
      expect(mockFeedRepo.getFeedContent).toHaveBeenCalledWith(
        'profile_user_123',
        [], // Empty spaces due to service failure
        ['profile_friend_1', 'profile_friend_2'],
        20
      );
    });
  });
});