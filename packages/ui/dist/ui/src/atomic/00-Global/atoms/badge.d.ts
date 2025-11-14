import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const badgeVariants: (props?: {
    variant?: "primary" | "secondary" | "success" | "warning" | "outline" | "default" | "destructive" | "pill" | "freshman" | "sophomore" | "junior" | "senior" | "skill-tag" | "building-tools" | "prof-favorite" | "major-tag" | "active-tag" | "tool-tag" | "leadership";
    tone?: "muted" | "default" | "contrast";
} & import("class-variance-authority/types").ClassProp) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, tone, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export { Badge, badgeVariants };
//# sourceMappingURL=badge.d.ts.map