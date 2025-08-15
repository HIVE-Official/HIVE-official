'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from '../../../components/framer-motion-proxy';
import { cn } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { 
  Edit, 
  Save, 
  X, 
  GripVertical, 
  Plus,
  Settings,
  Maximize,
  Minimize
} from 'lucide-react';

// Grid System Types
export interface GridItem {
  id: string;
  cardType: 'avatar' | 'calendar' | 'notifications' | 'spaces' | 'ghostMode' | 'hiveLab';
  position: { x: number; y: number };
  size: { width: 1 | 2; height: 1 | 2 };
  isVisible: boolean;
  settings?: Record<string, any>;
}

export interface BentoGridProps {
  items: GridItem[];
  isEditMode: boolean;
  onItemsChange: (items: GridItem[]) => void;
  onEditModeChange: (isEdit: boolean) => void;
  className?: string;
  maxColumns?: number;
  children?: React.ReactNode;
}

// Grid Layout Hook for responsive behavior
function useGridLayout(maxColumns: number = 4) {
  const [columns, setColumns] = useState(maxColumns);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.offsetWidth;
      if (width < 768) {
        setColumns(1); // Mobile: single column
      } else if (width < 1200) {
        setColumns(2); // Tablet: two columns
      } else {
        setColumns(maxColumns); // Desktop: full grid
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [maxColumns]);

  return { columns, containerRef };
}

// Grid Position Calculator
function calculateGridPosition(items: GridItem[], newItem: Partial<GridItem>, columns: number) {
  const grid: boolean[][] = Array(10).fill(null).map(() => Array(columns).fill(false));
  
  // Mark existing items
  items.forEach(item => {
    if (item.id === newItem.id) return; // Skip the item being moved
    
    for (let y = item.position.y; y < item.position.y + item.size.height; y++) {
      for (let x = item.position.x; x < item.position.x + item.size.width; x++) {
        if (grid[y] && grid[y][x] !== undefined) {
          grid[y][x] = true;
        }
      }
    }
  });

  // Find available position
  const width = newItem.size?.width || 1;
  const height = newItem.size?.height || 1;

  for (let y = 0; y < grid.length - height + 1; y++) {
    for (let x = 0; x < columns - width + 1; x++) {
      let canPlace = true;
      
      for (let dy = 0; dy < height && canPlace; dy++) {
        for (let dx = 0; dx < width && canPlace; dx++) {
          if (grid[y + dy][x + dx]) {
            canPlace = false;
          }
        }
      }
      
      if (canPlace) {
        return { x, y };
      }
    }
  }
  
  // If no space found, place at end
  return { x: 0, y: grid.length };
}

// Grid Item Component
interface GridItemWrapperProps {
  item: GridItem;
  isEditMode: boolean;
  columns: number;
  onResize?: (id: string, size: { width: 1 | 2; height: 1 | 2 }) => void;
  onSettingsClick?: (id: string) => void;
  children: React.ReactNode;
}

