// Bounded Context Owner: Community Guild
import type { SpacePostDomainEvent } from "../../../domain/spaces/events/post.events";

export interface SpacePostDomainEventPublisherPort {
  publish(events: readonly SpacePostDomainEvent[], occurredAt: Date): Promise<void>;
}
