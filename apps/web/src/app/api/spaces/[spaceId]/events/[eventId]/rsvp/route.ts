import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

const RSVPSchema = z.object({
  status: z.enum(['going', 'maybe', 'not_going']) });

const db = dbAdmin;

// POST /api/spaces/[spaceId]/events/[eventId]/rsvp - RSVP to an event
export async function POST(
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

    // Check if event exists
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

    // Check if RSVP deadline has passed
    if (eventData.rsvpDeadline && new Date() > eventData.rsvpDeadline.toDate()) {
      return NextResponse.json(ApiResponseHelper.error("RSVP deadline has passed", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    const body = (await request.json()) as unknown;
    const { status } = RSVPSchema.parse(body);

    // Check if event is at capacity for 'going' status
    if (status === 'going' && eventData.maxAttendees) {
      const currentRsvpSnapshot = await db
        .collection("spaces")
        .doc(spaceId)
        .collection("events")
        .doc(eventId)
        .collection("rsvps")
        .where("status", "==", "going")
        .get();

      if (currentRsvpSnapshot.size >= eventData.maxAttendees) {
        return NextResponse.json(ApiResponseHelper.error("Event is at full capacity", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
      }
    }

    // Create or update RSVP
    const rsvpData = {
      userId: decodedToken.uid,
      eventId,
      spaceId,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db
      .collection("spaces")
      .doc(spaceId)
      .collection("events")
      .doc(eventId)
      .collection("rsvps")
      .doc(decodedToken.uid)
      .set(rsvpData, { merge: true });

    // Get updated attendee count
    const updatedRsvpSnapshot = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("events")
      .doc(eventId)
      .collection("rsvps")
      .where("status", "==", "going")
      .get();

    return NextResponse.json({
      success: true,
      rsvp: rsvpData,
      currentAttendees: updatedRsvpSnapshot.size });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid RSVP data",
          details: error.errors,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error(
      `Error creating RSVP at /api/spaces/[spaceId]/events/[eventId]/rsvp`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to RSVP to event", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// GET /api/spaces/[spaceId]/events/[eventId]/rsvp - Get user's RSVP status
export async function GET(
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

    // Get user's RSVP
    const rsvpDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("events")
      .doc(eventId)
      .collection("rsvps")
      .doc(decodedToken.uid)
      .get();

    const rsvpStatus = rsvpDoc.exists ? rsvpDoc.data()?.status : null;

    return NextResponse.json({
      userRSVP: rsvpStatus });
  } catch (error) {
    logger.error(
      `Error fetching RSVP status at /api/spaces/[spaceId]/events/[eventId]/rsvp`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch RSVP status", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}