/**
 * HIVE Stack System
 * Campus-first flexible stacking layout component
 */
import React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const stackVariants: (props?: ({
    direction?: "row" | "column" | "column-reverse" | "row-reverse" | null | undefined;
    align?: "end" | "baseline" | "center" | "start" | "stretch" | null | undefined;
    justify?: "end" | "center" | "start" | "between" | "around" | "evenly" | null | undefined;
    gap?: "xs" | "sm" | "md" | "lg" | "xl" | "none" | "2xl" | null | undefined;
    wrap?: boolean | null | undefined;
    campusLayout?: "navigation" | "course-header" | "profile-info" | "activity-row" | "tool-actions" | "form-field" | "card-content" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface StackProps extends VariantProps<typeof stackVariants> {
    children: React.ReactNode;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}
export declare const Stack: React.FC<StackProps>;
//# sourceMappingURL=stack.d.ts.map