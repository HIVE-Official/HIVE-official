/**
 * ProfileOnboardingService Tests
 * Tests for profile onboarding orchestration
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProfileOnboardingService, OnboardingData } from '../profile-onboarding.service';
import { Profile } from '../../domain/profile/aggregates/profile.aggregate';
import { ProfileId } from '../../domain/profile/value-objects/profile-id.value';
import { UBEmail } from '../../domain/profile/value-objects/ub-email.value';
import { ProfileHandle } from '../../domain/profile/value-objects/profile-handle.value';
import { UserType } from '../../domain/profile/value-objects/user-type.value';
import { CampusId } from '../../domain/profile/value-objects/campus-id.value';
import { ProfilePrivacy } from '../../domain/profile/value-objects/profile-privacy.value';
import { Result } from '../../domain/shared/base/Result';

// Mock repositories
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
  findByType: vi.fn(),
  findTrending: vi.fn(),
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

// Mock the factory functions
vi.mock('../../infrastructure/repositories/factory', () => ({
  getProfileRepository: () => mockProfileRepo,
  getSpaceRepository: () => mockSpaceRepo,
  getFeedRepository: () => mockFeedRepo
}));

describe('ProfileOnboardingService', () => {
  let service: ProfileOnboardingService;

  beforeEach(() => {
    service = new ProfileOnboardingService({ campusId: 'ub-buffalo' });
    vi.clearAllMocks();
  });

  // Helper to create valid onboarding data
  const createValidOnboardingData = (): OnboardingData => ({
    email: 'testuser@buffalo.edu',
    handle: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    bio: 'Test bio',
    major: 'Computer Science',
    graduationYear: 2025,
    dorm: 'Governors',
    interests: ['Coding', 'Gaming'],
    profileImageUrl: 'https://example.com/photo.jpg'
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

  describe('completeOnboarding()', () => {
    it('should successfully complete onboarding with valid data', async () => {
      // Arrange
      const data = createValidOnboardingData();

      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Not found')); // Handle available
      mockProfileRepo.save.mockResolvedValue(Result.ok(undefined));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.fail('Feed initialized'));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok([]));

      // Act
      const result = await service.completeOnboarding(data);

      // Assert
      expect(result.isSuccess).toBe(true);
      const serviceResult = result.getValue();
      expect(serviceResult.data.profile).toBeDefined();
      expect(serviceResult.data.profile.email.value).toBe('testuser@buffalo.edu');
      expect(serviceResult.data.profile.handle.value).toBe('testuser');
      expect(serviceResult.data.suggestedSpaces).toBeDefined();
      expect(serviceResult.data.nextSteps).toBeDefined();
    });

    it('should fail with invalid email domain', async () => {
      // Arrange
      const data = createValidOnboardingData();
      data.email = 'test@gmail.com'; // Invalid domain

      // Act
      const result = await service.completeOnboarding(data);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('email');
    });

    it('should fail when handle is already taken', async () => {
      // Arrange
      const data = createValidOnboardingData();
      const existingProfile = createValidProfile();

      mockProfileRepo.findByHandle.mockResolvedValue(Result.ok(existingProfile));

      // Act
      const result = await service.completeOnboarding(data);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Handle is already taken');
    });

    it('should fail with invalid handle format', async () => {
      // Arrange
      const data = createValidOnboardingData();
      data.handle = 'ab'; // Too short

      // Act
      const result = await service.completeOnboarding(data);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('at least 3 characters');
    });

    it('should add interests to profile', async () => {
      // Arrange
      const data = createValidOnboardingData();

      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Not found'));
      mockProfileRepo.save.mockResolvedValue(Result.ok(undefined));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.fail('Feed initialized'));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok([]));

      // Act
      const result = await service.completeOnboarding(data);

      // Assert
      expect(result.isSuccess).toBe(true);
      const profile = result.getValue().data.profile;
      expect(profile.interests).toContain('Coding');
      expect(profile.interests).toContain('Gaming');
    });

    it('should initialize user feed', async () => {
      // Arrange
      const data = createValidOnboardingData();

      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Not found'));
      mockProfileRepo.save.mockResolvedValue(Result.ok(undefined));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.fail('Feed initialized'));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok([]));

      // Act
      await service.completeOnboarding(data);

      // Assert
      expect(mockFeedRepo.findByUserId).toHaveBeenCalled();
    });

    it('should provide suggested spaces based on major', async () => {
      // Arrange
      const data = createValidOnboardingData();
      const mockSpaces = [
        { id: { id: 'space1' }, name: { name: 'CS Study Group' }, getMemberCount: () => 50 }
      ];

      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Not found'));
      mockProfileRepo.save.mockResolvedValue(Result.ok(undefined));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.fail('Feed initialized'));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok(mockSpaces));
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok([]));

      // Act
      const result = await service.completeOnboarding(data);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockSpaceRepo.findByType).toHaveBeenCalledWith('study-group', 'ub-buffalo');
    });

    it('should generate next steps for user', async () => {
      // Arrange
      const data = createValidOnboardingData();

      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Not found'));
      mockProfileRepo.save.mockResolvedValue(Result.ok(undefined));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.fail('Feed initialized'));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok([]));

      // Act
      const result = await service.completeOnboarding(data);

      // Assert
      expect(result.isSuccess).toBe(true);
      const nextSteps = result.getValue().data.nextSteps;
      expect(nextSteps).toBeDefined();
      expect(nextSteps.length).toBeGreaterThan(0);
      expect(nextSteps[0]).toHaveProperty('title');
      expect(nextSteps[0]).toHaveProperty('description');
      expect(nextSteps[0]).toHaveProperty('completed');
    });

    it('should include warnings for incomplete profile', async () => {
      // Arrange
      const data = createValidOnboardingData();
      delete data.bio; // Missing bio

      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Not found'));
      mockProfileRepo.save.mockResolvedValue(Result.ok(undefined));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.fail('Feed initialized'));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok([]));

      // Act
      const result = await service.completeOnboarding(data);

      // Assert
      expect(result.isSuccess).toBe(true);
      const warnings = result.getValue().warnings;
      expect(warnings).toBeDefined();
      expect(Array.isArray(warnings)).toBe(true);
    });
  });

  describe('updateOnboardingProgress()', () => {
    it('should update onboarding progress for existing profile', async () => {
      // Arrange
      const profile = createValidProfile();
      const profileId = ProfileId.create('profile_test_123').getValue();

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));

      // Act
      const result = await service.updateOnboardingProgress('profile_test_123', 'interests_selected', true);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockProfileRepo.findById).toHaveBeenCalledWith(profileId);
    });

    it('should fail when profile not found', async () => {
      // Arrange
      mockProfileRepo.findById.mockResolvedValue(Result.fail('Profile not found'));

      // Act
      const result = await service.updateOnboardingProgress('nonexistent', 'interests_selected', true);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Profile not found');
    });

    it('should complete onboarding when all steps done', async () => {
      // Arrange
      const profile = createValidProfile();

      // Mock profile as having all requirements met
      vi.spyOn(profile, 'getOnboardingStatus').mockReturnValue({
        isComplete: true,
        completedSteps: ['email_verified', 'handle_set', 'basic_info', 'interests_selected'],
        remainingSteps: [],
        completionPercentage: 100,
        nextSteps: [],
        warnings: []
      });

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockProfileRepo.save.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.updateOnboardingProgress('profile_test_123', 'final_step', true);

      // Assert
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('getOnboardingStatus()', () => {
    it('should return onboarding status for existing profile', async () => {
      // Arrange
      const profile = createValidProfile();

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));

      // Act
      const result = await service.getOnboardingStatus('profile_test_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      const status = result.getValue();
      expect(status).toHaveProperty('isComplete');
      expect(status).toHaveProperty('completedSteps');
      expect(status).toHaveProperty('remainingSteps');
      expect(status).toHaveProperty('percentComplete');
    });

    it('should fail when profile not found', async () => {
      // Arrange
      mockProfileRepo.findById.mockResolvedValue(Result.fail('Profile not found'));

      // Act
      const result = await service.getOnboardingStatus('nonexistent');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Profile not found');
    });

    it('should reflect completion percentage from profile', async () => {
      // Arrange
      const profile = createValidProfile();

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));

      // Act
      const result = await service.getOnboardingStatus('profile_test_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      const status = result.getValue();
      expect(status.percentComplete).toBeGreaterThanOrEqual(0);
      expect(status.percentComplete).toBeLessThanOrEqual(100);
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing optional fields gracefully', async () => {
      // Arrange
      const data: OnboardingData = {
        email: 'minimal@buffalo.edu',
        handle: 'minimal',
        firstName: 'Min',
        lastName: 'User'
        // No bio, major, etc.
      };

      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Not found'));
      mockProfileRepo.save.mockResolvedValue(Result.ok(undefined));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.fail('Feed initialized'));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok([]));

      // Act
      const result = await service.completeOnboarding(data);

      // Assert
      expect(result.isSuccess).toBe(true);
    });

    it('should handle repository errors gracefully', async () => {
      // Arrange
      const data = createValidOnboardingData();

      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Not found'));
      mockProfileRepo.save.mockRejectedValue(new Error('Database error'));

      // Act
      const result = await service.completeOnboarding(data);

      // Assert
      expect(result.isFailure).toBe(true);
    });

    it('should deduplicate suggested spaces', async () => {
      // Arrange
      const data = createValidOnboardingData();
      const duplicateSpace = {
        id: { id: 'space1' },
        name: { name: 'Duplicate' },
        getMemberCount: () => 50
      };

      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Not found'));
      mockProfileRepo.save.mockResolvedValue(Result.ok(undefined));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.fail('Feed initialized'));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok([duplicateSpace]));
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok([duplicateSpace]));

      // Act
      const result = await service.completeOnboarding(data);

      // Assert
      expect(result.isSuccess).toBe(true);
      const suggestedSpaces = result.getValue().data.suggestedSpaces;

      // Should not have duplicates
      const uniqueIds = new Set(suggestedSpaces.map(s => s.id));
      expect(uniqueIds.size).toBe(suggestedSpaces.length);
    });
  });

  describe('Real-world Scenarios', () => {
    it('should handle freshman onboarding flow', async () => {
      // Arrange
      const freshmanData: OnboardingData = {
        email: 'freshman2025@buffalo.edu',
        handle: 'freshman2025',
        firstName: 'Fresh',
        lastName: 'Man',
        major: 'Undeclared',
        graduationYear: 2029,
        dorm: 'Ellicott',
        interests: ['Making Friends', 'Campus Events']
      };

      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Not found'));
      mockProfileRepo.save.mockResolvedValue(Result.ok(undefined));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.fail('Feed initialized'));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok([]));

      // Act
      const result = await service.completeOnboarding(freshmanData);

      // Assert
      expect(result.isSuccess).toBe(true);
      const profile = result.getValue().data.profile;
      expect(profile.personalInfo.graduationYear).toBe(2029);
    });

    it('should handle transfer student onboarding', async () => {
      // Arrange
      const transferData: OnboardingData = {
        email: 'transfer@buffalo.edu',
        handle: 'transfer_student',
        firstName: 'Transfer',
        lastName: 'Student',
        major: 'Engineering',
        graduationYear: 2026,
        interests: ['Networking', 'Study Groups']
      };

      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Not found'));
      mockProfileRepo.save.mockResolvedValue(Result.ok(undefined));
      mockFeedRepo.findByUserId.mockResolvedValue(Result.fail('Feed initialized'));
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok([]));
      mockSpaceRepo.findTrending.mockResolvedValue(Result.ok([]));

      // Act
      const result = await service.completeOnboarding(transferData);

      // Assert
      expect(result.isSuccess).toBe(true);
    });
  });
});
