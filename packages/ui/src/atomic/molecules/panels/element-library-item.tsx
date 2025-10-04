/**
 * Element Library Item Component
 *
 * Draggable element card in the library panel.
 * Represents an element type that can be dragged onto the canvas.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { ElementDefinition } from '@/types/hivelab.types';
import { GripVertical } from 'lucide-react';

export interface ElementLibraryItemProps {
  /** Element definition */
  element: ElementDefinition;
  /** Is this item being dragged? */
  isDragging?: boolean;
  /** Drag start handler */
  onDragStart?: (e: React.DragEvent, element: ElementDefinition) => void;
  /** Drag end handler */
  onDragEnd?: (e: React.DragEvent) => void;
  /** Click handler */
  onClick?: (element: ElementDefinition) => void;
  /** Additional class names */
  className?: string;
}

// Category colors (matches element-card.tsx)
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

export function ElementLibraryItem({
  element,
  isDragging = false,
  onDragStart,
  onDragEnd,
  onClick,
  className,
}: ElementLibraryItemProps) {
  const categoryColor = categoryColors[element.category] || categoryColors.connector;

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart?.(e, element);
  };

  const handleClick = () => {
    onClick?.(element);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onClick={handleClick}
      className={cn(
        'element-library-item group',
        'flex items-center gap-2 px-3 py-2.5 rounded-md',
        'bg-background border transition-all cursor-grab active:cursor-grabbing',
        'hover:shadow-md hover:scale-[1.02]',
        isDragging && 'opacity-50 scale-95',
        !isDragging && 'hover:border-primary/40',
        className
      )}
      style={{
        borderColor: isDragging ? categoryColor : undefined,
      }}
    >
      {/* Drag handle */}
      <GripVertical className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground flex-shrink-0" />

      {/* Icon */}
      <div
        className="flex items-center justify-center w-8 h-8 rounded border flex-shrink-0 transition-colors"
        style={{
          borderColor: `${categoryColor}40`,
          backgroundColor: `${categoryColor}10`,
        }}
      >
        <span className="text-base">{element.icon}</span>
      </div>

      {/* Name and description */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{element.name}</p>
        <p className="text-xs text-muted-foreground truncate">
          {element.description}
        </p>
      </div>

      {/* Port count indicator */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
        {element.inputs.length > 0 && (
          <span title={`${element.inputs.length} input${element.inputs.length === 1 ? '' : 's'}`}>
            ⬅️ {element.inputs.length}
          </span>
        )}
        {element.outputs.length > 0 && (
          <span title={`${element.outputs.length} output${element.outputs.length === 1 ? '' : 's'}`}>
            {element.outputs.length} ➡️
          </span>
        )}
      </div>
    </div>
  );
}

ElementLibraryItem.displayName = 'ElementLibraryItem';
