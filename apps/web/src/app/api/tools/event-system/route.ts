"use server";

import { z } from "zod";
import { dbAdmin as adminDb } from "@/lib/firebase-admin";
import { logger } from "@/lib/structured-logger";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import {
  withAuthAndErrors,
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";

const EventSystemInstallationSchema = z.object({
  spaceId: z.string().optional(),
  isPersonal: z.boolean().default(false),
  configuration: z
    .object({
      defaultEventTypes: z
        .array(z.string())
        .default(["study_session", "social_meetup"]),
      calendarIntegration: z.boolean().default(true),
      notificationSettings: z
        .object({
          eventReminders: z.boolean().default(true),
          rsvpUpdates: z.boolean().default(true),
          checkInAlerts: z.boolean().default(false),
        })
        .default({}),
      spaceIntegration: z
        .object({
          enabled: z.boolean().default(true),
          autoAnnounce: z.boolean().default(true),
          requireApproval: z.boolean().default(false),
        })
        .default({}),
      memberPermissions: z
        .object({
          anyoneCanCreate: z.boolean().default(true),
          requireApproval: z.boolean().default(false),
          moderatorRoles: z.array(z.string()).default(["admin", "moderator"]),
        })
        .default({}),
    })
    .default({}),
});

const EventCreationSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000),
  date: z.string().datetime(),
  location: z.string().min(1).max(200),
  type: z.enum([
    "study_session",
    "social_meetup",
    "project_work",
    "organization_meeting",
    "campus_event",
    "custom",
  ]),
  capacity: z.number().min(1).max(1000).optional(),
  isPublic: z.boolean().default(true),
  requiresRSVP: z.boolean().default(true),
  allowGuests: z.boolean().default(false),
  tags: z.array(z.string()).max(10).default([]),
  recurrence: z
    .object({
      type: z.enum(["none", "daily", "weekly", "monthly"]).default("none"),
      interval: z.number().min(1).default(1),
      endDate: z.string().datetime().optional(),
    })
    .optional(),
});

const InstallActionSchema = EventSystemInstallationSchema.extend({
  action: z.literal("install"),
});

const CreateEventActionSchema = z.object({
  action: z.literal("create_event"),
  installationId: z.string(),
  eventData: EventCreationSchema,
});

const EventActionSchema = z.discriminatedUnion("action", [
  InstallActionSchema,
  CreateEventActionSchema,
]);

type EventAction = z.infer<typeof EventActionSchema>;

async function ensureSpaceAccess(spaceId: string, userId: string) {
  const spaceDoc = await adminDb.collection("spaces").doc(spaceId).get();
  if (!spaceDoc.exists) {
    return {
      ok: false as const,
      status: 404,
      message: "Space not found",
    };
  }

  const spaceData = spaceDoc.data();
  if (spaceData?.campusId && spaceData.campusId !== CURRENT_CAMPUS_ID) {
    return {
      ok: false as const,
      status: 403,
      message: "Access denied for this campus",
    };
  }

  const userRole = spaceData?.members?.[userId]?.role;
  if (!["admin", "moderator", "builder"].includes(userRole)) {
    return {
      ok: false as const,
      status: 403,
      message: "Insufficient permissions to install Event System in this space",
    };
  }

  return { ok: true as const };
}

async function loadInstallation(
  installationId: string,
  userId: string,
) {
  const installationDoc = await adminDb
    .collection("event_system_installations")
    .doc(installationId)
    .get();

  if (!installationDoc.exists) {
    return {
      ok: false as const,
      status: 404,
      message: "Event System installation not found",
    };
  }

  const installation = installationDoc.data();
  if (installation?.userId !== userId) {
    return {
      ok: false as const,
      status: 403,
      message: "Access denied to this Event System installation",
    };
  }

  if (installation?.campusId && installation.campusId !== CURRENT_CAMPUS_ID) {
    return {
      ok: false as const,
      status: 403,
      message: "Access denied for this campus",
    };
  }

  return {
    ok: true as const,
    installation,
    installationRef: installationDoc.ref,
  };
}

