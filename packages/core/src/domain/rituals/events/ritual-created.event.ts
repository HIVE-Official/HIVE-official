import { DomainEvent } from '../../shared/domain-event';
import type { RitualUnion } from '../archetypes';

export class RitualCreatedEvent extends DomainEvent {
  public readonly payload: RitualUnion;

  constructor(ritual: RitualUnion) {
    super();
    this.payload = ritual;
  }

  get aggregateId(): string {
    return this.payload.id;
  }

  get eventName(): string {
    return 'RitualCreated';
  }

  get eventVersion(): number {
    return 1;
  }

  protected getPayload(): Record<string, unknown> {
    return {
      campusId: this.payload.campusId,
      archetype: this.payload.archetype,
      phase: this.payload.phase,
      startsAt: this.payload.startsAt,
      endsAt: this.payload.endsAt,
    };
  }
}
