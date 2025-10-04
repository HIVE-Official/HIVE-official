"use strict";
/**
 * ToolId Value Object
 * Unique identifier for tools
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolId = void 0;
const Result_1 = require("../../shared/base/Result");
const ValueObject_base_1 = require("../../shared/base/ValueObject.base");
class ToolId extends ValueObject_base_1.ValueObject {
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
        // If id is explicitly provided, validate it
        if (id !== undefined) {
            const trimmed = id.trim();
            if (trimmed.length === 0) {
                return Result_1.Result.fail('ToolId cannot be empty');
            }
            return Result_1.Result.ok(new ToolId({ value: trimmed }));
        }
        // Auto-generate if not provided
        const toolId = `tool_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return Result_1.Result.ok(new ToolId({ value: toolId }));
    }
    toString() {
        return this.props.value;
    }
}
exports.ToolId = ToolId;
//# sourceMappingURL=tool-id.value.js.map