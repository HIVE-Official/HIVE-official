import { z } from 'zod';
export declare const AnalyticsEventSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodString;
    timestamp: z.ZodDate;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    context: z.ZodOptional<z.ZodObject<{
        userAgent: z.ZodOptional<z.ZodString>;
        ip: z.ZodOptional<z.ZodString>;
        referrer: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url?: string;
        userAgent?: string;
        referrer?: string;
        ip?: string;
    }, {
        url?: string;
        userAgent?: string;
        referrer?: string;
        ip?: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    type?: string;
    id?: string;
    userId?: string;
    context?: {
        url?: string;
        userAgent?: string;
        referrer?: string;
        ip?: string;
    };
    sessionId?: string;
    timestamp?: Date;
    properties?: Record<string, any>;
}, {
    type?: string;
    id?: string;
    userId?: string;
    context?: {
        url?: string;
        userAgent?: string;
        referrer?: string;
        ip?: string;
    };
    sessionId?: string;
    timestamp?: Date;
    properties?: Record<string, any>;
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
        height?: number;
        width?: number;
    }, {
        height?: number;
        width?: number;
    }>>;
    device: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["desktop", "tablet", "mobile"]>;
        os: z.ZodOptional<z.ZodString>;
        browser: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type?: "mobile" | "desktop" | "tablet";
        os?: string;
        browser?: string;
    }, {
        type?: "mobile" | "desktop" | "tablet";
        os?: string;
        browser?: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    url?: string;
    viewport?: {
        height?: number;
        width?: number;
    };
    userAgent?: string;
    referrer?: string;
    ip?: string;
    device?: {
        type?: "mobile" | "desktop" | "tablet";
        os?: string;
        browser?: string;
    };
}, {
    url?: string;
    viewport?: {
        height?: number;
        width?: number;
    };
    userAgent?: string;
    referrer?: string;
    ip?: string;
    device?: {
        type?: "mobile" | "desktop" | "tablet";
        os?: string;
        browser?: string;
    };
}>;
export type EventContext = z.infer<typeof EventContextSchema>;
export declare const BaseEventPropertiesSchema: z.ZodObject<{
    source: z.ZodOptional<z.ZodString>;
    medium: z.ZodOptional<z.ZodString>;
    campaign: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    term: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    content?: string;
    term?: string;
    source?: string;
    medium?: string;
    campaign?: string;
}, {
    content?: string;
    term?: string;
    source?: string;
    medium?: string;
    campaign?: string;
}>;
export type BaseEventProperties = z.infer<typeof BaseEventPropertiesSchema>;
//# sourceMappingURL=events.d.ts.map