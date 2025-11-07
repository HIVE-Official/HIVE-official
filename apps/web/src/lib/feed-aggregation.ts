import { dbAdmin } from '@/lib/firebase-admin';
import { type Post } from '@hive/core';
import { validateFeedContent, type FeedContentType } from '@/lib/content-validation';

/**
 * Unified Feed Data Aggregation Engine
 * 
 * Aggregates content from multiple sources:
 * 1. Space posts (tool-generated content)
 * 2. Tool interactions (direct tool outputs)
 * 3. Campus events (RSS imports)
 * 4. Builder announcements
 * 5. Real-time updates
 */

// Aggregated content item with source tracking
export interface AggregatedFeedItem {
  id: string;
  source: 'space_post' | 'tool_interaction' | 'campus_event' | 'builder_announcement' | 'real_time';
  contentType: FeedContentType;
  content: Post | ToolInteraction | CampusEvent | BuilderAnnouncement;
  spaceId?: string;
  authorId: string;
  timestamp: number;
  priority: number;
  validationData: {
    isValid: boolean;
    confidence: number;
    reason?: string;
  };
}

// Tool interaction data structure
export interface ToolInteraction {
  id: string;
  toolId: string;
  toolName: string;
  interactionType: 'poll_response' | 'timer_complete' | 'calculator_result' | 'form_submit';
  userId: string;
  spaceId: string;
  data: Record<string, any>;
  createdAt: Date;
  resultSummary?: string;
  shareableContent?: string;
}

// Campus event data structure  
export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  organizer: string;
  tags: string[];
  importSource: string;
  isPublic: boolean;
  createdAt: Date;
}

// Builder announcement data structure
export interface BuilderAnnouncement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  spaceId: string;
  type: 'space_update' | 'tool_release' | 'feature_announcement' | 'community_notice';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isPinned: boolean;
  expiresAt?: Date;
  createdAt: Date;
}

/**
 * Main aggregation engine - combines all content sources
 */
export class FeedAggregationEngine {
  private batchSize = 5; // Firebase limitation for concurrent queries
  
  constructor(private _userId: string, private _userSpaceIds: string[]) {}

  /**
   * Aggregate content from all sources for user's feed
   */
  async aggregateContent(
    limit: number = 50,
    cursor?: string,
    sources: ('space_post' | 'tool_interaction' | 'campus_event' | 'builder_announcement')[] = [
      'space_post', 'tool_interaction', 'campus_event', 'builder_announcement'
    ]
  ): Promise<AggregatedFeedItem[]> {
    const aggregatedItems: AggregatedFeedItem[] = [];
    
    // Run all aggregation sources in parallel for performance
    const aggregationPromises = sources.map(source => {
      switch (source) {
        case 'space_post':
          return this.aggregateSpacePosts(limit);
        case 'tool_interaction':
          return this.aggregateToolInteractions(limit);
        case 'campus_event':
          return this.aggregateCampusEvents(limit);
        case 'builder_announcement':
          return this.aggregateBuilderAnnouncements(limit);
        default:
          return Promise.resolve([]);
      }
    });

    const results = await Promise.all(aggregationPromises);
    
    // Flatten and combine all results
    results.forEach(items => aggregatedItems.push(...items));
    
    // Sort by priority and timestamp
    aggregatedItems.sort((a, b) => {
      if (a.priority !== b.priority) return b.priority - a.priority;
      return b.timestamp - a.timestamp;
    });

    return aggregatedItems.slice(0, limit);
  }

