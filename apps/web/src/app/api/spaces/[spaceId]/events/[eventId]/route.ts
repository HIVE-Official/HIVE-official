import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getAuthTokenFromRequest } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

const UpdateEventSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(2000).optional(),
  type: z.enum(['academic', 'social', 'recreational', 'cultural', 'meeting', 'virtual']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  location: z.string().optional(),
  virtualLink: z.string().url().optional(),
  maxAttendees: z.number().positive().optional(),
  rsvpDeadline: z.string().datetime().optional(),
  isRecurring: z.boolean().optional(),
  recurrenceRule: z.string().optional(),
  tags: z.array(z.string()).optional(),
  imageUrl: z.string().url().optional(),
  isFeatured: z.boolean().optional(),
  isPrivate: z.boolean().optional(),
  requiredRSVP: z.boolean().optional(),
  cost: z.number().nonnegative().optional(),
  currency: z.string().length(3).optional(),
  status: z.enum(['draft', 'published', 'ongoing', 'completed', 'cancelled']).optional(),
});

const db = dbAdmin;

// GET /api/spaces/[spaceId]/events/[eventId] - Get specific event
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string; eventId: string }> }
) {
  try {
    const { spaceId, eventId } = await params;
    
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Check if user is member of the space
    const memberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(decodedToken.uid)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get the event
    const eventDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("events")
      .doc(eventId)
      .get();

    if (!eventDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Event not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const eventData = eventDoc.data()!;

    // Get organizer info
    const organizerDoc = await db
      .collection("users")
      .doc(eventData.organizerId)
      .get();
    const organizer = organizerDoc.exists ? organizerDoc.data() : null;

    // Get RSVP count
    const rsvpSnapshot = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("events")
      .doc(eventId)
      .collection("rsvps")
      .where("status", "==", "going")
      .get();

    // Get user's RSVP status
    const userRsvpDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("events")
      .doc(eventId)
      .collection("rsvps")
      .doc(decodedToken.uid)
      .get();

    const userRsvpStatus = userRsvpDoc.exists ? userRsvpDoc.data()?.status : null;

    const event = {
      id: eventDoc.id,
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
      userRSVP: userRsvpStatus,
    };

    return NextResponse.json({ event });
  } catch (error) {
    logger.error('Error fetching event', { error: error, endpoint: '/api/spaces/[spaceId]/events/[eventId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch event", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PATCH /api/spaces/[spaceId]/events/[eventId] - Update event
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string; eventId: string }> }
) {
  try {
    const { spaceId, eventId } = await params;
    
    // Get auth header and verify token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Get the event to check permissions
    const eventDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("events")
      .doc(eventId)
      .get();

    if (!eventDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Event not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const eventData = eventDoc.data()!;

    // Check if user can edit this event
    const memberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(decodedToken.uid)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const memberRole = memberDoc.data()?.role;
    const canEditEvent = 
      eventData.organizerId === decodedToken.uid || // Event organizer
      ['owner', 'admin', 'moderator'].includes(memberRole); // Space leaders

    if (!canEditEvent) {
      return NextResponse.json(ApiResponseHelper.error("Insufficient permissions to edit this event", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const body = (await request.json()) as unknown;
    const validatedData = UpdateEventSchema.parse(body);

    // Validate dates if provided
    if (validatedData.startDate && validatedData.endDate) {
      const startDate = new Date(validatedData.startDate);
      const endDate = new Date(validatedData.endDate);
      
      if (endDate <= startDate) {
        return NextResponse.json(ApiResponseHelper.error("End date must be after start date", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
      }
    }

    // Prepare update data
    const updateData: any = {
      ...validatedData,
      updatedAt: new Date(),
      updatedBy: decodedToken.uid,
    };

    // Convert date strings to Date objects
    if (validatedData.startDate) {
      updateData.startDate = new Date(validatedData.startDate);
    }
    if (validatedData.endDate) {
      updateData.endDate = new Date(validatedData.endDate);
    }
    if (validatedData.rsvpDeadline) {
      updateData.rsvpDeadline = new Date(validatedData.rsvpDeadline);
    }

    // Update the event
    await db
      .collection("spaces")
      .doc(spaceId)
      .collection("events")
      .doc(eventId)
      .update(updateData);

    // Log the action
    await db
      .collection("spaces")
      .doc(spaceId)
      .collection("activity")
      .add({
        type: 'event_updated',
        performedBy: decodedToken.uid,
        targetEventId: eventId,
        details: {
          updatedFields: Object.keys(validatedData),
        },
        timestamp: new Date(),
      });

    logger.info(`Event updated: ${eventId} in space ${spaceId} by ${decodedToken.uid}`);

    return NextResponse.json(ApiResponseHelper.success({
      message: "Event updated successfully",
      eventId,
    }));

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid event data",
          details: error.errors,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error("Error updating event:", error);
    return NextResponse.json(ApiResponseHelper.error("Failed to update event", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// DELETE /api/spaces/[spaceId]/events/[eventId] - Delete event
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string; eventId: string }> }
) {
  try {
    const { spaceId, eventId } = await params;
    
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Get the event to check permissions
    const eventDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("events")
      .doc(eventId)
      .get();

    if (!eventDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Event not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const eventData = eventDoc.data()!;

    // Check if user can delete this event
    const memberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(decodedToken.uid)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const memberRole = memberDoc.data()?.role;
    const canDeleteEvent = 
      eventData.organizerId === decodedToken.uid || // Event organizer
      ['owner', 'admin'].includes(memberRole); // Space owners and admins only

    if (!canDeleteEvent) {
      return NextResponse.json(ApiResponseHelper.error("Insufficient permissions to delete this event", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Delete all RSVPs for this event
    const rsvpSnapshot = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("events")
      .doc(eventId)
      .collection("rsvps")
      .get();

    const batch = db.batch();
    rsvpSnapshot.docs.forEach((doc: any) => {
      batch.delete(doc.ref);
    });

    // Delete the event
    const eventRef = db
      .collection("spaces")
      .doc(spaceId)
      .collection("events")
      .doc(eventId);
    
    batch.delete(eventRef);

    // Commit the batch
    await batch.commit();

    // Log the action
    await db
      .collection("spaces")
      .doc(spaceId)
      .collection("activity")
      .add({
        type: 'event_deleted',
        performedBy: decodedToken.uid,
        targetEventId: eventId,
        details: {
          eventTitle: eventData.title,
          eventType: eventData.type,
        },
        timestamp: new Date(),
      });

    logger.info(`Event deleted: ${eventId} from space ${spaceId} by ${decodedToken.uid}`);

    return NextResponse.json(ApiResponseHelper.success({
      message: "Event deleted successfully",
    }));

  } catch (error: any) {
    logger.error("Error deleting event:", error);
    return NextResponse.json(ApiResponseHelper.error("Failed to delete event", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}