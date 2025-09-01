/**
 * HIVE Cross-Platform Notification System
 * 
 * Manages notifications across all platform slices with smart routing,
 * real-time delivery, and cross-device synchronization
 */

import { type PlatformNotification } from './platform-integration';
import { useUnifiedStore } from './unified-state-management';

// ===== NOTIFICATION TYPES =====

export interface NotificationConfig {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  sourceSlice: 'feed' | 'spaces' | 'tools' | 'profile' | 'system';
  sourceId: string;
  targetUserId: string;
  actionUrl?: string;
  metadata: {
    spaceId?: string;
    toolId?: string;
    postId?: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: NotificationCategory;
    tags: string[];
    expiresAt?: string;
    groupingKey?: string; // For grouping similar notifications
  };
  delivery: {
    channels: DeliveryChannel[];
    preferences: NotificationPreferences;
    timing: DeliveryTiming;
  };
}

export type NotificationType = 
  | 'space_invite' | 'space_joined' | 'space_post' | 'space_event'
  | 'tool_shared' | 'tool_deployed' | 'tool_interaction' | 'tool_comment'
  | 'feed_mention' | 'feed_like' | 'feed_comment' | 'feed_share'
  | 'profile_follow' | 'profile_achievement' | 'profile_milestone'
  | 'system_update' | 'system_maintenance' | 'system_announcement';

export type NotificationCategory = 
  | 'social' | 'activity' | 'system' | 'achievement' | 'reminder';

export type DeliveryChannel = 
  | 'in_app' | 'push' | 'email' | 'sms' | 'desktop';

export interface NotificationPreferences {
  enableInApp: boolean;
  enablePush: boolean;
  enableEmail: boolean;
  enableDesktop: boolean;
  quietHours?: {
    enabled: boolean;
    start: string; // HH:MM format
    end: string;   // HH:MM format
    timezone: string;
  };
  categorySettings: Record<NotificationCategory, {
    enabled: boolean;
    channels: DeliveryChannel[];
    priority: 'low' | 'medium' | 'high';
  }>;
  spaceSettings: Record<string, {
    enabled: boolean;
    channels: DeliveryChannel[];
    types: NotificationType[];
  }>;
}

export interface DeliveryTiming {
  immediate: boolean;
  batchWindow?: number; // Minutes to batch similar notifications
  maxRetries: number;
  retryDelay: number; // Milliseconds
}

export interface NotificationTemplate {
  type: NotificationType;
  title: (data: any) => string;
  message: (data: any) => string;
  actionUrl: (data: any) => string;
  category: NotificationCategory;
  defaultPriority: 'low' | 'medium' | 'high';
  defaultChannels: DeliveryChannel[];
}

// ===== NOTIFICATION TEMPLATES =====

