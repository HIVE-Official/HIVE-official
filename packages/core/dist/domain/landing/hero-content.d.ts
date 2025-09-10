import { z } from "zod";
export interface HeroContent {
    id: string;
    variant: HeroVariant;
    headline: HeroHeadline;
    subline?: string;
    cta: HeroCTA;
    background: HeroBackground;
    metadata: HeroMetadata;
}
export interface HeroVariant {
    type: "default" | "animated" | "minimal" | "bold";
    theme: "dark" | "light" | "auto";
    layout: "centered" | "left-aligned" | "full-width";
}
export interface HeroHeadline {
    text: string;
    animated?: {
        enabled: boolean;
        rotatingWords?: string[];
        intervalMs?: number;
    };
    typography: {
        size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
        weight: "normal" | "medium" | "semibold" | "bold" | "black";
        gradient?: {
            enabled: boolean;
            colors: string[];
            animation?: "flow" | "pulse" | "static";
        };
    };
}
export interface HeroCTA {
    text: string;
    variant: "primary" | "secondary" | "outline" | "ghost";
    size: "sm" | "md" | "lg" | "xl";
    action: {
        type: "navigate" | "scroll" | "modal" | "external";
        target: string;
        analytics?: {
            event: string;
            properties?: Record<string, unknown>;
        };
    };
    states: {
        loading?: boolean;
        disabled?: boolean;
        success?: boolean;
    };
}
export interface HeroBackground {
    type: "solid" | "gradient" | "image" | "video" | "animated";
    value: string | string[];
    overlay?: {
        enabled: boolean;
        color: string;
        opacity: number;
    };
    animation?: {
        enabled: boolean;
        type: "pulse" | "flow" | "particles" | "geometric";
        duration: number;
        easing: string;
    };
}
export interface HeroMetadata {
    createdAt: Date;
    updatedAt: Date;
    version: string;
    author: string;
    tags: string[];
    abTest?: {
        enabled: boolean;
        variant: string;
        percentage: number;
    };
    analytics: {
        impressions: number;
        clicks: number;
        conversionRate: number;
    };
}
export declare const heroVariantSchema: z.ZodObject<{
    type: z.ZodEnum<["default", "animated", "minimal", "bold"]>;
    theme: z.ZodEnum<["dark", "light", "auto"]>;
    layout: z.ZodEnum<["centered", "left-aligned", "full-width"]>;
}, "strip", z.ZodTypeAny, {
    type: "bold" | "minimal" | "default" | "animated";
    theme: "auto" | "light" | "dark";
    layout: "centered" | "left-aligned" | "full-width";
}, {
    type: "bold" | "minimal" | "default" | "animated";
    theme: "auto" | "light" | "dark";
    layout: "centered" | "left-aligned" | "full-width";
}>;
export declare const heroHeadlineSchema: z.ZodObject<{
    text: z.ZodString;
    animated: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodBoolean;
        rotatingWords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        intervalMs: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        rotatingWords?: string[] | undefined;
        intervalMs?: number | undefined;
    }, {
        enabled: boolean;
        rotatingWords?: string[] | undefined;
        intervalMs?: number | undefined;
    }>>;
    typography: z.ZodObject<{
        size: z.ZodEnum<["lg", "xl", "2xl", "3xl", "4xl"]>;
        weight: z.ZodEnum<["normal", "medium", "semibold", "bold", "black"]>;
        gradient: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodBoolean;
            colors: z.ZodArray<z.ZodString, "many">;
            animation: z.ZodOptional<z.ZodEnum<["flow", "pulse", "static"]>>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            colors: string[];
            animation?: "pulse" | "flow" | "static" | undefined;
        }, {
            enabled: boolean;
            colors: string[];
            animation?: "pulse" | "flow" | "static" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
        weight: "normal" | "medium" | "semibold" | "bold" | "black";
        gradient?: {
            enabled: boolean;
            colors: string[];
            animation?: "pulse" | "flow" | "static" | undefined;
        } | undefined;
    }, {
        size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
        weight: "normal" | "medium" | "semibold" | "bold" | "black";
        gradient?: {
            enabled: boolean;
            colors: string[];
            animation?: "pulse" | "flow" | "static" | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    text: string;
    typography: {
        size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
        weight: "normal" | "medium" | "semibold" | "bold" | "black";
        gradient?: {
            enabled: boolean;
            colors: string[];
            animation?: "pulse" | "flow" | "static" | undefined;
        } | undefined;
    };
    animated?: {
        enabled: boolean;
        rotatingWords?: string[] | undefined;
        intervalMs?: number | undefined;
    } | undefined;
}, {
    text: string;
    typography: {
        size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
        weight: "normal" | "medium" | "semibold" | "bold" | "black";
        gradient?: {
            enabled: boolean;
            colors: string[];
            animation?: "pulse" | "flow" | "static" | undefined;
        } | undefined;
    };
    animated?: {
        enabled: boolean;
        rotatingWords?: string[] | undefined;
        intervalMs?: number | undefined;
    } | undefined;
}>;
export declare const heroCtaSchema: z.ZodObject<{
    text: z.ZodString;
    variant: z.ZodEnum<["primary", "secondary", "outline", "ghost"]>;
    size: z.ZodEnum<["sm", "md", "lg", "xl"]>;
    action: z.ZodObject<{
        type: z.ZodEnum<["navigate", "scroll", "modal", "external"]>;
        target: z.ZodString;
        analytics: z.ZodOptional<z.ZodObject<{
            event: z.ZodString;
            properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            event: string;
            properties?: Record<string, unknown> | undefined;
        }, {
            event: string;
            properties?: Record<string, unknown> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "navigate" | "external" | "modal" | "scroll";
        target: string;
        analytics?: {
            event: string;
            properties?: Record<string, unknown> | undefined;
        } | undefined;
    }, {
        type: "navigate" | "external" | "modal" | "scroll";
        target: string;
        analytics?: {
            event: string;
            properties?: Record<string, unknown> | undefined;
        } | undefined;
    }>;
    states: z.ZodObject<{
        loading: z.ZodOptional<z.ZodBoolean>;
        disabled: z.ZodOptional<z.ZodBoolean>;
        success: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        disabled?: boolean | undefined;
        success?: boolean | undefined;
        loading?: boolean | undefined;
    }, {
        disabled?: boolean | undefined;
        success?: boolean | undefined;
        loading?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    text: string;
    variant: "primary" | "secondary" | "outline" | "ghost";
    size: "sm" | "lg" | "xl" | "md";
    action: {
        type: "navigate" | "external" | "modal" | "scroll";
        target: string;
        analytics?: {
            event: string;
            properties?: Record<string, unknown> | undefined;
        } | undefined;
    };
    states: {
        disabled?: boolean | undefined;
        success?: boolean | undefined;
        loading?: boolean | undefined;
    };
}, {
    text: string;
    variant: "primary" | "secondary" | "outline" | "ghost";
    size: "sm" | "lg" | "xl" | "md";
    action: {
        type: "navigate" | "external" | "modal" | "scroll";
        target: string;
        analytics?: {
            event: string;
            properties?: Record<string, unknown> | undefined;
        } | undefined;
    };
    states: {
        disabled?: boolean | undefined;
        success?: boolean | undefined;
        loading?: boolean | undefined;
    };
}>;
export declare const heroBackgroundSchema: z.ZodObject<{
    type: z.ZodEnum<["solid", "gradient", "image", "video", "animated"]>;
    value: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
    overlay: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodBoolean;
        color: z.ZodString;
        opacity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        color: string;
        enabled: boolean;
        opacity: number;
    }, {
        color: string;
        enabled: boolean;
        opacity: number;
    }>>;
    animation: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodBoolean;
        type: z.ZodEnum<["pulse", "flow", "particles", "geometric"]>;
        duration: z.ZodNumber;
        easing: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "pulse" | "flow" | "particles" | "geometric";
        duration: number;
        enabled: boolean;
        easing: string;
    }, {
        type: "pulse" | "flow" | "particles" | "geometric";
        duration: number;
        enabled: boolean;
        easing: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    value: string | string[];
    type: "solid" | "image" | "video" | "animated" | "gradient";
    animation?: {
        type: "pulse" | "flow" | "particles" | "geometric";
        duration: number;
        enabled: boolean;
        easing: string;
    } | undefined;
    overlay?: {
        color: string;
        enabled: boolean;
        opacity: number;
    } | undefined;
}, {
    value: string | string[];
    type: "solid" | "image" | "video" | "animated" | "gradient";
    animation?: {
        type: "pulse" | "flow" | "particles" | "geometric";
        duration: number;
        enabled: boolean;
        easing: string;
    } | undefined;
    overlay?: {
        color: string;
        enabled: boolean;
        opacity: number;
    } | undefined;
}>;
export declare const heroMetadataSchema: z.ZodObject<{
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    version: z.ZodString;
    author: z.ZodString;
    tags: z.ZodArray<z.ZodString, "many">;
    abTest: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodBoolean;
        variant: z.ZodString;
        percentage: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        variant: string;
        enabled: boolean;
        percentage: number;
    }, {
        variant: string;
        enabled: boolean;
        percentage: number;
    }>>;
    analytics: z.ZodObject<{
        impressions: z.ZodNumber;
        clicks: z.ZodNumber;
        conversionRate: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        impressions: number;
        clicks: number;
        conversionRate: number;
    }, {
        impressions: number;
        clicks: number;
        conversionRate: number;
    }>;
}, "strip", z.ZodTypeAny, {
    analytics: {
        impressions: number;
        clicks: number;
        conversionRate: number;
    };
    tags: string[];
    version: string;
    createdAt: Date;
    updatedAt: Date;
    author: string;
    abTest?: {
        variant: string;
        enabled: boolean;
        percentage: number;
    } | undefined;
}, {
    analytics: {
        impressions: number;
        clicks: number;
        conversionRate: number;
    };
    tags: string[];
    version: string;
    createdAt: Date;
    updatedAt: Date;
    author: string;
    abTest?: {
        variant: string;
        enabled: boolean;
        percentage: number;
    } | undefined;
}>;
export declare const heroContentSchema: z.ZodObject<{
    id: z.ZodString;
    variant: z.ZodObject<{
        type: z.ZodEnum<["default", "animated", "minimal", "bold"]>;
        theme: z.ZodEnum<["dark", "light", "auto"]>;
        layout: z.ZodEnum<["centered", "left-aligned", "full-width"]>;
    }, "strip", z.ZodTypeAny, {
        type: "bold" | "minimal" | "default" | "animated";
        theme: "auto" | "light" | "dark";
        layout: "centered" | "left-aligned" | "full-width";
    }, {
        type: "bold" | "minimal" | "default" | "animated";
        theme: "auto" | "light" | "dark";
        layout: "centered" | "left-aligned" | "full-width";
    }>;
    headline: z.ZodObject<{
        text: z.ZodString;
        animated: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodBoolean;
            rotatingWords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            intervalMs: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            rotatingWords?: string[] | undefined;
            intervalMs?: number | undefined;
        }, {
            enabled: boolean;
            rotatingWords?: string[] | undefined;
            intervalMs?: number | undefined;
        }>>;
        typography: z.ZodObject<{
            size: z.ZodEnum<["lg", "xl", "2xl", "3xl", "4xl"]>;
            weight: z.ZodEnum<["normal", "medium", "semibold", "bold", "black"]>;
            gradient: z.ZodOptional<z.ZodObject<{
                enabled: z.ZodBoolean;
                colors: z.ZodArray<z.ZodString, "many">;
                animation: z.ZodOptional<z.ZodEnum<["flow", "pulse", "static"]>>;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                colors: string[];
                animation?: "pulse" | "flow" | "static" | undefined;
            }, {
                enabled: boolean;
                colors: string[];
                animation?: "pulse" | "flow" | "static" | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
            weight: "normal" | "medium" | "semibold" | "bold" | "black";
            gradient?: {
                enabled: boolean;
                colors: string[];
                animation?: "pulse" | "flow" | "static" | undefined;
            } | undefined;
        }, {
            size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
            weight: "normal" | "medium" | "semibold" | "bold" | "black";
            gradient?: {
                enabled: boolean;
                colors: string[];
                animation?: "pulse" | "flow" | "static" | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        typography: {
            size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
            weight: "normal" | "medium" | "semibold" | "bold" | "black";
            gradient?: {
                enabled: boolean;
                colors: string[];
                animation?: "pulse" | "flow" | "static" | undefined;
            } | undefined;
        };
        animated?: {
            enabled: boolean;
            rotatingWords?: string[] | undefined;
            intervalMs?: number | undefined;
        } | undefined;
    }, {
        text: string;
        typography: {
            size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
            weight: "normal" | "medium" | "semibold" | "bold" | "black";
            gradient?: {
                enabled: boolean;
                colors: string[];
                animation?: "pulse" | "flow" | "static" | undefined;
            } | undefined;
        };
        animated?: {
            enabled: boolean;
            rotatingWords?: string[] | undefined;
            intervalMs?: number | undefined;
        } | undefined;
    }>;
    subline: z.ZodOptional<z.ZodString>;
    cta: z.ZodObject<{
        text: z.ZodString;
        variant: z.ZodEnum<["primary", "secondary", "outline", "ghost"]>;
        size: z.ZodEnum<["sm", "md", "lg", "xl"]>;
        action: z.ZodObject<{
            type: z.ZodEnum<["navigate", "scroll", "modal", "external"]>;
            target: z.ZodString;
            analytics: z.ZodOptional<z.ZodObject<{
                event: z.ZodString;
                properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                event: string;
                properties?: Record<string, unknown> | undefined;
            }, {
                event: string;
                properties?: Record<string, unknown> | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "navigate" | "external" | "modal" | "scroll";
            target: string;
            analytics?: {
                event: string;
                properties?: Record<string, unknown> | undefined;
            } | undefined;
        }, {
            type: "navigate" | "external" | "modal" | "scroll";
            target: string;
            analytics?: {
                event: string;
                properties?: Record<string, unknown> | undefined;
            } | undefined;
        }>;
        states: z.ZodObject<{
            loading: z.ZodOptional<z.ZodBoolean>;
            disabled: z.ZodOptional<z.ZodBoolean>;
            success: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            disabled?: boolean | undefined;
            success?: boolean | undefined;
            loading?: boolean | undefined;
        }, {
            disabled?: boolean | undefined;
            success?: boolean | undefined;
            loading?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        variant: "primary" | "secondary" | "outline" | "ghost";
        size: "sm" | "lg" | "xl" | "md";
        action: {
            type: "navigate" | "external" | "modal" | "scroll";
            target: string;
            analytics?: {
                event: string;
                properties?: Record<string, unknown> | undefined;
            } | undefined;
        };
        states: {
            disabled?: boolean | undefined;
            success?: boolean | undefined;
            loading?: boolean | undefined;
        };
    }, {
        text: string;
        variant: "primary" | "secondary" | "outline" | "ghost";
        size: "sm" | "lg" | "xl" | "md";
        action: {
            type: "navigate" | "external" | "modal" | "scroll";
            target: string;
            analytics?: {
                event: string;
                properties?: Record<string, unknown> | undefined;
            } | undefined;
        };
        states: {
            disabled?: boolean | undefined;
            success?: boolean | undefined;
            loading?: boolean | undefined;
        };
    }>;
    background: z.ZodObject<{
        type: z.ZodEnum<["solid", "gradient", "image", "video", "animated"]>;
        value: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
        overlay: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodBoolean;
            color: z.ZodString;
            opacity: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            color: string;
            enabled: boolean;
            opacity: number;
        }, {
            color: string;
            enabled: boolean;
            opacity: number;
        }>>;
        animation: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodBoolean;
            type: z.ZodEnum<["pulse", "flow", "particles", "geometric"]>;
            duration: z.ZodNumber;
            easing: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "pulse" | "flow" | "particles" | "geometric";
            duration: number;
            enabled: boolean;
            easing: string;
        }, {
            type: "pulse" | "flow" | "particles" | "geometric";
            duration: number;
            enabled: boolean;
            easing: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        value: string | string[];
        type: "solid" | "image" | "video" | "animated" | "gradient";
        animation?: {
            type: "pulse" | "flow" | "particles" | "geometric";
            duration: number;
            enabled: boolean;
            easing: string;
        } | undefined;
        overlay?: {
            color: string;
            enabled: boolean;
            opacity: number;
        } | undefined;
    }, {
        value: string | string[];
        type: "solid" | "image" | "video" | "animated" | "gradient";
        animation?: {
            type: "pulse" | "flow" | "particles" | "geometric";
            duration: number;
            enabled: boolean;
            easing: string;
        } | undefined;
        overlay?: {
            color: string;
            enabled: boolean;
            opacity: number;
        } | undefined;
    }>;
    metadata: z.ZodObject<{
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        version: z.ZodString;
        author: z.ZodString;
        tags: z.ZodArray<z.ZodString, "many">;
        abTest: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodBoolean;
            variant: z.ZodString;
            percentage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            variant: string;
            enabled: boolean;
            percentage: number;
        }, {
            variant: string;
            enabled: boolean;
            percentage: number;
        }>>;
        analytics: z.ZodObject<{
            impressions: z.ZodNumber;
            clicks: z.ZodNumber;
            conversionRate: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            impressions: number;
            clicks: number;
            conversionRate: number;
        }, {
            impressions: number;
            clicks: number;
            conversionRate: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        analytics: {
            impressions: number;
            clicks: number;
            conversionRate: number;
        };
        tags: string[];
        version: string;
        createdAt: Date;
        updatedAt: Date;
        author: string;
        abTest?: {
            variant: string;
            enabled: boolean;
            percentage: number;
        } | undefined;
    }, {
        analytics: {
            impressions: number;
            clicks: number;
            conversionRate: number;
        };
        tags: string[];
        version: string;
        createdAt: Date;
        updatedAt: Date;
        author: string;
        abTest?: {
            variant: string;
            enabled: boolean;
            percentage: number;
        } | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    id: string;
    variant: {
        type: "bold" | "minimal" | "default" | "animated";
        theme: "auto" | "light" | "dark";
        layout: "centered" | "left-aligned" | "full-width";
    };
    metadata: {
        analytics: {
            impressions: number;
            clicks: number;
            conversionRate: number;
        };
        tags: string[];
        version: string;
        createdAt: Date;
        updatedAt: Date;
        author: string;
        abTest?: {
            variant: string;
            enabled: boolean;
            percentage: number;
        } | undefined;
    };
    headline: {
        text: string;
        typography: {
            size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
            weight: "normal" | "medium" | "semibold" | "bold" | "black";
            gradient?: {
                enabled: boolean;
                colors: string[];
                animation?: "pulse" | "flow" | "static" | undefined;
            } | undefined;
        };
        animated?: {
            enabled: boolean;
            rotatingWords?: string[] | undefined;
            intervalMs?: number | undefined;
        } | undefined;
    };
    cta: {
        text: string;
        variant: "primary" | "secondary" | "outline" | "ghost";
        size: "sm" | "lg" | "xl" | "md";
        action: {
            type: "navigate" | "external" | "modal" | "scroll";
            target: string;
            analytics?: {
                event: string;
                properties?: Record<string, unknown> | undefined;
            } | undefined;
        };
        states: {
            disabled?: boolean | undefined;
            success?: boolean | undefined;
            loading?: boolean | undefined;
        };
    };
    background: {
        value: string | string[];
        type: "solid" | "image" | "video" | "animated" | "gradient";
        animation?: {
            type: "pulse" | "flow" | "particles" | "geometric";
            duration: number;
            enabled: boolean;
            easing: string;
        } | undefined;
        overlay?: {
            color: string;
            enabled: boolean;
            opacity: number;
        } | undefined;
    };
    subline?: string | undefined;
}, {
    id: string;
    variant: {
        type: "bold" | "minimal" | "default" | "animated";
        theme: "auto" | "light" | "dark";
        layout: "centered" | "left-aligned" | "full-width";
    };
    metadata: {
        analytics: {
            impressions: number;
            clicks: number;
            conversionRate: number;
        };
        tags: string[];
        version: string;
        createdAt: Date;
        updatedAt: Date;
        author: string;
        abTest?: {
            variant: string;
            enabled: boolean;
            percentage: number;
        } | undefined;
    };
    headline: {
        text: string;
        typography: {
            size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
            weight: "normal" | "medium" | "semibold" | "bold" | "black";
            gradient?: {
                enabled: boolean;
                colors: string[];
                animation?: "pulse" | "flow" | "static" | undefined;
            } | undefined;
        };
        animated?: {
            enabled: boolean;
            rotatingWords?: string[] | undefined;
            intervalMs?: number | undefined;
        } | undefined;
    };
    cta: {
        text: string;
        variant: "primary" | "secondary" | "outline" | "ghost";
        size: "sm" | "lg" | "xl" | "md";
        action: {
            type: "navigate" | "external" | "modal" | "scroll";
            target: string;
            analytics?: {
                event: string;
                properties?: Record<string, unknown> | undefined;
            } | undefined;
        };
        states: {
            disabled?: boolean | undefined;
            success?: boolean | undefined;
            loading?: boolean | undefined;
        };
    };
    background: {
        value: string | string[];
        type: "solid" | "image" | "video" | "animated" | "gradient";
        animation?: {
            type: "pulse" | "flow" | "particles" | "geometric";
            duration: number;
            enabled: boolean;
            easing: string;
        } | undefined;
        overlay?: {
            color: string;
            enabled: boolean;
            opacity: number;
        } | undefined;
    };
    subline?: string | undefined;
}>;
export declare function validateHeroContent(content: unknown): HeroContent;
export declare function isValidHeroContent(content: unknown): content is HeroContent;
export declare function createDefaultHeroContent(): HeroContent;
export declare function createAnimatedHeroVariant(rotatingWords: string[]): HeroContent;
export declare function createMinimalHeroVariant(): HeroContent;
export interface HeroContentManager {
    getContent(id: string): Promise<HeroContent>;
    updateContent(id: string, updates: Partial<HeroContent>): Promise<HeroContent>;
    createVariant(baseId: string, variant: Partial<HeroContent>): Promise<HeroContent>;
    getAnalytics(id: string): Promise<HeroMetadata["analytics"]>;
    trackImpression(id: string): Promise<void>;
    trackClick(id: string): Promise<void>;
}
export interface HeroABTest {
    id: string;
    name: string;
    variants: HeroContent[];
    trafficSplit: number[];
    startDate: Date;
    endDate?: Date;
    status: "draft" | "running" | "paused" | "completed";
    metrics: {
        impressions: number[];
        clicks: number[];
        conversions: number[];
    };
}
export declare const heroABTestSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    variants: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        variant: z.ZodObject<{
            type: z.ZodEnum<["default", "animated", "minimal", "bold"]>;
            theme: z.ZodEnum<["dark", "light", "auto"]>;
            layout: z.ZodEnum<["centered", "left-aligned", "full-width"]>;
        }, "strip", z.ZodTypeAny, {
            type: "bold" | "minimal" | "default" | "animated";
            theme: "auto" | "light" | "dark";
            layout: "centered" | "left-aligned" | "full-width";
        }, {
            type: "bold" | "minimal" | "default" | "animated";
            theme: "auto" | "light" | "dark";
            layout: "centered" | "left-aligned" | "full-width";
        }>;
        headline: z.ZodObject<{
            text: z.ZodString;
            animated: z.ZodOptional<z.ZodObject<{
                enabled: z.ZodBoolean;
                rotatingWords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                intervalMs: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                rotatingWords?: string[] | undefined;
                intervalMs?: number | undefined;
            }, {
                enabled: boolean;
                rotatingWords?: string[] | undefined;
                intervalMs?: number | undefined;
            }>>;
            typography: z.ZodObject<{
                size: z.ZodEnum<["lg", "xl", "2xl", "3xl", "4xl"]>;
                weight: z.ZodEnum<["normal", "medium", "semibold", "bold", "black"]>;
                gradient: z.ZodOptional<z.ZodObject<{
                    enabled: z.ZodBoolean;
                    colors: z.ZodArray<z.ZodString, "many">;
                    animation: z.ZodOptional<z.ZodEnum<["flow", "pulse", "static"]>>;
                }, "strip", z.ZodTypeAny, {
                    enabled: boolean;
                    colors: string[];
                    animation?: "pulse" | "flow" | "static" | undefined;
                }, {
                    enabled: boolean;
                    colors: string[];
                    animation?: "pulse" | "flow" | "static" | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
                weight: "normal" | "medium" | "semibold" | "bold" | "black";
                gradient?: {
                    enabled: boolean;
                    colors: string[];
                    animation?: "pulse" | "flow" | "static" | undefined;
                } | undefined;
            }, {
                size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
                weight: "normal" | "medium" | "semibold" | "bold" | "black";
                gradient?: {
                    enabled: boolean;
                    colors: string[];
                    animation?: "pulse" | "flow" | "static" | undefined;
                } | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            typography: {
                size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
                weight: "normal" | "medium" | "semibold" | "bold" | "black";
                gradient?: {
                    enabled: boolean;
                    colors: string[];
                    animation?: "pulse" | "flow" | "static" | undefined;
                } | undefined;
            };
            animated?: {
                enabled: boolean;
                rotatingWords?: string[] | undefined;
                intervalMs?: number | undefined;
            } | undefined;
        }, {
            text: string;
            typography: {
                size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
                weight: "normal" | "medium" | "semibold" | "bold" | "black";
                gradient?: {
                    enabled: boolean;
                    colors: string[];
                    animation?: "pulse" | "flow" | "static" | undefined;
                } | undefined;
            };
            animated?: {
                enabled: boolean;
                rotatingWords?: string[] | undefined;
                intervalMs?: number | undefined;
            } | undefined;
        }>;
        subline: z.ZodOptional<z.ZodString>;
        cta: z.ZodObject<{
            text: z.ZodString;
            variant: z.ZodEnum<["primary", "secondary", "outline", "ghost"]>;
            size: z.ZodEnum<["sm", "md", "lg", "xl"]>;
            action: z.ZodObject<{
                type: z.ZodEnum<["navigate", "scroll", "modal", "external"]>;
                target: z.ZodString;
                analytics: z.ZodOptional<z.ZodObject<{
                    event: z.ZodString;
                    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                }, "strip", z.ZodTypeAny, {
                    event: string;
                    properties?: Record<string, unknown> | undefined;
                }, {
                    event: string;
                    properties?: Record<string, unknown> | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                type: "navigate" | "external" | "modal" | "scroll";
                target: string;
                analytics?: {
                    event: string;
                    properties?: Record<string, unknown> | undefined;
                } | undefined;
            }, {
                type: "navigate" | "external" | "modal" | "scroll";
                target: string;
                analytics?: {
                    event: string;
                    properties?: Record<string, unknown> | undefined;
                } | undefined;
            }>;
            states: z.ZodObject<{
                loading: z.ZodOptional<z.ZodBoolean>;
                disabled: z.ZodOptional<z.ZodBoolean>;
                success: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                disabled?: boolean | undefined;
                success?: boolean | undefined;
                loading?: boolean | undefined;
            }, {
                disabled?: boolean | undefined;
                success?: boolean | undefined;
                loading?: boolean | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            variant: "primary" | "secondary" | "outline" | "ghost";
            size: "sm" | "lg" | "xl" | "md";
            action: {
                type: "navigate" | "external" | "modal" | "scroll";
                target: string;
                analytics?: {
                    event: string;
                    properties?: Record<string, unknown> | undefined;
                } | undefined;
            };
            states: {
                disabled?: boolean | undefined;
                success?: boolean | undefined;
                loading?: boolean | undefined;
            };
        }, {
            text: string;
            variant: "primary" | "secondary" | "outline" | "ghost";
            size: "sm" | "lg" | "xl" | "md";
            action: {
                type: "navigate" | "external" | "modal" | "scroll";
                target: string;
                analytics?: {
                    event: string;
                    properties?: Record<string, unknown> | undefined;
                } | undefined;
            };
            states: {
                disabled?: boolean | undefined;
                success?: boolean | undefined;
                loading?: boolean | undefined;
            };
        }>;
        background: z.ZodObject<{
            type: z.ZodEnum<["solid", "gradient", "image", "video", "animated"]>;
            value: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
            overlay: z.ZodOptional<z.ZodObject<{
                enabled: z.ZodBoolean;
                color: z.ZodString;
                opacity: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                color: string;
                enabled: boolean;
                opacity: number;
            }, {
                color: string;
                enabled: boolean;
                opacity: number;
            }>>;
            animation: z.ZodOptional<z.ZodObject<{
                enabled: z.ZodBoolean;
                type: z.ZodEnum<["pulse", "flow", "particles", "geometric"]>;
                duration: z.ZodNumber;
                easing: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "pulse" | "flow" | "particles" | "geometric";
                duration: number;
                enabled: boolean;
                easing: string;
            }, {
                type: "pulse" | "flow" | "particles" | "geometric";
                duration: number;
                enabled: boolean;
                easing: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            value: string | string[];
            type: "solid" | "image" | "video" | "animated" | "gradient";
            animation?: {
                type: "pulse" | "flow" | "particles" | "geometric";
                duration: number;
                enabled: boolean;
                easing: string;
            } | undefined;
            overlay?: {
                color: string;
                enabled: boolean;
                opacity: number;
            } | undefined;
        }, {
            value: string | string[];
            type: "solid" | "image" | "video" | "animated" | "gradient";
            animation?: {
                type: "pulse" | "flow" | "particles" | "geometric";
                duration: number;
                enabled: boolean;
                easing: string;
            } | undefined;
            overlay?: {
                color: string;
                enabled: boolean;
                opacity: number;
            } | undefined;
        }>;
        metadata: z.ZodObject<{
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
            version: z.ZodString;
            author: z.ZodString;
            tags: z.ZodArray<z.ZodString, "many">;
            abTest: z.ZodOptional<z.ZodObject<{
                enabled: z.ZodBoolean;
                variant: z.ZodString;
                percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                variant: string;
                enabled: boolean;
                percentage: number;
            }, {
                variant: string;
                enabled: boolean;
                percentage: number;
            }>>;
            analytics: z.ZodObject<{
                impressions: z.ZodNumber;
                clicks: z.ZodNumber;
                conversionRate: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                impressions: number;
                clicks: number;
                conversionRate: number;
            }, {
                impressions: number;
                clicks: number;
                conversionRate: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            analytics: {
                impressions: number;
                clicks: number;
                conversionRate: number;
            };
            tags: string[];
            version: string;
            createdAt: Date;
            updatedAt: Date;
            author: string;
            abTest?: {
                variant: string;
                enabled: boolean;
                percentage: number;
            } | undefined;
        }, {
            analytics: {
                impressions: number;
                clicks: number;
                conversionRate: number;
            };
            tags: string[];
            version: string;
            createdAt: Date;
            updatedAt: Date;
            author: string;
            abTest?: {
                variant: string;
                enabled: boolean;
                percentage: number;
            } | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        variant: {
            type: "bold" | "minimal" | "default" | "animated";
            theme: "auto" | "light" | "dark";
            layout: "centered" | "left-aligned" | "full-width";
        };
        metadata: {
            analytics: {
                impressions: number;
                clicks: number;
                conversionRate: number;
            };
            tags: string[];
            version: string;
            createdAt: Date;
            updatedAt: Date;
            author: string;
            abTest?: {
                variant: string;
                enabled: boolean;
                percentage: number;
            } | undefined;
        };
        headline: {
            text: string;
            typography: {
                size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
                weight: "normal" | "medium" | "semibold" | "bold" | "black";
                gradient?: {
                    enabled: boolean;
                    colors: string[];
                    animation?: "pulse" | "flow" | "static" | undefined;
                } | undefined;
            };
            animated?: {
                enabled: boolean;
                rotatingWords?: string[] | undefined;
                intervalMs?: number | undefined;
            } | undefined;
        };
        cta: {
            text: string;
            variant: "primary" | "secondary" | "outline" | "ghost";
            size: "sm" | "lg" | "xl" | "md";
            action: {
                type: "navigate" | "external" | "modal" | "scroll";
                target: string;
                analytics?: {
                    event: string;
                    properties?: Record<string, unknown> | undefined;
                } | undefined;
            };
            states: {
                disabled?: boolean | undefined;
                success?: boolean | undefined;
                loading?: boolean | undefined;
            };
        };
        background: {
            value: string | string[];
            type: "solid" | "image" | "video" | "animated" | "gradient";
            animation?: {
                type: "pulse" | "flow" | "particles" | "geometric";
                duration: number;
                enabled: boolean;
                easing: string;
            } | undefined;
            overlay?: {
                color: string;
                enabled: boolean;
                opacity: number;
            } | undefined;
        };
        subline?: string | undefined;
    }, {
        id: string;
        variant: {
            type: "bold" | "minimal" | "default" | "animated";
            theme: "auto" | "light" | "dark";
            layout: "centered" | "left-aligned" | "full-width";
        };
        metadata: {
            analytics: {
                impressions: number;
                clicks: number;
                conversionRate: number;
            };
            tags: string[];
            version: string;
            createdAt: Date;
            updatedAt: Date;
            author: string;
            abTest?: {
                variant: string;
                enabled: boolean;
                percentage: number;
            } | undefined;
        };
        headline: {
            text: string;
            typography: {
                size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
                weight: "normal" | "medium" | "semibold" | "bold" | "black";
                gradient?: {
                    enabled: boolean;
                    colors: string[];
                    animation?: "pulse" | "flow" | "static" | undefined;
                } | undefined;
            };
            animated?: {
                enabled: boolean;
                rotatingWords?: string[] | undefined;
                intervalMs?: number | undefined;
            } | undefined;
        };
        cta: {
            text: string;
            variant: "primary" | "secondary" | "outline" | "ghost";
            size: "sm" | "lg" | "xl" | "md";
            action: {
                type: "navigate" | "external" | "modal" | "scroll";
                target: string;
                analytics?: {
                    event: string;
                    properties?: Record<string, unknown> | undefined;
                } | undefined;
            };
            states: {
                disabled?: boolean | undefined;
                success?: boolean | undefined;
                loading?: boolean | undefined;
            };
        };
        background: {
            value: string | string[];
            type: "solid" | "image" | "video" | "animated" | "gradient";
            animation?: {
                type: "pulse" | "flow" | "particles" | "geometric";
                duration: number;
                enabled: boolean;
                easing: string;
            } | undefined;
            overlay?: {
                color: string;
                enabled: boolean;
                opacity: number;
            } | undefined;
        };
        subline?: string | undefined;
    }>, "many">;
    trafficSplit: z.ZodArray<z.ZodNumber, "many">;
    startDate: z.ZodDate;
    endDate: z.ZodOptional<z.ZodDate>;
    status: z.ZodEnum<["draft", "running", "paused", "completed"]>;
    metrics: z.ZodObject<{
        impressions: z.ZodArray<z.ZodNumber, "many">;
        clicks: z.ZodArray<z.ZodNumber, "many">;
        conversions: z.ZodArray<z.ZodNumber, "many">;
    }, "strip", z.ZodTypeAny, {
        impressions: number[];
        clicks: number[];
        conversions: number[];
    }, {
        impressions: number[];
        clicks: number[];
        conversions: number[];
    }>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "running" | "completed" | "paused";
    id: string;
    name: string;
    metrics: {
        impressions: number[];
        clicks: number[];
        conversions: number[];
    };
    variants: {
        id: string;
        variant: {
            type: "bold" | "minimal" | "default" | "animated";
            theme: "auto" | "light" | "dark";
            layout: "centered" | "left-aligned" | "full-width";
        };
        metadata: {
            analytics: {
                impressions: number;
                clicks: number;
                conversionRate: number;
            };
            tags: string[];
            version: string;
            createdAt: Date;
            updatedAt: Date;
            author: string;
            abTest?: {
                variant: string;
                enabled: boolean;
                percentage: number;
            } | undefined;
        };
        headline: {
            text: string;
            typography: {
                size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
                weight: "normal" | "medium" | "semibold" | "bold" | "black";
                gradient?: {
                    enabled: boolean;
                    colors: string[];
                    animation?: "pulse" | "flow" | "static" | undefined;
                } | undefined;
            };
            animated?: {
                enabled: boolean;
                rotatingWords?: string[] | undefined;
                intervalMs?: number | undefined;
            } | undefined;
        };
        cta: {
            text: string;
            variant: "primary" | "secondary" | "outline" | "ghost";
            size: "sm" | "lg" | "xl" | "md";
            action: {
                type: "navigate" | "external" | "modal" | "scroll";
                target: string;
                analytics?: {
                    event: string;
                    properties?: Record<string, unknown> | undefined;
                } | undefined;
            };
            states: {
                disabled?: boolean | undefined;
                success?: boolean | undefined;
                loading?: boolean | undefined;
            };
        };
        background: {
            value: string | string[];
            type: "solid" | "image" | "video" | "animated" | "gradient";
            animation?: {
                type: "pulse" | "flow" | "particles" | "geometric";
                duration: number;
                enabled: boolean;
                easing: string;
            } | undefined;
            overlay?: {
                color: string;
                enabled: boolean;
                opacity: number;
            } | undefined;
        };
        subline?: string | undefined;
    }[];
    trafficSplit: number[];
    startDate: Date;
    endDate?: Date | undefined;
}, {
    status: "draft" | "running" | "completed" | "paused";
    id: string;
    name: string;
    metrics: {
        impressions: number[];
        clicks: number[];
        conversions: number[];
    };
    variants: {
        id: string;
        variant: {
            type: "bold" | "minimal" | "default" | "animated";
            theme: "auto" | "light" | "dark";
            layout: "centered" | "left-aligned" | "full-width";
        };
        metadata: {
            analytics: {
                impressions: number;
                clicks: number;
                conversionRate: number;
            };
            tags: string[];
            version: string;
            createdAt: Date;
            updatedAt: Date;
            author: string;
            abTest?: {
                variant: string;
                enabled: boolean;
                percentage: number;
            } | undefined;
        };
        headline: {
            text: string;
            typography: {
                size: "lg" | "xl" | "2xl" | "3xl" | "4xl";
                weight: "normal" | "medium" | "semibold" | "bold" | "black";
                gradient?: {
                    enabled: boolean;
                    colors: string[];
                    animation?: "pulse" | "flow" | "static" | undefined;
                } | undefined;
            };
            animated?: {
                enabled: boolean;
                rotatingWords?: string[] | undefined;
                intervalMs?: number | undefined;
            } | undefined;
        };
        cta: {
            text: string;
            variant: "primary" | "secondary" | "outline" | "ghost";
            size: "sm" | "lg" | "xl" | "md";
            action: {
                type: "navigate" | "external" | "modal" | "scroll";
                target: string;
                analytics?: {
                    event: string;
                    properties?: Record<string, unknown> | undefined;
                } | undefined;
            };
            states: {
                disabled?: boolean | undefined;
                success?: boolean | undefined;
                loading?: boolean | undefined;
            };
        };
        background: {
            value: string | string[];
            type: "solid" | "image" | "video" | "animated" | "gradient";
            animation?: {
                type: "pulse" | "flow" | "particles" | "geometric";
                duration: number;
                enabled: boolean;
                easing: string;
            } | undefined;
            overlay?: {
                color: string;
                enabled: boolean;
                opacity: number;
            } | undefined;
        };
        subline?: string | undefined;
    }[];
    trafficSplit: number[];
    startDate: Date;
    endDate?: Date | undefined;
}>;
//# sourceMappingURL=hero-content.d.ts.map