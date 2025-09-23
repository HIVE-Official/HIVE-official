import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const topBarNavVariants: (props?: {
    variant?: "default" | "ghost" | "minimal" | "active";
    size?: "default" | "icon" | "sm" | "lg";
    responsive?: "mobile" | "desktop" | "always";
} & import("class-variance-authority/types").ClassProp) => string;
declare const topBarNavIconVariants: (props?: {
    size?: "default" | "icon" | "sm" | "lg";
    state?: "default" | "pulse" | "active";
} & import("class-variance-authority/types").ClassProp) => string;
declare const topBarNavLabelVariants: (props?: {
    visibility?: "mobile" | "desktop" | "always" | "never";
    weight?: "bold" | "normal" | "semibold";
} & import("class-variance-authority/types").ClassProp) => string;
export interface TopBarNavProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof topBarNavVariants> {
    icon?: React.ReactNode;
    label?: string;
    href?: string;
    badge?: string | number;
    isActive?: boolean;
    labelVisibility?: VariantProps<typeof topBarNavLabelVariants>["visibility"];
    labelWeight?: VariantProps<typeof topBarNavLabelVariants>["weight"];
    iconState?: VariantProps<typeof topBarNavIconVariants>["state"];
    asChild?: boolean;
}
declare const TopBarNav: React.ForwardRefExoticComponent<TopBarNavProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
export { TopBarNav, topBarNavVariants, topBarNavIconVariants, topBarNavLabelVariants };
//# sourceMappingURL=top-bar-nav.d.ts.map