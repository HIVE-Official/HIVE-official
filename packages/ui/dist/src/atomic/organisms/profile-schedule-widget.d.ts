import * as React from "react";
export interface ScheduleEvent {
    id: string;
    title: string;
    type: "class" | "event" | "office-hours";
    startTime: string;
    endTime: string;
    location: string;
    spaceId?: string;
    spaceName?: string;
    instructor?: string;
    color?: "blue" | "green" | "purple" | "orange" | "red" | "yellow";
    rsvpStatus?: "going" | "interested" | null;
}
export interface ProfileScheduleWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Today's events */
    events: ScheduleEvent[];
    /** Show only upcoming events (filter past events) */
    showOnlyUpcoming?: boolean;
    /** Event click handler */
    onEventClick?: (eventId: string) => void;
    /** RSVP handler */
    onRsvp?: (eventId: string) => void;
    /** View full calendar handler */
    onViewFullCalendar?: () => void;
    /** Import classes handler */
    onImportClasses?: () => void;
    /** Currently selected date (defaults to today) */
    date?: Date;
}
/**
 * Profile Schedule Widget
 *
 * Prominent display of today's classes and events on profile.
 * Key feature: Students can import their class schedule.
 *
 * Design Strategy:
 * - Shows today's schedule at a glance
 * - Upcoming events highlighted
 * - Quick RSVP for events
 * - Import schedule CTA if empty
 * - Timeline view with current time indicator
 *
 * Differentiation:
 * - Class import integration (from university registrar)
 * - Combined classes + social events
 * - "Happening now" indicator
 * - Quick actions (RSVP, navigate)
 */
declare const ProfileScheduleWidget: React.ForwardRefExoticComponent<ProfileScheduleWidgetProps & React.RefAttributes<HTMLDivElement>>;
export { ProfileScheduleWidget };
//# sourceMappingURL=profile-schedule-widget.d.ts.map