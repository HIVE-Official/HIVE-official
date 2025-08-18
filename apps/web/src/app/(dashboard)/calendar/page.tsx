"use client";

// Force dynamic rendering to avoid SSG issues with auth context
export const dynamic = 'force-dynamic';

import { useState, useEffect, useMemo } from "react";
import { Button, Card, Badge } from "@hive/ui";
import { HiveModal } from "@/components/temp-stubs";
import { PageContainer } from "@/components/temp-stubs";
import { 
  Calendar, 
  Plus, 
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  AlertTriangle,
  Check,
  X,
  Filter,
  Download,
  Settings
} from "lucide-react";
import { useSession } from "../../../hooks/use-session";
// import { useCalendarData } from "../../../hooks/use-calendar-data";
import { ErrorBoundary } from "../../../components/error-boundary";
import { EventDetailsModal } from "../../../components/events/event-details-modal";
import { CreateEventModal } from "../../../components/events/create-event-modal";

// Calendar interfaces
interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  type: 'event' | 'class' | 'assignment' | 'meeting' | 'personal';
  color: string;
  source: 'hive' | 'google' | 'outlook' | 'canvas' | 'manual';
  attendees?: string[];
  isConflict?: boolean;
  conflictsWith?: string[];
  rsvpStatus?: 'going' | 'interested' | 'not_going';
  tools?: string[];
  space?: {
    id: string;
    name: string;
  };
}

interface CalendarIntegration {
  id: string;
  name: string;
  type: 'google' | 'outlook' | 'apple' | 'canvas';
  isConnected: boolean;
  lastSync?: string;
  eventCount?: number;
}

