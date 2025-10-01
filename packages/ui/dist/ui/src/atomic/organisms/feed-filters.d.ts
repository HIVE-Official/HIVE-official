import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Feed Filters
 *
 * Filter controls for feed (Following/All, spaces, content type)
 */
declare const feedfiltersVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface FeedFiltersProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof feedfiltersVariants> {
    activeFilter?: any;
    spaces?: any;
    contentTypes?: any;
    onFilterChange?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const FeedFilters: React.ForwardRefExoticComponent<FeedFiltersProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=feed-filters.d.ts.map