"use strict";
/**
 * FeedId Value Object
 * Represents a unique identifier for a Feed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedId = void 0;
const Result_1 = require("../../shared/base/Result");
const ValueObject_base_1 = require("../../shared/base/ValueObject.base");
class FeedId extends ValueObject_base_1.ValueObject {
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
            return Result_1.Result.fail('FeedId cannot be empty');
        }
        return Result_1.Result.ok(new FeedId({ value: id }));
    }
    static createForUser(userId, campusId) {
        return FeedId.create(`feed_${userId}_${campusId}`);
    }
    toString() {
        return this.props.value;
    }
}
exports.FeedId = FeedId;
//# sourceMappingURL=feed-id.value.js.map