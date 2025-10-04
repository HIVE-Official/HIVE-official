"use strict";
/**
 * ProfileOnboardingService Tests
 * Tests for profile onboarding orchestration
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const profile_onboarding_service_1 = require("../profile-onboarding.service");
const profile_aggregate_1 = require("../../domain/profile/aggregates/profile.aggregate");
const profile_id_value_1 = require("../../domain/profile/value-objects/profile-id.value");
const ub_email_value_1 = require("../../domain/profile/value-objects/ub-email.value");
const profile_handle_value_1 = require("../../domain/profile/value-objects/profile-handle.value");
const user_type_value_1 = require("../../domain/profile/value-objects/user-type.value");
const campus_id_value_1 = require("../../domain/profile/value-objects/campus-id.value");
const profile_privacy_value_1 = require("../../domain/profile/value-objects/profile-privacy.value");
const Result_1 = require("../../domain/shared/base/Result");
// Mock repositories
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
    findByType: vitest_1.vi.fn(),
    findTrending: vitest_1.vi.fn(),
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
// Mock the factory functions
vitest_1.vi.mock('../../infrastructure/repositories/factory', () => ({
    getProfileRepository: () => mockProfileRepo,
    getSpaceRepository: () => mockSpaceRepo,
    getFeedRepository: () => mockFeedRepo
}));
(0, vitest_1.describe)('ProfileOnboardingService', () => {
    let service;
    (0, vitest_1.beforeEach)(() => {
        service = new profile_onboarding_service_1.ProfileOnboardingService({ campusId: 'ub-buffalo' });
        vitest_1.vi.clearAllMocks();
    });
    // Helper to create valid onboarding data
    const createValidOnboardingData = () => ({
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
    (0, vitest_1.describe)('completeOnboarding()', () => {
        (0, vitest_1.it)('should successfully complete onboarding with valid data', async () => {
            // Arrange
            const data = createValidOnboardingData();
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Not found')); // Handle available
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.fail('Feed initialized'));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            const result = await service.completeOnboarding(data);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const serviceResult = result.getValue();
            (0, vitest_1.expect)(serviceResult.data.profile).toBeDefined();
            (0, vitest_1.expect)(serviceResult.data.profile.email.value).toBe('testuser@buffalo.edu');
            (0, vitest_1.expect)(serviceResult.data.profile.handle.value).toBe('testuser');
            (0, vitest_1.expect)(serviceResult.data.suggestedSpaces).toBeDefined();
            (0, vitest_1.expect)(serviceResult.data.nextSteps).toBeDefined();
        });
        (0, vitest_1.it)('should fail with invalid email domain', async () => {
            // Arrange
            const data = createValidOnboardingData();
            data.email = 'test@gmail.com'; // Invalid domain
            // Act
            const result = await service.completeOnboarding(data);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('email');
        });
        (0, vitest_1.it)('should fail when handle is already taken', async () => {
            // Arrange
            const data = createValidOnboardingData();
            const existingProfile = createValidProfile();
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.ok(existingProfile));
            // Act
            const result = await service.completeOnboarding(data);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Handle is already taken');
        });
        (0, vitest_1.it)('should fail with invalid handle format', async () => {
            // Arrange
            const data = createValidOnboardingData();
            data.handle = 'ab'; // Too short
            // Act
            const result = await service.completeOnboarding(data);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('at least 3 characters');
        });
        (0, vitest_1.it)('should add interests to profile', async () => {
            // Arrange
            const data = createValidOnboardingData();
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.fail('Feed initialized'));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            const result = await service.completeOnboarding(data);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const profile = result.getValue().data.profile;
            (0, vitest_1.expect)(profile.interests).toContain('Coding');
            (0, vitest_1.expect)(profile.interests).toContain('Gaming');
        });
        (0, vitest_1.it)('should initialize user feed', async () => {
            // Arrange
            const data = createValidOnboardingData();
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.fail('Feed initialized'));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            await service.completeOnboarding(data);
            // Assert
            (0, vitest_1.expect)(mockFeedRepo.findByUserId).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should provide suggested spaces based on major', async () => {
            // Arrange
            const data = createValidOnboardingData();
            const mockSpaces = [
                { id: { id: 'space1' }, name: { name: 'CS Study Group' }, getMemberCount: () => 50 }
            ];
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.fail('Feed initialized'));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok(mockSpaces));
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            const result = await service.completeOnboarding(data);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockSpaceRepo.findByType).toHaveBeenCalledWith('study-group', 'ub-buffalo');
        });
        (0, vitest_1.it)('should generate next steps for user', async () => {
            // Arrange
            const data = createValidOnboardingData();
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.fail('Feed initialized'));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            const result = await service.completeOnboarding(data);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const nextSteps = result.getValue().data.nextSteps;
            (0, vitest_1.expect)(nextSteps).toBeDefined();
            (0, vitest_1.expect)(nextSteps.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(nextSteps[0]).toHaveProperty('title');
            (0, vitest_1.expect)(nextSteps[0]).toHaveProperty('description');
            (0, vitest_1.expect)(nextSteps[0]).toHaveProperty('completed');
        });
        (0, vitest_1.it)('should include warnings for incomplete profile', async () => {
            // Arrange
            const data = createValidOnboardingData();
            delete data.bio; // Missing bio
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.fail('Feed initialized'));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            const result = await service.completeOnboarding(data);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const warnings = result.getValue().warnings;
            (0, vitest_1.expect)(warnings).toBeDefined();
            (0, vitest_1.expect)(Array.isArray(warnings)).toBe(true);
        });
    });
    (0, vitest_1.describe)('updateOnboardingProgress()', () => {
        (0, vitest_1.it)('should update onboarding progress for existing profile', async () => {
            // Arrange
            const profile = createValidProfile();
            const profileId = profile_id_value_1.ProfileId.create('profile_test_123').getValue();
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            // Act
            const result = await service.updateOnboardingProgress('profile_test_123', 'interests_selected', true);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockProfileRepo.findById).toHaveBeenCalledWith(profileId);
        });
        (0, vitest_1.it)('should fail when profile not found', async () => {
            // Arrange
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.fail('Profile not found'));
            // Act
            const result = await service.updateOnboardingProgress('nonexistent', 'interests_selected', true);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Profile not found');
        });
        (0, vitest_1.it)('should complete onboarding when all steps done', async () => {
            // Arrange
            const profile = createValidProfile();
            // Mock profile as having all requirements met
            vitest_1.vi.spyOn(profile, 'getOnboardingStatus').mockReturnValue({
                isComplete: true,
                completedSteps: ['email_verified', 'handle_set', 'basic_info', 'interests_selected'],
                remainingSteps: [],
                completionPercentage: 100,
                nextSteps: [],
                warnings: []
            });
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.updateOnboardingProgress('profile_test_123', 'final_step', true);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
    (0, vitest_1.describe)('getOnboardingStatus()', () => {
        (0, vitest_1.it)('should return onboarding status for existing profile', async () => {
            // Arrange
            const profile = createValidProfile();
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            // Act
            const result = await service.getOnboardingStatus('profile_test_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const status = result.getValue();
            (0, vitest_1.expect)(status).toHaveProperty('isComplete');
            (0, vitest_1.expect)(status).toHaveProperty('completedSteps');
            (0, vitest_1.expect)(status).toHaveProperty('remainingSteps');
            (0, vitest_1.expect)(status).toHaveProperty('percentComplete');
        });
        (0, vitest_1.it)('should fail when profile not found', async () => {
            // Arrange
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.fail('Profile not found'));
            // Act
            const result = await service.getOnboardingStatus('nonexistent');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Profile not found');
        });
        (0, vitest_1.it)('should reflect completion percentage from profile', async () => {
            // Arrange
            const profile = createValidProfile();
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            // Act
            const result = await service.getOnboardingStatus('profile_test_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const status = result.getValue();
            (0, vitest_1.expect)(status.percentComplete).toBeGreaterThanOrEqual(0);
            (0, vitest_1.expect)(status.percentComplete).toBeLessThanOrEqual(100);
        });
    });
    (0, vitest_1.describe)('Edge Cases', () => {
        (0, vitest_1.it)('should handle missing optional fields gracefully', async () => {
            // Arrange
            const data = {
                email: 'minimal@buffalo.edu',
                handle: 'minimal',
                firstName: 'Min',
                lastName: 'User'
                // No bio, major, etc.
            };
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.fail('Feed initialized'));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            const result = await service.completeOnboarding(data);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should handle repository errors gracefully', async () => {
            // Arrange
            const data = createValidOnboardingData();
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockProfileRepo.save.mockRejectedValue(new Error('Database error'));
            // Act
            const result = await service.completeOnboarding(data);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should deduplicate suggested spaces', async () => {
            // Arrange
            const data = createValidOnboardingData();
            const duplicateSpace = {
                id: { id: 'space1' },
                name: { name: 'Duplicate' },
                getMemberCount: () => 50
            };
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.fail('Feed initialized'));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok([duplicateSpace]));
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok([duplicateSpace]));
            // Act
            const result = await service.completeOnboarding(data);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const suggestedSpaces = result.getValue().data.suggestedSpaces;
            // Should not have duplicates
            const uniqueIds = new Set(suggestedSpaces.map(s => s.id));
            (0, vitest_1.expect)(uniqueIds.size).toBe(suggestedSpaces.length);
        });
    });
    (0, vitest_1.describe)('Real-world Scenarios', () => {
        (0, vitest_1.it)('should handle freshman onboarding flow', async () => {
            // Arrange
            const freshmanData = {
                email: 'freshman2025@buffalo.edu',
                handle: 'freshman2025',
                firstName: 'Fresh',
                lastName: 'Man',
                major: 'Undeclared',
                graduationYear: 2029,
                dorm: 'Ellicott',
                interests: ['Making Friends', 'Campus Events']
            };
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.fail('Feed initialized'));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            const result = await service.completeOnboarding(freshmanData);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const profile = result.getValue().data.profile;
            (0, vitest_1.expect)(profile.personalInfo.graduationYear).toBe(2029);
        });
        (0, vitest_1.it)('should handle transfer student onboarding', async () => {
            // Arrange
            const transferData = {
                email: 'transfer@buffalo.edu',
                handle: 'transfer_student',
                firstName: 'Transfer',
                lastName: 'Student',
                major: 'Engineering',
                graduationYear: 2026,
                interests: ['Networking', 'Study Groups']
            };
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockFeedRepo.findByUserId.mockResolvedValue(Result_1.Result.fail('Feed initialized'));
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok([]));
            mockSpaceRepo.findTrending.mockResolvedValue(Result_1.Result.ok([]));
            // Act
            const result = await service.completeOnboarding(transferData);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
});
//# sourceMappingURL=profile-onboarding.service.test.js.map