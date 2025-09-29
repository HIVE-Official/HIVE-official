import { AggregateRoot } from '../../shared/base/AggregateRoot.base';
import { Result } from '../../shared/base/Result';
import { UBEmail } from '../value-objects/ub-email.value';
import { Handle } from '../value-objects/handle.value';
import { PersonalInfo } from '../value-objects/personal-info.value';
import { ProfileCreatedEvent } from '../events/profile-created.event';
import { ProfileOnboardedEvent } from '../events/profile-onboarded.event';
// Temporary ProfileId import
import { ProfileId } from '../../../application/shared/temporary-types';

export interface ProfileProps {
  email: UBEmail;
  handle: Handle;
  personalInfo: PersonalInfo;
  interests: string[];
  connections: string[];
  isOnboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Profile extends AggregateRoot<ProfileProps> {
  private constructor(props: ProfileProps, id: string) {
    super(props, id);
  }

  static create(props: {
    id: ProfileId;
    email: UBEmail;
    handle: Handle;
    personalInfo: {
      firstName: string;
      lastName: string;
      bio?: string;
      major?: string;
      graduationYear?: number;
      dorm?: string;
    };
  }): Result<Profile> {
    const personalInfoResult = PersonalInfo.create({
      firstName: props.personalInfo.firstName,
      lastName: props.personalInfo.lastName,
      bio: props.personalInfo.bio || '',
      major: props.personalInfo.major || '',
      graduationYear: props.personalInfo.graduationYear || null,
      dorm: props.personalInfo.dorm || ''
    });

    if (personalInfoResult.isFailure) {
      return Result.fail<Profile>(personalInfoResult.error!);
    }

    const profile = new Profile(
      {
        email: props.email,
        handle: props.handle,
        personalInfo: personalInfoResult.getValue(),
        interests: [],
        connections: [],
        isOnboarded: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      props.id.id
    );

    profile.addDomainEvent(new ProfileCreatedEvent(props.id.id, props.email.value, props.handle.value));

    return Result.ok<Profile>(profile);
  }

  updatePersonalInfo(personalInfo: PersonalInfo): Result<void> {
    this.props.personalInfo = personalInfo;
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  completeOnboarding(
    personalInfo: PersonalInfo,
    interests: string[]
  ): Result<void> {
    if (this.props.isOnboarded) {
      return Result.fail<void>('Profile is already onboarded');
    }

    this.props.personalInfo = personalInfo;
    this.props.interests = interests;
    this.props.isOnboarded = true;
    this.props.updatedAt = new Date();

    this.addDomainEvent(new ProfileOnboardedEvent(this.id));

    return Result.ok<void>();
  }

  addConnection(connectionId: string): Result<void> {
    if (this.props.connections.includes(connectionId)) {
      return Result.fail<void>('Connection already exists');
    }

    this.props.connections.push(connectionId);
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  removeConnection(connectionId: string): Result<void> {
    const index = this.props.connections.indexOf(connectionId);
    if (index === -1) {
      return Result.fail<void>('Connection not found');
    }

    this.props.connections.splice(index, 1);
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  updateInterests(interests: string[]): Result<void> {
    this.props.interests = interests;
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  addInterest(interest: string): Result<void> {
    if (this.props.interests.includes(interest)) {
      return Result.fail<void>('Interest already exists');
    }
    this.props.interests.push(interest);
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  async addPhoto(photoUrl: string): Promise<Result<void>> {
    // For now, just track it in the domain (photos would be stored separately)
    // This would integrate with photo management when implemented
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  get email(): UBEmail {
    return this.props.email;
  }

  get handle(): Handle {
    return this.props.handle;
  }

  get personalInfo(): PersonalInfo {
    return this.props.personalInfo;
  }

  get interests(): string[] {
    return this.props.interests;
  }

  get connections(): string[] {
    return this.props.connections;
  }

  get isOnboarded(): boolean {
    return this.props.isOnboarded;
  }

  toData() {
    return {
      id: this.id,
      email: this.props.email.value,
      handle: this.props.handle.value,
      personalInfo: {
        firstName: this.props.personalInfo.firstName,
        lastName: this.props.personalInfo.lastName,
        bio: this.props.personalInfo.bio,
        major: this.props.personalInfo.major,
        graduationYear: this.props.personalInfo.graduationYear,
        dorm: this.props.personalInfo.dorm
      },
      interests: this.props.interests,
      connections: this.props.connections,
      photos: [], // Would be implemented when photo management is added
      isOnboarded: this.props.isOnboarded,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt
    };
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}