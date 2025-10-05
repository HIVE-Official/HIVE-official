"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Badge, Input, Textarea } from '@hive/ui';
import { useAuth } from '@hive/auth-logic';
import { db } from '@hive/core';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  type: 'class' | 'study' | 'social' | 'work' | 'personal';
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    until?: Date;
  };
  spaceId?: string;
  spaceName?: string;
  isPrivate: boolean;
  attendees?: string[];
  createdBy: string;
}

interface TimeBlock {
  hour: number;
  events: CalendarEvent[];
  isFreeTime: boolean;
}

export default function CalendarPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [loading, setLoading] = useState(true);

  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    type: 'personal' as CalendarEvent['type'],
    isPrivate: false
  });

  // Load calendar events
  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const eventsRef = collection(db, 'users', user.id, 'calendar');
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    const q = query(
      eventsRef,
      where('startTime', '>=', Timestamp.fromDate(startOfWeek)),
      where('startTime', '<=', Timestamp.fromDate(endOfWeek)),
      orderBy('startTime', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData: CalendarEvent[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        eventsData.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          startTime: data.startTime.toDate(),
          endTime: data.endTime.toDate(),
          location: data.location,
          type: data.type,
          recurring: data.recurring,
          spaceId: data.spaceId,
          spaceName: data.spaceName,
          isPrivate: data.isPrivate || false,
          attendees: data.attendees,
          createdBy: data.createdBy
        });
      });
      setEvents(eventsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, currentDate, router]);

  // Create new event
  const createEvent = async () => {
    if (!user || !newEvent.title || !newEvent.startTime || !newEvent.endTime) return;

    try {
      const eventRef = doc(collection(db, 'users', user.id, 'calendar'));
      await setDoc(eventRef, {
        ...newEvent,
        startTime: Timestamp.fromDate(new Date(newEvent.startTime)),
        endTime: Timestamp.fromDate(new Date(newEvent.endTime)),
        createdBy: user.id,
        createdAt: serverTimestamp(),
        campusId: 'ub-buffalo'
      });

      setShowAddEvent(false);
      setNewEvent({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        location: '',
        type: 'personal',
        isPrivate: false
      });
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  // Delete event
  const deleteEvent = async (eventId: string) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'users', user.id, 'calendar', eventId));
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  // Get events for a specific day
  const getEventsForDay = (date: Date): CalendarEvent[] => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Get free time blocks
  const getFreeTimeBlocks = (date: Date): TimeBlock[] => {
    const dayEvents = getEventsForDay(date);
    const blocks: TimeBlock[] = [];

    for (let hour = 8; hour < 22; hour++) {
      const hourEvents = dayEvents.filter(event => {
        const eventHour = new Date(event.startTime).getHours();
        return eventHour === hour;
      });

      blocks.push({
        hour,
        events: hourEvents,
        isFreeTime: hourEvents.length === 0
      });
    }

    return blocks;
  };

  // Navigate dates
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  // Get type color
  const getTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'class': return 'bg-blue-500';
      case 'study': return 'bg-green-500';
      case 'social': return 'bg-purple-500';
      case 'work': return 'bg-orange-500';
      case 'personal': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading calendar...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Calendar</h1>
            <p className="text-gray-400">Manage your schedule and find free time</p>
          </div>
          <Button
            onClick={() => setShowAddEvent(!showAddEvent)}
            className="bg-[var(--hive-brand-primary)] text-black hover:bg-[var(--hive-brand-primary)]/90"
          >
            + Add Event
          </Button>
        </div>

        {/* Add Event Form */}
        {showAddEvent && (
          <Card className="mb-6 p-6 bg-gray-900 border-white/8">
            <h3 className="text-lg font-semibold mb-4">Add New Event</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Event title"
                value={newEvent.title}
                onChange={(e: React.ChangeEvent) => setNewEvent({ ...newEvent, title: (e.target as any).value })}
                className="bg-black border-white/20"
              />
              <select
                value={newEvent.type}
                onChange={(e: React.ChangeEvent) => setNewEvent({ ...newEvent, type: (e.target as any).value as CalendarEvent['type'] })}
                className="px-3 py-2 bg-black border border-white/20 rounded-lg"
              >
                <option value="personal">Personal</option>
                <option value="class">Class</option>
                <option value="study">Study</option>
                <option value="social">Social</option>
                <option value="work">Work</option>
              </select>
              <Input
                type="datetime-local"
                placeholder="Start time"
                value={newEvent.startTime}
                onChange={(e: React.ChangeEvent) => setNewEvent({ ...newEvent, startTime: (e.target as any).value })}
                className="bg-black border-white/20"
              />
              <Input
                type="datetime-local"
                placeholder="End time"
                value={newEvent.endTime}
                onChange={(e: React.ChangeEvent) => setNewEvent({ ...newEvent, endTime: (e.target as any).value })}
                className="bg-black border-white/20"
              />
              <Input
                placeholder="Location (optional)"
                value={newEvent.location}
                onChange={(e: React.ChangeEvent) => setNewEvent({ ...newEvent, location: (e.target as any).value })}
                className="bg-black border-white/20"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newEvent.isPrivate}
                  onChange={(e: React.ChangeEvent) => setNewEvent({ ...newEvent, isPrivate: e.target.checked })}
                  className="rounded border-white/20"
                />
                <label className="text-sm">Private event</label>
              </div>
            </div>
            <Textarea
              placeholder="Description (optional)"
              value={newEvent.description}
              onChange={(e: React.ChangeEvent) => setNewEvent({ ...newEvent, description: (e.target as any).value })}
              className="mt-4 bg-black border-white/20"
              rows={3}
            />
            <div className="flex gap-2 mt-4">
              <Button
                onClick={createEvent}
                className="bg-[var(--hive-brand-primary)] text-black hover:bg-[var(--hive-brand-primary)]/90"
              >
                Create Event
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddEvent(false)}
                className="border-white/20"
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Calendar Navigation */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigateDate('prev')}
              className="border-white/20"
            >
              ← Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentDate(new Date())}
              className="border-white/20"
            >
              Today
            </Button>
            <Button
              variant="outline"
              onClick={() => navigateDate('next')}
              className="border-white/20"
            >
              Next →
            </Button>
          </div>

          <h2 className="text-xl font-semibold">
            {currentDate.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
              ...(viewMode === 'day' && { day: 'numeric' })
            })}
          </h2>

          <div className="flex gap-2">
            <Button
              variant={viewMode === 'day' ? 'default' : 'outline'}
              onClick={() => setViewMode('day')}
              className={viewMode === 'day' ? 'bg-[var(--hive-brand-primary)] text-black' : 'border-white/20'}
              className="max-w-sm"
            >
              Day
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              onClick={() => setViewMode('week')}
              className={viewMode === 'week' ? 'bg-[var(--hive-brand-primary)] text-black' : 'border-white/20'}
              className="max-w-sm"
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              onClick={() => setViewMode('month')}
              className={viewMode === 'month' ? 'bg-[var(--hive-brand-primary)] text-black' : 'border-white/20'}
              className="max-w-sm"
            >
              Month
            </Button>
          </div>
        </div>

        {/* Calendar View */}
        {viewMode === 'week' && (
          <div className="grid grid-cols-8 gap-2">
            {/* Time column */}
            <div className="space-y-2">
              <div className="h-12"></div>
              {Array.from({ length: 14 }, (_, i) => i + 8).map(hour => (
                <div key={hour} className="h-20 text-xs text-gray-400 text-right pr-2">
                  {hour > 12 ? `${hour - 12}PM` : `${hour}AM`}
                </div>
              ))}
            </div>

            {/* Days */}
            {Array.from({ length: 7 }, (_, i) => {
              const date = new Date(currentDate);
              date.setDate(date.getDate() - date.getDay() + i);
              const dayEvents = getEventsForDay(date);

              return (
                <div key={i} className="space-y-2">
                  <div className="h-12 text-center">
                    <div className="text-xs text-gray-400">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className={`text-lg font-semibold ${
                      date.toDateString() === new Date().toDateString() ? 'text-[var(--hive-brand-primary)]' : ''
                    }`}>
                      {date.getDate()}
                    </div>
                  </div>

                  {/* Hour blocks */}
                  {getFreeTimeBlocks(date).map((block) => (
                    <div
                      key={block.hour}
                      className={`h-20 border border-white/8 rounded-lg p-1 ${
                        block.isFreeTime ? 'bg-gray-900/50' : ''
                      }`}
                    >
                      {block.events.map((event) => (
                        <div
                          key={event.id}
                          className={`${getTypeColor(event.type)} text-xs p-1 rounded mb-1 cursor-pointer hover:opacity-80`}
                          onClick={() => router.push(`/profile/calendar/event/${event.id}`)}
                        >
                          <div className="font-medium truncate">{event.title}</div>
                          {event.location && (
                            <div className="text-white/70 truncate">{event.location}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* Free Time Finder */}
        <Card className="mt-8 p-6 bg-gray-900 border-white/8">
          <h3 className="text-lg font-semibold mb-4">Free Time This Week</h3>
          <div className="space-y-2">
            {Array.from({ length: 7 }, (_, i) => {
              const date = new Date(currentDate);
              date.setDate(date.getDate() - date.getDay() + i);
              const freeBlocks = getFreeTimeBlocks(date).filter(b => b.isFreeTime);

              if (freeBlocks.length === 0) return null;

              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-24 text-sm text-gray-400">
                    {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {freeBlocks.slice(0, 3).map((block) => (
                      <Badge
                        key={block.hour}
                        className="bg-green-900/20 text-green-400 border-green-400/50"
                      >
                        {block.hour > 12 ? `${block.hour - 12}PM` : `${block.hour}AM`}
                      </Badge>
                    ))}
                    {freeBlocks.length > 3 && (
                      <Badge className="bg-gray-800 text-gray-400">
                        +{freeBlocks.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}