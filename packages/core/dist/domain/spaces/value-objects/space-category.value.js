"use strict";
/**
 * SpaceCategory Value Object
 * Represents the category/type of a space
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceCategory = exports.SpaceCategoryEnum = void 0;
const Result_1 = require("../../shared/base/Result");
const ValueObject_base_1 = require("../../shared/base/ValueObject.base");
var SpaceCategoryEnum;
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
})(SpaceCategoryEnum || (exports.SpaceCategoryEnum = SpaceCategoryEnum = {}));
class SpaceCategory extends ValueObject_base_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(category) {
        if (!Object.values(SpaceCategoryEnum).includes(category)) {
            return Result_1.Result.fail(`Invalid space category: ${category}`);
        }
        return Result_1.Result.ok(new SpaceCategory({ value: category }));
    }
    static createGeneral() {
        return Result_1.Result.ok(new SpaceCategory({ value: SpaceCategoryEnum.GENERAL }));
    }
    static createStudyGroup() {
        return Result_1.Result.ok(new SpaceCategory({ value: SpaceCategoryEnum.STUDY_GROUP }));
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
exports.SpaceCategory = SpaceCategory;
//# sourceMappingURL=space-category.value.js.map