export const NOTIFICATION_TEMPLATES: Record<NotificationType, NotificationTemplate> = {
  // Space Notifications
  space_invite: {
    type: 'space_invite',
    title: (data) => `Invited to ${data.spaceName}`,
    message: (data) => `${data.inviterName} invited you to join ${data.spaceName}`,
    actionUrl: (data) => `/spaces/${data.spaceId}`,
    category: 'social',
    defaultPriority: 'high',
    defaultChannels: ['in_app', 'push', 'email']
  },
  
  space_joined: {
    type: 'space_joined',
    title: (data) => `${data.memberName} joined ${data.spaceName}`,
    message: (data) => `Welcome ${data.memberName} to the community!`,
    actionUrl: (data) => `/spaces/${data.spaceId}/members`,
    category: 'social',
    defaultPriority: 'low',
    defaultChannels: ['in_app']
  },
  
  space_post: {
    type: 'space_post',
    title: (data) => `New post in ${data.spaceName}`,
    message: (data) => `${data.authorName}: ${data.postPreview}`,
    actionUrl: (data) => `/spaces/${data.spaceId}/posts/${data.postId}`,
    category: 'activity',
    defaultPriority: 'medium',
    defaultChannels: ['in_app', 'push']
  },
  
  space_event: {
    type: 'space_event',
    title: (data) => `Event reminder: ${data.eventName}`,
    message: (data) => `${data.eventName} starts in ${data.timeUntil}`,
    actionUrl: (data) => `/spaces/${data.spaceId}/events/${data.eventId}`,
    category: 'reminder',
    defaultPriority: 'high',
    defaultChannels: ['in_app', 'push', 'email']
  },

  // Tool Notifications
  tool_shared: {
    type: 'tool_shared',
    title: (data) => `${data.toolName} shared with you`,
    message: (data) => `${data.sharerName} shared a tool: ${data.toolDescription}`,
    actionUrl: (data) => `/tools/${data.toolId}`,
    category: 'social',
    defaultPriority: 'medium',
    defaultChannels: ['in_app', 'push']
  },
  
  tool_deployed: {
    type: 'tool_deployed',
    title: (data) => `${data.toolName} deployed successfully`,
    message: (data) => `Your tool is now live in ${data.spaceName}`,
    actionUrl: (data) => `/tools/${data.toolId}/deployments/${data.deploymentId}`,
    category: 'achievement',
    defaultPriority: 'medium',
    defaultChannels: ['in_app', 'push']
  },
  
  tool_interaction: {
    type: 'tool_interaction',
    title: (data) => `New interaction with ${data.toolName}`,
    message: (data) => `${data.userName} used your tool: ${data.interactionType}`,
    actionUrl: (data) => `/tools/${data.toolId}/analytics`,
    category: 'activity',
    defaultPriority: 'low',
    defaultChannels: ['in_app']
  },
  
  tool_comment: {
    type: 'tool_comment',
    title: (data) => `Comment on ${data.toolName}`,
    message: (data) => `${data._commenterName}: ${data.commentPreview}`,
    actionUrl: (data) => `/tools/${data.toolId}#comment-${data.commentId}`,
    category: 'social',
    defaultPriority: 'medium',
    defaultChannels: ['in_app', 'push']
  },

  // Feed Notifications
  feed_mention: {
    type: 'feed_mention',
    title: () => `You were mentioned`,
    message: (data) => `${data.mentionerName} mentioned you in a post`,
    actionUrl: (data) => `/feed/posts/${data.postId}`,
    category: 'social',
    defaultPriority: 'high',
    defaultChannels: ['in_app', 'push', 'email']
  },
  
  feed_like: {
    type: 'feed_like',
    title: (data) => `${data.likerName} liked your post`,
    message: (data) => `Your post "${data.postPreview}" received a like`,
    actionUrl: (data) => `/feed/posts/${data.postId}`,
    category: 'social',
    defaultPriority: 'low',
    defaultChannels: ['in_app']
  },
  
  feed_comment: {
    type: 'feed_comment',
    title: (data) => `New comment on your post`,
    message: (data) => `${data._commenterName}: ${data.commentPreview}`,
    actionUrl: (data) => `/feed/posts/${data.postId}#comment-${data.commentId}`,
    category: 'social',
    defaultPriority: 'medium',
    defaultChannels: ['in_app', 'push']
  },
  
  feed_share: {
    type: 'feed_share',
    title: (data) => `${data.sharerName} shared your post`,
    message: (data) => `Your post "${data.postPreview}" was shared`,
    actionUrl: (data) => `/feed/posts/${data.postId}`,
    category: 'social',
    defaultPriority: 'medium',
    defaultChannels: ['in_app', 'push']
  },

  // Profile Notifications
  profile_follow: {
    type: 'profile_follow',
    title: (data) => `${data.followerName} started following you`,
    message: (data) => `You have a new follower: ${data.followerName}`,
    actionUrl: (data) => `/profile/${data.followerId}`,
    category: 'social',
    defaultPriority: 'medium',
    defaultChannels: ['in_app', 'push']
  },
  
  profile_achievement: {
    type: 'profile_achievement',
    title: (data) => `Achievement unlocked: ${data.achievementName}`,
    message: (data) => `Congratulations! ${data.achievementDescription}`,
    actionUrl: () => `/profile/achievements`,
    category: 'achievement',
    defaultPriority: 'high',
    defaultChannels: ['in_app', 'push']
  },
  
  profile_milestone: {
    type: 'profile_milestone',
    title: (data) => `Milestone reached: ${data.milestoneName}`,
    message: (data) => `You've reached ${data.milestoneValue} ${data.milestoneType}!`,
    actionUrl: () => `/profile/stats`,
    category: 'achievement',
    defaultPriority: 'medium',
    defaultChannels: ['in_app', 'push']
  },

  // System Notifications
  system_update: {
    type: 'system_update',
    title: (data) => `HIVE ${data.updateType} Available`,
    message: (data) => `New features and improvements: ${data.updateSummary}`,
    actionUrl: () => `/updates`,
    category: 'system',
    defaultPriority: 'medium',
    defaultChannels: ['in_app', 'push']
  },
  
  system_maintenance: {
    type: 'system_maintenance',
    title: () => `Scheduled Maintenance`,
    message: (data) => `HIVE will be offline ${data.startTime} - ${data.endTime} for maintenance`,
    actionUrl: () => `/status`,
    category: 'system',
    defaultPriority: 'high',
    defaultChannels: ['in_app', 'push', 'email']
  },
  
  system_announcement: {
    type: 'system_announcement',
    title: (data) => data.title,
    message: (data) => data.message,
    actionUrl: (data) => data.actionUrl || '/announcements',
    category: 'system',
    defaultPriority: 'medium',
    defaultChannels: ['in_app', 'push']
  }
};

