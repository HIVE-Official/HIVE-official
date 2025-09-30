import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getAuthTokenFromRequest } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

const GetEventsSchema = z.object({
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0),
  type: z.enum(['academic', 'social', 'recreational', 'cultural', 'meeting', 'virtual']).optional(),
  upcoming: z.coerce.boolean().default(true) });

const CreateEventSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  type: z.enum(['academic', 'social', 'recreational', 'cultural', 'meeting', 'virtual']),
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
  currency: z.string().length(3).optional() });

const db = dbAdmin;

// GET /api/spaces/[spaceId]/events - Get events for a space
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;
    
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    const { searchParams } = new URL(request.url);
    const { limit, offset, type, upcoming } = GetEventsSchema.parse(
      Object.fromEntries(searchParams.entries())
    );

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

    // Build query for events
    let query = db
      .collection("spaces")
      .doc(spaceId)
      .collection("events")
      .orderBy("startDate", "asc");

    // Filter by upcoming/past events
    if (upcoming) {
      query = query.where("startDate", ">=", new Date());
    } else {
      query = query.where("startDate", "<", new Date());
    }

    // Filter by event type
    if (type) {
      query = query.where("type", "==", type);
    }

    // Apply pagination
    query = query.offset(offset).limit(limit);

    const eventsSnapshot = await query.get();

    const events = [];

    // Process events
    for (const doc of eventsSnapshot.docs) {
      const eventData = doc.data();

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
        .doc(doc.id)
        .collection("rsvps")
        .where("status", "==", "going")
        .get();

      // Get user's RSVP status
      const userRsvpDoc = await db
        .collection("spaces")
        .doc(spaceId)
        .collection("events")
        .doc(doc.id)
        .collection("rsvps")
        .doc(decodedToken.uid)
        .get();

      const userRsvpStatus = userRsvpDoc.exists 
        ? userRsvpDoc.data()?.status 
        : null;

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
        userRSVP: userRsvpStatus });
    }

    return NextResponse.json({
      events,
      hasMore: eventsSnapshot.size === limit,
      pagination: {
        limit,
        offset,
        nextOffset: eventsSnapshot.size === limit ? offset + limit : null,
      } });
  } catch (error) {
    logger.error(
      `Error fetching events at /api/spaces/[spaceId]/events`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch events", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// POST /api/spaces/[spaceId]/events - Create a new event
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;
    
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

    const body = (await request.json()) as unknown;
    const validatedData = CreateEventSchema.parse(body);

    // Validate dates
    const startDate = new Date(validatedData.startDate);
    const endDate = new Date(validatedData.endDate);
    
    if (endDate <= startDate) {
      return NextResponse.json(ApiResponseHelper.error("End date must be after start date", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Create event document
    const eventData = {
      ...validatedData,
      startDate,
      endDate,
      rsvpDeadline: validatedData.rsvpDeadline ? new Date(validatedData.rsvpDeadline) : null,
      organizerId: decodedToken.uid,
      spaceId: spaceId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const eventRef = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("events")
      .add(eventData);

    // Get the created event with organizer info
    const organizerDoc = await dbAdmin.collection("users").doc(decodedToken.uid).get();
    const organizer = organizerDoc.data();

    const createdEvent = {
      id: eventRef.id,
      ...eventData,
      organizer: {
        id: decodedToken.uid,
        fullName: organizer?.fullName || "Unknown User",
        handle: organizer?.handle || "unknown",
        photoURL: organizer?.photoURL || null,
      },
      currentAttendees: 0,
      userRSVP: null,
    };

    return NextResponse.json({ event: createdEvent }, { status: HttpStatus.CREATED });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid event data",
          details: error.errors,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error(
      `Error creating event at /api/spaces/[spaceId]/events`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to create event", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}