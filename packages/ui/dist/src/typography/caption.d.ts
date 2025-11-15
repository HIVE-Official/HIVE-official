import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const captionVariants: (props?: {
    tone?: "primary" | "muted" | "inverse" | "accent";
    size?: "sm" | "xs";
    weight?: "medium" | "semibold";
    align?: "end" | "center" | "start";
} & import("class-variance-authority/types").ClassProp) => string;
type CaptionVariantProps = VariantProps<typeof captionVariants>;
export interface CaptionProps extends React.HTMLAttributes<HTMLSpanElement>, CaptionVariantProps {
}
export declare const Caption: React.ForwardRefExoticComponent<CaptionProps & React.RefAttributes<HTMLSpanElement>>;
export { captionVariants };
//# sourceMappingURL=caption.d.ts.map