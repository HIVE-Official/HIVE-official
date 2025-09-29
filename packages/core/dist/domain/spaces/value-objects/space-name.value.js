"use strict";
/**
 * SpaceName Value Object
 * Represents the name of a space
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceName = void 0;
const Result_1 = require("../../shared/base/Result");
const ValueObject_base_1 = require("../../shared/base/ValueObject.base");
class SpaceName extends ValueObject_base_1.ValueObject {
    get value() {
        return this.props.value;
    }
    get name() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(name) {
        const trimmed = name.trim();
        if (trimmed.length < SpaceName.MIN_LENGTH) {
            return Result_1.Result.fail(`Space name must be at least ${SpaceName.MIN_LENGTH} characters`);
        }
        if (trimmed.length > SpaceName.MAX_LENGTH) {
            return Result_1.Result.fail(`Space name must be no more than ${SpaceName.MAX_LENGTH} characters`);
        }
        // Basic profanity check could go here
        return Result_1.Result.ok(new SpaceName({ value: trimmed }));
    }
    toString() {
        return this.props.value;
    }
}
exports.SpaceName = SpaceName;
SpaceName.MIN_LENGTH = 3;
SpaceName.MAX_LENGTH = 50;
//# sourceMappingURL=space-name.value.js.map