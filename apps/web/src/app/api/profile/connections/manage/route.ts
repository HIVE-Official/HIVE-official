/**
 * Social Connections Management API
 * Handles friend requests, connections, and social networking
 */

import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';
import { COLLECTIONS, UserConnection } from '@/lib/firebase/collections/firebase-collections';
import { FieldValue } from 'firebase-admin/firestore';
import { logger } from '@hive/core';

/**
 * GET /api/profile/connections/manage
 * Get user's connections with filtering and pagination
 */
export const GET = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') || 'accepted';
    const type = url.searchParams.get('type');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    // Base query for user's connections
    let query = dbAdmin
      .collection(COLLECTIONS.USER_CONNECTIONS)
      .where('userId', '==', userId);

    // Add filters
    if (status) {
      query = query.where('status', '==', status);
    }
    if (type) {
      query = query.where('type', '==', type);
    }

    // Execute query with pagination
    const snapshot = await query
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .offset(offset)
      .get();

    const connections = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Get connected user profiles for accepted connections
    const connectedUserIds = connections
      .filter(conn => conn.status === 'accepted')
      .map(conn => conn.connectedUserId);

    let userProfiles: any[] = [];
    if (connectedUserIds.length > 0) {
      const userDocs = await dbAdmin
        .collection(COLLECTIONS.USERS)
        .where('__name__', 'in', connectedUserIds)
        .get();

      userProfiles = userDocs.docs.map(doc => ({
        id: doc.id,
        fullName: doc.data().fullName,
        handle: doc.data().handle,
        avatarUrl: doc.data().avatarUrl,
        major: doc.data().major,
        academicYear: doc.data().academicYear,
        isOnline: doc.data().lastActiveAt && 
          (new Date().getTime() - (doc.data().lastActiveAt?.toDate ? doc.data().lastActiveAt.toDate() : new Date(doc.data().lastActiveAt)).getTime()) < 5 * 60 * 1000 // 5 mins
      }));
    }

    // Get connection statistics
    const stats = {
      total: 0,
      pending: 0,
      accepted: 0,
      blocked: 0
    };

    const statsSnapshot = await dbAdmin
      .collection(COLLECTIONS.USER_CONNECTIONS)
      .where('userId', '==', userId)
      .get();

    statsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      stats.total++;
      stats[data.status as keyof typeof stats]++;
    });

    return NextResponse.json({
      success: true,
      connections: connections.map(conn => ({
        ...conn,
        connectedUser: userProfiles.find(user => user.id === conn.connectedUserId)
      })),
      stats,
      pagination: {
        limit,
        offset,
        hasMore: connections.length === limit
      }
    });

  } catch (error) {
    logger.error('Error fetching connections', { error, userId });
    return NextResponse.json(
      { success: false, error: 'Failed to fetch connections' },
      { status: 500 }
    );
  }
});

/**
 * POST /api/profile/connections/manage
 * Create a new connection request
 */
export const POST = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const { connectedUserId, type = 'friend', reason } = await request.json();

    if (!connectedUserId) {
      return NextResponse.json(
        { success: false, error: 'Connected user ID is required' },
        { status: 400 }
      );
    }

    if (connectedUserId === userId) {
      return NextResponse.json(
        { success: false, error: 'Cannot connect to yourself' },
        { status: 400 }
      );
    }

    // Check if connection already exists
    const existingConnection = await dbAdmin
      .collection(COLLECTIONS.USER_CONNECTIONS)
      .where('userId', '==', userId)
      .where('connectedUserId', '==', connectedUserId)
      .limit(1)
      .get();

    if (!existingConnection.empty) {
      const existing = existingConnection.docs[0].data();
      return NextResponse.json(
        { 
          success: false, 
          error: 'Connection already exists',
          status: existing.status 
        },
        { status: 409 }
      );
    }

    // Verify target user exists and get their profile
    const targetUserDoc = await dbAdmin
      .collection(COLLECTIONS.USERS)
      .doc(connectedUserId)
      .get();

    if (!targetUserDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Check target user's privacy settings
    const targetPrivacyDoc = await dbAdmin
      .collection(COLLECTIONS.PRIVACY_SETTINGS)
      .doc(connectedUserId)
      .get();

    const targetPrivacy = targetPrivacyDoc.data();
    if (targetPrivacy?.friendRequests === 'none') {
      return NextResponse.json(
        { success: false, error: 'User is not accepting friend requests' },
        { status: 403 }
      );
    }

    // Get mutual spaces and interests for connection context
    const [senderDoc, mutualSpaces] = await Promise.all([
      dbAdmin.collection(COLLECTIONS.USERS).doc(userId).get(),
      getMutualSpaces(userId, connectedUserId)
    ]);

    const senderData = senderDoc.data();
    const targetData = targetUserDoc.data();
    const sharedInterests = getSharedInterests(
      senderData?.interests || [],
      targetData?.interests || []
    );

    // Create connection request
    const connectionId = dbAdmin.collection(COLLECTIONS.USER_CONNECTIONS).doc().id;
    const connection: UserConnection = {
      id: connectionId,
      userId,
      connectedUserId,
      status: 'pending',
      type: type as any,
      mutualSpaces,
      sharedInterests,
      connectionReason: reason,
      createdAt: FieldValue.serverTimestamp() as any,
      lastInteraction: FieldValue.serverTimestamp() as any
    };

    await dbAdmin
      .collection(COLLECTIONS.USER_CONNECTIONS)
      .doc(connectionId)
      .set(connection);

    // Create reverse connection for the target user to see the request
    const reverseConnectionId = dbAdmin.collection(COLLECTIONS.USER_CONNECTIONS).doc().id;
    const reverseConnection: UserConnection = {
      id: reverseConnectionId,
      userId: connectedUserId,
      connectedUserId: userId,
      status: 'pending',
      type: type as any,
      mutualSpaces,
      sharedInterests,
      connectionReason: reason,
      createdAt: FieldValue.serverTimestamp() as any,
      lastInteraction: FieldValue.serverTimestamp() as any
    };

    await dbAdmin
      .collection(COLLECTIONS.USER_CONNECTIONS)
      .doc(reverseConnectionId)
      .set(reverseConnection);

    // Log activity
    await logConnectionActivity(userId, 'connection_request_sent', {
      targetUserId: connectedUserId,
      type,
      mutualSpaces: mutualSpaces.length,
      sharedInterests: sharedInterests.length
    });

    return NextResponse.json({
      success: true,
      connection: {
        ...connection,
        connectedUser: {
          id: connectedUserId,
          fullName: targetData?.fullName,
          handle: targetData?.handle,
          avatarUrl: targetData?.avatarUrl,
          major: targetData?.major,
          academicYear: targetData?.academicYear
        }
      },
      message: 'Connection request sent successfully'
    });

  } catch (error) {
    logger.error('Error creating connection request', { error, userId });
    return NextResponse.json(
      { success: false, error: 'Failed to send connection request' },
      { status: 500 }
    );
  }
});

