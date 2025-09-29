/**
 * CampusId Value Object
 * Represents a unique identifier for a campus/university
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export class CampusId extends ValueObject {
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
            return Result.fail('CampusId cannot be empty');
        }
        // For v1, only UB Buffalo is supported
        if (id !== CampusId.UB_BUFFALO) {
            return Result.fail('Only UB Buffalo campus is supported in v1');
        }
        return Result.ok(new CampusId({ value: id }));
    }
    static createUBBuffalo() {
        return Result.ok(new CampusId({ value: CampusId.UB_BUFFALO }));
    }
    toString() {
        return this.props.value;
    }
}
// UB Buffalo is the only campus for v1
CampusId.UB_BUFFALO = 'ub-buffalo';
//# sourceMappingURL=campus-id.value.js.map