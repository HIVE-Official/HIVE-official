import { z } from "zod";
// Zod Schemas
export const authenticationContextSchema = z.object({
    isAuthenticated: z.boolean(),
    userType: z.enum(["guest", "returning", "verified", "onboarding"]),
    loginStatus: z.enum(["anonymous", "identified", "authenticated"]),
    campus: z
        .object({
        id: z.string().uuid(),
        name: z.string(),
        domain: z.string().includes(".edu"),
        verified: z.boolean(),
    })
        .optional(),
});
export const personalizationContextSchema = z.object({
    variant: z.enum([
        "default",
        "returning-user",
        "campus-specific",
        "high-intent",
    ]),
    content: z.object({
        heroVariant: z.enum(["minimal", "animated", "bold"]),
        ctaText: z.string(),
        messaging: z.enum(["general", "campus-focused", "feature-focused"]),
    }),
    targeting: z.object({
        cohort: z.string().optional(),
        segment: z.string().optional(),
        abTestVariants: z.record(z.string()),
    }),
});
export const userJourneyContextSchema = z.object({
    stage: z.enum([
        "discovery",
        "consideration",
        "intent",
        "signup",
        "onboarding",
    ]),
    touchpoints: z.array(z.object({
        timestamp: z.date(),
        type: z.enum([
            "page_view",
            "click",
            "form_interaction",
            "scroll",
            "time_spent",
        ]),
        page: z.string(),
        action: z.string().optional(),
        value: z.number().optional(),
    })),
    source: z.object({
        channel: z.enum([
            "organic",
            "paid",
            "social",
            "email",
            "direct",
            "referral",
        ]),
        source: z.string(),
        medium: z.string(),
        campaign: z.string().optional(),
        term: z.string().optional(),
        content: z.string().optional(),
    }),
    intent: z.object({
        emailProvided: z.boolean(),
        formStarted: z.boolean(),
        timeOnSite: z.number().min(0),
        pageDepth: z.number().min(0),
        ctaClicks: z.number().min(0),
        scrollDepth: z.number().min(0).max(100),
        returnVisitor: z.boolean(),
    }),
    engagement: z.object({
        sessionDuration: z.number().min(0),
        pageViews: z.number().min(0),
        interactions: z.number().min(0),
        bounceRate: z.number().min(0).max(1),
        lastActive: z.date(),
    }),
});
export const landingUserContextSchema = z.object({
    id: z.string().uuid(),
    sessionId: z.string().uuid(),
    authentication: authenticationContextSchema,
    personalization: personalizationContextSchema,
    journey: userJourneyContextSchema,
    preferences: z.object({
        theme: z.enum(["light", "dark", "system"]),
        reducedMotion: z.boolean(),
        language: z.string().length(2),
        timezone: z.string(),
        cookieConsent: z.boolean(),
        emailOptIn: z.boolean(),
    }),
    metadata: z.object({
        createdAt: z.date(),
        updatedAt: z.date(),
        version: z.string().regex(/^\d+\.\d+\.\d+$/),
        fingerprint: z.string(),
        device: z.object({
            type: z.enum(["desktop", "mobile", "tablet"]),
            os: z.string(),
            browser: z.string(),
        }),
        location: z.object({
            country: z.string().optional(),
            region: z.string().optional(),
            timezone: z.string(),
        }),
    }),
});
// Validation Functions
export function validateLandingUserContext(context) {
    return landingUserContextSchema.parse(context);
}
export function isValidLandingUserContext(context) {
    return landingUserContextSchema.safeParse(context).success;
}
// Factory Functions
export function createGuestUserContext(sessionId) {
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
    const canvas = typeof document !== "undefined" ? document.createElement("canvas") : null;
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