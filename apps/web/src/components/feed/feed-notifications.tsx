'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  BellOff,
  MessageCircle,
  Heart,
  UserPlus,
  Calendar,
  TrendingUp,
  Hash,
  Zap,
  X,
  Check,
  ChevronRight,
  Clock,
  Filter,
  Settings
} from 'lucide-react';
import { Button, Badge } from '@hive/ui';
import { cn } from '../../lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { authenticatedFetch } from '../../lib/auth-utils';
import { db } from '../../lib/firebase';
import { collection, query, where, orderBy, limit, onSnapshot, updateDoc, doc, Timestamp } from 'firebase/firestore';

interface Notification {
  id: string;
  type: 'mention' | 'reaction' | 'comment' | 'follow' | 'event' | 'trending' | 'coordination' | 'ritual';
  title: string;
  message: string;
  sourceId?: string;
  sourceType?: string;
  spaceId?: string;
  spaceName?: string;
  actorId?: string;
  actorName?: string;
  actorAvatar?: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: any;
}

interface FeedNotificationsProps {
  userId: string;
  onNotificationClick?: (notification: Notification) => void;
  className?: string;
}

export function FeedNotifications({
  userId,
  onNotificationClick,
  className = ''
}: FeedNotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'mentions' | 'events'>('all');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    // Setup real-time listener for notifications
    const q = query(
      collection(db, 'users', userId, 'notifications'),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications: Notification[] = [];
      let unread = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        const notification: Notification = {
          id: doc.id,
          type: data.type,
          title: data.title,
          message: data.message,
          sourceId: data.sourceId,
          sourceType: data.sourceType,
          spaceId: data.spaceId,
          spaceName: data.spaceName,
          actorId: data.actorId,
          actorName: data.actorName,
          actorAvatar: data.actorAvatar,
          timestamp: data.timestamp?.toDate() || new Date(),
          read: data.read || false,
          actionUrl: data.actionUrl,
          metadata: data.metadata
        };

        newNotifications.push(notification);
        if (!notification.read) unread++;
      });

      setNotifications(newNotifications);
      setUnreadCount(unread);
      setLoading(false);

      // Request browser notification permission if needed
      if (unread > 0 && notificationsEnabled && 'Notification' in window) {
        requestNotificationPermission();
      }
    });

    return () => unsubscribe();
  }, [userId, notificationsEnabled]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        showBrowserNotification();
      }
    } else if (Notification.permission === 'granted') {
      showBrowserNotification();
    }
  };

  const showBrowserNotification = () => {
    const latestUnread = notifications.find(n => !n.read);
    if (latestUnread && document.hidden) {
      new Notification('HIVE', {
        body: latestUnread.message,
        icon: '/logo.png',
        badge: '/badge.png',
        tag: latestUnread.id,
        requireInteraction: false
      });
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await updateDoc(doc(db, 'users', userId, 'notifications', notificationId), {
        read: true,
        readAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const promises = notifications
        .filter(n => !n.read)
        .map(n => markAsRead(n.id));
      await Promise.all(promises);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    onNotificationClick?.(notification);
    setIsOpen(false);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'mention': return MessageCircle;
      case 'reaction': return Heart;
      case 'comment': return MessageCircle;
      case 'follow': return UserPlus;
      case 'event': return Calendar;
      case 'trending': return TrendingUp;
      case 'coordination': return Zap;
      case 'ritual': return Hash;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'mention': return 'text-blue-400 bg-blue-400/10';
      case 'reaction': return 'text-pink-400 bg-pink-400/10';
      case 'comment': return 'text-green-400 bg-green-400/10';
      case 'follow': return 'text-purple-400 bg-purple-400/10';
      case 'event': return 'text-orange-400 bg-orange-400/10';
      case 'trending': return 'text-yellow-400 bg-yellow-400/10';
      case 'coordination': return 'text-red-400 bg-red-400/10';
      case 'ritual': return 'text-indigo-400 bg-indigo-400/10';
      default: return 'text-neutral-400 bg-neutral-400/10';
    }
  };

  const filteredNotifications = notifications.filter(n => {
    switch (filter) {
      case 'unread': return !n.read;
      case 'mentions': return n.type === 'mention';
      case 'events': return n.type === 'event' || n.type === 'coordination';
      default: return true;
    }
  });

  return (
    <>
      {/* Notification Bell Button */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className={cn('relative', className)}
        >
          {notificationsEnabled ? (
            <Bell className="h-5 w-5 text-neutral-400" />
          ) : (
            <BellOff className="h-5 w-5 text-neutral-400" />
          )}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </div>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
            />

            {/* Notifications Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                'absolute right-0 top-12 w-full md:w-96',
                'bg-black border border-white/10 rounded-lg shadow-2xl',
                'z-50 max-h-[80vh] overflow-hidden flex flex-col'
              )}
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[var(--hive-text-inverse)]">
                    Notifications
                  </h3>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs text-[var(--hive-brand-secondary)]"
                      >
                        Mark all read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-neutral-400"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                  {(['all', 'unread', 'mentions', 'events'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={cn(
                        'px-3 py-1 rounded-lg text-xs capitalize transition-all',
                        filter === f
                          ? 'bg-white/10 text-[var(--hive-text-inverse)]'
                          : 'text-neutral-400 hover:text-[var(--hive-text-inverse)]'
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="p-4 space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : filteredNotifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
                    <p className="text-neutral-400">No notifications</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {filter === 'all' ? "You're all caught up!" : `No ${filter} notifications`}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {filteredNotifications.map(notification => {
                      const Icon = getNotificationIcon(notification.type);
                      const colorClass = getNotificationColor(notification.type);

                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          onClick={() => handleNotificationClick(notification)}
                          className={cn(
                            'p-4 cursor-pointer transition-all hover:bg-white/5',
                            !notification.read && 'bg-white/[0.02]'
                          )}
                        >
                          <div className="flex gap-3">
                            <div className={cn('p-2 rounded-lg flex-shrink-0', colorClass)}>
                              <Icon className="h-4 w-4" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <p className={cn(
                                    'text-sm mb-1',
                                    notification.read ? 'text-neutral-300' : 'text-[var(--hive-text-inverse)] font-medium'
                                  )}>
                                    {notification.title}
                                  </p>
                                  <p className="text-xs text-neutral-400 line-clamp-2">
                                    {notification.message}
                                  </p>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full flex-shrink-0 mt-2" />
                                )}
                              </div>

                              <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
                                {notification.spaceName && (
                                  <span className="flex items-center gap-1">
                                    <Hash className="h-3 w-3" />
                                    {notification.spaceName}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                                </span>
                              </div>
                            </div>

                            <ChevronRight className="h-4 w-4 text-neutral-400 flex-shrink-0 mt-1" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className="text-xs text-neutral-400"
                >
                  {notificationsEnabled ? (
                    <>
                      <Bell className="h-3 w-3 mr-1" />
                      Notifications On
                    </>
                  ) : (
                    <>
                      <BellOff className="h-3 w-3 mr-1" />
                      Notifications Off
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-neutral-400"
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Settings
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}