import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Profile System/04-Organisms/Profile Widgets/Social Calendar Widget',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Social Calendar Widget (2x1) - Intelligent time coordination with social context, conflict detection, and collaborative scheduling. Your time coordination command center.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Calendar Event Interface
interface CalendarEvent {
  id: string;
  title: string;
  type: 'academic' | 'social' | 'personal' | 'space' | 'coordination';
  startTime: string;
  endTime: string;
  date: string;
  location?: string;
  spaceName?: string;
  spaceId?: string;
  attendeeCount?: number;
  rsvpStatus?: 'going' | 'maybe' | 'not_going' | 'pending';
  conflictLevel?: 'none' | 'soft' | 'hard';
  isRecurring?: boolean;
  priority: 'high' | 'medium' | 'low';
}

// Time Block Interface
interface TimeBlock {
  start: string;
  end: string;
  type: 'free' | 'busy' | 'focus' | 'social';
  label?: string;
}

// Widget Data Interface
interface CalendarWidgetData {
  todayEvents: CalendarEvent[];
  upcomingEvents: CalendarEvent[];
  freeTimeSlots: TimeBlock[];
  conflictingEvents: CalendarEvent[];
  totalEventsToday: number;
  totalEventsWeek: number;
  freeTimeToday: number; // in hours
  settings: {
    showFreeTime: boolean;
    detectConflicts: boolean; 
    prioritizeSocial: boolean;
    integrateCourses: boolean;
  };
}

// Widget State Types
type WidgetState = 'loading' | 'error' | 'empty' | 'loaded';

