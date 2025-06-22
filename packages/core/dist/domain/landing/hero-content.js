import { z } from "zod";
// Zod Validation Schemas
export const heroVariantSchema = z.object({
    type: z.enum(["default", "animated", "minimal", "bold"]),
    theme: z.enum(["dark", "light", "auto"]),
    layout: z.enum(["centered", "left-aligned", "full-width"]),
});
export const heroHeadlineSchema = z.object({
    text: z.string().min(1).max(200),
    animated: z
        .object({
        enabled: z.boolean(),
        rotatingWords: z.array(z.string()).optional(),
        intervalMs: z.number().min(500).max(10000).optional(),
    })
        .optional(),
    typography: z.object({
        size: z.enum(["lg", "xl", "2xl", "3xl", "4xl"]),
        weight: z.enum(["normal", "medium", "semibold", "bold", "black"]),
        gradient: z
            .object({
            enabled: z.boolean(),
            colors: z.array(z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)),
            animation: z.enum(["flow", "pulse", "static"]).optional(),
        })
            .optional(),
    }),
});
export const heroCtaSchema = z.object({
    text: z.string().min(1).max(50),
    variant: z.enum(["primary", "secondary", "outline", "ghost"]),
    size: z.enum(["sm", "md", "lg", "xl"]),
    action: z.object({
        type: z.enum(["navigate", "scroll", "modal", "external"]),
        target: z.string().min(1),
        analytics: z
            .object({
            event: z.string(),
            properties: z.record(z.any()).optional(),
        })
            .optional(),
    }),
    states: z.object({
        loading: z.boolean().optional(),
        disabled: z.boolean().optional(),
        success: z.boolean().optional(),
    }),
});
export const heroBackgroundSchema = z.object({
    type: z.enum(["solid", "gradient", "image", "video", "animated"]),
    value: z.union([z.string(), z.array(z.string())]),
    overlay: z
        .object({
        enabled: z.boolean(),
        color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
        opacity: z.number().min(0).max(1),
    })
        .optional(),
    animation: z
        .object({
        enabled: z.boolean(),
        type: z.enum(["pulse", "flow", "particles", "geometric"]),
        duration: z.number().min(1000).max(30000),
        easing: z.string(),
    })
        .optional(),
});
export const heroMetadataSchema = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
    version: z.string().regex(/^\d+\.\d+\.\d+$/),
    author: z.string().min(1),
    tags: z.array(z.string()),
    abTest: z
        .object({
        enabled: z.boolean(),
        variant: z.string(),
        percentage: z.number().min(0).max(100),
    })
        .optional(),
    analytics: z.object({
        impressions: z.number().min(0),
        clicks: z.number().min(0),
        conversionRate: z.number().min(0).max(1),
    }),
});
export const heroContentSchema = z.object({
    id: z.string().uuid(),
    variant: heroVariantSchema,
    headline: heroHeadlineSchema,
    subline: z.string().max(300).optional(),
    cta: heroCtaSchema,
    background: heroBackgroundSchema,
    metadata: heroMetadataSchema,
});
// Content Validation Functions
export function validateHeroContent(content) {
    return heroContentSchema.parse(content);
}
export function isValidHeroContent(content) {
    return heroContentSchema.safeParse(content).success;
}
// Default Hero Content Factory
export function createDefaultHeroContent() {
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
export function createAnimatedHeroVariant(rotatingWords) {
    return {
        headline: {
            text: "Experience your [rotating-word]",
            animated: {
                enabled: true,
                rotatingWords,
                intervalMs: 2200,
            },
            typography: {
                size: "3xl",
                weight: "bold",
                gradient: {
                    enabled: true,
                    colors: ["#ffffff", "#FFD700"],
                    animation: "flow",
                },
            },
        },
    };
}
export function createMinimalHeroVariant() {
    return {
        variant: {
            type: "minimal",
            theme: "dark",
            layout: "centered",
        },
        headline: {
            text: "HIVE",
            typography: {
                size: "4xl",
                weight: "black",
            },
        },
        background: {
            type: "solid",
            value: "#0A0A0A",
        },
    };
}
export const heroABTestSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(100),
    variants: z.array(heroContentSchema),
    trafficSplit: z.array(z.number().min(0).max(100)),
    startDate: z.date(),
    endDate: z.date().optional(),
    status: z.enum(["draft", "running", "paused", "completed"]),
    metrics: z.object({
        impressions: z.array(z.number().min(0)),
        clicks: z.array(z.number().min(0)),
        conversions: z.array(z.number().min(0)),
    }),
});
// All types and schemas are already exported above
//# sourceMappingURL=hero-content.js.map