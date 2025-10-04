/**
 * Grid Background Component
 *
 * Infinite grid background for HiveLab canvas with dot or line pattern.
 * Scales with zoom and pans with viewport.
 */

'use client';

import React, { useMemo } from 'react';
import { cn } from '../../../lib/utils';
import type { Viewport } from '../../../types/hivelab.types';

export interface GridBackgroundProps {
  /** Viewport state (x, y, zoom) */
  viewport: Viewport;
  /** Grid size in pixels (default: 20) */
  gridSize?: number;
  /** Grid style */
  pattern?: 'dots' | 'lines';
  /** Grid color */
  color?: string;
  /** Background color */
  backgroundColor?: string;
  /** Show major grid lines every N cells */
  majorGridEvery?: number;
  /** Major grid line color */
  majorColor?: string;
  /** Additional class names */
  className?: string;
}

export function GridBackground({
  viewport,
  gridSize = 20,
  pattern = 'dots',
  color = 'hsl(var(--muted-foreground) / 0.15)',
  backgroundColor = 'hsl(var(--background))',
  majorGridEvery = 5,
  majorColor = 'hsl(var(--muted-foreground) / 0.25)',
  className,
}: GridBackgroundProps) {
  // ============================================================================
  // Calculate Grid Pattern
  // ============================================================================

  const patternId = useMemo(() => `grid-pattern-${Math.random().toString(36).substr(2, 9)}`, []);
  const majorPatternId = useMemo(() => `major-grid-pattern-${Math.random().toString(36).substr(2, 9)}`, []);

  // Adjust grid size based on zoom
  const scaledGridSize = gridSize * viewport.zoom;
  const scaledMajorGridSize = scaledGridSize * majorGridEvery;

  // Calculate pattern offset based on viewport pan
  const offsetX = viewport.x % scaledGridSize;
  const offsetY = viewport.y % scaledGridSize;
  const majorOffsetX = viewport.x % scaledMajorGridSize;
  const majorOffsetY = viewport.y % scaledMajorGridSize;

  // ============================================================================
  // Render Grid Pattern
  // ============================================================================

  const renderDotPattern = () => (
    <>
      {/* Minor grid dots */}
      <pattern
        id={patternId}
        x={offsetX}
        y={offsetY}
        width={scaledGridSize}
        height={scaledGridSize}
        patternUnits="userSpaceOnUse"
      >
        <circle
          cx={scaledGridSize / 2}
          cy={scaledGridSize / 2}
          r={Math.max(1, viewport.zoom * 1.5)}
          fill={color}
        />
      </pattern>

      {/* Major grid dots */}
      <pattern
        id={majorPatternId}
        x={majorOffsetX}
        y={majorOffsetY}
        width={scaledMajorGridSize}
        height={scaledMajorGridSize}
        patternUnits="userSpaceOnUse"
      >
        <circle
          cx={scaledMajorGridSize / 2}
          cy={scaledMajorGridSize / 2}
          r={Math.max(2, viewport.zoom * 2.5)}
          fill={majorColor}
        />
      </pattern>
    </>
  );

  const renderLinePattern = () => (
    <>
      {/* Minor grid lines */}
      <pattern
        id={patternId}
        x={offsetX}
        y={offsetY}
        width={scaledGridSize}
        height={scaledGridSize}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${scaledGridSize} 0 L 0 0 0 ${scaledGridSize}`}
          fill="none"
          stroke={color}
          strokeWidth={Math.max(0.5, viewport.zoom * 0.5)}
        />
      </pattern>

      {/* Major grid lines */}
      <pattern
        id={majorPatternId}
        x={majorOffsetX}
        y={majorOffsetY}
        width={scaledMajorGridSize}
        height={scaledMajorGridSize}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${scaledMajorGridSize} 0 L 0 0 0 ${scaledMajorGridSize}`}
          fill="none"
          stroke={majorColor}
          strokeWidth={Math.max(1, viewport.zoom)}
        />
      </pattern>
    </>
  );

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <svg
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
      style={{ backgroundColor }}
    >
      <defs>
        {pattern === 'dots' ? renderDotPattern() : renderLinePattern()}
      </defs>

      {/* Render major grid first (behind minor grid) */}
      <rect
        width="100%"
        height="100%"
        fill={`url(#${majorPatternId})`}
      />

      {/* Render minor grid on top */}
      <rect
        width="100%"
        height="100%"
        fill={`url(#${patternId})`}
      />
    </svg>
  );
}

GridBackground.displayName = 'GridBackground';
