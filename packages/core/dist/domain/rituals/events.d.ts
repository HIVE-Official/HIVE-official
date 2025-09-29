/**
 * Ritual Domain Events
 * Events that occur within the Ritual aggregate
 */
import { DomainEvent, DomainEventMetadata } from '../shared/domain-event';
import { RitualId, ParticipationId, ActivityType, Points } from './value-objects';
import { ProfileId } from './ritual';
export declare class RitualCreated extends DomainEvent {
    readonly ritualId: RitualId;
    readonly title: string;
    readonly type: string;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly campusGoalTarget: number;
    constructor(ritualId: RitualId, title: string, type: string, startDate: Date, endDate: Date, campusGoalTarget: number, metadata?: Partial<DomainEventMetadata>);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    protected getPayload(): Record<string, unknown>;
}
export declare class RitualStarted extends DomainEvent {
    readonly ritualId: RitualId;
    readonly participantCount: number;
    constructor(ritualId: RitualId, participantCount: number, metadata?: Partial<DomainEventMetadata>);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    protected getPayload(): Record<string, unknown>;
}
export declare class ParticipantJoinedRitual extends DomainEvent {
    readonly ritualId: RitualId;
    readonly participationId: ParticipationId;
    readonly participantId: ProfileId;
    readonly currentParticipantCount: number;
    constructor(ritualId: RitualId, participationId: ParticipationId, participantId: ProfileId, currentParticipantCount: number, metadata?: Partial<DomainEventMetadata>);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    protected getPayload(): Record<string, unknown>;
}
export declare class RitualActivityRecorded extends DomainEvent {
    readonly ritualId: RitualId;
    readonly participantId: ProfileId;
    readonly activityId: string;
    readonly activityType: ActivityType;
    readonly points: Points;
    readonly newTotalPoints: number;
    constructor(ritualId: RitualId, participantId: ProfileId, activityId: string, activityType: ActivityType, points: Points, newTotalPoints: number, metadata?: Partial<DomainEventMetadata>);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    protected getPayload(): Record<string, unknown>;
}
export declare class MilestoneUnlocked extends DomainEvent {
    readonly ritualId: RitualId;
    readonly participantId: ProfileId;
    readonly milestoneName: string;
    readonly milestoneThreshold: number;
    readonly reward: string;
    readonly isGlobalMilestone: boolean;
    constructor(ritualId: RitualId, participantId: ProfileId, milestoneName: string, milestoneThreshold: number, reward: string, isGlobalMilestone: boolean, metadata?: Partial<DomainEventMetadata>);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    protected getPayload(): Record<string, unknown>;
}
export declare class CampusGoalProgressUpdated extends DomainEvent {
    readonly ritualId: RitualId;
    readonly currentProgress: number;
    readonly targetProgress: number;
    readonly progressPercentage: number;
    readonly contributorCount: number;
    constructor(ritualId: RitualId, currentProgress: number, targetProgress: number, progressPercentage: number, contributorCount: number, metadata?: Partial<DomainEventMetadata>);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    protected getPayload(): Record<string, unknown>;
}
export declare class RitualCompleted extends DomainEvent {
    readonly ritualId: RitualId;
    readonly finalParticipantCount: number;
    readonly totalActivities: number;
    readonly completionReason: 'goal_reached' | 'deadline' | 'manual';
    readonly topParticipants: Array<{
        id: string;
        points: number;
    }>;
    constructor(ritualId: RitualId, finalParticipantCount: number, totalActivities: number, completionReason: 'goal_reached' | 'deadline' | 'manual', topParticipants: Array<{
        id: string;
        points: number;
    }>, metadata?: Partial<DomainEventMetadata>);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    protected getPayload(): Record<string, unknown>;
}
export declare class ParticipantLeftRitual extends DomainEvent {
    readonly ritualId: RitualId;
    readonly participantId: ProfileId;
    readonly reason: 'voluntary' | 'removed' | 'inactive';
    readonly pointsEarned: number;
    constructor(ritualId: RitualId, participantId: ProfileId, reason: 'voluntary' | 'removed' | 'inactive', pointsEarned: number, metadata?: Partial<DomainEventMetadata>);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    protected getPayload(): Record<string, unknown>;
}
//# sourceMappingURL=events.d.ts.map