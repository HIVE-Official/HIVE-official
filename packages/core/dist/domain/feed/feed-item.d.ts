/**
 * FeedItem Entity
 * Represents an item in a user's feed
 */
import { Entity } from '../shared/base/Entity.base';
import { Result } from '../shared/base/Result';
import { FeedItemId } from './value-objects/feed-item-id.value';
import { ProfileId } from '../profile/value-objects/profile-id.value';
import { SpaceId } from '../spaces/value-objects/space-id.value';
export interface FeedItemContent {
    title?: string;
    text: string;
    mediaUrls: string[];
    authorId: string;
    authorName: string;
    authorPhoto?: string;
}
export interface FeedItemSource {
    type: 'space' | 'ritual' | 'event' | 'announcement' | 'user';
    spaceId?: SpaceId;
    ritualId?: string;
    eventId?: string;
}
export interface FeedItemInteraction {
    type: 'like' | 'comment' | 'share' | 'view';
    userId: ProfileId;
    timestamp: Date;
}
interface FeedItemProps {
    itemId: FeedItemId;
    content: FeedItemContent;
    source: FeedItemSource;
    relevanceScore: number;
    interactions: FeedItemInteraction[];
    createdAt: Date;
    isVisible: boolean;
    isTrending: boolean;
    isPinned: boolean;
    expiresAt?: Date;
}
export declare class FeedItem extends Entity<FeedItemProps> {
    get itemId(): FeedItemId;
    get content(): FeedItemContent;
    get source(): FeedItemSource;
    get relevanceScore(): number;
    get interactions(): FeedItemInteraction[];
    get isVisible(): boolean;
    get isTrending(): boolean;
    get createdAt(): Date;
    private constructor();
    static create(props: {
        itemId: FeedItemId;
        content: FeedItemContent;
        source: FeedItemSource;
        relevanceScore?: number;
        isVisible?: boolean;
        isTrending?: boolean;
        isPinned?: boolean;
        expiresAt?: Date;
    }, id?: string): Result<FeedItem>;
    addInteraction(interaction: FeedItemInteraction): void;
    removeInteraction(userId: ProfileId, type: string): void;
    setVisibility(isVisible: boolean): void;
    setTrending(isTrending: boolean): void;
    setPinned(isPinned: boolean): void;
    isExpired(): boolean;
    private updateRelevanceScore;
    toData(): any;
}
export {};
//# sourceMappingURL=feed-item.d.ts.map