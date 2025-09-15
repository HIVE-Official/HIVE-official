import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser as _getCurrentUser } from '@/lib/auth/providers/auth-server';
import { logger } from "@/lib/logger";
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';

interface CalendarConflict {
  id: string;
  type: 'overlap' | 'double_booking' | 'travel_time' | 'preparation_time';
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
  createdAt: string;
}

interface TimeSlot {
  start: string;
  end: string;
  eventId?: string;
  title?: string;
  type?: string;
}

// Helper function to detect conflicts
function detectConflicts(events: any[], newEvent?: any): CalendarConflict[] {
  const conflicts: CalendarConflict[] = [];
  const allEvents = newEvent ? [...events, newEvent] : events;

  // Sort events by start time
  const sortedEvents = allEvents.sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  for (let i = 0; i < sortedEvents.length; i++) {
    for (let j = i + 1; j < sortedEvents.length; j++) {
      const event1 = sortedEvents[i];
      const event2 = sortedEvents[j];

      const start1 = new Date(event1.startDate);
      const end1 = new Date(event1.endDate);
      const start2 = new Date(event2.startDate);
      const end2 = new Date(event2.endDate);

      // Check for overlap
      if (start1 < end2 && start2 < end1) {
        // Determine conflict severity
        const overlapMinutes = Math.min(end1.getTime(), end2.getTime()) - Math.max(start1.getTime(), start2.getTime());
        const overlapHours = overlapMinutes / (1000 * 60 * 60);

        let severity: 'high' | 'medium' | 'low' = 'low';
        if (overlapHours >= 1) severity = 'high';
        else if (overlapHours >= 0.5) severity = 'medium';

        // Generate suggestions
        const suggestions = [];
        if (event1.type === 'personal' && event2.type === 'class') {
          suggestions.push({
            action: 'reschedule' as const,
            eventId: event1.id,
            newTime: new Date(end2.getTime() + 30 * 60 * 1000).toISOString() // 30 min after class ends
          });
        } else if (event1.type === 'class' && event2.type === 'personal') {
          suggestions.push({
            action: 'reschedule' as const,
            eventId: event2.id,
            newTime: new Date(end1.getTime() + 30 * 60 * 1000).toISOString()
          });
        } else {
          // For same priority events, suggest shortening the later one
          suggestions.push({
            action: 'shorten' as const,
            eventId: event2.id,
            newTime: end1.toISOString()
          });
        }

        conflicts.push({
          id: `conflict-${event1.id}-${event2.id}`,
          type: 'overlap',
          severity,
          eventIds: [event1.id, event2.id],
          description: `"${event1.title}" overlaps with "${event2.title}" for ${Math.round(overlapHours * 60)} minutes`,
          suggestion: severity === 'high' 
            ? 'This is a significant scheduling conflict that needs resolution'
            : 'Minor overlap detected - consider adjusting timing',
          suggestedActions: suggestions,
          createdAt: new Date().toISOString()
        });
      }

      // Check for travel time conflicts (same day, different locations)
      const timeBetween = start2.getTime() - end1.getTime();
      const timeBetweenMinutes = timeBetween / (1000 * 60);

      if (timeBetweenMinutes > 0 && timeBetweenMinutes < 15 && 
          event1.location && event2.location && 
          event1.location !== event2.location &&
          start1.toDateString() === start2.toDateString()) {
        
        conflicts.push({
          id: `travel-${event1.id}-${event2.id}`,
          type: 'travel_time',
          severity: timeBetweenMinutes < 5 ? 'high' : 'medium',
          eventIds: [event1.id, event2.id],
          description: `Only ${Math.round(timeBetweenMinutes)} minutes between "${event1.title}" and "${event2.title}" in different locations`,
          suggestion: 'Consider adding buffer time for travel between locations',
          suggestedActions: [{
            action: 'reschedule',
            eventId: event2.id,
            newTime: new Date(end1.getTime() + 20 * 60 * 1000).toISOString() // 20 min buffer
          }],
          createdAt: new Date().toISOString()
        });
      }
    }
  }

  return conflicts;
}

