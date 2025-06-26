/**
 * Comprehensive University at Buffalo Majors Database
 *
 * This file contains all undergraduate, master's, and PhD programs
 * organized by degree level for use across the HIVE application.
 */
export type DegreeType = "BS" | "BA" | "MS" | "MA" | "MBA" | "MFA" | "MPH" | "MPS" | "MUP" | "MSW" | "PhD" | "MArch" | "MM" | "EdM" | "BFA" | "BM";
export interface Major {
    name: string;
    degree: DegreeType;
    level: "undergraduate" | "graduate" | "doctoral";
    category?: string;
}
export declare const UNDERGRADUATE_MAJORS: Major[];
export declare const MASTERS_MAJORS: Major[];
export declare const PHD_MAJORS: Major[];
export declare const ALL_MAJORS: Major[];
export declare const getMajorsByLevel: (level: Major["level"]) => Major[];
export declare const getMajorsByCategory: (category: string) => Major[];
export declare const searchMajors: (query: string) => Major[];
export declare const getMajorNames: () => string[];
export declare const MAJOR_CATEGORIES: readonly ["Arts", "Architecture", "Business", "Education", "Engineering", "Health", "Humanities", "Information", "Interdisciplinary", "Sciences", "Social Sciences"];
export type MajorCategory = (typeof MAJOR_CATEGORIES)[number];
//# sourceMappingURL=majors.d.ts.map