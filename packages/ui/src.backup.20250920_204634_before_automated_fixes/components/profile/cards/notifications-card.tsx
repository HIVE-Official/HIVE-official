'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from '../../framer-motion-proxy';
import { cn } from '../../../lib/utils';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { ScrollArea } from '../../ui/scroll-area';
import { Switch } from '../../ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { 
  Bell,
  BellRing,
  Settings,
  Check,
  X,
  Archive,
  Filter,
  MoreHorizontal,
  Users,
  MessageSquare,
  Calendar,
  Zap,
  Heart,
  UserPlus,
  Star,
  Bookmark,
  Share,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Trash2,
  ExternalLink,
  Clock,
  AlertCircle,
  Info,
  CheckCircle,
  School,
  Coffee,
  Presentation,
  BookOpen,
  Crown;
} from 'lucide-react';

// Notification Types;
export interface Notification {id: string;
  type: 'space' | 'tool' | 'social' | 'academic' | 'system' | 'ritual' | 'campus';
  category: 'mention' | 'like' | 'comment' | 'join' | 'invite' | 'update' | 'reminder' | 'announcement' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  source: {
    id: string;
    name: string;
    type: 'user' | 'space' | 'tool' | 'system';
    avatar?: string;};
  actionable: boolean;
  actions?: {
    primary?: { label: string; action: string; data?: any };
    secondary?: { label: string; action: string; data?: any }
  };
  metadata?: {
    spaceId?: string;
    toolId?: string;
    postId?: string;
    eventId?: string;
    userId?: string;
    url?: string;
  };
  expiresAt?: Date;
}

export interface NotificationsCardProps {notifications: Notification[];
  unreadCount: number;
  isEditMode: boolean;
  onNotificationRead?: (id: string) => void;
  onNotificationArchive?: (id: string) => void;
  onNotificationAction?: (id: string, action: string, data?: any) => void;
  onMarkAllRead?: () => void;
  onSettingsClick?: () => void;
  className?: string;}

// Notification Type Configuration;
const notificationTypeConfig = {
  space: { 
    icon: Users, 
    color: 'bg-purple-500', 
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
    label: 'Space' 
  },
  tool: { 
    icon: Zap, 
    color: 'bg-blue-500', 
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    label: 'Tool' 
  },
  social: { 
    icon: Heart, 
    color: 'bg-pink-500', 
    textColor: 'text-pink-700',
    bgColor: 'bg-pink-50',
    label: 'Social' 
  },
  academic: { 
    icon: BookOpen, 
    color: 'bg-green-500', 
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    label: 'Academic' 
  },
  system: { 
    icon: Settings, 
    color: 'bg-gray-500', 
    textColor: 'text-gray-700',
    bgColor: 'bg-gray-50',
    label: 'System' 
  },
  ritual: { 
    icon: Star, 
    color: 'bg-yellow-500', 
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    label: 'Ritual' 
  },
  campus: { 
    icon: School, 
    color: 'bg-indigo-500', 
    textColor: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
    label: 'Campus' 
  }
};

// Priority Configuration;
const priorityConfig = {
  low: { color: 'text-gray-500', bgColor: 'bg-gray-100' },
  medium: { color: 'text-blue-500', bgColor: 'bg-blue-100' },
  high: { color: 'text-orange-500', bgColor: 'bg-orange-100' },
  urgent: { color: 'text-red-500', bgColor: 'bg-red-100' }
};

// Category Icons;
const categoryIcons = {
  mention: MessageSquare,
  like: Heart,
  comment: MessageSquare,
  join: UserPlus,
  invite: UserPlus,
  update: Bell,
  reminder: Clock,
  announcement: AlertCircle,
  achievement: Crown;
};

