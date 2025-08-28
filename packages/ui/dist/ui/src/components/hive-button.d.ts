import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveButtonVariants: (props?: {
    variant?: "link" | "primary" | "secondary" | "ghost" | "destructive" | "outline" | "default" | "success" | "minimal" | "warning" | "glow" | "premium" | "outline-subtle" | "ghost-gold" | "chip" | "chip-platinum" | "chip-gold" | "chip-glass";
    size?: "default" | "sm" | "md" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg" | "xs" | "chip" | "chip-xs" | "chip-sm" | "chip-lg";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof hiveButtonVariants> {
    asChild?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    magneticHover?: boolean;
    magneticIntensity?: 'subtle' | 'medium' | 'strong';
    rippleEffect?: boolean;
}
declare const HiveButton: React.ForwardRefExoticComponent<HiveButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { HiveButton, hiveButtonVariants };
export { HiveButton as Button, hiveButtonVariants as buttonVariants };
//# sourceMappingURL=hive-button.d.ts.map