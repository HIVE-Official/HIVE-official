/**
 * SpaceId Value Object
 * Represents a unique identifier for a Space aggregate
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export class SpaceId extends ValueObject {
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
            return Result.fail('SpaceId cannot be empty');
        }
        return Result.ok(new SpaceId({ value: id }));
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
//# sourceMappingURL=space-id.value.js.map