/**
 * HiveLab Canvas Component
 *
 * Main infinite canvas for the HiveLab builder.
 * Handles pan/zoom, element rendering, connections, and user interactions.
 */

'use client';

import React from 'react';
import { cn } from '../../../lib/utils';
import type { Element, Connection, Page, Viewport } from '../../../types/hivelab.types';
import { GridBackground } from '../../atoms/canvas/grid-background';
import { ZoomControls } from '../../atoms/canvas/zoom-controls';
import { MiniMap } from '../../atoms/canvas/mini-map';
import { ElementCard } from '../../molecules/canvas/element-card';
import { ConnectionLayer } from '../../molecules/canvas/connection-layer';
import { PageFrame } from '../../molecules/canvas/page-frame';
import { SelectionBox } from '../../molecules/canvas/selection-box';
import type { Position } from '../../../types/hivelab.types';

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

export function HiveLabCanvas({
  pages,
  currentPageId,
  elements,
  connections,
  viewport,
  selectedElementIds = [],
  selectedConnectionId = null,
  selectionBox = null,
  showGrid = true,
  showMiniMap = true,
  showZoomControls = true,
  onViewportChange,
  onElementClick,
  onElementDoubleClick,
  onConnectionClick,
  onPageClick,
  onCanvasClick,
  onZoomIn,
  onZoomOut,
  onZoomToFit,
  className,
}: HiveLabCanvasProps) {
  // Get current page
  const currentPage = pages.find((p) => p.id === currentPageId);
  const currentPageElements = elements.filter((el) => el.pageId === currentPageId);
  const currentPageConnections = connections.filter((c) => c.pageId === currentPageId);

  return (
    <div
      className={cn(
        'hivelab-canvas relative w-full h-full overflow-hidden bg-[#0c0c0c]',
        className
      )}
      onClick={onCanvasClick}
    >
      {/* Grid background */}
      {showGrid && (
        <GridBackground
          viewport={viewport}
          pattern="dots"
          gridSize={20}
          className="absolute inset-0"
        />
      )}

      {/* Canvas content (with viewport transform) */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
          transformOrigin: '0 0',
        }}
      >
        {/* Page frames */}
        {pages.map((page) => (
          <PageFrame
            key={page.id}
            page={page}
            isCurrent={page.id === currentPageId}
            onClick={() => onPageClick?.(page.id)}
            zoom={viewport.zoom}
          />
        ))}

        {/* Connection layer (SVG) */}
        <ConnectionLayer
          elements={currentPageElements}
          connections={currentPageConnections}
          selectedConnectionId={selectedConnectionId}
          onConnectionClick={onConnectionClick}
        />

        {/* Elements */}
        {currentPageElements.map((element) => (
          <ElementCard
            key={element.id}
            element={element}
            isSelected={selectedElementIds.includes(element.id)}
            onClick={(e: React.MouseEvent) => onElementClick?.(element.id, e)}
            onDoubleClick={() => onElementDoubleClick?.(element.id)}
            zoom={viewport.zoom}
          />
        ))}

        {/* Selection box (during multi-select) */}
        {selectionBox && (
          <SelectionBox
            start={selectionBox.start}
            current={selectionBox.current}
          />
        )}
      </div>

      {/* Zoom controls (overlay) */}
      {showZoomControls && (
        <ZoomControls
          zoom={viewport.zoom}
          minZoom={0.1}
          maxZoom={4}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onZoomReset={() => onViewportChange?.({ ...viewport, zoom: 1 })}
          onZoomToFit={onZoomToFit}
          position="bottom-right"
          className="absolute bottom-4 right-4"
        />
      )}

      {/* Mini-map (overlay) */}
      {showMiniMap && currentPage && (
        <MiniMap
          pages={pages}
          currentPageId={currentPageId}
          viewport={viewport}
          containerWidth={1200}
          containerHeight={800}
          onViewportChange={(pos) => {
            onViewportChange?.({
              ...viewport,
              x: pos.x ?? viewport.x,
              y: pos.y ?? viewport.y,
            });
          }}
          className="absolute top-4 right-4"
        />
      )}
    </div>
  );
}

HiveLabCanvas.displayName = 'HiveLabCanvas';
