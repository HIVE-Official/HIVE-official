/**
 * HiveLab Canvas Component
 *
 * Main infinite canvas for the HiveLab builder.
 * Handles pan/zoom, element rendering, connections, and user interactions.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { GridBackground } from '@/atomic/atoms/canvas/grid-background';
import { ZoomControls } from '@/atomic/atoms/canvas/zoom-controls';
import { MiniMap } from '@/atomic/atoms/canvas/mini-map';
import { ElementCard } from '@/atomic/molecules/canvas/element-card';
import { ConnectionLayer } from '@/atomic/molecules/canvas/connection-layer';
import { PageFrame } from '@/atomic/molecules/canvas/page-frame';
import { SelectionBox } from '@/atomic/molecules/canvas/selection-box';
export function HiveLabCanvas({ pages, currentPageId, elements, connections, viewport, selectedElementIds = [], selectedConnectionId = null, selectionBox = null, showGrid = true, showMiniMap = true, showZoomControls = true, onViewportChange, onElementClick, onElementDoubleClick, onConnectionClick, onPageClick, onCanvasClick, onZoomIn, onZoomOut, onZoomToFit, className, }) {
    // Get current page
    const currentPage = pages.find((p) => p.id === currentPageId);
    const currentPageElements = elements.filter((el) => el.pageId === currentPageId);
    const currentPageConnections = connections.filter((c) => c.pageId === currentPageId);
    return (_jsxs("div", { className: cn('hivelab-canvas relative w-full h-full overflow-hidden bg-[#0c0c0c]', className), onClick: onCanvasClick, children: [showGrid && (_jsx(GridBackground, { viewport: viewport, pattern: "dots", gridSize: 20, className: "absolute inset-0" })), _jsxs("div", { className: "absolute inset-0", style: {
                    transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
                    transformOrigin: '0 0',
                }, children: [pages.map((page) => (_jsx(PageFrame, { page: page, isCurrent: page.id === currentPageId, onClick: () => onPageClick?.(page.id), zoom: viewport.zoom }, page.id))), _jsx(ConnectionLayer, { elements: currentPageElements, connections: currentPageConnections, selectedConnectionId: selectedConnectionId, onConnectionClick: onConnectionClick }), currentPageElements.map((element) => (_jsx(ElementCard, { element: element, isSelected: selectedElementIds.includes(element.id), onClick: (e) => onElementClick?.(element.id, e), onDoubleClick: () => onElementDoubleClick?.(element.id), zoom: viewport.zoom }, element.id))), selectionBox && (_jsx(SelectionBox, { start: selectionBox.start, current: selectionBox.current }))] }), showZoomControls && (_jsx(ZoomControls, { zoom: viewport.zoom, minZoom: 0.1, maxZoom: 4, onZoomIn: onZoomIn, onZoomOut: onZoomOut, onZoomReset: () => onViewportChange?.({ ...viewport, zoom: 1 }), onZoomToFit: onZoomToFit, position: "bottom-right", className: "absolute bottom-4 right-4" })), showMiniMap && currentPage && (_jsx(MiniMap, { pages: pages, currentPageId: currentPageId, viewport: viewport, containerWidth: 1200, containerHeight: 800, onViewportChange: (pos) => {
                    onViewportChange?.({
                        ...viewport,
                        x: pos.x ?? viewport.x,
                        y: pos.y ?? viewport.y,
                    });
                }, className: "absolute top-4 right-4" }))] }));
}
HiveLabCanvas.displayName = 'HiveLabCanvas';
//# sourceMappingURL=hivelab-canvas.js.map