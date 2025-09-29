/**
 * ProfileHandle Value Object
 * Represents a unique handle/username for a profile
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export class ProfileHandle extends ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(handle) {
        const normalized = handle.toLowerCase().trim();
        if (normalized.length < ProfileHandle.MIN_LENGTH) {
            return Result.fail(`Handle must be at least ${ProfileHandle.MIN_LENGTH} characters`);
        }
        if (normalized.length > ProfileHandle.MAX_LENGTH) {
            return Result.fail(`Handle must be no more than ${ProfileHandle.MAX_LENGTH} characters`);
        }
        if (!ProfileHandle.VALID_PATTERN.test(normalized)) {
            return Result.fail('Handle can only contain lowercase letters, numbers, and underscores');
        }
        return Result.ok(new ProfileHandle({ value: normalized }));
    }
    toString() {
        return this.props.value;
    }
}
ProfileHandle.MIN_LENGTH = 3;
ProfileHandle.MAX_LENGTH = 20;
ProfileHandle.VALID_PATTERN = /^[a-z0-9_]+$/;
//# sourceMappingURL=profile-handle.value.js.map