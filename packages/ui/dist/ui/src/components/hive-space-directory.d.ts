import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type Space } from '@hive/core';
declare const hiveSpaceDirectoryVariants: (props?: {
    layout?: "grid" | "list" | "masonry";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface HiveSpaceDirectoryProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveSpaceDirectoryVariants> {
    spaces: Space[];
    isLoading?: boolean;
    onSpaceClick?: (space: Space) => void;
    onSpaceJoin?: (space: Space) => void;
    onSpaceLeave?: (space: Space) => void;
    onCreateSpace?: () => void;
    joinedSpaceIds?: string[];
    trendingSpaceIds?: string[];
    searchPlaceholder?: string;
    showCreateButton?: boolean;
    showTrendingSection?: boolean;
    showFilters?: boolean;
    showLayoutToggle?: boolean;
    defaultSort?: string;
    maxSpacesPerRow?: number;
    enableVirtualization?: boolean;
}
export declare const HiveSpaceDirectory: React.ForwardRefExoticComponent<HiveSpaceDirectoryProps & React.RefAttributes<HTMLDivElement>>;
export { hiveSpaceDirectoryVariants };
//# sourceMappingURL=hive-space-directory.d.ts.map