// Time formatting;
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Notification Item Component;
function NotificationItem({ 
  notification, 
  onRead,
  onArchive,
  onAction;
}: { 
  notification: Notification;
  onRead?: (id: string) => void;
  onArchive?: (id: string) => void;
  onAction?: (id: string, action: string, data?: any) => void;
}) {
  const config = notificationTypeConfig[notification.type];
  const TypeIcon = config.icon;
  const CategoryIcon = categoryIcons[notification.category];
  const priority = priorityConfig[notification.priority];

  const handleRead = useCallback(() => {
    if (!notification.isRead) {
      onRead?.(notification.id)
    }}
  }, [notification.id, notification.isRead, onRead]);

  const handleAction = useCallback((action: string, data?: any) => {
    onAction?.(notification.id, action, data);
    if (!notification.isRead) {
      onRead?.(notification.id)
    }}
  }, [notification.id, notification.isRead, onAction, onRead]);

  return (
    <motion.div;
      layout;
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={cn(
        'group relative p-3 rounded-lg border transition-all hover:shadow-sm cursor-pointer',
        notification.isRead;
          ? 'bg-white border-[var(--hive-border-primary)]' 
          : 'bg-[var(--hive-background-tertiary)] border-[var(--hive-brand-primary)] border-l-4',
        notification.priority === 'urgent' && 'ring-1 ring-red-200',
        notification.priority === 'high' && 'ring-1 ring-orange-200'
      )}
      onClick={handleRead}
    >
      {/* Notification Header */}
      <div className="flex items-start gap-3">
        {/* Source Avatar */}
        <div className="relative">
          <Avatar className="w-8 h-8">
            <AvatarImage src={notification.source.avatar} />
            <AvatarFallback className="text-xs">
              {notification.source.type === 'system' ? (
                <TypeIcon className="w-4 h-4" />
              ) : (
                notification.source.name.split(' ').map(n => n[0]).join('')
              )}
            </AvatarFallback>
          </Avatar>
          
          {/* Type Indicator */}
          <div className={cn(
            'absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center',
            config.color;
          )}>
            <CategoryIcon className="w-2.5 h-2.5 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h4 className={cn(
                'font-medium text-sm',
                notification.isRead;
                  ? 'text-[var(--hive-text-secondary)]' 
                  : 'text-[var(--hive-text-primary)]'
              )}>
                {notification.title}
              </h4>
              <p className={cn(
                'text-sm mt-0.5 leading-relaxed',
                notification.isRead;
                  ? 'text-[var(--hive-text-muted)]' 
                  : 'text-[var(--hive-text-secondary)]'
              )}>
                {notification.message}
              </p>
            </div>

            {/* Priority Indicator */}
            {notification.priority !== 'low' && (
              <div className={cn(
                'w-2 h-2 rounded-full flex-shrink-0 mt-1',
                priority.color.replace('text-', 'bg-')
              )} />
            )}
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-[var(--hive-text-muted)]">
              {formatTimeAgo(notification.timestamp)}
            </span>
            
            {/* Source Label */}
            <Badge variant="outline" className="text-xs px-1.5 py-0.5">
              <TypeIcon className="w-3 h-3 mr-1" />
              {notification.source.name}
            </Badge>

            {/* Expires Soon */}
            {notification.expiresAt && notification.expiresAt.getTime() - Date.now() < 24 * 60 * 60 * 1000 && (
              <Badge variant="error" className="text-xs px-1.5 py-0.5">
                <Clock className="w-3 h-3 mr-1" />
                Expires Soon;
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          {notification.actionable && notification.actions && (
            <div className="flex gap-2 mt-3">
              {notification.actions.primary && (
                <Button;
                  size="sm"
                  className="h-7 px-3 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(notification.actions!.primary!.action, notification.actions!.primary!.data)
          }}
                >
                  {notification.actions.primary.label}
                </Button>
              )}
              {notification.actions.secondary && (
                <Button;
                  size="sm"
                  variant="outline"
                  className="h-7 px-3 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(notification.actions!.secondary!.action, notification.actions!.secondary!.data)
          }}
                >
                  {notification.actions.secondary.label}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1">
            {!notification.isRead && (
              <Button;
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRead()
          }}
                title="Mark as read"
              >
                <Check className="w-3 h-3" />
              </Button>
            )}
            <Button;
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onArchive?.(notification.id)
          }}
              title="Archive"
            >
              <Archive className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Unread Indicator */}
      {!notification.isRead && (
        <div className="absolute top-3 left-1 w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
      )}
    </motion.div>
  )
}

