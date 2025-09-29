/**
 * Domain Event Base Infrastructure
 * Foundation for event-driven architecture in HIVE
 */

export interface DomainEventMetadata {
  correlationId?: string;
  causationId?: string;
  userId?: string;
  timestamp: Date;
}

export abstract class DomainEvent {
  public readonly occurredOn: Date;
  public readonly metadata: DomainEventMetadata;

  constructor(metadata?: Partial<DomainEventMetadata>) {
    this.occurredOn = new Date();
    this.metadata = {
      timestamp: this.occurredOn,
      ...metadata
    };
  }

  abstract get aggregateId(): string;
  abstract get eventName(): string;
  abstract get eventVersion(): number;

  toJSON(): Record<string, unknown> {
    return {
      eventName: this.eventName,
      eventVersion: this.eventVersion,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn.toISOString(),
      metadata: this.metadata,
      payload: this.getPayload()
    };
  }

  protected abstract getPayload(): Record<string, unknown>;
}

export interface DomainEventHandler<T extends DomainEvent> {
  handle(event: T): Promise<void>;
}

export interface EventStore {
  save(event: DomainEvent): Promise<void>;
  getEvents(aggregateId: string): Promise<DomainEvent[]>;
}

export class EventBus {
  private handlers: Map<string, DomainEventHandler<any>[]> = new Map();

  subscribe<T extends DomainEvent>(
    eventName: string,
    handler: DomainEventHandler<T>
  ): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)!.push(handler);
  }

  async publish(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.eventName) || [];
    await Promise.all(handlers.map(handler => handler.handle(event)));
  }

  async publishMany(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }
}

// Aggregate root with event support
export abstract class AggregateRoot {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  clearEvents(): void {
    this._domainEvents = [];
  }
}