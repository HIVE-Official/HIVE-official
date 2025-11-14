import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const linkVariants: (props?: {
    tone?: "danger" | "muted" | "inverse" | "brand" | "neutral";
    size?: "sm" | "md" | "lg";
    weight?: "medium" | "semibold" | "regular";
    underline?: "none" | "always" | "hover";
    subtle?: boolean;
} & import("class-variance-authority/types").ClassProp) => string;
type LinkVariantProps = VariantProps<typeof linkVariants>;
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, LinkVariantProps {
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
}
export declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
export { linkVariants };
//# sourceMappingURL=link.d.ts.map