'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  Plus,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Filter,
  List,
  Grid3X3,
  Eye,
  Edit,
  Trash2,
  Share,
  Copy,
  Bell,
  BellOff,
  Check,
  X,
  UserCheck,
  UserX,
  MoreHorizontal,
  CalendarDays,
  Video,
  Navigation,
  AlertCircle,
  Star,
  Repeat,
  Globe
} from 'lucide-react';
import {
  HiveCard,
  HiveButton,
  Badge,
  Avatar,
  HiveModal,
  HiveInput
} from '@hive/ui';
import type { User } from '@hive/core';

// Define missing types that should be in @hive/core
interface SpaceEvent {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  spaceId: string;
  organizerId: string;
  createdAt: Date;
  isRecurring?: boolean;
  isVirtual?: boolean;
}

interface EventRSVP {
  id: string;
  eventId: string;
  userId: string;
  response: 'yes' | 'no' | 'maybe';
  createdAt: Date;
  user?: User;
}
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from 'date-fns';

interface SpaceEventCalendarProps {
  spaceId: string;
  canCreateEvents: boolean;
  spaceRules?: import('@/lib/space-type-rules').SpaceTypeRules | null;
}

interface EventWithDetails extends SpaceEvent {
  rsvps: EventRSVP[];
  attendeeCount: number;
  userRSVP?: 'yes' | 'no' | 'maybe' | null;
  organizer: User;
}

type ViewMode = 'calendar' | 'list';
type EventFilter = 'all' | 'upcoming' | 'attending' | 'organizing';

