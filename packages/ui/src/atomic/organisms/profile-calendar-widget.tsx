'use client';

import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { 
  Calendar,
  Clock,
  MapPin,
  Plus,
  ChevronRight,
  Users,
  BookOpen,
  Coffee,
  Zap,
  Settings,
  ExternalLink,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'class' | 'study' | 'meeting' | 'personal' | 'deadline';
  startTime: string;
  endTime: string;
  location?: string;
  participants?: number;
  isRecurring?: boolean;
  status: 'confirmed' | 'tentative' | 'completed';
}

export interface ProfileCalendarWidgetProps {
  user: {
    id: string;
    name: string;
    timezone?: string;
  };
  todayEvents?: CalendarEvent[];
  upcomingEvents?: CalendarEvent[];
  availabilityStatus?: 'available' | 'busy' | 'in-class' | 'studying' | 'offline';
  nextAvailableSlot?: string;
  studyHoursToday?: number;
  studyGoal?: number;
  isEditable?: boolean;
  onAddEvent?: () => void;
  onViewCalendar?: () => void;
  onEditEvent?: (eventId: string) => void;
  onUpdateAvailability?: () => void;
  className?: string;
}

const getEventTypeConfig = (type: string) => {
  const configs = {
    class: {
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      icon: BookOpen,
      label: 'Class'
    },
    study: {
      color: 'text-[var(--hive-gold)]',
      bgColor: 'bg-[var(--hive-gold)]/10',
      borderColor: 'border-[var(--hive-gold)]/20',
      icon: Zap,
      label: 'Study'
    },
    meeting: {
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      icon: Users,
      label: 'Meeting'
    },
    personal: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      icon: Coffee,
      label: 'Personal'
    },
    deadline: {
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      icon: AlertCircle,
      label: 'Deadline'
    }
  };
  
  return configs[type as keyof typeof configs] || configs.personal;
};

const getAvailabilityConfig = (status: string) => {
  const configs = {
    available: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      label: 'Available for Study',
      icon: CheckCircle2
    },
    busy: {
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      label: 'Busy',
      icon: AlertCircle
    },
    'in-class': {
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      label: 'In Class',
      icon: BookOpen
    },
    studying: {
      color: 'text-[var(--hive-gold)]',
      bgColor: 'bg-[var(--hive-gold)]/10',
      label: 'Studying',
      icon: Zap
    },
    offline: {
      color: 'text-[var(--hive-text-muted)]',
      bgColor: 'bg-[var(--hive-background-secondary)]',
      label: 'Offline',
      icon: Clock
    }
  };
  
  return configs[status as keyof typeof configs] || configs.offline;
};