// ===== NOTIFICATION MANAGER CLASS =====

export class CrossPlatformNotificationManager {
  private userPreferences: Map<string, NotificationPreferences> = new Map();
  private deliveryQueue: Map<string, NotificationConfig[]> = new Map();
  private batchingTimers: Map<string, NodeJS.Timeout> = new Map();
  private retryQueue: Map<string, { config: NotificationConfig; attempt: number }> = new Map();

  constructor() {
    this.initializeServiceWorker();
    this.startBatchProcessor();
  }

  /**
   * Create and send a notification
   */
  async createNotification(
    type: NotificationType,
    targetUserId: string,
    data: any,
    options: Partial<NotificationConfig> = {}
  ): Promise<string> {
    const template = NOTIFICATION_TEMPLATES[type];
    if (!template) {
      throw new Error(`Unknown notification type: ${type}`);
    }

    const notificationId = `notif_${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const config: NotificationConfig = {
      id: notificationId,
      type,
      title: template.title(data),
      message: template.message(data),
      sourceSlice: options.sourceSlice || this.getSourceSliceFromType(type),
      sourceId: options.sourceId || data.id || 'unknown',
      targetUserId,
      actionUrl: template.actionUrl(data),
      metadata: {
        priority: options.metadata?.priority || template.defaultPriority,
        category: template.category,
        tags: options.metadata?.tags || [],
        ...options.metadata
      },
      delivery: {
        channels: template.defaultChannels,
        preferences: await this.getUserPreferences(targetUserId),
        timing: {
          immediate: true,
          maxRetries: 3,
          retryDelay: 5000,
          ...options.delivery?.timing
        }
      }
    };

    // Apply user preferences
    const filteredConfig = await this.applyUserPreferences(config);
    if (!filteredConfig) {
      
      return notificationId;
    }

    // Check for batching
    if (this.shouldBatch(filteredConfig)) {
      this.addToBatch(filteredConfig);
    } else {
      await this.deliverNotification(filteredConfig);
    }

    return notificationId;
  }

  /**
   * Send notification immediately
   */
  async sendNotification(config: NotificationConfig): Promise<boolean> {
    try {
      const deliveryResults = await Promise.allSettled(
        config.delivery.channels.map(channel => this.deliverToChannel(config, channel))
      );

      const successCount = deliveryResults.filter(result => result.status === 'fulfilled').length;
      const success = successCount > 0;

      if (success) {
        // Store in unified state
        const store = useUnifiedStore.getState();
        const platformNotification: PlatformNotification = {
          id: config.id,
          userId: config.targetUserId,
          type: config.type as any,
          title: config.title,
          message: config.message,
          actionUrl: config.actionUrl,
          metadata: {
            sourceSlice: config.sourceSlice,
            sourceId: config.sourceId,
            priority: config.metadata.priority,
            read: false,
            timestamp: new Date().toISOString()
          }
        };
        
        store.addNotification(platformNotification);

        // Log delivery
        await this.logNotificationDelivery(config, deliveryResults);
      } else {
        // Add to retry queue
        this.addToRetryQueue(config);
      }

      return success;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }

  /**
   * Get user notification preferences
   */
  async getUserPreferences(userId: string): Promise<NotificationPreferences> {
    if (this.userPreferences.has(userId)) {
      return this.userPreferences.get(userId)!;
    }

    try {
      const response = await fetch(`/api/profile/notifications/preferences?userId=${userId}`);
      if (response.ok) {
        const preferences = await response.json();
        this.userPreferences.set(userId, preferences);
        return preferences;
      }
    } catch (error) {
      console.error('Error fetching user preferences:', error);
    }

    // Return default preferences
    const defaultPreferences: NotificationPreferences = {
      enableInApp: true,
      enablePush: true,
      enableEmail: false,
      enableDesktop: true,
      categorySettings: {
        social: { enabled: true, channels: ['in_app', 'push'], priority: 'medium' },
        activity: { enabled: true, channels: ['in_app'], priority: 'low' },
        system: { enabled: true, channels: ['in_app', 'push'], priority: 'high' },
        achievement: { enabled: true, channels: ['in_app', 'push'], priority: 'high' },
        reminder: { enabled: true, channels: ['in_app', 'push', 'email'], priority: 'high' }
      },
      spaceSettings: {}
    };

    this.userPreferences.set(userId, defaultPreferences);
    return defaultPreferences;
  }

  /**
   * Update user notification preferences
   */
  async updateUserPreferences(userId: string, preferences: Partial<NotificationPreferences>): Promise<void> {
    try {
      const response = await fetch('/api/profile/notifications/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, preferences })
      });

      if (response.ok) {
        const current = await this.getUserPreferences(userId);
        const updated = { ...current, ...preferences };
        this.userPreferences.set(userId, updated);
      }
    } catch (error) {
      console.error('Error updating user preferences:', error);
    }
  }

  // ===== PRIVATE METHODS =====

  private getSourceSliceFromType(type: NotificationType): string {
    if (type.startsWith('space_')) return 'spaces';
    if (type.startsWith('tool_')) return 'tools';
    if (type.startsWith('feed_')) return 'feed';
    if (type.startsWith('profile_')) return 'profile';
    return 'system';
  }

  private async applyUserPreferences(config: NotificationConfig): Promise<NotificationConfig | null> {
    const preferences = config.delivery.preferences;
    
    // Check if category is enabled
    const categorySettings = preferences.categorySettings[config.metadata.category];
    if (!categorySettings.enabled) {
      return null;
    }

    // Check quiet hours
    if (preferences.quietHours?.enabled) {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      if (this.isInQuietHours(currentTime, preferences.quietHours)) {
        // Only allow urgent notifications during quiet hours
        if (config.metadata.priority !== 'urgent') {
          return null;
        }
      }
    }

    // Filter channels based on preferences
    const allowedChannels = config.delivery.channels.filter(channel => {
      switch (channel) {
        case 'in_app': return preferences.enableInApp;
        case 'push': return preferences.enablePush;
        case 'email': return preferences.enableEmail;
        case 'desktop': return preferences.enableDesktop;
        default: return false;
      }
    });

    if (allowedChannels.length === 0) {
      return null;
    }

    return {
      ...config,
      delivery: {
        ...config.delivery,
        channels: allowedChannels
      }
    };
  }

  private isInQuietHours(currentTime: string, quietHours: NonNullable<NotificationPreferences['quietHours']>): boolean {
    const start = quietHours.start;
    const end = quietHours.end;
    
    // Handle case where quiet hours span midnight
    if (start > end) {
      return currentTime >= start || currentTime <= end;
    } else {
      return currentTime >= start && currentTime <= end;
    }
  }

  private shouldBatch(config: NotificationConfig): boolean {
    return config.metadata.groupingKey !== undefined && config.delivery.timing.batchWindow !== undefined;
  }

  private addToBatch(config: NotificationConfig): void {
    const batchKey = `${config.targetUserId}_${config.metadata.groupingKey}`;
    
    if (!this.deliveryQueue.has(batchKey)) {
      this.deliveryQueue.set(batchKey, []);
    }
    
    this.deliveryQueue.get(batchKey)!.push(config);
    
    // Set or reset batch timer
    if (this.batchingTimers.has(batchKey)) {
      clearTimeout(this.batchingTimers.get(batchKey)!);
    }
    
    const timer = setTimeout(() => {
      this.processBatch(batchKey);
    }, (config.delivery.timing.batchWindow || 5) * 60 * 1000); // Convert minutes to milliseconds
    
    this.batchingTimers.set(batchKey, timer);
  }

  private async processBatch(batchKey: string): Promise<void> {
    const notifications = this.deliveryQueue.get(batchKey);
    if (!notifications || notifications.length === 0) return;

    // Create batched notification
    const batchedConfig = this.createBatchedNotification(notifications);
    await this.deliverNotification(batchedConfig);

    // Clean up
    this.deliveryQueue.delete(batchKey);
    this.batchingTimers.delete(batchKey);
  }

  private createBatchedNotification(notifications: NotificationConfig[]): NotificationConfig {
    const first = notifications[0];
    const count = notifications.length;

    return {
      ...first,
      id: `batch_${first.id}`,
      title: `${count} new ${first.metadata.category} notifications`,
      message: `You have ${count} new notifications from ${first.sourceSlice}`,
      actionUrl: `/${first.sourceSlice}`,
      metadata: {
        ...first.metadata,
        priority: 'medium'
      }
    };
  }

  private async deliverNotification(config: NotificationConfig): Promise<boolean> {
    return await this.sendNotification(config);
  }

  private async deliverToChannel(config: NotificationConfig, channel: DeliveryChannel): Promise<boolean> {
    switch (channel) {
      case 'in_app':
        return await this.deliverInApp(config);
      case 'push':
        return await this.deliverPush(config);
      case 'email':
        return await this.deliverEmail(config);
      case 'desktop':
        return await this.deliverDesktop(config);
      default:
        console.warn(`Unknown delivery channel: ${channel}`);
        return false;
    }
  }

  private async deliverInApp(_config: NotificationConfig): Promise<boolean> {
    // In-app notifications are handled by the unified state management
    return true;
  }

  private async deliverPush(_config: NotificationConfig): Promise<boolean> {
    try {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        const registration = await navigator.serviceWorker.ready;
        
        if (registration.pushManager) {
          // This would typically use the Push API with your server
          
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error delivering push notification:', error);
      return false;
    }
  }

  private async deliverEmail(config: NotificationConfig): Promise<boolean> {
    try {
      const response = await fetch('/api/notifications/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error delivering email notification:', error);
      return false;
    }
  }

  private async deliverDesktop(config: NotificationConfig): Promise<boolean> {
    try {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          new Notification(config.title, {
            body: config.message,
            icon: '/hive-logo-notification.png',
            badge: '/hive-badge.png',
            tag: config.id,
            requireInteraction: config.metadata.priority === 'urgent',
            actions: config.actionUrl ? [{
              action: 'view',
              title: 'View',
              icon: '/notification-view.png'
            }] : undefined
          });
          
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error delivering desktop notification:', error);
      return false;
    }
  }

  private addToRetryQueue(config: NotificationConfig): void {
    this.retryQueue.set(config.id, { config, attempt: 0 });
    
    setTimeout(() => {
      this.processRetryQueue();
    }, config.delivery.timing.retryDelay);
  }

  private async processRetryQueue(): Promise<void> {
    for (const [id, { config, attempt }] of this.retryQueue.entries()) {
      if (attempt >= config.delivery.timing.maxRetries) {
        console.error(`Max retries exceeded for notification: ${id}`);
        this.retryQueue.delete(id);
        continue;
      }

      const success = await this.sendNotification(config);
      
      if (success) {
        this.retryQueue.delete(id);
      } else {
        this.retryQueue.set(id, { config, attempt: attempt + 1 });
      }
    }
  }

  private async logNotificationDelivery(config: NotificationConfig, results: PromiseSettledResult<boolean>[]): Promise<void> {
    try {
      await fetch('/api/notifications/delivery-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notificationId: config.id,
          userId: config.targetUserId,
          type: config.type,
          channels: config.delivery.channels,
          results: results.map((result, index) => ({
            channel: config.delivery.channels[index],
            success: result.status === 'fulfilled' && result.value,
            error: result.status === 'rejected' ? result.reason : null
          })),
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Error logging notification delivery:', error);
    }
  }

  private initializeServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw-notifications.js')
        .then(_registration => {
          
        })
        .catch(error => {
          console.error('Notification service worker registration failed:', error);
        });
    }
  }

  private startBatchProcessor(): void {
    // Process batches every minute
    setInterval(() => {
      this.processRetryQueue();
    }, 60000);
  }
}

// ===== SINGLETON INSTANCE =====

let notificationManagerInstance: CrossPlatformNotificationManager | null = null;

export function getNotificationManager(): CrossPlatformNotificationManager {
  if (!notificationManagerInstance) {
    notificationManagerInstance = new CrossPlatformNotificationManager();
  }
  return notificationManagerInstance;
}

// ===== CONVENIENCE FUNCTIONS =====

export async function sendSpaceInvite(targetUserId: string, inviterName: string, spaceId: string, spaceName: string): Promise<void> {
  const manager = getNotificationManager();
  await manager.createNotification('space_invite', targetUserId, {
    inviterName,
    spaceId,
    spaceName
  });
}

export async function sendToolShare(targetUserId: string, sharerName: string, toolId: string, toolName: string, toolDescription: string): Promise<void> {
  const manager = getNotificationManager();
  await manager.createNotification('tool_shared', targetUserId, {
    sharerName,
    toolId,
    toolName,
    toolDescription
  });
}

export async function sendFeedMention(targetUserId: string, mentionerName: string, _postId: string, postPreview: string): Promise<void> {
  const manager = getNotificationManager();
  await manager.createNotification('feed_mention', targetUserId, {
    mentionerName,
    postId: _postId,
    postPreview
  });
}

export async function sendAchievement(targetUserId: string, achievementName: string, achievementDescription: string): Promise<void> {
  const manager = getNotificationManager();
  await manager.createNotification('profile_achievement', targetUserId, {
    achievementName,
    achievementDescription
  });
}

export async function sendSystemAnnouncement(targetUserId: string, title: string, message: string, actionUrl?: string): Promise<void> {
  const manager = getNotificationManager();
  await manager.createNotification('system_announcement', targetUserId, {
    title,
    message,
    actionUrl
  });
}