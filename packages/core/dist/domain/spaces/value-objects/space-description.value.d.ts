/**
 * SpaceDescription Value Object
 * Represents the description of a space
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
interface SpaceDescriptionProps {
    value: string;
}
export declare class SpaceDescription extends ValueObject<SpaceDescriptionProps> {
    private static readonly MAX_LENGTH;
    get value(): string;
    private constructor();
    static create(description: string): Result<SpaceDescription>;
    static createEmpty(): Result<SpaceDescription>;
    toString(): string;
}
export {};
//# sourceMappingURL=space-description.value.d.ts.map