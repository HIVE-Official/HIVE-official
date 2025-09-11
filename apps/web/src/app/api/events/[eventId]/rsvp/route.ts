import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-client';
import { 
  doc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  increment,
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { logger } from '@/lib/structured-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface RouteParams {
  params: Promise<{
    eventId: string;
  }>;
}

// POST /api/events/[eventId]/rsvp - RSVP to an event
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { eventId } = await params;
    const body = await request.json();
    const { status = 'going' } = body; // 'going', 'interested', 'not_going'

    // Check if event exists
    const eventRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventRef);
    
    if (!eventDoc.exists()) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    const eventData = eventDoc.data();
    
    // Check if event has max attendees limit
    if (status === 'going' && eventData.maxAttendees) {
      if (eventData.attendeeCount >= eventData.maxAttendees) {
        return NextResponse.json(
          { error: 'Event is full' },
          { status: 400 }
        );
      }
    }

    // Check if user already has an RSVP
    const attendeesRef = collection(db, 'events', eventId, 'attendees');
    const existingRsvpQuery = query(
      attendeesRef,
      where('userId', '==', session.user.id)
    );
    const existingRsvp = await getDocs(existingRsvpQuery);

    if (!existingRsvp.empty) {
      // Update existing RSVP
      const rsvpDoc = existingRsvp.docs[0];
      const previousStatus = rsvpDoc.data().status;
      
      await updateDoc(doc(attendeesRef, rsvpDoc.id), {
        status,
        updatedAt: serverTimestamp(),
      });

      // Update attendee count if status changed
      if (previousStatus !== status) {
        if (previousStatus === 'going' && status !== 'going') {
          await updateDoc(eventRef, {
            attendeeCount: increment(-1)
          });
        } else if (previousStatus !== 'going' && status === 'going') {
          await updateDoc(eventRef, {
            attendeeCount: increment(1)
          });
        }
      }

      logger.info('RSVP updated', { 
        eventId, 
        userId: session.user.id,
        status 
      });

      return NextResponse.json({
        success: true,
        message: 'RSVP updated',
        status
      });
    } else {
      // Create new RSVP
      await addDoc(attendeesRef, {
        userId: session.user.id,
        userName: session.user.name,
        userImage: session.user.image,
        userEmail: session.user.email,
        status,
        role: 'attendee',
        rsvpAt: serverTimestamp(),
      });

      // Update attendee count if going
      if (status === 'going') {
        await updateDoc(eventRef, {
          attendeeCount: increment(1)
        });
      }

      logger.info('RSVP created', { 
        eventId, 
        userId: session.user.id,
        status 
      });

      return NextResponse.json({
        success: true,
        message: 'RSVP created',
        status
      });
    }

  } catch (error) {
    logger.error('Failed to RSVP', { error });
    return NextResponse.json(
      { error: 'Failed to RSVP' },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[eventId]/rsvp - Cancel RSVP
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { eventId } = await params;

    // Find user's RSVP
    const attendeesRef = collection(db, 'events', eventId, 'attendees');
    const rsvpQuery = query(
      attendeesRef,
      where('userId', '==', session.user.id)
    );
    const rsvpSnapshot = await getDocs(rsvpQuery);

    if (rsvpSnapshot.empty) {
      return NextResponse.json(
        { error: 'RSVP not found' },
        { status: 404 }
      );
    }

    const rsvpDoc = rsvpSnapshot.docs[0];
    const rsvpData = rsvpDoc.data();

    // Don't allow organizer to cancel their RSVP
    if (rsvpData.role === 'organizer') {
      return NextResponse.json(
        { error: 'Organizer cannot cancel RSVP' },
        { status: 400 }
      );
    }

    // Delete RSVP
    await deleteDoc(doc(attendeesRef, rsvpDoc.id));

    // Update attendee count if was going
    if (rsvpData.status === 'going') {
      const eventRef = doc(db, 'events', eventId);
      await updateDoc(eventRef, {
        attendeeCount: increment(-1)
      });
    }

    logger.info('RSVP cancelled', { 
      eventId, 
      userId: session.user.id 
    });

    return NextResponse.json({
      success: true,
      message: 'RSVP cancelled'
    });

  } catch (error) {
    logger.error('Failed to cancel RSVP', { error });
    return NextResponse.json(
      { error: 'Failed to cancel RSVP' },
      { status: 500 }
    );
  }
}

// GET /api/events/[eventId]/rsvp - Get RSVP status for current user
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { eventId } = await params;

    // Find user's RSVP
    const attendeesRef = collection(db, 'events', eventId, 'attendees');
    const rsvpQuery = query(
      attendeesRef,
      where('userId', '==', session.user.id)
    );
    const rsvpSnapshot = await getDocs(rsvpQuery);

    if (rsvpSnapshot.empty) {
      return NextResponse.json({
        hasRsvp: false,
        status: null
      });
    }

    const rsvpData = rsvpSnapshot.docs[0].data();

    return NextResponse.json({
      hasRsvp: true,
      status: rsvpData.status,
      role: rsvpData.role,
      rsvpAt: rsvpData.rsvpAt?.toDate() || null
    });

  } catch (error) {
    logger.error('Failed to get RSVP status', { error });
    return NextResponse.json(
      { error: 'Failed to get RSVP status' },
      { status: 500 }
    );
  }
}