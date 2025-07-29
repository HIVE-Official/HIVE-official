import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveLogoVariants: (props?: {
    variant?: "gold" | "primary" | "inverted" | "monochrome";
    size?: "xs" | "sm" | "lg" | "xl" | "md" | "2xl";
    layout?: "horizontal" | "vertical";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface HiveLogoProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, VariantProps<typeof hiveLogoVariants> {
    showWordmark?: boolean;
    interactive?: boolean;
}
export declare const HiveLogo: React.ForwardRefExoticComponent<HiveLogoProps & React.RefAttributes<HTMLDivElement>>;
export declare const HiveGlyphOnly: ({ size, variant, className, ...props }: Omit<HiveLogoProps, "showWordmark">) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoInteractive: (props: Omit<HiveLogoProps, "interactive">) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=hive-logo.d.ts.map