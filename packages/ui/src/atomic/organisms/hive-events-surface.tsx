'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Plus, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  Settings,
  TrendingUp,
  Activity,
  Filter
} from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Space } from '../../types';

export type EventType = 'meeting' | 'social' | 'academic' | 'service' | 'other';
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
export type RSVPStatus = 'yes' | 'no' | 'maybe';

export interface EventRSVP {
  userId: string;
  userName: string;
  status: RSVPStatus;
  timestamp: Date;
}

export interface SpaceEvent {
  id: string;
  title: string;
  description: string;
  type: EventType;
  status: EventStatus;
  startDate: Date;
  endDate?: Date;
  location?: string;
  capacity?: number;
  isVirtual?: boolean;
  virtualLink?: string;
  
  // Organization
  organizer: {
    id: string;
    name: string;
    role?: string;
  };
  
  // RSVP tracking
  rsvps: EventRSVP[];
  requiresRSVP: boolean;
  rsvpDeadline?: Date;
  
  // Metadata
  createdAt: Date;
  tags?: string[];
}

export interface HiveEventsSurfaceProps {
  space: Space;
  events?: SpaceEvent[];
  maxEvents?: number;
  canCreateEvents?: boolean;
  canModerate?: boolean;
  leaderMode?: 'configure' | 'moderate' | 'insights' | null;
  viewMode?: 'list' | 'calendar' | 'grid';
  
  // Event handlers
  onCreateEvent?: () => void;
  onRSVPEvent?: (eventId: string, status: RSVPStatus) => void;
  onEditEvent?: (eventId: string) => void;
  onCancelEvent?: (eventId: string) => void;
}

