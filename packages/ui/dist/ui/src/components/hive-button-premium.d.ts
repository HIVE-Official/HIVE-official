import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hivePremiumButtonVariants: (props?: {
    variant?: "primary" | "secondary" | "success" | "outline" | "ghost" | "chip-gold" | "chip-glass" | "gold-glow" | "danger";
    size?: "default" | "xs" | "sm" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg";
    radius?: "xl" | "medium" | "large" | "pill" | "soft";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HivePremiumButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart'>, VariantProps<typeof hivePremiumButtonVariants> {
    magneticHover?: boolean;
    rippleEffect?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
declare const HivePremiumButton: React.ForwardRefExoticComponent<HivePremiumButtonProps & React.RefAttributes<HTMLButtonElement>>;
export interface HivePremiumButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    cascade?: boolean;
    spacing?: "sm" | "md" | "lg";
}
declare const HivePremiumButtonGroup: React.ForwardRefExoticComponent<HivePremiumButtonGroupProps & React.RefAttributes<HTMLDivElement>>;
export { HivePremiumButton, HivePremiumButtonGroup, hivePremiumButtonVariants };
//# sourceMappingURL=hive-button-premium.d.ts.map