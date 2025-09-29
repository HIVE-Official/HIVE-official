/**
 * CampusId Value Object
 * Represents a unique identifier for a campus/university
 */

import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';

interface CampusIdProps {
  value: string;
}

export class CampusId extends ValueObject<CampusIdProps> {
  // UB Buffalo is the only campus for v1
  public static readonly UB_BUFFALO = 'ub-buffalo';

  get value(): string {
    return this.props.value;
  }

  get id(): string {
    return this.props.value;
  }

  private constructor(props: CampusIdProps) {
    super(props);
  }

  public static create(id: string): Result<CampusId> {
    if (!id || id.trim().length === 0) {
      return Result.fail<CampusId>('CampusId cannot be empty');
    }

    // For v1, only UB Buffalo is supported
    if (id !== CampusId.UB_BUFFALO) {
      return Result.fail<CampusId>('Only UB Buffalo campus is supported in v1');
    }

    return Result.ok<CampusId>(new CampusId({ value: id }));
  }

  public static createUBBuffalo(): Result<CampusId> {
    return Result.ok<CampusId>(new CampusId({ value: CampusId.UB_BUFFALO }));
  }

  public toString(): string {
    return this.props.value;
  }
}