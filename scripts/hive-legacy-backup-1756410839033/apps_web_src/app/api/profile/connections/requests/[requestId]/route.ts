import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from '@/lib/api-response-types';
import { withAuth } from '@/lib/api-auth-middleware';

// Connection request response schema
const respondToRequestSchema = z.object({
  action: z.enum(['accept', 'reject']),
  message: z.string().max(200).optional()
});

/**
 * Respond to connection request (accept/reject)
 * PATCH /api/profile/connections/requests/[requestId]
 */
export const PATCH = withAuth(async (request: NextRequest, authContext, { params }: { params: Promise<{ requestId: string }> }) => {
  try {
    const userId = authContext.userId;
    const { requestId } = await params;
    const body = await request.json();
    const responseData = respondToRequestSchema.parse(body);

    // Get the connection request
    const requestDoc = await dbAdmin
      .collection('connection_requests')
      .doc(requestId)
      .get();

    if (!requestDoc.exists) {
      return NextResponse.json({
        success: false,
        error: 'Connection request not found'
      }, { status: HttpStatus.NOT_FOUND });
    }

    const requestData = requestDoc.data()!;

    // Verify user is the recipient of this request
    if (requestData.toUserId !== userId) {
      return NextResponse.json({
        success: false,
        error: 'Not authorized to respond to this request'
      }, { status: HttpStatus.FORBIDDEN });
    }

    // Check if request is still pending
    if (requestData.status !== 'pending') {
      return NextResponse.json({
        success: false,
        error: `Request already ${requestData.status}`
      }, { status: HttpStatus.BAD_REQUEST });
    }

    // Check if request has expired
    const now = new Date();
    const expiresAt = requestData.expiresAt?.toDate?.();
    if (expiresAt && expiresAt < now) {
      return NextResponse.json({
        success: false,
        error: 'Connection request has expired'
      }, { status: HttpStatus.BAD_REQUEST });
    }

    const batch = dbAdmin.batch();

    // Update the connection request status
    const requestRef = dbAdmin.collection('connection_requests').doc(requestId);
    batch.update(requestRef, {
      status: responseData.action === 'accept' ? 'accepted' : 'rejected',
      responseMessage: responseData.message || '',
      respondedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });

    // If accepting, create the connection
    if (responseData.action === 'accept') {
      await createConnection(batch, requestData.fromUserId, userId, requestData);
    }

    // Update user counters
    await updateUserCounters(batch, requestData, responseData.action === 'accept');

    // Create notification for the requester
    await createResponseNotification(batch, requestData, responseData.action, userId);

    await batch.commit();

    // Track connection activity (async)
    trackConnectionActivity(
      requestData.fromUserId,
      userId,
      responseData.action === 'accept' ? 'request_accepted' : 'request_rejected'
    ).catch(error => {
      logger.warn('Connection activity tracking failed', { error });
    });

    const resultMessage = responseData.action === 'accept' 
      ? 'Connection request accepted - you are now connected!'
      : 'Connection request rejected';

    return NextResponse.json({
      success: true,
      request: {
        id: requestId,
        status: responseData.action === 'accept' ? 'accepted' : 'rejected',
        action: responseData.action
      },
      connected: responseData.action === 'accept',
      message: resultMessage
    });

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid response data',
          details: error.errors
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error responding to connection request', {
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: '/api/profile/connections/requests/[requestId]'
    });

    return NextResponse.json(
      ApiResponseHelper.error('Failed to respond to connection request', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, {
  operation: 'respond_to_connection_request'
});

/**
 * Delete/withdraw connection request
 * DELETE /api/profile/connections/requests/[requestId]
 */
export const DELETE = withAuth(async (request: NextRequest, authContext, { params }: { params: Promise<{ requestId: string }> }) => {
  try {
    const userId = authContext.userId;
    const { requestId } = await params;

    // Get the connection request
    const requestDoc = await dbAdmin
      .collection('connection_requests')
      .doc(requestId)
      .get();

    if (!requestDoc.exists) {
      return NextResponse.json({
        success: false,
        error: 'Connection request not found'
      }, { status: HttpStatus.NOT_FOUND });
    }

    const requestData = requestDoc.data()!;

    // Verify user is the sender of this request
    if (requestData.fromUserId !== userId) {
      return NextResponse.json({
        success: false,
        error: 'Not authorized to withdraw this request'
      }, { status: HttpStatus.FORBIDDEN });
    }

    // Check if request is still pending
    if (requestData.status !== 'pending') {
      return NextResponse.json({
        success: false,
        error: 'Cannot withdraw non-pending request'
      }, { status: HttpStatus.BAD_REQUEST });
    }

    const batch = dbAdmin.batch();

    // Update request status to withdrawn
    const requestRef = dbAdmin.collection('connection_requests').doc(requestId);
    batch.update(requestRef, {
      status: 'withdrawn',
      withdrawnAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });

    // Update sender's pending count
    const senderRef = dbAdmin.collection('users').doc(userId);
    batch.update(senderRef, {
      pendingConnectionRequestsSent: FieldValue.increment(-1),
      updatedAt: FieldValue.serverTimestamp()
    });

    // Update target's pending count
    const targetRef = dbAdmin.collection('users').doc(requestData.toUserId);
    batch.update(targetRef, {
      pendingConnectionRequestsReceived: FieldValue.increment(-1),
      updatedAt: FieldValue.serverTimestamp()
    });

    // Remove notification if it exists
    const notificationsSnapshot = await dbAdmin
      .collection('notifications')
      .where('userId', '==', requestData.toUserId)
      .where('type', '==', 'connection_request')
      .where('data.requestId', '==', requestId)
      .limit(1)
      .get();

    if (!notificationsSnapshot.empty) {
      batch.delete(notificationsSnapshot.docs[0].ref);
    }

    await batch.commit();

    return NextResponse.json({
      success: true,
      message: 'Connection request withdrawn successfully'
    });

  } catch (error: unknown) {
    logger.error('Error withdrawing connection request', {
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: '/api/profile/connections/requests/[requestId]'
    });

    return NextResponse.json(
      ApiResponseHelper.error('Failed to withdraw connection request', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, {
  operation: 'withdraw_connection_request'
});

/**
 * Create connection between two users
 */
async function createConnection(
  batch: FirebaseFirestore.WriteBatch,
  userId1: string,
  userId2: string,
  requestData: any
) {
  // Create symmetric connection ID (alphabetical order for consistency)
  const [user1Lower, user2Lower] = [userId1, userId2].sort();
  const connectionId = `${user1Lower}_${user2Lower}`;

  const connectionRef = dbAdmin.collection('connections').doc(connectionId);
  
  batch.set(connectionRef, {
    id: connectionId,
    userId1: user1Lower,
    userId2: user2Lower,
    status: 'active',
    connectedAt: FieldValue.serverTimestamp(),
    connectionType: 'mutual', // Default type
    context: requestData.context || 'profile',
    campusId: 'ub-buffalo'
  });

  // Update both users' connection counts
  const user1Ref = dbAdmin.collection('users').doc(userId1);
  const user2Ref = dbAdmin.collection('users').doc(userId2);

  batch.update(user1Ref, {
    connectionCount: FieldValue.increment(1),
    lastConnectionActivity: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  });

  batch.update(user2Ref, {
    connectionCount: FieldValue.increment(1),
    lastConnectionActivity: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  });
}

/**
 * Update user counters after request response
 */
async function updateUserCounters(
  batch: FirebaseFirestore.WriteBatch,
  requestData: any,
  accepted: boolean
) {
  // Update sender's pending count
  const senderRef = dbAdmin.collection('users').doc(requestData.fromUserId);
  batch.update(senderRef, {
    pendingConnectionRequestsSent: FieldValue.increment(-1),
    ...(accepted && { connectionsAccepted: FieldValue.increment(1) }),
    updatedAt: FieldValue.serverTimestamp()
  });

  // Update recipient's pending count
  const recipientRef = dbAdmin.collection('users').doc(requestData.toUserId);
  batch.update(recipientRef, {
    pendingConnectionRequestsReceived: FieldValue.increment(-1),
    ...(accepted && { connectionsAccepted: FieldValue.increment(1) }),
    updatedAt: FieldValue.serverTimestamp()
  });
}

/**
 * Create notification for connection request response
 */
async function createResponseNotification(
  batch: FirebaseFirestore.WriteBatch,
  requestData: any,
  action: 'accept' | 'reject',
  responderId: string
) {
  // Get responder info for notification
  const responderDoc = await dbAdmin.collection('users').doc(responderId).get();
  const responderData = responderDoc.exists ? responderDoc.data() : {};

  const notificationRef = dbAdmin.collection('notifications').doc();
  
  batch.set(notificationRef, {
    userId: requestData.fromUserId,
    type: action === 'accept' ? 'connection_accepted' : 'connection_rejected',
    title: action === 'accept' 
      ? `${responderData.fullName || 'Someone'} accepted your connection request`
      : `Connection request declined`,
    message: action === 'accept'
      ? `You are now connected with ${responderData.fullName || 'this person'}`
      : 'Your connection request was declined',
    data: {
      otherUserId: responderId,
      otherUserName: responderData.fullName,
      requestId: requestData.id
    },
    read: false,
    createdAt: FieldValue.serverTimestamp(),
    campusId: 'ub-buffalo'
  });

  // Remove the original request notification
  const originalNotificationsSnapshot = await dbAdmin
    .collection('notifications')
    .where('userId', '==', requestData.toUserId)
    .where('type', '==', 'connection_request')
    .where('data.requestId', '==', requestData.id)
    .limit(1)
    .get();

  if (!originalNotificationsSnapshot.empty) {
    batch.delete(originalNotificationsSnapshot.docs[0].ref);
  }
}

/**
 * Track connection activity for analytics
 */
async function trackConnectionActivity(
  fromUserId: string,
  toUserId: string,
  action: 'request_accepted' | 'request_rejected'
) {
  try {
    const today = new Date().toISOString().split('T')[0];
    
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
    logger.warn('Connection activity tracking failed', { error });
  }
}