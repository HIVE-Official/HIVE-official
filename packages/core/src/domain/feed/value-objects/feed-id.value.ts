/**
 * FeedId Value Object
 * Represents a unique identifier for a Feed
 */

import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';

interface FeedIdProps {
  value: string;
}

export class FeedId extends ValueObject<FeedIdProps> {
  get value(): string {
    return this.props.value;
  }

  get id(): string {
    return this.props.value;
  }

  private constructor(props: FeedIdProps) {
    super(props);
  }

  public static create(id: string): Result<FeedId> {
    if (!id || id.trim().length === 0) {
      return Result.fail<FeedId>('FeedId cannot be empty');
    }

    return Result.ok<FeedId>(new FeedId({ value: id }));
  }

  public static createForUser(userId: string, campusId: string): Result<FeedId> {
    return FeedId.create(`feed_${userId}_${campusId}`);
  }

  public toString(): string {
    return this.props.value;
  }
}