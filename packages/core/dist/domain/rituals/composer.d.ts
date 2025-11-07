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
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
    }, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
    }>>;
    config: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    config: Record<string, any>;
    description: string;
    archetype: RitualArchetype;
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    campusId?: string | undefined;
    slug?: string | undefined;
    subtitle?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
    } | undefined;
}, {
    title: string;
    description: string;
    archetype: RitualArchetype;
    startsAt: string;
    endsAt: string;
    campusId?: string | undefined;
    config?: Record<string, any> | undefined;
    slug?: string | undefined;
    subtitle?: string | undefined;
    visibility?: "public" | "invite_only" | "secret" | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
    } | undefined;
}>;
export type RitualComposerInput = z.infer<typeof RitualComposerSchema>;
export declare function createDefaultConfig(archetype: RitualArchetype): Record<string, unknown>;
//# sourceMappingURL=composer.d.ts.map