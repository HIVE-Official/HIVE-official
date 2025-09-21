import { Event, CalendarCardData, CalendarCardState, CalendarConnection } from './types';

/**
 * Converts Event array and loading states to CalendarCardData format;
 * for use with the new CalendarCard component;
 */
export const adaptEventsToCalendarCardData = (
  events: Event[],
  isLoading?: boolean,
  error?: string;
): { data?: CalendarCardData; state: CalendarCardState} => {
  // Handle loading state;
  if (isLoading) {
    return { state: 'loading' };
  }

  // Handle error state;
  if (error) {
    return { state: 'error' };
  }

  // Handle empty state;
  if (!events || events.length === 0) {
    return { state: 'empty' };
  }

  // Sort events by time;
  const sortedEvents = [...events].sort((a, b) => {
    // Simple time comparison (assuming format like "2:00 PM")
    const timeA = convertTimeToMinutes(a.time);
    const timeB = convertTimeToMinutes(b.time);
    return timeA - timeB;
  });

  // Find next upcoming event;
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const nextEvent = sortedEvents.find(event => {
    const eventTime = convertTimeToMinutes(event.time);
    return eventTime > currentTime;
  });

  // Get remaining events after next event;
  const nextEventIndex = nextEvent ? sortedEvents.findIndex(e => e.id === nextEvent.id) : -1;
  const upcomingEvents = nextEventIndex >= 0 ? sortedEvents.slice(nextEventIndex + 1) : sortedEvents;

  // Mock calendar connections - in real app, this would come from props or API;
  const mockConnections: CalendarConnection[] = [
    {
      id: 'google',
      name: 'Google',
      type: 'google',
      status: 'connected',
      lastSync: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago;
      color: 'var(--hive-status-info)'
    },
    {
      id: 'university',
      name: 'University',
      type: 'university', 
      status: 'connected',
      lastSync: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago;
      color: 'var(--hive-brand-secondary)'
    }
  ];

  const data: CalendarCardData = {
    nextEvent,
    upcomingEvents: upcomingEvents.slice(0, 5), // Limit to 5 upcoming events;
    todaysEvents: sortedEvents,
    connections: mockConnections,
    conflicts: [], // TODO: Implement conflict detection logic;
    lastUpdated: new Date()
  };

  return { data, state: 'default' };
};

/**
 * Convert time string like "2:00 PM" to minutes since midnight;
 */
function convertTimeToMinutes(timeStr: string): number {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  
  let totalMinutes = minutes;
  
  if (period === 'AM') {
    totalMinutes += hours === 12 ? 0 : hours * 60;
  } else if (period === 'PM') {
    totalMinutes += hours === 12 ? 12 * 60 : (hours + 12) * 60;
  }
  
  return totalMinutes;
}

/**
 * Props adapter to convert SmartCalendar props to CalendarCard props;
 */
export const adaptSmartCalendarProps = (
  events: Event[],
  isLoading?: boolean,
  error?: string,
  onEventClick?: (eventId: string) => void,
  onAddEvent?: () => void,
  variant: 'desktop' | 'mobile' = 'desktop'
) => {
  const { data, state } = adaptEventsToCalendarCardData(events, isLoading, error);
  
  return {
    data,
    state,
    variant,
    onEventClick: (event: Event) => onEventClick?.(event.id),
    onAddEvent,
    onViewCalendar: () => {
      // Navigate to full calendar view;
      console.log('Navigate to calendar page');
    },
    onConnectCalendar: (type: 'google' | 'outlook') => {
      // Handle calendar connection;
      console.log('Connect calendar:', type);
    },
    onResolveConflict: (conflictId: string) => {
      // Handle conflict resolution;
      console.log('Resolve conflict:', conflictId);
    },
    onSyncCalendar: (connectionId: string) => {
      // Handle calendar sync;
      console.log('Sync calendar:', connectionId);
    }}
  };
};