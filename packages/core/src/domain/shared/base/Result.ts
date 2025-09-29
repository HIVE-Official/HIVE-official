/**
 * Result class for functional error handling
 * Avoids throwing exceptions and provides explicit error handling
 */
export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  private readonly _error: string | null;
  private readonly _value: T | null;

  private constructor(isSuccess: boolean, error: string | null, value: T | null) {
    if (isSuccess && error) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error');
    }
    if (!isSuccess && !error) {
      throw new Error('InvalidOperation: A failing result needs to contain an error message');
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this._error = error;
    this._value = value;

    Object.freeze(this);
  }

  getValue(): T {
    if (!this.isSuccess) {
      throw new Error('Cannot get the value of an error result. Use error instead.');
    }

    return this._value as T;
  }

  get error(): string | null {
    return this._error;
  }

  static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value ?? null);
  }

  static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error, null);
  }

  static combine(results: Result<unknown>[]): Result<unknown> {
    for (const result of results) {
      if (result.isFailure) {
        return result;
      }
    }
    return Result.ok();
  }
}