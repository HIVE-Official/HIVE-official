/**
 * CAMPUS ISOLATION FOR PROFILE SYSTEM
 *
 * SPEC Requirement: All profile operations MUST be isolated by campus.
 * For vBETA, campusId is hardcoded to 'ub-buffalo'.
 *
 * This module ensures complete campus isolation for:
 * - Profile queries
 * - Profile updates
 * - Connection/friend operations
 * - Profile discovery
 * - Space membership through profiles
 */
import type { SpecCompliantProfile } from './spec-compliant-profile';
/** vBETA campus identifier - hardcoded per SPEC */
export declare const CAMPUS_ID: "ub-buffalo";
/** Campus configuration for UB */
export declare const UB_CAMPUS_CONFIG: {
    readonly id: "ub-buffalo";
    readonly name: "University at Buffalo";
    readonly emailDomain: "@buffalo.edu";
    readonly userTypes: readonly ["student", "alumni", "faculty", "staff"];
    readonly academic: {
        readonly majors: readonly ["Computer Science", "Business Administration", "Engineering", "Biology", "Psychology", "Communications", "Mathematics", "Physics", "Chemistry", "Economics", "Political Science", "English", "History", "Art", "Music", "Philosophy", "Sociology", "Nursing", "Medicine", "Law"];
        readonly graduationYearRange: {
            readonly min: 2020;
            readonly max: 2030;
        };
    };
    readonly housing: readonly ["Ellicott Complex", "Governors Complex", "South Campus", "Greiner Hall", "Clement Hall", "Wilkeson Quad", "Off-Campus North", "Off-Campus South", "Commuter"];
};
/**
 * Validate that a profile belongs to the current campus
 */
export declare function validateCampusIsolation(profile: Partial<SpecCompliantProfile>): boolean;
/**
 * Validate email belongs to campus domain
 */
export declare function validateCampusEmail(email: string): boolean;
/**
 * Ensure profile has correct campus ID
 */
export declare function enforceCampusId<T extends {
    academic?: {
        campusId?: string;
    };
}>(profile: T): T & {
    academic: {
        campusId: typeof CAMPUS_ID;
    };
};
/**
 * Campus-isolated profile query builder
 * Ensures all queries include campus isolation
 */
export declare class CampusIsolatedQuery {
    private conditions;
    constructor();
    /**
     * Add additional query conditions
     */
    where(field: string, value: any): this;
    /**
     * Get the final query object with campus isolation
     */
    build(): Record<string, any>;
    /**
     * Create a Firestore-compatible query
     */
    toFirestoreConstraints(): Array<[string, string, any]>;
}
export interface CampusProfileDiscoveryOptions {
    /** User type filter */
    userType?: 'student' | 'alumni' | 'faculty' | 'staff';
    /** Major filter */
    major?: string;
    /** Graduation year filter */
    graduationYear?: number;
    /** Housing filter */
    housing?: string;
    /** Search query */
    searchQuery?: string;
    /** Exclude user IDs */
    excludeIds?: string[];
    /** Limit results */
    limit?: number;
    /** Offset for pagination */
    offset?: number;
}
/**
 * Build campus-isolated profile discovery query
 */
export declare function buildProfileDiscoveryQuery(options?: CampusProfileDiscoveryOptions): CampusIsolatedQuery;
/**
 * Validate that two users can connect (must be same campus)
 */
export declare function canUsersConnect(user1: SpecCompliantProfile, user2: SpecCompliantProfile): {
    canConnect: boolean;
    reason?: string;
};
/**
 * Get mutual connections between two users (campus-isolated)
 */
export declare function getMutualConnections(user1: SpecCompliantProfile, user2: SpecCompliantProfile): string[];
/**
 * Get spaces shared between two users (campus-isolated)
 */
export declare function getSharedSpaces(user1: SpecCompliantProfile, user2: SpecCompliantProfile): string[];
/**
 * Validate faculty email against campus directory
 */
export declare function validateFacultyEmail(email: string): boolean;
/**
 * Get academic spaces for faculty member
 */
export declare function getFacultyAcademicSpaces(facultyProfile: SpecCompliantProfile): string[];
/**
 * Check if viewer can see target profile based on campus and privacy
 */
export declare function canViewProfile(viewerProfile: SpecCompliantProfile | null, targetProfile: SpecCompliantProfile): {
    canView: boolean;
    reason?: string;
};
/**
 * Migrate existing profile to campus-isolated format
 */
export declare function migrateProfileToCampusIsolation(profile: any): Partial<SpecCompliantProfile>;
/**
 * Get campus-wide profile statistics
 */
export interface CampusProfileStats {
    totalProfiles: number;
    studentCount: number;
    facultyCount: number;
    alumniCount: number;
    staffCount: number;
    averageCompletionRate: number;
    activeLastWeek: number;
    topMajors: Array<{
        major: string;
        count: number;
    }>;
    topHousing: Array<{
        housing: string;
        count: number;
    }>;
}
/**
 * Calculate campus profile statistics
 * Note: This would be implemented with actual database aggregation
 */
export declare function getCampusProfileStats(): Promise<CampusProfileStats>;
/**
 * Middleware to ensure all profile operations are campus-isolated
 */
export declare function campusIsolationMiddleware(): {
    /**
     * Wrap a query with campus isolation
     */
    wrapQuery<T>(query: T): T & {
        "academic.campusId": typeof CAMPUS_ID;
    };
    /**
     * Validate profile data has correct campus
     */
    validateProfile(profile: any): boolean;
    /**
     * Enforce campus ID on profile data
     */
    enforceProfile<T extends {
        academic?: {
            campusId?: string;
        };
    }>(profile: T): T;
};
//# sourceMappingURL=campus-isolation.d.ts.map