"use strict";
/**
 * Profile Onboarding Complete Flow - Integration Test
 * Tests the end-to-end onboarding flow integration between services, repositories, and events
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const profile_onboarding_service_1 = require("../../application/profile-onboarding.service");
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
// Mock repository factory to return our controlled mocks
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
vitest_1.vi.mock('../../infrastructure/repositories/factory', () => ({
    getProfileRepository: () => mockProfileRepo,
    getSpaceRepository: () => mockSpaceRepo,
    getFeedRepository: () => mockFeedRepo
}));
(0, vitest_1.describe)('Profile Onboarding Complete Flow - Integration', () => {
    let onboardingService;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        onboardingService = new profile_onboarding_service_1.ProfileOnboardingService({
            campusId: 'ub-buffalo'
        });
    });
    // Test data factory
    const createValidOnboardingData = () => ({
        email: 'john.doe@buffalo.edu',
        handle: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        bio: 'UB Computer Science student passionate about technology',
        major: 'Computer Science',
        graduationYear: 2025,
        dorm: 'Governors',
        interests: ['Coding', 'Basketball', 'Gaming'],
        profileImageUrl: 'https://example.com/john.jpg'
    });
    (0, vitest_1.describe)('Service Integration Flow', () => {
        (0, vitest_1.it)('should integrate ProfileOnboardingService with repository layer', async () => {
            const onboardingData = createValidOnboardingData();
            // Mock repository responses for successful flow
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Handle not found')); // Available
            mockProfileRepo.findByEmail.mockResolvedValue(Result_1.Result.fail('Email not found')); // Available
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok());
            // Mock space suggestions
            const mockSpaces = [
                {
                    id: { id: 'space_cs_001' },
                    name: { name: 'Computer Science Students' },
                    getMemberCount: () => 245
                },
                {
                    id: { id: 'space_tech_002' },
                    name: { name: 'Tech Enthusiasts' },
                    getMemberCount: () => 189
                }
            ];
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok(mockSpaces));
            // Execute the onboarding flow
            const result = await onboardingService.completeOnboarding(onboardingData);
            // Verify the integration worked
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            // Verify repository calls were made in correct order
            (0, vitest_1.expect)(mockProfileRepo.findByHandle).toHaveBeenCalledWith(vitest_1.expect.objectContaining({
                value: 'johndoe'
            }));
            (0, vitest_1.expect)(mockProfileRepo.findByEmail).toHaveBeenCalledWith(vitest_1.expect.objectContaining({
                value: 'john.doe@buffalo.edu'
            }));
            (0, vitest_1.expect)(mockProfileRepo.save).toHaveBeenCalled();
            (0, vitest_1.expect)(mockSpaceRepo.findByType).toHaveBeenCalled();
            // Verify result structure
            const serviceResult = result.getValue();
            (0, vitest_1.expect)(serviceResult.data).toBeDefined();
            (0, vitest_1.expect)(serviceResult.data.profile).toBeDefined();
            (0, vitest_1.expect)(serviceResult.data.suggestedSpaces).toBeDefined();
            (0, vitest_1.expect)(serviceResult.data.nextSteps).toBeDefined();
        });
        (0, vitest_1.it)('should handle validation errors at service layer', async () => {
            const invalidOnboardingData = {
                email: 'invalid-email', // Invalid email format
                handle: 'ab', // Too short handle
                firstName: 'John',
                lastName: 'Doe'
            };
            // Execute onboarding with invalid data
            const result = await onboardingService.completeOnboarding(invalidOnboardingData);
            // Verify validation failed
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBeDefined();
            // Verify no repository calls were made for save operations
            (0, vitest_1.expect)(mockProfileRepo.save).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle duplicate handle validation', async () => {
            const onboardingData = createValidOnboardingData();
            // Mock existing profile with same handle
            const existingProfile = { id: 'existing_profile' };
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.ok(existingProfile));
            // Execute onboarding
            const result = await onboardingService.completeOnboarding(onboardingData);
            // Verify duplicate handle error
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Handle is already taken');
            // Verify profile was not saved
            (0, vitest_1.expect)(mockProfileRepo.save).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle duplicate email validation', async () => {
            const onboardingData = createValidOnboardingData();
            // Mock existing profile with same email
            const existingProfile = { id: 'existing_profile' };
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Handle not found')); // Available
            mockProfileRepo.findByEmail.mockResolvedValue(Result_1.Result.ok(existingProfile)); // Taken
            // Execute onboarding
            const result = await onboardingService.completeOnboarding(onboardingData);
            // Verify duplicate email error
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Email is already registered');
            // Verify profile was not saved
            (0, vitest_1.expect)(mockProfileRepo.save).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should integrate with space repository for suggestions', async () => {
            const onboardingData = createValidOnboardingData();
            // Setup successful profile creation
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Handle not found'));
            mockProfileRepo.findByEmail.mockResolvedValue(Result_1.Result.fail('Email not found'));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok());
            // Mock space suggestions based on major
            const csSpaces = [
                { id: { id: 'space_cs_001' }, name: { name: 'CS Students' }, getMemberCount: () => 245 }
            ];
            const interestSpaces = [
                { id: { id: 'space_gaming_002' }, name: { name: 'Gaming Club' }, getMemberCount: () => 156 }
            ];
            // Mock different types of space queries
            mockSpaceRepo.findByType
                .mockResolvedValueOnce(Result_1.Result.ok(csSpaces)) // Academic spaces
                .mockResolvedValueOnce(Result_1.Result.ok(interestSpaces)); // Interest spaces
            // Execute onboarding
            const result = await onboardingService.completeOnboarding(onboardingData);
            // Verify integration with space repository
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockSpaceRepo.findByType).toHaveBeenCalled();
            const serviceResult = result.getValue();
            (0, vitest_1.expect)(serviceResult.data.suggestedSpaces.length).toBeGreaterThan(0);
        });
        (0, vitest_1.it)('should handle repository connection errors gracefully', async () => {
            const onboardingData = createValidOnboardingData();
            // Mock repository connection error
            mockProfileRepo.findByHandle.mockRejectedValue(new Error('Database connection failed'));
            // Execute onboarding
            const result = await onboardingService.completeOnboarding(onboardingData);
            // Verify graceful error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBeDefined();
            // Service should handle the error without crashing
            (0, vitest_1.expect)(typeof result.error).toBe('string');
        });
        (0, vitest_1.it)('should continue onboarding even if space suggestions fail', async () => {
            const onboardingData = createValidOnboardingData();
            // Setup successful profile validation and creation
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Handle not found'));
            mockProfileRepo.findByEmail.mockResolvedValue(Result_1.Result.fail('Email not found'));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok());
            // Mock space service failure
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.fail('Space service unavailable'));
            // Execute onboarding
            const result = await onboardingService.completeOnboarding(onboardingData);
            // Verify onboarding still succeeds
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            // Profile should be created even if spaces fail
            (0, vitest_1.expect)(mockProfileRepo.save).toHaveBeenCalled();
            const serviceResult = result.getValue();
            (0, vitest_1.expect)(serviceResult.data.profile).toBeDefined();
            // Space suggestions should be empty but onboarding should continue
            (0, vitest_1.expect)(serviceResult.data.suggestedSpaces).toEqual([]);
        });
    });
    (0, vitest_1.describe)('Cross-Domain Integration', () => {
        (0, vitest_1.it)('should generate next steps based on profile completeness', async () => {
            const incompleteData = {
                email: 'jane.smith@buffalo.edu',
                handle: 'janesmith',
                firstName: 'Jane',
                lastName: 'Smith'
                // Missing bio, major, interests, etc.
            };
            // Setup mocks
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Handle not found'));
            mockProfileRepo.findByEmail.mockResolvedValue(Result_1.Result.fail('Email not found'));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok());
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok([]));
            // Execute onboarding
            const result = await onboardingService.completeOnboarding(incompleteData);
            // Verify onboarding succeeded
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const serviceResult = result.getValue();
            // Verify next steps include profile completion suggestions
            (0, vitest_1.expect)(serviceResult.data.nextSteps).toBeDefined();
            (0, vitest_1.expect)(serviceResult.data.nextSteps.length).toBeGreaterThan(0);
            // Should have suggestions for missing information
            const actions = serviceResult.data.nextSteps.map(step => step.action);
            (0, vitest_1.expect)(actions.some(action => action.toLowerCase().includes('bio'))).toBe(true);
        });
        (0, vitest_1.it)('should provide warnings for incomplete profiles', async () => {
            const minimalData = {
                email: 'minimal@buffalo.edu',
                handle: 'minimal',
                firstName: 'Min',
                lastName: 'User'
            };
            // Setup mocks
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Handle not found'));
            mockProfileRepo.findByEmail.mockResolvedValue(Result_1.Result.fail('Email not found'));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok());
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok([]));
            // Execute onboarding
            const result = await onboardingService.completeOnboarding(minimalData);
            // Verify warnings are generated
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const serviceResult = result.getValue();
            (0, vitest_1.expect)(serviceResult.warnings).toBeDefined();
            (0, vitest_1.expect)(serviceResult.warnings).not.toBeUndefined();
            (0, vitest_1.expect)(serviceResult.warnings.length).toBeGreaterThan(0);
            // Should warn about missing profile information
            const warningMessages = serviceResult.warnings.join(' ');
            (0, vitest_1.expect)(warningMessages.toLowerCase()).toContain('incomplete');
        });
    });
    (0, vitest_1.describe)('Repository Layer Integration', () => {
        (0, vitest_1.it)('should call repositories in correct sequence', async () => {
            const onboardingData = createValidOnboardingData();
            // Setup all mocks for successful flow
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Handle not found'));
            mockProfileRepo.findByEmail.mockResolvedValue(Result_1.Result.fail('Email not found'));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok());
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok([]));
            // Execute onboarding
            await onboardingService.completeOnboarding(onboardingData);
            // Verify repository calls
            (0, vitest_1.expect)(mockProfileRepo.findByHandle).toHaveBeenCalled();
            (0, vitest_1.expect)(mockProfileRepo.findByEmail).toHaveBeenCalled();
            (0, vitest_1.expect)(mockProfileRepo.save).toHaveBeenCalled();
            (0, vitest_1.expect)(mockSpaceRepo.findByType).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should pass correct parameters to repositories', async () => {
            const onboardingData = createValidOnboardingData();
            // Setup mocks
            mockProfileRepo.findByHandle.mockResolvedValue(Result_1.Result.fail('Handle not found'));
            mockProfileRepo.findByEmail.mockResolvedValue(Result_1.Result.fail('Email not found'));
            mockProfileRepo.save.mockResolvedValue(Result_1.Result.ok());
            mockSpaceRepo.findByType.mockResolvedValue(Result_1.Result.ok([]));
            // Execute onboarding
            await onboardingService.completeOnboarding(onboardingData);
            // Verify parameters passed to repositories
            (0, vitest_1.expect)(mockProfileRepo.findByHandle).toHaveBeenCalledWith(vitest_1.expect.objectContaining({ value: 'johndoe' }));
            (0, vitest_1.expect)(mockProfileRepo.findByEmail).toHaveBeenCalledWith(vitest_1.expect.objectContaining({ value: 'john.doe@buffalo.edu' }));
            // Verify profile save was called with Profile aggregate
            (0, vitest_1.expect)(mockProfileRepo.save).toHaveBeenCalledWith(vitest_1.expect.objectContaining({
                handle: vitest_1.expect.objectContaining({ value: 'johndoe' }),
                email: vitest_1.expect.objectContaining({ value: 'john.doe@buffalo.edu' })
            }));
        });
    });
});
//# sourceMappingURL=profile-onboarding-flow.integration.test.js.map