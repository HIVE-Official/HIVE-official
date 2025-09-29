/**
 * CampusId Value Object
 * Represents a unique identifier for a campus/university
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
interface CampusIdProps {
    value: string;
}
export declare class CampusId extends ValueObject<CampusIdProps> {
    static readonly UB_BUFFALO = "ub-buffalo";
    get value(): string;
    get id(): string;
    private constructor();
    static create(id: string): Result<CampusId>;
    static createUBBuffalo(): Result<CampusId>;
    toString(): string;
}
export {};
//# sourceMappingURL=campus-id.value.d.ts.map