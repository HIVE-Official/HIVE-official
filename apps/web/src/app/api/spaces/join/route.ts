import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuth } from '@/lib/api-auth-middleware';
import { 
  getSpace, 
  getSpaceMember, 
  addSpaceMember,
  getUserSpaces 
} from '@/lib/spaces-db';

const joinSpaceSchema = z.object({
  spaceId: z.string().min(1, "Space ID is required")
});

/**
 * Join a space - uses flat spaceMembers collection
 */
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const body = await request.json();
    const { spaceId } = joinSpaceSchema.parse(body);
    const userId = authContext.userId;
    const userEmail = authContext.email;

    logger.info('User attempting to join space', { 
      userId, 
      spaceId,
      endpoint: '/api/spaces/join' 
    });

    // Check if space exists
    const space = await getSpace(spaceId);
    if (!space) {
      return NextResponse.json(
        ApiResponseHelper.error("Space not found", ErrorCodes.NOT_FOUND),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    // Check if already a member
    const existingMembership = await getSpaceMember(spaceId, userId);
    if (existingMembership) {
      return NextResponse.json(
        ApiResponseHelper.error("Already a member of this space", ErrorCodes.CONFLICT),
        { status: HttpStatus.CONFLICT }
      );
    }

    // Check space capacity
    if (space.maxMembers && space.memberCount >= space.maxMembers) {
      return NextResponse.json(
        ApiResponseHelper.error("Space is at maximum capacity", ErrorCodes.FORBIDDEN),
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Check if space is private or requires approval
    if (space.visibility === 'private') {
      return NextResponse.json(
        ApiResponseHelper.error("This space is private. Request an invitation from a current member.", ErrorCodes.FORBIDDEN),
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Greek life restrictions
    if (space.type === 'greek') {
      // Check if user is already in a Greek organization of the same type
      const userSpaces = await getUserSpaces(userId);
      const existingGreekMembership = userSpaces.find(membership => {
        // Would need to fetch space data to check type
        // For now, just prevent joining multiple greek spaces
        return membership.spaceId.includes('greek');
      });

      if (existingGreekMembership) {
        return NextResponse.json(
          ApiResponseHelper.error(
            "You can only be a member of one Greek organization",
            ErrorCodes.CONFLICT
          ),
          { status: HttpStatus.CONFLICT }
        );
      }

      // Check gender restrictions for fraternities/sororities
      if (space.greekType === 'fraternity' || space.greekType === 'sorority') {
        // Note: We don't have gender data in the auth context
        // This would need to be implemented with user profile data
        logger.warn('Greek gender restrictions not implemented', { spaceId, greekType: space.greekType });
      }
    }

    // Add member to space
    const newMembership = await addSpaceMember(
      spaceId,
      userId,
      {
        displayName: authContext.displayName || userEmail.split('@')[0],
        email: userEmail,
        photoURL: authContext.photoURL
      },
      'member' // Default role
    );

    if (!newMembership) {
      throw new Error('Failed to create membership');
    }

    logger.info('User successfully joined space', {
      userId,
      spaceId,
      membershipId: newMembership.id
    });

    // Log activity event
    try {
      await logJoinActivity(userId, spaceId, space.name);
    } catch (error) {
      logger.error('Failed to log join activity', { error });
      // Don't fail the join operation if logging fails
    }

    return NextResponse.json(
      ApiResponseHelper.success({
        membership: newMembership,
        space: {
          id: space.id,
          name: space.name,
          type: space.type,
          memberCount: space.memberCount + 1
        }
      }, "Successfully joined space")
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        ApiResponseHelper.error("Invalid request data", ErrorCodes.VALIDATION_ERROR, error.errors),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error joining space', { error, endpoint: '/api/spaces/join' });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to join space", ErrorCodes.INTERNAL_ERROR),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, {
  requireAuth: true,
  operation: 'join_space'
});

/**
 * Log join activity for analytics
 */
async function logJoinActivity(userId: string, spaceId: string, spaceName: string) {
  const { dbAdmin } = await import('@/lib/firebase-admin');
  const { Timestamp } = await import('firebase-admin/firestore');
  
  await dbAdmin.collection('activityEvents').add({
    type: 'space_join',
    userId,
    spaceId,
    spaceName,
    timestamp: Timestamp.now(),
    metadata: {
      source: 'api'
    }
  });
}