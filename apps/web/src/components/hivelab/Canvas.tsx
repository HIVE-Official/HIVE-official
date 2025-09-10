'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Trash2, Link2, Unlink } from 'lucide-react';

interface CanvasElement {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  config: Record<string, any>;
  inputs?: string[];
  outputs?: string[];
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
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [connectionLine, setConnectionLine] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Handle element drag
  const handleElementMouseDown = useCallback((e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.shiftKey) {
      // Start connection
      setIsConnecting(true);
      setConnectingFrom(elementId);
    } else {
      // Start drag
      setIsDragging(true);
      setDraggedElement(elementId);
      onSelectElement(elementId);
    }
  }, [onSelectElement]);

  // Handle mouse move for dragging and connecting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;

      if (isDragging && draggedElement) {
        onUpdateElement(draggedElement, { position: { x, y } });
      }

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
        // Check if we're over another element
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

      setIsDragging(false);
      setDraggedElement(null);
      setIsConnecting(false);
      setConnectingFrom(null);
      setConnectionLine(null);
    };

    if (isDragging || isConnecting) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, draggedElement, isConnecting, connectingFrom, elements, zoom, pan, onUpdateElement, onConnect]);

  // Handle drop from palette
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    const elementType = e.dataTransfer.getData('elementType');
    if (!elementType || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;

    onAddElement({
      type: elementType,
      name: `New ${elementType}`,
      position: { x, y },
      config: {}
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
        className="absolute inset-0 bg-grid-pattern opacity-5"
        style={{
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          transform: `translate(${pan.x}px, ${pan.y}px)`
        }}
      />

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-gray-900 rounded-lg p-1 z-10">
        <button
          onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-all"
        >
          −
        </button>
        <span className="px-2 text-sm text-gray-400 min-w-[60px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom(Math.min(2, zoom + 0.1))}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-all"
        >
          +
        </button>
        <button
          onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-all text-xs"
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

        {/* Elements */}
        <AnimatePresence>
          {elements.map(element => (
            <motion.div
              key={element.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={cn(
                "absolute w-[200px] rounded-lg border-2 bg-gray-900 cursor-move select-none",
                selectedElement === element.id 
                  ? "border-[var(--hive-brand-primary)] shadow-lg shadow-[var(--hive-brand-primary)]/20" 
                  : "border-gray-700 hover:border-gray-600"
              )}
              style={{
                left: element.position.x,
                top: element.position.y,
                zIndex: selectedElement === element.id ? 10 : 2
              }}
              onMouseDown={(e) => handleElementMouseDown(e, element.id)}
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement(element.id);
              }}
            >
              {/* Element Header */}
              <div className="flex items-center justify-between p-3 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-white">{element.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteElement(element.id);
                  }}
                  className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>

              {/* Element Body */}
              <div className="p-3">
                <p className="text-xs text-gray-400">{element.type}</p>
                {element.config.description && (
                  <p className="text-xs text-gray-500 mt-1">{element.config.description}</p>
                )}
              </div>

              {/* Connection Points */}
              {element.inputs && element.inputs.length > 0 && (
                <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2">
                  <div className="w-4 h-4 rounded-full bg-gray-700 border-2 border-gray-600" />
                </div>
              )}
              {element.outputs && element.outputs.length > 0 && (
                <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2">
                  <div className="w-4 h-4 rounded-full bg-gray-700 border-2 border-gray-600" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

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
      <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span>🖱️ Drag to move</span>
          <span>⇧ + Click to connect</span>
          <span>⌫ to delete</span>
        </div>
      </div>
    </div>
  );
}