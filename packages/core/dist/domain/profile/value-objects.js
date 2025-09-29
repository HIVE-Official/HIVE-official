"use strict";
/**
 * Profile Domain Value Objects
 * Based on SPEC.md requirements for student identity
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoUrl = exports.ProfileId = exports.GraduationYear = exports.Major = exports.Bio = exports.Handle = exports.UBEmail = exports.Result = void 0;
class Result {
    constructor(isSuccess, error, value) {
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this._value = value;
    }
    getValue() {
        if (!this.isSuccess) {
            throw new Error('Cannot get value from failed result');
        }
        return this._value;
    }
    static ok(value) {
        return new Result(true, undefined, value);
    }
    static fail(error) {
        return new Result(false, error);
    }
}
exports.Result = Result;
/**
 * UB Email - must be @buffalo.edu for campus verification
 */
class UBEmail {
    constructor(value) {
        this.value = value;
    }
    static create(email) {
        if (!email || email.trim().length === 0) {
            return Result.fail('Email cannot be empty');
        }
        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return Result.fail('Invalid email format');
        }
        // SPEC requirement: UB emails only for vBETA
        if (!email.toLowerCase().endsWith('@buffalo.edu')) {
            return Result.fail('Email must be @buffalo.edu');
        }
        return Result.ok(new UBEmail(email.toLowerCase()));
    }
    get email() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.UBEmail = UBEmail;
/**
 * Handle - unique username for profile
 */
class Handle {
    constructor(value) {
        this.value = value;
    }
    static create(handle) {
        if (!handle || handle.trim().length === 0) {
            return Result.fail('Handle cannot be empty');
        }
        // 3-20 characters, alphanumeric and underscores
        const handleRegex = /^[a-zA-Z0-9_]{3,20}$/;
        if (!handleRegex.test(handle)) {
            return Result.fail('Handle must be 3-20 characters, letters, numbers, and underscores only');
        }
        return Result.ok(new Handle(handle.toLowerCase()));
    }
    get username() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.Handle = Handle;
/**
 * Profile Bio
 */
class Bio {
    constructor(value) {
        this.value = value;
    }
    static create(bio) {
        if (bio.length > 500) {
            return Result.fail('Bio cannot exceed 500 characters');
        }
        return Result.ok(new Bio(bio));
    }
    get text() {
        return this.value;
    }
}
exports.Bio = Bio;
/**
 * Major - student's academic program
 */
class Major {
    constructor(value) {
        this.value = value;
    }
    static create(major) {
        if (!major || major.trim().length === 0) {
            return Result.fail('Major cannot be empty');
        }
        return Result.ok(new Major(major));
    }
    get name() {
        return this.value;
    }
}
exports.Major = Major;
/**
 * Graduation Year
 */
class GraduationYear {
    constructor(value) {
        this.value = value;
    }
    static create(year) {
        const currentYear = new Date().getFullYear();
        if (year < currentYear) {
            return Result.fail('Graduation year cannot be in the past');
        }
        if (year > currentYear + 8) {
            return Result.fail('Graduation year too far in the future');
        }
        return Result.ok(new GraduationYear(year));
    }
    get year() {
        return this.value;
    }
}
exports.GraduationYear = GraduationYear;
/**
 * Profile ID
 */
class ProfileId {
    constructor(value) {
        this.value = value;
    }
    static create(id) {
        if (!id || id.trim().length === 0) {
            return Result.fail('Profile ID cannot be empty');
        }
        return Result.ok(new ProfileId(id));
    }
    static generate() {
        // Simple ID generation - in production use proper UUID
        const id = `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return new ProfileId(id);
    }
    get id() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.ProfileId = ProfileId;
/**
 * Photo URL
 */
class PhotoUrl {
    constructor(value) {
        this.value = value;
    }
    static create(url) {
        if (!url || url.trim().length === 0) {
            return Result.fail('Photo URL cannot be empty');
        }
        // Basic URL validation
        try {
            new URL(url);
        }
        catch {
            return Result.fail('Invalid photo URL');
        }
        return Result.ok(new PhotoUrl(url));
    }
    get url() {
        return this.value;
    }
}
exports.PhotoUrl = PhotoUrl;
//# sourceMappingURL=value-objects.js.map