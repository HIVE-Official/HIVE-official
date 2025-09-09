'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useUnifiedAuth } from '@hive/ui';

export interface Notification {
  id: string;
  userId: string;
  type: 'follow' | 'comment' | 'like' | 'mention' | 'event' | 'announcement' | 'trending';
  title: string;
  body?: string;
  link?: string;
  read: boolean;
  timestamp: Date;
  data?: Record<string, any>;
}

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: Error | null;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  createNotification: (data: Partial<Notification>) => Promise<void>;
}

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useUnifiedAuth();

  // Subscribe to real-time notifications
  useEffect(() => {
    if (!user?.uid) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    const notificationsRef = collection(db, 'users', user.uid, 'notifications');
    const q = query(
      notificationsRef,
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notificationsData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            userId: user.uid,
            type: data.type || 'announcement',
            title: data.title || '',
            body: data.body,
            link: data.link,
            read: data.read || false,
            timestamp: data.timestamp?.toDate?.() || new Date(),
            data: data.data
          } as Notification;
        });
        
        setNotifications(notificationsData);
        setLoading(false);
        setError(null);

        // Update browser notification badge (if supported)
        if ('setAppBadge' in navigator) {
          const unreadCount = notificationsData.filter(n => !n.read).length;
          (navigator as any).setAppBadge(unreadCount || undefined);
        }
      },
      (err) => {
        console.error('Error fetching notifications:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    if (!user?.uid) return;

    try {
      const notificationRef = doc(db, 'users', user.uid, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        read: true,
        readAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error marking notification as read:', err);
      throw err;
    }
  }, [user?.uid]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!user?.uid) return;

    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      const promises = unreadNotifications.map(n => markAsRead(n.id));
      await Promise.all(promises);
    } catch (err) {
      console.error('Error marking all as read:', err);
      throw err;
    }
  }, [user?.uid, notifications, markAsRead]);

  // Delete notification
  const deleteNotification = useCallback(async (notificationId: string) => {
    if (!user?.uid) return;

    try {
      const notificationRef = doc(db, 'users', user.uid, 'notifications', notificationId);
      await deleteDoc(notificationRef);
    } catch (err) {
      console.error('Error deleting notification:', err);
      throw err;
    }
  }, [user?.uid]);

  // Create notification (for testing or internal use)
  const createNotification = useCallback(async (data: Partial<Notification>) => {
    if (!user?.uid) return;

    try {
      const notificationsRef = collection(db, 'users', user.uid, 'notifications');
      await addDoc(notificationsRef, {
        ...data,
        userId: user.uid,
        read: false,
        timestamp: serverTimestamp()
      });

      // Request browser notification permission if not granted
      if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
      }

      // Show browser notification if permitted
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(data.title || 'New Notification', {
          body: data.body,
          icon: '/hive-logo.png',
          badge: '/hive-badge.png',
          tag: data.type || 'notification',
          renotify: true
        });
      }
    } catch (err) {
      console.error('Error creating notification:', err);
      throw err;
    }
  }, [user?.uid]);

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createNotification
  };
}

// Helper function to create notifications from other parts of the app
export async function sendNotification(
  userId: string,
  notification: Omit<Notification, 'id' | 'userId' | 'timestamp' | 'read'>
) {
  try {
    const notificationsRef = collection(db, 'users', userId, 'notifications');
    await addDoc(notificationsRef, {
      ...notification,
      userId,
      read: false,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
}