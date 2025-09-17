"use client";

import { useState, useEffect } from "react";
import { Button, Card, Badge, Modal } from "@hive/ui";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus,
  ChevronLeft, 
  ChevronRight,
  Filter,
  Search,
  Grid,
  List,
  Star,
  Bell,
  ExternalLink,
  Settings,
  Eye,
  Edit,
  Trash2,
  Copy,
  Share2,
  Download,
  CheckCircle
} from "lucide-react";

export interface SpaceEvent {
  id: string;
  title: string;
  description: string;
  type: 'academic' | 'social' | 'professional' | 'recreational' | 'official';
  organizer: {
    id: string;
    name: string;
    handle: string;
    verified?: boolean;
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
  tools: string[];
  tags: string[];
  visibility: 'public' | 'space_only' | 'invited_only';
  rsvpStatus?: 'going' | 'interested' | 'not_going' | null;
  isBookmarked: boolean;
  engagement: {
    going: number;
    interested: number;
    comments: number;
  };
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isRecurring: boolean;
  recurringPattern?: string;
  spaceIntegration: {
    spaceId: string;
    spaceName: string;
    isJointEvent: boolean;
    partnerSpaces?: string[];
    spaceTools: string[];
    autoToolLaunch: boolean;
  };
}

interface SpaceEventCalendarProps {
  spaceId: string;
  spaceName: string;
  userRole: 'admin' | 'moderator' | 'member';
  onCreateEvent?: () => void;
  onEventClick?: (event: SpaceEvent) => void;
}

export function SpaceEventCalendar({ 
  spaceId, 
  spaceName, 
  userRole, 
  onCreateEvent, 
  onEventClick 
}: SpaceEventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'list'>('month');
  const [events, setEvents] = useState<SpaceEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<SpaceEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<SpaceEvent | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpaceEvents = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockEvents: SpaceEvent[] = [
        {
          id: '1',
          title: 'Weekly Algorithm Study Session',
          description: 'Deep dive into dynamic programming with collaborative problem solving using our space tools.',
          type: 'academic',
          organizer: {
            id: '1',
            name: 'Sarah Chen',
            handle: 'sarahc',
            verified: true
          },
          datetime: {
            start: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            end: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
            timezone: 'America/New_York'
          },
          location: {
            type: 'physical',
            name: 'Lockwood Library Room 301',
            address: '433 Capen Hall, Buffalo, NY 14260'
          },
          capacity: {
            max: 25,
            current: 18,
            waitlist: 3
          },
          tools: ['whiteboard', 'study-timer', 'file-share'],
          tags: ['algorithms', 'data-structures', 'study-group'],
          visibility: 'space_only',
          rsvpStatus: 'going',
          isBookmarked: true,
          engagement: {
            going: 18,
            interested: 7,
            comments: 5
          },
          status: 'upcoming',
          isRecurring: true,
          recurringPattern: 'Weekly on Wednesdays',
          spaceIntegration: {
            spaceId: spaceId,
            spaceName: spaceName,
            isJointEvent: false,
            spaceTools: ['study-timer', 'whiteboard', 'chat'],
            autoToolLaunch: true
          }
        },
        {
          id: '2',
          title: 'Cross-Space Hackathon Planning',
          description: 'Joint planning session with Data Science Club and Web Dev Society for upcoming hackathon.',
          type: 'professional',
          organizer: {
            id: '2',
            name: 'Marcus Johnson',
            handle: 'marcusj'
          },
          datetime: {
            start: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
            timezone: 'America/New_York'
          },
          location: {
            type: 'hybrid',
            name: 'Davis Hall 101 + Virtual',
            address: '340 Bell Hall, Buffalo, NY 14260',
            virtualLink: 'https://zoom.us/j/123456789'
          },
          capacity: {
            max: 50,
            current: 32,
            waitlist: 0
          },
          tools: ['project-board', 'group-chat', 'file-share'],
          tags: ['hackathon', 'collaboration', 'planning'],
          visibility: 'public',
          rsvpStatus: 'interested',
          isBookmarked: false,
          engagement: {
            going: 32,
            interested: 15,
            comments: 8
          },
          status: 'upcoming',
          isRecurring: false,
          spaceIntegration: {
            spaceId: spaceId,
            spaceName: spaceName,
            isJointEvent: true,
            partnerSpaces: ['Data Science Club', 'Web Dev Society'],
            spaceTools: ['project-board', 'shared-docs'],
            autoToolLaunch: false
          }
        },
        {
          id: '3',
          title: 'Technical Interview Prep Workshop',
          description: 'Mock interviews and coding challenges with real-time feedback using our interview prep tools.',
          type: 'professional',
          organizer: {
            id: '3',
            name: 'Emma Davis',
            handle: 'emmad'
          },
          datetime: {
            start: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
            timezone: 'America/New_York'
          },
          location: {
            type: 'virtual',
            name: 'Zoom Meeting Room',
            virtualLink: 'https://zoom.us/j/987654321'
          },
          capacity: {
            max: 30,
            current: 24,
            waitlist: 5
          },
          tools: ['code-editor', 'timer', 'feedback-forms'],
          tags: ['interview', 'coding', 'career'],
          visibility: 'space_only',
          rsvpStatus: null,
          isBookmarked: false,
          engagement: {
            going: 24,
            interested: 12,
            comments: 3
          },
          status: 'upcoming',
          isRecurring: false,
          spaceIntegration: {
            spaceId: spaceId,
            spaceName: spaceName,
            isJointEvent: false,
            spaceTools: ['code-editor', 'timer', 'feedback'],
            autoToolLaunch: true
          }
        }
      ];
      
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setIsLoading(false);
    };

