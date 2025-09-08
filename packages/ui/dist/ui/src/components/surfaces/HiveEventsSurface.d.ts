import React from 'react';
interface SpaceEvent {
    id: string;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    location?: {
        type: 'physical' | 'virtual' | 'hybrid';
        name: string;
        address?: string;
        url?: string;
    };
    organizer: {
        id: string;
        name: string;
        avatar?: string;
    };
    attendees: {
        going: number;
        maybe: number;
        invited: number;
    };
    rsvpStatus?: 'going' | 'maybe' | 'not_going' | null;
    tags?: string[];
    isRecurring?: boolean;
    recurringPattern?: string;
    spaceId: string;
    visibility: 'public' | 'members' | 'invite';
}
export interface HiveEventsSurfaceProps {
    spaceId: string;
    spaceName?: string;
    isLeader?: boolean;
    currentUserId?: string;
    className?: string;
    variant?: 'widget' | 'full' | 'compact';
    events?: SpaceEvent[];
    loading?: boolean;
    error?: Error | null;
    onCreateEvent?: () => void;
    onEditEvent?: (eventId: string) => void;
    onDeleteEvent?: (eventId: string) => Promise<void>;
    onRSVP?: (eventId: string, status: 'going' | 'maybe' | 'not_going') => Promise<void>;
}
export declare const HiveEventsSurface: React.FC<HiveEventsSurfaceProps>;
export {};
//# sourceMappingURL=HiveEventsSurface.d.ts.map