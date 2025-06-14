import { type Timestamp } from 'firebase/firestore';

/**
 * Handle reservation document in the handles collection.
 * Document ID is the handle itself for fast uniqueness checking.
 */
export interface Handle {
  handle: string; // Document ID - the actual handle
  userId: string; // The user who owns this handle
  reservedAt: Timestamp; // When the handle was reserved
}

/**
 * Validation rules for handles
 */
export const HANDLE_RULES = {
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
} as const;

/**
 * Validate a handle string
 */
export function isValidHandle(handle: string): boolean {
  if (!handle || typeof handle !== 'string') return false;
  if (handle.length < HANDLE_RULES.MIN_LENGTH || handle.length > HANDLE_RULES.MAX_LENGTH) return false;
  if (!HANDLE_RULES.PATTERN.test(handle)) return false;
  if ((HANDLE_RULES.RESERVED_HANDLES as readonly string[]).includes(handle.toLowerCase())) return false;
  return true;
}

/**
 * Normalize a handle for storage (lowercase)
 */
export function normalizeHandle(handle: string): string {
  return handle.toLowerCase().trim();
} 