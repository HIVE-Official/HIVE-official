/**
 * HIVE Container System
 * Campus-first responsive container component with max-width constraints
 */
import React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const containerVariants: (props?: ({
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | "screen" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | null | undefined;
    padding?: "sm" | "md" | "lg" | "xl" | "none" | null | undefined;
    campusLayout?: "page-content" | "course-content" | "profile-content" | "auth-content" | "dashboard-content" | "modal-content" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ContainerProps extends VariantProps<typeof containerVariants> {
    children: React.ReactNode;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}
export declare const Container: React.FC<ContainerProps>;
//# sourceMappingURL=container.d.ts.map