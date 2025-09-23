"use client";

import { useState, useEffect, useMemo } from "react";
import { Button, Card, Badge } from "@hive/ui";
import { PageContainer } from "@/components/temp-stubs";
import { 
  Calendar, 
  Plus, 
  Search,
  MapPin,
  Users,
  Clock,
  Zap,
  Star,
  Heart,
  MessageCircle,
  Share2
} from "lucide-react";
import { useSession } from "../../hooks/use-session";
import { ErrorBoundary } from "../../components/error-boundary";
import { CreateEventModal } from "../../components/events/create-event-modal";
import { EventDetailsModal } from "../../components/events/event-details-modal";

// Event interfaces
interface RawEventData {
  id?: unknown;
  title?: unknown;
  description?: unknown;
  type?: unknown;
  organizer?: {
    id?: unknown;
    name?: unknown;
    handle?: unknown;
    verified?: unknown;
  };
  organizerId?: unknown;
  organizerName?: unknown;
  organizerHandle?: unknown;
  startTime?: unknown;
  endTime?: unknown;
  timezone?: unknown;
  datetime?: {
    start?: unknown;
    end?: unknown;
    timezone?: unknown;
  };
  locationType?: unknown;
  locationName?: unknown;
  locationAddress?: unknown;
  virtualLink?: unknown;
  location?: {
    name?: unknown;
  };
  maxCapacity?: unknown;
  currentCapacity?: unknown;
  waitlistCount?: unknown;
  capacity?: {
    max?: unknown;
    current?: unknown;
    waitlist?: unknown;
  };
  tools?: unknown[];
  tags?: unknown[];
  visibility?: unknown;
  rsvpStatus?: unknown;
  isBookmarked?: unknown;
  goingCount?: unknown;
  interestedCount?: unknown;
  commentsCount?: unknown;
  sharesCount?: unknown;
  engagement?: {
    going?: unknown;
    interested?: unknown;
    comments?: unknown;
    shares?: unknown;
  };
  createdAt?: unknown;
  updatedAt?: unknown;
}

interface EventData {
  id: string;
  title: string;
  description: string;
  type: 'academic' | 'social' | 'professional' | 'recreational' | 'official';
  organizer: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    verified?: boolean;
  };
  space?: {
    id: string;
    name: string;
    type: string;
  };
  datetime: {
    start: string;
    end: string;
    timezone: string;
  };
  location: {
    type: 'physical' | 'virtual' | 'hybrid';
    name: string;
    address?: string;
    virtualLink?: string;
  };
  capacity: {
    max: number;
    current: number;
    waitlist: number;
  };
  tools: string[]; // Tool IDs that will be available during event
  tags: string[];
  visibility: 'public' | 'space_only' | 'invited_only';
  rsvpStatus?: 'going' | 'interested' | 'not_going' | null;
  isBookmarked: boolean;
  engagement: {
    going: number;
    interested: number;
    comments: number;
    shares: number;
  };
  requirements?: string[];
  createdAt: string;
  updatedAt: string;
}

