/**
 * Element Card Component
 *
 * Visual representation of an element on the canvas with ports.
 * Handles drag, selection, hover states, and port interactions.
 */

'use client';

import React from 'react';
import { cn } from '../../../lib/utils';
import { Port } from '../../atoms/elements/port';
import { DataTypeBadge } from '../../atoms/elements/data-type-badge';
import type { Element } from '../../../types/hivelab.types';
import { GripVertical } from 'lucide-react';

export interface ElementCardProps {
  /** Element data */
  element: Element;
  /** Is this element selected */
  isSelected?: boolean;
  /** Is this element being dragged */
  isDragging?: boolean;
  /** Is this element hovered */
  isHovered?: boolean;
  /** Zoom level (affects rendering) */
  zoom?: number;
  /** Hovered port ID */
  hoveredPort?: string | null;
  /** Connection creation state */
  connectionState?: {
    isConnecting: boolean;
    compatiblePorts?: string[];
  };
  /** Drag handlers */
  onDragStart?: (e: React.MouseEvent) => void;
  onDrag?: (e: React.MouseEvent) => void;
  onDragEnd?: (e: React.MouseEvent) => void;
  /** Click handler */
  onClick?: (e: React.MouseEvent) => void;
  /** Double click handler (edit) */
  onDoubleClick?: (e: React.MouseEvent) => void;
  /** Port interaction handlers */
  onPortMouseDown?: (portId: string, e: React.MouseEvent) => void;
  onPortClick?: (portId: string) => void;
  onPortHover?: (portId: string | null) => void;
  /** Additional class names */
  className?: string;
}

export function ElementCard({
  element,
  isSelected = false,
  isDragging = false,
  isHovered = false,
  zoom = 1,
  hoveredPort = null,
  connectionState,
  onDragStart,
  onClick,
  onDoubleClick,
  onPortMouseDown,
  onPortClick,
  onPortHover,
  className,
}: ElementCardProps) {
  // Get category color
  const categoryColors: Record<string, string> = {
    trigger: 'hsl(0, 70%, 50%)',
    collector: 'hsl(210, 70%, 50%)',
    transformer: 'hsl(280, 70%, 50%)',
    router: 'hsl(40, 70%, 50%)',
    storage: 'hsl(120, 70%, 40%)',
    display: 'hsl(180, 70%, 45%)',
    action: 'hsl(320, 70%, 50%)',
    connector: 'hsl(260, 70%, 50%)',
  };

  const categoryColor = categoryColors[element.type] || 'hsl(var(--muted))';

  // Check if element is new
  const isNew = element.isNew ?? false;

  return (
    <div
      className={cn(
        'absolute rounded-lg bg-background border-2 shadow-md transition-all duration-200',
        'hover:shadow-lg',
        isSelected && 'ring-2 ring-primary ring-offset-2 ring-offset-background',
        isDragging && 'opacity-60 cursor-grabbing',
        !isDragging && 'cursor-pointer',
        className
      )}
      style={{
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        borderColor: isSelected ? 'hsl(var(--primary))' : categoryColor,
      }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {/* Header */}
      <div
        className="px-3 py-2 border-b flex items-center justify-between cursor-grab active:cursor-grabbing"
        style={{ borderColor: categoryColor }}
        onMouseDown={onDragStart}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-lg flex-shrink-0">{element.icon}</span>
          <span className="text-sm font-semibold truncate">{element.name}</span>
          {isNew && (
            <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
              New
            </span>
          )}
        </div>
        <DataTypeBadge
          type={element.outputs[0]?.type || 'any'}
          size="sm"
          variant="subtle"
          showLabel={false}
        />
      </div>

      {/* Body with ports */}
      <div className="relative h-full pb-10">
        {/* Input ports (left side) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 space-y-4">
          {element.inputs.map((port) => (
            <div key={port.id}>
              <Port
                port={port}
                isHovered={hoveredPort === port.id}
                isCompatible={connectionState?.compatiblePorts?.includes(port.id)}
                isConnecting={connectionState?.isConnecting}
                isConnected={false} // Will be determined by parent
                onMouseDown={(e) => onPortMouseDown?.(port.id, e)}
                onClick={() => onPortClick?.(port.id)}
                onMouseEnter={() => onPortHover?.(port.id)}
                onMouseLeave={() => onPortHover?.(null)}
                showLabel={zoom > 0.75}
              />
            </div>
          ))}
        </div>

        {/* Output ports (right side) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 space-y-4">
          {element.outputs.map((port) => (
            <div key={port.id}>
              <Port
                port={port}
                isHovered={hoveredPort === port.id}
                isCompatible={connectionState?.compatiblePorts?.includes(port.id)}
                isConnecting={connectionState?.isConnecting}
                isConnected={false} // Will be determined by parent
                onMouseDown={(e) => onPortMouseDown?.(port.id, e)}
                onClick={() => onPortClick?.(port.id)}
                onMouseEnter={() => onPortHover?.(port.id)}
                onMouseLeave={() => onPortHover?.(null)}
                showLabel={zoom > 0.75}
              />
            </div>
          ))}
        </div>

        {/* Element description (shown when zoomed in) */}
        {zoom > 1 && element.description && (
          <div className="px-3 py-2">
            <p className="text-xs text-muted-foreground line-clamp-2">
              {element.description}
            </p>
          </div>
        )}

        {/* Configuration indicator */}
        {Object.keys(element.config).length > 0 && (
          <div className="absolute bottom-2 left-3 text-xs text-muted-foreground">
            {Object.keys(element.config).length} config
            {Object.keys(element.config).length === 1 ? '' : 's'}
          </div>
        )}
      </div>

      {/* Selection indicator (corner dots) */}
      {isSelected && (
        <>
          <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-primary" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-primary" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-primary" />
        </>
      )}

      {/* Hover glow */}
      {isHovered && !isSelected && (
        <div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            boxShadow: `0 0 0 2px ${categoryColor}40`,
          }}
        />
      )}
    </div>
  );
}

ElementCard.displayName = 'ElementCard';
