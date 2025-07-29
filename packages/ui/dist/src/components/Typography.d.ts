import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const headingVariants: (props?: {
    level?: 1 | 2 | 4 | 3;
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
}
declare const Heading: React.ForwardRefExoticComponent<HeadingProps & React.RefAttributes<HTMLHeadingElement>>;
declare const Text: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const Muted: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
export { Heading, Text, Muted };
//# sourceMappingURL=Typography.d.ts.map