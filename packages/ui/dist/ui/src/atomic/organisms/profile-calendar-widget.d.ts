import React from 'react';
export interface CalendarEvent {
    id: string;
    title: string;
    type: 'class' | 'study' | 'meeting' | 'personal' | 'deadline';
    startTime: string;
    endTime: string;
    location?: string;
    participants?: number;
    isRecurring?: boolean;
    status: 'confirmed' | 'tentative' | 'completed';
}
export interface ProfileCalendarWidgetProps {
    user: {
        id: string;
        name: string;
        timezone?: string;
    };
    todayEvents?: CalendarEvent[];
    upcomingEvents?: CalendarEvent[];
    availabilityStatus?: 'available' | 'busy' | 'in-class' | 'studying' | 'offline';
    nextAvailableSlot?: string;
    studyHoursToday?: number;
    studyGoal?: number;
    isEditable?: boolean;
    onAddEvent?: () => void;
    onViewCalendar?: () => void;
    onEditEvent?: (eventId: string) => void;
    onUpdateAvailability?: () => void;
    className?: string;
}
export declare const ProfileCalendarWidget: React.FC<ProfileCalendarWidgetProps>;
//# sourceMappingURL=profile-calendar-widget.d.ts.map