/**
 * University at Buffalo (SUNY Buffalo) Academic Programs
 * Authoritative catalog for the 2025-26 academic year sourced from
 * https://catalog.buffalo.edu (undergraduate majors) and
 * https://grad.buffalo.edu (graduate & professional programs).
 */
export interface Major {
    name: string;
    code?: string;
    school: string;
}
export declare const UB_UNDERGRADUATE_MAJORS: string[];
export declare const UB_GRADUATE_PROGRAMS: string[];
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