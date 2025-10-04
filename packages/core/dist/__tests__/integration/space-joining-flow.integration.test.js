"use strict";
/**
 * Space Joining Flow - Integration Test
 * Tests the space discovery and joining integration between services and repositories
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const space_discovery_service_1 = require("../../application/space-discovery.service");
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
// Mock repository factory
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
    findAll: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn(),
    // Missing methods required by ISpaceRepository
    findByName: vitest_1.vi.fn(),
    findByCampus: vitest_1.vi.fn(),
    findUserSpaces: vitest_1.vi.fn(),
    findByMember: vitest_1.vi.fn(),
    findRecommended: vitest_1.vi.fn()
};
const mockProfileRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByHandle: vitest_1.vi.fn(),
    findByEmail: vitest_1.vi.fn(),
    findByCampus: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn(),
    // Missing methods required by IProfileRepository
    findOnboardedProfiles: vitest_1.vi.fn(),
    findByInterest: vitest_1.vi.fn(),
    findByMajor: vitest_1.vi.fn(),
    findConnectionsOf: vitest_1.vi.fn(),
    findByUserType: vitest_1.vi.fn(),
    findByGraduationYear: vitest_1.vi.fn(),
    findAll: vitest_1.vi.fn(),
    getTotalCampusUsers: vitest_1.vi.fn(),
    exists: vitest_1.vi.fn(),
    searchByName: vitest_1.vi.fn()
};
const mockFeedRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByUserId: vitest_1.vi.fn(),
    addFeedItem: vitest_1.vi.fn(),
    findAll: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn(),
    // Missing methods required by IFeedRepository
    findByCampus: vitest_1.vi.fn(),
    saveFeed: vitest_1.vi.fn(),
    getFeedContent: vitest_1.vi.fn(),
    getTrendingContent: vitest_1.vi.fn(),
    getPersonalizedFeed: vitest_1.vi.fn(),
    cacheFeed: vitest_1.vi.fn(),
    invalidateFeedCache: vitest_1.vi.fn(),
    subscribeToCampusFeed: vitest_1.vi.fn(),
    subscribeToPersonalFeed: vitest_1.vi.fn(),
    getEventContent: vitest_1.vi.fn(),
    getRitualContent: vitest_1.vi.fn(),
    recordInteraction: vitest_1.vi.fn(),
    removeFeedItem: vitest_1.vi.fn(),
    subscribeToFeed: vitest_1.vi.fn()
};
(0, vitest_1.describe)('Space Joining Flow - Integration', () => {
    let spaceDiscoveryService;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        spaceDiscoveryService = new space_discovery_service_1.SpaceDiscoveryService({ campusId: 'ub-buffalo' }, mockSpaceRepo, mockProfileRepo, mockFeedRepo);
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
        addMember: vitest_1.vi.fn(),
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
    (0, vitest_1.describe)('Space Discovery Integration', () => {
        (0, vitest_1.it)('should discover public spaces through repository layer', async () => {
            const mockSpaces = [
                createMockSpace({ id: { id: 'space_cs_001' }, name: { name: 'CS Students' } }),
                createMockSpace({ id: { id: 'space_math_002' }, name: { name: 'Math Club' } })
            ];
            // Mock repository response for default discovery (public spaces)
            mockSpaceRepo.findPublicSpaces.mockResolvedValue(Result_1.Result.ok(mockSpaces));
            // Execute space discovery
            const result = await spaceDiscoveryService.discoverSpaces({});
            // Verify integration worked
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockSpaceRepo.findPublicSpaces).toHaveBeenCalledWith('ub-buffalo');
            const serviceResult = result.getValue();
            (0, vitest_1.expect)(serviceResult.data).toHaveLength(2);
        });
        (0, vitest_1.it)('should discover trending spaces through repository integration', async () => {
            const mockTrendingSpaces = [
                createMockSpace({
                    id: { id: 'space_trending_001' },
                    name: { name: 'Popular Space' },
                    getMemberCount: () => 500
                })
            ];
            // Mock repository response for trending
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok(mockTrendingSpaces));
            // Execute trending spaces discovery
            const result = await spaceDiscoveryService.discoverSpaces({ sortBy: 'trending' });
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockSpaceRepo.findTrending).toHaveBeenCalledWith('ub-buffalo');
            const serviceResult = result.getValue();
            (0, vitest_1.expect)(serviceResult.data).toHaveLength(1);
        });
        (0, vitest_1.it)('should handle search queries through repository integration', async () => {
            const mockSearchResults = [
                createMockSpace({ name: { name: 'Computer Science Students' } })
            ];
            // Mock search functionality
            mockSpaceRepo.searchSpaces.mockResolvedValue(Result_1.Result.ok(mockSearchResults));
            // Execute search-based discovery
            const result = await spaceDiscoveryService.discoverSpaces({
                searchQuery: 'computer science'
            });
            // Verify search integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockSpaceRepo.searchSpaces).toHaveBeenCalledWith('computer science', 'ub-buffalo');
            const serviceResult = result.getValue();
            (0, vitest_1.expect)(serviceResult.data).toHaveLength(1);
        });
        (0, vitest_1.it)('should handle repository errors gracefully', async () => {
            // Mock repository error
            mockSpaceRepo.findPublicSpaces.mockResolvedValue(Result_1.Result.fail('Database connection failed'));
            // Execute space discovery
            const result = await spaceDiscoveryService.discoverSpaces({});
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Database connection failed');
        });
    });
    (0, vitest_1.describe)('Space Recommendation Integration', () => {
        (0, vitest_1.it)('should get recommended spaces based on user profile', async () => {
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
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(mockProfile));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok(mockRecommendedSpaces));
            // Execute recommendation
            const result = await spaceDiscoveryService.getRecommendedSpaces('profile_user_123');
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockProfileRepo.findById).toHaveBeenCalled();
            (0, vitest_1.expect)(mockSpaceRepo.findByType).toHaveBeenCalled();
            const serviceResult = result.getValue();
            (0, vitest_1.expect)(serviceResult.data).toHaveLength(2);
        });
        (0, vitest_1.it)('should handle profile not found error', async () => {
            // Mock profile not found
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.fail('Profile not found'));
            // Execute recommendation
            const result = await spaceDiscoveryService.getRecommendedSpaces('nonexistent_user');
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Profile not found');
        });
    });
    (0, vitest_1.describe)('Space Joining Integration', () => {
        (0, vitest_1.it)('should join space through repository layer', async () => {
            const mockSpace = createMockSpace();
            const mockProfile = {
                id: { id: 'profile_user_123' },
                handle: { value: 'johndoe' }
            };
            // Mock successful lookups
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.ok(mockSpace));
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(mockProfile));
            mockSpaceRepo.addMember.mockResolvedValue(Result_1.Result.ok());
            // Execute space joining
            const result = await spaceDiscoveryService.joinSpace('profile_user_123', 'space_cs_001');
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockSpaceRepo.findById).toHaveBeenCalled();
            (0, vitest_1.expect)(mockProfileRepo.findById).toHaveBeenCalled();
            (0, vitest_1.expect)(mockSpaceRepo.addMember).toHaveBeenCalled();
            const joinResult = result.getValue();
            (0, vitest_1.expect)(joinResult.data.space).toBeDefined();
            (0, vitest_1.expect)(joinResult.data.role).toBe('member');
            (0, vitest_1.expect)(joinResult.data.suggestedActions).toBeDefined();
        });
        (0, vitest_1.it)('should handle space not found during joining', async () => {
            // Mock space not found
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.fail('Space not found'));
            // Execute space joining
            const result = await spaceDiscoveryService.joinSpace('profile_user_123', 'nonexistent_space');
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Space not found');
            // Verify no member addition was attempted
            (0, vitest_1.expect)(mockSpaceRepo.addMember).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle profile not found during joining', async () => {
            const mockSpace = createMockSpace();
            // Mock space found but profile not found
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.ok(mockSpace));
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.fail('Profile not found'));
            // Execute space joining
            const result = await spaceDiscoveryService.joinSpace('nonexistent_user', 'space_cs_001');
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Profile not found');
            // Verify no member addition was attempted
            (0, vitest_1.expect)(mockSpaceRepo.addMember).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('Space Leaving Integration', () => {
        (0, vitest_1.it)('should leave space through repository layer', async () => {
            const mockSpace = createMockSpace();
            const mockProfile = {
                id: { id: 'profile_user_123' },
                handle: { value: 'johndoe' }
            };
            // Mock successful lookups
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.ok(mockSpace));
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(mockProfile));
            mockSpaceRepo.removeMember.mockResolvedValue(Result_1.Result.ok());
            // Execute space leaving
            const result = await spaceDiscoveryService.leaveSpace('profile_user_123', 'space_cs_001');
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockSpaceRepo.findById).toHaveBeenCalled();
            (0, vitest_1.expect)(mockProfileRepo.findById).toHaveBeenCalled();
            (0, vitest_1.expect)(mockSpaceRepo.removeMember).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle errors during space leaving', async () => {
            // Mock space not found
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.fail('Space not found'));
            // Execute space leaving
            const result = await spaceDiscoveryService.leaveSpace('profile_user_123', 'nonexistent_space');
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Space not found');
            // Verify no member removal was attempted
            (0, vitest_1.expect)(mockSpaceRepo.removeMember).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('Space Activity Integration', () => {
        (0, vitest_1.it)('should get space activity through repository layer', async () => {
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
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.ok(mockSpace));
            // Execute activity retrieval
            const result = await spaceDiscoveryService.getSpaceActivity('space_cs_001');
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockSpaceRepo.findById).toHaveBeenCalled();
            const activityResult = result.getValue();
            (0, vitest_1.expect)(activityResult.data.spaceId).toBe('space_cs_001');
            (0, vitest_1.expect)(activityResult.data.recentPosts).toBeDefined();
            (0, vitest_1.expect)(activityResult.data.activeMembers).toBeDefined();
        });
        (0, vitest_1.it)('should handle space not found during activity retrieval', async () => {
            // Mock space not found
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.fail('Space not found'));
            // Execute activity retrieval
            const result = await spaceDiscoveryService.getSpaceActivity('nonexistent_space');
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Space not found');
        });
    });
    (0, vitest_1.describe)('Repository Integration Coordination', () => {
        (0, vitest_1.it)('should coordinate multiple repository calls in joining flow', async () => {
            const mockSpace = createMockSpace();
            const mockProfile = { id: { id: 'profile_user_123' } };
            // Mock all necessary repository calls
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.ok(mockSpace));
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(mockProfile));
            mockSpaceRepo.addMember.mockResolvedValue(Result_1.Result.ok());
            // Execute joining
            const result = await spaceDiscoveryService.joinSpace('profile_user_123', 'space_cs_001');
            // Verify all repositories were called
            (0, vitest_1.expect)(mockSpaceRepo.findById).toHaveBeenCalled();
            (0, vitest_1.expect)(mockProfileRepo.findById).toHaveBeenCalled();
            (0, vitest_1.expect)(mockSpaceRepo.addMember).toHaveBeenCalled();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should handle partial repository failures gracefully', async () => {
            const mockSpace = createMockSpace();
            // Mock space found but profile lookup fails
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.ok(mockSpace));
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.fail('Profile service unavailable'));
            // Execute joining
            const result = await spaceDiscoveryService.joinSpace('profile_user_123', 'space_cs_001');
            // Verify graceful failure handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Profile service unavailable');
            // Verify member addition was not attempted
            (0, vitest_1.expect)(mockSpaceRepo.addMember).not.toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=space-joining-flow.integration.test.js.map