// Social Calendar Widget Component
const SocialCalendarWidget = ({ 
  data,
  size = '2x1',
  isEditMode = false,
  state = 'loaded',
  onEventClick,
  onAddEvent,
  onScheduleTime,
  onSettingsChange,
  className = ''
}: {
  data?: CalendarWidgetData;
  size?: '2x1';
  isEditMode?: boolean;
  state?: WidgetState;
  onEventClick?: (eventId: string) => void;
  onAddEvent?: () => void;
  onScheduleTime?: () => void;
  onSettingsChange?: () => void;
  className?: string;
}) => {
  const [activeView, setActiveView] = useState<'today' | 'upcoming' | 'free'>('today');

  // Default data for demo
  const defaultData: CalendarWidgetData = {
    todayEvents: [
      {
        id: '1',
        title: 'CS Final Study Session',
        type: 'academic',
        startTime: '2:00 PM',
        endTime: '4:00 PM',
        date: 'Today',
        location: 'Library Room 204',
        spaceName: 'CS Study Group',
        spaceId: '1',
        attendeeCount: 12,
        rsvpStatus: 'going',
        priority: 'high'
      },
      {
        id: '2',
        title: 'Floor Pizza Night',
        type: 'social',
        startTime: '7:00 PM',
        endTime: '9:00 PM',
        date: 'Today',
        location: 'Floor 3 Lounge',
        spaceName: 'Floor 3 Community',
        spaceId: '2',
        attendeeCount: 18,
        rsvpStatus: 'maybe',
        priority: 'medium'
      },
      {
        id: '3',
        title: 'Office Hours',
        type: 'academic',
        startTime: '3:00 PM',
        endTime: '4:00 PM',
        date: 'Today',
        location: 'Prof. Johnson Office',
        conflictLevel: 'soft',
        priority: 'medium'
      }
    ],
    upcomingEvents: [
      {
        id: '4',
        title: 'HiveLAB Demo Day',
        type: 'space',
        startTime: '10:00 AM',
        endTime: '12:00 PM',
        date: 'Tomorrow',
        location: 'Innovation Center',
        spaceName: 'HiveLAB Builders',
        spaceId: '3',
        attendeeCount: 25,
        rsvpStatus: 'going',
        priority: 'high'
      },
      {
        id: '5',
        title: 'Study Group Prep',
        type: 'coordination',
        startTime: '4:00 PM',
        endTime: '5:00 PM',
        date: 'Tomorrow',
        spaceName: 'CS Study Group',
        attendeeCount: 6,
        rsvpStatus: 'pending',
        priority: 'medium'
      }
    ],
    freeTimeSlots: [
      { start: '11:00 AM', end: '1:00 PM', type: 'free', label: '2h free' },
      { start: '5:00 PM', end: '6:30 PM', type: 'free', label: '1.5h free' },
      { start: '9:30 PM', end: '11:00 PM', type: 'free', label: '1.5h free' }
    ],
    conflictingEvents: [
      {
        id: '3',
        title: 'Office Hours',
        type: 'academic',
        startTime: '3:00 PM',
        endTime: '4:00 PM',
        date: 'Today',
        conflictLevel: 'soft',
        priority: 'medium'
      }
    ],
    totalEventsToday: 3,
    totalEventsWeek: 12,
    freeTimeToday: 5,
    settings: {
      showFreeTime: true,
      detectConflicts: true,
      prioritizeSocial: true,
      integrateCourses: true
    }
  };

  const widgetData = data || defaultData;

  // Get event type styling
  const getEventTypeStyle = (type: string) => {
    switch (type) {
      case 'academic':
        return { icon: '📚', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
      case 'social':
        return { icon: '👥', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
      case 'personal':
        return { icon: '⭐', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
      case 'space':
        return { icon: '🏢', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' };
      case 'coordination':
        return { icon: '🎯', color: 'text-hive-brand-secondary', bg: 'bg-hive-brand-secondary/10', border: 'border-hive-brand-secondary/20' };
      default:
        return { icon: '📅', color: 'text-hive-text-secondary', bg: 'bg-hive-background-secondary', border: 'border-hive-border-default' };
    }
  };

  // Get RSVP status styling
  const getRSVPStyle = (status?: string) => {
    switch (status) {
      case 'going':
        return { color: 'text-hive-status-success', bg: 'bg-hive-status-success/10' };
      case 'maybe':
        return { color: 'text-hive-status-warning', bg: 'bg-hive-status-warning/10' };
      case 'not_going':
        return { color: 'text-hive-status-error', bg: 'bg-hive-status-error/10' };
      case 'pending':
        return { color: 'text-hive-text-tertiary', bg: 'bg-hive-text-tertiary/10' };
      default:
        return { color: 'text-hive-text-secondary', bg: 'bg-hive-background-secondary' };
    }
  };

  // Render widget states
  const renderWidgetState = () => {
    switch (state) {
      case 'loading':
        return (
          <div className="space-y-4 animate-pulse">
            <div className="flex gap-2">
              <div className="h-6 bg-hive-background-secondary rounded w-16"></div>
              <div className="h-6 bg-hive-background-secondary rounded w-20"></div>
              <div className="h-6 bg-hive-background-secondary rounded w-16"></div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 bg-hive-background-secondary rounded h-8"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-hive-background-secondary rounded w-3/4"></div>
                    <div className="h-2 bg-hive-background-secondary rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'error':
        return (
          <div className="text-center space-y-3">
            <div className="text-hive-status-error text-2xl">⚠️</div>
            <div className="text-sm text-hive-text-secondary">Failed to sync calendar</div>
            <button 
              onClick={() => window.location.reload()}
              className="px-3 py-1 text-xs bg-hive-brand-secondary text-white rounded hover:bg-hive-brand-secondary/90 transition-colors"
            >
              Retry Sync
            </button>
          </div>
        );
      
      case 'empty':
        return (
          <div className="text-center space-y-3">
            <div className="text-hive-text-tertiary text-2xl">📅</div>
            <div className="text-sm text-hive-text-secondary">No events scheduled</div>
            <button 
              onClick={onAddEvent}
              className="px-3 py-1 text-xs bg-hive-background-secondary text-hive-text-primary rounded hover:bg-hive-background-secondary/80 transition-colors"
            >
              Schedule something
            </button>
          </div>
        );
      
      default:
        return renderLoadedState();
    }
  };

  // Render loaded state with full functionality
  const renderLoadedState = () => {
    return (
      <div className="space-y-4">
        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="text-hive-text-primary font-medium">
              {widgetData.totalEventsToday} today
            </div>
            <div className="text-hive-text-secondary">
              {widgetData.totalEventsWeek} this week
            </div>
            {widgetData.freeTimeToday > 0 && (
              <div className="text-hive-status-success">
                {widgetData.freeTimeToday}h free
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            {widgetData.conflictingEvents.length > 0 && (
              <div className="flex items-center gap-1 text-hive-status-error">
                <div className="w-2 h-2 bg-hive-status-error rounded-full"></div>
                <span>{widgetData.conflictingEvents.length} conflict</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-hive-border-default">
          <button
            onClick={() => setActiveView('today')}
            className={`
              px-3 py-1 text-xs font-medium transition-colors
              ${activeView === 'today' 
                ? 'text-hive-brand-secondary border-b-2 border-hive-brand-secondary' 
                : 'text-hive-text-secondary hover:text-hive-text-primary'
              }
            `}
          >
            Today ({widgetData.todayEvents.length})
          </button>
          <button
            onClick={() => setActiveView('upcoming')}
            className={`
              px-3 py-1 text-xs font-medium transition-colors
              ${activeView === 'upcoming' 
                ? 'text-hive-brand-secondary border-b-2 border-hive-brand-secondary' 
                : 'text-hive-text-secondary hover:text-hive-text-primary'
              }
            `}
          >
            Upcoming ({widgetData.upcomingEvents.length})
          </button>
          {widgetData.settings.showFreeTime && (
            <button
              onClick={() => setActiveView('free')}
              className={`
                px-3 py-1 text-xs font-medium transition-colors
                ${activeView === 'free' 
                  ? 'text-hive-brand-secondary border-b-2 border-hive-brand-secondary' 
                  : 'text-hive-text-secondary hover:text-hive-text-primary'
                }
              `}
            >
              Free Time ({widgetData.freeTimeSlots.length})
            </button>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          {/* Today Events */}
          {activeView === 'today' && (
            <div className="space-y-2">
              {widgetData.todayEvents.map((event) => {
                const typeStyle = getEventTypeStyle(event.type);
                const rsvpStyle = getRSVPStyle(event.rsvpStatus);
                
                return (
                  <div
                    key={event.id}
                    onClick={() => onEventClick?.(event.id)}
                    className={`
                      flex items-start gap-3 p-2 rounded-lg hover:bg-hive-background-primary/50 transition-colors cursor-pointer
                      ${event.conflictLevel === 'hard' ? 'border-l-4 border-hive-status-error' : 
                        event.conflictLevel === 'soft' ? 'border-l-4 border-hive-status-warning' : ''}
                    `}
                  >
                    {/* Time Block */}
                    <div className="text-center min-w-[60px]">
                      <div className="text-xs font-bold text-hive-text-primary">
                        {event.startTime}
                      </div>
                      <div className="text-xs text-hive-text-tertiary">
                        {event.endTime}
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{typeStyle.icon}</span>
                        <span className="text-sm font-medium text-hive-text-primary truncate">
                          {event.title}
                        </span>
                        {event.rsvpStatus && (
                          <div className={`
                            px-1.5 py-0.5 rounded-full text-xs font-medium
                            ${rsvpStyle.color} ${rsvpStyle.bg}
                          `}>
                            {event.rsvpStatus === 'going' ? '✓' : 
                             event.rsvpStatus === 'maybe' ? '?' : 
                             event.rsvpStatus === 'not_going' ? '✗' : '⋯'}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs text-hive-text-secondary mt-1">
                        {event.location && (
                          <span>📍 {event.location}</span>
                        )}
                        {event.spaceName && (
                          <span className="ml-2">🏢 {event.spaceName}</span>
                        )}
                        {event.attendeeCount && (
                          <span className="ml-2">👥 {event.attendeeCount}</span>
                        )}
                      </div>
                    </div>

                    {/* Priority Indicator */}
                    <div className={`
                      w-2 h-2 rounded-full mt-2
                      ${event.priority === 'high' ? 'bg-hive-status-error' : 
                        event.priority === 'medium' ? 'bg-hive-status-warning' : 
                        'bg-hive-status-success'}
                    `} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Upcoming Events */}
          {activeView === 'upcoming' && (
            <div className="space-y-2">
              {widgetData.upcomingEvents.map((event) => {
                const typeStyle = getEventTypeStyle(event.type);
                const rsvpStyle = getRSVPStyle(event.rsvpStatus);
                
                return (
                  <div
                    key={event.id}
                    onClick={() => onEventClick?.(event.id)}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-hive-background-primary/50 transition-colors cursor-pointer"
                  >
                    {/* Date/Time */}
                    <div className="text-center min-w-[60px]">
                      <div className="text-xs font-bold text-hive-text-primary">
                        {event.date}
                      </div>
                      <div className="text-xs text-hive-text-tertiary">
                        {event.startTime}
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{typeStyle.icon}</span>
                        <span className="text-sm font-medium text-hive-text-primary truncate">
                          {event.title}
                        </span>
                        {event.rsvpStatus && (
                          <div className={`
                            px-1.5 py-0.5 rounded-full text-xs font-medium
                            ${rsvpStyle.color} ${rsvpStyle.bg}
                          `}>
                            {event.rsvpStatus === 'going' ? '✓' : 
                             event.rsvpStatus === 'maybe' ? '?' : 
                             event.rsvpStatus === 'pending' ? '⋯' : '✗'}
                          </div>
                        )}
                      </div>
                      
                      {event.spaceName && (
                        <div className="text-xs text-hive-text-secondary mt-1">
                          🏢 {event.spaceName}
                          {event.attendeeCount && (
                            <span className="ml-2">👥 {event.attendeeCount}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Free Time Slots */}
          {activeView === 'free' && (
            <div className="space-y-2">
              {widgetData.freeTimeSlots.map((slot, index) => (
                <div
                  key={index}
                  onClick={onScheduleTime}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-hive-status-success/10 transition-colors cursor-pointer border border-hive-status-success/20"
                >
                  <div className="text-center min-w-[60px]">
                    <div className="text-xs font-bold text-hive-status-success">
                      {slot.start}
                    </div>
                    <div className="text-xs text-hive-text-tertiary">
                      {slot.end}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">⏰</span>
                      <span className="text-sm font-medium text-hive-status-success">
                        {slot.label || 'Available'}
                      </span>
                    </div>
                    <div className="text-xs text-hive-text-secondary">
                      Click to schedule something
                    </div>
                  </div>

                  <div className="text-xs text-hive-status-success">
                    +
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {!isEditMode && (
          <div className="flex items-center justify-between pt-2 border-t border-hive-border-default">
            <button
              onClick={() => setActiveView(activeView === 'today' ? 'upcoming' : 'today')}
              className="text-xs text-hive-text-secondary hover:text-hive-text-primary transition-colors"
            >
              {activeView === 'today' ? 'View upcoming' : 'View today'}
            </button>
            
            <button
              onClick={onAddEvent}
              className="text-xs text-hive-brand-secondary hover:text-hive-brand-secondary/80 transition-colors flex items-center gap-1"
            >
              <span>+</span>
              <span>Schedule</span>
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
            📅
          </div>
          <span className="text-xs font-medium text-hive-text-secondary">
            Social Calendar
          </span>
        </div>
        
        {/* Widget Actions */}
        {!isEditMode && (
          <div className="flex items-center gap-1">
            <button
              onClick={onSettingsChange}
              className="w-5 h-5 text-hive-text-tertiary hover:text-hive-text-primary transition-colors"
              title="Calendar Settings"
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
            Social Calendar Widget (2x1)
          </div>
        </div>
      )}
    </div>
  );
};

// =========================
// SOCIAL CALENDAR STORIES
// =========================

export const SocialCalendarWidgetSystem: Story = {
  name: '📅 Social Calendar Widget System',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Social Calendar Widget System</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Intelligent time coordination with social context, conflict detection, and collaborative scheduling - your time coordination command center.
          </p>
        </div>

        {/* Widget States */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Widget States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Loading</h3>
              <div className="w-full h-64">
                <SocialCalendarWidget state="loading" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Error</h3>
              <div className="w-full h-64">
                <SocialCalendarWidget state="error" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Empty</h3>
              <div className="w-full h-64">
                <SocialCalendarWidget state="empty" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Loaded</h3>
              <div className="w-full h-64">
                <SocialCalendarWidget state="loaded" />
              </div>
            </div>
          </div>
        </div>

        {/* Event Types */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Event Types</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center space-y-3">
                <div className="text-2xl">📚</div>
                <div className="text-sm font-bold text-blue-600">Academic</div>
                <div className="text-xs text-hive-text-secondary">Classes, exams, office hours</div>
              </div>

              <div className="text-center space-y-3">
                <div className="text-2xl">👥</div>
                <div className="text-sm font-bold text-green-600">Social</div>
                <div className="text-xs text-hive-text-secondary">Events, parties, hangouts</div>
              </div>

              <div className="text-center space-y-3">
                <div className="text-2xl">⭐</div>
                <div className="text-sm font-bold text-orange-600">Personal</div>
                <div className="text-xs text-hive-text-secondary">Health, hobbies, self-care</div>
              </div>

              <div className="text-center space-y-3">
                <div className="text-2xl">🏢</div>
                <div className="text-sm font-bold text-purple-600">Space</div>
                <div className="text-xs text-hive-text-secondary">Community meetings, activities</div>
              </div>

              <div className="text-center space-y-3">
                <div className="text-2xl">🎯</div>
                <div className="text-sm font-bold text-hive-brand-secondary">Coordination</div>
                <div className="text-xs text-hive-text-secondary">Planning, organization</div>
              </div>
            </div>
          </div>
        </div>

        {/* RSVP Status System */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">RSVP Status System</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-8 h-8 bg-hive-status-success/10 text-hive-status-success rounded-full flex items-center justify-center mx-auto font-bold">
                  ✓
                </div>
                <div className="text-sm font-bold text-hive-status-success">Going</div>
                <div className="text-xs text-hive-text-secondary">Confirmed attendance</div>
              </div>

              <div className="text-center space-y-3">
                <div className="w-8 h-8 bg-hive-status-warning/10 text-hive-status-warning rounded-full flex items-center justify-center mx-auto font-bold">
                  ?
                </div>
                <div className="text-sm font-bold text-hive-status-warning">Maybe</div>
                <div className="text-xs text-hive-text-secondary">Tentative attendance</div>
              </div>

              <div className="text-center space-y-3">
                <div className="w-8 h-8 bg-hive-status-error/10 text-hive-status-error rounded-full flex items-center justify-center mx-auto font-bold">
                  ✗
                </div>
                <div className="text-sm font-bold text-hive-status-error">Not Going</div>
                <div className="text-xs text-hive-text-secondary">Cannot attend</div>
              </div>

              <div className="text-center space-y-3">
                <div className="w-8 h-8 bg-hive-text-tertiary/10 text-hive-text-tertiary rounded-full flex items-center justify-center mx-auto font-bold">
                  ⋯
                </div>
                <div className="text-sm font-bold text-hive-text-tertiary">Pending</div>
                <div className="text-xs text-hive-text-secondary">Response needed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Conflict Detection */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Conflict Detection</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-hive-status-error/10 border-l-4 border-hive-status-error rounded">
                <div className="text-hive-status-error">⚠️</div>
                <div>
                  <div className="text-sm font-medium text-hive-text-primary">Hard Conflict</div>
                  <div className="text-xs text-hive-text-secondary">Events that completely overlap in time</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-hive-status-warning/10 border-l-4 border-hive-status-warning rounded">
                <div className="text-hive-status-warning">⚡</div>
                <div>
                  <div className="text-sm font-medium text-hive-text-primary">Soft Conflict</div>
                  <div className="text-xs text-hive-text-secondary">Events with overlapping travel time or tight scheduling</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-hive-status-success/10 border-l-4 border-hive-status-success rounded">
                <div className="text-hive-status-success">✓</div>
                <div>
                  <div className="text-sm font-medium text-hive-text-primary">No Conflict</div>
                  <div className="text-xs text-hive-text-secondary">Clear schedule with adequate buffer time</div>
                </div>
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
                <SocialCalendarWidget />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Edit Mode Active</h3>
              <div className="w-full h-64">
                <SocialCalendarWidget isEditMode={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Business Logic Documentation */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Social Calendar Business Logic</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Intelligent Scheduling</h3>
              <div className="space-y-3 text-sm text-hive-text-secondary">
                <div>• <strong>Conflict Detection</strong>: Automatic detection of scheduling conflicts with smart resolution suggestions</div>
                <div>• <strong>Social Context</strong>: Events from your spaces get priority and show attendee information</div>
                <div>• <strong>Free Time Discovery</strong>: AI identifies optimal free time slots for scheduling new activities</div>
                <div>• <strong>Priority Weighting</strong>: Academic deadlines and social commitments balanced intelligently</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Collaborative Features</h3>
              <div className="space-y-3 text-sm text-hive-text-secondary">
                <div>• <strong>RSVP Integration</strong>: Quick responses with real-time attendee tracking</div>
                <div>• <strong>Space Events</strong>: Seamless integration with community space scheduling</div>
                <div>• <strong>Cross-Platform Sync</strong>: Calendar data syncs across all devices and platforms</div>
                <div>• <strong>Smart Notifications</strong>: Context-aware reminders based on location and social connections</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-hive-border-default">
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Widget Integration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-hive-text-secondary">
              <div>
                <div className="font-medium text-hive-text-primary mb-2">Size: 2x1</div>
                <div>Horizontal layout optimized for time-based viewing with tabbed interface for today/upcoming/free time</div>
              </div>
              <div>
                <div className="font-medium text-hive-text-primary mb-2">Position: Top/Center</div>
                <div>Prominent placement for quick time coordination access, typically in upper portion of profile</div>
              </div>
              <div>
                <div className="font-medium text-hive-text-primary mb-2">Interactions</div>
                <div>Event responses, scheduling, conflict resolution, free time booking, and calendar settings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const CalendarWidgetInGrid: Story = {
  name: '🎯 Calendar in Bento Grid',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-hive-text-primary">Calendar Widget in Bento Grid</h1>
          <p className="text-lg text-hive-text-secondary">
            Demonstration of Social Calendar Widget (2x1) within the complete profile layout system
          </p>
        </div>

        {/* Full Grid Layout */}
        <div className="grid gap-4 auto-rows-[200px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Top Row */}
          <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">👤</div>
              <div className="text-sm font-medium">Avatar Widget</div>
              <div className="text-xs">1x1 size</div>
            </div>
          </div>

          <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">📋</div>
              <div className="text-sm font-medium">Priority Widget</div>
              <div className="text-xs">1x1 size</div>
            </div>
          </div>

          {/* Social Calendar Widget 2x1 */}
          <div className="col-span-2 row-span-1">
            <SocialCalendarWidget />
          </div>

          {/* Second Row */}
          <div className="col-span-2 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">🏢</div>
              <div className="text-sm font-medium">Community Coordination</div>
              <div className="text-xs">2x1 size</div>
            </div>
          </div>

          <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">🔒</div>
              <div className="text-sm font-medium">Privacy Control</div>
              <div className="text-xs">1x1 size</div>
            </div>
          </div>

          <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-sm font-medium">Other Widget</div>
              <div className="text-xs">1x1 size</div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="col-span-2 row-span-2 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">🛠️</div>
              <div className="text-sm font-medium">Personal Tools (v1 Preview)</div>
              <div className="text-xs">2x2 size</div>
              <div className="mt-2 px-3 py-1 bg-hive-brand-secondary/10 text-hive-brand-secondary text-xs rounded-full">
                JOIN v1 WAITLIST →
              </div>
            </div>
          </div>

          <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium">Stats Widget</div>
              <div className="text-xs">1x1 size</div>
            </div>
          </div>

          <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm font-medium">Quick Actions</div>
              <div className="text-xs">1x1 size</div>
            </div>
          </div>
        </div>

        {/* Widget Analysis */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Calendar Widget Role in Profile System</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-hive-text-secondary">
            <div>
              <div className="font-medium text-hive-text-primary mb-2">Time Coordination Hub</div>
              <div>Central command for all time-based coordination with intelligent conflict detection and social context integration</div>
            </div>
            <div>
              <div className="font-medium text-hive-text-primary mb-2">Social Intelligence</div>
              <div>Events from your spaces get priority display with RSVP tracking and collaborative scheduling features</div>
            </div>
            <div>
              <div className="font-medium text-hive-text-primary mb-2">Free Time Discovery</div>
              <div>AI-powered identification of optimal scheduling opportunities based on your priorities and social commitments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};