/**
 * SpaceName Value Object
 * Represents the name of a space
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
interface SpaceNameProps {
    value: string;
}
export declare class SpaceName extends ValueObject<SpaceNameProps> {
    private static readonly MIN_LENGTH;
    private static readonly MAX_LENGTH;
    get value(): string;
    get name(): string;
    private constructor();
    static create(name: string): Result<SpaceName>;
    toString(): string;
}
export {};
//# sourceMappingURL=space-name.value.d.ts.map