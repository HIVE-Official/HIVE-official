/**
 * Selection Box Component
 *
 * Visual rectangle shown during multi-select drag operation.
 * Updates in real-time as the user drags to select multiple elements.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { Position } from '@/types/hivelab.types';

export interface SelectionBoxProps {
  /** Start position of the selection (where drag began) */
  start: Position;
  /** Current position (where drag is now) */
  current: Position;
  /** Additional class names */
  className?: string;
}

export function SelectionBox({ start, current, className }: SelectionBoxProps) {
  // Calculate box dimensions
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.abs(current.x - start.x);
  const height = Math.abs(current.y - start.y);

  return (
    <div
      className={cn(
        'absolute pointer-events-none',
        'border-2 border-primary/60 bg-primary/10',
        'rounded-sm',
        className
      )}
      style={{
        left: x,
        top: y,
        width,
        height,
      }}
    >
      {/* Corner indicators */}
      <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-primary" />
      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-primary" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-primary" />

      {/* Selection info badge (top-left) */}
      {width > 50 && height > 30 && (
        <div className="absolute -top-6 left-0 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded">
          {Math.round(width)} × {Math.round(height)}
        </div>
      )}
    </div>
  );
}

SelectionBox.displayName = 'SelectionBox';
