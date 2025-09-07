import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface EventDraft {
  title: string;
  description: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  spaceId: string;
  category: string;
  capacity: number | null;
  isVirtual: boolean;
  virtualLink: string;
  tags: string[];
  image: string;
  requiresRSVP: boolean;
  isPublic: boolean;
}

interface EventFilters {
  dateRange: 'today' | 'week' | 'month' | 'all';
  categories: string[];
  spaces: string[];
  showPastEvents: boolean;
  onlyRSVPRequired: boolean;
  searchQuery: string;
}

interface EventState {
  // View preferences
  viewMode: 'calendar' | 'list' | 'grid';
  setViewMode: (mode: 'calendar' | 'list' | 'grid') => void;
  
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  
  // Filters
  filters: EventFilters;
  setFilters: (filters: Partial<EventFilters>) => void;
  resetFilters: () => void;
  
  // Draft management
  drafts: Map<string, EventDraft>;
  saveDraft: (id: string, draft: EventDraft) => void;
  getDraft: (id: string) => EventDraft | undefined;
  clearDraft: (id: string) => void;
  
  // RSVP tracking
  rsvpEvents: Set<string>;
  addRSVP: (eventId: string) => void;
  removeRSVP: (eventId: string) => void;
  hasRSVP: (eventId: string) => boolean;
  
  // Interested events
  interestedEvents: Set<string>;
  toggleInterested: (eventId: string) => void;
  isInterested: (eventId: string) => boolean;
  
  // Calendar sync
  syncedCalendars: string[];
  addSyncedCalendar: (calendarId: string) => void;
  removeSyncedCalendar: (calendarId: string) => void;
  
  // Notifications
  eventReminders: Map<string, number>; // eventId -> minutes before
  setEventReminder: (eventId: string, minutes: number) => void;
  removeEventReminder: (eventId: string) => void;
  
  // Recent searches
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

const defaultFilters: EventFilters = {
  dateRange: 'all',
  categories: [],
  spaces: [],
  showPastEvents: false,
  onlyRSVPRequired: false,
  searchQuery: ''
};

export const useEventStore = create<EventState>()(
  devtools(
    persist(
      (set, get) => ({
        // View preferences
        viewMode: 'list',
        setViewMode: (mode) => set({ viewMode: mode }, false, 'setViewMode'),
        
        selectedDate: null,
        setSelectedDate: (date) => set({ selectedDate: date }, false, 'setSelectedDate'),
        
        // Filters
        filters: defaultFilters,
        setFilters: (filters) =>
          set(
            (state) => ({
              filters: { ...state.filters, ...filters }
            }),
            false,
            'setFilters'
          ),
        resetFilters: () => set({ filters: defaultFilters }, false, 'resetFilters'),
        
        // Draft management
        drafts: new Map(),
        saveDraft: (id, draft) =>
          set(
            (state) => {
              const drafts = new Map(state.drafts);
              drafts.set(id, draft);
              return { drafts };
            },
            false,
            'saveDraft'
          ),
        getDraft: (id) => get().drafts.get(id),
        clearDraft: (id) =>
          set(
            (state) => {
              const drafts = new Map(state.drafts);
              drafts.delete(id);
              return { drafts };
            },
            false,
            'clearDraft'
          ),
        
        // RSVP tracking
        rsvpEvents: new Set(),
        addRSVP: (eventId) =>
          set(
            (state) => {
              const rsvpEvents = new Set(state.rsvpEvents);
              rsvpEvents.add(eventId);
              return { rsvpEvents };
            },
            false,
            'addRSVP'
          ),
        removeRSVP: (eventId) =>
          set(
            (state) => {
              const rsvpEvents = new Set(state.rsvpEvents);
              rsvpEvents.delete(eventId);
              return { rsvpEvents };
            },
            false,
            'removeRSVP'
          ),
        hasRSVP: (eventId) => get().rsvpEvents.has(eventId),
        
        // Interested events
        interestedEvents: new Set(),
        toggleInterested: (eventId) =>
          set(
            (state) => {
              const interestedEvents = new Set(state.interestedEvents);
              if (interestedEvents.has(eventId)) {
                interestedEvents.delete(eventId);
              } else {
                interestedEvents.add(eventId);
              }
              return { interestedEvents };
            },
            false,
            'toggleInterested'
          ),
        isInterested: (eventId) => get().interestedEvents.has(eventId),
        
        // Calendar sync
        syncedCalendars: [],
        addSyncedCalendar: (calendarId) =>
          set(
            (state) => ({
              syncedCalendars: [...state.syncedCalendars, calendarId]
            }),
            false,
            'addSyncedCalendar'
          ),
        removeSyncedCalendar: (calendarId) =>
          set(
            (state) => ({
              syncedCalendars: state.syncedCalendars.filter(id => id !== calendarId)
            }),
            false,
            'removeSyncedCalendar'
          ),
        
        // Notifications
        eventReminders: new Map(),
        setEventReminder: (eventId, minutes) =>
          set(
            (state) => {
              const eventReminders = new Map(state.eventReminders);
              eventReminders.set(eventId, minutes);
              return { eventReminders };
            },
            false,
            'setEventReminder'
          ),
        removeEventReminder: (eventId) =>
          set(
            (state) => {
              const eventReminders = new Map(state.eventReminders);
              eventReminders.delete(eventId);
              return { eventReminders };
            },
            false,
            'removeEventReminder'
          ),
        
        // Recent searches
        recentSearches: [],
        addRecentSearch: (query) =>
          set(
            (state) => ({
              recentSearches: [
                query,
                ...state.recentSearches.filter(q => q !== query)
              ].slice(0, 5)
            }),
            false,
            'addRecentSearch'
          ),
        clearRecentSearches: () =>
          set({ recentSearches: [] }, false, 'clearRecentSearches'),
      }),
      {
        name: 'EventStore',
        partialize: (state) => ({
          viewMode: state.viewMode,
          filters: state.filters,
          rsvpEvents: Array.from(state.rsvpEvents),
          interestedEvents: Array.from(state.interestedEvents),
          syncedCalendars: state.syncedCalendars,
          eventReminders: Array.from(state.eventReminders),
          recentSearches: state.recentSearches
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        merge: (persistedState: any, currentState) => ({
          ...currentState,
          ...persistedState,
          rsvpEvents: new Set(persistedState.rsvpEvents || []),
          interestedEvents: new Set(persistedState.interestedEvents || []),
          eventReminders: new Map(persistedState.eventReminders || [])
        })
      }
    )
  )
);

// Selectors
export const useEventFilters = () => useEventStore((state) => state.filters);
export const useEventViewMode = () => useEventStore((state) => state.viewMode);
export const useRSVPEvents = () => useEventStore((state) => state.rsvpEvents);
export const useInterestedEvents = () => useEventStore((state) => state.interestedEvents);