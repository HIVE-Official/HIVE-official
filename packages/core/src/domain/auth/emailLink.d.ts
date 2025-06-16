import { type ActionCodeSettings } from 'firebase/auth';
/**
 * Configuration for sending magic link emails
 */
export interface MagicLinkConfig {
    email: string;
    schoolId: string;
    continueUrl?: string;
}
/**
 * Result of sending a magic link
 */
export interface SendMagicLinkResult {
    success: boolean;
    error?: string;
}
/**
 * Default action code settings for HIVE magic links
 */
export declare const getDefaultActionCodeSettings: (schoolId: string) => ActionCodeSettings;
/**
 * Validates an email domain against the school's domain
 */
export declare const validateEmailDomain: (email: string, schoolDomain: string) => boolean;
//# sourceMappingURL=emailLink.d.ts.map