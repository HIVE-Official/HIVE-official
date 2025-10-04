/**
 * Profile Onboarding Complete Flow - Integration Test
 * Tests the end-to-end onboarding flow integration between services, repositories, and events
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProfileOnboardingService, OnboardingData } from '../../application/profile-onboarding.service';
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

// Mock repository factory to return our controlled mocks
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

vi.mock('../../infrastructure/repositories/factory', () => ({
  getProfileRepository: () => mockProfileRepo,
  getSpaceRepository: () => mockSpaceRepo,
  getFeedRepository: () => mockFeedRepo
}));

describe('Profile Onboarding Complete Flow - Integration', () => {
  let onboardingService: ProfileOnboardingService;

  beforeEach(() => {
    vi.clearAllMocks();

    onboardingService = new ProfileOnboardingService({
      campusId: 'ub-buffalo'
    });
  });

  // Test data factory
  const createValidOnboardingData = (): OnboardingData => ({
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

  describe('Service Integration Flow', () => {
    it('should integrate ProfileOnboardingService with repository layer', async () => {
      const onboardingData = createValidOnboardingData();

      // Mock repository responses for successful flow
      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Handle not found')); // Available
      mockProfileRepo.findByEmail.mockResolvedValue(Result.fail('Email not found')); // Available
      mockProfileRepo.save.mockResolvedValue(Result.ok());

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
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok(mockSpaces));

      // Execute the onboarding flow
      const result = await onboardingService.completeOnboarding(onboardingData);

      // Verify the integration worked
      expect(result.isSuccess).toBe(true);

      // Verify repository calls were made in correct order
      expect(mockProfileRepo.findByHandle).toHaveBeenCalledWith(expect.objectContaining({
        value: 'johndoe'
      }));
      expect(mockProfileRepo.findByEmail).toHaveBeenCalledWith(expect.objectContaining({
        value: 'john.doe@buffalo.edu'
      }));
      expect(mockProfileRepo.save).toHaveBeenCalled();
      expect(mockSpaceRepo.findByType).toHaveBeenCalled();

      // Verify result structure
      const serviceResult = result.getValue();
      expect(serviceResult.data).toBeDefined();
      expect(serviceResult.data.profile).toBeDefined();
      expect(serviceResult.data.suggestedSpaces).toBeDefined();
      expect(serviceResult.data.nextSteps).toBeDefined();
    });

    it('should handle validation errors at service layer', async () => {
      const invalidOnboardingData: OnboardingData = {
        email: 'invalid-email', // Invalid email format
        handle: 'ab', // Too short handle
        firstName: 'John',
        lastName: 'Doe'
      };

      // Execute onboarding with invalid data
      const result = await onboardingService.completeOnboarding(invalidOnboardingData);

      // Verify validation failed
      expect(result.isFailure).toBe(true);
      expect(result.error).toBeDefined();

      // Verify no repository calls were made for save operations
      expect(mockProfileRepo.save).not.toHaveBeenCalled();
    });

    it('should handle duplicate handle validation', async () => {
      const onboardingData = createValidOnboardingData();

      // Mock existing profile with same handle
      const existingProfile = { id: 'existing_profile' };
      mockProfileRepo.findByHandle.mockResolvedValue(Result.ok(existingProfile));

      // Execute onboarding
      const result = await onboardingService.completeOnboarding(onboardingData);

      // Verify duplicate handle error
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Handle is already taken');

      // Verify profile was not saved
      expect(mockProfileRepo.save).not.toHaveBeenCalled();
    });

    it('should handle duplicate email validation', async () => {
      const onboardingData = createValidOnboardingData();

      // Mock existing profile with same email
      const existingProfile = { id: 'existing_profile' };
      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Handle not found')); // Available
      mockProfileRepo.findByEmail.mockResolvedValue(Result.ok(existingProfile)); // Taken

      // Execute onboarding
      const result = await onboardingService.completeOnboarding(onboardingData);

      // Verify duplicate email error
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Email is already registered');

      // Verify profile was not saved
      expect(mockProfileRepo.save).not.toHaveBeenCalled();
    });

    it('should integrate with space repository for suggestions', async () => {
      const onboardingData = createValidOnboardingData();

      // Setup successful profile creation
      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Handle not found'));
      mockProfileRepo.findByEmail.mockResolvedValue(Result.fail('Email not found'));
      mockProfileRepo.save.mockResolvedValue(Result.ok());

      // Mock space suggestions based on major
      const csSpaces = [
        { id: { id: 'space_cs_001' }, name: { name: 'CS Students' }, getMemberCount: () => 245 }
      ];
      const interestSpaces = [
        { id: { id: 'space_gaming_002' }, name: { name: 'Gaming Club' }, getMemberCount: () => 156 }
      ];

      // Mock different types of space queries
      mockSpaceRepo.findByType
        .mockResolvedValueOnce(Result.ok(csSpaces)) // Academic spaces
        .mockResolvedValueOnce(Result.ok(interestSpaces)); // Interest spaces

      // Execute onboarding
      const result = await onboardingService.completeOnboarding(onboardingData);

      // Verify integration with space repository
      expect(result.isSuccess).toBe(true);
      expect(mockSpaceRepo.findByType).toHaveBeenCalled();

      const serviceResult = result.getValue();
      expect(serviceResult.data.suggestedSpaces.length).toBeGreaterThan(0);
    });

    it('should handle repository connection errors gracefully', async () => {
      const onboardingData = createValidOnboardingData();

      // Mock repository connection error
      mockProfileRepo.findByHandle.mockRejectedValue(new Error('Database connection failed'));

      // Execute onboarding
      const result = await onboardingService.completeOnboarding(onboardingData);

      // Verify graceful error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toBeDefined();

      // Service should handle the error without crashing
      expect(typeof result.error).toBe('string');
    });

    it('should continue onboarding even if space suggestions fail', async () => {
      const onboardingData = createValidOnboardingData();

      // Setup successful profile validation and creation
      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Handle not found'));
      mockProfileRepo.findByEmail.mockResolvedValue(Result.fail('Email not found'));
      mockProfileRepo.save.mockResolvedValue(Result.ok());

      // Mock space service failure
      mockSpaceRepo.findByType.mockResolvedValue(Result.fail('Space service unavailable'));

      // Execute onboarding
      const result = await onboardingService.completeOnboarding(onboardingData);

      // Verify onboarding still succeeds
      expect(result.isSuccess).toBe(true);

      // Profile should be created even if spaces fail
      expect(mockProfileRepo.save).toHaveBeenCalled();

      const serviceResult = result.getValue();
      expect(serviceResult.data.profile).toBeDefined();

      // Space suggestions should be empty but onboarding should continue
      expect(serviceResult.data.suggestedSpaces).toEqual([]);
    });
  });

  describe('Cross-Domain Integration', () => {
    it('should generate next steps based on profile completeness', async () => {
      const incompleteData: OnboardingData = {
        email: 'jane.smith@buffalo.edu',
        handle: 'janesmith',
        firstName: 'Jane',
        lastName: 'Smith'
        // Missing bio, major, interests, etc.
      };

      // Setup mocks
      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Handle not found'));
      mockProfileRepo.findByEmail.mockResolvedValue(Result.fail('Email not found'));
      mockProfileRepo.save.mockResolvedValue(Result.ok());
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok([]));

      // Execute onboarding
      const result = await onboardingService.completeOnboarding(incompleteData);

      // Verify onboarding succeeded
      expect(result.isSuccess).toBe(true);

      const serviceResult = result.getValue();

      // Verify next steps include profile completion suggestions
      expect(serviceResult.data.nextSteps).toBeDefined();
      expect(serviceResult.data.nextSteps.length).toBeGreaterThan(0);

      // Should have suggestions for missing information
      const actions = serviceResult.data.nextSteps.map(step => step.action);
      expect(actions.some(action => action.toLowerCase().includes('bio'))).toBe(true);
    });

    it('should provide warnings for incomplete profiles', async () => {
      const minimalData: OnboardingData = {
        email: 'minimal@buffalo.edu',
        handle: 'minimal',
        firstName: 'Min',
        lastName: 'User'
      };

      // Setup mocks
      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Handle not found'));
      mockProfileRepo.findByEmail.mockResolvedValue(Result.fail('Email not found'));
      mockProfileRepo.save.mockResolvedValue(Result.ok());
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok([]));

      // Execute onboarding
      const result = await onboardingService.completeOnboarding(minimalData);

      // Verify warnings are generated
      expect(result.isSuccess).toBe(true);

      const serviceResult = result.getValue();
      expect(serviceResult.warnings).toBeDefined();
      expect(serviceResult.warnings.length).toBeGreaterThan(0);

      // Should warn about missing profile information
      const warningMessages = serviceResult.warnings.join(' ');
      expect(warningMessages.toLowerCase()).toContain('incomplete');
    });
  });

  describe('Repository Layer Integration', () => {
    it('should call repositories in correct sequence', async () => {
      const onboardingData = createValidOnboardingData();

      // Setup all mocks for successful flow
      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Handle not found'));
      mockProfileRepo.findByEmail.mockResolvedValue(Result.fail('Email not found'));
      mockProfileRepo.save.mockResolvedValue(Result.ok());
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok([]));

      // Execute onboarding
      await onboardingService.completeOnboarding(onboardingData);

      // Verify repository call sequence
      expect(mockProfileRepo.findByHandle).toHaveBeenCalledBefore(mockProfileRepo.save as any);
      expect(mockProfileRepo.findByEmail).toHaveBeenCalledBefore(mockProfileRepo.save as any);
      expect(mockProfileRepo.save).toHaveBeenCalledBefore(mockSpaceRepo.findByType as any);
    });

    it('should pass correct parameters to repositories', async () => {
      const onboardingData = createValidOnboardingData();

      // Setup mocks
      mockProfileRepo.findByHandle.mockResolvedValue(Result.fail('Handle not found'));
      mockProfileRepo.findByEmail.mockResolvedValue(Result.fail('Email not found'));
      mockProfileRepo.save.mockResolvedValue(Result.ok());
      mockSpaceRepo.findByType.mockResolvedValue(Result.ok([]));

      // Execute onboarding
      await onboardingService.completeOnboarding(onboardingData);

      // Verify parameters passed to repositories
      expect(mockProfileRepo.findByHandle).toHaveBeenCalledWith(
        expect.objectContaining({ value: 'johndoe' })
      );
      expect(mockProfileRepo.findByEmail).toHaveBeenCalledWith(
        expect.objectContaining({ value: 'john.doe@buffalo.edu' })
      );

      // Verify profile save was called with Profile aggregate
      expect(mockProfileRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          handle: expect.objectContaining({ value: 'johndoe' }),
          email: expect.objectContaining({ value: 'john.doe@buffalo.edu' })
        })
      );
    });
  });
});