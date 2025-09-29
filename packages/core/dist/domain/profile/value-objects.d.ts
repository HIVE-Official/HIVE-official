/**
 * Profile Domain Value Objects
 * Based on SPEC.md requirements for student identity
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
 * UB Email - must be @buffalo.edu for campus verification
 */
export declare class UBEmail {
    private readonly value;
    private constructor();
    static create(email: string): Result<UBEmail>;
    get email(): string;
    equals(other: UBEmail): boolean;
}
/**
 * Handle - unique username for profile
 */
export declare class Handle {
    private readonly value;
    private constructor();
    static create(handle: string): Result<Handle>;
    get username(): string;
    equals(other: Handle): boolean;
}
/**
 * Profile Bio
 */
export declare class Bio {
    private readonly value;
    private constructor();
    static create(bio: string): Result<Bio>;
    get text(): string;
}
/**
 * Major - student's academic program
 */
export declare class Major {
    private readonly value;
    private constructor();
    static create(major: string): Result<Major>;
    get name(): string;
}
/**
 * Graduation Year
 */
export declare class GraduationYear {
    private readonly value;
    private constructor();
    static create(year: number): Result<GraduationYear>;
    get year(): number;
}
/**
 * Profile ID
 */
export declare class ProfileId {
    private readonly value;
    private constructor();
    static create(id: string): Result<ProfileId>;
    static generate(): ProfileId;
    get id(): string;
    equals(other: ProfileId): boolean;
}
/**
 * Photo URL
 */
export declare class PhotoUrl {
    private readonly value;
    private constructor();
    static create(url: string): Result<PhotoUrl>;
    get url(): string;
}
//# sourceMappingURL=value-objects.d.ts.map