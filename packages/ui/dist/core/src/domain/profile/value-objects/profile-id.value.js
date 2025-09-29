/**
 * ProfileId Value Object
 * Represents a unique identifier for a Profile aggregate
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export class ProfileId extends ValueObject {
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
            return Result.fail('ProfileId cannot be empty');
        }
        return Result.ok(new ProfileId({ value: id }));
    }
    static createFromUserId(userId) {
        return ProfileId.create(`profile_${userId}`);
    }
    toString() {
        return this.props.value;
    }
}
//# sourceMappingURL=profile-id.value.js.map