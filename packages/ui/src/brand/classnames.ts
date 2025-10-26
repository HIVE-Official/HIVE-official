// Bounded Context Owner: Design System Guild
// Wrapper-free brand helpers: return className strings only

type BentoAccent = "default" | "gold" | "crimson" | "emerald" | "slate";

interface BentoOptions {
  accent?: BentoAccent;
  preview?: boolean;
}

const resolveBentoOptions = (accentOrOptions?: BentoAccent | BentoOptions): BentoOptions => {
  if (!accentOrOptions) {
    return { accent: "default", preview: false };
  }

  if (typeof accentOrOptions === "string") {
    return { accent: accentOrOptions, preview: false };
  }

  return {
    accent: accentOrOptions.accent ?? "default",
    preview: accentOrOptions.preview ?? false
  };
};

export const brand = {
  theme: {
    hive: () => "brand-hive",
    chromium: () => "brand-chromium"
  },
  surface: {
    card: () => "brand-card",
    glass: () => "chrome-glass",
    outline: () => "brand-outline",
    bento: (accentOrOptions?: BentoAccent | BentoOptions) => {
      const { accent, preview } = resolveBentoOptions(accentOrOptions);
      const classes = ["bento-card"];
      if (accent && accent !== "default") {
        classes.push(`bento-card--${accent}`);
      }
      if (preview) classes.push("bento-card--preview");
      return classes.join(" ");
    }
  },
  focus: {
    ring: () => "focus-ring"
  },
  cta: () => "brand-cta focus-ring"
};

export type BrandHelpers = typeof brand;
