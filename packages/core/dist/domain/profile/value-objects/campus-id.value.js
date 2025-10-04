"use strict";
/**
 * CampusId Value Object
 * Represents a unique identifier for a campus/university
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampusId = void 0;
const Result_1 = require("../../shared/base/Result");
const ValueObject_base_1 = require("../../shared/base/ValueObject.base");
class CampusId extends ValueObject_base_1.ValueObject {
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
            return Result_1.Result.fail('CampusId cannot be empty');
        }
        // For v1, only UB Buffalo is supported
        if (id !== CampusId.UB_BUFFALO) {
            return Result_1.Result.fail('Only ub-buffalo campus is supported in v1');
        }
        return Result_1.Result.ok(new CampusId({ value: id }));
    }
    static createUBBuffalo() {
        return Result_1.Result.ok(new CampusId({ value: CampusId.UB_BUFFALO }));
    }
    toString() {
        return this.props.value;
    }
}
exports.CampusId = CampusId;
// UB Buffalo is the only campus for v1
CampusId.UB_BUFFALO = 'ub-buffalo';
//# sourceMappingURL=campus-id.value.js.map