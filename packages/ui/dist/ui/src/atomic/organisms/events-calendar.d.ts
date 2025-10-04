import * as React from "react";
export interface EventCampusContext {
    friendsGoing?: Array<{
        id: string;
        name: string;
        avatar: string;
    }>;
    popularityRank?: number;
    proximityToUser?: string;
}
/**
 * Calendar event with campus context
 */
export interface CalendarEvent {
    id: string;
    title: string;
    dateTime: {
        start: Date;
        end?: Date;
        display: string;
    };
    location: {
        name: string;
        type: "on-campus" | "off-campus" | "virtual";
    };
    space: {
        name: string;
        id: string;
    };
    attendees: {
        count: number;
    };
    rsvp: {
        status: "going" | "interested" | "not-going" | null;
    };
    category?: "social" | "academic" | "sports" | "greek" | "wellness";
    /** Campus context (HIVE-native) */
    campusContext?: EventCampusContext;
}
export interface EventsCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Events to display on calendar */
    events: CalendarEvent[];
    /** Currently selected date */
    selectedDate?: Date;
    /** Date selection handler */
    onSelectDate?: (date: Date | undefined) => void;
    /** Event click handler */
    onEventClick?: (eventId: string) => void;
    /** RSVP handler */
    onRsvp?: (eventId: string, status: "going" | "interested") => void;
    /** Show only user's events */
    showOnlyUserEvents?: boolean;
}
/**
 * Events Calendar
 *
 * Campus-native calendar view with event preview and friend activity signals.
 * Built on shadcn Calendar with HIVE design system.
 *
 * Design Strategy:
 * - Calendar grid shows event indicators (dots for events, gold for user's RSVPs)
 * - Selected date shows event list in sidebar
 * - Campus context shown in event previews (friends going, cohort breakdown)
 * - Monochrome + gold aesthetic
 *
 * Differentiation from Generic Calendar:
 * - Shows "3 friends going" indicators on calendar dates
 * - Event previews include campus cohort context
 * - "You're going" events highlighted in gold
 * - Academic calendar integration (exam weeks, breaks)
 */
declare const EventsCalendar: React.ForwardRefExoticComponent<EventsCalendarProps & React.RefAttributes<HTMLDivElement>>;
export { EventsCalendar };
//# sourceMappingURL=events-calendar.d.ts.map