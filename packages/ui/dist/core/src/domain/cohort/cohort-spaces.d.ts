/**
 * Cohort Space Generation Utilities
 *
 * Generates cohort spaces for academic majors and graduation years
 */
export interface CohortSpaceConfig {
    major: string;
    graduationYear: number;
    majorShortName?: string;
}
/**
 * Generate cohort space identifiers and metadata
 */
export declare function generateCohortSpaces(config: CohortSpaceConfig): {
    id: string;
    name: string;
    description: string;
    type: "hive_exclusive";
    tags: {
        type: "hive_exclusive";
        sub_type: string;
    }[];
    cohortData: {
        major: string;
        graduationYear: number;
        cohortType: string;
        university: string;
    };
}[];
/**
 * Create a major abbreviation from the full major name
 */
export declare function createMajorAbbreviation(major: string): string;
/**
 * Generate space ID from cohort data
 */
export declare function getCohortSpaceId(major: string | null, graduationYear: number | null): string;
/**
 * Check if a space is a cohort space
 */
export declare function isCohortSpace(spaceId: string): boolean;
/**
 * Parse cohort data from space ID
 */
export declare function parseCohortSpaceId(spaceId: string): {
    major?: string;
    graduationYear?: number;
    cohortType?: string;
} | null;
//# sourceMappingURL=cohort-spaces.d.ts.map