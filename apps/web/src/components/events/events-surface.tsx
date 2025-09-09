'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Filter,
  Search,
  ChevronRight,
  Heart,
  Share2,
  Bell,
  Ticket,
  CalendarDays,
  CalendarCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Button, Card, Badge, Input, Select } from '@hive/ui';
import { Avatar } from '@hive/ui';
import { useAuth } from '@/hooks/use-auth';
import { 
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  getDocs
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format, isAfter, isBefore, startOfDay, endOfDay, addDays } from 'date-fns';
import { EventCreationModal } from './event-creation-modal';
import { useRouter } from 'next/navigation';

interface Event {
  id: string;
  spaceId: string;
  spaceName: string;
  createdBy: string;
  creatorName: string;
  creatorAvatar?: string;
  title: string;
  description: string;
  type: string;
  startDateTime: any;
  endDateTime: any;
  location: string;
  locationDetails?: string;
  maxAttendees?: number;
  visibility: 'public' | 'space' | 'private';
  requiresRSVP: boolean;
  allowGuests: boolean;
  guestLimit: number;
  coverImage?: string;
  tags: string[];
  attendees: string[];
  attendeeCount: number;
  interested: string[];
  interestedCount: number;
  status: 'upcoming' | 'live' | 'ended' | 'cancelled';
  ticketed?: {
    enabled: boolean;
    price?: number;
    currency: string;
  };
  isRecurring?: boolean;
  parentEventId?: string;
  createdAt: any;
}

interface EventsSurfaceProps {
  spaceId: string;
  spaceName: string;
  canCreateEvents?: boolean;
}

