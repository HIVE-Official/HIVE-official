/**
 * Ritual Domain Services
 * Business logic that spans multiple aggregates or doesn't fit within a single aggregate
 */
import { Ritual, ProfileId, Participation, Activity } from './ritual';
import { RitualId, RitualType, Points, ActivityType, Milestone } from './value-objects';
import { Result } from './value-objects';
/**
 * Ritual Scheduling Service
 * Manages ritual scheduling and timing
 */
export declare class RitualSchedulingService {
    /**
     * Schedule a ritual to start automatically
     */
    scheduleRitualStart(ritualId: RitualId, startDate: Date): Promise<Result<void>>;
    /**
     * Check for rituals that need to be started or ended
     */
    checkRitualSchedules(): Promise<{
        started: RitualId[];
        ended: RitualId[];
    }>;
    /**
     * Calculate optimal start time for a ritual based on campus activity
     */
    calculateOptimalStartTime(ritualType: RitualType, duration: number, targetParticipation: number): Promise<Date>;
    private startRitual;
}
/**
 * Ritual Notification Service
 * Handles notifications related to rituals
 */
export interface RitualNotificationService {
    /**
     * Notify users about a new ritual
     */
    notifyRitualCreated(ritual: Ritual, targetAudience: ProfileId[]): Promise<void>;
    /**
     * Notify participant about milestone unlock
     */
    notifyMilestoneUnlocked(participantId: ProfileId, ritualId: RitualId, milestone: Milestone): Promise<void>;
    /**
     * Send ritual completion notification
     */
    notifyRitualCompleted(ritual: Ritual, topParticipants: Participation[]): Promise<void>;
    /**
     * Send reminder about ritual ending soon
     */
    sendEndingSoonReminder(ritual: Ritual, hoursRemaining: number): Promise<void>;
    /**
     * Notify about leaderboard changes
     */
    notifyLeaderboardChange(participantId: ProfileId, oldPosition: number, newPosition: number): Promise<void>;
}
/**
 * Ritual Gamification Service
 * Manages gamification aspects of rituals
 */
export declare class RitualGamificationService {
    private readonly streakThresholds;
    private readonly bonusMultipliers;
    /**
     * Calculate points for an activity with bonuses
     */
    calculatePointsWithBonuses(basePoints: Points, participation: Participation, ritual: Ritual, activityType: ActivityType): Points;
    /**
     * Calculate participation streak
     */
    calculateStreak(activities: Activity[]): number;
    /**
     * Generate achievement badges for participation
     */
    generateAchievements(participation: Participation, ritual: Ritual): string[];
    /**
     * Calculate bonus rewards for achievements
     */
    calculateAchievementRewards(achievements: string[]): {
        bonusPoints: number;
        badges: string[];
        specialRewards: string[];
    };
}
/**
 * Ritual Analytics Service
 * Analyzes ritual performance and engagement
 */
export declare class RitualAnalyticsService {
    /**
     * Calculate ritual health score
     */
    calculateHealthScore(ritual: Ritual): number;
    /**
     * Predict ritual completion likelihood
     */
    predictCompletionLikelihood(ritual: Ritual): {
        likelihood: number;
        confidence: number;
        factors: Record<string, number>;
    };
    /**
     * Generate ritual performance report
     */
    generatePerformanceReport(ritualId: RitualId): Promise<{
        overview: {
            status: string;
            healthScore: number;
            completionLikelihood: number;
        };
        participation: {
            total: number;
            active: number;
            churnRate: number;
            averagePoints: number;
        };
        engagement: {
            totalActivities: number;
            averagePerUser: number;
            peakHours: number[];
            topActivityTypes: Array<{
                type: string;
                count: number;
            }>;
        };
        milestones: {
            unlocked: number;
            pending: number;
            averageProgress: number;
        };
        recommendations: string[];
    }>;
}
/**
 * Ritual Matching Service
 * Matches users with appropriate rituals
 */
export declare class RitualMatchingService {
    /**
     * Find rituals suitable for a user
     */
    findSuitableRituals(userId: ProfileId, preferences: {
        interests: string[];
        timeCommitment: 'low' | 'medium' | 'high';
        preferredTypes: string[];
    }): Promise<Ritual[]>;
    /**
     * Calculate match score between user and ritual
     */
    calculateMatchScore(userId: ProfileId, ritual: Ritual, userProfile: {
        interests: string[];
        activityLevel: number;
        connectionCount: number;
    }): number;
}
//# sourceMappingURL=services.d.ts.map