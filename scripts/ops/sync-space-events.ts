// Bounded Context Owner: Community Guild
//
// Usage:
//   FIREBASE_PROJECT_ID=... FIREBASE_CLIENT_EMAIL=... FIREBASE_PRIVATE_KEY="..." pnpm ops:sync-space-events
//
// The script synchronizes `spaces/{spaceId}/events/{eventId}` documents with the source of truth:
// event posts stored in `spaces/{spaceId}/posts/{postId}` (where `kind === "event"`).
// It creates or updates event documents to mirror the post-backed contract and marks orphaned
// events (those without a matching post) as deleted.

import type { QueryDocumentSnapshot, DocumentData, Timestamp } from "firebase-admin/firestore";
import { loadEnvConfig } from "@next/env";
import { firebaseFirestore } from "../../apps/web/src/server/firebase/admin";

loadEnvConfig(process.cwd(), true);

type FirestoreDate = Timestamp | Date | string | number | null | undefined;

const RSVP_STATUSES = new Set(["going", "maybe", "not_going", "waitlist"] as const);

const toDate = (value: FirestoreDate, fallback?: Date): Date => {
  if (!value) {
    return fallback ?? new Date();
  }
  if (value instanceof Date) {
    return value;
  }
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? fallback ?? new Date() : parsed;
  }
  if ("toDate" in value && typeof value.toDate === "function") {
    return value.toDate();
  }
  return fallback ?? new Date();
};

const toOptionalPositiveInt = (value: unknown): number | null => {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return null;
  }
  return Math.round(value);
};

const toNonNegativeInt = (value: unknown): number => {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return 0;
  }
  return Math.round(value);
};

const toStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

const toTrimmedOrNull = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const main = async () => {
  const db = firebaseFirestore();
  const spacesSnap = await db.collection("spaces").get();
  const existingEventsBySpace = new Map<string, Map<string, QueryDocumentSnapshot<DocumentData>>>();

  for (const spaceDoc of spacesSnap.docs) {
    const eventsSnap = await spaceDoc.ref.collection("events").get();
    const map = new Map<string, QueryDocumentSnapshot<DocumentData>>();
    eventsSnap.forEach((doc) => map.set(doc.id, doc as QueryDocumentSnapshot<DocumentData>));
    existingEventsBySpace.set(spaceDoc.id, map);
  }

  const stats = {
    totalPosts: 0,
    created: 0,
    updated: 0,
    skippedMissingEvent: 0,
    orphaned: 0
  };

  for (const spaceDoc of spacesSnap.docs) {
    const spaceId = spaceDoc.id;
    const postsSnap = await spaceDoc.ref.collection("posts").where("kind", "==", "event").get();
    const existingMap = existingEventsBySpace.get(spaceId) ?? new Map();
    const eventsCollection = spaceDoc.ref.collection("events");

    stats.totalPosts += postsSnap.size;

    for (const doc of postsSnap.docs) {
      const data = doc.data();
      const event = data.event;
      if (!event || typeof event !== "object") {
        stats.skippedMissingEvent += 1;
        console.warn(
          `[sync-space-events] Skipping post ${spaceId}/${doc.id} because it lacks 'event' details.`
        );
        continue;
      }

      const title =
        typeof event.title === "string" && event.title.trim().length > 0
          ? event.title.trim()
          : typeof data.content === "string"
            ? data.content.slice(0, 120)
            : "Untitled event";
      const description = toTrimmedOrNull(event.description) ?? toTrimmedOrNull(data.content) ?? null;
      const location =
        typeof event.location === "string" && event.location.trim().length > 0
          ? event.location.trim()
          : "TBD";

      const startAt = toDate(event.startAt ?? data.startAt ?? data.createdAt);
      const endAt = toDate(
        event.endAt ?? new Date(startAt.getTime() + 60 * 60 * 1000),
        new Date(startAt.getTime() + 60 * 60 * 1000)
      );
      const durationMinutes = Math.max(1, Math.round((endAt.getTime() - startAt.getTime()) / 60000));

      const coHostIds = toStringArray(event.coHostIds);
      const coHostNames = toStringArray(event.coHostNames);

      const userRsvpRaw = typeof event.userRsvp === "string" ? event.userRsvp.trim() : null;
      const userRsvp = userRsvpRaw && RSVP_STATUSES.has(userRsvpRaw as typeof userRsvpRaw)
        ? userRsvpRaw
        : null;

      const tags = Array.isArray(data.tags) ? toStringArray(data.tags) : [];

      const eventDocPayload = {
        spaceId,
        postId: doc.id,
        title,
        description,
        location,
        startAt,
        endAt,
        durationMinutes,
        maxAttendees: toOptionalPositiveInt(event.maxAttendees),
        enableWaitlist: Boolean(event.enableWaitlist),
        goingCount: toNonNegativeInt(event.goingCount),
        maybeCount: toNonNegativeInt(event.maybeCount),
        waitlistCount: toNonNegativeInt(event.waitlistCount),
        checkInEnabled: Boolean(event.checkInEnabled),
        checkInWindowBefore:
          typeof event.checkInWindowBefore === "number"
            ? Math.round(event.checkInWindowBefore)
            : null,
        checkInWindowAfter:
          typeof event.checkInWindowAfter === "number"
            ? Math.round(event.checkInWindowAfter)
            : null,
        qrCodeEnabled: Boolean(event.qrCodeEnabled),
        checkedInCount: toNonNegativeInt(event.checkedInCount),
        coHostIds,
        coHostNames,
        userRsvp,
        tags,
        isRssImported: Boolean(event.isRssImported),
        coverImageUrl: toTrimmedOrNull(event.coverImageUrl),
        coverImageAlt: toTrimmedOrNull(event.coverImageAlt),
        lastSyncedAt: new Date(),
        isDeleted: false
      };

      const existingDoc = existingMap.get(doc.id);

      if (existingDoc) {
        await eventsCollection.doc(doc.id).set(
          {
            ...eventDocPayload,
            createdAt: existingDoc.data().createdAt ?? startAt,
            updatedAt: new Date()
          },
          { merge: true }
        );
        existingMap.delete(doc.id);
        stats.updated += 1;
      } else {
        await eventsCollection.doc(doc.id).set({
          ...eventDocPayload,
          createdAt: startAt,
          updatedAt: new Date()
        });
        stats.created += 1;
      }
    }
  }

  for (const [spaceId, orphanMap] of existingEventsBySpace.entries()) {
    for (const [eventId, doc] of orphanMap.entries()) {
      await doc.ref.set(
        {
          isDeleted: true,
          lastSyncedAt: new Date(),
          orphanedBySync: true
        },
        { merge: true }
      );
      stats.orphaned += 1;
      console.info(
        `[sync-space-events] Marked orphaned event ${spaceId}/${eventId} as deleted (no matching post).`
      );
    }
  }

  console.info(
    `[sync-space-events] Sync complete. Posts: ${stats.totalPosts}, created: ${stats.created}, updated: ${stats.updated}, ` +
      `skipped (missing event data): ${stats.skippedMissingEvent}, orphaned marked: ${stats.orphaned}`
  );
};

main().catch((error) => {
  console.error("[sync-space-events] Sync failed", error);
  process.exitCode = 1;
});
