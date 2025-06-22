/**
 * University at Buffalo (SUNY Buffalo) Academic Majors
 * Organized by school/college for better UX
 */
export interface Major {
    name: string;
    code?: string;
    school: string;
}
export declare const UB_MAJORS: Major[];
/**
 * Get majors grouped by school
 */
export declare function getMajorsBySchool(): Record<string, Major[]>;
/**
 * Get all unique school names
 */
export declare function getSchoolNames(): string[];
/**
 * Search majors by name
 */
export declare function searchMajors(query: string): Major[];
//# sourceMappingURL=majors.d.ts.map