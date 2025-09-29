/**
 * Profile UI Types
 * Simplified interfaces for UI components that adapt from ProfileSystem
 */
import type { ProfileSystem } from '@hive/core';
/**
 * Simplified profile for UI components
 * Adapts the complex ProfileSystem to simpler UI needs
 */
export interface UIProfile {
    identity: {
        id: string;
        fullName: string;
        email: string;
        avatarUrl?: string;
        bio?: string;
    };
    academic: {
        campusId: 'ub-buffalo';
        major?: string;
        academicYear?: string;
        graduationYear?: number;
        housing?: string;
        pronouns?: string;
    };
    personal?: {
        bio?: string;
        interests?: string[];
        currentVibe?: string;
        lookingFor?: string[];
    };
    social?: {
        connections?: {
            connectionIds: string[];
            friendIds: string[];
            strength?: Record<string, number>;
        };
        mutualSpaces?: string[];
    };
    privacy?: {
        level: string;
        widgets?: Record<string, {
            level: string;
        }>;
    };
    verification?: {
        facultyVerified?: boolean;
        emailVerified?: boolean;
        profileVerified?: boolean;
        accountStatus?: string;
        userType?: string;
        onboardingCompleted?: boolean;
    };
    metadata?: {
        completionPercentage?: number;
        createdAt?: Date;
        updatedAt?: Date;
        lastActiveAt?: Date;
    };
    widgets?: Record<string, {
        level: string;
    }>;
}
/**
 * Convert ProfileSystem to UIProfile
 */
export declare function specProfileToUIProfile(profile: ProfileSystem): UIProfile;
//# sourceMappingURL=profile-types.d.ts.map