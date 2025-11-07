import { z } from "zod";
import { RitualArchetype } from "./archetypes";
export declare const RitualComposerSchema: z.ZodObject<{
    campusId: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    description: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    archetype: z.ZodNativeEnum<typeof RitualArchetype>;
    startsAt: z.ZodString;
    endsAt: z.ZodString;
    visibility: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"public">, z.ZodLiteral<"invite_only">, z.ZodLiteral<"secret">]>>;
    presentation: z.ZodOptional<z.ZodObject<{
        accentColor: z.ZodOptional<z.ZodString>;
        bannerImage: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        ctaLabel: z.ZodOptional<z.ZodString>;
        ctaLink: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        icon?: string;
        accentColor?: string;
        bannerImage?: string;
        ctaLabel?: string;
        ctaLink?: string;
        videoUrl?: string;
    }, {
        icon?: string;
        accentColor?: string;
        bannerImage?: string;
        ctaLabel?: string;
        ctaLink?: string;
        videoUrl?: string;
    }>>;
    config: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    title?: string;
    visibility?: "public" | "invite_only" | "secret";
    presentation?: {
        icon?: string;
        accentColor?: string;
        bannerImage?: string;
        ctaLabel?: string;
        ctaLink?: string;
        videoUrl?: string;
    };
    campusId?: string;
    config?: Record<string, any>;
    slug?: string;
    subtitle?: string;
    description?: string;
    archetype?: RitualArchetype;
    startsAt?: string;
    endsAt?: string;
}, {
    title?: string;
    visibility?: "public" | "invite_only" | "secret";
    presentation?: {
        icon?: string;
        accentColor?: string;
        bannerImage?: string;
        ctaLabel?: string;
        ctaLink?: string;
        videoUrl?: string;
    };
    campusId?: string;
    config?: Record<string, any>;
    slug?: string;
    subtitle?: string;
    description?: string;
    archetype?: RitualArchetype;
    startsAt?: string;
    endsAt?: string;
}>;
export type RitualComposerInput = z.infer<typeof RitualComposerSchema>;
export declare function createDefaultConfig(archetype: RitualArchetype): Record<string, unknown>;
//# sourceMappingURL=composer.d.ts.map