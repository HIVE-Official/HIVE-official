// Bounded Context Owner: Community Guild
import type {
  SpacePostAuditLogPort,
  SpacePostTelemetryPort,
  SpacePostDomainEvent
} from "@core";

interface PublishSpacePostEventsOptions {
  readonly auditLog?: SpacePostAuditLogPort;
  readonly telemetry?: SpacePostTelemetryPort;
  readonly occurredAt: Date;
}

export const publishSpacePostEvents = async (
  events: readonly SpacePostDomainEvent[],
  options: PublishSpacePostEventsOptions
): Promise<void> => {
  if (events.length === 0) {
    return;
  }

  const tasks: Promise<void>[] = [];

  for (const event of events) {
    switch (event.type) {
      case "SpacePostPinStatusChanged": {
        const { payload } = event;
        if (options.auditLog) {
          tasks.push(
            options.auditLog
              .record({
                type: "space_post.pin_status.changed",
                occurredAt: options.occurredAt,
                spaceId: payload.spaceId,
                postId: payload.postId,
                actorId: payload.actorId,
                action: payload.action,
                reason: payload.reason ?? null,
                pinnedAt: payload.pinnedAt ?? null,
                pinExpiresAt: payload.pinExpiresAt ?? null,
                previousPinnedAt: payload.previousPinnedAt ?? null,
                previousPinExpiresAt: payload.previousPinExpiresAt ?? null
              })
              .catch((error) => {
                console.error("[spaces] Failed to record pin audit event", error);
              })
          );
        }

        void options.telemetry?.recordPinStatusChanged?.({
          spaceId: payload.spaceId,
          postId: payload.postId,
          actorId: payload.actorId,
          action: payload.action,
          reason: payload.reason ?? null,
          pinnedAt: payload.pinnedAt ?? null,
          pinExpiresAt: payload.pinExpiresAt ?? null
        });
        break;
      }

      case "SpacePostAudienceChanged": {
        const { payload } = event;
        if (options.auditLog) {
          tasks.push(
            options.auditLog
              .record({
                type: "space_post.audience.changed",
                occurredAt: options.occurredAt,
                spaceId: payload.spaceId,
                postId: payload.postId,
                actorId: payload.actorId,
                from: payload.from,
                to: payload.to,
                reason: payload.reason ?? null,
                previousShareToCampus: payload.previousShareToCampus,
                shareToCampus: payload.shareToCampus
              })
              .catch((error) => {
                console.error("[spaces] Failed to record audience audit event", error);
              })
          );
        }
        break;
      }

      case "SpacePostModerationChanged": {
        const { payload } = event;
        if (options.auditLog) {
          tasks.push(
            options.auditLog
              .record({
                type: "space_post.moderation.changed",
                occurredAt: options.occurredAt,
                spaceId: payload.spaceId,
                postId: payload.postId,
                actorId: payload.actorId,
                from: payload.from,
                to: payload.to,
                reason: payload.reason ?? null,
                escalatedReason: payload.escalatedReason ?? null
              })
              .catch((error) => {
                console.error("[spaces] Failed to record moderation audit event", error);
              })
          );
        }

        void options.telemetry?.recordModerationTransition?.({
          spaceId: payload.spaceId,
          postId: payload.postId,
          actorId: payload.actorId,
          from: payload.from,
          to: payload.to,
          reason: payload.reason ?? null,
          escalatedReason: payload.escalatedReason ?? null
        });
        break;
      }

      default:
        break;
    }
  }

  if (tasks.length > 0) {
    await Promise.all(tasks);
  }
};
