import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuth } from '@/lib/api-auth-middleware';
import { 
  getSpace,
  getSpaceMember,
  removeSpaceMember,
  getSpaceMembers
} from '@/lib/spaces-db';

const leaveSpaceSchema = z.object({
  spaceId: z.string().min(1, "Space ID is required")
});

/**
 * Leave a space - uses flat spaceMembers collection
 */
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const body = await request.json();
    const { spaceId } = leaveSpaceSchema.parse(body);
    const userId = authContext.userId;

    logger.info('User attempting to leave space', { 
      userId, 
      spaceId,
      endpoint: '/api/spaces/leave' 
    });

    // Check if space exists
    const space = await getSpace(spaceId);
    if (!space) {
      return NextResponse.json(
        ApiResponseHelper.error("Space not found", ErrorCodes.NOT_FOUND),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    // Check if user is a member
    const membership = await getSpaceMember(spaceId, userId);
    if (!membership) {
      return NextResponse.json(
        ApiResponseHelper.error("You are not a member of this space", ErrorCodes.NOT_FOUND),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    // Prevent owner from leaving without transferring ownership
    if (membership.role === 'owner') {
      // Check if there are other admins who can take over
      const allMembers = await getSpaceMembers(spaceId);
      const otherAdmins = allMembers.filter(m => 
        m.userId !== userId && (m.role === 'admin' || m.role === 'moderator')
      );

      if (otherAdmins.length === 0 && allMembers.length > 1) {
        return NextResponse.json(
          ApiResponseHelper.error(
            "As the owner, you must transfer ownership before leaving the space",
            ErrorCodes.FORBIDDEN
          ),
          { status: HttpStatus.FORBIDDEN }
        );
      }

      // If owner is the only member, we could archive the space
      if (allMembers.length === 1) {
        logger.info('Owner is last member, space will be empty', { spaceId });
        // Could implement space archival here
      }
    }

    // Remove member from space
    const success = await removeSpaceMember(spaceId, userId);
    if (!success) {
      throw new Error('Failed to remove membership');
    }

    logger.info('User successfully left space', {
      userId,
      spaceId,
      previousRole: membership.role
    });

    // Log activity event
    try {
      await logLeaveActivity(userId, spaceId, space.name);
    } catch (error) {
      logger.error('Failed to log leave activity', { error });
      // Don't fail the leave operation if logging fails
    }

    return NextResponse.json(
      ApiResponseHelper.success({
        spaceId,
        spaceName: space.name,
        leftAt: new Date().toISOString()
      }, "Successfully left space")
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        ApiResponseHelper.error("Invalid request data", ErrorCodes.VALIDATION_ERROR, error.errors),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error leaving space', { error, endpoint: '/api/spaces/leave' });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to leave space", ErrorCodes.INTERNAL_ERROR),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, {
  requireAuth: true,
  operation: 'leave_space'
});

/**
 * Log leave activity for analytics
 */
async function logLeaveActivity(userId: string, spaceId: string, spaceName: string) {
  const { dbAdmin } = await import('@/lib/firebase-admin');
  const { Timestamp } = await import('firebase-admin/firestore');
  
  await dbAdmin.collection('activityEvents').add({
    type: 'space_leave',
    userId,
    spaceId,
    spaceName,
    timestamp: Timestamp.now(),
    metadata: {
      source: 'api'
    }
  });
}