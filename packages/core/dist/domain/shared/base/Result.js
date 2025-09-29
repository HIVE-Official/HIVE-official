"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
/**
 * Result class for functional error handling
 * Avoids throwing exceptions and provides explicit error handling
 */
class Result {
    constructor(isSuccess, error, value) {
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
    getValue() {
        if (!this.isSuccess) {
            throw new Error('Cannot get the value of an error result. Use error instead.');
        }
        return this._value;
    }
    get error() {
        return this._error;
    }
    static ok(value) {
        return new Result(true, null, value ?? null);
    }
    static fail(error) {
        return new Result(false, error, null);
    }
    static combine(results) {
        for (const result of results) {
            if (result.isFailure) {
                return result;
            }
        }
        return Result.ok();
    }
}
exports.Result = Result;
//# sourceMappingURL=Result.js.map