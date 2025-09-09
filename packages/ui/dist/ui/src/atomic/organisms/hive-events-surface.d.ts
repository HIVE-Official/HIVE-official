import React from 'react';
import type { Space } from '../../types';
export type EventType = 'meeting' | 'social' | 'academic' | 'service' | 'other';
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
export type RSVPStatus = 'yes' | 'no' | 'maybe';
export interface EventRSVP {
    userId: string;
    userName: string;
    status: RSVPStatus;
    timestamp: Date;
}
export interface SpaceEvent {
    id: string;
    title: string;
    description: string;
    type: EventType;
    status: EventStatus;
    startDate: Date;
    endDate?: Date;
    location?: string;
    capacity?: number;
    isVirtual?: boolean;
    virtualLink?: string;
    organizer: {
        id: string;
        name: string;
        role?: string;
    };
    rsvps: EventRSVP[];
    requiresRSVP: boolean;
    rsvpDeadline?: Date;
    createdAt: Date;
    tags?: string[];
}
export interface HiveEventsSurfaceProps {
    space: Space;
    events?: SpaceEvent[];
    maxEvents?: number;
    canCreateEvents?: boolean;
    canModerate?: boolean;
    leaderMode?: 'configure' | 'moderate' | 'insights' | null;
    viewMode?: 'list' | 'calendar' | 'grid';
    onCreateEvent?: () => void;
    onRSVPEvent?: (eventId: string, status: RSVPStatus) => void;
    onEditEvent?: (eventId: string) => void;
    onCancelEvent?: (eventId: string) => void;
}
export declare const HiveEventsSurface: React.FC<HiveEventsSurfaceProps>;
export default HiveEventsSurface;
//# sourceMappingURL=hive-events-surface.d.ts.map