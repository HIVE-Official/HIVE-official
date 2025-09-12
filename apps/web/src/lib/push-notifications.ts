/// <reference path="../types/global.d.ts" />
import { getMessaging, getToken, onMessage, deleteToken } from 'firebase/messaging';
import { app } from '@/lib/firebase-client';
import { logger } from '@/lib/structured-logger';

export interface NotificationPermissionState {
  granted: boolean;
  denied: boolean;
  default: boolean;
}

export class PushNotificationManager {
  private messaging: any = null;
  private currentToken: string | null = null;
  private isInitialized = false;

  /**
   * Initialize Firebase Messaging
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Check if browser supports notifications
      if (!('Notification' in window)) {
        logger.warn('This browser does not support notifications');
        return;
      }

      // Check if service workers are supported
      if (!('serviceWorker' in navigator)) {
        logger.warn('Service workers are not supported');
        return;
      }

      // Initialize Firebase Messaging
      this.messaging = getMessaging(app);
      this.isInitialized = true;

      // Register service worker
      await this.registerServiceWorker();

      // Setup message listener for foreground messages
      this.setupMessageListener();

      logger.info('Push notification manager initialized');
    } catch (error) {
      logger.error('Failed to initialize push notifications', { error });
      throw error;
    }
  }

  /**
   * Register the Firebase messaging service worker
   */
  private async registerServiceWorker(): Promise<void> {
    try {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      logger.info('Service worker registered', { scope: registration.scope });
    } catch (error) {
      logger.error('Service worker registration failed', { error });
      throw error;
    }
  }

  /**
   * Request permission for notifications
   */
  async requestPermission(): Promise<NotificationPermission> {
    try {
      const permission = await Notification.requestPermission();
      logger.info('Notification permission', { permission });
      
      if (permission === 'granted') {
        // Get and save token after permission is granted
        await this.getToken();
      }
      
      return permission;
    } catch (error) {
      logger.error('Failed to request notification permission', { error });
      throw error;
    }
  }

  /**
   * Get current permission status
   */
  getPermissionStatus(): NotificationPermission | string {
    if (!('Notification' in window)) {
      return { granted: false, denied: false, default: true };
    }

    return {
      granted: Notification.permission === 'granted',
      denied: Notification.permission === 'denied',
      default: Notification.permission === 'default'
    };
  }

  /**
   * Get FCM token for the current device
   */
  async getToken(): Promise<string | null> {
    if (!this.messaging) {
      await this.initialize();
    }

    try {
      // VAPID key for web push
      const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || 
        'BKagOny0KF_2pCJQ3m-Tk8F8Er6PzC9kV-SAFr8cc8E9ZClvI8x_JO7bnmvJ7VJ8YF0PqC5b8Gz9gY0QIeJBEEU';

      const token = await getToken(this.messaging, { vapidKey });
      
      if (token) {
        logger.info('FCM token obtained', { token: token.substring(0, 10) + '...' });
        this.currentToken = token;
        
        // Save token to backend
        await this.saveTokenToBackend(token);
        
        return token;
      } else {
        logger.warn('No FCM token available');
        return null;
      }
    } catch (error) {
      logger.error('Failed to get FCM token', { error });
      return null;
    }
  }

