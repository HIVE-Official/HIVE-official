import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveLogoVariants: (props?: {
    variant?: "gold" | "primary" | "glass" | "inverted" | "monochrome" | "gradient" | "neon" | "holographic";
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "xs" | "3xl" | "4xl";
    effect?: "none" | "bounce" | "glow" | "ping" | "pulse" | "spin";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface HiveLogoVariantProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, VariantProps<typeof hiveLogoVariants> {
    animated?: boolean;
}
export declare const HiveLogoAnimated: ({ variant, size, className, ...props }: HiveLogoVariantProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoSpinner: ({ variant, size, className, ...props }: HiveLogoVariantProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoPulse: ({ variant, size, className, ...props }: HiveLogoVariantProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoAssembly: ({ variant, size, className, ...props }: HiveLogoVariantProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveGlyphSimple: ({ variant, size, className, ...props }: HiveLogoVariantProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoOutlined: ({ variant, size, className, ...props }: HiveLogoVariantProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveMonogram: ({ variant, size, className, ...props }: HiveLogoVariantProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoGlass: ({ size, className, ...props }: HiveLogoVariantProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoNeon: ({ size, className, ...props }: HiveLogoVariantProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoHolographic: ({ size, className, ...props }: HiveLogoVariantProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoParticles: ({ variant, size, className, ...props }: HiveLogoVariantProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoProgress: ({ progress, variant, size, className, ...props }: HiveLogoVariantProps & {
    progress?: number;
}) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoContextual: ({ context, size, className, ...props }: HiveLogoVariantProps & {
    context?: "loading" | "success" | "error" | "warning" | "default";
}) => import("react/jsx-runtime").JSX.Element;
export { HiveLogoAnimated as AnimatedLogo, HiveLogoSpinner as SpinnerLogo, HiveLogoPulse as PulseLogo, HiveLogoAssembly as AssemblyLogo, HiveGlyphSimple as SimpleLogo, HiveLogoOutlined as OutlinedLogo, HiveMonogram as MonogramLogo, HiveLogoGlass as GlassLogo, HiveLogoNeon as NeonLogo, HiveLogoHolographic as HolographicLogo, HiveLogoParticles as ParticlesLogo, HiveLogoProgress as ProgressLogo, HiveLogoContextual as ContextualLogo, };
//# sourceMappingURL=hive-logo-variants.d.ts.map