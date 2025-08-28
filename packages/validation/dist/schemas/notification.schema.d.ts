import { z } from "zod";
export declare const NotificationTypeSchema: z.ZodEnum<["ritual_available", "ritual_reminder", "ritual_complete", "space_activated", "space_invitation", "space_post_like", "space_post_comment", "space_event_reminder", "tool_shared", "tool_feedback", "achievement_unlocked", "profile_view", "friend_request", "system_announcement", "welcome_message", "onboarding_next_step", "feed_highlight", "weekly_digest"]>;
export declare const NotificationPrioritySchema: z.ZodEnum<["low", "medium", "high", "urgent"]>;
export declare const NotificationActionSchema: z.ZodObject<{
    label: z.ZodString;
    action: z.ZodEnum<["navigate", "dismiss", "external_link", "modal"]>;
    target: z.ZodOptional<z.ZodString>;
    payload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    label: string;
    action: "navigate" | "dismiss" | "external_link" | "modal";
    target?: string | undefined;
    payload?: Record<string, any> | undefined;
}, {
    label: string;
    action: "navigate" | "dismiss" | "external_link" | "modal";
    target?: string | undefined;
    payload?: Record<string, any> | undefined;
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
        label: string;
        action: "navigate" | "dismiss" | "external_link" | "modal";
        target?: string | undefined;
        payload?: Record<string, any> | undefined;
    }, {
        label: string;
        action: "navigate" | "dismiss" | "external_link" | "modal";
        target?: string | undefined;
        payload?: Record<string, any> | undefined;
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
    id: string;
    type: "ritual_available" | "ritual_reminder" | "ritual_complete" | "space_activated" | "space_invitation" | "space_post_like" | "space_post_comment" | "space_event_reminder" | "tool_shared" | "tool_feedback" | "achievement_unlocked" | "profile_view" | "friend_request" | "system_announcement" | "welcome_message" | "onboarding_next_step" | "feed_highlight" | "weekly_digest";
    message: string;
    userId: string;
    title: string;
    createdAt: Date;
    priority: "low" | "medium" | "high" | "urgent";
    read: boolean;
    dismissed: boolean;
    clicked: boolean;
    expiresAt?: Date | undefined;
    imageUrl?: string | undefined;
    iconUrl?: string | undefined;
    data?: Record<string, any> | undefined;
    actions?: {
        label: string;
        action: "navigate" | "dismiss" | "external_link" | "modal";
        target?: string | undefined;
        payload?: Record<string, any> | undefined;
    }[] | undefined;
    scheduledFor?: Date | undefined;
    readAt?: Date | undefined;
    clickedAt?: Date | undefined;
    groupId?: string | undefined;
    batchId?: string | undefined;
}, {
    id: string;
    type: "ritual_available" | "ritual_reminder" | "ritual_complete" | "space_activated" | "space_invitation" | "space_post_like" | "space_post_comment" | "space_event_reminder" | "tool_shared" | "tool_feedback" | "achievement_unlocked" | "profile_view" | "friend_request" | "system_announcement" | "welcome_message" | "onboarding_next_step" | "feed_highlight" | "weekly_digest";
    message: string;
    userId: string;
    title: string;
    createdAt: Date;
    priority: "low" | "medium" | "high" | "urgent";
    expiresAt?: Date | undefined;
    imageUrl?: string | undefined;
    iconUrl?: string | undefined;
    data?: Record<string, any> | undefined;
    actions?: {
        label: string;
        action: "navigate" | "dismiss" | "external_link" | "modal";
        target?: string | undefined;
        payload?: Record<string, any> | undefined;
    }[] | undefined;
    read?: boolean | undefined;
    dismissed?: boolean | undefined;
    clicked?: boolean | undefined;
    scheduledFor?: Date | undefined;
    readAt?: Date | undefined;
    clickedAt?: Date | undefined;
    groupId?: string | undefined;
    batchId?: string | undefined;
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
        enabled: boolean;
        start: string;
        end: string;
        timezone?: string | undefined;
    }, {
        start: string;
        end: string;
        enabled?: boolean | undefined;
        timezone?: string | undefined;
    }>>;
    soundEnabled: z.ZodDefault<z.ZodBoolean>;
    vibrationEnabled: z.ZodDefault<z.ZodBoolean>;
    badgeCount: z.ZodDefault<z.ZodBoolean>;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    userId: string;
    updatedAt: Date;
    social: boolean;
    pushNotifications: boolean;
    emailNotifications: boolean;
    inAppNotifications: boolean;
    rituals: boolean;
    spaces: boolean;
    achievements: boolean;
    system: boolean;
    digestFrequency: "never" | "daily" | "weekly";
    soundEnabled: boolean;
    vibrationEnabled: boolean;
    badgeCount: boolean;
    quietHours?: {
        enabled: boolean;
        start: string;
        end: string;
        timezone?: string | undefined;
    } | undefined;
}, {
    userId: string;
    updatedAt: Date;
    social?: boolean | undefined;
    pushNotifications?: boolean | undefined;
    emailNotifications?: boolean | undefined;
    inAppNotifications?: boolean | undefined;
    rituals?: boolean | undefined;
    spaces?: boolean | undefined;
    achievements?: boolean | undefined;
    system?: boolean | undefined;
    digestFrequency?: "never" | "daily" | "weekly" | undefined;
    quietHours?: {
        start: string;
        end: string;
        enabled?: boolean | undefined;
        timezone?: string | undefined;
    } | undefined;
    soundEnabled?: boolean | undefined;
    vibrationEnabled?: boolean | undefined;
    badgeCount?: boolean | undefined;
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
        label: string;
        action: "navigate" | "dismiss" | "external_link" | "modal";
        target?: string | undefined;
        payload?: Record<string, any> | undefined;
    }, {
        label: string;
        action: "navigate" | "dismiss" | "external_link" | "modal";
        target?: string | undefined;
        payload?: Record<string, any> | undefined;
    }>, "many">>;
    scheduleDelay: z.ZodOptional<z.ZodNumber>;
    expiryDuration: z.ZodOptional<z.ZodNumber>;
    targetAudience: z.ZodOptional<z.ZodEnum<["all", "builders", "leaders", "new_users", "inactive"]>>;
    active: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "ritual_available" | "ritual_reminder" | "ritual_complete" | "space_activated" | "space_invitation" | "space_post_like" | "space_post_comment" | "space_event_reminder" | "tool_shared" | "tool_feedback" | "achievement_unlocked" | "profile_view" | "friend_request" | "system_announcement" | "welcome_message" | "onboarding_next_step" | "feed_highlight" | "weekly_digest";
    createdAt: Date;
    updatedAt: Date;
    titleTemplate: string;
    messageTemplate: string;
    defaultPriority: "low" | "medium" | "high" | "urgent";
    active: boolean;
    variables?: string[] | undefined;
    defaultActions?: {
        label: string;
        action: "navigate" | "dismiss" | "external_link" | "modal";
        target?: string | undefined;
        payload?: Record<string, any> | undefined;
    }[] | undefined;
    scheduleDelay?: number | undefined;
    expiryDuration?: number | undefined;
    targetAudience?: "all" | "builders" | "leaders" | "new_users" | "inactive" | undefined;
}, {
    id: string;
    type: "ritual_available" | "ritual_reminder" | "ritual_complete" | "space_activated" | "space_invitation" | "space_post_like" | "space_post_comment" | "space_event_reminder" | "tool_shared" | "tool_feedback" | "achievement_unlocked" | "profile_view" | "friend_request" | "system_announcement" | "welcome_message" | "onboarding_next_step" | "feed_highlight" | "weekly_digest";
    createdAt: Date;
    updatedAt: Date;
    titleTemplate: string;
    messageTemplate: string;
    defaultPriority: "low" | "medium" | "high" | "urgent";
    variables?: string[] | undefined;
    defaultActions?: {
        label: string;
        action: "navigate" | "dismiss" | "external_link" | "modal";
        target?: string | undefined;
        payload?: Record<string, any> | undefined;
    }[] | undefined;
    scheduleDelay?: number | undefined;
    expiryDuration?: number | undefined;
    targetAudience?: "all" | "builders" | "leaders" | "new_users" | "inactive" | undefined;
    active?: boolean | undefined;
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
    id: string;
    status: "draft" | "scheduled" | "sending" | "sent" | "failed";
    createdAt: Date;
    name: string;
    createdBy: string;
    templateId: string;
    userIds: string[];
    sentCount: number;
    failedCount: number;
    scheduledFor?: Date | undefined;
    personalizedData?: Record<string, Record<string, any>> | undefined;
    sentAt?: Date | undefined;
}, {
    id: string;
    status: "draft" | "scheduled" | "sending" | "sent" | "failed";
    createdAt: Date;
    name: string;
    createdBy: string;
    templateId: string;
    userIds: string[];
    scheduledFor?: Date | undefined;
    personalizedData?: Record<string, Record<string, any>> | undefined;
    sentCount?: number | undefined;
    failedCount?: number | undefined;
    sentAt?: Date | undefined;
}>;
export type Notification = z.infer<typeof NotificationSchema>;
export type NotificationPreferences = z.infer<typeof NotificationPreferencesSchema>;
export type NotificationTemplate = z.infer<typeof NotificationTemplateSchema>;
export type NotificationBatch = z.infer<typeof NotificationBatchSchema>;
export type NotificationType = z.infer<typeof NotificationTypeSchema>;
export type NotificationPriority = z.infer<typeof NotificationPrioritySchema>;
export type NotificationAction = z.infer<typeof NotificationActionSchema>;
//# sourceMappingURL=notification.schema.d.ts.map