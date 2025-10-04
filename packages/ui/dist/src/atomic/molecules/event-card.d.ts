/**
 * Event Card Component
 *
 * Implements SPEC.md event cards (lines 454-507) with behavioral psychology:
 * - Visual distinction from posts (colored border)
 * - Social proof ("Jake, Sarah +45 going")
 * - Urgency indicators with countdown timers
 * - One-tap RSVP from feed
 * - FOMO generation ("🔥 Filling up fast")
 */
import * as React from "react";
export interface EventData {
    id: string;
    title: string;
    description?: string;
    startTime: string;
    endTime?: string;
    timezone?: string;
    location?: {
        name: string;
        address?: string;
        building?: string;
        room?: string;
        isOnCampus: boolean;
    };
    hostSpace: {
        id: string;
        name: string;
        category: 'university_org' | 'student_org' | 'residential' | 'greek_life';
    };
    rsvp: {
        going: number;
        interested: number;
        capacity?: number;
        hasRSVPed: boolean;
        rsvpType?: 'going' | 'interested' | null;
    };
    attendees?: {
        preview: Array<{
            name: string;
            avatar?: string;
            isConnection?: boolean;
        }>;
        friendsGoing: string[];
        connectionsCount: number;
    };
    coverImage?: string;
    urgencyLevel: 'low' | 'medium' | 'high';
    isFillingUp?: boolean;
    isTrending?: boolean;
    requiresApproval?: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Event data */
    event: EventData;
    /** RSVP handler */
    onRSVP?: (eventId: string, type: 'going' | 'interested') => void;
    /** Share handler */
    onShare?: (eventId: string) => void;
    /** Save handler */
    onSave?: (eventId: string) => void;
    /** Space navigation handler */
    onSpaceClick?: (spaceId: string) => void;
    /** Show compact version for feed */
    compact?: boolean;
    /** Enable behavioral psychology features */
    enablePsychology?: boolean;
}
declare const EventCard: React.ForwardRefExoticComponent<EventCardProps & React.RefAttributes<HTMLDivElement>>;
export { EventCard };
export type { EventData };
//# sourceMappingURL=event-card.d.ts.map