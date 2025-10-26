// Bounded Context Owner: Identity & Access Management Guild
export interface ProfileOnboardedEvent {
  readonly type: "profile.onboarded";
  readonly profileId: string;
  readonly occurredAt: Date;
  readonly interests: readonly string[];
  readonly majors: readonly string[];
  readonly residentialSpaceId?: string;
  readonly handle: string;
  readonly defaultSpaces: readonly SpaceAssignment[];
  readonly cohortSpaces: readonly SpaceAssignment[];
  readonly leaderSpaceIds: readonly string[];
  readonly classCodes: readonly string[];
  readonly isLeader: boolean;
}

export type ProfileDomainEvent = ProfileOnboardedEvent;

export interface SpaceAssignment {
  readonly id: string;
  readonly name: string;
}
