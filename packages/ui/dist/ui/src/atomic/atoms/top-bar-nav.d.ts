import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const topBarNavVariants: (props?: {
    variant?: "default" | "active" | "ghost" | "minimal";
    size?: "sm" | "lg" | "default" | "icon";
    responsive?: "always" | "mobile" | "desktop";
} & import("class-variance-authority/types").ClassProp) => string;
declare const topBarNavIconVariants: (props?: {
    size?: "sm" | "lg" | "default" | "icon";
    state?: "default" | "active" | "pulse";
} & import("class-variance-authority/types").ClassProp) => string;
declare const topBarNavLabelVariants: (props?: {
    visibility?: "always" | "never" | "mobile" | "desktop";
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