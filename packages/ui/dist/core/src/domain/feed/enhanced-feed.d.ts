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
    /**
     * Business Logic: Apply content filtering based on user options
     * Moved from FeedGenerationService
     */
    applyContentFilters(items: FeedItem[], options: {
        includeSpacePosts?: boolean;
        includeRSSPosts?: boolean;
        includeConnectionActivity?: boolean;
        includeEvents?: boolean;
        includeRituals?: boolean;
    }): FeedItem[];
    /**
     * Business Logic: Generate feed insights from current items
     * Moved from FeedGenerationService
     */
    generateInsights(items: FeedItem[]): {
        primaryContentType: string;
        engagementRate: number;
        averageScore: number;
        topSpaces: string[];
        suggestedAdjustments: string[];
    };
    /**
     * Business Logic: Generate algorithm adjustment suggestions
     * Moved from FeedGenerationService
     */
    getSuggestedAdjustments(primaryContentType: string, engagementRate: number, averageScore: number): string[];
    /**
     * Business Logic: Adjust algorithm weights based on user feedback
     * Moved from FeedGenerationService
     */
    adjustWeightsFromFeedback(feedback: 'positive' | 'negative', itemType: string): void;
    toData(): any;
}
export {};
//# sourceMappingURL=enhanced-feed.d.ts.map