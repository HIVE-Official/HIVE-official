// Bounded Context Owner: Identity & Access Management Guild
import type { ProfileAggregate, ProfileProps } from "../aggregates/profile.aggregate";

export interface ProfileRepository {
  findByEmail(email: string): Promise<ProfileAggregate | null>;
  findById(profileId: string): Promise<ProfileAggregate | null>;
  findByHandle(handle: string): Promise<ProfileAggregate | null>;
  save(profile: ProfileAggregate): Promise<void>;
  toPersistence(profile: ProfileAggregate): ProfileProps;
  fromPersistence(props: ProfileProps): ProfileAggregate;
}
