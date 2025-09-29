/**
 * Space Category Value Object
 * Extended categories based on SPEC.md requirements
 */
import { Result } from '../value-objects';
export declare enum SpaceCategoryEnum {
    STUDY_GROUP = "study_group",
    ACADEMIC_DEPARTMENT = "academic_department",
    CLASS = "class",
    RESEARCH = "research",
    DORM = "dorm",
    SOCIAL_CLUB = "social_club",
    INTEREST_GROUP = "interest_group",
    FRATERNITY = "fraternity",
    SORORITY = "sorority",
    GREEK_COUNCIL = "greek_council",
    SPORTS_TEAM = "sports_team",
    INTRAMURAL = "intramural",
    FITNESS = "fitness",
    STUDENT_GOV = "student_gov",
    STUDENT_ORG = "student_org",
    PROFESSIONAL = "professional",
    EVENT = "event",
    CAMPAIGN = "campaign",
    GENERAL = "general"
}
export interface CategoryConfig {
    defaultWidgets: string[];
    requiresVerification: boolean;
    autoPromoteThreshold: number;
    maxMembers?: number;
    allowRSS: boolean;
}
export declare class SpaceCategory {
    private readonly category;
    private readonly config;
    private static readonly configs;
    private constructor();
    static create(category: string): Result<SpaceCategory>;
    static createStudyGroup(): SpaceCategory;
    static createDorm(): SpaceCategory;
    get value(): SpaceCategoryEnum;
    get defaultWidgets(): string[];
    get requiresVerification(): boolean;
    get autoPromoteThreshold(): number;
    get maxMembers(): number | undefined;
    get allowsRSS(): boolean;
    isAcademic(): boolean;
    isSocial(): boolean;
    isGreek(): boolean;
    canBePublicDuringRush(): boolean;
    equals(other: SpaceCategory): boolean;
}
//# sourceMappingURL=space-category.d.ts.map