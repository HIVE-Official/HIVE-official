import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-client';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  addDoc,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { logger } from '@/lib/structured-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/events - Fetch events with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const spaceId = searchParams.get('spaceId');
    const eventType = searchParams.get('type');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limitCount = parseInt(searchParams.get('limit') || '20');
    const userId = searchParams.get('userId');

    let eventsQuery;

    if (spaceId) {
      // Get events for a specific space
      const eventsRef = collection(db, 'spaces', spaceId, 'events');
      eventsQuery = query(
        eventsRef,
        orderBy('startDate', 'asc'),
        limit(limitCount)
      );
    } else {
      // Get all public events
      const eventsRef = collection(db, 'events');
      const constraints: any[] = [
        where('isPublic', '==', true),
        orderBy('startDate', 'asc')
      ];

      if (eventType) {
        constraints.push(where('type', '==', eventType));
      }

      if (startDate) {
        constraints.push(where('startDate', '>=', new Date(startDate)));
      }

      if (endDate) {
        constraints.push(where('startDate', '<=', new Date(endDate)));
      }

      constraints.push(limit(limitCount));
      eventsQuery = query(eventsRef, ...constraints);
    }

    const snapshot = await getDocs(eventsQuery);
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate?.toDate?.() || doc.data().startDate,
      endDate: doc.data().endDate?.toDate?.() || doc.data().endDate,
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
    }));

    // If userId is provided, check RSVP status for each event
    if (userId) {
      const eventsWithRsvp = await Promise.all(
        events.map(async (event: any) => {
          const rsvpRef = collection(db, 'events', event.id, 'attendees');
          const rsvpQuery = query(rsvpRef, where('userId', '==', userId));
          const rsvpSnapshot = await getDocs(rsvpQuery);
          
          return {
            ...event,
            isAttending: !rsvpSnapshot.empty,
            rsvpStatus: !rsvpSnapshot.empty ? rsvpSnapshot.docs[0].data().status : null
          };
        })
      );
      
      return NextResponse.json({ events: eventsWithRsvp });
    }

    return NextResponse.json({ events });

  } catch (error) {
    logger.error('Failed to fetch events', { error });
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      startDate,
      endDate,
      location,
      spaceId,
      type = 'general',
      isOnline = false,
      maxAttendees,
      coverImage,
      tags = [],
      isPublic = true,
    } = body;

    // Validate required fields
    if (!title || !startDate) {
      return NextResponse.json(
        { error: 'Title and start date are required' },
        { status: 400 }
      );
    }

    // Create event data
    const eventData = {
      title,
      description: description || '',
      startDate: Timestamp.fromDate(new Date(startDate)),
      endDate: endDate ? Timestamp.fromDate(new Date(endDate)) : null,
      location: location || '',
      type,
      isOnline,
      maxAttendees: maxAttendees || null,
      coverImage: coverImage || null,
      tags,
      isPublic,
      organizerId: session.user.id,
      organizerName: session.user.name,
      organizerImage: session.user.image,
      attendeeCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    let eventRef;
    
    if (spaceId) {
      // Create event within a space
      eventRef = await addDoc(
        collection(db, 'spaces', spaceId, 'events'),
        { ...eventData, spaceId }
      );
      
      // Also add to global events collection for discovery
      await addDoc(collection(db, 'events'), {
        ...eventData,
        spaceId,
        spaceName: body.spaceName || 'Unknown Space',
        eventRefPath: `spaces/${spaceId}/events/${eventRef.id}`
      });
    } else {
      // Create standalone event
      eventRef = await addDoc(collection(db, 'events'), eventData);
    }

    // Auto-RSVP the creator
    await addDoc(
      collection(db, 'events', eventRef.id, 'attendees'),
      {
        userId: session.user.id,
        userName: session.user.name,
        userImage: session.user.image,
        status: 'going',
        role: 'organizer',
        rsvpAt: serverTimestamp(),
      }
    );

    logger.info('Event created', { 
      eventId: eventRef.id, 
      userId: session.user.id,
      spaceId 
    });

    return NextResponse.json({
      success: true,
      eventId: eventRef.id,
      message: 'Event created successfully'
    });

  } catch (error) {
    logger.error('Failed to create event', { error });
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}