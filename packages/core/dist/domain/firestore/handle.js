"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HANDLE_RULES = void 0;
exports.isValidHandle = isValidHandle;
exports.normalizeHandle = normalizeHandle;
/**
 * Validation rules for handles
 */
exports.HANDLE_RULES = {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_]+$/, // Letters, numbers, underscores only
    RESERVED_HANDLES: [
        'admin',
        'api',
        'app',
        'help',
        'support',
        'hive',
        'root',
        'system',
        'null',
        'undefined',
        'void',
        'settings',
        'profile',
        'spaces',
        'feed',
        'auth',
        'login',
        'logout',
        'signup',
        'onboarding',
        'welcome',
        'about',
        'terms',
        'privacy',
        'contact'
    ]
};
/**
 * Validate a handle string
 */
function isValidHandle(handle) {
    if (!handle || typeof handle !== 'string')
        return false;
    if (handle.length < exports.HANDLE_RULES.MIN_LENGTH || handle.length > exports.HANDLE_RULES.MAX_LENGTH)
        return false;
    if (!exports.HANDLE_RULES.PATTERN.test(handle))
        return false;
    if (exports.HANDLE_RULES.RESERVED_HANDLES.includes(handle.toLowerCase()))
        return false;
    return true;
}
/**
 * Normalize a handle for storage (lowercase)
 */
function normalizeHandle(handle) {
    return handle.toLowerCase().trim();
}
//# sourceMappingURL=handle.js.map