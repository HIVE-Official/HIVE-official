import { NextRequest, NextResponse } from 'next/server';
import { collection, doc, getDoc, query, where, getDocs, orderBy, limit as fbLimit, startAfter, addDoc } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

// Enhanced feed algorithm interfaces
interface RelevanceFactors {
  spaceEngagement: number; // 0-100: User's engagement level in this space
  contentRecency: number; // 0-100: How recent the content is
  contentQuality: number; // 0-100: Content validation score
  toolInteractionValue: number; // 0-100: Value of tool that generated content
  socialSignals: number; // 0-100: Likes, comments, shares
  creatorInfluence: number; // 0-100: Creator's influence in space
  diversityFactor: number; // 0-100: Content type diversity bonus
  temporalRelevance: number; // 0-100: Time-based relevance (events, deadlines)
}

interface FeedAlgorithmConfig {
  toolContentWeight: number; // 0.9 = 90% tool-generated content minimum
  maxContentAge: number; // Hours - max age for content inclusion
  minRelevanceThreshold: number; // Minimum score to include in feed
  diversityBonus: number; // Bonus for content type diversity
  qualityThreshold: number; // Minimum quality score
  userPersonalization: {
    preferredSpaces: string[];
    contentTypes: string[];
    optimalPostingTimes: number[]; // Hours when user is most active
    engagementPatterns: Record<string, number>;
  };
}

interface EnhancedFeedItem {
  id: string;
  spaceId: string;
  spaceName: string;
  authorId: string;
  authorName: string;
  content: any;
  contentType: 'tool_generated' | 'tool_enhanced' | 'space_event' | 'builder_announcement' | 'rss_import';
  toolId?: string;
  toolName?: string;
  deploymentId?: string;
  relevanceScore: number;
  qualityScore: number;
  factors: RelevanceFactors;
  timestamp: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    interactions: number;
  };
  metadata: {
    surface?: string;
    generatedBy?: string;
    validationConfidence: number;
    isPromoted: boolean;
    isFromPreferredSpace: boolean;
  };
}

// POST - Get personalized feed with enhanced algorithm
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      limit = 20, 
      offset = 0, 
      feedType = 'personal',
      includeTrending = false,
      diversityMode = 'balanced', // 'strict', 'balanced', 'relaxed'
      timeRange = '24h' // '6h', '24h', '7d', 'all'
    } = body;

    // Get user's algorithm configuration
    const algorithmConfig = await getUserAlgorithmConfig(user.uid);
    
    // Get user's space memberships with engagement data
    const userMemberships = await getUserSpaceMemberships(user.uid);
    
    if (userMemberships.length === 0) {
      return NextResponse.json({
        success: true,
        items: [],
        metadata: {
          totalItems: 0,
          algorithmVersion: '2.0',
          personalizedFactors: null,
          message: 'No space memberships found'
        }
      });
    }

    // Get feed content using enhanced algorithm
    const feedItems = await getEnhancedFeedContent({
      userId: user.uid,
      memberships: userMemberships,
      config: algorithmConfig,
      limit,
      offset,
      feedType,
      includeTrending,
      diversityMode,
      timeRange
    });

    // Apply final ranking and filtering
    const rankedItems = await applyFinalRanking(feedItems, algorithmConfig, user.uid);
    
    // Log algorithm metrics for optimization
    await logAlgorithmMetrics(user.uid, {
      feedType,
      totalCandidates: feedItems.length,
      finalItems: rankedItems.length,
      averageRelevance: rankedItems.reduce((sum, item) => sum + item.relevanceScore, 0) / rankedItems.length,
      diversityScore: calculateDiversityScore(rankedItems),
      toolContentPercentage: calculateToolContentPercentage(rankedItems)
    });

    return NextResponse.json({
      success: true,
      items: rankedItems.slice(0, limit),
      metadata: {
        totalItems: rankedItems.length,
        algorithmVersion: '2.0',
        personalizedFactors: generatePersonalizationSummary(algorithmConfig),
        qualityMetrics: generateQualityMetrics(rankedItems),
        diversityScore: calculateDiversityScore(rankedItems),
        toolContentPercentage: calculateToolContentPercentage(rankedItems)
      }
    });
  } catch (error) {
    console.error('Error in enhanced feed algorithm:', error);
    return NextResponse.json({ error: 'Failed to generate feed' }, { status: 500 });
  }
}

