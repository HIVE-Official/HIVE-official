import { withAuthAndErrors, withAuthValidationAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware/index";
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/structured-logger";
import { z } from 'zod';
import * as admin from 'firebase-admin';

// Validation schemas
const createEventSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  startDate: z.string(), // ISO string
  endDate: z.string(), // ISO string
  type: z.enum(['personal', 'space', 'class', 'study', 'meeting']),
  location: z.string().max(200).optional(),
  spaceId: z.string().optional(),
  spaceName: z.string().optional(),
});

const updateEventSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  type: z.enum(['personal', 'space', 'class', 'study', 'meeting']).optional(),
  location: z.string().max(200).optional(),
  status: z.enum(['confirmed', 'tentative', 'cancelled']).optional(),
});

/**
 * Get calendar events
 * GET /api/profile/calendar/events
 *
 * Query params:
 * - startDate: ISO string
 * - endDate: ISO string
 */
export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  try {
    // Development mode mock data
    if (userId === 'dev-user-1' || userId === 'test-user' || userId === 'dev_user_123' || userId === 'debug-user') {
      const now = new Date();
      return respond.success({
        events: [
          {
            id: 'event-1',
            title: 'CS 370 Study Session',
            description: 'Midterm review with the study group',
            startDate: new Date(now.getTime() + 86400000).toISOString(),
            endDate: new Date(now.getTime() + 93600000).toISOString(),
            type: 'study',
            location: 'Lockwood Library Room 201',
            spaceId: 'cs-370',
            spaceName: 'CS 370 Study Group',
            status: 'confirmed',
          },
          {
            id: 'event-2',
            title: 'Office Hours - Prof. Smith',
            description: 'Discuss project feedback',
            startDate: new Date(now.getTime() + 172800000).toISOString(),
            endDate: new Date(now.getTime() + 176400000).toISOString(),
            type: 'meeting',
            location: 'Davis Hall 338',
            status: 'confirmed',
          },
          {
            id: 'event-3',
            title: 'Personal Study Time',
            description: 'Focus on algorithms practice',
            startDate: new Date(now.getTime() + 259200000).toISOString(),
            endDate: new Date(now.getTime() + 266400000).toISOString(),
            type: 'personal',
            location: 'Home',
            status: 'tentative',
          },
        ],
      });
    }

    // Build query for user's calendar events
    let query = dbAdmin
      .collection('users')
      .doc(userId)
      .collection('calendar_events')
      .orderBy('startDate', 'asc');

    if (startDate) {
      query = query.where('startDate', '>=', startDate);
    }
    if (endDate) {
      query = query.where('endDate', '<=', endDate);
    }

    const eventsSnapshot = await query.limit(50).get();

    const events = eventsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });

    return respond.success({ events });
  } catch (error) {
    logger.error(
      `Failed to fetch calendar events for user ${userId}`,
      error instanceof Error ? error : new Error(String(error))
    );
    return respond.error(
      'Failed to fetch calendar events',
      'INTERNAL_ERROR',
      { status: 500 }
    );
  }
});

/**
 * Create a calendar event
 * POST /api/profile/calendar/events
 */
export const POST = withAuthValidationAndErrors(
  createEventSchema,
  async (request: AuthenticatedRequest, context, eventData: z.infer<typeof createEventSchema>, respond) => {
    const userId = getUserId(request);

    try {
      // Development mode
      if (userId === 'dev-user-1' || userId === 'test-user' || userId === 'dev_user_123' || userId === 'debug-user') {
        const mockEvent = {
          id: `event-${Date.now()}`,
          ...eventData,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
          createdBy: userId,
        };

        logger.info(`Development mode event created: ${mockEvent.id}`);
        return respond.success({ event: mockEvent });
      }

      // Validate date range
      const start = new Date(eventData.startDate);
      const end = new Date(eventData.endDate);
      if (end <= start) {
        return respond.error('End date must be after start date', 'VALIDATION_ERROR', { status: 400 });
      }

      // Create event in Firestore
      const eventRef = dbAdmin
        .collection('users')
        .doc(userId)
        .collection('calendar_events')
        .doc();

      const event = {
        ...eventData,
        status: 'confirmed',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        createdBy: userId,
      };

      await eventRef.set(event);

      return respond.success({
        event: {
          id: eventRef.id,
          ...eventData,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
          createdBy: userId,
        },
      });
    } catch (error) {
      logger.error(
        `Failed to create calendar event for user ${userId}`,
        error instanceof Error ? error : new Error(String(error))
      );
      return respond.error(
        'Failed to create calendar event',
        'INTERNAL_ERROR',
        { status: 500 }
      );
    }
  }
);

/**
 * Update a calendar event
 * PUT /api/profile/calendar/events
 */
export const PUT = withAuthValidationAndErrors(
  updateEventSchema,
  async (request: AuthenticatedRequest, context, updateData: z.infer<typeof updateEventSchema>, respond) => {
    const userId = getUserId(request);
    const { id, ...updates } = updateData;

    try {
      // Development mode
      if (userId === 'dev-user-1' || userId === 'test-user' || userId === 'dev_user_123' || userId === 'debug-user') {
        logger.info('Development mode event updated', { id, updateFields: Object.keys(updates) });
        return respond.success({ message: 'Event updated successfully' });
      }

      // Validate date range if both dates are provided
      if (updates.startDate && updates.endDate) {
        const start = new Date(updates.startDate);
        const end = new Date(updates.endDate);
        if (end <= start) {
          return respond.error('End date must be after start date', 'VALIDATION_ERROR', { status: 400 });
        }
      }

      // Update event in Firestore
      const eventRef = dbAdmin
        .collection('users')
        .doc(userId)
        .collection('calendar_events')
        .doc(id);

      const eventDoc = await eventRef.get();
      if (!eventDoc.exists) {
        return respond.error('Event not found', 'RESOURCE_NOT_FOUND', { status: 404 });
      }

      await eventRef.update({
        ...updates,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return respond.success({ message: 'Event updated successfully' });
    } catch (error) {
      logger.error('Failed to update calendar event', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId,
        eventId: id,
      });
      return respond.error(
        'Failed to update calendar event',
        'INTERNAL_ERROR',
        { status: 500 }
      );
    }
  }
);

/**
 * Delete a calendar event
 * DELETE /api/profile/calendar/events
 *
 * Query params:
 * - id: event ID
 */
export const DELETE = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get('id');

  if (!eventId) {
    return respond.error('Event ID is required', 'VALIDATION_ERROR', { status: 400 });
  }

  try {
    // Development mode
    if (userId === 'dev-user-1' || userId === 'test-user' || userId === 'dev_user_123' || userId === 'debug-user') {
      logger.info('Development mode event deleted', { eventId });
      return respond.success({ message: 'Event deleted successfully' });
    }

    // Delete event from Firestore
    const eventRef = dbAdmin
      .collection('users')
      .doc(userId)
      .collection('calendar_events')
      .doc(eventId);

    const eventDoc = await eventRef.get();
    if (!eventDoc.exists) {
      return respond.error('Event not found', 'RESOURCE_NOT_FOUND', { status: 404 });
    }

    await eventRef.delete();

    return respond.success({ message: 'Event deleted successfully' });
  } catch (error) {
    logger.error('Failed to delete calendar event', {
      error: error instanceof Error ? error.message : 'Unknown error',
      userId,
      eventId,
    });
    return respond.error(
      'Failed to delete calendar event',
      'INTERNAL_ERROR',
      { status: 500 }
    );
  }
});