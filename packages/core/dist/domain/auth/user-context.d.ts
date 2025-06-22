import { z } from "zod";
export interface LandingUserContext {
    id: string;
    sessionId: string;
    authentication: AuthenticationContext;
    personalization: PersonalizationContext;
    journey: UserJourneyContext;
    preferences: ContextPreferences;
    metadata: ContextMetadata;
}
export interface AuthenticationContext {
    isAuthenticated: boolean;
    userType: "guest" | "returning" | "verified" | "onboarding";
    loginStatus: "anonymous" | "identified" | "authenticated";
    campus?: {
        id: string;
        name: string;
        domain: string;
        verified: boolean;
    };
}
export interface PersonalizationContext {
    variant: "default" | "returning-user" | "campus-specific" | "high-intent";
    content: {
        heroVariant: "minimal" | "animated" | "bold";
        ctaText: string;
        messaging: "general" | "campus-focused" | "feature-focused";
    };
    targeting: {
        cohort?: string;
        segment?: string;
        abTestVariants: Record<string, string>;
    };
}
export interface UserJourneyContext {
    stage: "discovery" | "consideration" | "intent" | "signup" | "onboarding";
    touchpoints: TouchPoint[];
    source: TrafficSource;
    intent: IntentSignals;
    engagement: EngagementMetrics;
}
export interface TouchPoint {
    timestamp: Date;
    type: "page_view" | "click" | "form_interaction" | "scroll" | "time_spent";
    page: string;
    action?: string;
    value?: number;
}
export interface TrafficSource {
    channel: "organic" | "paid" | "social" | "email" | "direct" | "referral";
    source: string;
    medium: string;
    campaign?: string;
    term?: string;
    content?: string;
}
export interface IntentSignals {
    emailProvided: boolean;
    formStarted: boolean;
    timeOnSite: number;
    pageDepth: number;
    ctaClicks: number;
    scrollDepth: number;
    returnVisitor: boolean;
}
export interface EngagementMetrics {
    sessionDuration: number;
    pageViews: number;
    interactions: number;
    bounceRate: number;
    lastActive: Date;
}
export interface ContextPreferences {
    theme: "light" | "dark" | "system";
    reducedMotion: boolean;
    language: string;
    timezone: string;
    cookieConsent: boolean;
    emailOptIn: boolean;
}
export interface ContextMetadata {
    createdAt: Date;
    updatedAt: Date;
    version: string;
    fingerprint: string;
    device: {
        type: "desktop" | "mobile" | "tablet";
        os: string;
        browser: string;
    };
    location: {
        country?: string;
        region?: string;
        timezone: string;
    };
}
export declare const authenticationContextSchema: z.ZodObject<{
    isAuthenticated: z.ZodBoolean;
    userType: z.ZodEnum<["guest", "returning", "verified", "onboarding"]>;
    loginStatus: z.ZodEnum<["anonymous", "identified", "authenticated"]>;
    campus: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        domain: z.ZodString;
        verified: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        verified: boolean;
        domain: string;
    }, {
        id: string;
        name: string;
        verified: boolean;
        domain: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    isAuthenticated: boolean;
    userType: "onboarding" | "guest" | "returning" | "verified";
    loginStatus: "anonymous" | "identified" | "authenticated";
    campus?: {
        id: string;
        name: string;
        verified: boolean;
        domain: string;
    } | undefined;
}, {
    isAuthenticated: boolean;
    userType: "onboarding" | "guest" | "returning" | "verified";
    loginStatus: "anonymous" | "identified" | "authenticated";
    campus?: {
        id: string;
        name: string;
        verified: boolean;
        domain: string;
    } | undefined;
}>;
export declare const personalizationContextSchema: z.ZodObject<{
    variant: z.ZodEnum<["default", "returning-user", "campus-specific", "high-intent"]>;
    content: z.ZodObject<{
        heroVariant: z.ZodEnum<["minimal", "animated", "bold"]>;
        ctaText: z.ZodString;
        messaging: z.ZodEnum<["general", "campus-focused", "feature-focused"]>;
    }, "strip", z.ZodTypeAny, {
        ctaText: string;
        heroVariant: "bold" | "animated" | "minimal";
        messaging: "general" | "campus-focused" | "feature-focused";
    }, {
        ctaText: string;
        heroVariant: "bold" | "animated" | "minimal";
        messaging: "general" | "campus-focused" | "feature-focused";
    }>;
    targeting: z.ZodObject<{
        cohort: z.ZodOptional<z.ZodString>;
        segment: z.ZodOptional<z.ZodString>;
        abTestVariants: z.ZodRecord<z.ZodString, z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        abTestVariants: Record<string, string>;
        cohort?: string | undefined;
        segment?: string | undefined;
    }, {
        abTestVariants: Record<string, string>;
        cohort?: string | undefined;
        segment?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    variant: "default" | "returning-user" | "campus-specific" | "high-intent";
    content: {
        ctaText: string;
        heroVariant: "bold" | "animated" | "minimal";
        messaging: "general" | "campus-focused" | "feature-focused";
    };
    targeting: {
        abTestVariants: Record<string, string>;
        cohort?: string | undefined;
        segment?: string | undefined;
    };
}, {
    variant: "default" | "returning-user" | "campus-specific" | "high-intent";
    content: {
        ctaText: string;
        heroVariant: "bold" | "animated" | "minimal";
        messaging: "general" | "campus-focused" | "feature-focused";
    };
    targeting: {
        abTestVariants: Record<string, string>;
        cohort?: string | undefined;
        segment?: string | undefined;
    };
}>;
export declare const userJourneyContextSchema: z.ZodObject<{
    stage: z.ZodEnum<["discovery", "consideration", "intent", "signup", "onboarding"]>;
    touchpoints: z.ZodArray<z.ZodObject<{
        timestamp: z.ZodDate;
        type: z.ZodEnum<["page_view", "click", "form_interaction", "scroll", "time_spent"]>;
        page: z.ZodString;
        action: z.ZodOptional<z.ZodString>;
        value: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "click" | "page_view" | "scroll" | "form_interaction" | "time_spent";
        timestamp: Date;
        page: string;
        value?: number | undefined;
        action?: string | undefined;
    }, {
        type: "click" | "page_view" | "scroll" | "form_interaction" | "time_spent";
        timestamp: Date;
        page: string;
        value?: number | undefined;
        action?: string | undefined;
    }>, "many">;
    source: z.ZodObject<{
        channel: z.ZodEnum<["organic", "paid", "social", "email", "direct", "referral"]>;
        source: z.ZodString;
        medium: z.ZodString;
        campaign: z.ZodOptional<z.ZodString>;
        term: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        medium: string;
        source: string;
        channel: "email" | "direct" | "social" | "organic" | "paid" | "referral";
        content?: string | undefined;
        campaign?: string | undefined;
        term?: string | undefined;
    }, {
        medium: string;
        source: string;
        channel: "email" | "direct" | "social" | "organic" | "paid" | "referral";
        content?: string | undefined;
        campaign?: string | undefined;
        term?: string | undefined;
    }>;
    intent: z.ZodObject<{
        emailProvided: z.ZodBoolean;
        formStarted: z.ZodBoolean;
        timeOnSite: z.ZodNumber;
        pageDepth: z.ZodNumber;
        ctaClicks: z.ZodNumber;
        scrollDepth: z.ZodNumber;
        returnVisitor: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        scrollDepth: number;
        emailProvided: boolean;
        formStarted: boolean;
        timeOnSite: number;
        pageDepth: number;
        ctaClicks: number;
        returnVisitor: boolean;
    }, {
        scrollDepth: number;
        emailProvided: boolean;
        formStarted: boolean;
        timeOnSite: number;
        pageDepth: number;
        ctaClicks: number;
        returnVisitor: boolean;
    }>;
    engagement: z.ZodObject<{
        sessionDuration: z.ZodNumber;
        pageViews: z.ZodNumber;
        interactions: z.ZodNumber;
        bounceRate: z.ZodNumber;
        lastActive: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        sessionDuration: number;
        lastActive: Date;
        pageViews: number;
        interactions: number;
        bounceRate: number;
    }, {
        sessionDuration: number;
        lastActive: Date;
        pageViews: number;
        interactions: number;
        bounceRate: number;
    }>;
}, "strip", z.ZodTypeAny, {
    source: {
        medium: string;
        source: string;
        channel: "email" | "direct" | "social" | "organic" | "paid" | "referral";
        content?: string | undefined;
        campaign?: string | undefined;
        term?: string | undefined;
    };
    engagement: {
        sessionDuration: number;
        lastActive: Date;
        pageViews: number;
        interactions: number;
        bounceRate: number;
    };
    touchpoints: {
        type: "click" | "page_view" | "scroll" | "form_interaction" | "time_spent";
        timestamp: Date;
        page: string;
        value?: number | undefined;
        action?: string | undefined;
    }[];
    stage: "signup" | "onboarding" | "discovery" | "consideration" | "intent";
    intent: {
        scrollDepth: number;
        emailProvided: boolean;
        formStarted: boolean;
        timeOnSite: number;
        pageDepth: number;
        ctaClicks: number;
        returnVisitor: boolean;
    };
}, {
    source: {
        medium: string;
        source: string;
        channel: "email" | "direct" | "social" | "organic" | "paid" | "referral";
        content?: string | undefined;
        campaign?: string | undefined;
        term?: string | undefined;
    };
    engagement: {
        sessionDuration: number;
        lastActive: Date;
        pageViews: number;
        interactions: number;
        bounceRate: number;
    };
    touchpoints: {
        type: "click" | "page_view" | "scroll" | "form_interaction" | "time_spent";
        timestamp: Date;
        page: string;
        value?: number | undefined;
        action?: string | undefined;
    }[];
    stage: "signup" | "onboarding" | "discovery" | "consideration" | "intent";
    intent: {
        scrollDepth: number;
        emailProvided: boolean;
        formStarted: boolean;
        timeOnSite: number;
        pageDepth: number;
        ctaClicks: number;
        returnVisitor: boolean;
    };
}>;
export declare const landingUserContextSchema: z.ZodObject<{
    id: z.ZodString;
    sessionId: z.ZodString;
    authentication: z.ZodObject<{
        isAuthenticated: z.ZodBoolean;
        userType: z.ZodEnum<["guest", "returning", "verified", "onboarding"]>;
        loginStatus: z.ZodEnum<["anonymous", "identified", "authenticated"]>;
        campus: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            domain: z.ZodString;
            verified: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            verified: boolean;
            domain: string;
        }, {
            id: string;
            name: string;
            verified: boolean;
            domain: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        isAuthenticated: boolean;
        userType: "onboarding" | "guest" | "returning" | "verified";
        loginStatus: "anonymous" | "identified" | "authenticated";
        campus?: {
            id: string;
            name: string;
            verified: boolean;
            domain: string;
        } | undefined;
    }, {
        isAuthenticated: boolean;
        userType: "onboarding" | "guest" | "returning" | "verified";
        loginStatus: "anonymous" | "identified" | "authenticated";
        campus?: {
            id: string;
            name: string;
            verified: boolean;
            domain: string;
        } | undefined;
    }>;
    personalization: z.ZodObject<{
        variant: z.ZodEnum<["default", "returning-user", "campus-specific", "high-intent"]>;
        content: z.ZodObject<{
            heroVariant: z.ZodEnum<["minimal", "animated", "bold"]>;
            ctaText: z.ZodString;
            messaging: z.ZodEnum<["general", "campus-focused", "feature-focused"]>;
        }, "strip", z.ZodTypeAny, {
            ctaText: string;
            heroVariant: "bold" | "animated" | "minimal";
            messaging: "general" | "campus-focused" | "feature-focused";
        }, {
            ctaText: string;
            heroVariant: "bold" | "animated" | "minimal";
            messaging: "general" | "campus-focused" | "feature-focused";
        }>;
        targeting: z.ZodObject<{
            cohort: z.ZodOptional<z.ZodString>;
            segment: z.ZodOptional<z.ZodString>;
            abTestVariants: z.ZodRecord<z.ZodString, z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            abTestVariants: Record<string, string>;
            cohort?: string | undefined;
            segment?: string | undefined;
        }, {
            abTestVariants: Record<string, string>;
            cohort?: string | undefined;
            segment?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        variant: "default" | "returning-user" | "campus-specific" | "high-intent";
        content: {
            ctaText: string;
            heroVariant: "bold" | "animated" | "minimal";
            messaging: "general" | "campus-focused" | "feature-focused";
        };
        targeting: {
            abTestVariants: Record<string, string>;
            cohort?: string | undefined;
            segment?: string | undefined;
        };
    }, {
        variant: "default" | "returning-user" | "campus-specific" | "high-intent";
        content: {
            ctaText: string;
            heroVariant: "bold" | "animated" | "minimal";
            messaging: "general" | "campus-focused" | "feature-focused";
        };
        targeting: {
            abTestVariants: Record<string, string>;
            cohort?: string | undefined;
            segment?: string | undefined;
        };
    }>;
    journey: z.ZodObject<{
        stage: z.ZodEnum<["discovery", "consideration", "intent", "signup", "onboarding"]>;
        touchpoints: z.ZodArray<z.ZodObject<{
            timestamp: z.ZodDate;
            type: z.ZodEnum<["page_view", "click", "form_interaction", "scroll", "time_spent"]>;
            page: z.ZodString;
            action: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: "click" | "page_view" | "scroll" | "form_interaction" | "time_spent";
            timestamp: Date;
            page: string;
            value?: number | undefined;
            action?: string | undefined;
        }, {
            type: "click" | "page_view" | "scroll" | "form_interaction" | "time_spent";
            timestamp: Date;
            page: string;
            value?: number | undefined;
            action?: string | undefined;
        }>, "many">;
        source: z.ZodObject<{
            channel: z.ZodEnum<["organic", "paid", "social", "email", "direct", "referral"]>;
            source: z.ZodString;
            medium: z.ZodString;
            campaign: z.ZodOptional<z.ZodString>;
            term: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            medium: string;
            source: string;
            channel: "email" | "direct" | "social" | "organic" | "paid" | "referral";
            content?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
        }, {
            medium: string;
            source: string;
            channel: "email" | "direct" | "social" | "organic" | "paid" | "referral";
            content?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
        }>;
        intent: z.ZodObject<{
            emailProvided: z.ZodBoolean;
            formStarted: z.ZodBoolean;
            timeOnSite: z.ZodNumber;
            pageDepth: z.ZodNumber;
            ctaClicks: z.ZodNumber;
            scrollDepth: z.ZodNumber;
            returnVisitor: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            scrollDepth: number;
            emailProvided: boolean;
            formStarted: boolean;
            timeOnSite: number;
            pageDepth: number;
            ctaClicks: number;
            returnVisitor: boolean;
        }, {
            scrollDepth: number;
            emailProvided: boolean;
            formStarted: boolean;
            timeOnSite: number;
            pageDepth: number;
            ctaClicks: number;
            returnVisitor: boolean;
        }>;
        engagement: z.ZodObject<{
            sessionDuration: z.ZodNumber;
            pageViews: z.ZodNumber;
            interactions: z.ZodNumber;
            bounceRate: z.ZodNumber;
            lastActive: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            sessionDuration: number;
            lastActive: Date;
            pageViews: number;
            interactions: number;
            bounceRate: number;
        }, {
            sessionDuration: number;
            lastActive: Date;
            pageViews: number;
            interactions: number;
            bounceRate: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        source: {
            medium: string;
            source: string;
            channel: "email" | "direct" | "social" | "organic" | "paid" | "referral";
            content?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
        };
        engagement: {
            sessionDuration: number;
            lastActive: Date;
            pageViews: number;
            interactions: number;
            bounceRate: number;
        };
        touchpoints: {
            type: "click" | "page_view" | "scroll" | "form_interaction" | "time_spent";
            timestamp: Date;
            page: string;
            value?: number | undefined;
            action?: string | undefined;
        }[];
        stage: "signup" | "onboarding" | "discovery" | "consideration" | "intent";
        intent: {
            scrollDepth: number;
            emailProvided: boolean;
            formStarted: boolean;
            timeOnSite: number;
            pageDepth: number;
            ctaClicks: number;
            returnVisitor: boolean;
        };
    }, {
        source: {
            medium: string;
            source: string;
            channel: "email" | "direct" | "social" | "organic" | "paid" | "referral";
            content?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
        };
        engagement: {
            sessionDuration: number;
            lastActive: Date;
            pageViews: number;
            interactions: number;
            bounceRate: number;
        };
        touchpoints: {
            type: "click" | "page_view" | "scroll" | "form_interaction" | "time_spent";
            timestamp: Date;
            page: string;
            value?: number | undefined;
            action?: string | undefined;
        }[];
        stage: "signup" | "onboarding" | "discovery" | "consideration" | "intent";
        intent: {
            scrollDepth: number;
            emailProvided: boolean;
            formStarted: boolean;
            timeOnSite: number;
            pageDepth: number;
            ctaClicks: number;
            returnVisitor: boolean;
        };
    }>;
    preferences: z.ZodObject<{
        theme: z.ZodEnum<["light", "dark", "system"]>;
        reducedMotion: z.ZodBoolean;
        language: z.ZodString;
        timezone: z.ZodString;
        cookieConsent: z.ZodBoolean;
        emailOptIn: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        language: string;
        theme: "light" | "dark" | "system";
        timezone: string;
        reducedMotion: boolean;
        cookieConsent: boolean;
        emailOptIn: boolean;
    }, {
        language: string;
        theme: "light" | "dark" | "system";
        timezone: string;
        reducedMotion: boolean;
        cookieConsent: boolean;
        emailOptIn: boolean;
    }>;
    metadata: z.ZodObject<{
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        version: z.ZodString;
        fingerprint: z.ZodString;
        device: z.ZodObject<{
            type: z.ZodEnum<["desktop", "mobile", "tablet"]>;
            os: z.ZodString;
            browser: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "desktop" | "tablet" | "mobile";
            os: string;
            browser: string;
        }, {
            type: "desktop" | "tablet" | "mobile";
            os: string;
            browser: string;
        }>;
        location: z.ZodObject<{
            country: z.ZodOptional<z.ZodString>;
            region: z.ZodOptional<z.ZodString>;
            timezone: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            timezone: string;
            region?: string | undefined;
            country?: string | undefined;
        }, {
            timezone: string;
            region?: string | undefined;
            country?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        createdAt: Date;
        updatedAt: Date;
        location: {
            timezone: string;
            region?: string | undefined;
            country?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            os: string;
            browser: string;
        };
        fingerprint: string;
    }, {
        version: string;
        createdAt: Date;
        updatedAt: Date;
        location: {
            timezone: string;
            region?: string | undefined;
            country?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            os: string;
            browser: string;
        };
        fingerprint: string;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    metadata: {
        version: string;
        createdAt: Date;
        updatedAt: Date;
        location: {
            timezone: string;
            region?: string | undefined;
            country?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            os: string;
            browser: string;
        };
        fingerprint: string;
    };
    sessionId: string;
    preferences: {
        language: string;
        theme: "light" | "dark" | "system";
        timezone: string;
        reducedMotion: boolean;
        cookieConsent: boolean;
        emailOptIn: boolean;
    };
    authentication: {
        isAuthenticated: boolean;
        userType: "onboarding" | "guest" | "returning" | "verified";
        loginStatus: "anonymous" | "identified" | "authenticated";
        campus?: {
            id: string;
            name: string;
            verified: boolean;
            domain: string;
        } | undefined;
    };
    personalization: {
        variant: "default" | "returning-user" | "campus-specific" | "high-intent";
        content: {
            ctaText: string;
            heroVariant: "bold" | "animated" | "minimal";
            messaging: "general" | "campus-focused" | "feature-focused";
        };
        targeting: {
            abTestVariants: Record<string, string>;
            cohort?: string | undefined;
            segment?: string | undefined;
        };
    };
    journey: {
        source: {
            medium: string;
            source: string;
            channel: "email" | "direct" | "social" | "organic" | "paid" | "referral";
            content?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
        };
        engagement: {
            sessionDuration: number;
            lastActive: Date;
            pageViews: number;
            interactions: number;
            bounceRate: number;
        };
        touchpoints: {
            type: "click" | "page_view" | "scroll" | "form_interaction" | "time_spent";
            timestamp: Date;
            page: string;
            value?: number | undefined;
            action?: string | undefined;
        }[];
        stage: "signup" | "onboarding" | "discovery" | "consideration" | "intent";
        intent: {
            scrollDepth: number;
            emailProvided: boolean;
            formStarted: boolean;
            timeOnSite: number;
            pageDepth: number;
            ctaClicks: number;
            returnVisitor: boolean;
        };
    };
}, {
    id: string;
    metadata: {
        version: string;
        createdAt: Date;
        updatedAt: Date;
        location: {
            timezone: string;
            region?: string | undefined;
            country?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            os: string;
            browser: string;
        };
        fingerprint: string;
    };
    sessionId: string;
    preferences: {
        language: string;
        theme: "light" | "dark" | "system";
        timezone: string;
        reducedMotion: boolean;
        cookieConsent: boolean;
        emailOptIn: boolean;
    };
    authentication: {
        isAuthenticated: boolean;
        userType: "onboarding" | "guest" | "returning" | "verified";
        loginStatus: "anonymous" | "identified" | "authenticated";
        campus?: {
            id: string;
            name: string;
            verified: boolean;
            domain: string;
        } | undefined;
    };
    personalization: {
        variant: "default" | "returning-user" | "campus-specific" | "high-intent";
        content: {
            ctaText: string;
            heroVariant: "bold" | "animated" | "minimal";
            messaging: "general" | "campus-focused" | "feature-focused";
        };
        targeting: {
            abTestVariants: Record<string, string>;
            cohort?: string | undefined;
            segment?: string | undefined;
        };
    };
    journey: {
        source: {
            medium: string;
            source: string;
            channel: "email" | "direct" | "social" | "organic" | "paid" | "referral";
            content?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
        };
        engagement: {
            sessionDuration: number;
            lastActive: Date;
            pageViews: number;
            interactions: number;
            bounceRate: number;
        };
        touchpoints: {
            type: "click" | "page_view" | "scroll" | "form_interaction" | "time_spent";
            timestamp: Date;
            page: string;
            value?: number | undefined;
            action?: string | undefined;
        }[];
        stage: "signup" | "onboarding" | "discovery" | "consideration" | "intent";
        intent: {
            scrollDepth: number;
            emailProvided: boolean;
            formStarted: boolean;
            timeOnSite: number;
            pageDepth: number;
            ctaClicks: number;
            returnVisitor: boolean;
        };
    };
}>;
export declare function validateLandingUserContext(context: unknown): LandingUserContext;
export declare function isValidLandingUserContext(context: unknown): context is LandingUserContext;
export declare function createGuestUserContext(sessionId: string): LandingUserContext;
export interface UserContextService {
    getContext(sessionId: string): Promise<LandingUserContext>;
    updateContext(sessionId: string, updates: Partial<LandingUserContext>): Promise<LandingUserContext>;
    trackTouchpoint(sessionId: string, touchpoint: TouchPoint): Promise<void>;
    updateIntent(sessionId: string, intent: Partial<IntentSignals>): Promise<void>;
    updateEngagement(sessionId: string, engagement: Partial<EngagementMetrics>): Promise<void>;
    personalizeContent(context: LandingUserContext): PersonalizationContext;
    determineJourneyStage(context: LandingUserContext): UserJourneyContext["stage"];
}
//# sourceMappingURL=user-context.d.ts.map