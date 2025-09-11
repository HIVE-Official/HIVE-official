"use client";

import React, { useState, useEffect } from 'react';
import { Card, Badge } from '@hive/ui';
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';

interface Event {
  id: string;
  title: string;
  time: string;
  location: string;
  attendees: number;
  friendsAttending: number;
  type: 'study' | 'social' | 'meeting' | 'class';
}

interface MyEventsCardProps {
  className?: string;
}

export function MyEventsCard({ className }: MyEventsCardProps) {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [friendsAvailable, setFriendsAvailable] = useState(3);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/profile/calendar/events?range=7days');
      if (response.ok) {
        const data = await response.json();
        
        // Transform API data to component format
        const transformedEvents = (data.events || []).map((event: any) => ({
          id: event.id,
          title: event.title,
          time: event.startDate,
          location: event.location || 'TBD',
          attendees: event.attendees?.length || 1,
          friendsAttending: event.friendsAttending?.length || 0,
          type: event.type || 'social'
        }));
        
        setEvents(transformedEvents);
        setFriendsAvailable(data.friendsAvailable || 0);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    }
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      study: 'bg-blue-500/20 text-blue-400',
      social: 'bg-[var(--hive-gold)]/20 text-[var(--hive-gold)]',
      meeting: 'bg-purple-500/20 text-purple-400',
      class: 'bg-green-500/20 text-green-400'
    };
    return colors[type as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const formatEventTime = (timeString: string) => {
    const date = parseISO(timeString);
    if (isToday(date)) return `Today, ${format(date, 'h:mm a')}`;
    if (isTomorrow(date)) return `Tomorrow, ${format(date, 'h:mm a')}`;
    return format(date, 'MMM d, h:mm a');
  };

  return (
    <Card 
      className={`p-4 h-full flex flex-col group cursor-pointer hover:border-accent/50 transition-all ${className}`}
      onClick={() => router.push('/calendar')}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground">My Events</h3>
        <Calendar className="h-4 w-4 text-accent" />
      </div>

      {/* Events List */}
      <div className="flex-1 space-y-2">
        {events.slice(0, 2).map((event) => (
          <div
            key={event.id}
            className="p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            onClick={(e: any) => {
              e.stopPropagation();
              router.push(`/events/${event.id}`);
            }}
          >
            <div className="flex items-start justify-between mb-1">
              <h4 className="text-sm font-medium text-foreground line-clamp-1">
                {event.title}
              </h4>
              <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                {event.type}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatEventTime(event.time)}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {event.location}
              </span>
            </div>
            
            {event.friendsAttending > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <Users className="h-3 w-3 text-accent" />
                <span className="text-xs text-accent">
                  {event.friendsAttending} friends attending
                </span>
              </div>
            )}
          </div>
        ))}

        {events.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
            <Calendar className="h-8 w-8 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">No events today</p>
            <button
              onClick={(e: any) => {
                e.stopPropagation();
                router.push('/events/create');
              }}
              className="mt-2 flex items-center gap-1 text-xs text-accent hover:underline"
            >
              <Plus className="h-3 w-3" />
              Create event
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 text-green-400" />
            <span className="text-xs text-muted-foreground">
              {friendsAvailable} friends available
            </span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
        </div>
      </div>
    </Card>
  );
}