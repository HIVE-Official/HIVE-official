"use strict";
/**
 * SpaceDescription Value Object
 * Represents the description of a space
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceDescription = void 0;
const Result_1 = require("../../shared/base/Result");
const ValueObject_base_1 = require("../../shared/base/ValueObject.base");
class SpaceDescription extends ValueObject_base_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(description) {
        const trimmed = description.trim();
        if (trimmed.length > SpaceDescription.MAX_LENGTH) {
            return Result_1.Result.fail(`Space description must be no more than ${SpaceDescription.MAX_LENGTH} characters`);
        }
        return Result_1.Result.ok(new SpaceDescription({ value: trimmed }));
    }
    static createEmpty() {
        return Result_1.Result.ok(new SpaceDescription({ value: '' }));
    }
    toString() {
        return this.props.value;
    }
}
exports.SpaceDescription = SpaceDescription;
SpaceDescription.MAX_LENGTH = 500;
//# sourceMappingURL=space-description.value.js.map