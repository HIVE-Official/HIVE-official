"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.landingUserContextSchema = exports.userJourneyContextSchema = exports.personalizationContextSchema = exports.authenticationContextSchema = void 0;
exports.validateLandingUserContext = validateLandingUserContext;
exports.isValidLandingUserContext = isValidLandingUserContext;
exports.createGuestUserContext = createGuestUserContext;
const zod_1 = require("zod");
// Zod Schemas
exports.authenticationContextSchema = zod_1.z.object({
    isAuthenticated: zod_1.z.boolean(),
    userType: zod_1.z.enum(["guest", "returning", "verified", "onboarding"]),
    loginStatus: zod_1.z.enum(["anonymous", "identified", "authenticated"]),
    campus: zod_1.z
        .object({
        id: zod_1.z.string().uuid(),
        name: zod_1.z.string(),
        domain: zod_1.z.string().includes(".edu"),
        verified: zod_1.z.boolean(),
    })
        .optional(),
});
exports.personalizationContextSchema = zod_1.z.object({
    variant: zod_1.z.enum([
        "default",
        "returning-user",
        "campus-specific",
        "high-intent",
    ]),
    content: zod_1.z.object({
        heroVariant: zod_1.z.enum(["minimal", "animated", "bold"]),
        ctaText: zod_1.z.string(),
        messaging: zod_1.z.enum(["general", "campus-focused", "feature-focused"]),
    }),
    targeting: zod_1.z.object({
        cohort: zod_1.z.string().optional(),
        segment: zod_1.z.string().optional(),
        abTestVariants: zod_1.z.record(zod_1.z.string()),
    }),
});
exports.userJourneyContextSchema = zod_1.z.object({
    stage: zod_1.z.enum([
        "discovery",
        "consideration",
        "intent",
        "signup",
        "onboarding",
    ]),
    touchpoints: zod_1.z.array(zod_1.z.object({
        timestamp: zod_1.z.date(),
        type: zod_1.z.enum([
            "page_view",
            "click",
            "form_interaction",
            "scroll",
            "time_spent",
        ]),
        page: zod_1.z.string(),
        action: zod_1.z.string().optional(),
        value: zod_1.z.number().optional(),
    })),
    source: zod_1.z.object({
        channel: zod_1.z.enum([
            "organic",
            "paid",
            "social",
            "email",
            "direct",
            "referral",
        ]),
        source: zod_1.z.string(),
        medium: zod_1.z.string(),
        campaign: zod_1.z.string().optional(),
        term: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
    }),
    intent: zod_1.z.object({
        emailProvided: zod_1.z.boolean(),
        formStarted: zod_1.z.boolean(),
        timeOnSite: zod_1.z.number().min(0),
        pageDepth: zod_1.z.number().min(0),
        ctaClicks: zod_1.z.number().min(0),
        scrollDepth: zod_1.z.number().min(0).max(100),
        returnVisitor: zod_1.z.boolean(),
    }),
    engagement: zod_1.z.object({
        sessionDuration: zod_1.z.number().min(0),
        pageViews: zod_1.z.number().min(0),
        interactions: zod_1.z.number().min(0),
        bounceRate: zod_1.z.number().min(0).max(1),
        lastActive: zod_1.z.date(),
    }),
});
exports.landingUserContextSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    sessionId: zod_1.z.string().uuid(),
    authentication: exports.authenticationContextSchema,
    personalization: exports.personalizationContextSchema,
    journey: exports.userJourneyContextSchema,
    preferences: zod_1.z.object({
        theme: zod_1.z.enum(["light", "dark", "system"]),
        reducedMotion: zod_1.z.boolean(),
        language: zod_1.z.string().length(2),
        timezone: zod_1.z.string(),
        cookieConsent: zod_1.z.boolean(),
        emailOptIn: zod_1.z.boolean(),
    }),
    metadata: zod_1.z.object({
        createdAt: zod_1.z.date(),
        updatedAt: zod_1.z.date(),
        version: zod_1.z.string().regex(/^\d+\.\d+\.\d+$/),
        fingerprint: zod_1.z.string(),
        device: zod_1.z.object({
            type: zod_1.z.enum(["desktop", "mobile", "tablet"]),
            os: zod_1.z.string(),
            browser: zod_1.z.string(),
        }),
        location: zod_1.z.object({
            country: zod_1.z.string().optional(),
            region: zod_1.z.string().optional(),
            timezone: zod_1.z.string(),
        }),
    }),
}).strict();
// Validation Functions
function validateLandingUserContext(context) {
    const result = exports.landingUserContextSchema.safeParse(context);
    if (!result.success) {
        throw new Error(`Invalid landing user context: ${result.error.message}`);
    }
    return result.data;
}
function isValidLandingUserContext(context) {
    return exports.landingUserContextSchema.safeParse(context).success;
}
// Factory Functions
function createGuestUserContext(sessionId) {
    return {
        id: crypto.randomUUID(),
        sessionId,
        authentication: {
            isAuthenticated: false,
            userType: "guest",
            loginStatus: "anonymous",
        },
        personalization: {
            variant: "default",
            content: {
                heroVariant: "animated",
                ctaText: "Join now",
                messaging: "general",
            },
            targeting: {
                abTestVariants: {},
            },
        },
        journey: {
            stage: "discovery",
            touchpoints: [],
            source: {
                channel: "direct",
                source: "direct",
                medium: "none",
            },
            intent: {
                emailProvided: false,
                formStarted: false,
                timeOnSite: 0,
                pageDepth: 1,
                ctaClicks: 0,
                scrollDepth: 0,
                returnVisitor: false,
            },
            engagement: {
                sessionDuration: 0,
                pageViews: 1,
                interactions: 0,
                bounceRate: 0,
                lastActive: new Date(),
            },
        },
        preferences: {
            theme: "dark",
            reducedMotion: false,
            language: "en",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            cookieConsent: false,
            emailOptIn: false,
        },
        metadata: {
            createdAt: new Date(),
            updatedAt: new Date(),
            version: "1.0.0",
            fingerprint: generateFingerprint(),
            device: {
                type: "desktop",
                os: "unknown",
                browser: "unknown",
            },
            location: {
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
        },
    };
}
// Helper Functions
function generateFingerprint() {
    // Simple fingerprinting - in production, use more sophisticated method
    const screen = typeof window !== "undefined" ? window.screen : null;
    const navigator = typeof window !== "undefined" ? window.navigator : null;
    const components = [
        navigator?.userAgent || "unknown",
        navigator?.language || "unknown",
        screen?.width || 0,
        screen?.height || 0,
        new Date().getTimezoneOffset(),
    ];
    return btoa(components.join("|")).slice(0, 16);
}
// UserContextService interface is already exported above
//# sourceMappingURL=user-context.js.map