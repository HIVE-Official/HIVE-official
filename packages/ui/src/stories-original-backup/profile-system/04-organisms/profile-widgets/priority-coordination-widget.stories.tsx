import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Profile System/04-Organisms/Profile Widgets/Priority Coordination Widget',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Priority Coordination Widget (1x1/2x1) - Intelligent unified list of priority tasks with urgency categorization and quick actions. The command center for personal coordination.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Priority Task Interface
interface PriorityTask {
  id: string;
  title: string;
  type: 'academic' | 'social' | 'personal' | 'space' | 'tool';
  urgency: 'urgent' | 'today' | 'week' | 'later';
  dueDate?: string;
  dueTime?: string;
  spaceId?: string;
  spaceName?: string;
  progress?: number;
  collaborators?: number;
  isCompleted: boolean;
}

// Widget Data Interface
interface PriorityWidgetData {
  tasks: PriorityTask[];
  totalTasks: number;
  completedToday: number;
  urgentCount: number;
  settings: {
    showCompleted: boolean;
    autoHideCompleted: boolean;
    smartSort: boolean;
    showCollaborators: boolean;
  };
}

// Widget State Types
type WidgetState = 'loading' | 'error' | 'empty' | 'loaded';

// Priority Coordination Widget Component
const PriorityCoordinationWidget = ({ 
  data,
  size = '1x1',
  isEditMode = false,
  state = 'loaded',
  onTaskComplete,
  onTaskAdd,
  onTaskEdit,
  onSettingsChange,
  className = ''
}: {
  data?: PriorityWidgetData;
  size?: '1x1' | '2x1';
  isEditMode?: boolean;
  state?: WidgetState;
  onTaskComplete?: (taskId: string) => void;
  onTaskAdd?: () => void;
  onTaskEdit?: (taskId: string) => void;
  onSettingsChange?: () => void;
  className?: string;
}) => {
  const [showCompleted, setShowCompleted] = useState(false);

  // Default data for demo
  const defaultData: PriorityWidgetData = {
    tasks: [
      {
        id: '1',
        title: 'CS Final Exam',
        type: 'academic',
        urgency: 'urgent',
        dueDate: 'Tomorrow',
        dueTime: '2:00 PM',
        progress: 75,
        isCompleted: false
      },
      {
        id: '2', 
        title: 'Study Group Planning',
        type: 'social',
        urgency: 'today',
        dueDate: 'Today',
        dueTime: '4:00 PM',
        spaceName: 'CS Study Group',
        collaborators: 4,
        isCompleted: false
      },
      {
        id: '3',
        title: 'Lab Report Draft',
        type: 'academic',
        urgency: 'today',
        dueDate: 'Today',
        dueTime: '11:59 PM',
        progress: 30,
        isCompleted: false
      },
      {
        id: '4',
        title: 'Dorm Floor Meeting',
        type: 'space',
        urgency: 'week',
        dueDate: 'Friday',
        dueTime: '7:00 PM',
        spaceName: 'Floor 3 Community',
        collaborators: 12,
        isCompleted: false
      },
      {
        id: '5',
        title: 'Build HiveLAB Tool',
        type: 'tool',
        urgency: 'week',
        dueDate: 'Next Week',
        progress: 60,
        isCompleted: false
      }
    ],
    totalTasks: 8,
    completedToday: 3,
    urgentCount: 1,
    settings: {
      showCompleted: false,
      autoHideCompleted: true,
      smartSort: true,
      showCollaborators: true
    }
  };

  const widgetData = data || defaultData;

  // Get urgency styling
  const getUrgencyStyle = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return {
          indicator: 'bg-hive-status-error',
          text: 'text-hive-status-error',
          bg: 'bg-hive-status-error/10'
        };
      case 'today':
        return {
          indicator: 'bg-hive-status-warning',
          text: 'text-hive-status-warning',
          bg: 'bg-hive-status-warning/10'
        };
      case 'week':
        return {
          indicator: 'bg-hive-status-success',
          text: 'text-hive-status-success',
          bg: 'bg-hive-status-success/10'
        };
      default:
        return {
          indicator: 'bg-hive-text-tertiary',
          text: 'text-hive-text-tertiary',
          bg: 'bg-hive-text-tertiary/10'
        };
    }
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return '📚';
      case 'social': return '👥';
      case 'personal': return '⭐';
      case 'space': return '🏢';
      case 'tool': return '🛠️';
      default: return '📋';
    }
  };

  // Render widget states
  const renderWidgetState = () => {
    switch (state) {
      case 'loading':
        return (
          <div className="space-y-3 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-hive-background-secondary rounded-full"></div>
              <div className="h-3 bg-hive-background-secondary rounded flex-1"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-hive-background-secondary rounded-full"></div>
              <div className="h-3 bg-hive-background-secondary rounded w-3/4"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-hive-background-secondary rounded-full"></div>
              <div className="h-3 bg-hive-background-secondary rounded w-2/3"></div>
            </div>
          </div>
        );
      
      case 'error':
        return (
          <div className="text-center space-y-3">
            <div className="text-hive-status-error text-2xl">⚠️</div>
            <div className="text-sm text-hive-text-secondary">Failed to load priorities</div>
            <button 
              onClick={() => window.location.reload()}
              className="px-3 py-1 text-xs bg-hive-brand-secondary text-white rounded hover:bg-hive-brand-secondary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        );
      
      case 'empty':
        return (
          <div className="text-center space-y-3">
            <div className="text-hive-text-tertiary text-2xl">✅</div>
            <div className="text-sm text-hive-text-secondary">All caught up!</div>
            <button 
              onClick={onTaskAdd}
              className="px-3 py-1 text-xs bg-hive-background-secondary text-hive-text-primary rounded hover:bg-hive-background-secondary/80 transition-colors"
            >
              Add new priority
            </button>
          </div>
        );
      
      default:
        return renderLoadedState();
    }
  };

  // Render loaded state with full functionality
  const renderLoadedState = () => {
    const activeTasks = widgetData.tasks.filter(task => !task.isCompleted || showCompleted);
    const displayTasks = size === '1x1' ? activeTasks.slice(0, 3) : activeTasks.slice(0, 6);

    return (
      <div className="space-y-4">
        {/* Stats Row - Only show in 2x1 or when compact */}
        {(size === '2x1' || widgetData.urgentCount > 0) && (
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {widgetData.urgentCount > 0 && (
                <div className="flex items-center gap-1 text-hive-status-error">
                  <div className="w-2 h-2 bg-hive-status-error rounded-full"></div>
                  <span className="font-medium">{widgetData.urgentCount} urgent</span>
                </div>
              )}
            </div>
            <div className="text-hive-text-tertiary">
              {widgetData.completedToday}/{widgetData.totalTasks} today
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-2">
          {displayTasks.map((task, index) => {
            const urgencyStyle = getUrgencyStyle(task.urgency);
            
            return (
              <div
                key={task.id}
                className={`
                  flex items-start gap-3 p-2 rounded-lg hover:bg-hive-background-primary/50 transition-colors
                  ${task.isCompleted ? 'opacity-60' : ''}
                `}
              >
                {/* Urgency Indicator */}
                <button
                  onClick={() => onTaskComplete?.(task.id)}
                  className={`
                    w-3 h-3 rounded-full flex-shrink-0 mt-0.5 transition-all
                    ${task.isCompleted ? 'bg-hive-status-success' : urgencyStyle.indicator}
                    hover:scale-110
                  `}
                />

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{getTypeIcon(task.type)}</span>
                    <span className={`
                      text-sm font-medium truncate
                      ${task.isCompleted ? 'line-through text-hive-text-tertiary' : 'text-hive-text-primary'}
                    `}>
                      {task.title}
                    </span>
                  </div>

                  {/* Task Details */}
                  <div className="flex items-center gap-2 mt-1">
                    {task.dueDate && (
                      <div className={`text-xs ${urgencyStyle.text}`}>
                        {task.dueDate}
                        {task.dueTime && size === '2x1' && ` ${task.dueTime}`}
                      </div>
                    )}
                    
                    {task.spaceName && (
                      <div className="text-xs text-hive-text-tertiary">
                        {task.spaceName}
                      </div>
                    )}

                    {task.collaborators && widgetData.settings.showCollaborators && (
                      <div className="text-xs text-hive-text-secondary flex items-center gap-1">
                        <span>👥</span>
                        <span>{task.collaborators}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {task.progress && task.progress > 0 && !task.isCompleted && (
                    <div className="mt-2">
                      <div className="w-full h-1 bg-hive-background-secondary rounded-full">
                        <div 
                          className="h-1 bg-hive-brand-secondary rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Action */}
                {!isEditMode && (
                  <button
                    onClick={() => onTaskEdit?.(task.id)}
                    className="w-5 h-5 text-hive-text-tertiary hover:text-hive-text-primary transition-colors opacity-0 group-hover:opacity-100"
                  >
                    ⋯
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Show More / Add New */}
        {!isEditMode && (
          <div className="flex items-center justify-between pt-2 border-t border-hive-border-default">
            {activeTasks.length > (size === '1x1' ? 3 : 6) ? (
              <button
                onClick={() => setShowCompleted(!showCompleted)}
                className="text-xs text-hive-text-secondary hover:text-hive-text-primary transition-colors"
              >
                +{activeTasks.length - (size === '1x1' ? 3 : 6)} more
              </button>
            ) : (
              <div></div>
            )}
            
            <button
              onClick={onTaskAdd}
              className="text-xs text-hive-brand-secondary hover:text-hive-brand-secondary/80 transition-colors flex items-center gap-1"
            >
              <span>+</span>
              <span>Add</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`
      relative bg-white border border-hive-border-default rounded-xl p-4 h-full
      ${isEditMode ? 'border-hive-brand-secondary/50 shadow-lg' : ''}
      transition-all duration-200 group
      ${className}
    `}>
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-hive-brand-secondary rounded text-white text-xs flex items-center justify-center font-bold">
            P
          </div>
          <span className="text-xs font-medium text-hive-text-secondary">
            Priorities {size === '2x1' && `(${size})`}
          </span>
        </div>
        
        {/* Widget Actions */}
        {!isEditMode && (
          <div className="flex items-center gap-1">
            <button
              onClick={onSettingsChange}
              className="w-5 h-5 text-hive-text-tertiary hover:text-hive-text-primary transition-colors"
              title="Priority Settings"
            >
              ⚙️
            </button>
          </div>
        )}
      </div>

      {/* Widget Content */}
      <div className={isEditMode ? 'pointer-events-none opacity-75' : ''}>
        {renderWidgetState()}
      </div>

      {/* Edit Mode Overlay */}
      {isEditMode && (
        <div className="absolute inset-0 bg-hive-brand-secondary/5 rounded-xl flex items-center justify-center">
          <div className="text-xs text-hive-text-secondary font-medium">
            Priority Coordination Widget ({size})
          </div>
        </div>
      )}
    </div>
  );
};

// =========================
// PRIORITY WIDGET STORIES
// =========================

export const PriorityCoordinationWidgetSystem: Story = {
  name: '📋 Priority Coordination Widget System',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Priority Coordination Widget System</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Intelligent unified list of priority tasks with urgency categorization and quick actions - the command center for personal coordination.
          </p>
        </div>

        {/* Widget States */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Widget States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Loading</h3>
              <div className="w-full h-64">
                <PriorityCoordinationWidget state="loading" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Error</h3>
              <div className="w-full h-64">
                <PriorityCoordinationWidget state="error" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Empty</h3>
              <div className="w-full h-64">
                <PriorityCoordinationWidget state="empty" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Loaded</h3>
              <div className="w-full h-64">
                <PriorityCoordinationWidget state="loaded" />
              </div>
            </div>
          </div>
        </div>

        {/* Widget Sizes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Widget Sizes</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">1x1 (Compact)</h3>
              <div className="w-full h-64">
                <PriorityCoordinationWidget size="1x1" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">2x1 (Extended)</h3>
              <div className="w-full h-64">
                <PriorityCoordinationWidget size="2x1" />
              </div>
            </div>
          </div>
        </div>

        {/* Urgency Categories */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Urgency Categories</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-hive-status-error rounded-full"></div>
                  <span className="text-sm font-bold text-hive-status-error">URGENT</span>
                </div>
                <div className="text-xs text-hive-text-secondary">Due within 24 hours, critical priority</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-hive-status-warning rounded-full"></div>
                  <span className="text-sm font-bold text-hive-status-warning">TODAY</span>
                </div>
                <div className="text-xs text-hive-text-secondary">Due today, important tasks</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-hive-status-success rounded-full"></div>
                  <span className="text-sm font-bold text-hive-status-success">THIS WEEK</span>
                </div>
                <div className="text-xs text-hive-text-secondary">Due this week, plan ahead</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-hive-text-tertiary rounded-full"></div>
                  <span className="text-sm font-bold text-hive-text-tertiary">LATER</span>
                </div>
                <div className="text-xs text-hive-text-secondary">Future tasks, no immediate pressure</div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Types */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Task Types</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center space-y-2">
                <div className="text-2xl">📚</div>
                <div className="text-sm font-medium text-hive-text-primary">Academic</div>
                <div className="text-xs text-hive-text-secondary">Classes, assignments, exams</div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-2xl">👥</div>
                <div className="text-sm font-medium text-hive-text-primary">Social</div>
                <div className="text-xs text-hive-text-secondary">Study groups, events, meetings</div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-2xl">⭐</div>
                <div className="text-sm font-medium text-hive-text-primary">Personal</div>
                <div className="text-xs text-hive-text-secondary">Health, hobbies, goals</div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-2xl">🏢</div>
                <div className="text-sm font-medium text-hive-text-primary">Space</div>
                <div className="text-xs text-hive-text-secondary">Community coordination</div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-2xl">🛠️</div>
                <div className="text-sm font-medium text-hive-text-primary">Tool</div>
                <div className="text-xs text-hive-text-secondary">HiveLAB building projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Mode Demo */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Edit Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Normal Mode</h3>
              <div className="w-full h-64">
                <PriorityCoordinationWidget />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Edit Mode Active</h3>
              <div className="w-full h-64">
                <PriorityCoordinationWidget isEditMode={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Business Logic Documentation */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Priority Coordination Business Logic</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Smart Prioritization</h3>
              <div className="space-y-3 text-sm text-hive-text-secondary">
                <div>• <strong>AI Priority Ranking</strong>: Machine learning sorts tasks by urgency, importance, and context</div>
                <div>• <strong>Deadline Intelligence</strong>: Automatic urgency categorization based on due dates and time</div>
                <div>• <strong>Social Context</strong>: Tasks involving others get boosted priority for coordination</div>
                <div>• <strong>Progress Weighting</strong>: Nearly-complete tasks surface to encourage finishing</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Coordination Features</h3>
              <div className="space-y-3 text-sm text-hive-text-secondary">
                <div>• <strong>Space Integration</strong>: Tasks from your spaces appear with collaborator counts</div>
                <div>• <strong>Real-time Sync</strong>: Changes reflect instantly across all devices and spaces</div>
                <div>• <strong>Quick Actions</strong>: One-tap task completion and editing for rapid workflow</div>
                <div>• <strong>Progress Tracking</strong>: Visual progress bars for multi-step tasks and projects</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-hive-border-default">
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Widget Integration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-hive-text-secondary">
              <div>
                <div className="font-medium text-hive-text-primary mb-2">Size: 1x1 / 2x1</div>
                <div>Flexible sizing - compact 1x1 shows top 3 priorities, extended 2x1 shows 6+ with full details</div>
              </div>
              <div>
                <div className="font-medium text-hive-text-primary mb-2">Position: Top Row</div>
                <div>Typically positioned in the top row for immediate visibility of urgent coordination needs</div>
              </div>
              <div>
                <div className="font-medium text-hive-text-primary mb-2">Interactions</div>
                <div>Task completion, quick edit, priority settings, smart filtering, and cross-platform sync</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const PriorityWidgetInGrid: Story = {
  name: '🎯 Priority in Bento Grid',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-hive-text-primary">Priority Widget in Bento Grid</h1>
          <p className="text-lg text-hive-text-secondary">
            Demonstration of Priority Coordination Widget in both 1x1 and 2x1 configurations within the profile layout
          </p>
        </div>

        {/* 1x1 Configuration */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-hive-text-primary">1x1 Configuration</h2>
          <div className="grid gap-4 auto-rows-[200px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Avatar Widget */}
            <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
              <div className="text-center text-hive-text-secondary">
                <div className="text-2xl mb-2">👤</div>
                <div className="text-sm font-medium">Avatar Widget</div>
                <div className="text-xs">1x1 size</div>
              </div>
            </div>

            {/* Priority Widget 1x1 */}
            <div className="col-span-1 row-span-1">
              <PriorityCoordinationWidget size="1x1" />
            </div>

            {/* Other widgets */}
            <div className="col-span-2 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
              <div className="text-center text-hive-text-secondary">
                <div className="text-2xl mb-2">📅</div>
                <div className="text-sm font-medium">Social Calendar Widget</div>
                <div className="text-xs">2x1 size</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2x1 Configuration */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-hive-text-primary">2x1 Configuration</h2>
          <div className="grid gap-4 auto-rows-[200px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Avatar Widget */}
            <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
              <div className="text-center text-hive-text-secondary">
                <div className="text-2xl mb-2">👤</div>
                <div className="text-sm font-medium">Avatar Widget</div>
                <div className="text-xs">1x1 size</div>
              </div>
            </div>

            {/* Priority Widget 2x1 */}
            <div className="col-span-2 row-span-1">
              <PriorityCoordinationWidget size="2x1" />
            </div>

            {/* Privacy Widget */}
            <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
              <div className="text-center text-hive-text-secondary">
                <div className="text-2xl mb-2">🔒</div>
                <div className="text-sm font-medium">Privacy Control</div>
                <div className="text-xs">1x1 size</div>
              </div>
            </div>
          </div>
        </div>

        {/* Widget Analysis */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Priority Widget Role in Profile System</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-hive-text-secondary">
            <div>
              <div className="font-medium text-hive-text-primary mb-2">Command Center</div>
              <div>Central coordination hub where all priority tasks from different contexts converge for unified management</div>
            </div>
            <div>
              <div className="font-medium text-hive-text-primary mb-2">Intelligence Layer</div>
              <div>AI-powered smart sorting and urgency detection ensures most important coordination tasks surface first</div>
            </div>
            <div>
              <div className="font-medium text-hive-text-primary mb-2">Social Integration</div>
              <div>Seamlessly connects individual priorities with space-based coordination and collaborative tasks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};