/**
 * Comprehensive University at Buffalo Majors Database
 *
 * This file contains all undergraduate, master's, and PhD programs
 * organized by degree level for use across the HIVE application.
 */
import { type MajorType } from '../types/major';
export declare const UNDERGRADUATE_MAJORS: MajorType[];
export declare const MASTERS_MAJORS: MajorType[];
export declare const PHD_MAJORS: MajorType[];
export declare const ALL_MAJORS: MajorType[];
export declare const getMajorsByLevel: (level: MajorType["level"]) => MajorType[];
export declare const getMajorsByCategory: (category: string) => MajorType[];
export declare const searchMajors: (query: string) => MajorType[];
//# sourceMappingURL=majors.d.ts.map