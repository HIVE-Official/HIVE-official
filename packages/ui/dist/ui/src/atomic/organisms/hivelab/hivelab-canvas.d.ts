/**
 * HiveLab Canvas Component
 *
 * Main infinite canvas for the HiveLab builder.
 * Handles pan/zoom, element rendering, connections, and user interactions.
 */
import React from 'react';
import type { Element, Connection, Page, Viewport } from '@/types/hivelab.types';
import type { Position } from '@/types/hivelab.types';
export interface HiveLabCanvasProps {
    /** All pages in the tool */
    pages: Page[];
    /** Current page ID */
    currentPageId: string;
    /** All elements (across all pages) */
    elements: Element[];
    /** All connections (across all pages) */
    connections: Connection[];
    /** Viewport state */
    viewport: Viewport;
    /** Selected element IDs */
    selectedElementIds?: string[];
    /** Selected connection ID */
    selectedConnectionId?: string | null;
    /** Selection box (during multi-select drag) */
    selectionBox?: {
        start: Position;
        current: Position;
    } | null;
    /** Show grid? */
    showGrid?: boolean;
    /** Show mini-map? */
    showMiniMap?: boolean;
    /** Show zoom controls? */
    showZoomControls?: boolean;
    /** Viewport change handler */
    onViewportChange?: (viewport: Viewport) => void;
    /** Element click handler */
    onElementClick?: (elementId: string, e: React.MouseEvent) => void;
    /** Element double-click handler */
    onElementDoubleClick?: (elementId: string) => void;
    /** Connection click handler */
    onConnectionClick?: (connectionId: string, e: React.MouseEvent) => void;
    /** Page click handler */
    onPageClick?: (pageId: string) => void;
    /** Canvas click handler (background) */
    onCanvasClick?: (e: React.MouseEvent) => void;
    /** Zoom in handler */
    onZoomIn?: () => void;
    /** Zoom out handler */
    onZoomOut?: () => void;
    /** Zoom to fit handler */
    onZoomToFit?: () => void;
    /** Additional class names */
    className?: string;
}
export declare function HiveLabCanvas({ pages, currentPageId, elements, connections, viewport, selectedElementIds, selectedConnectionId, selectionBox, showGrid, showMiniMap, showZoomControls, onViewportChange, onElementClick, onElementDoubleClick, onConnectionClick, onPageClick, onCanvasClick, onZoomIn, onZoomOut, onZoomToFit, className, }: HiveLabCanvasProps): import("react/jsx-runtime").JSX.Element;
export declare namespace HiveLabCanvas {
    var displayName: string;
}
//# sourceMappingURL=hivelab-canvas.d.ts.map