  /**
   * Aggregate posts from user's spaces
   */
  private async aggregateSpacePosts(_limit: number): Promise<AggregatedFeedItem[]> {
    const items: AggregatedFeedItem[] = [];
    
    // Process spaces in batches due to Firebase limitations
    const spaceChunks = this.chunkArray(this._userSpaceIds, this.batchSize);
    
    for (const spaceChunk of spaceChunks) {
      const chunkPromises = spaceChunk.map(spaceId => this.getSpacePosts(spaceId, 10));
      const chunkResults = await Promise.all(chunkPromises);
      
      chunkResults.forEach((posts, index) => {
        const spaceId = spaceChunk[index];
        
        posts.forEach(post => {
          const validation = validateFeedContent(post);
          
          items.push({
            id: `space_post_${post.id}`,
            source: 'space_post',
            contentType: validation.contentType || 'tool_generated',
            content: post,
            spaceId,
            authorId: post.authorId,
            timestamp: post.createdAt.getTime(),
            priority: this.calculatePriority(post, 'space_post'),
            validationData: {
              isValid: validation.isValid,
              confidence: validation.confidence,
              reason: validation.reason
            }
          });
        });
      });
    }
    
    return items;
  }

  /**
   * Aggregate tool interactions that generate shareable content
   */
  private async aggregateToolInteractions(limit: number): Promise<AggregatedFeedItem[]> {
    const items: AggregatedFeedItem[] = [];
    
    try {
      // Query tool interactions from user's spaces that have shareable content
      const interactionsQuery = dbAdmin.collectionGroup('tool_interactions')
        .where('spaceId', 'in', this._userSpaceIds.slice(0, 10)) // Firebase 'in' limit
        .where('shareableContent', '!=', null)
        .orderBy('shareableContent')
        .orderBy('createdAt', 'desc')
        .limit(limit);
      
      const snapshot = await interactionsQuery.get();
      
      snapshot.docs.forEach(doc => {
        const data = doc.data() as ToolInteraction;
        
        // Convert tool interaction to feed item
        const mockPost: Post = {
          id: doc.id,
          spaceId: data.spaceId,
          authorId: data.userId,
          type: 'toolshare',
          content: data.shareableContent || data.resultSummary || 'Tool interaction',
          toolShareMetadata: {
            toolId: data.toolId,
            toolName: data.toolName,
            shareType: 'created'
          },
          reactions: { heart: 0 },
          reactedUsers: { heart: [] },
          isPinned: false,
          isEdited: false,
          isDeleted: false,
          isFlagged: false,
          createdAt: data.createdAt,
          updatedAt: data.createdAt
        } as Post;
        
        const validation = validateFeedContent(mockPost);
        
        items.push({
          id: `tool_interaction_${doc.id}`,
          source: 'tool_interaction',
          contentType: 'tool_generated',
          content: data,
          spaceId: data.spaceId,
          authorId: data.userId,
          timestamp: data.createdAt.getTime(),
          priority: this.calculatePriority(data, 'tool_interaction'),
          validationData: {
            isValid: validation.isValid,
            confidence: validation.confidence
          }
        });
      });
      
    } catch (error) {
      console.error('Error aggregating tool interactions:', error);
    }
    
    return items;
  }

  /**
   * Aggregate campus events from RSS imports and space events
   */
  private async aggregateCampusEvents(limit: number): Promise<AggregatedFeedItem[]> {
    const items: AggregatedFeedItem[] = [];
    
    try {
      // Get campus-wide events
      const eventsQuery = dbAdmin.collection('campus_events')
        .where('isPublic', '==', true)
        .where('startDate', '>', new Date())
        .orderBy('startDate', 'asc')
        .limit(limit);
      
      const snapshot = await eventsQuery.get();
      
      snapshot.docs.forEach(doc => {
        const event = doc.data() as CampusEvent;
        
        items.push({
          id: `campus_event_${doc.id}`,
          source: 'campus_event',
          contentType: 'rss_import',
          content: event,
          authorId: 'system',
          timestamp: event.createdAt.getTime(),
          priority: this.calculatePriority(event, 'campus_event'),
          validationData: {
            isValid: true,
            confidence: 90
          }
        });
      });
      
    } catch (error) {
      console.error('Error aggregating campus events:', error);
    }
    
    return items;
  }

