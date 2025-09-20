'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from '../../framer-motion-proxy';
import { cn } from '../../../lib/utils';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { ScrollArea } from '../../ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { 
  Calendar,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
  CheckCircle,
  XCircle,
  Circle,
  BookOpen,
  Coffee,
  Presentation,
  UserPlus,
  ExternalLink,
  Filter,
  Eye,
  MoreHorizontal
} from 'lucide-react';

// Calendar Event Types
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  type: 'academic' | 'space' | 'social' | 'personal' | 'study' | 'ritual';
  source: 'manual' | 'space' | 'ub' | 'integration';
  attendees?: {
    id: string;
    name: string;
    avatar?: string;
    status: 'going' | 'maybe' | 'not-going' | 'pending'
  }[];
  isRSVPRequired: boolean;
  userRSVPStatus?: 'going' | 'maybe' | 'not-going' | 'pending';
  spaceId?: string;
  spaceName?: string;
  color?: string;
  isConflicting?: boolean;
  priority: 'low' | 'medium' | 'high'
}

export interface CalendarCardProps {
  events: CalendarEvent[];
  isEditMode: boolean;
  onEventCreate?: (event: Partial<CalendarEvent>) => void;
  onEventUpdate?: (id: string, updates: Partial<CalendarEvent>) => void;
  onRSVP?: (eventId: string, status: 'going' | 'maybe' | 'not-going') => void;
  onSettingsClick?: () => void;
  className?: string
}

// Event Type Configuration
const eventTypeConfig = {
  academic: { 
    icon: BookOpen, 
    color: 'bg-blue-500', 
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    label: 'Academic' 
  },
  space: { 
    icon: Users, 
    color: 'bg-purple-500', 
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
    label: 'Space Event' 
  },
  social: { 
    icon: Coffee, 
    color: 'bg-green-500', 
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    label: 'Social' 
  },
  study: { 
    icon: Presentation, 
    color: 'bg-orange-500', 
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
    label: 'Study Session' 
  },
  ritual: { 
    icon: Circle, 
    color: 'bg-pink-500', 
    textColor: 'text-pink-700',
    bgColor: 'bg-pink-50',
    label: 'Ritual' 
  },
  personal: { 
    icon: Calendar, 
    color: 'bg-gray-500', 
    textColor: 'text-gray-700',
    bgColor: 'bg-gray-50',
    label: 'Personal' 
  }
};

// RSVP Status Configuration
const rsvpStatusConfig = {
  going: { icon: CheckCircle, color: 'text-green-600', label: 'Going' },
  maybe: { icon: Circle, color: 'text-yellow-600', label: 'Maybe' },
  'not-going': { icon: XCircle, color: 'text-red-600', label: 'Not Going' },
  pending: { icon: Clock, color: 'text-gray-600', label: 'Pending' }
};

// Time formatting utilities
function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })
}

function formatDate(date: Date): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow'
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    })
  }
}

function getTimeUntilEvent(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 0) return 'Started';
  if (diffMins < 60) return `in ${diffMins}m`;
  if (diffHours < 24) return `in ${diffHours}h`;
  return `in ${diffDays}d`
}

// Event Quick Actions Component
function EventQuickActions({ 
  event, 
  onRSVP 
}: { 
  event: CalendarEvent; 
  onRSVP?: (status: 'going' | 'maybe' | 'not-going') => void
}) {
  if (!event.isRSVPRequired) return null;

  return (
    <div className="flex gap-1 mt-2">
      {(['going', 'maybe', 'not-going'] as const).map((status) => {
        const config = rsvpStatusConfig[status];
        const Icon = config.icon;
        const isSelected = event.userRSVPStatus === status;
        
        return (
          <Button
            key={status}
            size="sm"
            variant={isSelected ? "default" : "outline"}
            className={cn(
              "h-6 px-2 text-xs",
              isSelected && "pointer-events-none",
              !isSelected && "hover:scale-105"
            )}
            onClick={() => onRSVP?.(status)}
          >
            <Icon className="w-3 h-3 mr-1" />
            {config.label}
          </Button>
        )
          })}
    </div>
  )
}

