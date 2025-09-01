'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit3, Save, X } from 'lucide-react';
import { GridLayoutProps, WidgetConfiguration, GridPosition, DragDropState, DropZone } from './types';
import { BaseWidget } from './base-widget';
import { HiveButton } from '../../hive-button';
import { HiveCard } from '../../hive-card';
import { cn } from '../lib/utils';

export const GridLayoutEngine: React.FC<GridLayoutProps> = ({
  widgets,
  isEditing,
  isMobile = false,
  isTablet = false,
  onLayoutChange,
  onWidgetSettings,
  onAddWidget,
  onRemoveWidget
}) => {
  const [dragState, setDragState] = useState<DragDropState>({
    draggedWidget: null,
    dragOffset: { x: 0, y: 0 },
    dropZones: [],
    isValidDrop: false
  });

  const gridRef = useRef<HTMLDivElement>(null);
  const [gridDimensions, setGridDimensions] = useState({ width: 0, height: 0 });

  // Responsive grid configuration
  const gridConfig = {
    columns: isMobile ? 1 : isTablet ? 2 : 4,
    gap: isMobile ? 12 : 16,
    minRowHeight: isMobile ? 140 : 160
  };

  useEffect(() => {
    const updateGridDimensions = () => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        setGridDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateGridDimensions();
    window.addEventListener('resize', updateGridDimensions);
    return () => window.removeEventListener('resize', updateGridDimensions);
  }, []);

  // Generate drop zones for drag and drop
  const generateDropZones = useCallback((excludeWidget?: string): DropZone[] => {
    const zones: DropZone[] = [];
    const occupiedPositions = new Set<string>();

    // Mark occupied positions
    widgets
      .filter(w => w.id !== excludeWidget)
      .forEach(widget => {
        for (let x = widget.position.x; x < widget.position.x + widget.size.width; x++) {
          for (let y = widget.position.y; y < widget.position.y + widget.size.height; y++) {
            occupiedPositions.add(`${x},${y}`);
          }
        }
      });

    // Generate all possible drop zones
    for (let y = 0; y < 10; y++) { // Assume max 10 rows
      for (let x = 0; x < gridConfig.columns; x++) {
        // Check 1x1 zones
        const pos1x1 = `${x},${y}`;
        if (!occupiedPositions.has(pos1x1)) {
          zones.push({
            position: { x, y },
            size: { width: 1, height: 1 },
            isOccupied: false,
            isValid: true
          });
        }

        // Check 2x1 zones (if not mobile)
        if (!isMobile && x < gridConfig.columns - 1) {
          const pos2x1 = [`${x},${y}`, `${x + 1},${y}`];
          if (pos2x1.every(p => !occupiedPositions.has(p))) {
            zones.push({
              position: { x, y },
              size: { width: 2, height: 1 },
              isOccupied: false,
              isValid: true
            });
          }
        }

        // Check 1x2 zones
        const pos1x2 = [`${x},${y}`, `${x},${y + 1}`];
        if (pos1x2.every(p => !occupiedPositions.has(p))) {
          zones.push({
            position: { x, y },
            size: { width: 1, height: 2 },
            isOccupied: false,
            isValid: true
          });
        }

        // Check 2x2 zones (if not mobile)
        if (!isMobile && x < gridConfig.columns - 1) {
          const pos2x2 = [`${x},${y}`, `${x + 1},${y}`, `${x},${y + 1}`, `${x + 1},${y + 1}`];
          if (pos2x2.every(p => !occupiedPositions.has(p))) {
            zones.push({
              position: { x, y },
              size: { width: 2, height: 2 },
              isOccupied: false,
              isValid: true
            });
          }
        }
      }
    }

    return zones;
  }, [widgets, gridConfig.columns, isMobile]);

  const handleDragStart = useCallback((widgetId: string, event: React.MouseEvent) => {
    const widget = widgets.find(w => w.id === widgetId);
    if (!widget) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const offset = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    setDragState({
      draggedWidget: widgetId,
      dragOffset: offset,
      dropZones: generateDropZones(widgetId),
      isValidDrop: false
    });
  }, [widgets, generateDropZones]);

  const handleDragMove = useCallback((event: MouseEvent) => {
    if (!dragState.draggedWidget || !gridRef.current) return;

    const gridRect = gridRef.current.getBoundingClientRect();
    const cellWidth = (gridRect.width - (gridConfig.columns - 1) * gridConfig.gap) / gridConfig.columns;
    const cellHeight = gridConfig.minRowHeight;

    const relativeX = event.clientX - gridRect.left - dragState.dragOffset.x;
    const relativeY = event.clientY - gridRect.top - dragState.dragOffset.y;

    const gridX = Math.floor(relativeX / (cellWidth + gridConfig.gap));
    const gridY = Math.floor(relativeY / (cellHeight + gridConfig.gap));

    const validZone = dragState.dropZones.find(zone => 
      zone.position.x === gridX && zone.position.y === gridY
    );

    setDragState(prev => ({
      ...prev,
      isValidDrop: !!validZone
    }));
  }, [dragState, gridConfig]);

  const handleDragEnd = useCallback((event: MouseEvent) => {
    if (!dragState.draggedWidget || !gridRef.current) return;

    const gridRect = gridRef.current.getBoundingClientRect();
    const cellWidth = (gridRect.width - (gridConfig.columns - 1) * gridConfig.gap) / gridConfig.columns;
    const cellHeight = gridConfig.minRowHeight;

    const relativeX = event.clientX - gridRect.left - dragState.dragOffset.x;
    const relativeY = event.clientY - gridRect.top - dragState.dragOffset.y;

    const gridX = Math.max(0, Math.min(gridConfig.columns - 1, Math.floor(relativeX / (cellWidth + gridConfig.gap))));
    const gridY = Math.max(0, Math.floor(relativeY / (cellHeight + gridConfig.gap)));

    if (dragState.isValidDrop) {
      const updatedWidgets = widgets.map(widget => 
        widget.id === dragState.draggedWidget
          ? { ...widget, position: { x: gridX, y: gridY } }
          : widget
      );
      onLayoutChange(updatedWidgets);
    }

    setDragState({
      draggedWidget: null,
      dragOffset: { x: 0, y: 0 },
      dropZones: [],
      isValidDrop: false
    });
  }, [dragState, widgets, onLayoutChange, gridConfig]);

  // Set up drag event listeners
  useEffect(() => {
    if (dragState.draggedWidget) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [dragState.draggedWidget, handleDragMove, handleDragEnd]);

  const handleWidgetPositionChange = (widgetId: string, position: GridPosition) => {
    const updatedWidgets = widgets.map(widget => 
      widget.id === widgetId ? { ...widget, position } : widget
    );
    onLayoutChange(updatedWidgets);
  };

  const handleWidgetSizeChange = (widgetId: string, size: { width: 1 | 2; height: 1 | 2 }) => {
    const updatedWidgets = widgets.map(widget => 
      widget.id === widgetId ? { ...widget, size } : widget
    );
    onLayoutChange(updatedWidgets);
  };

  const renderWidget = (widget: WidgetConfiguration) => {
    const isDragging = dragState.draggedWidget === widget.id;
    
    return (
      <BaseWidget
        key={widget.id}
        id={widget.id}
        title={widget.title}
        size={widget.size}
        position={widget.position}
        settings={widget.settings}
        isEditing={isEditing}
        isDragging={isDragging}
        onSettingsChange={(settings) => onWidgetSettings(widget.id, settings)}
        onSizeChange={(size) => handleWidgetSizeChange(widget.id, size)}
        onPositionChange={(position) => handleWidgetPositionChange(widget.id, position)}
        onRemove={() => onRemoveWidget(widget.id)}
        className={isDragging ? 'cursor-grabbing' : isEditing ? 'cursor-grab' : ''}
      >
        <WidgetContent widget={widget} />
      </BaseWidget>
    );
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(${gridConfig.columns}, 1fr)`,
    gap: `${gridConfig.gap}px`,
    gridAutoRows: `${gridConfig.minRowHeight}px`
  };

  return (
    <div className="space-y-6">
      {/* Edit Mode Header */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-between p-4 bg-hive-surface-elevated/50 rounded-xl border border-hive-border-subtle backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <Edit3 className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
              <div>
                <h3 className="font-semibold text-hive-text-primary">Edit Mode</h3>
                <p className="text-sm text-hive-text-secondary">Drag widgets to customize your layout</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onAddWidget('social-avatar')}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Widget
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Container */} 
      <div
        ref={gridRef}
        className={cn(
          'grid auto-rows-fr relative',
          isEditing && 'bg-hive-surface-elevated/20 rounded-xl p-4 border border-dashed border-hive-border-subtle'
        )}
        style={gridStyle}
      >
        {/* Drop Zone Indicators */}
        <AnimatePresence>
          {isEditing && dragState.draggedWidget && (
            <>
              {dragState.dropZones.map((zone, index) => (
                <motion.div
                  key={`dropzone-${zone.position.x}-${zone.position.y}-${zone.size.width}x${zone.size.height}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    'absolute border-2 border-dashed rounded-lg pointer-events-none',
                    zone.isValid 
                      ? 'border-hive-gold bg-[var(--hive-brand-secondary)]/10' 
                      : 'border-red-400 bg-red-400/10'
                  )}
                  style={{
                    left: `${zone.position.x * (100 / gridConfig.columns)}%`,
                    top: `${zone.position.y * (gridConfig.minRowHeight + gridConfig.gap)}px`,
                    width: `${zone.size.width * (100 / gridConfig.columns)}%`,
                    height: `${zone.size.height * gridConfig.minRowHeight + (zone.size.height - 1) * gridConfig.gap}px`
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Widgets */}
        <AnimatePresence mode="popLayout">
          {widgets
            .filter(widget => widget.isVisible)
            .sort((a, b) => a.position.y - b.position.y || a.position.x - b.position.x)
            .map(renderWidget)}
        </AnimatePresence>

        {/* Empty State */}
        {widgets.length === 0 && (
          <div className="col-span-full flex items-center justify-center min-h-100">
            <Card className="p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-hive-surface-elevated flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-hive-text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-hive-text-primary mb-2">
                Customize Your Profile
              </h3>
              <p className="text-hive-text-secondary mb-4">
                Add widgets to create your personalized campus command center
              </p>
              <Button onClick={() => onAddWidget('social-avatar')}>
                Add Your First Widget
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

// Placeholder widget content - will be replaced with actual widget implementations
const WidgetContent: React.FC<{ widget: WidgetConfiguration }> = ({ widget }) => {
  const contentMap = {
    'social-avatar': <div className="text-hive-text-secondary">Social Avatar Widget</div>,
    'priority-coordination': <div className="text-hive-text-secondary">Priority Coordination Widget</div>,
    'community-coordination': <div className="text-hive-text-secondary">Community Coordination Widget</div>,
    'social-calendar': <div className="text-hive-text-secondary">Social Calendar Widget</div>,
    'privacy-control': <div className="text-hive-text-secondary">Privacy Control Widget</div>,
    'personal-tools': <div className="text-hive-text-secondary">Personal Tools Widget</div>,
    'profile-stats': <div className="text-hive-text-secondary">Profile Stats Widget</div>,
    'campus-connections': <div className="text-hive-text-secondary">Campus Connections Widget</div>
  };

  return (
    <div className="h-full flex items-center justify-center">
      {contentMap[widget.type] || <div className="text-hive-text-secondary">Unknown Widget</div>}
    </div>
  );
};