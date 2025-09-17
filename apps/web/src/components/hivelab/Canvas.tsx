'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Trash2, Link2, Unlink, Move, MousePointer, ZoomIn, ZoomOut } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CanvasElement {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  config: Record<string, any>;
  category: string;
  properties: any[];
  inputs?: string[];
  outputs?: string[];
  size?: { width: number; height: number };
}

interface Connection {
  id: string;
  from: string;
  to: string;
  fromPort?: string;
  toPort?: string;
}

interface CanvasProps {
  elements: CanvasElement[];
  connections: Connection[];
  selectedElement: string | null;
  onSelectElement: (id: string | null) => void;
  onAddElement: (element: Omit<CanvasElement, 'id'>) => void;
  onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void;
  onDeleteElement: (id: string) => void;
  onConnect: (from: string, to: string) => void;
  onDisconnect: (connectionId: string) => void;
}

// Sortable Element Component
function SortableElement({ 
  element, 
  isSelected, 
  onSelect, 
  onDelete, 
  isConnecting, 
  onConnectionStart 
}: {
  element: CanvasElement;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  isConnecting: boolean;
  onConnectionStart: (id: string, event: React.MouseEvent) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : isSelected ? 10 : 2,
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      input: 'border-blue-500/50 bg-blue-500/10',
      display: 'border-green-500/50 bg-green-500/10',
      action: 'border-purple-500/50 bg-purple-500/10',
      logic: 'border-orange-500/50 bg-orange-500/10',
      data: 'border-teal-500/50 bg-teal-500/10',
    };
    return colors[category as keyof typeof colors] || 'border-gray-500/50 bg-gray-500/10';
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        ...style,
        left: element.position.x,
        top: element.position.y,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className={cn(
        "absolute w-[200px] rounded-lg border-2 bg-gray-900 cursor-move select-none transition-all",
        isSelected 
          ? "border-[var(--hive-brand-primary)] shadow-lg shadow-[var(--hive-brand-primary)]/20" 
          : "border-gray-700 hover:border-gray-600",
        getCategoryColor(element.category),
        isDragging && "opacity-50"
      )}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element.id);
      }}
      {...attributes}
      {...listeners}
    >
      {/* Element Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            element.category === 'input' && "bg-blue-500",
            element.category === 'display' && "bg-green-500",
            element.category === 'action' && "bg-purple-500",
            element.category === 'logic' && "bg-orange-500",
            element.category === 'data' && "bg-teal-500"
          )} />
          <span className="text-sm font-medium text-white truncate">{element.name}</span>
        </div>
        <div className="flex items-center gap-1">
          {isConnecting && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onConnectionStart(element.id, e);
              }}
              className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <Link2 className="h-3 w-3" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(element.id);
            }}
            className="p-1 text-gray-500 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Element Body */}
      <div className="p-3">
        <p className="text-xs text-gray-400">{element.type}</p>
        {element.config.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{element.config.description}</p>
        )}
      </div>

      {/* Connection Points */}
      {element.inputs && element.inputs.length > 0 && (
        <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2">
          <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-gray-900 shadow-lg" />
        </div>
      )}
      {element.outputs && element.outputs.length > 0 && (
        <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2">
          <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-gray-900 shadow-lg" />
        </div>
      )}
    </motion.div>
  );
}

