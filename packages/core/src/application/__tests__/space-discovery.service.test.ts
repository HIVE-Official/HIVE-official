/**
 * SpaceDiscoveryService Tests
 * Tests for space discovery and management orchestration
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SpaceDiscoveryService, SpaceCreationData, SpaceDiscoveryFilters } from '../space-discovery.service';
import { Space } from '../../domain/spaces/aggregates/space.aggregate';
import { SpaceId } from '../../domain/spaces/value-objects/space-id.value';
import { SpaceName } from '../../domain/spaces/value-objects/space-name.value';
import { SpaceDescription } from '../../domain/spaces/value-objects/space-description.value';
import { SpaceCategory } from '../../domain/spaces/value-objects/space-category.value';
import { CampusId } from '../../domain/profile/value-objects/campus-id.value';
import { ProfileId } from '../../domain/profile/value-objects/profile-id.value';
import { Profile } from '../../domain/profile/aggregates/profile.aggregate';
import { UBEmail } from '../../domain/profile/value-objects/ub-email.value';
import { ProfileHandle } from '../../domain/profile/value-objects/profile-handle.value';
import { UserType } from '../../domain/profile/value-objects/user-type.value';
import { ProfilePrivacy } from '../../domain/profile/value-objects/profile-privacy.value';
import { Result } from '../../domain/shared/base/Result';

// Mock repositories
const mockSpaceRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findByName: vi.fn(),
  findByType: vi.fn(),
  findTrending: vi.fn(),
  searchSpaces: vi.fn(),
  findPublicSpaces: vi.fn(),
  findByMember: vi.fn(),
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

const mockFeedRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findByUserId: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn()
};

describe('SpaceDiscoveryService', () => {
  let service: SpaceDiscoveryService;

  beforeEach(() => {
    service = new SpaceDiscoveryService(
      { campusId: 'ub-buffalo', userId: 'user_test_123' },
      mockSpaceRepo as any,
      mockProfileRepo as any,
      mockFeedRepo as any
    );
    vi.clearAllMocks();
  });

  // Helper to create a valid space
  const createValidSpace = (overrides?: any): Space => {
    const spaceId = SpaceId.create('space_test_123').getValue();
    const name = SpaceName.create('Test Space').getValue();
    const description = SpaceDescription.create('Test Description').getValue();
    const category = SpaceCategory.create('general').getValue();
    const campusId = CampusId.create('ub-buffalo').getValue();
    const createdBy = ProfileId.create('profile_123').getValue();

    return Space.create({
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

  describe('discoverSpaces()', () => {
    it('should discover spaces with search query', async () => {
      // Arrange
      const mockSpaces = [createValidSpace()];
      mockSpaceRepo.searchSpaces.mockResolvedValue(Result.ok(mockSpaces));

      const filters: SpaceDiscoveryFilters = {
        searchQuery: 'Computer Science'
      };

      // Act
      const result = await service.discoverSpaces(filters);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockSpaceRepo.searchSpaces).toHaveBeenCalledWith('Computer Science', 'ub-buffalo');
      const data = result.getValue().data;
      expect(data).toHaveLength(1);
    });

    it('should discover trending spaces', async () => {
      // Arrange
      const mockSpaces = [createValidSpace(), createValidSpace()];
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok(mockSpaces));

      const filters: SpaceDiscoveryFilters = {
        sortBy: 'trending',
        limit: 10
      };

      // Act
      const result = await service.discoverSpaces(filters);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockSpaceRepo.findTrending).toHaveBeenCalledWith('ub-buffalo', 10);
    });

    it('should discover spaces by type', async () => {
      // Arrange
      const mockSpaces = [createValidSpace()];
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok(mockSpaces));

      const filters: SpaceDiscoveryFilters = {
        spaceType: 'study-group'
      };

      // Act
      const result = await service.discoverSpaces(filters);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockSpaceRepo.findByType).toHaveBeenCalledWith('study-group', 'ub-buffalo');
    });

    it('should discover public spaces by default', async () => {
      // Arrange
      const mockSpaces = [createValidSpace()];
      mockSpaceRepo.findPublicSpaces.mockResolvedValue(Result.ok(mockSpaces));

      // Act
      const result = await service.discoverSpaces({});

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockSpaceRepo.findPublicSpaces).toHaveBeenCalledWith('ub-buffalo', 20);
    });

    it('should filter out private spaces by default', async () => {
      // Arrange
      const publicSpace = createValidSpace({ visibility: 'public' });
      const privateSpace = createValidSpace({ visibility: 'private' });
      mockSpaceRepo.findPublicSpaces.mockResolvedValue(Result.ok([publicSpace, privateSpace]));

      // Act
      const result = await service.discoverSpaces({});

      // Assert
      expect(result.isSuccess).toBe(true);
      const data = result.getValue().data;
      expect(data).toHaveLength(1);
      expect(data[0].toData().visibility).toBe('public');
    });

    it('should include private spaces when requested', async () => {
      // Arrange
      const publicSpace = createValidSpace({ visibility: 'public' });
      const privateSpace = createValidSpace({ visibility: 'private' });
      mockSpaceRepo.findPublicSpaces.mockResolvedValue(Result.ok([publicSpace, privateSpace]));

      const filters: SpaceDiscoveryFilters = {
        includePrivate: true
      };

      // Act
      const result = await service.discoverSpaces(filters);

      // Assert
      expect(result.isSuccess).toBe(true);
      const data = result.getValue().data;
      expect(data).toHaveLength(2);
    });

    it('should include metadata in result', async () => {
      // Arrange
      const mockSpaces = [createValidSpace()];
      mockSpaceRepo.findPublicSpaces.mockResolvedValue(Result.ok(mockSpaces));

      // Act
      const result = await service.discoverSpaces({ limit: 20 });

      // Assert
      expect(result.isSuccess).toBe(true);
      const serviceResult = result.getValue();
      expect(serviceResult.metadata).toBeDefined();
      expect(serviceResult.metadata.totalCount).toBe(1);
      expect(serviceResult.metadata.hasMore).toBe(false);
    });
  });

  describe('getRecommendedSpaces()', () => {
    it('should get personalized recommendations for user', async () => {
      // Arrange
      const profile = createValidProfile();
      const mockSpaces = [createValidSpace()];

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok(mockSpaces));
      mockSpaceRepo.searchSpaces.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok([]));

      // Act
      const result = await service.getRecommendedSpaces('profile_test_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockProfileRepo.findById).toHaveBeenCalled();
    });

    it('should fail when user profile not found', async () => {
      // Arrange
      mockProfileRepo.findById.mockResolvedValue(Result.fail('Not found'));

      // Act
      const result = await service.getRecommendedSpaces('nonexistent');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('User profile not found');
    });

    it('should recommend spaces based on user major', async () => {
      // Arrange
      const profile = createValidProfile();
      const mockSpaces = [createValidSpace()];

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok(mockSpaces));
      mockSpaceRepo.searchSpaces.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok([]));

      // Act
      await service.getRecommendedSpaces('profile_test_123');

      // Assert
      expect(mockSpaceRepo.findByType).toHaveBeenCalledWith('study-group', 'ub-buffalo');
    });

    it('should recommend spaces based on user interests', async () => {
      // Arrange
      const profile = createValidProfile();

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.searchSpaces.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok([]));

      // Act
      await service.getRecommendedSpaces('profile_test_123');

      // Assert
      expect(mockSpaceRepo.searchSpaces).toHaveBeenCalledWith('Coding', 'ub-buffalo');
    });

    it('should exclude spaces user already joined', async () => {
      // Arrange
      const profile = createValidProfile();
      const joinedSpace = createValidSpace();
      const newSpace = createValidSpace();

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok([{ id: joinedSpace.id }]));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok([joinedSpace, newSpace]));
      mockSpaceRepo.searchSpaces.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok([]));

      // Act
      const result = await service.getRecommendedSpaces('profile_test_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      const recommendations = result.getValue().data;
      expect(recommendations).not.toContain(joinedSpace);
    });

    it('should limit recommendations to 10', async () => {
      // Arrange
      const profile = createValidProfile();
      const mockSpaces = Array(15).fill(null).map(() => createValidSpace());

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockSpaceRepo.findByMember.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok(mockSpaces));
      mockSpaceRepo.searchSpaces.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok([]));

      // Act
      const result = await service.getRecommendedSpaces('profile_test_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      const recommendations = result.getValue().data;
      expect(recommendations.length).toBeLessThanOrEqual(10);
    });
  });

  describe('createSpace()', () => {
    it('should successfully create a space with valid data', async () => {
      // Arrange
      const profile = createValidProfile();
      const data: SpaceCreationData = {
        name: 'CS Study Group',
        description: 'A space for CS students',
        spaceType: 'study-group',
        visibility: 'public'
      };

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockSpaceRepo.findByName.mockResolvedValue(Result.fail('Not found'));
      mockSpaceRepo.save.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.createSpace('profile_test_123', data);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockSpaceRepo.save).toHaveBeenCalled();
    });

    it('should fail when creator profile not found', async () => {
      // Arrange
      const data: SpaceCreationData = {
        name: 'Test Space',
        description: 'Test',
        spaceType: 'general',
        visibility: 'public'
      };

      mockProfileRepo.findById.mockResolvedValue(Result.fail('Not found'));

      // Act
      const result = await service.createSpace('nonexistent', data);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Creator profile not found');
    });

    it('should fail when space name already exists', async () => {
      // Arrange
      const profile = createValidProfile();
      const existingSpace = createValidSpace();
      const data: SpaceCreationData = {
        name: 'Existing Space',
        description: 'Test',
        spaceType: 'general',
        visibility: 'public'
      };

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockSpaceRepo.findByName.mockResolvedValue(Result.ok(existingSpace));

      // Act
      const result = await service.createSpace('profile_test_123', data);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('already exists');
    });

    it('should create space with RSS feed', async () => {
      // Arrange
      const profile = createValidProfile();
      const data: SpaceCreationData = {
        name: 'News Space',
        description: 'Campus news',
        spaceType: 'resource',
        visibility: 'public',
        rssUrl: 'https://example.com/rss'
      };

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockSpaceRepo.findByName.mockResolvedValue(Result.fail('Not found'));
      mockSpaceRepo.save.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.createSpace('profile_test_123', data);

      // Assert
      expect(result.isSuccess).toBe(true);
      const space = result.getValue();
      expect(space.toData().rssUrl).toBe('https://example.com/rss');
    });

    it('should make creator an admin member', async () => {
      // Arrange
      const profile = createValidProfile();
      const data: SpaceCreationData = {
        name: 'Test Space',
        description: 'Test',
        spaceType: 'general',
        visibility: 'public'
      };

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockSpaceRepo.findByName.mockResolvedValue(Result.fail('Not found'));
      mockSpaceRepo.save.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.createSpace('profile_test_123', data);

      // Assert
      expect(result.isSuccess).toBe(true);
      const space = result.getValue();
      expect(space.getMemberCount()).toBeGreaterThan(0);
    });
  });

  describe('joinSpace()', () => {
    it('should successfully join a public space', async () => {
      // Arrange
      const profile = createValidProfile();
      const space = createValidSpace();

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockSpaceRepo.findById.mockResolvedValue(Result.ok(space));
      mockSpaceRepo.save.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.joinSpace('profile_test_123', 'space_test_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      const joinResult = result.getValue().data;
      expect(joinResult.space).toBeDefined();
      expect(joinResult.role).toBe('member');
      expect(joinResult.suggestedActions).toBeDefined();
    });

    it('should fail when user profile not found', async () => {
      // Arrange
      mockProfileRepo.findById.mockResolvedValue(Result.fail('Not found'));

      // Act
      const result = await service.joinSpace('nonexistent', 'space_test_123');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('User profile not found');
    });

    it('should fail when space not found', async () => {
      // Arrange
      const profile = createValidProfile();

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockSpaceRepo.findById.mockResolvedValue(Result.fail('Not found'));

      // Act
      const result = await service.joinSpace('profile_test_123', 'nonexistent');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Space not found');
    });

    it('should fail when already a member', async () => {
      // Arrange
      const profile = createValidProfile();
      const space = createValidSpace();
      const profileId = ProfileId.create('profile_test_123').getValue();
      space.addMember(profileId);

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockSpaceRepo.findById.mockResolvedValue(Result.ok(space));

      // Act
      const result = await service.joinSpace('profile_test_123', 'space_test_123');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Already a member');
    });

    it('should fail for private space requiring approval', async () => {
      // Arrange
      const profile = createValidProfile();
      const space = createValidSpace({
        visibility: 'private',
        settings: { requireApproval: true }
      });

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockSpaceRepo.findById.mockResolvedValue(Result.ok(space));

      // Act
      const result = await service.joinSpace('profile_test_123', 'space_test_123');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('requires approval');
    });
  });

  describe('leaveSpace()', () => {
    it('should successfully leave a space', async () => {
      // Arrange
      const space = createValidSpace();
      const profileId = ProfileId.create('profile_test_123').getValue();
      space.addMember(profileId);

      mockSpaceRepo.findById.mockResolvedValue(Result.ok(space));
      mockSpaceRepo.save.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.leaveSpace('profile_test_123', 'space_test_123');

      // Assert
      expect(result.isSuccess).toBe(true);
    });

    it('should fail when space not found', async () => {
      // Arrange
      mockSpaceRepo.findById.mockResolvedValue(Result.fail('Not found'));

      // Act
      const result = await service.leaveSpace('profile_test_123', 'nonexistent');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Space not found');
    });

    it('should fail when not a member', async () => {
      // Arrange
      const space = createValidSpace();

      mockSpaceRepo.findById.mockResolvedValue(Result.ok(space));

      // Act
      const result = await service.leaveSpace('profile_test_123', 'space_test_123');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Not a member');
    });
  });

  describe('getSpaceActivity()', () => {
    it('should get space activity summary', async () => {
      // Arrange
      const space = createValidSpace();

      mockSpaceRepo.findById.mockResolvedValue(Result.ok(space));

      // Act
      const result = await service.getSpaceActivity('space_test_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      const activity = result.getValue().data;
      expect(activity.spaceId).toBe('space_test_123');
      expect(activity.recentPosts).toBeDefined();
      expect(activity.activeMembers).toBeDefined();
      expect(activity.todaysPosts).toBeDefined();
      expect(activity.trendingTopics).toBeDefined();
    });

    it('should fail when space not found', async () => {
      // Arrange
      mockSpaceRepo.findById.mockResolvedValue(Result.fail('Not found'));

      // Act
      const result = await service.getSpaceActivity('nonexistent');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Space not found');
    });
  });

  describe('Real-world Scenarios', () => {
    it('should handle student joining study group workflow', async () => {
      // Arrange
      const profile = createValidProfile();
      const studyGroup = createValidSpace({
        name: SpaceName.create('CSE 442 Study Group').getValue(),
        category: SpaceCategory.create('study-group').getValue()
      });

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockSpaceRepo.findById.mockResolvedValue(Result.ok(studyGroup));
      mockSpaceRepo.save.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.joinSpace('profile_test_123', 'space_test_123');

      // Assert
      expect(result.isSuccess).toBe(true);
    });

    it('should handle space creation for club leader', async () => {
      // Arrange
      const profile = createValidProfile();
      const clubData: SpaceCreationData = {
        name: 'ACM Club',
        description: 'Association for Computing Machinery student chapter',
        spaceType: 'social',
        visibility: 'public',
        settings: {
          allowInvites: true,
          requireApproval: false
        }
      };

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockSpaceRepo.findByName.mockResolvedValue(Result.fail('Not found'));
      mockSpaceRepo.save.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.createSpace('profile_test_123', clubData);

      // Assert
      expect(result.isSuccess).toBe(true);
    });
  });
});
