'use client';

/**
 * 🔔 HIVE Real-time Notifications Hook
 *
 * Behavioral Psychology Implementation:
 * - "Someone needs you" framing (not "you're missing out")
 * - Variable reward schedule for engagement
 * - Relief amplifier design patterns
 * - 70% completion target optimization
 */

import { useState, useEffect, useCallback } from 'react';
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
  Timestamp
} from 'firebase/firestore';
import { db } from '@hive/firebase';
import { useAuth } from '@hive/auth-logic';
import { logger } from '@/lib/logger';

export interface HiveNotification {
  id: string;
  title: string;
  message: string;
  type: 'connection' | 'space' | 'help_request' | 'achievement' | 'system';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'social_proof' | 'someone_needs_you' | 'insider_knowledge' | 'community_growth';
  isRead: boolean;
  timestamp: Timestamp;
  actionUrl?: string;
  actionText?: string;
  metadata?: {
    spaceId?: string;
    userId?: string;
    toolId?: string;
    ritualId?: string;
    avatarUrl?: string;
    senderName?: string;
    [key: string]: any;
  };
  // Behavioral triggers
  urgencyLevel?: 'immediate' | 'today' | 'this_week';
  socialProofText?: string; // "3 people need your help with..."
  exclusivityText?: string; // "You're one of 5 people who can..."
}

interface NotificationState {
  notifications: HiveNotification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  lastFetched: Date | null;
}

interface NotificationActions {
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  clearAll: () => Promise<void>;
  refreshNotifications: () => void;
}

export const useRealtimeNotifications = (): NotificationState & NotificationActions => {
  const { user } = useAuth();
  const [state, setState] = useState<NotificationState>({
    notifications: [],
    unreadCount: 0,
    loading: true,
    error: null,
    lastFetched: null,
  });

  // Real-time Firebase listener
  useEffect(() => {
    if (!user?.id) {
      setState(prev => ({ ...prev, loading: false, notifications: [], unreadCount: 0 }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    // Query for user's notifications (campus-isolated)
    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', user.id),
      where('campusId', '==', 'ub-buffalo'), // Campus isolation for vBETA
      orderBy('timestamp', 'desc'),
      limit(50) // Recent notifications only
    );

    const unsubscribe = onSnapshot(
      notificationsQuery,
      (snapshot) => {
        try {
          const notifications: HiveNotification[] = [];

          snapshot.forEach((doc) => {
            const data = doc.data();
            notifications.push({
              id: doc.id,
              ...data,
              timestamp: data.timestamp || Timestamp.now(),
            } as HiveNotification);
          });

          const unreadCount = notifications.filter(n => !n.isRead).length;

          setState(prev => ({
            ...prev,
            notifications,
            unreadCount,
            loading: false,
            error: null,
            lastFetched: new Date(),
          }));

          logger.info('Notifications updated', {
            count: notifications.length,
            unreadCount,
            userId: user.id
          });

        } catch (error) {
          logger.error('Error processing notifications', { error: error instanceof Error ? error.message : String(error), userId: user.id });
          setState(prev => ({
            ...prev,
            loading: false,
            error: 'Failed to load notifications',
          }));
        }
      },
      (error) => {
        logger.error('Notifications listener error', { error: error instanceof Error ? error.message : String(error), userId: user.id });
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Connection error. Notifications may not be up to date.',
        }));
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user?.id]);

  // Mark single notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    if (!user?.id) return;

    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        isRead: true,
        readAt: Timestamp.now(),
      });

      logger.info('Notification marked as read', { notificationId, userId: user.id });
    } catch (error) {
      logger.error('Error marking notification as read', { error: error instanceof Error ? error.message : String(error), notificationId, userId: user.id });
      throw error;
    }
  }, [user?.id]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!user?.id || state.unreadCount === 0) return;

    try {
      const batch = writeBatch(db);
      const unreadNotifications = state.notifications.filter(n => !n.isRead);

      unreadNotifications.forEach(notification => {
        const notificationRef = doc(db, 'notifications', notification.id);
        batch.update(notificationRef, {
          isRead: true,
          readAt: Timestamp.now(),
        });
      });

      await batch.commit();

      logger.info('All notifications marked as read', {
        count: unreadNotifications.length,
        userId: user.id
      });
    } catch (error) {
      logger.error('Error marking all notifications as read', { error: error instanceof Error ? error.message : String(error), userId: user.id });
      throw error;
    }
  }, [user?.id, state.notifications, state.unreadCount]);

  // Delete single notification
  const deleteNotification = useCallback(async (notificationId: string) => {
    if (!user?.id) return;

    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        deleted: true,
        deletedAt: Timestamp.now(),
      });

      logger.info('Notification deleted', { notificationId, userId: user.id });
    } catch (error) {
      logger.error('Error deleting notification', { error: error instanceof Error ? error.message : String(error), notificationId, userId: user.id });
      throw error;
    }
  }, [user?.id]);

  // Clear all notifications
  const clearAll = useCallback(async () => {
    if (!user?.id || state.notifications.length === 0) return;

    try {
      const batch = writeBatch(db);

      state.notifications.forEach(notification => {
        const notificationRef = doc(db, 'notifications', notification.id);
        batch.update(notificationRef, {
          deleted: true,
          deletedAt: Timestamp.now(),
        });
      });

      await batch.commit();

      logger.info('All notifications cleared', {
        count: state.notifications.length,
        userId: user.id
      });
    } catch (error) {
      logger.error('Error clearing all notifications', { error: error instanceof Error ? error.message : String(error), userId: user.id });
      throw error;
    }
  }, [user?.id, state.notifications]);

  // Force refresh notifications
  const refreshNotifications = useCallback(() => {
    setState(prev => ({ ...prev, loading: true, error: null }));
  }, []);

  return {
    ...state,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    refreshNotifications,
  };
};

// Behavioral notification helpers
export const createBehavioralNotification = (
  baseNotification: Partial<HiveNotification>
): Partial<HiveNotification> => {
  const behavioralEnhancements: Record<string, any> = {};

  // "Someone needs you" framing for help requests
  if (baseNotification.type === 'help_request') {
    behavioralEnhancements.category = 'someone_needs_you';
    behavioralEnhancements.socialProofText = baseNotification.metadata?.helpersCount
      ? `${baseNotification.metadata.helpersCount} others are also helping`
      : 'You might be the first to help';
  }

  // Social proof for achievements
  if (baseNotification.type === 'achievement') {
    behavioralEnhancements.category = 'social_proof';
    behavioralEnhancements.exclusivityText = `You're in the top ${baseNotification.metadata?.percentile || '10'}%`;
  }

  // Insider knowledge for space updates
  if (baseNotification.type === 'space') {
    behavioralEnhancements.category = 'insider_knowledge';
    behavioralEnhancements.exclusivityText = 'Early access to space updates';
  }

  return {
    ...baseNotification,
    ...behavioralEnhancements,
  };
};

export default useRealtimeNotifications;