/**
 * Get Feed Query
 * Fetches the personalized feed for a user
 */

import { FeedItem } from '../../../domain/feed/feed-item';

export interface GetFeedQuery {
  userId: string;
  campusId: string;
  limit?: number;
  offset?: number;
  filters?: {
    spaceIds?: string[];
    types?: string[];
    sortBy?: 'recent' | 'popular' | 'relevant';
  };
}

export interface GetFeedQueryResult {
  items: FeedItem[];
  hasMore: boolean;
  nextOffset: number;
  totalCount?: number;
}

export class GetFeedQueryHandler {
  constructor(private readonly feedService?: any) {}

  async execute(query: GetFeedQuery): Promise<GetFeedQueryResult> {
    const constraints = this.buildFeedQuery(query);
    const limit = query.limit ?? 20;
    const offset = query.offset ?? 0;

    let rawItems: FeedItem[] = [];

    if (this.feedService && typeof this.feedService.fetch === 'function') {
      rawItems =
        (await this.feedService.fetch({
          constraints,
          limit: limit + offset,
          offset,
          filters: query.filters,
          userId: query.userId,
          campusId: query.campusId
        })) ?? [];
    }

    const sortedItems = this.applySorting([...rawItems], query.filters?.sortBy);
    const paginatedItems = sortedItems.slice(offset, offset + limit);
    const totalCount = sortedItems.length;
    const nextOffset = offset + paginatedItems.length;

    return {
      items: paginatedItems,
      hasMore: nextOffset < totalCount,
      nextOffset,
      totalCount
    };
  }

  // Helper method for building feed queries
  private buildFeedQuery(query: GetFeedQuery): any {
    const constraints: any[] = [];

    // Campus isolation
    if (query.campusId) {
      constraints.push(['campusId', '==', query.campusId]);
    }

    // Space filtering
    if (query.filters?.spaceIds?.length) {
      constraints.push(['spaceId', 'in', query.filters.spaceIds]);
    }

    // Type filtering
    if (query.filters?.types?.length) {
      constraints.push(['type', 'in', query.filters.types]);
    }

    return constraints;
  }

  // Helper method for sorting
  private applySorting(items: FeedItem[], sortBy?: string): FeedItem[] {
    switch (sortBy) {
      case 'popular':
        // Sort by engagement metrics (likes, comments, shares)
        return items.sort((a, b) => {
          const aScore = (a as any).engagementScore || 0;
          const bScore = (b as any).engagementScore || 0;
          return bScore - aScore;
        });
      case 'relevant':
        // Sort by relevance score
        return items.sort((a, b) => {
          const aScore = (a as any).relevanceScore || 0;
          const bScore = (b as any).relevanceScore || 0;
          return bScore - aScore;
        });
      case 'recent':
      default:
        return items.sort((a, b) => {
          const aTime = a.createdAt?.getTime() || 0;
          const bTime = b.createdAt?.getTime() || 0;
          return bTime - aTime;
        });
    }
  }
}
