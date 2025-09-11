'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRealtime, useNotificationRealtime } from '@/hooks/use-realtime';
import { usePushNotifications } from '@/hooks/use-push-notifications';
import { useAuth } from '@/hooks/use-auth';
import { logger } from '@/lib/logger';

interface RealtimeContextType {
  isConnected: boolean;
  connectionId: string | null;
  sendMessage: (message: any) => Promise<void>;
  updatePresence: (status: 'online' | 'away' | 'busy') => Promise<void>;
  subscribeToSpace: (spaceId: string) => Promise<void>;
  unsubscribeFromSpace: (spaceId: string) => Promise<void>;
  notificationCount: number;
  onlineUsers: Set<string>;
}

const RealtimeContext = createContext<RealtimeContextType | null>(null);

export function useRealtimeContext(): RealtimeContextType {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtimeContext must be used within a RealtimeProvider');
  }
  return context;
}

interface RealtimeProviderProps {
  children: ReactNode;
}

export function RealtimeProvider({ children }: RealtimeProviderProps) {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [notificationCount, setNotificationCount] = useState(0);

  // Initialize notification real-time connection
  const notificationRealtime = useNotificationRealtime();
  
  // Initialize push notifications
  const pushNotifications = usePushNotifications();

  // Setup message listeners
  useEffect(() => {
    if (!user) return;

    // Listen for real-time messages
    const unsubscribeMessages = notificationRealtime.onMessage((message) => {
      handleRealtimeMessage(message);
    });

    // Listen for presence updates
    const unsubscribePresence = notificationRealtime.onPresence((presenceData) => {
      handlePresenceUpdate(presenceData);
    });

    // Listen for errors
    const unsubscribeErrors = notificationRealtime.onError((error: any) => {
      logger.error('Realtime connection error', { error });
    });

    return () => {
      unsubscribeMessages();
      unsubscribePresence();
      unsubscribeErrors();
    };
  }, [user, notificationRealtime]);

  // Handle presence updates when connection state changes
  useEffect(() => {
    if (notificationRealtime.state.isConnected && user) {
      notificationRealtime.updatePresence('online');
    }
  }, [notificationRealtime.state.isConnected, user]);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!user) return;

      if (document.hidden) {
        notificationRealtime.updatePresence('away');
      } else {
        notificationRealtime.updatePresence('online');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [user, notificationRealtime]);

  // Initialize push notifications on connection
  useEffect(() => {
    if (notificationRealtime.state.isConnected && user && !pushNotifications.isEnabled) {
      // Auto-request push notification permission
      pushNotifications.requestPermission().catch(error => {
        logger.error('Failed to request push permissions', { error });
      });
    }
  }, [notificationRealtime.state.isConnected, user, pushNotifications]);

  const handleRealtimeMessage = (message: any) => {
    logger.info('Realtime message received', { type: message.type, channel: message.channel });

    switch (message.type) {
      case 'notification':
        setNotificationCount(prev => prev + 1);
        
        // Show browser notification if page is hidden
        if (document.hidden && 'Notification' in window && Notification.permission === 'granted') {
          showBrowserNotification(message.content);
        }
        
        // Play notification sound
        playNotificationSound();
        break;

      case 'chat':
        // Handle real-time chat messages
        if (message.content?.spaceId) {
          // Dispatch custom event for space chat components to listen
          window.dispatchEvent(new CustomEvent('space-message', {
            detail: { spaceId: message.content.spaceId, message }
          }));
        }
        break;

      case 'post_update':
        // Handle real-time post updates
        if (message.content?.type === 'new_post') {
          window.dispatchEvent(new CustomEvent('new-post', {
            detail: { post: message.content.post }
          }));
        }
        break;

      case 'tool_update':
        // Handle real-time tool updates
        window.dispatchEvent(new CustomEvent('tool-update', {
          detail: { toolId: message.content.toolId, update: message.content }
        }));
        break;

      case 'space_update':
        // Handle space-level updates
        window.dispatchEvent(new CustomEvent('space-update', {
          detail: { spaceId: message.content.spaceId, update: message.content }
        }));
        break;

      default:
        logger.info('Unhandled message type', { type: message.type });
    }
  };

  const handlePresenceUpdate = (presenceData: any) => {
    setOnlineUsers(prev => {
      const updated = new Set(prev);
      
      if (presenceData.status === 'online') {
        updated.add(presenceData.userId);
      } else {
        updated.delete(presenceData.userId);
      }
      
      return updated;
    });
  };

  const showBrowserNotification = (content: any) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(content.title || 'HIVE Notification', {
        body: content.message || content.body,
        icon: '/assets/hive-logo-192.png',
        badge: '/assets/hive-badge-72.png',
        requireInteraction: false
      });

      notification.onclick = () => {
        window.focus();
        if (content.actionUrl) {
          window.location.href = content.actionUrl;
        }
        notification.close();
      };

      setTimeout(() => notification.close(), 5000);
    }
  };

  const playNotificationSound = () => {
    try {
      const audio = new Audio('/assets/notification.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Ignore audio play errors (browser may require user interaction)
      });
    } catch (error) {
      // Ignore audio errors
    }
  };

  const subscribeToSpace = async (spaceId: string): Promise<void> => {
    await notificationRealtime.subscribeToChannel(`space:${spaceId}:notifications`);
    await notificationRealtime.subscribeToChannel(`space:${spaceId}:posts`);
    await notificationRealtime.subscribeToChannel(`space:${spaceId}:presence`);
  };

  const unsubscribeFromSpace = async (spaceId: string): Promise<void> => {
    await notificationRealtime.unsubscribeFromChannel(`space:${spaceId}:notifications`);
    await notificationRealtime.unsubscribeFromChannel(`space:${spaceId}:posts`);
    await notificationRealtime.unsubscribeFromChannel(`space:${spaceId}:presence`);
  };

  const contextValue: RealtimeContextType = {
    isConnected: notificationRealtime.state.isConnected,
    connectionId: notificationRealtime.state.connectionId,
    sendMessage: notificationRealtime.sendMessage,
    updatePresence: notificationRealtime.updatePresence,
    subscribeToSpace,
    unsubscribeFromSpace,
    notificationCount,
    onlineUsers
  };

  return (
    <RealtimeContext.Provider value={contextValue}>
      {children}
    </RealtimeContext.Provider>
  );
}

// Connection status indicator component
export function RealtimeConnectionStatus() {
  const { isConnected } = useRealtimeContext();

  if (!isConnected) {
    return (
      <div className="fixed bottom-4 left-4 bg-red-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">Reconnecting...</span>
      </div>
    );
  }

  return null;
}

// Online users indicator
export function OnlineUsersIndicator() {
  const { onlineUsers } = useRealtimeContext();

  if (onlineUsers.size === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      <span>{onlineUsers.size} online</span>
    </div>
  );
}

// Notification badge component
export function NotificationBadge() {
  const { notificationCount } = useRealtimeContext();

  if (notificationCount === 0) {
    return null;
  }

  return (
    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
      {notificationCount > 99 ? '99+' : notificationCount}
    </div>
  );
}