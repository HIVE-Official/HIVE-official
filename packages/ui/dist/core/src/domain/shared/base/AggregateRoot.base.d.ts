import { Entity } from './Entity.base';
import { DomainEvent } from './DomainEvent.base';
/**
 * Base Aggregate Root class following DDD principles
 * Aggregate Roots are the entry point to an aggregate
 */
export declare abstract class AggregateRoot<TProps> extends Entity<TProps> {
    private _domainEvents;
    get domainEvents(): DomainEvent[];
    protected addDomainEvent(domainEvent: DomainEvent): void;
    clearEvents(): void;
    markEventAsDispatched(event: DomainEvent): void;
}
//# sourceMappingURL=AggregateRoot.base.d.ts.map