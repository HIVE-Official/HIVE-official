"use strict";
/**
 * SpaceId Value Object
 * Represents a unique identifier for a Space aggregate
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceId = void 0;
const Result_1 = require("../../shared/base/Result");
const ValueObject_base_1 = require("../../shared/base/ValueObject.base");
class SpaceId extends ValueObject_base_1.ValueObject {
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
            return Result_1.Result.fail('SpaceId cannot be empty');
        }
        return Result_1.Result.ok(new SpaceId({ value: id }));
    }
    static generate() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return SpaceId.create(`space_${timestamp}_${random}`);
    }
    toString() {
        return this.props.value;
    }
}
exports.SpaceId = SpaceId;
//# sourceMappingURL=space-id.value.js.map