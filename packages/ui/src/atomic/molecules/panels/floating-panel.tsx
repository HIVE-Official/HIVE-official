/**
 * Floating Panel Component
 *
 * Draggable, collapsible, dockable panel for HiveLab builder.
 * Used for element library, properties, layers, and other tool panels.
 */

'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/atomic/atoms/button';
import { ChevronDown, ChevronUp, GripVertical, X, Maximize2, Minimize2 } from 'lucide-react';

export interface FloatingPanelProps {
  /** Panel title */
  title: string;
  /** Panel content */
  children: React.ReactNode;
  /** Initial position */
  initialPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Initial width (for left/right panels) */
  initialWidth?: number;
  /** Initial height (for top/bottom panels) */
  initialHeight?: number;
  /** Can the panel be closed? */
  closable?: boolean;
  /** Can the panel be collapsed? */
  collapsible?: boolean;
  /** Can the panel be dragged? */
  draggable?: boolean;
  /** Can the panel be resized? */
  resizable?: boolean;
  /** Initially collapsed? */
  defaultCollapsed?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Collapse state change handler */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Additional class names */
  className?: string;
}

export function FloatingPanel({
  title,
  children,
  initialPosition = 'left',
  initialWidth = 320,
  initialHeight = 400,
  closable = true,
  collapsible = true,
  draggable = false,
  resizable = true,
  defaultCollapsed = false,
  onClose,
  onCollapseChange,
  className,
}: FloatingPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const isVertical = initialPosition === 'left' || initialPosition === 'right';

  return (
    <div
      className={cn(
        'floating-panel flex flex-col',
        'bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg',
        'transition-all duration-200',
        isCollapsed && 'h-auto',
        isMaximized && 'fixed inset-4 z-50',
        className
      )}
      style={{
        width: isVertical && !isMaximized ? initialWidth : undefined,
        height: !isVertical && !isMaximized && !isCollapsed ? initialHeight : undefined,
      }}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center gap-2 px-4 py-3 border-b',
          draggable && 'cursor-move'
        )}
      >
        {draggable && (
          <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        )}

        <h3 className="text-sm font-semibold flex-1 truncate">{title}</h3>

        <div className="flex items-center gap-1">
          {collapsible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCollapse}
              className="h-6 w-6 p-0"
            >
              {isCollapsed ? (
                <ChevronDown className="h-3.5 w-3.5" />
              ) : (
                <ChevronUp className="h-3.5 w-3.5" />
              )}
            </Button>
          )}

          {resizable && !isMaximized && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMaximize}
              className="h-6 w-6 p-0"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </Button>
          )}

          {resizable && isMaximized && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMaximize}
              className="h-6 w-6 p-0"
            >
              <Minimize2 className="h-3.5 w-3.5" />
            </Button>
          )}

          {closable && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      )}

      {/* Resize handle (bottom for horizontal, right for vertical) */}
      {resizable && !isCollapsed && !isMaximized && (
        <div
          className={cn(
            'absolute bg-primary/10 hover:bg-primary/20 transition-colors',
            isVertical
              ? 'right-0 top-0 bottom-0 w-1 cursor-ew-resize'
              : 'left-0 right-0 bottom-0 h-1 cursor-ns-resize'
          )}
        />
      )}
    </div>
  );
}

FloatingPanel.displayName = 'FloatingPanel';
