/**
 * RitualId Value Object
 * Represents a unique identifier for a Ritual aggregate
 */

import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';

interface RitualIdProps {
  value: string;
}

export class RitualId extends ValueObject<RitualIdProps> {
  get value(): string {
    return this.props.value;
  }

  get id(): string {
    return this.props.value;
  }

  private constructor(props: RitualIdProps) {
    super(props);
  }

  public static create(id: string): Result<RitualId> {
    if (!id || id.trim().length === 0) {
      return Result.fail<RitualId>('RitualId cannot be empty');
    }

    return Result.ok<RitualId>(new RitualId({ value: id }));
  }

  public static generate(): Result<RitualId> {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return RitualId.create(`ritual_${timestamp}_${random}`);
  }

  public toString(): string {
    return this.props.value;
  }
}