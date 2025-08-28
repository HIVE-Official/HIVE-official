/**
 * HIVE Button Component - Refined with CSS Variables & Composition System
 * Demonstrates proper use of design tokens and atomic composition rules
 */
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonVariants: (props?: {
    variant?: "primary" | "secondary" | "ghost" | "destructive";
    size?: "default" | "sm" | "lg" | "icon";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
export declare const buttonCompositionData: {
    readonly sizes: {
        readonly sm: {
            readonly height: "var(--hive-height-button-sm)";
            readonly padding: "var(--hive-space-2) var(--hive-space-3)";
            readonly fontSize: "var(--hive-font-size-small)";
            readonly iconSize: "var(--hive-icon-small)";
            readonly gap: "var(--hive-space-2)";
        };
        readonly base: {
            readonly height: "var(--hive-height-button-base)";
            readonly padding: "var(--hive-space-3) var(--hive-space-4)";
            readonly fontSize: "var(--hive-font-size-base)";
            readonly iconSize: "var(--hive-icon-base)";
            readonly gap: "var(--hive-space-2)";
        };
        readonly lg: {
            readonly height: "var(--hive-height-button-lg)";
            readonly padding: "var(--hive-space-4) var(--hive-space-5)";
            readonly fontSize: "var(--hive-font-size-large)";
            readonly iconSize: "var(--hive-icon-large)";
            readonly gap: "var(--hive-space-2)";
        };
    };
    readonly variants: {
        readonly primary: {
            readonly backgroundColor: "transparent";
            readonly borderColor: "var(--hive-gold-primary)";
            readonly borderWidth: "1px";
            readonly color: "var(--hive-gold-primary)";
            readonly hoverBackgroundColor: "var(--hive-gold-background)";
            readonly hoverBorderColor: "var(--hive-gold-hover)";
            readonly activeBackgroundColor: "var(--hive-bg-selected)";
            readonly focusRingColor: "var(--hive-gold-border)";
        };
        readonly secondary: {
            readonly backgroundColor: "transparent";
            readonly borderColor: "var(--hive-border-glass)";
            readonly borderWidth: "1px";
            readonly color: "var(--hive-text-primary)";
            readonly hoverBackgroundColor: "var(--hive-bg-subtle)";
            readonly hoverBorderColor: "var(--hive-border-glass-strong)";
            readonly activeBackgroundColor: "var(--hive-bg-active)";
            readonly focusRingColor: "var(--hive-border-glass-strong)";
        };
        readonly ghost: {
            readonly backgroundColor: "transparent";
            readonly borderColor: "transparent";
            readonly borderWidth: "1px";
            readonly color: "var(--hive-text-secondary)";
            readonly hoverBackgroundColor: "var(--hive-bg-subtle)";
            readonly hoverColor: "var(--hive-text-primary)";
            readonly activeBackgroundColor: "var(--hive-bg-active)";
            readonly focusRingColor: "var(--hive-border-glass)";
        };
    };
};
//# sourceMappingURL=button-refined.d.ts.map