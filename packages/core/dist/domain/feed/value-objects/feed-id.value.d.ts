/**
 * FeedId Value Object
 * Represents a unique identifier for a Feed
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
interface FeedIdProps {
    value: string;
}
export declare class FeedId extends ValueObject<FeedIdProps> {
    get value(): string;
    get id(): string;
    private constructor();
    static create(id: string): Result<FeedId>;
    static createForUser(userId: string, campusId: string): Result<FeedId>;
    toString(): string;
}
export {};
//# sourceMappingURL=feed-id.value.d.ts.map