function GridItemWrapper({ 
  item, 
  isEditMode, 
  columns, 
  onResize, 
  onSettingsClick,
  children 
}: GridItemWrapperProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const gridSpanClass = columns === 1 
    ? 'col-span-1' 
    : `col-span-${item.size.width} row-span-${item.size.height}`;

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  }, []);

  const handleResize = useCallback((direction: 'width' | 'height', delta: 1 | -1) => {
    if (!onResize) return;
    
    const newSize = { ...item.size };
    if (direction === 'width') {
      newSize.width = Math.max(1, Math.min(2, newSize.width + delta)) as 1 | 2;
    } else {
      newSize.height = Math.max(1, Math.min(2, newSize.height + delta)) as 1 | 2;
    }
    
    onResize(item.id, newSize);
    setIsResizing(false);
  }, [item.id, item.size, onResize]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'relative group',
        gridSpanClass,
        isEditMode && 'cursor-move',
        isDragging && 'z-50 rotate-2 scale-105',
        isResizing && 'z-40'
      )}
      style={{
        minHeight: columns === 1 ? 'auto' : `${item.size.height * 200}px`
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      {/* Edit Mode Controls */}
      {isEditMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-2 -right-2 z-20 flex gap-1"
        >
          <Button
            size="sm"
            variant="secondary"
            className="h-6 w-6 p-0 shadow-lg"
            onClick={() => onSettingsClick?.(item.id)}
          >
            <Settings className="w-3 h-3" />
          </Button>
          
          {/* Resize Controls */}
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="secondary"
              className="h-6 w-6 p-0 shadow-lg"
              onClick={() => handleResize('width', item.size.width === 1 ? 1 : -1)}
              disabled={columns === 1}
            >
              {item.size.width === 1 ? <Maximize className="w-3 h-3" /> : <Minimize className="w-3 h-3" />}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-6 w-6 p-0 shadow-lg"
              onClick={() => handleResize('height', item.size.height === 1 ? 1 : -1)}
              disabled={columns === 1}
            >
              {item.size.height === 1 ? <Maximize className="w-3 h-3" /> : <Minimize className="w-3 h-3" />}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Drag Handle */}
      {isEditMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-2 right-2 z-10 opacity-50 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical className="w-4 h-4 text-[var(--hive-text-muted)]" />
        </motion.div>
      )}

      {/* Card Content */}
      <motion.div
        className={cn(
          'h-full w-full',
          isEditMode && 'pointer-events-none'
        )}
        animate={{
          scale: isDragging ? 1.02 : 1,
          boxShadow: isDragging 
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Main Bento Grid Component
export function BentoGridLayout({
  items,
  isEditMode,
  onItemsChange,
  onEditModeChange,
  className,
  maxColumns = 4,
  children
}: BentoGridProps) {
  const { columns, containerRef } = useGridLayout(maxColumns);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragEnd = useCallback((newOrder: GridItem[]) => {
    // Recalculate positions for new order
    const updatedItems = newOrder.map((item, index) => {
      const position = calculateGridPosition(newOrder.slice(0, index), item, columns);
      return { ...item, position };
    });
    
    onItemsChange(updatedItems);
    setDraggedItem(null);
  }, [columns, onItemsChange]);

  const handleResize = useCallback((id: string, size: { width: 1 | 2; height: 1 | 2 }) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const position = calculateGridPosition(items, { ...item, size }, columns);
        return { ...item, size, position };
      }
      return item;
    });
    onItemsChange(updatedItems);
  }, [items, columns, onItemsChange]);

  const handleSettingsClick = useCallback((id: string) => {
    // Handle card-specific settings
    console.log('Settings clicked for:', id);
  }, []);

  const handleSaveLayout = useCallback(() => {
    onEditModeChange(false);
    // Save to Firebase here
  }, [onEditModeChange]);

  const handleCancelEdit = useCallback(() => {
    onEditModeChange(false);
    // Revert changes here
  }, [onEditModeChange]);

  const gridTemplateColumns = columns === 1 
    ? 'grid-cols-1' 
    : columns === 2 
    ? 'grid-cols-2' 
    : `grid-cols-${columns}`;

  return (
    <div ref={containerRef} className={cn('w-full', className)}>
      {/* Edit Mode Header */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-between p-4 mb-6 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-primary)]"
          >
            <div>
              <h3 className="font-medium text-[var(--hive-text-primary)]">Customize Your Profile</h3>
              <p className="text-sm text-[var(--hive-text-muted)]">
                Drag cards to reorder, resize with the controls, or adjust settings
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveLayout}>
                <Save className="w-4 h-4 mr-2" />
                Save Layout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Container */}
      <div className="relative">
        {isEditMode ? (
          <Reorder.Group
            axis="y"
            values={items}
            onReorder={handleDragEnd}
            className={cn(
              'grid gap-4 auto-rows-min',
              gridTemplateColumns
            )}
          >
            <AnimatePresence>
              {items
                .filter(item => item.isVisible)
                .map((item) => (
                  <Reorder.Item
                    key={item.id}
                    value={item}
                    onDragStart={() => setDraggedItem(item.id)}
                    onDragEnd={() => setDraggedItem(null)}
                    className={cn(
                      columns === 1 
                        ? 'col-span-1' 
                        : `col-span-${item.size.width} row-span-${item.size.height}`,
                      'cursor-move'
                    )}
                  >
                    <GridItemWrapper
                      item={item}
                      isEditMode={isEditMode}
                      columns={columns}
                      onResize={handleResize}
                      onSettingsClick={handleSettingsClick}
                    >
                      {/* Card content will be rendered by children */}
                      <Card className="h-full">
                        <div className="p-4 h-full flex items-center justify-center">
                          <span className="text-[var(--hive-text-muted)]">
                            {item.cardType} Card
                          </span>
                        </div>
                      </Card>
                    </GridItemWrapper>
                  </Reorder.Item>
                ))}
            </AnimatePresence>
          </Reorder.Group>
        ) : (
          <div className={cn('grid gap-4 auto-rows-min', gridTemplateColumns)}>
            <AnimatePresence>
              {items
                .filter(item => item.isVisible)
                .sort((a, b) => a.position.y - b.position.y || a.position.x - b.position.x)
                .map((item) => (
                  <GridItemWrapper
                    key={item.id}
                    item={item}
                    isEditMode={isEditMode}
                    columns={columns}
                    onResize={handleResize}
                    onSettingsClick={handleSettingsClick}
                  >
                    {/* Card content will be passed as children */}
                    {children}
                  </GridItemWrapper>
                ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Add Card Button (Edit Mode) */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4"
          >
            <Button
              variant="dashed"
              className="w-full h-20 border-2 border-dashed border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-primary)] transition-colors"
            >
              <Plus className="w-6 h-6 mr-2" />
              Add Card
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Hook for managing grid state
export function useBentoGrid(initialItems: GridItem[] = []) {
  const [items, setItems] = useState<GridItem[]>(initialItems);
  const [isEditMode, setIsEditMode] = useState(false);

  const updateItems = useCallback((newItems: GridItem[]) => {
    setItems(newItems);
    // Sync to Firebase here
  }, []);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
  }, []);

  const addCard = useCallback((cardType: GridItem['cardType']) => {
    const newCard: GridItem = {
      id: `${cardType}-${Date.now()}`,
      cardType,
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      isVisible: true,
      settings: {}
    };

    const position = calculateGridPosition(items, newCard, 4);
    newCard.position = position;

    setItems(prev => [...prev, newCard]);
  }, [items]);

  const removeCard = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateCardSettings = useCallback((id: string, settings: Record<string, any>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, settings: { ...item.settings, ...settings } } : item
    ));
  }, []);

  return {
    items,
    isEditMode,
    updateItems,
    toggleEditMode,
    addCard,
    removeCard,
    updateCardSettings,
    setIsEditMode
  };
}