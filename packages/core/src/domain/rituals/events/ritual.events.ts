// Bounded Context Owner: Rituals Guild

export interface RitualCreatedEvent {
  readonly type: "RitualCreated";
  readonly payload: {
    readonly ritualId: string;
    readonly creatorId: string;
  };
}

export interface RitualJoinedEvent {
  readonly type: "RitualJoined";
  readonly payload: {
    readonly ritualId: string;
    readonly profileId: string;
  };
}

export type RitualDomainEvent = RitualCreatedEvent | RitualJoinedEvent;

