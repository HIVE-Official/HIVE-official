/**
 * ProfileHandle Value Object
 * Represents a unique handle/username for a profile
 */

import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';

interface ProfileHandleProps {
  value: string;
}

export class ProfileHandle extends ValueObject<ProfileHandleProps> {
  private static readonly MIN_LENGTH = 3;
  private static readonly MAX_LENGTH = 20;
  private static readonly VALID_PATTERN = /^[a-z0-9_]+$/;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: ProfileHandleProps) {
    super(props);
  }

  public static create(handle: string): Result<ProfileHandle> {
    const normalized = handle.toLowerCase().trim();

    if (normalized.length < ProfileHandle.MIN_LENGTH) {
      return Result.fail<ProfileHandle>(
        `Handle must be at least ${ProfileHandle.MIN_LENGTH} characters`
      );
    }

    if (normalized.length > ProfileHandle.MAX_LENGTH) {
      return Result.fail<ProfileHandle>(
        `Handle must be no more than ${ProfileHandle.MAX_LENGTH} characters`
      );
    }

    if (!ProfileHandle.VALID_PATTERN.test(normalized)) {
      return Result.fail<ProfileHandle>(
        'Handle can only contain lowercase letters, numbers, and underscores'
      );
    }

    return Result.ok<ProfileHandle>(new ProfileHandle({ value: normalized }));
  }

  public toString(): string {
    return this.props.value;
  }
}