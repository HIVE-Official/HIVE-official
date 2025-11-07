"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import {
  withAuthAndErrors,
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";
import { z } from "zod";

const UpdateEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  location: z.string().optional(),
  isAllDay: z.boolean().optional(),
  reminderMinutes: z.number().optional(),
});

const PatchEventSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  location: z.string().optional(),
  isAllDay: z.boolean().optional(),
  reminderMinutes: z.number().optional(),
});

async function loadOwnedEvent(eventId: string, userId: string) {
  const eventDoc = await dbAdmin.collection("personalEvents").doc(eventId).get();
  if (!eventDoc.exists) {
    return { ok: false as const, status: 404, message: "Event not found" };
  }

  const eventData = eventDoc.data();
  if (!eventData) {
    return { ok: false as const, status: 404, message: "Event data not found" };
  }

  if (eventData.userId !== userId) {
    return { ok: false as const, status: 403, message: "Unauthorized" };
  }

  return { ok: true as const, eventDoc, eventData };
}

function validateChronology(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start < end;
}

export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ eventId: string }> },
  respond,
) => {
  const userId = getUserId(request);
  const { eventId } = await params;

  const loaded = await loadOwnedEvent(eventId, userId);
  if (!loaded.ok) {
    return respond.error(loaded.message, loaded.status === 403 ? "FORBIDDEN" : "RESOURCE_NOT_FOUND", {
      status: loaded.status,
    });
  }

  return respond.success({
    event: {
      id: eventId,
      ...loaded.eventData,
      type: "personal" as const,
      canEdit: true,
    },
  });
});

export const PUT = withAuthValidationAndErrors(
  UpdateEventSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ eventId: string }> },
    body,
    respond,
  ) => {
    const userId = getUserId(request);
    const { eventId } = await params;

    if (!validateChronology(body.startDate, body.endDate)) {
      return respond.error("End date must be after start date", "INVALID_INPUT", {
        status: 400,
      });
    }

    const loaded = await loadOwnedEvent(eventId, userId);
    if (!loaded.ok) {
      return respond.error(
        loaded.message,
        loaded.status === 403 ? "FORBIDDEN" : "RESOURCE_NOT_FOUND",
        { status: loaded.status },
      );
    }

    const updateData = {
      title: body.title,
      description: body.description ?? "",
      startDate: body.startDate,
      endDate: body.endDate,
      location: body.location ?? "",
      isAllDay: body.isAllDay ?? false,
      reminderMinutes: body.reminderMinutes ?? 0,
      updatedAt: new Date().toISOString(),
    };

    await loaded.eventDoc.ref.update(updateData);

    return respond.success({
      event: {
        id: eventId,
        ...loaded.eventData,
        ...updateData,
        type: "personal" as const,
        canEdit: true,
      },
    });
  },
);

export const PATCH = withAuthValidationAndErrors(
  PatchEventSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ eventId: string }> },
    body,
    respond,
  ) => {
    const userId = getUserId(request);
    const { eventId } = await params;

    if (body.startDate && body.endDate) {
      if (!validateChronology(body.startDate, body.endDate)) {
        return respond.error(
          "End date must be after start date",
          "INVALID_INPUT",
          { status: 400 },
        );
      }
    }

    const loaded = await loadOwnedEvent(eventId, userId);
    if (!loaded.ok) {
      return respond.error(
        loaded.message,
        loaded.status === 403 ? "FORBIDDEN" : "RESOURCE_NOT_FOUND",
        { status: loaded.status },
      );
    }

    const updateData: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    };

    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description ?? "";
    if (body.startDate !== undefined) updateData.startDate = body.startDate;
    if (body.endDate !== undefined) updateData.endDate = body.endDate;
    if (body.location !== undefined) updateData.location = body.location ?? "";
    if (body.isAllDay !== undefined) updateData.isAllDay = body.isAllDay;
    if (body.reminderMinutes !== undefined) updateData.reminderMinutes = body.reminderMinutes;

    await loaded.eventDoc.ref.update(updateData);

    return respond.success({
      event: {
        id: eventId,
        ...loaded.eventData,
        ...updateData,
        type: "personal" as const,
        canEdit: true,
      },
    });
  },
);

export const DELETE = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ eventId: string }> },
  respond,
) => {
  const userId = getUserId(request);
  const { eventId } = await params;

  const loaded = await loadOwnedEvent(eventId, userId);
  if (!loaded.ok) {
    return respond.error(
      loaded.message,
      loaded.status === 403 ? "FORBIDDEN" : "RESOURCE_NOT_FOUND",
      { status: loaded.status },
    );
  }

  await loaded.eventDoc.ref.delete();
  return respond.success({ message: "Event deleted successfully" });
});
