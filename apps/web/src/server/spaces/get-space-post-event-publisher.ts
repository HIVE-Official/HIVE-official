// Bounded Context Owner: Community Guild
import type { SpacePostDomainEventPublisherPort } from "@core";
import type { SpacePostAuditLogPort } from "@core";
import { getSpacePostTelemetry } from "./telemetry";
import { getSpacePostAuditLog } from "./audit-log/firestore-space-post-audit-log";
import { publishSpacePostEvents } from "./events/publish-space-post-events";

let cachedPublisher: SpacePostDomainEventPublisherPort | null = null;

export const getSpacePostEventPublisher = (): SpacePostDomainEventPublisherPort => {
  if (!cachedPublisher) {
    cachedPublisher = {
      publish: async (events, occurredAt) => {
        let auditLog: SpacePostAuditLogPort | undefined;
        try {
          auditLog = getSpacePostAuditLog();
        } catch (error) {
          console.warn(
            "[spaces] Falling back to console audit log publisher:",
            error instanceof Error ? error.message : error
          );
          auditLog = undefined;
        }

        await publishSpacePostEvents(events, {
          auditLog,
          telemetry: getSpacePostTelemetry(),
          occurredAt
        });
      }
    };
  }
  return cachedPublisher;
};