export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  _context,
  respond,
) => {
  try {
    const userId = getUserId(request);
    const searchParams = request.nextUrl.searchParams;
    const spaceId = searchParams.get("spaceId");
    const includeEvents = searchParams.get("includeEvents") === "true";

    let installationsQuery = adminDb
      .collection("event_system_installations")
      .where("userId", "==", userId)
      .where("campusId", "==", CURRENT_CAMPUS_ID);

    if (spaceId) {
      installationsQuery = installationsQuery.where("spaceId", "==", spaceId);
    }

    const installationsSnapshot = await installationsQuery.get();
    const installations = installationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const response: Record<string, unknown> = {
      installations,
      systemStatus: {
        totalInstallations: installations.length,
        personalInstallations: installations.filter(
          (installation: any) => installation.isPersonal,
        ).length,
        spaceInstallations: installations.filter(
          (installation: any) => !installation.isPersonal,
        ).length,
      },
    };

    if (includeEvents && installations.length > 0) {
      const eventsSnapshot = await adminDb
        .collection("events")
        .where("organizerId", "==", userId)
        .where("campusId", "==", CURRENT_CAMPUS_ID)
        .where("createdVia", "==", "event-system")
        .orderBy("createdAt", "desc")
        .limit(50)
        .get();

      response.recentEvents = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const analyticsSnapshot = await adminDb
        .collection("event_analytics")
        .where("organizerId", "==", userId)
        .where("campusId", "==", CURRENT_CAMPUS_ID)
        .orderBy("date", "desc")
        .limit(30)
        .get();

      const analytics = analyticsSnapshot.docs.map((doc) => doc.data());

      if (analytics.length > 0) {
        response.analytics = {
          totalEvents: analytics.reduce(
            (sum: number, data: any) => sum + (data.eventsCreated || 0),
            0,
          ),
          totalAttendees: analytics.reduce(
            (sum: number, data: any) => sum + (data.totalAttendees || 0),
            0,
          ),
          averageAttendance:
            analytics.reduce(
              (sum: number, data: any) => sum + (data.averageAttendance || 0),
              0,
            ) / analytics.length,
          memberEngagement:
            analytics.reduce(
              (sum: number, data: any) => sum + (data.memberEngagement || 0),
              0,
            ) / analytics.length,
        };
      }
    }

    return respond.success(response);
  } catch (error) {
    logger.error(
    `Error fetching Event System data at /api/tools/event-system`,
    error instanceof Error ? error : new Error(String(error))
  );
    return respond.error("Failed to fetch Event System data", "INTERNAL_ERROR", {
      status: 500,
    });
  }
});

export const POST = withAuthValidationAndErrors(
  EventActionSchema,
  async (
    request: AuthenticatedRequest,
    _context: {},
    payload: EventAction,
    respond,
  ) => {
    const userId = getUserId(request);
    const now = new Date();

    try {
      if (payload.action === "install") {
        let existingQuery = adminDb
          .collection("event_system_installations")
          .where("userId", "==", userId)
          .where("isPersonal", "==", payload.isPersonal)
          .where("campusId", "==", CURRENT_CAMPUS_ID);

        if (payload.spaceId) {
          existingQuery = existingQuery.where("spaceId", "==", payload.spaceId);
        }

        const existingSnapshot = await existingQuery.limit(1).get();
        if (!existingSnapshot.empty) {
          return respond.error(
            "Event System already installed for this context",
            "CONFLICT",
            { status: 409 },
          );
        }

        if (payload.spaceId && !payload.isPersonal) {
          const spaceAccess = await ensureSpaceAccess(payload.spaceId, userId);
          if (!spaceAccess.ok) {
            return respond.error(spaceAccess.message, "FORBIDDEN", {
              status: spaceAccess.status,
            });
          }
        }

        const installation = {
          userId,
          spaceId: payload.spaceId || null,
          isPersonal: payload.isPersonal,
          configuration: payload.configuration,
          installedComponents: [
            "event-creator",
            "rsvp-manager",
            "check-in-system",
            "event-analytics",
            "feedback-collector",
          ],
          status: "active",
          createdAt: now,
          updatedAt: now,
          version: "2.1.0",
          campusId: CURRENT_CAMPUS_ID,
        };

        const installationRef = await adminDb
          .collection("event_system_installations")
          .add(installation);

        await adminDb.collection("event_analytics").add({
          installationId: installationRef.id,
          organizerId: userId,
          userId,
          spaceId: payload.spaceId || null,
          campusId: CURRENT_CAMPUS_ID,
          date: now,
          eventsCreated: 0,
          totalAttendees: 0,
          averageAttendance: 0,
          memberEngagement: 0,
          systemHealth: {
            uptime: 100,
            errorRate: 0,
            performance: "excellent",
          },
        });

        await adminDb.collection("analytics_events").add({
          eventType: "event_system_installed",
          userId,
          installationId: installationRef.id,
          spaceId: payload.spaceId || null,
          isPersonal: payload.isPersonal,
          campusId: CURRENT_CAMPUS_ID,
          timestamp: now.toISOString(),
          metadata: {
            configuration: payload.configuration,
            version: "2.1.0",
          },
        });

        return respond.created(
          {
            ...installation,
            id: installationRef.id,
          },
          { message: "Event System installed successfully" },
        );
      }

      const installationResult = await loadInstallation(
        payload.installationId,
        userId,
      );
      if (!installationResult.ok) {
        return respond.error(
          installationResult.message,
          installationResult.status === 404
            ? "RESOURCE_NOT_FOUND"
            : "FORBIDDEN",
          { status: installationResult.status },
        );
      }

      const { installation } = installationResult;
      const eventId = adminDb.collection("events").doc().id;

      const eventRecord = {
        ...payload.eventData,
        id: eventId,
        organizerId: userId,
        installationId: payload.installationId,
        spaceId: installation?.spaceId || null,
        campusId: CURRENT_CAMPUS_ID,
        createdVia: "event-system",
        status: "active",
        rsvpCount: 0,
        attendeeCount: 0,
        createdAt: now,
        updatedAt: now,
      };

      await adminDb.collection("events").doc(eventId).set(eventRecord);

      if (payload.eventData.requiresRSVP) {
        await adminDb.collection("event_rsvps").doc(eventId).set({
          eventId,
          responses: [],
          capacity: payload.eventData.capacity || null,
          waitlist: [],
          settings: {
            allowGuests: payload.eventData.allowGuests,
            requireApproval: false,
            deadline: null,
          },
          createdAt: now,
          updatedAt: now,
        });
      }

      const analyticsSnapshot = await adminDb
        .collection("event_analytics")
        .where("installationId", "==", payload.installationId)
        .where("campusId", "==", CURRENT_CAMPUS_ID)
        .orderBy("date", "desc")
        .limit(1)
        .get();

      if (!analyticsSnapshot.empty) {
        const analyticsDoc = analyticsSnapshot.docs[0];
        await analyticsDoc.ref.update({
          eventsCreated: (analyticsDoc.data().eventsCreated || 0) + 1,
          updatedAt: now,
        });
      }

      await adminDb.collection("analytics_events").add({
        eventType: "event_created",
        userId,
        eventId,
        installationId: payload.installationId,
        spaceId: installation?.spaceId || null,
        campusId: CURRENT_CAMPUS_ID,
        timestamp: now.toISOString(),
        metadata: {
          eventType: payload.eventData.type,
          isPublic: payload.eventData.isPublic,
          requiresRSVP: payload.eventData.requiresRSVP,
          capacity: payload.eventData.capacity,
        },
      });

      return respond.created(eventRecord, { message: "Event created" });
    } catch (error) {
      logger.error(
        "Error in Event System API at /api/tools/event-system",
        error instanceof Error ? error : new Error(String(error)),
      );
      return respond.error("Internal server error", "INTERNAL_ERROR", {
        status: 500,
      });
    }
  },
);