  /**
   * Aggregate builder announcements from user's spaces
   */
  private async aggregateBuilderAnnouncements(_limit: number): Promise<AggregatedFeedItem[]> {
    const items: AggregatedFeedItem[] = [];
    
    try {
      // Process spaces in batches
      const spaceChunks = this.chunkArray(this._userSpaceIds, this.batchSize);
      
      for (const spaceChunk of spaceChunks) {
        const chunkPromises = spaceChunk.map(spaceId => 
          dbAdmin.collection('spaces')
            .doc(spaceId)
            .collection('announcements')
            .where('expiresAt', '>', new Date())
            .orderBy('expiresAt')
            .orderBy('createdAt', 'desc')
            .limit(5)
            .get()
        );
        
        const chunkResults = await Promise.all(chunkPromises);
        
        chunkResults.forEach((snapshot, index) => {
          const spaceId = spaceChunk[index];
          
          snapshot.docs.forEach(doc => {
            const announcement = doc.data() as BuilderAnnouncement;
            
            items.push({
              id: `builder_announcement_${doc.id}`,
              source: 'builder_announcement',
              contentType: 'builder_announcement',
              content: announcement,
              spaceId,
              authorId: announcement.authorId,
              timestamp: announcement.createdAt.getTime(),
              priority: this.calculatePriority(announcement, 'builder_announcement'),
              validationData: {
                isValid: true,
                confidence: 95
              }
            });
          });
        });
      }
      
    } catch (error) {
      console.error('Error aggregating builder announcements:', error);
    }
    
    return items;
  }

  /**
   * Get posts from a specific space
   */
  private async getSpacePosts(spaceId: string, limit: number): Promise<Post[]> {
    try {
      const snapshot = await dbAdmin.collection('spaces')
        .doc(spaceId)
        .collection('posts')
        .where('isDeleted', '==', false)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Post[];
      
    } catch (error) {
      console.error(`Error fetching posts from space ${spaceId}:`, error);
      return [];
    }
  }

  /**
   * Calculate priority score for content (0-100)
   */
  private calculatePriority(
    content: Post | ToolInteraction | CampusEvent | BuilderAnnouncement,
    source: string
  ): number {
    let priority = 50; // Base priority
    
    switch (source) {
      case 'space_post': {
        const post = content as Post;
        if (post.isPinned) priority += 20;
        if (post.type === 'toolshare') priority += 15;
        if (post.reactions?.heart && post.reactions.heart > 5) priority += 10;
        break;
      }
        
      case 'tool_interaction':
        priority += 25; // Tool interactions are high priority
        break;
        
      case 'campus_event': {
        const event = content as CampusEvent;
        const daysUntilEvent = (event.startDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
        if (daysUntilEvent <= 1) priority += 20; // Urgent for events today/tomorrow
        else if (daysUntilEvent <= 7) priority += 10;
        break;
      }
        
      case 'builder_announcement': {
        const announcement = content as BuilderAnnouncement;
        if (announcement.priority === 'urgent') priority += 30;
        else if (announcement.priority === 'high') priority += 20;
        else if (announcement.priority === 'medium') priority += 10;
        if (announcement.isPinned) priority += 15;
        break;
      }
    }
    
    return Math.min(100, priority);
  }

  /**
   * Utility to chunk arrays for batch processing
   */
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}

/**
 * Create aggregation engine instance for a user
 */
export function createFeedAggregator(userId: string, userSpaceIds: string[]): FeedAggregationEngine {
  return new FeedAggregationEngine(userId, userSpaceIds);
}

/**
 * Quick aggregation for real-time updates
 */
export async function getLatestAggregatedContent(
  userId: string,
  userSpaceIds: string[],
  lastUpdateTime: Date,
  limit = 20
): Promise<AggregatedFeedItem[]> {
  const aggregator = createFeedAggregator(userId, userSpaceIds);
  
  // Get only recent content since last update
  const items = await aggregator.aggregateContent(limit * 2); // Get more to filter
  
  // Filter to only content newer than last update
  return items.filter(item => item.timestamp > lastUpdateTime.getTime()).slice(0, limit);
}
import 'server-only';
