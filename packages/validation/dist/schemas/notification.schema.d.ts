import { z } from "zod";
export declare const NotificationTypeSchema: z.ZodEnum<["ritual_available", "ritual_reminder", "ritual_complete", "space_activated", "space_invitation", "space_post_like", "space_post_comment", "space_event_reminder", "tool_shared", "tool_feedback", "achievement_unlocked", "profile_view", "friend_request", "system_announcement", "welcome_message", "onboarding_next_step", "feed_highlight", "weekly_digest"]>;
export declare const NotificationPrioritySchema: z.ZodEnum<["low", "medium", "high", "urgent"]>;
export declare const NotificationActionSchema: z.ZodObject<{
    label: z.ZodString;
    action: z.ZodEnum<["navigate", "dismiss", "external_link", "modal"]>;
    target: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    label: string;
    action: "navigate" | "dismiss" | "external_link" | "modal";
    target?: string | undefined;
}, {
    label: string;
    action: "navigate" | "dismiss" | "external_link" | "modal";
    target?: string | undefined;
}>;
export declare const NotificationSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    type: z.ZodEnum<["ritual_available", "ritual_reminder", "ritual_complete", "space_activated", "space_invitation", "space_post_like", "space_post_comment", "space_event_reminder", "tool_shared", "tool_feedback", "achievement_unlocked", "profile_view", "friend_request", "system_announcement", "welcome_message", "onboarding_next_step", "feed_highlight", "weekly_digest"]>;
    priority: z.ZodEnum<["low", "medium", "high", "urgent"]>;
    iconUrl: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
    actions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        action: z.ZodEnum<["navigate", "dismiss", "external_link", "modal"]>;
        target: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        label: string;
        action: "navigate" | "dismiss" | "external_link" | "modal";
        target?: string | undefined;
    }, {
        label: string;
        action: "navigate" | "dismiss" | "external_link" | "modal";
        target?: string | undefined;
    }>, "many">>;
    clicked: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
    readAt: z.ZodOptional<z.ZodDate>;
    clickedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "ritual_available" | "ritual_reminder" | "ritual_complete" | "space_activated" | "space_invitation" | "space_post_like" | "space_post_comment" | "space_event_reminder" | "tool_shared" | "tool_feedback" | "achievement_unlocked" | "profile_view" | "friend_request" | "system_announcement" | "welcome_message" | "onboarding_next_step" | "feed_highlight" | "weekly_digest";
    userId: string;
    createdAt: Date;
    priority: "low" | "medium" | "high" | "urgent";
    clicked: boolean;
    imageUrl?: string | undefined;
    iconUrl?: string | undefined;
    actions?: {
        label: string;
        action: "navigate" | "dismiss" | "external_link" | "modal";
        target?: string | undefined;
    }[] | undefined;
    readAt?: Date | undefined;
    clickedAt?: Date | undefined;
}, {
    id: string;
    type: "ritual_available" | "ritual_reminder" | "ritual_complete" | "space_activated" | "space_invitation" | "space_post_like" | "space_post_comment" | "space_event_reminder" | "tool_shared" | "tool_feedback" | "achievement_unlocked" | "profile_view" | "friend_request" | "system_announcement" | "welcome_message" | "onboarding_next_step" | "feed_highlight" | "weekly_digest";
    userId: string;
    createdAt: Date;
    priority: "low" | "medium" | "high" | "urgent";
    imageUrl?: string | undefined;
    iconUrl?: string | undefined;
    actions?: {
        label: string;
        action: "navigate" | "dismiss" | "external_link" | "modal";
        target?: string | undefined;
    }[] | undefined;
    clicked?: boolean | undefined;
    readAt?: Date | undefined;
    clickedAt?: Date | undefined;
}>;
export declare const NotificationPreferencesSchema: z.ZodObject<{
    userId: z.ZodString;
    inAppNotifications: z.ZodDefault<z.ZodBoolean>;
    social: z.ZodDefault<z.ZodBoolean>;
    achievements: z.ZodDefault<z.ZodBoolean>;
    system: z.ZodDefault<z.ZodBoolean>;
    quietHours: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        start: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        start: string;
    }, {
        start: string;
        enabled?: boolean | undefined;
    }>>;
    badgeCount: z.ZodDefault<z.ZodBoolean>;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    userId: string;
    updatedAt: Date;
    social: boolean;
    inAppNotifications: boolean;
    achievements: boolean;
    system: boolean;
    badgeCount: boolean;
    quietHours?: {
        enabled: boolean;
        start: string;
    } | undefined;
}, {
    userId: string;
    updatedAt: Date;
    social?: boolean | undefined;
    inAppNotifications?: boolean | undefined;
    achievements?: boolean | undefined;
    system?: boolean | undefined;
    quietHours?: {
        start: string;
        enabled?: boolean | undefined;
    } | undefined;
    badgeCount?: boolean | undefined;
}>;
export declare const NotificationTemplateSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["ritual_available", "ritual_reminder", "ritual_complete", "space_activated", "space_invitation", "space_post_like", "space_post_comment", "space_event_reminder", "tool_shared", "tool_feedback", "achievement_unlocked", "profile_view", "friend_request", "system_announcement", "welcome_message", "onboarding_next_step", "feed_highlight", "weekly_digest"]>;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "ritual_available" | "ritual_reminder" | "ritual_complete" | "space_activated" | "space_invitation" | "space_post_like" | "space_post_comment" | "space_event_reminder" | "tool_shared" | "tool_feedback" | "achievement_unlocked" | "profile_view" | "friend_request" | "system_announcement" | "welcome_message" | "onboarding_next_step" | "feed_highlight" | "weekly_digest";
    updatedAt: Date;
}, {
    id: string;
    type: "ritual_available" | "ritual_reminder" | "ritual_complete" | "space_activated" | "space_invitation" | "space_post_like" | "space_post_comment" | "space_event_reminder" | "tool_shared" | "tool_feedback" | "achievement_unlocked" | "profile_view" | "friend_request" | "system_announcement" | "welcome_message" | "onboarding_next_step" | "feed_highlight" | "weekly_digest";
    updatedAt: Date;
}>;
export declare const NotificationBatchSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    templateId: z.ZodString;
    sentCount: z.ZodDefault<z.ZodNumber>;
    failedCount: z.ZodDefault<z.ZodNumber>;
    sentAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    templateId: string;
    sentCount: number;
    failedCount: number;
    sentAt?: Date | undefined;
}, {
    id: string;
    name: string;
    templateId: string;
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