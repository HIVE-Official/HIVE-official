/**
 * Ritual Aggregate - Campus-Wide Behavioral Campaigns
 * Based on SPEC.md rituals system for student engagement
 */
import { RitualId, RitualType, RitualTitle, RitualDescription, CampusGoal, Milestone, ParticipationId, ActivityType, Points, RitualStatus, Result } from './value-objects';
import { ProfileId } from '../profile/value-objects';
export interface RitualCreationProps {
    title: string;
    description: string;
    type: string;
    campusGoalTarget: number;
    campusGoalUnit: string;
    startDate: Date;
    endDate: Date;
}
export interface Activity {
    id: string;
    type: ActivityType;
    participantId: ProfileId;
    points: Points;
    metadata: Record<string, unknown>;
    timestamp: Date;
}
export interface Participation {
    id: ParticipationId;
    ritualId: RitualId;
    participantId: ProfileId;
    joinedAt: Date;
    totalPoints: Points;
    activities: Activity[];
    milestonesUnlocked: string[];
    isActive: boolean;
}
export interface RitualData {
    id: RitualId;
    title: RitualTitle;
    description: RitualDescription;
    type: RitualType;
    status: RitualStatus;
    campusGoal: CampusGoal;
    milestones: Milestone[];
    participations: Participation[];
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Ritual Aggregate Root
 * Represents a campus-wide behavioral campaign
 */
export declare class Ritual {
    private data;
    protected constructor(data: RitualData);
    get id(): RitualId;
    get title(): RitualTitle;
    get description(): RitualDescription;
    get type(): RitualType;
    get status(): RitualStatus;
    get campusGoal(): CampusGoal;
    get milestones(): Milestone[];
    get startDate(): Date;
    get endDate(): Date;
    get participantCount(): number;
    get totalActivities(): number;
    get isActive(): boolean;
    get isCompleted(): boolean;
    get progressPercentage(): number;
    static create(props: RitualCreationProps): Result<Ritual>;
    addMilestone(name: string, description: string, threshold: number, reward: string): Result<Milestone>;
    addParticipant(profileId: ProfileId): Result<Participation>;
    recordActivity(participantId: ProfileId, activityType: ActivityType, points: Points, metadata?: Record<string, unknown>): Result<Activity>;
    getParticipantProgress(participantId: ProfileId): Participation | null;
    getLeaderboard(limit?: number): Participation[];
    getRecentMilestones(timeWindowHours?: number): Milestone[];
    start(): Result<void>;
    complete(): Result<void>;
    cancel(): Result<void>;
    removeParticipant(participantId: ProfileId): Result<void>;
    canJoin(): boolean;
    isParticipating(profileId: ProfileId): boolean;
    getStatistics(): {
        participantCount: number;
        totalActivities: number;
        averagePointsPerParticipant: number;
        completionRate: number;
        daysRemaining: number;
    };
    private calculateCampusProgress;
    private checkMilestoneUnlocks;
    toData(): RitualData;
    static fromData(data: RitualData): Ritual;
}
//# sourceMappingURL=ritual.d.ts.map