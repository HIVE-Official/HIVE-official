import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import {
  withAuthAndErrors,
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from '@/lib/middleware';
import { ApiResponseHelper, HttpStatus } from '@/lib/api-response-types';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';
import { requireSpaceMembership } from '@/lib/space-security';

const RSVPSchema = z.object({
  status: z.enum(['going', 'maybe', 'not_going']),
});

async function loadEvent(spaceId: string, eventId: string) {
  const eventDoc = await dbAdmin
    .collection('spaces')
    .doc(spaceId)
    .collection('events')
    .doc(eventId)
    .get();

  if (!eventDoc.exists) {
    return { ok: false as const, status: HttpStatus.NOT_FOUND, message: 'Event not found' };
  }

  const eventData = eventDoc.data();
  if (!eventData) {
    return { ok: false as const, status: HttpStatus.NOT_FOUND, message: 'Event data missing' };
  }

  if (eventData.campusId && eventData.campusId !== CURRENT_CAMPUS_ID) {
    logger.error('SECURITY: Cross-campus event RSVP attempt blocked', {
      eventId,
      spaceId,
      eventCampusId: eventData.campusId,
      currentCampusId: CURRENT_CAMPUS_ID,
    });
    return { ok: false as const, status: HttpStatus.FORBIDDEN, message: 'Access denied' };
  }

  return { ok: true as const, eventDoc, eventData };
}

export const POST = withAuthValidationAndErrors(
  RSVPSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ spaceId: string; eventId: string }> },
    body,
    respond,
  ) => {
    try {
      const { spaceId, eventId } = await params;
      const userId = getUserId(request);

      const membership = await requireSpaceMembership(spaceId, userId);
      if (!membership.ok) {
        const code =
          membership.status === HttpStatus.NOT_FOUND ? 'RESOURCE_NOT_FOUND' : 'FORBIDDEN';
        return respond.error(membership.error, code, { status: membership.status });
      }

      const load = await loadEvent(spaceId, eventId);
      if (!load.ok) {
        const code = load.status === HttpStatus.NOT_FOUND ? 'RESOURCE_NOT_FOUND' : 'FORBIDDEN';
        return respond.error(load.message, code, { status: load.status });
      }

      if (load.eventData.rsvpDeadline) {
        const deadline =
          load.eventData.rsvpDeadline instanceof Date
            ? load.eventData.rsvpDeadline
            : load.eventData.rsvpDeadline.toDate?.() ?? new Date(load.eventData.rsvpDeadline);
        if (deadline && new Date() > deadline) {
          return respond.error('RSVP deadline has passed', 'INVALID_INPUT', {
            status: HttpStatus.BAD_REQUEST,
          });
        }
      }

      if (body.status === 'going' && load.eventData.maxAttendees) {
        const currentGoing = await dbAdmin
          .collection('spaces')
          .doc(spaceId)
          .collection('events')
          .doc(eventId)
          .collection('rsvps')
          .where('status', '==', 'going')
          .get();

        if (currentGoing.size >= load.eventData.maxAttendees) {
          return respond.error('Event is at full capacity', 'INVALID_INPUT', {
            status: HttpStatus.BAD_REQUEST,
          });
        }
      }

      const rsvpRef = dbAdmin
        .collection('spaces')
        .doc(spaceId)
        .collection('events')
        .doc(eventId)
        .collection('rsvps')
        .doc(userId);

      const existing = await rsvpRef.get();
      const timestamp = new Date();
      const rsvpData = {
        userId,
        eventId,
        spaceId,
        status: body.status,
        campusId: CURRENT_CAMPUS_ID,
        updatedAt: timestamp,
        ...(existing.exists ? {} : { createdAt: timestamp }),
      };

      await rsvpRef.set(rsvpData, { merge: true });

      const updatedCount = await dbAdmin
        .collection('spaces')
        .doc(spaceId)
        .collection('events')
        .doc(eventId)
        .collection('rsvps')
        .where('status', '==', 'going')
        .get();

      return respond.success({
        rsvp: rsvpData,
        currentAttendees: updatedCount.size,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return respond.error('Invalid RSVP data', 'VALIDATION_ERROR', {
          status: HttpStatus.BAD_REQUEST,
          details: error.errors,
        });
      }

      logger.error(
        `Error creating RSVP at /api/spaces/[spaceId]/events/[eventId]/rsvp`,
        error instanceof Error ? error : new Error(String(error)),
      );
      return respond.error('Failed to RSVP to event', 'INTERNAL_ERROR', {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);

export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string; eventId: string }> },
  respond,
) => {
  try {
    const { spaceId, eventId } = await params;
    const userId = getUserId(request);

    const membership = await requireSpaceMembership(spaceId, userId);
    if (!membership.ok) {
      const code =
        membership.status === HttpStatus.NOT_FOUND ? 'RESOURCE_NOT_FOUND' : 'FORBIDDEN';
      return respond.error(membership.error, code, { status: membership.status });
    }

    const load = await loadEvent(spaceId, eventId);
    if (!load.ok) {
      const code = load.status === HttpStatus.NOT_FOUND ? 'RESOURCE_NOT_FOUND' : 'FORBIDDEN';
      return respond.error(load.message, code, { status: load.status });
    }

    const rsvpDoc = await dbAdmin
      .collection('spaces')
      .doc(spaceId)
      .collection('events')
      .doc(eventId)
      .collection('rsvps')
      .doc(userId)
      .get();

    const rsvpStatus = rsvpDoc.exists ? rsvpDoc.data()?.status : null;

    return respond.success({ userRSVP: rsvpStatus });
  } catch (error) {
    logger.error(
      `Error fetching RSVP status at /api/spaces/[spaceId]/events/[eventId]/rsvp`,
      error instanceof Error ? error : new Error(String(error)),
    );
    return respond.error('Failed to fetch RSVP status', 'INTERNAL_ERROR', {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});