// Helper function to suggest optimal meeting times
function suggestOptimalTimes(events: any[], duration: number = 60): TimeSlot[] {
  const suggestions: TimeSlot[] = [];
  const today = new Date();
  const endOfWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Create time slots for the next 7 days, 9 AM to 6 PM
  for (let day = 0; day < 7; day++) {
    const currentDay = new Date(today.getTime() + day * 24 * 60 * 60 * 1000);
    
    for (let hour = 9; hour <= 17; hour++) {
      const slotStart = new Date(currentDay);
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(slotStart.getTime() + duration * 60 * 1000);

      // Check if this slot conflicts with any existing events
      const hasConflict = events.some(event => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        return slotStart < eventEnd && slotEnd > eventStart;
      });

      if (!hasConflict && suggestions.length < 5) {
        suggestions.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString()
        });
      }
    }
  }

  return suggestions;
}

// GET - Detect scheduling conflicts
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const { searchParams } = new URL(request.url);
    const includeNewEvent = searchParams.get('includeNewEvent');
    const suggestTimes = searchParams.get('suggestTimes') === 'true';

    // For development, get mock events from the events API
    const eventsResponse = await fetch(`${request.url.split('/conflicts')[0]}/events`, {
      headers: {
        'Authorization': request.headers.get('Authorization') || ''
      }
    });

    if (!eventsResponse.ok) {
      throw new Error('Failed to fetch events for conflict detection');
    }

    const eventsData = await eventsResponse.json();
    const events = eventsData.events || [];

    let newEvent = null;
    if (includeNewEvent) {
      try {
        newEvent = JSON.parse(includeNewEvent);
      } catch (e) {
        return NextResponse.json(
          { success: false, error: 'Invalid newEvent format' },
          { status: 400 }
        );
      }
    }

    // Detect conflicts
    const conflicts = detectConflicts(events, newEvent);

    // Generate optimal time suggestions if requested
    let suggestions: any[] = [];
    if (suggestTimes) {
      const duration = newEvent?.duration || 60; // Default 60 minutes
      suggestions = suggestOptimalTimes(events, duration);
    }

    return NextResponse.json({
      success: true,
      conflicts,
      suggestions,
      metadata: {
        eventCount: events.length,
        conflictCount: conflicts.length,
        highSeverityConflicts: conflicts.filter(c => c.severity === 'high').length,
        includedNewEvent: !!newEvent,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    logger.error('Error detecting calendar conflicts', { error, endpoint: '/api/profile/calendar/conflicts' });
    return NextResponse.json(
      { success: false, error: 'Failed to detect calendar conflicts' },
      { status: 500 }
    );
  }
}, {
  allowDevelopmentBypass: true,
  operation: 'detect_calendar_conflicts'
});

// POST - Resolve a specific conflict
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const body = await request.json();
    const { conflictId, resolution, eventId, newTime, newLocation } = body;

    if (!conflictId || !resolution) {
      return NextResponse.json(
        { success: false, error: 'Conflict ID and resolution are required' },
        { status: 400 }
      );
    }

    // Validate resolution type
    const validResolutions = ['reschedule', 'cancel', 'shorten', 'move_location', 'ignore'];
    if (!validResolutions.includes(resolution)) {
      return NextResponse.json(
        { success: false, error: 'Invalid resolution type' },
        { status: 400 }
      );
    }

    // For development, simulate conflict resolution
    if (process.env.NODE_ENV !== 'production') {
      let message = '';
      switch (resolution) {
        case 'reschedule':
          message = `Event ${eventId} rescheduled to ${newTime}`;
          break;
        case 'cancel':
          message = `Event ${eventId} cancelled`;
          break;
        case 'shorten':
          message = `Event ${eventId} shortened to end at ${newTime}`;
          break;
        case 'move_location':
          message = `Event ${eventId} moved to ${newLocation}`;
          break;
        case 'ignore':
          message = `Conflict ${conflictId} marked as ignored`;
          break;
      }

      return NextResponse.json({
        success: true,
        message,
        resolution: {
          conflictId,
          resolution,
          eventId,
          newTime,
          newLocation,
          resolvedAt: new Date().toISOString(),
          resolvedBy: userId
        }
      });
    }

    // Production implementation would update events in Firestore
    return NextResponse.json({
      success: true,
      message: 'Conflict resolved successfully'
    });

  } catch (error) {
    logger.error('Error resolving calendar conflict', { error, endpoint: '/api/profile/calendar/conflicts' });
    return NextResponse.json(
      { success: false, error: 'Failed to resolve calendar conflict' },
      { status: 500 }
    );
  }
}, {
  allowDevelopmentBypass: true,
  operation: 'resolve_calendar_conflict'
});