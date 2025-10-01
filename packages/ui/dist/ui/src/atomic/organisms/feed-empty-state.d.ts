import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Feed Empty State
 *
 * Empty state when no posts available
 */
declare const feedemptystateVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface FeedEmptyStateProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof feedemptystateVariants> {
    message?: any;
    actionText?: any;
    onAction?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const FeedEmptyState: React.ForwardRefExoticComponent<FeedEmptyStateProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=feed-empty-state.d.ts.map