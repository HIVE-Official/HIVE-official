"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroABTestSchema = exports.heroContentSchema = exports.heroMetadataSchema = exports.heroBackgroundSchema = exports.heroCtaSchema = exports.heroHeadlineSchema = exports.heroVariantSchema = void 0;
exports.validateHeroContent = validateHeroContent;
exports.isValidHeroContent = isValidHeroContent;
exports.createDefaultHeroContent = createDefaultHeroContent;
exports.createAnimatedHeroVariant = createAnimatedHeroVariant;
exports.createMinimalHeroVariant = createMinimalHeroVariant;
const zod_1 = require("zod");
// Zod Validation Schemas
exports.heroVariantSchema = zod_1.z.object({
    type: zod_1.z.enum(["default", "animated", "minimal", "bold"]),
    theme: zod_1.z.enum(["dark", "light", "auto"]),
    layout: zod_1.z.enum(["centered", "left-aligned", "full-width"]),
});
exports.heroHeadlineSchema = zod_1.z.object({
    text: zod_1.z.string().min(1).max(200),
    animated: zod_1.z
        .object({
        enabled: zod_1.z.boolean(),
        rotatingWords: zod_1.z.array(zod_1.z.string()).optional(),
        intervalMs: zod_1.z.number().min(500).max(10000).optional(),
    })
        .optional(),
    typography: zod_1.z.object({
        size: zod_1.z.enum(["lg", "xl", "2xl", "3xl", "4xl"]),
        weight: zod_1.z.enum(["normal", "medium", "semibold", "bold", "black"]),
        gradient: zod_1.z
            .object({
            enabled: zod_1.z.boolean(),
            colors: zod_1.z.array(zod_1.z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)),
            animation: zod_1.z.enum(["flow", "pulse", "static"]).optional(),
        })
            .optional(),
    }),
});
exports.heroCtaSchema = zod_1.z.object({
    text: zod_1.z.string().min(1).max(50),
    variant: zod_1.z.enum(["primary", "secondary", "outline", "ghost"]),
    size: zod_1.z.enum(["sm", "md", "lg", "xl"]),
    action: zod_1.z.object({
        type: zod_1.z.enum(["navigate", "scroll", "modal", "external"]),
        target: zod_1.z.string().min(1),
        analytics: zod_1.z
            .object({
            event: zod_1.z.string(),
            properties: zod_1.z.record(zod_1.z.unknown()).optional(),
        })
            .optional(),
    }),
    states: zod_1.z.object({
        loading: zod_1.z.boolean().optional(),
        disabled: zod_1.z.boolean().optional(),
        success: zod_1.z.boolean().optional(),
    }),
});
exports.heroBackgroundSchema = zod_1.z.object({
    type: zod_1.z.enum(["solid", "gradient", "image", "video", "animated"]),
    value: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]),
    overlay: zod_1.z
        .object({
        enabled: zod_1.z.boolean(),
        color: zod_1.z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
        opacity: zod_1.z.number().min(0).max(1),
    })
        .optional(),
    animation: zod_1.z
        .object({
        enabled: zod_1.z.boolean(),
        type: zod_1.z.enum(["pulse", "flow", "particles", "geometric"]),
        duration: zod_1.z.number().min(1000).max(30000),
        easing: zod_1.z.string(),
    })
        .optional(),
});
exports.heroMetadataSchema = zod_1.z.object({
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    version: zod_1.z.string().regex(/^\d+\.\d+\.\d+$/),
    author: zod_1.z.string().min(1),
    tags: zod_1.z.array(zod_1.z.string()),
    abTest: zod_1.z
        .object({
        enabled: zod_1.z.boolean(),
        variant: zod_1.z.string(),
        percentage: zod_1.z.number().min(0).max(100),
    })
        .optional(),
    analytics: zod_1.z.object({
        impressions: zod_1.z.number().min(0),
        clicks: zod_1.z.number().min(0),
        conversionRate: zod_1.z.number().min(0).max(1),
    }),
});
exports.heroContentSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    variant: exports.heroVariantSchema,
    headline: exports.heroHeadlineSchema,
    subline: zod_1.z.string().max(300).optional(),
    cta: exports.heroCtaSchema,
    background: exports.heroBackgroundSchema,
    metadata: exports.heroMetadataSchema,
}).strict();
// Content Validation Functions
function validateHeroContent(content) {
    const result = exports.heroContentSchema.safeParse(content);
    if (!result.success) {
        throw new Error(`Invalid hero content: ${result.error.message}`);
    }
    return result.data;
}
function isValidHeroContent(content) {
    return exports.heroContentSchema.safeParse(content).success;
}
// Default Hero Content Factory
function createDefaultHeroContent() {
    return {
        id: crypto.randomUUID(),
        variant: {
            type: "animated",
            theme: "dark",
            layout: "centered",
        },
        headline: {
            text: "HIVE",
            animated: {
                enabled: false,
                rotatingWords: [
                    "campus",
                    "events",
                    "spaces",
                    "clubs",
                    "parties",
                    "feed",
                ],
                intervalMs: 2200,
            },
            typography: {
                size: "4xl",
                weight: "black",
                gradient: {
                    enabled: true,
                    colors: ["#ffffff", "#FFD700", "#0A0A0A", "#FFD700", "#ffffff"],
                    animation: "flow",
                },
            },
        },
        subline: "Real-time campus community",
        cta: {
            text: "Join now",
            variant: "primary",
            size: "lg",
            action: {
                type: "navigate",
                target: "/campus",
                analytics: {
                    event: "hero_cta_click",
                    properties: {
                        source: "landing_hero",
                        variant: "animated",
                    },
                },
            },
            states: {
                loading: false,
                disabled: false,
                success: false,
            },
        },
        background: {
            type: "solid",
            value: "#0A0A0A",
            overlay: {
                enabled: false,
                color: "#000000",
                opacity: 0.5,
            },
            animation: {
                enabled: false,
                type: "pulse",
                duration: 4000,
                easing: "ease-in-out",
            },
        },
        metadata: {
            createdAt: new Date(),
            updatedAt: new Date(),
            version: "1.0.0",
            author: "HIVE Design System",
            tags: ["hero", "landing", "animated", "brand"],
            abTest: {
                enabled: false,
                variant: "default",
                percentage: 100,
            },
            analytics: {
                impressions: 0,
                clicks: 0,
                conversionRate: 0,
            },
        },
    };
}
// Content Variant Helpers
function createAnimatedHeroVariant(rotatingWords) {
    return {
        id: crypto.randomUUID(),
        variant: {
            type: "animated",
            theme: "dark",
            layout: "centered",
        },
        headline: {
            text: "HIVE",
            animated: {
                enabled: true,
                rotatingWords,
                intervalMs: 2200,
            },
            typography: {
                size: "4xl",
                weight: "black",
                gradient: {
                    enabled: true,
                    colors: ["#ffffff", "#FFD700", "#0A0A0A", "#FFD700", "#ffffff"],
                    animation: "flow",
                },
            },
        },
        subline: "Real-time campus community",
        cta: {
            text: "Join now",
            variant: "primary",
            size: "lg",
            action: {
                type: "navigate",
                target: "/campus",
                analytics: {
                    event: "hero_cta_click",
                    properties: {
                        source: "landing_hero",
                        variant: "animated",
                    },
                },
            },
            states: {
                loading: false,
                disabled: false,
                success: false,
            },
        },
        background: {
            type: "gradient",
            value: ["#0A0A0A", "#1A1A1A"],
            overlay: {
                enabled: true,
                color: "#000000",
                opacity: 0.5,
            },
            animation: {
                enabled: true,
                type: "flow",
                duration: 4000,
                easing: "ease-in-out",
            },
        },
        metadata: {
            createdAt: new Date(),
            updatedAt: new Date(),
            version: "1.0.0",
            author: "system",
            tags: ["animated", "landing"],
            analytics: {
                impressions: 0,
                clicks: 0,
                conversionRate: 0,
            },
        },
    };
}
function createMinimalHeroVariant() {
    return {
        id: crypto.randomUUID(),
        variant: {
            type: "minimal",
            theme: "light",
            layout: "left-aligned",
        },
        headline: {
            text: "HIVE Campus",
            typography: {
                size: "2xl",
                weight: "bold",
                gradient: {
                    enabled: false,
                    colors: ["#000000"],
                    animation: "static",
                },
            },
        },
        subline: "Join your campus community",
        cta: {
            text: "Get Started",
            variant: "primary",
            size: "md",
            action: {
                type: "navigate",
                target: "/onboarding",
                analytics: {
                    event: "hero_cta_click",
                    properties: {
                        source: "landing_hero",
                        variant: "minimal",
                    },
                },
            },
            states: {
                loading: false,
                disabled: false,
                success: false,
            },
        },
        background: {
            type: "solid",
            value: "#ffffff",
            overlay: {
                enabled: false,
                color: "#000000",
                opacity: 0,
            },
            animation: {
                enabled: false,
                type: "pulse",
                duration: 2000,
                easing: "ease-in-out",
            },
        },
        metadata: {
            createdAt: new Date(),
            updatedAt: new Date(),
            version: "1.0.0",
            author: "system",
            tags: ["minimal", "landing"],
            analytics: {
                impressions: 0,
                clicks: 0,
                conversionRate: 0,
            },
        },
    };
}
exports.heroABTestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1).max(100),
    variants: zod_1.z.array(exports.heroContentSchema),
    trafficSplit: zod_1.z.array(zod_1.z.number().min(0).max(100)),
    startDate: zod_1.z.date(),
    endDate: zod_1.z.date().optional(),
    status: zod_1.z.enum(["draft", "running", "paused", "completed"]),
    metrics: zod_1.z.object({
        impressions: zod_1.z.array(zod_1.z.number().min(0)),
        clicks: zod_1.z.array(zod_1.z.number().min(0)),
        conversions: zod_1.z.array(zod_1.z.number().min(0)),
    }),
});
// All types and schemas are already exported above
//# sourceMappingURL=hero-content.js.map