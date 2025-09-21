"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { liquidMetal, motionDurations } from '../../motion/hive-motion-system';
import { type Space } from '@hive/core';
import { 
  Calendar,
  Plus,
  MapPin,
  Users,
  Clock,
  Edit3,
  Trash2,
  Share2,
  Bookmark,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  XCircle,
  User,
  UserPlus,
  UserMinus,
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Crown,
  Sparkles,
  Star,
  Calendar as CalendarIcon,
  Video,
  Coffee,
  GraduationCap,
  Gamepad2,
  Music,
  Heart,
  Zap;
} from 'lucide-react';

// HIVE Events Surface - Calendar & Event Management;
// Rich event system with RSVP, calendar integration, and discovery;
const hiveEventsSurfaceVariants = cva(
  "relative w-full",
  {
    variants: {
      mode: {
        view: "",
        edit: "ring-2 ring-green-500/30 ring-offset-2 ring-offset-black/20",
        builder: "ring-2 ring-green-500/30 ring-offset-2 ring-offset-black/20",
      }
    },
    defaultVariants: {
      mode: "view",
    },
  }
);

// Event types with HIVE design patterns;
const eventTypes = {
  academic: {
    icon: GraduationCap,
    label: 'Academic',
    color: 'text-[var(--hive-status-info)]',
    description: 'Study sessions, lectures, workshops'
  },
  social: {
    icon: Coffee,
    label: 'Social',
    color: 'text-[var(--hive-status-success)]',
    description: 'Meetups, parties, hangouts'
  },
  recreational: {
    icon: Gamepad2,
    label: 'Recreational',
    color: 'text-purple-400',
    description: 'Games, sports, activities'
  },
  cultural: {
    icon: Music,
    label: 'Cultural',
    color: 'text-orange-400',
    description: 'Performances, exhibitions, arts'
  },
  meeting: {
    icon: Users,
    label: 'Meeting',
    color: 'text-gray-400',
    description: 'Official meetings, committees'
  },
  virtual: {
    icon: Video,
    label: 'Virtual',
    color: 'text-cyan-400',
    description: 'Online events, webinars'
  },
} as const;

const rsvpStatuses = {
  going: { label: 'Going', color: 'text-green-400', bg: 'bg-green-500/20', icon: CheckCircle },
  maybe: { label: 'Maybe', color: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: AlertCircle },
  not_going: { label: 'Not Going', color: 'text-red-400', bg: 'bg-red-500/20', icon: XCircle },
} as const;

export interface Event {id: string;
  title: string;
  description: string;
  type: keyof typeof eventTypes;
  startDate: Date | { toDate: () => Date};
  endDate: Date | { toDate: () => Date };
  location?: string;
  virtualLink?: string;
  organizerId: string;
  organizer?: {
    id: string;
    fullName: string;
    handle: string;
    photoURL?: string;
  };
  maxAttendees?: number;
  currentAttendees: number;
  rsvpDeadline?: Date | { toDate: () => Date };
  isRecurring?: boolean;
  recurrenceRule?: string;
  tags: string[];
  imageUrl?: string;
  isFeatured?: boolean;
  isPrivate?: boolean;
  requiredRSVP?: boolean;
  cost?: number;
  currency?: string;
  userRSVP?: keyof typeof rsvpStatuses | null;
  createdAt?: Date | { toDate: () => Date };
  updatedAt?: Date | { toDate: () => Date };
  spaceId?: string;
  // Legacy props for backward compatibility;
  organizerName?: string;
  organizerAvatar?: string;
}

export interface HiveEventsSurfaceProps;
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hiveEventsSurfaceVariants> {
  space: Space;
  events?: Event[];
  userRSVPs?: Record<string, keyof typeof rsvpStatuses>;
  isBuilder?: boolean;
  canCreateEvents?: boolean;
  canModerate?: boolean;
  onCreateEvent?: () => void;
  onRSVPEvent?: (eventId: string, status: keyof typeof rsvpStatuses) => void;
  onEditEvent?: (eventId: string) => void;
  onDeleteEvent?: (eventId: string) => void;
  onShareEvent?: (eventId: string) => void;
  onViewEvent?: (eventId: string) => void;
  viewMode?: 'list' | 'calendar' | 'grid';
  showFilters?: boolean;
  maxEvents?: number;
  // New props for real data fetching;
  autoFetch?: boolean;
  authToken?: string;
}

