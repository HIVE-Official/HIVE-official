/**
 * HiveLab Toolbar Component
 *
 * Top toolbar for the HiveLab builder with file operations, undo/redo,
 * zoom controls, and tool actions.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/atomic/atoms/button';
import {
  Save,
  Undo,
  Redo,
  Play,
  Settings,
  Download,
  Upload,
  Copy,
  Trash2,
  Grid3x3,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  Code,
  FileText,
} from 'lucide-react';

export interface HiveLabToolbarProps {
  /** Current tool name */
  toolName?: string;
  /** Can undo? */
  canUndo?: boolean;
  /** Can redo? */
  canRedo?: boolean;
  /** Current zoom level */
  zoom?: number;
  /** Is tool saved? */
  isSaved?: boolean;
  /** Is tool running (preview)? */
  isRunning?: boolean;
  /** Show grid? */
  showGrid?: boolean;
  /** Undo handler */
  onUndo?: () => void;
  /** Redo handler */
  onRedo?: () => void;
  /** Save handler */
  onSave?: () => void;
  /** Run/preview handler */
  onRun?: () => void;
  /** Settings handler */
  onSettings?: () => void;
  /** Export handler */
  onExport?: () => void;
  /** Import handler */
  onImport?: () => void;
  /** Delete handler */
  onDelete?: () => void;
  /** Duplicate handler */
  onDuplicate?: () => void;
  /** Zoom in handler */
  onZoomIn?: () => void;
  /** Zoom out handler */
  onZoomOut?: () => void;
  /** Zoom to fit handler */
  onZoomToFit?: () => void;
  /** Toggle grid handler */
  onToggleGrid?: () => void;
  /** View code handler */
  onViewCode?: () => void;
  /** View docs handler */
  onViewDocs?: () => void;
  /** Additional class names */
  className?: string;
}

export function HiveLabToolbar({
  toolName = 'Untitled Tool',
  canUndo = false,
  canRedo = false,
  zoom = 1,
  isSaved = true,
  isRunning = false,
  showGrid = true,
  onUndo,
  onRedo,
  onSave,
  onRun,
  onSettings,
  onExport,
  onImport,
  onDelete,
  onDuplicate,
  onZoomIn,
  onZoomOut,
  onZoomToFit,
  onToggleGrid,
  onViewCode,
  onViewDocs,
  className,
}: HiveLabToolbarProps) {
  const zoomPercentage = Math.round(zoom * 100);

  return (
    <div
      className={cn(
        'hivelab-toolbar flex items-center gap-2 px-4 py-2',
        'bg-[#0c0c0c]/95 backdrop-blur-sm border-b',
        className
      )}
    >
      {/* Tool name */}
      <div className="flex items-center gap-2 min-w-0">
        <h2 className="text-sm font-semibold truncate">{toolName}</h2>
        {!isSaved && (
          <span className="text-xs text-white/70">(unsaved)</span>
        )}
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-white/8 mx-2" />

      {/* File operations */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSave}
          disabled={isSaved}
          title="Save (Cmd+S)"
          className="h-8 w-8 p-0"
        >
          <Save className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onImport}
          title="Import tool"
          className="h-8 w-8 p-0"
        >
          <Upload className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onExport}
          title="Export tool"
          className="h-8 w-8 p-0"
        >
          <Download className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onDuplicate}
          title="Duplicate (Cmd+D)"
          className="h-8 w-8 p-0"
        >
          <Copy className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          title="Delete tool"
          className="h-8 w-8 p-0 text-red-500 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-white/8 mx-2" />

      {/* Edit operations */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Cmd+Z)"
          className="h-8 w-8 p-0"
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Cmd+Shift+Z)"
          className="h-8 w-8 p-0"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-white/8 mx-2" />

      {/* View controls */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomOut}
          title="Zoom out (Cmd+-)"
          className="h-8 w-8 p-0"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomToFit}
          title="Reset zoom (Cmd+0)"
          className="h-8 px-2 min-w-[60px]"
        >
          <span className="text-xs font-medium">{zoomPercentage}%</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomIn}
          title="Zoom in (Cmd+=)"
          className="h-8 w-8 p-0"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleGrid}
          title="Toggle grid (Cmd+G)"
          className={cn(
            'h-8 w-8 p-0',
            showGrid && 'bg-white/10'
          )}
        >
          <Grid3x3 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomToFit}
          title="Zoom to fit (Cmd+1)"
          className="h-8 w-8 p-0"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewCode}
          title="View generated code"
          className="h-8 gap-1.5 px-3"
        >
          <Code className="h-4 w-4" />
          <span className="text-xs">Code</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onViewDocs}
          title="View documentation"
          className="h-8 gap-1.5 px-3"
        >
          <FileText className="h-4 w-4" />
          <span className="text-xs">Docs</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onSettings}
          title="Tool settings"
          className="h-8 w-8 p-0"
        >
          <Settings className="h-4 w-4" />
        </Button>

        <Button
          variant={isRunning ? 'destructive' : 'default'}
          size="sm"
          onClick={onRun}
          title={isRunning ? 'Stop preview' : 'Run preview (Cmd+Enter)'}
          className="h-8 gap-1.5 px-3"
        >
          {isRunning ? (
            <>
              <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
              <span className="text-xs font-medium">Stop</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              <span className="text-xs font-medium">Preview</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

HiveLabToolbar.displayName = 'HiveLabToolbar';