export default function CalendarPage() {
  const { user } = useSession();
  // Calendar hook data integration pending - currently using mock data
  // const { data: calendarHookData, state: calendarState } = useCalendarData();
  // Calendar hook data integration pending - currently using mock data
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [integrations, setIntegrations] = useState<CalendarIntegration[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false);
  const [showConflicts, setShowConflicts] = useState(false);
  const [eventTypeFilter, setEventTypeFilter] = useState<CalendarEvent['type'] | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real calendar data
  useEffect(() => {
    const fetchCalendarEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/calendar', {
          headers: {
            'Authorization': `Bearer ${(() => {
              try {
                const session = localStorage.getItem('hive_session');
                if (!session) return 'anonymous';
                const parsed = JSON.parse(session) as { userId?: string };
                return parsed.userId || 'anonymous';
              } catch (error) {
                console.error('Failed to parse session for calendar auth:', error);
                return 'anonymous';
              }
            })()}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch calendar events: ${response.status}`);
        }
        
        const data = await response.json() as { events?: unknown[] };
        const fetchedEvents = data.events || [];
        
        // Transform API events to match UI format
        const transformedEvents: CalendarEvent[] = fetchedEvents.map((event: unknown) => {
          const eventData = event as Record<string, unknown>;
          return {
            id: String(eventData.id || ''),
            title: String(eventData.title || ''),
            description: String(eventData.description || ''),
            startTime: String(eventData.startDate || ''),
            endTime: String(eventData.endDate || ''),
            location: String(eventData.location || ''),
            type: eventData.type === 'personal' ? 'event' : (eventData.type as CalendarEvent['type']) || 'event',
            color: eventData.type === 'personal' ? '#3B82F6' : 
                  eventData.type === 'space' ? '#10B981' : '#F59E0B',
            source: eventData.type === 'personal' ? 'hive' : (eventData.source as CalendarEvent['source']) || 'hive',
            rsvpStatus: eventData.canEdit ? 'going' : 'interested',
            space: eventData.spaceName ? { 
              id: String(eventData.spaceId || ''), 
              name: String(eventData.spaceName) 
            } : undefined,
            tools: Array.isArray(eventData.tools) ? eventData.tools.map(String) : []
          };
        });

        // Set calendar integrations (placeholder for now - can be fetched from user preferences)
        const defaultIntegrations: CalendarIntegration[] = [
          {
            id: 'google',
            name: 'Google Calendar',
            type: 'google',
            isConnected: false
          },
          {
            id: 'canvas',
            name: 'Canvas LMS',
            type: 'canvas',
            isConnected: false
          },
          {
            id: 'outlook',
            name: 'Outlook Calendar',
            type: 'outlook',
            isConnected: false
          }
        ];

        setEvents(transformedEvents);
        setIntegrations(defaultIntegrations);
      } catch (error) {
        console.error('Error fetching calendar events:', error);
        // Fallback to empty state on error
        setEvents([]);
        setIntegrations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalendarEvents();
  }, []);

  // Filter events by type
  const filteredEvents = useMemo(() => {
    if (eventTypeFilter === 'all') return events;
    return events.filter(event => event.type === eventTypeFilter);
  }, [events, eventTypeFilter]);

  // Get events for current view
  const getEventsForView = () => {
    const start = new Date(currentDate);
    const end = new Date(currentDate);
    
    switch (viewMode) {
      case 'day':
        end.setDate(start.getDate() + 1);
        break;
      case 'week':
        start.setDate(start.getDate() - start.getDay());
        end.setDate(start.getDate() + 7);
        break;
      case 'month':
        start.setDate(1);
        end.setMonth(start.getMonth() + 1, 0);
        break;
    }

    return filteredEvents.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate >= start && eventDate <= end;
    });
  };

  const viewEvents = getEventsForView();
  const conflictEvents = events.filter(event => event.isConflict);

  // Memoize selected event data for modal
  const selectedEventData = useMemo(() => {
    if (!selectedEvent) return null;
    
    const event = events.find(e => e.id === selectedEvent);
    if (!event) return null;

    // Map CalendarEvent types to EventData types
    const getEventDataType = (calendarType: CalendarEvent['type']): 'academic' | 'social' | 'professional' | 'recreational' | 'official' => {
      switch (calendarType) {
        case 'class': return 'academic';
        case 'assignment': return 'academic';
        case 'event': return 'social';
        case 'meeting': return 'professional';
        case 'personal': return 'recreational';
        default: return 'social';
      }
    };

    return {
      id: event.id,
      title: event.title,
      description: event.description || '',
      type: getEventDataType(event.type),
      organizer: {
        id: user?.id || 'organizer-unknown',
        name: user?.fullName || 'Event Organizer',
        handle: user?.handle || 'organizer',
        verified: false
      },
      space: event.space ? {
        ...event.space,
        type: 'general' // Default type for space
      } : undefined,
      datetime: {
        start: event.startTime,
        end: event.endTime,
        timezone: 'America/New_York'
      },
      location: {
        type: 'physical' as const,
        name: event.location || 'TBD',
        address: event.location
      },
      capacity: {
        max: 50,
        current: 12,
        waitlist: 0
      },
      tools: event.tools || [],
      tags: [],
      visibility: 'public' as const,
      rsvpStatus: (event.rsvpStatus as 'going' | 'interested' | 'not_going') || 'interested',
      isBookmarked: false,
      engagement: {
        going: 12,
        interested: 8,
        comments: 3,
        shares: 1
      },
      requirements: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }, [selectedEvent, events, user]);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    switch (viewMode) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
    }
    
    setCurrentDate(newDate);
  };

  const getTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'event': return 'bg-blue-500';
      case 'class': return 'bg-green-500';
      case 'assignment': return 'bg-yellow-500';
      case 'meeting': return 'bg-purple-500';
      case 'personal': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'event': return '🎉';
      case 'class': return '📚';
      case 'assignment': return '📝';
      case 'meeting': return '💼';
      case 'personal': return '👤';
      default: return '📅';
    }
  };

  if (isLoading) {
    return (
      <PageContainer title="Loading Calendar..." maxWidth="7xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4" />
            <p className="text-white">Loading your calendar...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <ErrorBoundary>
      <PageContainer
        title="Calendar"
        subtitle="Your personal schedule and campus coordination hub"
        breadcrumbs={[
          { label: "Calendar", icon: Calendar }
        ]}
        actions={
          <div className="flex items-center space-x-3">
            {/* Conflict Warning */}
            {conflictEvents.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConflicts(true)}
                className="border-red-500 text-red-400 hover:bg-red-500/10"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                {conflictEvents.length} Conflicts
              </Button>
            )}
            
            {/* View Mode Toggle */}
            <div className="flex items-center bg-zinc-800 rounded-lg p-1">
              {['day', 'week', 'month'].map((mode) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode(mode as 'month' | 'week' | 'day')}
                  className="text-xs capitalize"
                >
                  {mode}
                </Button>
              ))}
            </div>

            {/* Settings */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowIntegrations(true)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Sync
            </Button>

            {/* Add Event */}
            <Button 
              onClick={() => setShowAddEvent(true)}
              className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
        }
        maxWidth="7xl"
      >
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateDate('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <h2 className="text-2xl font-bold text-white min-w-[200px] text-center">
                {viewMode === 'month' && currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                {viewMode === 'week' && `Week of ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                {viewMode === 'day' && currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateDate('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
          </div>

          {/* Event Type Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-zinc-400" />
            <select
              value={eventTypeFilter}
              onChange={(e) => setEventTypeFilter(e.target.value as CalendarEvent['type'] | 'all')}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1 text-white text-sm focus:border-hive-gold focus:outline-none"
            >
              <option value="all">All Events</option>
              <option value="event">Campus Events</option>
              <option value="class">Classes</option>
              <option value="assignment">Assignments</option>
              <option value="meeting">Meetings</option>
              <option value="personal">Personal</option>
            </select>
          </div>
        </div>

        {/* Integration Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {integrations.filter(i => i.isConnected).map((integration) => (
            <Card key={integration.id} className="p-4 bg-zinc-800/50 border-zinc-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <div className="font-medium text-white text-sm">{integration.name}</div>
                    <div className="text-xs text-zinc-400">
                      {integration.eventCount} events • Last sync: {integration.lastSync && new Date(integration.lastSync).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <Check className="h-4 w-4 text-green-400" />
              </div>
            </Card>
          ))}
        </div>

        {/* Events List/Grid */}
        <div className="space-y-4">
          {viewEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No events scheduled</h3>
              <p className="text-zinc-400 mb-6">
                {eventTypeFilter !== 'all' 
                  ? `No ${eventTypeFilter} events found for this ${viewMode}`
                  : `No events scheduled for this ${viewMode}`
                }
              </p>
              <Button 
                onClick={() => setShowAddEvent(true)}
                className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {viewEvents.map((event) => (
                <Card 
                  key={event.id}
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    event.isConflict 
                      ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20'
                      : 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800'
                  }`}
                  onClick={() => setSelectedEvent(event.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(event.type)}`}></div>
                      <span className="text-lg">{getTypeIcon(event.type)}</span>
                    </div>
                    {event.isConflict && (
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    )}
                  </div>

                  <h3 className="font-semibold text-white mb-2 leading-tight">
                    {event.title}
                  </h3>

                  <div className="space-y-2 text-sm text-zinc-400">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>
                        {formatDate(event.startTime)} • {formatTime(event.startTime)} - {formatTime(event.endTime)}
                      </span>
                    </div>
                    
                    {event.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}

                    {event.attendees && event.attendees.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <Users className="h-3 w-3" />
                        <span>{event.attendees.length} attendees</span>
                      </div>
                    )}

                    {event.space && (
                      <div className="text-hive-gold text-xs">
                        {event.space.name}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-700">
                    <Badge variant="skill-tag" className="text-xs capitalize">
                      {event.source}
                    </Badge>
                    
                    {event.rsvpStatus && (
                      <Badge 
                        variant={event.rsvpStatus === 'going' ? 'building-tools' : 'skill-tag'}
                        className="text-xs capitalize"
                      >
                        {event.rsvpStatus}
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Add Event Modal */}
        <CreateEventModal
          isOpen={showAddEvent}
          onClose={() => setShowAddEvent(false)}
          onCreateEvent={(eventData) => {
            // Convert CreateEventData to CalendarEvent format
            const newEvent: CalendarEvent = {
              id: `event-${Date.now()}`,
              title: eventData.title,
              description: eventData.description,
              startTime: eventData.datetime.start,
              endTime: eventData.datetime.end,
              location: eventData.location.name,
              type: eventData.type === 'academic' ? 'class' :
                     eventData.type === 'social' ? 'event' :
                     eventData.type === 'professional' ? 'meeting' :
                     eventData.type === 'recreational' ? 'event' : 'personal',
              color: eventData.type === 'academic' ? '#3B82F6' : 
                     eventData.type === 'social' ? '#EC4899' :
                     eventData.type === 'professional' ? '#10B981' :
                     eventData.type === 'recreational' ? '#F59E0B' : '#8B5CF6',
              source: 'hive',
              attendees: [],
              rsvpStatus: 'going',
              tools: eventData.tools,
              space: undefined
            };
            
            setEvents(prev => [newEvent, ...prev]);
          }}
        />

        {/* Calendar Integrations Modal */}
        <HiveModal
          isOpen={showIntegrations}
          onClose={() => setShowIntegrations(false)}
          title="Calendar Sync & Integrations"
          size="lg"
        >
          <div className="space-y-6">
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${integration.isConnected ? 'bg-green-400' : 'bg-zinc-500'}`}></div>
                    <div>
                      <div className="font-medium text-white">{integration.name}</div>
                      <div className="text-sm text-zinc-400">
                        {integration.isConnected 
                          ? `${integration.eventCount} events synced`
                          : 'Not connected'
                        }
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={integration.isConnected ? 'outline' : 'primary'}
                    size="sm"
                  >
                    {integration.isConnected ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-zinc-700">
              <Button className="w-full bg-hive-gold text-hive-obsidian hover:bg-hive-champagne">
                <Download className="h-4 w-4 mr-2" />
                Export Calendar
              </Button>
            </div>
          </div>
        </HiveModal>

        {/* Conflicts Modal */}
        <HiveModal
          isOpen={showConflicts}
          onClose={() => setShowConflicts(false)}
          title="Schedule Conflicts"
          size="lg"
        >
          <div className="space-y-4">
            {conflictEvents.map((event) => (
              <div key={event.id} className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white">{event.title}</h3>
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <p className="text-sm text-zinc-400 mb-3">
                  {formatDate(event.startTime)} • {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <X className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm">
                    Keep Both
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </HiveModal>

        {/* Event Details Modal */}
        <EventDetailsModal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          event={selectedEventData}
          currentUserId={user?.id}
          onRSVP={(eventId, status) => {
            setEvents(prevEvents =>
              prevEvents.map(event => 
                event.id === eventId 
                  ? { ...event, rsvpStatus: status }
                  : event
              )
            );
          }}
          onBookmark={(eventId) => {
            
          }}
        />
      </PageContainer>
    </ErrorBoundary>
  );
}