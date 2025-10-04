/**
 * Ritual Aggregate
 * Campus-wide behavioral campaigns based on SPEC.md Complete Ritual Specifications
 *
 * Three Types:
 * - Short (1 week): Feature introduction or themed celebration
 * - Anticipatory (variable): Build excitement for feature reveals
 * - Yearbook (3 weeks): Tournament-style competitions
 */
import { AggregateRoot } from '../../shared/base/AggregateRoot.base';
import { Result } from '../../shared/base/Result';
import { RitualId } from '../value-objects/ritual-id.value';
import { CampusId } from '../../profile/value-objects/campus-id.value';
import { ProfileId } from '../../profile/value-objects/profile-id.value';
export type RitualType = 'short' | 'anticipatory' | 'yearbook';
export type RitualCategory = 'social' | 'academic' | 'wellness' | 'community';
export type RitualStatus = 'draft' | 'announced' | 'active' | 'final_push' | 'completed' | 'paused';
export type GoalType = 'individual' | 'space' | 'campus' | 'stretch';
/**
 * Ritual Goal - Progress markers for collective achievement
 */
export interface RitualGoal {
    id: string;
    description: string;
    type: GoalType;
    targetValue: number;
    currentValue: number;
    isCompleted: boolean;
    completedAt?: Date;
}
/**
 * Ritual Requirement - Specific actions users must complete
 */
export interface RitualRequirement {
    action: string;
    target: number;
    validation: 'manual' | 'automatic' | 'peer';
}
/**
 * Ritual Reward - What participants earn
 */
export interface RitualReward {
    id: string;
    type: 'badge' | 'feature_unlock' | 'special_access' | 'recognition' | 'points';
    name: string;
    description: string;
    value?: string | number;
    requirements?: string;
}
/**
 * Participation Analytics
 */
export interface ParticipationStats {
    total: number;
    active: number;
    completed: number;
    averageProgress: number;
}
export interface RitualProps {
    ritualId: RitualId;
    name: string;
    description: string;
    icon?: string;
    type: RitualType;
    category: RitualCategory;
    duration: string;
    startDate: Date;
    endDate?: Date;
    goals: RitualGoal[];
    requirements: RitualRequirement[];
    rewards: RitualReward[];
    participants: ProfileId[];
    targetParticipation?: number;
    participationStats: ParticipationStats;
    campusId: CampusId;
    targetAudience: 'all' | 'students' | 'leaders' | 'new_users';
    createdBy: ProfileId;
    status: RitualStatus;
    visibility: 'public' | 'targeted' | 'hidden';
    announcedAt?: Date;
    activatedAt?: Date;
    launchedAt?: Date;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Ritual Aggregate
 * Manages campus-wide behavioral campaigns
 */
export declare class Ritual extends AggregateRoot<RitualProps> {
    private constructor();
    get ritualId(): RitualId;
    get name(): string;
    get description(): string;
    get type(): RitualType;
    get category(): RitualCategory;
    get status(): RitualStatus;
    get duration(): string;
    get startDate(): Date;
    get endDate(): Date | undefined;
    get goals(): RitualGoal[];
    get requirements(): RitualRequirement[];
    get rewards(): RitualReward[];
    get campusId(): CampusId;
    get targetAudience(): string;
    get visibility(): string;
    get participationStats(): ParticipationStats;
    get createdAt(): Date;
    get updatedAt(): Date;
    static create(props: Omit<RitualProps, 'ritualId' | 'createdAt' | 'updatedAt' | 'participants' | 'participationStats'> & {
        ritualId?: RitualId;
    }, id?: string): Result<Ritual>;
    /**
     * Announce Ritual (48hr preview phase)
     */
    announce(): Result<void>;
    /**
     * Activate Ritual (start active phase)
     */
    activate(): Result<void>;
    /**
     * Enter Final Push Phase (last 24 hours)
     */
    enterFinalPush(): Result<void>;
    /**
     * Complete Ritual
     */
    complete(): Result<void>;
    /**
     * Pause Ritual
     */
    pause(): Result<void>;
    /**
     * Add Participant
     */
    addParticipant(profileId: ProfileId | string): Result<void>;
    /**
     * Remove Participant
     */
    removeParticipant(profileId: ProfileId | string): Result<void>;
    /**
     * Update Goal Progress
     */
    updateGoalProgress(goalId: string, progress: number): Result<void>;
    /**
     * Calculate completion percentage
     */
    getCompletionPercentage(): number;
    /**
     * Calculate total progress across all goals
     */
    getTotalProgress(): number;
    /**
     * Get participant count
     */
    getParticipantCount(): number;
    /**
     * Get all participants
     */
    getParticipants(): ProfileId[];
    /**
     * Check if ritual is active
     */
    isActive(): boolean;
    /**
     * Check if ritual has started
     */
    hasStarted(): boolean;
    /**
     * Check if ritual has ended
     */
    hasEnded(): boolean;
    /**
     * Check if in final push period (last 24 hours)
     */
    isInFinalPush(): boolean;
    /**
     * Update participation statistics
     */
    private updateParticipationStats;
    /**
     * Mark participant as completed
     */
    markParticipantCompleted(): Result<void>;
    /**
     * Participation Business Logic (Moved from RitualParticipationService)
     */
    getParticipationWarnings(now?: Date): string[];
    calculateGoalPoints(goalId: string): number;
    getDaysUntilEnd(now?: Date): number;
    getSpotsRemaining(): number | null;
    setCreatedAt(date: Date): void;
    setUpdatedAt(date: Date): void;
    setGoals(goals: RitualGoal[]): void;
    setRequirements(requirements: RitualRequirement[]): void;
    setRewards(rewards: RitualReward[]): void;
    toData(): any;
}
//# sourceMappingURL=ritual.aggregate.d.ts.map