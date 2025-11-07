import type { ProfileSystem } from "@hive/core/types/profile-system";
export interface ProfileWidgetPrivacy {
    level: "public" | "connections" | "private" | "ghost" | string;
}
export interface UIProfile {
    identity: {
        id: string;
        fullName: string;
        email?: string;
        avatarUrl?: string | null;
        bio?: string;
    };
    academic: {
        campusId: string;
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
            connectionIds?: string[];
            friendIds?: string[];
            strength?: Record<string, number>;
        };
        mutualSpaces?: string[];
    };
    privacy?: {
        level?: string;
        widgets?: Record<string, ProfileWidgetPrivacy>;
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
    widgets?: Record<string, ProfileWidgetPrivacy>;
}
export declare function specProfileToUIProfile(profile: ProfileSystem): UIProfile;
//# sourceMappingURL=profile-types.d.ts.map