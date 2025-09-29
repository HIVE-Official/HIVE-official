/**
 * FeedId Value Object
 * Represents a unique identifier for a Feed
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export class FeedId extends ValueObject {
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
            return Result.fail('FeedId cannot be empty');
        }
        return Result.ok(new FeedId({ value: id }));
    }
    static createForUser(userId, campusId) {
        return FeedId.create(`feed_${userId}_${campusId}`);
    }
    toString() {
        return this.props.value;
    }
}
//# sourceMappingURL=feed-id.value.js.map