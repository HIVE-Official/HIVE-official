/**
 * ConnectionId Value Object
 * Represents a unique identifier for a connection between profiles
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
interface ConnectionIdProps {
    value: string;
}
export declare class ConnectionId extends ValueObject<ConnectionIdProps> {
    get value(): string;
    get id(): string;
    private constructor();
    static create(id: string): Result<ConnectionId>;
    static createFromProfiles(profileId1: string, profileId2: string): Result<ConnectionId>;
    toString(): string;
}
export {};
//# sourceMappingURL=connection-id.value.d.ts.map