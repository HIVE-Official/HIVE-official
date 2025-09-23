import { withAuthAndErrors, withAuthValidationAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware/index";
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/structured-logger";
import { z } from 'zod';

// Validation schema for conflict resolution
const resolveConflictSchema = z.object({
  conflictId: z.string(),
  resolution: z.string(),
  eventId: z.string().optional(),
  newTime: z.string().optional(), // ISO string
});

interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  location?: string;
}

interface CalendarConflict {
  id: string;
  type: 'overlap' | 'double_booking' | 'travel_time';
  severity: 'high' | 'medium' | 'low';
  eventIds: string[];
  description: string;
  suggestion: string;
  suggestedActions: Array<{
    action: 'reschedule' | 'cancel' | 'shorten' | 'move_location';
    eventId: string;
    newTime?: string;
    newLocation?: string;
  }>;
}

/**
 * Detect calendar conflicts
 * GET /api/profile/calendar/conflicts
 *
 * Query params:
 * - includeNewEvent: JSON string of new event to check for conflicts
 * - suggestTimes: boolean - whether to suggest alternative times
 */
export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);
  const { searchParams } = new URL(request.url);
  const includeNewEventStr = searchParams.get('includeNewEvent');
  const suggestTimes = searchParams.get('suggestTimes') === 'true';

  try {
    // Development mode mock data
    if (userId === 'dev-user-1' || userId === 'test-user' || userId === 'dev_user_123' || userId === 'debug-user') {
      const mockConflicts: CalendarConflict[] = [
        {
          id: 'conflict-1',
          type: 'overlap',
          severity: 'high',
          eventIds: ['event-1', 'event-2'],
          description: 'CS 370 Study Session overlaps with Office Hours',
          suggestion: 'Consider rescheduling one of these events',
          suggestedActions: [
            {
              action: 'reschedule',
              eventId: 'event-2',
              newTime: new Date(Date.now() + 259200000).toISOString(),
            },
            {
              action: 'shorten',
              eventId: 'event-1',
              newTime: new Date(Date.now() + 90000000).toISOString(),
            },
          ],
        },
        {
          id: 'conflict-2',
          type: 'travel_time',
          severity: 'medium',
          eventIds: ['event-3', 'event-4'],
          description: 'Not enough time to travel between Davis Hall and Student Union',
          suggestion: 'Allow at least 15 minutes between events in different buildings',
          suggestedActions: [
            {
              action: 'reschedule',
              eventId: 'event-4',
              newTime: new Date(Date.now() + 345600000).toISOString(),
            },
            {
              action: 'move_location',
              eventId: 'event-3',
              newLocation: 'Online',
            },
          ],
        },
      ];

      // If checking a new event, add a mock conflict for it
      if (includeNewEventStr) {
        try {
          const newEvent = JSON.parse(includeNewEventStr);
          mockConflicts.push({
            id: 'conflict-new',
            type: 'double_booking',
            severity: 'high',
            eventIds: ['event-1', 'new-event'],
            description: `"${newEvent.title}" conflicts with existing event`,
            suggestion: 'Choose a different time slot',
            suggestedActions: suggestTimes ? [
              {
                action: 'reschedule',
                eventId: 'new-event',
                newTime: new Date(Date.now() + 432000000).toISOString(),
              },
            ] : [],
          });
        } catch (e) {
          // Ignore JSON parse errors
        }
      }

      return respond.success({ conflicts: mockConflicts });
    }

    // Get user's existing events
    const eventsSnapshot = await dbAdmin
      .collection('users')
      .doc(userId)
      .collection('calendar_events')
      .where('status', '!=', 'cancelled')
      .orderBy('status')
      .orderBy('startDate')
      .get();

    const events: CalendarEvent[] = eventsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as CalendarEvent));

    // Parse new event if provided
    let newEvent: Partial<CalendarEvent> | null = null;
    if (includeNewEventStr) {
      try {
        newEvent = JSON.parse(includeNewEventStr);
      } catch (error) {
        return respond.error('Invalid new event format', 'VALIDATION_ERROR', { status: 400 });
      }
    }

    // Detect conflicts
    const conflicts: CalendarConflict[] = [];

    // Check for overlaps between existing events
    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        const event1 = events[i];
        const event2 = events[j];

        const start1 = new Date(event1.startDate).getTime();
        const end1 = new Date(event1.endDate).getTime();
        const start2 = new Date(event2.startDate).getTime();
        const end2 = new Date(event2.endDate).getTime();

        // Check for overlap
        if ((start1 < end2 && end1 > start2)) {
          conflicts.push({
            id: `conflict-${event1.id}-${event2.id}`,
            type: 'overlap',
            severity: 'high',
            eventIds: [event1.id, event2.id],
            description: `"${event1.title}" overlaps with "${event2.title}"`,
            suggestion: 'Reschedule one of these events',
            suggestedActions: suggestTimes ? [
              {
                action: 'reschedule',
                eventId: event2.id,
                newTime: new Date(end1 + 900000).toISOString(), // 15 mins after first event
              },
            ] : [],
          });
        }

        // Check for insufficient travel time (if locations differ)
        if (event1.location && event2.location && event1.location !== event2.location) {
          const gap = Math.abs(start2 - end1);
          const fifteenMinutes = 900000;

          if (gap < fifteenMinutes && gap > 0) {
            conflicts.push({
              id: `travel-${event1.id}-${event2.id}`,
              type: 'travel_time',
              severity: 'medium',
              eventIds: [event1.id, event2.id],
              description: `Not enough time to travel between "${event1.location}" and "${event2.location}"`,
              suggestion: 'Allow at least 15 minutes between events in different locations',
              suggestedActions: [
                {
                  action: 'reschedule',
                  eventId: event2.id,
                  newTime: new Date(end1 + fifteenMinutes).toISOString(),
                },
              ],
            });
          }
        }
      }
    }

    // Check new event against existing events
    if (newEvent && newEvent.startDate && newEvent.endDate) {
      const newStart = new Date(newEvent.startDate).getTime();
      const newEnd = new Date(newEvent.endDate).getTime();

      for (const event of events) {
        const start = new Date(event.startDate).getTime();
        const end = new Date(event.endDate).getTime();

        if ((newStart < end && newEnd > start)) {
          conflicts.push({
            id: `new-conflict-${event.id}`,
            type: 'double_booking',
            severity: 'high',
            eventIds: [event.id, 'new-event'],
            description: `New event "${newEvent.title}" conflicts with "${event.title}"`,
            suggestion: 'Choose a different time for the new event',
            suggestedActions: suggestTimes ? [
              {
                action: 'reschedule',
                eventId: 'new-event',
                newTime: new Date(end + 900000).toISOString(),
              },
            ] : [],
          });
        }
      }
    }

    return respond.success({ conflicts });
  } catch (error) {
    logger.error('Failed to detect calendar conflicts', {
      error: error instanceof Error ? error.message : 'Unknown error',
      userId,
    });
    return respond.error(
      'Failed to detect calendar conflicts',
      'INTERNAL_ERROR',
      { status: 500 }
    );
  }
});

