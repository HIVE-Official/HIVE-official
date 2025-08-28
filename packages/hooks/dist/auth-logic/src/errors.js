"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthError = exports.getErrorRecoveryAction = exports.getErrorMessage = exports.AuthErrorSchema = exports.AuthErrorCode = void 0;
const zod_1 = require("zod");
// Define all possible auth error codes
exports.AuthErrorCode = {
    // Authentication Errors
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    EXPIRED_SESSION: 'EXPIRED_SESSION',
    INVALID_TOKEN: 'INVALID_TOKEN',
    EXPIRED_LINK: 'EXPIRED_LINK',
    // Network/Server Errors
    NETWORK_ERROR: 'NETWORK_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    RATE_LIMITED: 'RATE_LIMITED',
    // Validation Errors
    INVALID_EMAIL: 'INVALID_EMAIL',
    INVALID_SCHOOL: 'INVALID_SCHOOL',
    EMAIL_IN_USE: 'EMAIL_IN_USE',
    // Session Errors
    SESSION_EXPIRED: 'SESSION_EXPIRED',
    INVALID_SESSION: 'INVALID_SESSION',
    CONCURRENT_SESSION: 'CONCURRENT_SESSION',
    // Access Errors
    UNAUTHORIZED: 'UNAUTHORIZED',
    ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
    REQUIRES_VERIFICATION: 'REQUIRES_VERIFICATION',
    // Generic
    UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};
// Zod schema for validating error responses
exports.AuthErrorSchema = zod_1.z.object({
    code: zod_1.z.enum([...Object.values(exports.AuthErrorCode)]),
    message: zod_1.z.string(),
    retry: zod_1.z.boolean().optional(),
    nextAction: zod_1.z.object({
        type: zod_1.z.enum(['REDIRECT', 'RETRY', 'WAIT', 'CONTACT_SUPPORT']),
        path: zod_1.z.string().optional(),
        waitMs: zod_1.z.number().optional(),
    }).optional(),
    details: zod_1.z.record(zod_1.z.unknown()).optional(),
});
// Error messages for each error code
const getErrorMessage = (code) => {
    switch (code) {
        case exports.AuthErrorCode.INVALID_CREDENTIALS:
            return 'Invalid email or password.';
        case exports.AuthErrorCode.EXPIRED_SESSION:
            return 'Your session has expired. Please sign in again.';
        case exports.AuthErrorCode.INVALID_TOKEN:
            return 'This authentication token is invalid or has expired.';
        case exports.AuthErrorCode.EXPIRED_LINK:
            return 'This magic link has expired. Please request a new one.';
        case exports.AuthErrorCode.NETWORK_ERROR:
            return 'Unable to connect. Please check your internet connection.';
        case exports.AuthErrorCode.SERVER_ERROR:
            return 'Server error. Please try again later.';
        case exports.AuthErrorCode.RATE_LIMITED:
            return 'Too many attempts. Please wait before trying again.';
        case exports.AuthErrorCode.INVALID_EMAIL:
            return 'Please use a valid .edu email address.';
        case exports.AuthErrorCode.INVALID_SCHOOL:
            return 'This school is not yet supported on HIVE.';
        case exports.AuthErrorCode.EMAIL_IN_USE:
            return 'This email is already registered.';
        case exports.AuthErrorCode.SESSION_EXPIRED:
            return 'Your session has expired. Please sign in again.';
        case exports.AuthErrorCode.INVALID_SESSION:
            return 'Your session is invalid. Please sign in again.';
        case exports.AuthErrorCode.CONCURRENT_SESSION:
            return 'You\'ve been signed out due to a login from another device.';
        case exports.AuthErrorCode.UNAUTHORIZED:
            return 'You don\'t have permission to access this resource.';
        case exports.AuthErrorCode.ACCOUNT_LOCKED:
            return 'Your account has been locked. Please contact support.';
        case exports.AuthErrorCode.REQUIRES_VERIFICATION:
            return 'Please verify your email address to continue.';
        default:
            return 'An unexpected error occurred. Please try again.';
    }
};
exports.getErrorMessage = getErrorMessage;
// Get recovery action for each error
const getErrorRecoveryAction = (code) => {
    switch (code) {
        case exports.AuthErrorCode.EXPIRED_LINK:
        case exports.AuthErrorCode.INVALID_TOKEN:
            return { type: 'REDIRECT', path: '/auth/email' };
        case exports.AuthErrorCode.NETWORK_ERROR:
        case exports.AuthErrorCode.SERVER_ERROR:
            return { type: 'RETRY' };
        case exports.AuthErrorCode.RATE_LIMITED:
            return { type: 'WAIT', waitMs: 30000 }; // 30 seconds
        case exports.AuthErrorCode.ACCOUNT_LOCKED:
            return { type: 'CONTACT_SUPPORT' };
        case exports.AuthErrorCode.SESSION_EXPIRED:
        case exports.AuthErrorCode.INVALID_SESSION:
        case exports.AuthErrorCode.CONCURRENT_SESSION:
            return { type: 'REDIRECT', path: '/auth/choose' };
        case exports.AuthErrorCode.REQUIRES_VERIFICATION:
            return { type: 'REDIRECT', path: '/auth/verify' };
        default:
            return { type: 'REDIRECT', path: '/auth/choose' };
    }
};
exports.getErrorRecoveryAction = getErrorRecoveryAction;
// Create an auth error instance
const createAuthError = (code, details) => {
    const recovery = (0, exports.getErrorRecoveryAction)(code);
    return {
        code,
        message: (0, exports.getErrorMessage)(code),
        retry: recovery.type === 'RETRY',
        nextAction: recovery,
        details
    };
};
exports.createAuthError = createAuthError;
//# sourceMappingURL=errors.js.map