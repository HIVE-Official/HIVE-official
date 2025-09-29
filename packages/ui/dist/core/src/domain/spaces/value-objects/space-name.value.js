/**
 * SpaceName Value Object
 * Represents the name of a space
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export class SpaceName extends ValueObject {
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
            return Result.fail(`Space name must be at least ${SpaceName.MIN_LENGTH} characters`);
        }
        if (trimmed.length > SpaceName.MAX_LENGTH) {
            return Result.fail(`Space name must be no more than ${SpaceName.MAX_LENGTH} characters`);
        }
        // Basic profanity check could go here
        return Result.ok(new SpaceName({ value: trimmed }));
    }
    toString() {
        return this.props.value;
    }
}
SpaceName.MIN_LENGTH = 3;
SpaceName.MAX_LENGTH = 50;
//# sourceMappingURL=space-name.value.js.map