export function EventsSurface({ spaceId, spaceName, canCreateEvents = false }: EventsSurfaceProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'my'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('grid');

  useEffect(() => {
    if (!spaceId) return;

    const eventsRef = collection(db, 'spaces', spaceId, 'events');
    const constraints = [];

    // Add filters based on active tab
    if (activeTab === 'upcoming') {
      constraints.push(where('startDateTime', '>=', new Date()));
    } else if (activeTab === 'past') {
      constraints.push(where('startDateTime', '<', new Date()));
    } else if (activeTab === 'my' && user) {
      constraints.push(where('attendees', 'array-contains', user.uid));
    }

    constraints.push(orderBy('startDateTime', activeTab === 'past' ? 'desc' : 'asc'));
    constraints.push(limit(50));

    const q = query(eventsRef, ...constraints);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Event));

      // Update event status based on current time
      const now = new Date();
      eventsData.forEach(event => {
        const start = event.startDateTime?.toDate?.() || new Date();
        const end = event.endDateTime?.toDate?.() || new Date();
        
        if (isBefore(end, now)) {
          event.status = 'ended';
        } else if (isAfter(start, now)) {
          event.status = 'upcoming';
        } else {
          event.status = 'live';
        }
      });

      setEvents(eventsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [spaceId, activeTab, user]);

  const handleRSVP = async (eventId: string, isAttending: boolean) => {
    if (!user) return;

    try {
      const eventRef = doc(db, 'spaces', spaceId, 'events', eventId);
      const event = events.find(e => e.id === eventId);
      if (!event) return;

      if (isAttending) {
        await updateDoc(eventRef, {
          attendees: arrayRemove(user.uid),
          attendeeCount: Math.max(0, event.attendeeCount - 1),
          interested: arrayUnion(user.uid),
          interestedCount: event.interestedCount + 1
        });
      } else {
        await updateDoc(eventRef, {
          attendees: arrayUnion(user.uid),
          attendeeCount: event.attendeeCount + 1,
          interested: arrayRemove(user.uid),
          interestedCount: Math.max(0, event.interestedCount - 1)
        });
      }
    } catch (error) {
      console.error('Error updating RSVP:', error);
    }
  };

  const handleInterested = async (eventId: string, isInterested: boolean) => {
    if (!user) return;

    try {
      const eventRef = doc(db, 'spaces', spaceId, 'events', eventId);
      const event = events.find(e => e.id === eventId);
      if (!event) return;

      if (isInterested) {
        await updateDoc(eventRef, {
          interested: arrayRemove(user.uid),
          interestedCount: Math.max(0, event.interestedCount - 1)
        });
      } else {
        await updateDoc(eventRef, {
          interested: arrayUnion(user.uid),
          interestedCount: event.interestedCount + 1
        });
      }
    } catch (error) {
      console.error('Error updating interested:', error);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesType;
  });

  const renderEventCard = (event: Event) => {
    const isAttending = user && event.attendees.includes(user.uid);
    const isInterested = user && event.interested.includes(user.uid);
    const startDate = event.startDateTime?.toDate?.() || new Date();
    const endDate = event.endDateTime?.toDate?.() || new Date();
    const isFull = event.maxAttendees && event.attendeeCount >= event.maxAttendees;

    return (
      <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        {event.coverImage && (
          <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${event.coverImage})` }}>
            <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <Badge variant={
                event.status === 'live' ? 'destructive' :
                event.status === 'ended' ? 'secondary' :
                'default'
              }>
                {event.status === 'live' ? '🔴 LIVE NOW' :
                 event.status === 'ended' ? 'Ended' :
                 format(startDate, 'MMM d')}
              </Badge>
            </div>
          </div>
        )}
        
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
            <p className="text-sm text-[var(--hive-text-secondary)] line-clamp-2 mt-1">
              {event.description}
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-[var(--hive-text-tertiary)]">
              <Clock className="h-4 w-4" />
              <span>{format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}</span>
            </div>
            
            <div className="flex items-center gap-2 text-[var(--hive-text-tertiary)]">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{event.location}</span>
            </div>

            <div className="flex items-center gap-2 text-[var(--hive-text-tertiary)]">
              <Users className="h-4 w-4" />
              <span>
                {event.attendeeCount} attending
                {event.maxAttendees && ` / ${event.maxAttendees}`}
                {isFull && <Badge variant="destructive" className="ml-2">FULL</Badge>}
              </span>
            </div>

            {event.ticketed?.enabled && (
              <div className="flex items-center gap-2 text-[var(--hive-text-tertiary)]">
                <Ticket className="h-4 w-4" />
                <span>
                  {event.ticketed.currency} {event.ticketed.price?.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Avatar
              src={event.creatorAvatar}
              alt={event.creatorName}
              size="xs"
              fallback={event.creatorName[0]?.toUpperCase()}
            />
            <span className="text-sm text-[var(--hive-text-tertiary)]">
              Hosted by {event.creatorName}
            </span>
          </div>

          {event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {event.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {event.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{event.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-2 border-t border-[var(--hive-border)]">
            {event.requiresRSVP && !isFull && (
              <Button
                size="sm"
                variant={isAttending ? 'default' : 'outline'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRSVP(event.id, isAttending);
                }}
                className="flex-1"
              >
                {isAttending ? (
                  <>
                    <CalendarCheck className="h-4 w-4 mr-1" />
                    Attending
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-1" />
                    RSVP
                  </>
                )}
              </Button>
            )}
            
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleInterested(event.id, isInterested);
              }}
              className={isInterested ? 'text-red-500' : ''}
            >
              <Heart className={`h-4 w-4 ${isInterested ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                // Share functionality
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  const renderCalendarView = () => {
    const today = startOfDay(new Date());
    const days = Array.from({ length: 7 }, (_, i) => addDays(today, i));

    return (
      <div className="bg-[var(--hive-background-secondary)] rounded-lg p-4">
        <div className="grid grid-cols-7 gap-2">
          {days.map(day => {
            const dayEvents = filteredEvents.filter(event => {
              const eventDate = startOfDay(event.startDateTime?.toDate?.() || new Date());
              return eventDate.getTime() === day.getTime();
            });

            return (
              <div key={day.toISOString()} className="min-h-[120px] p-2 bg-[var(--hive-background-primary)] rounded-lg">
                <div className="text-sm font-medium mb-2">
                  {format(day, 'EEE')}
                  <span className="block text-lg">{format(day, 'd')}</span>
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className="text-xs p-1 bg-[var(--hive-brand-primary)]/20 rounded cursor-pointer hover:bg-[var(--hive-brand-primary)]/30"
                      onClick={() => router.push(`/spaces/${spaceId}/events/${event.id}`)}
                    >
                      <p className="font-medium line-clamp-1">{event.title}</p>
                      <p className="text-[var(--hive-text-tertiary)]">
                        {format(event.startDateTime?.toDate?.() || new Date(), 'h:mm a')}
                      </p>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <p className="text-xs text-[var(--hive-text-tertiary)] text-center">
                      +{dayEvents.length - 3} more
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-brand-primary)]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Events</h2>
          <p className="text-sm text-[var(--hive-text-secondary)] mt-1">
            Discover and join events in {spaceName}
          </p>
        </div>
        {canCreateEvents && (
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        )}
      </div>

      {/* Tabs and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setActiveTab('upcoming')}
            size="sm"
          >
            <CalendarDays className="h-4 w-4 mr-1" />
            Upcoming
          </Button>
          <Button
            variant={activeTab === 'past' ? 'default' : 'outline'}
            onClick={() => setActiveTab('past')}
            size="sm"
          >
            <Clock className="h-4 w-4 mr-1" />
            Past
          </Button>
          {user && (
            <Button
              variant={activeTab === 'my' ? 'default' : 'outline'}
              onClick={() => setActiveTab('my')}
              size="sm"
            >
              <CalendarCheck className="h-4 w-4 mr-1" />
              My Events
            </Button>
          )}
        </div>

        <div className="flex gap-2 sm:ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--hive-text-tertiary)]" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <option value="all">All Types</option>
            <option value="party">Parties</option>
            <option value="study">Study Sessions</option>
            <option value="sports">Sports</option>
            <option value="social">Social</option>
            <option value="workshop">Workshops</option>
            <option value="meeting">Meetings</option>
          </Select>

          <Select value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
            <option value="grid">Grid</option>
            <option value="list">List</option>
            <option value="calendar">Calendar</option>
          </Select>
        </div>
      </div>

      {/* Events Display */}
      {filteredEvents.length === 0 ? (
        <Card className="p-12 text-center">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-[var(--hive-text-tertiary)] opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No events yet</h3>
          <p className="text-[var(--hive-text-secondary)] mb-4">
            {activeTab === 'my' 
              ? "You haven't joined any events yet"
              : "Be the first to create an event in this space"}
          </p>
          {canCreateEvents && activeTab !== 'my' && (
            <Button onClick={() => setShowCreateModal(true)}>
              <Sparkles className="h-4 w-4 mr-2" />
              Create First Event
            </Button>
          )}
        </Card>
      ) : viewMode === 'calendar' ? (
        renderCalendarView()
      ) : viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredEvents.map(event => (
            <Card key={event.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex gap-4">
                {event.coverImage && (
                  <div className="w-32 h-24 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${event.coverImage})` }} />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-sm text-[var(--hive-text-secondary)] mt-1">
                        {format(event.startDateTime?.toDate?.() || new Date(), 'EEEE, MMMM d • h:mm a')}
                      </p>
                    </div>
                    <Badge variant={
                      event.status === 'live' ? 'destructive' :
                      event.status === 'ended' ? 'secondary' :
                      'default'
                    }>
                      {event.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-[var(--hive-text-tertiary)]">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.attendeeCount} attending
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-[var(--hive-text-tertiary)] self-center" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map(renderEventCard)}
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateModal && (
        <EventCreationModal
          spaceId={spaceId}
          spaceName={spaceName}
          onClose={() => setShowCreateModal(false)}
          onEventCreated={(eventId) => {
            setShowCreateModal(false);
            router.push(`/spaces/${spaceId}/events/${eventId}`);
          }}
        />
      )}
    </div>
  );
}