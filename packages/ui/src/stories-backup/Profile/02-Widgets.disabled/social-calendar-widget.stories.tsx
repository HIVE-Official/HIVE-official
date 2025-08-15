import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, AlertTriangle, CheckCircle, Plus, Settings, X, ArrowLeft, Bell, Repeat } from 'lucide-react';

const meta = {
  title: 'Profile/02-Widgets/Social Calendar Widget',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Social Calendar Widget (2x1) - Time coordination with conflict detection, social scheduling, and intelligent event recommendations. Click to expand into Focus Mode.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Calendar Widget Data Interface
interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  date: string;
  location?: string;
  type: 'academic' | 'social' | 'personal' | 'coordination';
  spaceId?: string;
  spaceName?: string;
  attendees?: {
    confirmed: number;
    maybe: number;
    invited: number;
  };
  status: 'confirmed' | 'tentative' | 'cancelled';
  rsvp?: 'going' | 'maybe' | 'not_going' | 'pending';
  isRecurring?: boolean;
  conflictsWith?: string[];
  priority: 'high' | 'medium' | 'low';
  coordinatedBy?: string;
  tools?: string[]; // Tools needed for event
}

interface CalendarConflict {
  id: string;
  eventIds: string[];
  type: 'overlap' | 'travel_time' | 'workload';
  severity: 'warning' | 'error';
  suggestion: string;
}

interface CalendarWidgetData {
  todayEvents: CalendarEvent[];
  upcomingEvents: CalendarEvent[];
  conflicts: CalendarConflict[];
  insights: {
    freeTimeToday: string;
    busyPeriods: string[];
    socialBalance: number; // 0-100 balance between academic and social
    coordinationEfficiency: number; // 0-100
    weeklyOptimization: string;
  };
  stats: {
    eventsToday: number;
    eventsThisWeek: number;
    conflictsResolved: number;
    coordinationScore: number;
  };
  recommendations: {
    timeSlots: string[];
    socialEvents: string[];
    studyBlocks: string[];
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
        bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden
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

// Social Calendar Widget Component
const SocialCalendarWidget = ({ 
  data,
  size = 'default',
  isEditMode = false,
  state = 'loaded',
  onScheduleEvent,
  onResolveConflict,
  onRsvp,
  onFocus,
  className = ''
}: {
  data?: CalendarWidgetData;
  size?: 'compact' | 'default' | 'expanded';
  isEditMode?: boolean;
  state?: 'loading' | 'error' | 'empty' | 'loaded';
  onScheduleEvent?: () => void;
  onResolveConflict?: (conflictId: string) => void;
  onRsvp?: (eventId: string, response: string) => void;
  onFocus?: () => void;
  className?: string;
}) => {
  // Demo data
  const defaultData: CalendarWidgetData = {
    todayEvents: [
      {
        id: '1',
        title: 'CS Final Study Session',
        description: 'Group study for data structures and algorithms exam',
        startTime: '2:00 PM',
        endTime: '4:00 PM',
        date: 'Today',
        location: 'Library Room 204',
        type: 'academic',
        spaceId: 'cs-study',
        spaceName: 'CS Study Group',
        attendees: { confirmed: 12, maybe: 3, invited: 18 },
        status: 'confirmed',
        rsvp: 'going',
        priority: 'high',
        coordinatedBy: 'Sarah Chen'
      },
      {
        id: '2',
        title: 'Office Hours',
        startTime: '3:00 PM',
        endTime: '4:00 PM',
        date: 'Today',
        location: 'Prof. Johnson Office',
        type: 'academic',
        status: 'confirmed',
        rsvp: 'going',
        priority: 'medium',
        conflictsWith: ['1']
      },
      {
        id: '3',
        title: 'Floor Pizza Night',
        description: 'Weekly floor social gathering',
        startTime: '7:00 PM',
        endTime: '9:00 PM',
        date: 'Today',
        location: 'Floor 3 Lounge',
        type: 'social',
        spaceId: 'floor-3',
        spaceName: 'Floor 3 Community',
        attendees: { confirmed: 18, maybe: 8, invited: 32 },
        status: 'confirmed',
        rsvp: 'maybe',
        priority: 'medium'
      }
    ],
    upcomingEvents: [
      {
        id: '4',
        title: 'CS Final Exam',
        startTime: '2:00 PM',
        endTime: '4:00 PM',
        date: 'Tomorrow',
        location: 'Main Hall',
        type: 'academic',
        status: 'confirmed',
        priority: 'high'
      },
      {
        id: '5',
        title: 'Project Demo',
        startTime: '10:00 AM',
        endTime: '11:00 AM',
        date: 'Friday',
        location: 'CS Building',
        type: 'academic',
        status: 'confirmed',
        priority: 'high'
      }
    ],
    conflicts: [
      {
        id: 'conflict-1',
        eventIds: ['1', '2'],
        type: 'overlap',
        severity: 'warning',
        suggestion: 'Study session overlaps with office hours - consider attending first half of study session'
      }
    ],
    insights: {
      freeTimeToday: '3.5 hours',
      busyPeriods: ['2:00 PM - 4:00 PM', '7:00 PM - 9:00 PM'],
      socialBalance: 75, // Good balance
      coordinationEfficiency: 88,
      weeklyOptimization: 'Block Wednesday afternoon for deep focus work'
    },
    stats: {
      eventsToday: 3,
      eventsThisWeek: 12,
      conflictsResolved: 5,
      coordinationScore: 92
    },
    recommendations: {
      timeSlots: ['Morning study blocks (9-11 AM)', 'Late evening coordination (9-10 PM)'],
      socialEvents: ['Study group social mixer', 'Floor movie night'],
      studyBlocks: ['Friday 2-6 PM deep focus', 'Sunday exam prep marathon']
    }
  };

  const widgetData = data || defaultData;

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return '📚';
      case 'social': return '👥';
      case 'personal': return '📝';
      case 'coordination': return '🤝';
      default: return '📅';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'blue-500';
      case 'social': return 'green-500';
      case 'personal': return 'purple-500';
      case 'coordination': return 'hive-brand-secondary';
      default: return 'hive-text-tertiary';
    }
  };

