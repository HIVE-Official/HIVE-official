import * as React from "react";
/**
 * Campus-specific event context for HIVE-native presentation
 */
export interface EventCampusContext {
    /** Friends/connections who are attending (HIVE-native: show names, not counts) */
    friendsGoing?: Array<{
        id: string;
        name: string;
        avatar?: string;
        major?: string;
        year?: string;
    }>;
    /** Campus-specific trending indicator */
    isTrending?: boolean;
    trendingCategory?: string;
    /** Space type context */
    spaceType?: "academic" | "greek" | "residential" | "interest" | "official";
    /** Campus cohort breakdown (HIVE-native, not generic demographics) */
    attendeeCohorts?: {
        majorGroups?: Array<{
            major: string;
            count: number;
        }>;
        residentialGroups?: Array<{
            building: string;
            count: number;
        }>;
        yearGroups?: Array<{
            year: string;
            count: number;
        }>;
    };
    /** Activity signals (campus-specific) */
    recentRsvps?: number;
    similarEventAttendance?: number;
}
export interface FeedEvent {
    id: string;
    title: string;
    description: string;
    space: {
        name: string;
        id: string;
        icon?: string;
    };
    dateTime: {
        raw: Date;
        display: string;
        isUrgent: boolean;
        isToday: boolean;
        isSoon: boolean;
    };
    location: {
        name: string;
        type: "on-campus" | "off-campus" | "virtual";
    };
    capacity?: {
        current: number;
        max: number;
        isFillingFast?: boolean;
    };
    attendees: {
        count: number;
        friends: Array<{
            name: string;
            avatar?: string;
        }>;
        preview: string[];
    };
    rsvp: {
        status: "going" | "interested" | "not-going" | null;
        canRsvp: boolean;
    };
    coverImage?: string;
    category?: "social" | "academic" | "sports" | "greek" | "wellness";
    isTrending?: boolean;
    /** Campus context (HIVE-native presentation) */
    campusContext?: EventCampusContext;
}
export interface FeedEventCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Event data */
    event: FeedEvent;
    /** RSVP handler */
    onRsvp?: (eventId: string, status: "going" | "interested") => void;
    /** Share handler */
    onShare?: (eventId: string) => void;
    /** Save handler */
    onSave?: (eventId: string) => void;
    /** View details handler */
    onViewDetails?: (eventId: string) => void;
    /** Space click handler */
    onSpaceClick?: (spaceId: string) => void;
    /** Compact mode */
    compact?: boolean;
}
declare const FeedEventCard: React.ForwardRefExoticComponent<FeedEventCardProps & React.RefAttributes<HTMLDivElement>>;
export { FeedEventCard };
//# sourceMappingURL=feed-event-card.d.ts.map