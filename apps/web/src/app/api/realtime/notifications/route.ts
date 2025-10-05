import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

// Live notifications interfaces
interface LiveNotification {
  id: string;
  userId: string;
  type: 'mention' | 'tool_update' | 'space_event' | 'system_announcement' | 'message_reaction' | 'space_invitation' | 'tool_deployment';
  title: string;
  content: string;
  sourceId: string; // ID of the source (message, tool, event, etc.)
  sourceType: 'message' | 'tool' | 'event' | 'space' | 'system';
  spaceId?: string;
  spaceName?: string;
  metadata: {
    timestamp: string;
    priority: 'low' | 'normal' | 'high' | 'urgent';
    actionUrl?: string;
    imageUrl?: string;
    expiresAt?: string;
    category: string;
    tags: string[];
  };
  delivery: {
    channels: ('push' | 'email' | 'in_app' | 'sms')[];
    sent: boolean;
    sentAt?: string;
    delivered: boolean;
    deliveredAt?: string;
    clicked: boolean;
    clickedAt?: string;
  };
  status: 'unread' | 'read' | 'archived' | 'dismissed';
  readAt?: string;
  isActive: boolean;
}

interface NotificationPreferences {
  userId: string;
  globalSettings: {
    enabled: boolean;
    quietHours: {
      enabled: boolean;
      startTime: string; // HH:MM format
      endTime: string; // HH:MM format
      timezone: string;
    };
    maxNotificationsPerHour: number;
    groupSimilar: boolean;
  };
  channels: {
    push: {
      enabled: boolean;
      types: string[];
    };
    email: {
      enabled: boolean;
      types: string[];
      frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
    };
    inApp: {
      enabled: boolean;
      types: string[];
    };
  };
  typeSettings: Record<string, {
    enabled: boolean;
    channels: string[];
    priority: string;
  }>;
  spaceSettings: Record<string, {
    enabled: boolean;
    types: string[];
    muteUntil?: string;
  }>;
  updatedAt: string;
}

interface NotificationBatch {
  id: string;
  userId: string;
  notifications: LiveNotification[];
  batchType: 'grouped' | 'digest' | 'real_time';
  groupingCriteria: {
    sourceType: string;
    spaceId?: string;
    timeWindow: number; // minutes
  };
  scheduledFor: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

// POST - Create and send a live notification
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const {
      targetUserId,
      type,
      title,
      content,
      sourceId,
      sourceType,
      spaceId,
      metadata = {},
      deliveryChannels = ['in_app']
    } = body;

