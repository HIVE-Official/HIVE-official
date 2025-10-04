import * as React from "react";
export interface SpaceEvent {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    location?: string;
    timeDisplay?: string;
    locationType?: "on-campus" | "off-campus" | "virtual";
    organizer?: {
        name: string;
        handle: string;
        avatar?: string;
    };
    rsvpCount?: number;
    attendeeCount?: number;
    isAttending?: boolean;
    userRSVP?: "attending" | "not-attending" | "maybe" | null;
    type?: "meeting" | "workshop" | "social" | "academic" | "other";
    isAllDay?: boolean;
    status?: "upcoming" | "in-progress" | "completed" | "cancelled";
    category?: string;
    campusContext?: any;
}
export interface SpaceEventsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    /** List of events */
    events?: SpaceEvent[];
    /** Event creation handler */
    onCreateEvent?: () => void;
    /** Event click handler */
    onEventClick?: (event: SpaceEvent) => void;
    /** RSVP handler */
    onRSVP?: (eventId: string, attending: boolean) => void;
    /** Whether user can create events */
    canCreateEvents?: boolean;
    /** Show past events */
    showPastEvents?: boolean;
    /** Empty state message */
    emptyStateMessage?: string;
}
declare const SpaceEventsPanel: React.ForwardRefExoticComponent<SpaceEventsPanelProps & React.RefAttributes<HTMLDivElement>>;
export { SpaceEventsPanel };
//# sourceMappingURL=space-events-panel.d.ts.map