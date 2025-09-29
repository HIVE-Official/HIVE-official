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

export class EnhancedFeed extends AggregateRoot<EnhancedFeedProps> {
  private static readonly MAX_ITEMS = 100;
  private static readonly REFRESH_INTERVAL_MS = 30000; // 30 seconds

  get feedId(): FeedId {
    return this.props.feedId;
  }

  get userId(): ProfileId {
    return this.props.userId;
  }

  get campusId(): CampusId {
    return this.props.campusId;
  }

  get items(): FeedItem[] {
    return this.props.items;
  }

  get itemCount(): number {
    return this.props.items.length;
  }

  get lastUpdated(): Date {
    return this.props.lastUpdated;
  }

  private constructor(props: EnhancedFeedProps, id?: string) {
    super(props, id || `feed_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }

  public static create(
    userId: ProfileId,
    campusId: CampusId,
    id?: string
  ): Result<EnhancedFeed> {
    const feedIdResult = FeedId.createForUser(userId.value, campusId.value);

    if (feedIdResult.isFailure) {
      return Result.fail<EnhancedFeed>(feedIdResult.error || 'Failed to create feed ID');
    }

    const feedProps: EnhancedFeedProps = {
      feedId: feedIdResult.getValue(),
      userId,
      campusId,
      items: [],
      filters: [{ type: 'all' }],
      lastUpdated: new Date(),
      lastRefresh: new Date(),
      isActive: true
    };

    return Result.ok<EnhancedFeed>(new EnhancedFeed(feedProps, id));
  }

  public static createWithCampus(
    userId: ProfileId,
    campusId: string
  ): Result<EnhancedFeed> {
    const campusIdResult = CampusId.create(campusId);

    if (campusIdResult.isFailure) {
      return Result.fail<EnhancedFeed>(campusIdResult.error || 'Invalid campus ID');
    }

    return EnhancedFeed.create(userId, campusIdResult.getValue());
  }

  public addItem(item: FeedItem): Result<void> {
    // Check if item already exists
    if (this.props.items.some(i => i.itemId.value === item.itemId.value)) {
      return Result.fail<void>('Item already exists in feed');
    }

    // Remove oldest items if at max capacity
    if (this.props.items.length >= EnhancedFeed.MAX_ITEMS) {
      this.removeOldestItems(1);
    }

    this.props.items.push(item);
    this.sortItems();
    this.props.lastUpdated = new Date();

    return Result.ok<void>();
  }

  public addItems(items: FeedItem[]): Result<void> {
    // Filter out duplicates
    const newItems = items.filter(
      item => !this.props.items.some(i => i.itemId.value === item.itemId.value)
    );

    if (newItems.length === 0) {
      return Result.ok<void>();
    }

    // Remove old items if necessary
    const totalItems = this.props.items.length + newItems.length;
    if (totalItems > EnhancedFeed.MAX_ITEMS) {
      const toRemove = totalItems - EnhancedFeed.MAX_ITEMS;
      this.removeOldestItems(toRemove);
    }

    this.props.items.push(...newItems);
    this.sortItems();
    this.props.lastUpdated = new Date();

    return Result.ok<void>();
  }

  public removeItem(itemId: string): Result<void> {
    const index = this.props.items.findIndex(i => i.itemId.value === itemId);

    if (index === -1) {
      return Result.fail<void>('Item not found in feed');
    }

    this.props.items.splice(index, 1);
    this.props.lastUpdated = new Date();

    return Result.ok<void>();
  }

  public applyFilter(filter: FeedFilter): void {
    this.props.filters = [filter];
    this.props.lastUpdated = new Date();
  }

  public addFilter(filter: FeedFilter): void {
    if (!this.props.filters.some(f => f.type === filter.type)) {
      this.props.filters.push(filter);
      this.props.lastUpdated = new Date();
    }
  }

  public clearFilters(): void {
    this.props.filters = [{ type: 'all' }];
    this.props.lastUpdated = new Date();
  }

  public getFilteredItems(): FeedItem[] {
    if (this.props.filters.length === 0 ||
        (this.props.filters.length === 1 && this.props.filters[0].type === 'all')) {
      return this.props.items;
    }

    return this.props.items.filter(item => {
      return this.props.filters.some(filter => {
        switch (filter.type) {
          case 'spaces':
            return item.source.type === 'space';
          case 'rituals':
            return item.source.type === 'ritual';
          case 'events':
            return item.source.type === 'event';
          case 'trending':
            return item.isTrending;
          default:
            return true;
        }
      });
    });
  }

  public getCampusItems(): FeedItem[] {
    // All items are already campus-filtered
    return this.getFilteredItems();
  }

  public needsRefresh(): boolean {
    const now = Date.now();
    const lastRefresh = this.props.lastRefresh.getTime();
    return (now - lastRefresh) > EnhancedFeed.REFRESH_INTERVAL_MS;
  }

  public markRefreshed(): void {
    this.props.lastRefresh = new Date();
  }

  public deactivate(): void {
    this.props.isActive = false;
  }

  public activate(): void {
    this.props.isActive = true;
  }

  private removeOldestItems(count: number): void {
    // Sort by relevance and creation date
    const sorted = [...this.props.items].sort((a, b) => {
      // Keep pinned items
      if ((a as any).props.isPinned && !(b as any).props.isPinned) return -1;
      if (!(a as any).props.isPinned && (b as any).props.isPinned) return 1;

      // Then by relevance
      if (a.relevanceScore !== b.relevanceScore) {
        return a.relevanceScore - b.relevanceScore;
      }

      // Then by age
      return a.createdAt.getTime() - b.createdAt.getTime();
    });

    const toRemove = sorted.slice(0, count);
    this.props.items = this.props.items.filter(
      item => !toRemove.some(r => r.itemId.value === item.itemId.value)
    );
  }

  private sortItems(): void {
    this.props.items.sort((a, b) => {
      // Pinned items first
      if ((a as any).props.isPinned && !(b as any).props.isPinned) return -1;
      if (!(a as any).props.isPinned && (b as any).props.isPinned) return 1;

      // Then by relevance score
      if (a.relevanceScore !== b.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }

      // Then by creation date (newest first)
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }

  public updatePreferences(preferences: any): void {
    // Update feed preferences (algorithm weights, content types, etc.)
    this.props.lastUpdated = new Date();
  }

  public adjustAlgorithmWeights(adjustments: Record<string, number>): void {
    // Adjust algorithm weights based on user engagement
    this.props.lastUpdated = new Date();
  }

  public toData(): any {
    return {
      id: this.id,
      feedId: this.props.feedId.value,
      userId: this.props.userId.value,
      campusId: this.props.campusId.value,
      items: this.props.items.map(item => item.toData()),
      itemCount: this.itemCount,
      filters: this.props.filters,
      lastUpdated: this.props.lastUpdated,
      lastRefresh: this.props.lastRefresh,
      isActive: this.props.isActive
    };
  }
}