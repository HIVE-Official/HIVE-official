"use client";

import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  User, 
  Zap, 
  MessageSquare,
  Heart,
  Calendar,
  Settings
} from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Avatar, AvatarImage, AvatarFallback } from '../../atomic/atoms/avatar';
import { cn } from '../../lib/utils';

interface Notification {
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

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: Notification[]
}

// Mock notifications for demo
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
  {
    id: '4',
    type: 'tool_feature',
    title: 'Tool featured',
    message: 'Your "Schedule Optimizer" was featured in Productivity Tools!',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true
  },
  {
    id: '5',
    type: 'event',
    title: 'Upcoming event',
    message: 'Hackathon kickoff starts in 2 hours',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'like':
      return Heart;
    case 'comment':
    case 'mention':
      return MessageSquare;
    case 'follow':
      return User;
    case 'space_invite':
      return User;
    case 'tool_feature':
      return Zap;
    case 'event':
      return Calendar;
    case 'system':
      return Settings;
    default:
      return Bell
  }
};

const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`
};

export function NotificationCenter({ 
  isOpen, 
  onClose, 
  notifications = mockNotifications 
}: NotificationCenterProps) {
  const [localNotifications, setLocalNotifications] = useState(notifications);
  
  const unreadCount = localNotifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setLocalNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  };

  const markAllAsRead = () => {
    setLocalNotifications(prev => 
      prev.map(map}))
    )
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4 bg-[var(--hive-background-primary)]/20">
      <div className="w-80 mt-4">
        <div className="bg-[color-mix(in_srgb,var(--hive-background-primary)_95%,transparent)] backdrop-blur-xl border border-[color-mix(in_srgb,var(--hive-border-hover)_60%,transparent)] rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <h3 className="font-medium">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] text-xs px-1.5 py-0.5 rounded-full font-medium">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="h-7 px-2 text-xs hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)]"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-7 w-7 p-0 hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)]"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {localNotifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-[var(--hive-text-tertiary)]">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
                {localNotifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  const initials = notification.actor?.name
                    ?.split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2);

                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "px-4 py-3 hover:bg-[color-mix(in_srgb,var(--hive-interactive-hover)_80%,transparent)] cursor-pointer transition-colors",
                        !notification.read && "bg-[color-mix(in_srgb,var(--hive-brand-secondary)_5%,transparent)]"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex space-x-3">
                        {/* Avatar or Icon */}
                        <div className="flex-shrink-0">
                          {notification.actor ? (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={notification.actor.avatar} />
                              <AvatarFallback className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] text-xs">
                                {initials}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)] flex items-center justify-center">
                              <Icon className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <p className="text-sm font-medium text-[var(--hive-text-primary)]">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-sm text-[var(--hive-text-tertiary)] mt-0.5">
                            {notification.message}
                          </p>
                          <p className="text-xs text-[var(--hive-text-tertiary)] mt-1">
                            {formatRelativeTime(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
          })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)]"
            >
              View all notifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}