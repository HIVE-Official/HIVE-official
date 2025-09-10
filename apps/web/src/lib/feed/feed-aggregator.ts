/**
 * HIVE Feed Aggregation Algorithm
 * 
 * Priorities:
 * - 45% Events (parties, study sessions, food runs)
 * - 25% Coordination posts (looking for roommate, ride shares)
 * - 20% Discussions (questions, debates)
 * - 10% Resources & announcements
 */

import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface FeedItem {
  id: string;
  type: 'event' | 'post' | 'ritual' | 'coordination' | 'announcement';
  spaceId: string;
  spaceName: string;
  spaceAvatar?: string;
  
  // Content
  title?: string;
  content: string;
  imageUrl?: string;
  
  // Event specific
  eventTime?: Date;
  eventLocation?: string;
  eventAttendees?: number;
  maxAttendees?: number;
  isRSVPed?: boolean;
  
  // Coordination specific
  coordinationType?: 'ride_share' | 'food_run' | 'study_session' | 'roommate' | 'other';
  status?: 'open' | 'filled' | 'cancelled';
  participantCount?: number;
  maxParticipants?: number;
  
  // Engagement
  author: {
    id: string;
    name: string;
    avatar?: string;
    year?: string;
    major?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  
  likes: number;
  comments: number;
  shares: number;
  
  // User interaction
  isLiked?: boolean;
  isSaved?: boolean;
  isJoined?: boolean;
  
  // Scoring
  relevanceScore: number;
  freshnessScore: number;
  engagementScore: number;
  totalScore: number;
}

export interface FeedFilters {
  timeRange: 'today' | 'week' | 'month' | 'all';
  contentTypes: Array<'events' | 'posts' | 'rituals' | 'coordination'>;
  spaces?: string[];
  tags?: string[];
  onlyJoined?: boolean;
  onlyRSVPed?: boolean;
}

export interface FeedAggregatorOptions {
  userId: string;
  userSpaces: string[];
  userInterests: string[];
  pageSize?: number;
  filters?: FeedFilters;
}

export class FeedAggregator {
  private readonly CONTENT_WEIGHTS = {
    event: 0.45,          // 45% - Parties, study sessions, campus events
    coordination: 0.25,   // 25% - Ride shares, food runs, roommate searches
    post: 0.20,          // 20% - Discussions, questions
    announcement: 0.10    // 10% - Resources, official announcements
  };

  private readonly FRESHNESS_DECAY = {
    hour: 1.0,
    day: 0.8,
    week: 0.5,
    month: 0.2,
    older: 0.1
  };

  constructor(private options: FeedAggregatorOptions) {}

  async aggregate(cursor?: string): Promise<{ items: FeedItem[]; nextCursor?: string }> {
    const pageSize = this.options.pageSize || 20;
    
    // Fetch content from different sources
    const [events, posts, coordination] = await Promise.all([
      this.fetchEvents(pageSize * 2),  // Fetch more to ensure we have enough after filtering
      this.fetchPosts(pageSize * 2),
      this.fetchCoordination(pageSize * 2)
    ]);

    // Score and combine all items
    const allItems = [
      ...events.map(e => this.scoreItem(e, 'event')),
      ...posts.map(p => this.scoreItem(p, 'post')),
      ...coordination.map(c => this.scoreItem(c, 'coordination'))
    ];

    // Sort by total score
    allItems.sort((a, b) => b.totalScore - a.totalScore);

    // Apply content type distribution
    const finalItems = this.applyContentDistribution(allItems, pageSize);

    // Apply filters if any
    const filteredItems = this.applyFilters(finalItems);

    return {
      items: filteredItems.slice(0, pageSize),
      nextCursor: filteredItems.length > pageSize ? this.generateCursor(filteredItems[pageSize - 1]) : undefined
    };
  }

  private async fetchEvents(maxLimit: number): Promise<FeedItem[]> {
    const eventsQuery = query(
      collection(db, 'events'),
      where('spaceId', 'in', this.options.userSpaces),
      where('startTime', '>=', Timestamp.now()),
      orderBy('startTime', 'asc'),
      limit(maxLimit)
    );

    const snapshot = await getDocs(eventsQuery);
    
    return snapshot.docs.map(doc => this.transformEventToFeedItem(doc));
  }

  private async fetchPosts(maxLimit: number): Promise<FeedItem[]> {
    const postsQuery = query(
      collection(db, 'posts'),
      where('spaceId', 'in', this.options.userSpaces),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc'),
      limit(maxLimit)
    );

    const snapshot = await getDocs(postsQuery);
    
    return snapshot.docs.map(doc => this.transformPostToFeedItem(doc));
  }

  private async fetchCoordination(maxLimit: number): Promise<FeedItem[]> {
    // Coordination posts are posts with specific tags
    const coordinationQuery = query(
      collection(db, 'posts'),
      where('spaceId', 'in', this.options.userSpaces),
      where('tags', 'array-contains-any', ['ride_share', 'food_run', 'study_session', 'roommate_search']),
      where('status', '==', 'open'),
      orderBy('createdAt', 'desc'),
      limit(maxLimit)
    );

    const snapshot = await getDocs(coordinationQuery);
    
    return snapshot.docs.map(doc => this.transformCoordinationToFeedItem(doc));
  }

  private transformEventToFeedItem(doc: QueryDocumentSnapshot<DocumentData>): FeedItem {
    const data = doc.data();
    return {
      id: doc.id,
      type: 'event',
      spaceId: data.spaceId,
      spaceName: data.spaceName,
      spaceAvatar: data.spaceAvatar,
      
      title: data.title,
      content: data.description,
      imageUrl: data.coverImage,
      
      eventTime: data.startTime?.toDate(),
      eventLocation: data.location,
      eventAttendees: data.attendeeCount || 0,
      maxAttendees: data.maxAttendees,
      isRSVPed: data.attendees?.includes(this.options.userId),
      
      author: {
        id: data.organizerId,
        name: data.organizerName,
        avatar: data.organizerAvatar,
        year: data.organizerYear,
        major: data.organizerMajor
      },
      
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
      
      likes: data.likes || 0,
      comments: data.commentCount || 0,
      shares: data.shares || 0,
      
      isLiked: data.likedBy?.includes(this.options.userId),
      isSaved: data.savedBy?.includes(this.options.userId),
      
      relevanceScore: 0,
      freshnessScore: 0,
      engagementScore: 0,
      totalScore: 0
    };
  }

  private transformPostToFeedItem(doc: QueryDocumentSnapshot<DocumentData>): FeedItem {
    const data = doc.data();
    return {
      id: doc.id,
      type: 'post',
      spaceId: data.spaceId,
      spaceName: data.spaceName,
      spaceAvatar: data.spaceAvatar,
      
      content: data.content,
      imageUrl: data.imageUrl,
      
      author: {
        id: data.authorId,
        name: data.authorName,
        avatar: data.authorAvatar,
        year: data.authorYear,
        major: data.authorMajor
      },
      
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
      
      likes: data.likes || 0,
      comments: data.commentCount || 0,
      shares: data.shares || 0,
      
      isLiked: data.likedBy?.includes(this.options.userId),
      isSaved: data.savedBy?.includes(this.options.userId),
      
      relevanceScore: 0,
      freshnessScore: 0,
      engagementScore: 0,
      totalScore: 0
    };
  }

  private transformCoordinationToFeedItem(doc: QueryDocumentSnapshot<DocumentData>): FeedItem {
    const data = doc.data();
    
    // Determine coordination type from tags
    let coordinationType: FeedItem['coordinationType'] = 'other';
    if (data.tags?.includes('ride_share')) coordinationType = 'ride_share';
    else if (data.tags?.includes('food_run')) coordinationType = 'food_run';
    else if (data.tags?.includes('study_session')) coordinationType = 'study_session';
    else if (data.tags?.includes('roommate_search')) coordinationType = 'roommate';
    
    return {
      id: doc.id,
      type: 'coordination',
      spaceId: data.spaceId,
      spaceName: data.spaceName,
      spaceAvatar: data.spaceAvatar,
      
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
      
      coordinationType,
      status: data.status || 'open',
      participantCount: data.participants?.length || 0,
      maxParticipants: data.maxParticipants,
      
      author: {
        id: data.authorId,
        name: data.authorName,
        avatar: data.authorAvatar,
        year: data.authorYear,
        major: data.authorMajor
      },
      
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
      
      likes: data.likes || 0,
      comments: data.commentCount || 0,
      shares: data.shares || 0,
      
      isLiked: data.likedBy?.includes(this.options.userId),
      isSaved: data.savedBy?.includes(this.options.userId),
      isJoined: data.participants?.includes(this.options.userId),
      
      relevanceScore: 0,
      freshnessScore: 0,
      engagementScore: 0,
      totalScore: 0
    };
  }

  private scoreItem(item: FeedItem, type: string): FeedItem {
    // Calculate freshness score
    const ageInHours = (Date.now() - item.createdAt.getTime()) / (1000 * 60 * 60);
    let freshnessScore = 1.0;
    
    if (ageInHours < 1) freshnessScore = this.FRESHNESS_DECAY.hour;
    else if (ageInHours < 24) freshnessScore = this.FRESHNESS_DECAY.day;
    else if (ageInHours < 168) freshnessScore = this.FRESHNESS_DECAY.week;
    else if (ageInHours < 720) freshnessScore = this.FRESHNESS_DECAY.month;
    else freshnessScore = this.FRESHNESS_DECAY.older;
    
    // Events get freshness boost if happening soon
    if (type === 'event' && item.eventTime) {
      const hoursUntilEvent = (item.eventTime.getTime() - Date.now()) / (1000 * 60 * 60);
      if (hoursUntilEvent > 0 && hoursUntilEvent < 24) {
        freshnessScore *= 1.5; // Boost for events happening within 24 hours
      }
    }
    
    // Calculate engagement score
    const totalEngagement = item.likes + (item.comments * 2) + (item.shares * 3);
    const engagementScore = Math.min(1.0, totalEngagement / 100);
    
    // Calculate relevance score based on user interests
    let relevanceScore = 0.5; // Base relevance
    
    // Boost if from a space the user is active in
    if (this.options.userSpaces.includes(item.spaceId)) {
      relevanceScore += 0.2;
    }
    
    // Boost coordination posts that need participants
    if (type === 'coordination' && item.status === 'open') {
      const fillRate = (item.participantCount || 0) / (item.maxParticipants || 1);
      if (fillRate < 0.5) {
        relevanceScore += 0.3; // Boost posts that need more participants
      }
    }
    
    // Apply content type weight
    const typeWeight = this.CONTENT_WEIGHTS[type as keyof typeof this.CONTENT_WEIGHTS] || 0.1;
    
    // Calculate total score
    const totalScore = (
      (freshnessScore * 0.3) +
      (engagementScore * 0.2) +
      (relevanceScore * 0.3) +
      (typeWeight * 0.2)
    );
    
    return {
      ...item,
      freshnessScore,
      engagementScore,
      relevanceScore,
      totalScore
    };
  }

  private applyContentDistribution(items: FeedItem[], targetSize: number): FeedItem[] {
    const result: FeedItem[] = [];
    const targetCounts = {
      event: Math.floor(targetSize * this.CONTENT_WEIGHTS.event),
      coordination: Math.floor(targetSize * this.CONTENT_WEIGHTS.coordination),
      post: Math.floor(targetSize * this.CONTENT_WEIGHTS.post),
      announcement: Math.floor(targetSize * this.CONTENT_WEIGHTS.announcement)
    };
    
    const itemsByType = {
      event: items.filter(i => i.type === 'event'),
      coordination: items.filter(i => i.type === 'coordination'),
      post: items.filter(i => i.type === 'post'),
      announcement: items.filter(i => i.type === 'announcement')
    };
    
    // Add items according to target distribution
    Object.entries(targetCounts).forEach(([type, count]) => {
      const typeItems = itemsByType[type as keyof typeof itemsByType];
      result.push(...typeItems.slice(0, count));
    });
    
    // Fill remaining slots with highest scoring items
    const usedIds = new Set(result.map(i => i.id));
    const remaining = items.filter(i => !usedIds.has(i.id));
    const slotsLeft = targetSize - result.length;
    
    result.push(...remaining.slice(0, slotsLeft));
    
    // Sort final result by score
    result.sort((a, b) => b.totalScore - a.totalScore);
    
    return result;
  }

  private applyFilters(items: FeedItem[]): FeedItem[] {
    if (!this.options.filters) return items;
    
    let filtered = [...items];
    const { filters } = this.options;
    
    // Filter by time range
    if (filters.timeRange && filters.timeRange !== 'all') {
      const now = Date.now();
      const ranges = {
        today: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000
      };
      
      const maxAge = ranges[filters.timeRange];
      filtered = filtered.filter(item => 
        now - item.createdAt.getTime() <= maxAge
      );
    }
    
    // Filter by content types
    if (filters.contentTypes && filters.contentTypes.length > 0) {
      filtered = filtered.filter(item => 
        filters.contentTypes.includes(item.type as any)
      );
    }
    
    // Filter by spaces
    if (filters.spaces && filters.spaces.length > 0) {
      filtered = filtered.filter(item => 
        filters.spaces!.includes(item.spaceId)
      );
    }
    
    // Filter by RSVP status
    if (filters.onlyRSVPed) {
      filtered = filtered.filter(item => item.isRSVPed === true);
    }
    
    // Filter by joined status
    if (filters.onlyJoined) {
      filtered = filtered.filter(item => item.isJoined === true);
    }
    
    return filtered;
  }

  private generateCursor(item: FeedItem): string {
    return Buffer.from(JSON.stringify({
      score: item.totalScore,
      timestamp: item.createdAt.getTime(),
      id: item.id
    })).toString('base64');
  }
}

// Helper function for quick feed fetching
export async function getFeed(
  userId: string,
  userSpaces: string[],
  options?: Partial<FeedAggregatorOptions>
): Promise<FeedItem[]> {
  const aggregator = new FeedAggregator({
    userId,
    userSpaces,
    userInterests: [],
    pageSize: 20,
    ...options
  });
  
  const { items } = await aggregator.aggregate();
  return items;
}