// GET - Get algorithm configuration and metrics
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const includeMetrics = searchParams.get('includeMetrics') === 'true';

    // Get user's algorithm configuration
    const config = await getUserAlgorithmConfig(user.uid);
    
    let metrics = null;
    if (includeMetrics) {
      metrics = await getAlgorithmMetrics(user.uid);
    }

    return NextResponse.json({
      config,
      metrics,
      algorithmVersion: '2.0'
    });
  } catch (error) {
    console.error('Error fetching algorithm config:', error);
    return NextResponse.json({ error: 'Failed to fetch algorithm config' }, { status: 500 });
  }
}

// Helper function to get user's algorithm configuration
async function getUserAlgorithmConfig(userId: string): Promise<FeedAlgorithmConfig> {
  try {
    const configDoc = await getDoc(doc(db, 'userFeedConfigs', userId));
    
    if (configDoc.exists()) {
      return configDoc.data() as FeedAlgorithmConfig;
    }

    // Default configuration
    const defaultConfig: FeedAlgorithmConfig = {
      toolContentWeight: 0.9, // 90% tool-generated content
      maxContentAge: 48, // 48 hours
      minRelevanceThreshold: 25, // Minimum 25% relevance
      diversityBonus: 0.15, // 15% bonus for diversity
      qualityThreshold: 70, // Minimum 70% quality
      userPersonalization: {
        preferredSpaces: [],
        contentTypes: ['tool_generated', 'tool_enhanced'],
        optimalPostingTimes: [9, 12, 15, 20], // 9am, 12pm, 3pm, 8pm
        engagementPatterns: {}
      }
    };

    // Save default config
    await setDoc(doc(db, 'userFeedConfigs', userId), {
      ...defaultConfig,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return defaultConfig;
  } catch (error) {
    console.error('Error getting algorithm config:', error);
    throw error;
  }
}

// Helper function to get user's space memberships with engagement
async function getUserSpaceMemberships(userId: string): Promise<any[]> {
  try {
    const membershipsQuery = query(
      collection(db, 'members'),
      where('userId', '==', userId),
      where('status', '==', 'active')
    );

    const membershipsSnapshot = await getDocs(membershipsQuery);
    const memberships = [];

    for (const memberDoc of membershipsSnapshot.docs) {
      const memberData = memberDoc.data();
      
      // Get space details
      const spaceDoc = await getDoc(doc(db, 'spaces', memberData.spaceId));
      const spaceData = spaceDoc.exists() ? spaceDoc.data() : {};

      // Calculate engagement score
      const engagementScore = await calculateSpaceEngagementScore(userId, memberData.spaceId);

      memberships.push({
        ...memberData,
        spaceName: spaceData.name || 'Unknown Space',
        spaceType: spaceData.type || 'general',
        engagementScore,
        lastActivity: memberData.lastActivity || new Date().toISOString()
      });
    }

    return memberships.sort((a, b) => b.engagementScore - a.engagementScore);
  } catch (error) {
    console.error('Error getting user memberships:', error);
    return [];
  }
}

// Helper function to calculate space engagement score
async function calculateSpaceEngagementScore(userId: string, spaceId: string): Promise<number> {
  try {
    // Get user's activity in this space over last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activityQuery = query(
      collection(db, 'activityEvents'),
      where('userId', '==', userId),
      where('spaceId', '==', spaceId),
      where('date', '>=', thirtyDaysAgo.toISOString().split('T')[0])
    );

    const activitySnapshot = await getDocs(activityQuery);
    const activities = activitySnapshot.docs.map(doc => doc.data());

    let score = 20; // Base score

    // Activity frequency bonus
    const uniqueDays = new Set(activities.map(a => a.date)).size;
    score += Math.min(30, uniqueDays * 2); // Max 30 points for daily activity

    // Activity type diversity bonus
    const activityTypes = new Set(activities.map(a => a.type));
    score += activityTypes.size * 5; // 5 points per activity type

    // Tool usage bonus
    const toolInteractions = activities.filter(a => a.type === 'tool_interaction').length;
    score += Math.min(20, toolInteractions); // Max 20 points for tool usage

    // Social interaction bonus
    const socialInteractions = activities.filter(a => a.type === 'social_interaction').length;
    score += Math.min(15, socialInteractions); // Max 15 points for social activity

    // Content creation bonus
    const contentCreated = activities.filter(a => a.type === 'content_creation').length;
    score += contentCreated * 3; // 3 points per content creation

    return Math.min(100, score);
  } catch (error) {
    console.error('Error calculating engagement score:', error);
    return 20; // Default base score
  }
}

// Helper function to get enhanced feed content
async function getEnhancedFeedContent(params: {
  userId: string;
  memberships: any[];
  config: FeedAlgorithmConfig;
  limit: number;
  offset: number;
  feedType: string;
  includeTrending: boolean;
  diversityMode: string;
  timeRange: string;
}): Promise<EnhancedFeedItem[]> {
  const { userId, memberships, config, limit, feedType, timeRange } = params;
  
  try {
    const feedItems: EnhancedFeedItem[] = [];
    const spaceIds = memberships.map(m => m.spaceId);
    
    // Calculate time range
    const timeRangeHours = timeRange === '6h' ? 6 : timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720;
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - timeRangeHours);

    // Get posts from user's spaces
    for (const membership of memberships) {
      const spacePosts = await getSpacePostsWithQuality(
        membership.spaceId, 
        Math.ceil(limit * 1.5), // Get more candidates for filtering
        cutoffTime
      );

      for (const post of spacePosts) {
        // Calculate relevance factors
        const factors = await calculateRelevanceFactors(post, membership, config, userId);
        
        // Calculate overall relevance score
        const relevanceScore = calculateOverallRelevance(factors, config);
        
        // Only include if meets minimum threshold
        if (relevanceScore >= config.minRelevanceThreshold) {
          const enhancedItem: EnhancedFeedItem = {
            id: post.id,
            spaceId: membership.spaceId,
            spaceName: membership.spaceName,
            authorId: post.authorId,
            authorName: post.authorName || 'Unknown',
            content: post,
            contentType: determineContentType(post),
            toolId: post.toolId,
            toolName: post.toolName,
            deploymentId: post.deploymentId,
            relevanceScore,
            qualityScore: factors.contentQuality,
            factors,
            timestamp: post.createdAt,
            engagement: post.engagement || { likes: 0, comments: 0, shares: 0, views: 0, interactions: 0 },
            metadata: {
              surface: post.surface,
              generatedBy: post.metadata?.generatedBy,
              validationConfidence: factors.contentQuality,
              isPromoted: post.isPinned || false,
              isFromPreferredSpace: config.userPersonalization.preferredSpaces.includes(membership.spaceId)
            }
          };

          feedItems.push(enhancedItem);
        }
      }
    }

    return feedItems;
  } catch (error) {
    console.error('Error getting enhanced feed content:', error);
    return [];
  }
}

