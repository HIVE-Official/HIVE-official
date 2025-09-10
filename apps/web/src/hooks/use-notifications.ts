'use client';

import { useState, useEffect, useCallback } from 'react';
import { fcmService, NotificationPayload, NotificationBuilder } from '@/lib/notifications/fcm-service';
import { useAppStore } from '@/store/app-store';
import { useToast } from './use-toast';

interface UseNotificationsOptions {
  autoRequest?: boolean;
  onNotification?: (payload: NotificationPayload) => void;
  showInAppToast?: boolean;
}

export function useNotifications(options: UseNotificationsOptions = {}) {
  const {
    autoRequest = false,
    onNotification,
    showInAppToast = true,
  } = options;

  const { toast } = useToast();
  const { addNotification, notifications, unreadCount } = useAppStore();
  
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check support on mount
  useEffect(() => {
    const supported = fcmService.isSupported();
    setIsSupported(supported);
    
    if (supported) {
      setPermission(fcmService.getPermissionStatus());
    }
  }, []);

  // Auto request permission if enabled
  useEffect(() => {
    if (autoRequest && isSupported && permission === 'default') {
      requestPermission();
    }
  }, [autoRequest, isSupported, permission]);

  // Subscribe to foreground notifications
  useEffect(() => {
    if (!isSupported) return;

    const unsubscribe = fcmService.subscribe((payload) => {
      // Add to store
      addNotification({
        id: `notif-${Date.now()}`,
        userId: 'current-user',
        type: payload.data?.type || 'system',
        title: payload.title,
        message: payload.body,
        data: payload.data,
        isRead: false,
        createdAt: new Date(),
      });

      // Show in-app toast if enabled
      if (showInAppToast && !document.hidden) {
        toast({
          title: payload.title,
          description: payload.body,
          variant: 'default',
          duration: 5000,
        });
      }

      // Call custom handler
      onNotification?.(payload);
    });

    return unsubscribe;
  }, [isSupported, showInAppToast, onNotification, addNotification, toast]);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      console.warn('Notifications not supported');
      return false;
    }

    setIsLoading(true);
    try {
      const token = await fcmService.requestPermission();
      
      if (token) {
        setFcmToken(token);
        setPermission('granted');
        
        toast({
          title: 'Notifications Enabled',
          description: 'You will receive notifications for important updates',
          variant: 'default',
        });
        
        return true;
      } else {
        setPermission('denied');
        
        toast({
          title: 'Notifications Blocked',
          description: 'You can enable notifications in your browser settings',
          variant: 'destructive',
        });
        
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      
      toast({
        title: 'Error',
        description: 'Failed to enable notifications',
        variant: 'destructive',
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, toast]);

  // Send notification to user
  const sendNotification = useCallback(async (
    userId: string,
    notification: NotificationPayload
  ): Promise<boolean> => {
    try {
      return await fcmService.sendNotification(userId, notification);
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }, []);

  // Send bulk notifications
  const sendBulkNotifications = useCallback(async (
    userIds: string[],
    notification: NotificationPayload
  ): Promise<boolean> => {
    try {
      return await fcmService.sendBulkNotifications(userIds, notification);
    } catch (error) {
      console.error('Error sending bulk notifications:', error);
      return false;
    }
  }, []);

  // Mark notification as read
  const markAsRead = useCallback((notificationId: string) => {
    useAppStore.getState().markAsRead(notificationId);
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    useAppStore.getState().markAllAsRead();
  }, []);

  // Clear all notifications
  const clearAll = useCallback(() => {
    useAppStore.getState().clearNotifications();
  }, []);

  // Send test notification
  const sendTestNotification = useCallback(() => {
    if (!isSupported || permission !== 'granted') {
      toast({
        title: 'Enable Notifications First',
        description: 'Please enable notifications to test',
        variant: 'destructive',
      });
      return;
    }

    const testNotification = new NotificationBuilder()
      .setTitle('Test Notification')
      .setBody('This is a test notification from HIVE')
      .setData({ type: 'test', timestamp: new Date().toISOString() })
      .build();

    // Simulate receiving a notification
    fcmService['handleForegroundMessage']({
      notification: testNotification,
      data: testNotification.data,
    });
  }, [isSupported, permission, toast]);

  return {
    // State
    isSupported,
    permission,
    fcmToken,
    isLoading,
    notifications,
    unreadCount,
    
    // Actions
    requestPermission,
    sendNotification,
    sendBulkNotifications,
    markAsRead,
    markAllAsRead,
    clearAll,
    sendTestNotification,
    
    // Helpers
    NotificationBuilder,
  };
}

// Hook for notification triggers
export function useNotificationTriggers() {
  const { sendNotification } = useNotifications();
  const currentUser = useAppStore(state => state.user);

  // Trigger notification when someone posts in a space
  const notifySpacePost = useCallback(async (
    spaceMembers: string[],
    spaceName: string,
    authorName: string
  ) => {
    const notification = NotificationBuilder.postCreated(spaceName, authorName);
    
    // Don't notify the author
    const recipients = spaceMembers.filter(id => id !== currentUser?.id);
    
    for (const userId of recipients) {
      await sendNotification(userId, notification);
    }
  }, [currentUser, sendNotification]);

  // Trigger notification for event reminder
  const notifyEventReminder = useCallback(async (
    attendees: string[],
    eventName: string,
    timeUntil: string
  ) => {
    const notification = NotificationBuilder.eventReminder(eventName, timeUntil);
    
    for (const userId of attendees) {
      await sendNotification(userId, notification);
    }
  }, [sendNotification]);

  // Trigger notification for space invite
  const notifySpaceInvite = useCallback(async (
    invitedUserId: string,
    spaceName: string
  ) => {
    const notification = NotificationBuilder.spaceInvite(
      spaceName,
      currentUser?.displayName || 'Someone'
    );
    
    await sendNotification(invitedUserId, notification);
  }, [currentUser, sendNotification]);

  // Trigger notification for mention
  const notifyMention = useCallback(async (
    mentionedUserId: string,
    context: string
  ) => {
    const notification = NotificationBuilder.mention(
      currentUser?.displayName || 'Someone',
      context
    );
    
    await sendNotification(mentionedUserId, notification);
  }, [currentUser, sendNotification]);

  return {
    notifySpacePost,
    notifyEventReminder,
    notifySpaceInvite,
    notifyMention,
  };
}