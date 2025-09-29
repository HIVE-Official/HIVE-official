"use strict";
/**
 * Ritual Domain Services
 * Business logic that spans multiple aggregates or doesn't fit within a single aggregate
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RitualMatchingService = exports.RitualAnalyticsService = exports.RitualGamificationService = exports.RitualSchedulingService = void 0;
const value_objects_1 = require("./value-objects");
/**
 * Ritual Scheduling Service
 * Manages ritual scheduling and timing
 */
class RitualSchedulingService {
    /**
     * Schedule a ritual to start automatically
     */
    async scheduleRitualStart(ritualId, startDate) {
        // Calculate time until start
        const now = new Date();
        const timeUntilStart = startDate.getTime() - now.getTime();
        if (timeUntilStart <= 0) {
            return value_objects_1.Result.fail('Start date must be in the future');
        }
        // Schedule the start (would integrate with job scheduler)
        // This is a placeholder for actual scheduling implementation
        setTimeout(() => {
            this.startRitual(ritualId);
        }, timeUntilStart);
        return value_objects_1.Result.ok();
    }
    /**
     * Check for rituals that need to be started or ended
     */
    async checkRitualSchedules() {
        const started = [];
        const ended = [];
        // This would query the database for rituals needing status changes
        // Placeholder for actual implementation
        return { started, ended };
    }
    /**
     * Calculate optimal start time for a ritual based on campus activity
     */
    async calculateOptimalStartTime(ritualType, duration, targetParticipation) {
        // Analyze campus activity patterns to find optimal launch time
        const now = new Date();
        // For demo purposes, return next Monday at 12 PM
        const nextMonday = new Date(now);
        nextMonday.setDate(now.getDate() + ((1 - now.getDay() + 7) % 7));
        nextMonday.setHours(12, 0, 0, 0);
        return nextMonday;
    }
    async startRitual(ritualId) {
        // Trigger ritual start event
        // This would integrate with event bus
    }
}
exports.RitualSchedulingService = RitualSchedulingService;
/**
 * Ritual Gamification Service
 * Manages gamification aspects of rituals
 */
