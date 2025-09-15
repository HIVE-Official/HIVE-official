import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from "@/lib/utils/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';
import { 
  getSpace, 
  getSpaceMember, 
  addSpaceMember,
  getUserSpaces 
} from '@/lib/spaces/spaces-db';
import { COLLECTIONS, type UserConnection } from '@/lib/firebase/collections/firebase-collections';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';

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

    // Create auto-connections with all existing space members
    let connectionCount = 0;
    try {
      connectionCount = await createAutoConnections(userId, spaceId, space.name);
      logger.info('Auto-connections process completed', {
        userId,
        spaceId,
        newConnections: connectionCount
      });
    } catch (error) {
      logger.error('Failed to create auto-connections', { error });
      // Don't fail the join operation if auto-connections fail
    }

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
        },
        connections: {
          created: connectionCount,
          message: connectionCount > 0 
            ? `You're now connected to ${connectionCount} ${connectionCount === 1 ? 'member' : 'members'} of ${space.name}!`
            : 'You\'re the first member to join this space!'
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
 * Create auto-connections with existing space members
 */
async function createAutoConnections(
  userId: string, 
  spaceId: string, 
  spaceName: string
): Promise<number> {
  const { dbAdmin } = await import('@/lib/firebase/admin/firebase-admin');
  
  try {
    // Get all existing members of the space
    const membersSnapshot = await dbAdmin
      .collection('spaceMembers')
      .where('spaceId', '==', spaceId)
      .where('status', '==', 'active')
      .get();
    
    const batch = dbAdmin.batch();
    let connectionCount = 0;
    const now = Timestamp.now();
    
    for (const memberDoc of membersSnapshot.docs) {
      const member = memberDoc.data();
      
      // Skip self-connection
      if (member.userId === userId) continue;
      
      // Create bidirectional connections
      // Connection from new member to existing member
      const connection1Id = `${userId}_${member.userId}`;
      const connection1Ref = dbAdmin
        .collection(COLLECTIONS.USER_CONNECTIONS)
        .doc(connection1Id);
      
      batch.set(connection1Ref, {
        id: connection1Id,
        userId: userId,
        connectedUserId: member.userId,
        status: 'accepted', // Auto-connections are instantly accepted
        type: 'classmate', // Default type for space connections
        mutualSpaces: [spaceId],
        sharedInterests: [],
        connectionReason: `Connected through ${spaceName}`,
        createdAt: now,
        acceptedAt: now
      } as UserConnection);
      
      // Connection from existing member to new member
      const connection2Id = `${member.userId}_${userId}`;
      const connection2Ref = dbAdmin
        .collection(COLLECTIONS.USER_CONNECTIONS)
        .doc(connection2Id);
      
      batch.set(connection2Ref, {
        id: connection2Id,
        userId: member.userId,
        connectedUserId: userId,
        status: 'accepted',
        type: 'classmate',
        mutualSpaces: [spaceId],
        sharedInterests: [],
        connectionReason: `Connected through ${spaceName}`,
        createdAt: now,
        acceptedAt: now
      } as UserConnection);
      
      connectionCount++;
    }
    
    // If there are existing members, create the connections
    if (connectionCount > 0) {
      await batch.commit();
      logger.info('Auto-connections created', {
        userId,
        spaceId,
        connectionCount,
        totalConnections: connectionCount * 2 // Bidirectional
      });
    }
    
    return connectionCount;
  } catch (error) {
    logger.error('Failed to create auto-connections', {
      error,
      userId,
      spaceId
    });
    // Don't fail the join operation if auto-connections fail
    return 0;
  }
}

/**
 * Update existing connections to add mutual space
 */
async function updateExistingConnections(
  userId: string,
  spaceId: string,
  memberUserIds: string[]
): Promise<void> {
  const { dbAdmin } = await import('@/lib/firebase/admin/firebase-admin');
  
  try {
    const batch = dbAdmin.batch();
    
    for (const memberId of memberUserIds) {
      // Update connection from user to member
      const connection1Ref = dbAdmin
        .collection(COLLECTIONS.USER_CONNECTIONS)
        .doc(`${userId}_${memberId}`);
      
      const connection1Doc = await connection1Ref.get();
      if (connection1Doc.exists) {
        batch.update(connection1Ref, {
          mutualSpaces: FieldValue.arrayUnion(spaceId),
          lastInteraction: Timestamp.now()
        });
      }
      
      // Update connection from member to user
      const connection2Ref = dbAdmin
        .collection(COLLECTIONS.USER_CONNECTIONS)
        .doc(`${memberId}_${userId}`);
      
      const connection2Doc = await connection2Ref.get();
      if (connection2Doc.exists) {
        batch.update(connection2Ref, {
          mutualSpaces: FieldValue.arrayUnion(spaceId),
          lastInteraction: Timestamp.now()
        });
      }
    }
    
    await batch.commit();
  } catch (error) {
    logger.error('Failed to update existing connections', {
      error,
      userId,
      spaceId
    });
  }
}

/**
 * Log join activity for analytics
 */
async function logJoinActivity(userId: string, spaceId: string, spaceName: string) {
  const { dbAdmin } = await import('@/lib/firebase/admin/firebase-admin');
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