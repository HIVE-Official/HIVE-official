import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CheckSquare, Clock, AlertTriangle, Calendar, Star, Zap, TrendingUp, Settings, X, ArrowLeft, Target, Flag } from 'lucide-react';

const meta = {
  title: 'Profile/02-Widgets/Priority Coordination Widget',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Priority Coordination Widget (1x1/2x1) - Intelligent task management with urgency AI, deadline coordination, and space-aware priority tracking. Click to expand into Focus Mode.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Priority Widget Data Interface
interface PriorityItem {
  id: string;
  title: string;
  description?: string;
  urgency: 'urgent' | 'high' | 'medium' | 'low';
  dueDate: string;
  dueTime?: string;
  location?: string;
  spaceId?: string;
  spaceName?: string;
  collaborators?: number;
  type: 'academic' | 'social' | 'personal' | 'space';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  estimatedTime?: string;
  prerequisites?: string[];
  conflictsWith?: string[];
}

interface PriorityWidgetData {
  todayCount: number;
  urgentCount: number;
  weekCount: number;
  overdueCount: number;
  priorities: PriorityItem[];
  aiInsights: {
    suggestion: string;
    conflictAlert?: string;
    timeOptimization?: string;
  };
  coordinated: {
    spacesInvolved: number;
    collaboratorsCount: number;
    syncedCalendars: number;
  };
}

// Focus Mode Hook
const useFocusMode = () => {
  const [focusedWidget, setFocusedWidget] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  return { focusedWidget, isTransitioning, enterFocus, exitFocus };
};

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
        bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden
        transform transition-all duration-200
        ${isOpen && !isTransitioning ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        {/* Focus Header */}
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
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors">
              ⚙️
            </button>
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Focus Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Priority Coordination Widget Component
const PriorityWidget = ({ 
  data,
  size = 'default',
  isEditMode = false,
  state = 'loaded',
  onAddPriority,
  onCompletePriority,
  onSnooze,
  onFocus,
  className = ''
}: {
  data?: PriorityWidgetData;
  size?: 'compact' | 'default' | 'expanded';
  isEditMode?: boolean;
  state?: 'loading' | 'error' | 'empty' | 'loaded';
  onAddPriority?: () => void;
  onCompletePriority?: (id: string) => void;
  onSnooze?: (id: string) => void;
  onFocus?: () => void;
  className?: string;
}) => {
  // Demo data
  const defaultData: PriorityWidgetData = {
    todayCount: 4,
    urgentCount: 1,
    weekCount: 12,
    overdueCount: 0,
    priorities: [
      {
        id: '1',
        title: 'CS Final Exam',
        description: 'Comprehensive exam covering data structures and algorithms',
        urgency: 'urgent',
        dueDate: 'Tomorrow',
        dueTime: '2:00 PM',
        location: 'Library Room 204',
        spaceId: 'cs-study',
        spaceName: 'CS Study Group',
        collaborators: 12,
        type: 'academic',
        status: 'pending',
        estimatedTime: '4 hours',
        conflictsWith: ['office-hours']
      },
      {
        id: '2',
        title: 'Study Group Session',
        description: 'Final review session before exam',
        urgency: 'high',
        dueDate: 'Today',
        dueTime: '4:00 PM',
        location: 'Study Room B',
        spaceId: 'cs-study',
        spaceName: 'CS Study Group',
        collaborators: 8,
        type: 'academic',
        status: 'pending',
        estimatedTime: '2 hours'
      },
      {
        id: '3',
        title: 'Floor Pizza Night RSVP',
        urgency: 'medium',
        dueDate: 'Today',
        dueTime: '6:00 PM',
        location: 'Floor 3 Lounge',
        spaceId: 'floor-3',
        spaceName: 'Floor 3 Community',
        collaborators: 24,
        type: 'social',
        status: 'pending',
        estimatedTime: '2 minutes'
      },
      {
        id: '4',
        title: 'Lab Report Submission',
        urgency: 'high',
        dueDate: 'Friday',
        dueTime: '11:59 PM',
        type: 'academic',
        status: 'in_progress',
        estimatedTime: '3 hours'
      }
    ],
    aiInsights: {
      suggestion: 'Schedule study group before office hours to maximize learning',
      conflictAlert: 'Study session overlaps with office hours - consider rescheduling',
      timeOptimization: 'Block 6-hour focus session tomorrow for optimal exam prep'
    },
    coordinated: {
      spacesInvolved: 3,
      collaboratorsCount: 44,
      syncedCalendars: 2
    }
  };

  const widgetData = data || defaultData;

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'hive-status-error';
      case 'high': return 'hive-status-warning';
      case 'medium': return 'hive-brand-secondary';
      case 'low': return 'hive-status-success';
      default: return 'hive-text-tertiary';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return '🔴';
      case 'high': return '🟡';
      case 'medium': return '🔵';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const renderCompactView = () => (
    <div className="space-y-3">
      {/* Urgent Count */}
      {widgetData.urgentCount > 0 && (
        <div className="flex items-center gap-2 p-2 bg-hive-status-error/10 border border-hive-status-error/20 rounded-lg">
          <div className="w-2 h-2 bg-hive-status-error rounded-full animate-pulse"></div>
          <span className="text-sm font-bold text-hive-status-error">
            {widgetData.urgentCount} URGENT
          </span>
        </div>
      )}

      {/* Today's Top Priorities */}
      <div className="space-y-2">
        {widgetData.priorities.slice(0, 3).map((priority) => (
          <div key={priority.id} className="flex items-center gap-2">
            <div className={`w-2 h-2 bg-${getUrgencyColor(priority.urgency)} rounded-full`}></div>
            <span className="text-sm text-hive-text-primary truncate flex-1">
              {priority.title}
            </span>
            {priority.dueTime && (
              <span className="text-xs text-hive-text-tertiary">
                {priority.dueTime}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="flex items-center justify-between text-xs text-hive-text-tertiary pt-2 border-t border-hive-border-default">
        <span>{widgetData.todayCount} today</span>
        <span>{widgetData.coordinated.spacesInvolved} spaces</span>
      </div>
    </div>
  );

  const renderDefaultView = () => (
    <div className="space-y-4">
      {/* AI Insight */}
      {widgetData.aiInsights.conflictAlert && (
        <div className="p-3 bg-hive-status-warning/10 border border-hive-status-warning/20 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="text-hive-status-warning">⚠️</span>
            <div>
              <div className="text-sm font-medium text-hive-text-primary">Schedule Conflict</div>
              <div className="text-xs text-hive-text-secondary">{widgetData.aiInsights.conflictAlert}</div>
            </div>
          </div>
        </div>
      )}

      {/* Priority Stats */}
      <div className="grid grid-cols-4 gap-3 text-center">
        <div>
          <div className={`text-lg font-bold text-${getUrgencyColor('urgent')}`}>
            {widgetData.urgentCount}
          </div>
          <div className="text-xs text-hive-text-secondary">Urgent</div>
        </div>
        <div>
          <div className="text-lg font-bold text-hive-text-primary">
            {widgetData.todayCount}
          </div>
          <div className="text-xs text-hive-text-secondary">Today</div>
        </div>
        <div>
          <div className="text-lg font-bold text-hive-text-primary">
            {widgetData.weekCount}
          </div>
          <div className="text-xs text-hive-text-secondary">Week</div>
        </div>
        <div>
          <div className="text-lg font-bold text-hive-brand-secondary">
            {widgetData.coordinated.spacesInvolved}
          </div>
          <div className="text-xs text-hive-text-secondary">Spaces</div>
        </div>
      </div>

      {/* Top Priorities */}
      <div className="space-y-2">
        {widgetData.priorities.slice(0, 4).map((priority) => (
          <div key={priority.id} className="flex items-center gap-3 p-2 hover:bg-hive-background-primary rounded-lg transition-colors">
            <div className={`w-3 h-3 bg-${getUrgencyColor(priority.urgency)} rounded-full flex-shrink-0`}></div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-hive-text-primary truncate">
                {priority.title}
              </div>
              <div className="text-xs text-hive-text-secondary">
                {priority.dueDate}
                {priority.spaceName && <span> • 🏢 {priority.spaceName}</span>}
              </div>
            </div>
            {priority.collaborators && (
              <div className="text-xs text-hive-text-tertiary">
                👥 {priority.collaborators}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Coordination Status */}
      <div className="flex items-center justify-between text-xs text-hive-text-tertiary pt-2 border-t border-hive-border-default">
        <span>👥 {widgetData.coordinated.collaboratorsCount} coordinated</span>
        <span>📅 {widgetData.coordinated.syncedCalendars} synced</span>
      </div>
    </div>
  );

  return (
    <div 
      onClick={onFocus}
      className={`
        relative bg-hive-background-secondary/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-full group
        ${isEditMode ? 'border-hive-brand-primary/50 shadow-hive-brand-primary/20' : 'cursor-pointer hover:border-white/20 hover:shadow-3xl hover:scale-[1.02]'}
        transition-all duration-500
        ${className}
      `}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative p-6">
        {/* Widget Header */}
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-hive-brand-secondary/20 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-3 h-3 text-hive-brand-secondary" />
            </div>
            <span className="text-sm font-semibold text-hive-text-secondary tracking-wide">PRIORITY COORDINATION</span>
          </div>
          
          {/* Widget Actions */}
          {!isEditMode && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddPriority?.();
                }}
                className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors backdrop-blur-sm"
                title="Add Priority"
              >
                <span className="text-hive-text-primary text-sm">+</span>
              </button>
            </div>
          )}
        </div>

        {/* Widget Content */}
        <div className={`${isEditMode ? 'pointer-events-none opacity-75' : ''} transition-all duration-300`}>
          {size === 'compact' ? renderCompactView() : renderDefaultView()}
        </div>

        {/* Focus Hint */}
        <div className="pt-4 mt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-xs text-hive-brand-secondary text-center font-medium">
            Click to expand & focus →
          </div>
        </div>

        {/* Edit Mode Overlay */}
        {isEditMode && (
          <div className="absolute inset-0 bg-hive-brand-primary/5 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="text-sm text-hive-text-secondary font-semibold bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
              Priority Widget ({size === 'compact' ? '1x1' : '2x1'})
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Priority Focus Content
const PriorityFocusContent = ({ data }: { data: PriorityWidgetData }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'urgent' | 'today' | 'week'>('all');
  const [showCompleted, setShowCompleted] = useState(false);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'hive-status-error';
      case 'high': return 'hive-status-warning';
      case 'medium': return 'hive-brand-secondary';
      case 'low': return 'hive-status-success';
      default: return 'hive-text-tertiary';
    }
  };

  const filteredPriorities = data.priorities.filter(priority => {
    switch (selectedFilter) {
      case 'urgent': return priority.urgency === 'urgent';
      case 'today': return priority.dueDate === 'Today';
      case 'week': return ['Today', 'Tomorrow', 'Friday'].includes(priority.dueDate);
      default: return true;
    }
  });

  return (
    <div className="space-y-8">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-hive-text-primary">Priority Coordination</h3>
          <p className="text-hive-text-secondary">AI-powered task management with space coordination</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors">
            🤖 AI Optimize
          </button>
          <button className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors">
            + Add Priority
          </button>
        </div>
      </div>

      {/* AI Insights Panel */}
      {data.aiInsights.suggestion && (
        <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 border border-hive-brand-secondary/30 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-hive-brand-secondary rounded-full flex items-center justify-center text-white font-bold">
              🤖
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-hive-text-primary mb-2">AI Coordination Insight</h4>
              <p className="text-hive-text-secondary mb-3">{data.aiInsights.suggestion}</p>
              {data.aiInsights.timeOptimization && (
                <div className="text-sm text-hive-brand-secondary">
                  💡 {data.aiInsights.timeOptimization}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-4 bg-hive-background-primary rounded-xl">
          <div className="text-3xl font-bold text-hive-status-error">{data.urgentCount}</div>
          <div className="text-sm text-hive-text-secondary">Urgent Tasks</div>
          <div className="text-xs text-hive-text-tertiary mt-1">Need immediate attention</div>
        </div>
        <div className="text-center p-4 bg-hive-background-primary rounded-xl">
          <div className="text-3xl font-bold text-hive-text-primary">{data.todayCount}</div>
          <div className="text-sm text-hive-text-secondary">Due Today</div>
          <div className="text-xs text-hive-text-tertiary mt-1">Focus on completion</div>
        </div>
        <div className="text-center p-4 bg-hive-background-primary rounded-xl">
          <div className="text-3xl font-bold text-hive-brand-secondary">{data.coordinated.spacesInvolved}</div>
          <div className="text-sm text-hive-text-secondary">Spaces Involved</div>
          <div className="text-xs text-hive-text-tertiary mt-1">Cross-space coordination</div>
        </div>
        <div className="text-center p-4 bg-hive-background-primary rounded-xl">
          <div className="text-3xl font-bold text-hive-text-primary">{data.coordinated.collaboratorsCount}</div>
          <div className="text-sm text-hive-text-secondary">Collaborators</div>
          <div className="text-xs text-hive-text-tertiary mt-1">People coordinating with you</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-4">
        <h4 className="text-lg font-semibold text-hive-text-primary">Priority List</h4>
        <div className="flex items-center gap-2">
          {[
            { key: 'all', label: 'All', count: data.priorities.length },
            { key: 'urgent', label: 'Urgent', count: data.urgentCount },
            { key: 'today', label: 'Today', count: data.todayCount },
            { key: 'week', label: 'This Week', count: data.weekCount }
          ].map(filter => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key as any)}
              className={`
                px-3 py-1 text-sm rounded-full transition-colors
                ${selectedFilter === filter.key 
                  ? 'bg-hive-brand-secondary text-white' 
                  : 'bg-hive-background-secondary text-hive-text-secondary hover:bg-hive-text-tertiary/20'
                }
              `}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Priority List */}
      <div className="space-y-4">
        {filteredPriorities.map((priority) => (
          <div 
            key={priority.id} 
            className={`
              p-4 rounded-xl border transition-all duration-200 hover:shadow-md
              ${priority.urgency === 'urgent' ? 'bg-hive-status-error/5 border-hive-status-error/20' :
                priority.urgency === 'high' ? 'bg-hive-status-warning/5 border-hive-status-warning/20' :
                'bg-hive-background-primary border-hive-border-default'}
            `}
          >
            <div className="flex items-start gap-4">
              {/* Priority Indicator */}
              <div className="flex flex-col items-center gap-2 pt-1">
                <div className={`w-4 h-4 bg-${getUrgencyColor(priority.urgency)} rounded-full`}></div>
                <button className="w-6 h-6 border-2 border-hive-border-default rounded hover:border-hive-brand-secondary transition-colors">
                  {priority.status === 'completed' && <span className="text-hive-status-success">✓</span>}
                </button>
              </div>

              {/* Priority Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-semibold text-hive-text-primary">{priority.title}</h5>
                    {priority.description && (
                      <p className="text-sm text-hive-text-secondary mt-1">{priority.description}</p>
                    )}
                    
                    {/* Metadata */}
                    <div className="flex items-center gap-4 mt-2 text-xs text-hive-text-tertiary">
                      <span>📅 {priority.dueDate}{priority.dueTime && ` at ${priority.dueTime}`}</span>
                      {priority.location && <span>📍 {priority.location}</span>}
                      {priority.estimatedTime && <span>⏰ {priority.estimatedTime}</span>}
                    </div>

                    {/* Space & Collaboration Info */}
                    {(priority.spaceName || priority.collaborators) && (
                      <div className="flex items-center gap-4 mt-2 text-xs">
                        {priority.spaceName && (
                          <span className="px-2 py-1 bg-hive-brand-secondary/10 text-hive-brand-secondary rounded-full">
                            🏢 {priority.spaceName}
                          </span>
                        )}
                        {priority.collaborators && (
                          <span className="px-2 py-1 bg-hive-background-secondary text-hive-text-primary rounded-full">
                            👥 {priority.collaborators} coordinating
                          </span>
                        )}
                      </div>
                    )}

                    {/* Conflicts */}
                    {priority.conflictsWith && priority.conflictsWith.length > 0 && (
                      <div className="mt-2 text-xs text-hive-status-warning">
                        ⚠️ Conflicts with other priorities
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors">
                      ⋯
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coordination Summary */}
      <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
        <h4 className="text-lg font-semibold text-hive-text-primary mb-4">Coordination Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm font-medium text-hive-text-secondary mb-2">Active Spaces</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">📚</div>
                <span className="text-sm text-hive-text-primary">CS Study Group</span>
                <div className="text-xs text-hive-status-success">•</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded text-white text-xs flex items-center justify-center">🏠</div>
                <span className="text-sm text-hive-text-primary">Floor 3 Community</span>
                <div className="text-xs text-hive-status-warning">•</div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-hive-text-secondary mb-2">Time Optimization</div>
            <div className="text-sm text-hive-text-primary">
              <div>5.2 hours saved this week</div>
              <div className="text-xs text-hive-text-tertiary">Through smart scheduling</div>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-hive-text-secondary mb-2">Collaboration Health</div>
            <div className="text-sm text-hive-text-primary">
              <div>92% coordination success</div>
              <div className="text-xs text-hive-text-tertiary">Above campus average</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PriorityCoordinationSystem: Story = {
  name: '📋 Priority Coordination Widget with Focus',
  render: () => {
    const { focusedWidget, isTransitioning, enterFocus, exitFocus } = useFocusMode();

    const demoData: PriorityWidgetData = {
      todayCount: 4,
      urgentCount: 1,
      weekCount: 12,
      overdueCount: 0,
      priorities: [
        {
          id: '1',
          title: 'CS Final Exam',
          description: 'Comprehensive exam covering data structures and algorithms',
          urgency: 'urgent',
          dueDate: 'Tomorrow',
          dueTime: '2:00 PM',
          location: 'Library Room 204',
          spaceId: 'cs-study',
          spaceName: 'CS Study Group',
          collaborators: 12,
          type: 'academic',
          status: 'pending',
          estimatedTime: '4 hours',
          conflictsWith: ['office-hours']
        },
        {
          id: '2',
          title: 'Study Group Session',
          description: 'Final review session before exam',
          urgency: 'high',
          dueDate: 'Today',
          dueTime: '4:00 PM',
          location: 'Study Room B',
          spaceId: 'cs-study',
          spaceName: 'CS Study Group',
          collaborators: 8,
          type: 'academic',
          status: 'pending',
          estimatedTime: '2 hours'
        },
        {
          id: '3',
          title: 'Floor Pizza Night RSVP',
          urgency: 'medium',
          dueDate: 'Today',
          dueTime: '6:00 PM',
          location: 'Floor 3 Lounge',
          spaceId: 'floor-3',
          spaceName: 'Floor 3 Community',
          collaborators: 24,
          type: 'social',
          status: 'pending',
          estimatedTime: '2 minutes'
        },
        {
          id: '4',
          title: 'Lab Report Submission',
          urgency: 'high',
          dueDate: 'Friday',
          dueTime: '11:59 PM',
          type: 'academic',
          status: 'in_progress',
          estimatedTime: '3 hours'
        },
        {
          id: '5',
          title: 'Weekly Space Check-in',
          urgency: 'low',
          dueDate: 'Friday',
          spaceName: 'CS Study Group',
          type: 'space',
          status: 'pending',
          estimatedTime: '15 minutes'
        }
      ],
      aiInsights: {
        suggestion: 'Schedule study group before office hours to maximize learning effectiveness',
        conflictAlert: 'Study session overlaps with office hours - consider rescheduling',
        timeOptimization: 'Block 6-hour focus session tomorrow for optimal exam preparation'
      },
      coordinated: {
        spacesInvolved: 3,
        collaboratorsCount: 44,
        syncedCalendars: 2
      }
    };

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-hive-text-primary">Priority Coordination Widget System</h1>
            <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
              Intelligent task management with urgency AI, space coordination, and collaborative priority tracking
            </p>
          </div>

          {/* Size Variants */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-hive-text-primary">Widget Size Variants</h2>
            
            <div className="grid gap-6">
              {/* Compact (1x1) */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Compact View (1x1)</h3>
                <div className="w-80 h-80">
                  <PriorityWidget 
                    data={demoData}
                    size="compact"
                    onFocus={() => enterFocus('priority-compact')}
                  />
                </div>
              </div>

              {/* Default (2x1) */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Default View (2x1)</h3>
                <div className="w-full max-w-2xl h-80">
                  <PriorityWidget 
                    data={demoData}
                    size="default"
                    onFocus={() => enterFocus('priority-default')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feature Overview */}
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Widget Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">AI-Powered Intelligence</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Urgency Analysis</strong>: AI determines true priority levels</div>
                  <div>• <strong>Conflict Detection</strong>: Identifies scheduling overlaps</div>
                  <div>• <strong>Time Optimization</strong>: Suggests optimal task ordering</div>
                  <div>• <strong>Workload Balancing</strong>: Prevents academic burnout</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Space Coordination</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Cross-Space Tasks</strong>: Coordinates across multiple spaces</div>
                  <div>• <strong>Collaborative Priorities</strong>: Shared task management</div>
                  <div>• <strong>Space Context</strong>: Shows relevant space information</div>
                  <div>• <strong>Social Integration</strong>: Connects with social calendar</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Focus Mode Experience</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Full Task Management</strong>: Complete priority dashboard</div>
                  <div>• <strong>AI Insights Panel</strong>: Detailed optimization suggestions</div>
                  <div>• <strong>Collaboration View</strong>: See all coordinated activities</div>
                  <div>• <strong>Advanced Filtering</strong>: Multiple priority views</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Mode Overlays */}
        <FocusOverlay
          isOpen={focusedWidget === 'priority-compact' || focusedWidget === 'priority-default'}
          onClose={exitFocus}
          title="Priority Coordination - Sarah Chen"
          isTransitioning={isTransitioning}
        >
          <PriorityFocusContent data={demoData} />
        </FocusOverlay>
      </div>
    );
  }
};