// Event Item Component
function EventItem({ 
  event, 
  onRSVP,
  isCompact = false
}: { 
  event: CalendarEvent; 
  onRSVP?: (eventId: string, status: 'going' | 'maybe' | 'not-going') => void;
  isCompact?: boolean
}) {
  const config = eventTypeConfig[event.type];
  const Icon = config.icon;
  const timeUntil = getTimeUntilEvent(event.startTime);

  const handleRSVP = useCallback((status: 'going' | 'maybe' | 'not-going') => {
    onRSVP?.(event.id, status)
  }, [event.id, onRSVP]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'group relative p-3 rounded-lg border transition-all hover:shadow-md',
        config.bgColor,
        event.isConflicting && 'ring-2 ring-red-200',
        event.priority === 'high' && 'ring-1 ring-orange-300'
      )}
    >
      {/* Event Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2 min-w-0 flex-1">
          <div className={cn('w-2 h-2 rounded-full mt-2', config.color)} />
          <div className="min-w-0 flex-1">
            <h4 className={cn(
              'font-medium truncate',
              config.textColor,
              isCompact ? 'text-sm' : 'text-base'
            )}>
              {event.title}
            </h4>
            
            {/* Time Info */}
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-xs text-[var(--hive-text-muted)]">
                <Clock className="w-3 h-3" />
                {formatTime(event.startTime)}
                {event.endTime && ` - ${formatTime(event.endTime)}`}
              </div>
              
              {timeUntil !== 'Started' && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                  {timeUntil}
                </Badge>
              )}
            </div>

            {/* Location */}
            {event.location && !isCompact && (
              <div className="flex items-center gap-1 mt-1 text-xs text-[var(--hive-text-muted)]">
                <MapPin className="w-3 h-3" />
                {event.location}
              </div>
            )}

            {/* Space Info */}
            {event.spaceName && (
              <div className="flex items-center gap-1 mt-1">
                <Badge variant="outline" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  {event.spaceName}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Priority Indicator */}
        {event.priority === 'high' && (
          <div className="w-2 h-2 bg-red-500 rounded-full" />
        )}
      </div>

      {/* RSVP Actions */}
      {event.isRSVPRequired && !isCompact && (
        <EventQuickActions event={event} onRSVP={handleRSVP} />
      )}

      {/* Attendees Preview */}
      {event.attendees && event.attendees.length > 0 && !isCompact && (
        <div className="flex items-center gap-2 mt-2">
          <div className="flex -space-x-1">
            {event.attendees.slice(0, 3).map((attendee) => (
              <Avatar key={attendee.id} className="w-6 h-6 border-2 border-white">
                <AvatarImage src={attendee.avatar} />
                <AvatarFallback className="text-xs">
                  {attendee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          {event.attendees.length > 3 && (
            <span className="text-xs text-[var(--hive-text-muted)]">
              +{event.attendees.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Hover Actions */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0"
        >
          <MoreHorizontal className="w-3 h-3" />
        </Button>
      </div>
    </motion.div>
  )
}

// Calendar Mini View Component
function CalendarMiniView({ 
  events, 
  selectedDate, 
  onDateSelect 
}: { 
  events: CalendarEvent[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dayEvents = events.filter(event => 
        event.startTime.toDateString() === date.toDateString()
      );

      days.push({
        date,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === new Date().toDateString(),
        isSelected: date.toDateString() === selectedDate.toDateString(),
        events: dayEvents,
        hasEvents: dayEvents.length > 0
      })
    }
    return days
  }, [currentMonth, events, selectedDate]);

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate
    })
  }, []);

  return (
    <div className="space-y-3">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-[var(--hive-text-primary)]">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }}
        </h3>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-xs">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-[var(--hive-text-muted)] py-1">
            {day}
          </div>
        ))}
        
        {daysInMonth.map((day, index) => (
          <button
            key={index}
            className={cn(
              'aspect-square flex items-center justify-center rounded text-xs relative transition-colors',
              day.isCurrentMonth 
                ? 'text-[var(--hive-text-primary)]' 
                : 'text-[var(--hive-text-muted)]',
              day.isToday && 'bg-[var(--hive-brand-primary)] text-white font-medium',
              day.isSelected && !day.isToday && 'bg-[var(--hive-background-secondary)] ring-1 ring-[var(--hive-brand-primary)]',
              'hover:bg-[var(--hive-background-secondary)]'
            )}
            onClick={() => onDateSelect(day.date)}
          >
            {day.date.getDate()}
            {day.hasEvents && !day.isToday && (
              <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-[var(--hive-brand-primary)] rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// Main Calendar Card Component
export function CalendarCard({
  events,
  isEditMode,
  onEventCreate,
  onEventUpdate,
  onRSVP,
  onSettingsClick,
  className
}: CalendarCardProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'today' | 'upcoming' | 'calendar'>('today');
  const [showAllEvents, setShowAllEvents] = useState(false);

  // Filter events based on current view
  const filteredEvents = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

    switch (viewMode) {
      case 'today':
        return events.filter(event => {
          const eventDate = new Date(event.startTime.getFullYear(), event.startTime.getMonth(), event.startTime.getDate());
          return eventDate.getTime() === today.getTime()
        })}.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
      
      case 'upcoming':
        return events.filter(event => event.startTime >= now)
          .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
          .slice(0, showAllEvents ? undefined : 5);
      
      case 'calendar':
        return events.filter(event => {
          const eventDate = new Date(event.startTime.getFullYear(), event.startTime.getMonth(), event.startTime.getDate());
          return eventDate.getTime() === selectedDay.getTime()
        })}.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
      
      default:
        return []
    }
  }, [events, viewMode, selectedDate, showAllEvents]);

  const todayEventsCount = useMemo(() => {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return events.filter(event => {
      const eventDate = new Date(event.startTime.getFullYear(), event.startTime.getMonth(), event.startTime.getDate());
      return eventDate.getTime() === todayStart.getTime()
    })}.length
  }, [events]);

  const nextEvent = useMemo(() => {
    const now = new Date();
    return events
      .filter(event => event.startTime > now)
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())[0]
  }, [events]);

  return (
    <Card className={cn('h-full overflow-hidden', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[var(--hive-brand-primary)]" />
            <h3 className="font-semibold text-[var(--hive-text-primary)]">Calendar</h3>
            {todayEventsCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {todayEventsCount} today
              </Badge>
            )}
          </div>
          
          {!isEditMode && (
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={onSettingsClick}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* View Mode Tabs */}
        <div className="flex gap-1 mt-2">
          {[
            { key: 'today', label: 'Today', count: todayEventsCount },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'calendar', label: 'Calendar' }
          ].map(({ key, label, count })} => (
            <Button
              key={key}
              size="sm"
              variant={viewMode === key ? "default" : "ghost"}
              className="h-7 px-3 text-xs"
              onClick={() => setViewMode(key as any)}
            >
              {label}
              {count !== undefined && count > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
                  {count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Next Event Preview */}
        {viewMode === 'today' && nextEvent && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-[var(--hive-background-tertiary)] rounded-lg border"
          >
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[var(--hive-brand-primary)]" />
              <span className="text-sm font-medium text-[var(--hive-text-primary)]">Next Up</span>
            </div>
            <p className="text-sm text-[var(--hive-text-secondary)] mt-1">
              {nextEvent.title} • {getTimeUntilEvent(nextEvent.startTime)}
            </p>
          </motion.div>
        )}

        {/* Calendar Mini View */}
        {viewMode === 'calendar' && (
          <CalendarMiniView
            events={events}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        )}

        {/* Events List */}
        <div className="space-y-3">
          {viewMode !== 'calendar' && (
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">
                {viewMode === 'today' ? `Today, ${formatDate(new Date())}` : 'Upcoming Events'}
              </h4>
              {viewMode === 'upcoming' && !showAllEvents && filteredEvents.length === 5 && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs"
                  onClick={() => setShowAllEvents(true)}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View All
                </Button>
              )}
            </div>
          )}

          <ScrollArea className="max-h-80">
            <div className="space-y-2">
              <AnimatePresence>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <EventItem
                      key={event.id}
                      event={event}
                      onRSVP={onRSVP}
                      isCompact={viewMode === 'upcoming'}
                    />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-[var(--hive-text-muted)]"
                  >
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">
                      {viewMode === 'today' 
                        ? 'No events today' 
                        : viewMode === 'calendar'
                        ? `No events on ${formatDate(selectedDate)}`
                        : 'No upcoming events'
                      }
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </div>

        {/* Quick Add Event */}
        {!isEditMode && (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onEventCreate?.({ 
              type: 'personal',
              startTime: new Date(),
              endTime: new Date(Date.now() + 60 * 60 * 1000),
              isRSVPRequired: false,
              source: 'manual',
              priority: 'medium'
          }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// Default props for development
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'Data Structures Study Group',
    description: 'Final exam prep session for CSE250',
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
    location: 'Davis Hall 101',
    type: 'study',
    source: 'space',
    attendees: [
      { id: 'user-2', name: 'Alex Kim', status: 'going' },
      { id: 'user-3', name: 'Maria Lopez', status: 'going' },
      { id: 'user-4', name: 'David Chen', status: 'maybe' }
    ],
    isRSVPRequired: true,
    userRSVPStatus: 'going',
    spaceId: 'space-cs250',
    spaceName: 'CS 250 Study Group',
    priority: 'high'
  },
  {
    id: 'event-2',
    title: 'UB Hackathon 2024',
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
    location: 'Student Union',
    type: 'academic',
    source: 'ub',
    isRSVPRequired: true,
    userRSVPStatus: 'pending',
    priority: 'high'
  },
  {
    id: 'event-3',
    title: 'Coffee & Code',
    startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
    location: 'Starbucks (North Campus)',
    type: 'social',
    source: 'manual',
    isRSVPRequired: false,
    priority: 'low'
  },
  {
    id: 'event-4',
    title: 'Morning Meditation',
    startTime: new Date(),
    startTime: new Date(new Date().setHours(7, 0, 0, 0)),
    endTime: new Date(new Date().setHours(7, 30, 0, 0)),
    type: 'ritual',
    source: 'manual',
    isRSVPRequired: false,
    priority: 'medium'
  }
];