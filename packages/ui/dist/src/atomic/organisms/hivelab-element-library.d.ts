import * as React from "react";
export interface Element {
    id: string;
    name: string;
    icon: string;
    category: "interaction" | "logic" | "display" | "data" | "action" | "connect";
    description: string;
    color?: string;
    isNew?: boolean;
    isFavorite?: boolean;
    complexity?: "simple" | "medium" | "advanced";
}
export interface HiveLabElementLibraryProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Available elements */
    elements?: Element[];
    /** Filter by category */
    selectedCategory?: Element["category"] | "all";
    /** Category change handler */
    onCategoryChange?: (category: Element["category"] | "all") => void;
    /** Element selection handler (for dragging to canvas) */
    onElementSelect?: (element: Element) => void;
    /** Toggle favorite handler */
    onToggleFavorite?: (elementId: string) => void;
    /** Search query */
    searchQuery?: string;
    /** Search handler */
    onSearchChange?: (query: string) => void;
    /** Show favorites only */
    showFavoritesOnly?: boolean;
}
declare const HiveLabElementLibrary: React.ForwardRefExoticComponent<HiveLabElementLibraryProps & React.RefAttributes<HTMLDivElement>>;
export { HiveLabElementLibrary };
//# sourceMappingURL=hivelab-element-library.d.ts.map