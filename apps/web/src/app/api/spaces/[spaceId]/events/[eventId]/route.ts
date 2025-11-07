import { z } from 'zod';
import type { DocumentData, DocumentSnapshot } from 'firebase-admin/firestore';
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

const UpdateEventSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(2000).optional(),
  type: z.enum(['academic', 'social', 'recreational', 'cultural', 'meeting', 'virtual']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  location: z.string().optional(),
  virtualLink: z.string().url().optional(),
  maxAttendees: z.number().positive().optional(),
  rsvpDeadline: z.string().datetime().optional(),
  isRecurring: z.boolean().optional(),
  recurrenceRule: z.string().optional(),
  tags: z.array(z.string()).optional(),
  imageUrl: z.string().url().optional(),
  isFeatured: z.boolean().optional(),
  isPrivate: z.boolean().optional(),
  requiredRSVP: z.boolean().optional(),
  cost: z.number().nonnegative().optional(),
  currency: z.string().length(3).optional(),
  status: z.enum(['draft', 'published', 'ongoing', 'completed', 'cancelled']).optional(),
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
    logger.error('SECURITY: Cross-campus event access blocked', {
      eventId,
      spaceId,
      eventCampusId: eventData.campusId,
      currentCampusId: CURRENT_CAMPUS_ID,
    });
    return { ok: false as const, status: HttpStatus.FORBIDDEN, message: 'Access denied' };
  }

  return { ok: true as const, eventDoc, eventData };
}

async function serializeEvent(
  spaceId: string,
  eventDoc: DocumentSnapshot<DocumentData>,
  eventData: DocumentData,
  userId: string,
) {
  const organizerDoc = await dbAdmin.collection('users').doc(eventData.organizerId).get();
  const organizer = organizerDoc.exists ? organizerDoc.data() : null;

  const rsvpCollection = dbAdmin
    .collection('spaces')
    .doc(spaceId)
    .collection('events')
    .doc(eventDoc.id)
    .collection('rsvps');

  const rsvpSnapshot = await rsvpCollection.where('status', '==', 'going').get();
  const userRsvpDoc = await rsvpCollection.doc(userId).get();

  return {
    id: eventDoc.id,
    ...eventData,
    organizer: organizer
      ? {
          id: organizerDoc.id,
          fullName: organizer.fullName,
          handle: organizer.handle,
          photoURL: organizer.photoURL,
        }
      : null,
    currentAttendees: rsvpSnapshot.size,
    userRSVP: userRsvpDoc.exists ? userRsvpDoc.data()?.status : null,
  };
}

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

    const event = await loadEvent(spaceId, eventId);
    if (!event.ok) {
      const code = event.status === HttpStatus.NOT_FOUND ? 'RESOURCE_NOT_FOUND' : 'FORBIDDEN';
      return respond.error(event.message, code, { status: event.status });
    }

    const serialized = await serializeEvent(spaceId, event.eventDoc, event.eventData, userId);

    return respond.success({ event: serialized });
  } catch (error) {
    logger.error(
      `Error fetching event at /api/spaces/[spaceId]/events/[eventId]`,
      error instanceof Error ? error : new Error(String(error)),
    );
    return respond.error('Failed to fetch event', 'INTERNAL_ERROR', {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export const PATCH = withAuthValidationAndErrors(
  UpdateEventSchema,
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

      const eventData = load.eventData;
      const memberRole = membership.membership.role as string | undefined;
      const canEdit =
        eventData.organizerId === userId || ['owner', 'admin', 'moderator'].includes(memberRole || '');

      if (!canEdit) {
        return respond.error('Insufficient permissions to edit this event', 'FORBIDDEN', {
          status: HttpStatus.FORBIDDEN,
        });
      }

      if (body.startDate && body.endDate) {
        const startDate = new Date(body.startDate);
        const endDate = new Date(body.endDate);
        if (endDate <= startDate) {
          return respond.error('End date must be after start date', 'INVALID_INPUT', {
            status: HttpStatus.BAD_REQUEST,
          });
        }
      }

      const updateData: Record<string, unknown> = {
        ...body,
        updatedAt: new Date(),
        updatedBy: userId,
      };

      if (body.startDate) {
        updateData.startDate = new Date(body.startDate);
      }
      if (body.endDate) {
        updateData.endDate = new Date(body.endDate);
      }
      if (body.rsvpDeadline) {
        updateData.rsvpDeadline = new Date(body.rsvpDeadline);
      }

      await load.eventDoc.ref.update(updateData);

      await dbAdmin
        .collection('spaces')
        .doc(spaceId)
        .collection('activity')
        .add({
          type: 'event_updated',
          performedBy: userId,
          targetEventId: eventId,
          details: {
            updatedFields: Object.keys(body),
          },
          timestamp: new Date(),
        });

      logger.info(`Event updated: ${eventId} in space ${spaceId} by ${userId}`);

      return respond.success({
        message: 'Event updated successfully',
        eventId,
      });
    } catch (error) {
      logger.error('Error updating event', error instanceof Error ? error : new Error(String(error)));
      return respond.error('Failed to update event', 'INTERNAL_ERROR', {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);

export const DELETE = withAuthAndErrors(async (
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

    const memberRole = membership.membership.role as string | undefined;
    const canDelete =
      load.eventData.organizerId === userId || ['owner', 'admin'].includes(memberRole || '');

    if (!canDelete) {
      return respond.error('Insufficient permissions to delete this event', 'FORBIDDEN', {
        status: HttpStatus.FORBIDDEN,
      });
    }

    const rsvps = await dbAdmin
      .collection('spaces')
      .doc(spaceId)
      .collection('events')
      .doc(eventId)
      .collection('rsvps')
      .get();

    const batch = dbAdmin.batch();
    for (const doc of rsvps.docs) {
      batch.delete(doc.ref);
    }
    batch.delete(load.eventDoc.ref);

    await batch.commit();

    await dbAdmin
      .collection('spaces')
      .doc(spaceId)
      .collection('activity')
      .add({
        type: 'event_deleted',
        performedBy: userId,
        targetEventId: eventId,
        details: {
          eventTitle: load.eventData.title,
          eventType: load.eventData.type,
        },
        timestamp: new Date(),
      });

    logger.info(`Event deleted: ${eventId} from space ${spaceId} by ${userId}`);

    return respond.success({ message: 'Event deleted successfully' });
  } catch (error) {
    logger.error('Error deleting event', error instanceof Error ? error : new Error(String(error)));
    return respond.error('Failed to delete event', 'INTERNAL_ERROR', {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});
