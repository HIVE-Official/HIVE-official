'use client';

import React, { useState, useEffect } from 'react';
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
  Loader2,
  Video,
  Filter,
  ChevronRight
} from 'lucide-react';
import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';
import { cn } from '@/lib/utils';
import { useEvents, Event } from '@/hooks/use-events';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@hive/ui';
import type { Space } from '@/types';

interface EventsSurfaceConnectedProps {
  space: Space;
  maxEvents?: number;
  viewMode?: 'list' | 'calendar' | 'grid';
}

export function EventsSurfaceConnected({
  space,
  maxEvents = 10,
  viewMode = 'list'
}: EventsSurfaceConnectedProps) {
  const { user } = useAuth();
  const { events, isLoading, error, rsvpToEvent, cancelRsvp, createEvent } = useEvents({
    spaceId: space.id,
    userId: user?.id
  });
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  // Filter events
  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'going') return event.isAttending && event.rsvpStatus === 'going';
    if (filter === 'upcoming') return !isPast(new Date(event.startDate));
    if (filter === 'past') return isPast(new Date(event.startDate));
    return event.type === filter;
  }).slice(0, maxEvents);

  const handleRSVP = async (eventId: string, status: 'going' | 'interested' | 'not_going') => {
    try {
      await rsvpToEvent(eventId, status);
    } catch (error) {
      console.error('Failed to RSVP:', error);
    }
  };

  const handleCancelRSVP = async (eventId: string) => {
    try {
      await cancelRsvp(eventId);
    } catch (error) {
      console.error('Failed to cancel RSVP:', error);
    }
  };

  const getEventDateLabel = (date: Date | string) => {
    const eventDate = new Date(date);
    if (isToday(eventDate)) return 'Today';
    if (isTomorrow(eventDate)) return 'Tomorrow';
    if (isPast(eventDate)) return 'Past';
    return format(eventDate, 'MMM d');
  };

  const getEventTimeLabel = (startDate: Date | string, endDate?: Date | string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    if (end) {
      return `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
    }
    return format(start, 'h:mm a');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-white/60" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-white/60">
        <AlertCircle className="h-8 w-8 mx-auto mb-2" />
        <p>Failed to load events</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[var(--hive-brand-primary)]" />
          <h2 className="text-lg font-semibold text-white">Events</h2>
          <span className="text-sm text-white/60">({filteredEvents.length})</span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white"
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="going">Going</option>
            <option value="past">Past</option>
            <option value="study">Study Sessions</option>
            <option value="social">Social</option>
            <option value="career">Career</option>
          </select>

          {/* Create Event Button */}
          {space.role === 'admin' || space.role === 'moderator' ? (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--hive-brand-primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Create</span>
            </button>
          ) : null}
        </div>
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-xl">
          <Calendar className="h-12 w-12 mx-auto mb-3 text-white/40" />
          <p className="text-white/60 mb-1">No events yet</p>
          <p className="text-sm text-white/40">Be the first to create an event!</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Event Header */}
                    <div className="flex items-start gap-3">
                      <div className="text-center">
                        <div className="text-xs text-white/60 uppercase">
                          {getEventDateLabel(event.startDate)}
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {format(new Date(event.startDate), 'd')}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">
                          {event.title}
                        </h3>
                        
                        {/* Event Details */}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {getEventTimeLabel(event.startDate, event.endDate)}
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center gap-1">
                              {event.isOnline ? (
                                <Video className="h-3.5 w-3.5" />
                              ) : (
                                <MapPin className="h-3.5 w-3.5" />
                              )}
                              {event.location}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {event.attendeeCount} going
                            {event.maxAttendees && ` / ${event.maxAttendees}`}
                          </div>
                        </div>

                        {/* Tags */}
                        {event.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {event.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/80"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RSVP Status */}
                  <div className="ml-4">
                    {event.isAttending ? (
                      <div className="flex flex-col items-center gap-1">
                        {event.rsvpStatus === 'going' && (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span className="text-xs text-green-500">Going</span>
                          </>
                        )}
                        {event.rsvpStatus === 'interested' && (
                          <>
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                            <span className="text-xs text-yellow-500">Maybe</span>
                          </>
                        )}
                        {event.rsvpStatus === 'not_going' && (
                          <>
                            <XCircle className="h-5 w-5 text-red-500" />
                            <span className="text-xs text-red-500">Can't Go</span>
                          </>
                        )}
                      </div>
                    ) : (
                      <ChevronRight className="h-5 w-5 text-white/40" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRSVP={handleRSVP}
          onCancelRSVP={handleCancelRSVP}
        />
      )}

      {/* Create Event Modal */}
      {showCreateModal && (
        <CreateEventModal
          spaceId={space.id}
          spaceName={space.name}
          onClose={() => setShowCreateModal(false)}
          onCreate={createEvent}
        />
      )}
    </div>
  );
}

// Event Detail Modal Component
function EventDetailModal({
  event,
  onClose,
  onRSVP,
  onCancelRSVP
}: {
  event: Event;
  onClose: () => void;
  onRSVP: (eventId: string, status: 'going' | 'interested' | 'not_going') => void;
  onCancelRSVP: (eventId: string) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[var(--hive-background-primary)] rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
      >
        {/* Modal content here */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">{event.title}</h2>
          <p className="text-white/80 mb-6">{event.description}</p>
          
          {/* RSVP Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onRSVP(event.id, 'going')}
              className={cn(
                "flex-1 py-2 rounded-lg font-medium transition-all",
                event.rsvpStatus === 'going'
                  ? "bg-green-500 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              Going
            </button>
            <button
              onClick={() => onRSVP(event.id, 'interested')}
              className={cn(
                "flex-1 py-2 rounded-lg font-medium transition-all",
                event.rsvpStatus === 'interested'
                  ? "bg-yellow-500 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              Maybe
            </button>
            {event.isAttending && (
              <button
                onClick={() => onCancelRSVP(event.id)}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/30 transition-all"
              >
                Cancel
              </button>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="mt-4 w-full py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Create Event Modal Component
function CreateEventModal({
  spaceId,
  spaceName,
  onClose,
  onCreate
}: {
  spaceId: string;
  spaceName: string;
  onClose: () => void;
  onCreate: (data: any) => Promise<string>;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    isOnline: false,
    maxAttendees: '',
    type: 'general',
    tags: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = formData.endDate && formData.endTime 
      ? new Date(`${formData.endDate}T${formData.endTime}`)
      : undefined;

    try {
      await onCreate({
        title: formData.title,
        description: formData.description,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime?.toISOString(),
        location: formData.location,
        isOnline: formData.isOnline,
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined,
        type: formData.type as any,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        spaceId,
        spaceName
      });
      onClose();
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[var(--hive-background-primary)] rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-white">Create Event</h2>
          
          <input
            type="text"
            placeholder="Event Title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40"
            required
          />
          
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 min-h-[100px]"
          />
          
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              required
            />
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              required
            />
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 py-2 bg-[var(--hive-brand-primary)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Create Event
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}