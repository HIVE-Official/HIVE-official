import { ValueObject } from '../../shared/base/ValueObject.base';
import { Result } from '../../shared/base/Result';
export class Handle extends ValueObject {
    constructor(props) {
        super(props);
    }
    static create(handle) {
        if (!handle) {
            return Result.fail('Handle is required');
        }
        const trimmedHandle = handle.trim().toLowerCase();
        if (trimmedHandle.length < this.MIN_LENGTH) {
            return Result.fail(`Handle must be at least ${this.MIN_LENGTH} characters`);
        }
        if (trimmedHandle.length > this.MAX_LENGTH) {
            return Result.fail(`Handle must be at most ${this.MAX_LENGTH} characters`);
        }
        if (!this.VALID_PATTERN.test(trimmedHandle)) {
            return Result.fail('Handle can only contain letters, numbers, and underscores');
        }
        return Result.ok(new Handle({ value: trimmedHandle }));
    }
    get value() {
        return this.props.value;
    }
    toString() {
        return this.props.value;
    }
}
Handle.MIN_LENGTH = 3;
Handle.MAX_LENGTH = 30;
Handle.VALID_PATTERN = /^[a-zA-Z0-9_]+$/;
//# sourceMappingURL=handle.value.js.map