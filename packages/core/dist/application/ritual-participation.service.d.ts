/**
 * EnhancedRitual Participation Service
 * Orchestrates ritual participation, progress tracking, and rewards
 */
import { BaseApplicationService, ApplicationServiceContext, ServiceResult } from './base.service';
import { Result } from '../domain/shared/base/Result';
import { EnhancedRitual } from '../domain/rituals/aggregates/enhanced-ritual';
import { Participation } from '../domain/rituals/entities/participation';
interface Milestone {
    id: string;
    title: string;
    name: string;
    description: string;
    targetValue: number;
    currentValue: number;
    isCompleted: boolean;
    completedAt?: Date;
    participantCompletions: any[];
    rewards: {
        type: 'points' | 'badge' | 'achievement';
        value: string;
        description: string;
    }[];
}
import { IRitualRepository, IProfileRepository, IFeedRepository } from '../infrastructure/repositories/interfaces';
export interface EnhancedRitualCreationData {
    name: string;
    description: string;
    ritualType: 'daily-challenge' | 'weekly-goal' | 'study-challenge' | 'social-mission' | 'campus-event';
    startDate: Date;
    endDate: Date;
    milestones: Array<{
        name: string;
        description: string;
        targetValue: number;
        rewards: Array<{
            type: 'points' | 'badge' | 'achievement';
            value: string;
            description: string;
        }>;
    }>;
    settings?: {
        maxParticipants?: number;
        requireApproval?: boolean;
        allowLateJoin?: boolean;
        isVisible?: boolean;
    };
}
export interface EnhancedRitualProgress {
    ritual: EnhancedRitual;
    participation: Participation;
    completionPercentage: number;
    currentStreak: number;
    rank: number;
    nextMilestone?: Milestone;
    recentAchievements: Array<{
        name: string;
        earnedAt: Date;
        points: number;
    }>;
}
export interface LeaderboardEntry {
    profileId: string;
    displayName: string;
    totalPoints: number;
    rank: number;
    completedMilestones: number;
    streak: number;
}
export declare class EnhancedRitualParticipationService extends BaseApplicationService {
    private ritualRepo;
    private profileRepo;
    private feedRepo;
    constructor(context?: Partial<ApplicationServiceContext>, ritualRepo?: IRitualRepository, profileRepo?: IProfileRepository, feedRepo?: IFeedRepository);
    /**
     * Create a new ritual campaign
     */
    createEnhancedRitual(creatorId: string, data: EnhancedRitualCreationData): Promise<Result<EnhancedRitual>>;
    /**
     * Join a ritual
     */
    joinEnhancedRitual(userId: string, ritualId: string): Promise<Result<ServiceResult<Participation>>>;
    /**
     * Record progress on a ritual milestone
     */
    recordProgress(userId: string, ritualId: string, milestoneId: string, progress: number): Promise<Result<EnhancedRitualProgress>>;
    /**
     * Get user's ritual progress
     */
    getEnhancedRitualProgress(userId: string, ritualId: string): Promise<Result<EnhancedRitualProgress>>;
    /**
     * Get ritual leaderboard
     */
    getLeaderboard(ritualId: string, limit?: number): Promise<Result<ServiceResult<LeaderboardEntry[]>>>;
    /**
     * Get user's active rituals
     */
    getUserEnhancedRituals(userId: string): Promise<Result<ServiceResult<EnhancedRitual[]>>>;
    /**
     * Get available rituals to join
     */
    getAvailableEnhancedRituals(): Promise<Result<ServiceResult<EnhancedRitual[]>>>;
    /**
     * Subscribe to ritual updates
     */
    subscribeToEnhancedRitual(ritualId: string, callback: (ritual: EnhancedRitual | null) => void): () => void;
    /**
     * Subscribe to active rituals feed
     */
    subscribeToActiveEnhancedRituals(callback: (rituals: EnhancedRitual[]) => void): () => void;
    private calculateEnhancedRitualProgress;
    private calculateMilestonePoints;
    private generateParticipationWarnings;
    private mapRitualType;
}
export {};
//# sourceMappingURL=ritual-participation.service.d.ts.map