/**
 * SpaceDescription Value Object
 * Represents the description of a space
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export class SpaceDescription extends ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(description) {
        const trimmed = description.trim();
        if (trimmed.length > SpaceDescription.MAX_LENGTH) {
            return Result.fail(`Space description must be no more than ${SpaceDescription.MAX_LENGTH} characters`);
        }
        return Result.ok(new SpaceDescription({ value: trimmed }));
    }
    static createEmpty() {
        return Result.ok(new SpaceDescription({ value: '' }));
    }
    toString() {
        return this.props.value;
    }
}
SpaceDescription.MAX_LENGTH = 500;
//# sourceMappingURL=space-description.value.js.map