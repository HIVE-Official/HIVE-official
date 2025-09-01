import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const minimalTypographyVariants: (props?: ({
    variant?: "accent" | "title" | "body" | "caption" | "hero" | "subtitle" | null | undefined;
    align?: "center" | "left" | "right" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const displayTypographyVariants: (props?: ({
    variant?: "brand" | "hero" | "impact" | "emphasis" | "headline" | "subhead" | null | undefined;
    align?: "center" | "left" | "right" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const campusTypographyVariants: (props?: ({
    variant?: "campus" | "energy" | "bulletin" | "sticker" | "handwritten" | "chalk" | null | undefined;
    align?: "center" | "left" | "right" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const techTypographyVariants: (props?: ({
    variant?: "error" | "success" | "code" | "output" | "terminal" | "command" | "debug" | null | undefined;
    align?: "center" | "left" | "right" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const socialTypographyVariants: (props?: ({
    variant?: "username" | "emoji" | "timestamp" | "reaction" | "mention" | "chat" | "friendly" | "hashtag" | null | undefined;
    align?: "center" | "left" | "right" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface BaseTypographyProps extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType;
    children: React.ReactNode;
}
export interface MinimalTypographyProps extends BaseTypographyProps, VariantProps<typeof minimalTypographyVariants> {
}
export declare const MinimalTypography: React.ForwardRefExoticComponent<MinimalTypographyProps & React.RefAttributes<HTMLElement>>;
export interface DisplayTypographyProps extends BaseTypographyProps, VariantProps<typeof displayTypographyVariants> {
}
export declare const DisplayTypography: React.ForwardRefExoticComponent<DisplayTypographyProps & React.RefAttributes<HTMLElement>>;
export interface CampusTypographyProps extends BaseTypographyProps, VariantProps<typeof campusTypographyVariants> {
}
export declare const CampusTypography: React.ForwardRefExoticComponent<CampusTypographyProps & React.RefAttributes<HTMLElement>>;
export interface TechTypographyProps extends BaseTypographyProps, VariantProps<typeof techTypographyVariants> {
}
export declare const TechTypography: React.ForwardRefExoticComponent<TechTypographyProps & React.RefAttributes<HTMLElement>>;
export interface SocialTypographyProps extends BaseTypographyProps, VariantProps<typeof socialTypographyVariants> {
}
export declare const SocialTypography: React.ForwardRefExoticComponent<SocialTypographyProps & React.RefAttributes<HTMLElement>>;
export declare const MinimalHero: ({ children, ...props }: Omit<MinimalTypographyProps, "variant">) => import("react/jsx-runtime").JSX.Element;
export declare const DisplayImpact: ({ children, ...props }: Omit<DisplayTypographyProps, "variant">) => import("react/jsx-runtime").JSX.Element;
export declare const CampusEnergy: ({ children, ...props }: Omit<CampusTypographyProps, "variant">) => import("react/jsx-runtime").JSX.Element;
export declare const TechTerminal: ({ children, ...props }: Omit<TechTypographyProps, "variant">) => import("react/jsx-runtime").JSX.Element;
export declare const SocialFriendly: ({ children, ...props }: Omit<SocialTypographyProps, "variant">) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=typography-options.d.ts.map