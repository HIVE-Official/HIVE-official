import { type Timestamp } from 'firebase/firestore';
/**
 * Handle reservation document in the handles collection.
 * Document ID is the handle itself for fast uniqueness checking.
 */
export interface Handle {
    handle: string;
    userId: string;
    reservedAt: Timestamp;
}
/**
 * Validation rules for handles
 */
export declare const HANDLE_RULES: {
    readonly MIN_LENGTH: 3;
    readonly MAX_LENGTH: 20;
    readonly PATTERN: RegExp;
    readonly RESERVED_HANDLES: readonly ["admin", "api", "app", "help", "support", "hive", "root", "system", "null", "undefined", "void", "settings", "profile", "spaces", "feed", "auth", "login", "logout", "signup", "onboarding", "welcome", "about", "terms", "privacy", "contact"];
};
/**
 * Validate a handle string
 */
export declare function isValidHandle(handle: string): boolean;
/**
 * Normalize a handle for storage (lowercase)
 */
export declare function normalizeHandle(handle: string): string;
//# sourceMappingURL=handle.d.ts.map