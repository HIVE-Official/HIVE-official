/**
 * ProfileHandle Value Object
 * Represents a unique handle/username for a profile
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
interface ProfileHandleProps {
    value: string;
}
export declare class ProfileHandle extends ValueObject<ProfileHandleProps> {
    private static readonly MIN_LENGTH;
    private static readonly MAX_LENGTH;
    private static readonly VALID_PATTERN;
    get value(): string;
    private constructor();
    static create(handle: string): Result<ProfileHandle>;
    toString(): string;
}
export {};
//# sourceMappingURL=profile-handle.value.d.ts.map