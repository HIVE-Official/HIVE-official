import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './use-auth';
import { initializeMessaging, onForegroundMessage, requestNotificationPermission } from '@/lib/notifications';
import { logger } from '@/lib/logger';

interface PushNotificationState {
  isSupported: boolean;
  isEnabled: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

interface NotificationPayload {
  notification?: {
    title?: string;
    body?: string;
    image?: string;
  };
  data?: Record<string, string>;
}

export function usePushNotifications() {
  const { user } = useAuth();
  const [state, setState] = useState<PushNotificationState>({
    isSupported: false,
    isEnabled: false,
    isLoading: true,
    error: null,
    token: null
  });

  // Initialize push notifications
  useEffect(() => {
    const initializePush = async () => {
      try {
        // Check if notifications are supported
        const isSupported = 'Notification' in window && 'serviceWorker' in navigator;
        
        if (!isSupported) {
          setState(prev => ({
            ...prev,
            isSupported: false,
            isLoading: false,
            error: 'Push notifications are not supported in this browser'
          }));
          return;
        }

        // Check current permission status
        const permission = Notification.permission;
        const isEnabled = permission === 'granted';

        setState(prev => ({
          ...prev,
          isSupported: true,
          isEnabled,
          isLoading: false,
          error: permission === 'denied' ? 'Notifications are blocked' : null
        }));

        // If user is logged in and notifications are enabled, get token
        if (user && isEnabled) {
          await getAndRegisterToken();
        }

      } catch (error) {
        logger.error('Failed to initialize push notifications', { error });
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to initialize push notifications'
        }));
      }
    };

    initializePush();
  }, [user]);

  // Register FCM token with backend
  const getAndRegisterToken = useCallback(async () => {
    if (!user) return;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const token = await requestNotificationPermission(user.id);
      
      if (token) {
        // Register token with backend
        const response = await fetch('/api/notifications/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token,
            deviceId: 'web',
            platform: 'web'
          })
        });

        if (!response.ok) {
          throw new Error('Failed to register push token');
        }

        setState(prev => ({
          ...prev,
          token,
          isEnabled: true,
          isLoading: false
        }));

        logger.info('Push notification token registered successfully');
      } else {
        setState(prev => ({
          ...prev,
          isEnabled: false,
          isLoading: false,
          error: 'Failed to get notification permission'
        }));
      }

    } catch (error) {
      logger.error('Failed to register push token', { error });
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to register for push notifications'
      }));
    }
  }, [user]);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!state.isSupported) {
      return false;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        await getAndRegisterToken();
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isEnabled: false,
          isLoading: false,
          error: permission === 'denied' ? 'Notifications are blocked' : 'Permission not granted'
        }));
        return false;
      }

    } catch (error) {
      logger.error('Failed to request notification permission', { error });
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to request notification permission'
      }));
      return false;
    }
  }, [state.isSupported, getAndRegisterToken]);

  // Disable notifications
  const disableNotifications = useCallback(async () => {
    if (!user || !state.token) return;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch('/api/notifications/register', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          deviceId: 'web'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to unregister push token');
      }

      setState(prev => ({
        ...prev,
        token: null,
        isEnabled: false,
        isLoading: false
      }));

      logger.info('Push notifications disabled');

    } catch (error) {
      logger.error('Failed to disable push notifications', { error });
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to disable push notifications'
      }));
    }
  }, [user, state.token]);

  // Setup foreground message listener
  useEffect(() => {
    if (!state.isEnabled || !user) return;

    const messaging = initializeMessaging();
    if (!messaging) return;

    const unsubscribe = onForegroundMessage((payload: NotificationPayload) => {
      // Handle foreground messages (when app is open)
      if (payload.notification) {
        // Show browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
          const notification = new Notification(
            payload.notification.title || 'New notification',
            {
              body: payload.notification.body,
              icon: '/assets/hive-logo-192.png',
              badge: '/assets/hive-badge-72.png',
              image: payload.notification.image,
              data: payload.data,
              requireInteraction: false
            }
          );

          notification.onclick = () => {
            // Handle notification click
            if (payload.data?.actionUrl) {
              window.open(payload.data.actionUrl, '_self');
            } else {
              window.focus();
            }
            notification.close();
          };

          // Auto-close after 5 seconds
          setTimeout(() => {
            notification.close();
          }, 5000);
        }

        // You can also trigger in-app notification here
        logger.info('Foreground notification received', { payload });
      }
    });

    return unsubscribe;
  }, [state.isEnabled, user]);

  // Test notification (for development)
  const sendTestNotification = useCallback(async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          targetUserId: user.id,
          title: 'Test Notification',
          body: 'This is a test push notification from HIVE',
          type: 'system_test',
          actionUrl: '/dashboard',
          immediate: true
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send test notification');
      }

      logger.info('Test notification sent');
    } catch (error) {
      logger.error('Failed to send test notification', { error });
    }
  }, [user]);

  return {
    ...state,
    requestPermission,
    disableNotifications,
    sendTestNotification,
    refresh: getAndRegisterToken
  };
}