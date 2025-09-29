/**
 * CampusId Value Object
 * Enforces campus isolation at the domain level
 */
import { Result } from '../value-objects';
export declare class CampusId {
    private readonly value;
    private constructor();
    static create(campusId: string): Result<CampusId>;
    static createUB(): CampusId;
    get id(): string;
    equals(other: CampusId): boolean;
    isUB(): boolean;
    toString(): string;
}
//# sourceMappingURL=campus-id.d.ts.map