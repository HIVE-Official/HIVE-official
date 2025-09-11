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
    viewMode: 'calendar' | 'list' | 'grid';
    setViewMode: (mode: 'calendar' | 'list' | 'grid') => void;
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
    filters: EventFilters;
    setFilters: (filters: Partial<EventFilters>) => void;
    resetFilters: () => void;
    drafts: Map<string, EventDraft>;
    saveDraft: (id: string, draft: EventDraft) => void;
    getDraft: (id: string) => EventDraft | undefined;
    clearDraft: (id: string) => void;
    rsvpEvents: Set<string>;
    addRSVP: (eventId: string) => void;
    removeRSVP: (eventId: string) => void;
    hasRSVP: (eventId: string) => boolean;
    interestedEvents: Set<string>;
    toggleInterested: (eventId: string) => void;
    isInterested: (eventId: string) => boolean;
    syncedCalendars: string[];
    addSyncedCalendar: (calendarId: string) => void;
    removeSyncedCalendar: (calendarId: string) => void;
    eventReminders: Map<string, number>;
    setEventReminder: (eventId: string, minutes: number) => void;
    removeEventReminder: (eventId: string) => void;
    recentSearches: string[];
    addRecentSearch: (query: string) => void;
    clearRecentSearches: () => void;
}
export declare const useEventStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<EventState>, "setState" | "devtools"> & {
    setState(partial: EventState | Partial<EventState> | ((state: EventState) => EventState | Partial<EventState>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: EventState | ((state: EventState) => EventState), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<EventState, {
            viewMode: "list" | "grid" | "calendar";
            filters: EventFilters;
            rsvpEvents: string[];
            interestedEvents: string[];
            syncedCalendars: string[];
            eventReminders: [string, number][];
            recentSearches: string[];
        }>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: EventState) => void) => () => void;
        onFinishHydration: (fn: (state: EventState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<EventState, {
            viewMode: "list" | "grid" | "calendar";
            filters: EventFilters;
            rsvpEvents: string[];
            interestedEvents: string[];
            syncedCalendars: string[];
            eventReminders: [string, number][];
            recentSearches: string[];
        }>>;
    };
}>;
export declare const useEventFilters: () => any;
export declare const useEventViewMode: () => any;
export declare const useRSVPEvents: () => any;
export declare const useInterestedEvents: () => any;
export {};
//# sourceMappingURL=event-store.d.ts.map