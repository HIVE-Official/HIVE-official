import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api/response-types/api-response-types";
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';

// Personal event type for calendar tool
interface PersonalEvent {
  id?: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: string;
  isAllDay?: boolean;
  reminderMinutes?: number;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

// Combined event type for calendar display
interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: string;
  isAllDay?: boolean;
  type: 'personal' | 'space';
  source?: string;
  spaceId?: string;
  spaceName?: string;
  canEdit: boolean;
  eventType?: string;
  organizerName?: string;
}

// Fetch user's calendar events from Firebase
async function fetchUserCalendarEvents(userId: string): Promise<CalendarEvent[]> {
  try {
    // Get user's personal events
    const personalEventsSnapshot = await dbAdmin
      .collection('calendar_events')
      .where('userId', '==', userId)
      .where('type', '==', 'personal')
      .orderBy('startDate', 'asc')
      .get();

    // Get user's space events from spaces they're a member of
    const membershipSnapshot = await dbAdmin
      .collection('members')
      .where('userId', '==', userId)
      .get();

    const spaceIds = membershipSnapshot.docs.map(doc => doc.data().spaceId);
    
    let spaceEvents: any[] = [];
    if (spaceIds.length > 0) {
      // Batch query for space events (Firestore has a limit of 10 for 'in' queries)
      const eventQueries = [];
      for (let i = 0; i < spaceIds.length; i += 10) {
        const batch = spaceIds.slice(i, i + 10);
        eventQueries.push(
          dbAdmin
            .collection('calendar_events')
            .where('spaceId', 'in', batch)
            .where('type', '==', 'space')
            .get()
        );
      }
      
      const spaceEventSnapshots = await Promise.all(eventQueries);
      spaceEvents = spaceEventSnapshots.flatMap(snapshot => snapshot.docs.map(doc => doc.data()));
    }

    // Combine and format events
    const allEvents: CalendarEvent[] = [
      ...personalEventsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          description: data.description || '',
          startDate: data.startDate,
          endDate: data.endDate,
          location: data.location,
          isAllDay: data.isAllDay || false,
          type: 'personal' as const,
          canEdit: true,
          eventType: data.eventType || 'event'
        };
      }),
      ...spaceEvents.map(data => ({
        id: data.id,
        title: data.title,
        description: data.description || '',
        startDate: data.startDate,
        endDate: data.endDate,
        location: data.location,
        isAllDay: data.isAllDay || false,
        type: 'space' as const,
        source: data.spaceName || 'Unknown Space',
        spaceId: data.spaceId,
        spaceName: data.spaceName,
        canEdit: false,
        eventType: data.eventType || 'event',
        organizerName: data.organizerName
      }))
    ];

    return allEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  } catch (error) {
    logger.error('Failed to fetch calendar events:', error);
    return [];
  }
}

// GET - Fetch calendar events (personal + space events)
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    
    // Always fetch real calendar events from Firebase - no mock data fallback
    const realEvents = await fetchUserCalendarEvents(userId);
    
    // Return events even if empty array - this is valid state
    return NextResponse.json({
      success: true,
      events: realEvents,
      totalCount: realEvents.length,
      userId,
      message: 'Calendar events retrieved successfully'
    });

  } catch (error) {
    logger.error('Error fetching calendar events:', error);
    return NextResponse.json(
      ApiResponseHelper.error("Failed to fetch calendar events", "FETCH_ERROR"),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
});

// POST - Create personal event
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;

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

    const personalEvent: PersonalEvent = {
      title,
      description: description || '',
      startDate,
      endDate,
      location: location || '',
      isAllDay: isAllDay || false,
      reminderMinutes: reminderMinutes || 0,
      userId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await dbAdmin.collection('personalEvents').add(personalEvent);
    const createdEvent = {
      id: docRef.id,
      ...personalEvent,
      type: 'personal' as const,
      canEdit: true
    };

    return NextResponse.json({ event: createdEvent }, { status: HttpStatus.CREATED });
  } catch (error) {
    logger.error('Error creating personal event', { error: error, endpoint: '/api/calendar' });
    return NextResponse.json(ApiResponseHelper.error("Failed to create personal event", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: false,
  operation: 'create_calendar_event' 
});