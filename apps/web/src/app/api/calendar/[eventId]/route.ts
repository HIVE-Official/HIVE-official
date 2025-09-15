import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";

// GET - Fetch specific personal event
export async function GET(request: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { eventId } = await params;
    const eventDoc = await dbAdmin.collection('personalEvents').doc(eventId).get();

    if (!eventDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Event not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const eventData = eventDoc.data();
    
    if (!eventData) {
      return NextResponse.json(ApiResponseHelper.error("Event data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }
    
    // Check if user owns this event
    if (eventData.userId !== user.uid) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const event = {
      id: eventDoc.id,
      ...eventData,
      type: 'personal' as const,
      canEdit: true
    };

    return NextResponse.json({ event });
  } catch (error) {
    logger.error('Error fetching personal event', { error: error, endpoint: '/api/calendar/[eventId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch personal event", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PUT - Update personal event
export async function PUT(request: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { eventId } = await params;
    const body = await request.json();
    const { title, description, startDate, endDate, location, isAllDay, reminderMinutes } = body;

    // Validate required fields
    if (!title || !startDate || !endDate) {
      return NextResponse.json(ApiResponseHelper.error("Missing required fields", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) {
      return NextResponse.json(ApiResponseHelper.error("End date must be after start date", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    const eventDoc = await dbAdmin.collection('personalEvents').doc(eventId).get();
    if (!eventDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Event not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const eventData = eventDoc.data();
    
    if (!eventData) {
      return NextResponse.json(ApiResponseHelper.error("Event data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }
    
    // Check if user owns this event
    if (eventData.userId !== user.uid) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const updateData = {
      title,
      description: description || '',
      startDate,
      endDate,
      location: location || '',
      isAllDay: isAllDay || false,
      reminderMinutes: reminderMinutes || 0,
      updatedAt: new Date().toISOString()
    };

    await dbAdmin.collection('personalEvents').doc(eventId).update(updateData);

    const updatedEvent = {
      id: eventId,
      ...eventData,
      ...updateData,
      type: 'personal' as const,
      canEdit: true
    };

    return NextResponse.json({ event: updatedEvent });
  } catch (error) {
    logger.error('Error updating personal event', { error: error, endpoint: '/api/calendar/[eventId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to update personal event", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PATCH - Partially update personal event
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { eventId } = await params;
    const body = await request.json();

    const eventDoc = await dbAdmin.collection('personalEvents').doc(eventId).get();
    if (!eventDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Event not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const eventData = eventDoc.data();
    
    if (!eventData) {
      return NextResponse.json(ApiResponseHelper.error("Event data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }
    
    // Check if user owns this event
    if (eventData.userId !== user.uid) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Validate dates if provided
    if (body.startDate && body.endDate) {
      const start = new Date(body.startDate);
      const end = new Date(body.endDate);
      if (start >= end) {
        return NextResponse.json(ApiResponseHelper.error("End date must be after start date", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
      }
    }

    // Build update data with only provided fields
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };
    
    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description || '';
    if (body.startDate !== undefined) updateData.startDate = body.startDate;
    if (body.endDate !== undefined) updateData.endDate = body.endDate;
    if (body.location !== undefined) updateData.location = body.location || '';
    if (body.isAllDay !== undefined) updateData.isAllDay = body.isAllDay;
    if (body.reminderMinutes !== undefined) updateData.reminderMinutes = body.reminderMinutes;

    await dbAdmin.collection('personalEvents').doc(eventId).update(updateData);

    const updatedEvent = {
      id: eventId,
      ...eventData,
      ...updateData,
      type: 'personal' as const,
      canEdit: true
    };

    return NextResponse.json({ event: updatedEvent });
  } catch (error) {
    logger.error('Error partially updating personal event', { error: error, endpoint: '/api/calendar/[eventId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to update personal event", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// DELETE - Delete personal event
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { eventId } = await params;
    const eventDoc = await dbAdmin.collection('personalEvents').doc(eventId).get();

    if (!eventDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Event not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const eventData = eventDoc.data();
    
    if (!eventData) {
      return NextResponse.json(ApiResponseHelper.error("Event data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }
    
    // Check if user owns this event
    if (eventData.userId !== user.uid) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    await dbAdmin.collection('personalEvents').doc(eventId).delete();

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    logger.error('Error deleting personal event', { error: error, endpoint: '/api/calendar/[eventId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to delete personal event", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}