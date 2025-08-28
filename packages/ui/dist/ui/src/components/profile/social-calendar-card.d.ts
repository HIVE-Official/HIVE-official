/**
 * Social Calendar Card - Social Schedule Sharing
 * Displays today's schedule with social context and group coordination
 */
import '../../styles/social-profile.css';
interface CalendarEvent {
    id: string;
    title: string;
    time: string;
    endTime?: string;
    type: 'class' | 'study' | 'social' | 'meeting' | 'exam';
    location?: string;
    building?: string;
    room?: string;
    attendees?: {
        going: number;
        maybe: number;
        spotsLeft?: number;
    };
    canJoin?: boolean;
    userStatus?: 'going' | 'maybe' | 'not-going' | null;
    isRecurring?: boolean;
    professor?: string;
    friends?: string[];
}
interface SocialCalendarCardProps {
    events: CalendarEvent[];
    freeUntil?: string;
    availabilityStatus?: 'available' | 'busy' | 'studying' | 'do-not-disturb';
    onEventAction?: (eventId: string, action: 'join' | 'maybe' | 'leave') => void;
    onAddEvent?: () => void;
    onConnectCalendar?: () => void;
    className?: string;
}
export declare function SocialCalendarCard({ events, freeUntil, availabilityStatus, onEventAction, onAddEvent, onConnectCalendar, className }: SocialCalendarCardProps): import("react/jsx-runtime").JSX.Element;
export default SocialCalendarCard;
//# sourceMappingURL=social-calendar-card.d.ts.map