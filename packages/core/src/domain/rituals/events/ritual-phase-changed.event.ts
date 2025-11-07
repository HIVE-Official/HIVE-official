import { DomainEvent } from '../../shared/domain-event';
import type { RitualPhase } from '../archetypes';

export interface RitualPhaseChangedPayload {
  ritualId: string;
  campusId: string;
  fromPhase: RitualPhase;
  toPhase: RitualPhase;
  archetype: string;
  reason?: string;
}

export class RitualPhaseChangedEvent extends DomainEvent {
  public readonly payload: RitualPhaseChangedPayload;

  constructor(payload: RitualPhaseChangedPayload) {
    super();
    this.payload = payload;
  }

  get aggregateId(): string {
    return this.payload.ritualId;
  }

  get eventName(): string {
    return 'RitualPhaseChanged';
  }

  get eventVersion(): number {
    return 1;
  }

  get data(): RitualPhaseChangedPayload {
    return this.payload;
  }

  protected getPayload(): Record<string, unknown> {
    return { ...this.payload } as Record<string, unknown>;
  }
}
