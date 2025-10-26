// Bounded Context Owner: Identity & Access Management Guild
import {
  ProfileAggregate,
  type ProfileProps
} from "../../domain/profile/aggregates/profile.aggregate";
import type { ProfileRepository } from "../../domain/profile/repositories/profile.repository";

const cloneProfileProps = (props: ProfileProps): ProfileProps => ({
  ...props,
  personalInfo: props.personalInfo ? { ...props.personalInfo } : undefined,
  academicInfo: props.academicInfo ? { ...props.academicInfo } : undefined,
  socialInfo: props.socialInfo ? { ...props.socialInfo } : undefined,
  affiliation: props.affiliation ? { ...props.affiliation } : undefined,
  interests: [...props.interests],
  clubs: [...props.clubs],
  residentialSelection: props.residentialSelection
    ? { ...props.residentialSelection }
    : undefined,
  leadership: props.leadership
    ? {
        isLeader: props.leadership.isLeader,
        spaces: props.leadership.spaces.map((space) => ({ ...space })),
        classCodes: [...props.leadership.classCodes]
      }
    : undefined,
  onboardingCompletedAt: props.onboardingCompletedAt
    ? new Date(props.onboardingCompletedAt.getTime())
    : undefined,
  consentGrantedAt: props.consentGrantedAt
    ? new Date(props.consentGrantedAt.getTime())
    : undefined,
  email: props.email,
  profileId: props.profileId
});

export class InMemoryProfileRepository implements ProfileRepository {
  private readonly byId = new Map<string, ProfileProps>();
  private readonly byEmail = new Map<string, string>();
  private readonly byHandle = new Map<string, string>();

  async findByEmail(email: string): Promise<ProfileAggregate | null> {
    const profileId = this.byEmail.get(email.toLowerCase());
    if (!profileId) {
      return null;
    }
    return this.findById(profileId);
  }

  async findById(profileId: string): Promise<ProfileAggregate | null> {
    const stored = this.byId.get(profileId);
    if (!stored) {
      return null;
    }
    return ProfileAggregate.fromPersistence(cloneProfileProps(stored));
  }

  async findByHandle(handle: string): Promise<ProfileAggregate | null> {
    const profileId = this.byHandle.get(handle.toLowerCase());
    if (!profileId) {
      return null;
    }
    return this.findById(profileId);
  }

  async save(profile: ProfileAggregate): Promise<void> {
    const props = this.toPersistence(profile);
    const previous = this.byId.get(props.profileId.value);
    this.byId.set(props.profileId.value, cloneProfileProps(props));
    this.byEmail.set(props.email.value, props.profileId.value);
    if (previous?.handle?.value && previous.handle.value !== props.handle?.value) {
      this.byHandle.delete(previous.handle.value);
    }
    if (props.handle?.value) {
      this.byHandle.set(props.handle.value, props.profileId.value);
    }
  }

  toPersistence(profile: ProfileAggregate): ProfileProps {
    return profile.getProps();
  }

  fromPersistence(props: ProfileProps): ProfileAggregate {
    return ProfileAggregate.fromPersistence(cloneProfileProps(props));
  }
}
