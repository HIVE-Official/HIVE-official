import { ValueObject } from '../../shared/base/ValueObject.base';
import { Result } from '../../shared/base/Result';

interface UBEmailProps {
  value: string;
}

export class UBEmail extends ValueObject<UBEmailProps> {
  private constructor(props: UBEmailProps) {
    super(props);
  }

  static create(email: string): Result<UBEmail> {
    if (!email) {
      return Result.fail<UBEmail>('Email is required');
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!this.isValidEmail(trimmedEmail)) {
      return Result.fail<UBEmail>('Invalid email format');
    }

    if (!this.isUBEmail(trimmedEmail)) {
      return Result.fail<UBEmail>('Only @buffalo.edu emails are allowed');
    }

    return Result.ok<UBEmail>(new UBEmail({ value: trimmedEmail }));
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static isUBEmail(email: string): boolean {
    return email.endsWith('@buffalo.edu');
  }

  get value(): string {
    return this.props.value;
  }

  toString(): string {
    return this.props.value;
  }
}