  const getRsvpColor = (rsvp?: string) => {
    switch (rsvp) {
      case 'going': return 'hive-status-success';
      case 'maybe': return 'hive-status-warning';
      case 'not_going': return 'hive-status-error';
      default: return 'hive-text-tertiary';
    }
  };

  const getRsvpText = (rsvp?: string) => {
    switch (rsvp) {
      case 'going': return '✓ Going';
      case 'maybe': return '? Maybe';
      case 'not_going': return '✗ Not Going';
      default: return 'RSVP';
    }
  };

  const renderDefaultView = () => (
    <div className="space-y-4">
      {/* Conflict Alert */}
      {widgetData.conflicts.length > 0 && (
        <div className="p-3 bg-hive-status-warning/10 border border-hive-status-warning/20 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="text-hive-status-warning">⚠️</span>
            <div>
              <div className="text-sm font-medium text-hive-text-primary">Schedule Conflict</div>
              <div className="text-xs text-hive-text-secondary">{widgetData.conflicts[0].suggestion}</div>
            </div>
          </div>
        </div>
      )}

      {/* Today's Stats */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <div className="text-lg font-bold text-hive-text-primary">{widgetData.stats.eventsToday}</div>
          <div className="text-xs text-hive-text-secondary">Today</div>
        </div>
        <div>
          <div className="text-lg font-bold text-hive-text-primary">{widgetData.stats.eventsThisWeek}</div>
          <div className="text-xs text-hive-text-secondary">Week</div>
        </div>
        <div>
          <div className="text-lg font-bold text-hive-status-success">{widgetData.insights.freeTimeToday}</div>
          <div className="text-xs text-hive-text-secondary">Free Time</div>
        </div>
        <div>
          <div className="text-lg font-bold text-hive-brand-secondary">{widgetData.stats.coordinationScore}%</div>
          <div className="text-xs text-hive-text-secondary">Coordination</div>
        </div>
      </div>

      {/* Today's Events */}
      <div className="space-y-2">
        {widgetData.todayEvents.slice(0, 4).map((event) => (
          <div 
            key={event.id} 
            className={`
              flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-hive-background-primary
              ${event.conflictsWith && event.conflictsWith.length > 0 ? 'bg-hive-status-warning/5 border border-hive-status-warning/20' : 'bg-transparent'}
            `}
          >
            {/* Time */}
            <div className="text-center min-w-[60px]">
              <div className="text-sm font-bold text-hive-text-primary">{event.startTime}</div>
              <div className="text-xs text-hive-text-tertiary">{event.endTime}</div>
            </div>

            {/* Event Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm">{getEventTypeIcon(event.type)}</span>
                <span className="text-sm font-medium text-hive-text-primary truncate">{event.title}</span>
                {event.rsvp && (
                  <span className={`px-2 py-0.5 text-xs rounded-full bg-${getRsvpColor(event.rsvp)}/10 text-${getRsvpColor(event.rsvp)}`}>
                    {getRsvpText(event.rsvp)}
                  </span>
                )}
              </div>
              <div className="text-xs text-hive-text-secondary truncate">
                📍 {event.location}
                {event.spaceName && <span> • 🏢 {event.spaceName}</span>}
                {event.attendees && <span> • 👥 {event.attendees.confirmed}</span>}
              </div>
              {event.conflictsWith && event.conflictsWith.length > 0 && (
                <div className="text-xs text-hive-status-warning mt-1">⚠️ Scheduling conflict</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Insights */}
      <div className="p-3 bg-hive-brand-secondary/10 border border-hive-brand-secondary/20 rounded-lg">
        <div className="text-xs text-hive-brand-secondary">
          💡 {widgetData.insights.weeklyOptimization}
        </div>
      </div>
    </div>
  );

  return (
    <div 
      onClick={onFocus}
      className={`
        relative bg-white border border-hive-border-default rounded-xl p-4 h-full group
        ${isEditMode ? 'border-hive-brand-secondary/50 shadow-lg' : 'cursor-pointer hover:border-hive-brand-secondary/50 hover:shadow-lg'}
        transition-all duration-200
        ${className}
      `}
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-hive-brand-secondary rounded text-white text-xs flex items-center justify-center font-bold">
            📅
          </div>
          <span className="text-xs font-medium text-hive-text-secondary">Social Calendar</span>
        </div>
        
        {/* Widget Actions */}
        {!isEditMode && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onScheduleEvent?.();
              }}
              className="w-5 h-5 text-hive-text-tertiary hover:text-hive-text-primary transition-colors"
              title="Schedule Event"
            >
              ➕
            </button>
          </div>
        )}
      </div>

      {/* Widget Content */}
      <div className={`${isEditMode ? 'pointer-events-none opacity-75' : ''} group-hover:scale-[1.02] transition-transform duration-200`}>
        {renderDefaultView()}
      </div>

      {/* Focus Hint */}
      <div className="pt-2 border-t border-hive-border-default opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="text-xs text-hive-brand-secondary text-center">
          Click to expand & focus →
        </div>
      </div>

      {/* Edit Mode Overlay */}
      {isEditMode && (
        <div className="absolute inset-0 bg-hive-brand-secondary/5 rounded-xl flex items-center justify-center">
          <div className="text-xs text-hive-text-secondary font-medium">
            Social Calendar Widget (2x1)
          </div>
        </div>
      )}
    </div>
  );
};

// Calendar Focus Content
const CalendarFocusContent = ({ data }: { data: CalendarWidgetData }) => {
  const [selectedView, setSelectedView] = useState<'day' | 'week' | 'insights'>('day');
  const [selectedDate, setSelectedDate] = useState('today');

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return '📚';
      case 'social': return '👥';
      case 'personal': return '📝';
      case 'coordination': return '🤝';
      default: return '📅';
    }
  };

  const getRsvpColor = (rsvp?: string) => {
    switch (rsvp) {
      case 'going': return 'hive-status-success';
      case 'maybe': return 'hive-status-warning';
      case 'not_going': return 'hive-status-error';
      default: return 'hive-text-tertiary';
    }
  };

  const getRsvpText = (rsvp?: string) => {
    switch (rsvp) {
      case 'going': return '✓ Going';
      case 'maybe': return '? Maybe';
      case 'not_going': return '✗ Not Going';
      default: return 'RSVP';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-hive-text-primary">Social Calendar</h3>
          <p className="text-hive-text-secondary">Intelligent time coordination with conflict detection and social scheduling</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors">
            📱 Sync Calendars
          </button>
          <button className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors">
            + Schedule Event
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-4">
        {[
          { key: 'day', label: 'Today', icon: '📅' },
          { key: 'week', label: 'This Week', icon: '📊' },
          { key: 'insights', label: 'Insights', icon: '🧠' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedView(tab.key as any)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${selectedView === tab.key 
                ? 'bg-hive-brand-secondary text-white' 
                : 'bg-hive-background-secondary text-hive-text-secondary hover:bg-hive-text-tertiary/20'
              }
            `}
          >
            <span>{tab.icon}</span>
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Conflict Alerts */}
      {data.conflicts.length > 0 && (
        <div className="bg-hive-status-warning/10 border border-hive-status-warning/20 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-hive-status-warning rounded-full flex items-center justify-center text-white font-bold">
              ⚠️
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-hive-text-primary mb-2">Schedule Conflicts Detected</h4>
              {data.conflicts.map((conflict) => (
                <div key={conflict.id} className="mb-3">
                  <p className="text-hive-text-secondary">{conflict.suggestion}</p>
                  <button className="mt-2 px-3 py-1 bg-hive-status-warning text-white text-sm rounded-lg hover:bg-hive-status-warning/90 transition-colors">
                    Resolve Conflict
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Day View */}
      {selectedView === 'day' && (
        <div className="space-y-6">
          {/* Day Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-hive-background-primary rounded-xl">
              <div className="text-2xl font-bold text-hive-text-primary">{data.stats.eventsToday}</div>
              <div className="text-sm text-hive-text-secondary">Events Today</div>
            </div>
            <div className="text-center p-4 bg-hive-background-primary rounded-xl">
              <div className="text-2xl font-bold text-hive-status-success">{data.insights.freeTimeToday}</div>
              <div className="text-sm text-hive-text-secondary">Free Time</div>
            </div>
            <div className="text-center p-4 bg-hive-background-primary rounded-xl">
              <div className="text-2xl font-bold text-hive-brand-secondary">{data.insights.socialBalance}%</div>
              <div className="text-sm text-hive-text-secondary">Social Balance</div>
            </div>
            <div className="text-center p-4 bg-hive-background-primary rounded-xl">
              <div className="text-2xl font-bold text-hive-text-primary">{data.stats.coordinationScore}%</div>
              <div className="text-sm text-hive-text-secondary">Coordination</div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-hive-text-primary">Today's Schedule</h4>
            <div className="space-y-4">
              {data.todayEvents.map((event) => (
                <div 
                  key={event.id} 
                  className={`
                    p-4 rounded-xl border transition-all duration-200 hover:shadow-md
                    ${event.conflictsWith && event.conflictsWith.length > 0 
                      ? 'bg-hive-status-warning/5 border-hive-status-warning/20' 
                      : 'bg-hive-background-primary border-hive-border-default'}
                  `}
                >
                  <div className="flex items-start gap-4">
                    {/* Time Block */}
                    <div className="text-center min-w-[80px] pt-1">
                      <div className="text-lg font-bold text-hive-text-primary">{event.startTime}</div>
                      <div className="text-sm text-hive-text-tertiary">{event.endTime}</div>
                      <div className="text-xs text-hive-text-tertiary mt-1">{event.date}</div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{getEventTypeIcon(event.type)}</span>
                            <h5 className="font-semibold text-hive-text-primary">{event.title}</h5>
                            {event.priority === 'high' && (
                              <span className="px-2 py-1 bg-hive-status-error/10 text-hive-status-error text-xs rounded-full">
                                High Priority
                              </span>
                            )}
                          </div>
                          
                          {event.description && (
                            <p className="text-sm text-hive-text-secondary mt-1">{event.description}</p>
                          )}

                          {/* Metadata */}
                          <div className="flex items-center gap-4 mt-2 text-sm text-hive-text-tertiary">
                            <span>📍 {event.location}</span>
                            {event.spaceName && <span>🏢 {event.spaceName}</span>}
                            {event.attendees && (
                              <span>👥 {event.attendees.confirmed}/{event.attendees.invited} attending</span>
                            )}
                          </div>

                          {/* Conflict Warning */}
                          {event.conflictsWith && event.conflictsWith.length > 0 && (
                            <div className="text-sm text-hive-status-warning mt-2">
                              ⚠️ Overlaps with other events
                            </div>
                          )}
                        </div>

                        {/* RSVP Status */}
                        {event.rsvp && (
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 text-sm rounded-full bg-${getRsvpColor(event.rsvp)}/10 text-${getRsvpColor(event.rsvp)}`}>
                              {getRsvpText(event.rsvp)}
                            </span>
                            <button className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors">
                              ⋯
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Week View */}
      {selectedView === 'week' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-hive-background-primary rounded-xl">
              <div className="text-2xl font-bold text-hive-text-primary">{data.stats.eventsThisWeek}</div>
              <div className="text-sm text-hive-text-secondary">Events This Week</div>
            </div>
            <div className="text-center p-4 bg-hive-background-primary rounded-xl">
              <div className="text-2xl font-bold text-hive-status-success">{data.stats.conflictsResolved}</div>
              <div className="text-sm text-hive-text-secondary">Conflicts Resolved</div>
            </div>
            <div className="text-center p-4 bg-hive-background-primary rounded-xl">
              <div className="text-2xl font-bold text-hive-brand-secondary">{data.insights.coordinationEfficiency}%</div>
              <div className="text-sm text-hive-text-secondary">Efficiency</div>
            </div>
            <div className="text-center p-4 bg-hive-background-primary rounded-xl">
              <div className="text-2xl font-bold text-hive-text-primary">15h</div>
              <div className="text-sm text-hive-text-secondary">Coordinated Time</div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-hive-text-primary">Upcoming This Week</h4>
            <div className="grid gap-4">
              {data.upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[60px]">
                      <div className="text-sm font-bold text-hive-text-primary">{event.date}</div>
                      <div className="text-sm text-hive-text-tertiary">{event.startTime}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span>{getEventTypeIcon(event.type)}</span>
                        <span className="font-medium text-hive-text-primary">{event.title}</span>
                        {event.priority === 'high' && (
                          <span className="w-2 h-2 bg-hive-status-error rounded-full"></span>
                        )}
                      </div>
                      <div className="text-sm text-hive-text-secondary">📍 {event.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Insights View */}
      {selectedView === 'insights' && (
        <div className="space-y-6">
          {/* AI Recommendations */}
          <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 border border-hive-brand-secondary/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-hive-brand-secondary rounded-full flex items-center justify-center text-white font-bold">
                🧠
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-hive-text-primary mb-2">AI Calendar Insights</h4>
                <p className="text-hive-text-secondary mb-3">{data.insights.weeklyOptimization}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-hive-text-primary mb-2">Optimal Study Times</div>
                    {data.recommendations.studyBlocks.map((block, index) => (
                      <div key={index} className="text-hive-text-secondary">• {block}</div>
                    ))}
                  </div>
                  <div>
                    <div className="font-medium text-hive-text-primary mb-2">Social Opportunities</div>
                    {data.recommendations.socialEvents.map((event, index) => (
                      <div key={index} className="text-hive-text-secondary">• {event}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Time Analytics */}
          <div className="grid gap-6">
            <div className="p-6 bg-hive-background-primary rounded-xl">
              <h4 className="text-lg font-semibold text-hive-text-primary mb-4">Time Distribution</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-hive-text-secondary">Academic Events</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-hive-background-secondary rounded-full">
                      <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-hive-text-primary">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-hive-text-secondary">Social Events</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-hive-background-secondary rounded-full">
                      <div className="w-1/4 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-hive-text-primary">25%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-hive-background-primary rounded-xl">
              <h4 className="text-lg font-semibold text-hive-text-primary mb-4">Coordination Health</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-hive-status-success">{data.insights.coordinationEfficiency}%</div>
                  <div className="text-sm text-hive-text-secondary">Efficiency Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-hive-brand-secondary">{data.insights.socialBalance}%</div>
                  <div className="text-sm text-hive-text-secondary">Work-Life Balance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const SocialCalendarSystem: Story = {
  name: '📅 Social Calendar Widget with Focus',
  render: () => {
    const { focusedWidget, isTransitioning, enterFocus, exitFocus } = useFocusMode();

    const demoData: CalendarWidgetData = {
      todayEvents: [
        {
          id: '1',
          title: 'CS Final Study Session',
          description: 'Group study for data structures and algorithms exam',
          startTime: '2:00 PM',
          endTime: '4:00 PM',
          date: 'Today',
          location: 'Library Room 204',
          type: 'academic',
          spaceId: 'cs-study',
          spaceName: 'CS Study Group',
          attendees: { confirmed: 12, maybe: 3, invited: 18 },
          status: 'confirmed',
          rsvp: 'going',
          priority: 'high',
          coordinatedBy: 'Sarah Chen',
          conflictsWith: ['2']
        },
        {
          id: '2',
          title: 'Office Hours',
          startTime: '3:00 PM',
          endTime: '4:00 PM',
          date: 'Today',
          location: 'Prof. Johnson Office',
          type: 'academic',
          status: 'confirmed',
          rsvp: 'going',
          priority: 'medium',
          conflictsWith: ['1']
        },
        {
          id: '3',
          title: 'Floor Pizza Night',
          description: 'Weekly floor social gathering',
          startTime: '7:00 PM',
          endTime: '9:00 PM',
          date: 'Today',
          location: 'Floor 3 Lounge',
          type: 'social',
          spaceId: 'floor-3',
          spaceName: 'Floor 3 Community',
          attendees: { confirmed: 18, maybe: 8, invited: 32 },
          status: 'confirmed',
          rsvp: 'maybe',
          priority: 'medium'
        }
      ],
      upcomingEvents: [
        {
          id: '4',
          title: 'CS Final Exam',
          startTime: '2:00 PM',
          endTime: '4:00 PM',
          date: 'Tomorrow',
          location: 'Main Hall',
          type: 'academic',
          status: 'confirmed',
          priority: 'high'
        },
        {
          id: '5',
          title: 'Project Demo',
          startTime: '10:00 AM',
          endTime: '11:00 AM',
          date: 'Friday',
          location: 'CS Building',
          type: 'academic',
          status: 'confirmed',
          priority: 'high'
        },
        {
          id: '6',
          title: 'Study Group Social Mixer',
          startTime: '6:00 PM',
          endTime: '8:00 PM',
          date: 'Saturday',
          location: 'Student Center',
          type: 'social',
          spaceId: 'cs-study',
          spaceName: 'CS Study Group',
          status: 'confirmed',
          priority: 'medium'
        }
      ],
      conflicts: [
        {
          id: 'conflict-1',
          eventIds: ['1', '2'],
          type: 'overlap',
          severity: 'warning',
          suggestion: 'Study session overlaps with office hours - consider attending first half of study session, then switching to office hours'
        }
      ],
      insights: {
        freeTimeToday: '3.5h',
        busyPeriods: ['2:00 PM - 4:00 PM', '7:00 PM - 9:00 PM'],
        socialBalance: 75,
        coordinationEfficiency: 88,
        weeklyOptimization: 'Block Wednesday afternoon for deep focus work - you have natural 4-hour free window'
      },
      stats: {
        eventsToday: 3,
        eventsThisWeek: 12,
        conflictsResolved: 5,
        coordinationScore: 92
      },
      recommendations: {
        timeSlots: ['Morning study blocks (9-11 AM)', 'Late evening coordination (9-10 PM)'],
        socialEvents: ['Study group social mixer', 'Floor movie night', 'Campus coffee meetup'],
        studyBlocks: ['Friday 2-6 PM deep focus', 'Sunday exam prep marathon', 'Wednesday afternoon focus session']
      }
    };

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-hive-text-primary">Social Calendar Widget System</h1>
            <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
              Time coordination with conflict detection, social scheduling, and intelligent event recommendations
            </p>
          </div>

          {/* Interactive Demo */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-hive-text-primary">Interactive Demo</h2>
            <p className="text-hive-text-secondary">Click the widget below to experience the Expand & Focus interaction</p>
            
            <div className="flex justify-center">
              <div className="w-full max-w-2xl h-80">
                <SocialCalendarWidget 
                  data={demoData}
                  onFocus={() => enterFocus('calendar')}
                />
              </div>
            </div>
          </div>

          {/* Feature Overview */}
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Widget Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Intelligent Scheduling</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Conflict Detection</strong>: AI identifies schedule overlaps</div>
                  <div>• <strong>Travel Time Analysis</strong>: Considers location transitions</div>
                  <div>• <strong>Workload Balancing</strong>: Prevents academic overcommitment</div>
                  <div>• <strong>Social Balance</strong>: Maintains academic-social equilibrium</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Social Coordination</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>RSVP Management</strong>: Track attendance across events</div>
                  <div>• <strong>Space Integration</strong>: Connect events to HIVE spaces</div>
                  <div>• <strong>Attendee Tracking</strong>: See who's coming to events</div>
                  <div>• <strong>Event Coordination</strong>: Collaborative event planning</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Focus Mode Experience</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Multi-View Calendar</strong>: Day, week, and insights views</div>
                  <div>• <strong>AI Recommendations</strong>: Optimal scheduling suggestions</div>
                  <div>• <strong>Time Analytics</strong>: Detailed time distribution analysis</div>
                  <div>• <strong>Conflict Resolution</strong>: Interactive conflict management</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Mode Overlay */}
        <FocusOverlay
          isOpen={focusedWidget === 'calendar'}
          onClose={exitFocus}
          title="Social Calendar - Sarah Chen"
          isTransitioning={isTransitioning}
        >
          <CalendarFocusContent data={demoData} />
        </FocusOverlay>
      </div>
    );
  }
};