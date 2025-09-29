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

export class FeedItem extends Entity<FeedItemProps> {
  get itemId(): FeedItemId {
    return this.props.itemId;
  }

  get content(): FeedItemContent {
    return this.props.content;
  }

  get source(): FeedItemSource {
    return this.props.source;
  }

  get relevanceScore(): number {
    return this.props.relevanceScore;
  }

  get interactions(): FeedItemInteraction[] {
    return this.props.interactions;
  }

  get isVisible(): boolean {
    return this.props.isVisible;
  }

  get isTrending(): boolean {
    return this.props.isTrending;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  private constructor(props: FeedItemProps, id?: string) {
    super(props, id || `feeditem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }

  public static create(props: {
    itemId: FeedItemId;
    content: FeedItemContent;
    source: FeedItemSource;
    relevanceScore?: number;
    isVisible?: boolean;
    isTrending?: boolean;
    isPinned?: boolean;
    expiresAt?: Date;
  }, id?: string): Result<FeedItem> {
    if (!props.content.text || props.content.text.trim().length === 0) {
      return Result.fail<FeedItem>('Feed item content text is required');
    }

    const itemProps: FeedItemProps = {
      itemId: props.itemId,
      content: props.content,
      source: props.source,
      relevanceScore: props.relevanceScore || 1.0,
      interactions: [],
      createdAt: new Date(),
      isVisible: props.isVisible !== false,
      isTrending: props.isTrending || false,
      isPinned: props.isPinned || false,
      expiresAt: props.expiresAt
    };

    return Result.ok<FeedItem>(new FeedItem(itemProps, id));
  }

  public addInteraction(interaction: FeedItemInteraction): void {
    // Avoid duplicate interactions
    const exists = this.props.interactions.some(
      i => i.type === interaction.type &&
           i.userId.value === interaction.userId.value
    );

    if (!exists) {
      this.props.interactions.push(interaction);
      this.updateRelevanceScore();
    }
  }

  public removeInteraction(userId: ProfileId, type: string): void {
    this.props.interactions = this.props.interactions.filter(
      i => !(i.userId.value === userId.value && i.type === type)
    );
    this.updateRelevanceScore();
  }

  public setVisibility(isVisible: boolean): void {
    this.props.isVisible = isVisible;
  }

  public setTrending(isTrending: boolean): void {
    this.props.isTrending = isTrending;
  }

  public setPinned(isPinned: boolean): void {
    this.props.isPinned = isPinned;
  }

  public isExpired(): boolean {
    if (!this.props.expiresAt) return false;
    return new Date() > this.props.expiresAt;
  }

  private updateRelevanceScore(): void {
    // Simple relevance scoring based on interactions
    const likes = this.props.interactions.filter(i => i.type === 'like').length;
    const comments = this.props.interactions.filter(i => i.type === 'comment').length;
    const shares = this.props.interactions.filter(i => i.type === 'share').length;

    this.props.relevanceScore = 1.0 + (likes * 0.1) + (comments * 0.3) + (shares * 0.5);

    // Boost for trending items
    if (this.props.isTrending) {
      this.props.relevanceScore *= 1.5;
    }

    // Decay based on age
    const ageInHours = (Date.now() - this.props.createdAt.getTime()) / (1000 * 60 * 60);
    this.props.relevanceScore *= Math.exp(-ageInHours / 24); // Exponential decay over 24 hours
  }

  public toData(): any {
    return {
      id: this.id,
      itemId: this.props.itemId.value,
      content: this.props.content,
      source: this.props.source,
      relevanceScore: this.props.relevanceScore,
      interactions: this.props.interactions.map(i => ({
        type: i.type,
        userId: i.userId.value,
        timestamp: i.timestamp
      })),
      createdAt: this.props.createdAt,
      isVisible: this.props.isVisible,
      isTrending: this.props.isTrending,
      isPinned: this.props.isPinned,
      expiresAt: this.props.expiresAt
    };
  }
}