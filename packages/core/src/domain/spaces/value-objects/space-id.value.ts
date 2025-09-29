/**
 * SpaceId Value Object
 * Represents a unique identifier for a Space aggregate
 */

import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';

interface SpaceIdProps {
  value: string;
}

export class SpaceId extends ValueObject<SpaceIdProps> {
  get value(): string {
    return this.props.value;
  }

  get id(): string {
    return this.props.value;
  }

  private constructor(props: SpaceIdProps) {
    super(props);
  }

  public static create(id: string): Result<SpaceId> {
    if (!id || id.trim().length === 0) {
      return Result.fail<SpaceId>('SpaceId cannot be empty');
    }

    return Result.ok<SpaceId>(new SpaceId({ value: id }));
  }

  public static generate(): Result<SpaceId> {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return SpaceId.create(`space_${timestamp}_${random}`);
  }

  public toString(): string {
    return this.props.value;
  }
}