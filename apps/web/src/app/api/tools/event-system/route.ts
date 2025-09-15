import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { dbAdmin as adminDb } from "@/lib/firebase/admin/firebase-admin";
import { getCurrentUser } from "@/lib/auth/providers/auth-server";
import { logger } from "@/lib/utils/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";

// Event System Installation Schema
const EventSystemInstallationSchema = z.object({
  spaceId: z.string().optional(),
  isPersonal: z.boolean().default(false),
  configuration: z.object({
    defaultEventTypes: z.array(z.string()).default(['study_session', 'social_meetup']),
    calendarIntegration: z.boolean().default(true),
    notificationSettings: z.object({
      eventReminders: z.boolean().default(true),
      rsvpUpdates: z.boolean().default(true),
      checkInAlerts: z.boolean().default(false)
    }).default({}),
    spaceIntegration: z.object({
      enabled: z.boolean().default(true),
      autoAnnounce: z.boolean().default(true),
      requireApproval: z.boolean().default(false)
    }).default({}),
    memberPermissions: z.object({
      anyoneCanCreate: z.boolean().default(true),
      requireApproval: z.boolean().default(false),
      moderatorRoles: z.array(z.string()).default(['admin', 'moderator'])
    }).default({})
  }).default({})
});

// Event Creation Schema
const EventCreationSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000),
  date: z.string().datetime(),
  location: z.string().min(1).max(200),
  type: z.enum(['study_session', 'social_meetup', 'project_work', 'organization_meeting', 'campus_event', 'custom']),
  capacity: z.number().min(1).max(1000).optional(),
  isPublic: z.boolean().default(true),
  requiresRSVP: z.boolean().default(true),
  allowGuests: z.boolean().default(false),
  tags: z.array(z.string()).max(10).default([]),
  recurrence: z.object({
    type: z.enum(['none', 'daily', 'weekly', 'monthly']).default('none'),
    interval: z.number().min(1).default(1),
    endDate: z.string().datetime().optional()
  }).optional()
});

