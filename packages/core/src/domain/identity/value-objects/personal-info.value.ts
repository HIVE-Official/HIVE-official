import { ValueObject } from '../../shared/base/ValueObject.base';
import { Result } from '../../shared/base/Result';

interface PersonalInfoProps {
  firstName: string;
  lastName: string;
  bio: string;
  major: string;
  graduationYear: number | null;
  dorm: string;
}

export class PersonalInfo extends ValueObject<PersonalInfoProps> {
  private static readonly MAX_BIO_LENGTH = 500;
  private static readonly MIN_GRAD_YEAR = new Date().getFullYear();
  private static readonly MAX_GRAD_YEAR = new Date().getFullYear() + 6;

  private constructor(props: PersonalInfoProps) {
    super(props);
  }

  static create(props: {
    firstName: string;
    lastName: string;
    bio: string;
    major: string;
    graduationYear: number | null;
    dorm: string;
  }): Result<PersonalInfo> {
    const { firstName, lastName, bio, major, graduationYear, dorm } = props;

    if (bio && bio.length > this.MAX_BIO_LENGTH) {
      return Result.fail<PersonalInfo>(`Bio must be at most ${this.MAX_BIO_LENGTH} characters`);
    }

    if (graduationYear !== null) {
      if (graduationYear < this.MIN_GRAD_YEAR || graduationYear > this.MAX_GRAD_YEAR) {
        return Result.fail<PersonalInfo>('Invalid graduation year');
      }
    }

    return Result.ok<PersonalInfo>(
      new PersonalInfo({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        bio: bio.trim(),
        major: major.trim(),
        graduationYear,
        dorm: dorm.trim()
      })
    );
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get fullName(): string {
    return `${this.props.firstName} ${this.props.lastName}`.trim();
  }

  get bio(): string {
    return this.props.bio;
  }

  get major(): string {
    return this.props.major;
  }

  get graduationYear(): number | null {
    return this.props.graduationYear;
  }

  get dorm(): string {
    return this.props.dorm;
  }

  isComplete(): boolean {
    return !!(
      this.props.firstName &&
      this.props.lastName &&
      this.props.major &&
      this.props.graduationYear
    );
  }
}