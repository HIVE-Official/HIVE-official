import { z } from "zod";
export declare const NotificationTypeSchema: z.ZodEnum<["ritual_available", "ritual_reminder", "ritual_complete", "space_activated", "space_invitation", "space_post_like", "space_post_comment", "space_event_reminder", "tool_shared", "tool_feedback", "achievement_unlocked", "profile_view", "friend_request", "system_announcement", "welcome_message", "onboarding_next_step", "feed_highlight", "weekly_digest"]>;
export declare const NotificationPrioritySchema: z.ZodEnum<["low", "medium", "high", "urgent"]>;
export declare const NotificationActionSchema: z.ZodObject<{
    label: z.ZodString;
    action: z.ZodEnum<["navigate", "dismiss", "external_link", "modal"]>;
    target: z.ZodOptional<z.ZodString>;
    payload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    label?: string;
    target?: string;
    action?: "navigate" | "dismiss" | "external_link" | "modal";
    payload?: Record<string, any>;
}, {
    label?: string;
    target?: string;
    action?: "navigate" | "dismiss" | "external_link" | "modal";
    payload?: Record<string, any>;
}>;
export declare const NotificationSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    type: z.ZodEnum<["ritual_available", "ritual_reminder", "ritual_complete", "space_activated", "space_invitation", "space_post_like", "space_post_comment", "space_event_reminder", "tool_shared", "tool_feedback", "achievement_unlocked", "profile_view", "friend_request", "system_announcement", "welcome_message", "onboarding_next_step", "feed_highlight", "weekly_digest"]>;
    priority: z.ZodEnum<["low", "medium", "high", "urgent"]>;
    title: z.ZodString;
    message: z.ZodString;
    iconUrl: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    actions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        action: z.ZodEnum<["navigate", "dismiss", "external_link", "modal"]>;
        target: z.ZodOptional<z.ZodString>;
        payload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        label?: string;
        target?: string;
        action?: "navigate" | "dismiss" | "external_link" | "modal";
        payload?: Record<string, any>;
    }, {
        label?: string;
        target?: string;
        action?: "navigate" | "dismiss" | "external_link" | "modal";
        payload?: Record<string, any>;
    }>, "many">>;
    read: z.ZodDefault<z.ZodBoolean>;
    dismissed: z.ZodDefault<z.ZodBoolean>;
    clicked: z.ZodDefault<z.ZodBoolean>;
    scheduledFor: z.ZodOptional<z.ZodDate>;
    expiresAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    readAt: z.ZodOptional<z.ZodDate>;
    clickedAt: z.ZodOptional<z.ZodDate>;
    groupId: z.ZodOptional<z.ZodString>;
    batchId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    type?: "ritual_available" | "ritual_reminder" | "ritual_complete" | "space_activated" | "space_invitation" | "space_post_like" | "space_post_comment" | "space_event_reminder" | "tool_shared" | "tool_feedback" | "achievement_unlocked" | "profile_view" | "friend_request" | "system_announcement" | "welcome_message" | "onboarding_next_step" | "feed_highlight" | "weekly_digest";
    title?: string;
    data?: Record<string, any>;
    message?: string;
    actions?: {
        label?: string;
        target?: string;
        action?: "navigate" | "dismiss" | "external_link" | "modal";
        payload?: Record<string, any>;
    }[];
    userId?: string;
    expiresAt?: Date;
    iconUrl?: string;
    scheduledFor?: Date;
    priority?: "medium" | "low" | "high" | "urgent";
    imageUrl?: string;
    read?: boolean;
    dismissed?: boolean;
    clicked?: boolean;
    readAt?: Date;
    clickedAt?: Date;
    groupId?: string;
    batchId?: string;
}, {
    id?: string;
    createdAt?: Date;
    type?: "ritual_available" | "ritual_reminder" | "ritual_complete" | "space_activated" | "space_invitation" | "space_post_like" | "space_post_comment" | "space_event_reminder" | "tool_shared" | "tool_feedback" | "achievement_unlocked" | "profile_view" | "friend_request" | "system_announcement" | "welcome_message" | "onboarding_next_step" | "feed_highlight" | "weekly_digest";
    title?: string;
    data?: Record<string, any>;
    message?: string;
    actions?: {
        label?: string;
        target?: string;
        action?: "navigate" | "dismiss" | "external_link" | "modal";
        payload?: Record<string, any>;
    }[];
    userId?: string;
    expiresAt?: Date;
    iconUrl?: string;
    scheduledFor?: Date;
    priority?: "medium" | "low" | "high" | "urgent";
    imageUrl?: string;
    read?: boolean;
    dismissed?: boolean;
    clicked?: boolean;
    readAt?: Date;
    clickedAt?: Date;
    groupId?: string;
    batchId?: string;
}>;
export declare const NotificationPreferencesSchema: z.ZodObject<{
    userId: z.ZodString;
    pushNotifications: z.ZodDefault<z.ZodBoolean>;
    emailNotifications: z.ZodDefault<z.ZodBoolean>;
    inAppNotifications: z.ZodDefault<z.ZodBoolean>;
    rituals: z.ZodDefault<z.ZodBoolean>;
    spaces: z.ZodDefault<z.ZodBoolean>;
    social: z.ZodDefault<z.ZodBoolean>;
    achievements: z.ZodDefault<z.ZodBoolean>;
    system: z.ZodDefault<z.ZodBoolean>;
    digestFrequency: z.ZodDefault<z.ZodEnum<["daily", "weekly", "never"]>>;
    quietHours: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        start: z.ZodString;
        end: z.ZodString;
        timezone: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        end?: string;
        start?: string;
        enabled?: boolean;
        timezone?: string;
    }, {
        end?: string;
        start?: string;
        enabled?: boolean;
        timezone?: string;
    }>>;
    soundEnabled: z.ZodDefault<z.ZodBoolean>;
    vibrationEnabled: z.ZodDefault<z.ZodBoolean>;
    badgeCount: z.ZodDefault<z.ZodBoolean>;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    updatedAt?: Date;
    spaces?: boolean;
    social?: boolean;
    userId?: string;
    system?: boolean;
    rituals?: boolean;
    pushNotifications?: boolean;
    emailNotifications?: boolean;
    inAppNotifications?: boolean;
    achievements?: boolean;
    digestFrequency?: "never" | "daily" | "weekly";
    quietHours?: {
        end?: string;
        start?: string;
        enabled?: boolean;
        timezone?: string;
    };
    soundEnabled?: boolean;
    vibrationEnabled?: boolean;
    badgeCount?: boolean;
}, {
    updatedAt?: Date;
    spaces?: boolean;
    social?: boolean;
    userId?: string;
    system?: boolean;
    rituals?: boolean;
    pushNotifications?: boolean;
    emailNotifications?: boolean;
    inAppNotifications?: boolean;
    achievements?: boolean;
    digestFrequency?: "never" | "daily" | "weekly";
    quietHours?: {
        end?: string;
        start?: string;
        enabled?: boolean;
        timezone?: string;
    };
    soundEnabled?: boolean;
    vibrationEnabled?: boolean;
    badgeCount?: boolean;
}>;
export declare const NotificationTemplateSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["ritual_available", "ritual_reminder", "ritual_complete", "space_activated", "space_invitation", "space_post_like", "space_post_comment", "space_event_reminder", "tool_shared", "tool_feedback", "achievement_unlocked", "profile_view", "friend_request", "system_announcement", "welcome_message", "onboarding_next_step", "feed_highlight", "weekly_digest"]>;
    titleTemplate: z.ZodString;
    messageTemplate: z.ZodString;
    variables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    defaultPriority: z.ZodEnum<["low", "medium", "high", "urgent"]>;
    defaultActions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        action: z.ZodEnum<["navigate", "dismiss", "external_link", "modal"]>;
        target: z.ZodOptional<z.ZodString>;
        payload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        label?: string;
        target?: string;
        action?: "navigate" | "dismiss" | "external_link" | "modal";
        payload?: Record<string, any>;
    }, {
        label?: string;
        target?: string;
        action?: "navigate" | "dismiss" | "external_link" | "modal";
        payload?: Record<string, any>;
    }>, "many">>;
    scheduleDelay: z.ZodOptional<z.ZodNumber>;
    expiryDuration: z.ZodOptional<z.ZodNumber>;
    targetAudience: z.ZodOptional<z.ZodEnum<["all", "builders", "leaders", "new_users", "inactive"]>>;
    active: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    type?: "ritual_available" | "ritual_reminder" | "ritual_complete" | "space_activated" | "space_invitation" | "space_post_like" | "space_post_comment" | "space_event_reminder" | "tool_shared" | "tool_feedback" | "achievement_unlocked" | "profile_view" | "friend_request" | "system_announcement" | "welcome_message" | "onboarding_next_step" | "feed_highlight" | "weekly_digest";
    active?: boolean;
    targetAudience?: "all" | "inactive" | "new_users" | "builders" | "leaders";
    titleTemplate?: string;
    messageTemplate?: string;
    variables?: string[];
    defaultPriority?: "medium" | "low" | "high" | "urgent";
    defaultActions?: {
        label?: string;
        target?: string;
        action?: "navigate" | "dismiss" | "external_link" | "modal";
        payload?: Record<string, any>;
    }[];
    scheduleDelay?: number;
    expiryDuration?: number;
}, {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    type?: "ritual_available" | "ritual_reminder" | "ritual_complete" | "space_activated" | "space_invitation" | "space_post_like" | "space_post_comment" | "space_event_reminder" | "tool_shared" | "tool_feedback" | "achievement_unlocked" | "profile_view" | "friend_request" | "system_announcement" | "welcome_message" | "onboarding_next_step" | "feed_highlight" | "weekly_digest";
    active?: boolean;
    targetAudience?: "all" | "inactive" | "new_users" | "builders" | "leaders";
    titleTemplate?: string;
    messageTemplate?: string;
    variables?: string[];
    defaultPriority?: "medium" | "low" | "high" | "urgent";
    defaultActions?: {
        label?: string;
        target?: string;
        action?: "navigate" | "dismiss" | "external_link" | "modal";
        payload?: Record<string, any>;
    }[];
    scheduleDelay?: number;
    expiryDuration?: number;
}>;
export declare const NotificationBatchSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    templateId: z.ZodString;
    userIds: z.ZodArray<z.ZodString, "many">;
    personalizedData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>>>;
    scheduledFor: z.ZodOptional<z.ZodDate>;
    status: z.ZodEnum<["draft", "scheduled", "sending", "sent", "failed"]>;
    sentCount: z.ZodDefault<z.ZodNumber>;
    failedCount: z.ZodDefault<z.ZodNumber>;
    createdBy: z.ZodString;
    createdAt: z.ZodDate;
    sentAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    name?: string;
    status?: "draft" | "scheduled" | "sending" | "sent" | "failed";
    createdBy?: string;
    scheduledFor?: Date;
    sentAt?: Date;
    templateId?: string;
    userIds?: string[];
    personalizedData?: Record<string, Record<string, any>>;
    sentCount?: number;
    failedCount?: number;
}, {
    id?: string;
    createdAt?: Date;
    name?: string;
    status?: "draft" | "scheduled" | "sending" | "sent" | "failed";
    createdBy?: string;
    scheduledFor?: Date;
    sentAt?: Date;
    templateId?: string;
    userIds?: string[];
    personalizedData?: Record<string, Record<string, any>>;
    sentCount?: number;
    failedCount?: number;
}>;
export type Notification = z.infer<typeof NotificationSchema>;
export type NotificationPreferences = z.infer<typeof NotificationPreferencesSchema>;
export type NotificationTemplate = z.infer<typeof NotificationTemplateSchema>;
export type NotificationBatch = z.infer<typeof NotificationBatchSchema>;
export type NotificationType = z.infer<typeof NotificationTypeSchema>;
export type NotificationPriority = z.infer<typeof NotificationPrioritySchema>;
export type NotificationAction = z.infer<typeof NotificationActionSchema>;
export declare const NotificationConverter: {
    toFirestore: (notification: Notification) => {
        scheduledFor: Date;
        expiresAt: Date;
        createdAt: Date;
        readAt: Date;
        clickedAt: Date;
        id?: string;
        type?: "ritual_available" | "ritual_reminder" | "ritual_complete" | "space_activated" | "space_invitation" | "space_post_like" | "space_post_comment" | "space_event_reminder" | "tool_shared" | "tool_feedback" | "achievement_unlocked" | "profile_view" | "friend_request" | "system_announcement" | "welcome_message" | "onboarding_next_step" | "feed_highlight" | "weekly_digest";
        title?: string;
        data?: Record<string, any>;
        message?: string;
        actions?: {
            label?: string;
            target?: string;
            action?: "navigate" | "dismiss" | "external_link" | "modal";
            payload?: Record<string, any>;
        }[];
        userId?: string;
        iconUrl?: string;
        priority?: "medium" | "low" | "high" | "urgent";
        imageUrl?: string;
        read?: boolean;
        dismissed?: boolean;
        clicked?: boolean;
        groupId?: string;
        batchId?: string;
    };
    fromFirestore: (data: any) => Notification;
};
export declare const NotificationPreferencesConverter: {
    toFirestore: (preferences: NotificationPreferences) => {
        updatedAt: Date;
        spaces?: boolean;
        social?: boolean;
        userId?: string;
        system?: boolean;
        rituals?: boolean;
        pushNotifications?: boolean;
        emailNotifications?: boolean;
        inAppNotifications?: boolean;
        achievements?: boolean;
        digestFrequency?: "never" | "daily" | "weekly";
        quietHours?: {
            end?: string;
            start?: string;
            enabled?: boolean;
            timezone?: string;
        };
        soundEnabled?: boolean;
        vibrationEnabled?: boolean;
        badgeCount?: boolean;
    };
    fromFirestore: (data: any) => NotificationPreferences;
};
export declare const NOTIFICATION_COLLECTIONS: {
    readonly USER_NOTIFICATIONS: (userId: string) => string;
    readonly USER_PREFERENCES: (userId: string) => string;
    readonly TEMPLATES: "notification_templates";
    readonly BATCHES: "notification_batches";
    readonly GLOBAL_NOTIFICATIONS: "notifications";
};
export declare const NotificationUtils: {
    createNotification: (userId: string, type: NotificationType, title: string, message: string, options?: Partial<Notification>) => Omit<Notification, "id" | "createdAt">;
    isExpired: (notification: Notification) => boolean;
    shouldShow: (notification: Notification) => boolean;
    groupNotifications: (notifications: Notification[]) => Record<string, Notification[]>;
    getUnreadCount: (notifications: Notification[]) => number;
    formatNotificationTime: (notification: Notification) => string;
    createRitualNotification: (userId: string, ritualId: string, ritualTitle: string, type: "available" | "reminder" | "complete") => Omit<Notification, "id" | "createdAt">;
    createSpaceNotification: (userId: string, spaceId: string, spaceName: string, type: "activated" | "invitation" | "post_like") => Omit<Notification, "id" | "createdAt">;
};
export declare const NotificationTemplates: {
    readonly RITUAL_AVAILABLE: {
        readonly type: NotificationType;
        readonly titleTemplate: "🕯️ {{ritualTitle}} is Available";
        readonly messageTemplate: "A new ritual is ready for you. Light your flame and join the community!";
        readonly variables: readonly ["ritualTitle", "ritualId"];
        readonly defaultPriority: NotificationPriority;
        readonly defaultActions: readonly [{
            readonly label: "Participate";
            readonly action: "navigate";
            readonly target: "/rituals/{{ritualId}}";
        }];
    };
    readonly SPACE_ACTIVATED: {
        readonly type: NotificationType;
        readonly titleTemplate: "🚀 {{spaceName}} is Active";
        readonly messageTemplate: "The {{spaceName}} space is now active! Join {{memberCount}} other members.";
        readonly variables: readonly ["spaceName", "spaceId", "memberCount"];
        readonly defaultPriority: NotificationPriority;
        readonly defaultActions: readonly [{
            readonly label: "Join Space";
            readonly action: "navigate";
            readonly target: "/spaces/{{spaceId}}";
        }];
    };
    readonly ACHIEVEMENT_UNLOCKED: {
        readonly type: NotificationType;
        readonly titleTemplate: "🏆 Achievement Unlocked";
        readonly messageTemplate: "Congratulations! You've unlocked {{achievementName}}.";
        readonly variables: readonly ["achievementName", "achievementDescription"];
        readonly defaultPriority: NotificationPriority;
    };
};
//# sourceMappingURL=notification.d.ts.map