/**
 * RitualParticipationService Tests
 * Tests for ritual participation and progress tracking orchestration
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RitualParticipationService, RitualCreationData } from '../ritual-participation.service';
import { Ritual } from '../../domain/rituals/aggregates/ritual.aggregate';
import { RitualId } from '../../domain/rituals/value-objects/ritual-id.value';
import { Participation } from '../../domain/rituals/entities/participation';
import { ProfileId } from '../../domain/profile/value-objects/profile-id.value';
import { CampusId } from '../../domain/profile/value-objects/campus-id.value';
import { Profile } from '../../domain/profile/aggregates/profile.aggregate';
import { UBEmail } from '../../domain/profile/value-objects/ub-email.value';
import { ProfileHandle } from '../../domain/profile/value-objects/profile-handle.value';
import { UserType } from '../../domain/profile/value-objects/user-type.value';
import { ProfilePrivacy } from '../../domain/profile/value-objects/profile-privacy.value';
import { Result } from '../../domain/shared/base/Result';

// Mock repositories
const mockRitualRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findActive: vi.fn(),
  findByParticipant: vi.fn(),
  findLeaderboard: vi.fn(),
  findParticipation: vi.fn(),
  saveParticipation: vi.fn(),
  subscribeToRitual: vi.fn(),
  subscribeToActiveRituals: vi.fn(),
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

describe('RitualParticipationService', () => {
  let service: RitualParticipationService;

  beforeEach(() => {
    service = new RitualParticipationService(
      { campusId: 'ub-buffalo', userId: 'user_test_123' },
      mockRitualRepo as any,
      mockProfileRepo as any,
      mockFeedRepo as any
    );
    vi.clearAllMocks();
  });

  // Helper to create a valid ritual
  const createValidRitual = (overrides?: any): Ritual => {
    const ritualId = RitualId.create('ritual_test_123').getValue();
    const campusId = CampusId.create('ub-buffalo').getValue();
    const createdBy = ProfileId.create('profile_123').getValue();

    return Ritual.create({
      ritualId,
      name: 'Test Ritual',
      description: 'Test Description',
      type: 'short',
      category: 'social',
      duration: '1 week',
      campusId,
      startDate: new Date(),
      createdBy,
      targetAudience: 'all',
      visibility: 'public',
      goals: [],
      requirements: [],
      rewards: [],
      status: 'active',
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
        bio: 'Test bio'
      },
      privacy
    }).getValue();
  };

  // Helper to create valid participation
  const createValidParticipation = (): Participation => {
    const ritualId = RitualId.create('ritual_test_123').getValue();
    const profileId = ProfileId.create('profile_test_123').getValue();

    return Participation.create({
      ritualId,
      profileId
    }).getValue();
  };

  describe('createRitual()', () => {
    it('should successfully create a ritual with valid data', async () => {
      // Arrange
      const profile = createValidProfile();
      const data: RitualCreationData = {
        name: 'Welcome Week Challenge',
        description: 'Complete campus activities',
        ritualType: 'short',
        category: 'social',
        duration: '1 week',
        startDate: new Date(),
        goals: [{
          description: 'Attend 3 events',
          type: 'individual',
          targetValue: 3
        }],
        requirements: [{
          action: 'Attend event',
          target: 3,
          validation: 'manual'
        }],
        rewards: [{
          type: 'badge',
          name: 'Social Butterfly',
          description: 'Attended 3 events'
        }]
      };

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockRitualRepo.save.mockResolvedValue(Result.ok(undefined));
      mockRitualRepo.findParticipation.mockResolvedValue(Result.fail('Not found'));

      // Act
      const result = await service.createRitual('profile_test_123', data);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockRitualRepo.save).toHaveBeenCalled();
    });

    it('should fail when creator profile not found', async () => {
      // Arrange
      const data: RitualCreationData = {
        name: 'Test Ritual',
        description: 'Test',
        ritualType: 'short',
        category: 'social',
        duration: '1 week',
        startDate: new Date(),
        goals: [],
        requirements: [],
        rewards: []
      };

      mockProfileRepo.findById.mockResolvedValue(Result.fail('Not found'));

      // Act
      const result = await service.createRitual('nonexistent', data);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Creator profile not found');
    });

    it('should fail when short ritual has wrong duration', async () => {
      // Arrange
      const profile = createValidProfile();
      const data: RitualCreationData = {
        name: 'Test Ritual',
        description: 'Test',
        ritualType: 'short',
        category: 'social',
        duration: '2 weeks', // Wrong duration for short ritual
        startDate: new Date(),
        goals: [],
        requirements: [],
        rewards: []
      };

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));

      // Act
      const result = await service.createRitual('profile_test_123', data);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Short rituals must be 1 week duration');
    });

    it('should fail when yearbook ritual has wrong duration', async () => {
      // Arrange
      const profile = createValidProfile();
      const data: RitualCreationData = {
        name: 'Test Ritual',
        description: 'Test',
        ritualType: 'yearbook',
        category: 'social',
        duration: '1 week', // Wrong duration for yearbook ritual
        startDate: new Date(),
        goals: [],
        requirements: [],
        rewards: []
      };

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));

      // Act
      const result = await service.createRitual('profile_test_123', data);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Yearbook rituals must be 3 weeks duration');
    });

    it('should make creator automatically participate', async () => {
      // Arrange
      const profile = createValidProfile();
      const ritual = createValidRitual();
      const data: RitualCreationData = {
        name: 'Test Ritual',
        description: 'Test',
        ritualType: 'short',
        category: 'social',
        duration: '1 week',
        startDate: new Date(),
        goals: [],
        requirements: [],
        rewards: []
      };

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockRitualRepo.save.mockResolvedValue(Result.ok(undefined));
      mockRitualRepo.findById.mockResolvedValue(Result.ok(ritual)); // For joinRitual call
      mockRitualRepo.findParticipation.mockResolvedValue(Result.fail('Not found'));
      mockRitualRepo.saveParticipation.mockResolvedValue(Result.ok(undefined));

      // Act
      await service.createRitual('profile_test_123', data);

      // Assert
      expect(mockRitualRepo.saveParticipation).toHaveBeenCalled();
    });
  });

  describe('joinRitual()', () => {
    it('should successfully join a ritual', async () => {
      // Arrange
      const ritual = createValidRitual();
      const participation = createValidParticipation();

      mockRitualRepo.findById.mockResolvedValue(Result.ok(ritual));
      mockRitualRepo.findParticipation.mockResolvedValue(Result.fail('Not found'));
      mockRitualRepo.saveParticipation.mockResolvedValue(Result.ok(undefined));
      mockRitualRepo.save.mockResolvedValue(Result.ok(undefined));

      // Act
      const result = await service.joinRitual('profile_test_123', 'ritual_test_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockRitualRepo.saveParticipation).toHaveBeenCalled();
    });

    it('should fail when ritual not found', async () => {
      // Arrange
      mockRitualRepo.findById.mockResolvedValue(Result.fail('Not found'));

      // Act
      const result = await service.joinRitual('profile_test_123', 'nonexistent');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Ritual not found');
    });

    it('should fail when already participating', async () => {
      // Arrange
      const ritual = createValidRitual();
      const participation = createValidParticipation();

      mockRitualRepo.findById.mockResolvedValue(Result.ok(ritual));
      mockRitualRepo.findParticipation.mockResolvedValue(Result.ok(participation));

      // Act
      const result = await service.joinRitual('profile_test_123', 'ritual_test_123');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Already participating');
    });

    it('should fail when ritual is full', async () => {
      // Arrange
      const ritual = createValidRitual({
        targetParticipation: 1
      });

      // Add a participant to make it full
      const existingProfileId = ProfileId.create('other_user').getValue();
      ritual.addParticipant(existingProfileId);

      mockRitualRepo.findById.mockResolvedValue(Result.ok(ritual));
      mockRitualRepo.findParticipation.mockResolvedValue(Result.fail('Not found'));

      // Act
      const result = await service.joinRitual('profile_test_123', 'ritual_test_123');

      // Assert
      expect(result.isFailure).toBe(true);
    });
  });

  describe('recordProgress()', () => {
    it('should successfully record progress', async () => {
      // Arrange
      const ritual = createValidRitual({
        milestones: [{
          id: 'milestone_1',
          title: 'Test Milestone',
          name: 'Test',
          description: 'Complete task',
          targetValue: 10,
          currentValue: 0,
          isCompleted: false,
          participantCompletions: [],
          rewards: []
        }]
      });
      const participation = createValidParticipation();

      mockRitualRepo.findParticipation.mockResolvedValue(Result.ok(participation));
      mockRitualRepo.findById.mockResolvedValue(Result.ok(ritual));
      mockRitualRepo.saveParticipation.mockResolvedValue(Result.ok(undefined));
      mockRitualRepo.save.mockResolvedValue(Result.ok(undefined));
      mockRitualRepo.findLeaderboard.mockResolvedValue(Result.ok([participation]));

      // Act
      const result = await service.recordProgress('profile_test_123', 'ritual_test_123', 'milestone_1', 5);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockRitualRepo.saveParticipation).toHaveBeenCalled();
    });

    it('should fail when not participating', async () => {
      // Arrange
      mockRitualRepo.findParticipation.mockResolvedValue(Result.fail('Not found'));

      // Act
      const result = await service.recordProgress('profile_test_123', 'ritual_test_123', 'milestone_1', 5);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Not participating');
    });

    it('should complete milestone when target reached', async () => {
      // Arrange
      const ritual = createValidRitual({
        milestones: [{
          id: 'milestone_1',
          title: 'Test Milestone',
          name: 'Test',
          description: 'Complete task',
          targetValue: 10,
          currentValue: 0,
          isCompleted: false,
          participantCompletions: [],
          rewards: []
        }]
      });
      const participation = createValidParticipation();

      mockRitualRepo.findParticipation.mockResolvedValue(Result.ok(participation));
      mockRitualRepo.findById.mockResolvedValue(Result.ok(ritual));
      mockRitualRepo.saveParticipation.mockResolvedValue(Result.ok(undefined));
      mockRitualRepo.save.mockResolvedValue(Result.ok(undefined));
      mockRitualRepo.findLeaderboard.mockResolvedValue(Result.ok([participation]));

      // Act
      const result = await service.recordProgress('profile_test_123', 'ritual_test_123', 'milestone_1', 10);

      // Assert
      expect(result.isSuccess).toBe(true);
      const progress = result.getValue();
      expect(progress.recentAchievements.length).toBeGreaterThan(0);
    });

    it('should update streak', async () => {
      // Arrange
      const ritual = createValidRitual({ milestones: [] });
      const participation = createValidParticipation();

      mockRitualRepo.findParticipation.mockResolvedValue(Result.ok(participation));
      mockRitualRepo.findById.mockResolvedValue(Result.ok(ritual));
      mockRitualRepo.saveParticipation.mockResolvedValue(Result.ok(undefined));
      mockRitualRepo.save.mockResolvedValue(Result.ok(undefined));
      mockRitualRepo.findLeaderboard.mockResolvedValue(Result.ok([participation]));

      // Act
      const result = await service.recordProgress('profile_test_123', 'ritual_test_123', 'milestone_1', 5);

      // Assert
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('getRitualProgress()', () => {
    it('should get user ritual progress', async () => {
      // Arrange
      const ritual = createValidRitual({ milestones: [] });
      const participation = createValidParticipation();

      mockRitualRepo.findParticipation.mockResolvedValue(Result.ok(participation));
      mockRitualRepo.findById.mockResolvedValue(Result.ok(ritual));
      mockRitualRepo.findLeaderboard.mockResolvedValue(Result.ok([participation]));

      // Act
      const result = await service.getRitualProgress('profile_test_123', 'ritual_test_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      const progress = result.getValue();
      expect(progress.ritual).toBeDefined();
      expect(progress.participation).toBeDefined();
      expect(progress.completionPercentage).toBeDefined();
    });

    it('should fail when not participating', async () => {
      // Arrange
      mockRitualRepo.findParticipation.mockResolvedValue(Result.fail('Not found'));

      // Act
      const result = await service.getRitualProgress('profile_test_123', 'ritual_test_123');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Not participating');
    });

    it('should calculate correct completion percentage', async () => {
      // Arrange
      const ritual = createValidRitual({
        milestones: [
          { id: 'm1', title: 'M1', name: 'M1', description: 'Milestone 1', targetValue: 10, currentValue: 0, isCompleted: false, participantCompletions: [], rewards: [] },
          { id: 'm2', title: 'M2', name: 'M2', description: 'Milestone 2', targetValue: 10, currentValue: 0, isCompleted: false, participantCompletions: [], rewards: [] }
        ]
      });
      const participation = createValidParticipation();
      participation.completeMilestone('m1'); // Complete 1 of 2

      mockRitualRepo.findParticipation.mockResolvedValue(Result.ok(participation));
      mockRitualRepo.findById.mockResolvedValue(Result.ok(ritual));
      mockRitualRepo.findLeaderboard.mockResolvedValue(Result.ok([participation]));

      // Act
      const result = await service.getRitualProgress('profile_test_123', 'ritual_test_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().completionPercentage).toBe(50);
    });
  });

  describe('getLeaderboard()', () => {
    it('should get ritual leaderboard', async () => {
      // Arrange
      const ritual = createValidRitual();
      const participation = createValidParticipation();
      const profile = createValidProfile();

      mockRitualRepo.findById.mockResolvedValue(Result.ok(ritual));
      mockRitualRepo.findLeaderboard.mockResolvedValue(Result.ok([participation]));
      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));

      // Act
      const result = await service.getLeaderboard('ritual_test_123', 10);

      // Assert
      expect(result.isSuccess).toBe(true);
      const leaderboard = result.getValue().data;
      expect(leaderboard.length).toBeGreaterThan(0);
      expect(leaderboard[0]).toHaveProperty('rank');
      expect(leaderboard[0]).toHaveProperty('displayName');
      expect(leaderboard[0]).toHaveProperty('totalPoints');
    });

    it('should fail when ritual not found', async () => {
      // Arrange
      mockRitualRepo.findById.mockResolvedValue(Result.fail('Not found'));

      // Act
      const result = await service.getLeaderboard('nonexistent');

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Ritual not found');
    });

    it('should assign correct ranks', async () => {
      // Arrange
      const ritual = createValidRitual();
      const p1 = createValidParticipation();
      const p2 = createValidParticipation();
      const profile = createValidProfile();

      mockRitualRepo.findById.mockResolvedValue(Result.ok(ritual));
      mockRitualRepo.findLeaderboard.mockResolvedValue(Result.ok([p1, p2]));
      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));

      // Act
      const result = await service.getLeaderboard('ritual_test_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      const leaderboard = result.getValue().data;
      expect(leaderboard[0].rank).toBe(1);
      expect(leaderboard[1].rank).toBe(2);
    });

    it('should limit leaderboard results', async () => {
      // Arrange
      const ritual = createValidRitual();
      const participations = Array(50).fill(null).map(() => createValidParticipation());
      const profile = createValidProfile();

      mockRitualRepo.findById.mockResolvedValue(Result.ok(ritual));
      mockRitualRepo.findLeaderboard.mockResolvedValue(Result.ok(participations));
      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));

      // Act
      const result = await service.getLeaderboard('ritual_test_123', 20);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(mockRitualRepo.findLeaderboard).toHaveBeenCalledWith(expect.anything(), 20);
    });
  });

  describe('getUserRituals()', () => {
    it('should get user active rituals', async () => {
      // Arrange
      const ritual = createValidRitual({ status: 'active' });

      mockRitualRepo.findByParticipant.mockResolvedValue(Result.ok([ritual]));

      // Act
      const result = await service.getUserRituals('profile_test_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      const rituals = result.getValue().data;
      expect(rituals.length).toBe(1);
      expect(rituals[0].toData().status).toBe('active');
    });

    it('should filter out inactive rituals', async () => {
      // Arrange
      const activeRitual = createValidRitual({ status: 'active' });
      const completedRitual = createValidRitual({ status: 'completed' });

      mockRitualRepo.findByParticipant.mockResolvedValue(Result.ok([activeRitual, completedRitual]));

      // Act
      const result = await service.getUserRituals('profile_test_123');

      // Assert
      expect(result.isSuccess).toBe(true);
      const rituals = result.getValue().data;
      expect(rituals.length).toBe(1);
      expect(rituals[0].toData().status).toBe('active');
    });

    it('should fail when repository fails', async () => {
      // Arrange
      mockRitualRepo.findByParticipant.mockResolvedValue(Result.fail('Database error'));

      // Act
      const result = await service.getUserRituals('profile_test_123');

      // Assert
      expect(result.isFailure).toBe(true);
    });
  });

  describe('getAvailableRituals()', () => {
    it('should get available rituals to join', async () => {
      // Arrange
      const ritual = createValidRitual({
        settings: { isVisible: true }
      });

      mockRitualRepo.findActive.mockResolvedValue(Result.ok([ritual]));

      // Act
      const result = await service.getAvailableRituals();

      // Assert
      expect(result.isSuccess).toBe(true);
      const rituals = result.getValue().data;
      expect(rituals.length).toBe(1);
    });

    it('should filter out hidden rituals', async () => {
      // Arrange
      const visibleRitual = createValidRitual({ settings: { isVisible: true } });
      const hiddenRitual = createValidRitual({ settings: { isVisible: false } });

      mockRitualRepo.findActive.mockResolvedValue(Result.ok([visibleRitual, hiddenRitual]));

      // Act
      const result = await service.getAvailableRituals();

      // Assert
      expect(result.isSuccess).toBe(true);
      const rituals = result.getValue().data;
      expect(rituals.length).toBe(1);
    });

    it('should fail when repository fails', async () => {
      // Arrange
      mockRitualRepo.findActive.mockResolvedValue(Result.fail('Database error'));

      // Act
      const result = await service.getAvailableRituals();

      // Assert
      expect(result.isFailure).toBe(true);
    });
  });

  describe('subscribeToRitual()', () => {
    it('should subscribe to ritual updates', () => {
      // Arrange
      const callback = vi.fn();
      const unsubscribe = vi.fn();
      mockRitualRepo.subscribeToRitual.mockReturnValue(unsubscribe);

      // Act
      const result = service.subscribeToRitual('ritual_test_123', callback);

      // Assert
      expect(mockRitualRepo.subscribeToRitual).toHaveBeenCalled();
      expect(result).toBe(unsubscribe);
    });
  });

  describe('subscribeToActiveRituals()', () => {
    it('should subscribe to active rituals feed', () => {
      // Arrange
      const callback = vi.fn();
      const unsubscribe = vi.fn();
      mockRitualRepo.subscribeToActiveRituals.mockReturnValue(unsubscribe);

      // Act
      const result = service.subscribeToActiveRituals(callback);

      // Assert
      expect(mockRitualRepo.subscribeToActiveRituals).toHaveBeenCalledWith('ub-buffalo', callback);
      expect(result).toBe(unsubscribe);
    });
  });

  describe('Real-world Scenarios', () => {
    it('should handle full ritual lifecycle', async () => {
      // Arrange
      const profile = createValidProfile();
      const creationData: RitualCreationData = {
        name: 'Study Week Challenge',
        description: 'Complete study goals',
        ritualType: 'short',
        category: 'academic',
        duration: '1 week',
        startDate: new Date(),
        goals: [{
          description: 'Study 10 hours',
          type: 'individual',
          targetValue: 10
        }],
        requirements: [{
          action: 'Log study hours',
          target: 10,
          validation: 'manual'
        }],
        rewards: [{
          type: 'badge',
          name: 'Study Champion',
          description: 'Completed study challenge'
        }]
      };

      mockProfileRepo.findById.mockResolvedValue(Result.ok(profile));
      mockRitualRepo.save.mockResolvedValue(Result.ok(undefined));
      mockRitualRepo.findParticipation.mockResolvedValue(Result.fail('Not found'));
      mockRitualRepo.saveParticipation.mockResolvedValue(Result.ok(undefined));

      // Act
      const createResult = await service.createRitual('profile_test_123', creationData);

      // Assert
      expect(createResult.isSuccess).toBe(true);
      expect(mockRitualRepo.save).toHaveBeenCalled();
    });

    it('should handle student joining and completing ritual', async () => {
      // Arrange
      const ritual = createValidRitual({
        milestones: [{
          id: 'm1',
          title: 'Complete Task',
          name: 'Task',
          description: 'Finish assignment',
          targetValue: 1,
          currentValue: 0,
          isCompleted: false,
          participantCompletions: [],
          rewards: []
        }]
      });
      const participation = createValidParticipation();

      // Join ritual
      mockRitualRepo.findById.mockResolvedValue(Result.ok(ritual));
      mockRitualRepo.findParticipation.mockResolvedValue(Result.fail('Not found'));
      mockRitualRepo.saveParticipation.mockResolvedValue(Result.ok(undefined));
      mockRitualRepo.save.mockResolvedValue(Result.ok(undefined));

      const joinResult = await service.joinRitual('profile_test_123', 'ritual_test_123');

      // Record progress
      mockRitualRepo.findParticipation.mockResolvedValue(Result.ok(participation));
      mockRitualRepo.findLeaderboard.mockResolvedValue(Result.ok([participation]));

      const progressResult = await service.recordProgress('profile_test_123', 'ritual_test_123', 'm1', 1);

      // Assert
      expect(joinResult.isSuccess).toBe(true);
      expect(progressResult.isSuccess).toBe(true);
    });
  });
});
