// Bounded Context Owner: Community Guild

export interface SpaceCreatedEvent {
  readonly type: "SpaceCreated";
  readonly payload: {
    readonly spaceId: string;
    readonly campusId: string;
    readonly leaderId: string;
  };
}

export interface SpaceMemberJoinedEvent {
  readonly type: "SpaceMemberJoined";
  readonly payload: {
    readonly spaceId: string;
    readonly profileId: string;
    readonly role: string;
  };
}

export interface SpaceMemberRemovedEvent {
  readonly type: "SpaceMemberRemoved";
  readonly payload: {
    readonly spaceId: string;
    readonly profileId: string;
  };
}

export interface SpaceMemberRoleUpdatedEvent {
  readonly type: "SpaceMemberRoleUpdated";
  readonly payload: {
    readonly spaceId: string;
    readonly profileId: string;
    readonly role: string;
  };
}

export interface SpaceSettingsUpdatedEvent {
  readonly type: "SpaceSettingsUpdated";
  readonly payload: {
    readonly spaceId: string;
    readonly maxMembers?: number;
    readonly isInviteOnly?: boolean;
    readonly postingPolicy?: "members" | "leaders_only";
  };
}

export interface SpaceDetailsUpdatedEvent {
  readonly type: "SpaceDetailsUpdated";
  readonly payload: {
    readonly spaceId: string;
    readonly name?: string;
    readonly description?: string;
    readonly tags?: readonly string[];
  };
}

export type SpaceDomainEvent =
  | SpaceCreatedEvent
  | SpaceMemberJoinedEvent
  | SpaceMemberRemovedEvent
  | SpaceMemberRoleUpdatedEvent
  | SpaceSettingsUpdatedEvent
  | SpaceDetailsUpdatedEvent;
