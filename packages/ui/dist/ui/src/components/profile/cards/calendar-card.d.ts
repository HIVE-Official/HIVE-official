export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    location?: string;
    type: 'academic' | 'space' | 'social' | 'personal' | 'study' | 'ritual';
    source: 'manual' | 'space' | 'ub' | 'integration';
    attendees?: {
        id: string;
        name: string;
        avatar?: string;
        status: 'going' | 'maybe' | 'not-going' | 'pending';
    }[];
    isRSVPRequired: boolean;
    userRSVPStatus?: 'going' | 'maybe' | 'not-going' | 'pending';
    spaceId?: string;
    spaceName?: string;
    color?: string;
    isConflicting?: boolean;
    priority: 'low' | 'medium' | 'high';
}
export interface CalendarCardProps {
    events: CalendarEvent[];
    isEditMode: boolean;
    onEventCreate?: (event: Partial<CalendarEvent>) => void;
    onEventUpdate?: (id: string, updates: Partial<CalendarEvent>) => void;
    onRSVP?: (eventId: string, status: 'going' | 'maybe' | 'not-going') => void;
    onSettingsClick?: () => void;
    className?: string;
}
export declare function CalendarCard({ events, isEditMode, onEventCreate, onEventUpdate, onRSVP, onSettingsClick, className }: CalendarCardProps): CalendarEvent[];
export declare const mockCalendarEvents: CalendarEvent[];
//# sourceMappingURL=calendar-card.d.ts.map