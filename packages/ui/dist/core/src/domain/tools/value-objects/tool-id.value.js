/**
 * ToolId Value Object
 * Unique identifier for tools
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export class ToolId extends ValueObject {
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
                return Result.fail('ToolId cannot be empty');
            }
            return Result.ok(new ToolId({ value: trimmed }));
        }
        // Auto-generate if not provided
        const toolId = `tool_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return Result.ok(new ToolId({ value: toolId }));
    }
    toString() {
        return this.props.value;
    }
}
//# sourceMappingURL=tool-id.value.js.map