import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

// Conflict detection for scheduling
interface ConflictEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: 'personal' | 'space';
  spaceName?: string;
  severity: 'overlap' | 'adjacent' | 'close';
}

// POST - Check for conflicts with proposed event time
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { startDate, endDate, excludeEventId } = body;

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const proposedStart = new Date(startDate);
    const proposedEnd = new Date(endDate);

    if (proposedStart >= proposedEnd) {
      return NextResponse.json({ error: 'End date must be after start date' }, { status: 400 });
    }

    // Add buffer time for conflict detection (15 minutes before/after)
    const bufferMs = 15 * 60 * 1000;
    const bufferStart = new Date(proposedStart.getTime() - bufferMs);
    const bufferEnd = new Date(proposedEnd.getTime() + bufferMs);

    const conflicts: ConflictEvent[] = [];

    // Check personal events
    const personalEventsQuery = query(
      collection(db, 'personalEvents'),
      where('userId', '==', user.uid),
      orderBy('startDate', 'asc')
    );

    const personalEventsSnapshot = await getDocs(personalEventsQuery);
    personalEventsSnapshot.docs.forEach(doc => {
      const eventData = doc.data();
      
      // Skip if this is the event being updated
      if (excludeEventId && doc.id === excludeEventId) {
        return;
      }

      const eventStart = new Date(eventData.startDate);
      const eventEnd = new Date(eventData.endDate);

      const conflict = detectConflict(
        proposedStart, proposedEnd,
        eventStart, eventEnd,
        bufferStart, bufferEnd
      );

      if (conflict) {
        conflicts.push({
          id: doc.id,
          title: eventData.title,
          startDate: eventData.startDate,
          endDate: eventData.endDate,
          type: 'personal',
          severity: conflict
        });
      }
    });

    // Check space events from user's memberships
    const membershipsQuery = query(
      collection(db, 'members'),
      where('userId', '==', user.uid),
      where('status', '==', 'active')
    );

    const membershipsSnapshot = await getDocs(membershipsQuery);
    const userSpaceIds = membershipsSnapshot.docs.map(doc => doc.data().spaceId);

    if (userSpaceIds.length > 0) {
      const spaceEventsQuery = query(
        collection(db, 'events'),
        where('spaceId', 'in', userSpaceIds),
        where('state', '==', 'published'),
        orderBy('startDate', 'asc')
      );

      const spaceEventsSnapshot = await getDocs(spaceEventsQuery);
      spaceEventsSnapshot.docs.forEach(doc => {
        const eventData = doc.data();
        const eventStart = new Date(eventData.startDate);
        const eventEnd = new Date(eventData.endDate);

        const conflict = detectConflict(
          proposedStart, proposedEnd,
          eventStart, eventEnd,
          bufferStart, bufferEnd
        );

        if (conflict) {
          conflicts.push({
            id: doc.id,
            title: eventData.title,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            type: 'space',
            spaceName: eventData.spaceName,
            severity: conflict
          });
        }
      });
    }

    // Sort conflicts by severity and start time
    conflicts.sort((a, b) => {
      const severityOrder = { 'overlap': 0, 'adjacent': 1, 'close': 2 };
      const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
      if (severityDiff !== 0) return severityDiff;
      
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

    return NextResponse.json({ 
      conflicts,
      hasConflicts: conflicts.length > 0,
      severityCount: {
        overlap: conflicts.filter(c => c.severity === 'overlap').length,
        adjacent: conflicts.filter(c => c.severity === 'adjacent').length,
        close: conflicts.filter(c => c.severity === 'close').length
      }
    });
  } catch (error) {
    console.error('Error checking conflicts:', error);
    return NextResponse.json({ error: 'Failed to check conflicts' }, { status: 500 });
  }
}

// Helper function to detect conflict type
function detectConflict(
  proposedStart: Date,
  proposedEnd: Date,
  eventStart: Date,
  eventEnd: Date,
  bufferStart: Date,
  bufferEnd: Date
): 'overlap' | 'adjacent' | 'close' | null {
  // Direct overlap
  if (proposedStart < eventEnd && proposedEnd > eventStart) {
    return 'overlap';
  }

  // Adjacent events (within buffer time)
  if (proposedEnd.getTime() === eventStart.getTime() || 
      proposedStart.getTime() === eventEnd.getTime()) {
    return 'adjacent';
  }

  // Close events (within buffer time)
  if (bufferStart < eventEnd && bufferEnd > eventStart) {
    return 'close';
  }

  return null;
}