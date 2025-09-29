/**
 * ProfileId Value Object
 * Represents a unique identifier for a Profile aggregate
 */

import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';

interface ProfileIdProps {
  value: string;
}

export class ProfileId extends ValueObject<ProfileIdProps> {
  get value(): string {
    return this.props.value;
  }

  get id(): string {
    return this.props.value;
  }

  private constructor(props: ProfileIdProps) {
    super(props);
  }

  public static create(id: string): Result<ProfileId> {
    if (!id || id.trim().length === 0) {
      return Result.fail<ProfileId>('ProfileId cannot be empty');
    }

    return Result.ok<ProfileId>(new ProfileId({ value: id }));
  }

  public static createFromUserId(userId: string): Result<ProfileId> {
    return ProfileId.create(`profile_${userId}`);
  }

  public toString(): string {
    return this.props.value;
  }
}