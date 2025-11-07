"use server";

import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import {
  withAuthAndErrors,
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import { logger } from "@/lib/logger";
import { requireSpaceMembership } from "@/lib/space-security";
import { HttpStatus } from "@/lib/api-response-types";

const GetEventsSchema = z.object({
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0),
  type: z
    .enum(["academic", "social", "recreational", "cultural", "meeting", "virtual"])
    .optional(),
  upcoming: z.coerce.boolean().default(true),
});

const CreateEventSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  type: z.enum(["academic", "social", "recreational", "cultural", "meeting", "virtual"]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  location: z.string().optional(),
  virtualLink: z.string().url().optional(),
  maxAttendees: z.number().positive().optional(),
  rsvpDeadline: z.string().datetime().optional(),
  isRecurring: z.boolean().default(false),
  recurrenceRule: z.string().optional(),
  tags: z.array(z.string()).default([]),
  imageUrl: z.string().url().optional(),
  isFeatured: z.boolean().default(false),
  isPrivate: z.boolean().default(false),
  requiredRSVP: z.boolean().default(false),
  cost: z.number().nonnegative().optional(),
  currency: z.string().length(3).optional(),
});

export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string }> },
  respond,
) => {
  try {
    const { spaceId } = await params;
    const userId = getUserId(request);

    const membership = await requireSpaceMembership(spaceId, userId);
    if (!membership.ok) {
      const code =
        membership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
      return respond.error(membership.error, code, { status: membership.status });
    }

    const queryParams = GetEventsSchema.parse(
      Object.fromEntries(request.nextUrl.searchParams.entries()),
    );

    let query = dbAdmin.collection("spaces").doc(spaceId).collection("events");

    const now = new Date();
    if (queryParams.upcoming) {
      query = query.where("startDate", ">=", now).orderBy("startDate", "asc");
    } else {
      query = query.where("startDate", "<", now).orderBy("startDate", "desc");
    }

    if (queryParams.type) {
      query = query.where("type", "==", queryParams.type);
    }

    query = query.offset(queryParams.offset).limit(queryParams.limit);

    const eventsSnapshot = await query.get();
    const events: any[] = [];

    for (const doc of eventsSnapshot.docs) {
      const eventData = doc.data();
      if (eventData.campusId && eventData.campusId !== CURRENT_CAMPUS_ID) {
        continue;
      }
      const organizerDoc = await dbAdmin.collection("users").doc(eventData.organizerId).get();
      const organizer = organizerDoc.exists ? organizerDoc.data() : null;

      const rsvpSnapshot = await dbAdmin
        .collection("spaces")
        .doc(spaceId)
        .collection("events")
        .doc(doc.id)
        .collection("rsvps")
        .where("status", "==", "going")
        .get();

      const userRsvpDoc = await dbAdmin
        .collection("spaces")
        .doc(spaceId)
        .collection("events")
        .doc(doc.id)
        .collection("rsvps")
        .doc(userId)
        .get();

      events.push({
        id: doc.id,
        ...eventData,
        organizer: organizer
          ? {
              id: organizerDoc.id,
              fullName: organizer.fullName,
              handle: organizer.handle,
              photoURL: organizer.photoURL,
            }
          : null,
        currentAttendees: rsvpSnapshot.size,
        userRSVP: userRsvpDoc.exists ? userRsvpDoc.data()?.status : null,
      });
    }

    return respond.success({
      events,
      hasMore: eventsSnapshot.size === queryParams.limit,
      pagination: {
        limit: queryParams.limit,
        offset: queryParams.offset,
        nextOffset:
          eventsSnapshot.size === queryParams.limit
            ? queryParams.offset + queryParams.limit
            : null,
      },
    });
  } catch (error) {
    logger.error(
      "Error fetching events at /api/spaces/[spaceId]/events",
      error instanceof Error ? error : new Error(String(error)),
    );
    return respond.error("Failed to fetch events", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export const POST = withAuthValidationAndErrors(
  CreateEventSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ spaceId: string }> },
    body,
    respond,
  ) => {
    try {
      const { spaceId } = await params;
      const userId = getUserId(request);

      const membership = await requireSpaceMembership(spaceId, userId);
      if (!membership.ok) {
        const code =
          membership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
        return respond.error(membership.error, code, { status: membership.status });
      }

      const role = membership.membership.role;
      if (!["owner", "admin", "moderator", "builder"].includes(role)) {
        return respond.error("Insufficient permissions to create events", "FORBIDDEN", {
          status: HttpStatus.FORBIDDEN,
        });
      }

      const startDate = new Date(body.startDate);
      const endDate = new Date(body.endDate);
      if (startDate >= endDate) {
        return respond.error("End date must be after start date", "INVALID_INPUT", {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const eventData = {
        ...body,
        startDate,
        endDate,
        organizerId: userId,
        campusId: CURRENT_CAMPUS_ID,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "scheduled",
      };

      const eventRef = await dbAdmin
        .collection("spaces")
        .doc(spaceId)
        .collection("events")
        .add(eventData);

      return respond.created({
        event: {
          id: eventRef.id,
          ...eventData,
        },
      });
    } catch (error) {
      logger.error(
        "Error creating event at /api/spaces/[spaceId]/events",
        error instanceof Error ? error : new Error(String(error)),
      );
      return respond.error("Failed to create event", "INTERNAL_ERROR", {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);
