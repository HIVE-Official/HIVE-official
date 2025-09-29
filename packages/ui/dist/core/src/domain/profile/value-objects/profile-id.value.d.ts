/**
 * ProfileId Value Object
 * Represents a unique identifier for a Profile aggregate
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
interface ProfileIdProps {
    value: string;
}
export declare class ProfileId extends ValueObject<ProfileIdProps> {
    get value(): string;
    get id(): string;
    private constructor();
    static create(id: string): Result<ProfileId>;
    static createFromUserId(userId: string): Result<ProfileId>;
    toString(): string;
}
export {};
//# sourceMappingURL=profile-id.value.d.ts.map