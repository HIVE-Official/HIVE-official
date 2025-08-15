import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef, useCallback } from 'react';

const meta = {
  title: 'Profile/03-Templates/Widget Container Organism',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Widget Container Organism - Universal container with drag, resize, and edit mode functionality. Provides the foundation for widget layout management with grid constraints and collision detection.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Widget Container Interface
interface Widget {
  id: string;
  type: string;
  title: string;
  width: number;
  height: number;
  x: number;
  y: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  config?: Record<string, any>;
  state?: 'loading' | 'error' | 'empty' | 'loaded';
}

// Drag State Interface
interface DragState {
  isDragging: boolean;
  draggedWidget: string | null;
  startPos: { x: number; y: number } | null;
  currentPos: { x: number; y: number } | null;
  offset: { x: number; y: number } | null;
}

// Resize State Interface
interface ResizeState {
  isResizing: boolean;
  resizedWidget: string | null;
  startSize: { width: number; height: number } | null;
  startPos: { x: number; y: number } | null;
  direction: 'se' | 'e' | 's' | null;
}

// Hook for widget container functionality
const useWidgetContainer = (initialWidgets: Widget[]) => {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedWidget: null,
    startPos: null,
    currentPos: null,
    offset: null
  });
  const [resizeState, setResizeState] = useState<ResizeState>({
    isResizing: false,
    resizedWidget: null,
    startSize: null,
    startPos: null,
    direction: null
  });

  const gridRef = useRef<HTMLDivElement>(null);

  // Calculate grid position from mouse coordinates
  const getGridPosition = useCallback((mouseX: number, mouseY: number) => {
    if (!gridRef.current) return { x: 0, y: 0 };
    
    const rect = gridRef.current.getBoundingClientRect();
    const cellWidth = rect.width / 4; // 4 columns
    const cellHeight = 120 + 16; // row height + gap
    
    const x = Math.max(0, Math.round((mouseX - rect.left) / cellWidth));
    const y = Math.max(0, Math.round((mouseY - rect.top) / cellHeight));
    
    return { x: Math.min(x, 3), y }; // Max 4 columns (0-3)
  }, []);

  // Check if position is valid (no collisions)
  const isValidPosition = useCallback((widget: Widget, newX: number, newY: number, newWidth?: number, newHeight?: number) => {
    const width = newWidth || widget.width;
    const height = newHeight || widget.height;
    
    // Check bounds
    if (newX < 0 || newX + width > 4) return false;
    if (newY < 0) return false;

    // Check collisions with other widgets
    const otherWidgets = widgets.filter(w => w.id !== widget.id);
    
    for (const other of otherWidgets) {
      const collision = !(
        newX >= other.x + other.width ||
        newX + width <= other.x ||
        newY >= other.y + other.height ||
        newY + height <= other.y
      );
      
      if (collision) return false;
    }
    
    return true;
  }, [widgets]);

  // Start dragging
  const handleDragStart = useCallback((widgetId: string, mouseEvent: React.MouseEvent) => {
    if (!isEditMode) return;
    
    const widget = widgets.find(w => w.id === widgetId);
    if (!widget) return;

    const rect = mouseEvent.currentTarget.getBoundingClientRect();
    const offset = {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    };

    setDragState({
      isDragging: true,
      draggedWidget: widgetId,
      startPos: { x: mouseEvent.clientX, y: mouseEvent.clientY },
      currentPos: { x: mouseEvent.clientX, y: mouseEvent.clientY },
      offset
    });

    setSelectedWidget(widgetId);
    mouseEvent.preventDefault();
  }, [isEditMode, widgets]);

  // Handle drag move
  const handleDragMove = useCallback((mouseEvent: MouseEvent) => {
    if (!dragState.isDragging || !dragState.draggedWidget) return;

    setDragState(prev => ({
      ...prev,
      currentPos: { x: mouseEvent.clientX, y: mouseEvent.clientY }
    }));
  }, [dragState.isDragging, dragState.draggedWidget]);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    if (!dragState.isDragging || !dragState.draggedWidget || !dragState.currentPos) {
      setDragState({
        isDragging: false,
        draggedWidget: null,
        startPos: null,
        currentPos: null,
        offset: null
      });
      return;
    }

    const widget = widgets.find(w => w.id === dragState.draggedWidget);
    if (!widget) return;

    const gridPos = getGridPosition(dragState.currentPos.x, dragState.currentPos.y);
    
    if (isValidPosition(widget, gridPos.x, gridPos.y)) {
      setWidgets(prev => prev.map(w => 
        w.id === dragState.draggedWidget 
          ? { ...w, x: gridPos.x, y: gridPos.y }
          : w
      ));
    }

    setDragState({
      isDragging: false,
      draggedWidget: null,
      startPos: null,
      currentPos: null,
      offset: null
    });
  }, [dragState, widgets, getGridPosition, isValidPosition]);

  // Start resizing
  const handleResizeStart = useCallback((widgetId: string, direction: 'se' | 'e' | 's', mouseEvent: React.MouseEvent) => {
    if (!isEditMode) return;
    
    const widget = widgets.find(w => w.id === widgetId);
    if (!widget) return;

    setResizeState({
      isResizing: true,
      resizedWidget: widgetId,
      startSize: { width: widget.width, height: widget.height },
      startPos: { x: mouseEvent.clientX, y: mouseEvent.clientY },
      direction
    });

    setSelectedWidget(widgetId);
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
  }, [isEditMode, widgets]);

  // Handle resize move
  const handleResizeMove = useCallback((mouseEvent: MouseEvent) => {
    if (!resizeState.isResizing || !resizeState.resizedWidget || !resizeState.startPos || !resizeState.startSize) return;

    const widget = widgets.find(w => w.id === resizeState.resizedWidget);
    if (!widget) return;

    const deltaX = mouseEvent.clientX - resizeState.startPos.x;
    const deltaY = mouseEvent.clientY - resizeState.startPos.y;

    let newWidth = resizeState.startSize.width;
    let newHeight = resizeState.startSize.height;

    if (resizeState.direction === 'se' || resizeState.direction === 'e') {
      newWidth = Math.max(1, Math.min(4, Math.round(resizeState.startSize.width + deltaX / 160))); // 160px per grid cell
    }
    if (resizeState.direction === 'se' || resizeState.direction === 's') {
      newHeight = Math.max(1, Math.min(4, Math.round(resizeState.startSize.height + deltaY / 136))); // 136px per grid cell
    }

    // Apply min/max constraints
    if (widget.minWidth) newWidth = Math.max(newWidth, widget.minWidth);
    if (widget.maxWidth) newWidth = Math.min(newWidth, widget.maxWidth);
    if (widget.minHeight) newHeight = Math.max(newHeight, widget.minHeight);
    if (widget.maxHeight) newHeight = Math.min(newHeight, widget.maxHeight);

    if (isValidPosition(widget, widget.x, widget.y, newWidth, newHeight)) {
      setWidgets(prev => prev.map(w => 
        w.id === resizeState.resizedWidget 
          ? { ...w, width: newWidth, height: newHeight }
          : w
      ));
    }
  }, [resizeState, widgets, isValidPosition]);

  // Handle resize end
  const handleResizeEnd = useCallback(() => {
    setResizeState({
      isResizing: false,
      resizedWidget: null,
      startSize: null,
      startPos: null,
      direction: null
    });
  }, []);

  // Mouse event listeners
  React.useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [dragState.isDragging, handleDragMove, handleDragEnd]);

  React.useEffect(() => {
    if (resizeState.isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [resizeState.isResizing, handleResizeMove, handleResizeEnd]);

  return {
    widgets,
    setWidgets,
    isEditMode,
    setIsEditMode,
    selectedWidget,
    setSelectedWidget,
    dragState,
    resizeState,
    handleDragStart,
    handleResizeStart,
    gridRef,
    getGridPosition,
    isValidPosition
  };
};

// Widget Container Component
const WidgetContainer = ({ 
  widget, 
  isEditMode, 
  isSelected,
  isDragging, 
  isResizing,
  onDragStart,
  onResizeStart,
  onWidgetClick,
  onWidgetFocus,
  children,
  className = ''
}: {
  widget: Widget;
  isEditMode: boolean;
  isSelected: boolean;
  isDragging: boolean;
  isResizing: boolean;
  onDragStart: (widgetId: string, event: React.MouseEvent) => void;
  onResizeStart: (widgetId: string, direction: 'se' | 'e' | 's', event: React.MouseEvent) => void;
  onWidgetClick?: (widgetId: string) => void;
  onWidgetFocus?: (widgetId: string) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  const getStateIndicator = (state: string) => {
    switch (state) {
      case 'loading': return '⏳';
      case 'error': return '❌';
      case 'empty': return '📭';
      default: return null;
    }
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'loading': return 'hive-status-warning';
      case 'error': return 'hive-status-error';
      case 'empty': return 'hive-text-tertiary';
      default: return 'hive-status-success';
    }
  };

  return (
    <div
      className={`
        relative bg-white border-2 rounded-xl h-full overflow-hidden group
        ${isEditMode ? 'cursor-move' : 'cursor-default'}
        ${isSelected ? 'border-hive-brand-secondary shadow-xl' : 'border-hive-border-default'}
        ${isDragging ? 'opacity-50 transform scale-105 z-50' : ''}
        ${isResizing ? 'z-40' : ''}
        transition-all duration-200
        ${!isEditMode ? 'hover:border-hive-brand-secondary/50 hover:shadow-lg' : ''}
        ${className}
      `}
      style={{
        gridColumn: `span ${widget.width}`,
        gridRow: `span ${widget.height}`,
      }}
      onMouseDown={(e) => {
        if (isEditMode) {
          onDragStart(widget.id, e);
        }
      }}
      onClick={() => {
        if (isEditMode) {
          onWidgetClick?.(widget.id);
        } else {
          onWidgetFocus?.(widget.id);
        }
      }}
    >
      {/* Edit Mode Controls */}
      {isEditMode && (
        <>
          {/* Selection Overlay */}
          {isSelected && (
            <div className="absolute inset-0 bg-hive-brand-secondary/5 rounded-xl pointer-events-none" />
          )}

          {/* Drag Handle */}
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-hive-brand-secondary rounded-full flex items-center justify-center cursor-move z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* Resize Handles */}
          <div 
            className="absolute -bottom-2 -right-2 w-6 h-6 bg-hive-text-secondary rounded cursor-se-resize z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onMouseDown={(e) => onResizeStart(widget.id, 'se', e)}
          >
            <div className="w-full h-full flex items-end justify-end p-1">
              <div className="w-3 h-3 border-r-2 border-b-2 border-white"></div>
            </div>
          </div>

          {/* Edge Resize Handles */}
          <div 
            className="absolute top-1/2 -right-2 w-3 h-8 bg-hive-text-secondary/80 rounded cursor-e-resize z-10 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-1/2"
            onMouseDown={(e) => onResizeStart(widget.id, 'e', e)}
          />
          
          <div 
            className="absolute -bottom-2 left-1/2 w-8 h-3 bg-hive-text-secondary/80 rounded cursor-s-resize z-10 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-1/2"
            onMouseDown={(e) => onResizeStart(widget.id, 's', e)}
          />
          
          {/* Widget Info Badge */}
          <div className="absolute -top-2 -right-2 px-2 py-1 bg-hive-background-secondary border border-hive-border-default rounded-full text-xs text-hive-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
            {widget.width}×{widget.height}
          </div>

          {/* Configuration Button */}
          <button className="absolute top-2 right-2 w-6 h-6 bg-hive-background-secondary border border-hive-border-default rounded-full flex items-center justify-center hover:bg-hive-text-secondary hover:text-white transition-colors text-xs opacity-0 group-hover:opacity-100 z-10">
            ⚙️
          </button>
        </>
      )}

      {/* State Indicator */}
      {widget.state && widget.state !== 'loaded' && (
        <div className="absolute top-2 left-2 z-10">
          <div className={`w-6 h-6 bg-${getStateColor(widget.state)}/10 border border-${getStateColor(widget.state)}/30 rounded-full flex items-center justify-center`}>
            <span className="text-xs">{getStateIndicator(widget.state)}</span>
          </div>
        </div>
      )}

      {/* Widget Content */}
      <div className={`h-full ${isEditMode ? 'pointer-events-none' : ''}`}>
        {children}
      </div>

      {/* Focus Hint (non-edit mode) */}
      {!isEditMode && (
        <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white text-xs text-center py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Click to expand & focus
        </div>
      )}
    </div>
  );
};

