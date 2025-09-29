"use strict";
/**
 * FeedItemId Value Object
 * Represents a unique identifier for a FeedItem
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedItemId = void 0;
const Result_1 = require("../../shared/base/Result");
const ValueObject_base_1 = require("../../shared/base/ValueObject.base");
class FeedItemId extends ValueObject_base_1.ValueObject {
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
            return Result_1.Result.fail('FeedItemId cannot be empty');
        }
        return Result_1.Result.ok(new FeedItemId({ value: id }));
    }
    static generate() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return FeedItemId.create(`item_${timestamp}_${random}`);
    }
    toString() {
        return this.props.value;
    }
}
exports.FeedItemId = FeedItemId;
//# sourceMappingURL=feed-item-id.value.js.map