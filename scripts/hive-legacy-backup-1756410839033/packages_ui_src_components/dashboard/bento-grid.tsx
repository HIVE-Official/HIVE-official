'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls, Reorder } from 'framer-motion';
import { GripVertical, Maximize2, Minimize2, Settings, X, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Button } from '../hive-button';
import { Badge } from '../../atomic/atoms/badge';

// Grid item types and sizes
export type GridSize = 'small' | 'medium' | 'large' | 'xl';
export type GridPosition = { x: number; y: number; width: number; height: number };

export interface BentoGridItem {
  id: string;
  title: string;
  component: React.ReactNode;
  size: GridSize;
  position?: GridPosition;
  minSize?: GridSize;
  maxSize?: GridSize;
  resizable?: boolean;
  removable?: boolean;
  configurable?: boolean;
  priority?: number;
  category?: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface BentoGridLayout {
  id: string;
  name: string;
  items: BentoGridItem[];
  columns: number;
  gap: number;
  responsive?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

interface BentoGridProps {
  layout: BentoGridLayout;
  onLayoutChange?: (newLayout: BentoGridLayout) => void;
  onItemResize?: (itemId: string, newSize: GridSize) => void;
  onItemRemove?: (itemId: string) => void;
  onItemAdd?: () => void;
  onItemConfigure?: (itemId: string) => void;
  editable?: boolean;
  className?: string;
}

// Grid size mappings
const gridSizeMap: Record<GridSize, { cols: number; rows: number; minCols?: number; minRows?: number }> = {
  small: { cols: 1, rows: 1, minCols: 1, minRows: 1 },
  medium: { cols: 2, rows: 1, minCols: 1, minRows: 1 },
  large: { cols: 2, rows: 2, minCols: 2, minRows: 1 },
  xl: { cols: 3, rows: 2, minCols: 2, minRows: 2 }
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -20,
    transition: {
      duration: 0.2
    }
  }
} as const;

export function BentoGrid({
  layout,
  onLayoutChange,
  onItemResize,
  onItemRemove,
  onItemAdd,
  onItemConfigure,
  editable = false,
  className = ""
}: BentoGridProps) {
  const [items, setItems] = useState<BentoGridItem[]>(layout.items);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [resizingItem, setResizingItem] = useState<string | null>(null);
  const [showGridLines, setShowGridLines] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Handle item reorder
  const handleReorder = (newItems: BentoGridItem[]) => {
    setItems(newItems);
    onLayoutChange?.({
      ...layout,
      items: newItems
    });
  };

  // Handle item size change
  const handleItemResize = (itemId: string, newSize: GridSize) => {
    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, size: newSize } : item
    );
    setItems(updatedItems);
    onItemResize?.(itemId, newSize);
    onLayoutChange?.({
      ...layout,
      items: updatedItems
    });
  };

  // Handle item removal
  const handleItemRemove = (itemId: string) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    onItemRemove?.(itemId);
    onLayoutChange?.({
      ...layout,
      items: updatedItems
    });
  };

  // Get grid item style based on size
  const getItemStyle = (size: GridSize) => {
    const mapping = gridSizeMap[size];
    return {
      gridColumn: `span ${mapping.cols}`,
      gridRow: `span ${mapping.rows}`,
      minHeight: `${mapping.rows * 120}px`
    };
  };

  // Get responsive grid columns
  const getGridColumns = () => {
    if (layout.responsive) {
      return {
        gridTemplateColumns: `repeat(${layout.responsive.desktop}, 1fr)`,
        '@media (max-width: theme(screens.lg))': {
          gridTemplateColumns: `repeat(${layout.responsive.tablet}, 1fr)`
        },
        '@media (max-width: theme(screens.md))': {
          gridTemplateColumns: `repeat(${layout.responsive.mobile}, 1fr)`
        }
      };
    }
    return {
      gridTemplateColumns: `repeat(${layout.columns}, 1fr)`
    };
  };

  return (
    <motion.div 
      className={`bento-grid-container ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Grid Controls */}
      {editable && (
        <motion.div 
          className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold text-gray-900">{layout.name}</h3>
            <Badge variant="secondary">{items.length} widgets</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <ButtonEnhanced
              variant="secondary"
              size="sm"
              onClick={() => setShowGridLines(!showGridLines)}
            >
              Grid Lines
            </ButtonEnhanced>
            <ButtonEnhanced
              variant="secondary"
              size="sm"
              onClick={onItemAdd}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Widget
            </ButtonEnhanced>
          </div>
        </motion.div>
      )}

      {/* Bento Grid */}
      <Reorder.Group 
        as="div"
        values={items}
        onReorder={handleReorder}
        className={`
          grid gap-${layout.gap} 
          ${showGridLines ? 'bg-grid-pattern' : ''}
          transition-all duration-300
        `}
        style={getGridColumns()}
        ref={gridRef}
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <Reorder.Item
              key={item.id}
              value={item}
              as="div"
              style={getItemStyle(item.size)}
              className="relative"
              whileDrag={{ 
                scale: 1.05, 
                zIndex: 50,
                boxShadow: "0 5 6 -5px color-mix(in_srgb,var(--hive-background-primary)_10%,transparent), 0 10px 10px -5px color-mix(in_srgb,var(--hive-background-primary)_4%,transparent)"
              }}
              onDragStart={() => setDraggedItem(item.id)}
              onDragEnd={() => setDraggedItem(null)}
            >
              <BentoGridItemComponent
                item={item}
                isEditable={editable}
                isDragging={draggedItem === item.id}
                isResizing={resizingItem === item.id}
                onResize={(newSize) => handleItemResize(item.id, newSize)}
                onRemove={() => handleItemRemove(item.id)}
                onConfigure={() => onItemConfigure?.(item.id)}
                onResizeStart={() => setResizingItem(item.id)}
                onResizeEnd={() => setResizingItem(null)}
              />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {/* Empty State */}
      {items.length === 0 && (
        <motion.div 
          className="col-span-full flex flex-col items-center justify-center py-12 text-center"
          variants={itemVariants}
        >
          <div className="w-16 h-16 bg-[var(--hive-background-secondary)] rounded-full flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No widgets configured</h3>
          <p className="text-[var(--hive-text-muted)] mb-4">Add widgets to customize your dashboard</p>
          {editable && (
            <ButtonEnhanced onClick={onItemAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Widget
            </ButtonEnhanced>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// Individual grid item component
interface BentoGridItemComponentProps {
  item: BentoGridItem;
  isEditable: boolean;
  isDragging: boolean;
  isResizing: boolean;
  onResize: (newSize: GridSize) => void;
  onRemove: () => void;
  onConfigure: () => void;
  onResizeStart: () => void;
  onResizeEnd: () => void;
}

function BentoGridItemComponent({
  item,
  isEditable,
  isDragging,
  isResizing,
  onResize,
  onRemove,
  onConfigure,
  onResizeStart,
  onResizeEnd
}: BentoGridItemComponentProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showSizeMenu, setShowSizeMenu] = useState(false);
  const dragControls = useDragControls();

  const sizeOptions: { size: GridSize; label: string; disabled?: boolean }[] = [
    { size: 'small' as GridSize, label: 'Small (1x1)' },
    { size: 'medium' as GridSize, label: 'Medium (2x1)' },
    { size: 'large' as GridSize, label: 'Large (2x2)' },
    { size: 'xl' as GridSize, label: 'Extra Large (3x2)' }
  ].filter(option => {
    if (item.minSize && option.size < item.minSize) return false;
    if (item.maxSize && option.size > item.maxSize) return false;
    return true;
  });

  return (
    <motion.div
      className="h-full"
      variants={itemVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      <Card className={`
        h-full overflow-hidden transition-all duration-200
        ${isDragging ? 'ring-2 ring-blue-500 shadow-lg' : ''}
        ${isResizing ? 'ring-2 ring-purple-500' : ''}
        ${isHovered ? 'shadow-md' : ''}
      `}>
        {/* Item Header */}
        <CardHeader className="pb-2 relative">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              {item.icon}
              <span>{item.title}</span>
              {item.category && (
                <Badge variant="secondary" className="text-xs">
                  {item.category}
                </Badge>
              )}
            </CardTitle>

            {/* Controls */}
            {isEditable && (isHovered || isDragging || isResizing) && (
              <div className="flex items-center space-x-1">
                {/* Resize Controls */}
                {item.resizable && (
                  <div className="relative">
                    <ButtonEnhanced
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSizeMenu(!showSizeMenu)}
                      onMouseDown={onResizeStart}
                      onMouseUp={onResizeEnd}
                    >
                      <Maximize2 className="h-3 w-3" />
                    </ButtonEnhanced>
                    
                    {showSizeMenu && (
                      <motion.div
                        className="absolute top-8 right-0 bg-[var(--hive-text-primary)] rounded-lg shadow-lg border border-gray-200 p-2 z-50 min-w-[150px]"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {sizeOptions.map(({ size, label, disabled }) => (
                          <button
                            key={size}
                            className={`
                              w-full text-left px-3 py-2 text-xs rounded hover:bg-gray-50 transition-colors
                              ${item.size === size ? 'bg-blue-50 text-blue-700' : ''}
                              ${disabled ? 'text-gray-400 cursor-not-allowed' : ''}
                            `}
                            onClick={() => {
                              if (!disabled) {
                                onResize(size);
                                setShowSizeMenu(false);
                              }
                            }}
                            disabled={disabled}
                          >
                            {label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Configure Button */}
                {item.configurable && (
                  <ButtonEnhanced
                    variant="ghost"
                    size="sm"
                    onClick={onConfigure}
                  >
                    <Settings className="h-3 w-3" />
                  </ButtonEnhanced>
                )}

                {/* Remove Button */}
                {item.removable && (
                  <ButtonEnhanced
                    variant="ghost"
                    size="sm"
                    onClick={onRemove}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-3 w-3" />
                  </ButtonEnhanced>
                )}

                {/* Drag Handle */}
                <ButtonEnhanced
                  variant="ghost"
                  size="sm"
                  onPointerDown={(e) => dragControls.start(e)}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <GripVertical className="h-3 w-3" />
                </ButtonEnhanced>
              </div>
            )}
          </div>

          {item.description && (
            <p className="text-xs text-[var(--hive-text-muted)] mt-1">{item.description}</p>
          )}
        </CardHeader>

        {/* Item Content */}
        <CardContent className="pt-0 h-full">
          <div className="h-full overflow-auto">
            {item.component}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Predefined layouts
export const defaultLayouts: Record<string, BentoGridLayout> = {
  academic: {
    id: 'academic',
    name: 'Academic Dashboard',
    columns: 4,
    gap: 4,
    responsive: {
      mobile: 1,
      tablet: 2,
      desktop: 4
    },
    items: []
  },
  productivity: {
    id: 'productivity',
    name: 'Productivity Dashboard',
    columns: 3,
    gap: 4,
    responsive: {
      mobile: 1,
      tablet: 2,
      desktop: 3
    },
    items: []
  },
  social: {
    id: 'social',
    name: 'Social Dashboard',
    columns: 3,
    gap: 6,
    responsive: {
      mobile: 1,
      tablet: 2,
      desktop: 3
    },
    items: []
  }
};

// Utility functions
export const createGridItem = (
  id: string,
  title: string,
  component: React.ReactNode,
  options: Partial<BentoGridItem> = {}
): BentoGridItem => ({
  id,
  title,
  component,
  size: 'medium',
  resizable: true,
  removable: true,
  configurable: false,
  priority: 0,
  ...options
});

export const optimizeLayout = (items: BentoGridItem[], columns: number): BentoGridItem[] => {
  // Sort by priority and size for optimal positioning
  return items.sort((a, b) => {
    if (a.priority !== b.priority) {
      return (b.priority || 0) - (a.priority || 0);
    }
    
    const sizeOrder = { xl: 4, large: 3, medium: 2, small: 1 };
    return sizeOrder[b.size] - sizeOrder[a.size];
  });
};

export default BentoGrid;