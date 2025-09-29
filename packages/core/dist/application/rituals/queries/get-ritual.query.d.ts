/**
 * Get Ritual Query
 * Retrieves ritual details and participation status
 */
import { Query, IQueryHandler } from '../../shared/base';
import { Result } from '../../../domain/profile/value-objects';
import { IRitualRepository } from '../../../repositories/interfaces';
export declare class GetRitualQuery extends Query {
    readonly ritualId: string;
    constructor(ritualId: string, userId: string, campusId: string);
}
export interface RitualLeaderboardEntry {
    userId: string;
    userName: string;
    points: number;
    rank: number;
    avatar?: string;
}
export interface GetRitualResult {
    id: string;
    name: string;
    description: string;
    type: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    campusId: string;
    progress: {
        total: number;
        currentMilestone: string;
        milestoneThreshold: number;
        percentComplete: number;
    };
    participation: {
        isParticipant: boolean;
        userPoints?: number;
        userRank?: number;
        lastActivity?: Date;
    };
    leaderboard: RitualLeaderboardEntry[];
    rewards: Array<{
        type: 'badge' | 'points' | 'privilege';
        name: string;
        description: string;
        icon: string;
        threshold: number;
    }>;
    stats: {
        totalParticipants: number;
        activeParticipants: number;
        totalActivities: number;
        averagePoints: number;
    };
}
export declare class GetRitualQueryHandler implements IQueryHandler<GetRitualQuery, GetRitualResult> {
    private readonly ritualRepository;
    private readonly profileRepository;
    constructor(ritualRepository: IRitualRepository, profileRepository: any);
    execute(query: GetRitualQuery): Promise<Result<GetRitualResult>>;
    private buildLeaderboard;
}
//# sourceMappingURL=get-ritual.query.d.ts.map