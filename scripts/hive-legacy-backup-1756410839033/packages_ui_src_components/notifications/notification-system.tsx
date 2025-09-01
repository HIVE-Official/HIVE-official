"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  Check, 
  User, 
  Users, 
  Zap, 
  Calendar, 
  MessageSquare, 
  Award, 
  AlertCircle, 
  Info,
  CheckCircle,
  Heart,
  Share2,
  Eye,
  MoreHorizontal,
  Settings,
  Filter,
  Trash2
} from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Badge } from '../../atomic/atoms/badge';
import { Card, CardContent } from '../../atomic/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { cn } from '../lib/utils';

export interface Notification {
  id: string;
  type: 'social' | 'system' | 'space' | 'tool' | 'calendar' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isArchived: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  actionText?: string;
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
  metadata?: {
    spaceId?: string;
    toolId?: string;
    eventId?: string;
    achievementId?: string;
  };
}

interface NotificationSystemProps {
  notifications: Notification[];
  unreadCount: number;
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onAction: (notification: Notification) => void;
  className?: string;
}

export function NotificationSystem({
  notifications,
  unreadCount,
  isOpen,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onArchive,
  onDelete,
  onAction,
  className
}: NotificationSystemProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(n => !n.isRead && !n.isArchived);
      case 'social':
        return notifications.filter(n => n.type === 'social' && !n.isArchived);
      case 'system':
        return notifications.filter(n => n.type === 'system' && !n.isArchived);
      default:
        return notifications.filter(n => !n.isArchived);
    }
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadInCurrentTab = filteredNotifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'social': return <Heart className="h-4 w-4 text-pink-400" />;
      case 'space': return <Users className="h-4 w-4 text-blue-400" />;
      case 'tool': return <Zap className="h-4 w-4 text-[var(--hive-brand-secondary)]" />;
      case 'calendar': return <Calendar className="h-4 w-4 text-green-400" />;
      case 'achievement': return <Award className="h-4 w-4 text-yellow-400" />;
      case 'system': return <Info className="h-4 w-4 text-purple-400" />;
      default: return <Bell className="h-4 w-4 text-hive-text-secondary" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500';
      case 'high': return 'border-l-orange-400';
      case 'medium': return 'border-l-yellow-400';
      default: return 'border-l-transparent';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return time.toLocaleDateString();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[var(--hive-background-primary)]/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Notification Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              "fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-hive-background-primary border-l border-hive-border-subtle z-50 overflow-hidden",
              className
            )}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-hive-border-subtle bg-hive-surface-elevated/50">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
                  <h2 className="text-lg font-semibold text-hive-text-primary">Notifications</h2>
                  {unreadCount > 0 && (
                    <Badge className="bg-red-500 text-[var(--hive-text-primary)]">{unreadCount}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadInCurrentTab > 0 && (
                    <ButtonEnhanced variant="ghost" size="sm" onClick={onMarkAllAsRead}>
                      <Check className="h-4 w-4 mr-1" />
                      Mark all read
                    </ButtonEnhanced>
                  )}
                  <ButtonEnhanced variant="ghost" size="sm" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </ButtonEnhanced>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-4 py-3 border-b border-hive-border-subtle">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4 bg-hive-surface-elevated">
                    <TabsTrigger value="all" className="text-xs">
                      All
                      {notifications.filter(n => !n.isArchived).length > 0 && (
                        <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                          {notifications.filter(n => !n.isArchived).length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="text-xs">
                      Unread
                      {unreadCount > 0 && (
                        <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs bg-red-500 text-[var(--hive-text-primary)]">
                          {unreadCount}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="social" className="text-xs">Social</TabsTrigger>
                    <TabsTrigger value="system" className="text-xs">System</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {filteredNotifications.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col items-center justify-center h-64 text-center px-6"
                    >
                      <Bell className="h-12 w-12 text-hive-text-secondary mb-4" />
                      <h3 className="text-lg font-medium text-hive-text-primary mb-2">All caught up!</h3>
                      <p className="text-hive-text-secondary">
                        {activeTab === 'unread' 
                          ? "No unread notifications" 
                          : "No notifications in this category"}
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-1 p-2">
                      {filteredNotifications.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                          onMarkAsRead={onMarkAsRead}
                          onArchive={onArchive}
                          onDelete={onDelete}
                          onAction={onAction}
                          getNotificationIcon={getNotificationIcon}
                          getPriorityColor={getPriorityColor}
                          formatTimeAgo={formatTimeAgo}
                        />
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-hive-border-subtle bg-hive-surface-elevated/50">
                <div className="flex items-center justify-between">
                  <ButtonEnhanced variant="ghost" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </ButtonEnhanced>
                  <ButtonEnhanced variant="ghost" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </ButtonEnhanced>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onAction: (notification: Notification) => void;
  getNotificationIcon: (type: string) => React.ReactNode;
  getPriorityColor: (priority: string) => string;
  formatTimeAgo: (timestamp: string) => string;
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onArchive,
  onDelete,
  onAction,
  getNotificationIcon,
  getPriorityColor,
  formatTimeAgo
}: NotificationItemProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "cursor-pointer transition-all duration-200 hover:bg-hive-surface-elevated/50",
        "border-l-4",
        getPriorityColor(notification.priority),
        !notification.isRead && "bg-[var(--hive-brand-secondary)]/5 border-hive-gold/20"
      )}>
        <CardContent className="p-3">
          <div className="flex items-start gap-3">
            {/* Icon/Avatar */}
            <div className="flex-shrink-0 mt-1">
              {notification.sender ? (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={notification.sender.avatar} alt={notification.sender.name} />
                  <AvatarFallback className="text-xs">
                    {notification.sender.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-8 h-8 bg-hive-surface-elevated rounded-full flex items-center justify-center">
                  {getNotificationIcon(notification.type)}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0" onClick={() => onAction(notification)}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className={cn(
                  "text-sm font-medium line-clamp-2",
                  notification.isRead ? "text-hive-text-secondary" : "text-hive-text-primary"
                )}>
                  {notification.title}
                </h4>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full" />
                  )}
                  <ButtonEnhanced
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowActions(!showActions);
                    }}
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </ButtonEnhanced>
                </div>
              </div>

              <p className={cn(
                "text-xs line-clamp-2 mb-2",
                notification.isRead ? "text-hive-text-secondary" : "text-hive-text-primary"
              )}>
                {notification.message}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-hive-text-secondary">
                  {formatTimeAgo(notification.timestamp)}
                </span>

                {notification.actionText && (
                  <ButtonEnhanced variant="ghost" size="sm" className="h-6 text-xs text-[var(--hive-brand-secondary)] hover:text-hive-brand-secondary">
                    {notification.actionText}
                  </ButtonEnhanced>
                )}
              </div>
            </div>
          </div>

          {/* Action Menu */}
          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 pt-3 border-t border-hive-border-subtle flex items-center gap-2"
              >
                {!notification.isRead && (
                  <ButtonEnhanced 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkAsRead(notification.id);
                      setShowActions(false);
                    }}
                    className="text-xs"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Mark read
                  </ButtonEnhanced>
                )}
                <ButtonEnhanced 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onArchive(notification.id);
                    setShowActions(false);
                  }}
                  className="text-xs"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Archive
                </ButtonEnhanced>
                <ButtonEnhanced 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(notification.id);
                    setShowActions(false);
                  }}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </ButtonEnhanced>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Notification Bell Component for Header
interface NotificationBellProps {
  unreadCount: number;
  onClick: () => void;
  className?: string;
}

export function NotificationBell({ unreadCount, onClick, className }: NotificationBellProps) {
  return (
    <ButtonEnhanced
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn("relative", className)}
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-[var(--hive-text-primary)] border-2 border-hive-background-primary">
          {unreadCount > 99 ? '99+' : unreadCount}
        </Badge>
      )}
    </ButtonEnhanced>
  );
}

// Hook for managing notification state
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead && !n.isArchived).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const archive = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isArchived: true } : n)
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead' | 'isArchived'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      isRead: false,
      isArchived: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  return {
    notifications,
    unreadCount,
    isOpen,
    setIsOpen,
    markAsRead,
    markAllAsRead,
    archive,
    deleteNotification,
    addNotification
  };
}