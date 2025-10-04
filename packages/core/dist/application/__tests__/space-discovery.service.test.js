"use strict";
/**
 * SpaceDiscoveryService Tests
 * Tests for space discovery and management orchestration
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const space_discovery_service_1 = require("../space-discovery.service");
const space_aggregate_1 = require("../../domain/spaces/aggregates/space.aggregate");
const space_id_value_1 = require("../../domain/spaces/value-objects/space-id.value");
const space_name_value_1 = require("../../domain/spaces/value-objects/space-name.value");
const space_description_value_1 = require("../../domain/spaces/value-objects/space-description.value");
const space_category_value_1 = require("../../domain/spaces/value-objects/space-category.value");
const campus_id_value_1 = require("../../domain/profile/value-objects/campus-id.value");
const profile_id_value_1 = require("../../domain/profile/value-objects/profile-id.value");
const profile_aggregate_1 = require("../../domain/profile/aggregates/profile.aggregate");
const ub_email_value_1 = require("../../domain/profile/value-objects/ub-email.value");
const profile_handle_value_1 = require("../../domain/profile/value-objects/profile-handle.value");
const user_type_value_1 = require("../../domain/profile/value-objects/user-type.value");
const profile_privacy_value_1 = require("../../domain/profile/value-objects/profile-privacy.value");
const Result_1 = require("../../domain/shared/base/Result");
// Mock repositories
const mockSpaceRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByName: vitest_1.vi.fn(),
    findByType: vitest_1.vi.fn(),
    findTrending: vitest_1.vi.fn(),
    searchSpaces: vitest_1.vi.fn(),
    findPublicSpaces: vitest_1.vi.fn(),
    findByMember: vitest_1.vi.fn(),
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
const mockFeedRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByUserId: vitest_1.vi.fn(),
    findAll: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn()
};
(0, vitest_1.describe)('SpaceDiscoveryService', () => {
    let service;
    (0, vitest_1.beforeEach)(() => {
        service = new space_discovery_service_1.SpaceDiscoveryService({ campusId: 'ub-buffalo', userId: 'user_test_123' }, mockSpaceRepo, mockProfileRepo, mockFeedRepo);
        vitest_1.vi.clearAllMocks();
    });
    // Helper to create a valid space
    const createValidSpace = (overrides) => {
        const spaceId = space_id_value_1.SpaceId.create('space_test_123').getValue();
        const name = space_name_value_1.SpaceName.create('Test Space').getValue();
        const description = space_description_value_1.SpaceDescription.create('Test Description').getValue();
        const category = space_category_value_1.SpaceCategory.create('general').getValue();
        const campusId = campus_id_value_1.CampusId.create('ub-buffalo').getValue();
        const createdBy = profile_id_value_1.ProfileId.create('profile_123').getValue();
        return space_aggregate_1.Space.create({
            spaceId,
            name,
            description,
            category,
            campusId,
            createdBy,
            visibility: 'public',
            ...overrides
        }).getValue();
    };
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
                bio: 'Test bio',
                major: 'Computer Science'
            },
            socialInfo: {
                interests: ['Coding', 'Gaming', 'Sports'],
                clubs: [],
                sports: []
            },
            privacy
        }).getValue();
    };
    (0, vitest_1.describe)('discoverSpaces()', () => {
        (0, vitest_1.it)('should discover spaces with search query', async () => {
            // Arrange
            const mockSpaces = [createValidSpace()];
            mockSpaceRepo.searchSpaces.mockResolvedValue(Result_1.Result.ok(mockSpaces));
            const filters = {
                searchQuery: 'Computer Science'
            };
            // Act
            const result = await service.discoverSpaces(filters);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockSpaceRepo.searchSpaces).toHaveBeenCalledWith('Computer Science', 'ub-buffalo');
            const data = result.getValue().data;
            (0, vitest_1.expect)(data).toHaveLength(1);
        });
        (0, vitest_1.it)('should discover trending spaces', async () => {
            // Arrange
            const mockSpaces = [createValidSpace(), createValidSpace()];
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok(mockSpaces));
            const filters = {
                sortBy: 'trending',
                limit: 10
            };
            // Act
            const result = await service.discoverSpaces(filters);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockSpaceRepo.findTrending).toHaveBeenCalledWith('ub-buffalo', 10);
        });
        (0, vitest_1.it)('should discover spaces by type', async () => {
            // Arrange
            const mockSpaces = [createValidSpace()];
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok(mockSpaces));
            const filters = {
                spaceType: 'study-group'
            };
            // Act
            const result = await service.discoverSpaces(filters);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockSpaceRepo.findByType).toHaveBeenCalledWith('study-group', 'ub-buffalo');
        });
        (0, vitest_1.it)('should discover public spaces by default', async () => {
            // Arrange
            const mockSpaces = [createValidSpace()];
            mockSpaceRepo.findPublicSpaces.mockResolvedValue(Result_1.Result.ok(mockSpaces));
            // Act
            const result = await service.discoverSpaces({});
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockSpaceRepo.findPublicSpaces).toHaveBeenCalledWith('ub-buffalo', 20);
        });
        (0, vitest_1.it)('should filter out private spaces by default', async () => {
            // Arrange
            const publicSpace = createValidSpace({ visibility: 'public' });
            const privateSpace = createValidSpace({ visibility: 'private' });
            mockSpaceRepo.findPublicSpaces.mockResolvedValue(Result_1.Result.ok([publicSpace, privateSpace]));
            // Act
            const result = await service.discoverSpaces({});
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const data = result.getValue().data;
            (0, vitest_1.expect)(data).toHaveLength(1);
            (0, vitest_1.expect)(data[0].toData().visibility).toBe('public');
        });
        (0, vitest_1.it)('should include private spaces when requested', async () => {
            // Arrange
            const publicSpace = createValidSpace({ visibility: 'public' });
            const privateSpace = createValidSpace({ visibility: 'private' });
            mockSpaceRepo.findPublicSpaces.mockResolvedValue(Result_1.Result.ok([publicSpace, privateSpace]));
            const filters = {
                includePrivate: true
            };
            // Act
            const result = await service.discoverSpaces(filters);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const data = result.getValue().data;
            (0, vitest_1.expect)(data).toHaveLength(2);
        });
        (0, vitest_1.it)('should include metadata in result', async () => {
            // Arrange
            const mockSpaces = [createValidSpace()];
            mockSpaceRepo.findPublicSpaces.mockResolvedValue(Result_1.Result.ok(mockSpaces));
            // Act
            const result = await service.discoverSpaces({ limit: 20 });
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const serviceResult = result.getValue();
            (0, vitest_1.expect)(serviceResult.metadata).toBeDefined();
            (0, vitest_1.expect)(serviceResult.metadata.totalCount).toBe(1);
            (0, vitest_1.expect)(serviceResult.metadata.hasMore).toBe(false);
        });
    });
    (0, vitest_1.describe)('getRecommendedSpaces()', () => {
        (0, vitest_1.it)('should get personalized recommendations for user', async () => {
            // Arrange
            const profile = createValidProfile();
            const mockSpaces = [createValidSpace()];
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok(mockSpaces));
            mockSpaceRepo.searchSpaces.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            const result = await service.getRecommendedSpaces('profile_test_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockProfileRepo.findById).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should fail when user profile not found', async () => {
            // Arrange
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.fail('Not found'));
            // Act
            const result = await service.getRecommendedSpaces('nonexistent');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('User profile not found');
        });
        (0, vitest_1.it)('should recommend spaces based on user major', async () => {
            // Arrange
            const profile = createValidProfile();
            const mockSpaces = [createValidSpace()];
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok(mockSpaces));
            mockSpaceRepo.searchSpaces.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            await service.getRecommendedSpaces('profile_test_123');
            // Assert
            (0, vitest_1.expect)(mockSpaceRepo.findByType).toHaveBeenCalledWith('study-group', 'ub-buffalo');
        });
        (0, vitest_1.it)('should recommend spaces based on user interests', async () => {
            // Arrange
            const profile = createValidProfile();
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.searchSpaces.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            await service.getRecommendedSpaces('profile_test_123');
            // Assert
            (0, vitest_1.expect)(mockSpaceRepo.searchSpaces).toHaveBeenCalledWith('Coding', 'ub-buffalo');
        });
        (0, vitest_1.it)('should exclude spaces user already joined', async () => {
            // Arrange
            const profile = createValidProfile();
            const joinedSpace = createValidSpace();
            const newSpace = createValidSpace();
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok([{ id: joinedSpace.id }]));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok([joinedSpace, newSpace]));
            mockSpaceRepo.searchSpaces.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            const result = await service.getRecommendedSpaces('profile_test_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const recommendations = result.getValue().data;
            (0, vitest_1.expect)(recommendations).not.toContain(joinedSpace);
        });
        (0, vitest_1.it)('should limit recommendations to 10', async () => {
            // Arrange
            const profile = createValidProfile();
            const mockSpaces = Array(15).fill(null).map(() => createValidSpace());
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockSpaceRepo.findByMember.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok(mockSpaces));
            mockSpaceRepo.searchSpaces.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            const result = await service.getRecommendedSpaces('profile_test_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const recommendations = result.getValue().data;
            (0, vitest_1.expect)(recommendations.length).toBeLessThanOrEqual(10);
        });
    });
    (0, vitest_1.describe)('createSpace()', () => {
        (0, vitest_1.it)('should successfully create a space with valid data', async () => {
            // Arrange
            const profile = createValidProfile();
            const data = {
                name: 'CS Study Group',
                description: 'A space for CS students',
                spaceType: 'study-group',
                visibility: 'public'
            };
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockSpaceRepo.findByName.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockSpaceRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.createSpace('profile_test_123', data);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockSpaceRepo.save).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should fail when creator profile not found', async () => {
            // Arrange
            const data = {
                name: 'Test Space',
                description: 'Test',
                spaceType: 'general',
                visibility: 'public'
            };
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.fail('Not found'));
            // Act
            const result = await service.createSpace('nonexistent', data);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Creator profile not found');
        });
        (0, vitest_1.it)('should fail when space name already exists', async () => {
            // Arrange
            const profile = createValidProfile();
            const existingSpace = createValidSpace();
            const data = {
                name: 'Existing Space',
                description: 'Test',
                spaceType: 'general',
                visibility: 'public'
            };
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockSpaceRepo.findByName.mockResolvedValue(Result_1.Result.ok(existingSpace));
            // Act
            const result = await service.createSpace('profile_test_123', data);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('already exists');
        });
        (0, vitest_1.it)('should create space with RSS feed', async () => {
            // Arrange
            const profile = createValidProfile();
            const data = {
                name: 'News Space',
                description: 'Campus news',
                spaceType: 'resource',
                visibility: 'public',
                rssUrl: 'https://example.com/rss'
            };
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockSpaceRepo.findByName.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockSpaceRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.createSpace('profile_test_123', data);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const space = result.getValue();
            (0, vitest_1.expect)(space.toData().rssUrl).toBe('https://example.com/rss');
        });
        (0, vitest_1.it)('should make creator an admin member', async () => {
            // Arrange
            const profile = createValidProfile();
            const data = {
                name: 'Test Space',
                description: 'Test',
                spaceType: 'general',
                visibility: 'public'
            };
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockSpaceRepo.findByName.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockSpaceRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.createSpace('profile_test_123', data);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const space = result.getValue();
            (0, vitest_1.expect)(space.getMemberCount()).toBeGreaterThan(0);
        });
    });
    (0, vitest_1.describe)('joinSpace()', () => {
        (0, vitest_1.it)('should successfully join a public space', async () => {
            // Arrange
            const profile = createValidProfile();
            const space = createValidSpace();
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.ok(space));
            mockSpaceRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.joinSpace('profile_test_123', 'space_test_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const joinResult = result.getValue().data;
            (0, vitest_1.expect)(joinResult.space).toBeDefined();
            (0, vitest_1.expect)(joinResult.role).toBe('member');
            (0, vitest_1.expect)(joinResult.suggestedActions).toBeDefined();
        });
        (0, vitest_1.it)('should fail when user profile not found', async () => {
            // Arrange
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.fail('Not found'));
            // Act
            const result = await service.joinSpace('nonexistent', 'space_test_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('User profile not found');
        });
        (0, vitest_1.it)('should fail when space not found', async () => {
            // Arrange
            const profile = createValidProfile();
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.fail('Not found'));
            // Act
            const result = await service.joinSpace('profile_test_123', 'nonexistent');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Space not found');
        });
        (0, vitest_1.it)('should fail when already a member', async () => {
            // Arrange
            const profile = createValidProfile();
            const space = createValidSpace();
            const profileId = profile_id_value_1.ProfileId.create('profile_test_123').getValue();
            space.addMember(profileId);
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.ok(space));
            // Act
            const result = await service.joinSpace('profile_test_123', 'space_test_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Already a member');
        });
        (0, vitest_1.it)('should fail for private space requiring approval', async () => {
            // Arrange
            const profile = createValidProfile();
            const space = createValidSpace({
                visibility: 'private',
                settings: { requireApproval: true }
            });
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.ok(space));
            // Act
            const result = await service.joinSpace('profile_test_123', 'space_test_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('requires approval');
        });
    });
    (0, vitest_1.describe)('leaveSpace()', () => {
        (0, vitest_1.it)('should successfully leave a space', async () => {
            // Arrange
            const space = createValidSpace();
            const profileId = profile_id_value_1.ProfileId.create('profile_test_123').getValue();
            space.addMember(profileId);
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.ok(space));
            mockSpaceRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.leaveSpace('profile_test_123', 'space_test_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should fail when space not found', async () => {
            // Arrange
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.fail('Not found'));
            // Act
            const result = await service.leaveSpace('profile_test_123', 'nonexistent');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Space not found');
        });
        (0, vitest_1.it)('should fail when not a member', async () => {
            // Arrange
            const space = createValidSpace();
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.ok(space));
            // Act
            const result = await service.leaveSpace('profile_test_123', 'space_test_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Not a member');
        });
    });
    (0, vitest_1.describe)('getSpaceActivity()', () => {
        (0, vitest_1.it)('should get space activity summary', async () => {
            // Arrange
            const space = createValidSpace();
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.ok(space));
            // Act
            const result = await service.getSpaceActivity('space_test_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const activity = result.getValue().data;
            (0, vitest_1.expect)(activity.spaceId).toBe('space_test_123');
            (0, vitest_1.expect)(activity.recentPosts).toBeDefined();
            (0, vitest_1.expect)(activity.activeMembers).toBeDefined();
            (0, vitest_1.expect)(activity.todaysPosts).toBeDefined();
            (0, vitest_1.expect)(activity.trendingTopics).toBeDefined();
        });
        (0, vitest_1.it)('should fail when space not found', async () => {
            // Arrange
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.fail('Not found'));
            // Act
            const result = await service.getSpaceActivity('nonexistent');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Space not found');
        });
    });
    (0, vitest_1.describe)('Real-world Scenarios', () => {
        (0, vitest_1.it)('should handle student joining study group workflow', async () => {
            // Arrange
            const profile = createValidProfile();
            const studyGroup = createValidSpace({
                name: space_name_value_1.SpaceName.create('CSE 442 Study Group').getValue(),
                category: space_category_value_1.SpaceCategory.create('study-group').getValue()
            });
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.ok(studyGroup));
            mockSpaceRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.joinSpace('profile_test_123', 'space_test_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should handle space creation for club leader', async () => {
            // Arrange
            const profile = createValidProfile();
            const clubData = {
                name: 'ACM Club',
                description: 'Association for Computing Machinery student chapter',
                spaceType: 'social',
                visibility: 'public',
                settings: {
                    allowInvites: true,
                    requireApproval: false
                }
            };
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockSpaceRepo.findByName.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockSpaceRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.createSpace('profile_test_123', clubData);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
});
//# sourceMappingURL=space-discovery.service.test.js.map