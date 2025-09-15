import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';
import { adminMessaging, dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { logger } from '@/lib/logger';
import { FieldValue } from 'firebase-admin/firestore';

interface SendNotificationRequest {
  targetUserId: string;
  title: string;
  body: string;
  type: string;
  actionUrl?: string;
  imageUrl?: string;
  data?: Record<string, string>;
  immediate?: boolean;
}

/**
 * Send push notification to user
 */
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const {
      targetUserId,
      title,
      body,
      type,
      actionUrl,
      imageUrl,
      data = {},
      immediate = true
    }: SendNotificationRequest = await request.json();

    if (!targetUserId || !title || !body) {
      return NextResponse.json(
        { error: 'targetUserId, title, and body are required' },
        { status: 400 }
      );
    }

    // Get target user's FCM tokens
    const userDoc = await dbAdmin.collection('users').doc(targetUserId).get();
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'Target user not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    const fcmTokens = userData?.fcmTokens || {};
    const tokens = Object.values(fcmTokens) as string[];

    if (tokens.length === 0) {
      logger.warn('No FCM tokens found for user', { targetUserId });
      return NextResponse.json(
        { error: 'User has no registered devices' },
        { status: 400 }
      );
    }

    // Create notification message
    const message = {
      tokens,
      notification: {
        title,
        body,
        imageUrl
      },
      data: {
        ...data,
        type,
        actionUrl: actionUrl || '',
        senderId: authContext.userId,
        timestamp: new Date().toISOString()
      },
      android: {
        priority: 'high' as const,
        notification: {
          sound: 'default',
          clickAction: 'FCM_PLUGIN_ACTIVITY'
        }
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1
          }
        }
      },
      webpush: {
        headers: {
          Urgency: 'high'
        },
        notification: {
          title,
          body,
          icon: '/assets/hive-logo-192.png',
          badge: '/assets/hive-badge-72.png',
          image: imageUrl,
          requireInteraction: false,
          actions: actionUrl ? [{
            action: 'view',
            title: 'View'
          }] : undefined
        },
        data: {
          ...data,
          actionUrl: actionUrl || '/dashboard'
        }
      }
    };

    // Send the notification
    const response = await adminMessaging.sendEachForMulticast(message);

    // Handle failed tokens
    if (response.failureCount > 0) {
      const invalidTokens: string[] = [];
      
      response.responses.forEach((resp, idx) => {
        if (!resp.success && 
            (resp.error?.code === 'messaging/registration-token-not-registered' ||
             resp.error?.code === 'messaging/invalid-registration-token')) {
          invalidTokens.push(tokens[idx]);
        }
      });

      // Remove invalid tokens
      if (invalidTokens.length > 0) {
        const tokenUpdates: Record<string, any> = {};
        Object.entries(fcmTokens).forEach(([tokenId, token]) => {
          if (invalidTokens.includes(token as string)) {
            tokenUpdates[`fcmTokens.${tokenId}`] = FieldValue.delete();
          }
        });

        if (Object.keys(tokenUpdates).length > 0) {
          await dbAdmin.collection('users').doc(targetUserId).update(tokenUpdates);
        }
      }
    }

    // Store notification in user's inbox (for in-app display)
    if (immediate) {
      await dbAdmin
        .collection('users')
        .doc(targetUserId)
        .collection('notifications')
        .add({
          title,
          body,
          type,
          actionUrl,
          imageUrl,
          data,
          senderId: authContext.userId,
          read: false,
          createdAt: FieldValue.serverTimestamp()
        });
    }

    logger.info('Push notification sent', {
      targetUserId,
      type,
      successCount: response.successCount,
      failureCount: response.failureCount
    });

    return NextResponse.json({
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount,
      message: `Notification sent to ${response.successCount} devices`
    });

  } catch (error) {
    logger.error('Failed to send push notification', { error });
    return NextResponse.json(
      { error: 'Failed to send push notification' },
      { status: 500 }
    );
  }
}, { 
  allowDevelopmentBypass: false,
  operation: 'send_push_notification'
});