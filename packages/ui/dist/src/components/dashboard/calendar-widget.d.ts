export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    startTime: string;
    endTime: string;
    date: string;
    type: 'personal' | 'space' | 'academic' | 'social';
    location?: string;
    spaceId?: string;
    spaceName?: string;
    attendeeCount?: number;
    color?: string;
    isAllDay?: boolean;
    reminderSet?: boolean;
}
export interface CalendarWidgetData {
    events: CalendarEvent[];
    upcomingDeadlines: Array<{
        id: string;
        title: string;
        dueDate: string;
        type: 'assignment' | 'exam' | 'project';
        spaceId?: string;
        spaceName?: string;
        priority: 'high' | 'medium' | 'low';
    }>;
    weeklySchedule?: Array<{
        dayOfWeek: number;
        timeSlots: Array<{
            startTime: string;
            endTime: string;
            title: string;
            recurring: boolean;
        }>;
    }>;
}
interface CalendarWidgetProps {
    data?: CalendarWidgetData;
    isLoading?: boolean;
    onEventClick?: (eventId: string) => void;
    onDateSelect?: (date: Date) => void;
    onAddEvent?: () => void;
    className?: string;
    viewMode?: 'month' | 'week' | 'agenda';
}
export declare function CalendarWidget({ data, isLoading, onEventClick, onDateSelect, onAddEvent, className, viewMode }: CalendarWidgetProps): import("react/jsx-runtime").JSX.Element;
export declare const mockCalendarData: CalendarWidgetData;
export default CalendarWidget;
//# sourceMappingURL=calendar-widget.d.ts.map