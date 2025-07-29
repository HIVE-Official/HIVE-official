import React from 'react';
export interface RSVPResponse {
    id: string;
    userId: string;
    eventId: string;
    status: 'going' | 'maybe' | 'not_going' | 'waitlisted';
    responseDate: Date;
    guestCount: number;
    specialRequests?: string;
    checkInTime?: Date;
    user: {
        id: string;
        name: string;
        email: string;
        avatar?: string;
        profileUrl?: string;
    };
}
export interface EventDetails {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    capacity?: number;
    description: string;
    organizer: {
        id: string;
        name: string;
        email: string;
    };
}
export interface RSVPManagerConfig {
    allowGuestList: boolean;
    maxGuestsPerPerson: number;
    enableWaitlist: boolean;
    sendAutomaticReminders: boolean;
    requireSpecialRequests: boolean;
    allowLastMinuteChanges: boolean;
    rsvpDeadline?: Date;
}
interface RSVPManagerToolProps {
    eventDetails: EventDetails;
    config: RSVPManagerConfig;
    responses?: RSVPResponse[];
    onRSVPUpdate?: (responseId: string, updates: Partial<RSVPResponse>) => Promise<void>;
    onBulkAction?: (action: string, responseIds: string[]) => Promise<void>;
    onSendReminder?: (userIds: string[]) => Promise<void>;
    onExportData?: (format: 'csv' | 'json') => Promise<void>;
    className?: string;
}
export declare const RSVPManagerTool: React.FC<RSVPManagerToolProps>;
export default RSVPManagerTool;
//# sourceMappingURL=RSVPManagerTool.d.ts.map