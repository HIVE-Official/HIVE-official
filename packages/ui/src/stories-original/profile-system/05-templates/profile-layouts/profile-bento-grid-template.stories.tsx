import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useCallback, useRef, useEffect } from 'react';

const meta = {
  title: 'Profile System/05-Templates/Profile Layouts/Profile Bento Grid Template',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Profile Bento Grid Template - The foundational layout system with drag-and-drop, resize, and persistence. 4-col desktop, 2-col tablet, 1-col mobile with explicit Edit Mode activation.'
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
  width: number; // Grid units
  height: number; // Grid units
  x: number; // Grid position
  y: number; // Grid position
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  data?: any;
}

// Widget State Types
type WidgetState = 'loading' | 'error' | 'empty' | 'loaded';

// Edit Mode Hook
const useEditMode = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    draggedWidget: string | null;
    startPos: { x: number; y: number } | null;
  }>({
    isDragging: false,
    draggedWidget: null,
    startPos: null
  });

  const enterEditMode = () => setIsEditMode(true);
  const exitEditMode = () => {
    setIsEditMode(false);
    setDragState({ isDragging: false, draggedWidget: null, startPos: null });
  };

  return { isEditMode, dragState, setDragState, enterEditMode, exitEditMode };
};

// Widget Component with States
const BentoWidget = ({ 
  widget, 
  isEditMode, 
  onDragStart, 
  onResize,
  className = '' 
}: {
  widget: Widget;
  isEditMode: boolean;
  onDragStart?: (widget: Widget, startPos: { x: number; y: number }) => void;
  onResize?: (widgetId: string, newWidth: number, newHeight: number) => void;
  className?: string;
}) => {
  const [widgetState, setWidgetState] = useState<WidgetState>('loaded');
  const dragRef = useRef<HTMLDivElement>(null);

  // Simulate different widget states for demo
  useEffect(() => {
    if (widget.id === 'loading-demo') setWidgetState('loading');
    if (widget.id === 'error-demo') setWidgetState('error');
    if (widget.id === 'empty-demo') setWidgetState('empty');
  }, [widget.id]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode || !onDragStart) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const startPos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    onDragStart(widget, startPos);
  };

  const handleLongPress = () => {
    // Mobile long-press to enter edit mode
    if (!isEditMode && 'vibrate' in navigator) {
      navigator.vibrate(100); // Haptic feedback
    }
  };

  // Widget Content Based on State
  const renderWidgetContent = () => {
    switch (widgetState) {
      case 'loading':
        return (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-hive-background-secondary rounded w-3/4"></div>
            <div className="h-3 bg-hive-background-secondary rounded w-1/2"></div>
            <div className="h-3 bg-hive-background-secondary rounded w-2/3"></div>
          </div>
        );
      
      case 'error':
        return (
          <div className="text-center space-y-3">
            <div className="text-hive-status-error text-2xl">⚠️</div>
            <div className="text-sm text-hive-text-secondary">Failed to load</div>
            <button className="px-3 py-1 text-xs bg-hive-brand-secondary text-white rounded hover:bg-hive-brand-secondary/90 transition-colors">
              Retry
            </button>
          </div>
        );
      
      case 'empty':
        return (
          <div className="text-center space-y-3">
            <div className="text-hive-text-tertiary text-2xl">📋</div>
            <div className="text-sm text-hive-text-secondary">No priorities today</div>
            <button className="px-3 py-1 text-xs bg-hive-background-secondary text-hive-text-primary rounded hover:bg-hive-background-secondary/80 transition-colors">
              Plan your week
            </button>
          </div>
        );
      
      default:
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-hive-brand-secondary rounded text-white text-xs flex items-center justify-center font-bold">
                {widget.type[0].toUpperCase()}
              </div>
              <span className="text-sm font-medium text-hive-text-primary">
                {widget.title}
              </span>
            </div>
            <div className="text-xs text-hive-text-secondary">
              {widget.width}x{widget.height} • Position: {widget.x},{widget.y}
            </div>
            {widget.data && (
              <div className="text-xs text-hive-text-tertiary">
                {JSON.stringify(widget.data, null, 2)}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div
      ref={dragRef}
      className={`
        relative bg-white border border-hive-border-default rounded-xl p-4
        ${isEditMode ? 'cursor-move border-hive-brand-secondary/50 shadow-lg' : 'cursor-default'}
        transition-all duration-200
        ${className}
      `}
      onMouseDown={handleMouseDown}
      onTouchStart={handleLongPress}
      style={{
        gridColumn: `span ${widget.width}`,
        gridRow: `span ${widget.height}`,
      }}
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

      {/* Widget Content */}
      <div className={isEditMode ? 'pointer-events-none' : ''}>
        {renderWidgetContent()}
      </div>
    </div>
  );
};

// Main Bento Grid Component
const BentoGrid = ({ 
  widgets: initialWidgets = [],
  className = '' 
}: {
  widgets?: Widget[];
  className?: string;
}) => {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const { isEditMode, dragState, setDragState, enterEditMode, exitEditMode } = useEditMode();
  const gridRef = useRef<HTMLDivElement>(null);

  // Handle widget drag start
  const handleDragStart = useCallback((widget: Widget, startPos: { x: number; y: number }) => {
    setDragState({
      isDragging: true,
      draggedWidget: widget.id,
      startPos
    });
  }, [setDragState]);

  // Handle layout persistence (mock)
  const saveLayout = useCallback(() => {
    console.log('💾 Saving layout:', widgets);
    // This would sync to backend/localStorage
  }, [widgets]);

  // Generate default widgets for demo
  const generateDefaultWidgets = (): Widget[] => [
    { id: 'avatar', type: 'avatar', title: 'Avatar', width: 1, height: 1, x: 0, y: 0 },
    { id: 'priority', type: 'priority', title: 'Priority Coordination', width: 2, height: 1, x: 1, y: 0 },
    { id: 'calendar', type: 'calendar', title: 'Social Calendar', width: 2, height: 1, x: 0, y: 1 },
    { id: 'community', type: 'community', title: 'Community Coordination', width: 1, height: 2, x: 3, y: 0 },
    { id: 'privacy', type: 'privacy', title: 'Privacy Control', width: 1, height: 1, x: 2, y: 1 },
    { id: 'tools-preview', type: 'tools', title: 'Personal Tools (v1 Preview)', width: 2, height: 2, x: 0, y: 2 },
    { id: 'loading-demo', type: 'loading', title: 'Loading Widget', width: 1, height: 1, x: 2, y: 2 },
    { id: 'error-demo', type: 'error', title: 'Error Widget', width: 1, height: 1, x: 3, y: 2 },
    { id: 'empty-demo', type: 'empty', title: 'Empty Widget', width: 1, height: 1, x: 2, y: 3 }
  ];

  // Initialize with default widgets if none provided
  useEffect(() => {
    if (widgets.length === 0) {
      setWidgets(generateDefaultWidgets());
    }
  }, [widgets.length]);

  return (
    <div className={`max-w-6xl mx-auto space-y-6 ${className}`}>
      {/* Edit Mode Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-hive-text-primary">Your Profile</h1>
          {isEditMode && (
            <div className="px-3 py-1 bg-hive-brand-secondary/10 text-hive-brand-secondary text-sm rounded-full border border-hive-brand-secondary/20">
              ✏️ Edit Mode Active
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {!isEditMode ? (
            <button
              onClick={enterEditMode}
              className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors"
            >
              Customize
            </button>
          ) : (
            <>
              <button
                onClick={saveLayout}
                className="px-4 py-2 bg-hive-status-success text-white rounded-lg hover:bg-hive-status-success/90 transition-colors"
              >
                Save Layout
              </button>
              <button
                onClick={exitEditMode}
                className="px-4 py-2 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors"
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>

      {/* Responsive Grid */}
      <div
        ref={gridRef}
        className={`
          grid gap-4 auto-rows-[120px]
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          ${isEditMode ? 'bg-hive-background-secondary/30 p-4 rounded-xl border-2 border-dashed border-hive-brand-secondary/30' : ''}
          transition-all duration-300
        `}
      >
        {widgets.map((widget) => (
          <BentoWidget
            key={widget.id}
            widget={widget}
            isEditMode={isEditMode}
            onDragStart={handleDragStart}
          />
        ))}
      </div>

      {/* Layout Instructions */}
      {isEditMode && (
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
          <h3 className="text-lg font-semibold text-hive-text-primary mb-3">Layout Controls</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-hive-text-secondary">
            <div className="space-y-2">
              <div className="font-medium text-hive-text-primary">Desktop</div>
              <div>• Click and drag widgets to move</div>
              <div>• Use corner handles to resize</div>
              <div>• Settings icon for configuration</div>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-hive-text-primary">Mobile</div>
              <div>• Long-press any widget to enter Edit Mode</div>
              <div>• Haptic feedback confirms activation</div>
              <div>• Single column layout on mobile</div>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-hive-text-primary">Persistence</div>
              <div>• Layouts sync across devices</div>
              <div>• Auto-save on position changes</div>
              <div>• Conflict resolution for multi-device</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================
// BENTO GRID STORIES
// =========================

export const BentoGridTemplate: Story = {
  name: '🎯 Bento Grid Template',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <BentoGrid />
    </div>
  )
};

export const EditModeDemo: Story = {
  name: '✏️ Edit Mode Demo',
  render: () => {
    const [showEditMode, setShowEditMode] = useState(true);
    
    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-hive-text-primary">Edit Mode System</h1>
            <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
              Explicit Edit Mode activation with drag-and-drop, resize handles, and widget configuration.
            </p>
            <button
              onClick={() => setShowEditMode(!showEditMode)}
              className="px-6 py-3 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors"
            >
              {showEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
            </button>
          </div>

          {/* Mock Grid in Edit Mode */}
          <div className={`
            grid gap-4 auto-rows-[120px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            ${showEditMode ? 'bg-hive-background-secondary/30 p-4 rounded-xl border-2 border-dashed border-hive-brand-secondary/30' : ''}
            transition-all duration-300
          `}>
            {[
              { id: '1', title: 'Avatar Widget', width: 1, height: 1, type: 'avatar' },
              { id: '2', title: 'Priority Coordination', width: 2, height: 1, type: 'priority' },
              { id: '3', title: 'Privacy Control', width: 1, height: 1, type: 'privacy' },
              { id: '4', title: 'Social Calendar', width: 2, height: 1, type: 'calendar' },
              { id: '5', title: 'Community Coordination', width: 1, height: 2, type: 'community' },
              { id: '6', title: 'Personal Tools Preview', width: 2, height: 2, type: 'tools' }
            ].map((widget) => (
              <div
                key={widget.id}
                className={`
                  relative bg-white border border-hive-border-default rounded-xl p-4
                  ${showEditMode ? 'cursor-move border-hive-brand-secondary/50 shadow-lg' : 'cursor-default'}
                  transition-all duration-200
                `}
                style={{
                  gridColumn: `span ${widget.width}`,
                  gridRow: `span ${widget.height}`,
                }}
              >
                {/* Edit Mode Controls */}
                {showEditMode && (
                  <>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-hive-brand-secondary rounded-full flex items-center justify-center cursor-move">
                      <div className="w-3 h-3 bg-white rounded-sm opacity-80"></div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-hive-text-secondary rounded cursor-se-resize">
                      <div className="w-full h-full flex items-end justify-end p-1">
                        <div className="w-2 h-2 border-r-2 border-b-2 border-white"></div>
                      </div>
                    </div>
                    <button className="absolute -top-2 -left-2 w-6 h-6 bg-hive-background-secondary border border-hive-border-default rounded-full flex items-center justify-center hover:bg-hive-text-secondary hover:text-white transition-colors">
                      <span className="text-xs">⚙️</span>
                    </button>
                  </>
                )}

                {/* Widget Content */}
                <div className={showEditMode ? 'pointer-events-none' : ''}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-hive-brand-secondary rounded text-white text-xs flex items-center justify-center font-bold">
                      {widget.type[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-hive-text-primary">
                      {widget.title}
                    </span>
                  </div>
                  <div className="text-xs text-hive-text-secondary">
                    Size: {widget.width}x{widget.height}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export const ResponsiveLayout: Story = {
  name: '📱 Responsive Layout',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-4">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Responsive Bento Grid</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            4-column desktop, 2-column tablet, 1-column mobile with intelligent widget reflow.
          </p>
        </div>

        {/* Desktop Layout Preview */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-hive-text-primary">🖥️ Desktop (4 columns)</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
            <div className="grid gap-3 auto-rows-[80px] grid-cols-4">
              <div className="bg-white rounded-lg p-3 border">Avatar (1x1)</div>
              <div className="bg-white rounded-lg p-3 border col-span-2">Priority Coordination (2x1)</div>
              <div className="bg-white rounded-lg p-3 border row-span-2">Community (1x2)</div>
              <div className="bg-white rounded-lg p-3 border col-span-2">Social Calendar (2x1)</div>
              <div className="bg-white rounded-lg p-3 border">Privacy (1x1)</div>
              <div className="bg-white rounded-lg p-3 border col-span-2 row-span-2">Personal Tools (2x2)</div>
              <div className="bg-white rounded-lg p-3 border">Extra (1x1)</div>
            </div>
          </div>
        </div>

        {/* Tablet Layout Preview */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-hive-text-primary">📱 Tablet (2 columns)</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
            <div className="grid gap-3 auto-rows-[80px] grid-cols-2">
              <div className="bg-white rounded-lg p-3 border">Avatar (1x1)</div>
              <div className="bg-white rounded-lg p-3 border">Priority (1x1)</div>
              <div className="bg-white rounded-lg p-3 border col-span-2">Social Calendar (2x1)</div>
              <div className="bg-white rounded-lg p-3 border">Community (1x1)</div>
              <div className="bg-white rounded-lg p-3 border">Privacy (1x1)</div>
              <div className="bg-white rounded-lg p-3 border col-span-2 row-span-2">Personal Tools (2x2)</div>
            </div>
          </div>
        </div>

        {/* Mobile Layout Preview */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-hive-text-primary">📱 Mobile (1 column)</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
            <div className="grid gap-3 auto-rows-[80px] grid-cols-1 max-w-sm mx-auto">
              <div className="bg-white rounded-lg p-3 border">Avatar Widget</div>
              <div className="bg-white rounded-lg p-3 border">Priority Coordination</div>
              <div className="bg-white rounded-lg p-3 border">Social Calendar</div>
              <div className="bg-white rounded-lg p-3 border">Community Coordination</div>
              <div className="bg-white rounded-lg p-3 border">Privacy Control</div>
              <div className="bg-white rounded-lg p-3 border row-span-2">Personal Tools Preview</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const WidgetStatesDemo: Story = {
  name: '🔄 Widget States Demo',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Widget States System</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Standard widget states: Loading, Error, Empty, and Loaded with consistent UX patterns.
          </p>
        </div>

        <div className="grid gap-6 auto-rows-[200px] grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Loading State */}
          <div className="bg-white border border-hive-border-default rounded-xl p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-hive-brand-secondary rounded text-white text-xs flex items-center justify-center font-bold">L</div>
                <span className="text-sm font-medium text-hive-text-primary">Loading State</span>
              </div>
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-hive-background-secondary rounded w-3/4"></div>
                <div className="h-3 bg-hive-background-secondary rounded w-1/2"></div>
                <div className="h-3 bg-hive-background-secondary rounded w-2/3"></div>
              </div>
            </div>
          </div>

          {/* Error State */}
          <div className="bg-white border border-hive-border-default rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-hive-status-error rounded text-white text-xs flex items-center justify-center font-bold">E</div>
              <span className="text-sm font-medium text-hive-text-primary">Error State</span>
            </div>
            <div className="text-center space-y-3">
              <div className="text-hive-status-error text-2xl">⚠️</div>
              <div className="text-sm text-hive-text-secondary">Failed to load</div>
              <button className="px-3 py-1 text-xs bg-hive-brand-secondary text-white rounded hover:bg-hive-brand-secondary/90 transition-colors">
                Retry
              </button>
            </div>
          </div>

          {/* Empty State */}
          <div className="bg-white border border-hive-border-default rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-hive-text-tertiary rounded text-white text-xs flex items-center justify-center font-bold">E</div>
              <span className="text-sm font-medium text-hive-text-primary">Empty State</span>
            </div>
            <div className="text-center space-y-3">
              <div className="text-hive-text-tertiary text-2xl">📋</div>
              <div className="text-sm text-hive-text-secondary">No priorities today</div>
              <button className="px-3 py-1 text-xs bg-hive-background-secondary text-hive-text-primary rounded hover:bg-hive-background-secondary/80 transition-colors">
                Plan your week
              </button>
            </div>
          </div>

          {/* Loaded State */}
          <div className="bg-white border border-hive-border-default rounded-xl p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-hive-status-success rounded text-white text-xs flex items-center justify-center font-bold">L</div>
                <span className="text-sm font-medium text-hive-text-primary">Loaded State</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-hive-status-error rounded-full"></div>
                  <span className="text-xs text-hive-text-secondary">CS Final - Tomorrow 2PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-hive-status-warning rounded-full"></div>
                  <span className="text-xs text-hive-text-secondary">Study Group - Friday 4PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-hive-status-success rounded-full"></div>
                  <span className="text-xs text-hive-text-secondary">Office Hours - Next Week</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Logic Documentation */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Widget State Business Logic</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">State Transitions</h3>
              <div className="space-y-3 text-sm text-hive-text-secondary">
                <div>• <strong>Loading</strong>: Skeleton UI matching content shape</div>
                <div>• <strong>Error</strong>: Clear message with retry action</div>
                <div>• <strong>Empty</strong>: Helpful message with clear CTA</div>
                <div>• <strong>Loaded</strong>: Full content with interactive elements</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">UX Patterns</h3>
              <div className="space-y-3 text-sm text-hive-text-secondary">
                <div>• <strong>Consistent Icons</strong>: Visual state identification</div>
                <div>• <strong>Action-Oriented</strong>: Every state has next steps</div>
                <div>• <strong>Non-Blocking</strong>: Other widgets continue working</div>
                <div>• <strong>Retry Logic</strong>: Graceful error recovery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};