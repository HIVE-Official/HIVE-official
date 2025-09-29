/**
 * UserType Value Object
 * Represents the type of user in the system
 */

import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';

export enum UserTypeEnum {
  STUDENT = 'student',
  ALUMNI = 'alumni',
  FACULTY = 'faculty',
  STAFF = 'staff',
  PROSPECTIVE = 'prospective'
}

interface UserTypeProps {
  value: UserTypeEnum;
}

export class UserType extends ValueObject<UserTypeProps> {
  public static readonly STUDENT = UserTypeEnum.STUDENT;
  public static readonly ALUMNI = UserTypeEnum.ALUMNI;
  public static readonly FACULTY = UserTypeEnum.FACULTY;
  public static readonly STAFF = UserTypeEnum.STAFF;
  public static readonly PROSPECTIVE = UserTypeEnum.PROSPECTIVE;

  get value(): UserTypeEnum {
    return this.props.value;
  }

  private constructor(props: UserTypeProps) {
    super(props);
  }

  public static create(type: string): Result<UserType> {
    if (!Object.values(UserTypeEnum).includes(type as UserTypeEnum)) {
      return Result.fail<UserType>(`Invalid user type: ${type}`);
    }

    return Result.ok<UserType>(new UserType({ value: type as UserTypeEnum }));
  }

  public static createStudent(): Result<UserType> {
    return Result.ok<UserType>(new UserType({ value: UserTypeEnum.STUDENT }));
  }

  public isStudent(): boolean {
    return this.props.value === UserTypeEnum.STUDENT;
  }

  public isAlumni(): boolean {
    return this.props.value === UserTypeEnum.ALUMNI;
  }

  public toString(): string {
    return this.props.value;
  }
}