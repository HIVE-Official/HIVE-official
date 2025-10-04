"use strict";
/**
 * RitualParticipationService Tests
 * Tests for ritual participation and progress tracking orchestration
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ritual_participation_service_1 = require("../ritual-participation.service");
const ritual_aggregate_1 = require("../../domain/rituals/aggregates/ritual.aggregate");
const ritual_id_value_1 = require("../../domain/rituals/value-objects/ritual-id.value");
const participation_1 = require("../../domain/rituals/entities/participation");
const profile_id_value_1 = require("../../domain/profile/value-objects/profile-id.value");
const campus_id_value_1 = require("../../domain/profile/value-objects/campus-id.value");
const profile_aggregate_1 = require("../../domain/profile/aggregates/profile.aggregate");
const ub_email_value_1 = require("../../domain/profile/value-objects/ub-email.value");
const profile_handle_value_1 = require("../../domain/profile/value-objects/profile-handle.value");
const user_type_value_1 = require("../../domain/profile/value-objects/user-type.value");
const profile_privacy_value_1 = require("../../domain/profile/value-objects/profile-privacy.value");
const Result_1 = require("../../domain/shared/base/Result");
// Mock repositories
const mockRitualRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findActive: vitest_1.vi.fn(),
    findByParticipant: vitest_1.vi.fn(),
    findLeaderboard: vitest_1.vi.fn(),
    findParticipation: vitest_1.vi.fn(),
    saveParticipation: vitest_1.vi.fn(),
    subscribeToRitual: vitest_1.vi.fn(),
    subscribeToActiveRituals: vitest_1.vi.fn(),
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
(0, vitest_1.describe)('RitualParticipationService', () => {
    let service;
    (0, vitest_1.beforeEach)(() => {
        service = new ritual_participation_service_1.RitualParticipationService({ campusId: 'ub-buffalo', userId: 'user_test_123' }, mockRitualRepo, mockProfileRepo, mockFeedRepo);
        vitest_1.vi.clearAllMocks();
    });
    // Helper to create a valid ritual
    const createValidRitual = (overrides) => {
        const ritualId = ritual_id_value_1.RitualId.create('ritual_test_123').getValue();
        const campusId = campus_id_value_1.CampusId.create('ub-buffalo').getValue();
        const createdBy = profile_id_value_1.ProfileId.create('profile_123').getValue();
        return ritual_aggregate_1.Ritual.create({
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
    // Helper to create valid participation
    const createValidParticipation = () => {
        const ritualId = ritual_id_value_1.RitualId.create('ritual_test_123').getValue();
        const profileId = profile_id_value_1.ProfileId.create('profile_test_123').getValue();
        return participation_1.Participation.create({
            ritualId,
            profileId
        }).getValue();
    };
    (0, vitest_1.describe)('createRitual()', () => {
        (0, vitest_1.it)('should successfully create a ritual with valid data', async () => {
            // Arrange
            const profile = createValidProfile();
            const data = {
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
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockRitualRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.fail('Not found'));
            // Act
            const result = await service.createRitual('profile_test_123', data);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockRitualRepo.save).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should fail when creator profile not found', async () => {
            // Arrange
            const data = {
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
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.fail('Not found'));
            // Act
            const result = await service.createRitual('nonexistent', data);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Creator profile not found');
        });
        (0, vitest_1.it)('should fail when short ritual has wrong duration', async () => {
            // Arrange
            const profile = createValidProfile();
            const data = {
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
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            // Act
            const result = await service.createRitual('profile_test_123', data);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Short rituals must be 1 week duration');
        });
        (0, vitest_1.it)('should fail when yearbook ritual has wrong duration', async () => {
            // Arrange
            const profile = createValidProfile();
            const data = {
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
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            // Act
            const result = await service.createRitual('profile_test_123', data);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Yearbook rituals must be 3 weeks duration');
        });
        (0, vitest_1.it)('should make creator automatically participate', async () => {
            // Arrange
            const profile = createValidProfile();
            const ritual = createValidRitual();
            const data = {
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
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockRitualRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(ritual)); // For joinRitual call
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockRitualRepo.saveParticipation.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            await service.createRitual('profile_test_123', data);
            // Assert
            (0, vitest_1.expect)(mockRitualRepo.saveParticipation).toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('joinRitual()', () => {
        (0, vitest_1.it)('should successfully join a ritual', async () => {
            // Arrange
            const ritual = createValidRitual();
            const participation = createValidParticipation();
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(ritual));
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockRitualRepo.saveParticipation.mockResolvedValue(Result_1.Result.ok(undefined));
            mockRitualRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const result = await service.joinRitual('profile_test_123', 'ritual_test_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockRitualRepo.saveParticipation).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should fail when ritual not found', async () => {
            // Arrange
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.fail('Not found'));
            // Act
            const result = await service.joinRitual('profile_test_123', 'nonexistent');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Ritual not found');
        });
        (0, vitest_1.it)('should fail when already participating', async () => {
            // Arrange
            const ritual = createValidRitual();
            const participation = createValidParticipation();
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(ritual));
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.ok(participation));
            // Act
            const result = await service.joinRitual('profile_test_123', 'ritual_test_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Already participating');
        });
        (0, vitest_1.it)('should fail when ritual is full', async () => {
            // Arrange
            const ritual = createValidRitual({
                targetParticipation: 1
            });
            // Add a participant to make it full
            const existingProfileId = profile_id_value_1.ProfileId.create('other_user').getValue();
            ritual.addParticipant(existingProfileId);
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(ritual));
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.fail('Not found'));
            // Act
            const result = await service.joinRitual('profile_test_123', 'ritual_test_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
    });
    (0, vitest_1.describe)('recordProgress()', () => {
        (0, vitest_1.it)('should successfully record progress', async () => {
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
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.ok(participation));
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(ritual));
            mockRitualRepo.saveParticipation.mockResolvedValue(Result_1.Result.ok(undefined));
            mockRitualRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockRitualRepo.findLeaderboard.mockResolvedValue(Result_1.Result.ok([participation]));
            // Act
            const result = await service.recordProgress('profile_test_123', 'ritual_test_123', 'milestone_1', 5);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockRitualRepo.saveParticipation).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should fail when not participating', async () => {
            // Arrange
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.fail('Not found'));
            // Act
            const result = await service.recordProgress('profile_test_123', 'ritual_test_123', 'milestone_1', 5);
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Not participating');
        });
        (0, vitest_1.it)('should complete milestone when target reached', async () => {
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
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.ok(participation));
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(ritual));
            mockRitualRepo.saveParticipation.mockResolvedValue(Result_1.Result.ok(undefined));
            mockRitualRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockRitualRepo.findLeaderboard.mockResolvedValue(Result_1.Result.ok([participation]));
            // Act
            const result = await service.recordProgress('profile_test_123', 'ritual_test_123', 'milestone_1', 10);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const progress = result.getValue();
            (0, vitest_1.expect)(progress.recentAchievements.length).toBeGreaterThan(0);
        });
        (0, vitest_1.it)('should update streak', async () => {
            // Arrange
            const ritual = createValidRitual({ milestones: [] });
            const participation = createValidParticipation();
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.ok(participation));
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(ritual));
            mockRitualRepo.saveParticipation.mockResolvedValue(Result_1.Result.ok(undefined));
            mockRitualRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockRitualRepo.findLeaderboard.mockResolvedValue(Result_1.Result.ok([participation]));
            // Act
            const result = await service.recordProgress('profile_test_123', 'ritual_test_123', 'milestone_1', 5);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
    (0, vitest_1.describe)('getRitualProgress()', () => {
        (0, vitest_1.it)('should get user ritual progress', async () => {
            // Arrange
            const ritual = createValidRitual({ milestones: [] });
            const participation = createValidParticipation();
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.ok(participation));
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(ritual));
            mockRitualRepo.findLeaderboard.mockResolvedValue(Result_1.Result.ok([participation]));
            // Act
            const result = await service.getRitualProgress('profile_test_123', 'ritual_test_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const progress = result.getValue();
            (0, vitest_1.expect)(progress.ritual).toBeDefined();
            (0, vitest_1.expect)(progress.participation).toBeDefined();
            (0, vitest_1.expect)(progress.completionPercentage).toBeDefined();
        });
        (0, vitest_1.it)('should fail when not participating', async () => {
            // Arrange
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.fail('Not found'));
            // Act
            const result = await service.getRitualProgress('profile_test_123', 'ritual_test_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Not participating');
        });
        (0, vitest_1.it)('should calculate correct completion percentage', async () => {
            // Arrange
            const ritual = createValidRitual({
                milestones: [
                    { id: 'm1', title: 'M1', name: 'M1', description: 'Milestone 1', targetValue: 10, currentValue: 0, isCompleted: false, participantCompletions: [], rewards: [] },
                    { id: 'm2', title: 'M2', name: 'M2', description: 'Milestone 2', targetValue: 10, currentValue: 0, isCompleted: false, participantCompletions: [], rewards: [] }
                ]
            });
            const participation = createValidParticipation();
            participation.completeMilestone('m1'); // Complete 1 of 2
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.ok(participation));
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(ritual));
            mockRitualRepo.findLeaderboard.mockResolvedValue(Result_1.Result.ok([participation]));
            // Act
            const result = await service.getRitualProgress('profile_test_123', 'ritual_test_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().completionPercentage).toBe(50);
        });
    });
    (0, vitest_1.describe)('getLeaderboard()', () => {
        (0, vitest_1.it)('should get ritual leaderboard', async () => {
            // Arrange
            const ritual = createValidRitual();
            const participation = createValidParticipation();
            const profile = createValidProfile();
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(ritual));
            mockRitualRepo.findLeaderboard.mockResolvedValue(Result_1.Result.ok([participation]));
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            // Act
            const result = await service.getLeaderboard('ritual_test_123', 10);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const leaderboard = result.getValue().data;
            (0, vitest_1.expect)(leaderboard.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(leaderboard[0]).toHaveProperty('rank');
            (0, vitest_1.expect)(leaderboard[0]).toHaveProperty('displayName');
            (0, vitest_1.expect)(leaderboard[0]).toHaveProperty('totalPoints');
        });
        (0, vitest_1.it)('should fail when ritual not found', async () => {
            // Arrange
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.fail('Not found'));
            // Act
            const result = await service.getLeaderboard('nonexistent');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Ritual not found');
        });
        (0, vitest_1.it)('should assign correct ranks', async () => {
            // Arrange
            const ritual = createValidRitual();
            const p1 = createValidParticipation();
            const p2 = createValidParticipation();
            const profile = createValidProfile();
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(ritual));
            mockRitualRepo.findLeaderboard.mockResolvedValue(Result_1.Result.ok([p1, p2]));
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            // Act
            const result = await service.getLeaderboard('ritual_test_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const leaderboard = result.getValue().data;
            (0, vitest_1.expect)(leaderboard[0].rank).toBe(1);
            (0, vitest_1.expect)(leaderboard[1].rank).toBe(2);
        });
        (0, vitest_1.it)('should limit leaderboard results', async () => {
            // Arrange
            const ritual = createValidRitual();
            const participations = Array(50).fill(null).map(() => createValidParticipation());
            const profile = createValidProfile();
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(ritual));
            mockRitualRepo.findLeaderboard.mockResolvedValue(Result_1.Result.ok(participations));
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            // Act
            const result = await service.getLeaderboard('ritual_test_123', 20);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockRitualRepo.findLeaderboard).toHaveBeenCalledWith(vitest_1.expect.anything(), 20);
        });
    });
    (0, vitest_1.describe)('getUserRituals()', () => {
        (0, vitest_1.it)('should get user active rituals', async () => {
            // Arrange
            const ritual = createValidRitual({ status: 'active' });
            mockRitualRepo.findByParticipant.mockResolvedValue(Result_1.Result.ok([ritual]));
            // Act
            const result = await service.getUserRituals('profile_test_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const rituals = result.getValue().data;
            (0, vitest_1.expect)(rituals.length).toBe(1);
            (0, vitest_1.expect)(rituals[0].toData().status).toBe('active');
        });
        (0, vitest_1.it)('should filter out inactive rituals', async () => {
            // Arrange
            const activeRitual = createValidRitual({ status: 'active' });
            const completedRitual = createValidRitual({ status: 'completed' });
            mockRitualRepo.findByParticipant.mockResolvedValue(Result_1.Result.ok([activeRitual, completedRitual]));
            // Act
            const result = await service.getUserRituals('profile_test_123');
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const rituals = result.getValue().data;
            (0, vitest_1.expect)(rituals.length).toBe(1);
            (0, vitest_1.expect)(rituals[0].toData().status).toBe('active');
        });
        (0, vitest_1.it)('should fail when repository fails', async () => {
            // Arrange
            mockRitualRepo.findByParticipant.mockResolvedValue(Result_1.Result.fail('Database error'));
            // Act
            const result = await service.getUserRituals('profile_test_123');
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
    });
    (0, vitest_1.describe)('getAvailableRituals()', () => {
        (0, vitest_1.it)('should get available rituals to join', async () => {
            // Arrange
            const ritual = createValidRitual({
                settings: { isVisible: true }
            });
            mockRitualRepo.findActive.mockResolvedValue(Result_1.Result.ok([ritual]));
            // Act
            const result = await service.getAvailableRituals();
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const rituals = result.getValue().data;
            (0, vitest_1.expect)(rituals.length).toBe(1);
        });
        (0, vitest_1.it)('should filter out hidden rituals', async () => {
            // Arrange
            const visibleRitual = createValidRitual({ settings: { isVisible: true } });
            const hiddenRitual = createValidRitual({ settings: { isVisible: false } });
            mockRitualRepo.findActive.mockResolvedValue(Result_1.Result.ok([visibleRitual, hiddenRitual]));
            // Act
            const result = await service.getAvailableRituals();
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const rituals = result.getValue().data;
            (0, vitest_1.expect)(rituals.length).toBe(1);
        });
        (0, vitest_1.it)('should fail when repository fails', async () => {
            // Arrange
            mockRitualRepo.findActive.mockResolvedValue(Result_1.Result.fail('Database error'));
            // Act
            const result = await service.getAvailableRituals();
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
    });
    (0, vitest_1.describe)('subscribeToRitual()', () => {
        (0, vitest_1.it)('should subscribe to ritual updates', () => {
            // Arrange
            const callback = vitest_1.vi.fn();
            const unsubscribe = vitest_1.vi.fn();
            mockRitualRepo.subscribeToRitual.mockReturnValue(unsubscribe);
            // Act
            const result = service.subscribeToRitual('ritual_test_123', callback);
            // Assert
            (0, vitest_1.expect)(mockRitualRepo.subscribeToRitual).toHaveBeenCalled();
            (0, vitest_1.expect)(result).toBe(unsubscribe);
        });
    });
    (0, vitest_1.describe)('subscribeToActiveRituals()', () => {
        (0, vitest_1.it)('should subscribe to active rituals feed', () => {
            // Arrange
            const callback = vitest_1.vi.fn();
            const unsubscribe = vitest_1.vi.fn();
            mockRitualRepo.subscribeToActiveRituals.mockReturnValue(unsubscribe);
            // Act
            const result = service.subscribeToActiveRituals(callback);
            // Assert
            (0, vitest_1.expect)(mockRitualRepo.subscribeToActiveRituals).toHaveBeenCalledWith('ub-buffalo', callback);
            (0, vitest_1.expect)(result).toBe(unsubscribe);
        });
    });
    (0, vitest_1.describe)('Real-world Scenarios', () => {
        (0, vitest_1.it)('should handle full ritual lifecycle', async () => {
            // Arrange
            const profile = createValidProfile();
            const creationData = {
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
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(profile));
            mockRitualRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockRitualRepo.saveParticipation.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            const createResult = await service.createRitual('profile_test_123', creationData);
            // Assert
            (0, vitest_1.expect)(createResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockRitualRepo.save).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle student joining and completing ritual', async () => {
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
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(ritual));
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.fail('Not found'));
            mockRitualRepo.saveParticipation.mockResolvedValue(Result_1.Result.ok(undefined));
            mockRitualRepo.save.mockResolvedValue(Result_1.Result.ok(undefined));
            const joinResult = await service.joinRitual('profile_test_123', 'ritual_test_123');
            // Record progress
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.ok(participation));
            mockRitualRepo.findLeaderboard.mockResolvedValue(Result_1.Result.ok([participation]));
            const progressResult = await service.recordProgress('profile_test_123', 'ritual_test_123', 'm1', 1);
            // Assert
            (0, vitest_1.expect)(joinResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(progressResult.isSuccess).toBe(true);
        });
    });
});
//# sourceMappingURL=ritual-participation.service.test.js.map