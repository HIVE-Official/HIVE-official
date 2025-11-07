import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const textVariants: (props?: {
    size?: "sm" | "lg" | "xl" | "md" | "xs" | "display-sm" | "display-md" | "display-lg";
    tone?: "success" | "warning" | "secondary" | "primary" | "muted" | "danger" | "inverse" | "tertiary" | "accent";
    weight?: "bold" | "medium" | "light" | "semibold" | "regular";
    align?: "center" | "end" | "start" | "justify";
    leading?: "normal" | "loose" | "tight" | "snug" | "relaxed";
    uppercase?: boolean;
    tracking?: "normal" | "wide" | "wider";
    truncate?: boolean;
} & import("class-variance-authority/types").ClassProp) => string;
type TextVariantProps = VariantProps<typeof textVariants>;
type PolymorphicTextProps<T extends React.ElementType> = {
    as?: T;
} & TextVariantProps & Omit<React.ComponentPropsWithoutRef<T>, keyof TextVariantProps | "as">;
export type TextProps<T extends React.ElementType = "p"> = PolymorphicTextProps<T>;
export declare const Text: React.ForwardRefExoticComponent<Omit<TextProps<React.ElementType<any, keyof React.JSX.IntrinsicElements>>, "ref"> & React.RefAttributes<unknown>>;
export { textVariants };
//# sourceMappingURL=text.d.ts.map