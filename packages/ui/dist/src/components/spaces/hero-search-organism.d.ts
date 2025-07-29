export interface CampusVisualizationProps {
    /** Total spaces count to display */
    totalSpaces?: number;
    /** Category breakdown for the visualization */
    categoryBreakdown?: Record<string, number>;
    /** Animation speed variant */
    animationSpeed?: "slow" | "normal" | "fast";
    /** Interactive hover effects */
    interactive?: boolean;
    /** Custom className */
    className?: string;
}
export interface EnhancedSearchBarProps {
    /** Search query value */
    value?: string;
    /** Search query change handler */
    onChange?: (value: string) => void;
    /** Search submit handler */
    onSearch?: (query: string) => void;
    /** Placeholder text */
    placeholder?: string;
    /** Show filters toggle */
    showFilters?: boolean;
    /** Filter toggle handler */
    onFilterToggle?: () => void;
    /** Quick filter tags */
    filterTags?: string[];
    /** Filter tag click handler */
    onFilterTag?: (tag: string) => void;
    /** Loading state */
    isLoading?: boolean;
    /** Custom className */
    className?: string;
}
export interface QuickActionButtonsProps {
    /** Browse all handler */
    onBrowseAll?: () => void;
    /** Trending handler */
    onTrending?: () => void;
    /** My spaces handler */
    onMySpaces?: () => void;
    /** Custom actions */
    customActions?: Array<{
        label: string;
        icon?: React.ComponentType<{
            className?: string;
        }>;
        onClick: () => void;
        variant?: "default" | "primary" | "outline";
    }>;
    /** Loading state */
    isLoading?: boolean;
    /** Layout variant */
    layout?: "horizontal" | "vertical";
    /** Custom className */
    className?: string;
}
export interface HeroSearchOrganismProps {
    /** Hero title */
    title?: string;
    /** Hero subtitle */
    subtitle?: string;
    /** Total spaces count */
    totalSpaces?: number;
    /** Category breakdown data */
    categoryBreakdown?: Record<string, number>;
    /** Search handlers */
    onSearch?: (query: string) => void;
    /** Navigation handlers */
    onBrowseAll?: () => void;
    onTrending?: () => void;
    onMySpaces?: () => void;
    /** Custom actions */
    customActions?: Array<{
        label: string;
        icon?: React.ComponentType<{
            className?: string;
        }>;
        onClick: () => void;
        variant?: "default" | "primary" | "outline";
    }>;
    /** Campus visualization props */
    campusVisualization?: {
        animationSpeed?: "slow" | "normal" | "fast";
        interactive?: boolean;
    };
    /** Search configuration */
    searchConfig?: {
        placeholder?: string;
        showFilters?: boolean;
        filterTags?: string[];
    };
    /** Layout variant */
    variant?: "default" | "compact" | "minimal";
    /** Loading state */
    isLoading?: boolean;
    /** Custom className */
    className?: string;
}
export declare function HeroSearchOrganism({ title, subtitle, totalSpaces, categoryBreakdown, onSearch, onBrowseAll, onTrending, onMySpaces, customActions, campusVisualization, searchConfig, variant, isLoading, className }: HeroSearchOrganismProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=hero-search-organism.d.ts.map