"use strict";
/**
 * Ritual Participation Flow - Integration Test
 * Tests the ritual creation, joining, and progress tracking integration between services and repositories
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ritual_participation_service_1 = require("../../application/ritual-participation.service");
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
const mockRitualRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByType: vitest_1.vi.fn(),
    findActive: vitest_1.vi.fn(),
    findByParticipant: vitest_1.vi.fn(),
    findParticipation: vitest_1.vi.fn(),
    saveParticipation: vitest_1.vi.fn(),
    findLeaderboard: vitest_1.vi.fn(),
    subscribeToRitual: vitest_1.vi.fn(),
    subscribeToActiveRituals: vitest_1.vi.fn(),
    findAll: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn(),
    // Missing methods required by IRitualRepository
    findByCampus: vitest_1.vi.fn(),
    findActiveByType: vitest_1.vi.fn(),
    findUserRituals: vitest_1.vi.fn()
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
(0, vitest_1.describe)('Ritual Participation Flow - Integration', () => {
    let ritualParticipationService;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        ritualParticipationService = new ritual_participation_service_1.RitualParticipationService({ campusId: 'ub-buffalo' }, mockRitualRepo, mockProfileRepo, mockFeedRepo);
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
        addParticipant: vitest_1.vi.fn(() => Result_1.Result.ok()),
        getParticipationWarnings: vitest_1.vi.fn(() => []),
        calculateGoalPoints: vitest_1.vi.fn(() => 100),
        updateMilestoneProgress: vitest_1.vi.fn(),
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
        updateMilestoneProgress: vitest_1.vi.fn(),
        completeMilestone: vitest_1.vi.fn(),
        addPoints: vitest_1.vi.fn(),
        addAchievement: vitest_1.vi.fn(),
        updateStreak: vitest_1.vi.fn(),
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
    (0, vitest_1.describe)('Ritual Creation Integration', () => {
        (0, vitest_1.it)('should create ritual through repository layer', async () => {
            const mockProfile = createMockProfile();
            const ritualData = {
                name: 'Campus Wellness Challenge',
                description: 'A 2-week wellness ritual for students',
                ritualType: 'anticipatory',
                category: 'wellness',
                duration: '2 weeks',
                startDate: new Date(),
                endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                goals: [
                    {
                        description: 'Complete daily wellness activities',
                        type: 'individual',
                        targetValue: 14
                    }
                ],
                requirements: [
                    {
                        action: 'log_activity',
                        target: 1,
                        validation: 'manual'
                    }
                ],
                rewards: [
                    {
                        type: 'badge',
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
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(mockProfile));
            mockRitualRepo.save.mockResolvedValue(Result_1.Result.ok());
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.fail('Not found')); // For auto-join
            // Execute ritual creation
            const result = await ritualParticipationService.createRitual('profile_user_123', ritualData);
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockProfileRepo.findById).toHaveBeenCalled();
            (0, vitest_1.expect)(mockRitualRepo.save).toHaveBeenCalled();
            const ritual = result.getValue();
            (0, vitest_1.expect)(ritual.toData().name).toBe('Campus Wellness Challenge');
            (0, vitest_1.expect)(ritual.toData().type).toBe('anticipatory');
        });
        (0, vitest_1.it)('should handle profile not found during ritual creation', async () => {
            // Mock profile not found
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.fail('Profile not found'));
            const ritualData = {
                name: 'Test Ritual',
                description: 'Test description',
                ritualType: 'short',
                category: 'academic',
                duration: '1 week',
                startDate: new Date(),
                goals: [],
                requirements: [],
                rewards: []
            };
            // Execute ritual creation
            const result = await ritualParticipationService.createRitual('nonexistent_user', ritualData);
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Creator profile not found');
            // Verify no ritual save was attempted
            (0, vitest_1.expect)(mockRitualRepo.save).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should validate ritual type and duration constraints', async () => {
            const mockProfile = createMockProfile();
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(mockProfile));
            const invalidRitualData = {
                name: 'Invalid Ritual',
                description: 'Test description',
                ritualType: 'short',
                category: 'academic',
                duration: '2 weeks', // Invalid: short rituals must be 1 week
                startDate: new Date(),
                goals: [],
                requirements: [],
                rewards: []
            };
            // Execute ritual creation
            const result = await ritualParticipationService.createRitual('profile_user_123', invalidRitualData);
            // Verify validation error
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Short rituals must be 1 week duration');
            // Verify no ritual save was attempted
            (0, vitest_1.expect)(mockRitualRepo.save).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('Ritual Joining Integration', () => {
        (0, vitest_1.it)('should join ritual through repository layer', async () => {
            const mockRitual = createMockRitual();
            const mockProfile = createMockProfile();
            // Mock successful lookups
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(mockRitual));
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(mockProfile));
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.fail('Not participating'));
            mockRitualRepo.saveParticipation.mockResolvedValue(Result_1.Result.ok());
            mockRitualRepo.save.mockResolvedValue(Result_1.Result.ok());
            // Execute ritual joining
            const result = await ritualParticipationService.joinRitual('profile_user_123', 'ritual_wellness_001');
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockRitualRepo.findById).toHaveBeenCalled();
            (0, vitest_1.expect)(mockRitualRepo.findParticipation).toHaveBeenCalled();
            (0, vitest_1.expect)(mockRitualRepo.saveParticipation).toHaveBeenCalled();
            const joinResult = result.getValue();
            (0, vitest_1.expect)(joinResult.data).toBeDefined();
            (0, vitest_1.expect)(joinResult.warnings).toBeDefined();
        });
        (0, vitest_1.it)('should handle ritual not found during joining', async () => {
            // Mock ritual not found
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.fail('Ritual not found'));
            // Execute ritual joining
            const result = await ritualParticipationService.joinRitual('profile_user_123', 'nonexistent_ritual');
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Ritual not found');
            // Verify no participation save was attempted
            (0, vitest_1.expect)(mockRitualRepo.saveParticipation).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle already participating error', async () => {
            const mockRitual = createMockRitual();
            const mockParticipation = createMockParticipation();
            // Mock ritual found but already participating
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(mockRitual));
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.ok(mockParticipation));
            // Execute ritual joining
            const result = await ritualParticipationService.joinRitual('profile_user_123', 'ritual_wellness_001');
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Already participating in this ritual');
            // Verify no new participation save was attempted
            (0, vitest_1.expect)(mockRitualRepo.saveParticipation).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('Progress Tracking Integration', () => {
        (0, vitest_1.it)('should record progress through repository layer', async () => {
            const mockRitual = createMockRitual();
            const mockParticipation = createMockParticipation();
            // Mock successful lookups
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.ok(mockParticipation));
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(mockRitual));
            mockRitualRepo.saveParticipation.mockResolvedValue(Result_1.Result.ok());
            mockRitualRepo.save.mockResolvedValue(Result_1.Result.ok());
            mockRitualRepo.findLeaderboard.mockResolvedValue(Result_1.Result.ok([mockParticipation]));
            // Execute progress recording
            const result = await ritualParticipationService.recordProgress('profile_user_123', 'ritual_wellness_001', 'milestone_1', 10000);
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockRitualRepo.findParticipation).toHaveBeenCalled();
            (0, vitest_1.expect)(mockRitualRepo.findById).toHaveBeenCalled();
            (0, vitest_1.expect)(mockRitualRepo.saveParticipation).toHaveBeenCalled();
            // Verify participation methods were called
            (0, vitest_1.expect)(mockParticipation.updateMilestoneProgress).toHaveBeenCalledWith('milestone_1', 10000);
            (0, vitest_1.expect)(mockParticipation.completeMilestone).toHaveBeenCalledWith('milestone_1');
            (0, vitest_1.expect)(mockParticipation.addPoints).toHaveBeenCalled();
            (0, vitest_1.expect)(mockParticipation.addAchievement).toHaveBeenCalled();
            const progressResult = result.getValue();
            (0, vitest_1.expect)(progressResult.ritual).toBeDefined();
            (0, vitest_1.expect)(progressResult.participation).toBeDefined();
            (0, vitest_1.expect)(progressResult.completionPercentage).toBeGreaterThanOrEqual(0);
        });
        (0, vitest_1.it)('should handle not participating error during progress recording', async () => {
            // Mock participation not found
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.fail('Not participating'));
            // Execute progress recording
            const result = await ritualParticipationService.recordProgress('profile_user_123', 'ritual_wellness_001', 'milestone_1', 5000);
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Not participating in this ritual');
            // Verify no saves were attempted
            (0, vitest_1.expect)(mockRitualRepo.saveParticipation).not.toHaveBeenCalled();
            (0, vitest_1.expect)(mockRitualRepo.save).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('Leaderboard Integration', () => {
        (0, vitest_1.it)('should get leaderboard through repository layer', async () => {
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
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(mockRitual));
            mockRitualRepo.findLeaderboard.mockResolvedValue(Result_1.Result.ok([mockParticipation1, mockParticipation2]));
            mockProfileRepo.findById
                .mockResolvedValueOnce(Result_1.Result.ok(mockProfile1))
                .mockResolvedValueOnce(Result_1.Result.ok(mockProfile2));
            // Execute leaderboard retrieval
            const result = await ritualParticipationService.getLeaderboard('ritual_wellness_001', 10);
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockRitualRepo.findById).toHaveBeenCalled();
            (0, vitest_1.expect)(mockRitualRepo.findLeaderboard).toHaveBeenCalledWith(vitest_1.expect.anything(), 10);
            (0, vitest_1.expect)(mockProfileRepo.findById).toHaveBeenCalledTimes(2);
            const leaderboardResult = result.getValue();
            (0, vitest_1.expect)(leaderboardResult.data).toHaveLength(2);
            (0, vitest_1.expect)(leaderboardResult.data[0].rank).toBe(1);
            (0, vitest_1.expect)(leaderboardResult.data[0].totalPoints).toBe(250);
            (0, vitest_1.expect)(leaderboardResult.data[0].displayName).toBe('Alice Smith');
            (0, vitest_1.expect)(leaderboardResult.metadata?.totalCount).toBe(2);
        });
        (0, vitest_1.it)('should handle ritual not found during leaderboard retrieval', async () => {
            // Mock ritual not found
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.fail('Ritual not found'));
            // Execute leaderboard retrieval
            const result = await ritualParticipationService.getLeaderboard('nonexistent_ritual', 10);
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Ritual not found');
            // Verify no leaderboard lookup was attempted
            (0, vitest_1.expect)(mockRitualRepo.findLeaderboard).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('User Rituals Integration', () => {
        (0, vitest_1.it)('should get user rituals through repository layer', async () => {
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
            mockRitualRepo.findByParticipant.mockResolvedValue(Result_1.Result.ok([mockRitual1, mockRitual2]));
            // Execute user rituals retrieval
            const result = await ritualParticipationService.getUserRituals('profile_user_123');
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockRitualRepo.findByParticipant).toHaveBeenCalled();
            const userRitualsResult = result.getValue();
            (0, vitest_1.expect)(userRitualsResult.data).toHaveLength(2);
            (0, vitest_1.expect)(userRitualsResult.metadata?.totalCount).toBe(2);
        });
        (0, vitest_1.it)('should handle repository error during user rituals retrieval', async () => {
            // Mock repository error
            mockRitualRepo.findByParticipant.mockResolvedValue(Result_1.Result.fail('Database connection failed'));
            // Execute user rituals retrieval
            const result = await ritualParticipationService.getUserRituals('profile_user_123');
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Database connection failed');
        });
    });
    (0, vitest_1.describe)('Repository Integration Coordination', () => {
        (0, vitest_1.it)('should coordinate multiple repository calls in joining flow', async () => {
            const mockRitual = createMockRitual();
            const mockProfile = createMockProfile();
            // Mock all necessary repository calls
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(mockRitual));
            mockProfileRepo.findById.mockResolvedValue(Result_1.Result.ok(mockProfile));
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.fail('Not participating'));
            mockRitualRepo.saveParticipation.mockResolvedValue(Result_1.Result.ok());
            mockRitualRepo.save.mockResolvedValue(Result_1.Result.ok());
            // Execute joining
            const result = await ritualParticipationService.joinRitual('profile_user_123', 'ritual_wellness_001');
            // Verify all repositories were called
            (0, vitest_1.expect)(mockRitualRepo.findById).toHaveBeenCalled();
            (0, vitest_1.expect)(mockRitualRepo.findParticipation).toHaveBeenCalled();
            (0, vitest_1.expect)(mockRitualRepo.saveParticipation).toHaveBeenCalled();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should handle partial repository failures gracefully', async () => {
            const mockRitual = createMockRitual();
            // Mock ritual found but participation save fails
            mockRitualRepo.findById.mockResolvedValue(Result_1.Result.ok(mockRitual));
            mockRitualRepo.findParticipation.mockResolvedValue(Result_1.Result.fail('Not participating'));
            mockRitualRepo.saveParticipation.mockRejectedValue(new Error('Database write failed'));
            // Execute joining
            const result = await ritualParticipationService.joinRitual('profile_user_123', 'ritual_wellness_001');
            // INTEGRATION ISSUE IDENTIFIED: Service error handling is inconsistent
            // The service's base.service.ts catches exceptions and wraps them in Result.fail
            // but the current service code doesn't properly check repository save results
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Database write failed');
            // Verify the service attempted to save
            (0, vitest_1.expect)(mockRitualRepo.saveParticipation).toHaveBeenCalled();
            // This test successfully identified that the service needs better error handling:
            // 1. Repository methods should return Result<T> consistently
            // 2. Service should check all repository operation results
            // 3. Transaction-like behavior needed for multi-step operations
        });
    });
});
//# sourceMappingURL=ritual-participation-flow.integration.test.js.map