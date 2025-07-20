import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { collection, doc, query, where, getDocs, addDoc, updateDoc, deleteDoc, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

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

// GET - Fetch calendar events (personal + space events)
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const includeSpaceEvents = searchParams.get('includeSpaceEvents') !== 'false';

    // Fetch personal events
    const personalEventsQuery = query(
      collection(db, 'personalEvents'),
      where('userId', '==', user.uid),
      ...(startDate ? [where('startDate', '>=', startDate)] : []),
      ...(endDate ? [where('endDate', '<=', endDate)] : []),
      orderBy('startDate', 'asc')
    );

    const personalEventsSnapshot = await getDocs(personalEventsQuery);
    const personalEvents: CalendarEvent[] = personalEventsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      type: 'personal' as const,
      canEdit: true
    })) as CalendarEvent[];

    let spaceEvents: CalendarEvent[] = [];

    if (includeSpaceEvents) {
      // Fetch user's space memberships
      const membershipsQuery = query(
        collection(db, 'members'),
        where('userId', '==', user.uid),
        where('status', '==', 'active')
      );

      const membershipsSnapshot = await getDocs(membershipsQuery);
      const userSpaceIds = membershipsSnapshot.docs.map(doc => doc.data().spaceId);

      if (userSpaceIds.length > 0) {
        // Fetch space events from user's spaces
        const spaceEventsQuery = query(
          collection(db, 'events'),
          where('spaceId', 'in', userSpaceIds),
          where('state', '==', 'published'),
          ...(startDate ? [where('startDate', '>=', startDate)] : []),
          ...(endDate ? [where('endDate', '<=', endDate)] : []),
          orderBy('startDate', 'asc')
        );

        const spaceEventsSnapshot = await getDocs(spaceEventsQuery);
        spaceEvents = spaceEventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          type: 'space' as const,
          canEdit: false
        })) as CalendarEvent[];
      }
    }

    // Combine and sort events
    const allEvents = [...personalEvents, ...spaceEvents].sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    return NextResponse.json({ events: allEvents });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.json({ error: 'Failed to fetch calendar events' }, { status: 500 });
  }
}

// POST - Create personal event
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, startDate, endDate, location, isAllDay, reminderMinutes } = body;

    // Validate required fields
    if (!title || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) {
      return NextResponse.json({ error: 'End date must be after start date' }, { status: 400 });
    }

    const personalEvent: PersonalEvent = {
      title,
      description: description || '',
      startDate,
      endDate,
      location: location || '',
      isAllDay: isAllDay || false,
      reminderMinutes: reminderMinutes || 0,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'personalEvents'), personalEvent);
    const createdEvent = {
      id: docRef.id,
      ...personalEvent,
      type: 'personal' as const,
      canEdit: true
    };

    return NextResponse.json({ event: createdEvent }, { status: 201 });
  } catch (error) {
    console.error('Error creating personal event:', error);
    return NextResponse.json({ error: 'Failed to create personal event' }, { status: 500 });
  }
}