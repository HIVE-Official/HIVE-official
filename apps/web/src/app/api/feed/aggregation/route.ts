import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";

// Content aggregation interfaces
interface ContentSource {
  id: string;
  type: 'tool_interactions' | 'space_events' | 'user_posts' | 'builder_announcements' | 'rss_feeds' | 'system_notifications';
  spaceId?: string;
  priority: number; // 0-100
  isActive: boolean;
  refreshInterval: number; // minutes
  lastRefresh: string;
  contentCount: number;
  qualityScore: number; // 0-100
}

interface AggregatedContentItem {
  id: string;
  sourceId: string;
  sourceType: ContentSource['type'];
  spaceId?: string;
  spaceName?: string;
  content: any;
  contentType: 'tool_generated' | 'tool_enhanced' | 'space_event' | 'builder_announcement' | 'rss_import';
  priority: number;
  qualityScore: number;
  relevanceScore: number;
  timestamp: string;
  engagement: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    toolInteractions: number;
  };
  metadata: {
    aggregatedAt: string;
    processingTime: number;
    validationResults: any;
    crossReferences: string[];
  };
}

interface AggregationConfig {
  maxItemsPerSource: number;
  qualityThreshold: number;
  timeWindow: number; // hours
  diversityWeight: number; // 0-1
  prioritizationStrategy: 'quality' | 'engagement' | 'recency' | 'balanced';
  enableCrossReferencing: boolean;
  enableDuplicateDetection: boolean;
}

