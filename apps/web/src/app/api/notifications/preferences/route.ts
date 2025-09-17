import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { logger } from '@/lib/logger';
import { FieldValue } from 'firebase-admin/firestore';

interface NotificationPreferences {
  enableInApp: boolean;
  enablePush: boolean;
  enableEmail: boolean;
  enableDesktop: boolean;
  quietHours?: {
    enabled: boolean;
    start: string; // HH:MM format
    end: string;   // HH:MM format
    timezone: string;
  };
  categorySettings: {
    social: { enabled: boolean; channels: string[]; priority: string };
    activity: { enabled: boolean; channels: string[]; priority: string };
    system: { enabled: boolean; channels: string[]; priority: string };
    achievement: { enabled: boolean; channels: string[]; priority: string };
    reminder: { enabled: boolean; channels: string[]; priority: string };
  };
  spaceSettings: Record<string, {
    enabled: boolean;
    channels: string[];
    types: string[];
  }>;
}

/**
 * Get user notification preferences
 */
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    const preferences = userData?.notificationPreferences;

    // Return default preferences if none exist
    const defaultPreferences: NotificationPreferences = {
      enableInApp: true,
      enablePush: true,
      enableEmail: false,
      enableDesktop: true,
      quietHours: {
        enabled: false,
        start: '22:00',
        end: '08:00',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      categorySettings: {
        social: { enabled: true, channels: ['in_app', 'push'], priority: 'medium' },
        activity: { enabled: true, channels: ['in_app'], priority: 'low' },
        system: { enabled: true, channels: ['in_app', 'push'], priority: 'high' },
        achievement: { enabled: true, channels: ['in_app', 'push'], priority: 'high' },
        reminder: { enabled: true, channels: ['in_app', 'push', 'email'], priority: 'high' }
      },
      spaceSettings: {}
    };

    return NextResponse.json({
      success: true,
      preferences: preferences || defaultPreferences
    });

  } catch (error) {
    logger.error('Failed to get notification preferences', { error });
    return NextResponse.json(
      { error: 'Failed to get notification preferences' },
      { status: 500 }
    );
  }
}, { 
  allowDevelopmentBypass: false,
  operation: 'get_notification_preferences'
});

/**
 * Update user notification preferences
 */
export const PUT = withAuth(async (request: NextRequest, authContext) => {
  try {
    const { preferences } = await request.json();

    if (!preferences) {
      return NextResponse.json(
        { error: 'Preferences are required' },
        { status: 400 }
      );
    }

    const userId = authContext.userId;

    // Update user preferences
    await dbAdmin.collection('users').doc(userId).update({
      notificationPreferences: preferences,
      updatedAt: FieldValue.serverTimestamp()
    });

    logger.info('Notification preferences updated', { userId });

    return NextResponse.json({
      success: true,
      message: 'Notification preferences updated successfully'
    });

  } catch (error) {
    logger.error('Failed to update notification preferences', { error });
    return NextResponse.json(
      { error: 'Failed to update notification preferences' },
      { status: 500 }
    );
  }
}, { 
  allowDevelopmentBypass: false,
  operation: 'update_notification_preferences'
});

/**
 * Update space-specific notification preferences
 */
export const PATCH = withAuth(async (request: NextRequest, authContext) => {
  try {
    const { spaceId, settings } = await request.json();

    if (!spaceId || !settings) {
      return NextResponse.json(
        { error: 'spaceId and settings are required' },
        { status: 400 }
      );
    }

    const userId = authContext.userId;

    // Update space-specific preferences
    await dbAdmin.collection('users').doc(userId).update({
      [`notificationPreferences.spaceSettings.${spaceId}`]: settings,
      updatedAt: FieldValue.serverTimestamp()
    });

    logger.info('Space notification preferences updated', { userId, spaceId });

    return NextResponse.json({
      success: true,
      message: 'Space notification preferences updated successfully'
    });

  } catch (error) {
    logger.error('Failed to update space notification preferences', { error });
    return NextResponse.json(
      { error: 'Failed to update space notification preferences' },
      { status: 500 }
    );
  }
}, { 
  allowDevelopmentBypass: false,
  operation: 'update_space_notification_preferences'
});