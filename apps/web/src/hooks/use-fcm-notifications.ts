import { useState, useEffect, useCallback } from 'react';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { app, db } from '@/lib/firebase';
import { useAuth } from './use-auth';
import { logger } from '@/lib/logger';
import { toast } from 'sonner';

interface NotificationPreferences {
  enabled: boolean;
  posts: boolean;
  comments: boolean;
  events: boolean;
  mentions: boolean;
  coordination: boolean;
  sound: boolean;
  vibration: boolean;
}

interface FCMNotification {
  title: string;
  body: string;
  icon?: string;
  image?: string;
  badge?: string;
  data?: any;
  clickAction?: string;
}

interface UseFCMNotificationsReturn {
  isSupported: boolean;
  isEnabled: boolean;
  token: string | null;
  loading: boolean;
  error: Error | null;
  preferences: NotificationPreferences;
  requestPermission: () => Promise<void>;
  updatePreferences: (prefs: Partial<NotificationPreferences>) => Promise<void>;
  sendTestNotification: () => Promise<void>;
}

export function useFCMNotifications(): UseFCMNotificationsReturn {
  const { user } = useAuth();
  const [isSupported, setIsSupported] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [messaging, setMessaging] = useState<Messaging | null>(null);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    enabled: false,
    posts: true,
    comments: true,
    events: true,
    mentions: true,
    coordination: true,
    sound: true,
    vibration: true
  });

  // Check if notifications are supported
  useEffect(() => {
    const checkSupport = async () => {
      try {
        // Check if browser supports notifications
        const supported = 'Notification' in window && 
                         'serviceWorker' in navigator && 
                         'PushManager' in window;
        
        setIsSupported(supported);
        
        if (!supported) {
          logger.warn('Push notifications not supported in this browser');
          setLoading(false);
          return;
        }

        // Initialize Firebase Messaging
        const messagingInstance = getMessaging(app);
        setMessaging(messagingInstance);
        
        // Check current permission status
        const permission = Notification.permission;
        setIsEnabled(permission === 'granted');
        
        // If already granted, get token
        if (permission === 'granted' && user) {
          await setupFCM(messagingInstance);
        }
        
        setLoading(false);
      } catch (err) {
        logger.error('Error checking notification support', { error: err });
        setError(err as Error);
        setLoading(false);
      }
    };

    checkSupport();
  }, [user]);

  // Setup FCM and get token
  const setupFCM = async (messagingInstance: Messaging) => {
    try {
      // Register service worker
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      
      // Get FCM token
      const currentToken = await getToken(messagingInstance, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY || 'BKagOny0KF_2pCJQ3m-Tk8F8Er6PzC9kV-SAFr8cc8E9ZClvI8x_JO7bnmvJ7VJ8YF0PqC5b8Gz9gY0QIeJBEEU',
        serviceWorkerRegistration: registration
      });

      if (currentToken) {
        setToken(currentToken);
        
        // Save token to Firestore
        if (user) {
          await saveTokenToFirestore(currentToken);
        }
        
        logger.info('FCM token obtained', { token: currentToken.substring(0, 10) + '...' });
      } else {
        logger.warn('No FCM token available');
      }
    } catch (err) {
      logger.error('Error setting up FCM', { error: err });
      throw err;
    }
  };

  // Save FCM token to Firestore
  const saveTokenToFirestore = async (fcmToken: string) => {
    if (!user) return;

    try {
      const tokenDoc = doc(db, 'users', user.uid, 'tokens', 'fcm');
      await setDoc(tokenDoc, {
        token: fcmToken,
        platform: detectPlatform(),
        browser: detectBrowser(),
        lastUpdated: serverTimestamp(),
        active: true
      }, { merge: true });

      // Also update user document
      await updateDoc(doc(db, 'users', user.uid), {
        fcmToken,
        notificationsEnabled: true,
        lastTokenUpdate: serverTimestamp()
      });

      logger.info('FCM token saved to Firestore');
    } catch (err) {
      logger.error('Error saving FCM token', { error: err });
    }
  };

  // Listen for foreground messages
  useEffect(() => {
    if (!messaging || !isEnabled) return;

    const unsubscribe = onMessage(messaging, (payload) => {
      logger.info('Foreground message received', { payload });
      
      // Show toast notification
      const { notification } = payload;
      if (notification) {
        toast(notification.title || 'New Notification', {
          description: notification.body,
          action: {
            label: 'View',
            onClick: () => {
              // Handle notification click
              if (payload.data?.url) {
                window.location.href = payload.data.url;
              }
            }
          }
        });

        // Play sound if enabled
        if (preferences.sound) {
          playNotificationSound();
        }

        // Vibrate if enabled and supported
        if (preferences.vibration && 'vibrate' in navigator) {
          navigator.vibrate([200, 100, 200]);
        }
      }
    });

    return () => unsubscribe();
  }, [messaging, isEnabled, preferences]);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!isSupported || !messaging) {
      toast.error('Notifications not supported in this browser');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        setIsEnabled(true);
        await setupFCM(messaging);
        
        // Update preferences
        setPreferences(prev => ({ ...prev, enabled: true }));
        await updatePreferences({ enabled: true });
        
        toast.success('Notifications enabled successfully!');
      } else if (permission === 'denied') {
        setIsEnabled(false);
        toast.error('Notification permission denied. You can enable it in browser settings.');
      }
    } catch (err) {
      logger.error('Error requesting permission', { error: err });
      setError(err as Error);
      toast.error('Failed to enable notifications');
    } finally {
      setLoading(false);
    }
  }, [isSupported, messaging]);

  // Update notification preferences
  const updatePreferences = useCallback(async (prefs: Partial<NotificationPreferences>) => {
    if (!user) return;

    try {
      const newPrefs = { ...preferences, ...prefs };
      setPreferences(newPrefs);

      // Save to Firestore
      const prefsDoc = doc(db, 'users', user.uid, 'settings', 'notifications');
      await setDoc(prefsDoc, {
        ...newPrefs,
        updatedAt: serverTimestamp()
      }, { merge: true });

      logger.info('Notification preferences updated', { preferences: newPrefs });
    } catch (err) {
      logger.error('Error updating preferences', { error: err });
      toast.error('Failed to update notification preferences');
    }
  }, [user, preferences]);

  // Send test notification
  const sendTestNotification = useCallback(async () => {
    if (!token || !user) {
      toast.error('Notifications not set up yet');
      return;
    }

    try {
      const response = await fetch('/api/notifications/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify({ token })
      });

      if (response.ok) {
        toast.success('Test notification sent! Check your notifications.');
      } else {
        throw new Error('Failed to send test notification');
      }
    } catch (err) {
      logger.error('Error sending test notification', { error: err });
      toast.error('Failed to send test notification');
    }
  }, [token, user]);

  return {
    isSupported,
    isEnabled,
    token,
    loading,
    error,
    preferences,
    requestPermission,
    updatePreferences,
    sendTestNotification
  };
}

// Helper functions
function detectPlatform(): string {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/android/.test(userAgent)) return 'android';
  if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
  if (/windows/.test(userAgent)) return 'windows';
  if (/mac/.test(userAgent)) return 'macos';
  if (/linux/.test(userAgent)) return 'linux';
  return 'unknown';
}

function detectBrowser(): string {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/chrome/.test(userAgent) && !/edge/.test(userAgent)) return 'chrome';
  if (/safari/.test(userAgent) && !/chrome/.test(userAgent)) return 'safari';
  if (/firefox/.test(userAgent)) return 'firefox';
  if (/edge/.test(userAgent)) return 'edge';
  return 'unknown';
}

function playNotificationSound() {
  try {
    const audio = new Audio('/sounds/notification.mp3');
    audio.volume = 0.5;
    audio.play().catch(err => {
      logger.warn('Could not play notification sound', { error: err });
    });
  } catch (err) {
    logger.warn('Error playing notification sound', { error: err });
  }
}