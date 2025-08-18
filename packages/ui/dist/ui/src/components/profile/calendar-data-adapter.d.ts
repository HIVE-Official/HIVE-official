import { Event, CalendarCardData, CalendarCardState } from './types';
/**
 * Converts Event array and loading states to CalendarCardData format
 * for use with the new CalendarCard component
 */
export declare const adaptEventsToCalendarCardData: (events: Event[], isLoading?: boolean, error?: string) => {
    data?: CalendarCardData;
    state: CalendarCardState;
};
/**
 * Props adapter to convert SmartCalendar props to CalendarCard props
 */
export declare const adaptSmartCalendarProps: (events: Event[], isLoading?: boolean, error?: string, onEventClick?: (eventId: string) => void, onAddEvent?: () => void, variant?: "desktop" | "mobile") => {
    data: CalendarCardData;
    state: CalendarCardState;
    variant: "mobile" | "desktop";
    onEventClick: (event: Event) => void;
    onAddEvent: () => void;
    onViewCalendar: () => void;
    onConnectCalendar: (type: "google" | "outlook") => void;
    onResolveConflict: (conflictId: string) => void;
    onSyncCalendar: (connectionId: string) => void;
};
//# sourceMappingURL=calendar-data-adapter.d.ts.map