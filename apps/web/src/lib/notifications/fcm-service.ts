import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { app } from '@/lib/firebase-client';

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  image?: string;
  data?: Record<string, any>;
  requireInteraction?: boolean;
}

class FCMService {
  private messaging: Messaging | null = null;
  private currentToken: string | null = null;
  private isInitialized = false;
  private permissionGranted = false;
  private listeners: Set<(payload: NotificationPayload) => void> = new Set();

  constructor() {
    // Only initialize in browser
    if (typeof window !== 'undefined' && 'Notification' in window) {
      this.init();
    }
  }

  private async init() {
    try {
      // Initialize Firebase Messaging
      this.messaging = getMessaging(app);
      
      // Register service worker
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered:', registration);
      }

      // Set up foreground message handler
      if (this.messaging) {
        onMessage(this.messaging, (payload) => {
          console.log('Foreground message received:', payload);
          this.handleForegroundMessage(payload);
        });
      }

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize FCM:', error);
    }
  }

  // Request notification permission and get token
  async requestPermission(): Promise<string | null> {
    try {
      // Check if already have permission
      if (Notification.permission === 'granted') {
        this.permissionGranted = true;
        return await this.getToken();
      }

      // Request permission
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        this.permissionGranted = true;
        console.log('Notification permission granted');
        return await this.getToken();
      } else {
        console.log('Notification permission denied');
        return null;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return null;
    }
  }

  // Get FCM token
  async getToken(): Promise<string | null> {
    if (!this.messaging) {
      console.error('Messaging not initialized');
      return null;
    }

    try {
      // Get token with VAPID key (you'll need to generate this in Firebase Console)
      const token = await getToken(this.messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || 'YOUR_VAPID_KEY'
      });

      if (token) {
        console.log('FCM Token obtained:', token);
        this.currentToken = token;
        
        // Save token to backend
        await this.saveTokenToBackend(token);
        
        return token;
      } else {
        console.log('No registration token available');
        return null;
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  // Save token to backend
  private async saveTokenToBackend(token: string) {
    try {
      const response = await fetch('/api/notifications/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          fcmToken: token,
          platform: this.detectPlatform(),
          deviceInfo: this.getDeviceInfo()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save FCM token');
      }

      console.log('FCM token saved to backend');
    } catch (error) {
      console.error('Error saving FCM token:', error);
    }
  }

  // Handle foreground messages
  private handleForegroundMessage(payload: any) {
    const notification: NotificationPayload = {
      title: payload.notification?.title || 'New Notification',
      body: payload.notification?.body || '',
      icon: payload.notification?.icon,
      image: payload.notification?.image,
      data: payload.data,
    };

    // Show browser notification if permission granted
    if (this.permissionGranted && document.hidden) {
      this.showBrowserNotification(notification);
    }

    // Notify all listeners (for in-app notifications)
    this.listeners.forEach(listener => listener(notification));
  }

  // Show browser notification
  private showBrowserNotification(notification: NotificationPayload) {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    const options: NotificationOptions = {
      body: notification.body,
      icon: notification.icon || '/hive-logo-192.png',
      badge: '/hive-badge-72.png',
      image: notification.image,
      data: notification.data,
      requireInteraction: notification.requireInteraction || false,
      vibrate: [200, 100, 200],
      tag: notification.data?.type || 'default',
      actions: [
        {
          action: 'view',
          title: 'View',
        },
        {
          action: 'dismiss',
          title: 'Dismiss',
        }
      ],
    };

    const browserNotification = new Notification(notification.title, options);

    // Handle click
    browserNotification.onclick = (event) => {
      event.preventDefault();
      window.focus();
      browserNotification.close();
      
      // Navigate to relevant page
      if (notification.data?.url) {
        window.location.href = notification.data.url;
      }
    };
  }

  // Subscribe to foreground notifications
  subscribe(callback: (payload: NotificationPayload) => void) {
    this.listeners.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  // Send notification (server-side via API)
  async sendNotification(
    userId: string,
    notification: NotificationPayload
  ): Promise<boolean> {
    try {
      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userId,
          notification,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }

  // Send bulk notifications
  async sendBulkNotifications(
    userIds: string[],
    notification: NotificationPayload
  ): Promise<boolean> {
    try {
      const response = await fetch('/api/notifications/send-bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userIds,
          notification,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending bulk notifications:', error);
      return false;
    }
  }

  // Delete token (on logout)
  async deleteToken() {
    if (!this.messaging) return;

    try {
      // Delete token from backend
      if (this.currentToken) {
        await fetch('/api/notifications/unregister', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ 
            fcmToken: this.currentToken 
          }),
        });
      }

      this.currentToken = null;
      console.log('FCM token deleted');
    } catch (error) {
      console.error('Error deleting FCM token:', error);
    }
  }

  // Check if notifications are supported
  isSupported(): boolean {
    return typeof window !== 'undefined' && 
           'Notification' in window && 
           'serviceWorker' in navigator;
  }

  // Get permission status
  getPermissionStatus(): NotificationPermission | null {
    if (!('Notification' in window)) return null;
    return Notification.permission;
  }

  // Detect platform
  private detectPlatform(): string {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/android/.test(userAgent)) return 'android';
    if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
    if (/windows/.test(userAgent)) return 'windows';
    if (/mac/.test(userAgent)) return 'macos';
    if (/linux/.test(userAgent)) return 'linux';
    
    return 'web';
  }

  // Get device info
  private getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      vendor: navigator.vendor,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }
}

