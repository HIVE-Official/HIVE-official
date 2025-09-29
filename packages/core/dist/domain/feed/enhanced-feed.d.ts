/**
 * EnhancedFeed Aggregate
 * Represents a personalized feed for a user
 */
import { AggregateRoot } from '../shared/base/AggregateRoot.base';
import { Result } from '../shared/base/Result';
import { FeedId } from './value-objects/feed-id.value';
import { ProfileId } from '../profile/value-objects/profile-id.value';
import { CampusId } from '../profile/value-objects/campus-id.value';
import { FeedItem } from './feed-item';
export type FeedFilterType = 'all' | 'spaces' | 'rituals' | 'events' | 'trending';
interface FeedFilter {
    type: FeedFilterType;
    value?: any;
}
interface EnhancedFeedProps {
    feedId: FeedId;
    userId: ProfileId;
    campusId: CampusId;
    items: FeedItem[];
    filters: FeedFilter[];
    lastUpdated: Date;
    lastRefresh: Date;
    isActive: boolean;
}
export declare class EnhancedFeed extends AggregateRoot<EnhancedFeedProps> {
    private static readonly MAX_ITEMS;
    private static readonly REFRESH_INTERVAL_MS;
    get feedId(): FeedId;
    get userId(): ProfileId;
    get campusId(): CampusId;
    get items(): FeedItem[];
    get itemCount(): number;
    get lastUpdated(): Date;
    private constructor();
    static create(userId: ProfileId, campusId: CampusId, id?: string): Result<EnhancedFeed>;
    static createWithCampus(userId: ProfileId, campusId: string): Result<EnhancedFeed>;
    addItem(item: FeedItem): Result<void>;
    addItems(items: FeedItem[]): Result<void>;
    removeItem(itemId: string): Result<void>;
    applyFilter(filter: FeedFilter): void;
    addFilter(filter: FeedFilter): void;
    clearFilters(): void;
    getFilteredItems(): FeedItem[];
    getCampusItems(): FeedItem[];
    needsRefresh(): boolean;
    markRefreshed(): void;
    deactivate(): void;
    activate(): void;
    private removeOldestItems;
    private sortItems;
    updatePreferences(preferences: any): void;
    adjustAlgorithmWeights(adjustments: Record<string, number>): void;
    toData(): any;
}
export {};
//# sourceMappingURL=enhanced-feed.d.ts.map