// Helper function to get space posts with quality filtering
async function getSpacePostsWithQuality(spaceId: string, limit: number, cutoffTime: Date): Promise<any[]> {
  try {
    const postsQuery = query(
      collection(db, 'posts'),
      where('spaceId', '==', spaceId),
      where('status', '==', 'published'),
      where('createdAt', '>=', cutoffTime.toISOString()),
      orderBy('createdAt', 'desc'),
      fbLimit(limit)
    );

    const postsSnapshot = await getDocs(postsQuery);
    return postsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting space posts:', error);
    return [];
  }
}

// Helper function to calculate relevance factors
async function calculateRelevanceFactors(
  post: any, 
  membership: any, 
  config: FeedAlgorithmConfig, 
  userId: string
): Promise<RelevanceFactors> {
  const now = new Date();
  const postTime = new Date(post.createdAt);
  const ageHours = (now.getTime() - postTime.getTime()) / (1000 * 60 * 60);

  // Space engagement factor
  const spaceEngagement = membership.engagementScore || 20;

  // Content recency factor
  const contentRecency = Math.max(0, 100 - (ageHours / config.maxContentAge) * 100);

  // Content quality factor (based on validation and tool sophistication)
  const contentQuality = calculateContentQuality(post);

  // Tool interaction value
  const toolInteractionValue = post.toolId ? await getToolInteractionValue(post.toolId) : 50;

  // Social signals
  const totalEngagement = (post.engagement?.likes || 0) + 
                         (post.engagement?.comments || 0) * 2 + 
                         (post.engagement?.shares || 0) * 3;
  const socialSignals = Math.min(100, totalEngagement * 5);

  // Creator influence
  const creatorInfluence = await getCreatorInfluence(post.authorId, membership.spaceId);

  // Diversity factor (bonus for content type variety)
  const diversityFactor = 50; // Base value, calculated contextually in final ranking

  // Temporal relevance (events, deadlines, etc.)
  const temporalRelevance = calculateTemporalRelevance(post, now);

  return {
    spaceEngagement,
    contentRecency,
    contentQuality,
    toolInteractionValue,
    socialSignals,
    creatorInfluence,
    diversityFactor,
    temporalRelevance
  };
}