  /**
   * Save FCM token to backend
   */
  private async saveTokenToBackend(token: string): Promise<void> {
    try {
      const response = await fetch('/api/notifications/device-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          deviceInfo: {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save token to backend');
      }

      logger.info('FCM token saved to backend');
    } catch (error) {
      logger.error('Failed to save FCM token to backend', { error });
    }
  }

  /**
   * Delete FCM token (for logout or unsubscribe)
   */
  async deleteToken(): Promise<void> {
    if (!this.messaging) return;

    try {
      await deleteToken(this.messaging);
      
      // Remove token from backend
      if (this.currentToken) {
        await this.removeTokenFromBackend(this.currentToken);
      }
      
      this.currentToken = null;
      logger.info('FCM token deleted');
    } catch (error) {
      logger.error('Failed to delete FCM token', { error });
    }
  }

  /**
   * Remove FCM token from backend
   */
  private async removeTokenFromBackend(token: string): Promise<void> {
    try {
      const response = await fetch('/api/notifications/device-token', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      if (!response.ok) {
        throw new Error('Failed to remove token from backend');
      }

      logger.info('FCM token removed from backend');
    } catch (error) {
      logger.error('Failed to remove FCM token from backend', { error });
    }
  }

  /**
   * Setup listener for foreground messages
   */
  private setupMessageListener(): void {
    if (!this.messaging) return;

    onMessage(this.messaging, (payload) => {
      logger.info('Foreground message received', { payload });
      
      // Show notification even when app is in foreground
      this.showForegroundNotification(payload);
      
      // Dispatch custom event for app to handle
      window.dispatchEvent(new CustomEvent('push-notification', {
        detail: payload
      }));
    });
  }

  /**
   * Show notification when app is in foreground
   */
  private async showForegroundNotification(payload: any): Promise<void> {
    if (Notification.permission !== 'granted') return;

    const notificationTitle = payload.notification?.title || 'HIVE Notification';
    const notificationOptions: any = {
      body: payload.notification?.body || 'You have a new notification',
      icon: payload.notification?.icon || '/icon-192x192.png',
      badge: '/badge-72x72.png',
      tag: payload.data?.tag || 'hive-notification',
      data: payload.data,
      requireInteraction: false
    };

    // Check if service worker is available
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      // Use service worker to show notification
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(notificationTitle, notificationOptions);
    } else {
      // Fallback to Notification API
      new Notification(notificationTitle, notificationOptions);
    }
  }

  /**
   * Subscribe to topic (for group notifications)
   */
  async subscribeToTopic(topic: string): Promise<void> {
    if (!this.currentToken) {
      await this.getToken();
    }

    if (!this.currentToken) {
      logger.warn('Cannot subscribe to topic without token');
      return;
    }

    try {
      const response = await fetch('/api/notifications/subscribe-topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: this.currentToken,
          topic
        })
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe to topic');
      }

      logger.info('Subscribed to topic', { topic });
    } catch (error) {
      logger.error('Failed to subscribe to topic', { topic, error });
    }
  }

  /**
   * Unsubscribe from topic
   */
  async unsubscribeFromTopic(topic: string): Promise<void> {
    if (!this.currentToken) return;

    try {
      const response = await fetch('/api/notifications/unsubscribe-topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: this.currentToken,
          topic
        })
      });

      if (!response.ok) {
        throw new Error('Failed to unsubscribe from topic');
      }

      logger.info('Unsubscribed from topic', { topic });
    } catch (error) {
      logger.error('Failed to unsubscribe from topic', { topic, error });
    }
  }

  /**
   * Check if push notifications are supported
   */
  static isSupported(): boolean {
    return 'Notification' in window && 
           'serviceWorker' in navigator &&
           'PushManager' in window;
  }

  /**
   * Get current FCM token
   */
  getCurrentToken(): string | null {
    return this.currentToken;
  }
}

// Export singleton instance
export const pushNotificationManager = new PushNotificationManager();

// React hook for using push notifications
export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermissionState>({
    granted: false,
    denied: false,
    default: true
  });
  const [isSupported, setIsSupported] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsSupported(PushNotificationManager.isSupported());
    
    if (PushNotificationManager.isSupported()) {
      setPermission(pushNotificationManager.getPermissionStatus());
    }
  }, []);

  const initialize = useCallback(async () => {
    if (!isSupported || isInitialized) return;

    try {
      await pushNotificationManager.initialize();
      setIsInitialized(true);
    } catch (error) {
      logger.error('Failed to initialize push notifications', { error });
    }
  }, [isSupported, isInitialized]);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return null;

    try {
      const result = await pushNotificationManager.requestPermission();
      setPermission(pushNotificationManager.getPermissionStatus());
      return result;
    } catch (error) {
      logger.error('Failed to request permission', { error });
      return null;
    }
  }, [isSupported]);

  const subscribeToTopic = useCallback(async (topic: string) => {
    if (!isSupported || !isInitialized) return;

    try {
      await pushNotificationManager.subscribeToTopic(topic);
    } catch (error) {
      logger.error('Failed to subscribe to topic', { topic, error });
    }
  }, [isSupported, isInitialized]);

  const unsubscribeFromTopic = useCallback(async (topic: string) => {
    if (!isSupported || !isInitialized) return;

    try {
      await pushNotificationManager.unsubscribeFromTopic(topic);
    } catch (error) {
      logger.error('Failed to unsubscribe from topic', { topic, error });
    }
  }, [isSupported, isInitialized]);

  return {
    permission,
    isSupported,
    isInitialized,
    initialize,
    requestPermission,
    subscribeToTopic,
    unsubscribeFromTopic
  };
}

// Import React hooks
import { useState, useEffect, useCallback } from 'react';