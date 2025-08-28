import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const minimalCardVariants: (props?: {
    variant?: "default" | "feature" | "elevated" | "interactive";
    padding?: "sm" | "md" | "lg" | "none";
} & import("class-variance-authority/types").ClassProp) => string;
declare const glassCardVariants: (props?: {
    variant?: "default" | "frosted" | "iridescent" | "crystal";
    padding?: "sm" | "md" | "lg" | "none";
} & import("class-variance-authority/types").ClassProp) => string;
declare const campusCardVariants: (props?: {
    variant?: "sticky" | "study" | "dorm" | "bulletin";
    padding?: "sm" | "md" | "lg" | "none";
} & import("class-variance-authority/types").ClassProp) => string;
declare const techCardVariants: (props?: {
    variant?: "terminal" | "system" | "debug" | "console";
    padding?: "sm" | "md" | "lg" | "none" | "xs";
} & import("class-variance-authority/types").ClassProp) => string;
declare const socialCardVariants: (props?: {
    variant?: "reaction" | "post" | "community" | "chat";
    padding?: "sm" | "md" | "lg" | "xl" | "none";
} & import("class-variance-authority/types").ClassProp) => string;
interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}
export interface MinimalCardProps extends BaseCardProps, VariantProps<typeof minimalCardVariants> {
}
export declare const MinimalCard: React.ForwardRefExoticComponent<MinimalCardProps & React.RefAttributes<HTMLDivElement>>;
export interface GlassCardProps extends BaseCardProps, VariantProps<typeof glassCardVariants> {
}
export declare const GlassCard: React.ForwardRefExoticComponent<GlassCardProps & React.RefAttributes<HTMLDivElement>>;
export interface CampusCardProps extends BaseCardProps, VariantProps<typeof campusCardVariants> {
}
export declare const CampusCard: React.ForwardRefExoticComponent<CampusCardProps & React.RefAttributes<HTMLDivElement>>;
export interface TechCardProps extends BaseCardProps, VariantProps<typeof techCardVariants> {
}
export declare const TechCard: React.ForwardRefExoticComponent<TechCardProps & React.RefAttributes<HTMLDivElement>>;
export interface SocialCardProps extends BaseCardProps, VariantProps<typeof socialCardVariants> {
}
export declare const SocialCard: React.ForwardRefExoticComponent<SocialCardProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=card-options.d.ts.map