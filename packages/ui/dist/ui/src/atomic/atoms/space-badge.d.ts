import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Badge
 *
 * Badge for space category, privacy, etc
 */
declare const spacebadgeVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spacebadgeVariants> {
    type?: any;
    label?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpaceBadge: React.ForwardRefExoticComponent<SpaceBadgeProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-badge.d.ts.map