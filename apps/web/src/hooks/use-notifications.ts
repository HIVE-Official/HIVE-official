/**
 * Real-time Notifications System
 * Live notifications using Firebase
 */

import { useEffect, useState, useCallback } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  doc,
  updateDoc,
  writeBatch,
  serverTimestamp,
  addDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '@hive/firebase';
import { useAuth } from '@hive/auth-logic';
import { logger } from '@/lib/logger';

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'space_invite' | 'post' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  data?: {
    postId?: string;
    spaceId?: string;
    userId?: string;
    commentId?: string;
    link?: string;
  };
  from?: {
    userId: string;
    name: string;
    avatar?: string;
  };
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

/**
 * Hook for real-time notifications
 */
export function useNotifications() {
  const { user } = useAuth();
  const [state, setState] = useState<NotificationState>({
    notifications: [],
    unreadCount: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    if (!user?.uid) {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }

    const notificationsRef = collection(db, 'notifications', user.uid, 'userNotifications');
    const q = query(
      notificationsRef,
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    // Subscribe to notifications
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notifications: Notification[] = [];
        let unreadCount = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const notification: Notification = {
            id: doc.id,
            type: data.type,
            title: data.title,
            message: data.message,
            read: data.read || false,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            data: data.data,
            from: data.from
          };

          notifications.push(notification);
          if (!notification.read) {
            unreadCount++;
          }
        });

        setState({
          notifications,
          unreadCount,
          loading: false,
          error: null
        });

        // Play sound for new notifications (if enabled)
        if (snapshot.docChanges().some(change => change.type === 'added')) {
          playNotificationSound();
        }
      },
      (error) => {
        logger.error('Notification subscription error', { error: error instanceof Error ? error : new Error(String(error)) });
        setState(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    if (!user?.uid) return;

    try {
      const notificationRef = doc(db, 'notifications', user.uid, 'userNotifications', notificationId);
      await updateDoc(notificationRef, {
        read: true,
        readAt: serverTimestamp()
      });
    } catch (error) {
      logger.error('Failed to mark notification as read', { error: error instanceof Error ? error : new Error(String(error)), notificationId });
    }
  }, [user?.uid]);

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    if (!user?.uid || state.unreadCount === 0) return;

    try {
      const batch = writeBatch(db);
      state.notifications
        .filter(n => !n.read)
        .forEach(notification => {
          const ref = doc(db, 'notifications', user.uid, 'userNotifications', notification.id);
          batch.update(ref, {
            read: true,
            readAt: serverTimestamp()
          });
        });

      await batch.commit();
    } catch (error) {
      logger.error('Failed to mark all notifications as read', { error: error instanceof Error ? error : new Error(String(error)) });
    }
  }, [user?.uid, state.notifications, state.unreadCount]);

  // Clear all notifications
  const clearAll = useCallback(async () => {
    if (!user?.uid) return;

    try {
      const batch = writeBatch(db);
      state.notifications.forEach(notification => {
        const ref = doc(db, 'notifications', user.uid, 'userNotifications', notification.id);
        batch.delete(ref);
      });

      await batch.commit();
    } catch (error) {
      logger.error('Failed to clear notifications', { error: error instanceof Error ? error : new Error(String(error)) });
    }
  }, [user?.uid, state.notifications]);

  return {
    notifications: state.notifications,
    unreadCount: state.unreadCount,
    loading: state.loading,
    error: state.error,
    markAsRead,
    markAllAsRead,
    clearAll,
    hasUnread: state.unreadCount > 0
  };
}

/**
 * Helper to send notifications
 */
export async function sendNotification({
  toUserId,
  type,
  title,
  message,
  data,
  from
}: {
  toUserId: string;
  type: Notification['type'];
  title: string;
  message: string;
  data?: Notification['data'];
  from?: Notification['from'];
}) {
  try {
    const notificationRef = collection(db, 'notifications', toUserId, 'userNotifications');
    await addDoc(notificationRef, {
      type,
      title,
      message,
      read: false,
      createdAt: serverTimestamp(),
      data,
      from
    });

    logger.info('Notification sent', { toUserId, type, title });
  } catch (error) {
    logger.error('Failed to send notification', { error: error instanceof Error ? error : new Error(String(error)), toUserId, type });
    throw error;
  }
}

/**
 * Play notification sound
 */
function playNotificationSound() {
  try {
    // Only play if user hasn't disabled sounds
    if (typeof window !== 'undefined' && !localStorage.getItem('muteSounds')) {
      // Create audio element with a subtle notification sound
      const audio = new Audio('/sounds/notification.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Ignore errors (e.g., autoplay blocked)
      });
    }
  } catch (error) {
    // Ignore sound errors
  }
}

/**
 * Request browser notification permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

/**
 * Show browser notification
 */
export function showBrowserNotification(title: string, options?: { body?: string; icon?: string; tag?: string }) {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  try {
    const notification = new Notification(title, {
      icon: '/icon-192.png',
      badge: '/icon-72.png',
      ...options
    });

    // Auto-close after 5 seconds
    setTimeout(() => notification.close(), 5000);

    // Handle click
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  } catch (error) {
    logger.error('Failed to show browser notification', { error: error instanceof Error ? error : new Error(String(error)) });
  }
}