import * as React from 'react';
import { type MediaItem } from '../molecules/feed-media-preview';
import type { FeedCardSpace } from './feed-card-post';
export type FeedEventStatus = 'upcoming' | 'today' | 'sold_out' | 'past';
export interface FeedCardEventMeta {
    scheduleLabel: string;
    locationLabel?: string;
    status: FeedEventStatus;
}
export interface FeedCardEventStats {
    attendingCount: number;
    capacity?: number;
    isAttending: boolean;
}
export interface FeedCardEventData {
    id: string;
    title: string;
    description?: string;
    space: FeedCardSpace;
    coverImage?: MediaItem;
    meta: FeedCardEventMeta;
    stats: FeedCardEventStats;
}
export interface FeedCardEventCallbacks {
    onViewDetails?: (eventId: string) => void;
    onToggleRsvp?: (eventId: string, nextValue: boolean) => void;
    onSpaceClick?: (spaceId: string) => void;
}
export interface FeedCardEventProps extends FeedCardEventCallbacks, React.HTMLAttributes<HTMLDivElement> {
    event: FeedCardEventData;
}
export declare const FeedCardEvent: React.ForwardRefExoticComponent<FeedCardEventProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=feed-card-event.d.ts.map