// Demo Widget Content Components
const DemoWidgetContent = ({ widget }: { widget: Widget }) => {
  const getWidgetIcon = (type: string) => {
    switch (type) {
      case 'avatar': return '👤';
      case 'priority': return '📋';
      case 'calendar': return '📅';
      case 'community': return '🏢';
      case 'privacy': return '🔒';
      case 'tools': return '🛠️';
      default: return '📦';
    }
  };

  const getWidgetContent = (type: string) => {
    switch (type) {
      case 'avatar':
        return (
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-hive-brand-secondary rounded-full flex items-center justify-center text-white font-bold">SC</div>
              <div>
                <div className="text-sm font-medium text-hive-text-primary">Sarah Chen</div>
                <div className="text-xs text-hive-text-secondary">@sarahc • Online</div>
              </div>
            </div>
            <div className="text-xs text-hive-text-tertiary">247 connections • 12 spaces</div>
          </div>
        );
      case 'priority':
        return (
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-hive-status-error rounded-full"></div>
              <span className="text-sm text-hive-text-primary">CS Final - Tomorrow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-hive-status-warning rounded-full"></div>
              <span className="text-sm text-hive-text-primary">Study Group - Today</span>
            </div>
          </div>
        );
      case 'tools':
        return (
          <div className="p-4 space-y-3 text-center">
            <div className="text-2xl">🛠️</div>
            <div className="text-sm font-medium text-hive-text-primary">Personal Tools</div>
            <div className="text-xs text-hive-text-secondary">HiveLAB v1 Preview</div>
            <div className="px-3 py-1 bg-hive-brand-secondary/10 text-hive-brand-secondary text-xs rounded-full">
              JOIN WAITLIST →
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 text-center space-y-2">
            <div className="text-2xl">{getWidgetIcon(type)}</div>
            <div className="text-sm font-medium text-hive-text-primary">{widget.title}</div>
            <div className="text-xs text-hive-text-secondary">{widget.width}×{widget.height}</div>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Widget Header */}
      <div className="flex items-center justify-between p-4 border-b border-hive-border-default">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-hive-brand-secondary rounded text-white text-xs flex items-center justify-center font-bold">
            {getWidgetIcon(widget.type)}
          </div>
          <span className="text-xs font-medium text-hive-text-secondary">{widget.title}</span>
        </div>
      </div>

      {/* Widget Content */}
      <div className="flex-1">
        {getWidgetContent(widget.type)}
      </div>
    </div>
  );
};

export const WidgetContainerSystem: Story = {
  name: '📦 Widget Container Organism',
  render: () => {
    const initialWidgets: Widget[] = [
      { 
        id: 'avatar', 
        type: 'avatar', 
        title: 'Avatar', 
        width: 1, 
        height: 1, 
        x: 0, 
        y: 0,
        minWidth: 1,
        maxWidth: 2,
        minHeight: 1,
        maxHeight: 2,
        state: 'loaded'
      },
      { 
        id: 'priority', 
        type: 'priority', 
        title: 'Priority Coordination', 
        width: 2, 
        height: 1, 
        x: 1, 
        y: 0,
        minWidth: 1,
        maxWidth: 4,
        minHeight: 1,
        maxHeight: 2,
        state: 'loaded'
      },
      { 
        id: 'community', 
        type: 'community', 
        title: 'Community Coordination', 
        width: 1, 
        height: 2, 
        x: 3, 
        y: 0,
        minWidth: 1,
        maxWidth: 2,
        minHeight: 1,
        maxHeight: 3,
        state: 'loading'
      },
      { 
        id: 'calendar', 
        type: 'calendar', 
        title: 'Social Calendar', 
        width: 2, 
        height: 1, 
        x: 0, 
        y: 1,
        minWidth: 2,
        maxWidth: 4,
        minHeight: 1,
        maxHeight: 2,
        state: 'loaded'
      },
      { 
        id: 'privacy', 
        type: 'privacy', 
        title: 'Privacy Control', 
        width: 1, 
        height: 1, 
        x: 2, 
        y: 1,
        minWidth: 1,
        maxWidth: 2,
        minHeight: 1,
        maxHeight: 2,
        state: 'loaded'
      },
      { 
        id: 'tools', 
        type: 'tools', 
        title: 'Personal Tools (v1 Preview)', 
        width: 2, 
        height: 2, 
        x: 0, 
        y: 2,
        minWidth: 2,
        maxWidth: 4,
        minHeight: 2,
        maxHeight: 3,
        state: 'loaded'
      },
    ];

    const {
      widgets,
      isEditMode,
      setIsEditMode,
      selectedWidget,
      setSelectedWidget,
      dragState,
      resizeState,
      handleDragStart,
      handleResizeStart,
      gridRef
    } = useWidgetContainer(initialWidgets);

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-hive-text-primary">Widget Container Organism</h1>
            <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
              Universal container with drag, resize, and edit mode functionality for HIVE widget management
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-hive-text-primary">Interactive Widget Grid</h2>
              {isEditMode && (
                <div className="px-3 py-1 bg-hive-brand-secondary/10 text-hive-brand-secondary text-sm rounded-full border border-hive-brand-secondary/20">
                  ✏️ Edit Mode Active
                </div>
              )}
              {selectedWidget && isEditMode && (
                <div className="px-3 py-1 bg-hive-background-secondary text-hive-text-primary text-sm rounded-full border border-hive-border-default">
                  Selected: {widgets.find(w => w.id === selectedWidget)?.title}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {!isEditMode ? (
                <button
                  onClick={() => setIsEditMode(true)}
                  className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors"
                >
                  Enable Edit Mode
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedWidget(null);
                      setIsEditMode(false);
                    }}
                    className="px-4 py-2 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors"
                  >
                    Done Editing
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className={`
              grid gap-4 auto-rows-[120px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
              ${isEditMode ? 'bg-hive-background-secondary/30 p-4 rounded-xl border-2 border-dashed border-hive-brand-secondary/30' : ''}
              transition-all duration-300
            `}
          >
            {widgets.map((widget) => (
              <WidgetContainer
                key={widget.id}
                widget={widget}
                isEditMode={isEditMode}
                isSelected={selectedWidget === widget.id}
                isDragging={dragState.draggedWidget === widget.id}
                isResizing={resizeState.resizedWidget === widget.id}
                onDragStart={handleDragStart}
                onResizeStart={handleResizeStart}
                onWidgetClick={setSelectedWidget}
                onWidgetFocus={(id) => console.log('Focus widget:', id)}
              >
                <DemoWidgetContent widget={widget} />
              </WidgetContainer>
            ))}
          </div>

          {/* Instructions */}
          {isEditMode && (
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-3">Edit Mode Instructions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-hive-text-secondary">
                <div className="space-y-2">
                  <div className="font-medium text-hive-text-primary">Drag & Drop</div>
                  <div>• Click and drag widgets to move them</div>
                  <div>• Widgets snap to grid positions</div>
                  <div>• Collision detection prevents overlaps</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-hive-text-primary">Resize</div>
                  <div>• Drag corner handle to resize both dimensions</div>
                  <div>• Drag edge handles to resize single dimension</div>
                  <div>• Min/max constraints are enforced</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-hive-text-primary">Selection</div>
                  <div>• Click widgets to select them</div>
                  <div>• Selected widgets show blue outline</div>
                  <div>• Configure button appears on hover</div>
                </div>
              </div>
            </div>
          )}

          {/* System Documentation */}
          <div className="bg-white border border-hive-border-default rounded-xl p-8">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Container Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Core Functionality</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Universal Container</strong>: Works with any widget content</div>
                  <div>• <strong>Drag & Drop</strong>: Smooth dragging with grid snapping</div>
                  <div>• <strong>Resize Support</strong>: Corner and edge resize handles</div>
                  <div>• <strong>Collision Detection</strong>: Prevents widget overlaps</div>
                  <div>• <strong>State Management</strong>: Loading, error, empty, loaded states</div>
                  <div>• <strong>Selection System</strong>: Visual selection feedback</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Edit Mode Features</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Visual Controls</strong>: Drag handles and resize grips</div>
                  <div>• <strong>Constraint Enforcement</strong>: Min/max width and height</div>
                  <div>• <strong>Configuration Access</strong>: Settings button on hover</div>
                  <div>• <strong>Size Indicators</strong>: Grid dimensions displayed</div>
                  <div>• <strong>Mode Switching</strong>: Seamless edit/view transitions</div>
                  <div>• <strong>Grid Guidelines</strong>: Visual grid when in edit mode</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};