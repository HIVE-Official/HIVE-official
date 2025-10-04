"use strict";
/**
 * ProfileHandle Value Object
 * Represents a unique handle/username for a profile
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileHandle = void 0;
const Result_1 = require("../../shared/base/Result");
const ValueObject_base_1 = require("../../shared/base/ValueObject.base");
class ProfileHandle extends ValueObject_base_1.ValueObject {
    get value() {
        return this.props.value;
    }
    get handle() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(handle) {
        const trimmed = handle.trim();
        if (trimmed.length < ProfileHandle.MIN_LENGTH) {
            return Result_1.Result.fail(`Handle must be at least ${ProfileHandle.MIN_LENGTH} characters`);
        }
        if (trimmed.length > ProfileHandle.MAX_LENGTH) {
            return Result_1.Result.fail(`Handle must be no more than ${ProfileHandle.MAX_LENGTH} characters`);
        }
        if (!ProfileHandle.VALID_PATTERN.test(trimmed)) {
            return Result_1.Result.fail('Handle can only contain lowercase letters, numbers, and underscores');
        }
        return Result_1.Result.ok(new ProfileHandle({ value: trimmed }));
    }
    toString() {
        return this.props.value;
    }
}
exports.ProfileHandle = ProfileHandle;
ProfileHandle.MIN_LENGTH = 3;
ProfileHandle.MAX_LENGTH = 20;
ProfileHandle.VALID_PATTERN = /^[a-z0-9_]+$/;
//# sourceMappingURL=profile-handle.value.js.map