// Helper function to calculate overall relevance score
function calculateOverallRelevance(factors: RelevanceFactors, config: FeedAlgorithmConfig): number {
  // Weighted sum of all factors
  const weights = {
    spaceEngagement: 0.25,      // 25% - How engaged user is with this space
    contentRecency: 0.15,       // 15% - How recent the content is
    contentQuality: 0.20,       // 20% - Quality of the content/tool
    toolInteractionValue: 0.15, // 15% - Value of the tool interaction
    socialSignals: 0.10,        // 10% - Social engagement
    creatorInfluence: 0.05,     // 5% - Creator's influence
    diversityFactor: 0.05,      // 5% - Content diversity bonus
    temporalRelevance: 0.05     // 5% - Time-based relevance
  };

  const score = Object.entries(weights).reduce((total, [factor, weight]) => {
    return total + (factors[factor as keyof RelevanceFactors] * weight);
  }, 0);

  return Math.min(100, Math.max(0, score));
}

// Helper functions for score calculations
function calculateContentQuality(post: any): number {
  let quality = 50; // Base score

  // Tool-generated content gets higher quality score
  if (post.type === 'tool_generated') quality += 30;
  if (post.toolId) quality += 10;
  
  // Content completeness
  if (post.content && post.content.length > 50) quality += 10;
  if (post.title) quality += 5;
  if (post.metadata) quality += 5;

  return Math.min(100, quality);
}

async function getToolInteractionValue(toolId: string): Promise<number> {
  try {
    const toolDoc = await getDoc(doc(db, 'tools', toolId));
    if (!toolDoc.exists()) return 50;

    const tool = toolDoc.data();
    let value = 50;

    // More complex tools have higher value
    const elementCount = tool.elements?.length || 0;
    value += Math.min(30, elementCount * 5);

    // Popular tools have higher value
    const deploymentCount = tool.deploymentCount || 0;
    value += Math.min(20, deploymentCount * 2);

    return Math.min(100, value);
  } catch (error) {
    return 50;
  }
}

async function getCreatorInfluence(authorId: string, spaceId: string): Promise<number> {
  try {
    // Get author's role and activity in space
    const memberQuery = query(
      collection(db, 'members'),
      where('userId', '==', authorId),
      where('spaceId', '==', spaceId)
    );

    const memberSnapshot = await getDocs(memberQuery);
    if (memberSnapshot.empty) return 30;

    const memberData = memberSnapshot.docs[0].data();
    let influence = 30;

    // Role bonus
    if (memberData.role === 'builder') influence += 30;
    if (memberData.role === 'admin') influence += 40;
    if (memberData.role === 'moderator') influence += 20;

    // Activity bonus
    const postCount = memberData.postCount || 0;
    influence += Math.min(20, postCount);

    return Math.min(100, influence);
  } catch (error) {
    return 30;
  }
}

function calculateTemporalRelevance(post: any, now: Date): number {
  // Check if content is time-sensitive
  if (post.type === 'event' || post.metadata?.hasDeadline) {
    const eventTime = post.eventDate ? new Date(post.eventDate) : null;
    if (eventTime) {
      const hoursUntilEvent = (eventTime.getTime() - now.getTime()) / (1000 * 60 * 60);
      if (hoursUntilEvent > 0 && hoursUntilEvent < 24) {
        return 90; // High relevance for upcoming events
      }
    }
  }

  return 50; // Default temporal relevance
}

function determineContentType(post: any): 'tool_generated' | 'tool_enhanced' | 'space_event' | 'builder_announcement' | 'rss_import' {
  if (post.type === 'tool_generated' || post.toolId) return 'tool_generated';
  if (post.type === 'event') return 'space_event';
  if (post.type === 'announcement') return 'builder_announcement';
  if (post.source === 'rss') return 'rss_import';
  return 'tool_enhanced';
}

// Helper function to apply final ranking
async function applyFinalRanking(items: EnhancedFeedItem[], config: FeedAlgorithmConfig, userId: string): Promise<EnhancedFeedItem[]> {
  // Apply diversity bonus
  const contentTypeCounts = new Map<string, number>();
  const rankedItems = items.map(item => {
    const count = contentTypeCounts.get(item.contentType) || 0;
    contentTypeCounts.set(item.contentType, count + 1);
    
    // Diversity bonus decreases with repeated content types
    const diversityBonus = Math.max(0, config.diversityBonus * (1 - count * 0.1));
    item.relevanceScore += diversityBonus;
    
    return item;
  });

  // Sort by relevance score
  rankedItems.sort((a, b) => b.relevanceScore - a.relevanceScore);

  // Ensure tool content percentage meets threshold
  return enforceToolContentThreshold(rankedItems, config.toolContentWeight);
}

