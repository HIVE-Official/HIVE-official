import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef, useCallback } from 'react';

const meta = {
  title: 'Profile/03-Templates/Complete Profile Board',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Complete Profile Board Template - Full profile system with all widgets, drag & drop, expand & focus, and edit mode. Demonstrates the complete HIVE Profile experience.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Widget Interfaces
interface Widget {
  id: string;
  type: 'avatar' | 'priority' | 'community' | 'calendar' | 'privacy' | 'tools';
  title: string;
  width: number;
  height: number;
  x: number;
  y: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  state: 'loading' | 'error' | 'empty' | 'loaded';
  data?: any;
}

// Profile Board Hook
const useProfileBoard = (initialWidgets: Widget[]) => {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [focusedWidget, setFocusedWidget] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragState, setDragState] = useState({
    isDragging: false,
    draggedWidget: null as string | null,
    startPos: null as { x: number; y: number } | null,
    currentPos: null as { x: number; y: number } | null,
    offset: null as { x: number; y: number } | null
  });

  const gridRef = useRef<HTMLDivElement>(null);

  // Focus Mode Functions
  const enterFocus = (widgetId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFocusedWidget(widgetId);
      setIsTransitioning(false);
    }, 200);
  };

  const exitFocus = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFocusedWidget(null);
      setIsTransitioning(false);
    }, 200);
  };

  // Drag & Drop Functions
  const getGridPosition = useCallback((mouseX: number, mouseY: number) => {
    if (!gridRef.current) return { x: 0, y: 0 };
    
    const rect = gridRef.current.getBoundingClientRect();
    const cellWidth = rect.width / 4;
    const cellHeight = 120 + 16;
    
    const x = Math.max(0, Math.round((mouseX - rect.left) / cellWidth));
    const y = Math.max(0, Math.round((mouseY - rect.top) / cellHeight));
    
    return { x: Math.min(x, 3), y };
  }, []);

  const isValidPosition = useCallback((widget: Widget, newX: number, newY: number, newWidth?: number, newHeight?: number) => {
    const width = newWidth || widget.width;
    const height = newHeight || widget.height;
    
    if (newX < 0 || newX + width > 4) return false;
    if (newY < 0) return false;

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

  return {
    widgets,
    setWidgets,
    isEditMode,
    setIsEditMode,
    selectedWidget,
    setSelectedWidget,
    focusedWidget,
    isTransitioning,
    enterFocus,
    exitFocus,
    dragState,
    handleDragStart,
    gridRef,
    isValidPosition
  };
};

// Widget Content Components
const AvatarWidgetContent = () => (
  <div className="p-4 space-y-4">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
        SC
      </div>
      <div>
        <div className="font-bold text-hive-text-primary">Sarah Chen</div>
        <div className="text-sm text-hive-text-secondary">@sarahc</div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 bg-hive-status-success rounded-full"></div>
          <span className="text-xs text-hive-text-secondary">Online</span>
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4 text-center">
      <div>
        <div className="font-bold text-hive-text-primary">247</div>
        <div className="text-xs text-hive-text-secondary">Connections</div>
      </div>
      <div>
        <div className="font-bold text-hive-text-primary">12</div>
        <div className="text-xs text-hive-text-secondary">Spaces</div>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-amber-500 rounded text-white text-xs flex items-center justify-center">🏆</div>
      <span className="text-xs text-hive-text-secondary">Top Coordinator This Week</span>
    </div>
  </div>
);

const PriorityWidgetContent = () => (
  <div className="p-4 space-y-3">
    <div className="flex items-center justify-between">
      <div className="text-sm font-semibold text-hive-text-primary">Today's Priorities</div>
      <div className="text-xs text-hive-status-warning">⚠️ 1 conflict</div>
    </div>
    
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-hive-status-error rounded-full animate-pulse"></div>
        <span className="text-sm text-hive-text-primary">CS Final Exam</span>
        <span className="text-xs text-hive-text-tertiary ml-auto">Tomorrow 2PM</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-hive-status-warning rounded-full"></div>
        <span className="text-sm text-hive-text-primary">Study Group Session</span>
        <span className="text-xs text-hive-text-tertiary ml-auto">Today 4PM</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-hive-brand-secondary rounded-full"></div>
        <span className="text-sm text-hive-text-primary">Floor Pizza Night</span>
        <span className="text-xs text-hive-text-tertiary ml-auto">Today 7PM</span>
      </div>
    </div>

    <div className="p-2 bg-hive-brand-secondary/10 border border-hive-brand-secondary/20 rounded-lg">
      <div className="text-xs text-hive-brand-secondary">
        💡 AI suggests rescheduling study session to avoid conflict
      </div>
    </div>
  </div>
);

const CommunityWidgetContent = () => (
  <div className="p-4 space-y-4">
    <div className="text-center">
      <div className="text-2xl font-bold text-hive-text-primary">8</div>
      <div className="text-xs text-hive-text-secondary">Active Spaces</div>
    </div>

    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded text-white text-sm flex items-center justify-center">📚</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-hive-text-primary">CS Study Group</div>
          <div className="text-xs text-hive-text-secondary">12 active • Leader role</div>
        </div>
        <div className="w-4 h-4 bg-hive-brand-secondary rounded-full text-white text-xs flex items-center justify-center">3</div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-green-500 rounded text-white text-sm flex items-center justify-center">🏠</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-hive-text-primary">Floor 3 Community</div>
          <div className="text-xs text-hive-text-secondary">8 active • Member</div>
        </div>
        <div className="w-4 h-4 bg-hive-brand-secondary rounded-full text-white text-xs flex items-center justify-center">1</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-purple-500 rounded text-white text-sm flex items-center justify-center">🎯</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-hive-text-primary">Campus Hackathon</div>
          <div className="text-xs text-hive-text-secondary">24 active • Moderator</div>
        </div>
        <div className="w-4 h-4 bg-hive-status-error rounded-full text-white text-xs flex items-center justify-center">7</div>
      </div>
    </div>

    <div class="p-2 bg-hive-status-success/10 border border-hive-status-success/20 rounded-lg">
      <div className="text-xs text-hive-status-success">
        🌟 Your leadership is driving 95% coordination success
      </div>
    </div>
  </div>
);

const CalendarWidgetContent = () => (
  <div className="p-4 space-y-4">
    <div className="grid grid-cols-4 gap-3 text-center">
      <div>
        <div className="text-lg font-bold text-hive-status-error">1</div>
        <div className="text-xs text-hive-text-secondary">Urgent</div>
      </div>
      <div>
        <div className="text-lg font-bold text-hive-text-primary">4</div>
        <div className="text-xs text-hive-text-secondary">Today</div>
      </div>
      <div>
        <div className="text-lg font-bold text-hive-status-success">3.5h</div>
        <div className="text-xs text-hive-text-secondary">Free Time</div>
      </div>
      <div>
        <div className="text-lg font-bold text-hive-brand-secondary">92%</div>
        <div className="text-xs text-hive-text-secondary">Coordination</div>
      </div>
    </div>

    <div className="space-y-2">
      <div className="flex items-center gap-3 p-2 bg-hive-status-warning/5 border border-hive-status-warning/20 rounded-lg">
        <div className="text-center min-w-[50px]">
          <div className="text-sm font-bold text-hive-text-primary">2:00</div>
          <div className="text-xs text-hive-text-tertiary">4:00</div>
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-hive-text-primary">📚 Study Session</div>
          <div className="text-xs text-hive-text-secondary">Library • CS Study Group</div>
          <div className="text-xs text-hive-status-warning">⚠️ Overlaps with office hours</div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-2 hover:bg-hive-background-primary rounded-lg">
        <div className="text-center min-w-[50px]">
          <div className="text-sm font-bold text-hive-text-primary">7:00</div>
          <div className="text-xs text-hive-text-tertiary">9:00</div>
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-hive-text-primary">👥 Pizza Night</div>
          <div className="text-xs text-hive-text-secondary">Floor 3 Lounge • 18 attending</div>
        </div>
      </div>
    </div>

    <div className="p-2 bg-hive-brand-secondary/10 border border-hive-brand-secondary/20 rounded-lg">
      <div className="text-xs text-hive-brand-secondary">
        💡 Block Wednesday afternoon for 4-hour deep focus session
      </div>
    </div>
  </div>
);

const PrivacyWidgetContent = () => (
  <div className="p-4 space-y-4">
    <div className="flex items-center justify-between p-3 bg-hive-background-primary rounded-lg">
      <div className="flex items-center gap-3">
        <div className="text-2xl">👻</div>
        <div>
          <div className="text-sm font-medium text-hive-text-primary">Ghost Mode</div>
          <div className="text-xs text-hive-text-secondary">Currently inactive</div>
        </div>
      </div>
      <div className="w-10 h-5 bg-hive-background-secondary rounded-full">
        <div className="w-4 h-4 bg-white rounded-full shadow transform transition-transform m-0.5"></div>
      </div>
    </div>

    <div className="text-center space-y-2">
      <div className="text-2xl font-bold text-hive-status-success">85/100</div>
      <div className="text-xs text-hive-text-secondary">Privacy Score</div>
      <div className="w-full h-2 bg-hive-background-secondary rounded-full">
        <div className="h-2 bg-hive-status-success rounded-full" style={{ width: '85%' }}></div>
      </div>
    </div>

    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs">👥</span>
          <span className="text-hive-text-primary">Profile Visibility</span>
        </div>
        <span className="text-xs text-hive-status-warning">connections</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs">📍</span>
          <span className="text-hive-text-primary">Location Sharing</span>
        </div>
        <span className="text-xs text-hive-status-success">private</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs">📊</span>
          <span className="text-hive-text-primary">Activity Sharing</span>
        </div>
        <span className="text-xs text-hive-brand-secondary">spaces</span>
      </div>
    </div>
  </div>
);

const ToolsWidgetContent = () => (
  <div className="p-4 space-y-4">
    <div className="text-center space-y-3">
      <div className="text-3xl">🛠️</div>
      <div>
        <div className="text-lg font-bold text-hive-text-primary">Personal Tools</div>
        <div className="text-sm text-hive-text-secondary">HiveLAB v1 Preview</div>
      </div>
    </div>

    <div className="p-4 bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 border border-hive-brand-secondary/30 rounded-xl text-center">
      <div className="text-sm font-medium text-hive-text-primary mb-2">🚀 Early Access Waitlist</div>
      <div className="text-xs text-hive-text-secondary mb-3">Position #47 • Est. Early February 2024</div>
      <button className="px-4 py-2 bg-hive-brand-secondary text-white text-sm rounded-lg hover:bg-hive-brand-secondary/90 transition-colors">
        VIEW STATUS
      </button>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <div className="p-3 bg-hive-background-primary rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">📚</div>
          <span className="text-xs font-medium text-hive-text-primary">Study Scheduler</span>
        </div>
        <div className="text-xs text-hive-text-secondary">47 uses • ★ 4.8</div>
      </div>
      
      <div className="p-3 bg-hive-background-primary rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-green-500 rounded text-white text-xs flex items-center justify-center">🧺</div>
          <span className="text-xs font-medium text-hive-text-primary">Laundry Tracker</span>
        </div>
        <div className="text-xs text-hive-text-secondary">156 uses • ★ 4.9</div>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2 text-center text-xs">
      <div>
        <div className="font-bold text-hive-text-primary">156</div>
        <div className="text-hive-text-secondary">Total Tools</div>
      </div>
      <div>
        <div className="font-bold text-hive-text-primary">8</div>
        <div className="text-hive-text-secondary">Installed</div>
      </div>
      <div>
        <div className="font-bold text-hive-brand-secondary">2</div>
        <div className="text-hive-text-secondary">Built</div>
      </div>
    </div>
  </div>
);

// Focus Overlay Component
const FocusOverlay = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  isTransitioning 
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isTransitioning: boolean;
}) => {
  if (!isOpen && !isTransitioning) return null;

  return (
    <div className={`
      fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4
      transition-all duration-200
      ${isOpen && !isTransitioning ? 'opacity-100' : 'opacity-0'}
    `}>
      <div className={`
        bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden
        transform transition-all duration-200
        ${isOpen && !isTransitioning ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        <div className="flex items-center justify-between p-6 border-b border-hive-border-default">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors"
            >
              ←
            </button>
            <h2 className="text-xl font-bold text-hive-text-primary">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Widget Component
const ProfileWidget = ({ 
  widget, 
  isEditMode, 
  isSelected, 
  isDragging,
  onDragStart,
  onWidgetClick,
  onWidgetFocus
}: {
  widget: Widget;
  isEditMode: boolean;
  isSelected: boolean;
  isDragging: boolean;
  onDragStart: (widgetId: string, event: React.MouseEvent) => void;
  onWidgetClick: (widgetId: string) => void;
  onWidgetFocus: (widgetId: string) => void;
}) => {
  const getWidgetContent = () => {
    switch (widget.type) {
      case 'avatar': return <AvatarWidgetContent />;
      case 'priority': return <PriorityWidgetContent />;
      case 'community': return <CommunityWidgetContent />;
      case 'calendar': return <CalendarWidgetContent />;
      case 'privacy': return <PrivacyWidgetContent />;
      case 'tools': return <ToolsWidgetContent />;
      default: return <div>Unknown widget</div>;
    }
  };

  const getWidgetIcon = () => {
    switch (widget.type) {
      case 'avatar': return '👤';
      case 'priority': return '📋';
      case 'community': return '🏢';
      case 'calendar': return '📅';
      case 'privacy': return '🔒';
      case 'tools': return '🛠️';
      default: return '📦';
    }
  };

  return (
    <div
      className={`
        relative bg-white border-2 rounded-xl h-full overflow-hidden group
        ${isEditMode ? 'cursor-move' : 'cursor-pointer'}
        ${isSelected ? 'border-hive-brand-secondary shadow-xl' : 'border-hive-border-default'}
        ${isDragging ? 'opacity-50 transform scale-105 z-50' : ''}
        ${!isEditMode ? 'hover:border-hive-brand-secondary/50 hover:shadow-lg' : ''}
        transition-all duration-200
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
          onWidgetClick(widget.id);
        } else {
          onWidgetFocus(widget.id);
        }
      }}
    >
      {/* Edit Mode Controls */}
      {isEditMode && (
        <>
          {isSelected && (
            <div className="absolute inset-0 bg-hive-brand-secondary/5 rounded-xl pointer-events-none" />
          )}

          <div className="absolute -top-3 -left-3 w-8 h-8 bg-hive-brand-secondary rounded-full flex items-center justify-center cursor-move z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="absolute -top-2 -right-2 px-2 py-1 bg-hive-background-secondary border border-hive-border-default rounded-full text-xs text-hive-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
            {widget.width}×{widget.height}
          </div>
        </>
      )}

      {/* Widget Header */}
      <div className="flex items-center justify-between p-4 border-b border-hive-border-default">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-hive-brand-secondary rounded text-white text-xs flex items-center justify-center font-bold">
            {getWidgetIcon()}
          </div>
          <span className="text-xs font-medium text-hive-text-secondary">{widget.title}</span>
        </div>
      </div>

      {/* Widget Content */}
      <div className={`${isEditMode ? 'pointer-events-none' : ''} ${!isEditMode ? 'group-hover:scale-[1.02]' : ''} transition-transform duration-200`}>
        {getWidgetContent()}
      </div>

      {/* Focus Hint */}
      {!isEditMode && (
        <div className="absolute bottom-2 left-4 right-4 bg-black/50 text-white text-xs text-center py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Click to expand & focus →
        </div>
      )}
    </div>
  );
};

