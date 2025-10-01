import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Feed Post Full
 *
 * Complete post with expanded comments and interactions
 */
declare const feedpostfullVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface FeedPostFullProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof feedpostfullVariants> {
    post?: any;
    comments?: any;
    onComment?: any;
    onShare?: any;
    onEdit?: any;
    onDelete?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const FeedPostFull: React.ForwardRefExoticComponent<FeedPostFullProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=feed-post-full.d.ts.map