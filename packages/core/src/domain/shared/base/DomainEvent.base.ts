/**
 * Base Domain Event class following DDD principles
 * Domain Events capture something that happened in the domain
 */
export abstract class DomainEvent {
  public readonly occurredAt: Date;
  public readonly aggregateId: string;

  protected constructor(aggregateId: string) {
    this.occurredAt = new Date();
    this.aggregateId = aggregateId;
  }

  abstract getEventName(): string;
}