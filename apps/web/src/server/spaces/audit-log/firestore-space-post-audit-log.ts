// Bounded Context Owner: Community Guild
import type { SpacePostAuditLogEvent, SpacePostAuditLogPort } from "@core";
import { firebaseFirestore } from "@hive/firebase";

const auditCollection = (spaceId: string) =>
  firebaseFirestore().collection("spaces").doc(spaceId).collection("audits");

class FirestoreSpacePostAuditLog implements SpacePostAuditLogPort {
  async record(event: SpacePostAuditLogEvent): Promise<void> {
    const docRef = auditCollection(event.spaceId).doc();
    const base = {
      eventId: docRef.id,
      type: event.type,
      spaceId: event.spaceId,
      postId: event.postId,
      actorId: event.actorId,
      occurredAt: event.occurredAt,
      recordedAt: new Date()
    };

    switch (event.type) {
      case "space_post.pin_status.changed": {
        await docRef.set({
          ...base,
          action: event.action,
          reason: event.reason,
          pinnedAt: event.pinnedAt,
          pinExpiresAt: event.pinExpiresAt,
          previousPinnedAt: event.previousPinnedAt,
          previousPinExpiresAt: event.previousPinExpiresAt
        });
        return;
      }

      case "space_post.audience.changed": {
        await docRef.set({
          ...base,
          from: event.from,
          to: event.to,
          reason: event.reason,
          previousShareToCampus: event.previousShareToCampus,
          shareToCampus: event.shareToCampus
        });
        return;
      }

      case "space_post.moderation.changed": {
        await docRef.set({
          ...base,
          from: event.from,
          to: event.to,
          reason: event.reason,
          escalatedReason: event.escalatedReason
        });
        return;
      }

      default: {
        const _exhaustive: never = event;
        throw new Error("Unhandled audit event type");
      }
    }
  }
}

let cachedAuditLog: SpacePostAuditLogPort | null = null;

export const getSpacePostAuditLog = (): SpacePostAuditLogPort => {
  if (!cachedAuditLog) {
    cachedAuditLog = new FirestoreSpacePostAuditLog();
  }
  return cachedAuditLog;
};
