import { NextRequest, NextResponse } from 'next/server';
import { collection, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc, query, where, getDocs, orderBy, limit as fbLimit, startAfter } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

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
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
      return NextResponse.json({ 
        error: 'Target user ID, type, title, content, source ID, and source type are required' 
      }, { status: 400 });
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
      const spaceDoc = await getDoc(doc(db, 'spaces', spaceId));
      spaceName = spaceDoc.exists() ? spaceDoc.data().name : undefined;
    }

    // Generate notification ID
    const notificationId = `notif_${targetUserId}_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;

    // Determine delivery channels based on preferences
    const allowedChannels = getEnabledChannels(type, userPreferences);
    const finalChannels = deliveryChannels.filter(channel => allowedChannels.includes(channel));

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
    await setDoc(doc(db, 'liveNotifications', notificationId), notification);

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
    console.error('Error creating live notification:', error);
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }
}

// GET - Get user's live notifications
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'unread'; // 'unread', 'read', 'all'
    const type = searchParams.get('type'); // Filter by notification type
    const spaceId = searchParams.get('spaceId'); // Filter by space
    const limit = parseInt(searchParams.get('limit') || '50');
    const before = searchParams.get('before'); // For pagination
    const includeExpired = searchParams.get('includeExpired') === 'true';

    // Build query
    let notificationQuery = query(
      collection(db, 'liveNotifications'),
      where('userId', '==', user.uid),
      where('isActive', '==', true)
    );

    // Add status filter
    if (status !== 'all') {
      notificationQuery = query(notificationQuery, where('status', '==', status));
    }

    // Add type filter
    if (type) {
      notificationQuery = query(notificationQuery, where('type', '==', type));
    }

    // Add space filter
    if (spaceId) {
      notificationQuery = query(notificationQuery, where('spaceId', '==', spaceId));
    }

    // Add ordering and limit
    notificationQuery = query(
      notificationQuery,
      orderBy('metadata.timestamp', 'desc'),
      fbLimit(limit)
    );

    // Add pagination
    if (before) {
      const beforeDoc = await getDoc(doc(db, 'liveNotifications', before));
      if (beforeDoc.exists()) {
        notificationQuery = query(notificationQuery, startAfter(beforeDoc));
      }
    }

    const notificationsSnapshot = await getDocs(notificationQuery);
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
    const unreadCount = await getUnreadNotificationCount(user.uid);
    const totalCount = await getTotalNotificationCount(user.uid);

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
    console.error('Error getting live notifications:', error);
    return NextResponse.json({ error: 'Failed to get notifications' }, { status: 500 });
  }
}

// PUT - Update notification status (mark as read, archive, etc.)
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      notificationIds = [], // Array of notification IDs
      action, // 'mark_read', 'mark_unread', 'archive', 'dismiss', 'mark_clicked'
      markAllAsRead = false
    } = body;

    if (!action && !markAllAsRead) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }

    let updatedCount = 0;

    if (markAllAsRead) {
      // Mark all unread notifications as read
      const unreadQuery = query(
        collection(db, 'liveNotifications'),
        where('userId', '==', user.uid),
        where('status', '==', 'unread'),
        where('isActive', '==', true)
      );

      const unreadSnapshot = await getDocs(unreadQuery);
      const updatePromises = unreadSnapshot.docs.map(doc =>
        updateDoc(doc.ref, {
          status: 'read',
          readAt: new Date().toISOString()
        })
      );

      await Promise.all(updatePromises);
      updatedCount = unreadSnapshot.size;

      // Broadcast read status update
      await broadcastNotificationStatusUpdate(user.uid, 'bulk_read', unreadSnapshot.docs.map(doc => doc.id));
    } else {
      // Handle specific notifications
      if (notificationIds.length === 0) {
        return NextResponse.json({ error: 'Notification IDs are required' }, { status: 400 });
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
          return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
      }

      // Update notifications
      const updatePromises = notificationIds.map(async (notificationId: string) => {
        const notificationDoc = await getDoc(doc(db, 'liveNotifications', notificationId));
        if (notificationDoc.exists() && notificationDoc.data().userId === user.uid) {
          await updateDoc(doc(db, 'liveNotifications', notificationId), updates);
          updatedCount++;
        }
      });

      await Promise.all(updatePromises);

      // Broadcast status update
      await broadcastNotificationStatusUpdate(user.uid, action, notificationIds);
    }

    return NextResponse.json({
      success: true,
      action: markAllAsRead ? 'mark_all_read' : action,
      updatedCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating notification status:', error);
    return NextResponse.json({ error: 'Failed to update notification status' }, { status: 500 });
  }
}

// DELETE - Delete notifications
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const notificationId = searchParams.get('notificationId');
    const deleteAll = searchParams.get('deleteAll') === 'true';
    const olderThan = searchParams.get('olderThan'); // Delete notifications older than this date

    let deletedCount = 0;

    if (deleteAll) {
      // Delete all notifications for user
      const allNotificationsQuery = query(
        collection(db, 'liveNotifications'),
        where('userId', '==', user.uid)
      );

      const allNotificationsSnapshot = await getDocs(allNotificationsQuery);
      const deletePromises = allNotificationsSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      deletedCount = allNotificationsSnapshot.size;
    } else if (olderThan) {
      // Delete notifications older than specified date
      const cutoffDate = new Date(olderThan).toISOString();
      const oldNotificationsQuery = query(
        collection(db, 'liveNotifications'),
        where('userId', '==', user.uid),
        where('metadata.timestamp', '<', cutoffDate)
      );

      const oldNotificationsSnapshot = await getDocs(oldNotificationsQuery);
      const deletePromises = oldNotificationsSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      deletedCount = oldNotificationsSnapshot.size;
    } else if (notificationId) {
      // Delete specific notification
      const notificationDoc = await getDoc(doc(db, 'liveNotifications', notificationId));
      if (notificationDoc.exists() && notificationDoc.data().userId === user.uid) {
        await deleteDoc(doc(db, 'liveNotifications', notificationId));
        deletedCount = 1;
      }
    } else {
      return NextResponse.json({ error: 'Notification ID, deleteAll, or olderThan parameter required' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      deletedCount,
      message: `Deleted ${deletedCount} notifications`
    });
  } catch (error) {
    console.error('Error deleting notifications:', error);
    return NextResponse.json({ error: 'Failed to delete notifications' }, { status: 500 });
  }
}

// Helper function to get user notification preferences
async function getUserNotificationPreferences(userId: string): Promise<NotificationPreferences> {
  try {
    const preferencesDoc = await getDoc(doc(db, 'notificationPreferences', userId));
    
    if (preferencesDoc.exists()) {
      return preferencesDoc.data() as NotificationPreferences;
    }

    // Return default preferences
    return getDefaultNotificationPreferences(userId);
  } catch (error) {
    console.error('Error getting notification preferences:', error);
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
    const batchQuery = query(
      collection(db, 'notificationBatches'),
      where('userId', '==', notification.userId),
      where('status', '==', 'pending'),
      where('groupingCriteria.sourceType', '==', notification.sourceType),
      where('groupingCriteria.spaceId', '==', notification.spaceId || null)
    );

    const batchSnapshot = await getDocs(batchQuery);
    
    if (!batchSnapshot.empty) {
      // Add to existing batch
      const batchDoc = batchSnapshot.docs[0];
      const batchData = batchDoc.data();
      
      await updateDoc(batchDoc.ref, {
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

      await setDoc(doc(db, 'notificationBatches', batchId), batch);
    }
  } catch (error) {
    console.error('Error adding notification to batch:', error);
  }
}

// Helper function to send notification immediately
async function sendNotificationImmediately(notification: LiveNotification): Promise<void> {
  try {
    // Update delivery status
    await updateDoc(doc(db, 'liveNotifications', notification.id), {
      'delivery.sent': true,
      'delivery.sentAt': new Date().toISOString()
    });

    // Here you would integrate with actual delivery services
    // For example: push notification service, email service, etc.
    console.log(`Sending notification ${notification.id} via channels:`, notification.delivery.channels);
  } catch (error) {
    console.error('Error sending notification immediately:', error);
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

    await addDoc(collection(db, 'realtimeMessages'), realtimeMessage);
  } catch (error) {
    console.error('Error broadcasting notification to user:', error);
  }
}

// Helper function to get unread notification count
async function getUnreadNotificationCount(userId: string): Promise<number> {
  try {
    const unreadQuery = query(
      collection(db, 'liveNotifications'),
      where('userId', '==', userId),
      where('status', '==', 'unread'),
      where('isActive', '==', true)
    );

    const unreadSnapshot = await getDocs(unreadQuery);
    return unreadSnapshot.size;
  } catch (error) {
    console.error('Error getting unread notification count:', error);
    return 0;
  }
}

// Helper function to get total notification count
async function getTotalNotificationCount(userId: string): Promise<number> {
  try {
    const totalQuery = query(
      collection(db, 'liveNotifications'),
      where('userId', '==', userId),
      where('isActive', '==', true)
    );

    const totalSnapshot = await getDocs(totalQuery);
    return totalSnapshot.size;
  } catch (error) {
    console.error('Error getting total notification count:', error);
    return 0;
  }
}

// Helper function to get recent notification count for rate limiting
async function getRecentNotificationCount(userId: string, minutes: number): Promise<number> {
  try {
    const cutoffTime = new Date(Date.now() - minutes * 60 * 1000).toISOString();
    
    const recentQuery = query(
      collection(db, 'liveNotifications'),
      where('userId', '==', userId),
      where('metadata.timestamp', '>=', cutoffTime)
    );

    const recentSnapshot = await getDocs(recentQuery);
    return recentSnapshot.size;
  } catch (error) {
    console.error('Error getting recent notification count:', error);
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

    await addDoc(collection(db, 'realtimeMessages'), statusMessage);
  } catch (error) {
    console.error('Error broadcasting notification status update:', error);
  }
}

// Helper function to update notification statistics
async function updateNotificationStats(userId: string, type: string, spaceId?: string): Promise<void> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const statsId = `${userId}_${today}`;

    const statsDoc = await getDoc(doc(db, 'notificationStats', statsId));
    
    if (statsDoc.exists()) {
      const currentData = statsDoc.data();
      await updateDoc(doc(db, 'notificationStats', statsId), {
        totalNotifications: (currentData.totalNotifications || 0) + 1,
        [`typeBreakdown.${type}`]: (currentData.typeBreakdown?.[type] || 0) + 1,
        lastUpdate: new Date().toISOString()
      });
    } else {
      await setDoc(doc(db, 'notificationStats', statsId), {
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
    console.error('Error updating notification stats:', error);
  }
}