/**
 * Spec-Compliant Profile Type
 * Represents the standardized profile structure for HIVE
 */
export interface SpecCompliantProfile {
    id: string;
    handle: string;
    displayName: string;
    email: string;
    bio?: string;
    photoURL?: string;
    coverPhotoURL?: string;
    school: string;
    major?: string;
    year?: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate' | 'Alumni';
    graduationYear?: number;
    connections?: {
        count: number;
        recentIds?: string[];
    };
    stats?: {
        postsCount: number;
        spacesJoined: number;
        toolsCreated: number;
        eventsAttended: number;
    };
    interests?: string[];
    skills?: string[];
    lookingFor?: string[];
    campusId: string;
    dorm?: string;
    organizations?: string[];
    createdAt: Date | any;
    updatedAt?: Date | any;
    lastActive?: Date | any;
    isVerified?: boolean;
    isActive?: boolean;
    privacy?: {
        profileVisibility: 'public' | 'campus' | 'connections' | 'private';
        showEmail: boolean;
        showSchedule: boolean;
        allowMessages: 'everyone' | 'connections' | 'nobody';
    };
    features?: {
        betaAccess?: boolean;
        toolBuilder?: boolean;
        spaceCreator?: boolean;
    };
}
export declare function isProfileComplete(profile: Partial<SpecCompliantProfile>): boolean;
export declare function getProfileCompletionPercentage(profile: Partial<SpecCompliantProfile>): number;
export declare function createDefaultProfile(email: string, campusId: string): SpecCompliantProfile;
//# sourceMappingURL=spec-compliant-profile.d.ts.map