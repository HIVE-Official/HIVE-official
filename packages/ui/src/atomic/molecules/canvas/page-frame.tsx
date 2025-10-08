/**
 * Page Frame Component
 *
 * Visual frame showing page boundaries on the infinite canvas.
 * Displays page name, type, and dimensions.
 */

'use client';

import React from 'react';
import { cn } from '../../../lib/utils';
import type { Page } from '../../../types/hivelab.types';
import { Maximize2, Layout, Layers } from 'lucide-react';

export interface PageFrameProps {
  /** Page data */
  page: Page;
  /** Is this the current page */
  isCurrent?: boolean;
  /** Is this page being hovered */
  isHovered?: boolean;
  /** Zoom level (affects label visibility) */
  zoom?: number;
  /** Click handler */
  onClick?: (e: React.MouseEvent) => void;
  /** Double click handler (rename) */
  onDoubleClick?: (e: React.MouseEvent) => void;
  /** Additional class names */
  className?: string;
}

export function PageFrame({
  page,
  isCurrent = false,
  isHovered = false,
  zoom = 1,
  onClick,
  onDoubleClick,
  className,
}: PageFrameProps) {
  // Page type icons and colors
  const pageTypeConfig = {
    default: {
      icon: Layout,
      color: 'hsl(210, 70%, 50%)',
      label: 'Page',
    },
    modal: {
      icon: Maximize2,
      color: 'hsl(280, 70%, 50%)',
      label: 'Modal',
    },
    drawer: {
      icon: Layers,
      color: 'hsl(160, 70%, 45%)',
      label: 'Drawer',
    },
  };

  const config = pageTypeConfig[page.type];
  const Icon = config.icon;

  // Calculate element count
  const elementCount = page.elements.length;

  // Show details at zoom > 0.5
  const showDetails = zoom > 0.5;

  return (
    <div
      className={cn(
        'absolute pointer-events-none',
        className
      )}
      style={{
        left: page.x,
        top: page.y,
        width: page.width,
        height: page.height,
      }}
    >
      {/* Frame border */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg border-2 transition-all',
          isCurrent && 'border-primary shadow-lg',
          !isCurrent && 'border-border',
          isHovered && !isCurrent && 'border-primary/50'
        )}
        style={{
          borderColor: isCurrent ? config.color : undefined,
          boxShadow: isCurrent
            ? `0 0 0 4px ${config.color}20, 0 10px 15px -3px rgb(0 0 0 / 0.1)`
            : undefined,
        }}
      />

      {/* Click area */}
      <div
        className="absolute inset-0 cursor-pointer pointer-events-auto"
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      />

      {/* Page header */}
      {showDetails && (
        <div
          className={cn(
            'absolute -top-8 left-0 flex items-center gap-2 px-3 py-1.5',
            'bg-background/95 backdrop-blur-sm border rounded-md shadow-sm',
            'pointer-events-auto'
          )}
          style={{
            borderColor: isCurrent ? config.color : undefined,
          }}
        >
          <Icon className="h-4 w-4" style={{ color: config.color }} />
          <span className="text-sm font-semibold">{page.name}</span>
          <span className="text-xs text-muted-foreground">
            ({elementCount} element{elementCount === 1 ? '' : 's'})
          </span>
        </div>
      )}

      {/* Page type badge (bottom-right) */}
      {showDetails && (
        <div
          className={cn(
            'absolute -bottom-6 right-0 px-2 py-1',
            'bg-background/90 border rounded text-xs',
            'pointer-events-none'
          )}
          style={{
            color: config.color,
            borderColor: config.color,
          }}
        >
          {config.label}
        </div>
      )}

      {/* Dimensions label (bottom-left, only at high zoom) */}
      {zoom > 1 && (
        <div className="absolute -bottom-6 left-0 text-xs text-muted-foreground pointer-events-none">
          {page.width} × {page.height}
        </div>
      )}

      {/* Background (subtle fill) */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          backgroundColor: isCurrent ? `${config.color}05` : 'transparent',
        }}
      />
    </div>
  );
}

PageFrame.displayName = 'PageFrame';
