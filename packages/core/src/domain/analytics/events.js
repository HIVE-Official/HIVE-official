import { z } from 'zod';
// Base analytics event schema
export const AnalyticsEventSchema = z.object({
    id: z.string(),
    type: z.string(),
    userId: z.string().optional(),
    sessionId: z.string(),
    timestamp: z.date(),
    properties: z.record(z.any()).optional(),
    context: z.object({
        userAgent: z.string().optional(),
        ip: z.string().optional(),
        referrer: z.string().optional(),
        url: z.string().optional(),
    }).optional(),
});
// Core event types
export const AnalyticsEventType = z.enum([
    // User events
    'user_signup',
    'user_login',
    'user_logout',
    'user_profile_updated',
    // Navigation events
    'page_view',
    'navigation',
    // Feature usage
    'feature_used',
    'button_clicked',
    'form_submitted',
    // Error events
    'error_occurred',
    'api_error',
    // Performance events
    'performance_metric',
    'load_time',
]);
// Event context for additional metadata
export const EventContextSchema = z.object({
    userAgent: z.string().optional(),
    ip: z.string().optional(),
    referrer: z.string().optional(),
    url: z.string().optional(),
    viewport: z.object({
        width: z.number(),
        height: z.number(),
    }).optional(),
    device: z.object({
        type: z.enum(['desktop', 'tablet', 'mobile']),
        os: z.string().optional(),
        browser: z.string().optional(),
    }).optional(),
});
// Base event properties
export const BaseEventPropertiesSchema = z.object({
    source: z.string().optional(),
    medium: z.string().optional(),
    campaign: z.string().optional(),
    content: z.string().optional(),
    term: z.string().optional(),
});
//# sourceMappingURL=events.js.map