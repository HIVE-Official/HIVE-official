/**
 * ToolId Value Object
 * Unique identifier for tools
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
interface ToolIdProps {
    value: string;
}
export declare class ToolId extends ValueObject<ToolIdProps> {
    get value(): string;
    private constructor();
    static create(id?: string): Result<ToolId>;
}
export {};
//# sourceMappingURL=tool-id.value.d.ts.map