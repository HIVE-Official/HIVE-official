import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { logger } from '@/lib/utils/structured-logger';
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';
import { z } from 'zod';
import * as admin from 'firebase-admin';

const DeviceTokenSchema = z.object({
  token: z.string().min(1),
  deviceInfo: z.object({
    userAgent: z.string().optional(),
    platform: z.string().optional(),
    language: z.string().optional(),
    screenResolution: z.string().optional(),
    timezone: z.string().optional()
  }).optional()
});

// POST /api/notifications/device-token - Save device token
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const body = await request.json();
    
    const { token, deviceInfo } = DeviceTokenSchema.parse(body);

    logger.info('Saving device token', { userId, tokenPrefix: token.substring(0, 10) });

    // Create device document
    const deviceData = {
      token,
      userId,
      deviceInfo: deviceInfo || {},
      platform: detectPlatform(deviceInfo?.userAgent),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastUsedAt: admin.firestore.FieldValue.serverTimestamp(),
      isActive: true
    };

    // Use token as document ID for easy lookup
    const deviceRef = dbAdmin
      .collection('users')
      .doc(userId)
      .collection('devices')
      .doc(token);

    await deviceRef.set(deviceData, { merge: true });

    // Also store in global devices collection for admin purposes
    await dbAdmin
      .collection('devices')
      .doc(token)
      .set({
        ...deviceData,
        userEmail: authContext.userEmail || null
      }, { merge: true });

    // Update user's notification preferences if first device
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (!userData?.pushNotificationsEnabled) {
      await dbAdmin.collection('users').doc(userId).update({
        pushNotificationsEnabled: true,
        lastDeviceRegistration: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    // Subscribe to default topics
    await subscribeToDefaultTopics(token, userId);

    logger.info('Device token saved successfully', { userId });

    return NextResponse.json({
      success: true,
      message: 'Device token saved successfully'
    });

  } catch (error) {
    logger.error('Failed to save device token', { error });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid device token data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to save device token' },
      { status: 500 }
    );
  }
}, {
  requireAuth: true,
  operation: 'save_device_token'
});

// DELETE /api/notifications/device-token - Remove device token
export const DELETE = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token required' },
        { status: 400 }
      );
    }

    logger.info('Removing device token', { userId, tokenPrefix: token.substring(0, 10) });

    // Remove from user's devices
    await dbAdmin
      .collection('users')
      .doc(userId)
      .collection('devices')
      .doc(token)
      .delete();

    // Mark as inactive in global devices collection
    await dbAdmin
      .collection('devices')
      .doc(token)
      .update({
        isActive: false,
        deactivatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

    // Unsubscribe from all topics
    await unsubscribeFromAllTopics(token);

    logger.info('Device token removed successfully', { userId });

    return NextResponse.json({
      success: true,
      message: 'Device token removed successfully'
    });

  } catch (error) {
    logger.error('Failed to remove device token', { error });

    return NextResponse.json(
      { success: false, error: 'Failed to remove device token' },
      { status: 500 }
    );
  }
}, {
  requireAuth: true,
  operation: 'remove_device_token'
});

// GET /api/notifications/device-token - Get user's device tokens
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;

    const devicesSnapshot = await dbAdmin
      .collection('users')
      .doc(userId)
      .collection('devices')
      .where('isActive', '==', true)
      .get();

    const devices = devicesSnapshot.docs.map(doc => ({
      token: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      lastUsedAt: doc.data().lastUsedAt?.toDate()
    }));

    return NextResponse.json({
      success: true,
      devices,
      count: devices.length
    });

  } catch (error) {
    logger.error('Failed to get device tokens', { error });

    return NextResponse.json(
      { success: false, error: 'Failed to get device tokens' },
      { status: 500 }
    );
  }
}, {
  requireAuth: true,
  operation: 'get_device_tokens'
});

/**
 * Detect platform from user agent
 */
function detectPlatform(userAgent?: string): string {
  if (!userAgent) return 'unknown';
  
  if (/android/i.test(userAgent)) return 'android';
  if (/iPad|iPhone|iPod/.test(userAgent)) return 'ios';
  if (/Windows/.test(userAgent)) return 'windows';
  if (/Mac/.test(userAgent)) return 'macos';
  if (/Linux/.test(userAgent)) return 'linux';
  
  return 'web';
}

/**
 * Subscribe device to default topics
 */
async function subscribeToDefaultTopics(token: string, userId: string): Promise<void> {
  try {
    const messaging = admin.messaging();
    
    // Subscribe to user-specific topic
    await messaging.subscribeToTopic(token, `user_${userId}`);
    
    // Subscribe to general announcements
    await messaging.subscribeToTopic(token, 'all_users');
    
    // Get user's spaces and subscribe to them
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    const userData = userDoc.data();
    const userSpaces = userData?.spaces || [];
    
    for (const spaceId of userSpaces.slice(0, 10)) { // Limit to 10 spaces
      await messaging.subscribeToTopic(token, `space_${spaceId}`);
    }
    
    logger.info('Subscribed to default topics', { userId, topicCount: userSpaces.length + 2 });
  } catch (error) {
    logger.error('Failed to subscribe to default topics', { error });
  }
}

/**
 * Unsubscribe device from all topics
 */
async function unsubscribeFromAllTopics(token: string): Promise<void> {
  try {
    const messaging = admin.messaging();
    
    // Get all topic subscriptions for this token
    // Note: Firebase doesn't provide a way to list topics, so we'll unsubscribe from known patterns
    
    // This would typically be tracked in your database
    // For now, we'll just log the attempt
    logger.info('Unsubscribing from all topics', { tokenPrefix: token.substring(0, 10) });
    
  } catch (error) {
    logger.error('Failed to unsubscribe from topics', { error });
  }
}