    if (!targetUserId || !type || !title || !content || !sourceId || !sourceType) {
      return NextResponse.json(ApiResponseHelper.error("Target user ID, type, title, content, source ID, and source type are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Get target user's notification preferences
    const userPreferences = await getUserNotificationPreferences(targetUserId);
    
    // Check if notifications are enabled for this type
    if (!shouldSendNotification(type, spaceId, userPreferences)) {
      return NextResponse.json({
        success: true,
        notification: null,
        message: 'Notification blocked by user preferences'
      });
    }

    // Get space name if spaceId provided
    let spaceName;
    if (spaceId) {
      const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();
      spaceName = spaceDoc.exists ? spaceDoc.data()?.name : undefined;
    }

    // Generate notification ID
    const notificationId = `notif_${targetUserId}_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;

    // Determine delivery channels based on preferences
    const allowedChannels = getEnabledChannels(type, userPreferences);
    const finalChannels = deliveryChannels.filter((channel: string) => allowedChannels.includes(channel));

    const notification: LiveNotification = {
      id: notificationId,
      userId: targetUserId,
      type,
      title,
      content,
      sourceId,
      sourceType,
      spaceId,
      spaceName,
      metadata: {
        timestamp: new Date().toISOString(),
        priority: metadata.priority || 'normal',
        actionUrl: metadata.actionUrl,
        imageUrl: metadata.imageUrl,
        expiresAt: metadata.expiresAt,
        category: metadata.category || type,
        tags: metadata.tags || []
      },
      delivery: {
        channels: finalChannels,
        sent: false,
        delivered: false,
        clicked: false
      },
      status: 'unread',
      isActive: true
    };

    // Store notification in Firestore
    await dbAdmin.collection('liveNotifications').doc(notificationId).set(notification);

    // Check if notification should be batched or sent immediately
    const shouldBatch = await shouldBatchNotification(notification, userPreferences);
    
    if (shouldBatch) {
      await addToBatch(notification);
    } else {
      await sendNotificationImmediately(notification);
    }

    // Send real-time notification to user
    await broadcastNotificationToUser(notification);

    // Update notification statistics
    await updateNotificationStats(targetUserId, type, spaceId);

    return NextResponse.json({
      success: true,
      notification: {
        id: notificationId,
        type,
        title,
        deliveryChannels: finalChannels,
        timestamp: notification.metadata.timestamp
      }
    });
  } catch (error) {
    logger.error(
      `Error creating live notification at /api/realtime/notifications`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to create notification", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// GET - Get user's live notifications
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'unread'; // 'unread', 'read', 'all'
    const type = searchParams.get('type'); // Filter by notification type
    const spaceId = searchParams.get('spaceId'); // Filter by space
    const limit = parseInt(searchParams.get('limit') || '50');
    const before = searchParams.get('before'); // For pagination
    const includeExpired = searchParams.get('includeExpired') === 'true';

    // Build query
    let notificationQuery = dbAdmin.collection('liveNotifications')
      .where('userId', '==', user.id)
      .where('isActive', '==', true);

    // Add status filter
    if (status !== 'all') {
      notificationQuery = notificationQuery.where('status', '==', status);
    }

    // Add type filter
    if (type) {
      notificationQuery = notificationQuery.where('type', '==', type);
    }

    // Add space filter
    if (spaceId) {
      notificationQuery = notificationQuery.where('spaceId', '==', spaceId);
    }

    // Add ordering and limit
    notificationQuery = notificationQuery
      .orderBy('metadata.timestamp', 'desc')
      .limit(limit);

    // Add pagination
    if (before) {
      const beforeDoc = await dbAdmin.collection('liveNotifications').doc(before).get();
      if (beforeDoc.exists) {
        notificationQuery = notificationQuery.startAfter(beforeDoc);
      }
    }

    const notificationsSnapshot = await notificationQuery.get();
    let notifications = notificationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as LiveNotification[];

    // Filter out expired notifications if not explicitly included
    if (!includeExpired) {
      const now = new Date();
      notifications = notifications.filter(notif => 
        !notif.metadata.expiresAt || new Date(notif.metadata.expiresAt) > now
      );
    }

    // Get summary statistics
    const unreadCount = await getUnreadNotificationCount(user.id);
    const totalCount = await getTotalNotificationCount(user.id);

    return NextResponse.json({
      success: true,
      notifications,
      summary: {
        unreadCount,
        totalCount,
        hasMore: notificationsSnapshot.docs.length === limit
      },
      lastNotificationId: notifications.length > 0 ? notifications[notifications.length - 1].id : null
    });
  } catch (error) {
    logger.error(
      `Error getting live notifications at /api/realtime/notifications`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to get notifications", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PUT - Update notification status (mark as read, archive, etc.)
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const {
      notificationIds = [], // Array of notification IDs
      action, // 'mark_read', 'mark_unread', 'archive', 'dismiss', 'mark_clicked'
      markAllAsRead = false
    } = body;

    if (!action && !markAllAsRead) {
      return NextResponse.json(ApiResponseHelper.error("Action is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    let updatedCount = 0;

    if (markAllAsRead) {
      // Mark all unread notifications as read
      const unreadQuery = dbAdmin.collection('liveNotifications')
        .where('userId', '==', user.id)
        .where('status', '==', 'unread')
        .where('isActive', '==', true);

      const unreadSnapshot = await unreadQuery.get();
      const updatePromises = unreadSnapshot.docs.map(doc =>
        doc.ref.update({
          status: 'read',
          readAt: new Date().toISOString()
        })
      );

      await Promise.all(updatePromises);
      updatedCount = unreadSnapshot.size;

      // Broadcast read status update
      await broadcastNotificationStatusUpdate(user.id, 'bulk_read', unreadSnapshot.docs.map(doc => doc.id));
    } else {
      // Handle specific notifications
      if (notificationIds.length === 0) {
        return NextResponse.json(ApiResponseHelper.error("Notification IDs are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
      }

      const updates: any = {};
      const timestamp = new Date().toISOString();

      switch (action) {
        case 'mark_read':
          updates.status = 'read';
          updates.readAt = timestamp;
          break;
        case 'mark_unread':
          updates.status = 'unread';
          updates.readAt = null;
          break;
        case 'archive':
          updates.status = 'archived';
          break;
        case 'dismiss':
          updates.status = 'dismissed';
          break;
        case 'mark_clicked':
          updates['delivery.clicked'] = true;
          updates['delivery.clickedAt'] = timestamp;
          break;
        default:
          return NextResponse.json(ApiResponseHelper.error("Invalid action", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
      }

      // Update notifications
      const updatePromises = notificationIds.map(async (notificationId: string) => {
        const notificationDoc = await dbAdmin.collection('liveNotifications').doc(notificationId).get();
        if (notificationDoc.exists && notificationDoc.data()?.userId === user.id) {
          await dbAdmin.collection('liveNotifications').doc(notificationId).update(updates);
          updatedCount++;
        }
      });

      await Promise.all(updatePromises);

      // Broadcast status update
      await broadcastNotificationStatusUpdate(user.id, action, notificationIds);
    }

    return NextResponse.json({
      success: true,
      action: markAllAsRead ? 'mark_all_read' : action,
      updatedCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error(
      `Error updating notification status at /api/realtime/notifications`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to update notification status", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// DELETE - Delete notifications
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const notificationId = searchParams.get('notificationId');
    const deleteAll = searchParams.get('deleteAll') === 'true';
    const olderThan = searchParams.get('olderThan'); // Delete notifications older than this date

    let deletedCount = 0;

    if (deleteAll) {
      // Delete all notifications for user
      const allNotificationsQuery = dbAdmin.collection('liveNotifications')
        .where('userId', '==', user.id);

      const allNotificationsSnapshot = await allNotificationsQuery.get();
      const deletePromises = allNotificationsSnapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(deletePromises);
      deletedCount = allNotificationsSnapshot.size;
    } else if (olderThan) {
      // Delete notifications older than specified date
      const cutoffDate = new Date(olderThan).toISOString();
      const oldNotificationsQuery = dbAdmin.collection('liveNotifications')
        .where('userId', '==', user.id)
        .where('metadata.timestamp', '<', cutoffDate);

      const oldNotificationsSnapshot = await oldNotificationsQuery.get();
      const deletePromises = oldNotificationsSnapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(deletePromises);
      deletedCount = oldNotificationsSnapshot.size;
    } else if (notificationId) {
      // Delete specific notification
      const notificationDoc = await dbAdmin.collection('liveNotifications').doc(notificationId).get();
      if (notificationDoc.exists && notificationDoc.data()?.userId === user.id) {
        await dbAdmin.collection('liveNotifications').doc(notificationId).delete();
        deletedCount = 1;
      }
    } else {
      return NextResponse.json(ApiResponseHelper.error("Notification ID, deleteAll, or olderThan parameter required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    return NextResponse.json({
      success: true,
      deletedCount,
      message: `Deleted ${deletedCount} notifications`
    });
  } catch (error) {
    logger.error(
      `Error deleting notifications at /api/realtime/notifications`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to delete notifications", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to get user notification preferences
async function getUserNotificationPreferences(userId: string): Promise<NotificationPreferences> {
  try {
    const preferencesDoc = await dbAdmin.collection('notificationPreferences').doc(userId).get();
    
    if (preferencesDoc.exists) {
      return preferencesDoc.data() as NotificationPreferences;
    }

    // Return default preferences
    return getDefaultNotificationPreferences(userId);
  } catch (error) {
    logger.error(
      `Error getting notification preferences at /api/realtime/notifications`,
      error instanceof Error ? error : new Error(String(error))
    );
    return getDefaultNotificationPreferences(userId);
  }
}

// Helper function to get default notification preferences
function getDefaultNotificationPreferences(userId: string): NotificationPreferences {
  return {
    userId,
    globalSettings: {
      enabled: true,
      quietHours: {
        enabled: false,
        startTime: '22:00',
        endTime: '08:00',
        timezone: 'UTC'
      },
      maxNotificationsPerHour: 10,
      groupSimilar: true
    },
    channels: {
      push: {
        enabled: true,
        types: ['mention', 'tool_update', 'space_event', 'system_announcement']
      },
      email: {
        enabled: false,
        types: ['system_announcement', 'space_invitation'],
        frequency: 'daily'
      },
      inApp: {
        enabled: true,
        types: ['mention', 'tool_update', 'space_event', 'system_announcement', 'message_reaction', 'space_invitation', 'tool_deployment']
      }
    },
    typeSettings: {
      mention: { enabled: true, channels: ['push', 'in_app'], priority: 'high' },
      tool_update: { enabled: true, channels: ['in_app'], priority: 'normal' },
      space_event: { enabled: true, channels: ['in_app'], priority: 'normal' },
      system_announcement: { enabled: true, channels: ['push', 'in_app'], priority: 'high' },
      message_reaction: { enabled: true, channels: ['in_app'], priority: 'low' },
      space_invitation: { enabled: true, channels: ['push', 'in_app'], priority: 'high' },
      tool_deployment: { enabled: true, channels: ['in_app'], priority: 'normal' }
    },
    spaceSettings: {},
    updatedAt: new Date().toISOString()
  };
}

// Helper function to check if notification should be sent
function shouldSendNotification(
  type: string,
  spaceId: string | undefined,
  preferences: NotificationPreferences
): boolean {
  // Check global settings
  if (!preferences.globalSettings.enabled) {
    return false;
  }

  // Check quiet hours
  if (preferences.globalSettings.quietHours.enabled) {
    const now = new Date();
    const currentTime = now.toTimeString().substring(0, 5); // HH:MM format
    const { startTime, endTime } = preferences.globalSettings.quietHours;
    
    if (startTime <= endTime) {
      // Same day quiet hours
      if (currentTime >= startTime && currentTime <= endTime) {
        return false;
      }
    } else {
      // Overnight quiet hours
      if (currentTime >= startTime || currentTime <= endTime) {
        return false;
      }
    }
  }

  // Check type settings
  const typeSettings = preferences.typeSettings[type];
  if (!typeSettings || !typeSettings.enabled) {
    return false;
  }

  // Check space settings
  if (spaceId && preferences.spaceSettings[spaceId]) {
    const spaceSettings = preferences.spaceSettings[spaceId];
    if (!spaceSettings.enabled) {
      return false;
    }
    
    if (spaceSettings.muteUntil && new Date(spaceSettings.muteUntil) > new Date()) {
      return false;
    }
    
    if (!spaceSettings.types.includes(type)) {
      return false;
    }
  }

  return true;
}

// Helper function to get enabled delivery channels
function getEnabledChannels(type: string, preferences: NotificationPreferences): string[] {
  const typeSettings = preferences.typeSettings[type];
  if (!typeSettings) {
    return ['in_app']; // Default to in-app only
  }

  const enabledChannels: string[] = [];

  if (preferences.channels.push.enabled && typeSettings.channels.includes('push')) {
    enabledChannels.push('push');
  }
  
  if (preferences.channels.email.enabled && typeSettings.channels.includes('email')) {
    enabledChannels.push('email');
  }
  
  if (preferences.channels.inApp.enabled && typeSettings.channels.includes('in_app')) {
    enabledChannels.push('in_app');
  }

  return enabledChannels;
}

// Helper function to check if notification should be batched
async function shouldBatchNotification(
  notification: LiveNotification,
  preferences: NotificationPreferences
): Promise<boolean> {
  // Don't batch urgent notifications
  if (notification.metadata.priority === 'urgent') {
    return false;
  }

  // Don't batch if grouping is disabled
  if (!preferences.globalSettings.groupSimilar) {
    return false;
  }

  // Check email frequency settings
  if (notification.delivery.channels.includes('email')) {
    const emailFreq = preferences.channels.email.frequency;
    if (emailFreq !== 'immediate') {
      return true;
    }
  }

  // Check rate limiting
  const recentCount = await getRecentNotificationCount(notification.userId, 60); // Last hour
  if (recentCount >= preferences.globalSettings.maxNotificationsPerHour) {
    return true;
  }

  return false;
}

// Helper function to add notification to batch
async function addToBatch(notification: LiveNotification): Promise<void> {
  try {
    // Find existing batch or create new one
    const batchQuery = dbAdmin.collection('notificationBatches')
      .where('userId', '==', notification.userId)
      .where('status', '==', 'pending')
      .where('groupingCriteria.sourceType', '==', notification.sourceType)
      .where('groupingCriteria.spaceId', '==', notification.spaceId || null);

    const batchSnapshot = await batchQuery.get();
    
    if (!batchSnapshot.empty) {
      // Add to existing batch
      const batchDoc = batchSnapshot.docs[0];
      const batchData = batchDoc.data();
      
      await batchDoc.ref.update({
        notifications: [...batchData.notifications, notification],
        updatedAt: new Date().toISOString()
      });
    } else {
      // Create new batch
      const batchId = `batch_${notification.userId}_${Date.now()}`;
      const batch: NotificationBatch = {
        id: batchId,
        userId: notification.userId,
        notifications: [notification],
        batchType: 'grouped',
        groupingCriteria: {
          sourceType: notification.sourceType,
          spaceId: notification.spaceId,
          timeWindow: 60 // 1 hour
        },
        scheduledFor: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes from now
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      await dbAdmin.collection('notificationBatches').doc(batchId).set(batch);
    }
  } catch (error) {
    logger.error(
      `Error adding notification to batch at /api/realtime/notifications`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to send notification immediately
async function sendNotificationImmediately(notification: LiveNotification): Promise<void> {
  try {
    // Update delivery status
    await dbAdmin.collection('liveNotifications').doc(notification.id).update({
      'delivery.sent': true,
      'delivery.sentAt': new Date().toISOString()
    });

    // Here you would integrate with actual delivery services
    // For example: push notification service, email service, etc.
    logger.info('Sending notification via channels', {
      notificationId: notification.id,
      notificationData: { ...notification, delivery: { channels: notification.delivery.channels } },
      endpoint: '/api/realtime/notifications'
    });
  } catch (error) {
    logger.error(
      `Error sending notification immediately at /api/realtime/notifications`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to broadcast notification to user via real-time
async function broadcastNotificationToUser(notification: LiveNotification): Promise<void> {
  try {
    const realtimeMessage = {
      id: `notif_broadcast_${notification.id}_${Date.now()}`,
      type: 'notification',
      channel: `user:${notification.userId}:notifications`,
      senderId: 'system',
      content: {
        action: 'new_notification',
        notification: {
          id: notification.id,
          type: notification.type,
          title: notification.title,
          content: notification.content,
          priority: notification.metadata.priority,
          timestamp: notification.metadata.timestamp,
          actionUrl: notification.metadata.actionUrl,
          spaceId: notification.spaceId,
          spaceName: notification.spaceName
        }
      },
      metadata: {
        timestamp: new Date().toISOString(),
        priority: notification.metadata.priority,
        requiresAck: true,
        retryCount: 0
      },
      delivery: {
        sent: [],
        delivered: [],
        read: [],
        failed: []
      }
    };

    await dbAdmin.collection('realtimeMessages').add(realtimeMessage);
  } catch (error) {
    logger.error(
      `Error broadcasting notification to user at /api/realtime/notifications`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to get unread notification count
async function getUnreadNotificationCount(userId: string): Promise<number> {
  try {
    const unreadQuery = dbAdmin.collection('liveNotifications')
      .where('userId', '==', userId)
      .where('status', '==', 'unread')
      .where('isActive', '==', true);

    const unreadSnapshot = await unreadQuery.get();
    return unreadSnapshot.size;
  } catch (error) {
    logger.error(
      `Error getting unread notification count at /api/realtime/notifications`,
      error instanceof Error ? error : new Error(String(error))
    );
    return 0;
  }
}

// Helper function to get total notification count
async function getTotalNotificationCount(userId: string): Promise<number> {
  try {
    const totalQuery = dbAdmin.collection('liveNotifications')
      .where('userId', '==', userId)
      .where('isActive', '==', true);

    const totalSnapshot = await totalQuery.get();
    return totalSnapshot.size;
  } catch (error) {
    logger.error(
      `Error getting total notification count at /api/realtime/notifications`,
      error instanceof Error ? error : new Error(String(error))
    );
    return 0;
  }
}

// Helper function to get recent notification count for rate limiting
async function getRecentNotificationCount(userId: string, minutes: number): Promise<number> {
  try {
    const cutoffTime = new Date(Date.now() - minutes * 60 * 1000).toISOString();
    
    const recentQuery = dbAdmin.collection('liveNotifications')
      .where('userId', '==', userId)
      .where('metadata.timestamp', '>=', cutoffTime);

    const recentSnapshot = await recentQuery.get();
    return recentSnapshot.size;
  } catch (error) {
    logger.error(
      `Error getting recent notification count at /api/realtime/notifications`,
      error instanceof Error ? error : new Error(String(error))
    );
    return 0;
  }
}

// Helper function to broadcast notification status updates
async function broadcastNotificationStatusUpdate(
  userId: string,
  action: string,
  notificationIds: string[]
): Promise<void> {
  try {
    const statusMessage = {
      id: `notif_status_${userId}_${Date.now()}`,
      type: 'notification',
      channel: `user:${userId}:notifications`,
      senderId: 'system',
      content: {
        action: 'status_updated',
        updateType: action,
        notificationIds,
        timestamp: new Date().toISOString()
      },
      metadata: {
        timestamp: new Date().toISOString(),
        priority: 'low',
        requiresAck: false,
        retryCount: 0
      },
      delivery: {
        sent: [],
        delivered: [],
        read: [],
        failed: []
      }
    };

    await dbAdmin.collection('realtimeMessages').add(statusMessage);
  } catch (error) {
    logger.error(
      `Error broadcasting notification status update at /api/realtime/notifications`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to update notification statistics
async function updateNotificationStats(userId: string, type: string, spaceId?: string): Promise<void> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const statsId = `${userId}_${today}`;

    const statsDoc = await dbAdmin.collection('notificationStats').doc(statsId).get();
    
    if (statsDoc.exists) {
      const currentData = statsDoc.data();
      if (currentData) {
        await dbAdmin.collection('notificationStats').doc(statsId).update({
          totalNotifications: (currentData.totalNotifications || 0) + 1,
          [`typeBreakdown.${type}`]: (currentData.typeBreakdown?.[type] || 0) + 1,
          lastUpdate: new Date().toISOString()
        });
      }
    } else {
      await dbAdmin.collection('notificationStats').doc(statsId).set({
        userId,
        date: today,
        totalNotifications: 1,
        typeBreakdown: { [type]: 1 },
        spaceBreakdown: spaceId ? { [spaceId]: 1 } : {},
        createdAt: new Date().toISOString(),
        lastUpdate: new Date().toISOString()
      });
    }
  } catch (error) {
    logger.error(
      `Error updating notification stats at /api/realtime/notifications`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}