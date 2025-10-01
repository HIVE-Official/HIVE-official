import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Feed Skeleton Loader
 *
 * Loading skeleton for feed
 */
declare const feedskeletonloaderVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface FeedSkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof feedskeletonloaderVariants> {
    count?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const FeedSkeletonLoader: React.ForwardRefExoticComponent<FeedSkeletonLoaderProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=feed-skeleton-loader.d.ts.map