"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Plus,
  Grid,
  List,
  Star
} from 'lucide-react';
import {
  Button,
  Card,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  Input
} from '@hive/ui';
import { api } from '@/lib/api-client';

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  attendeeCount: number;
  maxAttendees?: number;
  isRsvpRequired: boolean;
  userRsvp?: 'going' | 'maybe' | 'not_going';
  createdBy: string;
  creatorName: string;
  type: 'meeting' | 'social' | 'workshop' | 'deadline' | 'other';
}

interface EventsPanelProps {
  spaceId: string;
  userRole: 'owner' | 'leader' | 'moderator' | 'member' | 'guest';
  canCreateEvents: boolean;
}

export function EventsPanel({ spaceId, userRole, canCreateEvents }: EventsPanelProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'week' | 'month'>('list');
  const [filter, setFilter] = useState<'all' | 'events' | 'deadlines'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const canManageEvents = canCreateEvents || ['owner', 'leader', 'moderator'].includes(userRole);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get<{ events?: Event[] }>(`/api/spaces/${spaceId}/events`, {
        params: {
          filter,
          startDate: new Date().toISOString(),
          limit: 50
        }
      });
      setEvents(response.events || []);
    } catch (error) {
      console.error('Failed to load events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [filter, spaceId]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleRsvp = useCallback(async (eventId: string, rsvp: 'going' | 'maybe' | 'not_going') => {
    try {
      await api.post(`/api/spaces/${spaceId}/events/${eventId}/rsvp`, { rsvp });
      // Update local state
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === eventId ? { ...event, userRsvp: rsvp } : event
        )
      );
    } catch (error) {
      console.error('Failed to RSVP:', error);
    }
  }, [spaceId]);

  const handleOpenCreate = useCallback(() => {
    setShowCreateModal(true);
  }, []);

  const handleCloseCreate = useCallback(() => {
    setShowCreateModal(false);
  }, []);

  const upcomingEvents = events.filter(event => event.startTime > new Date()).slice(0, 10);
  const todayEvents = events.filter(event => {
    const today = new Date();
    return event.startTime.toDateString() === today.toDateString();
  });

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-gray-800 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Events & Schedule</h3>
          {canManageEvents && (
            <Button
              className="max-w-sm bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
              onClick={handleOpenCreate}
            >
              <Plus className="w-4 h-4 mr-1" />
              Create
            </Button>
          )}
        </div>

        {showCreateModal && (
          <div className="mb-4 flex items-center justify-between rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-100">
            <span>Event creation is coming soon. Ping #product-events if you want to help pilot the workflow.</span>
            <Button variant="ghost" className="h-6 px-2 text-yellow-100 hover:text-yellow-200" onClick={handleCloseCreate}>
              Dismiss
            </Button>
          </div>
        )}

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as any)}>
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="list" className="text-xs">
                <List className="w-3 h-3 mr-1" />
                List
              </TabsTrigger>
              <TabsTrigger value="week" className="text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                Week
              </TabsTrigger>
              <TabsTrigger value="month" className="text-xs">
                <Grid className="w-3 h-3 mr-1" />
                Month
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs value={filter} onValueChange={(f) => setFilter(f as any)}>
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="events" className="text-xs">Events</TabsTrigger>
              <TabsTrigger value="deadlines" className="text-xs">Deadlines</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {view === 'list' && (
          <>
            {/* Happening Today */}
            {todayEvents.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-[var(--hive-brand-primary)] mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Happening Today
                </h4>
                <div className="space-y-2">
                  {todayEvents.map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onRsvp={handleRsvp}
                      isToday
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Events */}
            <div>
              <h4 className="text-sm font-medium text-white mb-3">
                Upcoming ({upcomingEvents.length})
              </h4>
              <div className="space-y-2">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onRsvp={handleRsvp}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No upcoming events</p>
                    {canManageEvents && (
                      <Button
                        className="max-w-sm mt-3"
                        variant="outline"
                        onClick={handleOpenCreate}
                      >
                        Create First Event
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {view === 'week' && (
          <div className="text-center py-8 text-gray-400">
            <Calendar className="w-12 h-12 mx-auto mb-3" />
            <p>Week view coming soon</p>
          </div>
        )}

        {view === 'month' && (
          <div className="text-center py-8 text-gray-400">
            <Grid className="w-12 h-12 mx-auto mb-3" />
            <p>Month view coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({
  event,
  onRsvp,
  isToday = false
}: {
  event: Event;
  onRsvp: (eventId: string, rsvp: 'going' | 'maybe' | 'not_going') => void;
  isToday?: boolean;
}) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        weekday: 'short'
      });
    }
  };

  const getRsvpColor = (rsvp?: string) => {
    switch (rsvp) {
      case 'going': return 'bg-green-500';
      case 'maybe': return 'bg-yellow-500';
      case 'not_going': return 'bg-red-500';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Card className={`p-3 border-gray-800 hover:border-gray-700 transition-colors ${
      isToday ? 'border-[var(--hive-brand-primary)]/30 bg-[var(--hive-brand-primary)]/5' : 'bg-gray-900/50'
    }`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h5 className="font-medium text-white text-sm mb-1">{event.title}</h5>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {isToday ? formatTime(event.startTime) : `${formatDate(event.startTime)} ${formatTime(event.startTime)}`}
            </div>
            {event.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {event.location}
              </div>
            )}
          </div>
        </div>

        <Badge
          className={`text-xs ${
            event.type === 'deadline' ? 'bg-red-500/20 text-red-400' :
            event.type === 'meeting' ? 'bg-blue-500/20 text-blue-400' :
            'bg-purple-500/20 text-purple-400'
          }`}
        >
          {event.type}
        </Badge>
      </div>

      {event.description && (
        <p className="text-xs text-gray-400 mb-3 line-clamp-2">
          {event.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Users className="w-3 h-3" />
          <span>{event.attendeeCount}</span>
          {event.maxAttendees && <span>/ {event.maxAttendees}</span>}
          {event.userRsvp && (
            <div className={`w-2 h-2 rounded-full ${getRsvpColor(event.userRsvp)}`} />
          )}
        </div>

        {event.isRsvpRequired && (
          <div className="flex gap-1">
            <Button
              className={`max-w-sm text-xs h-6 px-2 ${
                event.userRsvp === 'going'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'border-green-600 text-green-400 hover:bg-green-600/10'
              }`}
              variant={event.userRsvp === 'going' ? 'default' : 'outline'}
              onClick={() => onRsvp(event.id, 'going')}
            >
              Going
            </Button>
            <Button
              className={`max-w-sm text-xs h-6 px-2 ${
                event.userRsvp === 'maybe'
                  ? 'bg-yellow-600 hover:bg-yellow-700'
                  : 'border-yellow-600 text-yellow-400 hover:bg-yellow-600/10'
              }`}
              variant={event.userRsvp === 'maybe' ? 'default' : 'outline'}
              onClick={() => onRsvp(event.id, 'maybe')}
            >
              Maybe
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