// Helper function to enforce tool content threshold
function enforceToolContentThreshold(items: EnhancedFeedItem[], threshold: number): EnhancedFeedItem[] {
  const toolItems = items.filter(item => item.contentType === 'tool_generated' || item.contentType === 'tool_enhanced');
  const nonToolItems = items.filter(item => item.contentType !== 'tool_generated' && item.contentType !== 'tool_enhanced');

  const targetToolCount = Math.floor(items.length * threshold);
  const actualToolCount = toolItems.length;

  if (actualToolCount >= targetToolCount) {
    // We have enough tool content
    return items;
  } else {
    // Need to prioritize tool content
    const selectedToolItems = toolItems.slice(0, actualToolCount);
    const selectedNonToolItems = nonToolItems.slice(0, items.length - actualToolCount);
    
    return [...selectedToolItems, ...selectedNonToolItems]
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
}

// Helper functions for metrics
function calculateDiversityScore(items: EnhancedFeedItem[]): number {
  if (items.length === 0) return 0;
  
  const contentTypes = new Set(items.map(item => item.contentType));
  return (contentTypes.size / 5) * 100; // 5 possible content types
}

function calculateToolContentPercentage(items: EnhancedFeedItem[]): number {
  if (items.length === 0) return 0;
  
  const toolItems = items.filter(item => 
    item.contentType === 'tool_generated' || item.contentType === 'tool_enhanced'
  );
  
  return (toolItems.length / items.length) * 100;
}

function generatePersonalizationSummary(config: FeedAlgorithmConfig): any {
  return {
    toolContentWeight: config.toolContentWeight,
    preferredSpacesCount: config.userPersonalization.preferredSpaces.length,
    optimalPostingTimes: config.userPersonalization.optimalPostingTimes,
    qualityThreshold: config.qualityThreshold
  };
}

function generateQualityMetrics(items: EnhancedFeedItem[]): any {
  if (items.length === 0) return { averageQuality: 0, averageRelevance: 0 };
  
  const avgQuality = items.reduce((sum, item) => sum + item.qualityScore, 0) / items.length;
  const avgRelevance = items.reduce((sum, item) => sum + item.relevanceScore, 0) / items.length;
  
  return {
    averageQuality: Math.round(avgQuality),
    averageRelevance: Math.round(avgRelevance),
    highQualityPercentage: (items.filter(item => item.qualityScore >= 80).length / items.length) * 100
  };
}

// Helper function to log algorithm metrics
async function logAlgorithmMetrics(userId: string, metrics: any): Promise<void> {
  try {
    await addDoc(collection(db, 'algorithmMetrics'), {
      userId,
      ...metrics,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0]
    });
  } catch (error) {
    console.error('Error logging algorithm metrics:', error);
  }
}

// Helper function to get algorithm metrics
async function getAlgorithmMetrics(userId: string): Promise<any> {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const metricsQuery = query(
      collection(db, 'algorithmMetrics'),
      where('userId', '==', userId),
      where('date', '>=', sevenDaysAgo.toISOString().split('T')[0]),
      orderBy('timestamp', 'desc'),
      fbLimit(50)
    );

    const metricsSnapshot = await getDocs(metricsQuery);
    const metrics = metricsSnapshot.docs.map(doc => doc.data());

    if (metrics.length === 0) return null;

    // Calculate averages
    const avgRelevance = metrics.reduce((sum, m) => sum + (m.averageRelevance || 0), 0) / metrics.length;
    const avgDiversity = metrics.reduce((sum, m) => sum + (m.diversityScore || 0), 0) / metrics.length;
    const avgToolPercentage = metrics.reduce((sum, m) => sum + (m.toolContentPercentage || 0), 0) / metrics.length;

    return {
      weeklyAverages: {
        relevance: Math.round(avgRelevance),
        diversity: Math.round(avgDiversity),
        toolContentPercentage: Math.round(avgToolPercentage)
      },
      totalSessions: metrics.length,
      lastUpdated: metrics[0].timestamp
    };
  } catch (error) {
    console.error('Error getting algorithm metrics:', error);
    return null;
  }
}