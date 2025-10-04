/**
 * Connection Wire Component
 *
 * Renders a Bézier curve connection between two ports.
 * Supports hover states, selection, and animated data flow.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ConnectionWireProps {
  /** SVG path string (Bézier curve) */
  path: string;
  /** Wire color (based on data type) */
  color?: string;
  /** Is this wire selected */
  isSelected?: boolean;
  /** Is this wire hovered */
  isHovered?: boolean;
  /** Show animated data flow */
  animated?: boolean;
  /** Wire thickness */
  strokeWidth?: number;
  /** Click handler */
  onClick?: (e: React.MouseEvent) => void;
  /** Mouse enter handler */
  onMouseEnter?: () => void;
  /** Mouse leave handler */
  onMouseLeave?: () => void;
  /** Additional class names */
  className?: string;
}

export function ConnectionWire({
  path,
  color = 'hsl(var(--muted-foreground))',
  isSelected = false,
  isHovered = false,
  animated = false,
  strokeWidth = 2,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
}: ConnectionWireProps) {
  const wireId = React.useId();

  // Adjust stroke width based on state
  const effectiveStrokeWidth = isSelected || isHovered ? strokeWidth + 1 : strokeWidth;

  return (
    <g className={cn('connection-wire', className)}>
      {/* Invisible hit area for easier clicking */}
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={effectiveStrokeWidth + 8}
        className="cursor-pointer"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />

      {/* Glow effect when selected */}
      {isSelected && (
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={effectiveStrokeWidth + 4}
          opacity={0.3}
          className="blur-sm"
        />
      )}

      {/* Main wire path */}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={effectiveStrokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          'transition-all duration-200',
          isHovered && 'drop-shadow-lg'
        )}
        opacity={isHovered ? 1 : 0.8}
        markerEnd={`url(#arrow-${wireId})`}
      />

      {/* Animated dashed overlay for data flow */}
      {animated && (
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={effectiveStrokeWidth}
          strokeLinecap="round"
          strokeDasharray="5 10"
          className="animate-dash"
          opacity={0.6}
        />
      )}

      {/* Arrow marker */}
      <defs>
        <marker
          id={`arrow-${wireId}`}
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path
            d="M0,0 L0,6 L9,3 z"
            fill={color}
            opacity={isHovered ? 1 : 0.8}
          />
        </marker>
      </defs>
    </g>
  );
}

ConnectionWire.displayName = 'ConnectionWire';

// Animation for dashed line
const dashAnimation = `
  @keyframes dash {
    to {
      stroke-dashoffset: -15;
    }
  }

  .animate-dash {
    animation: dash 1s linear infinite;
  }
`;

// Inject animation styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = dashAnimation;
  if (!document.querySelector('style[data-connection-wire-animation]')) {
    style.setAttribute('data-connection-wire-animation', 'true');
    document.head.appendChild(style);
  }
}