/**
 * Resolve a calendar conflict
 * POST /api/profile/calendar/conflicts
 */
export const POST = withAuthValidationAndErrors(
  resolveConflictSchema,
  async (request: AuthenticatedRequest, context, data: z.infer<typeof resolveConflictSchema>, respond) => {
    const userId = getUserId(request);
    const { conflictId, resolution, eventId, newTime } = data;

    try {
      // Development mode
      if (userId === 'dev-user-1' || userId === 'test-user' || userId === 'dev_user_123' || userId === 'debug-user') {
        logger.info('Development mode conflict resolved', {
          conflictId,
          resolution,
          eventId,
          newTime,
        });
        return respond.success({ message: 'Conflict resolved successfully' });
      }

      // In production, this would implement actual conflict resolution logic
      // For now, we'll just log the resolution attempt
      logger.info('Conflict resolution attempted', {
        userId,
        conflictId,
        resolution,
        eventId,
        newTime,
      });

      // If an event reschedule was requested, update the event
      if (eventId && newTime && resolution === 'reschedule') {
        const eventRef = dbAdmin
          .collection('users')
          .doc(userId)
          .collection('calendar_events')
          .doc(eventId);

        const eventDoc = await eventRef.get();
        if (eventDoc.exists) {
          // Calculate new end time based on original duration
          const originalData = eventDoc.data();
          if (originalData) {
            const originalDuration = new Date(originalData.endDate).getTime() - new Date(originalData.startDate).getTime();
            const newStartTime = new Date(newTime);
            const newEndTime = new Date(newStartTime.getTime() + originalDuration);

            await eventRef.update({
              startDate: newStartTime.toISOString(),
              endDate: newEndTime.toISOString(),
              updatedAt: new Date().toISOString(),
              conflictResolved: true,
              conflictResolutionId: conflictId,
            });
          }
        }
      }

      return respond.success({ message: 'Conflict resolved successfully' });
    } catch (error) {
      logger.error('Failed to resolve calendar conflict', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId,
        conflictId,
      });
      return respond.error(
        'Failed to resolve calendar conflict',
        'INTERNAL_ERROR',
        { status: 500 }
      );
    }
  }
);