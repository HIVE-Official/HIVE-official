import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const enhancedTypographyVariants: (props?: {
    variant?: "gradient" | "neon" | "hero" | "energy" | "sticker" | "handwritten" | "chalk";
    size?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl" | "4xl";
    weight?: "bold" | "normal" | "medium" | "semibold" | "black";
    spacing?: "normal" | "wide" | "tight" | "wider" | "widest";
} & import("class-variance-authority/types").ClassProp) => string;
export interface EnhancedTypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof enhancedTypographyVariants> {
    as?: React.ElementType;
    children: React.ReactNode;
}
declare const EnhancedTypography: React.ForwardRefExoticComponent<EnhancedTypographyProps & React.RefAttributes<HTMLElement>>;
export declare const HeroText: ({ children, className, ...props }: Omit<EnhancedTypographyProps, "variant">) => import("react/jsx-runtime").JSX.Element;
export declare const EnergyText: ({ children, className, ...props }: Omit<EnhancedTypographyProps, "variant">) => import("react/jsx-runtime").JSX.Element;
export declare const HandwrittenText: ({ children, className, ...props }: Omit<EnhancedTypographyProps, "variant">) => import("react/jsx-runtime").JSX.Element;
export declare const NeonText: ({ children, className, ...props }: Omit<EnhancedTypographyProps, "variant">) => import("react/jsx-runtime").JSX.Element;
export declare const StickerText: ({ children, className, ...props }: Omit<EnhancedTypographyProps, "variant">) => import("react/jsx-runtime").JSX.Element;
export { EnhancedTypography, enhancedTypographyVariants };
//# sourceMappingURL=enhanced-typography.d.ts.map