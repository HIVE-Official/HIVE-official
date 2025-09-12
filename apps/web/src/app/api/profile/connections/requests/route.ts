import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from '@/lib/api-response-types';
import { withAuth } from '@/lib/api-auth-middleware';

// Connection request schema
const createConnectionRequestSchema = z.object({
  targetUserId: z.string().min(1, "Target user ID is required"),
  message: z.string().max(200, "Message must be less than 200 characters").optional(),
  context: z.enum(['search', 'space', 'recommendation', 'profile']).optional()
});

// Get connection requests schema
const getConnectionRequestsSchema = z.object({
  type: z.enum(['sent', 'received', 'all']).default('received'),
  limit: z.coerce.number().min(1).max(50).default(20),
  status: z.enum(['pending', 'accepted', 'rejected', 'expired']).optional()
});

const MAX_CONNECTIONS_PER_USER = 500;
const REQUEST_EXPIRY_DAYS = 30;

/**
 * Send connection request - cost-optimized batch operations
 * POST /api/profile/connections/requests
 */
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const body = await request.json();
    const requestData = createConnectionRequestSchema.parse(body);

    // Privacy check: Don't allow self-connection
    if (userId === requestData.targetUserId) {
      return NextResponse.json({
        success: false,
        error: 'Cannot send connection request to yourself'
      }, { status: HttpStatus.BAD_REQUEST });
    }

    // Check if target user exists and allows connections
    const targetUserDoc = await dbAdmin
      .collection('users')
      .doc(requestData.targetUserId)
      .get();

    if (!targetUserDoc.exists) {
      return NextResponse.json({
        success: false,
        error: 'Target user not found'
      }, { status: HttpStatus.NOT_FOUND });
    }

    const targetUserData = targetUserDoc.data()!;

    // Privacy check: Respect target user's connection settings
    const targetPrivacyDoc = await dbAdmin
      .collection('privacySettings')
      .doc(requestData.targetUserId)
      .get();

    const targetPrivacy = targetPrivacyDoc.exists ? targetPrivacyDoc.data() : {};
    
    if (targetPrivacy.allowConnectionRequests === false) {
      return NextResponse.json({
        success: false,
        error: 'User is not accepting connection requests'
      }, { status: HttpStatus.FORBIDDEN });
    }

    // Check if users are already connected
    const existingConnection = await checkExistingConnection(userId, requestData.targetUserId);
    
    if (existingConnection.isConnected) {
      return NextResponse.json({
        success: false,
        error: 'Already connected to this user'
      }, { status: HttpStatus.BAD_REQUEST });
    }

    if (existingConnection.pendingRequest) {
      return NextResponse.json({
        success: false,
        error: 'Connection request already pending'
      }, { status: HttpStatus.BAD_REQUEST });
    }

    // Check sender's connection limit
    const senderDoc = await dbAdmin.collection('users').doc(userId).get();
    const senderData = senderDoc.exists ? senderDoc.data() : {};
    const currentConnections = senderData.connectionCount || 0;

    if (currentConnections >= MAX_CONNECTIONS_PER_USER) {
      return NextResponse.json({
        success: false,
        error: `Maximum connections limit reached (${MAX_CONNECTIONS_PER_USER})`
      }, { status: HttpStatus.BAD_REQUEST });
    }

    // Get sender's privacy settings for anonymous requests
    const senderPrivacyDoc = await dbAdmin
      .collection('privacySettings')
      .doc(userId)
      .get();

    const senderPrivacy = senderPrivacyDoc.exists ? senderPrivacyDoc.data() : {};
    const senderInGhostMode = senderPrivacy.ghostMode?.enabled || false;

    // Create connection request with batch operation
    const batch = dbAdmin.batch();
    const requestId = dbAdmin.collection('connection_requests').doc().id;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REQUEST_EXPIRY_DAYS);

    // Create connection request document
    const requestRef = dbAdmin.collection('connection_requests').doc(requestId);
    batch.set(requestRef, {
      id: requestId,
      fromUserId: userId,
      toUserId: requestData.targetUserId,
      message: requestData.message || '',
      context: requestData.context || 'profile',
      status: 'pending',
      anonymous: senderInGhostMode,
      createdAt: FieldValue.serverTimestamp(),
      expiresAt: FieldValue.serverTimestamp(), // Will be set to actual expiry in production
      campusId: 'ub-buffalo'
    });

    // Create notification for target user (cost-efficient)
    const notificationRef = dbAdmin.collection('notifications').doc();
    batch.set(notificationRef, {
      userId: requestData.targetUserId,
      type: 'connection_request',
      title: senderInGhostMode 
        ? 'New connection request' 
        : `${senderData.fullName || 'Someone'} wants to connect`,
      message: requestData.message || 'New connection request received',
      data: {
        requestId,
        fromUserId: senderInGhostMode ? null : userId,
        fromUserName: senderInGhostMode ? null : senderData.fullName
      },
      read: false,
      createdAt: FieldValue.serverTimestamp(),
      campusId: 'ub-buffalo'
    });

    // Update sender's pending requests count
    const senderRef = dbAdmin.collection('users').doc(userId);
    batch.update(senderRef, {
      pendingConnectionRequestsSent: FieldValue.increment(1),
      lastConnectionActivity: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });

    // Update target's pending requests count
    const targetRef = dbAdmin.collection('users').doc(requestData.targetUserId);
    batch.update(targetRef, {
      pendingConnectionRequestsReceived: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp()
    });

    await batch.commit();

    // Track connection request for analytics (async, don't block)
    trackConnectionActivity(userId, requestData.targetUserId, 'request_sent', requestData.context)
      .catch(error => {
        logger.warn('Connection activity tracking failed', { error });
      });

    return NextResponse.json({
      success: true,
      request: {
        id: requestId,
        targetUserId: requestData.targetUserId,
        status: 'pending',
        expiresAt: expiresAt.toISOString()
      },
      message: 'Connection request sent successfully'
    });

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: error.errors
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error sending connection request', {
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: '/api/profile/connections/requests'
    });

    return NextResponse.json(
      ApiResponseHelper.error('Failed to send connection request', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, {
  operation: 'send_connection_request'
});

/**
 * Get connection requests (sent/received)
 * GET /api/profile/connections/requests
 */
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const { searchParams } = new URL(request.url);
    
    const params = getConnectionRequestsSchema.parse({
      type: searchParams.get('type'),
      limit: searchParams.get('limit'),
      status: searchParams.get('status')
    });

    let query = dbAdmin.collection('connection_requests') as any;

    // Filter by request direction
    if ((await params).type === 'sent') {
      query = query.where('fromUserId', '==', userId);
    } else if ((await params).type === 'received') {
      query = query.where('toUserId', '==', userId);
    } else {
      // Get both sent and received (more complex query)
      const [sentSnapshot, receivedSnapshot] = await Promise.all([
        dbAdmin.collection('connection_requests')
          .where('fromUserId', '==', userId)
          .orderBy('createdAt', 'desc')
          .limit(Math.ceil((await params).limit / 2))
          .get(),
        dbAdmin.collection('connection_requests')
          .where('toUserId', '==', userId)
          .orderBy('createdAt', 'desc')
          .limit(Math.ceil((await params).limit / 2))
          .get()
      ]);

      const allRequests = [
        ...sentSnapshot.docs.map(doc => ({ ...doc.data(), direction: 'sent' })),
        ...receivedSnapshot.docs.map(doc => ({ ...doc.data(), direction: 'received' }))
      ].sort((a, b) => (b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt)).getTime() - (a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt)).getTime())
        .slice(0, (await params).limit);

      return NextResponse.json({
        success: true,
        requests: allRequests,
        hasMore: allRequests.length === (await params).limit
      });
    }

    // Apply status filter if specified
    if ((await params).status) {
      query = query.where('status', '==', (await params).status);
    }

    // Execute query
    const snapshot = await query
      .orderBy('createdAt', 'desc')
      .limit((await params).limit)
      .get();

    const requests = await Promise.all(
      snapshot.docs.map(async (doc: any) => {
        const requestData = doc.data();
        
        // Get user info for display (respect privacy)
        const otherUserId = (await params).type === 'sent' ? requestData.toUserId : requestData.fromUserId;
        const otherUserDoc = await dbAdmin.collection('users').doc(otherUserId).get();
        const otherUserData = otherUserDoc.exists ? otherUserDoc.data() : {};

        return {
          ...requestData,
          direction: (await params).type,
          otherUser: {
            id: otherUserId,
            fullName: requestData.anonymous && (await params).type === 'received' 
              ? 'Anonymous User' 
              : otherUserData.fullName || 'Unknown User',
            handle: requestData.anonymous && (await params).type === 'received'
              ? null
              : otherUserData.handle,
            avatarUrl: requestData.anonymous && (await params).type === 'received'
              ? null
              : otherUserData.profilePhoto || otherUserData.avatarUrl,
            major: otherUserData.major,
            academicYear: otherUserData.academicYear
          },
          createdAt: requestData.createdAt?.toDate ? requestData.createdAt.toDate() : new Date(requestData.createdAt).toISOString(),
          expiresAt: requestData.expiresAt?.toDate?.()?.toISOString()
        };
      })
    );

    return NextResponse.json({
      success: true,
      requests,
      hasMore: requests.length === (await params).limit,
      summary: {
        type: (await params).type,
        status: (await params).status,
        total: requests.length
      }
    });

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid query parameters',
          details: error.errors
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error fetching connection requests', {
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: '/api/profile/connections/requests'
    });

    return NextResponse.json(
      ApiResponseHelper.error('Failed to fetch connection requests', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, {
  operation: 'get_connection_requests'
});

/**
 * Check if connection or request already exists
 */
async function checkExistingConnection(userId1: string, userId2: string) {
  // Check for existing connection
  const [user1Lower, user2Lower] = [userId1, userId2].sort();
  const connectionId = `${user1Lower}_${user2Lower}`;
  
  const connectionDoc = await dbAdmin
    .collection('connections')
    .doc(connectionId)
    .get();

  if (connectionDoc.exists) {
    return { isConnected: true, pendingRequest: false };
  }

  // Check for pending request in either direction
  const [pendingRequest1, pendingRequest2] = await Promise.all([
    dbAdmin.collection('connection_requests')
      .where('fromUserId', '==', userId1)
      .where('toUserId', '==', userId2)
      .where('status', '==', 'pending')
      .limit(1)
      .get(),
    dbAdmin.collection('connection_requests')
      .where('fromUserId', '==', userId2)
      .where('toUserId', '==', userId1)
      .where('status', '==', 'pending')
      .limit(1)
      .get()
  ]);

  const hasPendingRequest = !pendingRequest1.empty || !pendingRequest2.empty;

  return { isConnected: false, pendingRequest: hasPendingRequest };
}

/**
 * Track connection activity for analytics
 */
async function trackConnectionActivity(
  fromUserId: string,
  toUserId: string,
  action: 'request_sent' | 'request_accepted' | 'request_rejected',
  context?: string
) {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Update daily connection stats
    const statsRef = dbAdmin
      .collection('connection_stats')
      .doc(`campus_ub-buffalo_${today}`);

    await statsRef.set({
      date: today,
      campusId: 'ub-buffalo',
      [`${action}Count`]: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });

  } catch (error) {
    // Don't throw - this is background tracking
    logger.warn('Connection activity tracking failed', { error });
  }
}