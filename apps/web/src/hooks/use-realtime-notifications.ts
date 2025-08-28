import { useState, useEffect, useCallback, useRef } from 'react';
import { realtimeService, RealtimeMessage } from '@/lib/firebase-realtime';
import { logger } from '@/lib/logger';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: any;
}

interface UseRealtimeNotificationsOptions {
  userId: string;
  enabled?: boolean;
  onError?: (error: Error) => void;
  onNewNotification?: (notification: Notification) => void;
  maxNotifications?: number;
}

interface UseRealtimeNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  isConnected: boolean;
  error: Error | null;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
  reconnect: () => void;
}

export function useRealtimeNotifications(
  options: UseRealtimeNotificationsOptions
): UseRealtimeNotificationsReturn {
  const { 
    userId, 
    enabled = true, 
    onError, 
    onNewNotification,
    maxNotifications = 50 
  } = options;
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const cleanupRef = useRef<(() => void) | null>(null);
  const lastNotificationRef = useRef<string | null>(null);

  // Set up notifications listener
  useEffect(() => {
    if (!enabled || !userId || !realtimeService?.isAvailable()) {
      setIsLoading(false);
      setIsConnected(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Listen to user's notification channel
      const notificationChannel = `user:${userId}:notifications`;
      
      const unsubscribe = realtimeService.listenToChannel(
        notificationChannel, 
        (messages: RealtimeMessage[]) => {
          // Convert realtime messages to notifications
          const newNotifications = messages
            .filter(msg => msg.type === 'notification')
            .map(msg => convertMessageToNotification(msg))
            .slice(-maxNotifications); // Keep only the latest notifications

          setNotifications(prevNotifications => {
            // Merge with existing notifications, avoiding duplicates
            const existingIds = prevNotifications.map(n => n.id);
            const uniqueNewNotifications = newNotifications.filter(
              n => !existingIds.includes(n.id)
            );

            if (uniqueNewNotifications.length > 0) {
              // Call onNewNotification for the latest notification
              const latestNotification = uniqueNewNotifications[uniqueNewNotifications.length - 1];
              if (latestNotification.id !== lastNotificationRef.current) {
                lastNotificationRef.current = latestNotification.id;
                onNewNotification?.(latestNotification);
              }
            }

            const merged = [...prevNotifications, ...uniqueNewNotifications]
              .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
              .slice(0, maxNotifications);

            return merged;
          });

          setIsLoading(false);
          setIsConnected(true);
        }
      );

      cleanupRef.current = unsubscribe;
      logger.info('Realtime notifications listener established', { userId });

    } catch (err) {
      const error = err as Error;
      setError(error);
      setIsLoading(false);
      setIsConnected(false);
      onError?.(error);
      logger.error('Failed to establish notifications listener', { error, userId });
    }

    // Cleanup on unmount or dependency change
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [userId, enabled, onError, onNewNotification, maxNotifications]);

  // Convert RealtimeMessage to Notification
  const convertMessageToNotification = (message: RealtimeMessage): Notification => {
    return {
      id: message.id,
      title: message.content.title || 'New Notification',
      message: message.content.message || 'You have a new notification',
      type: message.content.type || 'info',
      timestamp: new Date(message.metadata.timestamp.toMillis()),
      read: false,
      actionUrl: message.content.actionUrl,
      metadata: message.content.metadata,
    };
  };

  // Mark notification as read
  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  // Clear specific notification
  const clearNotification = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  }, []);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Reconnect function
  const reconnect = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
    }
    
    setError(null);
    setIsConnected(false);
    setIsLoading(true);
  }, []);

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    isLoading,
    isConnected,
    error,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications,
    reconnect,
  };
}

// Helper hook for sending notifications (admin/system use)
export function useRealtimeNotificationSender() {
  const sendNotification = useCallback(async (
    userId: string | string[],
    notification: {
      title: string;
      message: string;
      type: 'info' | 'success' | 'warning' | 'error';
      actionUrl?: string;
      metadata?: any;
    }
  ) => {
    if (!realtimeService?.isAvailable()) {
      logger.warn('Realtime service not available, cannot send notification');
      return false;
    }

    try {
      await realtimeService.sendNotification(userId, notification);
      logger.info('Notification sent successfully', { 
        userId: Array.isArray(userId) ? userId.length : 1,
        type: notification.type 
      });
      return true;
    } catch (error) {
      logger.error('Failed to send notification', { error, userId, notification });
      return false;
    }
  }, []);

  return { sendNotification };
}