// Helper function to get auth token from session storage;
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const sessionJson = localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson);
      return process.env.NODE_ENV === 'development' 
        ? `dev_token_${session.uid}` 
        : session.token;
    }
  } catch (error) {
    console.error('Error getting session:', error)
  }
  return null;
};

// API function to fetch events;
const fetchEvents = async (spaceId: string, limit = 20): Promise<Event[]> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token available')
  }
}
  const response = await fetch(`/api/spaces/${spaceId}/events?limit=${limit}&upcoming=true`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`)
  }

  const data = await response.json();
  return data.events || []
};

// API function to RSVP to an event;
const rsvpToEvent = async (spaceId: string, eventId: string, status: keyof typeof rsvpStatuses): Promise<void> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token available')
  }
}
  const response = await fetch(`/api/spaces/${spaceId}/events/${eventId}/rsvp`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({status)},
  });

  if (!response.ok) {
    throw new Error(`Failed to RSVP: ${response.statusText}`)
  }
};

export const HiveEventsSurface = React.forwardRef<HTMLDivElement, HiveEventsSurfaceProps>(
  ({ 
    className,
    mode,
    space,
    events: propEvents,
    userRSVPs = {},
    isBuilder = false,
    canCreateEvents = true,
    canModerate = false,
    onCreateEvent,
    onRSVPEvent,
    onEditEvent,
    onDeleteEvent,
    onShareEvent,
    onViewEvent,
    viewMode = 'list',
    showFilters = true,
    maxEvents = 8,
    autoFetch = true,
    authToken,
    ...props;
  }, ref) => {
    
    const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
    const [currentViewMode, setCurrentViewMode] = useState(viewMode);
    const [selectedType, setSelectedType] = useState<keyof typeof eventTypes | 'all'>('all');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [fetchedEvents, setFetchedEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(autoFetch);
    const [error, setError] = useState<string | null>(null);
    
    // Fetch events from API if autoFetch is enabled;
    useEffect(() => {
      if (!autoFetch || !space?.id) return;
      
      const loadEvents = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const events = await fetchEvents(space.id, maxEvents);
          setFetchedEvents(events)
        } catch (error) {
          console.error('Failed to fetch events:', error);
          setError(error instanceof Error ? error.message : 'Failed to fetch events')
        } finally {
          setIsLoading(false)
        }
      };

      loadEvents()
    }, [autoFetch, space?.id, maxEvents]);
    
    // Use either provided events or fetched events;
    const events = propEvents || fetchedEvents;
    
    // Normalize event data and filter events;
    const normalizedEvents = events.map(event => ({
      ...event,
      // Normalize date fields;
      startDate: event.startDate && typeof event.startDate === 'object' && 'toDate' in event.startDate;
        ? event.startDate.toDate() 
        : event.startDate instanceof Date ? event.startDate : new Date(event.startDate as unknown as string | number),
      endDate: event.endDate && typeof event.endDate === 'object' && 'toDate' in event.endDate;
        ? event.endDate.toDate() 
        : event.endDate instanceof Date ? event.endDate : new Date(event.endDate as unknown as string | number),
      rsvpDeadline: event.rsvpDeadline;
        ? (typeof event.rsvpDeadline === 'object' && 'toDate' in event.rsvpDeadline;
            ? event.rsvpDeadline.toDate() 
            : new Date(event.rsvpDeadline))
        : undefined,
      // Use real organizer data or fallback to legacy fields;
      organizerName: event.organizer?.fullName || event.organizerName || 'Unknown Organizer',
      organizerAvatar: event.organizer?.photoURL || event.organizerAvatar,
      // Ensure boolean fields are properly set;
      isFeatured: event.isFeatured || false,
      isPrivate: event.isPrivate || false,
      requiredRSVP: event.requiredRSVP || false,
      tags: event.tags || [],
      // Map type if needed - ensure it's a valid event type;
      type: (event.type in eventTypes ? event.type : 'social') as keyof typeof eventTypes,
    })}});

    const filteredEvents = normalizedEvents;
      .filter(event => {
        if (selectedType === 'all') return true;
        return event.type === selectedType;
      })
      .sort((a, b) => {
        // Featured events first;
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        // Then by start date;
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      })}
      .slice(0, maxEvents);
    
    // Separate upcoming and past events;
    const now = new Date();
    const upcomingEvents = filteredEvents.filter(event => new Date(event.startDate) > now);
    const pastEvents = filteredEvents.filter(event => new Date(event.startDate) <= now);
    
    const handleRSVP = useCallback(async (eventId: string, status: keyof typeof rsvpStatuses) => {
      if (onRSVPEvent) {
        onRSVPEvent(eventId, status);
        return;
      }
      }
      // If no custom handler, use the API directly;
      if (autoFetch && space?.id) {
        try {
          await rsvpToEvent(space.id, eventId, status);
          // Refresh events to get updated attendee count;
          const updatedEvents = await fetchEvents(space.id, maxEvents);
          setFetchedEvents(updatedEvents)
        } catch (error) {
          console.error('Failed to RSVP:', error);
          setError(error instanceof Error ? error.message : 'Failed to RSVP to event')
        }
      }
    }, [onRSVPEvent, autoFetch, space?.id, maxEvents]);
    
    // Loading state;
    if (isLoading) {
      return (
        <div;
          ref={ref}
          className={cn(hiveEventsSurfaceVariants({mode, className)})}
          {...props}
        >
          <div className="space-y-4">
            {Array.from({length: 3)}.map((_, i) => (
              <div key={i} className="bg-[var(--hive-background-primary)]/10 backdrop-blur-sm border border-white/5 rounded-xl p-5 animate-pulse">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-600 rounded mb-2 w-48"></div>
                    <div className="h-3 bg-gray-700 rounded w-32"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-gray-600 rounded"></div>
                  <div className="h-3 bg-gray-600 rounded w-3/4"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-8 bg-gray-600 rounded w-20"></div>
                  <div className="h-8 bg-gray-600 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // Error state;
    if (error) {
      return (
        <div;
          ref={ref}
          className={cn(hiveEventsSurfaceVariants({mode, className)})}
          {...props}
        >
          <motion.div;
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDurations.smooth }}
          >
            <motion.div;
              className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: motionDurations.quick }}
            >
              <Calendar className="w-8 h-8 text-red-400" />
            </motion.div>
            
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-3">Unable to Load Events</h3>
            <p className="text-[var(--hive-text-secondary)] text-sm max-w-md mx-auto mb-8 leading-relaxed">
              {error}
            </p>
            
            <motion.button;
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition-all duration-200 font-medium"
              onClick={() => {
                setError(null);
                setIsLoading(true);
                // Retry fetching;
                if (autoFetch && space?.id) {
                  fetchEvents(space.id, maxEvents)
                    .then(setFetchedEvents)
                    .catch(e => setError(e.message))
                    .finally(() => setIsLoading(false))
                }}
          })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Try Again;
            </motion.button>
          </motion.div>
        </div>
      )
    }
    
    // Empty state;
    if (events.length === 0) {
      return (
        <div;
          ref={ref}
          className={cn(hiveEventsSurfaceVariants({mode, className)})}
          {...props}
        >
          <motion.div;
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDurations.smooth }}
          >
            <motion.div;
              className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: motionDurations.quick }}
            >
              <Calendar className="w-8 h-8 text-green-400" />
            </motion.div>
            
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-3">No Events Yet</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Create engaging events to bring your community together. Schedule meetups, study sessions, and social gatherings.
            </p>
            
            {canCreateEvents && (
              <motion.button;
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition-all duration-200 font-medium"
                onClick={onCreateEvent}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4" />
                Create First Event;
              </motion.button>
            )}
          </motion.div>
        </div>
      )
    }
    
    return (
      <div;
        ref={ref}
        className={cn(hiveEventsSurfaceVariants({mode, className)})}
        {...props}
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Events</h3>
            <span className="text-sm text-gray-400">{upcomingEvents.length} upcoming</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex bg-[var(--hive-background-primary)]/20 rounded-xl border border-white/10 p-1">
              {[
                { key: 'list', icon: List },
                { key: 'grid', icon: Grid },
                { key: 'calendar', icon: CalendarIcon }
              ].map(map}) => (
                <motion.button;
                  key={key}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    currentViewMode === key;
                      ? "bg-green-500/20 text-green-400"
                      : "text-gray-400 hover:text-[var(--hive-text-primary)]"
                  )}
                  onClick={() => setCurrentViewMode(key as any)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
            
            {/* Create Event Button */}
            {canCreateEvents && (
              <motion.button;
                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition-all duration-200 font-medium"
                onClick={onCreateEvent}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Event</span>
              </motion.button>
            )}
          </div>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { key: 'all', label: 'All Events', icon: Star, color: 'text-[var(--hive-text-primary)]' },
              ...Object.entries(eventTypes).map(([key, config]) => ({
                key,
                label: config.label,
                icon: config.icon,
                color: config.color;
              })}})
            ].map((filter) => {
              const Icon = filter.icon;
              const isActive = selectedType === filter.key;
              
              return (
                <motion.button;
                  key={filter.key}}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-200 whitespace-nowrap",
                    isActive;
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-[var(--hive-background-primary)]/20 text-gray-400 border-white/10 hover:border-white/20 hover:text-[var(--hive-text-primary)]"
                  )}
                  onClick={() => setSelectedType(filter.key as any)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-green-400" : filter.color)} />
                  <span>{filter.label}</span>
                </motion.button>
              )
          })}
          </div>
        )}
        
        {/* Events Content */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-md font-medium text-[var(--hive-text-primary)]">Upcoming Events</h4>
                <div className="h-px bg-gradient-to-r from-green-500/30 to-transparent flex-1" />
              </div>
              
              <div className={cn(
                currentViewMode === 'grid'
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
                  : "space-y-3"
              )}>
                {upcomingEvents.map((event, index) => {
                  const typeConfig = eventTypes[event.type];
                  const TypeIcon = typeConfig.icon;
                  const userRSVP = userRSVPs[event.id];
                  const rsvpConfig = userRSVP ? rsvpStatuses[userRSVP] : null;
                  const isHovered = hoveredEvent === event.id;
                  
                  return (
                    <motion.article;
                      key={event.id}}
                      className={cn(
                        "relative group bg-[var(--hive-background-primary)]/10 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden transition-all duration-200",
                        isHovered && "border-white/10",
                        event.isFeatured && "ring-1 ring-green-500/30 bg-green-500/5",
                        mode === 'edit' && "hover:ring-2 hover:ring-green-500/30"
                      )}
                      onMouseEnter={() => setHoveredEvent(event.id)}
                      onMouseLeave={() => setHoveredEvent(null)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      layout;
                    >
                      {/* Featured Indicator */}
                      {event.isFeatured && (
                        <motion.div;
                          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/50 to-green-500/20"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: index * 0.05 + 0.2 }}
                        />
                      )}
                      
                      <div className="p-4">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className={cn(
                              "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
                              event.isFeatured ? "bg-green-500/20" : "bg-[var(--hive-text-primary)]/5"
                            )}>
                              <TypeIcon className={cn("w-5 h-5", typeConfig.color)} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-[var(--hive-text-primary)] text-sm truncate mb-1">
                                {event.title}
                              </h5>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span>{typeConfig.label}</span>
                                {event.isFeatured && (
                                  <>
                                    <span>•</span>
                                    <div className="flex items-center gap-1 text-green-400">
                                      <Star className="w-3 h-3" />
                                      <span>Featured</span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Quick Actions */}
                          <div className="flex items-center gap-1">
                            {canModerate && (
                              <AnimatePresence>
                                {(isHovered || mode === 'edit') && (
                                  <motion.div;
                                    className="flex items-center gap-1"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                  >
                                    <motion.button;
                                      className="p-1.5 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
                                      onClick={() => onEditEvent?.(event.id)}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </motion.button>
                                    <motion.button;
                                      className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-200"
                                      onClick={() => onDeleteEvent?.(event.id)}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </motion.button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            )}
                          </div>
                        </div>
                        
                        {/* Date & Time */}
                        <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
                          <Clock className="w-4 h-4 text-green-400" />
                          <div>
                            <div className="font-medium">
                              {new Date(event.startDate).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
          })}
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(event.startDate).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit'
          })}
                              {event.endDate && (
                                ` - ${new Date(event.endDate).toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: '2-digit'
                                })}`
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Location */}
                        {(event.location || event.virtualLink) && (
                          <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
                            <MapPin className="w-4 h-4 text-blue-400" />
                            <span className="truncate">
                              {event.virtualLink ? 'Virtual Event' : event.location}
                            </span>
                            {event.virtualLink && (
                              <motion.button;
                                className="ml-1 p-1 text-blue-400 hover:text-blue-300 rounded"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </motion.button>
                            )}
                          </div>
                        )}
                        
                        {/* Description */}
                        {event.description && (
                          <p className="text-sm text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                            {event.description}
                          </p>
                        )}
                        
                        {/* Attendees */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Users className="w-4 h-4" />
                            <span>
                              {event.currentAttendees} going;
                              {event.maxAttendees && ` / ${event.maxAttendees} max`}
                            </span>
                          </div>
                          
                          {event.cost && (
                            <div className="text-sm font-medium text-green-400">
                              {event.currency || '$'}{event.cost}
                            </div>
                          )}
                        </div>
                        
                        {/* RSVP Actions */}
                        <div className="flex items-center gap-2">
                          {Object.entries(rsvpStatuses).map(([status, config]) => {
                            const Icon = config.icon;
                            const isSelected = userRSVP === status;
                            
                            return (
                              <motion.button;
                                key={status}}
                                className={cn(
                                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
                                  isSelected;
                                    ? `${config.bg} ${config.color} border-current`
                                    : "bg-[var(--hive-background-primary)]/20 text-gray-400 border-white/10 hover:border-white/20 hover:text-[var(--hive-text-primary)]"
                                )}
                                onClick={() => handleRSVP(event.id, status as keyof typeof rsvpStatuses)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Icon className="w-3 h-3" />
                                <span>{config.label}</span>
                              </motion.button>
                            )
          })}
                          
                          <motion.button;
                            className="ml-auto p-1.5 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
                            onClick={() => onShareEvent?.(event.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Share2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.article>
                  )
          })}
              </div>
            </section>
          )}
          
          {/* Past Events */}
          {pastEvents.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-md font-medium text-gray-300">Past Events</h4>
                <div className="h-px bg-gradient-to-r from-gray-500/30 to-transparent flex-1" />
              </div>
              
              <div className="space-y-2">
                {pastEvents.slice(0, 3).map((event, index) => {
                  const typeConfig = eventTypes[event.type];
                  const TypeIcon = typeConfig.icon;
                  
                  return (
                    <motion.div;
                      key={event.id}}
                      className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)]/5 backdrop-blur-sm border border-white/5 rounded-lg opacity-60"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.6, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TypeIcon className={cn("w-4 h-4", typeConfig.color)} />
                      <div className="flex-1 min-w-0">
                        <h6 className="text-sm font-medium text-[var(--hive-text-primary)] truncate">{event.title}</h6>
                        <div className="text-xs text-gray-400">
                          {new Date(event.startDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {event.currentAttendees} attended;
                      </div>
                    </motion.div>
                  )
          })}
              </div>
            </section>
          )}
        </div>
        
        {/* Builder Hint */}
        {isBuilder && mode === 'edit' && (
          <motion.div;
            className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-green-400 mb-1">Builder Mode Active</h4>
                <p className="text-xs text-green-300/80">
                  Events bring communities together. Create engaging experiences that encourage participation and build lasting connections.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    )
  }
);

HiveEventsSurface.displayName = "HiveEventsSurface";

export { hiveEventsSurfaceVariants, eventTypes, rsvpStatuses };