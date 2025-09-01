import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const patternVariants: (props?: ({
    variant?: "border" | "glow" | "gradient" | "tessellation" | "watermark" | null | undefined;
    density?: "normal" | "dense" | "sparse" | null | undefined;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface HivePatternProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, VariantProps<typeof patternVariants> {
    animated?: boolean;
    children?: React.ReactNode;
}
export declare const HiveTessellation: ({ variant, density, size, animated, className, children, ...props }: HivePatternProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveWatermark: ({ density, size, className, children, ...props }: HivePatternProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveBorder: ({ side, size, className, children, ...props }: HivePatternProps & {
    side?: "top" | "bottom" | "left" | "right" | "all";
}) => import("react/jsx-runtime").JSX.Element;
export declare const HiveGlow: ({ intensity, color, className, children, ...props }: HivePatternProps & {
    intensity?: "low" | "normal" | "high";
    color?: string;
}) => import("react/jsx-runtime").JSX.Element;
export declare const HiveFloating: ({ count, className, children, ...props }: HivePatternProps & {
    count?: number;
}) => import("react/jsx-runtime").JSX.Element;
export declare const HiveCorners: ({ size, className, children, ...props }: HivePatternProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLoadingPattern: ({ className, children, ...props }: HivePatternProps) => import("react/jsx-runtime").JSX.Element;
export { HiveTessellation as TessellationPattern, HiveWatermark as WatermarkPattern, HiveBorder as BorderPattern, HiveGlow as GlowPattern, HiveFloating as FloatingPattern, HiveCorners as CornersPattern, HiveLoadingPattern as LoadingPattern, };
//# sourceMappingURL=hive-logo-patterns.d.ts.map