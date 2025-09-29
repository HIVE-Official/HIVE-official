/**
 * Firebase Feed Repository Implementation
 * Handles feed persistence and retrieval
 */
import { IFeedRepository } from '../interfaces';
import { Result } from '../../../domain/shared/base/Result';
import { EnhancedFeed } from '../../../domain/feed/enhanced-feed';
import { FeedId } from '../../../domain/feed/value-objects';
import { ProfileId } from '../../../domain/profile/value-objects/profile-id.value';
export declare class FirebaseFeedRepository implements IFeedRepository {
    private readonly collectionName;
    private readonly feedItemsCollection;
    findById(id: FeedId | any): Promise<Result<EnhancedFeed>>;
    findByUserId(userId: ProfileId | any): Promise<Result<EnhancedFeed>>;
    findByCampus(campusId: string): Promise<Result<EnhancedFeed[]>>;
    addFeedItem(feedId: string, item: any): Promise<Result<void>>;
    removeFeedItem(feedId: string, itemId: string): Promise<Result<void>>;
    save(feed: EnhancedFeed): Promise<Result<void>>;
    delete(id: FeedId | any): Promise<Result<void>>;
    private createFeedForUser;
    private loadFeedItems;
    private saveFeedItems;
    private toDomain;
    private toPersistence;
    saveFeed(feed: EnhancedFeed): Promise<Result<void>>;
    getFeedContent(userId: string, userSpaces: any[], userConnections: any[], limitCount?: number): Promise<Result<any[]>>;
    getTrendingContent(campusId: string, limitCount?: number): Promise<Result<any[]>>;
    getEventContent(campusId: string, limitCount?: number): Promise<Result<any[]>>;
    getRitualContent(campusId: string, limitCount?: number): Promise<Result<any[]>>;
    recordInteraction(userId: string, itemId: string, interactionType: string, metadata?: Record<string, unknown>): Promise<Result<void>>;
    subscribeToFeed(userId: string, callback: (items: any[]) => void): () => void;
}
//# sourceMappingURL=feed.repository.d.ts.map