import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Feed Search Bar
 *
 * Search bar with filters and suggestions
 */
declare const feedsearchbarVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface FeedSearchBarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof feedsearchbarVariants> {
    placeholder?: any;
    onSearch?: any;
    filters?: any;
    suggestions?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const FeedSearchBar: React.ForwardRefExoticComponent<FeedSearchBarProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=feed-search-bar.d.ts.map