// GET /api/tools/event-system - Get Event System installations and data
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const spaceId = searchParams.get("spaceId");
    const includeEvents = searchParams.get("includeEvents") === "true";

    // Query for Event System installations
    let installationsQuery = adminDb
      .collection("event_system_installations")
      .where("userId", "==", user.uid);

    if (spaceId) {
      installationsQuery = installationsQuery.where("spaceId", "==", spaceId);
    }

    const installationsSnapshot = await installationsQuery.get();
    const installations = installationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const response: any = {
      installations,
      systemStatus: {
        totalInstallations: installations.length,
        personalInstallations: installations.filter((i: any) => i.isPersonal).length,
        spaceInstallations: installations.filter((i: any) => !i.isPersonal).length
      }
    };

    // Include events if requested
    if (includeEvents && installations.length > 0) {
      const eventsQuery = adminDb
        .collection("events")
        .where("organizerId", "==", user.uid)
        .where("createdVia", "==", "event-system")
        .orderBy("createdAt", "desc")
        .limit(50);

      const eventsSnapshot = await eventsQuery.get();
      response.recentEvents = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Get analytics data
      const analyticsQuery = adminDb
        .collection("event_analytics")
        .where("organizerId", "==", user.uid)
        .orderBy("date", "desc")
        .limit(30);

      const analyticsSnapshot = await analyticsQuery.get();
      const analytics = analyticsSnapshot.docs.map(doc => doc.data());

      if (analytics.length > 0) {
        response.analytics = {
          totalEvents: analytics.reduce((sum: number, a: any) => sum + (a.eventsCreated || 0), 0),
          totalAttendees: analytics.reduce((sum: number, a: any) => sum + (a.totalAttendees || 0), 0),
          averageAttendance: analytics.reduce((sum: number, a: any) => sum + (a.averageAttendance || 0), 0) / analytics.length,
          memberEngagement: analytics.reduce((sum: number, a: any) => sum + (a.memberEngagement || 0), 0) / analytics.length
        };
      }
    }

    return NextResponse.json(response);
  } catch (error) {
    logger.error('Error fetching Event System data', { error: error, endpoint: '/api/tools/event-system' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch Event System data", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// POST /api/tools/event-system - Install Event System or create event
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const action = body.action || 'install';

    if (action === 'install') {
      // Install Event System
      const validatedData = EventSystemInstallationSchema.parse(body);
      
      // Check if already installed
      let existingQuery = adminDb
        .collection("event_system_installations")
        .where("userId", "==", user.uid)
        .where("isPersonal", "==", validatedData.isPersonal);

      if (validatedData.spaceId) {
        existingQuery = existingQuery.where("spaceId", "==", validatedData.spaceId);
      }

      const existingSnapshot = await existingQuery.get();
      if (!existingSnapshot.empty) {
        return NextResponse.json(ApiResponseHelper.error("Event System already installed for this context", "UNKNOWN_ERROR"), { status: 409 });
      }

      // Verify space permissions if installing for a space
      if (validatedData.spaceId && !validatedData.isPersonal) {
        const spaceDoc = await adminDb
          .collection("spaces")
          .doc(validatedData.spaceId)
          .get();

        if (!spaceDoc.exists) {
          return NextResponse.json(ApiResponseHelper.error("Space not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
        }

        const spaceData = spaceDoc.data();
        const userRole = spaceData?.members?.[user.uid]?.role;

        if (!["admin", "moderator", "builder"].includes(userRole)) {
          return NextResponse.json(ApiResponseHelper.error("Insufficient permissions to install Event System in this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
        }
      }

      const now = new Date();
      const installation = {
        userId: user.uid,
        spaceId: validatedData.spaceId || null,
        isPersonal: validatedData.isPersonal,
        configuration: validatedData.configuration,
        installedComponents: [
          'event-creator',
          'rsvp-manager', 
          'check-in-system',
          'event-analytics',
          'feedback-collector'
        ],
        status: 'active',
        createdAt: now,
        updatedAt: now,
        version: '2.1.0'
      };

      const installationRef = await adminDb
        .collection("event_system_installations")
        .add(installation);

      // Initialize analytics tracking
      await adminDb.collection("event_analytics").add({
        installationId: installationRef.id,
        userId: user.uid,
        spaceId: validatedData.spaceId || null,
        date: now,
        eventsCreated: 0,
        totalAttendees: 0,
        averageAttendance: 0,
        memberEngagement: 0,
        systemHealth: {
          uptime: 100,
          errorRate: 0,
          performance: 'excellent'
        }
      });

      // Track installation event
      await adminDb.collection("analytics_events").add({
        eventType: "event_system_installed",
        userId: user.uid,
        installationId: installationRef.id,
        spaceId: validatedData.spaceId || null,
        isPersonal: validatedData.isPersonal,
        timestamp: now,
        metadata: {
          configuration: validatedData.configuration,
          version: '2.1.0'
        }
      });

      return NextResponse.json({
        ...installation,
        id: installationRef.id
      }, { status: HttpStatus.CREATED });

    } else if (action === 'create_event') {
      // Create event through Event System
      const eventData = EventCreationSchema.parse(body.eventData);
      const installationId = body.installationId;

      if (!installationId) {
        return NextResponse.json(ApiResponseHelper.error("Installation ID required for event creation", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
      }

      // Verify installation exists and user has access
      const installationDoc = await adminDb
        .collection("event_system_installations")
        .doc(installationId)
        .get();

      if (!installationDoc.exists) {
        return NextResponse.json(ApiResponseHelper.error("Event System installation not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
      }

      const installation = installationDoc.data();
      if (installation?.userId !== user.uid) {
        return NextResponse.json(ApiResponseHelper.error("Access denied to this Event System installation", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
      }

      const now = new Date();
      const event = {
        ...eventData,
        id: adminDb.collection("events").doc().id,
        organizerId: user.uid,
        installationId,
        spaceId: installation?.spaceId || null,
        createdVia: "event-system",
        status: "active",
        rsvpCount: 0,
        attendeeCount: 0,
        createdAt: now,
        updatedAt: now
      };

      // Save event
      await adminDb.collection("events").doc(event.id).set(event);

      // Initialize RSVP tracking if required
      if (eventData.requiresRSVP) {
        await adminDb.collection("event_rsvps").doc(event.id).set({
          eventId: event.id,
          responses: [],
          capacity: eventData.capacity || null,
          waitlist: [],
          settings: {
            allowGuests: eventData.allowGuests,
            requireApproval: false,
            deadline: null
          },
          createdAt: now,
          updatedAt: now
        });
      }

      // Update analytics
      const analyticsQuery = adminDb
        .collection("event_analytics")
        .where("installationId", "==", installationId)
        .orderBy("date", "desc")
        .limit(1);

      const analyticsSnapshot = await analyticsQuery.get();
      if (!analyticsSnapshot.empty) {
        const analyticsDoc = analyticsSnapshot.docs[0];
        await analyticsDoc.ref.update({
          eventsCreated: (analyticsDoc.data().eventsCreated || 0) + 1,
          updatedAt: now
        });
      }

      // Track event creation
      await adminDb.collection("analytics_events").add({
        eventType: "event_created",
        userId: user.uid,
        eventId: event.id,
        installationId,
        spaceId: installation?.spaceId || null,
        timestamp: now,
        metadata: {
          eventType: eventData.type,
          isPublic: eventData.isPublic,
          requiresRSVP: eventData.requiresRSVP,
          capacity: eventData.capacity
        }
      });

      return NextResponse.json(event, { status: HttpStatus.CREATED });
    }

    return NextResponse.json(ApiResponseHelper.error("Invalid action", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });

  } catch (error) {
    logger.error('Error in Event System API', { error: error, endpoint: '/api/tools/event-system' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: error.errors
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PUT /api/tools/event-system - Update Event System configuration
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const { installationId, configuration } = body;

    if (!installationId || !configuration) {
      return NextResponse.json(ApiResponseHelper.error("Installation ID and configuration required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Verify installation ownership
    const installationDoc = await adminDb
      .collection("event_system_installations")
      .doc(installationId)
      .get();

    if (!installationDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Installation not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const installation = installationDoc.data();
    if (installation?.userId !== user.uid) {
      return NextResponse.json(ApiResponseHelper.error("Access denied", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Validate and update configuration
    const validatedConfig = EventSystemInstallationSchema.shape.configuration.parse(configuration);
    
    await installationDoc.ref.update({
      configuration: validatedConfig,
      updatedAt: new Date()
    });

    // Track configuration update
    await adminDb.collection("analytics_events").add({
      eventType: "event_system_configured",
      userId: user.uid,
      installationId,
      timestamp: new Date(),
      metadata: {
        configuration: validatedConfig
      }
    });

    return NextResponse.json({
      success: true,
      configuration: validatedConfig
    });

  } catch (error) {
    logger.error('Error updating Event System configuration', { error: error, endpoint: '/api/tools/event-system' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid configuration data",
          details: error.errors
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Failed to update configuration", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// DELETE /api/tools/event-system - Uninstall Event System
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const installationId = searchParams.get("installationId");

    if (!installationId) {
      return NextResponse.json(ApiResponseHelper.error("Installation ID required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Verify installation ownership
    const installationDoc = await adminDb
      .collection("event_system_installations")
      .doc(installationId)
      .get();

    if (!installationDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Installation not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const installation = installationDoc.data();
    if (installation?.userId !== user.uid) {
      return NextResponse.json(ApiResponseHelper.error("Access denied", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Check for active events
    const activeEventsQuery = adminDb
      .collection("events")
      .where("installationId", "==", installationId)
      .where("status", "==", "active");

    const activeEventsSnapshot = await activeEventsQuery.get();
    if (!activeEventsSnapshot.empty) {
      return NextResponse.json(
        { 
          error: "Cannot uninstall Event System with active events",
          activeEvents: activeEventsSnapshot.docs.length
        },
        { status: 409 }
      );
    }

    // Archive the installation instead of deleting
    await installationDoc.ref.update({
      status: 'archived',
      archivedAt: new Date(),
      updatedAt: new Date()
    });

    // Track uninstallation
    await adminDb.collection("analytics_events").add({
      eventType: "event_system_uninstalled",
      userId: user.uid,
      installationId,
      timestamp: new Date(),
      metadata: {
        reason: "user_initiated"
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    logger.error('Error uninstalling Event System', { error: error, endpoint: '/api/tools/event-system' });
    return NextResponse.json(ApiResponseHelper.error("Failed to uninstall Event System", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}