import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const hiveLogoVariants: (props?: {
    size?: "sm" | "lg" | "xl" | "default" | "2xl";
    variant?: "white" | "dark" | "default" | "gradient" | "monochrome" | "platinum" | "aurora";
    animated?: "none" | "pulse" | "bounce" | "glow";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HiveLogoProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveLogoVariants> {
    showIcon?: boolean;
    showText?: boolean;
    href?: string;
    target?: string;
}
declare const HiveLogo: React.ForwardRefExoticComponent<HiveLogoProps & React.RefAttributes<HTMLDivElement>>;
export declare const HiveLogos: {
    standard: (props: Partial<HiveLogoProps>) => import("react/jsx-runtime").JSX.Element;
    icon: (props: Partial<HiveLogoProps>) => import("react/jsx-runtime").JSX.Element;
    text: (props: Partial<HiveLogoProps>) => import("react/jsx-runtime").JSX.Element;
    white: (props: Partial<HiveLogoProps>) => import("react/jsx-runtime").JSX.Element;
    gradient: (props: Partial<HiveLogoProps>) => import("react/jsx-runtime").JSX.Element;
    glowing: (props: Partial<HiveLogoProps>) => import("react/jsx-runtime").JSX.Element;
};
export { HiveLogo, hiveLogoVariants };
//# sourceMappingURL=hive-logo.d.ts.map