// Bounded Context Owner: Rituals Guild
import { err, ok, type Result } from "../../../shared/result";
import type { RitualDomainEvent } from "../events/ritual.events";
import type { RitualParticipant, RitualSchedule, RitualSnapshot } from "../ritual.types";

export interface RitualCreationInput {
  readonly id: string;
  readonly campusId: string;
  readonly spaceId?: string;
  readonly creatorId: string;
  readonly name: string;
  readonly description: string;
  readonly schedule: RitualSchedule;
  readonly createdAt?: Date;
}

export class RitualAggregate {
  private props: RitualSnapshot;
  private readonly events: RitualDomainEvent[] = [];

  private constructor(snapshot: RitualSnapshot) {
    this.props = {
      ...snapshot,
      participants: [...snapshot.participants]
    };
  }

  static create(input: RitualCreationInput): Result<RitualAggregate> {
    const name = input.name.trim();
    if (name.length < 2) return err("Ritual name too short");

    const createdAt = input.createdAt ?? new Date();
    const aggregate = new RitualAggregate({
      id: input.id,
      campusId: input.campusId,
      spaceId: input.spaceId,
      creatorId: input.creatorId,
      name,
      description: input.description.trim(),
      schedule: input.schedule,
      participants: [],
      createdAt,
      updatedAt: createdAt
    });

    aggregate.events.push({
      type: "RitualCreated",
      payload: { ritualId: aggregate.props.id, creatorId: aggregate.props.creatorId }
    });

    return ok(aggregate);
  }

  static rehydrate(snapshot: RitualSnapshot): RitualAggregate {
    return new RitualAggregate(snapshot);
  }

  toSnapshot(): RitualSnapshot {
    return { ...this.props, participants: [...this.props.participants] };
  }

  pullDomainEvents(): RitualDomainEvent[] {
    return this.events.splice(0, this.events.length);
  }

  getId(): string {
    return this.props.id;
  }

  listParticipants(): readonly RitualParticipant[] {
    return this.props.participants;
  }

  join(profileId: string, joinedAt: Date = new Date()): Result<void> {
    if (this.props.participants.some((p) => p.profileId === profileId)) {
      return ok(undefined);
    }

    this.props = {
      ...this.props,
      participants: [...this.props.participants, { profileId, joinedAt }],
      updatedAt: joinedAt
    };

    this.events.push({
      type: "RitualJoined",
      payload: { ritualId: this.props.id, profileId }
    });
    return ok(undefined);
  }
}

