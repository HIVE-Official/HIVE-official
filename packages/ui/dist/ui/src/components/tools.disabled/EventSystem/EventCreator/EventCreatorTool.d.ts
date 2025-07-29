import React from 'react';
export interface EventData {
    id?: string;
    title: string;
    description: string;
    date: string;
    time: string;
    endTime?: string;
    location: string;
    type: 'study_session' | 'social_meetup' | 'project_work' | 'organization_meeting' | 'campus_event' | 'custom';
    capacity?: number;
    isPublic: boolean;
    requiresRSVP: boolean;
    allowGuests: boolean;
    tags: string[];
    organizer?: {
        id: string;
        name: string;
        email: string;
    };
    recurrence?: {
        type: 'none' | 'daily' | 'weekly' | 'monthly';
        interval: number;
        endDate?: string;
    };
}
export interface EventCreatorConfig {
    defaultEventTypes: string[];
    requireApproval: boolean;
    maxCapacity: number;
    allowRecurring: boolean;
    autoRSVP: boolean;
    calendarSync: boolean;
}
interface EventCreatorToolProps {
    config: EventCreatorConfig;
    onEventCreate?: (event: EventData) => Promise<void>;
    onEventUpdate?: (eventId: string, updates: Partial<EventData>) => Promise<void>;
    onConfigChange?: (config: EventCreatorConfig) => void;
    existingEvent?: EventData;
    className?: string;
}
export declare const EventCreatorTool: React.FC<EventCreatorToolProps>;
export default EventCreatorTool;
//# sourceMappingURL=EventCreatorTool.d.ts.map