export function SpaceEventCalendar({ spaceId, canCreateEvents, spaceRules }: SpaceEventCalendarProps) {
  const [events, setEvents] = useState<EventWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filter, setFilter] = useState<EventFilter>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventWithDetails | null>(null);

  // Space rules-based event features
  const isGreekLife = spaceRules?.membership.joinMethod === 'invitation_only';
  const isResidential = spaceRules?.membership.maxSpaces === 1;
  const eventsArePublic = spaceRules?.visibility.events === 'public_calendar';
  const eventsAreCampusVisible = spaceRules?.visibility.events === 'campus_calendar';

  // Customize event calendar based on space type
  const getEventTypeLabels = () => {
    if (isGreekLife) return {
      social: 'Social Events',
      rush: 'Recruitment',
      philanthropy: 'Philanthropy',
      meeting: 'Chapter Meetings'
    };
    if (isResidential) return {
      social: 'Floor Events',
      maintenance: 'Maintenance',
      meeting: 'Resident Meetings',
      community: 'Building Events'
    };
    return {
      academic: 'Academic Events',
      social: 'Social Events',
      meeting: 'Meetings',
      workshop: 'Workshops'
    };
  };

  const getCreateEventButtonText = () => {
    if (isGreekLife) return "Plan Chapter Event";
    if (isResidential) return "Schedule Community Event";
    return "Create Event";
  };

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/spaces/${spaceId}/events`);
        const data = await response.json();

        if (data.success) {
          setEvents(data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [spaceId]);

  // Handle RSVP
  const handleRSVP = async (eventId: string, response: 'yes' | 'no' | 'maybe') => {
    try {
      await fetch(`/api/spaces/${spaceId}/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response })
      });

      // Update local state
      setEvents(prev => prev.map(event => {
        if (event.id === eventId) {
          return {
            ...event,
            userRSVP: response,
            attendeeCount: response === 'yes'
              ? event.attendeeCount + (event.userRSVP === 'yes' ? 0 : 1)
              : event.attendeeCount - (event.userRSVP === 'yes' ? 1 : 0)
          };
        }
        return event;
      }));
    } catch (error) {
      console.error('Failed to RSVP:', error);
    }
  };

  // Filter events
  const filteredEvents = events.filter(event => {
    switch (filter) {
      case 'upcoming':
        return new Date(event.startTime) > new Date();
      case 'attending':
        return event.userRSVP === 'yes';
      case 'organizing':
        return event.organizer.id === 'current-user-id'; // Replace with actual user ID
      default:
        return true;
    }
  });

  // Get events for current month (calendar view)
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDay = (day: Date) => {
    return filteredEvents.filter(event =>
      isSameDay(new Date(event.startTime), day)
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="bg-gray-800 h-8 rounded w-1/3"></div>
          <div className="bg-gray-800 h-64 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">Events</h3>
          <p className="text-gray-400 text-sm">Coordinate and attend space activities</p>
        </div>

        <div className="flex items-center space-x-3">
          {/* View Toggle */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'calendar' ? 'bg-hive-gold text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-hive-gold text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Filter */}
          <div className="relative">
            <HiveButton variant="secondary" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              {filter === 'all' ? 'All Events' :
               filter === 'upcoming' ? 'Upcoming' :
               filter === 'attending' ? 'Attending' : 'Organizing'}
            </HiveButton>
            {/* Simplified filter - would need proper dropdown */}
          </div>

          {/* Create Event */}
          {canCreateEvents && (
            <HiveButton
              onClick={() => setShowCreateModal(true)}
              className="bg-hive-gold text-black hover:bg-yellow-400"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </HiveButton>
          )}
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-white">
              {format(currentDate, 'MMMM yyyy')}
            </h4>
            <div className="flex items-center space-x-2">
              <HiveButton
                variant="secondary"
                size="sm"
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </HiveButton>
              <HiveButton
                variant="secondary"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </HiveButton>
              <HiveButton
                variant="secondary"
                size="sm"
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </HiveButton>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {calendarDays.map((day) => {
              const dayEvents = getEventsForDay(day);
              const isCurrentDay = isToday(day);

              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-24 p-2 border border-gray-800 rounded-lg ${
                    isCurrentDay ? 'bg-hive-gold/10 border-hive-gold/30' : 'bg-gray-900/50'
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isCurrentDay ? 'text-hive-gold' : 'text-white'
                  }`}>
                    {format(day, 'd')}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className="text-xs p-1 bg-blue-500/20 text-blue-300 rounded cursor-pointer hover:bg-blue-500/30 transition-colors truncate"
                      >
                        {format(new Date(event.startTime), 'HH:mm')} {event.title}
                      </div>
                    ))}

                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-400">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">No events found</h4>
              <p className="text-gray-400 mb-4">
                {filter === 'all'
                  ? "No events have been created yet"
                  : `No events match your current filter`
                }
              </p>
              {canCreateEvents && filter === 'all' && (
                <HiveButton
                  onClick={() => setShowCreateModal(true)}
                  className="bg-hive-gold text-black hover:bg-yellow-400"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Event
                </HiveButton>
              )}
            </div>
          ) : (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRSVP={handleRSVP}
                onView={() => setSelectedEvent(event)}
                canEdit={canCreateEvents}
              />
            ))
          )}
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRSVP={handleRSVP}
          canEdit={canCreateEvents}
        />
      )}

      {/* Create Event Modal */}
      {showCreateModal && (
        <CreateEventModal
          spaceId={spaceId}
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onEventCreated={(newEvent) => {
            setEvents(prev => [...prev, newEvent]);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}

// Event Card Component
function EventCard({
  event,
  onRSVP,
  onView,
  canEdit
}: {
  event: EventWithDetails;
  onRSVP: (eventId: string, response: 'yes' | 'no' | 'maybe') => void;
  onView: () => void;
  canEdit: boolean;
}) {
  const isPast = new Date(event.endTime) < new Date();
  const isUpcoming = new Date(event.startTime) > new Date();

  return (
    <HiveCard className="p-4 hover:border-hive-gold/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-semibold text-white cursor-pointer hover:text-hive-gold" onClick={onView}>
              {event.title}
            </h4>
            {isPast && <Badge variant="secondary" className="text-xs">Past</Badge>}
            {event.isRecurring && <Repeat className="w-4 h-4 text-gray-400" />}
            {event.isVirtual && <Video className="w-4 h-4 text-blue-400" />}
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>
                {format(new Date(event.startTime), 'MMM d, HH:mm')} - {format(new Date(event.endTime), 'HH:mm')}
              </span>
            </div>

            {event.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          {event.description && (
            <p className="text-sm text-gray-300 mb-3 line-clamp-2">{event.description}</p>
          )}

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <Users className="w-4 h-4" />
              <span>{event.attendeeCount} attending</span>
            </div>

            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <Users className="w-4 h-4" />
              <span>by {event.organizer.fullName}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {/* RSVP Status */}
          {!isPast && (
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => onRSVP(event.id, 'yes')}
                className={`p-1 rounded text-xs transition-colors ${
                  event.userRSVP === 'yes'
                    ? 'bg-green-500 text-white'
                    : 'text-gray-400 hover:text-green-400'
                }`}
                title="Going"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => onRSVP(event.id, 'maybe')}
                className={`p-1 rounded text-xs transition-colors ${
                  event.userRSVP === 'maybe'
                    ? 'bg-yellow-500 text-white'
                    : 'text-gray-400 hover:text-yellow-400'
                }`}
                title="Maybe"
              >
                <AlertCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => onRSVP(event.id, 'no')}
                className={`p-1 rounded text-xs transition-colors ${
                  event.userRSVP === 'no'
                    ? 'bg-red-500 text-white'
                    : 'text-gray-400 hover:text-red-400'
                }`}
                title="Not Going"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Actions */}
          <button
            onClick={onView}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="View details"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </HiveCard>
  );
}

// Event Detail Modal Component
function EventDetailModal({
  event,
  isOpen,
  onClose,
  onRSVP,
  canEdit
}: {
  event: EventWithDetails;
  isOpen: boolean;
  onClose: () => void;
  onRSVP: (eventId: string, response: 'yes' | 'no' | 'maybe') => void;
  canEdit: boolean;
}) {
  const isPast = new Date(event.endTime) < new Date();

  return (
    <HiveModal open={isOpen} onOpenChange={onClose} className="max-w-2xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{event.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>
                  {format(new Date(event.startTime), 'EEEE, MMMM d, yyyy • HH:mm')} - {format(new Date(event.endTime), 'HH:mm')}
                </span>
              </div>
            </div>
          </div>

          {canEdit && (
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Event Info */}
        <div className="space-y-4 mb-6">
          {event.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-white">{event.location}</span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-white">{event.attendeeCount} people attending</span>
          </div>

          {event.description && (
            <div>
              <h4 className="font-medium text-white mb-2">Description</h4>
              <p className="text-gray-300 whitespace-pre-wrap">{event.description}</p>
            </div>
          )}
        </div>

        {/* RSVP Section */}
        {!isPast && (
          <div className="mb-6">
            <h4 className="font-medium text-white mb-3">Will you attend?</h4>
            <div className="flex space-x-3">
              <HiveButton
                variant={event.userRSVP === 'yes' ? 'default' : 'secondary'}
                onClick={() => onRSVP(event.id, 'yes')}
                className={event.userRSVP === 'yes' ? 'bg-green-500 hover:bg-green-600' : ''}
              >
                <Check className="w-4 h-4 mr-2" />
                Going
              </HiveButton>
              <HiveButton
                variant={event.userRSVP === 'maybe' ? 'default' : 'secondary'}
                onClick={() => onRSVP(event.id, 'maybe')}
                className={event.userRSVP === 'maybe' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Maybe
              </HiveButton>
              <HiveButton
                variant={event.userRSVP === 'no' ? 'default' : 'secondary'}
                onClick={() => onRSVP(event.id, 'no')}
                className={event.userRSVP === 'no' ? 'bg-red-500 hover:bg-red-600' : ''}
              >
                <X className="w-4 h-4 mr-2" />
                Can't Go
              </HiveButton>
            </div>
          </div>
        )}

        {/* Attendees */}
        <div>
          <h4 className="font-medium text-white mb-3">Attendees ({event.attendeeCount})</h4>
          <div className="flex flex-wrap gap-2">
            {event.rsvps
              .filter(rsvp => rsvp.response === 'yes')
              .slice(0, 12)
              .map((rsvp) => (
                <div key={rsvp.id} className="flex items-center space-x-2 bg-gray-800 rounded-lg p-2">
                  <Avatar
                    src={rsvp.user?.avatarUrl}
                    fallback={rsvp.user?.fullName?.[0]}
                    className="w-6 h-6"
                  />
                  <span className="text-sm text-white">{rsvp.user?.fullName}</span>
                </div>
              ))}

            {event.attendeeCount > 12 && (
              <div className="flex items-center justify-center bg-gray-800 rounded-lg p-2 min-w-16">
                <span className="text-sm text-gray-400">+{event.attendeeCount - 12}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </HiveModal>
  );
}

// Create Event Modal Component (simplified version)
function CreateEventModal({
  spaceId,
  isOpen,
  onClose,
  onEventCreated
}: {
  spaceId: string;
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: (event: EventWithDetails) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    startTime: '',
    endTime: '',
    isVirtual: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/spaces/${spaceId}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const newEvent = await response.json();
        onEventCreated(newEvent.data);
      }
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <HiveModal open={isOpen} onOpenChange={onClose} className="max-w-lg">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Create Event</h2>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Event Title</label>
          <HiveInput
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter event title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your event"
            rows={3}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-hive-gold focus:outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Start Time</label>
            <input
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-hive-gold focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">End Time</label>
            <input
              type="datetime-local"
              value={formData.endTime}
              onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-hive-gold focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Location</label>
          <HiveInput
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Event location or virtual link"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <HiveButton type="button" variant="secondary" onClick={onClose}>
            Cancel
          </HiveButton>
          <HiveButton type="submit" className="bg-hive-gold text-black hover:bg-yellow-400">
            Create Event
          </HiveButton>
        </div>
      </form>
    </HiveModal>
  );
}