export const HiveEventsSurface: React.FC<HiveEventsSurfaceProps> = ({
  space,
  events = [],
  maxEvents,
  canCreateEvents = false,
  canModerate = false,
  leaderMode,
  viewMode = 'list',
  onCreateEvent,
  onRSVPEvent,
  onEditEvent,
  onCancelEvent
}) => {
  const [filter, setFilter] = useState<EventType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<EventStatus | 'all'>('upcoming');

  const filteredEvents = useMemo(() => {
    let filtered = events.filter(event => {
      const matchesType = filter === 'all' || event.type === filter;
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
      return matchesType && matchesStatus;
    });

    // Sort by start date
    filtered.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    if (maxEvents) {
      filtered = filtered.slice(0, maxEvents);
    }

    return filtered;
  }, [events, filter, statusFilter, maxEvents]);

  const getEventTypeIcon = (type: EventType) => {
    switch (type) {
      case 'meeting': return <Users className="h-4 w-4" />;
      case 'academic': return <Eye className="h-4 w-4" />;
      case 'social': return <Activity className="h-4 w-4" />;
      case 'service': return <CheckCircle2 className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventTypeColor = (type: EventType) => {
    switch (type) {
      case 'meeting': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'academic': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'social': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'service': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusBadge = (status: EventStatus, startDate: Date) => {
    const isNow = Date.now() >= startDate.getTime() && Date.now() <= (startDate.getTime() + 3 * 60 * 60 * 1000);
    
    if (isNow && status === 'upcoming') {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full border bg-green-500/20 text-green-400 border-green-500/30">
          Live Now
        </span>
      );
    }

    switch (status) {
      case 'upcoming':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full border bg-blue-500/20 text-blue-400 border-blue-500/30">
            Upcoming
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full border bg-gray-500/20 text-gray-400 border-gray-500/30">
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full border bg-red-500/20 text-red-400 border-red-500/30">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const formatEventTime = (startDate: Date, endDate?: Date) => {
    const start = startDate.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });

    if (endDate) {
      const end = endDate.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      });
      return `${start} - ${end}`;
    }

    return start;
  };

  const getTimeUntilEvent = (startDate: Date) => {
    const diff = startDate.getTime() - Date.now();
    if (diff < 0) return null;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `in ${days}d`;
    if (hours > 0) return `in ${hours}h`;
    
    const minutes = Math.floor(diff / (1000 * 60));
    return `in ${minutes}m`;
  };

  const eventStats = useMemo(() => {
    return {
      total: events.length,
      upcoming: events.filter(e => e.status === 'upcoming').length,
      thisWeek: events.filter(e => 
        e.startDate.getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000 && 
        e.startDate.getTime() > Date.now()
      ).length
    };
  }, [events]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
            <h3 className="font-semibold text-[var(--hive-text-inverse)]">
              Events
            </h3>
            <span className="text-sm text-neutral-400">({eventStats.upcoming} upcoming)</span>
          </div>

          {leaderMode === 'insights' && (
            <div className="flex items-center gap-2 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <TrendingUp className="h-3 w-3 text-purple-400" />
              <span className="text-xs text-purple-400">Analytics Active</span>
            </div>
          )}
        </div>

        {canCreateEvents && (
          <button
            onClick={onCreateEvent}
            className="flex items-center gap-2 px-3 py-2 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm">Create Event</span>
          </button>
        )}
      </div>

      {/* Stats (Insights Mode) */}
      {leaderMode === 'insights' && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
            <div className="text-lg font-bold text-purple-400">{eventStats.total}</div>
            <div className="text-xs text-neutral-400">Total Events</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <div className="text-lg font-bold text-blue-400">{eventStats.upcoming}</div>
            <div className="text-xs text-neutral-400">Upcoming</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <div className="text-lg font-bold text-green-400">{eventStats.thisWeek}</div>
            <div className="text-xs text-neutral-400">This Week</div>
          </div>
        </div>
      )}

      {/* Filters */}
      {events.length > 3 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="h-4 w-4 text-neutral-400 flex-shrink-0" />
          
          {/* Type Filter */}
          <select
            value={filter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value as EventType | 'all')}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
          >
            <option value="all">All Types</option>
            <option value="meeting">Meetings</option>
            <option value="academic">Academic</option>
            <option value="social">Social</option>
            <option value="service">Service</option>
            <option value="other">Other</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as EventStatus | 'all')}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 hover:bg-white/[0.05] transition-colors",
                leaderMode === 'insights' && "border-purple-500/20 bg-purple-500/5",
                event.status === 'cancelled' && "opacity-75"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-[var(--hive-text-inverse)] truncate">
                      {event.title}
                    </h4>
                    
                    {/* Event Type Badge */}
                    <span className={cn(
                      "px-2 py-0.5 text-xs font-medium rounded-full border capitalize flex items-center gap-1",
                      getEventTypeColor(event.type)
                    )}>
                      {getEventTypeIcon(event.type)}
                      {event.type}
                    </span>

                    {getStatusBadge(event.status, event.startDate)}
                  </div>

                  <p className="text-sm text-neutral-300 mb-3 line-clamp-2">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-1 text-xs text-neutral-400">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{formatEventTime(event.startDate, event.endDate)}</span>
                      {getTimeUntilEvent(event.startDate) && (
                        <span className="text-[var(--hive-brand-secondary)]">
                          {getTimeUntilEvent(event.startDate)}
                        </span>
                      )}
                    </div>
                    
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                        {event.isVirtual && (
                          <span className="text-blue-400">(Virtual)</span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>Organized by {event.organizer.name}</span>
                    </div>

                    {/* Tags */}
                    {event.tags && event.tags.length > 0 && (
                      <div className="flex items-center gap-1 mt-2">
                        {event.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-white/10 text-neutral-300 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {canModerate && (
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => onEditEvent?.(event.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Edit event"
                    >
                      <Settings className="h-4 w-4 text-neutral-400" />
                    </button>
                    
                    {event.status === 'upcoming' && (
                      <button
                        onClick={() => onCancelEvent?.(event.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Cancel event"
                      >
                        <XCircle className="h-4 w-4 text-red-400" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* RSVP Section */}
              {event.requiresRSVP && event.status === 'upcoming' && (
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4 text-xs text-neutral-400">
                      <span className="text-green-400">
                        {event.rsvps.filter(r => r.status === 'yes').length} going
                      </span>
                      <span className="text-yellow-400">
                        {event.rsvps.filter(r => r.status === 'maybe').length} maybe
                      </span>
                      {event.capacity && (
                        <span>
                          {event.capacity - event.rsvps.filter(r => r.status === 'yes').length} spots left
                        </span>
                      )}
                      {event.rsvpDeadline && (
                        <span className="text-red-400">
                          RSVP by {event.rsvpDeadline.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* RSVP Buttons */}
                  <div className="flex items-center gap-2">
                    {(['yes', 'maybe', 'no'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => onRSVPEvent?.(event.id, status)}
                        className={cn(
                          "px-3 py-1 text-xs rounded-full border transition-colors",
                          status === 'yes' && "bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20",
                          status === 'maybe' && "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20",
                          status === 'no' && "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                        )}
                      >
                        {status === 'yes' && <CheckCircle2 className="h-3 w-3 mr-1 inline" />}
                        {status === 'maybe' && <AlertCircle className="h-3 w-3 mr-1 inline" />}
                        {status === 'no' && <XCircle className="h-3 w-3 mr-1 inline" />}
                        {status === 'yes' ? 'Going' : status === 'maybe' ? 'Maybe' : 'Not Going'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredEvents.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-neutral-400 opacity-50" />
            <p className="text-neutral-400">No events found</p>
            <p className="text-sm text-neutral-500 mt-1">
              {canCreateEvents ? 'Create your first event!' : 'Check back soon for upcoming events'}
            </p>
          </div>
        )}
      </div>

      {/* Show More Button */}
      {maxEvents && events.length > maxEvents && (
        <div className="text-center pt-4">
          <button className="text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]/80 transition-colors text-sm font-medium">
            View all {events.length} events
          </button>
        </div>
      )}
    </div>
  );
};

export default HiveEventsSurface;