// POST - Aggregate content from all sources
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const {
      spaceIds = [], // Empty = all accessible spaces
      config = getDefaultAggregationConfig(),
      forceRefresh = false,
      includeAnalytics = true
    } = body;

    const startTime = Date.now();

    // Get user's accessible spaces if not specified
    const targetSpaceIds = spaceIds.length > 0 ? spaceIds : await getUserAccessibleSpaces(user.uid);

    // Get active content sources
    const contentSources = await getActiveContentSources(targetSpaceIds);

    // Aggregate content from all sources
    const aggregatedContent = await aggregateFromAllSources({
      userId: user.uid,
      sources: contentSources,
      config,
      forceRefresh
    });

    // Apply quality filtering and ranking
    const processedContent = await processAggregatedContent(aggregatedContent, config);

    // Generate analytics if requested
    let analytics = null;
    if (includeAnalytics) {
      analytics = generateAggregationAnalytics(contentSources, aggregatedContent, processedContent);
    }

    const processingTime = Date.now() - startTime;

    // Log aggregation metrics
    await logAggregationMetrics(user.uid, {
      sourcesProcessed: contentSources.length,
      itemsAggregated: aggregatedContent.length,
      itemsProcessed: processedContent.length,
      processingTime,
      quality: analytics?.averageQuality || 0
    });

    return NextResponse.json({
      success: true,
      content: processedContent,
      analytics,
      metadata: {
        sourcesProcessed: contentSources.length,
        totalItems: aggregatedContent.length,
        filteredItems: processedContent.length,
        processingTime,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Error aggregating content', { error: error, endpoint: '/api/feed/aggregation' });
    return NextResponse.json(ApiResponseHelper.error("Failed to aggregate content", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// GET - Get aggregation status and source information
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const spaceId = searchParams.get('spaceId');
    const includeMetrics = searchParams.get('includeMetrics') === 'true';

    if (spaceId) {
      // Get sources for specific space
      const spaceSources = await getActiveContentSources([spaceId]);
      const sourceMetrics = includeMetrics ? await getSourceMetrics(spaceId) : null;

      return NextResponse.json({
        spaceId,
        sources: spaceSources,
        metrics: sourceMetrics
      });
    } else {
      // Get all accessible sources
      const accessibleSpaces = await getUserAccessibleSpaces(user.uid);
      const allSources = await getActiveContentSources(accessibleSpaces);
      
      const sourcesBySpace = allSources.reduce((acc, source) => {
        const key = source.spaceId || 'system';
        if (!acc[key]) acc[key] = [];
        acc[key].push(source);
        return acc;
      }, {} as Record<string, ContentSource[]>);

      let metrics = null;
      if (includeMetrics) {
        metrics = await getAggregationMetrics(user.uid);
      }

      return NextResponse.json({
        sourcesBySpace,
        totalSources: allSources.length,
        accessibleSpaces: accessibleSpaces.length,
        metrics
      });
    }
  } catch (error) {
    logger.error('Error getting aggregation info', { error: error, endpoint: '/api/feed/aggregation' });
    return NextResponse.json(ApiResponseHelper.error("Failed to get aggregation info", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to get default aggregation config
function getDefaultAggregationConfig(): AggregationConfig {
  return {
    maxItemsPerSource: 20,
    qualityThreshold: 60,
    timeWindow: 24, // 24 hours
    diversityWeight: 0.3,
    prioritizationStrategy: 'balanced',
    enableCrossReferencing: true,
    enableDuplicateDetection: true
  };
}

// Helper function to get user's accessible spaces
async function getUserAccessibleSpaces(userId: string): Promise<string[]> {
  try {
    const membershipsSnapshot = await dbAdmin.collection('members')
      .where('userId', '==', userId)
      .where('status', '==', 'active')
      .get();
    return membershipsSnapshot.docs.map(doc => doc.data().spaceId);
  } catch (error) {
    logger.error('Error getting accessible spaces', { error: error, endpoint: '/api/feed/aggregation' });
    return [];
  }
}

// Helper function to get active content sources
async function getActiveContentSources(spaceIds: string[]): Promise<ContentSource[]> {
  try {
    const sources: ContentSource[] = [];

    // Get space-specific sources
    for (const spaceId of spaceIds) {
      // Tool interaction sources
      const toolSource: ContentSource = {
        id: `tool_${spaceId}`,
        type: 'tool_interactions',
        spaceId,
        priority: 90, // High priority for tool content
        isActive: true,
        refreshInterval: 5, // 5 minutes
        lastRefresh: new Date().toISOString(),
        contentCount: 0,
        qualityScore: 85
      };
      sources.push(toolSource);

      // Space events source
      const eventsSource: ContentSource = {
        id: `events_${spaceId}`,
        type: 'space_events',
        spaceId,
        priority: 75,
        isActive: true,
        refreshInterval: 15, // 15 minutes
        lastRefresh: new Date().toISOString(),
        contentCount: 0,
        qualityScore: 80
      };
      sources.push(eventsSource);

      // User posts source
      const postsSource: ContentSource = {
        id: `posts_${spaceId}`,
        type: 'user_posts',
        spaceId,
        priority: 60,
        isActive: true,
        refreshInterval: 10, // 10 minutes
        lastRefresh: new Date().toISOString(),
        contentCount: 0,
        qualityScore: 70
      };
      sources.push(postsSource);

      // Builder announcements source
      const announcementsSource: ContentSource = {
        id: `announcements_${spaceId}`,
        type: 'builder_announcements',
        spaceId,
        priority: 85,
        isActive: true,
        refreshInterval: 30, // 30 minutes
        lastRefresh: new Date().toISOString(),
        contentCount: 0,
        qualityScore: 90
      };
      sources.push(announcementsSource);
    }

    // System-wide sources
    const systemNotificationsSource: ContentSource = {
      id: 'system_notifications',
      type: 'system_notifications',
      priority: 95,
      isActive: true,
      refreshInterval: 60, // 1 hour
      lastRefresh: new Date().toISOString(),
      contentCount: 0,
      qualityScore: 95
    };
    sources.push(systemNotificationsSource);

    return sources.filter(source => source.isActive);
  } catch (error) {
    logger.error('Error getting content sources', { error: error, endpoint: '/api/feed/aggregation' });
    return [];
  }
}

// Helper function to aggregate content from all sources
async function aggregateFromAllSources(params: {
  userId: string;
  sources: ContentSource[];
  config: AggregationConfig;
  forceRefresh: boolean;
}): Promise<AggregatedContentItem[]> {
  const { sources, config, forceRefresh } = await params;
  const aggregatedItems: AggregatedContentItem[] = [];

  const timeWindow = new Date();
  timeWindow.setHours(timeWindow.getHours() - config.timeWindow);

  for (const source of sources) {
    try {
      const sourceContent = await aggregateFromSource(source, config, timeWindow, forceRefresh);
      
      // Add source metadata to each item
      const enhancedContent = sourceContent.map(item => ({
        ...item,
        sourceId: source.id,
        sourceType: source.type,
        spaceId: source.spaceId,
        metadata: {
          ...item.metadata,
          sourceQuality: source.qualityScore,
          sourcePriority: source.priority
        }
      }));

      aggregatedItems.push(...enhancedContent);
    } catch (error) {
      logger.error('Error aggregating from source', { sourceId: source.id, error: error, endpoint: '/api/feed/aggregation' });
    }
  }

  return aggregatedItems;
}

// Helper function to aggregate content from a specific source
async function aggregateFromSource(
  source: ContentSource,
  config: AggregationConfig,
  timeWindow: Date,
  _forceRefresh: boolean
): Promise<AggregatedContentItem[]> {
  const _items: AggregatedContentItem[] = [];

  try {
    switch (source.type) {
      case 'tool_interactions':
        return await aggregateToolInteractions(source, config, timeWindow);
      
      case 'space_events':
        return await aggregateSpaceEvents(source, config, timeWindow);
      
      case 'user_posts':
        return await aggregateUserPosts(source, config, timeWindow);
      
      case 'builder_announcements':
        return await aggregateBuilderAnnouncements(source, config, timeWindow);
      
      case 'system_notifications':
        return await aggregateSystemNotifications(source, config, timeWindow);
      
      default:
        return [];
    }
  } catch (error) {
    logger.error('Error in source aggregation for', { sourceType: source.type, error: error, endpoint: '/api/feed/aggregation'  });
    return [];
  }
}

// Helper function to aggregate tool interactions
async function aggregateToolInteractions(
  source: ContentSource,
  config: AggregationConfig,
  timeWindow: Date
): Promise<AggregatedContentItem[]> {
  try {
    const postsSnapshot = await dbAdmin.collection('posts')
      .where('spaceId', '==', source.spaceId)
      .where('type', '==', 'tool_generated')
      .where('createdAt', '>=', timeWindow.toISOString())
      .orderBy('createdAt', 'desc')
      .limit(config.maxItemsPerSource)
      .get();
    const items: AggregatedContentItem[] = [];

    for (const postDoc of postsSnapshot.docs) {
      const post = { id: postDoc.id, ...postDoc.data() } as any;
      
      // Calculate quality and relevance scores
      const qualityScore = calculateContentQuality(post, 'tool_generated');
      const relevanceScore = calculateRelevanceScore(post, source);

      if (qualityScore >= config.qualityThreshold) {
        items.push({
          id: post.id,
          sourceId: source.id,
          sourceType: source.type,
          spaceId: source.spaceId,
          content: post,
          contentType: 'tool_generated',
          priority: source.priority,
          qualityScore,
          relevanceScore,
          timestamp: post.createdAt,
          engagement: post.engagement || { views: 0, likes: 0, comments: 0, shares: 0, toolInteractions: 0 },
          metadata: {
            aggregatedAt: new Date().toISOString(),
            processingTime: 0,
            validationResults: null,
            crossReferences: []
          }
        });
      }
    }

    return items;
  } catch (error) {
    logger.error('Error aggregating tool interactions', { error: error, endpoint: '/api/feed/aggregation' });
    return [];
  }
}

// Helper function to aggregate space events
async function aggregateSpaceEvents(
  source: ContentSource,
  config: AggregationConfig,
  timeWindow: Date
): Promise<AggregatedContentItem[]> {
  try {
    const eventsSnapshot = await dbAdmin.collection('events')
      .where('spaceId', '==', source.spaceId)
      .where('state', '==', 'published')
      .where('createdAt', '>=', timeWindow.toISOString())
      .orderBy('startDate', 'asc')
      .limit(config.maxItemsPerSource)
      .get();
    const items: AggregatedContentItem[] = [];

    for (const eventDoc of eventsSnapshot.docs) {
      const event = { id: eventDoc.id, ...eventDoc.data() } as any;
      
      const qualityScore = calculateContentQuality(event, 'space_event');
      const relevanceScore = calculateRelevanceScore(event, source);

      if (qualityScore >= config.qualityThreshold) {
        items.push({
          id: event.id,
          sourceId: source.id,
          sourceType: source.type,
          spaceId: source.spaceId,
          content: event,
          contentType: 'space_event',
          priority: source.priority,
          qualityScore,
          relevanceScore,
          timestamp: event.createdAt,
          engagement: { views: 0, likes: 0, comments: 0, shares: 0, toolInteractions: 0 },
          metadata: {
            aggregatedAt: new Date().toISOString(),
            processingTime: 0,
            validationResults: null,
            crossReferences: []
          }
        });
      }
    }

    return items;
  } catch (error) {
    logger.error('Error aggregating space events', { error: error, endpoint: '/api/feed/aggregation' });
    return [];
  }
}

// Helper function to aggregate user posts
async function aggregateUserPosts(
  source: ContentSource,
  config: AggregationConfig,
  timeWindow: Date
): Promise<AggregatedContentItem[]> {
  try {
    const postsSnapshot = await dbAdmin.collection('posts')
      .where('spaceId', '==', source.spaceId)
      .where('type', 'in', ['tool_enhanced', 'user_post'])
      .where('createdAt', '>=', timeWindow.toISOString())
      .orderBy('createdAt', 'desc')
      .limit(config.maxItemsPerSource)
      .get();
    const items: AggregatedContentItem[] = [];

    for (const postDoc of postsSnapshot.docs) {
      const post = { id: postDoc.id, ...postDoc.data() } as any;
      
      const contentType = post.type === 'tool_enhanced' ? 'tool_enhanced' : 'tool_generated';
      const qualityScore = calculateContentQuality(post, contentType);
      const relevanceScore = calculateRelevanceScore(post, source);

      if (qualityScore >= config.qualityThreshold) {
        items.push({
          id: post.id,
          sourceId: source.id,
          sourceType: source.type,
          spaceId: source.spaceId,
          content: post,
          contentType,
          priority: source.priority,
          qualityScore,
          relevanceScore,
          timestamp: post.createdAt,
          engagement: post.engagement || { views: 0, likes: 0, comments: 0, shares: 0, toolInteractions: 0 },
          metadata: {
            aggregatedAt: new Date().toISOString(),
            processingTime: 0,
            validationResults: null,
            crossReferences: []
          }
        });
      }
    }

    return items;
  } catch (error) {
    logger.error('Error aggregating user posts', { error: error, endpoint: '/api/feed/aggregation' });
    return [];
  }
}

// Helper function to aggregate builder announcements
async function aggregateBuilderAnnouncements(
  source: ContentSource,
  config: AggregationConfig,
  timeWindow: Date
): Promise<AggregatedContentItem[]> {
  try {
    const announcementsSnapshot = await dbAdmin.collection('posts')
      .where('spaceId', '==', source.spaceId)
      .where('type', '==', 'announcement')
      .where('createdAt', '>=', timeWindow.toISOString())
      .orderBy('createdAt', 'desc')
      .limit(config.maxItemsPerSource)
      .get();
    const items: AggregatedContentItem[] = [];

    for (const announcementDoc of announcementsSnapshot.docs) {
      const announcement = { id: announcementDoc.id, ...announcementDoc.data() } as any;
      
      const qualityScore = calculateContentQuality(announcement, 'builder_announcement');
      const relevanceScore = calculateRelevanceScore(announcement, source);

      items.push({
        id: announcement.id,
        sourceId: source.id,
        sourceType: source.type,
        spaceId: source.spaceId,
        content: announcement,
        contentType: 'builder_announcement',
        priority: source.priority,
        qualityScore,
        relevanceScore,
        timestamp: announcement.createdAt,
        engagement: announcement.engagement || { views: 0, likes: 0, comments: 0, shares: 0, toolInteractions: 0 },
        metadata: {
          aggregatedAt: new Date().toISOString(),
          processingTime: 0,
          validationResults: null,
          crossReferences: []
        }
      });
    }

    return items;
  } catch (error) {
    logger.error('Error aggregating builder announcements', { error: error, endpoint: '/api/feed/aggregation' });
    return [];
  }
}

// Helper function to aggregate system notifications
async function aggregateSystemNotifications(
  _source: ContentSource,
  _config: AggregationConfig,
  _timeWindow: Date
): Promise<AggregatedContentItem[]> {
  // System notifications would be implemented based on platform events
  // For now, return empty array
  return [];
}

// Helper function to calculate content quality
function calculateContentQuality(content: any, contentType: string): number {
  let quality = 50; // Base quality

  switch (contentType) {
    case 'tool_generated':
      quality += 30;
      if (content.toolId) quality += 10;
      if (content.metadata?.elementCount > 3) quality += 10;
      break;
    
    case 'tool_enhanced':
      quality += 20;
      if (content.metadata?.enhancedByTool) quality += 10;
      break;
    
    case 'space_event':
      quality += 15;
      if (content.startDate && content.endDate) quality += 10;
      if (content.location) quality += 5;
      break;
    
    case 'builder_announcement':
      quality += 25;
      if (content.isPinned) quality += 10;
      break;
  }

  // Content completeness factors
  if (content.title && content.title.length > 10) quality += 5;
  if (content.content && content.content.length > 50) quality += 10;
  if (content.metadata && Object.keys(content.metadata).length > 0) quality += 5;

  return Math.min(100, quality);
}

// Helper function to calculate relevance score
function calculateRelevanceScore(content: any, source: ContentSource): number {
  let relevance = 50; // Base relevance

  // Source priority factor
  relevance += source.priority * 0.3;

  // Recency factor
  const ageHours = (Date.now() - new Date(content.createdAt).getTime()) / (1000 * 60 * 60);
  relevance += Math.max(0, 30 - ageHours);

  // Engagement factor
  const engagement = content.engagement || {};
  const totalEngagement = (engagement.likes || 0) + (engagement.comments || 0) * 2 + (engagement.shares || 0) * 3;
  relevance += Math.min(20, totalEngagement);

  return Math.min(100, relevance);
}

// Helper function to process aggregated content
async function processAggregatedContent(
  content: AggregatedContentItem[],
  config: AggregationConfig
): Promise<AggregatedContentItem[]> {
  let processedContent = [...content];

  // Apply duplicate detection if enabled
  if (config.enableDuplicateDetection) {
    processedContent = removeDuplicates(processedContent);
  }

  // Apply cross-referencing if enabled
  if (config.enableCrossReferencing) {
    processedContent = await applyCrossReferencing(processedContent);
  }

  // Apply prioritization strategy
  processedContent = applyPrioritization(processedContent, config);

  // Apply diversity weighting
  if (config.diversityWeight > 0) {
    processedContent = applyDiversityWeighting(processedContent, config.diversityWeight);
  }

  return processedContent;
}

// Helper function to remove duplicates
function removeDuplicates(content: AggregatedContentItem[]): AggregatedContentItem[] {
  const seen = new Set<string>();
  return content.filter(item => {
    const key = `${item.content.title || ''}_${item.content.content || ''}`.substring(0, 100);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Helper function to apply cross-referencing
async function applyCrossReferencing(content: AggregatedContentItem[]): Promise<AggregatedContentItem[]> {
  // Simplified cross-referencing - find related content
  return content.map(item => {
    const relatedItems = content.filter(other => 
      other.id !== item.id && 
      other.spaceId === item.spaceId &&
      other.contentType === item.contentType
    ).slice(0, 3);

    item.metadata.crossReferences = relatedItems.map(related => related.id);
    return item;
  });
}

// Helper function to apply prioritization strategy
function applyPrioritization(content: AggregatedContentItem[], config: AggregationConfig): AggregatedContentItem[] {
  return content.sort((a, b) => {
    switch (config.prioritizationStrategy) {
      case 'quality':
        return b.qualityScore - a.qualityScore;
      
      case 'engagement': {
        const aEng = a.engagement.likes + a.engagement.comments * 2 + a.engagement.shares * 3;
        const bEng = b.engagement.likes + b.engagement.comments * 2 + b.engagement.shares * 3;
        return bEng - aEng;
      }
      
      case 'recency':
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      
      case 'balanced':
      default: {
        const aScore = (a.qualityScore * 0.4) + (a.relevanceScore * 0.4) + (a.priority * 0.2);
        const bScore = (b.qualityScore * 0.4) + (b.relevanceScore * 0.4) + (b.priority * 0.2);
        return bScore - aScore;
      }
    }
  });
}

// Helper function to apply diversity weighting
function applyDiversityWeighting(content: AggregatedContentItem[], diversityWeight: number): AggregatedContentItem[] {
  const contentTypeCounts = new Map<string, number>();
  
  return content.map(item => {
    const count = contentTypeCounts.get(item.contentType) || 0;
    contentTypeCounts.set(item.contentType, count + 1);
    
    // Apply diversity bonus (decreases with repeated content types)
    const diversityBonus = diversityWeight * (1 - count * 0.1);
    item.relevanceScore += diversityBonus * 10;
    
    return item;
  });
}

// Helper function to generate aggregation analytics
function generateAggregationAnalytics(
  sources: ContentSource[],
  aggregated: AggregatedContentItem[],
  processed: AggregatedContentItem[]
): any {
  const sourceAnalytics = sources.map(source => {
    const sourceItems = aggregated.filter(item => item.sourceId === source.id);
    return {
      sourceId: source.id,
      sourceType: source.type,
      spaceId: source.spaceId,
      itemCount: sourceItems.length,
      averageQuality: sourceItems.reduce((sum, item) => sum + item.qualityScore, 0) / (sourceItems.length || 1),
      averageRelevance: sourceItems.reduce((sum, item) => sum + item.relevanceScore, 0) / (sourceItems.length || 1)
    };
  });

  const contentTypeDistribution = processed.reduce((acc, item) => {
    acc[item.contentType] = (acc[item.contentType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalSources: sources.length,
    activeSources: sources.filter(s => s.isActive).length,
    totalAggregated: aggregated.length,
    totalProcessed: processed.length,
    processingEfficiency: (processed.length / (aggregated.length || 1)) * 100,
    averageQuality: processed.reduce((sum, item) => sum + item.qualityScore, 0) / (processed.length || 1),
    averageRelevance: processed.reduce((sum, item) => sum + item.relevanceScore, 0) / (processed.length || 1),
    contentTypeDistribution,
    sourceAnalytics
  };
}

// Helper function to log aggregation metrics
async function logAggregationMetrics(userId: string, metrics: any): Promise<void> {
  try {
    await dbAdmin.collection('aggregationMetrics').add({
      userId,
      ...metrics,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0]
    });
  } catch (error) {
    logger.error('Error logging aggregation metrics', { error: error, endpoint: '/api/feed/aggregation' });
  }
}

// Helper function to get source metrics
async function getSourceMetrics(spaceId: string): Promise<any> {
  // Simplified implementation - would calculate metrics over time
  return {
    spaceId,
    lastRefresh: new Date().toISOString(),
    totalContent: 0,
    qualityTrend: 'stable',
    refreshRate: 'normal'
  };
}

// Helper function to get aggregation metrics
async function getAggregationMetrics(userId: string): Promise<any> {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const metricsSnapshot = await dbAdmin.collection('aggregationMetrics')
      .where('userId', '==', userId)
      .where('date', '>=', sevenDaysAgo.toISOString().split('T')[0])
      .orderBy('timestamp', 'desc')
      .limit(20)
      .get();
    const metrics = metricsSnapshot.docs.map(doc => doc.data());

    if (metrics.length === 0) return null;

    return {
      totalAggregations: metrics.length,
      averageProcessingTime: metrics.reduce((sum, m) => sum + (m.processingTime || 0), 0) / metrics.length,
      averageQuality: metrics.reduce((sum, m) => sum + (m.quality || 0), 0) / metrics.length,
      totalItemsProcessed: metrics.reduce((sum, m) => sum + (m.itemsProcessed || 0), 0),
      lastAggregation: metrics[0].timestamp
    };
  } catch (error) {
    logger.error('Error getting aggregation metrics', { error: error, endpoint: '/api/feed/aggregation' });
    return null;
  }
}