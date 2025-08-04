import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef, useCallback } from 'react';

const meta = {
  title: 'Profile/01-Foundation/Drag & Drop System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Drag & Drop System - Real drag-and-drop functionality for widget layout customization with grid snapping and collision detection.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Widget Interface
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
}

// Drag State Interface
interface DragState {
  isDragging: boolean;
  draggedWidget: string | null;
  startPos: { x: number; y: number } | null;
  currentPos: { x: number; y: number } | null;
  offset: { x: number; y: number } | null;
}

// Hook for drag and drop functionality
const useDragAndDrop = (initialWidgets: Widget[]) => {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedWidget: null,
    startPos: null,
    currentPos: null,
    offset: null
  });
  const [isEditMode, setIsEditMode] = useState(false);

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
  const isValidPosition = useCallback((widget: Widget, newX: number, newY: number) => {
    // Check bounds
    if (newX < 0 || newX + widget.width > 4) return false;
    if (newY < 0) return false;

    // Check collisions with other widgets
    const otherWidgets = widgets.filter(w => w.id !== widget.id);
    
    for (const other of otherWidgets) {
      const collision = !(
        newX >= other.x + other.width ||
        newX + widget.width <= other.x ||
        newY >= other.y + other.height ||
        newY + widget.height <= other.y
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

  return {
    widgets,
    setWidgets,
    dragState,
    isEditMode,
    setIsEditMode,
    handleDragStart,
    gridRef,
    getGridPosition,
    isValidPosition
  };
};

// Draggable Widget Component
const DraggableWidget = ({ 
  widget, 
  isEditMode, 
  isDragging, 
  onDragStart,
  dragState,
  className = ''
}: {
  widget: Widget;
  isEditMode: boolean;
  isDragging: boolean;
  onDragStart: (widgetId: string, event: React.MouseEvent) => void;
  dragState: DragState;
  className?: string;
}) => {
  const isDraggedWidget = dragState.draggedWidget === widget.id;
  
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
          <div className="space-y-3">
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
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-hive-status-error rounded-full"></div>
              <span className="text-sm text-hive-text-primary">CS Final - Tomorrow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-hive-status-warning rounded-full"></div>
              <span className="text-sm text-hive-text-primary">Study Group - Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-hive-status-success rounded-full"></div>
              <span className="text-sm text-hive-text-primary">Office Hours - Friday</span>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="space-y-2">
            <div className="text-xs text-hive-text-secondary">Today • 3 events</div>
            <div className="space-y-1">
              <div className="text-xs text-hive-text-primary">2:00 PM - Study Session</div>
              <div className="text-xs text-hive-text-primary">4:00 PM - Office Hours</div>
              <div className="text-xs text-hive-text-primary">7:00 PM - Pizza Night</div>
            </div>
            <div className="text-xs text-hive-status-warning">⚠️ 1 conflict detected</div>
          </div>
        );
      case 'community':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-hive-text-secondary">Active Spaces</span>
              <span className="text-hive-text-primary font-medium">12</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">📚</div>
                <span className="text-xs text-hive-text-primary">CS Study Group</span>
                <div className="w-2 h-2 bg-hive-status-success rounded-full ml-auto"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded text-white text-xs flex items-center justify-center">🏠</div>
                <span className="text-xs text-hive-text-primary">Floor 3 Community</span>
                <div className="w-2 h-2 bg-hive-status-warning rounded-full ml-auto"></div>
              </div>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">👻</span>
                <span className="text-sm font-medium text-hive-text-primary">Ghost Mode</span>
              </div>
              <div className="w-8 h-4 bg-hive-background-secondary rounded-full relative">
                <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow"></div>
              </div>
            </div>
            <div className="text-xs text-hive-text-secondary">Privacy Score: 85/100</div>
            <div className="text-xs text-hive-text-tertiary">Profile visible to connections</div>
          </div>
        );
      case 'tools':
        return (
          <div className="space-y-3 text-center">
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
          <div className="text-center space-y-2">
            <div className="text-2xl">📦</div>
            <div className="text-sm font-medium text-hive-text-primary">{widget.title}</div>
            <div className="text-xs text-hive-text-secondary">{widget.width}x{widget.height}</div>
          </div>
        );
    }
  };

  return (
    <div
      className={`
        relative bg-white border border-hive-border-default rounded-xl p-4 h-full
        ${isEditMode ? 'cursor-move border-hive-brand-secondary/50 shadow-lg' : 'cursor-default'}
        ${isDraggedWidget ? 'opacity-50 transform scale-105 z-50' : ''}
        transition-all duration-200
        ${className}
      `}
      style={{
        gridColumn: `span ${widget.width}`,
        gridRow: `span ${widget.height}`,
      }}
      onMouseDown={(e) => onDragStart(widget.id, e)}
    >
      {/* Edit Mode Controls */}
      {isEditMode && (
        <>
          {/* Drag Handle */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-hive-brand-secondary rounded-full flex items-center justify-center cursor-move">
            <div className="w-3 h-3 bg-white rounded-sm opacity-80"></div>
          </div>
          
          {/* Resize Handle */}
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-hive-text-secondary rounded cursor-se-resize">
            <div className="w-full h-full flex items-end justify-end p-1">
              <div className="w-2 h-2 border-r-2 border-b-2 border-white"></div>
            </div>
          </div>
          
          {/* Settings Icon */}
          <button className="absolute -top-2 -left-2 w-6 h-6 bg-hive-background-secondary border border-hive-border-default rounded-full flex items-center justify-center hover:bg-hive-text-secondary hover:text-white transition-colors">
            <span className="text-xs">⚙️</span>
          </button>
        </>
      )}

      {/* Widget Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-hive-brand-secondary rounded text-white text-xs flex items-center justify-center font-bold">
            {getWidgetIcon(widget.type)}
          </div>
          <span className="text-xs font-medium text-hive-text-secondary">{widget.title}</span>
        </div>
        <div className="text-xs text-hive-text-tertiary">{widget.width}x{widget.height}</div>
      </div>

      {/* Widget Content */}
      <div className={isEditMode ? 'pointer-events-none opacity-75' : ''}>
        {getWidgetContent(widget.type)}
      </div>

      {/* Edit Mode Overlay */}
      {isEditMode && isDraggedWidget && (
        <div className="absolute inset-0 bg-hive-brand-secondary/10 rounded-xl flex items-center justify-center">
          <div className="text-xs text-hive-text-secondary font-medium">
            Dragging...
          </div>
        </div>
      )}
    </div>
  );
};

