"use strict";
/**
 * ProfileId Value Object
 * Represents a unique identifier for a Profile aggregate
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileId = void 0;
const Result_1 = require("../../shared/base/Result");
const ValueObject_base_1 = require("../../shared/base/ValueObject.base");
class ProfileId extends ValueObject_base_1.ValueObject {
    get value() {
        return this.props.value;
    }
    get id() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(id) {
        if (!id || id.trim().length === 0) {
            return Result_1.Result.fail('ProfileId cannot be empty');
        }
        return Result_1.Result.ok(new ProfileId({ value: id }));
    }
    static createFromUserId(userId) {
        return ProfileId.create(`profile_${userId}`);
    }
    toString() {
        return this.props.value;
    }
}
exports.ProfileId = ProfileId;
//# sourceMappingURL=profile-id.value.js.map