export default function EventsPage() {
  const { user } = useSession();
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'today' | 'week' | 'month' | 'my_events'>('all');
  const [eventType, setEventType] = useState<EventData['type'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState<string | null>(null);

  // Fetch real event data
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // Fetch events from multiple space endpoints
        const spacesResponse = await fetch('/api/spaces/my');
        if (!spacesResponse.ok) throw new Error('Failed to fetch user spaces');
        
        const spacesData = await spacesResponse.json() as { spaces?: unknown[] };
        const userSpaces = spacesData.spaces || [];
        
        // Fetch events from all user spaces
        const eventPromises = userSpaces.map(async (space: unknown) => {
          const spaceData = space as Record<string, unknown>;
          try {
            const eventsResponse = await fetch(`/api/spaces/${String(spaceData.id)}/events`);
            if (eventsResponse.ok) {
              const eventsData = await eventsResponse.json() as { events?: unknown[] };
              return eventsData.events?.map((event: unknown): EventData => {
                const eventData = event as Record<string, unknown>;
                
                // Map raw event data to EventData format
                return {
                  id: String((eventData as RawEventData).id || `event-${Date.now()}-${Math.random()}`),
                  title: String((eventData as RawEventData).title || 'Untitled Event'),
                  description: String((eventData as RawEventData).description || ''),
                  type: ((eventData as RawEventData).type as EventData['type']) || 'social',
                  organizer: {
                    id: String((eventData as RawEventData).organizer?.id || (eventData as RawEventData).organizerId || 'unknown'),
                    name: String((eventData as RawEventData).organizer?.name || (eventData as RawEventData).organizerName || 'Event Organizer'),
                    handle: String((eventData as RawEventData).organizer?.handle || (eventData as RawEventData).organizerHandle || 'organizer'),
                    verified: Boolean((eventData as RawEventData).organizer?.verified)
                  },
                  space: { 
                    id: String(spaceData.id), 
                    name: String(spaceData.name), 
                    type: String(spaceData.type || 'general') 
                  },
                  datetime: {
                    start: String((eventData as RawEventData).startTime || (eventData as RawEventData).datetime?.start || new Date().toISOString()),
                    end: String((eventData as RawEventData).endTime || (eventData as RawEventData).datetime?.end || new Date(Date.now() + 3600000).toISOString()),
                    timezone: String((eventData as RawEventData).timezone || (eventData as RawEventData).datetime?.timezone || 'America/New_York')
                  },
                  location: {
                    type: ((eventData as RawEventData).locationType as 'physical' | 'virtual' | 'hybrid') || 'physical',
                    name: String((eventData as RawEventData).locationName || (eventData as RawEventData).location?.name || 'TBD'),
                    address: (eventData as RawEventData).locationAddress ? String((eventData as RawEventData).locationAddress) : undefined,
                    virtualLink: (eventData as RawEventData).virtualLink ? String((eventData as RawEventData).virtualLink) : undefined
                  },
                  capacity: {
                    max: Number((eventData as RawEventData).maxCapacity || (eventData as RawEventData).capacity?.max || 50),
                    current: Number((eventData as RawEventData).currentCapacity || (eventData as RawEventData).capacity?.current || 0),
                    waitlist: Number((eventData as RawEventData).waitlistCount || (eventData as RawEventData).capacity?.waitlist || 0)
                  },
                  tools: Array.isArray((eventData as RawEventData).tools) ? (eventData as RawEventData).tools!.map(String) : [],
                  tags: Array.isArray((eventData as RawEventData).tags) ? (eventData as RawEventData).tags!.map(String) : [],
                  visibility: ((eventData as RawEventData).visibility as EventData['visibility']) || 'public',
                  rsvpStatus: ((eventData as RawEventData).rsvpStatus as EventData['rsvpStatus']) || null,
                  isBookmarked: Boolean((eventData as RawEventData).isBookmarked),
                  engagement: {
                    going: Number((eventData as RawEventData).goingCount || (eventData as RawEventData).engagement?.going || 0),
                    interested: Number((eventData as RawEventData).interestedCount || (eventData as RawEventData).engagement?.interested || 0),
                    comments: Number((eventData as RawEventData).commentsCount || (eventData as RawEventData).engagement?.comments || 0),
                    shares: Number((eventData as RawEventData).sharesCount || (eventData as RawEventData).engagement?.shares || 0)
                  },
                  requirements: Array.isArray(eventData.requirements) ? eventData.requirements.map(String) : [],
                  createdAt: String((eventData as RawEventData).createdAt || new Date().toISOString()),
                  updatedAt: String((eventData as RawEventData).updatedAt || new Date().toISOString())
                };
              }) || [];
            }
          } catch (error) {
            console.error(`Failed to fetch events for space ${String(spaceData.id)}:`, error);
          }
          return [];
        });
        
        const allEventArrays = await Promise.all(eventPromises);
        const allEvents = allEventArrays.flat();
        
        // If no real events, show empty state instead of mock data
        setEvents(allEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // No mock events needed - using real API data

  // Filter and search events
  const filteredEvents = useMemo(() => {
    let filtered = events;

    // Filter by time
    const now = new Date();
    switch (filter) {
      case 'today':
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.datetime.start);
          return eventDate.toDateString() === now.toDateString();
        });
        break;
      case 'week': {
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.datetime.start);
          return eventDate >= now && eventDate <= nextWeek;
        });
        break;
      }
      case 'month': {
        const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.datetime.start);
          return eventDate >= now && eventDate <= nextMonth;
        });
        break;
      }
      case 'my_events':
        filtered = filtered.filter(event => 
          event.rsvpStatus === 'going' || event.organizer.id === user?.id
        );
        break;
    }

    // Filter by type
    if (eventType !== 'all') {
      filtered = filtered.filter(event => event.type === eventType);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.tags.some(tag => tag.toLowerCase().includes(query)) ||
        event.organizer.name.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => 
      new Date(a.datetime.start).getTime() - new Date(b.datetime.start).getTime()
    );
  }, [events, filter, eventType, searchQuery, user?.id]);

  const formatEventTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();
    
    const isToday = start.toDateString() === now.toDateString();
    const isTomorrow = start.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();
    
    let dayText = '';
    if (isToday) dayText = 'Today';
    else if (isTomorrow) dayText = 'Tomorrow';
    else dayText = start.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    const timeText = `${start.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })} - ${end.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })}`;
    
    return `${dayText} • ${timeText}`;
  };

  const getEventTypeColor = (type: EventData['type']) => {
    switch (type) {
      case 'academic': return 'bg-blue-500';
      case 'social': return 'bg-pink-500';
      case 'professional': return 'bg-green-500';
      case 'recreational': return 'bg-[var(--hive-status-warning)]';
      case 'official': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventTypeIcon = (type: EventData['type']) => {
    switch (type) {
      case 'academic': return '📚';
      case 'social': return '🎉';
      case 'professional': return '💼';
      case 'recreational': return '🎮';
      case 'official': return '🏛️';
      default: return '📅';
    }
  };

  const handleRSVP = (eventId: string, status: 'going' | 'interested' | 'not_going') => {
    setEvents(prevEvents =>
      prevEvents.map(event => {
        if (event.id === eventId) {
          const prevStatus = event.rsvpStatus;
          const newEngagement = { ...event.engagement };
          
          // Update engagement counts
          if (prevStatus === 'going') newEngagement.going--;
          if (prevStatus === 'interested') newEngagement.interested--;
          
          if (status === 'going') newEngagement.going++;
          if (status === 'interested') newEngagement.interested++;
          
          return {
            ...event,
            rsvpStatus: status,
            engagement: newEngagement
          };
        }
        return event;
      })
    );
  };

  const handleBookmark = (eventId: string) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, isBookmarked: !event.isBookmarked }
          : event
      )
    );
  };

  if (isLoading) {
    return (
      <PageContainer title="Loading Events..." maxWidth="2xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 bg-[var(--hive-brand-primary)] rounded-lg animate-pulse mx-auto mb-4" />
            <p className="text-white">Loading campus events...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <ErrorBoundary>
      <PageContainer
        title="Campus Events"
        subtitle="Discover, coordinate, and participate in campus activities"
        breadcrumbs={[
          { label: "Events", icon: Calendar }
        ]}
        actions={
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-[var(--hive-brand-primary)] focus:outline-none w-64"
              />
            </div>
            
            {/* Filters */}
            <div className="flex items-center bg-zinc-800 rounded-lg p-1">
              <Button
                variant={filter === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('all')}
                className="text-xs"
              >
                All
              </Button>
              <Button
                variant={filter === 'today' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('today')}
                className="text-xs"
              >
                Today
              </Button>
              <Button
                variant={filter === 'week' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('week')}
                className="text-xs"
              >
                This Week
              </Button>
              <Button
                variant={filter === 'my_events' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('my_events')}
                className="text-xs"
              >
                My Events
              </Button>
            </div>
            
            {/* Create Event */}
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-primary)]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        }
        maxWidth="2xl"
      >
        {/* Event Type Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={eventType === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setEventType('all')}
          >
            All Types
          </Button>
          {(['academic', 'social', 'professional', 'recreational', 'official'] as const).map((type) => (
            <Button
              key={type}
              variant={eventType === type ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setEventType(type)}
              className="capitalize"
            >
              {getEventTypeIcon(type)} {type}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <Card 
              key={event.id} 
              className="p-6 bg-hive-background-overlay border-hive-border-default hover:bg-hive-background-interactive transition-all duration-200 cursor-pointer"
              onClick={() => setShowEventDetails(event.id)}
            >
              {/* Event Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-12 h-12 ${getEventTypeColor(event.type)} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-lg leading-tight mb-1">
                      {event.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-zinc-400">
                      <span>{event.organizer.name}</span>
                      {event.organizer.verified && (
                        <Star className="h-3 w-3 text-[var(--hive-brand-primary)] fill-current" />
                      )}
                      {event.space && (
                        <>
                          <span>•</span>
                          <span className="text-[var(--hive-brand-primary)]">{event.space.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleBookmark(event.id);
                  }}
                  className={event.isBookmarked ? 'text-[var(--hive-brand-primary)]' : 'text-zinc-400'}
                >
                  <Heart className={`h-4 w-4 ${event.isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Event Details */}
              <div className="space-y-3 mb-4">
                <p className="text-zinc-300 text-sm leading-relaxed line-clamp-2">
                  {event.description}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-zinc-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatEventTime(event.datetime.start, event.datetime.end)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{event.location.name}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-zinc-400">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{event.capacity.current}/{event.capacity.max} attending</span>
                  </div>
                  {event.tools.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <Zap className="h-4 w-4" />
                      <span>{event.tools.length} tools available</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="skill-tag" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                  {event.tags.length > 3 && (
                    <Badge variant="skill-tag" className="text-xs">
                      +{event.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              )}

              {/* RSVP Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <div className="flex items-center space-x-4">
                  <Button
                    variant={event.rsvpStatus === 'going' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      handleRSVP(event.id, event.rsvpStatus === 'going' ? 'not_going' : 'going');
                    }}
                    className="text-xs"
                  >
                    <Users className="h-3 w-3 mr-1" />
                    Going ({event.engagement.going})
                  </Button>
                  <Button
                    variant={event.rsvpStatus === 'interested' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      handleRSVP(event.id, event.rsvpStatus === 'interested' ? 'not_going' : 'interested');
                    }}
                    className="text-xs"
                  >
                    <Star className="h-3 w-3 mr-1" />
                    Interested ({event.engagement.interested})
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-xs text-zinc-400">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    {event.engagement.comments}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-zinc-400"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(`${window.location.origin}/events/${event.id}`);
                    }}
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
            <p className="text-zinc-400 mb-6">
              {searchQuery || eventType !== 'all' || filter !== 'all' 
                ? 'Try adjusting your filters or search terms'
                : 'Be the first to create an event for your campus community!'
              }
            </p>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-primary)]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        )}

        {/* Create Event Modal */}
        <CreateEventModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreateEvent={(eventData) => {
            // Generate new event with mock data
            const newEvent: EventData = {
              id: `event-${Date.now()}`,
              title: eventData.title,
              description: eventData.description,
              type: eventData.type,
              organizer: {
                id: user?.id || 'current-user',
                name: user?.fullName || 'You',
                handle: user?.handle || 'you',
                verified: false
              },
              datetime: {
                start: eventData.datetime.start,
                end: eventData.datetime.end,
                timezone: eventData.datetime.timezone
              },
              location: eventData.location,
              capacity: {
                max: eventData.capacity,
                current: 0,
                waitlist: 0
              },
              tools: eventData.tools,
              tags: eventData.tags,
              visibility: eventData.visibility,
              rsvpStatus: null,
              isBookmarked: false,
              engagement: {
                going: 0,
                interested: 0,
                comments: 0,
                shares: 0
              },
              requirements: eventData.requirements,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            
            setEvents(prev => [newEvent, ...prev]);
          }}
        />

        {/* Event Details Modal */}
        <EventDetailsModal
          isOpen={!!showEventDetails}
          onClose={() => setShowEventDetails(null)}
          event={events.find(e => e.id === showEventDetails) || null}
          currentUserId={user?.id}
          onRSVP={handleRSVP}
          onBookmark={handleBookmark}
        />
      </PageContainer>
    </ErrorBoundary>
  );
}