const UpdateConfigSchema = z.object({
  installationId: z.string(),
  configuration: EventSystemInstallationSchema.shape.configuration,
});

export const PUT = withAuthValidationAndErrors(
  UpdateConfigSchema,
  async (
    request: AuthenticatedRequest,
    _context: {},
    payload,
    respond,
  ) => {
    const userId = getUserId(request);

    try {
      const installationResult = await loadInstallation(
        payload.installationId,
        userId,
      );
      if (!installationResult.ok) {
        return respond.error(
          installationResult.message,
          installationResult.status === 404
            ? "RESOURCE_NOT_FOUND"
            : "FORBIDDEN",
          { status: installationResult.status },
        );
      }

      const validatedConfig =
        EventSystemInstallationSchema.shape.configuration.parse(
          payload.configuration,
        );

      await installationResult.installationRef.update({
        configuration: validatedConfig,
        updatedAt: new Date(),
      });

      await adminDb.collection("analytics_events").add({
        eventType: "event_system_configured",
        userId,
        installationId: payload.installationId,
        campusId: CURRENT_CAMPUS_ID,
        timestamp: new Date().toISOString(),
        metadata: {
          configuration: validatedConfig,
        },
      });

      return respond.success({
        success: true,
        configuration: validatedConfig,
      });
    } catch (error) {
      logger.error(
        "Error updating Event System configuration at /api/tools/event-system",
        error instanceof Error ? error : new Error(String(error)),
      );
      return respond.error(
        "Failed to update configuration",
        "INTERNAL_ERROR",
        { status: 500 },
      );
    }
  },
);

export const DELETE = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  _context,
  respond,
) => {
  const userId = getUserId(request);
  const installationId = request.nextUrl.searchParams.get("installationId");

  if (!installationId) {
    return respond.error("Installation ID required", "INVALID_INPUT", {
      status: 400,
    });
  }

  try {
    const installationResult = await loadInstallation(installationId, userId);
    if (!installationResult.ok) {
      return respond.error(
        installationResult.message,
        installationResult.status === 404
          ? "RESOURCE_NOT_FOUND"
          : "FORBIDDEN",
        { status: installationResult.status },
      );
    }

    const activeEventsSnapshot = await adminDb
      .collection("events")
      .where("installationId", "==", installationId)
      .where("campusId", "==", CURRENT_CAMPUS_ID)
      .where("status", "==", "active")
      .limit(1)
      .get();

    if (!activeEventsSnapshot.empty) {
      return respond.error(
        "Cannot uninstall Event System with active events",
        "CONFLICT",
        {
          status: 409,
        },
      );
    }

    const now = new Date();

    await installationResult.installationRef.update({
      status: "archived",
      archivedAt: now,
      updatedAt: now,
    });

    await adminDb.collection("analytics_events").add({
      eventType: "event_system_uninstalled",
      userId,
      installationId,
      campusId: CURRENT_CAMPUS_ID,
      timestamp: now.toISOString(),
      metadata: {
        reason: "user_initiated",
      },
    });

    return respond.success({ success: true });
  } catch (error) {
    logger.error(
      "Error uninstalling Event System at /api/tools/event-system",
      error instanceof Error ? error : new Error(String(error)),
    );
    return respond.error(
      "Failed to uninstall Event System",
      "INTERNAL_ERROR",
      { status: 500 },
    );
  }
});
