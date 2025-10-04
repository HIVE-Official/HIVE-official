import * as React from "react";
export interface CalendarEvent {
    id: string;
    title: string;
    type: "class" | "event" | "office-hours";
    startTime: string;
    endTime: string;
    date: Date;
    location: string;
    instructor?: string;
    spaceName?: string;
    rsvpStatus?: "going" | "interested" | null;
}
export interface ProfileCalendarModalProps {
    /** Is modal open */
    isOpen: boolean;
    /** Callback when modal closes */
    onClose: () => void;
    /** Events to display */
    events: CalendarEvent[];
    /** Currently selected date */
    selectedDate?: Date;
    /** Callback when date is selected */
    onDateSelect?: (date: Date) => void;
    /** Callback when user wants to import classes */
    onImportClasses?: () => void;
    /** Callback when user wants to add event */
    onAddEvent?: () => void;
    /** Callback when event is clicked */
    onEventClick?: (eventId: string) => void;
    /** Callback to export calendar */
    onExport?: () => void;
}
/**
 * Profile Calendar Modal
 *
 * Full-screen calendar for viewing schedule with:
 * - Month view with date indicators
 * - Event list for selected date
 * - Class import CTA
 * - Export calendar functionality
 * - RSVP quick actions
 *
 * Design Pattern: Modal-first IA
 * - Opens from ProfileScheduleWidget
 * - Shows full calendar context
 * - Quick actions without leaving modal
 */
declare const ProfileCalendarModal: React.ForwardRefExoticComponent<ProfileCalendarModalProps & React.RefAttributes<HTMLDivElement>>;
export { ProfileCalendarModal };
//# sourceMappingURL=profile-calendar-modal.d.ts.map