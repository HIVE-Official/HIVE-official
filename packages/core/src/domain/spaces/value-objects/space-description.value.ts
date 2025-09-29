/**
 * SpaceDescription Value Object
 * Represents the description of a space
 */

import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';

interface SpaceDescriptionProps {
  value: string;
}

export class SpaceDescription extends ValueObject<SpaceDescriptionProps> {
  private static readonly MAX_LENGTH = 500;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: SpaceDescriptionProps) {
    super(props);
  }

  public static create(description: string): Result<SpaceDescription> {
    const trimmed = description.trim();

    if (trimmed.length > SpaceDescription.MAX_LENGTH) {
      return Result.fail<SpaceDescription>(
        `Space description must be no more than ${SpaceDescription.MAX_LENGTH} characters`
      );
    }

    return Result.ok<SpaceDescription>(new SpaceDescription({ value: trimmed }));
  }

  public static createEmpty(): Result<SpaceDescription> {
    return Result.ok<SpaceDescription>(new SpaceDescription({ value: '' }));
  }

  public toString(): string {
    return this.props.value;
  }
}