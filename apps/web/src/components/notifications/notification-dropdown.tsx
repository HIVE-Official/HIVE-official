"use client";

import { useState, useEffect, useRef } from 'react';
import { logger } from '@hive/core/utils/logger';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Heart, 
  MessageCircle, 
  UserPlus, 
  Calendar,
  Zap,
  Trophy,
  Settings,
  Check,
  X,
  Loader2,
  Sparkles,
  Users,
  Star
} from 'lucide-react';
import { Button, Badge, ScrollArea } from '@hive/ui';
import { cn } from '@hive/ui';
import { formatDistanceToNow } from 'date-fns';
import toast from '@/hooks/use-toast-notifications';
import { authenticatedFetch } from '@/lib/auth/utils/auth-utils';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'event' | 'space' | 'achievement' | 'system';
  title: string;
  description?: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actor?: {
    id: string;
    name: string;
    avatar?: string;
  };
  metadata?: any;
}

interface NotificationDropdownProps {
  userId: string;
  className?: string;
}

const typeConfig = {
  like: { icon: Heart, color: 'text-red-400', bgColor: 'bg-red-400/10' },
  comment: { icon: MessageCircle, color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
  follow: { icon: UserPlus, color: 'text-green-400', bgColor: 'bg-green-400/10' },
  mention: { icon: MessageCircle, color: 'text-purple-400', bgColor: 'bg-purple-400/10' },
  event: { icon: Calendar, color: 'text-orange-400', bgColor: 'bg-orange-400/10' },
  space: { icon: Users, color: 'text-indigo-400', bgColor: 'bg-indigo-400/10' },
  achievement: { icon: Trophy, color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' },
  system: { icon: Sparkles, color: 'text-gray-400', bgColor: 'bg-gray-400/10' }
};

export function NotificationDropdown({ userId, className }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await authenticatedFetch('/api/notifications');
      if (!response.ok) throw new Error('Failed to fetch notifications');
      
      const data = await response.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      logger.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      await authenticatedFetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST'
      });
      
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      logger.error('Failed to mark notification as read:', error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await authenticatedFetch('/api/notifications/read-all', {
        method: 'POST'
      });
      
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (error) {
      logger.error('Failed to mark all as read:', error);
      toast.error('Failed to update notifications');
    }
  };

  // Clear all notifications
  const clearAll = async () => {
    try {
      await authenticatedFetch('/api/notifications/clear', {
        method: 'DELETE'
      });
      
      setNotifications([]);
      setUnreadCount(0);
      toast.success('Notifications cleared');
    } catch (error) {
      logger.error('Failed to clear notifications:', error);
      toast.error('Failed to clear notifications');
    }
  };

  // Fetch notifications when dropdown opens
  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        // Silently check for new notifications
        authenticatedFetch('/api/notifications/count')
          .then(res => res.json())
          .then(data => setUnreadCount(data.count || 0))
          .catch(console.error);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
    
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      {/* Notification Bell Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </Button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-96 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-xl shadow-xl z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-[var(--hive-border-default)]">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[var(--hive-text-primary)]">
                  Notifications
                </h3>
                <div className="flex items-center gap-2">
                  {notifications.length > 0 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs"
                      >
                        Mark all read
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAll}
                        className="text-xs"
                      >
                        Clear
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.href = '/settings/notifications'}
                    className="p-1"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <ScrollArea className="h-[400px]">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <Bell className="h-12 w-12 text-gray-500 mb-3" />
                  <p className="text-sm font-medium text-[var(--hive-text-primary)]">
                    All caught up!
                  </p>
                  <p className="text-xs text-gray-400 text-center mt-1">
                    You don't have any notifications right now
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--hive-border-default)]">
                  {notifications.map((notification) => {
                    const config = typeConfig[notification.type];
                    const Icon = config.icon;
                    
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => handleNotificationClick(notification)}
                        className={cn(
                          "p-4 hover:bg-[var(--hive-white)]/[0.02] cursor-pointer transition-all",
                          !notification.read && "bg-[var(--hive-white)]/[0.03]"
                        )}
                      >
                        <div className="flex gap-3">
                          <div className={cn("p-2 rounded-lg shrink-0", config.bgColor)}>
                            <Icon className={cn("h-4 w-4", config.color)} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <p className={cn(
                                  "text-sm",
                                  !notification.read ? "font-medium text-[var(--hive-text-primary)]" : "text-gray-400"
                                )}>
                                  {notification.title}
                                </p>
                                {notification.description && (
                                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                    {notification.description}
                                  </p>
                                )}
                                <p className="text-xs text-gray-500 mt-2">
                                  {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                                </p>
                              </div>
                              
                              {!notification.read && (
                                <div className="w-2 h-2 bg-[var(--hive-gold)] rounded-full shrink-0 mt-2" />
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-[var(--hive-border-default)]">
                <Button
                  variant="ghost"
                  className="w-full text-sm"
                  onClick={() => window.location.href = '/notifications'}
                >
                  View all notifications
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Notification Badge Component for other uses
export function NotificationBadge({ count }: { count: number }) {
  if (count === 0) return null;
  
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="inline-flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full font-bold"
    >
      {count > 99 ? '99+' : count}
    </motion.span>
  );
}