// Bounded Context Owner: Identity & Access Management Guild
// Canonical typography system for Hive. Defaults to Geist Sans/Mono, with
// density-aware roles and numeric/mono rules. All apps should consume these
// roles through the Tailwind preset — never hard-code pixel values.

import { z } from "zod";

export const textRoles = [
  "display",
  "h1",
  "h2",
  "h3",
  "h4",
  "lead",
  "body",
  "bodySm",
  "caption",
  "label",
  "legal",
  "code",
  "kbd"
] as const;

export type TextRole = typeof textRoles[number];

export const Density = {
  compact: { fontScale: 0.95, lineScale: 0.92 },
  cozy: { fontScale: 1.0, lineScale: 1.0 },
  comfortable: { fontScale: 1.05, lineScale: 1.05 }
} as const;

export type DensityKey = keyof typeof Density;

export const TypographyRoleSchema = z.object({
  sizeRem: z.number().positive(), // base font-size in rem
  line: z.number().positive(), // unitless line-height
  trackingEm: z.number().default(0), // letter-spacing in em (can be negative)
  weight: z.number().int().min(100).max(1000),
  family: z.enum(["sans", "mono"]).default("sans"),
  uppercase: z.boolean().optional()
});

export type TypographyRole = z.infer<typeof TypographyRoleSchema>;

export const TypographyConfigSchema = z.object({
  density: z.nativeEnum({ compact: "compact", cozy: "cozy", comfortable: "comfortable" }).default(
    "cozy"
  ) as z.ZodType<DensityKey>,
  roles: z.record(z.enum(textRoles), TypographyRoleSchema)
});

export type TypographyConfig = z.infer<typeof TypographyConfigSchema>;

export const defaultTypographyConfig: TypographyConfig = {
  density: "cozy",
  roles: {
    display: { sizeRem: 3.75, line: 1.1, trackingEm: -0.02, weight: 600, family: "sans" }, // 60px
    h1: { sizeRem: 3.0, line: 1.12, trackingEm: -0.01, weight: 600, family: "sans" }, // 48px
    h2: { sizeRem: 2.0, line: 1.15, trackingEm: -0.005, weight: 600, family: "sans" }, // 32px
    h3: { sizeRem: 1.25, line: 1.2, trackingEm: 0, weight: 600, family: "sans" }, // 20px
    h4: { sizeRem: 1.125, line: 1.2, trackingEm: 0, weight: 600, family: "sans" }, // 18px

    lead: { sizeRem: 1.125, line: 1.6, trackingEm: 0, weight: 400, family: "sans" }, // 18px
    body: { sizeRem: 1.0, line: 1.65, trackingEm: 0, weight: 400, family: "sans" }, // 16px
    bodySm: { sizeRem: 0.875, line: 1.55, trackingEm: 0, weight: 400, family: "sans" }, // 14px
    caption: { sizeRem: 0.75, line: 1.4, trackingEm: 0, weight: 400, family: "sans" }, // 12px
    legal: { sizeRem: 0.75, line: 1.4, trackingEm: 0, weight: 400, family: "sans" }, // 12px

    label: { sizeRem: 0.75, line: 1.2, trackingEm: 0.18, weight: 600, family: "sans", uppercase: true },
    code: { sizeRem: 0.875, line: 1.5, trackingEm: 0, weight: 500, family: "mono" }, // 14px
    kbd: { sizeRem: 0.75, line: 1.2, trackingEm: 0, weight: 600, family: "mono" } // 12px
  }
};

export function getDensityScales(density: DensityKey) {
  return Density[density];
}

// Compute CSS var map for use in Tailwind preset and styles.css
export function computeTypographyVars(config: TypographyConfig) {
  const { fontScale, lineScale } = getDensityScales(config.density);
  const vars: Record<string, string> = {};
  (textRoles as readonly TextRole[]).forEach((role) => {
    const r = config.roles[role];
    const size = `calc(${r.sizeRem}rem * ${fontScale})`;
    const line = `calc(${r.line} * ${lineScale})`;
    const track = `${r.trackingEm}em`;
    vars[`--font-size-${role}`] = size;
    vars[`--line-height-${role}`] = line;
    vars[`--tracking-${role}`] = track;
    vars[`--font-weight-${role}`] = String(r.weight);
  });
  return vars;
}

export const typographyVars = computeTypographyVars(defaultTypographyConfig);