// Export singleton instance
export const fcmService = new FCMService();

// Export notification types
export type NotificationType = 
  | 'post_created'
  | 'post_liked'
  | 'post_commented'
  | 'space_joined'
  | 'space_invite'
  | 'event_reminder'
  | 'event_created'
  | 'event_updated'
  | 'tool_shared'
  | 'achievement_unlocked'
  | 'mention'
  | 'follow'
  | 'message'
  | 'announcement'
  | 'system';

// Notification builder helper
export class NotificationBuilder {
  private notification: NotificationPayload = {
    title: '',
    body: '',
  };

  setTitle(title: string): this {
    this.notification.title = title;
    return this;
  }

  setBody(body: string): this {
    this.notification.body = body;
    return this;
  }

  setIcon(icon: string): this {
    this.notification.icon = icon;
    return this;
  }

  setImage(image: string): this {
    this.notification.image = image;
    return this;
  }

  setData(data: Record<string, any>): this {
    this.notification.data = data;
    return this;
  }

  setRequireInteraction(require: boolean): this {
    this.notification.requireInteraction = require;
    return this;
  }

  build(): NotificationPayload {
    return this.notification;
  }

  // Pre-built notification templates
  static postCreated(spaceName: string, authorName: string): NotificationPayload {
    return new NotificationBuilder()
      .setTitle(`New post in ${spaceName}`)
      .setBody(`${authorName} shared something new`)
      .setData({ type: 'post_created', spaceName, authorName })
      .build();
  }

  static eventReminder(eventName: string, timeUntil: string): NotificationPayload {
    return new NotificationBuilder()
      .setTitle(`Event starting ${timeUntil}`)
      .setBody(eventName)
      .setData({ type: 'event_reminder', eventName })
      .setRequireInteraction(true)
      .build();
  }

  static spaceInvite(spaceName: string, inviterName: string): NotificationPayload {
    return new NotificationBuilder()
      .setTitle(`You're invited to ${spaceName}`)
      .setBody(`${inviterName} invited you to join`)
      .setData({ type: 'space_invite', spaceName, inviterName })
      .build();
  }

  static mention(authorName: string, context: string): NotificationPayload {
    return new NotificationBuilder()
      .setTitle(`${authorName} mentioned you`)
      .setBody(context)
      .setData({ type: 'mention', authorName })
      .build();
  }
}