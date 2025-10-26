// Bounded Context Owner: Community Guild
import type { SpaceDomainEvent, SpaceDomainEventPublisherPort } from "@core";

const emitMetric = (event: SpaceDomainEvent, occurredAt: Date) => {
  const baseLabels = {
    occurredAt: occurredAt.toISOString(),
    spaceId: (event as any).payload?.spaceId ?? null
  };

  switch (event.type) {
    case "SpaceCreated":
      globalThis.console.warn({
        metric: "spaces.events.created",
        value: 1,
        labels: {
          ...baseLabels,
          leaderId: event.payload.leaderId,
          campusId: event.payload.campusId
        }
      });
      break;
    case "SpaceMemberJoined":
      globalThis.console.warn({
        metric: "spaces.events.member_joined",
        value: 1,
        labels: {
          ...baseLabels,
          profileId: event.payload.profileId,
          role: event.payload.role
        }
      });
      break;
    case "SpaceMemberRemoved":
      globalThis.console.warn({
        metric: "spaces.events.member_removed",
        value: 1,
        labels: {
          ...baseLabels,
          profileId: event.payload.profileId
        }
      });
      break;
    case "SpaceMemberRoleUpdated":
      globalThis.console.warn({
        metric: "spaces.events.member_role_updated",
        value: 1,
        labels: {
          ...baseLabels,
          profileId: event.payload.profileId,
          role: event.payload.role
        }
      });
      break;
    case "SpaceSettingsUpdated":
      globalThis.console.warn({
        metric: "spaces.events.settings_updated",
        value: 1,
        labels: {
          ...baseLabels,
          maxMembers: event.payload.maxMembers ?? null,
          isInviteOnly: event.payload.isInviteOnly ?? null,
          postingPolicy: event.payload.postingPolicy ?? null
        }
      });
      break;
    case "SpaceDetailsUpdated":
      globalThis.console.warn({
        metric: "spaces.events.details_updated",
        value: 1,
        labels: {
          ...baseLabels,
          nameChanged: event.payload.name != null,
          descriptionChanged: event.payload.description != null,
          tagsChanged: Array.isArray(event.payload.tags) && event.payload.tags.length > 0
        }
      });
      break;
    default: {
      const fallback = event as { type?: string };
      globalThis.console.warn({
        metric: "spaces.events.unknown",
        value: 1,
        labels: {
          ...baseLabels,
          type: fallback.type ?? "unknown"
        }
      });
      break;
    }
  }
};

let cachedPublisher: SpaceDomainEventPublisherPort | null = null;

export const getSpaceEventPublisher = (): SpaceDomainEventPublisherPort => {
  if (!cachedPublisher) {
    cachedPublisher = {
      publish: async (events, occurredAt) => {
        for (const event of events) {
          emitMetric(event, occurredAt);
        }
      }
    };
  }
  return cachedPublisher;
};
