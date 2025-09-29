/**
 * SpaceId Value Object
 * Represents a unique identifier for a Space aggregate
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
interface SpaceIdProps {
    value: string;
}
export declare class SpaceId extends ValueObject<SpaceIdProps> {
    get value(): string;
    get id(): string;
    private constructor();
    static create(id: string): Result<SpaceId>;
    static generate(): Result<SpaceId>;
    toString(): string;
}
export {};
//# sourceMappingURL=space-id.value.d.ts.map