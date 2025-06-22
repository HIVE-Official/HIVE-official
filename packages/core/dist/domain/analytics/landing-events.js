import { z } from "zod";
// Zod Validation Schemas
export const eventContextSchema = z.object({
    page: z.object({
        url: z.string().url(),
        path: z.string(),
        title: z.string(),
        referrer: z.string().url().optional(),
        loadTime: z.number().min(0),
        scrollDepth: z.number().min(0).max(100),
        timeOnPage: z.number().min(0),
        exitPage: z.boolean(),
    }),
    user: z.object({
        isAuthenticated: z.boolean(),
        userType: z.enum(["guest", "new", "returning", "verified"]),
        campus: z.string().optional(),
        cohort: z.string().optional(),
        abTestVariants: z.record(z.string()),
    }),
    device: z.object({
        type: z.enum(["desktop", "mobile", "tablet"]),
        os: z.string(),
        browser: z.string(),
        viewport: z.object({
            width: z.number().min(0),
            height: z.number().min(0),
        }),
        connection: z.object({
            type: z.enum(["wifi", "cellular", "ethernet", "unknown"]),
            speed: z.enum(["slow", "medium", "fast"]),
        }),
    }),
    campaign: z.object({
        source: z.string().optional(),
        medium: z.string().optional(),
        campaign: z.string().optional(),
        term: z.string().optional(),
        content: z.string().optional(),
        gclid: z.string().optional(),
    }),
    experiment: z.object({
        experiments: z.array(z.object({
            id: z.string().uuid(),
            name: z.string(),
            variant: z.string(),
            startDate: z.date(),
        })),
    }),
});
export const baseAnalyticsEventSchema = z.object({
    id: z.string().uuid(),
    timestamp: z.date(),
    sessionId: z.string().uuid(),
    userId: z.string().uuid().optional(),
    event: z.string(),
    category: z.enum([
        "page_view",
        "user_interaction",
        "conversion",
        "engagement",
        "performance",
        "error",
        "system",
    ]),
    properties: z.record(z.any()),
    context: eventContextSchema,
    metadata: z.object({
        version: z.string().regex(/^\d+\.\d+\.\d+$/),
        environment: z.enum(["development", "staging", "production"]),
        buildId: z.string(),
        region: z.string(),
        processed: z.boolean(),
        errors: z.array(z.string()).optional(),
    }),
});
export const landingPageViewEventSchema = baseAnalyticsEventSchema.extend({
    event: z.literal("landing_page_view"),
    category: z.literal("page_view"),
    properties: z.object({
        variant: z.enum(["default", "animated", "minimal", "bold"]),
        heroVersion: z.string(),
        loadTime: z.number().min(0),
        firstContentfulPaint: z.number().min(0),
        largestContentfulPaint: z.number().min(0),
        cumulativeLayoutShift: z.number().min(0),
        firstInputDelay: z.number().min(0),
        abTestVariant: z.string().optional(),
    }),
});
export const ctaClickEventSchema = baseAnalyticsEventSchema.extend({
    event: z.literal("cta_click"),
    category: z.literal("conversion"),
    properties: z.object({
        ctaText: z.string(),
        ctaVariant: z.enum(["primary", "secondary", "outline", "ghost"]),
        ctaSize: z.enum(["sm", "md", "lg", "xl"]),
        position: z.enum(["hero", "section", "footer"]),
        timeFromLoad: z.number().min(0),
        scrollPosition: z.number().min(0),
        clickPosition: z.object({
            x: z.number(),
            y: z.number(),
        }),
        destination: z.string(),
    }),
});
export const conversionEventSchema = baseAnalyticsEventSchema.extend({
    event: z.literal("conversion"),
    category: z.literal("conversion"),
    properties: z.object({
        conversionType: z.enum([
            "email_capture",
            "signup_start",
            "signup_complete",
            "campus_select",
        ]),
        value: z.number().optional(),
        currency: z.string().length(3).optional(),
        funnel: z.object({
            step: z.number().min(1),
            totalSteps: z.number().min(1),
            stepName: z.string(),
        }),
        timeToConvert: z.number().min(0),
        touchpoints: z.array(z.object({
            timestamp: z.date(),
            event: z.string(),
            source: z.string(),
            medium: z.string(),
        })),
    }),
});
// Event Validation Functions
export function validateAnalyticsEvent(event) {
    return baseAnalyticsEventSchema.parse(event);
}
export function isValidAnalyticsEvent(event) {
    return baseAnalyticsEventSchema.safeParse(event).success;
}
// Event Factory Functions
export function createLandingPageViewEvent(sessionId, properties, context) {
    return {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        sessionId,
        event: "landing_page_view",
        category: "page_view",
        properties,
        context,
        metadata: {
            version: "1.0.0",
            environment: "production",
            buildId: process.env.BUILD_ID || "unknown",
            region: "us-east-1",
            processed: false,
        },
    };
}
export function createCTAClickEvent(sessionId, properties, context, userId) {
    return {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        sessionId,
        userId,
        event: "cta_click",
        category: "conversion",
        properties,
        context,
        metadata: {
            version: "1.0.0",
            environment: "production",
            buildId: process.env.BUILD_ID || "unknown",
            region: "us-east-1",
            processed: false,
        },
    };
}
export function createScrollDepthEvent(sessionId, properties, context, userId) {
    return {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        sessionId,
        userId,
        event: "scroll_depth",
        category: "engagement",
        properties,
        context,
        metadata: {
            version: "1.0.0",
            environment: "production",
            buildId: process.env.BUILD_ID || "unknown",
            region: "us-east-1",
            processed: false,
        },
    };
}
// All types are already exported with their interface declarations above
//# sourceMappingURL=landing-events.js.map