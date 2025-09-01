import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const refinedButtonVariants: (props?: ({
    variant?: "primary" | "secondary" | "ghost" | "destructive" | "accent" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface RefinedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof refinedButtonVariants> {
    asChild?: boolean;
    loading?: boolean;
}
declare const RefinedButton: React.ForwardRefExoticComponent<RefinedButtonProps & React.RefAttributes<HTMLButtonElement>>;
declare const refinedCardVariants: (props?: ({
    variant?: "default" | "minimal" | "feature" | "elevated" | "interactive" | null | undefined;
    padding?: "sm" | "md" | "lg" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface RefinedCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof refinedCardVariants> {
}
declare const RefinedCard: React.ForwardRefExoticComponent<RefinedCardProps & React.RefAttributes<HTMLDivElement>>;
declare const refinedTypographyVariants: (props?: ({
    variant?: "accent" | "title" | "body" | "caption" | "code" | "hero" | "subtitle" | null | undefined;
    align?: "center" | "left" | "right" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface RefinedTypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof refinedTypographyVariants> {
    as?: React.ElementType;
    children: React.ReactNode;
}
declare const RefinedTypography: React.ForwardRefExoticComponent<RefinedTypographyProps & React.RefAttributes<HTMLElement>>;
declare const refinedInputVariants: (props?: ({
    variant?: "default" | "filled" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface RefinedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof refinedInputVariants> {
}
declare const RefinedInput: React.ForwardRefExoticComponent<RefinedInputProps & React.RefAttributes<HTMLInputElement>>;
declare const refinedBadgeVariants: (props?: ({
    variant?: "destructive" | "success" | "warning" | "accent" | "default" | "outline" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface RefinedBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof refinedBadgeVariants> {
}
declare function RefinedBadge({ className, variant, ...props }: RefinedBadgeProps): import("react/jsx-runtime").JSX.Element;
export { RefinedButton, RefinedCard, RefinedTypography, RefinedInput, RefinedBadge, refinedButtonVariants, refinedCardVariants, refinedTypographyVariants, refinedInputVariants, refinedBadgeVariants };
//# sourceMappingURL=refined-components.d.ts.map