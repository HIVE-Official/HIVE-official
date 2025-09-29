/**
 * Participation Entity
 * Represents a user's participation in a ritual
 */
import { Entity } from '../../shared/base/Entity.base';
import { Result } from '../../shared/base/Result';
import { ProfileId } from '../../profile/value-objects/profile-id.value';
import { RitualId } from '../value-objects/ritual-id.value';
interface ParticipationProps {
    profileId: ProfileId;
    ritualId: RitualId;
    joinedAt: Date;
    lastParticipatedAt?: Date;
    completionCount: number;
    streakCount: number;
    totalPoints: number;
    achievements: string[];
    isActive: boolean;
    metadata?: Record<string, any>;
}
export declare class Participation extends Entity<ParticipationProps> {
    get profileId(): ProfileId;
    get ritualId(): RitualId;
    get joinedAt(): Date;
    get lastParticipatedAt(): Date | undefined;
    get completionCount(): number;
    get streakCount(): number;
    get totalPoints(): number;
    get achievements(): string[];
    get isActive(): boolean;
    get metadata(): Record<string, any> | undefined;
    private constructor();
    static create(props: {
        profileId: ProfileId;
        ritualId: RitualId;
        joinedAt?: Date;
        completionCount?: number;
        streakCount?: number;
        totalPoints?: number;
        achievements?: string[];
        isActive?: boolean;
        metadata?: Record<string, any>;
    }, id?: string): Result<Participation>;
    participate(): Result<void>;
    addAchievement(achievement: string): void;
    deactivate(): void;
    reactivate(): void;
    updateMetadata(metadata: Record<string, any>): void;
    updateMilestoneProgress(milestoneId: string, progress: number): void;
    completeMilestone(milestoneId: string): void;
    addPoints(points: number): void;
    updateStreak(streakCount: number): void;
    toData(): any;
}
export {};
//# sourceMappingURL=participation.d.ts.map