    fetchSpaceEvents();
  }, [spaceId, spaceName]);

  useEffect(() => {
    const filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || event.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    });
    
    setFilteredEvents(filtered);
  }, [events, searchQuery, typeFilter, statusFilter]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.datetime.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const formatEventTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    return `${start.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })} - ${end.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })}`;
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-500';
      case 'social': return 'bg-pink-500';
      case 'professional': return 'bg-green-500';
      case 'recreational': return 'bg-[var(--hive-gold)]';
      case 'official': return 'bg-[var(--hive-gold)]';
      default: return 'bg-gray-500';
    }
  };

  const handleEventClick = (event: SpaceEvent) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
    if (onEventClick) {
      onEventClick(event);
    }
  };

  const handleRSVP = (eventId: string, status: 'going' | 'interested' | 'not_going') => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, rsvpStatus: status }
        : event
    ));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4" />
          <p className="text-[var(--hive-text-inverse)]">Loading space calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">Space Calendar</h2>
          <p className="text-zinc-400">Events and activities for {spaceName}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-zinc-800 rounded-lg p-1">
            {['month', 'week', 'day', 'list'].map((mode: any) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-3 py-1 text-sm rounded-md transition-colors capitalize ${
                  viewMode === mode
                    ? 'bg-hive-gold text-hive-obsidian font-medium'
                    : 'text-zinc-400 hover:text-[var(--hive-text-inverse)]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          
          {(userRole === 'admin' || userRole === 'moderator') && (
            <Button 
              onClick={onCreateEvent}
              className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-[var(--hive-text-inverse)] placeholder-zinc-400 focus:border-hive-gold focus:outline-none w-full"
          />
        </div>
        
        <select
          value={typeFilter}
          onChange={(e: any) => setTypeFilter(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-[var(--hive-text-inverse)] text-sm focus:border-hive-gold focus:outline-none"
        >
          <option value="all">All Types</option>
          <option value="academic">Academic</option>
          <option value="social">Social</option>
          <option value="professional">Professional</option>
          <option value="recreational">Recreational</option>
          <option value="official">Official</option>
        </select>
        
        <select
          value={statusFilter}
          onChange={(e: any) => setStatusFilter(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-[var(--hive-text-inverse)] text-sm focus:border-hive-gold focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Calendar Views */}
      {viewMode === 'month' && (
        <Card className="p-6 bg-zinc-800/50 border-zinc-700">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)]">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day: any) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-zinc-400">
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {getDaysInMonth(currentDate).map((date, index) => {
              if (!date) {
                return <div key={index} className="p-2 min-h-[80px]" />;
              }
              
              const dayEvents = getEventsForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <div 
                  key={index} 
                  className={`p-2 min-h-[80px] border border-zinc-700 hover:bg-zinc-800/50 transition-colors ${
                    isToday ? 'bg-hive-gold/10 border-hive-gold/30' : ''
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isToday ? 'text-hive-gold' : 'text-[var(--hive-text-inverse)]'
                  }`}>
                    {date.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${getEventTypeColor(event.type)} text-[var(--hive-text-inverse)]`}
                      >
                        <div className="truncate font-medium">{event.title}</div>
                        <div className="truncate opacity-75">
                          {formatEventTime(event.datetime.start, event.datetime.end)}
                        </div>
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-zinc-400 text-center">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card 
              key={event.id} 
              className="p-6 bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 transition-colors cursor-pointer"
              onClick={() => handleEventClick(event)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`w-12 h-12 ${getEventTypeColor(event.type)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Calendar className="h-6 w-6 text-[var(--hive-text-inverse)]" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)]">{event.title}</h3>
                      {event.isRecurring && (
                        <Badge variant="skill-tag" className="text-xs">
                          Recurring
                        </Badge>
                      )}
                      {event.spaceIntegration.isJointEvent && (
                        <Badge variant="building-tools" className="text-xs">
                          Joint Event
                        </Badge>
                      )}
                      {event.isBookmarked && <Star className="h-4 w-4 text-hive-gold fill-current" />}
                    </div>
                    
                    <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-zinc-400" />
                        <div>
                          <div className="text-[var(--hive-text-inverse)] font-medium">
                            {new Date(event.datetime.start).toLocaleDateString()}
                          </div>
                          <div className="text-zinc-400">
                            {formatEventTime(event.datetime.start, event.datetime.end)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-zinc-400" />
                        <div>
                          <div className="text-[var(--hive-text-inverse)] font-medium capitalize">
                            {event.location.type}
                          </div>
                          <div className="text-zinc-400 truncate">{event.location.name}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-zinc-400" />
                        <div>
                          <div className="text-[var(--hive-text-inverse)] font-medium">
                            {event.engagement.going}/{event.capacity.max}
                          </div>
                          <div className="text-zinc-400">attending</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {event.spaceIntegration.spaceTools.length > 0 && (
                    <Badge variant="skill-tag" className="text-xs">
                      {event.spaceIntegration.spaceTools.length} tools
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-[var(--hive-text-inverse)]">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-zinc-700">
                <div className="flex items-center space-x-2 text-sm text-zinc-400">
                  <span>by @{event.organizer.handle}</span>
                  {event.organizer.verified && <Star className="h-3 w-3 text-hive-gold fill-current" />}
                  <Badge variant="skill-tag" className="text-xs capitalize">
                    {event.type}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-zinc-400">
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{event.engagement.going}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>{event.engagement.interested}</span>
                  </div>
                  {event.spaceIntegration.autoToolLaunch && (
                    <Badge variant="building-tools" className="text-xs">
                      Auto-Launch Tools
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Event Details Modal */}
      <Modal
        isOpen={showEventDetails}
        onClose={() => setShowEventDetails(false)}
        title={selectedEvent?.title || ''}
        size="lg"
      >
        {selectedEvent && (
          <div className="space-y-6">
            {/* Event Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="skill-tag" className="capitalize">
                    {selectedEvent.type}
                  </Badge>
                  {selectedEvent.spaceIntegration.isJointEvent && (
                    <Badge variant="building-tools">Joint Event</Badge>
                  )}
                  {selectedEvent.isRecurring && (
                    <Badge variant="skill-tag">Recurring</Badge>
                  )}
                </div>
                <p className="text-zinc-300 mb-4">{selectedEvent.description}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                {selectedEvent.isBookmarked && <Star className="h-5 w-5 text-hive-gold fill-current" />}
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-[var(--hive-text-inverse)] mb-2">Date & Time</h4>
                  <div className="flex items-center space-x-2 text-sm text-zinc-300">
                    <Clock className="h-4 w-4 text-zinc-400" />
                    <div>
                      <div>{new Date(selectedEvent.datetime.start).toLocaleDateString()}</div>
                      <div className="text-zinc-400">
                        {formatEventTime(selectedEvent.datetime.start, selectedEvent.datetime.end)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-[var(--hive-text-inverse)] mb-2">Location</h4>
                  <div className="flex items-center space-x-2 text-sm text-zinc-300">
                    <MapPin className="h-4 w-4 text-zinc-400" />
                    <div>
                      <div className="capitalize">{selectedEvent.location.type}</div>
                      <div className="text-zinc-400">{selectedEvent.location.name}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-[var(--hive-text-inverse)] mb-2">Capacity</h4>
                  <div className="flex items-center space-x-2 text-sm text-zinc-300">
                    <Users className="h-4 w-4 text-zinc-400" />
                    <div>
                      <div>{selectedEvent.engagement.going}/{selectedEvent.capacity.max} attending</div>
                      {selectedEvent.capacity.waitlist > 0 && (
                        <div className="text-zinc-400">{selectedEvent.capacity.waitlist} on waitlist</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-[var(--hive-text-inverse)] mb-2">Space Integration</h4>
                  <div className="space-y-2">
                    {selectedEvent.spaceIntegration.spaceTools.length > 0 && (
                      <div>
                        <span className="text-sm text-zinc-400">Available Tools:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedEvent.spaceIntegration.spaceTools.map((tool: any) => (
                            <Badge key={tool} variant="skill-tag" className="text-xs">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedEvent.spaceIntegration.autoToolLaunch && (
                      <div className="flex items-center space-x-2 text-sm text-green-400">
                        <CheckCircle className="h-4 w-4" />
                        <span>Tools will auto-launch when event starts</span>
                      </div>
                    )}
                    
                    {selectedEvent.spaceIntegration.partnerSpaces && (
                      <div>
                        <span className="text-sm text-zinc-400">Partner Spaces:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedEvent.spaceIntegration.partnerSpaces.map((space: any) => (
                            <Badge key={space} variant="building-tools" className="text-xs">
                              {space}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-[var(--hive-text-inverse)] mb-2">Organizer</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-zinc-600 rounded-full flex items-center justify-center">
                      <span className="text-[var(--hive-text-inverse)] text-xs font-medium">
                        {selectedEvent.organizer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-[var(--hive-text-inverse)] text-sm">{selectedEvent.organizer.name}</div>
                      <div className="text-zinc-400 text-xs">@{selectedEvent.organizer.handle}</div>
                    </div>
                    {selectedEvent.organizer.verified && (
                      <Star className="h-4 w-4 text-hive-gold fill-current" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* RSVP Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <div className="flex items-center space-x-2">
                <Button
                  variant={selectedEvent.rsvpStatus === 'going' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleRSVP(selectedEvent.id, 'going')}
                  className={selectedEvent.rsvpStatus === 'going' ? 'bg-green-500 hover:bg-green-600' : ''}
                >
                  Going
                </Button>
                <Button
                  variant={selectedEvent.rsvpStatus === 'interested' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleRSVP(selectedEvent.id, 'interested')}
                  className={selectedEvent.rsvpStatus === 'interested' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                >
                  Interested
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-1" />
                  Remind Me
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  Add to Calendar
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}