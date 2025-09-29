"use strict";
/**
 * Ritual Domain Tests
 * Tests for campus-wide behavioral campaigns
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ritual_1 = require("../ritual");
const value_objects_1 = require("../value-objects");
(0, vitest_1.describe)('Ritual Domain', () => {
    (0, vitest_1.describe)('Ritual Creation', () => {
        (0, vitest_1.it)('should create a valid ritual', () => {
            const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
            const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            const result = ritual_1.Ritual.create({
                title: 'Campus Connection Challenge',
                description: 'Make new connections across campus',
                type: 'challenge',
                campusGoalTarget: 1000,
                campusGoalUnit: 'connections',
                startDate: tomorrow,
                endDate: nextWeek
            });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const ritual = result.getValue();
            (0, vitest_1.expect)(ritual.title.title).toBe('Campus Connection Challenge');
            (0, vitest_1.expect)(ritual.type.type).toBe('challenge');
            (0, vitest_1.expect)(ritual.campusGoal.target).toBe(1000);
            (0, vitest_1.expect)(ritual.campusGoal.unit).toBe('connections');
            (0, vitest_1.expect)(ritual.participantCount).toBe(0);
        });
        (0, vitest_1.it)('should reject invalid dates', () => {
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
            const result = ritual_1.Ritual.create({
                title: 'Test Ritual',
                description: 'Test description',
                type: 'challenge',
                campusGoalTarget: 100,
                campusGoalUnit: 'points',
                startDate: tomorrow,
                endDate: yesterday // End before start
            });
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Start date must be before end date');
        });
        (0, vitest_1.it)('should reject empty title', () => {
            const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
            const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            const result = ritual_1.Ritual.create({
                title: '',
                description: 'Test description',
                type: 'challenge',
                campusGoalTarget: 100,
                campusGoalUnit: 'points',
                startDate: tomorrow,
                endDate: nextWeek
            });
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('cannot be empty');
        });
        (0, vitest_1.it)('should reject invalid ritual type', () => {
            const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
            const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            const result = ritual_1.Ritual.create({
                title: 'Test Ritual',
                description: 'Test description',
                type: 'invalid-type',
                campusGoalTarget: 100,
                campusGoalUnit: 'points',
                startDate: tomorrow,
                endDate: nextWeek
            });
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Invalid ritual type');
        });
    });
    (0, vitest_1.describe)('Milestone Management', () => {
        let ritual;
        (0, vitest_1.beforeEach)(() => {
            const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
            const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            ritual = ritual_1.Ritual.create({
                title: 'Test Ritual',
                description: 'Test description',
                type: 'challenge',
                campusGoalTarget: 1000,
                campusGoalUnit: 'points',
                startDate: tomorrow,
                endDate: nextWeek
            }).getValue();
        });
        (0, vitest_1.it)('should add milestone', () => {
            const result = ritual.addMilestone('First Steps', 'Reach 100 points', 100, 'Special badge');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(ritual.milestones).toHaveLength(1);
            const milestone = result.getValue();
            (0, vitest_1.expect)(milestone.name).toBe('First Steps');
            (0, vitest_1.expect)(milestone.threshold).toBe(100);
            (0, vitest_1.expect)(milestone.reward).toBe('Special badge');
        });
        (0, vitest_1.it)('should reject duplicate milestone names', () => {
            ritual.addMilestone('First Steps', 'Reach 100 points', 100, 'Badge');
            const result = ritual.addMilestone('First Steps', 'Different description', 200, 'Another badge');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('already exists');
        });
        (0, vitest_1.it)('should sort milestones by threshold', () => {
            ritual.addMilestone('Third', 'High threshold', 300, 'Badge 3');
            ritual.addMilestone('First', 'Low threshold', 100, 'Badge 1');
            ritual.addMilestone('Second', 'Medium threshold', 200, 'Badge 2');
            const milestones = ritual.milestones;
            (0, vitest_1.expect)(milestones[0].threshold).toBe(100);
            (0, vitest_1.expect)(milestones[1].threshold).toBe(200);
            (0, vitest_1.expect)(milestones[2].threshold).toBe(300);
        });
    });
    (0, vitest_1.describe)('Participation Management', () => {
        let ritual;
        const userId = new ritual_1.ProfileId('user123');
        (0, vitest_1.beforeEach)(() => {
            // Create active ritual (start date in past)
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            ritual = ritual_1.Ritual.create({
                title: 'Active Ritual',
                description: 'Currently active',
                type: 'challenge',
                campusGoalTarget: 1000,
                campusGoalUnit: 'points',
                startDate: yesterday,
                endDate: nextWeek
            }).getValue();
            // Start the ritual
            ritual.start();
        });
        (0, vitest_1.it)('should add participant', () => {
            const result = ritual.addParticipant(userId);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(ritual.participantCount).toBe(1);
            (0, vitest_1.expect)(ritual.isParticipating(userId)).toBe(true);
            const participation = result.getValue();
            (0, vitest_1.expect)(participation.participantId.equals(userId)).toBe(true);
            (0, vitest_1.expect)(participation.totalPoints.value).toBe(0);
            (0, vitest_1.expect)(participation.isActive).toBe(true);
        });
        (0, vitest_1.it)('should reject duplicate participants', () => {
            ritual.addParticipant(userId);
            const result = ritual.addParticipant(userId);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('already participating');
        });
        (0, vitest_1.it)('should record activity for participant', () => {
            ritual.addParticipant(userId);
            const points = value_objects_1.Points.create(50).getValue();
            const result = ritual.recordActivity(userId, value_objects_1.ActivityType.spaceJoin(), points, { spaceId: 'space123' });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const activity = result.getValue();
            (0, vitest_1.expect)(activity.type.type).toBe('space_join');
            (0, vitest_1.expect)(activity.points.value).toBe(50);
            const progress = ritual.getParticipantProgress(userId);
            (0, vitest_1.expect)(progress?.totalPoints.value).toBe(50);
            (0, vitest_1.expect)(progress?.activities).toHaveLength(1);
        });
        (0, vitest_1.it)('should reject activity for non-participant', () => {
            const nonParticipant = new ritual_1.ProfileId('nonparticipant');
            const points = value_objects_1.Points.create(50).getValue();
            const result = ritual.recordActivity(nonParticipant, value_objects_1.ActivityType.spaceJoin(), points);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('not participating');
        });
        (0, vitest_1.it)('should remove participant', () => {
            ritual.addParticipant(userId);
            (0, vitest_1.expect)(ritual.participantCount).toBe(1);
            const result = ritual.removeParticipant(userId);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(ritual.participantCount).toBe(0);
            (0, vitest_1.expect)(ritual.isParticipating(userId)).toBe(false);
        });
    });
    (0, vitest_1.describe)('Campus Goal Progress', () => {
        let ritual;
        (0, vitest_1.beforeEach)(() => {
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            ritual = ritual_1.Ritual.create({
                title: 'Challenge Ritual',
                description: 'Points-based challenge',
                type: 'challenge',
                campusGoalTarget: 1000,
                campusGoalUnit: 'points',
                startDate: yesterday,
                endDate: nextWeek
            }).getValue();
            ritual.start();
        });
        (0, vitest_1.it)('should update campus progress when activities recorded', () => {
            const user1 = new ritual_1.ProfileId('user1');
            const user2 = new ritual_1.ProfileId('user2');
            ritual.addParticipant(user1);
            ritual.addParticipant(user2);
            // Record activities
            ritual.recordActivity(user1, value_objects_1.ActivityType.spaceJoin(), value_objects_1.Points.create(100).getValue());
            ritual.recordActivity(user2, value_objects_1.ActivityType.postCreate(), value_objects_1.Points.create(150).getValue());
            // For challenge type, progress is sum of all points
            (0, vitest_1.expect)(ritual.campusGoal.current).toBe(250);
            (0, vitest_1.expect)(ritual.progressPercentage).toBe(25); // 250/1000 * 100
        });
        (0, vitest_1.it)('should complete ritual when campus goal reached', () => {
            const user = new ritual_1.ProfileId('user1');
            ritual.addParticipant(user);
            // Record enough activity to complete goal
            ritual.recordActivity(user, value_objects_1.ActivityType.spaceJoin(), value_objects_1.Points.create(1000).getValue());
            (0, vitest_1.expect)(ritual.campusGoal.isComplete).toBe(true);
            (0, vitest_1.expect)(ritual.isCompleted).toBe(true);
        });
    });
    (0, vitest_1.describe)('Milestone Unlocking', () => {
        let ritual;
        const userId = new ritual_1.ProfileId('user123');
        (0, vitest_1.beforeEach)(() => {
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            ritual = ritual_1.Ritual.create({
                title: 'Milestone Ritual',
                description: 'Test milestone unlocking',
                type: 'challenge',
                campusGoalTarget: 1000,
                campusGoalUnit: 'points',
                startDate: yesterday,
                endDate: nextWeek
            }).getValue();
            ritual.start();
            ritual.addMilestone('First Steps', 'Reach 100 points', 100, 'Bronze badge');
            ritual.addMilestone('Getting There', 'Reach 500 points', 500, 'Silver badge');
            ritual.addParticipant(userId);
        });
        (0, vitest_1.it)('should unlock milestones when thresholds reached', () => {
            // Record activity that triggers milestone
            ritual.recordActivity(userId, value_objects_1.ActivityType.spaceJoin(), value_objects_1.Points.create(150).getValue());
            const progress = ritual.getParticipantProgress(userId);
            (0, vitest_1.expect)(progress?.milestonesUnlocked).toContain('First Steps');
            (0, vitest_1.expect)(progress?.milestonesUnlocked).not.toContain('Getting There');
        });
        (0, vitest_1.it)('should unlock multiple milestones if threshold exceeded', () => {
            // Record activity that exceeds multiple thresholds
            ritual.recordActivity(userId, value_objects_1.ActivityType.spaceJoin(), value_objects_1.Points.create(600).getValue());
            const progress = ritual.getParticipantProgress(userId);
            (0, vitest_1.expect)(progress?.milestonesUnlocked).toContain('First Steps');
            (0, vitest_1.expect)(progress?.milestonesUnlocked).toContain('Getting There');
        });
    });
    (0, vitest_1.describe)('Leaderboard and Statistics', () => {
        let ritual;
        (0, vitest_1.beforeEach)(() => {
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            ritual = ritual_1.Ritual.create({
                title: 'Competition Ritual',
                description: 'Competitive challenge',
                type: 'challenge',
                campusGoalTarget: 1000,
                campusGoalUnit: 'points',
                startDate: yesterday,
                endDate: nextWeek
            }).getValue();
            ritual.start();
            // Add multiple participants with different scores
            const users = ['user1', 'user2', 'user3'].map(id => new ritual_1.ProfileId(id));
            const scores = [300, 150, 450];
            users.forEach((user, index) => {
                ritual.addParticipant(user);
                ritual.recordActivity(user, value_objects_1.ActivityType.spaceJoin(), value_objects_1.Points.create(scores[index]).getValue());
            });
        });
        (0, vitest_1.it)('should generate leaderboard sorted by points', () => {
            const leaderboard = ritual.getLeaderboard();
            (0, vitest_1.expect)(leaderboard).toHaveLength(3);
            (0, vitest_1.expect)(leaderboard[0].totalPoints.value).toBe(450); // user3
            (0, vitest_1.expect)(leaderboard[1].totalPoints.value).toBe(300); // user1
            (0, vitest_1.expect)(leaderboard[2].totalPoints.value).toBe(150); // user2
        });
        (0, vitest_1.it)('should limit leaderboard results', () => {
            const leaderboard = ritual.getLeaderboard(2);
            (0, vitest_1.expect)(leaderboard).toHaveLength(2);
            (0, vitest_1.expect)(leaderboard[0].totalPoints.value).toBe(450);
            (0, vitest_1.expect)(leaderboard[1].totalPoints.value).toBe(300);
        });
        (0, vitest_1.it)('should calculate ritual statistics', () => {
            const stats = ritual.getStatistics();
            (0, vitest_1.expect)(stats.participantCount).toBe(3);
            (0, vitest_1.expect)(stats.totalActivities).toBe(3);
            (0, vitest_1.expect)(stats.averagePointsPerParticipant).toBe(300); // (450+300+150)/3
            (0, vitest_1.expect)(stats.completionRate).toBe(90); // 900/1000 * 100
            (0, vitest_1.expect)(stats.daysRemaining).toBeGreaterThan(0);
        });
    });
    (0, vitest_1.describe)('Ritual Status Management', () => {
        let ritual;
        (0, vitest_1.beforeEach)(() => {
            const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
            const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            ritual = ritual_1.Ritual.create({
                title: 'Status Test Ritual',
                description: 'Testing status changes',
                type: 'challenge',
                campusGoalTarget: 1000,
                campusGoalUnit: 'points',
                startDate: tomorrow,
                endDate: nextWeek
            }).getValue();
        });
        (0, vitest_1.it)('should start upcoming ritual', () => {
            (0, vitest_1.expect)(ritual.status.status).toBe('upcoming');
            const result = ritual.start();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(ritual.status.status).toBe('active');
        });
        (0, vitest_1.it)('should complete active ritual', () => {
            ritual.start();
            (0, vitest_1.expect)(ritual.status.status).toBe('active');
            const result = ritual.complete();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(ritual.status.status).toBe('completed');
        });
        (0, vitest_1.it)('should cancel ritual', () => {
            const result = ritual.cancel();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(ritual.status.status).toBe('cancelled');
        });
        (0, vitest_1.it)('should reject operations on completed ritual', () => {
            ritual.start();
            ritual.complete();
            const cancelResult = ritual.cancel();
            (0, vitest_1.expect)(cancelResult.isFailure).toBe(true);
            (0, vitest_1.expect)(cancelResult.error).toContain('Cannot cancel completed ritual');
        });
    });
    (0, vitest_1.describe)('Value Objects', () => {
        (0, vitest_1.describe)('CampusGoal', () => {
            (0, vitest_1.it)('should create valid campus goal', () => {
                const result = value_objects_1.CampusGoal.create(1000, 'connections');
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
                const goal = result.getValue();
                (0, vitest_1.expect)(goal.target).toBe(1000);
                (0, vitest_1.expect)(goal.unit).toBe('connections');
                (0, vitest_1.expect)(goal.current).toBe(0);
                (0, vitest_1.expect)(goal.progressPercentage).toBe(0);
            });
            (0, vitest_1.it)('should update progress', () => {
                const goal = value_objects_1.CampusGoal.create(1000, 'points').getValue();
                const result = goal.updateProgress(250);
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
                const updatedGoal = result.getValue();
                (0, vitest_1.expect)(updatedGoal.current).toBe(250);
                (0, vitest_1.expect)(updatedGoal.progressPercentage).toBe(25);
            });
            (0, vitest_1.it)('should detect completion', () => {
                const goal = value_objects_1.CampusGoal.create(100, 'points').getValue();
                const completedGoal = goal.updateProgress(100).getValue();
                (0, vitest_1.expect)(completedGoal.isComplete).toBe(true);
                (0, vitest_1.expect)(completedGoal.progressPercentage).toBe(100);
            });
            (0, vitest_1.it)('should cap progress percentage at 100', () => {
                const goal = value_objects_1.CampusGoal.create(100, 'points').getValue();
                const overCompletedGoal = goal.updateProgress(150).getValue();
                (0, vitest_1.expect)(overCompletedGoal.progressPercentage).toBe(100);
            });
        });
        (0, vitest_1.describe)('Points', () => {
            (0, vitest_1.it)('should create valid points', () => {
                const result = value_objects_1.Points.create(100);
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
                const points = result.getValue();
                (0, vitest_1.expect)(points.value).toBe(100);
            });
            (0, vitest_1.it)('should reject negative points', () => {
                const result = value_objects_1.Points.create(-10);
                (0, vitest_1.expect)(result.isFailure).toBe(true);
                (0, vitest_1.expect)(result.error).toContain('cannot be negative');
            });
            (0, vitest_1.it)('should add points', () => {
                const points1 = value_objects_1.Points.create(100).getValue();
                const points2 = value_objects_1.Points.create(50).getValue();
                const sum = points1.add(points2);
                (0, vitest_1.expect)(sum.value).toBe(150);
            });
            (0, vitest_1.it)('should subtract points', () => {
                const points1 = value_objects_1.Points.create(100).getValue();
                const points2 = value_objects_1.Points.create(30).getValue();
                const result = points1.subtract(points2);
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
                (0, vitest_1.expect)(result.getValue().value).toBe(70);
            });
            (0, vitest_1.it)('should reject subtracting more than available', () => {
                const points1 = value_objects_1.Points.create(50).getValue();
                const points2 = value_objects_1.Points.create(100).getValue();
                const result = points1.subtract(points2);
                (0, vitest_1.expect)(result.isFailure).toBe(true);
                (0, vitest_1.expect)(result.error).toContain('more points than available');
            });
        });
        (0, vitest_1.describe)('Milestone', () => {
            (0, vitest_1.it)('should create valid milestone', () => {
                const result = value_objects_1.Milestone.create('First Steps', 'Complete your first activity', 100, 'Bronze badge');
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
                const milestone = result.getValue();
                (0, vitest_1.expect)(milestone.name).toBe('First Steps');
                (0, vitest_1.expect)(milestone.threshold).toBe(100);
                (0, vitest_1.expect)(milestone.unlocked).toBe(false);
            });
            (0, vitest_1.it)('should check unlock eligibility', () => {
                const milestone = value_objects_1.Milestone.create('Test', 'Description', 100, 'Reward').getValue();
                (0, vitest_1.expect)(milestone.canUnlock(50)).toBe(false);
                (0, vitest_1.expect)(milestone.canUnlock(100)).toBe(true);
                (0, vitest_1.expect)(milestone.canUnlock(150)).toBe(true);
            });
            (0, vitest_1.it)('should unlock milestone', () => {
                const milestone = value_objects_1.Milestone.create('Test', 'Description', 100, 'Reward').getValue();
                const unlockedMilestone = milestone.unlock();
                (0, vitest_1.expect)(unlockedMilestone.unlocked).toBe(true);
                (0, vitest_1.expect)(unlockedMilestone.canUnlock(150)).toBe(false); // Already unlocked
            });
        });
    });
});
//# sourceMappingURL=ritual.test.js.map