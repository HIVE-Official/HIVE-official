/**
 * Rituals Domain Value Objects
 * Based on SPEC.md rituals system - campus-wide behavioral campaigns
 */
export declare class Result<T> {
    readonly isSuccess: boolean;
    readonly isFailure: boolean;
    readonly error?: string;
    private readonly _value?;
    private constructor();
    getValue(): T;
    static ok<U>(value?: U): Result<U>;
    static fail<U>(error: string): Result<U>;
}
/**
 * Ritual ID
 */
export declare class RitualId {
    private readonly value;
    private constructor();
    static create(id: string): Result<RitualId>;
    static generate(): RitualId;
    get id(): string;
    equals(other: RitualId): boolean;
}
/**
 * Ritual Type - SPEC: Onboarding, Seasonal, Challenge, Emergency
 */
export type RitualTypeValue = 'onboarding' | 'seasonal' | 'challenge' | 'emergency';
export declare class RitualType {
    private readonly value;
    private constructor();
    static create(type: string): Result<RitualType>;
    static onboarding(): RitualType;
    static seasonal(): RitualType;
    static challenge(): RitualType;
    static emergency(): RitualType;
    get type(): RitualTypeValue;
    equals(other: RitualType): boolean;
}
/**
 * Ritual Title
 */
export declare class RitualTitle {
    private readonly value;
    private constructor();
    static create(title: string): Result<RitualTitle>;
    get title(): string;
}
/**
 * Ritual Description
 */
export declare class RitualDescription {
    private readonly value;
    private constructor();
    static create(description: string): Result<RitualDescription>;
    get description(): string;
}
/**
 * Campus Goal - what the entire campus is trying to achieve
 */
export declare class CampusGoal {
    private readonly targetValue;
    private readonly currentValue;
    private readonly _unit;
    private constructor();
    static create(targetValue: number, unit: string, currentValue?: number): Result<CampusGoal>;
    get target(): number;
    get current(): number;
    get unit(): string;
    get progressPercentage(): number;
    get isComplete(): boolean;
    updateProgress(newValue: number): Result<CampusGoal>;
}
/**
 * Milestone - checkpoints in ritual progress
 */
export declare class Milestone {
    private readonly _name;
    private readonly _description;
    private readonly _threshold;
    private readonly _reward;
    private readonly isUnlocked;
    private constructor();
    static create(name: string, description: string, threshold: number, reward: string): Result<Milestone>;
    get name(): string;
    get description(): string;
    get threshold(): number;
    get reward(): string;
    get unlocked(): boolean;
    unlock(): Milestone;
    canUnlock(currentProgress: number): boolean;
}
/**
 * Participation ID
 */
export declare class ParticipationId {
    private readonly value;
    private constructor();
    static create(id: string): Result<ParticipationId>;
    static generate(): ParticipationId;
    get id(): string;
    equals(other: ParticipationId): boolean;
}
/**
 * Activity Type - different ways to participate in rituals
 */
export type ActivityTypeValue = 'space_join' | 'post_create' | 'event_attend' | 'connection_make' | 'profile_complete';
export declare class ActivityType {
    private readonly value;
    private constructor();
    static create(type: string): Result<ActivityType>;
    static spaceJoin(): ActivityType;
    static postCreate(): ActivityType;
    static eventAttend(): ActivityType;
    static connectionMake(): ActivityType;
    static profileComplete(): ActivityType;
    get type(): ActivityTypeValue;
    equals(other: ActivityType): boolean;
}
/**
 * Points - reward system for participation
 */
export declare class Points {
    private readonly _value;
    private constructor();
    static create(points: number): Result<Points>;
    static zero(): Points;
    get value(): number;
    add(other: Points): Points;
    subtract(other: Points): Result<Points>;
    isGreaterThan(other: Points): boolean;
    equals(other: Points): boolean;
}
/**
 * Ritual Status
 */
export type RitualStatusValue = 'upcoming' | 'active' | 'completed' | 'cancelled';
export declare class RitualStatus {
    private readonly value;
    private constructor();
    static create(status: string): Result<RitualStatus>;
    static upcoming(): RitualStatus;
    static active(): RitualStatus;
    static completed(): RitualStatus;
    static cancelled(): RitualStatus;
    get status(): RitualStatusValue;
    isActive(): boolean;
    isCompleted(): boolean;
    canParticipate(): boolean;
    equals(other: RitualStatus): boolean;
}
//# sourceMappingURL=value-objects.d.ts.map