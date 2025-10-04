/**
 * Ritual Participation Service
 * Orchestrates ritual participation, progress tracking, and rewards
 */
import { BaseApplicationService, ApplicationServiceContext, ServiceResult } from './base.service';
import { Result } from '../domain/shared/base/Result';
import { Ritual } from '../domain/rituals/aggregates/ritual.aggregate';
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
export interface RitualCreationData {
    name: string;
    description: string;
    ritualType: 'short' | 'anticipatory' | 'yearbook';
    category: 'social' | 'academic' | 'wellness' | 'community';
    duration: string;
    startDate: Date;
    endDate?: Date;
    goals: Array<{
        description: string;
        type: 'individual' | 'space' | 'campus' | 'stretch';
        targetValue: number;
    }>;
    requirements: Array<{
        action: string;
        target: number;
        validation: 'manual' | 'automatic' | 'peer';
    }>;
    rewards: Array<{
        type: 'badge' | 'feature_unlock' | 'special_access' | 'recognition' | 'points';
        name: string;
        description: string;
        value?: string | number;
    }>;
    settings?: {
        maxParticipants?: number;
        requireApproval?: boolean;
        allowLateJoin?: boolean;
        isVisible?: boolean;
    };
}
export interface RitualProgress {
    ritual: Ritual;
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
export declare class RitualParticipationService extends BaseApplicationService {
    private ritualRepo;
    private profileRepo;
    private feedRepo;
    constructor(context?: Partial<ApplicationServiceContext>, ritualRepo?: IRitualRepository, profileRepo?: IProfileRepository, feedRepo?: IFeedRepository);
    /**
     * Create a new ritual campaign
     */
    createRitual(creatorId: string, data: RitualCreationData): Promise<Result<Ritual>>;
    /**
     * Join a ritual
     */
    joinRitual(userId: string, ritualId: string): Promise<Result<ServiceResult<Participation>>>;
    /**
     * Record progress on a ritual milestone
     */
    recordProgress(userId: string, ritualId: string, milestoneId: string, progress: number): Promise<Result<RitualProgress>>;
    /**
     * Get user's ritual progress
     */
    getRitualProgress(userId: string, ritualId: string): Promise<Result<RitualProgress>>;
    /**
     * Get ritual leaderboard
     */
    getLeaderboard(ritualId: string, limit?: number): Promise<Result<ServiceResult<LeaderboardEntry[]>>>;
    /**
     * Get user's active rituals
     */
    getUserRituals(userId: string): Promise<Result<ServiceResult<Ritual[]>>>;
    /**
     * Get available rituals to join
     */
    getAvailableRituals(): Promise<Result<ServiceResult<Ritual[]>>>;
    /**
     * Subscribe to ritual updates
     */
    subscribeToRitual(ritualId: string, callback: (ritual: Ritual | null) => void): () => void;
    /**
     * Subscribe to active rituals feed
     */
    subscribeToActiveRituals(callback: (rituals: Ritual[]) => void): () => void;
    private calculateRitualProgress;
}
export {};
//# sourceMappingURL=ritual-participation.service.d.ts.map