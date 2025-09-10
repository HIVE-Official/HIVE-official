import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { withAuth } from '@/lib/api-auth-middleware';
import { logger } from '@/lib/logger';
import { FieldValue } from 'firebase-admin/firestore';

interface RegisterTokenRequest {
  fcmToken: string;
  platform?: string;
  deviceInfo?: any;
}

export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const body: RegisterTokenRequest = await request.json();
    const { fcmToken, platform = 'web', deviceInfo = {} } = body;

    if (!fcmToken) {
      return NextResponse.json(
        { error: 'FCM token is required' },
        { status: 400 }
      );
    }

    const userId = authContext.userId;

    // Store token in user's document
    const userRef = dbAdmin.collection('users').doc(userId);
    const tokenRef = userRef.collection('fcmTokens').doc(fcmToken);

    await tokenRef.set({
      token: fcmToken,
      platform,
      deviceInfo,
      createdAt: FieldValue.serverTimestamp(),
      lastUsed: FieldValue.serverTimestamp(),
      isActive: true,
    });

    // Also update user document with latest token
    await userRef.update({
      lastFcmToken: fcmToken,
      notificationsEnabled: true,
      lastTokenUpdate: FieldValue.serverTimestamp(),
    });

    logger.info('FCM token registered', { 
      userId, 
      platform,
      tokenPrefix: fcmToken.substring(0, 10) + '...'
    });

    return NextResponse.json({
      success: true,
      message: 'FCM token registered successfully',
    });

  } catch (error) {
    logger.error('Error registering FCM token', { error });
    return NextResponse.json(
      { error: 'Failed to register FCM token' },
      { status: 500 }
    );
  }
}, {
  requireAuth: true,
  operation: 'register_fcm_token'
});