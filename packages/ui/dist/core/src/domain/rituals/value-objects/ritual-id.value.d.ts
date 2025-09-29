/**
 * RitualId Value Object
 * Represents a unique identifier for a Ritual aggregate
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
interface RitualIdProps {
    value: string;
}
export declare class RitualId extends ValueObject<RitualIdProps> {
    get value(): string;
    get id(): string;
    private constructor();
    static create(id: string): Result<RitualId>;
    static generate(): Result<RitualId>;
    toString(): string;
}
export {};
//# sourceMappingURL=ritual-id.value.d.ts.map