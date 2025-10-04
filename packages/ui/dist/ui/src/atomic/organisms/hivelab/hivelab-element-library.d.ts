/**
 * HiveLab Element Library Panel
 *
 * Floating panel containing all available elements organized by category.
 * Users can search, filter, and drag elements onto the canvas.
 */
import type { ElementDefinition } from '@/types/hivelab.types';
export interface HiveLabElementLibraryProps {
    /** Available element definitions */
    elements: ElementDefinition[];
    /** Element selection handler (for dragging to canvas) */
    onElementSelect?: (element: ElementDefinition) => void;
    /** Toggle favorite handler */
    onToggleFavorite?: (elementId: string) => void;
    /** Search query */
    searchQuery?: string;
    /** Search handler */
    onSearchChange?: (query: string) => void;
    /** Show favorites only */
    showFavoritesOnly?: boolean;
    /** Panel position */
    position?: 'left' | 'right';
    /** Panel width */
    width?: number;
    /** Is panel collapsed? */
    isCollapsed?: boolean;
    /** Collapse handler */
    onToggleCollapse?: () => void;
    /** Close handler */
    onClose?: () => void;
    /** Additional class names */
    className?: string;
}
export declare function HiveLabElementLibrary({ elements, onElementSelect, onToggleFavorite, searchQuery: externalSearchQuery, onSearchChange: externalOnSearchChange, showFavoritesOnly, position, width, isCollapsed, onToggleCollapse, onClose, className, }: HiveLabElementLibraryProps): import("react/jsx-runtime").JSX.Element;
export declare namespace HiveLabElementLibrary {
    var displayName: string;
}
//# sourceMappingURL=hivelab-element-library.d.ts.map