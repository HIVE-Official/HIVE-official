import { z } from 'zod';

// Analytics Event Types for HIVE platform

// Base event structure
export interface BaseAnalyticsEvent {
  timestamp: number;
  sessionId: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

// Page view events
export interface PageViewEvent extends BaseAnalyticsEvent {
  type: "page_view";
  page: string;
  referrer?: string;
}

// User interaction events
export interface UserInteractionEvent extends BaseAnalyticsEvent {
  type: "user_interaction";
  action: string;
  element: string;
  context?: Record<string, unknown>;
}

// Onboarding events
export interface OnboardingEvent extends BaseAnalyticsEvent {
  type: "onboarding_step" | "onboarding_complete";
  step?: number;
  data?: Record<string, unknown>;
}

// Generic analytics event (replacing any with unknown)
export interface GenericAnalyticsEvent extends BaseAnalyticsEvent {
  type: string;
  data?: Record<string, unknown>;
}

// Feed events
export interface FeedEvent extends BaseAnalyticsEvent {
  type: "feed_view" | "post_create" | "post_interact";
  spaceId?: string;
  postId?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

// Space events
export interface SpaceEvent extends BaseAnalyticsEvent {
  type: "space_join" | "space_leave" | "space_create";
  spaceId: string;
  spaceType?: string;
  metadata?: Record<string, unknown>;
}

// Union type for all analytics events
export type AnalyticsEvent = 
  | PageViewEvent
  | UserInteractionEvent
  | OnboardingEvent
  | GenericAnalyticsEvent
  | FeedEvent
  | SpaceEvent;

// Zod schemas for validation
export const BaseAnalyticsEventSchema = z.object({
  timestamp: z.number(),
  sessionId: z.string(),
  userId: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const PageViewEventSchema = BaseAnalyticsEventSchema.extend({
  type: z.literal("page_view"),
  page: z.string(),
  referrer: z.string().optional(),
});

export const UserInteractionEventSchema = BaseAnalyticsEventSchema.extend({
  type: z.literal("user_interaction"),
  action: z.string(),
  element: z.string(),
  context: z.record(z.unknown()).optional(),
});

export declare const AnalyticsEventSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodString;
    timestamp: z.ZodDate;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    context: z.ZodOptional<z.ZodObject<{
        userAgent: z.ZodOptional<z.ZodString>;
        ip: z.ZodOptional<z.ZodString>;
        referrer: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url?: string | undefined;
        userAgent?: string | undefined;
        referrer?: string | undefined;
        ip?: string | undefined;
    }, {
        url?: string | undefined;
        userAgent?: string | undefined;
        referrer?: string | undefined;
        ip?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: string;
    id: string;
    sessionId: string;
    timestamp: Date;
    userId?: string | undefined;
    properties?: Record<string, unknown> | undefined;
    context?: {
        url?: string | undefined;
        userAgent?: string | undefined;
        referrer?: string | undefined;
        ip?: string | undefined;
    } | undefined;
}, {
    type: string;
    id: string;
    sessionId: string;
    timestamp: Date;
    userId?: string | undefined;
    properties?: Record<string, unknown> | undefined;
    context?: {
        url?: string | undefined;
        userAgent?: string | undefined;
        referrer?: string | undefined;
        ip?: string | undefined;
    } | undefined;
}>;
export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;
export declare const AnalyticsEventType: z.ZodEnum<["user_signup", "user_login", "user_logout", "user_profile_updated", "page_view", "navigation", "feature_used", "button_clicked", "form_submitted", "error_occurred", "api_error", "performance_metric", "load_time"]>;
export type AnalyticsEventType = z.infer<typeof AnalyticsEventType>;
export declare const EventContextSchema: z.ZodObject<{
    userAgent: z.ZodOptional<z.ZodString>;
    ip: z.ZodOptional<z.ZodString>;
    referrer: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>>;
    device: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["desktop", "tablet", "mobile"]>;
        os: z.ZodOptional<z.ZodString>;
        browser: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "desktop" | "tablet" | "mobile";
        os?: string | undefined;
        browser?: string | undefined;
    }, {
        type: "desktop" | "tablet" | "mobile";
        os?: string | undefined;
        browser?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    url?: string | undefined;
    userAgent?: string | undefined;
    referrer?: string | undefined;
    viewport?: {
        width: number;
        height: number;
    } | undefined;
    ip?: string | undefined;
    device?: {
        type: "desktop" | "tablet" | "mobile";
        os?: string | undefined;
        browser?: string | undefined;
    } | undefined;
}, {
    url?: string | undefined;
    userAgent?: string | undefined;
    referrer?: string | undefined;
    viewport?: {
        width: number;
        height: number;
    } | undefined;
    ip?: string | undefined;
    device?: {
        type: "desktop" | "tablet" | "mobile";
        os?: string | undefined;
        browser?: string | undefined;
    } | undefined;
}>;
export type EventContext = z.infer<typeof EventContextSchema>;
export declare const BaseEventPropertiesSchema: z.ZodObject<{
    source: z.ZodOptional<z.ZodString>;
    medium: z.ZodOptional<z.ZodString>;
    campaign: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    term: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    medium?: string | undefined;
    content?: string | undefined;
    source?: string | undefined;
    campaign?: string | undefined;
    term?: string | undefined;
}, {
    medium?: string | undefined;
    content?: string | undefined;
    source?: string | undefined;
    campaign?: string | undefined;
    term?: string | undefined;
}>;
export type BaseEventProperties = z.infer<typeof BaseEventPropertiesSchema>;
//# sourceMappingURL=events.d.ts.map