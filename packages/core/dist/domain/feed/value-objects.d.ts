/**
 * Feed Domain Value Objects
 * Based on SPEC.md feed requirements - read-only discovery layer
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
 * Feed Item ID
 */
export declare class FeedItemId {
    private readonly value;
    private constructor();
    static create(id: string): Result<FeedItemId>;
    static generate(): FeedItemId;
    get id(): string;
    equals(other: FeedItemId): boolean;
}
/**
 * Content Source - where feed content originates
 * SPEC: All posts must originate from spaces
 */
export type ContentSourceType = 'space_post' | 'event' | 'trending_space' | 'ritual_update';
export declare class ContentSource {
    private readonly sourceType;
    private readonly sourceId;
    private readonly spaceName?;
    private constructor();
    static create(sourceType: ContentSourceType, sourceId: string, spaceName?: string): Result<ContentSource>;
    get type(): ContentSourceType;
    get id(): string;
    get spaceId(): string;
    get name(): string | undefined;
    isFromSpace(): boolean;
    isEvent(): boolean;
}
/**
 * Feed Filter for discovery intent
 * SPEC: My Spaces, Trending, Events, etc.
 */
export type FeedFilterType = 'all' | 'my_spaces' | 'trending' | 'events' | 'rituals';
export declare class FeedFilter {
    private readonly filterType;
    private constructor();
    static create(filterType: string): Result<FeedFilter>;
    static all(): FeedFilter;
    static mySpaces(): FeedFilter;
    static trending(): FeedFilter;
    static events(): FeedFilter;
    static rituals(): FeedFilter;
    get type(): FeedFilterType;
    equals(other: FeedFilter): boolean;
}
/**
 * Relevance Score for feed algorithm
 * SPEC: Based on recency, engagement, social proximity, etc.
 */
export declare class RelevanceScore {
    private readonly value;
    private constructor();
    static create(score: number): Result<RelevanceScore>;
    static zero(): RelevanceScore;
    static max(): RelevanceScore;
    get score(): number;
    isHighlyRelevant(): boolean;
    isRelevant(): boolean;
    compareTo(other: RelevanceScore): number;
}
/**
 * Time Window for filtering content
 */
export declare class TimeWindow {
    private readonly startTime;
    private readonly endTime;
    private constructor();
    static create(startTime: Date, endTime: Date): Result<TimeWindow>;
    static last24Hours(): TimeWindow;
    static lastWeek(): TimeWindow;
    static today(): TimeWindow;
    get start(): Date;
    get end(): Date;
    contains(date: Date): boolean;
    getDurationHours(): number;
}
/**
 * Feed Interaction Type - SPEC: View, React, Repost, Requote only (no direct posting)
 */
export type InteractionType = 'view' | 'react' | 'repost' | 'requote' | 'hide';
export declare class FeedInteraction {
    private readonly interactionType;
    private readonly userId;
    private readonly _timestamp;
    private readonly metadata?;
    private constructor();
    static create(interactionType: InteractionType, userId: string, metadata?: Record<string, unknown>): Result<FeedInteraction>;
    get type(): InteractionType;
    get user(): string;
    get timestamp(): Date;
    get data(): Record<string, unknown> | undefined;
    isEngagement(): boolean;
    isNegative(): boolean;
}
//# sourceMappingURL=value-objects.d.ts.map