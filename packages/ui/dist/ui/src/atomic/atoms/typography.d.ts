import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const headingVariants: (props?: {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    color?: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "brand" | "tertiary";
    weight?: "light" | "bold" | "normal" | "medium" | "semibold";
} & import("class-variance-authority/types").ClassProp) => string;
declare const textVariants: (props?: {
    size?: "xs" | "sm" | "lg" | "xl" | "base";
    color?: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "disabled" | "brand" | "tertiary" | "inverse";
    weight?: "light" | "bold" | "normal" | "medium" | "semibold";
    decoration?: "none" | "line-through" | "underline";
} & import("class-variance-authority/types").ClassProp) => string;
declare const captionVariants: (props?: {
    color?: "success" | "warning" | "error" | "info" | "disabled" | "brand" | "tertiary";
    weight?: "normal" | "medium" | "semibold";
} & import("class-variance-authority/types").ClassProp) => string;
declare const linkVariants: (props?: {
    color?: "primary" | "secondary" | "brand" | "tertiary";
    decoration?: "none" | "always" | "hover";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HeadingProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>, VariantProps<typeof headingVariants> {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
export declare const Heading: React.ForwardRefExoticComponent<HeadingProps & React.RefAttributes<HTMLHeadingElement>>;
export interface TextProps extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>, VariantProps<typeof textVariants> {
    as?: "p" | "span" | "div" | "label";
}
export declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLElement>>;
export interface CaptionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>, VariantProps<typeof captionVariants> {
    as?: "p" | "span" | "div" | "figcaption";
}
export declare const Caption: React.ForwardRefExoticComponent<CaptionProps & React.RefAttributes<HTMLElement>>;
export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>, VariantProps<typeof linkVariants> {
}
export declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "inline" | "block";
}
export declare const Code: React.ForwardRefExoticComponent<CodeProps & React.RefAttributes<HTMLElement>>;
export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
}
export declare const Blockquote: React.ForwardRefExoticComponent<BlockquoteProps & React.RefAttributes<HTMLQuoteElement>>;
export interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
    variant?: "unordered" | "ordered";
}
export declare const List: React.ForwardRefExoticComponent<ListProps & React.RefAttributes<HTMLOListElement | HTMLUListElement>>;
export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
}
export declare const ListItem: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<HTMLLIElement>>;
export declare const TypographyPresets: {
    PageTitle: (props: Omit<HeadingProps, "level">) => import("react/jsx-runtime").JSX.Element;
    SectionTitle: (props: Omit<HeadingProps, "level">) => import("react/jsx-runtime").JSX.Element;
    CardTitle: (props: Omit<HeadingProps, "level">) => import("react/jsx-runtime").JSX.Element;
    Body: (props: Omit<TextProps, "size">) => import("react/jsx-runtime").JSX.Element;
    Small: (props: Omit<TextProps, "size">) => import("react/jsx-runtime").JSX.Element;
    CaptionText: (props: Omit<CaptionProps, "size">) => import("react/jsx-runtime").JSX.Element;
    ErrorText: (props: Omit<TextProps, "color" | "size">) => import("react/jsx-runtime").JSX.Element;
    SuccessText: (props: Omit<TextProps, "color" | "size">) => import("react/jsx-runtime").JSX.Element;
    BrandText: (props: Omit<TextProps, "color">) => import("react/jsx-runtime").JSX.Element;
};
export { headingVariants, textVariants, captionVariants, linkVariants };
//# sourceMappingURL=typography.d.ts.map