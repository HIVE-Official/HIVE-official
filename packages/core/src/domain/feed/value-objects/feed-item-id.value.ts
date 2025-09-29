/**
 * FeedItemId Value Object
 * Represents a unique identifier for a FeedItem
 */

import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';

interface FeedItemIdProps {
  value: string;
}

export class FeedItemId extends ValueObject<FeedItemIdProps> {
  get value(): string {
    return this.props.value;
  }

  get id(): string {
    return this.props.value;
  }

  private constructor(props: FeedItemIdProps) {
    super(props);
  }

  public static create(id: string): Result<FeedItemId> {
    if (!id || id.trim().length === 0) {
      return Result.fail<FeedItemId>('FeedItemId cannot be empty');
    }

    return Result.ok<FeedItemId>(new FeedItemId({ value: id }));
  }

  public static generate(): Result<FeedItemId> {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return FeedItemId.create(`item_${timestamp}_${random}`);
  }

  public toString(): string {
    return this.props.value;
  }
}