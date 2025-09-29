/**
 * FeedItemId Value Object
 * Represents a unique identifier for a FeedItem
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
interface FeedItemIdProps {
    value: string;
}
export declare class FeedItemId extends ValueObject<FeedItemIdProps> {
    get value(): string;
    get id(): string;
    private constructor();
    static create(id: string): Result<FeedItemId>;
    static generate(): Result<FeedItemId>;
    toString(): string;
}
export {};
//# sourceMappingURL=feed-item-id.value.d.ts.map