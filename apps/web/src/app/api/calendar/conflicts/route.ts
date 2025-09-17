import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";

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
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const { startDate, endDate, excludeEventId } = body;

    if (!startDate || !endDate) {
      return NextResponse.json(ApiResponseHelper.error("Missing required fields", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    const proposedStart = new Date(startDate);
    const proposedEnd = new Date(endDate);

    if (proposedStart >= proposedEnd) {
      return NextResponse.json(ApiResponseHelper.error("End date must be after start date", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Add buffer time for conflict detection (15 minutes before/after)
    const bufferMs = 15 * 60 * 1000;
    const bufferStart = new Date(proposedStart.getTime() - bufferMs);
    const bufferEnd = new Date(proposedEnd.getTime() + bufferMs);

    const conflicts: ConflictEvent[] = [];

    // Check personal events
    const personalEventsSnapshot = await dbAdmin.collection('personalEvents')
      .where('userId', '==', user.uid)
      .orderBy('startDate', 'asc')
      .get();
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
    const membershipsSnapshot = await dbAdmin.collection('members')
      .where('userId', '==', user.uid)
      .where('status', '==', 'active')
      .get();
    const userSpaceIds = membershipsSnapshot.docs.map(doc => doc.data().spaceId);

    if (userSpaceIds.length > 0) {
      const spaceEventsSnapshot = await dbAdmin.collection('events')
        .where('spaceId', 'in', userSpaceIds)
        .where('state', '==', 'published')
        .orderBy('startDate', 'asc')
        .get();
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
    logger.error('Error checking conflicts', { error: error, endpoint: '/api/calendar/conflicts' });
    return NextResponse.json(ApiResponseHelper.error("Failed to check conflicts", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
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