class RitualGamificationService {
    constructor() {
        this.streakThresholds = [3, 7, 14, 30]; // Days
        this.bonusMultipliers = new Map([
            ['first_activity', 1.5],
            ['streak_bonus', 1.2],
            ['milestone_bonus', 2.0],
            ['final_push', 1.3] // Last 24 hours of ritual
        ]);
    }
    /**
     * Calculate points for an activity with bonuses
     */
    calculatePointsWithBonuses(basePoints, participation, ritual, activityType) {
        let multiplier = 1.0;
        // First activity bonus
        if (participation.activities.length === 0) {
            multiplier *= this.bonusMultipliers.get('first_activity');
        }
        // Streak bonus
        const streak = this.calculateStreak(participation.activities);
        if (this.streakThresholds.includes(streak)) {
            multiplier *= this.bonusMultipliers.get('streak_bonus');
        }
        // Final push bonus (last 24 hours)
        const hoursRemaining = (ritual.endDate.getTime() - Date.now()) / (1000 * 60 * 60);
        if (hoursRemaining <= 24 && hoursRemaining > 0) {
            multiplier *= this.bonusMultipliers.get('final_push');
        }
        return basePoints.multiply(multiplier);
    }
    /**
     * Calculate participation streak
     */
    calculateStreak(activities) {
        if (activities.length === 0)
            return 0;
        // Sort activities by timestamp
        const sorted = [...activities].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        let streak = 1;
        let lastDate = sorted[0].timestamp;
        for (let i = 1; i < sorted.length; i++) {
            const daysDiff = Math.floor((sorted[i].timestamp.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
            if (daysDiff === 1) {
                streak++;
                lastDate = sorted[i].timestamp;
            }
            else if (daysDiff > 1) {
                streak = 1;
                lastDate = sorted[i].timestamp;
            }
        }
        return streak;
    }
    /**
     * Generate achievement badges for participation
     */
    generateAchievements(participation, ritual) {
        const achievements = [];
        // Early bird - joined in first 24 hours
        const ritualAge = Date.now() - ritual.startDate.getTime();
        const joinAge = Date.now() - participation.joinedAt.getTime();
        if (joinAge >= ritualAge - 24 * 60 * 60 * 1000) {
            achievements.push('early_bird');
        }
        // Consistent - participated every day
        const streak = this.calculateStreak(participation.activities);
        if (streak >= 7)
            achievements.push('week_warrior');
        if (streak >= 30)
            achievements.push('dedication_master');
        // High scorer - top 10% of participants
        const leaderboard = ritual.getLeaderboard(Math.ceil(ritual.participantCount * 0.1));
        if (leaderboard.some(p => p.id === participation.id)) {
            achievements.push('top_performer');
        }
        // Milestone hunter - unlocked multiple milestones
        if (participation.milestonesUnlocked.length >= 3) {
            achievements.push('milestone_hunter');
        }
        return achievements;
    }
    /**
     * Calculate bonus rewards for achievements
     */
    calculateAchievementRewards(achievements) {
        let bonusPoints = 0;
        const badges = [];
        const specialRewards = [];
        for (const achievement of achievements) {
            switch (achievement) {
                case 'early_bird':
                    bonusPoints += 50;
                    badges.push('🌅 Early Bird');
                    break;
                case 'week_warrior':
                    bonusPoints += 100;
                    badges.push('🔥 Week Warrior');
                    break;
                case 'dedication_master':
                    bonusPoints += 500;
                    badges.push('🏆 Dedication Master');
                    specialRewards.push('Special profile badge');
                    break;
                case 'top_performer':
                    bonusPoints += 200;
                    badges.push('⭐ Top Performer');
                    break;
                case 'milestone_hunter':
                    bonusPoints += 150;
                    badges.push('🎯 Milestone Hunter');
                    break;
            }
        }
        return { bonusPoints, badges, specialRewards };
    }
}
exports.RitualGamificationService = RitualGamificationService;
/**
 * Ritual Analytics Service
 * Analyzes ritual performance and engagement
 */
class RitualAnalyticsService {
    /**
     * Calculate ritual health score
     */
    calculateHealthScore(ritual) {
        const stats = ritual.getStatistics();
        // Factors for health score
        const participationRate = Math.min(stats.participantCount / 100, 1); // Target 100 participants
        const activityRate = Math.min(stats.totalActivities / (stats.participantCount * 10), 1);
        const completionRate = stats.completionRate / 100;
        const timeProgress = 1 - (stats.daysRemaining / 30); // Assume 30-day rituals
        // Weighted average
        const healthScore = participationRate * 0.3 +
            activityRate * 0.3 +
            completionRate * 0.25 +
            timeProgress * 0.15;
        return Math.round(healthScore * 100);
    }
    /**
     * Predict ritual completion likelihood
     */
    predictCompletionLikelihood(ritual) {
        const stats = ritual.getStatistics();
        const healthScore = this.calculateHealthScore(ritual);
        // Calculate trajectory
        const currentProgress = ritual.progressPercentage;
        const timeElapsed = 1 - (stats.daysRemaining / 30);
        const progressVelocity = currentProgress / Math.max(timeElapsed, 0.1);
        // Factors affecting completion
        const factors = {
            currentProgress: currentProgress / 100,
            progressVelocity: Math.min(progressVelocity, 1),
            participantGrowth: Math.min(stats.participantCount / 50, 1),
            engagementRate: Math.min(stats.averagePointsPerParticipant / 100, 1),
            healthScore: healthScore / 100
        };
        // Calculate likelihood
        const likelihood = factors.currentProgress * 0.3 +
            factors.progressVelocity * 0.25 +
            factors.participantGrowth * 0.2 +
            factors.engagementRate * 0.15 +
            factors.healthScore * 0.1;
        // Confidence based on data availability
        const confidence = Math.min(timeElapsed + 0.3, 1); // Higher confidence as time progresses
        return {
            likelihood: Math.round(likelihood * 100),
            confidence: Math.round(confidence * 100),
            factors
        };
    }
    /**
     * Generate ritual performance report
     */
    async generatePerformanceReport(ritualId) {
        // This would fetch actual data from repositories
        // Placeholder for demonstration
        return {
            overview: {
                status: 'active',
                healthScore: 75,
                completionLikelihood: 82
            },
            participation: {
                total: 150,
                active: 120,
                churnRate: 0.2,
                averagePoints: 450
            },
            engagement: {
                totalActivities: 1500,
                averagePerUser: 10,
                peakHours: [12, 18, 21],
                topActivityTypes: [
                    { type: 'post_shared', count: 600 },
                    { type: 'space_joined', count: 400 },
                    { type: 'profile_completed', count: 300 }
                ]
            },
            milestones: {
                unlocked: 3,
                pending: 2,
                averageProgress: 65
            },
            recommendations: [
                'Send reminder notifications - participation declining',
                'Highlight top performers to encourage competition',
                'Consider adding bonus points for weekend activities'
            ]
        };
    }
}
exports.RitualAnalyticsService = RitualAnalyticsService;
/**
 * Ritual Matching Service
 * Matches users with appropriate rituals
 */
class RitualMatchingService {
    /**
     * Find rituals suitable for a user
     */
    async findSuitableRituals(userId, preferences) {
        // This would query and filter rituals based on user preferences
        // Placeholder for actual implementation
        return [];
    }
    /**
     * Calculate match score between user and ritual
     */
    calculateMatchScore(userId, ritual, userProfile) {
        let score = 0;
        // Type preference matching
        if (userProfile.interests.some(interest => ritual.description.value.toLowerCase().includes(interest.toLowerCase()))) {
            score += 30;
        }
        // Activity level matching
        if (ritual.type.type === 'onboarding' && userProfile.activityLevel < 0.3) {
            score += 20; // New users benefit from onboarding
        }
        else if (ritual.type.type === 'challenge' && userProfile.activityLevel > 0.7) {
            score += 20; // Active users enjoy challenges
        }
        // Social factor
        if (userProfile.connectionCount > 10) {
            score += 10; // Social users more likely to participate
        }
        // Time remaining factor (urgency)
        const daysRemaining = Math.ceil((ritual.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        if (daysRemaining <= 7 && daysRemaining > 0) {
            score += 15; // Urgency boost
        }
        return Math.min(score, 100);
    }
}
exports.RitualMatchingService = RitualMatchingService;
//# sourceMappingURL=services.js.map