export const CompleteProfileBoard: Story = {
  name: '🎯 Complete Profile Board Template',
  render: () => {
    const initialWidgets: Widget[] = [
      { 
        id: 'avatar', 
        type: 'avatar', 
        title: 'Avatar & Identity', 
        width: 1, 
        height: 1, 
        x: 0, 
        y: 0,
        minWidth: 1, maxWidth: 2, minHeight: 1, maxHeight: 2,
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
        minWidth: 1, maxWidth: 4, minHeight: 1, maxHeight: 2,
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
        minWidth: 1, maxWidth: 2, minHeight: 1, maxHeight: 3,
        state: 'loaded'
      },
      { 
        id: 'calendar', 
        type: 'calendar', 
        title: 'Social Calendar', 
        width: 2, 
        height: 1, 
        x: 0, 
        y: 1,
        minWidth: 2, maxWidth: 4, minHeight: 1, maxHeight: 2,
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
        minWidth: 1, maxWidth: 2, minHeight: 1, maxHeight: 2,
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
        minWidth: 2, maxWidth: 4, minHeight: 2, maxHeight: 3,
        state: 'loaded'
      },
    ];

    const {
      widgets,
      isEditMode,
      setIsEditMode,
      selectedWidget,
      setSelectedWidget,
      focusedWidget,
      isTransitioning,
      enterFocus,
      exitFocus,
      dragState,
      handleDragStart,
      gridRef
    } = useProfileBoard(initialWidgets);

    return (
      <div className="min-h-screen bg-hive-background-primary">
        {/* Profile Header */}
        <div className="bg-white border-b border-hive-border-default">
          <div className="max-w-6xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  SC
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-hive-text-primary">Sarah Chen</h1>
                  <p className="text-hive-text-secondary">Computer Science • University at Buffalo</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-hive-text-tertiary">
                    <span>🏆 Top Coordinator</span>
                    <span>📅 Member since Sept 2023</span>
                    <span>🌟 4.9 Community Rating</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {!isEditMode ? (
                  <>
                    <button className="px-4 py-2 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors">
                      Share Profile
                    </button>
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors"
                    >
                      Customize Layout
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-2 bg-hive-brand-secondary/10 text-hive-brand-secondary text-sm rounded-lg border border-hive-brand-secondary/20">
                      ✏️ Edit Mode Active
                    </div>
                    <button
                      onClick={() => {
                        setSelectedWidget(null);
                        setIsEditMode(false);
                      }}
                      className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Widget Grid */}
        <div className="max-w-6xl mx-auto p-8">
          <div
            ref={gridRef}
            className={`
              grid gap-4 auto-rows-[120px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
              ${isEditMode ? 'bg-hive-background-secondary/30 p-4 rounded-xl border-2 border-dashed border-hive-brand-secondary/30' : ''}
              transition-all duration-300
            `}
          >
            {widgets.map((widget) => (
              <ProfileWidget
                key={widget.id}
                widget={widget}
                isEditMode={isEditMode}
                isSelected={selectedWidget === widget.id}
                isDragging={dragState.draggedWidget === widget.id}
                onDragStart={handleDragStart}
                onWidgetClick={setSelectedWidget}
                onWidgetFocus={enterFocus}
              />
            ))}
          </div>

          {/* Edit Mode Instructions */}
          {isEditMode && (
            <div className="mt-8 bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Customize Your Profile Layout</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-hive-text-secondary">
                <div className="space-y-2">
                  <div className="font-medium text-hive-text-primary">📱 Drag & Drop</div>
                  <div>• Click and drag widgets to rearrange</div>
                  <div>• Widgets automatically snap to grid</div>
                  <div>• Smart collision prevention</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-hive-text-primary">🔧 Resize</div>
                  <div>• Different sizes for different needs</div>
                  <div>• Min/max constraints enforced</div>
                  <div>• More space = more detail</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-hive-text-primary">⚙️ Configure</div>
                  <div>• Click widgets to select them</div>
                  <div>• Access widget-specific settings</div>
                  <div>• Customize data and appearance</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Focus Mode Overlays */}
        <FocusOverlay
          isOpen={focusedWidget === 'avatar'}
          onClose={exitFocus}
          title="Avatar & Identity - Sarah Chen"
          isTransitioning={isTransitioning}
        >
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary rounded-full flex items-center justify-center text-white font-bold text-4xl mx-auto">
                SC
              </div>
              <div>
                <h3 className="text-2xl font-bold text-hive-text-primary">Sarah Chen</h3>
                <p className="text-hive-text-secondary">Computer Science Major • University at Buffalo</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-hive-text-primary">247</div>
                <div className="text-hive-text-secondary">Connections</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-hive-text-primary">12</div>
                <div className="text-hive-text-secondary">Active Spaces</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-hive-brand-secondary">4.9</div>
                <div className="text-hive-text-secondary">Rating</div>
              </div>
            </div>
          </div>
        </FocusOverlay>

        <FocusOverlay
          isOpen={focusedWidget === 'priority'}
          onClose={exitFocus}
          title="Priority Coordination - Sarah Chen"
          isTransitioning={isTransitioning}
        >
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-hive-text-primary mb-2">Priority Coordination</h3>
            <p className="text-hive-text-secondary">AI-powered task management with urgency analysis and space coordination</p>
          </div>
        </FocusOverlay>

        <FocusOverlay
          isOpen={focusedWidget === 'community'}
          onClose={exitFocus}
          title="Community Coordination - Sarah Chen"
          isTransitioning={isTransitioning}
        >
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold text-hive-text-primary mb-2">Community Coordination</h3>
            <p className="text-hive-text-secondary">Space management with activity intelligence and leadership coordination</p>
          </div>
        </FocusOverlay>

        <FocusOverlay
          isOpen={focusedWidget === 'calendar'}
          onClose={exitFocus}
          title="Social Calendar - Sarah Chen"
          isTransitioning={isTransitioning}
        >
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-hive-text-primary mb-2">Social Calendar</h3>
            <p className="text-hive-text-secondary">Time coordination with conflict detection and social scheduling</p>
          </div>
        </FocusOverlay>

        <FocusOverlay
          isOpen={focusedWidget === 'privacy'}
          onClose={exitFocus}
          title="Privacy Control - Sarah Chen"
          isTransitioning={isTransitioning}
        >
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-hive-text-primary mb-2">Privacy Control</h3>
            <p className="text-hive-text-secondary">Ghost Mode and granular privacy management with transparency controls</p>
          </div>
        </FocusOverlay>

        <FocusOverlay
          isOpen={focusedWidget === 'tools'}
          onClose={exitFocus}
          title="Personal Tools - HiveLAB Preview"
          isTransitioning={isTransitioning}
        >
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛠️</div>
            <h3 className="text-2xl font-bold text-hive-text-primary mb-2">Personal Tools</h3>
            <p className="text-hive-text-secondary">HiveLAB v1 Preview - Custom app marketplace for campus life</p>
          </div>
        </FocusOverlay>
      </div>
    );
  }
};