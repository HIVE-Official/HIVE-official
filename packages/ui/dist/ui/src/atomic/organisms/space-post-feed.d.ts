import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Post Feed
 *
 * Post feed within a space
 */
declare const spacepostfeedVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpacePostFeedProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spacepostfeedVariants> {
    posts?: any;
    hasComposer?: any;
    onPost?: any;
    onLoadMore?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpacePostFeed: React.ForwardRefExoticComponent<SpacePostFeedProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-post-feed.d.ts.map