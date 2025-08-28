import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const vercelButtonVariants: (props?: {
    variant?: "primary" | "secondary" | "accent" | "ghost";
    size?: "sm" | "md" | "lg" | "icon";
} & import("class-variance-authority/types").ClassProp) => string;
declare const appleButtonVariants: (props?: {
    variant?: "primary" | "secondary" | "accent" | "destructive";
    size?: "sm" | "md" | "lg" | "icon";
} & import("class-variance-authority/types").ClassProp) => string;
declare const campusButtonVariants: (props?: {
    variant?: "subtle" | "energy" | "chill" | "hype";
    size?: "sm" | "md" | "lg" | "xl" | "icon";
} & import("class-variance-authority/types").ClassProp) => string;
declare const techButtonVariants: (props?: {
    variant?: "execute" | "terminal" | "system" | "debug";
    size?: "sm" | "md" | "lg" | "icon" | "xs";
} & import("class-variance-authority/types").ClassProp) => string;
declare const socialButtonVariants: (props?: {
    variant?: "share" | "connect" | "engage" | "react";
    size?: "sm" | "md" | "lg" | "icon";
} & import("class-variance-authority/types").ClassProp) => string;
interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    loading?: boolean;
    children: React.ReactNode;
}
export interface VercelButtonProps extends BaseButtonProps, VariantProps<typeof vercelButtonVariants> {
}
export declare const VercelButton: React.ForwardRefExoticComponent<VercelButtonProps & React.RefAttributes<HTMLButtonElement>>;
export interface AppleButtonProps extends BaseButtonProps, VariantProps<typeof appleButtonVariants> {
}
export declare const AppleButton: React.ForwardRefExoticComponent<AppleButtonProps & React.RefAttributes<HTMLButtonElement>>;
export interface CampusButtonProps extends BaseButtonProps, VariantProps<typeof campusButtonVariants> {
}
export declare const CampusButton: React.ForwardRefExoticComponent<CampusButtonProps & React.RefAttributes<HTMLButtonElement>>;
export interface TechButtonProps extends BaseButtonProps, VariantProps<typeof techButtonVariants> {
}
export declare const TechButton: React.ForwardRefExoticComponent<TechButtonProps & React.RefAttributes<HTMLButtonElement>>;
export interface SocialButtonProps extends BaseButtonProps, VariantProps<typeof socialButtonVariants> {
}
export declare const SocialButton: React.ForwardRefExoticComponent<SocialButtonProps & React.RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=button-options.d.ts.map