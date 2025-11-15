import * as React from "react";
import { type VariantProps } from "class-variance-authority";
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
declare const headingVariants: (props?: {
    tone?: "primary" | "secondary" | "muted" | "inverse" | "accent";
    align?: "end" | "center" | "start";
    weight?: "bold" | "medium" | "semibold";
    uppercase?: boolean;
} & import("class-variance-authority/types").ClassProp) => string;
type HeadingVariantProps = VariantProps<typeof headingVariants>;
export interface HeadingProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color" | "children">, HeadingVariantProps {
    level?: HeadingLevel;
    children: React.ReactNode;
}
export declare const Heading: React.ForwardRefExoticComponent<HeadingProps & React.RefAttributes<HTMLHeadingElement>>;
export { headingVariants };
//# sourceMappingURL=heading.d.ts.map