import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser as _getCurrentUser } from '../../../../../lib/auth-server';
import { logger } from "@/lib/logger";
import { withAuth } from '@/lib/api-auth-middleware';
import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  type: 'personal' | 'space' | 'class' | 'study' | 'meeting' | 'social';
  location?: string;
  spaceId?: string;
  spaceName?: string;
  attendees?: string[];
  isRecurring?: boolean;
  recurringPattern?: string;
  status: 'confirmed' | 'tentative' | 'cancelled';
  createdBy?: string;
  source?: 'manual' | 'google' | 'outlook' | 'space';
  externalId?: string;
  isVirtual?: boolean;
  onlineMeetingUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// GET - Fetch user's calendar events from all sources
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const type = searchParams.get('type');
    const source = searchParams.get('source'); // filter by source

    // Build date range
    const start = startDate ? new Date(startDate) : new Date();
    const end = endDate ? new Date(endDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days ahead

    // Query manual events from userCalendarEvents collection
    let manualEventsQuery = dbAdmin
      .collection('userCalendarEvents')
      .where('userId', '==', userId);

    // Query synced events from calendarEvents collection
    let syncedEventsQuery = dbAdmin
      .collection('calendarEvents')
      .where('userId', '==', userId);

    // Add date filters if they're valid dates
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      // For manual events
      manualEventsQuery = manualEventsQuery
        .where('startDate', '>=', start.toISOString())
        .where('startDate', '<=', end.toISOString());
      
      // For synced events
      syncedEventsQuery = syncedEventsQuery
        .where('startDate', '>=', start.toISOString())
        .where('startDate', '<=', end.toISOString());
    }

    // Execute queries in parallel
    const [manualSnapshot, syncedSnapshot] = await Promise.all([
      manualEventsQuery.get(),
      syncedEventsQuery.get()
    ]);

    // Process manual events
    const manualEvents: CalendarEvent[] = manualSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || 'Untitled Event',
        description: data.description || '',
        startDate: data.startDate,
        endDate: data.endDate,
        type: data.type || 'personal',
        location: data.location || '',
        spaceId: data.spaceId,
        spaceName: data.spaceName,
        attendees: data.attendees || [],
        isRecurring: data.isRecurring || false,
        recurringPattern: data.recurringPattern,
        status: data.status || 'confirmed',
        source: 'manual',
        createdBy: data.createdBy || userId,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString()
      };
    });

    // Process synced events (from Google/Outlook)
    const syncedEvents: CalendarEvent[] = syncedSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || 'Untitled Event',
        description: data.description || '',
        startDate: data.startDate,
        endDate: data.endDate,
        type: data.type || 'personal',
        location: data.location || '',
        attendees: data.attendees || [],
        status: data.status || 'confirmed',
        source: data.source || 'google',
        externalId: data.externalId,
        isVirtual: data.isVirtual || false,
        onlineMeetingUrl: data.onlineMeetingUrl,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString()
      };
    });

    // Query space events if user is a member
    const memberSpacesSnapshot = await dbAdmin
      .collection('spaceMembers')
      .where('userId', '==', userId)
      .get();

    const spaceIds = memberSpacesSnapshot.docs.map(doc => doc.data().spaceId);
    
    let spaceEvents: CalendarEvent[] = [];
    if (spaceIds.length > 0) {
      // Query events from user's spaces
      const spaceEventsQuery = dbAdmin
        .collection('spaceEvents')
        .where('spaceId', 'in', spaceIds)
        .where('startDate', '>=', start.toISOString())
        .where('startDate', '<=', end.toISOString());
      
      const spaceEventsSnapshot = await spaceEventsQuery.get();
      
      spaceEvents = spaceEventsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || 'Untitled Event',
          description: data.description || '',
          startDate: data.startDate,
          endDate: data.endDate,
          type: 'space' as const,
          location: data.location || '',
          spaceId: data.spaceId,
          spaceName: data.spaceName,
          attendees: data.attendees || [],
          status: data.status || 'confirmed',
          source: 'space' as const,
          isVirtual: data.isVirtual || false,
          onlineMeetingUrl: data.onlineMeetingUrl,
          createdBy: data.createdBy,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString()
        };
      });
    }

    // Combine all events
    let allEvents = [...manualEvents, ...syncedEvents, ...spaceEvents];

    // Filter by source if specified
    if (source) {
      allEvents = allEvents.filter(event => event.source === source);
    }

    // Filter by type if specified
    if (type) {
      allEvents = allEvents.filter(event => event.type === type);
    }

    // Sort by start date
    allEvents.sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    // Check integration status
    const integrationsDoc = await dbAdmin
      .collection('userIntegrations')
      .doc(userId)
      .get();
    
    const integrations = integrationsDoc.data();
    const syncStatus = {
      google: {
        connected: !!(integrations?.calendar?.google?.accessToken),
        lastSync: integrations?.external?.lastSync?.google?.toDate?.()?.toISOString()
      },
      outlook: {
        connected: !!(integrations?.calendar?.outlook?.accessToken),
        lastSync: integrations?.external?.lastSync?.outlook?.toDate?.()?.toISOString()
      }
    };

    return NextResponse.json({
      success: true,
      events: allEvents,
      metadata: {
        count: allEvents.length,
        timeRange: { 
          startDate: start.toISOString(), 
          endDate: end.toISOString() 
        },
        type,
        source,
        syncStatus
      }
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

    // Create event document for Firestore
    const eventData = {
      userId,
      title,
      description: body.description || '',
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      type: body.type,
      location: body.location || '',
      spaceId: body.spaceId || null,
      spaceName: body.spaceName || null,
      attendees: body.attendees || [],
      isRecurring: body.isRecurring || false,
      recurringPattern: body.recurringPattern || null,
      isVirtual: body.isVirtual || false,
      onlineMeetingUrl: body.onlineMeetingUrl || null,
      status: 'confirmed',
      source: 'manual',
      createdBy: userId,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    };

    // Save to Firestore
    const eventRef = await dbAdmin
      .collection('userCalendarEvents')
      .add(eventData);

    // Return the created event
    const newEvent: CalendarEvent = {
      id: eventRef.id,
      ...eventData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Log activity
    await dbAdmin.collection('activityEvents').add({
      userId,
      type: 'content_creation',
      contentType: 'calendar_event',
      contentId: eventRef.id,
      metadata: {
        eventTitle: title,
        eventType: type
      },
      timestamp: FieldValue.serverTimestamp()
    });

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

    // Get the event to verify ownership
    const eventRef = dbAdmin.collection('userCalendarEvents').doc(id);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    const eventData = eventDoc.data();
    if (eventData?.userId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Not authorized to update this event' },
        { status: 403 }
      );
    }

    // Prepare update data
    const updateData = {
      ...updates,
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: userId
    };

    // Remove undefined/null values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined || updateData[key] === null) {
        delete updateData[key];
      }
    });

    // Update in Firestore
    await eventRef.update(updateData);

    // Get updated document
    const updatedDoc = await eventRef.get();
    const updatedEvent = {
      id: updatedDoc.id,
      ...updatedDoc.data(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      event: updatedEvent,
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

    // Get the event to verify ownership
    const eventRef = dbAdmin.collection('userCalendarEvents').doc(eventId);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    const eventData = eventDoc.data();
    if (eventData?.userId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Not authorized to delete this event' },
        { status: 403 }
      );
    }

    // Delete from Firestore
    await eventRef.delete();

    // Log activity
    await dbAdmin.collection('activityEvents').add({
      userId,
      type: 'content_deletion',
      contentType: 'calendar_event',
      contentId: eventId,
      metadata: {
        eventTitle: eventData.title
      },
      timestamp: FieldValue.serverTimestamp()
    });

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully',
      eventId
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