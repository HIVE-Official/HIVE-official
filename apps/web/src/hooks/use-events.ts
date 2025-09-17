'use client';

import { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';

import { useToast } from './use-toast';
import { authenticatedFetch } from '@/lib/authenticated-fetch';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date | string;
  endDate?: Date | string;
  location?: string;
  type: 'general' | 'study' | 'social' | 'career' | 'workshop';
  isOnline: boolean;
  maxAttendees?: number;
  attendeeCount: number;
  coverImage?: string;
  tags: string[];
  isPublic: boolean;
  organizerId: string;
  organizerName: string;
  organizerImage?: string;
  spaceId?: string;
  spaceName?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  // Client-side properties
  isAttending?: boolean;
  rsvpStatus?: 'going' | 'interested' | 'not_going';
}

export interface CreateEventData {
  title: string;
  description?: string;
  startDate: Date | string;
  endDate?: Date | string;
  location?: string;
  type?: 'general' | 'study' | 'social' | 'career' | 'workshop';
  isOnline?: boolean;
  maxAttendees?: number;
  coverImage?: string;
  tags?: string[];
  isPublic?: boolean;
  spaceId?: string;
  spaceName?: string;
}

export interface EventFilters {
  spaceId?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  userId?: string;
}

export function useEvents(filters?: EventFilters) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch events
  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters?.spaceId) params.append('spaceId', filters.spaceId);
      if (filters?.type) params.append('type', filters.type);
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);
      if (filters?.userId) params.append('userId', filters.userId);

      const response = await authenticatedFetch(`/api/events?${params}`);
      if (!response.ok) throw new Error('Failed to fetch events');
      
      const data = await response.json();
      setEvents(data.events);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch events';
      setError(message);
      logger.error('Error fetching events:', { error: String(err) });
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Create event
  const createEvent = useCallback(async (eventData: CreateEventData) => {
    try {
      const response = await authenticatedFetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) throw new Error('Failed to create event');
      
      const result = await response.json();
      
      toast({
        title: 'Event Created',
        description: 'Your event has been created successfully',
      });

      // Refresh events list
      await fetchEvents();
      
      return result.eventId;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create event';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw err;
    }
  }, [fetchEvents, toast]);

  // RSVP to event
  const rsvpToEvent = useCallback(async (
    eventId: string, 
    status: 'going' | 'interested' | 'not_going'
  ) => {
    try {
      const response = await authenticatedFetch(`/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to RSVP');
      
      const result = await response.json();
      
      // Update local event state
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, isAttending: true, rsvpStatus: status }
          : event
      ));

      toast({
        title: 'RSVP Updated',
        description: `You're ${status === 'going' ? 'going to' : status === 'interested' ? 'interested in' : 'not going to'} this event`,
      });

      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to RSVP';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw err;
    }
  }, [toast]);

  // Cancel RSVP
  const cancelRsvp = useCallback(async (eventId: string) => {
    try {
      const response = await authenticatedFetch(`/api/events/${eventId}/rsvp`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to cancel RSVP');
      
      // Update local event state
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, isAttending: false, rsvpStatus: undefined }
          : event
      ));

      toast({
        title: 'RSVP Cancelled',
        description: 'Your RSVP has been cancelled',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to cancel RSVP';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw err;
    }
  }, [toast]);

  // Get event attendees
  const getAttendees = useCallback(async (
    eventId: string,
    status?: 'going' | 'interested' | 'not_going'
  ) => {
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);

      const response = await authenticatedFetch(`/api/events/${eventId}/attendees?${params}`);
      if (!response.ok) throw new Error('Failed to fetch attendees');
      
      const data = await response.json();
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch attendees';
      logger.error('Error fetching attendees:', { error: String(err) });
      throw err;
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    isLoading,
    error,
    createEvent,
    rsvpToEvent,
    cancelRsvp,
    getAttendees,
    refreshEvents: fetchEvents,
  };
}

// Hook for single event
export function useEvent(eventId: string) {
  const [event, setEvent] = useState<Event | null>(null);
  const [attendees, setAttendees] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!eventId) return;

    const fetchEventDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch event details and attendees in parallel
        const [eventResponse, attendeesResponse] = await Promise.all([
          authenticatedFetch(`/api/events?eventId=${eventId}`),
          authenticatedFetch(`/api/events/${eventId}/attendees`)
        ]);

        if (!eventResponse.ok) throw new Error('Failed to fetch event');
        if (!attendeesResponse.ok) throw new Error('Failed to fetch attendees');

        const eventData = await eventResponse.json();
        const attendeesData = await attendeesResponse.json();

        setEvent(eventData.events[0] || null);
        setAttendees(attendeesData);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch event details';
        setError(message);
        logger.error('Error fetching event details:', { error: String(err) });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  return {
    event,
    attendees,
    isLoading,
    error,
  };
}