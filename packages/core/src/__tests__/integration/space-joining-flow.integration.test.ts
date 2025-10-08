/**
 * Space Joining Flow - Integration Test
 * Tests the space discovery and joining integration between services and repositories
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SpaceDiscoveryService } from '../../application/space-discovery.service';
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

// Mock repository factory
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
  findAll: vi.fn(),
  delete: vi.fn(),
  // Missing methods required by ISpaceRepository
  findByName: vi.fn(),
  findByCampus: vi.fn(),
  findUserSpaces: vi.fn(),
  findByMember: vi.fn(),
  findRecommended: vi.fn()
};

const mockProfileRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findByHandle: vi.fn(),
  findByEmail: vi.fn(),
  findByCampus: vi.fn(),
  delete: vi.fn(),
  // Missing methods required by IProfileRepository
  findOnboardedProfiles: vi.fn(),
  findByInterest: vi.fn(),
  findByMajor: vi.fn(),
  findConnectionsOf: vi.fn(),
  findByUserType: vi.fn(),
  findByGraduationYear: vi.fn(),
  findAll: vi.fn(),
  getTotalCampusUsers: vi.fn(),
  exists: vi.fn(),
  searchByName: vi.fn()
};

const mockFeedRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findByUserId: vi.fn(),
  addFeedItem: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn(),
  // Missing methods required by IFeedRepository
  findByCampus: vi.fn(),
  saveFeed: vi.fn(),
  getFeedContent: vi.fn(),
  getTrendingContent: vi.fn(),
  getPersonalizedFeed: vi.fn(),
  cacheFeed: vi.fn(),
  invalidateFeedCache: vi.fn(),
  subscribeToCampusFeed: vi.fn(),
  subscribeToPersonalFeed: vi.fn()
  ,
  getEventContent: vi.fn(),
  getRitualContent: vi.fn(),
  recordInteraction: vi.fn(),
  removeFeedItem: vi.fn(),
  subscribeToFeed: vi.fn()
};

describe('Space Joining Flow - Integration', () => {
  let spaceDiscoveryService: SpaceDiscoveryService;

  beforeEach(() => {
    vi.clearAllMocks();

    spaceDiscoveryService = new SpaceDiscoveryService(
      { campusId: 'ub-buffalo' },
      mockSpaceRepo,
      mockProfileRepo,
      mockFeedRepo
    );
  });

  // Test data factory
  const createMockSpace = (overrides = {}) => ({
    id: { id: 'space_cs_001' },
    name: { name: 'Computer Science Students' },
    description: { description: 'A community for CS students at UB' },
    category: { category: 'academic' },
    spaceType: { type: 'general' },
    isPublic: true,
    isActive: true,
    createdAt: new Date(),
    getMemberCount: () => 245,
    canUserJoin: () => true,
    addMember: vi.fn(),
    role: 'member',
    toData: () => ({
      id: 'space_cs_001',
      name: 'Computer Science Students',
      description: 'A community for CS students at UB',
      category: 'academic',
      memberCount: 245,
      isPublic: true,
      isActive: true
    }),
    ...overrides
  });

  describe('Space Discovery Integration', () => {
    it('should discover public spaces through repository layer', async () => {
      const mockSpaces = [
        createMockSpace({ id: { id: 'space_cs_001' }, name: { name: 'CS Students' } }),
        createMockSpace({ id: { id: 'space_math_002' }, name: { name: 'Math Club' } })
      ];

      // Mock repository response for default discovery (public spaces)
      mockSpaceRepo.findPublicSpaces.mockResolvedValue(Result.ok(mockSpaces));

      // Execute space discovery
      const result = await spaceDiscoveryService.discoverSpaces({});

      // Verify integration worked
      expect(result.isSuccess).toBe(true);
      expect(mockSpaceRepo.findPublicSpaces).toHaveBeenCalledWith('ub-buffalo');

      const serviceResult = result.getValue();
      expect(serviceResult.data).toHaveLength(2);
    });

    it('should discover trending spaces through repository integration', async () => {
      const mockTrendingSpaces = [
        createMockSpace({
          id: { id: 'space_trending_001' },
          name: { name: 'Popular Space' },
          getMemberCount: () => 500
        })
      ];

      // Mock repository response for trending
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok(mockTrendingSpaces));

      // Execute trending spaces discovery
      const result = await spaceDiscoveryService.discoverSpaces({ sortBy: 'trending' });

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockSpaceRepo.findTrending).toHaveBeenCalledWith('ub-buffalo');

      const serviceResult = result.getValue();
      expect(serviceResult.data).toHaveLength(1);
    });

    it('should handle search queries through repository integration', async () => {
      const mockSearchResults = [
        createMockSpace({ name: { name: 'Computer Science Students' } })
      ];

      // Mock search functionality
      mockSpaceRepo.searchSpaces.mockResolvedValue(Result.ok(mockSearchResults));

      // Execute search-based discovery
      const result = await spaceDiscoveryService.discoverSpaces({
        searchQuery: 'computer science'
      });

      // Verify search integration
      expect(result.isSuccess).toBe(true);
      expect(mockSpaceRepo.searchSpaces).toHaveBeenCalledWith('computer science', 'ub-buffalo');

      const serviceResult = result.getValue();
      expect(serviceResult.data).toHaveLength(1);
    });

    it('should handle repository errors gracefully', async () => {
      // Mock repository error
      mockSpaceRepo.findPublicSpaces.mockResolvedValue(Result.fail('Database connection failed'));

      // Execute space discovery
      const result = await spaceDiscoveryService.discoverSpaces({});

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Database connection failed');
    });
  });

  describe('Space Recommendation Integration', () => {
    it('should get recommended spaces based on user profile', async () => {
      const mockProfile = {
        id: { id: 'profile_user_123' },
        interests: ['Coding', 'Basketball'],
        personalInfo: { major: 'Computer Science' }
      };

      const mockRecommendedSpaces = [
        createMockSpace({ name: { name: 'CS Study Group' } }),
        createMockSpace({ name: { name: 'Basketball Club' } })
      ];

      // Mock profile and space lookups
      mockProfileRepo.findById.mockResolvedValue(Result.ok(mockProfile));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok(mockRecommendedSpaces));

      // Execute recommendation
      const result = await spaceDiscoveryService.getRecommendedSpaces('profile_user_123');

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockProfileRepo.findById).toHaveBeenCalled();
      expect(mockSpaceRepo.findByType).toHaveBeenCalled();

      const serviceResult = result.getValue();
      expect(serviceResult.data).toHaveLength(2);
    });

    it('should handle profile not found error', async () => {
      // Mock profile not found
      mockProfileRepo.findById.mockResolvedValue(Result.fail('Profile not found'));

      // Execute recommendation
      const result = await spaceDiscoveryService.getRecommendedSpaces('nonexistent_user');

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Profile not found');
    });
  });

  describe('Space Joining Integration', () => {
    it('should join space through repository layer', async () => {
      const mockSpace = createMockSpace();
      const mockProfile = {
        id: { id: 'profile_user_123' },
        handle: { value: 'johndoe' }
      };

      // Mock successful lookups
      mockSpaceRepo.findById.mockResolvedValue(Result.ok(mockSpace));
      mockProfileRepo.findById.mockResolvedValue(Result.ok(mockProfile));
      mockSpaceRepo.addMember.mockResolvedValue(Result.ok());

      // Execute space joining
      const result = await spaceDiscoveryService.joinSpace('profile_user_123', 'space_cs_001');

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockSpaceRepo.findById).toHaveBeenCalled();
      expect(mockProfileRepo.findById).toHaveBeenCalled();
      expect(mockSpaceRepo.addMember).toHaveBeenCalled();

      const joinResult = result.getValue();
      expect(joinResult.data.space).toBeDefined();
      expect(joinResult.data.role).toBe('member');
      expect(joinResult.data.suggestedActions).toBeDefined();
    });

    it('should handle space not found during joining', async () => {
      // Mock space not found
      mockSpaceRepo.findById.mockResolvedValue(Result.fail('Space not found'));

      // Execute space joining
      const result = await spaceDiscoveryService.joinSpace('profile_user_123', 'nonexistent_space');

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Space not found');

      // Verify no member addition was attempted
      expect(mockSpaceRepo.addMember).not.toHaveBeenCalled();
    });

    it('should handle profile not found during joining', async () => {
      const mockSpace = createMockSpace();

      // Mock space found but profile not found
      mockSpaceRepo.findById.mockResolvedValue(Result.ok(mockSpace));
      mockProfileRepo.findById.mockResolvedValue(Result.fail('Profile not found'));

      // Execute space joining
      const result = await spaceDiscoveryService.joinSpace('nonexistent_user', 'space_cs_001');

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Profile not found');

      // Verify no member addition was attempted
      expect(mockSpaceRepo.addMember).not.toHaveBeenCalled();
    });
  });

  describe('Space Leaving Integration', () => {
    it('should leave space through repository layer', async () => {
      const mockSpace = createMockSpace();
      const mockProfile = {
        id: { id: 'profile_user_123' },
        handle: { value: 'johndoe' }
      };

      // Mock successful lookups
      mockSpaceRepo.findById.mockResolvedValue(Result.ok(mockSpace));
      mockProfileRepo.findById.mockResolvedValue(Result.ok(mockProfile));
      mockSpaceRepo.removeMember.mockResolvedValue(Result.ok());

      // Execute space leaving
      const result = await spaceDiscoveryService.leaveSpace('profile_user_123', 'space_cs_001');

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockSpaceRepo.findById).toHaveBeenCalled();
      expect(mockProfileRepo.findById).toHaveBeenCalled();
      expect(mockSpaceRepo.removeMember).toHaveBeenCalled();
    });

    it('should handle errors during space leaving', async () => {
      // Mock space not found
      mockSpaceRepo.findById.mockResolvedValue(Result.fail('Space not found'));

      // Execute space leaving
      const result = await spaceDiscoveryService.leaveSpace('profile_user_123', 'nonexistent_space');

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Space not found');

      // Verify no member removal was attempted
      expect(mockSpaceRepo.removeMember).not.toHaveBeenCalled();
    });
  });

  describe('Space Activity Integration', () => {
    it('should get space activity through repository layer', async () => {
      const mockSpace = createMockSpace();
      const mockActivity = {
        recentPosts: [
          { id: 'post_1', content: 'Hello world', authorName: 'John', timestamp: new Date() }
        ],
        activeMembers: 25,
        todaysPosts: 5,
        trendingTopics: ['coding', 'homework']
      };

      // Mock space lookup and activity data
      mockSpaceRepo.findById.mockResolvedValue(Result.ok(mockSpace));

      // Execute activity retrieval
      const result = await spaceDiscoveryService.getSpaceActivity('space_cs_001');

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockSpaceRepo.findById).toHaveBeenCalled();

      const activityResult = result.getValue();
      expect(activityResult.data.spaceId).toBe('space_cs_001');
      expect(activityResult.data.recentPosts).toBeDefined();
      expect(activityResult.data.activeMembers).toBeDefined();
    });

    it('should handle space not found during activity retrieval', async () => {
      // Mock space not found
      mockSpaceRepo.findById.mockResolvedValue(Result.fail('Space not found'));

      // Execute activity retrieval
      const result = await spaceDiscoveryService.getSpaceActivity('nonexistent_space');

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Space not found');
    });
  });

  describe('Repository Integration Coordination', () => {
    it('should coordinate multiple repository calls in joining flow', async () => {
      const mockSpace = createMockSpace();
      const mockProfile = { id: { id: 'profile_user_123' } };

      // Mock all necessary repository calls
      mockSpaceRepo.findById.mockResolvedValue(Result.ok(mockSpace));
      mockProfileRepo.findById.mockResolvedValue(Result.ok(mockProfile));
      mockSpaceRepo.addMember.mockResolvedValue(Result.ok());

      // Execute joining
      const result = await spaceDiscoveryService.joinSpace('profile_user_123', 'space_cs_001');

      // Verify all repositories were called
      expect(mockSpaceRepo.findById).toHaveBeenCalled();
      expect(mockProfileRepo.findById).toHaveBeenCalled();
      expect(mockSpaceRepo.addMember).toHaveBeenCalled();

      expect(result.isSuccess).toBe(true);
    });

    it('should handle partial repository failures gracefully', async () => {
      const mockSpace = createMockSpace();

      // Mock space found but profile lookup fails
      mockSpaceRepo.findById.mockResolvedValue(Result.ok(mockSpace));
      mockProfileRepo.findById.mockResolvedValue(Result.fail('Profile service unavailable'));

      // Execute joining
      const result = await spaceDiscoveryService.joinSpace('profile_user_123', 'space_cs_001');

      // Verify graceful failure handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Profile service unavailable');

      // Verify member addition was not attempted
      expect(mockSpaceRepo.addMember).not.toHaveBeenCalled();
    });
  });
});