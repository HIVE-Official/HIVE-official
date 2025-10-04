"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handle = void 0;
const ValueObject_base_1 = require("../../shared/base/ValueObject.base");
const Result_1 = require("../../shared/base/Result");
class Handle extends ValueObject_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(handle) {
        if (!handle) {
            return Result_1.Result.fail('Handle is required');
        }
        const trimmedHandle = handle.trim().toLowerCase();
        if (trimmedHandle.length < this.MIN_LENGTH) {
            return Result_1.Result.fail(`Handle must be at least ${this.MIN_LENGTH} characters`);
        }
        if (trimmedHandle.length > this.MAX_LENGTH) {
            return Result_1.Result.fail(`Handle must be at most ${this.MAX_LENGTH} characters`);
        }
        if (!this.VALID_PATTERN.test(trimmedHandle)) {
            return Result_1.Result.fail('Handle can only contain letters, numbers, and underscores');
        }
        return Result_1.Result.ok(new Handle({ value: trimmedHandle }));
    }
    get value() {
        return this.props.value;
    }
    toString() {
        return this.props.value;
    }
}
exports.Handle = Handle;
Handle.MIN_LENGTH = 3;
Handle.MAX_LENGTH = 30;
Handle.VALID_PATTERN = /^[a-zA-Z0-9_]+$/;
//# sourceMappingURL=handle.value.js.map