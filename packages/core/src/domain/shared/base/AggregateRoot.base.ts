import { Entity } from './Entity.base';
import { DomainEvent } from './DomainEvent.base';

/**
 * Base Aggregate Root class following DDD principles
 * Aggregate Roots are the entry point to an aggregate
 */
export abstract class AggregateRoot<TProps> extends Entity<TProps> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  clearEvents(): void {
    this._domainEvents = [];
  }

  markEventAsDispatched(event: DomainEvent): void {
    const index = this._domainEvents.findIndex(e => e === event);
    if (index > -1) {
      this._domainEvents.splice(index, 1);
    }
  }
}