/**
 * PUT /api/profile/connections/manage
 * Update connection status (accept, decline, block)
 */
export const PUT = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const { connectionId, status, reason } = await request.json();

    if (!connectionId || !status) {
      return NextResponse.json(
        { success: false, error: 'Connection ID and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['accepted', 'blocked'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Get the connection
    const connectionDoc = await dbAdmin
      .collection(COLLECTIONS.USER_CONNECTIONS)
      .doc(connectionId)
      .get();

    if (!connectionDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Connection not found' },
        { status: 404 }
      );
    }

    const connectionData = connectionDoc.data()!;

    // Verify user owns this connection
    if (connectionData.userId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Update connection status
    const updateData: any = {
      status,
      lastInteraction: FieldValue.serverTimestamp()
    };

    if (status === 'accepted') {
      updateData.acceptedAt = FieldValue.serverTimestamp();
    }

    await dbAdmin
      .collection(COLLECTIONS.USER_CONNECTIONS)
      .doc(connectionId)
      .update(updateData);

    // Find and update the reverse connection
    const reverseConnectionSnapshot = await dbAdmin
      .collection(COLLECTIONS.USER_CONNECTIONS)
      .where('userId', '==', connectionData.connectedUserId)
      .where('connectedUserId', '==', userId)
      .limit(1)
      .get();

    if (!reverseConnectionSnapshot.empty) {
      await reverseConnectionSnapshot.docs[0].ref.update(updateData);
    }

    // Log activity
    await logConnectionActivity(userId, `connection_${status}`, {
      targetUserId: connectionData.connectedUserId,
      type: connectionData.type
    });

    return NextResponse.json({
      success: true,
      connection: {
        id: connectionId,
        ...connectionData,
        ...updateData
      },
      message: `Connection ${status} successfully`
    });

  } catch (error) {
    logger.error('Error updating connection', { error, userId });
    return NextResponse.json(
      { success: false, error: 'Failed to update connection' },
      { status: 500 }
    );
  }
});

/**
 * DELETE /api/profile/connections/manage
 * Remove/decline a connection
 */
export const DELETE = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const url = new URL(request.url);
    const connectionId = url.searchParams.get('connectionId');

    if (!connectionId) {
      return NextResponse.json(
        { success: false, error: 'Connection ID is required' },
        { status: 400 }
      );
    }

    // Get the connection
    const connectionDoc = await dbAdmin
      .collection(COLLECTIONS.USER_CONNECTIONS)
      .doc(connectionId)
      .get();

    if (!connectionDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Connection not found' },
        { status: 404 }
      );
    }

    const connectionData = connectionDoc.data()!;

    // Verify user owns this connection
    if (connectionData.userId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Delete the connection
    await dbAdmin
      .collection(COLLECTIONS.USER_CONNECTIONS)
      .doc(connectionId)
      .delete();

    // Find and delete the reverse connection
    const reverseConnectionSnapshot = await dbAdmin
      .collection(COLLECTIONS.USER_CONNECTIONS)
      .where('userId', '==', connectionData.connectedUserId)
      .where('connectedUserId', '==', userId)
      .limit(1)
      .get();

    if (!reverseConnectionSnapshot.empty) {
      await reverseConnectionSnapshot.docs[0].ref.delete();
    }

    // Log activity
    await logConnectionActivity(userId, 'connection_removed', {
      targetUserId: connectionData.connectedUserId,
      type: connectionData.type,
      previousStatus: connectionData.status
    });

    return NextResponse.json({
      success: true,
      message: 'Connection removed successfully'
    });

  } catch (error) {
    logger.error('Error removing connection', { error, userId });
    return NextResponse.json(
      { success: false, error: 'Failed to remove connection' },
      { status: 500 }
    );
  }
});

// Helper functions
async function getMutualSpaces(_userId1: string, _userId2: string): Promise<string[]> {
  // This would integrate with the Spaces system
  // For now, return empty array
  return [];
}

function getSharedInterests(interests1: string[], interests2: string[]): string[] {
  return interests1.filter(interest => interests2.includes(interest));
}

async function logConnectionActivity(
  userId: string, 
  action: string, 
  metadata: Record<string, any>
) {
  try {
    await dbAdmin
      .collection(COLLECTIONS.ACTIVITY_RECORDS)
      .add({
        userId,
        type: 'social',
        action,
        metadata,
        isPrivate: false,
        visibleTo: [],
        timestamp: FieldValue.serverTimestamp()
      });
  } catch (error) {
    logger.error('Error logging connection activity', { error, userId, action });
  }
}