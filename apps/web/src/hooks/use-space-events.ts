'use client';

import { useState, useEffect } from 'react';
import { logger } from '@hive/core/utils/logger';

import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUnifiedAuth } from '@hive/ui';
import type { SpaceEvent, EventType } from '@hive/ui';

interface UseSpaceEventsReturn {
  events: SpaceEvent[];
  loading: boolean;
  error: Error | null;
  createEvent: (eventData: Partial<SpaceEvent>) => Promise<void>;
  updateEvent: (eventId: string, updates: Partial<SpaceEvent>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  rsvpToEvent: (eventId: string, status: 'going' | 'interested' | 'not_going') => Promise<void>;
}

export function useSpaceEvents(spaceId: string | undefined): UseSpaceEventsReturn {
  const [events, setEvents] = useState<SpaceEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useUnifiedAuth();

  // Subscribe to real-time events
  useEffect(() => {
    if (!spaceId) {
      setEvents([]);
      setLoading(false);
      return;
    }

    const eventsRef = collection(db, 'spaces', spaceId, 'events');
    const q = query(
      eventsRef,
      orderBy('startDate', 'asc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: any) => {
        const eventsData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || '',
            description: data.description || '',
            type: (data.type as EventType) || 'social',
            startDate: data.startDate?.toDate?.() || new Date(),
            endDate: data.endDate?.toDate?.() || null,
            location: data.location || '',
            virtualLink: data.virtualLink || null,
            capacity: data.capacity || null,
            organizer: data.organizer || {
              id: data.organizerId || '',
              name: data.organizerName || 'Unknown',
              avatar: data.organizerAvatar || null
            },
            attendees: data.attendees || [],
            coverImage: data.coverImage || null,
            tags: data.tags || [],
            isRecurring: data.isRecurring || false,
            recurringPattern: data.recurringPattern || null,
            status: data.status || 'upcoming',
            visibility: data.visibility || 'public',
            registrationRequired: data.registrationRequired || false,
            registrationDeadline: data.registrationDeadline?.toDate?.() || null,
            cost: data.cost || null,
            attachments: data.attachments || []
          } as SpaceEvent;
        });
        
        setEvents(eventsData);
        setLoading(false);
        setError(null);
      },
      (err: any) => {
        logger.error('Error fetching events:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [spaceId]);

  const createEvent = async (eventData: Partial<SpaceEvent>): Promise<void> => {
    if (!spaceId || !user) {
      throw new Error('Space ID and user required to create event');
    }

    try {
      const eventsRef = collection(db, 'spaces', spaceId, 'events');
      await addDoc(eventsRef, {
        ...eventData,
        organizerId: user.uid,
        organizerName: user.displayName || 'Anonymous',
        organizerAvatar: user.photoURL || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        attendees: [],
        status: 'upcoming'
      });
    } catch (err) {
      logger.error('Error creating event:', err);
      throw err;
    }
  };

  const updateEvent = async (eventId: string, updates: Partial<SpaceEvent>): Promise<void> => {
    if (!spaceId) {
      throw new Error('Space ID required to update event');
    }

    try {
      const eventRef = doc(db, 'spaces', spaceId, 'events', eventId);
      await updateDoc(eventRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      logger.error('Error updating event:', err);
      throw err;
    }
  };

  const deleteEvent = async (eventId: string): Promise<void> => {
    if (!spaceId) {
      throw new Error('Space ID required to delete event');
    }

    try {
      const eventRef = doc(db, 'spaces', spaceId, 'events', eventId);
      await deleteDoc(eventRef);
    } catch (err) {
      logger.error('Error deleting event:', err);
      throw err;
    }
  };

  const rsvpToEvent = async (eventId: string, status: 'going' | 'interested' | 'not_going'): Promise<void> => {
    if (!spaceId || !user) {
      throw new Error('Space ID and user required to RSVP');
    }

    try {
      const eventRef = doc(db, 'spaces', spaceId, 'events', eventId);
      const event = events.find(e => e.id === eventId);
      
      if (!event) {
        throw new Error('Event not found');
      }

      // Remove user from all RSVP lists
      const updatedAttendees = event.attendees.filter(a => a.userId !== user.uid);
      
      // Add user to appropriate list if not "not_going"
      if (status !== 'not_going') {
        updatedAttendees.push({
          userId: user.uid,
          name: user.displayName || 'Anonymous',
          avatar: user.photoURL || null,
          status,
          rsvpAt: new Date()
        });
      }

      await updateDoc(eventRef, {
        attendees: updatedAttendees,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      logger.error('Error updating RSVP:', err);
      throw err;
    }
  };

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    rsvpToEvent
  };
}