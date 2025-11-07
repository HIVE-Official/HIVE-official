import { DomainEvent } from '../../shared/domain-event';

export interface RitualDeletedPayload {
  ritualId: string;
  campusId: string;
  archetype?: string;
}

export class RitualDeletedEvent extends DomainEvent {
  public readonly payload: RitualDeletedPayload;

  constructor(payload: RitualDeletedPayload) {
    super();
    this.payload = payload;
  }

  get aggregateId(): string {
    return this.payload.ritualId;
  }

  get eventName(): string {
    return 'RitualDeleted';
  }

  get eventVersion(): number {
    return 1;
  }

  get data(): RitualDeletedPayload {
    return this.payload;
  }

  protected getPayload(): Record<string, unknown> {
    return { ...this.payload } as Record<string, unknown>;
  }
}
