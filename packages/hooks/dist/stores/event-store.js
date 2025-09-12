"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInterestedEvents = exports.useRSVPEvents = exports.useEventViewMode = exports.useEventFilters = exports.useEventStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const defaultFilters = {
    dateRange: 'all',
    categories: [],
    spaces: [],
    showPastEvents: false,
    onlyRSVPRequired: false,
    searchQuery: ''
};
exports.useEventStore = (0, zustand_1.create)()((0, middleware_1.devtools)((0, middleware_1.persist)((set, get) => ({
    // View preferences
    viewMode: 'list',
    setViewMode: (mode) => set({ viewMode: mode }, false, 'setViewMode'),
    selectedDate: null,
    setSelectedDate: (date) => set({ selectedDate: date }, false, 'setSelectedDate'),
    // Filters
    filters: defaultFilters,
    setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
    }), false, 'setFilters'),
    resetFilters: () => set({ filters: defaultFilters }, false, 'resetFilters'),
    // Draft management
    drafts: new Map(),
    saveDraft: (id, draft) => set((state) => {
        const drafts = new Map(state.drafts);
        drafts.set(id, draft);
        return { drafts };
    }, false, 'saveDraft'),
    getDraft: (id) => get().drafts.get(id),
    clearDraft: (id) => set((state) => {
        const drafts = new Map(state.drafts);
        drafts.delete(id);
        return { drafts };
    }, false, 'clearDraft'),
    // RSVP tracking
    rsvpEvents: new Set(),
    addRSVP: (eventId) => set((state) => {
        const rsvpEvents = new Set(state.rsvpEvents);
        rsvpEvents.add(eventId);
        return { rsvpEvents };
    }, false, 'addRSVP'),
    removeRSVP: (eventId) => set((state) => {
        const rsvpEvents = new Set(state.rsvpEvents);
        rsvpEvents.delete(eventId);
        return { rsvpEvents };
    }, false, 'removeRSVP'),
    hasRSVP: (eventId) => get().rsvpEvents.has(eventId),
    // Interested events
    interestedEvents: new Set(),
    toggleInterested: (eventId) => set((state) => {
        const interestedEvents = new Set(state.interestedEvents);
        if (interestedEvents.has(eventId)) {
            interestedEvents.delete(eventId);
        }
        else {
            interestedEvents.add(eventId);
        }
        return { interestedEvents };
    }, false, 'toggleInterested'),
    isInterested: (eventId) => get().interestedEvents.has(eventId),
    // Calendar sync
    syncedCalendars: [],
    addSyncedCalendar: (calendarId) => set((state) => ({
        syncedCalendars: [...state.syncedCalendars, calendarId]
    }), false, 'addSyncedCalendar'),
    removeSyncedCalendar: (calendarId) => set((state) => ({
        syncedCalendars: state.syncedCalendars.filter((id) => id !== calendarId)
    }), false, 'removeSyncedCalendar'),
    // Notifications
    eventReminders: new Map(),
    setEventReminder: (eventId, minutes) => set((state) => {
        const eventReminders = new Map(state.eventReminders);
        eventReminders.set(eventId, minutes);
        return { eventReminders };
    }, false, 'setEventReminder'),
    removeEventReminder: (eventId) => set((state) => {
        const eventReminders = new Map(state.eventReminders);
        eventReminders.delete(eventId);
        return { eventReminders };
    }, false, 'removeEventReminder'),
    // Recent searches
    recentSearches: [],
    addRecentSearch: (query) => set((state) => ({
        recentSearches: [
            query,
            ...state.recentSearches.filter((q) => q !== query)
        ].slice(0, 5)
    }), false, 'addRecentSearch'),
    clearRecentSearches: () => set({ recentSearches: [] }, false, 'clearRecentSearches'),
}), {
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
    merge: (persistedState, currentState) => {
        const state = persistedState;
        return {
            ...currentState,
            ...state,
            rsvpEvents: new Set(state.rsvpEvents || []),
            interestedEvents: new Set(state.interestedEvents || []),
            eventReminders: new Map(state.eventReminders || [])
        };
    }
})));
// Selectors
const useEventFilters = () => (0, exports.useEventStore)((state) => state.filters);
exports.useEventFilters = useEventFilters;
const useEventViewMode = () => (0, exports.useEventStore)((state) => state.viewMode);
exports.useEventViewMode = useEventViewMode;
const useRSVPEvents = () => (0, exports.useEventStore)((state) => state.rsvpEvents);
exports.useRSVPEvents = useRSVPEvents;
const useInterestedEvents = () => (0, exports.useEventStore)((state) => state.interestedEvents);
exports.useInterestedEvents = useInterestedEvents;
//# sourceMappingURL=event-store.js.map