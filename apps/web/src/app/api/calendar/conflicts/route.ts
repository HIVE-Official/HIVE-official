"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import {
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import { z } from "zod";

interface ConflictEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: "personal" | "space";
  spaceName?: string;
  severity: "overlap" | "adjacent" | "close";
}

const ConflictCheckSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  excludeEventId: z.string().optional(),
});

function detectConflict(
  proposedStart: Date,
  proposedEnd: Date,
  eventStart: Date,
  eventEnd: Date,
  bufferStart: Date,
  bufferEnd: Date,
): "overlap" | "adjacent" | "close" | null {
  if (proposedStart < eventEnd && proposedEnd > eventStart) {
    return "overlap";
  }

  if (
    proposedEnd.getTime() === eventStart.getTime() ||
    proposedStart.getTime() === eventEnd.getTime()
  ) {
    return "adjacent";
  }

  if (bufferStart < eventEnd && bufferEnd > eventStart) {
    return "close";
  }

  return null;
}

async function listUserSpaceIds(userId: string) {
  const membershipsSnapshot = await dbAdmin
    .collection("members")
    .where("userId", "==", userId)
    .where("status", "==", "active")
    .get();

  const spaceIds: string[] = [];
  for (const membership of membershipsSnapshot.docs) {
    const spaceId = membership.data().spaceId;
    if (!spaceId) continue;
    const spaceDoc = await dbAdmin.collection("spaces").doc(spaceId).get();
    if (spaceDoc.exists && spaceDoc.data()?.campusId === CURRENT_CAMPUS_ID) {
      spaceIds.push(spaceId);
    }
  }

  return spaceIds;
}

export const POST = withAuthValidationAndErrors(
  ConflictCheckSchema,
  async (
    request: AuthenticatedRequest,
    _context,
    body,
    respond,
  ) => {
    try {
      const userId = getUserId(request);
      const { startDate, endDate, excludeEventId } = body;

      const proposedStart = new Date(startDate);
      const proposedEnd = new Date(endDate);

      if (proposedStart >= proposedEnd) {
        return respond.error(
          "End date must be after start date",
          "INVALID_INPUT",
          { status: 400 },
        );
      }

      const bufferMs = 15 * 60 * 1000;
      const bufferStart = new Date(proposedStart.getTime() - bufferMs);
      const bufferEnd = new Date(proposedEnd.getTime() + bufferMs);

      const conflicts: ConflictEvent[] = [];

      const personalEventsSnapshot = await dbAdmin
        .collection("personalEvents")
        .where("userId", "==", userId)
        .orderBy("startDate", "asc")
        .get();

      for (const doc of personalEventsSnapshot.docs) {
        if (excludeEventId && doc.id === excludeEventId) continue;

        const eventData = doc.data();
        const eventStart = new Date(eventData.startDate);
        const eventEnd = new Date(eventData.endDate);

        const conflict = detectConflict(
          proposedStart,
          proposedEnd,
          eventStart,
          eventEnd,
          bufferStart,
          bufferEnd,
        );

        if (conflict) {
          conflicts.push({
            id: doc.id,
            title: eventData.title,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            type: "personal",
            severity: conflict,
          });
        }
      }

      const userSpaceIds = await listUserSpaceIds(userId);

      if (userSpaceIds.length > 0) {
        const spaceEventsSnapshot = await dbAdmin
          .collection("events")
          .where("spaceId", "in", userSpaceIds)
          .where("state", "==", "published")
          .orderBy("startDate", "asc")
          .get();

        for (const doc of spaceEventsSnapshot.docs) {
          if (excludeEventId && doc.id === excludeEventId) continue;

          const eventData = doc.data();
          const eventStart = new Date(eventData.startDate);
          const eventEnd = new Date(eventData.endDate);

          const conflict = detectConflict(
            proposedStart,
            proposedEnd,
            eventStart,
            eventEnd,
            bufferStart,
            bufferEnd,
          );

          if (conflict) {
            conflicts.push({
              id: doc.id,
              title: eventData.title,
              startDate: eventData.startDate,
              endDate: eventData.endDate,
              type: "space",
              spaceName: eventData.spaceName,
              severity: conflict,
            });
          }
        }
      }

      conflicts.sort((a, b) => {
        const severityOrder = { overlap: 0, adjacent: 1, close: 2 };
        const severityDiff =
          severityOrder[a.severity] - severityOrder[b.severity];
        if (severityDiff !== 0) return severityDiff;
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      });

      return respond.success({
        conflicts,
        hasConflicts: conflicts.length > 0,
        severityCount: {
          overlap: conflicts.filter((c) => c.severity === "overlap").length,
          adjacent: conflicts.filter((c) => c.severity === "adjacent").length,
          close: conflicts.filter((c) => c.severity === "close").length,
        },
      });
    } catch (error) {
      logger.error(
        "Error checking conflicts at /api/calendar/conflicts",
        error instanceof Error ? error : new Error(String(error)),
      );
      return respond.error("Failed to check conflicts", "INTERNAL_ERROR", {
        status: 500,
      });
    }
  },
);
