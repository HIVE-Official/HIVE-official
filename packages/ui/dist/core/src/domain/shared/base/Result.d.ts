/**
 * Result class for functional error handling
 * Avoids throwing exceptions and provides explicit error handling
 */
export declare class Result<T> {
    readonly isSuccess: boolean;
    readonly isFailure: boolean;
    private readonly _error;
    private readonly _value;
    private constructor();
    getValue(): T;
    get error(): string | null;
    static ok<U>(value?: U): Result<U>;
    static fail<U>(error: string): Result<U>;
    static combine(results: Result<unknown>[]): Result<unknown>;
}
//# sourceMappingURL=Result.d.ts.map