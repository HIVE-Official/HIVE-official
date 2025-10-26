// Bounded Context Owner: Community Guild
import type { SpaceDomainEvent } from "../../../domain/spaces/events/space.events";

export interface SpaceDomainEventPublisherPort {
  publish(events: readonly SpaceDomainEvent[], occurredAt: Date): Promise<void>;
}