export const ProfileCalendarWidget: React.FC<ProfileCalendarWidgetProps> = ({
  user,
  todayEvents = [],
  upcomingEvents = [],
  availabilityStatus = 'available',
  nextAvailableSlot,
  studyHoursToday = 0,
  studyGoal = 6,
  isEditable = true,
  onAddEvent,
  onViewCalendar,
  onEditEvent,
  onUpdateAvailability,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const availabilityConfig = getAvailabilityConfig(availabilityStatus);
  const studyProgress = studyGoal > 0 ? Math.min((studyHoursToday / studyGoal) * 100, 100) : 0;

  // Get next event from today's schedule
  const nextEvent = todayEvents.find(event => event.status !== 'completed');
  
  // Format time for display
  const formatTime = (time: string) => {
    return new Date(`2024-01-01 ${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Card 
      className={cn(
        'relative overflow-hidden transition-all duration-300 hover:shadow-lg',
        'bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]',
        isHovered && 'scale-[1.02]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Text variant="body-sm" color="gold" weight="medium">
              Calendar & Schedule
            </Text>
            <Badge variant="secondary" className={cn('text-xs', availabilityConfig.color)}>
              <availabilityConfig.icon className="h-3 w-3 mr-1" />
              {availabilityConfig.label}
            </Badge>
          </div>
          {isEditable && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onUpdateAvailability}
              className="h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              <Settings className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        
        {/* Current Status & Next Available */}
        <div className="space-y-3">
          <div className={cn(
            'p-3 rounded-lg border',
            availabilityConfig.bgColor,
            'border-[var(--hive-border-primary)]'
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <availabilityConfig.icon className={cn('h-4 w-4', availabilityConfig.color)} />
                <Text variant="body-sm" weight="medium" color="primary">
                  {availabilityConfig.label}
                </Text>
              </div>
              {nextAvailableSlot && (
                <Text variant="body-xs" color="secondary">
                  Next free: {nextAvailableSlot}
                </Text>
              )}
            </div>
          </div>

          {/* Study Progress */}
          {studyGoal > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Text variant="body-sm" color="primary">Today's Study Progress</Text>
                <Text variant="body-sm" color="gold" weight="medium">
                  {studyHoursToday}h / {studyGoal}h
                </Text>
              </div>
              <div className="w-full bg-[var(--hive-background-secondary)] rounded-full h-2">
                <div 
                  className="bg-[var(--hive-gold)] rounded-full h-2 transition-all duration-500"
                  style={{ width: `${studyProgress}%` }}
                />
              </div>
              <Text variant="body-xs" color="secondary">
                {studyProgress >= 100 ? '🎉 Daily goal achieved!' : `${(studyGoal - studyHoursToday).toFixed(1)}h remaining`}
              </Text>
            </div>
          )}
        </div>

        {/* Next Event */}
        {nextEvent && (
          <div className="space-y-2">
            <Text variant="body-sm" color="primary" weight="medium">Next Event:</Text>
            <div className={cn(
              'p-3 rounded-lg border',
              getEventTypeConfig(nextEvent.type).bgColor,
              getEventTypeConfig(nextEvent.type).borderColor
            )}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  {(() => {
                    const IconComponent = getEventTypeConfig(nextEvent.type).icon;
                    return <IconComponent className={cn(
                      'h-4 w-4 mt-0.5 flex-shrink-0',
                      getEventTypeConfig(nextEvent.type).color
                    )} />;
                  })()}
                  <div className="min-w-0 flex-1">
                    <Text variant="body-sm" weight="medium" color="primary" className="truncate">
                      {nextEvent.title}
                    </Text>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-[var(--hive-text-secondary)]" />
                        <Text variant="body-xs" color="secondary">
                          {formatTime(nextEvent.startTime)} - {formatTime(nextEvent.endTime)}
                        </Text>
                      </div>
                      {nextEvent.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-[var(--hive-text-secondary)]" />
                          <Text variant="body-xs" color="secondary" className="truncate">
                            {nextEvent.location}
                          </Text>
                        </div>
                      )}
                    </div>
                    {nextEvent.participants && nextEvent.participants > 1 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Users className="h-3 w-3 text-[var(--hive-text-secondary)]" />
                        <Text variant="body-xs" color="secondary">
                          {nextEvent.participants} participants
                        </Text>
                      </div>
                    )}
                  </div>
                </div>
                {isEditable && onEditEvent && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditEvent(nextEvent.id)}
                    className="h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] flex-shrink-0 ml-2"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Today's Schedule Overview */}
        {todayEvents.length > 1 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="primary" weight="medium">Today's Schedule:</Text>
              <Text variant="body-xs" color="secondary">
                {todayEvents.filter(e => e.status === 'completed').length}/{todayEvents.length} completed
              </Text>
            </div>
            <div className="space-y-1">
              {todayEvents.slice(0, 3).map((event) => {
                const config = getEventTypeConfig(event.type);
                return (
                  <div 
                    key={event.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors cursor-pointer"
                    onClick={() => isEditable && onEditEvent?.(event.id)}
                  >
                    <div className={cn('w-2 h-2 rounded-full', config.color.replace('text-', 'bg-'))} />
                    <Text variant="body-xs" color="primary" className="flex-1 truncate">
                      {event.title}
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      {formatTime(event.startTime)}
                    </Text>
                    {event.status === 'completed' && (
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    )}
                  </div>
                );
              })}
              {todayEvents.length > 3 && (
                <div className="text-center pt-1">
                  <Text variant="body-xs" color="secondary">
                    +{todayEvents.length - 3} more events
                  </Text>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]">
          {isEditable && onAddEvent && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onAddEvent}
              className="flex-1"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Event
            </Button>
          )}
          
          {onViewCalendar && (
            <Button
              variant="primary"
              size="sm"
              onClick={onViewCalendar}
              className="flex-1"
            >
              <Calendar className="h-3 w-3 mr-1" />
              View Calendar
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onViewCalendar}
            className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>

      </CardContent>

      {/* Hover Glow Effect */}
      {isHovered && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-[var(--hive-gold)]/5 rounded-lg blur-xl" />
      )}
    </Card>
  );
};