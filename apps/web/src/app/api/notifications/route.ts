import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth-server';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { type HiveNotification } from "@/lib/notifications-service";

// Real notification fetching from Firebase
async function getUserNotifications(
  userId: string,
  limit: number,
  unreadOnly: boolean,
  category?: string
): Promise<{ notifications: HiveNotification[], unreadCount: number }> {
  try {
    let query = dbAdmin.collection('notifications')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc');

    if (category && category !== 'all') {
      query = query.where('category', '==', category);
    }

    if (unreadOnly) {
      query = query.where('isRead', '==', false);
    }

    const snapshot = await query.limit(limit).get();
    const notifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as HiveNotification[];

    // Get unread count separately
    const unreadSnapshot = await dbAdmin.collection('notifications')
      .where('userId', '==', userId)
      .where('isRead', '==', false)
      .count()
      .get();
    
    const unreadCount = unreadSnapshot.data().count;

    return { notifications, unreadCount };
  } catch (error) {
    logger.error('Error fetching user notifications', { error, userId });
    return { notifications: [], unreadCount: 0 };
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const unreadOnly = searchParams.get('unread') === 'true';
    const category = searchParams.get('category') || undefined;

    const { notifications, unreadCount } = await getUserNotifications(
      user.uid,
      limit,
      unreadOnly,
      category
    );

    return NextResponse.json({
      notifications,
      unreadCount,
      hasMore: notifications.length === limit
    });

  } catch (error) {
    logger.error('Error fetching notifications', { error: error, endpoint: '/api/notifications' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch notifications", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    
    if (body.action === 'mark_read') {
      const notificationIds = Array.isArray(body.notificationIds) 
        ? body.notificationIds 
        : [body.notificationIds];

      // Update notifications in Firebase
      const batch = dbAdmin.batch();
      for (const notificationId of notificationIds) {
        const notificationRef = dbAdmin.collection('notifications').doc(notificationId);
        batch.update(notificationRef, { 
          isRead: true, 
          readAt: new Date().toISOString() 
        });
      }
      await batch.commit();

      logger.info('Marked notifications as read', { notificationId: notificationIds.join(','), userId: user.uid });

      return NextResponse.json({
        success: true,
        message: 'Notifications marked as read'
      });
    }

    if (body.action === 'mark_all_read') {
      // Update all unread notifications for user
      const unreadNotifications = await dbAdmin.collection('notifications')
        .where('userId', '==', user.uid)
        .where('isRead', '==', false)
        .get();

      const batch = dbAdmin.batch();
      unreadNotifications.docs.forEach(doc => {
        batch.update(doc.ref, { 
          isRead: true, 
          readAt: new Date().toISOString() 
        });
      });
      await batch.commit();

      logger.info('Marked all notifications as read', { userId: user.uid, count: unreadNotifications.size });

      return NextResponse.json({
        success: true,
        message: 'All notifications marked as read',
        updatedCount: unreadNotifications.size
      });
    }

    if (body.action === 'delete') {
      const notificationIds = Array.isArray(body.notificationIds) 
        ? body.notificationIds 
        : [body.notificationIds];

      // Delete notifications from Firebase
      const batch = dbAdmin.batch();
      for (const notificationId of notificationIds) {
        const notificationRef = dbAdmin.collection('notifications').doc(notificationId);
        batch.delete(notificationRef);
      }
      await batch.commit();

      logger.info('Deleted notifications', { notificationId: notificationIds.join(','), userId: user.uid });

      return NextResponse.json({
        success: true,
        message: 'Notifications deleted'
      });
    }

    return NextResponse.json(ApiResponseHelper.error("Invalid action", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });

  } catch (error) {
    logger.error('Error handling notification action', { error: error, endpoint: '/api/notifications' });
    return NextResponse.json(ApiResponseHelper.error("Failed to process notification action", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const { notificationId, isRead } = body;

    if (!notificationId) {
      return NextResponse.json(ApiResponseHelper.error("Notification ID is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Verify notification belongs to user and update
    const notificationRef = dbAdmin.collection('notifications').doc(notificationId);
    const notificationDoc = await notificationRef.get();
    
    if (!notificationDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Notification not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const notificationData = notificationDoc.data();
    if (notificationData?.userId !== user.uid) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized access to notification", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Update notification
    const updates: any = { isRead };
    if (isRead && !notificationData?.readAt) {
      updates.readAt = new Date().toISOString();
    }
    
    await notificationRef.update(updates);

    logger.info('Updated notification read status', { notificationId, userId: user.uid });

    return NextResponse.json({
      success: true,
      message: 'Notification updated successfully'
    });

  } catch (error) {
    logger.error('Error updating notification', { error: error, endpoint: '/api/notifications' });
    return NextResponse.json(ApiResponseHelper.error("Failed to update notification", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

