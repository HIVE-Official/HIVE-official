import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-client';
import { 
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs
} from 'firebase/firestore';
import { logger } from '@/lib/structured-logger';

interface RouteParams {
  params: Promise<{
    eventId: string;
  }>;
}

// GET /api/events/[eventId]/attendees - Get event attendees
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { eventId } = await params;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // 'going', 'interested', 'not_going'
    const limitCount = parseInt(searchParams.get('limit') || '50');

    const attendeesRef = collection(db, 'events', eventId, 'attendees');
    
    let attendeesQuery;
    if (status) {
      attendeesQuery = query(
        attendeesRef,
        where('status', '==', status),
        orderBy('rsvpAt', 'desc'),
        limit(limitCount)
      );
    } else {
      attendeesQuery = query(
        attendeesRef,
        orderBy('rsvpAt', 'desc'),
        limit(limitCount)
      );
    }

    const snapshot = await getDocs(attendeesQuery);
    const attendees = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      rsvpAt: doc.data().rsvpAt?.toDate?.() || doc.data().rsvpAt,
    }));

    // Group attendees by status
    const grouped = {
      going: attendees.filter(a => a.status === 'going'),
      interested: attendees.filter(a => a.status === 'interested'),
      notGoing: attendees.filter(a => a.status === 'not_going'),
    };

    return NextResponse.json({
      attendees: status ? attendees : grouped,
      total: attendees.length,
      counts: {
        going: grouped.going.length,
        interested: grouped.interested.length,
        notGoing: grouped.notGoing.length,
      }
    });

  } catch (error) {
    logger.error('Failed to fetch attendees', { error });
    return NextResponse.json(
      { error: 'Failed to fetch attendees' },
      { status: 500 }
    );
  }
}