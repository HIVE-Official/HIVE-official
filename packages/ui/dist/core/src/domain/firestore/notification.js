import { z } from "zod";
// Notification Type Schema
export const NotificationTypeSchema = z.enum([
    'ritual_available',
    'ritual_reminder',
    'ritual_complete',
    'space_activated',
    'space_invitation',
    'space_post_like',
    'space_post_comment',
    'space_event_reminder',
    'tool_shared',
    'tool_feedback',
    'achievement_unlocked',
    'profile_view',
    'friend_request',
    'system_announcement',
    'welcome_message',
    'onboarding_next_step',
    'feed_highlight',
    'weekly_digest'
]);
// Notification Priority Schema
export const NotificationPrioritySchema = z.enum([
    'low',
    'medium',
    'high',
    'urgent'
]);
// Notification Action Schema
export const NotificationActionSchema = z.object({
    label: z.string().min(1).max(50),
    action: z.enum(['navigate', 'dismiss', 'external_link', 'modal']),
    target: z.string().optional(), // URL or route
    payload: z.record(z.string(), z.any()).optional()
});
// Base Notification Schema
export const NotificationSchema = z.object({
    id: z.string().min(1),
    userId: z.string().min(1),
    type: NotificationTypeSchema,
    priority: NotificationPrioritySchema,
    // Content
    title: z.string().min(1).max(100),
    message: z.string().min(1).max(500),
    iconUrl: z.string().url().optional(),
    imageUrl: z.string().url().optional(),
    // Metadata
    data: z.record(z.string(), z.any()).optional(),
    actions: z.array(NotificationActionSchema).max(3).optional(),
    // State
    read: z.boolean().default(false),
    dismissed: z.boolean().default(false),
    clicked: z.boolean().default(false),
    // Timing
    scheduledFor: z.date().optional(),
    expiresAt: z.date().optional(),
    createdAt: z.date(),
    readAt: z.date().optional(),
    clickedAt: z.date().optional(),
    // Grouping
    groupId: z.string().optional(),
    batchId: z.string().optional()
});
// User Notification Preferences Schema
export const NotificationPreferencesSchema = z.object({
    userId: z.string().min(1),
    // Channel preferences
    pushNotifications: z.boolean().default(true),
    emailNotifications: z.boolean().default(true),
    inAppNotifications: z.boolean().default(true),
    // Category preferences
    rituals: z.boolean().default(true),
    spaces: z.boolean().default(true),
    social: z.boolean().default(true),
    achievements: z.boolean().default(true),
    system: z.boolean().default(true),
    // Frequency settings
    digestFrequency: z.enum(['daily', 'weekly', 'never']).default('weekly'),
    quietHours: z.object({
        enabled: z.boolean().default(false),
        start: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM format
        end: z.string().regex(/^\d{2}:\d{2}$/),
        timezone: z.string().optional()
    }).optional(),
    // Advanced settings
    soundEnabled: z.boolean().default(true),
    vibrationEnabled: z.boolean().default(true),
    badgeCount: z.boolean().default(true),
    updatedAt: z.date()
});
// Notification Template Schema
export const NotificationTemplateSchema = z.object({
    id: z.string().min(1),
    type: NotificationTypeSchema,
    // Template content
    titleTemplate: z.string().min(1),
    messageTemplate: z.string().min(1),
    // Variables for template
    variables: z.array(z.string()).optional(),
    // Default settings
    defaultPriority: NotificationPrioritySchema,
    defaultActions: z.array(NotificationActionSchema).optional(),
    // Timing
    scheduleDelay: z.number().min(0).optional(), // seconds
    expiryDuration: z.number().min(0).optional(), // seconds
    // Targeting
    targetAudience: z.enum(['all', 'builders', 'leaders', 'new_users', 'inactive']).optional(),
    // Metadata
    active: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date()
});
// Notification Batch Schema (for bulk operations)
export const NotificationBatchSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1).max(100),
    templateId: z.string().min(1),
    // Recipients
    userIds: z.array(z.string()).min(1).max(10000), // Reasonable batch limit
    // Personalization
    personalizedData: z.record(z.string(), z.record(z.string(), z.any())).optional(),
    // Scheduling
    scheduledFor: z.date().optional(),
    // Status
    status: z.enum(['draft', 'scheduled', 'sending', 'sent', 'failed']),
    sentCount: z.number().min(0).default(0),
    failedCount: z.number().min(0).default(0),
    // Metadata
    createdBy: z.string().min(1),
    createdAt: z.date(),
    sentAt: z.date().optional()
});
// Firestore-specific helpers
export const NotificationConverter = {
    toFirestore: (notification) => ({
        ...notification,
        scheduledFor: notification.scheduledFor,
        expiresAt: notification.expiresAt,
        createdAt: notification.createdAt,
        readAt: notification.readAt,
        clickedAt: notification.clickedAt
    }),
    fromFirestore: (data) => {
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
    toFirestore: (preferences) => ({
        ...preferences,
        updatedAt: preferences.updatedAt
    }),
    fromFirestore: (data) => {
        return NotificationPreferencesSchema.parse({
            ...data,
            updatedAt: data.updatedAt?.toDate?.() || data.updatedAt
        });
    }
};
// Collection paths
export const NOTIFICATION_COLLECTIONS = {
    USER_NOTIFICATIONS: (userId) => `users/${userId}/notifications`,
    USER_PREFERENCES: (userId) => `users/${userId}/notification_preferences`,
    TEMPLATES: 'notification_templates',
    BATCHES: 'notification_batches',
    GLOBAL_NOTIFICATIONS: 'notifications'
};
// Notification utility functions
export const NotificationUtils = {
    createNotification: (userId, type, title, message, options) => ({
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
    isExpired: (notification) => {
        if (!notification.expiresAt)
            return false;
        return new Date() > notification.expiresAt;
    },
    shouldShow: (notification) => {
        return !notification.dismissed &&
            !NotificationUtils.isExpired(notification) &&
            (!notification.scheduledFor || notification.scheduledFor <= new Date());
    },
    groupNotifications: (notifications) => {
        return notifications.reduce((groups, notification) => {
            const key = notification.groupId || notification.type;
            if (!groups[key])
                groups[key] = [];
            groups[key].push(notification);
            return groups;
        }, {});
    },
    getUnreadCount: (notifications) => {
        return notifications.filter(n => !n.read && NotificationUtils.shouldShow(n)).length;
    },
    formatNotificationTime: (notification) => {
        const now = new Date();
        const created = notification.createdAt;
        const diffMs = now.getTime() - created.getTime();
        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (minutes < 1)
            return 'Just now';
        if (minutes < 60)
            return `${minutes}m ago`;
        if (hours < 24)
            return `${hours}h ago`;
        if (days < 7)
            return `${days}d ago`;
        return created.toLocaleDateString();
    },
    createRitualNotification: (userId, ritualId, ritualTitle, type) => {
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
        return NotificationUtils.createNotification(userId, `ritual_${type}`, titles[type], messages[type], {
            priority: type === 'reminder' ? 'high' : 'medium',
            data: { ritualId, ritualTitle },
            actions: type === 'complete' ? [] : [{
                    label: type === 'available' ? 'Participate' : 'View',
                    action: 'navigate',
                    target: `/rituals/${ritualId}`
                }]
        });
    },
    createSpaceNotification: (userId, spaceId, spaceName, type) => {
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
        return NotificationUtils.createNotification(userId, `space_${type}`, titles[type], messages[type], {
            priority: type === 'invitation' ? 'high' : 'medium',
            data: { spaceId, spaceName },
            actions: [{
                    label: type === 'post_like' ? 'View Post' : 'View Space',
                    action: 'navigate',
                    target: `/spaces/${spaceId}`
                }]
        });
    }
};
// Notification template helpers
export const NotificationTemplates = {
    RITUAL_AVAILABLE: {
        type: 'ritual_available',
        titleTemplate: '🕯️ {{ritualTitle}} is Available',
        messageTemplate: 'A new ritual is ready for you. Light your flame and join the community!',
        variables: ['ritualTitle', 'ritualId'],
        defaultPriority: 'medium',
        defaultActions: [{
                label: 'Participate',
                action: 'navigate',
                target: '/rituals/{{ritualId}}'
            }]
    },
    SPACE_ACTIVATED: {
        type: 'space_activated',
        titleTemplate: '🚀 {{spaceName}} is Active',
        messageTemplate: 'The {{spaceName}} space is now active! Join {{memberCount}} other members.',
        variables: ['spaceName', 'spaceId', 'memberCount'],
        defaultPriority: 'medium',
        defaultActions: [{
                label: 'Join Space',
                action: 'navigate',
                target: '/spaces/{{spaceId}}'
            }]
    },
    ACHIEVEMENT_UNLOCKED: {
        type: 'achievement_unlocked',
        titleTemplate: '🏆 Achievement Unlocked',
        messageTemplate: 'Congratulations! You\'ve unlocked {{achievementName}}.',
        variables: ['achievementName', 'achievementDescription'],
        defaultPriority: 'high'
    }
};
//# sourceMappingURL=notification.js.map