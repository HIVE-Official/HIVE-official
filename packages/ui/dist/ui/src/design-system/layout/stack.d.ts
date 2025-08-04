/**
 * HIVE Stack System
 * Campus-first flexible stacking layout component
 */
import React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const stackVariants: (props?: {
    direction?: "row" | "row-reverse" | "column" | "column-reverse";
    align?: "center" | "end" | "start" | "baseline" | "stretch";
    justify?: "center" | "end" | "start" | "between" | "around" | "evenly";
    gap?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "none";
    wrap?: boolean;
    campusLayout?: "navigation" | "course-header" | "profile-info" | "activity-row" | "tool-actions" | "form-field" | "card-content";
} & import("class-variance-authority/types").ClassProp) => string;
export interface StackProps extends VariantProps<typeof stackVariants> {
    children: React.ReactNode;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}
export declare const Stack: React.FC<StackProps>;
//# sourceMappingURL=stack.d.ts.map