/**
 * SpaceCategory Value Object
 * Represents the category/type of a space
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export declare enum SpaceCategoryEnum {
    GENERAL = "general",
    STUDY_GROUP = "study-group",
    SOCIAL = "social",
    EVENT = "event",
    RESOURCE = "resource",
    DORM = "dorm",
    CLUB = "club",
    SPORTS = "sports",
    ACADEMIC = "academic"
}
interface SpaceCategoryProps {
    value: SpaceCategoryEnum;
}
export declare class SpaceCategory extends ValueObject<SpaceCategoryProps> {
    get value(): SpaceCategoryEnum;
    private constructor();
    static create(category: string): Result<SpaceCategory>;
    static createGeneral(): Result<SpaceCategory>;
    static createStudyGroup(): Result<SpaceCategory>;
    isAcademic(): boolean;
    isSocial(): boolean;
    toString(): string;
}
export {};
//# sourceMappingURL=space-category.value.d.ts.map