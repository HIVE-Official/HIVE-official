/**
 * Template Card Component
 *
 * Card showing a pre-built tool template in the template browser.
 * Users can select templates to start building from.
 */

'use client';

import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/button';
import { Badge } from '../../atoms/badge';
import { Eye, Copy } from 'lucide-react';

export interface ToolTemplate {
  /** Template ID */
  id: string;
  /** Template name */
  name: string;
  /** Description */
  description: string;
  /** Category */
  category: string;
  /** Thumbnail image URL */
  thumbnail?: string;
  /** Number of elements */
  elementCount: number;
  /** Number of pages */
  pageCount: number;
  /** Usage count (popularity) */
  usageCount?: number;
  /** Tags */
  tags?: string[];
  /** Created by (author) */
  createdBy?: string;
}

export interface TemplateCardProps {
  /** Template data */
  template: ToolTemplate;
  /** Is this template selected? */
  isSelected?: boolean;
  /** Click handler */
  onClick?: (template: ToolTemplate) => void;
  /** Preview handler */
  onPreview?: (template: ToolTemplate) => void;
  /** Use template handler */
  onUse?: (template: ToolTemplate) => void;
  /** Additional class names */
  className?: string;
}

export function TemplateCard({
  template,
  isSelected = false,
  onClick,
  onPreview,
  onUse,
  className,
}: TemplateCardProps) {
  return (
    <div
      className={cn(
        'template-card group',
        'flex flex-col rounded-lg border bg-card overflow-hidden transition-all',
        'hover:shadow-md hover:border-primary/40 cursor-pointer',
        isSelected && 'ring-2 ring-primary shadow-md',
        className
      )}
      onClick={() => onClick?.(template)}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-muted relative overflow-hidden">
        {template.thumbnail ? (
          <img
            src={template.thumbnail}
            alt={template.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🛠️</div>
              <p className="text-xs text-muted-foreground">
                {template.elementCount} elements • {template.pageCount} page{template.pageCount === 1 ? '' : 's'}
              </p>
            </div>
          </div>
        )}

        {/* Hover overlay with preview button */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onPreview?.(template);
            }}
            className="gap-1.5"
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
        </div>

        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="sophomore" className="text-xs">
            {template.category}
          </Badge>
        </div>

        {/* Usage count (if popular) */}
        {template.usageCount && template.usageCount > 10 && (
          <div className="absolute top-2 right-2">
            <Badge variant="freshman" className="text-xs">
              {template.usageCount} uses
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Title */}
        <h4 className="font-semibold text-sm mb-1 line-clamp-1">{template.name}</h4>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
          {template.description}
        </p>

        {/* Tags */}
        {template.tags && template.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {template.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 bg-muted rounded text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {template.tags.length > 3 && (
              <span className="px-1.5 py-0.5 text-xs text-muted-foreground">
                +{template.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t">
          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{template.elementCount} elements</span>
            <span>{template.pageCount} page{template.pageCount === 1 ? '' : 's'}</span>
          </div>

          {/* Use button */}
          <Button
            variant="default"
            size="sm"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onUse?.(template);
            }}
            className="h-7 gap-1"
          >
            <Copy className="h-3 w-3" />
            Use
          </Button>
        </div>

        {/* Author (if provided) */}
        {template.createdBy && (
          <p className="text-xs text-muted-foreground mt-2">
            By {template.createdBy}
          </p>
        )}
      </div>
    </div>
  );
}

TemplateCard.displayName = 'TemplateCard';