export function Canvas({
  elements,
  connections,
  selectedElement,
  onSelectElement,
  onAddElement,
  onUpdateElement,
  onDeleteElement,
  onConnect,
  onDisconnect
}: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [connectionLine, setConnectionLine] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [canvasMode, setCanvasMode] = useState<'select' | 'connect'>('select');
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    
    if (delta && canvasRef.current) {
      const element = elements.find(el => el.id === active.id);
      if (element) {
        onUpdateElement(element.id, {
          position: {
            x: element.position.x + delta.x / zoom,
            y: element.position.y + delta.y / zoom
          }
        });
      }
    }
    
    setActiveId(null);
  };

  const handleConnectionStart = useCallback((elementId: string, e: React.MouseEvent) => {
    if (canvasMode === 'connect') {
      setIsConnecting(true);
      setConnectingFrom(elementId);
      
      const element = elements.find(el => el.id === elementId);
      if (element) {
        setConnectionLine({
          x1: element.position.x + 100,
          y1: element.position.y + 50,
          x2: element.position.x + 100,
          y2: element.position.y + 50
        });
      }
    }
  }, [canvasMode, elements]);

  // Handle mouse move for connecting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;

      if (isConnecting && connectingFrom) {
        const fromElement = elements.find(el => el.id === connectingFrom);
        if (fromElement) {
          setConnectionLine({
            x1: fromElement.position.x + 100,
            y1: fromElement.position.y + 50,
            x2: x,
            y2: y
          });
        }
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isConnecting && connectingFrom && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - pan.x) / zoom;
        const y = (e.clientY - rect.top - pan.y) / zoom;

        const targetElement = elements.find(el => 
          el.id !== connectingFrom &&
          x >= el.position.x && x <= el.position.x + 200 &&
          y >= el.position.y && y <= el.position.y + 100
        );

        if (targetElement) {
          onConnect(connectingFrom, targetElement.id);
        }
      }

      setIsConnecting(false);
      setConnectingFrom(null);
      setConnectionLine(null);
    };

    if (isConnecting) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isConnecting, connectingFrom, elements, zoom, pan, onConnect]);

  // Handle drop from palette
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    const elementType = e.dataTransfer.getData('elementType');
    const elementCategory = e.dataTransfer.getData('elementCategory');
    const elementName = e.dataTransfer.getData('elementName');
    
    if (!elementType || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;

    onAddElement({
      type: elementType,
      name: elementName || `New ${elementType}`,
      category: elementCategory || 'input',
      position: { x, y },
      config: {},
      properties: [
        { key: 'label', label: 'Label', type: 'text', value: elementName || `New ${elementType}` },
        { key: 'required', label: 'Required', type: 'boolean', value: false },
        { key: 'placeholder', label: 'Placeholder', type: 'text', value: '' }
      ],
      inputs: ['input'],
      outputs: ['output']
    });
  }, [zoom, pan, onAddElement]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Render connection lines
  const renderConnections = () => (
    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {connections.map(conn => {
        const fromEl = elements.find(el => el.id === conn.from);
        const toEl = elements.find(el => el.id === conn.to);
        if (!fromEl || !toEl) return null;

        const x1 = fromEl.position.x + 200;
        const y1 = fromEl.position.y + 50;
        const x2 = toEl.position.x;
        const y2 = toEl.position.y + 50;

        // Create curved path
        const midX = (x1 + x2) / 2;
        const path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;

        return (
          <g key={conn.id}>
            <path
              d={path}
              stroke="var(--hive-brand-primary)"
              strokeWidth="2"
              fill="none"
              className="opacity-50"
            />
            <circle cx={x1} cy={y1} r="4" fill="var(--hive-brand-primary)" />
            <circle cx={x2} cy={y2} r="4" fill="var(--hive-brand-primary)" />
          </g>
        );
      })}
      
      {/* Temporary connection line while connecting */}
      {connectionLine && (
        <line
          x1={connectionLine.x1}
          y1={connectionLine.y1}
          x2={connectionLine.x2}
          y2={connectionLine.y2}
          stroke="var(--hive-brand-primary)"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="opacity-50"
        />
      )}
    </svg>
  );

  return (
    <div 
      ref={canvasRef}
      className="relative h-full bg-gray-950 overflow-hidden"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => onSelectElement(null)}
    >
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)
          `,
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          transform: `translate(${pan.x}px, ${pan.y}px)`
        }}
      />

      {/* Toolbar */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-gray-900/90 backdrop-blur-sm rounded-lg p-1 z-10">
        <button
          onClick={() => setCanvasMode('select')}
          className={cn(
            "p-2 rounded transition-all",
            canvasMode === 'select'
              ? "bg-[var(--hive-brand-primary)] text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          )}
          title="Select Mode"
        >
          <MousePointer className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            setCanvasMode('connect');
            setIsConnecting(false);
            setConnectingFrom(null);
            setConnectionLine(null);
          }}
          className={cn(
            "p-2 rounded transition-all",
            canvasMode === 'connect'
              ? "bg-[var(--hive-brand-primary)] text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          )}
          title="Connect Mode"
        >
          <Link2 className="h-4 w-4" />
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-gray-900/90 backdrop-blur-sm rounded-lg p-1 z-10">
        <button
          onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <span className="px-2 text-sm text-gray-400 min-w-[60px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom(Math.min(2, zoom + 0.1))}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-all"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-all text-xs"
          title="Reset View"
        >
          Reset
        </button>
      </div>

      {/* Canvas Content */}
      <div 
        className="relative h-full"
        style={{
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          transformOrigin: 'top left'
        }}
      >
        {/* Connections */}
        {renderConnections()}

        {/* DndKit Context */}
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={elements} strategy={rectSortingStrategy}>
            <AnimatePresence>
              {elements.map(element => (
                <SortableElement
                  key={element.id}
                  element={element}
                  isSelected={selectedElement === element.id}
                  onSelect={onSelectElement}
                  onDelete={onDeleteElement}
                  isConnecting={canvasMode === 'connect'}
                  onConnectionStart={handleConnectionStart}
                />
              ))}
            </AnimatePresence>
          </SortableContext>
          
          <DragOverlay>
            {activeId ? (
              <div className="w-[200px] h-[100px] rounded-lg border-2 border-[var(--hive-brand-primary)] bg-gray-900 opacity-80">
                <div className="p-3">
                  <span className="text-sm font-medium text-white">
                    {elements.find(el => el.id === activeId)?.name}
                  </span>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* Empty State */}
        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Link2 className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-400 mb-2">Start Building</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Drag elements from the palette or use templates to get started
              </p>
              <p className="text-xs text-gray-600 mt-4">
                Hold Shift + Click to connect elements
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 text-xs text-gray-400 max-w-md">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <span>🖱️ Drag elements to move</span>
            <span>🔗 Use Connect mode to link elements</span>
          </div>
          <div className="flex items-center gap-4">
            <span>⌫ Delete to remove selected</span>
            <span>🎯 Drop elements from palette</span>
          </div>
        </div>
      </div>
    </div>
  );
}