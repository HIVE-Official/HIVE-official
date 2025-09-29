/**
 * Spaces Domain Value Objects
 * Based on SPEC.md spaces and community requirements
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
 * Space ID
 */
export declare class SpaceId {
    private readonly value;
    private constructor();
    static create(id: string): Result<SpaceId>;
    static generate(): SpaceId;
    get id(): string;
    equals(other: SpaceId): boolean;
}
/**
 * Space Name - must be unique per campus
 */
export declare class SpaceName {
    private readonly value;
    private constructor();
    static create(name: string): Result<SpaceName>;
    get name(): string;
    equals(other: SpaceName): boolean;
}
/**
 * Space Description
 */
export declare class SpaceDescription {
    private readonly value;
    private constructor();
    static create(description: string): Result<SpaceDescription>;
    get description(): string;
}
/**
 * Space Type - different kinds of spaces for different purposes
 */
export type SpaceTypeValue = 'dorm' | 'academic' | 'interest' | 'event' | 'general';
export declare class SpaceType {
    private readonly value;
    private constructor();
    static create(type: string): Result<SpaceType>;
    get type(): SpaceTypeValue;
    equals(other: SpaceType): boolean;
}
/**
 * Post ID
 */
export declare class PostId {
    private readonly value;
    private constructor();
    static create(id: string): Result<PostId>;
    static generate(): PostId;
    get id(): string;
    equals(other: PostId): boolean;
}
/**
 * Post Content
 */
export declare class PostContent {
    private readonly _text;
    private readonly _mediaUrls;
    private constructor();
    static create(text: string, mediaUrls?: string[]): Result<PostContent>;
    get text(): string;
    get mediaUrls(): string[];
    get hasMedia(): boolean;
}
/**
 * RSS Feed URL for space integration
 */
export declare class RSSFeedUrl {
    private readonly value;
    private constructor();
    static create(url: string): Result<RSSFeedUrl>;
    get url(): string;
}
/**
 * Member Role in a space
 */
export type MemberRoleValue = 'leader' | 'moderator' | 'member';
export declare class MemberRole {
    private readonly value;
    private constructor();
    static create(role: string): Result<MemberRole>;
    static leader(): MemberRole;
    static moderator(): MemberRole;
    static member(): MemberRole;
    get role(): MemberRoleValue;
    canModerate(): boolean;
    canManageSpace(): boolean;
    equals(other: MemberRole): boolean;
}
//# sourceMappingURL=value-objects.d.ts.map