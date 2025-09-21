'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, Users, Plus, AlertCircle, Loader2, 
  BookOpen, Coffee, Award, Briefcase, User, ExternalLink,
  AlertTriangle, RefreshCw, Settings, ChevronRight,
  Bell, Navigation;
} from 'lucide-react';
import { CalendarCardProps, Event, CalendarConnection, CalendarConflict } from './types';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { cn } from '../../lib/utils';

export const CalendarCard: React.FC<CalendarCardProps> = ({
  data,
  state = 'loading',
  variant = 'desktop',
  onViewCalendar,
  onConnectCalendar,
  onAddEvent,
  onResolveConflict,
  onSyncCalendar,
  onEventClick,
  className;
}) => {
  const [showConflictDetails, setShowConflictDetails] = useState(false);

  // Time-aware display logic;
  const currentHour = new Date().getHours();
  const timeOfDay = useMemo(() => {
    if (currentHour >= 6 && currentHour < 12) return 'morning';
    if (currentHour >= 12 && currentHour < 18) return 'afternoon';
    if (currentHour >= 18 && currentHour < 24) return 'evening';
    return 'night'
  }, [currentHour]);

  const getTimeBasedTitle = () => {
    switch (timeOfDay) {
      case 'morning': return "Today's Schedule";
      case 'afternoon': return "Today's Schedule";
      case 'evening': return "Tonight & Tomorrow";
      case 'night': return "Tomorrow's Schedule";
      default: return "Today's Schedule"
    }}
  };

  const getEventIcon = (type: string) => {
    const iconMap = {
      academic: <BookOpen className="h-4 w-4" />,
      study: <Coffee className="h-4 w-4" />,
      social: <Users className="h-4 w-4" />,
      personal: <User className="h-4 w-4" />,
      work: <Briefcase className="h-4 w-4" />,
      class: <BookOpen className="h-4 w-4" />,
      meeting: <Users className="h-4 w-4" />,
      milestone: <Award className="h-4 w-4" />
    };
    return iconMap[type as keyof typeof iconMap] || <Calendar className="h-4 w-4" />
  };

  const getEventTypeEmoji = (type: string) => {
    const emojiMap = {
      academic: '🎓',
      study: '📚',
      social: '🎉',
      personal: '⚡',
      work: '🏢',
      class: '🎓',
      meeting: '🤝',
      milestone: '🏆'
    };
    return emojiMap[type as keyof typeof emojiMap] || '📅'
  };

  const getEventColor = (type: string) => {
    // PRD-Aligned: Subtle gradients with consistent color system;
    const colorMap = {
      academic: 'from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-300',
      study: 'from-green-500/10 to-green-600/10 border-green-500/20 text-green-300',
      social: 'from-purple-500/10 to-purple-600/10 border-purple-500/20 text-purple-300',
      personal: 'from-yellow-500/10 to-yellow-400/10 border-yellow-500/20 text-yellow-300',
      work: 'from-orange-500/10 to-orange-600/10 border-orange-500/20 text-orange-300',
      class: 'from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-300',
      meeting: 'from-purple-500/10 to-purple-600/10 border-purple-500/20 text-purple-300',
      milestone: 'from-yellow-500/10 to-yellow-400/10 border-yellow-500/20 text-yellow-300'
    };
    return colorMap[type as keyof typeof colorMap] || 'from-gray-600/10 to-gray-700/10 border-gray-600/20 text-gray-300'
  };

  const getConnectionStatusIcon = (connection: CalendarConnection) => {
    // PRD-Aligned: Consistent status colors;
    switch (connection.status) {
      case 'connected':
        return <div className="w-2 h-2 rounded-full bg-green-500" />;
      case 'syncing':
        return <RefreshCw className="w-3 h-3 animate-spin text-blue-400" />;
      case 'error':
        return <div className="w-2 h-2 rounded-full bg-red-500" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-500" />
    }}
  };

  const formatTimeUntil = (event: Event) => {
    const now = new Date();
    const eventTime = new Date(event.time);
    const diff = eventTime.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 0) return 'Now';
    if (minutes < 60) return `in ${minutes} mins`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `in ${hours}h ${minutes % 60}m`;
    
    const days = Math.floor(hours / 24);
    return `in ${days} days`
  };

  // Loading State;
  if (state === 'loading') {
    return (
      <HiveCard className={cn("p-6", variant === 'mobile' ? 'col-span-full' : 'col-span-2', className)}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <div className="h-5 bg-gray-700 rounded animate-pulse w-32" />
            </div>
            <div className="h-8 bg-gray-700 rounded animate-pulse w-24" />
          </div>
          
          <div className="h-px bg-gray-700" />
          
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-40" />
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-700 rounded animate-pulse w-16" />
                    <div className="h-6 bg-gray-700 rounded animate-pulse w-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-400">
            <RefreshCw className="h-4 w-4 animate-spin inline mr-2" />
            Syncing with Google Calendar...
          </div>
        </div>
      </HiveCard>
    )
  }

  // Empty State;
  if (state === 'empty') {
    return (
      <HiveCard className={cn("p-6", variant === 'mobile' ? 'col-span-full' : 'col-span-2', className)}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <span className="text-lg font-medium text-[var(--hive-text-primary)]">{getTimeBasedTitle()}</span>
            </div>
            <HiveButton variant="ghost" size="sm" onClick={onViewCalendar} className="flex items-center gap-1">
              {variant === 'mobile' ? 'Setup' : 'View Calendar'} <ExternalLink className="h-3 w-3" />
            </HiveButton>
          </div>
          
          <div className="h-px bg-gray-700" />
          
          <div className="text-center py-4">
            <div className="text-4xl mb-3">📅</div>
            <h3 className="text-[var(--hive-text-primary)] font-medium mb-2">No events today</h3>
            <p className="text-gray-400 mb-6">
              {variant === 'mobile' ? 'Ready for a productive day?' : 'Looks like you have a free day!'}
            </p>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-300">Connect your calendar:</p>
              <div className="flex gap-2 justify-center">
                <HiveButton;
                  variant="outline" 
                  size="sm" 
                  onClick={() => onConnectCalendar?.('google')}
                  className="flex items-center gap-2"
                >
                  📱 Google Calendar;
                </HiveButton>
                <HiveButton;
                  variant="outline" 
                  size="sm" 
                  onClick={() => onConnectCalendar?.('outlook')}
                  className="flex items-center gap-2"
                >
                  📱 Outlook;
                </HiveButton>
              </div>
              
              <div className="text-gray-400">or</div>
              
              <HiveButton onClick={onAddEvent} className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Event;
              </HiveButton>
            </div>
          </div>
        </div>
      </HiveCard>
    )
  }

  // Error State;
  if (state === 'error' || state === 'sync-failed') {
    return (
      <HiveCard className={cn("p-6", variant === 'mobile' ? 'col-span-full' : 'col-span-2', className)}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <span className="text-lg font-medium text-[var(--hive-text-primary)]">{getTimeBasedTitle()}</span>
            </div>
            <HiveButton variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </HiveButton>
          </div>
          
          <div className="h-px bg-gray-700" />
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-orange-400">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Calendar Sync Issue</span>
            </div>
            
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-orange-300 mb-3">Unable to sync with Google Calendar</p>
              <p className="text-sm text-gray-400 mb-4">Last successful sync: 2 hours ago</p>
              
              <div className="flex gap-2">
                <HiveButton;
                  variant="outline" 
                  size="sm" 
                  onClick={() => onSyncCalendar?.('google')}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" /> Try Sync Again;
                </HiveButton>
                <HiveButton variant="ghost" size="sm">
                  <Settings className="h-4 w-4" /> Check Connection;
                </HiveButton>
              </div>
            </div>
            
            {data?.todaysEvents && data.todaysEvents.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">📱 Showing Cached Events:</p>
                <div className="space-y-2 text-sm text-gray-400">
                  {data.todaysEvents.slice(0, 2).map((event) => (
                    <div key={event.id} className="flex items-center gap-2">
                      <span>{getEventTypeEmoji(event.type)}</span>
                      <span>{event.time} - {event.title}</span>
                      <span className="text-xs">(may have changed)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </HiveCard>
    )
  }

  // Default State with data;
  if (!data) return null;

  const { nextEvent, upcomingEvents, connections, conflicts } = data;
  const hasConflicts = conflicts.length > 0;

  return (
    <HiveCard;
      className={cn("p-6 cursor-pointer hover:border-blue-400/30 transition-colors", 
        variant === 'mobile' ? 'col-span-full' : 'col-span-2', 
        className;
      )}
      onClick={onViewCalendar}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
            <span className="text-lg font-medium text-[var(--hive-text-primary)]">{getTimeBasedTitle()}</span>
          </div>
          <HiveButton;
            variant="ghost" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onViewCalendar?.()
          }}
            className="flex items-center gap-1"
          >
            {variant === 'mobile' ? 'View All' : 'View Calendar'} <ExternalLink className="h-3 w-3" />
          </HiveButton>
        </div>
        
        <div className="h-px bg-hive-border-secondary" />

        {/* Next Event */}
        {nextEvent && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[var(--hive-text-primary)] font-medium">
              <Clock className="h-4 w-4 text-blue-400" />
              <span>
                {variant === 'mobile' 
                  ? `UP NEXT: ${nextEvent.title} ${formatTimeUntil(nextEvent)}`
                  : `UP NEXT (${formatTimeUntil(nextEvent)})`
                }
              </span>
            </div>

            <motion.div;
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-r ${getEventColor(nextEvent.type)} border rounded-lg p-4 cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                onEventClick?.(nextEvent)
          }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 bg-[var(--hive-text-primary)]/10 rounded-lg flex items-center justify-center">
                    {getEventIcon(nextEvent.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-[var(--hive-text-primary)] mb-1 flex items-center gap-2">
                      {getEventTypeEmoji(nextEvent.type)} {nextEvent.title}
                      {variant !== 'mobile' && <span className="text-[var(--hive-text-primary)]/70">{nextEvent.time}</span>}
                    </h3>
                    
                    {nextEvent.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>{nextEvent.location}</span>
                        {nextEvent.metadata?.professor && <span>• {nextEvent.metadata.professor}</span>}
                      </div>
                    )}

                    {variant !== 'mobile' && (
                      <div className="flex gap-2 mt-2">
                        <HiveButton size="xs" variant="ghost">
                          <Navigation className="h-3 w-3 mr-1" /> Directions;
                        </HiveButton>
                        <HiveButton size="xs" variant="ghost">
                          <Bell className="h-3 w-3 mr-1" /> Remind me in 10 mins;
                        </HiveButton>
                      </div>
                    )}
                  </div>
                </div>

                {variant !== 'mobile' && (
                  <div className="text-lg font-bold text-[var(--hive-text-primary)]/90">
                    {nextEvent.time}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Today's Overview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[var(--hive-text-primary)] font-medium">
            <span>📊</span>
            <span>{variant === 'mobile' ? `${upcomingEvents.length} more events today:` : "TODAY'S OVERVIEW"}</span>
          </div>
          
          <div className="space-y-2 text-sm text-gray-300">
            {upcomingEvents.slice(0, 3).map((event, index) => (
              <div key={event.id} className="flex items-center justify-between">
                <span>• {event.time} {event.title}</span>
                {event.metadata?.spaceId && (
                  <HiveBadge variant="study-streak" className="text-xs">
                    {event.location || 'HIVE Space'}
                  </HiveBadge>
                )}
              </div>
            ))}
            {upcomingEvents.length > 3 && (
              <div className="text-blue-400">
                +{upcomingEvents.length - 3} more events;
              </div>
            )}
          </div>
        </div>

        {/* Connection Status & Conflicts */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--hive-border-default)]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs">
              <span>🔗</span>
              {connections.map((conn, index) => (
                <div key={conn.id} className="flex items-center gap-1">
                  {getConnectionStatusIcon(conn)}
                  <span className="text-gray-400">{conn.name}</span>
                  {index < connections.length - 1 && <span className="text-gray-600">•</span>}
                </div>
              ))}
            </div>
          </div>
          
          {hasConflicts && (
            <div;
              className="flex items-center gap-1 text-xs text-orange-400 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowConflictDetails(!showConflictDetails)
          }}
            >
              <AlertTriangle className="h-3 w-3" />
              <span>{conflicts.length} scheduling conflict{conflicts.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Conflict Details */}
        <AnimatePresence>
          {showConflictDetails && hasConflicts && (
            <motion.div;
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4"
            >
              <div className="space-y-3">
                <h4 className="font-medium text-orange-300 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Scheduling Conflict Detected;
                </h4>
                
                {conflicts[0] && (
                  <div className="space-y-2">
                    <div className="text-sm">
                      <p className="text-gray-300 font-medium mb-2">Overlapping Events:</p>
                      {conflicts[0].events.map((event, index) => (
                        <div key={event.id} className="flex items-center gap-2 text-gray-300">
                          <span>{getEventTypeEmoji(event.type)}</span>
                          <span>{event.title}</span>
                          <span className="text-gray-400">
                            {event.time} • {event.location}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {conflicts[0].suggestion && (
                      <div className="text-sm text-gray-400">
                        <p className="font-medium text-gray-300">Suggestion:</p>
                        <p>{conflicts[0].suggestion}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2 mt-3">
                      <HiveButton;
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onResolveConflict?.(conflicts[0].id)
          }}
                      >
                        Resolve Conflict;
                      </HiveButton>
                      <HiveButton;
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowConflictDetails(false)
          }}
                      >
                        Ignore for Now;
                      </HiveButton>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer CTA */}
        <div className="pt-2 border-t border-[var(--hive-border-default)]/50">
          <div className="flex items-center justify-center text-xs text-gray-400">
            <span>{variant === 'mobile' ? 'Tap to open calendar' : 'Click anywhere to open full calendar'}</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </div>
        </div>
      </div>
    </HiveCard>
  )
};

export default CalendarCard;