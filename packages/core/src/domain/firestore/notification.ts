import { z } from "zod";
import {
  NotificationSchema,
  NotificationPreferencesSchema,
  NotificationTemplateSchema,
  NotificationBatchSchema,
  NotificationTypeSchema,
  NotificationPrioritySchema,
  NotificationActionSchema,
  type Notification,
  type NotificationPreferences,
  type NotificationTemplate,
  type NotificationBatch,
  type NotificationType,
  type NotificationPriority,
  type NotificationAction
} from "@hive/validation";

// Re-export validation schemas
export {
  NotificationSchema,
  NotificationPreferencesSchema,
  NotificationTemplateSchema,
  NotificationBatchSchema,
  NotificationTypeSchema,
  NotificationPrioritySchema,
  NotificationActionSchema,
  type Notification,
  type NotificationPreferences,
  type NotificationTemplate,
  type NotificationBatch,
  type NotificationType,
  type NotificationPriority,
  type NotificationAction
};

// Firestore-specific helpers
export const NotificationConverter = {
  toFirestore: (notification: Notification) => ({
    ...notification,
    scheduledFor: notification.scheduledFor,
    expiresAt: notification.expiresAt,
    createdAt: notification.createdAt,
    readAt: notification.readAt,
    clickedAt: notification.clickedAt
  }),
  
  fromFirestore: (data: any): Notification => {
    return NotificationSchema.parse({
      ...data,
      scheduledFor: data.scheduledFor?.toDate?.() || data.scheduledFor,
      expiresAt: data.expiresAt?.toDate?.() || data.expiresAt,
      createdAt: data.createdAt?.toDate?.() || data.createdAt,
      readAt: data.readAt?.toDate?.() || data.readAt,
      clickedAt: data.clickedAt?.toDate?.() || data.clickedAt
    });
  }
};

export const NotificationPreferencesConverter = {
  toFirestore: (preferences: NotificationPreferences) => ({
    ...preferences,
    updatedAt: preferences.updatedAt
  }),
  
  fromFirestore: (data: any): NotificationPreferences => {
    return NotificationPreferencesSchema.parse({
      ...data,
      updatedAt: data.updatedAt?.toDate?.() || data.updatedAt
    });
  }
};

// Collection paths
export const NOTIFICATION_COLLECTIONS = {
  USER_NOTIFICATIONS: (userId: string) => `users/${userId}/notifications`,
  USER_PREFERENCES: (userId: string) => `users/${userId}/notification_preferences`,
  TEMPLATES: 'notification_templates',
  BATCHES: 'notification_batches',
  GLOBAL_NOTIFICATIONS: 'notifications'
} as const;

// Notification utility functions
export const NotificationUtils = {
  createNotification: (
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    options?: Partial<Notification>
  ): Omit<Notification, 'id' | 'createdAt'> => ({
    userId,
    type,
    priority: 'medium',
    title,
    message,
    read: false,
    dismissed: false,
    clicked: false,
    ...options
  }),
  
  isExpired: (notification: Notification): boolean => {
    if (!notification.expiresAt) return false;
    return new Date() > notification.expiresAt;
  },
  
  shouldShow: (notification: Notification): boolean => {
    return !notification.dismissed && 
           !NotificationUtils.isExpired(notification) &&
           (!notification.scheduledFor || notification.scheduledFor <= new Date());
  },
  
  groupNotifications: (notifications: Notification[]): Record<string, Notification[]> => {
    return notifications.reduce((groups, notification) => {
      const key = notification.groupId || notification.type;
      if (!groups[key]) groups[key] = [];
      groups[key].push(notification);
      return groups;
    }, {} as Record<string, Notification[]>);
  },
  
  getUnreadCount: (notifications: Notification[]): number => {
    return notifications.filter(n => !n.read && NotificationUtils.shouldShow(n)).length;
  },
  
  formatNotificationTime: (notification: Notification): string => {
    const now = new Date();
    const created = notification.createdAt;
    const diffMs = now.getTime() - created.getTime();
    
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return created.toLocaleDateString();
  },
  
  createRitualNotification: (
    userId: string,
    ritualId: string,
    ritualTitle: string,
    type: 'available' | 'reminder' | 'complete'
  ): Omit<Notification, 'id' | 'createdAt'> => {
    const titles = {
      available: '🕯️ New Ritual Available',
      reminder: '⏰ Ritual Ending Soon',
      complete: '✨ Ritual Complete'
    };
    
    const messages = {
      available: `${ritualTitle} is now available. Light your flame!`,
      reminder: `${ritualTitle} ends soon. Don't miss your chance to participate.`,
      complete: `${ritualTitle} is complete. See how the community responded.`
    };
    
    return NotificationUtils.createNotification(
      userId,
      `ritual_${type}` as NotificationType,
      titles[type],
      messages[type],
      {
        priority: type === 'reminder' ? 'high' : 'medium',
        data: { ritualId, ritualTitle },
        actions: type === 'complete' ? [] : [{
          label: type === 'available' ? 'Participate' : 'View',
          action: 'navigate',
          target: `/rituals/${ritualId}`
        }]
      }
    );
  },
  
  createSpaceNotification: (
    userId: string,
    spaceId: string,
    spaceName: string,
    type: 'activated' | 'invitation' | 'post_like'
  ): Omit<Notification, 'id' | 'createdAt'> => {
    const titles = {
      activated: '🚀 Space Activated',
      invitation: '📬 Space Invitation',
      post_like: '❤️ Post Liked'
    };
    
    const messages = {
      activated: `${spaceName} is now active! Join the community.`,
      invitation: `You've been invited to join ${spaceName}.`,
      post_like: `Someone liked your post in ${spaceName}.`
    };
    
    return NotificationUtils.createNotification(
      userId,
      `space_${type}` as NotificationType,
      titles[type],
      messages[type],
      {
        priority: type === 'invitation' ? 'high' : 'medium',
        data: { spaceId, spaceName },
        actions: [{
          label: type === 'post_like' ? 'View Post' : 'View Space',
          action: 'navigate',
          target: `/spaces/${spaceId}`
        }]
      }
    );
  }
};

// Notification template helpers
export const NotificationTemplates = {
  RITUAL_AVAILABLE: {
    type: 'ritual_available' as NotificationType,
    titleTemplate: '🕯️ {{ritualTitle}} is Available',
    messageTemplate: 'A new ritual is ready for you. Light your flame and join the community!',
    variables: ['ritualTitle', 'ritualId'],
    defaultPriority: 'medium' as NotificationPriority,
    defaultActions: [{
      label: 'Participate',
      action: 'navigate' as const,
      target: '/rituals/{{ritualId}}'
    }]
  },
  
  SPACE_ACTIVATED: {
    type: 'space_activated' as NotificationType,
    titleTemplate: '🚀 {{spaceName}} is Active',
    messageTemplate: 'The {{spaceName}} space is now active! Join {{memberCount}} other members.',
    variables: ['spaceName', 'spaceId', 'memberCount'],
    defaultPriority: 'medium' as NotificationPriority,
    defaultActions: [{
      label: 'Join Space',
      action: 'navigate' as const,
      target: '/spaces/{{spaceId}}'
    }]
  },
  
  ACHIEVEMENT_UNLOCKED: {
    type: 'achievement_unlocked' as NotificationType,
    titleTemplate: '🏆 Achievement Unlocked',
    messageTemplate: 'Congratulations! You\'ve unlocked {{achievementName}}.',
    variables: ['achievementName', 'achievementDescription'],
    defaultPriority: 'high' as NotificationPriority
  }
} as const;