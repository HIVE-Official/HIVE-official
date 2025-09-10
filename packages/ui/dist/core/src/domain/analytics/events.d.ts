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
    id: string;
    type: string;
    timestamp: Date;
    sessionId: string;
    context?: {
        url?: string | undefined;
        userAgent?: string | undefined;
        referrer?: string | undefined;
        ip?: string | undefined;
    } | undefined;
    properties?: Record<string, any> | undefined;
    userId?: string | undefined;
}, {
    id: string;
    type: string;
    timestamp: Date;
    sessionId: string;
    context?: {
        url?: string | undefined;
        userAgent?: string | undefined;
        referrer?: string | undefined;
        ip?: string | undefined;
    } | undefined;
    properties?: Record<string, any> | undefined;
    userId?: string | undefined;
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
        height: number;
        width: number;
    }, {
        height: number;
        width: number;
    }>>;
    device: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["desktop", "tablet", "mobile"]>;
        os: z.ZodOptional<z.ZodString>;
        browser: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "mobile" | "desktop" | "tablet";
        os?: string | undefined;
        browser?: string | undefined;
    }, {
        type: "mobile" | "desktop" | "tablet";
        os?: string | undefined;
        browser?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    url?: string | undefined;
    viewport?: {
        height: number;
        width: number;
    } | undefined;
    userAgent?: string | undefined;
    referrer?: string | undefined;
    ip?: string | undefined;
    device?: {
        type: "mobile" | "desktop" | "tablet";
        os?: string | undefined;
        browser?: string | undefined;
    } | undefined;
}, {
    url?: string | undefined;
    viewport?: {
        height: number;
        width: number;
    } | undefined;
    userAgent?: string | undefined;
    referrer?: string | undefined;
    ip?: string | undefined;
    device?: {
        type: "mobile" | "desktop" | "tablet";
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
    content?: string | undefined;
    term?: string | undefined;
    medium?: string | undefined;
    source?: string | undefined;
    campaign?: string | undefined;
}, {
    content?: string | undefined;
    term?: string | undefined;
    medium?: string | undefined;
    source?: string | undefined;
    campaign?: string | undefined;
}>;
export type BaseEventProperties = z.infer<typeof BaseEventPropertiesSchema>;
//# sourceMappingURL=events.d.ts.map