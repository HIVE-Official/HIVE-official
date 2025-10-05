/**
 * Zoom Controls Component
 *
 * Floating zoom controls for HiveLab canvas with zoom in, out, reset, and fit buttons.
 */

'use client';

import React from 'react';
import { Button } from '../button';
import { cn } from '../../../lib/utils';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
} from 'lucide-react';

export interface ZoomControlsProps {
  /** Current zoom level (0.1 - 4.0) */
  zoom: number;
  /** Minimum zoom level */
  minZoom?: number;
  /** Maximum zoom level */
  maxZoom?: number;
  /** Zoom in callback */
  onZoomIn: () => void;
  /** Zoom out callback */
  onZoomOut: () => void;
  /** Reset zoom to 1x */
  onZoomReset: () => void;
  /** Zoom to fit all content */
  onZoomToFit?: () => void;
  /** Position on screen */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Additional class names */
  className?: string;
  /** Show zoom percentage */
  showPercentage?: boolean;
}

export function ZoomControls({
  zoom,
  minZoom = 0.1,
  maxZoom = 4,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onZoomToFit,
  position = 'bottom-right',
  className,
  showPercentage = true,
}: ZoomControlsProps) {
  const zoomPercentage = Math.round(zoom * 100);
  const canZoomIn = zoom < maxZoom;
  const canZoomOut = zoom > minZoom;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <div
      className={cn(
        'fixed z-50 flex items-center gap-2',
        'bg-background/95 backdrop-blur-sm',
        'border rounded-lg shadow-lg',
        'px-2 py-1.5',
        positionClasses[position],
        className
      )}
    >
      {/* Zoom Out */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomOut}
        disabled={!canZoomOut}
        title="Zoom out (Cmd+-)"
        className="h-8 w-8"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>

      {/* Zoom Percentage */}
      {showPercentage && (
        <button
          onClick={onZoomReset}
          title="Reset zoom to 100% (Cmd+0)"
          className={cn(
            'px-2 h-8 min-w-[60px] text-sm font-medium',
            'rounded-md transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          {zoomPercentage}%
        </button>
      )}

      {/* Zoom In */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomIn}
        disabled={!canZoomIn}
        title="Zoom in (Cmd+=)"
        className="h-8 w-8"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>

      {/* Divider */}
      {onZoomToFit && (
        <div className="w-px h-6 bg-border" />
      )}

      {/* Zoom to Fit */}
      {onZoomToFit && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomToFit}
          title="Zoom to fit (Cmd+Shift+1)"
          className="h-8 w-8"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      )}

      {/* Reset Zoom (alternative icon) */}
      {!showPercentage && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomReset}
          title="Reset zoom to 100% (Cmd+0)"
          className="h-8 w-8"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

ZoomControls.displayName = 'ZoomControls';
