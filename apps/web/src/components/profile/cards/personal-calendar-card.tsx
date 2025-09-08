"use client";

import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@hive/ui';
import { 
  Calendar,
  Clock,
  Plus,
  ExternalLink,
  Settings,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Google,
  Microsoft
} from 'lucide-react';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  location?: string;
  source: 'google' | 'outlook' | 'hive' | 'manual';
  type: 'academic' | 'personal' | 'social' | 'hive';
}

interface PersonalCalendarCardProps {
  settings?: Record<string, any>;
  isEditMode?: boolean;
  className?: string;
}

export function PersonalCalendarCard({ settings, isEditMode, className }: PersonalCalendarCardProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [integrations, setIntegrations] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [view, setView] = useState<'today' | 'week'>('today');

  // Fetch calendar events and integration status
  useEffect(() => {
    Promise.all([
      fetchEvents(),
      fetchIntegrations()
    ]).finally(() => setIsLoading(false));
  }, []);

  const fetchEvents = async () => {
    try {
      // This would fetch from your calendar events API
      const mockEvents: CalendarEvent[] = [
        {
          id: '1',
          title: 'CS 312 Lecture',
          start: new Date().toISOString(),
          end: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
          location: 'NSC 225',
          source: 'google',
          type: 'academic'
        },
        {
          id: '2',
          title: 'Study Group - Data Structures',
          start: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
          end: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
          location: 'Lockwood Library',
          source: 'hive',
          type: 'academic'
        },
        {
          id: '3',
          title: 'HIVE Space Meetup',
          start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          end: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
          location: 'Student Union',
          source: 'hive',
          type: 'social'
        }
      ];
      setEvents(mockEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchIntegrations = async () => {
    try {
      const response = await fetch('/api/profile/integrations/calendar');
      if (response.ok) {
        const data = await response.json();
        setIntegrations(data.integrations);
      }
    } catch (error) {
      console.error('Error fetching integrations:', error);
    }
  };

  const syncCalendar = async (provider: string) => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/profile/integrations/calendar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider })
      });
      
      if (response.ok) {
        await fetchEvents();
      }
    } catch (error) {
      console.error('Error syncing calendar:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const connectCalendar = async (provider: 'google' | 'outlook') => {
    try {
      const response = await fetch('/api/profile/integrations/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider })
      });
      
      if (response.ok) {
        const data = await response.json();
        window.open(data.authUrl, '_blank', 'width=500,height=600');
      }
    } catch (error) {
      console.error('Error connecting calendar:', error);
    }
  };

  const formatEventTime = (event: CalendarEvent) => {
    const start = parseISO(event.start);
    const end = parseISO(event.end);
    
    if (isToday(start)) {
      return `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
    } else if (isTomorrow(start)) {
      return `Tomorrow, ${format(start, 'h:mm a')}`;
    } else {
      return format(start, 'MMM d, h:mm a');
    }
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      academic: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      personal: 'bg-green-500/20 text-green-400 border-green-500/30',
      social: 'bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] border-[var(--hive-gold)]/30',
      hive: 'bg-accent/20 text-accent border-accent/30'
    };
    return colors[type as keyof typeof colors] || colors.personal;
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'google': return Google;
      case 'outlook': return Microsoft;
      default: return Calendar;
    }
  };

  if (isLoading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
            <div className="h-3 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </Card>
    );
  }

  const todayEvents = events.filter(event => isToday(parseISO(event.start)));
  const upcomingEvents = events.filter(event => !isToday(parseISO(event.start))).slice(0, 3);

  return (
    <Card className={`p-6 relative ${className}`}>
      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="absolute top-2 right-2 opacity-50">
          <Settings className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-foreground">My Calendar</h3>
        </div>
        
        {!isEditMode && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView(view === 'today' ? 'week' : 'today')}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {view === 'today' ? 'Week' : 'Today'}
            </button>
            
            <button
              onClick={() => syncCalendar('google')}
              disabled={isSyncing}
              className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* Integration Status */}
      <div className="flex items-center gap-2 mb-4">
        {integrations.google?.connected && (
          <div className="flex items-center gap-1 text-xs">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <Google className="h-3 w-3" />
            <span className="text-muted-foreground">Google</span>
          </div>
        )}
        {integrations.outlook?.connected && (
          <div className="flex items-center gap-1 text-xs">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <Microsoft className="h-3 w-3" />
            <span className="text-muted-foreground">Outlook</span>
          </div>
        )}
        {!integrations.google?.connected && !integrations.outlook?.connected && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <AlertCircle className="h-3 w-3" />
            No calendars connected
          </div>
        )}
      </div>

      {/* Today's Events */}
      {view === 'today' && (
        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">
            Today ({format(new Date(), 'MMM d')})
          </div>
          
          {todayEvents.length > 0 ? (
            <div className="space-y-2">
              {todayEvents.map((event) => {
                const SourceIcon = getSourceIcon(event.source);
                return (
                  <div
                    key={event.id}
                    className={`p-3 rounded-lg border ${getEventTypeColor(event.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">
                            {formatEventTime(event)}
                          </span>
                        </div>
                        {event.location && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {event.location}
                          </div>
                        )}
                      </div>
                      <SourceIcon className="h-3 w-3 ml-2 opacity-60" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-6">
              <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No events today</p>
            </div>
          )}
        </div>
      )}

      {/* Week View */}
      {view === 'week' && (
        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">
            This Week
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-2">
              {upcomingEvents.map((event) => {
                const SourceIcon = getSourceIcon(event.source);
                return (
                  <div
                    key={event.id}
                    className="p-2 rounded border border-border/50 hover:border-border transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {event.title}
                        </h4>
                        <div className="text-xs text-muted-foreground">
                          {formatEventTime(event)}
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-4">
              <p className="text-sm">No upcoming events</p>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      {!isEditMode && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
          <Button variant="outline" size="sm" className="flex-1">
            <Plus className="h-3 w-3 mr-2" />
            Add Event
          </Button>
          
          <Button variant="outline" size="sm">
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Connection Prompts */}
      {!integrations.google?.connected && !integrations.outlook?.connected && !isEditMode && (
        <div className="mt-4 pt-4 border-t border-border/50 space-y-2">
          <p className="text-xs text-muted-foreground mb-2">Connect your calendar:</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => connectCalendar('google')}
              className="flex-1"
            >
              <Google className="h-3 w-3 mr-2" />
              Google
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => connectCalendar('outlook')}
              className="flex-1"
            >
              <Microsoft className="h-3 w-3 mr-2" />
              Outlook
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}