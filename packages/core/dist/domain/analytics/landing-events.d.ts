import { z } from "zod";
export interface BaseAnalyticsEvent {
    id: string;
    timestamp: Date;
    sessionId: string;
    userId?: string;
    event: string;
    category: EventCategory;
    properties: Record<string, any>;
    context: EventContext;
    metadata: EventMetadata;
}
export type EventCategory = "page_view" | "user_interaction" | "conversion" | "engagement" | "performance" | "error" | "system";
export interface EventContext {
    page: PageContext;
    user: UserContext;
    device: DeviceContext;
    campaign: CampaignContext;
    experiment: ExperimentContext;
}
export interface PageContext {
    url: string;
    path: string;
    title: string;
    referrer?: string;
    loadTime: number;
    scrollDepth: number;
    timeOnPage: number;
    exitPage: boolean;
}
export interface UserContext {
    isAuthenticated: boolean;
    userType: "guest" | "new" | "returning" | "verified";
    campus?: string;
    cohort?: string;
    abTestVariants: Record<string, string>;
}
export interface DeviceContext {
    type: "desktop" | "mobile" | "tablet";
    os: string;
    browser: string;
    viewport: {
        width: number;
        height: number;
    };
    connection: {
        type: "wifi" | "cellular" | "ethernet" | "unknown";
        speed: "slow" | "medium" | "fast";
    };
}
export interface CampaignContext {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
    gclid?: string;
}
export interface ExperimentContext {
    experiments: ExperimentVariant[];
}
export interface ExperimentVariant {
    id: string;
    name: string;
    variant: string;
    startDate: Date;
}
export interface EventMetadata {
    version: string;
    environment: "development" | "staging" | "production";
    buildId: string;
    region: string;
    processed: boolean;
    errors?: string[];
}
export interface LandingPageViewEvent extends BaseAnalyticsEvent {
    event: "landing_page_view";
    category: "page_view";
    properties: {
        variant: "default" | "animated" | "minimal" | "bold";
        heroVersion: string;
        loadTime: number;
        firstContentfulPaint: number;
        largestContentfulPaint: number;
        cumulativeLayoutShift: number;
        firstInputDelay: number;
        abTestVariant?: string;
    };
}
export interface HeroInteractionEvent extends BaseAnalyticsEvent {
    event: "hero_interaction";
    category: "user_interaction";
    properties: {
        interactionType: "hover" | "click" | "scroll" | "focus";
        element: "headline" | "cta" | "background" | "animation";
        position: {
            x: number;
            y: number;
        };
        timeFromLoad: number;
        scrollPosition: number;
    };
}
export interface CTAClickEvent extends BaseAnalyticsEvent {
    event: "cta_click";
    category: "conversion";
    properties: {
        ctaText: string;
        ctaVariant: "primary" | "secondary" | "outline" | "ghost";
        ctaSize: "sm" | "md" | "lg" | "xl";
        position: "hero" | "section" | "footer";
        timeFromLoad: number;
        scrollPosition: number;
        clickPosition: {
            x: number;
            y: number;
        };
        destination: string;
    };
}
export interface ScrollDepthEvent extends BaseAnalyticsEvent {
    event: "scroll_depth";
    category: "engagement";
    properties: {
        depth: number;
        maxDepth: number;
        timeToDepth: number;
        section: string;
        totalPageHeight: number;
        viewportHeight: number;
    };
}
export interface AnimationViewEvent extends BaseAnalyticsEvent {
    event: "animation_view";
    category: "engagement";
    properties: {
        animationType: "gradient_flow" | "scale_in" | "slide_up" | "fade_in";
        element: "headline" | "cta" | "background" | "section";
        duration: number;
        completed: boolean;
        interrupted: boolean;
        reducedMotion: boolean;
    };
}
export interface FormInteractionEvent extends BaseAnalyticsEvent {
    event: "form_interaction";
    category: "user_interaction";
    properties: {
        formType: "email_capture" | "waitlist" | "contact" | "newsletter";
        action: "focus" | "input" | "submit" | "error" | "success";
        field?: string;
        errorType?: string;
        timeToComplete?: number;
        attempts?: number;
    };
}
export interface ConversionEvent extends BaseAnalyticsEvent {
    event: "conversion";
    category: "conversion";
    properties: {
        conversionType: "email_capture" | "signup_start" | "signup_complete" | "campus_select";
        value?: number;
        currency?: string;
        funnel: {
            step: number;
            totalSteps: number;
            stepName: string;
        };
        timeToConvert: number;
        touchpoints: TouchPoint[];
    };
}
export interface TouchPoint {
    timestamp: Date;
    event: string;
    source: string;
    medium: string;
}
export interface PerformanceEvent extends BaseAnalyticsEvent {
    event: "performance_metric";
    category: "performance";
    properties: {
        metricType: "web_vital" | "custom" | "network" | "rendering";
        name: string;
        value: number;
        unit: string;
        threshold?: {
            good: number;
            poor: number;
        };
        rating: "good" | "needs-improvement" | "poor";
    };
}
export interface ErrorEvent extends BaseAnalyticsEvent {
    event: "error";
    category: "error";
    properties: {
        errorType: "javascript" | "network" | "rendering" | "validation";
        message: string;
        stack?: string;
        source: string;
        line?: number;
        column?: number;
        severity: "low" | "medium" | "high" | "critical";
        recoverable: boolean;
    };
}
export declare const eventContextSchema: z.ZodObject<{
    page: z.ZodObject<{
        url: z.ZodString;
        path: z.ZodString;
        title: z.ZodString;
        referrer: z.ZodOptional<z.ZodString>;
        loadTime: z.ZodNumber;
        scrollDepth: z.ZodNumber;
        timeOnPage: z.ZodNumber;
        exitPage: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        path: string;
        url: string;
        title: string;
        loadTime: number;
        scrollDepth: number;
        timeOnPage: number;
        exitPage: boolean;
        referrer?: string | undefined;
    }, {
        path: string;
        url: string;
        title: string;
        loadTime: number;
        scrollDepth: number;
        timeOnPage: number;
        exitPage: boolean;
        referrer?: string | undefined;
    }>;
    user: z.ZodObject<{
        isAuthenticated: z.ZodBoolean;
        userType: z.ZodEnum<["guest", "new", "returning", "verified"]>;
        campus: z.ZodOptional<z.ZodString>;
        cohort: z.ZodOptional<z.ZodString>;
        abTestVariants: z.ZodRecord<z.ZodString, z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        isAuthenticated: boolean;
        userType: "guest" | "new" | "returning" | "verified";
        abTestVariants: Record<string, string>;
        campus?: string | undefined;
        cohort?: string | undefined;
    }, {
        isAuthenticated: boolean;
        userType: "guest" | "new" | "returning" | "verified";
        abTestVariants: Record<string, string>;
        campus?: string | undefined;
        cohort?: string | undefined;
    }>;
    device: z.ZodObject<{
        type: z.ZodEnum<["desktop", "mobile", "tablet"]>;
        os: z.ZodString;
        browser: z.ZodString;
        viewport: z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>;
        connection: z.ZodObject<{
            type: z.ZodEnum<["wifi", "cellular", "ethernet", "unknown"]>;
            speed: z.ZodEnum<["slow", "medium", "fast"]>;
        }, "strip", z.ZodTypeAny, {
            type: "unknown" | "wifi" | "cellular" | "ethernet";
            speed: "medium" | "slow" | "fast";
        }, {
            type: "unknown" | "wifi" | "cellular" | "ethernet";
            speed: "medium" | "slow" | "fast";
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "desktop" | "tablet" | "mobile";
        viewport: {
            width: number;
            height: number;
        };
        os: string;
        browser: string;
        connection: {
            type: "unknown" | "wifi" | "cellular" | "ethernet";
            speed: "medium" | "slow" | "fast";
        };
    }, {
        type: "desktop" | "tablet" | "mobile";
        viewport: {
            width: number;
            height: number;
        };
        os: string;
        browser: string;
        connection: {
            type: "unknown" | "wifi" | "cellular" | "ethernet";
            speed: "medium" | "slow" | "fast";
        };
    }>;
    campaign: z.ZodObject<{
        source: z.ZodOptional<z.ZodString>;
        medium: z.ZodOptional<z.ZodString>;
        campaign: z.ZodOptional<z.ZodString>;
        term: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
        gclid: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        medium?: string | undefined;
        content?: string | undefined;
        source?: string | undefined;
        campaign?: string | undefined;
        term?: string | undefined;
        gclid?: string | undefined;
    }, {
        medium?: string | undefined;
        content?: string | undefined;
        source?: string | undefined;
        campaign?: string | undefined;
        term?: string | undefined;
        gclid?: string | undefined;
    }>;
    experiment: z.ZodObject<{
        experiments: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            variant: z.ZodString;
            startDate: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            id: string;
            variant: string;
            name: string;
            startDate: Date;
        }, {
            id: string;
            variant: string;
            name: string;
            startDate: Date;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        experiments: {
            id: string;
            variant: string;
            name: string;
            startDate: Date;
        }[];
    }, {
        experiments: {
            id: string;
            variant: string;
            name: string;
            startDate: Date;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    user: {
        isAuthenticated: boolean;
        userType: "guest" | "new" | "returning" | "verified";
        abTestVariants: Record<string, string>;
        campus?: string | undefined;
        cohort?: string | undefined;
    };
    device: {
        type: "desktop" | "tablet" | "mobile";
        viewport: {
            width: number;
            height: number;
        };
        os: string;
        browser: string;
        connection: {
            type: "unknown" | "wifi" | "cellular" | "ethernet";
            speed: "medium" | "slow" | "fast";
        };
    };
    campaign: {
        medium?: string | undefined;
        content?: string | undefined;
        source?: string | undefined;
        campaign?: string | undefined;
        term?: string | undefined;
        gclid?: string | undefined;
    };
    page: {
        path: string;
        url: string;
        title: string;
        loadTime: number;
        scrollDepth: number;
        timeOnPage: number;
        exitPage: boolean;
        referrer?: string | undefined;
    };
    experiment: {
        experiments: {
            id: string;
            variant: string;
            name: string;
            startDate: Date;
        }[];
    };
}, {
    user: {
        isAuthenticated: boolean;
        userType: "guest" | "new" | "returning" | "verified";
        abTestVariants: Record<string, string>;
        campus?: string | undefined;
        cohort?: string | undefined;
    };
    device: {
        type: "desktop" | "tablet" | "mobile";
        viewport: {
            width: number;
            height: number;
        };
        os: string;
        browser: string;
        connection: {
            type: "unknown" | "wifi" | "cellular" | "ethernet";
            speed: "medium" | "slow" | "fast";
        };
    };
    campaign: {
        medium?: string | undefined;
        content?: string | undefined;
        source?: string | undefined;
        campaign?: string | undefined;
        term?: string | undefined;
        gclid?: string | undefined;
    };
    page: {
        path: string;
        url: string;
        title: string;
        loadTime: number;
        scrollDepth: number;
        timeOnPage: number;
        exitPage: boolean;
        referrer?: string | undefined;
    };
    experiment: {
        experiments: {
            id: string;
            variant: string;
            name: string;
            startDate: Date;
        }[];
    };
}>;
export declare const baseAnalyticsEventSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodDate;
    sessionId: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
    event: z.ZodString;
    category: z.ZodEnum<["page_view", "user_interaction", "conversion", "engagement", "performance", "error", "system"]>;
    properties: z.ZodRecord<z.ZodString, z.ZodAny>;
    context: z.ZodObject<{
        page: z.ZodObject<{
            url: z.ZodString;
            path: z.ZodString;
            title: z.ZodString;
            referrer: z.ZodOptional<z.ZodString>;
            loadTime: z.ZodNumber;
            scrollDepth: z.ZodNumber;
            timeOnPage: z.ZodNumber;
            exitPage: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        }, {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        }>;
        user: z.ZodObject<{
            isAuthenticated: z.ZodBoolean;
            userType: z.ZodEnum<["guest", "new", "returning", "verified"]>;
            campus: z.ZodOptional<z.ZodString>;
            cohort: z.ZodOptional<z.ZodString>;
            abTestVariants: z.ZodRecord<z.ZodString, z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        }, {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        }>;
        device: z.ZodObject<{
            type: z.ZodEnum<["desktop", "mobile", "tablet"]>;
            os: z.ZodString;
            browser: z.ZodString;
            viewport: z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>;
            connection: z.ZodObject<{
                type: z.ZodEnum<["wifi", "cellular", "ethernet", "unknown"]>;
                speed: z.ZodEnum<["slow", "medium", "fast"]>;
            }, "strip", z.ZodTypeAny, {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            }, {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        }, {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        }>;
        campaign: z.ZodObject<{
            source: z.ZodOptional<z.ZodString>;
            medium: z.ZodOptional<z.ZodString>;
            campaign: z.ZodOptional<z.ZodString>;
            term: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
            gclid: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        }, {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        }>;
        experiment: z.ZodObject<{
            experiments: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                variant: z.ZodString;
                startDate: z.ZodDate;
            }, "strip", z.ZodTypeAny, {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }, {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        }, {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    }, {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    }>;
    metadata: z.ZodObject<{
        version: z.ZodString;
        environment: z.ZodEnum<["development", "staging", "production"]>;
        buildId: z.ZodString;
        region: z.ZodString;
        processed: z.ZodBoolean;
        errors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    }, {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    event: string;
    category: "system" | "page_view" | "user_interaction" | "conversion" | "engagement" | "performance" | "error";
    metadata: {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    };
    sessionId: string;
    timestamp: Date;
    properties: Record<string, any>;
    context: {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    };
    userId?: string | undefined;
}, {
    id: string;
    event: string;
    category: "system" | "page_view" | "user_interaction" | "conversion" | "engagement" | "performance" | "error";
    metadata: {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    };
    sessionId: string;
    timestamp: Date;
    properties: Record<string, any>;
    context: {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    };
    userId?: string | undefined;
}>;
export declare const landingPageViewEventSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodDate;
    sessionId: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
    context: z.ZodObject<{
        page: z.ZodObject<{
            url: z.ZodString;
            path: z.ZodString;
            title: z.ZodString;
            referrer: z.ZodOptional<z.ZodString>;
            loadTime: z.ZodNumber;
            scrollDepth: z.ZodNumber;
            timeOnPage: z.ZodNumber;
            exitPage: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        }, {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        }>;
        user: z.ZodObject<{
            isAuthenticated: z.ZodBoolean;
            userType: z.ZodEnum<["guest", "new", "returning", "verified"]>;
            campus: z.ZodOptional<z.ZodString>;
            cohort: z.ZodOptional<z.ZodString>;
            abTestVariants: z.ZodRecord<z.ZodString, z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        }, {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        }>;
        device: z.ZodObject<{
            type: z.ZodEnum<["desktop", "mobile", "tablet"]>;
            os: z.ZodString;
            browser: z.ZodString;
            viewport: z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>;
            connection: z.ZodObject<{
                type: z.ZodEnum<["wifi", "cellular", "ethernet", "unknown"]>;
                speed: z.ZodEnum<["slow", "medium", "fast"]>;
            }, "strip", z.ZodTypeAny, {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            }, {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        }, {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        }>;
        campaign: z.ZodObject<{
            source: z.ZodOptional<z.ZodString>;
            medium: z.ZodOptional<z.ZodString>;
            campaign: z.ZodOptional<z.ZodString>;
            term: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
            gclid: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        }, {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        }>;
        experiment: z.ZodObject<{
            experiments: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                variant: z.ZodString;
                startDate: z.ZodDate;
            }, "strip", z.ZodTypeAny, {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }, {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        }, {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    }, {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    }>;
    metadata: z.ZodObject<{
        version: z.ZodString;
        environment: z.ZodEnum<["development", "staging", "production"]>;
        buildId: z.ZodString;
        region: z.ZodString;
        processed: z.ZodBoolean;
        errors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    }, {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    }>;
} & {
    event: z.ZodLiteral<"landing_page_view">;
    category: z.ZodLiteral<"page_view">;
    properties: z.ZodObject<{
        variant: z.ZodEnum<["default", "animated", "minimal", "bold"]>;
        heroVersion: z.ZodString;
        loadTime: z.ZodNumber;
        firstContentfulPaint: z.ZodNumber;
        largestContentfulPaint: z.ZodNumber;
        cumulativeLayoutShift: z.ZodNumber;
        firstInputDelay: z.ZodNumber;
        abTestVariant: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        variant: "bold" | "default" | "animated" | "minimal";
        loadTime: number;
        heroVersion: string;
        firstContentfulPaint: number;
        largestContentfulPaint: number;
        cumulativeLayoutShift: number;
        firstInputDelay: number;
        abTestVariant?: string | undefined;
    }, {
        variant: "bold" | "default" | "animated" | "minimal";
        loadTime: number;
        heroVersion: string;
        firstContentfulPaint: number;
        largestContentfulPaint: number;
        cumulativeLayoutShift: number;
        firstInputDelay: number;
        abTestVariant?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    event: "landing_page_view";
    category: "page_view";
    metadata: {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    };
    sessionId: string;
    timestamp: Date;
    properties: {
        variant: "bold" | "default" | "animated" | "minimal";
        loadTime: number;
        heroVersion: string;
        firstContentfulPaint: number;
        largestContentfulPaint: number;
        cumulativeLayoutShift: number;
        firstInputDelay: number;
        abTestVariant?: string | undefined;
    };
    context: {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    };
    userId?: string | undefined;
}, {
    id: string;
    event: "landing_page_view";
    category: "page_view";
    metadata: {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    };
    sessionId: string;
    timestamp: Date;
    properties: {
        variant: "bold" | "default" | "animated" | "minimal";
        loadTime: number;
        heroVersion: string;
        firstContentfulPaint: number;
        largestContentfulPaint: number;
        cumulativeLayoutShift: number;
        firstInputDelay: number;
        abTestVariant?: string | undefined;
    };
    context: {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    };
    userId?: string | undefined;
}>;
export declare const ctaClickEventSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodDate;
    sessionId: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
    context: z.ZodObject<{
        page: z.ZodObject<{
            url: z.ZodString;
            path: z.ZodString;
            title: z.ZodString;
            referrer: z.ZodOptional<z.ZodString>;
            loadTime: z.ZodNumber;
            scrollDepth: z.ZodNumber;
            timeOnPage: z.ZodNumber;
            exitPage: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        }, {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        }>;
        user: z.ZodObject<{
            isAuthenticated: z.ZodBoolean;
            userType: z.ZodEnum<["guest", "new", "returning", "verified"]>;
            campus: z.ZodOptional<z.ZodString>;
            cohort: z.ZodOptional<z.ZodString>;
            abTestVariants: z.ZodRecord<z.ZodString, z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        }, {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        }>;
        device: z.ZodObject<{
            type: z.ZodEnum<["desktop", "mobile", "tablet"]>;
            os: z.ZodString;
            browser: z.ZodString;
            viewport: z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>;
            connection: z.ZodObject<{
                type: z.ZodEnum<["wifi", "cellular", "ethernet", "unknown"]>;
                speed: z.ZodEnum<["slow", "medium", "fast"]>;
            }, "strip", z.ZodTypeAny, {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            }, {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        }, {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        }>;
        campaign: z.ZodObject<{
            source: z.ZodOptional<z.ZodString>;
            medium: z.ZodOptional<z.ZodString>;
            campaign: z.ZodOptional<z.ZodString>;
            term: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
            gclid: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        }, {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        }>;
        experiment: z.ZodObject<{
            experiments: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                variant: z.ZodString;
                startDate: z.ZodDate;
            }, "strip", z.ZodTypeAny, {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }, {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        }, {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    }, {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    }>;
    metadata: z.ZodObject<{
        version: z.ZodString;
        environment: z.ZodEnum<["development", "staging", "production"]>;
        buildId: z.ZodString;
        region: z.ZodString;
        processed: z.ZodBoolean;
        errors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    }, {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    }>;
} & {
    event: z.ZodLiteral<"cta_click">;
    category: z.ZodLiteral<"conversion">;
    properties: z.ZodObject<{
        ctaText: z.ZodString;
        ctaVariant: z.ZodEnum<["primary", "secondary", "outline", "ghost"]>;
        ctaSize: z.ZodEnum<["sm", "md", "lg", "xl"]>;
        position: z.ZodEnum<["hero", "section", "footer"]>;
        timeFromLoad: z.ZodNumber;
        scrollPosition: z.ZodNumber;
        clickPosition: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>;
        destination: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        position: "section" | "hero" | "footer";
        scrollPosition: number;
        ctaText: string;
        ctaVariant: "primary" | "secondary" | "outline" | "ghost";
        ctaSize: "sm" | "lg" | "xl" | "md";
        timeFromLoad: number;
        clickPosition: {
            x: number;
            y: number;
        };
        destination: string;
    }, {
        position: "section" | "hero" | "footer";
        scrollPosition: number;
        ctaText: string;
        ctaVariant: "primary" | "secondary" | "outline" | "ghost";
        ctaSize: "sm" | "lg" | "xl" | "md";
        timeFromLoad: number;
        clickPosition: {
            x: number;
            y: number;
        };
        destination: string;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    event: "cta_click";
    category: "conversion";
    metadata: {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    };
    sessionId: string;
    timestamp: Date;
    properties: {
        position: "section" | "hero" | "footer";
        scrollPosition: number;
        ctaText: string;
        ctaVariant: "primary" | "secondary" | "outline" | "ghost";
        ctaSize: "sm" | "lg" | "xl" | "md";
        timeFromLoad: number;
        clickPosition: {
            x: number;
            y: number;
        };
        destination: string;
    };
    context: {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    };
    userId?: string | undefined;
}, {
    id: string;
    event: "cta_click";
    category: "conversion";
    metadata: {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    };
    sessionId: string;
    timestamp: Date;
    properties: {
        position: "section" | "hero" | "footer";
        scrollPosition: number;
        ctaText: string;
        ctaVariant: "primary" | "secondary" | "outline" | "ghost";
        ctaSize: "sm" | "lg" | "xl" | "md";
        timeFromLoad: number;
        clickPosition: {
            x: number;
            y: number;
        };
        destination: string;
    };
    context: {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    };
    userId?: string | undefined;
}>;
export declare const conversionEventSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodDate;
    sessionId: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
    context: z.ZodObject<{
        page: z.ZodObject<{
            url: z.ZodString;
            path: z.ZodString;
            title: z.ZodString;
            referrer: z.ZodOptional<z.ZodString>;
            loadTime: z.ZodNumber;
            scrollDepth: z.ZodNumber;
            timeOnPage: z.ZodNumber;
            exitPage: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        }, {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        }>;
        user: z.ZodObject<{
            isAuthenticated: z.ZodBoolean;
            userType: z.ZodEnum<["guest", "new", "returning", "verified"]>;
            campus: z.ZodOptional<z.ZodString>;
            cohort: z.ZodOptional<z.ZodString>;
            abTestVariants: z.ZodRecord<z.ZodString, z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        }, {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        }>;
        device: z.ZodObject<{
            type: z.ZodEnum<["desktop", "mobile", "tablet"]>;
            os: z.ZodString;
            browser: z.ZodString;
            viewport: z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>;
            connection: z.ZodObject<{
                type: z.ZodEnum<["wifi", "cellular", "ethernet", "unknown"]>;
                speed: z.ZodEnum<["slow", "medium", "fast"]>;
            }, "strip", z.ZodTypeAny, {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            }, {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        }, {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        }>;
        campaign: z.ZodObject<{
            source: z.ZodOptional<z.ZodString>;
            medium: z.ZodOptional<z.ZodString>;
            campaign: z.ZodOptional<z.ZodString>;
            term: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
            gclid: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        }, {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        }>;
        experiment: z.ZodObject<{
            experiments: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                variant: z.ZodString;
                startDate: z.ZodDate;
            }, "strip", z.ZodTypeAny, {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }, {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        }, {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    }, {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    }>;
    metadata: z.ZodObject<{
        version: z.ZodString;
        environment: z.ZodEnum<["development", "staging", "production"]>;
        buildId: z.ZodString;
        region: z.ZodString;
        processed: z.ZodBoolean;
        errors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    }, {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    }>;
} & {
    event: z.ZodLiteral<"conversion">;
    category: z.ZodLiteral<"conversion">;
    properties: z.ZodObject<{
        conversionType: z.ZodEnum<["email_capture", "signup_start", "signup_complete", "campus_select"]>;
        value: z.ZodOptional<z.ZodNumber>;
        currency: z.ZodOptional<z.ZodString>;
        funnel: z.ZodObject<{
            step: z.ZodNumber;
            totalSteps: z.ZodNumber;
            stepName: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            stepName: string;
            step: number;
            totalSteps: number;
        }, {
            stepName: string;
            step: number;
            totalSteps: number;
        }>;
        timeToConvert: z.ZodNumber;
        touchpoints: z.ZodArray<z.ZodObject<{
            timestamp: z.ZodDate;
            event: z.ZodString;
            source: z.ZodString;
            medium: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            medium: string;
            event: string;
            timestamp: Date;
            source: string;
        }, {
            medium: string;
            event: string;
            timestamp: Date;
            source: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        conversionType: "email_capture" | "signup_start" | "signup_complete" | "campus_select";
        funnel: {
            stepName: string;
            step: number;
            totalSteps: number;
        };
        timeToConvert: number;
        touchpoints: {
            medium: string;
            event: string;
            timestamp: Date;
            source: string;
        }[];
        value?: number | undefined;
        currency?: string | undefined;
    }, {
        conversionType: "email_capture" | "signup_start" | "signup_complete" | "campus_select";
        funnel: {
            stepName: string;
            step: number;
            totalSteps: number;
        };
        timeToConvert: number;
        touchpoints: {
            medium: string;
            event: string;
            timestamp: Date;
            source: string;
        }[];
        value?: number | undefined;
        currency?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    event: "conversion";
    category: "conversion";
    metadata: {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    };
    sessionId: string;
    timestamp: Date;
    properties: {
        conversionType: "email_capture" | "signup_start" | "signup_complete" | "campus_select";
        funnel: {
            stepName: string;
            step: number;
            totalSteps: number;
        };
        timeToConvert: number;
        touchpoints: {
            medium: string;
            event: string;
            timestamp: Date;
            source: string;
        }[];
        value?: number | undefined;
        currency?: string | undefined;
    };
    context: {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    };
    userId?: string | undefined;
}, {
    id: string;
    event: "conversion";
    category: "conversion";
    metadata: {
        version: string;
        environment: "development" | "staging" | "production";
        buildId: string;
        region: string;
        processed: boolean;
        errors?: string[] | undefined;
    };
    sessionId: string;
    timestamp: Date;
    properties: {
        conversionType: "email_capture" | "signup_start" | "signup_complete" | "campus_select";
        funnel: {
            stepName: string;
            step: number;
            totalSteps: number;
        };
        timeToConvert: number;
        touchpoints: {
            medium: string;
            event: string;
            timestamp: Date;
            source: string;
        }[];
        value?: number | undefined;
        currency?: string | undefined;
    };
    context: {
        user: {
            isAuthenticated: boolean;
            userType: "guest" | "new" | "returning" | "verified";
            abTestVariants: Record<string, string>;
            campus?: string | undefined;
            cohort?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            viewport: {
                width: number;
                height: number;
            };
            os: string;
            browser: string;
            connection: {
                type: "unknown" | "wifi" | "cellular" | "ethernet";
                speed: "medium" | "slow" | "fast";
            };
        };
        campaign: {
            medium?: string | undefined;
            content?: string | undefined;
            source?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            gclid?: string | undefined;
        };
        page: {
            path: string;
            url: string;
            title: string;
            loadTime: number;
            scrollDepth: number;
            timeOnPage: number;
            exitPage: boolean;
            referrer?: string | undefined;
        };
        experiment: {
            experiments: {
                id: string;
                variant: string;
                name: string;
                startDate: Date;
            }[];
        };
    };
    userId?: string | undefined;
}>;
export declare function validateAnalyticsEvent(event: unknown): BaseAnalyticsEvent;
export declare function isValidAnalyticsEvent(event: unknown): event is BaseAnalyticsEvent;
export declare function createLandingPageViewEvent(sessionId: string, properties: LandingPageViewEvent["properties"], context: EventContext): LandingPageViewEvent;
export declare function createCTAClickEvent(sessionId: string, properties: CTAClickEvent["properties"], context: EventContext, userId?: string): CTAClickEvent;
export declare function createScrollDepthEvent(sessionId: string, properties: ScrollDepthEvent["properties"], context: EventContext, userId?: string): ScrollDepthEvent;
export interface LandingAnalyticsService {
    trackPageView(event: LandingPageViewEvent): Promise<void>;
    trackCTAClick(event: CTAClickEvent): Promise<void>;
    trackScrollDepth(event: ScrollDepthEvent): Promise<void>;
    trackAnimation(event: AnimationViewEvent): Promise<void>;
    trackFormInteraction(event: FormInteractionEvent): Promise<void>;
    trackConversion(event: ConversionEvent): Promise<void>;
    trackPerformance(event: PerformanceEvent): Promise<void>;
    trackError(event: ErrorEvent): Promise<void>;
    trackBatch(events: BaseAnalyticsEvent[]): Promise<void>;
    getConversionFunnel(timeRange: DateRange): Promise<FunnelAnalysis>;
    getPerformanceMetrics(timeRange: DateRange): Promise<PerformanceReport>;
    getABTestResults(experimentId: string): Promise<ABTestResults>;
}
export interface DateRange {
    start: Date;
    end: Date;
}
export interface FunnelAnalysis {
    steps: FunnelStep[];
    totalConversions: number;
    conversionRate: number;
    dropOffPoints: DropOffPoint[];
}
export interface FunnelStep {
    step: number;
    name: string;
    users: number;
    conversionRate: number;
    averageTime: number;
}
export interface DropOffPoint {
    step: number;
    dropOffRate: number;
    commonExitPages: string[];
    reasons: string[];
}
export interface PerformanceReport {
    webVitals: WebVitalsReport;
    loadTimes: LoadTimeReport;
    errorRates: ErrorRateReport;
    userExperience: UserExperienceReport;
}
export interface WebVitalsReport {
    firstContentfulPaint: MetricSummary;
    largestContentfulPaint: MetricSummary;
    firstInputDelay: MetricSummary;
    cumulativeLayoutShift: MetricSummary;
    timeToInteractive: MetricSummary;
}
export interface MetricSummary {
    p50: number;
    p75: number;
    p90: number;
    p95: number;
    p99: number;
    average: number;
    count: number;
}
export interface LoadTimeReport {
    pageLoad: MetricSummary;
    domReady: MetricSummary;
    firstByte: MetricSummary;
    resourceLoad: MetricSummary;
}
export interface ErrorRateReport {
    javascript: number;
    network: number;
    rendering: number;
    total: number;
    byPage: Record<string, number>;
}
export interface UserExperienceReport {
    bounceRate: number;
    averageSessionDuration: number;
    pagesPerSession: number;
    conversionRate: number;
    userSatisfactionScore: number;
}
export interface ABTestResults {
    experimentId: string;
    name: string;
    status: "running" | "completed" | "paused";
    variants: ABTestVariantResults[];
    statisticalSignificance: number;
    winner?: string;
    recommendation: string;
}
export interface ABTestVariantResults {
    variant: string;
    users: number;
    conversions: number;
    conversionRate: number;
    confidence: number;
    lift: number;
}
export interface EventAggregation {
    timeframe: "hour" | "day" | "week" | "month";
    metrics: AggregatedMetric[];
    dimensions: string[];
    filters: EventFilter[];
}
export interface AggregatedMetric {
    name: string;
    value: number;
    change: number;
    changePercent: number;
    previousValue: number;
}
export interface EventFilter {
    field: string;
    operator: "equals" | "not_equals" | "contains" | "greater_than" | "less_than" | "in" | "not_in";
    value: any;
}
//# sourceMappingURL=landing-events.d.ts.map