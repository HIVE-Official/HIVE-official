import { ValueObject } from '../../shared/base/ValueObject.base';
import { Result } from '../../shared/base/Result';

interface HandleProps {
  value: string;
}

export class Handle extends ValueObject<HandleProps> {
  private static readonly MIN_LENGTH = 3;
  private static readonly MAX_LENGTH = 30;
  private static readonly VALID_PATTERN = /^[a-zA-Z0-9_]+$/;

  private constructor(props: HandleProps) {
    super(props);
  }

  static create(handle: string): Result<Handle> {
    if (!handle) {
      return Result.fail<Handle>('Handle is required');
    }

    const trimmedHandle = handle.trim().toLowerCase();

    if (trimmedHandle.length < this.MIN_LENGTH) {
      return Result.fail<Handle>(`Handle must be at least ${this.MIN_LENGTH} characters`);
    }

    if (trimmedHandle.length > this.MAX_LENGTH) {
      return Result.fail<Handle>(`Handle must be at most ${this.MAX_LENGTH} characters`);
    }

    if (!this.VALID_PATTERN.test(trimmedHandle)) {
      return Result.fail<Handle>('Handle can only contain letters, numbers, and underscores');
    }

    return Result.ok<Handle>(new Handle({ value: trimmedHandle }));
  }

  get value(): string {
    return this.props.value;
  }

  toString(): string {
    return this.props.value;
  }
}