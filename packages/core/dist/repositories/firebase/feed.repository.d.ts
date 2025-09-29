/**
 * Firebase Feed Repository
 * Firestore implementation for Feed domain with real-time updates
 */
import { IFeedRepository } from '../interfaces';
import { Feed, FeedItem, ProfileId, SpaceId, Result } from '../../domain';
export declare class FirebaseFeedRepository implements IFeedRepository {
    private readonly feedsCollection;
    private readonly feedItemsCollection;
    private readonly interactionsCollection;
    saveFeed(feed: Feed): Promise<Result<void>>;
    findByUserId(userId: ProfileId): Promise<Result<Feed>>;
    getFeedContent(userId: ProfileId, userSpaces: SpaceId[], userConnections: ProfileId[], limitCount?: number): Promise<Result<FeedItem[]>>;
    getTrendingContent(campusId: string, limitCount?: number): Promise<Result<FeedItem[]>>;
    getEventContent(campusId: string, limitCount?: number): Promise<Result<FeedItem[]>>;
    getRitualContent(campusId: string, limitCount?: number): Promise<Result<FeedItem[]>>;
    recordInteraction(userId: ProfileId, itemId: string, interactionType: string, metadata?: Record<string, unknown>): Promise<Result<void>>;
    subscribeToFeed(userId: ProfileId, callback: (items: FeedItem[]) => void): () => void;
    private updateEngagementCount;
    private shouldIncludeItem;
    private isRelevantToUser;
    private feedToFirestore;
    private firestoreToFeed;
    private firestoreToFeedItem;
}
//# sourceMappingURL=feed.repository.d.ts.map