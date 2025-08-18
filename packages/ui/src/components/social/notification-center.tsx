/**
 * HIVE Notification Center
 * Real-time notifications with categorization and interactions
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '../../components/ui/button';
import { Avatar } from '../index';
import { HiveBadge as Badge } from '../index';
import { 
  Bell, 
  X, 
  Check, 
  Users, 
  Heart, 
  MessageCircle, 
  Zap, 
  Calendar, 
  Star,
  Settings,
  Archive,
  Filter,
  ChevronDown,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'space_invite' | 'tool_update' | 'event' | 'mention' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isArchived: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  actor?: {
    id: string;
    name: string;
    avatar?: string;
    handle?: string;
  };
  target?: {
    type: 'post' | 'comment' | 'space' | 'tool' | 'event';
    id: string;
    title?: string;
  };
  actions?: Array<{
    id: string;
    label: string;
    type: 'primary' | 'secondary';
    action: () => void;
  }>;
  metadata?: Record<string, any>;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead?: (notificationId: string) => Promise<void>;
  onMarkAllAsRead?: () => Promise<void>;
  onArchive?: (notificationId: string) => Promise<void>;
  onDelete?: (notificationId: string) => Promise<void>;
  onNotificationClick?: (notification: Notification) => void;
  onSettingsClick?: () => void;
  isLoading?: boolean;
  enableFeatureFlag?: boolean;
}

const NotificationItem: React.FC<{
  notification: Notification;
  onMarkAsRead?: (id: string) => Promise<void>;
  onArchive?: (id: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onClick?: (notification: Notification) => void;
}> = ({
  notification,
  onMarkAsRead,
  onArchive,
  onDelete,
  onClick
}) => {
  const [showActions, setShowActions] = useState(false);

  const getTypeIcon = () => {
    switch (notification.type) {
      case 'like': return <Heart className="w-4 h-4 text-[var(--hive-accent)]" />;
      case 'comment': return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'follow': return <Users className="w-4 h-4 text-green-500" />;
      case 'space_invite': return <Users className="w-4 h-4 text-purple-500" />;
      case 'tool_update': return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'event': return <Calendar className="w-4 h-4 text-orange-500" />;
      case 'mention': return <MessageCircle className="w-4 h-4 text-pink-500" />;
      case 'system': return <Bell className="w-4 h-4 text-gray-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityIndicator = () => {
    switch (notification.priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'normal': return 'bg-blue-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`relative p-4 border-b border-[var(--hive-border-subtle)] hover:bg-[var(--hive-background-secondary)] transition-colors cursor-pointer group ${
        !notification.isRead ? 'bg-[var(--hive-primary)]/5' : ''
      }`}
      onClick={() => onClick?.(notification)}
    >
      {/* Priority Indicator */}
      {notification.priority !== 'normal' && (
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${getPriorityIndicator()}`} />
      )}

      {/* Unread Indicator */}
      {!notification.isRead && (
        <div className="absolute left-2 top-4 w-2 h-2 bg-[var(--hive-primary)] rounded-full" />
      )}

      <div className="flex gap-3 ml-4">
        {/* Avatar or Icon */}
        <div className="flex-shrink-0">
          {notification.actor?.avatar ? (
            <Avatar
              src={notification.actor.avatar}
              initials={notification.actor.name.charAt(0)}
              size="sm"
            />
          ) : (
            <div className="w-8 h-8 bg-[var(--hive-background-secondary)] rounded-full flex items-center justify-center">
              {getTypeIcon()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                {notification.title}
              </h4>
              <p className="text-sm text-[var(--hive-text-secondary)] leading-relaxed">
                {notification.message}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-[var(--hive-text-muted)]">
                  {formatTimeAgo(notification.timestamp)}
                </span>
                {notification.target && (
                  <Badge size="xs" variant="secondary">
                    {notification.target.type}
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowActions(!showActions);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="w-3 h-3" />
              </Button>

              <AnimatePresence>
                {showActions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute top-full right-0 mt-1 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg shadow-lg py-1 z-20 min-w-[140px]"
                  >
                    {!notification.isRead && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkAsRead?.(notification.id);
                          setShowActions(false);
                        }}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2"
                      >
                        <Check className="w-3 h-3" />
                        Mark as read
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onArchive?.(notification.id);
                        setShowActions(false);
                      }}
                      className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2"
                    >
                      <Archive className="w-3 h-3" />
                      Archive
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.(notification.id);
                        setShowActions(false);
                      }}
                      className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2 text-[var(--hive-status-error)]"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Buttons */}
          {notification.actions && notification.actions.length > 0 && (
            <div className="flex gap-2 mt-3">
              {notification.actions.map((action) => (
                <Button
                  key={action.id}
                  size="xs"
                  variant={action.type === 'primary' ? 'default' : 'outline'}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.action();
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onArchive,
  onDelete,
  onNotificationClick,
  onSettingsClick,
  isLoading = false,
  enableFeatureFlag = true
}) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'mentions' | 'social'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Feature flag check
  if (!enableFeatureFlag) return null;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      switch (filter) {
        case 'unread':
          return !notification.isRead;
        case 'mentions':
          return notification.type === 'mention';
        case 'social':
          return ['like', 'comment', 'follow'].includes(notification.type);
        default:
          return !notification.isArchived;
      }
    });
  }, [notifications, filter]);

  const handleNotificationClick = useCallback((notification: Notification) => {
    // Mark as read when clicked
    if (!notification.isRead) {
      onMarkAsRead?.(notification.id);
    }
    
    // Handle navigation
    onNotificationClick?.(notification);
    
    // Close on mobile
    if (window.innerWidth < 768) {
      onClose();
    }
  }, [onMarkAsRead, onNotificationClick, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      className="absolute top-full right-0 mt-2 w-96 max-w-[90vw] bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-xl shadow-xl z-50 max-h-[80vh] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--hive-border-subtle)]">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-[var(--hive-text-primary)]" />
          <h3 className="font-semibold text-[var(--hive-text-primary)]">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <Badge size="sm" className="bg-[var(--hive-primary)] text-white">
              {unreadCount}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Filter Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onSettingsClick}
          >
            <Settings className="w-4 h-4" />
          </Button>

          {/* Close */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-[var(--hive-border-subtle)] overflow-hidden"
          >
            <div className="p-3 flex gap-2">
              {[
                { key: 'all', label: 'All' },
                { key: 'unread', label: 'Unread' },
                { key: 'mentions', label: 'Mentions' },
                { key: 'social', label: 'Social' }
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  variant={filter === key ? 'default' : 'outline'}
                  size="xs"
                  onClick={() => setFilter(key as any)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      {unreadCount > 0 && (
        <div className="p-3 border-b border-[var(--hive-border-subtle)]">
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllAsRead}
            className="w-full"
          >
            <Check className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        </div>
      )}

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-6 h-6 border-2 border-[var(--hive-primary)] border-t-transparent rounded-full"></div>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="w-8 h-8 text-[var(--hive-text-muted)] mx-auto mb-2" />
            <p className="text-sm text-[var(--hive-text-muted)]">
              {filter === 'all' ? 'No notifications yet' : `No ${filter} notifications`}
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
                onArchive={onArchive}
                onDelete={onDelete}
                onClick={handleNotificationClick}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[var(--hive-border-subtle)] text-center">
        <Button variant="ghost" size="sm" className="text-xs">
          View all notifications
        </Button>
      </div>
    </motion.div>
  );
};