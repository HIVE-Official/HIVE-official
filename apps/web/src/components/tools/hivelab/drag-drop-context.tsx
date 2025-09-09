"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Element, ComposedElement } from '@hive/core/domain/tools';

interface DragDropContextType {
  draggedItem: DraggedItem | null;
  dropTarget: DropTarget | null;
  isDragging: boolean;
  startDrag: (item: DraggedItem) => void;
  endDrag: () => void;
  setDropTarget: (target: DropTarget | null) => void;
  canDrop: (target: DropTarget) => boolean;
}

interface DraggedItem {
  type: 'element' | 'composed' | 'connection';
  element?: Element;
  composedElement?: ComposedElement;
  sourceContainerId?: string;
  sourceIndex?: number;
  data?: any;
}

interface DropTarget {
  type: 'canvas' | 'container' | 'position' | 'connection';
  containerId?: string;
  index?: number;
  accepts?: string[];
  data?: any;
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined);

export function useDragDrop() {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within DragDropProvider');
  }
  return context;
}

interface DragDropProviderProps {
  children: ReactNode;
}

export function DragDropProvider({ children }: DragDropProviderProps) {
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);
  
  const startDrag = useCallback((item: DraggedItem) => {
    setDraggedItem(item);
  }, []);
  
  const endDrag = useCallback(() => {
    setDraggedItem(null);
    setDropTarget(null);
  }, []);
  
  const canDrop = useCallback((target: DropTarget): boolean => {
    if (!draggedItem) return false;
    
    // Check if target accepts the dragged item type
    if (target.accepts && draggedItem.element) {
      return target.accepts.includes(draggedItem.element.category);
    }
    
    // Prevent dropping on itself
    if (draggedItem.composedElement && target.containerId === draggedItem.composedElement.instanceId) {
      return false;
    }
    
    // Allow drops on canvas
    if (target.type === 'canvas') {
      return true;
    }
    
    // Allow drops in containers
    if (target.type === 'container') {
      return draggedItem.type === 'element' || draggedItem.type === 'composed';
    }
    
    // Allow position drops for reordering
    if (target.type === 'position') {
      return draggedItem.type === 'composed' && 
             draggedItem.sourceContainerId === target.containerId;
    }
    
    return false;
  }, [draggedItem]);
  
  const value: DragDropContextType = {
    draggedItem,
    dropTarget,
    isDragging: !!draggedItem,
    startDrag,
    endDrag,
    setDropTarget,
    canDrop
  };
  
  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
}

// Draggable Component
interface DraggableProps {
  item: DraggedItem;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export function Draggable({
  item,
  children,
  className = '',
  disabled = false,
  onDragStart,
  onDragEnd
}: DraggableProps) {
  const { startDrag, endDrag } = useDragDrop();
  
  const handleDragStart = (e: React.DragEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
    
    // Add drag image
    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
    dragImage.style.opacity = '0.5';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, e.clientX, e.clientY);
    setTimeout(() => document.body.removeChild(dragImage), 0);
    
    startDrag(item);
    onDragStart?.();
  };
  
  const handleDragEnd = () => {
    endDrag();
    onDragEnd?.();
  };
  
  return (
    <div
      draggable={!disabled}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`${disabled ? '' : 'cursor-move'} ${className}`}
    >
      {children}
    </div>
  );
}

// Droppable Component
interface DroppableProps {
  target: DropTarget;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  onDrop?: (item: DraggedItem) => void;
}

export function Droppable({
  target,
  children,
  className = '',
  activeClassName = '',
  onDrop
}: DroppableProps) {
  const { draggedItem, dropTarget, setDropTarget, canDrop, endDrag } = useDragDrop();
  const [isOver, setIsOver] = useState(false);
  
  const isDroppable = canDrop(target);
  const isActive = isOver && isDroppable;
  
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    if (isDroppable) {
      setIsOver(true);
      setDropTarget(target);
    }
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    // Only set isOver to false if we're leaving the droppable area entirely
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!e.currentTarget.contains(relatedTarget)) {
      setIsOver(false);
      if (dropTarget === target) {
        setDropTarget(null);
      }
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    if (isDroppable) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isDroppable && draggedItem) {
      onDrop?.(draggedItem);
      endDrag();
    }
    
    setIsOver(false);
  };
  
  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`${className} ${isActive ? activeClassName : ''}`}
    >
      {children}
    </div>
  );
}

// Sortable List Component
interface SortableListProps {
  items: ComposedElement[];
  containerId: string;
  onReorder: (fromIndex: number, toIndex: number) => void;
  renderItem: (item: ComposedElement, index: number) => ReactNode;
  className?: string;
}

export function SortableList({
  items,
  containerId,
  onReorder,
  renderItem,
  className = ''
}: SortableListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };
  
  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropIndex(null);
  };
  
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      setDropIndex(index);
    }
  };
  
  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      onReorder(draggedIndex, index);
    }
    handleDragEnd();
  };
  
  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={item.instanceId}>
          {/* Drop zone before item */}
          {dropIndex === index && draggedIndex !== null && draggedIndex > index && (
            <div className="h-1 bg-blue-500 rounded-full my-2" />
          )}
          
          <Draggable
            item={{
              type: 'composed',
              composedElement: item,
              sourceContainerId: containerId,
              sourceIndex: index
            }}
            onDragStart={() => handleDragStart(index)}
            onDragEnd={handleDragEnd}
            className={draggedIndex === index ? 'opacity-50' : ''}
          >
            <div
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
            >
              {renderItem(item, index)}
            </div>
          </Draggable>
          
          {/* Drop zone after item */}
          {dropIndex === index && draggedIndex !== null && draggedIndex < index && (
            <div className="h-1 bg-blue-500 rounded-full my-2" />
          )}
        </div>
      ))}
      
      {/* Drop zone after all items */}
      {items.length === 0 && (
        <Droppable
          target={{ type: 'container', containerId }}
          className="min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
          activeClassName="border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          onDrop={(item) => {
            if (item.element) {
              // Handle adding new element
            }
          }}
        >
          <p className="text-gray-500 text-sm">Drop elements here</p>
        </Droppable>
      )}
    </div>
  );
}