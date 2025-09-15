import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from "@/lib/utils/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';
import { getSpaceMember } from '@/lib/spaces/spaces-db';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

const updateNotificationsSchema = z.object({
  enabled: z.boolean()
});

/**
 * Update notification preferences for a specific space
 * POST /api/spaces/[spaceId]/notifications
 */
export const POST = withAuth(async (
  request: NextRequest,
  authContext,
  { params }: { params: Promise<{ spaceId: string }> }
) => {
  try {
    const { spaceId } = await params;
    const userId = authContext.userId;
    const body = await request.json();
    const { enabled } = updateNotificationsSchema.parse(body);

    logger.info('Updating space notification preferences', { 
      userId, 
      spaceId,
      enabled,
      endpoint: '/api/spaces/[spaceId]/notifications' 
    });

    // Check if user is a member of this space
    const membership = await getSpaceMember(spaceId, userId);
    if (!membership) {
      return NextResponse.json(
        ApiResponseHelper.error("You are not a member of this space", ErrorCodes.NOT_FOUND),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    // Update notification setting in spaceMembers collection
    const memberRef = dbAdmin.collection('spaceMembers').doc(membership.id);
    await memberRef.update({
      notificationSettings: {
        posts: enabled,
        events: enabled,
        mentions: true, // Always keep mentions enabled
        announcements: enabled
      },
      updatedAt: Timestamp.now()
    });

    // Also update in the members collection (used for dashboard)
    const membershipRef = dbAdmin.collection('members').doc(`${userId}_${spaceId}`);
    const membershipDoc = await membershipRef.get();
    
    if (membershipDoc.exists) {
      await membershipRef.update({
        notificationSettings: {
          posts: enabled,
          events: enabled,
          mentions: true,
          announcements: enabled
        },
        updatedAt: Timestamp.now()
      });
    }

    logger.info('Space notifications updated successfully', {
      userId,
      spaceId,
      enabled
    });

    return NextResponse.json(
      ApiResponseHelper.success({
        spaceId,
        notifications: enabled,
        updatedAt: new Date().toISOString()
      }, `Notifications ${enabled ? 'enabled' : 'disabled'} for this space`)
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        ApiResponseHelper.error("Invalid request data", ErrorCodes.VALIDATION_ERROR, error.errors),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error updating space notifications', { error, endpoint: '/api/spaces/[spaceId]/notifications' });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to update notifications", ErrorCodes.INTERNAL_ERROR),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, {
  requireAuth: true,
  operation: 'update_space_notifications'
});

/**
 * Get notification preferences for a specific space
 * GET /api/spaces/[spaceId]/notifications
 */
export const GET = withAuth(async (
  request: NextRequest,
  authContext,
  { params }: { params: Promise<{ spaceId: string }> }
) => {
  try {
    const { spaceId } = await params;
    const userId = authContext.userId;

    // Check if user is a member of this space
    const membership = await getSpaceMember(spaceId, userId);
    if (!membership) {
      return NextResponse.json(
        ApiResponseHelper.error("You are not a member of this space", ErrorCodes.NOT_FOUND),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    // Get notification settings from membership
    const notificationSettings = membership.notificationSettings || {
      posts: true,
      events: true,
      mentions: true,
      announcements: true
    };

    return NextResponse.json(
      ApiResponseHelper.success({
        spaceId,
        notifications: notificationSettings
      })
    );

  } catch (error) {
    logger.error('Error fetching space notifications', { error, endpoint: '/api/spaces/[spaceId]/notifications' });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to fetch notifications", ErrorCodes.INTERNAL_ERROR),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, {
  requireAuth: true,
  operation: 'get_space_notifications'
});