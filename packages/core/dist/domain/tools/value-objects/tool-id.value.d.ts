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
    get id(): string;
    private constructor();
    static create(id?: string): Result<ToolId>;
    toString(): string;
}
export {};
//# sourceMappingURL=tool-id.value.d.ts.map