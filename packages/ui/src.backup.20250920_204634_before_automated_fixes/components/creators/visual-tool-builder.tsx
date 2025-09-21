// HIVE Visual Tool Builder - Atomic Design: Template;
// Complete drag & drop tool building interface;
"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Play, 
  Save, 
  Share2, 
  Settings, 
  Eye, 
  Undo, 
  Redo, 
  Copy, 
  Trash2,
  Move,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Grid3X3,
  Layers,
  MousePointer,
  Hand;
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { HiveButton } from '../hive-button';
import { HiveCard, HiveCardContent, HiveCardHeader, HiveCardTitle } from '../hive-card';
import { HiveBadge } from '../hive-badge';
import { HiveMotionWrapper } from '../hive-motion-wrapper';
import { ElementPicker } from './element-picker';
import { ElementConfig } from './element-config';
import { ToolPreview } from './tool-preview';
import type { 
  VisualBuilderProps, 
  Element, 
  ElementInstance, 
  Tool,
  Position,
  Size,
  CanvasState,
  BuilderAction;
} from './types';

// Canvas component for drag & drop;
interface CanvasProps {tool: Tool;
  elements: Element[];
  onElementAdd: (element: Element, position: Position) => void;
  onElementUpdate: (elementId: string, changes: Partial<ElementInstance>) => void;
  onElementDelete: (elementId: string) => void;
  onElementSelect: (elementId: string | null) => void;
  selectedElementId?: string;
  canvas: CanvasState;
  onCanvasUpdate: (canvas: Partial<CanvasState>) => void;}

