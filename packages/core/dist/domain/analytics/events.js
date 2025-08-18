"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEventPropertiesSchema = exports.EventContextSchema = exports.AnalyticsEventType = exports.AnalyticsEventSchema = void 0;
const zod_1 = require("zod");
// Base analytics event schema
exports.AnalyticsEventSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.string(),
    userId: zod_1.z.string().optional(),
    sessionId: zod_1.z.string(),
    timestamp: zod_1.z.date(),
    properties: zod_1.z.record(zod_1.z.any()).optional(),
    context: zod_1.z.object({
        userAgent: zod_1.z.string().optional(),
        ip: zod_1.z.string().optional(),
        referrer: zod_1.z.string().optional(),
        url: zod_1.z.string().optional(),
    }).optional(),
});
// Core event types
exports.AnalyticsEventType = zod_1.z.enum([
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
exports.EventContextSchema = zod_1.z.object({
    userAgent: zod_1.z.string().optional(),
    ip: zod_1.z.string().optional(),
    referrer: zod_1.z.string().optional(),
    url: zod_1.z.string().optional(),
    viewport: zod_1.z.object({
        width: zod_1.z.number(),
        height: zod_1.z.number(),
    }).optional(),
    device: zod_1.z.object({
        type: zod_1.z.enum(['desktop', 'tablet', 'mobile']),
        os: zod_1.z.string().optional(),
        browser: zod_1.z.string().optional(),
    }).optional(),
});
// Base event properties
exports.BaseEventPropertiesSchema = zod_1.z.object({
    source: zod_1.z.string().optional(),
    medium: zod_1.z.string().optional(),
    campaign: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    term: zod_1.z.string().optional(),
});
//# sourceMappingURL=events.js.map