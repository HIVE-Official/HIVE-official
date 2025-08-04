"use client";

import { useState, useEffect } from "react";
import { ErrorBoundary } from "../../../../../components/error-boundary";
import { CreateEventModal } from "../../../../../components/events/create-event-modal";
import { EventDetailsModal } from "../../../../../components/events/event-details-modal";
import { SpaceEventCalendar } from "../../../../../components/spaces/space-event-calendar";
import { useRouter } from "next/navigation";

interface SpaceEventsPageProps {
  params: {
    spaceId: string;
  };
}

interface SpaceEvent {
  id: string;
  title: string;
  description: string;
  type: 'academic' | 'social' | 'professional' | 'recreational' | 'official';
  organizer: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
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
    shares: number;
  };
  requirements?: string[];
  createdAt: string;
  updatedAt: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isRecurring: boolean;
  recurringPattern?: string;
}

export default function SpaceEventsPage({ params }: SpaceEventsPageProps) {
  const _router = useRouter();
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SpaceEvent | null>(null);
  const [spaceName, setSpaceName] = useState('');
  const [userRole, setUserRole] = useState<'admin' | 'moderator' | 'member'>('member');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSpaceName('CS Study Group');
      setUserRole('admin');
      setIsLoading(false);
    };

    fetchData();
  }, [params.spaceId]);

  const handleCreateEvent = (_eventData: any) => {
    // Event creation logic handled by SpaceEventCalendar component
  };

  const handleRSVP = (_eventId: string, _status: 'going' | 'interested' | 'not_going') => {
    // RSVP logic handled by SpaceEventCalendar component
  };

  const handleBookmark = (_eventId: string) => {
    // Bookmark logic handled by SpaceEventCalendar component
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4" />
          <p className="text-white">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <SpaceEventCalendar
        spaceId={params.spaceId}
        spaceName={spaceName}
        userRole={userRole}
        onCreateEvent={() => setShowCreateEvent(true)}
        onEventClick={(event: any) => setSelectedEvent(event)}
      />

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={showCreateEvent}
        onClose={() => setShowCreateEvent(false)}
        onCreateEvent={handleCreateEvent}
        defaultSpaceId={params.spaceId}
      />

      {/* Event Details Modal */}
      <EventDetailsModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
        currentUserId="current-user"
        onRSVP={handleRSVP}
        onBookmark={handleBookmark}
      />
    </ErrorBoundary>
  );
}