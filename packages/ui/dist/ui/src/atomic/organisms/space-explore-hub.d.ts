import React from 'react';
import { SpaceCategoryType } from '../atoms/space-category-card';
export interface SpaceExploreStats {
    totalSpaces: number;
    totalMembers: number;
    activeToday: number;
    newThisWeek: number;
}
export interface SpaceCategoryStats {
    type: SpaceCategoryType;
    count: number;
    trending?: boolean;
    recentActivity?: number;
}
export interface SpaceExploreHubProps {
    stats: SpaceExploreStats;
    categories: SpaceCategoryStats[];
    onCategoryClick?: (type: SpaceCategoryType) => void;
    onSearch?: (query: string) => void;
    onShowFilters?: () => void;
    searchQuery?: string;
    isLoading?: boolean;
    className?: string;
}
export declare const SpaceExploreHub: React.FC<SpaceExploreHubProps>;
export default SpaceExploreHub;
//# sourceMappingURL=space-explore-hub.d.ts.map