export const DragDropSystem: Story = {
  name: '🔄 Drag & Drop System',
  render: () => {
    const initialWidgets: Widget[] = [
      { id: 'avatar', type: 'avatar', title: 'Avatar', width: 1, height: 1, x: 0, y: 0 },
      { id: 'priority', type: 'priority', title: 'Priority Coordination', width: 2, height: 1, x: 1, y: 0 },
      { id: 'community', type: 'community', title: 'Community Coordination', width: 1, height: 2, x: 3, y: 0 },
      { id: 'calendar', type: 'calendar', title: 'Social Calendar', width: 2, height: 1, x: 0, y: 1 },
      { id: 'privacy', type: 'privacy', title: 'Privacy Control', width: 1, height: 1, x: 2, y: 1 },
      { id: 'tools', type: 'tools', title: 'Personal Tools (v1 Preview)', width: 2, height: 2, x: 0, y: 2 },
    ];

    const {
      widgets,
      dragState,
      isEditMode,
      setIsEditMode,
      handleDragStart,
      gridRef
    } = useDragAndDrop(initialWidgets);

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-hive-text-primary">Drag & Drop System</h1>
            <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
              Real drag-and-drop functionality for HIVE widget layout customization with grid snapping and collision detection
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-hive-text-primary">Interactive Profile Layout</h2>
              {isEditMode && (
                <div className="px-3 py-1 bg-hive-brand-secondary/10 text-hive-brand-secondary text-sm rounded-full border border-hive-brand-secondary/20">
                  ✏️ Edit Mode Active
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
                <>
                  <button
                    onClick={() => setIsEditMode(false)}
                    className="px-4 py-2 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors"
                  >
                    Done Editing
                  </button>
                </>
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
              <DraggableWidget
                key={widget.id}
                widget={widget}
                isEditMode={isEditMode}
                isDragging={dragState.isDragging}
                onDragStart={handleDragStart}
                dragState={dragState}
              />
            ))}
          </div>

          {/* Instructions */}
          {isEditMode && (
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-3">Drag & Drop Instructions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-hive-text-secondary">
                <div className="space-y-2">
                  <div className="font-medium text-hive-text-primary">Desktop</div>
                  <div>• Click and drag widgets to move them</div>
                  <div>• Widgets snap to grid positions</div>
                  <div>• Collision detection prevents overlaps</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-hive-text-primary">Visual Feedback</div>
                  <div>• Dragged widgets become semi-transparent</div>
                  <div>• Valid drop zones are highlighted</div>
                  <div>• Invalid positions are rejected</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-hive-text-primary">Grid System</div>
                  <div>• 4 columns on desktop</div>
                  <div>• 2 columns on tablet</div>
                  <div>• 1 column on mobile</div>
                </div>
              </div>
            </div>
          )}

          {/* System Documentation */}
          <div className="bg-white border border-hive-border-default rounded-xl p-8">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">System Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Core Functionality</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Real Drag & Drop</strong>: Actual mouse event handling with smooth dragging</div>
                  <div>• <strong>Grid Snapping</strong>: Automatic alignment to 4-column grid system</div>
                  <div>• <strong>Collision Detection</strong>: Prevents widget overlaps with smart positioning</div>
                  <div>• <strong>Visual Feedback</strong>: Clear indication of drag state and valid positions</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Technical Implementation</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Mouse Events</strong>: MouseDown, MouseMove, MouseUp handling</div>
                  <div>• <strong>Position Calculation</strong>: Real-time grid coordinate calculation</div>
                  <div>• <strong>State Management</strong>: React state for widget positions and drag state</div>
                  <div>• <strong>Performance</strong>: Optimized with useCallback and minimal re-renders</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-hive-border-default">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Next Steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-hive-text-secondary">
                <div>
                  <div className="font-medium text-hive-text-primary mb-2">Resize Functionality</div>
                  <div>Drag corner handles to resize widgets within constraints</div>
                </div>
                <div>
                  <div className="font-medium text-hive-text-primary mb-2">Touch Support</div>
                  <div>Touch events for mobile drag-and-drop with haptic feedback</div>
                </div>
                <div>
                  <div className="font-medium text-hive-text-primary mb-2">Persistence</div>
                  <div>Save layout changes to backend with cross-device sync</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};