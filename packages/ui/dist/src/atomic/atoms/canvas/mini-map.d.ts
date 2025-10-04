/**
 * Mini-Map Component
 *
 * Overview map showing entire canvas with viewport indicator.
 * Allows quick navigation by clicking or dragging viewport rectangle.
 */
import type { Viewport, Page } from '@/types/hivelab.types';
export interface MiniMapProps {
    /** Current viewport */
    viewport: Viewport;
    /** All pages on canvas */
    pages: Page[];
    /** Current page ID */
    currentPageId?: string;
    /** Container dimensions (to calculate viewport rectangle) */
    containerWidth: number;
    containerHeight: number;
    /** Mini-map width in pixels */
    width?: number;
    /** Mini-map height in pixels */
    height?: number;
    /** Position on screen */
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /** Callback when viewport should change (from click/drag) */
    onViewportChange?: (viewport: Partial<Viewport>) => void;
    /** Additional class names */
    className?: string;
    /** Show element count */
    showElementCount?: boolean;
}
export declare function MiniMap({ viewport, pages, currentPageId, containerWidth, containerHeight, width, height, position, onViewportChange, className, showElementCount, }: MiniMapProps): import("react/jsx-runtime").JSX.Element;
export declare namespace MiniMap {
    var displayName: string;
}
//# sourceMappingURL=mini-map.d.ts.map