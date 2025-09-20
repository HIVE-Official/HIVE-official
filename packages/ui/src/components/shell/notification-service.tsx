"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Notification {
  id: string;
  type: 'mention' | 'like' | 'comment' | 'follow' | 'space_invite' | 'tool_feature' | 'event' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actor?: {
    name: string;
    handle: string;
    avatar?: string
  }
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

interface NotificationProviderProps {
  children: React.ReactNode
}

// Mock initial notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    title: 'New like on your tool',
    message: 'Sarah liked your "Grade Calculator" tool',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    actor: { name: 'Sarah Chen', handle: 'sarahc', avatar: undefined }
  },
  {
    id: '2',
    type: 'comment',
    title: 'New comment',
    message: 'Alex commented on "Study Group Finder"',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    actor: { name: 'Alex Rivera', handle: 'alexr', avatar: undefined }
  },
  {
    id: '3',
    type: 'space_invite',
    title: 'Space invitation',
    message: 'You were invited to join "CS Study Group"',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: true,
    actor: { name: 'Jamie Park', handle: 'jamiep', avatar: undefined }
  },
];

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev])
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true })})
    )
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  };

  // Simulate receiving new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add a notification every 2-5 minutes
      if (Math.random() < 0.1) { // 10% chance every interval
        const randomNotifications = [
          {
            type: 'like' as const,
            title: 'New like on your tool',
            message: 'Someone liked your latest tool',
            read: false,
            actor: { name: 'Anonymous User', handle: 'anon' }
          },
          {
            type: 'comment' as const,
            title: 'New comment',
            message: 'Someone commented on your post',
            read: false,
            actor: { name: 'Anonymous User', handle: 'anon' }
          },
          {
            type: 'system' as const,
            title: 'System update',
            message: 'HIVE has been updated with new features',
            read: false
          }
        ];
        
        const randomNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        addNotification(randomNotification)
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval)
  }, []);

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}