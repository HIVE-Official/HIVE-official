/**
 * EnhancedRitual Aggregate
 * Represents a campus-wide ritual or campaign with gamification
 */
import { AggregateRoot } from '../../shared/base/AggregateRoot.base';
import { Result } from '../../shared/base/Result';
import { RitualId } from '../value-objects/ritual-id.value';
import { CampusId } from '../../profile/value-objects/campus-id.value';
import { ProfileId } from '../../profile/value-objects/profile-id.value';
export interface Milestone {
    id: string;
    name: string;
    title: string;
    description: string;
    targetValue: number;
    currentValue: number;
    rewards: Reward[];
    isCompleted: boolean;
    threshold: number;
    isReached: boolean;
    reachedAt?: Date;
}
export interface Reward {
    type: 'badge' | 'points' | 'unlock' | 'achievement';
    value: string | number;
    description: string;
}
interface RitualSettings {
    isVisible: boolean;
    maxParticipants?: number;
    allowLateJoin: boolean;
    requiresApproval: boolean;
    autoStart: boolean;
    autoEnd: boolean;
}
interface EnhancedRitualProps {
    ritualId: RitualId;
    name: string;
    description: string;
    type: 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'one-time';
    campusId: CampusId;
    createdBy: ProfileId;
    milestones: Milestone[];
    participants: ProfileId[];
    settings: RitualSettings;
    startDate?: Date;
    endDate?: Date;
    isActive: boolean;
    completedCount: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class EnhancedRitual extends AggregateRoot<EnhancedRitualProps> {
    get ritualId(): RitualId;
    get name(): string;
    get description(): string;
    get type(): string;
    get campusId(): CampusId;
    get participants(): number;
    get isActive(): boolean;
    get settings(): RitualSettings;
    get startDate(): Date | undefined;
    get endDate(): Date | undefined;
    get milestones(): Milestone[];
    get createdAt(): Date;
    get updatedAt(): Date;
    private constructor();
    static create(props: {
        ritualId: RitualId;
        name: string;
        description: string;
        type: 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'one-time';
        campusId: CampusId;
        createdBy: ProfileId;
        milestones?: Milestone[];
        settings?: Partial<RitualSettings>;
        startDate?: Date;
        endDate?: Date;
    }, id?: string): Result<EnhancedRitual>;
    addParticipant(profileId: ProfileId | string): Result<void>;
    removeParticipant(profileId: ProfileId): Result<void>;
    updateMilestoneProgress(milestoneId: string, progress: number): Result<void>;
    activate(): void;
    deactivate(): void;
    hasStarted(): boolean;
    hasEnded(): boolean;
    isInProgress(): boolean;
    getCompletionPercentage(): number;
    getParticipant(profileId: string): ProfileId | undefined;
    getParticipants(): ProfileId[];
    getTotalProgress(): number;
    getParticipantCount(): number;
    getTotalActivities(): number;
    get rewards(): Reward[];
    setCreatedAt(date: Date): void;
    setUpdatedAt(date: Date): void;
    setMilestones(milestones: Milestone[]): void;
    toData(): any;
}
export {};
//# sourceMappingURL=enhanced-ritual.d.ts.map