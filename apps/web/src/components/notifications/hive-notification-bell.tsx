'use client';

/**
 * 🔔 HIVE Production Notification Bell
 *
 * Integrates the @hive/ui notification system with real Firebase data
 * and behavioral psychology patterns for the HIVE platform.
 */

import React from 'react';
import { useRouter } from 'next/navigation';
import { NotificationSystem } from '@hive/ui';
import { useRealtimeNotifications } from '@/hooks/use-realtime-notifications';
import { logger } from '@/lib/logger';

export interface HiveNotificationBellProps {
  /** Custom className */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}

export const HiveNotificationBell: React.FC<HiveNotificationBellProps> = ({
  className,
  disabled = false,
}) => {
  const router = useRouter();

  // Real-time notification data from Firebase
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useRealtimeNotifications();

  // Handle navigation to notification targets
  const handleNavigate = (url: string) => {
    try {
      // Log navigation for behavioral analytics
      logger.info('Notification navigation', {
        url,
        source: 'notification_bell',
        unreadCount,
        timestamp: new Date().toISOString(),
      });

      // Navigate using Next.js router
      router.push(url);
    } catch (error) {
      logger.error('Navigation error from notification', { error: error instanceof Error ? error : new Error(String(error)), url });
    }
  };

  // Transform Firebase notifications to UI format
  const transformedNotifications = notifications.map(notification => ({
    ...notification,
    timestamp: {
      toDate: () => notification.timestamp.toDate(),
    },
  }));

  return (
    <NotificationSystem
      notifications={transformedNotifications}
      unreadCount={unreadCount}
      loading={loading}
      error={error}
      onNavigate={handleNavigate}
      className={className}
      disabled={disabled}
    />
  );
};

export default HiveNotificationBell;