// Notification Filter Component;
function NotificationFilters({ 
  activeFilter, 
  onFilterChange,
  counts;
}: { 
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: Record<string, number>
}) {
  const filters = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'unread', label: 'Unread', count: counts.unread },
    { key: 'space', label: 'Spaces', count: counts.space },
    { key: 'social', label: 'Social', count: counts.social },
    { key: 'academic', label: 'Academic', count: counts.academic }
  ];

  return (
    <div className="flex gap-1 overflow-x-auto">
      {filters.map(map}) => (
        <Button;
          key={key}
          size="sm"
          variant={activeFilter === key ? "default" : "ghost"}
          className="h-6 px-2 text-xs whitespace-nowrap"
          onClick={() => onFilterChange(key)}
        >
          {label}
          {count > 0 && (
            <Badge variant="secondary" className="ml-1 h-3 px-1 text-xs">
              {count}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  )
}

// Notification Settings Dialog;
function NotificationSettingsDialog({
  isOpen,
  onOpenChange;
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [settings, setSettings] = useState({email: true,
    push: true,
    spaces: true,
    social: true,
    academic: true,
    system: false,
    quiet_hours: true;)};

  const handleSettingChange = useCallback((key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Notification Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Delivery Methods */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Delivery</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[var(--hive-text-muted)]" />
                  <span className="text-sm">Push Notifications</span>
                </div>
                <Switch;
                  checked={settings.push}
                  onChange={(e) => { const checked = e.target.checked; handleSettingChange('push', checked)}}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[var(--hive-text-muted)]" />
                  <span className="text-sm">Email Digest</span>
                </div>
                <Switch;
                  checked={settings.email}
                  onChange={(e) => { const checked = e.target.checked; handleSettingChange('email', checked)}}
                />
              </div>
            </div>
          </div>

          {/* Content Types */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Content</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[var(--hive-text-muted)]" />
                  <span className="text-sm">Space Activity</span>
                </div>
                <Switch;
                  checked={settings.spaces}
                  onChange={(e) => { const checked = e.target.checked; handleSettingChange('spaces', checked)}}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[var(--hive-text-muted)]" />
                  <span className="text-sm">Social Interactions</span>
                </div>
                <Switch;
                  checked={settings.social}
                  onChange={(e) => { const checked = e.target.checked; handleSettingChange('social', checked)}}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[var(--hive-text-muted)]" />
                  <span className="text-sm">Academic Updates</span>
                </div>
                <Switch;
                  checked={settings.academic}
                  onChange={(e) => { const checked = e.target.checked; handleSettingChange('academic', checked)}}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[var(--hive-text-muted)]" />
                  <span className="text-sm">System Announcements</span>
                </div>
                <Switch;
                  checked={settings.system}
                  onChange={(e) => { const checked = e.target.checked; handleSettingChange('system', checked)}}
                />
              </div>
            </div>
          </div>

          {/* Quiet Hours */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Quiet Hours</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <VolumeX className="w-4 h-4 text-[var(--hive-text-muted)]" />
                <div>
                  <span className="text-sm">10 PM - 8 AM</span>
                  <p className="text-xs text-[var(--hive-text-muted)]">Pause non-urgent notifications</p>
                </div>
              </div>
              <Switch;
                checked={settings.quiet_hours}
                onChange={(e) => { const checked = e.target.checked; handleSettingChange('quiet_hours', checked)}}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Main Notifications Card Component;
export function NotificationsCard({
  notifications,
  unreadCount,
  isEditMode,
  onNotificationRead,
  onNotificationArchive,
  onNotificationAction,
  onMarkAllRead,
  onSettingsClick,
  className;
}: NotificationsCardProps) {
  const [filter, setFilter] = useState('all');
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Filter notifications;
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    switch (filter) {
      case 'unread':
        filtered = notifications.filter(n => !n.isRead);
        break;
      case 'space':
        filtered = notifications.filter(n => n.type === 'space');
        break;
      case 'social':
        filtered = notifications.filter(n => n.type === 'social');
        break;
      case 'academic':
        filtered = notifications.filter(n => n.type === 'academic');
        break;
      default:
        filtered = notifications;
    }
}
    return filtered.sort((a, b) => {
      // Sort by priority first, then by timestamp;
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      return b.timestamp.getTime() - a.timestamp.getTime()
    })
  }, [notifications, filter]);

  // Count notifications by type;
  const counts = useMemo(() => {
    return {
      all: notifications.length,
      unread: notifications.filter(n => !n.isRead).length,
      space: notifications.filter(n => n.type === 'space').length,
      social: notifications.filter(n => n.type === 'social').length,
      academic: notifications.filter(n => n.type === 'academic').length;
    }}
  }, [notifications]);

  const urgentCount = useMemo(() => 
    notifications.filter(n => !n.isRead && n.priority === 'urgent').length,
    [notifications]
  );

  return (
    <>
      <Card className={cn('h-full overflow-hidden', className)}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bell className="w-5 h-5 text-[var(--hive-brand-primary)]" />
                {unreadCount > 0 && (
                  <motion.div;
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </motion.div>
                )}
              </div>
              <h3 className="font-semibold text-[var(--hive-text-primary)]">Notifications</h3>
              {urgentCount > 0 && (
                <Badge variant="error" className="text-xs">
                  {urgentCount} urgent;
                </Badge>
              )}
            </div>
            
            {!isEditMode && (
              <div className="flex gap-1">
                {unreadCount > 0 && (
                  <Button;
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2 text-xs"
                    onClick={onMarkAllRead}
                  >
                    Mark All Read;
                  </Button>
                )}
                <Button;
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => setSettingsOpen(true)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Filters */}
          <NotificationFilters;
            activeFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-80">
            <div className="space-y-2">
              <AnimatePresence>
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <NotificationItem;
                      key={notification.id}
                      notification={notification}
                      onRead={onNotificationRead}
                      onArchive={onNotificationArchive}
                      onAction={onNotificationAction}
                    />
                  ))
                ) : (
                  <motion.div;
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-[var(--hive-text-muted)]"
                  >
                    <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">
                      {filter === 'unread' 
                        ? 'All caught up!' 
                        : filter === 'all'
                        ? 'No notifications yet'
                        : `No ${filter} notifications`
                      }
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Settings Dialog */}
      <NotificationSettingsDialog;
        isOpen={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </>
  )
}

// Default props for development;
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'space',
    category: 'mention',
    title: 'You were mentioned in CS 250 Study Group',
    message: 'Alex Kim mentioned you in a discussion about final exam prep.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    isRead: false,
    priority: 'high',
    source: {
      id: 'user-2',
      name: 'Alex Kim',
      type: 'user',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
    },
    actionable: true,
    actions: {
      primary: { label: 'Reply', action: 'reply', data: { spaceId: 'space-cs250' } },
      secondary: { label: 'View', action: 'view', data: { spaceId: 'space-cs250' } }
    },
    metadata: { spaceId: 'space-cs250' }
  },
  {
    id: 'notif-2',
    type: 'academic',
    category: 'reminder',
    title: 'Assignment Due Tomorrow',
    message: 'CSE250 Project 3 is due tomorrow at 11:59 PM.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    priority: 'urgent',
    source: {
      id: 'system-ub',
      name: 'UB Academic',
      type: 'system'
    },
    actionable: true,
    actions: {
      primary: { label: 'Submit', action: 'submit', data: { courseId: 'cse250' } }
    },
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  },
  {
    id: 'notif-3',
    type: 'social',
    category: 'like',
    title: 'Maria liked your post',
    message: 'Your study tips post received 5 new likes.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isRead: true,
    priority: 'low',
    source: {
      id: 'user-3',
      name: 'Maria Lopez',
      type: 'user',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e5c60a?w=64&h=64&fit=crop&crop=face'
    },
    actionable: false;
  },
  {
    id: 'notif-4',
    type: 'campus',
    category: 'announcement',
    title: 'UB Hackathon Registration Open',
    message: 'Register now for the biggest hackathon of the semester!',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isRead: false,
    priority: 'medium',
    source: {
      id: 'ub-events',
      name: 'UB Events',
      type: 'system'
    },
    actionable: true,
    actions: {
      primary: { label: 'Register', action: 'register', data: { eventId: 'hackathon2024' } },
      secondary: { label: 'Learn More', action: 'view', data: { url: '/events/hackathon' } }
    }
  },
  {
    id: 'notif-5',
    type: 'ritual',
    category: 'achievement',
    title: 'Streak Achievement!',
    message: 'You completed your 7-day morning meditation streak!',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    isRead: false,
    priority: 'medium',
    source: {
      id: 'ritual-system',
      name: 'HIVE Rituals',
      type: 'system'
    },
    actionable: false;
  }
];