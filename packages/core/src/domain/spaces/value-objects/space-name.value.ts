/**
 * SpaceName Value Object
 * Represents the name of a space
 */

import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';

interface SpaceNameProps {
  value: string;
}

export class SpaceName extends ValueObject<SpaceNameProps> {
  private static readonly MIN_LENGTH = 3;
  private static readonly MAX_LENGTH = 50;

  get value(): string {
    return this.props.value;
  }

  get name(): string {
    return this.props.value;
  }

  private constructor(props: SpaceNameProps) {
    super(props);
  }

  public static create(name: string): Result<SpaceName> {
    const trimmed = name.trim();

    if (trimmed.length < SpaceName.MIN_LENGTH) {
      return Result.fail<SpaceName>(
        `Space name must be at least ${SpaceName.MIN_LENGTH} characters`
      );
    }

    if (trimmed.length > SpaceName.MAX_LENGTH) {
      return Result.fail<SpaceName>(
        `Space name must be no more than ${SpaceName.MAX_LENGTH} characters`
      );
    }

    // Basic profanity check could go here

    return Result.ok<SpaceName>(new SpaceName({ value: trimmed }));
  }

  public toString(): string {
    return this.props.value;
  }
}