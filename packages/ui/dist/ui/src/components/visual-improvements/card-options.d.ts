import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const minimalCardVariants: (props?: ({
    variant?: "default" | "feature" | "elevated" | "interactive" | null | undefined;
    padding?: "sm" | "md" | "lg" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const glassCardVariants: (props?: ({
    variant?: "default" | "frosted" | "iridescent" | "crystal" | null | undefined;
    padding?: "sm" | "md" | "lg" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const campusCardVariants: (props?: ({
    variant?: "sticky" | "study" | "dorm" | "bulletin" | null | undefined;
    padding?: "sm" | "md" | "lg" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const techCardVariants: (props?: ({
    variant?: "terminal" | "system" | "debug" | "console" | null | undefined;
    padding?: "xs" | "sm" | "md" | "lg" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const socialCardVariants: (props?: ({
    variant?: "reaction" | "post" | "community" | "chat" | null | undefined;
    padding?: "sm" | "md" | "lg" | "xl" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
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