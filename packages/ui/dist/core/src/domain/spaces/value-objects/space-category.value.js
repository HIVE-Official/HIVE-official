/**
 * SpaceCategory Value Object
 * Represents the category/type of a space
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export var SpaceCategoryEnum;
(function (SpaceCategoryEnum) {
    SpaceCategoryEnum["GENERAL"] = "general";
    SpaceCategoryEnum["STUDY_GROUP"] = "study-group";
    SpaceCategoryEnum["SOCIAL"] = "social";
    SpaceCategoryEnum["EVENT"] = "event";
    SpaceCategoryEnum["RESOURCE"] = "resource";
    SpaceCategoryEnum["DORM"] = "dorm";
    SpaceCategoryEnum["CLUB"] = "club";
    SpaceCategoryEnum["SPORTS"] = "sports";
    SpaceCategoryEnum["ACADEMIC"] = "academic";
})(SpaceCategoryEnum || (SpaceCategoryEnum = {}));
export class SpaceCategory extends ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(category) {
        if (!Object.values(SpaceCategoryEnum).includes(category)) {
            return Result.fail(`Invalid space category: ${category}`);
        }
        return Result.ok(new SpaceCategory({ value: category }));
    }
    static createGeneral() {
        return Result.ok(new SpaceCategory({ value: SpaceCategoryEnum.GENERAL }));
    }
    static createStudyGroup() {
        return Result.ok(new SpaceCategory({ value: SpaceCategoryEnum.STUDY_GROUP }));
    }
    isAcademic() {
        return [
            SpaceCategoryEnum.STUDY_GROUP,
            SpaceCategoryEnum.ACADEMIC,
            SpaceCategoryEnum.RESOURCE
        ].includes(this.props.value);
    }
    isSocial() {
        return [
            SpaceCategoryEnum.SOCIAL,
            SpaceCategoryEnum.DORM,
            SpaceCategoryEnum.CLUB,
            SpaceCategoryEnum.SPORTS
        ].includes(this.props.value);
    }
    toString() {
        return this.props.value;
    }
}
//# sourceMappingURL=space-category.value.js.map