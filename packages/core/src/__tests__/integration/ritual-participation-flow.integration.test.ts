/**
 * Ritual Participation Flow - Integration Test
 * Tests the ritual creation, joining, and progress tracking integration between services and repositories
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RitualParticipationService } from '../../application/ritual-participation.service';
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
const mockRitualRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findByType: vi.fn(),
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

const mockProfileRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findByHandle: vi.fn(),
  findByEmail: vi.fn(),
  findByCampus: vi.fn(),
  delete: vi.fn()
};

const mockFeedRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findByUserId: vi.fn(),
  addFeedItem: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn()
};

describe('Ritual Participation Flow - Integration', () => {
  let ritualParticipationService: RitualParticipationService;

  beforeEach(() => {
    vi.clearAllMocks();

    ritualParticipationService = new RitualParticipationService(
      { campusId: 'ub-buffalo' },
      mockRitualRepo,
      mockProfileRepo,
      mockFeedRepo
    );
  });

  // Test data factory
  const createMockProfile = (overrides = {}) => ({
    id: { id: 'profile_user_123' },
    handle: { value: 'johndoe' },
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      major: 'Computer Science'
    },
    toData: () => ({
      id: 'profile_user_123',
      handle: 'johndoe',
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        major: 'Computer Science'
      }
    }),
    ...overrides
  });

  const createMockRitual = (overrides = {}) => ({
    id: { value: 'ritual_wellness_001' },
    ritualId: { value: 'ritual_wellness_001' },
    name: { name: 'Campus Wellness Challenge' },
    description: { description: 'A 2-week wellness ritual for students' },
    type: 'anticipatory',
    category: 'wellness',
    duration: '2 weeks',
    status: 'active',
    isActive: true,
    participantCount: 0,
    addParticipant: vi.fn(() => Result.ok()),
    getParticipationWarnings: vi.fn(() => []),
    calculateGoalPoints: vi.fn(() => 100),
    updateMilestoneProgress: vi.fn(),
    toData: () => ({
      id: 'ritual_wellness_001',
      name: 'Campus Wellness Challenge',
      description: 'A 2-week wellness ritual for students',
      type: 'anticipatory',
      category: 'wellness',
      status: 'active',
      milestones: [
        {
          id: 'milestone_1',
          name: 'Daily Steps',
          title: 'Walk 10,000 steps',
          description: 'Complete 10,000 steps daily for the ritual',
          targetValue: 10000,
          currentValue: 0,
          isCompleted: false,
          participantCompletions: [],
          rewards: [
            {
              type: 'points',
              value: '100',
              description: 'Milestone completion bonus'
            }
          ]
        },
        {
          id: 'milestone_2',
          name: 'Meditation',
          title: 'Daily Meditation',
          description: 'Complete 15 minutes of meditation daily',
          targetValue: 15,
          currentValue: 0,
          isCompleted: false,
          participantCompletions: [],
          rewards: [
            {
              type: 'badge',
              value: 'mindful_student',
              description: 'Mindful Student badge'
            }
          ]
        }
      ],
      settings: {
        isVisible: true,
        maxParticipants: 100,
        requireApproval: false
      }
    }),
    ...overrides
  });

  const createMockParticipation = (overrides = {}) => ({
    id: 'participation_123',
    profileId: { id: 'profile_user_123' },
    ritualId: { value: 'ritual_wellness_001' },
    completionCount: 0,
    streakCount: 0,
    totalPoints: 0,
    achievements: [],
    completedMilestones: [],
    isActive: true,
    updateMilestoneProgress: vi.fn(),
    completeMilestone: vi.fn(),
    addPoints: vi.fn(),
    addAchievement: vi.fn(),
    updateStreak: vi.fn(),
    toData: () => ({
      id: 'participation_123',
      profileId: { id: 'profile_user_123' },
      ritualId: { value: 'ritual_wellness_001' },
      completionCount: 0,
      streakCount: 0,
      totalPoints: 0,
      achievements: [],
      completedMilestones: [],
      streak: {
        currentDays: 0,
        longestStreak: 0,
        lastParticipationDate: undefined
      },
      isActive: true
    }),
    ...overrides
  });

  describe('Ritual Creation Integration', () => {
    it('should create ritual through repository layer', async () => {
      const mockProfile = createMockProfile();
      const ritualData = {
        name: 'Campus Wellness Challenge',
        description: 'A 2-week wellness ritual for students',
        ritualType: 'anticipatory' as const,
        category: 'wellness' as const,
        duration: '2 weeks',
        startDate: new Date(),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        goals: [
          {
            description: 'Complete daily wellness activities',
            type: 'individual' as const,
            targetValue: 14
          }
        ],
        requirements: [
          {
            action: 'log_activity',
            target: 1,
            validation: 'manual' as const
          }
        ],
        rewards: [
          {
            type: 'badge' as const,
            name: 'Wellness Champion',
            description: 'Completed the wellness challenge'
          }
        ],
        settings: {
          maxParticipants: 100,
          requireApproval: false,
          allowLateJoin: true,
          isVisible: true
        }
      };

      // Mock successful lookups
      mockProfileRepo.findById.mockResolvedValue(Result.ok(mockProfile));
      mockRitualRepo.save.mockResolvedValue(Result.ok());
      mockRitualRepo.findParticipation.mockResolvedValue(Result.fail('Not found')); // For auto-join

      // Execute ritual creation
      const result = await ritualParticipationService.createRitual('profile_user_123', ritualData);

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockProfileRepo.findById).toHaveBeenCalled();
      expect(mockRitualRepo.save).toHaveBeenCalled();

      const ritual = result.getValue();
      expect(ritual.toData().name).toBe('Campus Wellness Challenge');
      expect(ritual.toData().type).toBe('anticipatory');
    });

    it('should handle profile not found during ritual creation', async () => {
      // Mock profile not found
      mockProfileRepo.findById.mockResolvedValue(Result.fail('Profile not found'));

      const ritualData = {
        name: 'Test Ritual',
        description: 'Test description',
        ritualType: 'short' as const,
        category: 'academic' as const,
        duration: '1 week',
        startDate: new Date(),
        goals: [],
        requirements: [],
        rewards: []
      };

      // Execute ritual creation
      const result = await ritualParticipationService.createRitual('nonexistent_user', ritualData);

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Creator profile not found');

      // Verify no ritual save was attempted
      expect(mockRitualRepo.save).not.toHaveBeenCalled();
    });

    it('should validate ritual type and duration constraints', async () => {
      const mockProfile = createMockProfile();
      mockProfileRepo.findById.mockResolvedValue(Result.ok(mockProfile));

      const invalidRitualData = {
        name: 'Invalid Ritual',
        description: 'Test description',
        ritualType: 'short' as const,
        category: 'academic' as const,
        duration: '2 weeks', // Invalid: short rituals must be 1 week
        startDate: new Date(),
        goals: [],
        requirements: [],
        rewards: []
      };

      // Execute ritual creation
      const result = await ritualParticipationService.createRitual('profile_user_123', invalidRitualData);

      // Verify validation error
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Short rituals must be 1 week duration');

      // Verify no ritual save was attempted
      expect(mockRitualRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('Ritual Joining Integration', () => {
    it('should join ritual through repository layer', async () => {
      const mockRitual = createMockRitual();
      const mockProfile = createMockProfile();

      // Mock successful lookups
      mockRitualRepo.findById.mockResolvedValue(Result.ok(mockRitual));
      mockProfileRepo.findById.mockResolvedValue(Result.ok(mockProfile));
      mockRitualRepo.findParticipation.mockResolvedValue(Result.fail('Not participating'));
      mockRitualRepo.saveParticipation.mockResolvedValue(Result.ok());
      mockRitualRepo.save.mockResolvedValue(Result.ok());

      // Execute ritual joining
      const result = await ritualParticipationService.joinRitual('profile_user_123', 'ritual_wellness_001');

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockRitualRepo.findById).toHaveBeenCalled();
      expect(mockRitualRepo.findParticipation).toHaveBeenCalled();
      expect(mockRitualRepo.saveParticipation).toHaveBeenCalled();

      const joinResult = result.getValue();
      expect(joinResult.data).toBeDefined();
      expect(joinResult.warnings).toBeDefined();
    });

    it('should handle ritual not found during joining', async () => {
      // Mock ritual not found
      mockRitualRepo.findById.mockResolvedValue(Result.fail('Ritual not found'));

      // Execute ritual joining
      const result = await ritualParticipationService.joinRitual('profile_user_123', 'nonexistent_ritual');

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Ritual not found');

      // Verify no participation save was attempted
      expect(mockRitualRepo.saveParticipation).not.toHaveBeenCalled();
    });

    it('should handle already participating error', async () => {
      const mockRitual = createMockRitual();
      const mockParticipation = createMockParticipation();

      // Mock ritual found but already participating
      mockRitualRepo.findById.mockResolvedValue(Result.ok(mockRitual));
      mockRitualRepo.findParticipation.mockResolvedValue(Result.ok(mockParticipation));

      // Execute ritual joining
      const result = await ritualParticipationService.joinRitual('profile_user_123', 'ritual_wellness_001');

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Already participating in this ritual');

      // Verify no new participation save was attempted
      expect(mockRitualRepo.saveParticipation).not.toHaveBeenCalled();
    });
  });

  describe('Progress Tracking Integration', () => {
    it('should record progress through repository layer', async () => {
      const mockRitual = createMockRitual();
      const mockParticipation = createMockParticipation();

      // Mock successful lookups
      mockRitualRepo.findParticipation.mockResolvedValue(Result.ok(mockParticipation));
      mockRitualRepo.findById.mockResolvedValue(Result.ok(mockRitual));
      mockRitualRepo.saveParticipation.mockResolvedValue(Result.ok());
      mockRitualRepo.save.mockResolvedValue(Result.ok());
      mockRitualRepo.findLeaderboard.mockResolvedValue(Result.ok([mockParticipation]));

      // Execute progress recording
      const result = await ritualParticipationService.recordProgress(
        'profile_user_123',
        'ritual_wellness_001',
        'milestone_1',
        10000
      );

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockRitualRepo.findParticipation).toHaveBeenCalled();
      expect(mockRitualRepo.findById).toHaveBeenCalled();
      expect(mockRitualRepo.saveParticipation).toHaveBeenCalled();

      // Verify participation methods were called
      expect(mockParticipation.updateMilestoneProgress).toHaveBeenCalledWith('milestone_1', 10000);
      expect(mockParticipation.completeMilestone).toHaveBeenCalledWith('milestone_1');
      expect(mockParticipation.addPoints).toHaveBeenCalled();
      expect(mockParticipation.addAchievement).toHaveBeenCalled();

      const progressResult = result.getValue();
      expect(progressResult.ritual).toBeDefined();
      expect(progressResult.participation).toBeDefined();
      expect(progressResult.completionPercentage).toBeGreaterThanOrEqual(0);
    });

    it('should handle not participating error during progress recording', async () => {
      // Mock participation not found
      mockRitualRepo.findParticipation.mockResolvedValue(Result.fail('Not participating'));

      // Execute progress recording
      const result = await ritualParticipationService.recordProgress(
        'profile_user_123',
        'ritual_wellness_001',
        'milestone_1',
        5000
      );

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Not participating in this ritual');

      // Verify no saves were attempted
      expect(mockRitualRepo.saveParticipation).not.toHaveBeenCalled();
      expect(mockRitualRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('Leaderboard Integration', () => {
    it('should get leaderboard through repository layer', async () => {
      const mockRitual = createMockRitual();
      const mockParticipation1 = createMockParticipation({
        toData: () => ({
          id: 'participation_1',
          profileId: { id: 'profile_user_1' },
          totalPoints: 250,
          completedMilestones: ['milestone_1'],
          streak: { currentDays: 5 }
        })
      });
      const mockParticipation2 = createMockParticipation({
        toData: () => ({
          id: 'participation_2',
          profileId: { id: 'profile_user_2' },
          totalPoints: 180,
          completedMilestones: [],
          streak: { currentDays: 3 }
        })
      });

      const mockProfile1 = createMockProfile({
        personalInfo: { firstName: 'Alice', lastName: 'Smith' }
      });
      const mockProfile2 = createMockProfile({
        personalInfo: { firstName: 'Bob', lastName: 'Johnson' }
      });

      // Mock successful lookups
      mockRitualRepo.findById.mockResolvedValue(Result.ok(mockRitual));
      mockRitualRepo.findLeaderboard.mockResolvedValue(Result.ok([mockParticipation1, mockParticipation2]));
      mockProfileRepo.findById
        .mockResolvedValueOnce(Result.ok(mockProfile1))
        .mockResolvedValueOnce(Result.ok(mockProfile2));

      // Execute leaderboard retrieval
      const result = await ritualParticipationService.getLeaderboard('ritual_wellness_001', 10);

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockRitualRepo.findById).toHaveBeenCalled();
      expect(mockRitualRepo.findLeaderboard).toHaveBeenCalledWith(
        expect.anything(),
        10
      );
      expect(mockProfileRepo.findById).toHaveBeenCalledTimes(2);

      const leaderboardResult = result.getValue();
      expect(leaderboardResult.data).toHaveLength(2);
      expect(leaderboardResult.data[0].rank).toBe(1);
      expect(leaderboardResult.data[0].totalPoints).toBe(250);
      expect(leaderboardResult.data[0].displayName).toBe('Alice Smith');
      expect(leaderboardResult.metadata?.totalCount).toBe(2);
    });

    it('should handle ritual not found during leaderboard retrieval', async () => {
      // Mock ritual not found
      mockRitualRepo.findById.mockResolvedValue(Result.fail('Ritual not found'));

      // Execute leaderboard retrieval
      const result = await ritualParticipationService.getLeaderboard('nonexistent_ritual', 10);

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Ritual not found');

      // Verify no leaderboard lookup was attempted
      expect(mockRitualRepo.findLeaderboard).not.toHaveBeenCalled();
    });
  });

  describe('User Rituals Integration', () => {
    it('should get user rituals through repository layer', async () => {
      const mockRitual1 = createMockRitual({
        toData: () => ({ ...createMockRitual().toData(), status: 'active' })
      });
      const mockRitual2 = createMockRitual({
        id: { value: 'ritual_academic_002' },
        toData: () => ({
          id: 'ritual_academic_002',
          name: 'Study Challenge',
          status: 'active'
        })
      });

      // Mock successful lookup
      mockRitualRepo.findByParticipant.mockResolvedValue(Result.ok([mockRitual1, mockRitual2]));

      // Execute user rituals retrieval
      const result = await ritualParticipationService.getUserRituals('profile_user_123');

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockRitualRepo.findByParticipant).toHaveBeenCalled();

      const userRitualsResult = result.getValue();
      expect(userRitualsResult.data).toHaveLength(2);
      expect(userRitualsResult.metadata?.totalCount).toBe(2);
    });

    it('should handle repository error during user rituals retrieval', async () => {
      // Mock repository error
      mockRitualRepo.findByParticipant.mockResolvedValue(Result.fail('Database connection failed'));

      // Execute user rituals retrieval
      const result = await ritualParticipationService.getUserRituals('profile_user_123');

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Database connection failed');
    });
  });

  describe('Repository Integration Coordination', () => {
    it('should coordinate multiple repository calls in joining flow', async () => {
      const mockRitual = createMockRitual();
      const mockProfile = createMockProfile();

      // Mock all necessary repository calls
      mockRitualRepo.findById.mockResolvedValue(Result.ok(mockRitual));
      mockProfileRepo.findById.mockResolvedValue(Result.ok(mockProfile));
      mockRitualRepo.findParticipation.mockResolvedValue(Result.fail('Not participating'));
      mockRitualRepo.saveParticipation.mockResolvedValue(Result.ok());
      mockRitualRepo.save.mockResolvedValue(Result.ok());

      // Execute joining
      const result = await ritualParticipationService.joinRitual('profile_user_123', 'ritual_wellness_001');

      // Verify all repositories were called in correct order
      expect(mockRitualRepo.findById).toHaveBeenCalledBefore(mockRitualRepo.saveParticipation as any);
      expect(mockRitualRepo.findParticipation).toHaveBeenCalledBefore(mockRitualRepo.saveParticipation as any);

      expect(result.isSuccess).toBe(true);
    });

    it('should handle partial repository failures gracefully', async () => {
      const mockRitual = createMockRitual();

      // Mock ritual found but participation save fails
      mockRitualRepo.findById.mockResolvedValue(Result.ok(mockRitual));
      mockRitualRepo.findParticipation.mockResolvedValue(Result.fail('Not participating'));
      mockRitualRepo.saveParticipation.mockRejectedValue(new Error('Database write failed'));

      // Execute joining
      const result = await ritualParticipationService.joinRitual('profile_user_123', 'ritual_wellness_001');

      // INTEGRATION ISSUE IDENTIFIED: Service error handling is inconsistent
      // The service's base.service.ts catches exceptions and wraps them in Result.fail
      // but the current service code doesn't properly check repository save results
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Database write failed');

      // Verify the service attempted to save
      expect(mockRitualRepo.saveParticipation).toHaveBeenCalled();

      // This test successfully identified that the service needs better error handling:
      // 1. Repository methods should return Result<T> consistently
      // 2. Service should check all repository operation results
      // 3. Transaction-like behavior needed for multi-step operations
    });
  });
});