const Canvas: React.FC<CanvasProps> = ({
  tool,
  elements,
  onElementAdd,
  onElementUpdate,
  onElementDelete,
  onElementSelect,
  selectedElementId,
  canvas,
  onCanvasUpdate;
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggedElement, setDraggedElement] = useState<Element | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  // Handle element drop from element picker;
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    if (!draggedElement || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const position: Position = {
      x: (e.clientX - rect.left - dragOffset.x) / canvas.zoom,
      y: (e.clientY - rect.top - dragOffset.y) / canvas.zoom;
    };
    
    onElementAdd(draggedElement, position);
    setDraggedElement(null);
    setIsDragging(false)
  }, [draggedElement, canvas.zoom, dragOffset, onElementAdd]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true)
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!e.relatedTarget || !canvasRef.current?.contains(e.relatedTarget as Node)) {
      setIsDragging(false)
    }}
  }, []);

  // Handle element movement within canvas;
  const handleElementDrag = useCallback((elementId: string, newPosition: Position) => {
    onElementUpdate(elementId, { position: newPosition })
  }, [onElementUpdate]);

  // Handle element resize;
  const handleElementResize = useCallback((elementId: string, newSize: Size) => {
    onElementUpdate(elementId, { size: newSize })
  }, [onElementUpdate]);

  // Render element instances;
  const renderElementInstance = (instance: ElementInstance) => {
    const element = elements.find(el => el.id === instance.elementId);
    if (!element) return null;

    const IconComponent = element.icon;
    const isSelected = selectedElementId === instance.id;

    return (
      <HiveMotionWrapper;
        key={instance.id}}
        layoutId={instance.id}
      >
        <div;
          className={cn(
            "absolute border-2 rounded-lg cursor-move transition-all duration-200",
            isSelected;
              ? "border-[var(--hive-color-gold-primary)] shadow-lg shadow-[var(--hive-color-gold-primary)]/20" 
              : "border-transparent hover:border-[var(--hive-border-default)]",
            "group"
          )}
          style={{
            left: instance.position.x,
            top: instance.position.y,
            width: instance.size.width === 'auto' ? 'auto' : instance.size.width,
            height: instance.size.height === 'auto' ? 'auto' : instance.size.height,
            zIndex: instance.zIndex,
            transform: `scale(${canvas.zoom})`,
            transformOrigin: 'top left'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onElementSelect(instance.id)
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            // Handle drag start;
          }}
        >
          {/* Element content */}
          <div className="w-full h-full p-3 bg-[var(--hive-background-secondary)] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div;
                className="w-6 h-6 rounded flex items-center justify-center"
                style={{ backgroundColor: `${element.color}15`, color: element.color }}
              >
                <IconComponent size={14} />
              </div>
              <span className="text-sm font-medium text-[var(--hive-text-primary)] truncate">
                {instance.name || element.name}
              </span>
            </div>
            
            {/* Element preview based on type */}
            <div className="text-xs text-[var(--hive-text-secondary)]">
              {element.description}
            </div>
          </div>

          {/* Selection handles */}
          {isSelected && (
            <>
              {/* Move handle */}
              <div className="absolute -top-8 left-0 flex gap-1">
                <div className="w-6 h-6 bg-[var(--hive-color-gold-primary)] rounded flex items-center justify-center cursor-move">
                  <Move size={12} className="text-[var(--hive-background-primary)]" />
                </div>
                <div;
                  className="w-6 h-6 bg-red-500 rounded flex items-center justify-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onElementDelete(instance.id)
          }}
                >
                  <Trash2 size={12} className="text-white" />
                </div>
              </div>

              {/* Resize handles */}
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[var(--hive-color-gold-primary)] rounded cursor-se-resize"></div>
            </>
          )}
        </div>
      </HiveMotionWrapper>
    )
  };

  return (
    <div className="relative flex-1 overflow-hidden bg-[var(--hive-background-primary)]">
      {/* Canvas controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <div className="flex gap-1 p-1 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
          <HiveButton;
            variant="ghost"
            size="sm"
            onClick={() => onCanvasUpdate({zoom: Math.min(canvas.zoom + 0.1, 2)) })}
          >
            <ZoomIn size={16} />
          </HiveButton>
          <HiveButton;
            variant="ghost"
            size="sm"
            onClick={() => onCanvasUpdate({zoom: Math.max(canvas.zoom - 0.1, 0.5)) })}
          >
            <ZoomOut size={16} />
          </HiveButton>
          <div className="px-2 py-1 text-xs text-[var(--hive-text-secondary)] flex items-center">
            {Math.round(canvas.zoom * 100)}%
          </div>
        </div>

        <div className="flex gap-1 p-1 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
          <HiveButton;
            variant={canvas.showGrid ? "primary" : "ghost"}
            size="sm"
            onClick={() => onCanvasUpdate({showGrid: !canvas.showGrid) })}
          >
            <Grid3X3 size={16} />
          </HiveButton>
        </div>
      </div>

      {/* Main canvas */}
      <div;
        ref={canvasRef}
        className={cn(
          "w-full h-full relative overflow-auto",
          isDragging && "bg-[var(--hive-color-gold-primary)]/5"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={() => onElementSelect(null)}
        style={{
          backgroundImage: canvas.showGrid;
            ? `radial-gradient(circle, var(--hive-border-default) 1px, transparent 1px)`
            : undefined,
          backgroundSize: canvas.showGrid ? `${canvas.gridSize}px ${canvas.gridSize}px` : undefined;
          }}
      >
        {/* Canvas content area */}
        <div;
          className="relative min-w-full min-h-full"
          style={{ 
            width: '100%', 
            height: '100%',
            transform: `translate(${canvas.offset.x}px, ${canvas.offset.y}px)`
          }}
        >
          {/* Render all element instances */}
          {tool.elements.map(renderElementInstance)}

          {/* Drop zone indicator */}
          {isDragging && (
            <div className="absolute inset-0 border-2 border-dashed border-[var(--hive-color-gold-primary)] rounded-lg bg-[var(--hive-color-gold-primary)]/5 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--hive-color-gold-primary)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MousePointer size={24} className="text-[var(--hive-background-primary)]" />
                </div>
                <p className="text-lg font-medium text-[var(--hive-text-primary)]">
                  Drop element here;
                </p>
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  Release to add to your tool;
                </p>
              </div>
            </div>
          )}

          {/* Empty state */}
          {tool.elements.length === 0 && !isDragging && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-[var(--hive-background-tertiary)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Layers size={32} className="text-[var(--hive-text-tertiary)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
                  Start building your tool;
                </h3>
                <p className="text-[var(--hive-text-secondary)] mb-6">
                  Drag elements from the library on the left to create your custom tool. Click elements to configure their properties.
                </p>
                <HiveBadge variant="course-tag" className="inline-flex items-center gap-1">
                  <Hand size={14} />
                  Drag & Drop Interface;
                </HiveBadge>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

// Main Visual Tool Builder component;
export const VisualToolBuilder: React.FC<VisualBuilderProps> = ({
  tool,
  elements,
  onChange,
  onSave,
  onPreview,
  isLoading = false;
}) => {
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [canvas, setCanvas] = useState<CanvasState>({
    zoom: 1,
    offset: { x: 0, y: 0 },
    gridSize: 20,
    showGrid: true,
    snapToGrid: false,
    rulers: false,
    guides: [],
    selection: []
  });

  // Get selected element instance;
  const selectedElement = selectedElementId;
    ? tool.elements.find(el => el.id === selectedElementId)
    : null;

  // Handle element addition;
  const handleElementAdd = useCallback((element: Element, position: Position) => {
    const newInstance: ElementInstance = {
      id: `instance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      elementId: element.id,
      position,
      size: { width: 200, height: 'auto' },
      config: { ...element.defaultConfig },
      style: {
        backgroundColor: 'transparent',
        padding: { top: 8, right: 8, bottom: 8, left: 8 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
      },
      conditions: [],
      events: [],
      zIndex: tool.elements.length,
      isLocked: false,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedTool = {
      ...tool,
      elements: [...tool.elements, newInstance],
      updatedAt: new Date()
    };

    onChange(updatedTool);
    setSelectedElementId(newInstance.id)
  }, [tool, onChange]);

  // Handle element updates;
  const handleElementUpdate = useCallback((elementId: string, changes: Partial<ElementInstance>) => {
    const updatedTool = {
      ...tool,
      elements: tool.elements.map(el => 
        el.id === elementId;
          ? { ...el, ...changes, updatedAt: new Date() }}
          : el;
      ),
      updatedAt: new Date()
    };

    onChange(updatedTool)
  }, [tool, onChange]);

  // Handle element deletion;
  const handleElementDelete = useCallback((elementId: string) => {
    const updatedTool = {
      ...tool,
      elements: tool.elements.filter(el => el.id !== elementId),
      updatedAt: new Date()
    };

    onChange(updatedTool);
    
    if (selectedElementId === elementId) {
      setSelectedElementId(null)
    }
  }, [tool, onChange, selectedElementId]);

  // Handle canvas updates;
  const handleCanvasUpdate = useCallback((canvasChanges: Partial<CanvasState>) => {
    setCanvas(prev => ({ ...prev, ...canvasChanges }))
  }, []);

  return (
    <div className="flex h-screen bg-[var(--hive-background-primary)]">
      {/* Left Sidebar - Element Library */}
      <div className="w-80 border-r border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <ElementPicker;
          elements={elements}
          onElementSelect={(element) => {
            // Set up drag data for canvas drop;
            const dragElement = document.createElement('div');
            dragElement.style.display = 'none';
            document.body.appendChild(dragElement);
            
            const dragEvent = new DragEvent('dragstart', {
              dataTransfer: new DataTransfer()
            })};
            
            // Store element for canvas drop handling;
            (window as any).hiveDraggedElement = element;
          })}
        />
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 border-b border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-[var(--hive-text-primary)]">
              {tool.name}
            </h1>
            <HiveBadge variant="course-tag">
              {tool.elements.length} element{tool.elements.length !== 1 ? 's' : ''}
            </HiveBadge>
          </div>

          <div className="flex items-center gap-2">
            {/* Action buttons */}
            <HiveButton;
              variant="ghost"
              size="sm"
              onClick={() => {/* Handle undo */}}
              disabled={true}
            >
              <Undo size={16} />
            </HiveButton>
            <HiveButton;
              variant="ghost"
              size="sm"
              onClick={() => {/* Handle redo */}}
              disabled={true}
            >
              <Redo size={16} />
            </HiveButton>

            <div className="w-px h-6 bg-[var(--hive-border-default)] mx-2" />

            <HiveButton;
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(true)}
            >
              <Eye size={16} />
              Preview;
            </HiveButton>
            <HiveButton;
              variant="outline"
              size="sm"
              onClick={() => onSave(tool)}
              disabled={isLoading}
            >
              <Save size={16} />
              Save;
            </HiveButton>
            <HiveButton;
              variant="primary"
              size="sm"
              onClick={() => onPreview(tool)}
            >
              <Play size={16} />
              Run Tool;
            </HiveButton>
          </div>
        </div>

        <Canvas;
          tool={tool}
          elements={elements}
          onElementAdd={handleElementAdd}
          onElementUpdate={handleElementUpdate}
          onElementDelete={handleElementDelete}
          onElementSelect={setSelectedElementId}
          selectedElementId={selectedElementId}
          canvas={canvas}
          onCanvasUpdate={handleCanvasUpdate}
        />
      </div>

      {/* Right Sidebar - Element Properties */}
      {selectedElement && selectedElementId && (
        <div className="w-80 border-l border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
          <ElementConfig;
            element={elements.find(el => el.id === selectedElement.elementId)!}
            instance={selectedElement}
            onChange={(config) => {
              handleElementUpdate(selectedElementId, { config })
          })}
          />
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <ToolPreview;
          tool={tool}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  )
};

export default VisualToolBuilder;