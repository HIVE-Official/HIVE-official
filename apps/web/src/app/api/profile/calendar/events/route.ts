import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '../../../../../lib/auth-server';
import { logger } from "@/lib/logger";
import { withAuth } from '@/lib/api-auth-middleware';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  type: 'personal' | 'space' | 'class' | 'study' | 'meeting';
  location?: string;
  spaceId?: string;
  spaceName?: string;
  attendees?: string[];
  isRecurring?: boolean;
  recurringPattern?: string;
  status: 'confirmed' | 'tentative' | 'cancelled';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// GET - Fetch user's calendar events
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const type = searchParams.get('type');

    // For development, return mock data
    if (process.env.NODE_ENV !== 'production') {
      const mockEvents: CalendarEvent[] = [
        {
          id: 'event-1',
          title: 'CS 350 Lecture',
          description: 'Data Structures and Algorithms',
          startDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(Date.now() + 3.5 * 60 * 60 * 1000).toISOString(),
          type: 'class',
          location: 'Engineering Hall 101',
          status: 'confirmed',
          createdBy: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'event-2',
          title: 'Study Group',
          description: 'CS 350 study session',
          startDate: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          type: 'study',
          location: 'Library Room 204',
          status: 'confirmed',
          createdBy: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'event-3',
          title: 'HIVE Builder Meetup',
          description: 'Weekly builder community meeting',
          startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(Date.now() + 25.5 * 60 * 60 * 1000).toISOString(),
          type: 'space',
          location: 'Student Union 301',
          spaceId: 'hive-builders',
          spaceName: 'HIVE Builders',
          status: 'confirmed',
          createdBy: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      // Filter by date range if provided
      let filteredEvents = mockEvents;
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        filteredEvents = mockEvents.filter(event => {
          const eventStart = new Date(event.startDate);
          return eventStart >= start && eventStart <= end;
        });
      }

      // Filter by type if provided
      if (type) {
        filteredEvents = filteredEvents.filter(event => event.type === type);
      }

      return NextResponse.json({
        success: true,
        events: filteredEvents,
        metadata: {
          count: filteredEvents.length,
          timeRange: { startDate, endDate },
          type
        }
      });
    }

    // Production implementation would query Firestore
    // TODO: Implement Firestore queries for calendar events
    return NextResponse.json({
      success: true,
      events: [],
      metadata: { count: 0 }
    });

  } catch (error) {
    logger.error('Error fetching calendar events', { error, endpoint: '/api/profile/calendar/events' });
    return NextResponse.json(
      { success: false, error: 'Failed to fetch calendar events' },
      { status: 500 }
    );
  }
}, {
  allowDevelopmentBypass: true,
  operation: 'get_calendar_events'
});

// POST - Create new calendar event
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const body = await request.json();

    // Validate required fields
    const { title, startDate, endDate, type } = body;
    if (!title || !startDate || !endDate || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, startDate, endDate, type' },
        { status: 400 }
      );
    }

    // Validate date format
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { success: false, error: 'Invalid date format' },
        { status: 400 }
      );
    }

    if (start >= end) {
      return NextResponse.json(
        { success: false, error: 'Start date must be before end date' },
        { status: 400 }
      );
    }

    // Create event object
    const newEvent: CalendarEvent = {
      id: `event-${Date.now()}`, // In production, use proper UUID
      title,
      description: body.description || '',
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      type: body.type,
      location: body.location || '',
      spaceId: body.spaceId,
      spaceName: body.spaceName,
      attendees: body.attendees || [],
      isRecurring: body.isRecurring || false,
      recurringPattern: body.recurringPattern,
      status: 'confirmed',
      createdBy: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // For development, simulate creation
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json({
        success: true,
        event: newEvent,
        message: 'Event created successfully'
      }, { status: 201 });
    }

    // Production implementation would save to Firestore
    // TODO: Implement Firestore save for calendar events
    return NextResponse.json({
      success: true,
      event: newEvent,
      message: 'Event created successfully'
    }, { status: 201 });

  } catch (error) {
    logger.error('Error creating calendar event', { error, endpoint: '/api/profile/calendar/events' });
    return NextResponse.json(
      { success: false, error: 'Failed to create calendar event' },
      { status: 500 }
    );
  }
}, {
  allowDevelopmentBypass: true,
  operation: 'create_calendar_event'
});

// PUT - Update existing calendar event
export const PUT = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Validate dates if provided
    if (updates.startDate || updates.endDate) {
      const start = new Date(updates.startDate);
      const end = new Date(updates.endDate);
      
      if (updates.startDate && isNaN(start.getTime())) {
        return NextResponse.json(
          { success: false, error: 'Invalid start date format' },
          { status: 400 }
        );
      }
      
      if (updates.endDate && isNaN(end.getTime())) {
        return NextResponse.json(
          { success: false, error: 'Invalid end date format' },
          { status: 400 }
        );
      }

      if (updates.startDate && updates.endDate && start >= end) {
        return NextResponse.json(
          { success: false, error: 'Start date must be before end date' },
          { status: 400 }
        );
      }
    }

    // For development, simulate update
    if (process.env.NODE_ENV !== 'production') {
      const updatedEvent = {
        id,
        ...updates,
        updatedAt: new Date().toISOString(),
        updatedBy: userId
      };

      return NextResponse.json({
        success: true,
        event: updatedEvent,
        message: 'Event updated successfully'
      });
    }

    // Production implementation would update in Firestore
    // TODO: Implement Firestore update for calendar events
    return NextResponse.json({
      success: true,
      message: 'Event updated successfully'
    });

  } catch (error) {
    logger.error('Error updating calendar event', { error, endpoint: '/api/profile/calendar/events' });
    return NextResponse.json(
      { success: false, error: 'Failed to update calendar event' },
      { status: 500 }
    );
  }
}, {
  allowDevelopmentBypass: true,
  operation: 'update_calendar_event'
});

// DELETE - Delete calendar event
export const DELETE = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('id');

    if (!eventId) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // For development, simulate deletion
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json({
        success: true,
        message: 'Event deleted successfully',
        eventId
      });
    }

    // Production implementation would delete from Firestore
    // TODO: Implement Firestore deletion for calendar events
    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully'
    });

  } catch (error) {
    logger.error('Error deleting calendar event', { error, endpoint: '/api/profile/calendar/events' });
    return NextResponse.json(
      { success: false, error: 'Failed to delete calendar event' },
      { status: 500 }
    );
  }
}, {
  allowDevelopmentBypass: true,
  operation: 'delete_calendar_event'
});