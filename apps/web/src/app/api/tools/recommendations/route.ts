import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin as adminDb } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth-server';
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";
import * as admin from 'firebase-admin';

interface RecommendationContext {
  userId: string;
  userType?: string;
  institution?: string;
  interests?: string[];
  spaceIds?: string[];
  recentActivity?: string[];
  installedToolIds?: string[];
}

interface ToolRecommendation {
  toolId: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  rating: number;
  downloads: number;
  ownerId: string;
  ownerName: string;
  pricing: {
    type: 'free' | 'paid' | 'freemium';
    price?: number;
  };
  recommendationReason: string;
  relevanceScore: number;
  isVerified: boolean;
  isFeatured: boolean;
  screenshots?: string[];
}

interface RecommendationResponse {
  recommendations: ToolRecommendation[];
  categories: Array<{
    category: string;
    title: string;
    tools: ToolRecommendation[];
  }>;
  trending: ToolRecommendation[];
  personalized: ToolRecommendation[];
  metadata: {
    totalRecommendations: number;
    algorithmsUsed: string[];
    lastUpdated: string;
  };
}

// GET - Get personalized tool recommendations
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') ?? undefined;
    const limit_param = parseInt(searchParams.get('limit') ?? '20');
    const includeInstalled = searchParams.get('includeInstalled') === 'true';

    // Get user context
    const context = await buildUserContext(user.id);

    // Generate recommendations
    const recommendations = await generateRecommendations(context, {
      category,
      limit: limit_param,
      includeInstalled
    });

    return NextResponse.json(recommendations);

  } catch (error) {
    logger.error(
      `Error generating recommendations at /api/tools/recommendations`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to generate recommendations", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to build user context
async function buildUserContext(userId: string): Promise<RecommendationContext> {
  // Get user profile
  const userDoc = await adminDb.collection('users').doc(userId).get();
  const userData = userDoc.exists ? userDoc.data() : null;
  if (!userData) {
    return {
      userId,
      userType: undefined,
      institution: undefined,
      interests: [],
      spaceIds: [],
      recentActivity: [],
      installedToolIds: []
    };
  }

  // Get user's spaces
  const spaceMembershipsSnapshot = await adminDb
    .collection('members')
    .where('userId', '==', userId)
    .where('status', '==', 'active')
    .get();

  const spaceIds = spaceMembershipsSnapshot.docs.map(doc => doc.data().spaceId);

  // Get installed tools
  const installationsSnapshot = await adminDb
    .collection('toolInstallations')
    .where('installerId', '==', userId)
    .where('status', '==', 'active')
    .get();

  const installedToolIds = installationsSnapshot.docs.map(doc => doc.data().toolId);

  // Get recent activity
  const recentActivitySnapshot = await adminDb
    .collection('analytics_events')
    .where('userId', '==', userId)
    .where('eventType', 'in', ['tool_interaction', 'tool_installed', 'tool_reviewed'])
    .orderBy('timestamp', 'desc')
    .limit(50)
    .get();

  const recentActivity = recentActivitySnapshot.docs.map(doc => {
    const data = doc.data();
    return `${data.eventType}:${data.toolId || 'unknown'}`;
  });

  return {
    userId,
    userType: userData?.userType,
    institution: userData?.institution,
    interests: userData?.interests || [],
    spaceIds,
    recentActivity,
    installedToolIds
  };
}

// Main recommendation generation function
async function generateRecommendations(
  context: RecommendationContext,
  options: { category?: string; limit: number; includeInstalled?: boolean }
): Promise<RecommendationResponse> {
  const { category, limit, includeInstalled = false } = options;

  // Get all marketplace tools
  let marketplaceQuery: admin.firestore.Query<admin.firestore.DocumentData> = adminDb.collection('marketplace');
  
  if (category) {
    marketplaceQuery = marketplaceQuery.where('category', '==', category);
  }

  const marketplaceSnapshot = await marketplaceQuery.get();
  const allTools = marketplaceSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as { id: string; toolId?: string; [key: string]: any }));

  // Filter out installed tools if requested
  const availableTools = includeInstalled 
    ? allTools 
    : allTools.filter(tool => tool.toolId && !context.installedToolIds?.includes(tool.toolId));

  // Generate different types of recommendations
  const contentBasedRecs = await generateContentBasedRecommendations(context, availableTools);
  const collaborativeRecs = await generateCollaborativeRecommendations(context, availableTools);
  const trendingRecs = await generateTrendingRecommendations(availableTools);
  const categoryRecs = await generateCategoryRecommendations(context, availableTools);

  // Combine and rank recommendations
  const combinedRecs = combineRecommendations([
    ...contentBasedRecs.map(tool => ({ ...tool, algorithm: 'content-based' })),
    ...collaborativeRecs.map(tool => ({ ...tool, algorithm: 'collaborative' })),
    ...trendingRecs.map(tool => ({ ...tool, algorithm: 'trending' })),
    ...categoryRecs.map(tool => ({ ...tool, algorithm: 'category-based' }))
  ]);

  // Sort by relevance score and limit results
  const topRecommendations = combinedRecs
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);

  // Group by categories
  const categories = groupByCategories(topRecommendations);

  // Get trending tools (separate from personalized)
  const trending = trendingRecs.slice(0, 10);

  // Get personalized recommendations (content + collaborative)
  const personalized = [...contentBasedRecs, ...collaborativeRecs]
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 10);

  return {
    recommendations: topRecommendations,
    categories,
    trending,
    personalized,
    metadata: {
      totalRecommendations: topRecommendations.length,
      algorithmsUsed: ['content-based', 'collaborative', 'trending', 'category-based'],
      lastUpdated: new Date().toISOString()
    }
  };
}

// Content-based recommendations (based on user interests and activity)
async function generateContentBasedRecommendations(
  context: RecommendationContext,
  tools: any[]
): Promise<ToolRecommendation[]> {
  const recommendations: ToolRecommendation[] = [];

  for (const tool of tools) {
    let score = 0;
    const reasons = [];

    // Score based on user interests
    if (context.interests?.length) {
      const interestMatches = tool.tags.filter((tag: string) =>
        context.interests!.some(interest => 
          interest.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(interest.toLowerCase())
        )
      ).length;
      
      if (interestMatches > 0) {
        score += interestMatches * 20;
        reasons.push(`Matches your interests: ${tool.tags.slice(0, 2).join(', ')}`);
      }
    }

    // Score based on category preferences from recent activity
    const categoryActivity = context.recentActivity?.filter(activity => 
      activity.includes('tool_interaction') || activity.includes('tool_installed')
    ).length || 0;
    
    if (categoryActivity > 0) {
      score += Math.min(categoryActivity * 5, 25);
      reasons.push('Similar to tools you\'ve used recently');
    }

    // Score based on user type compatibility
    if (context.userType && tool.targetAudience?.includes(context.userType)) {
      score += 15;
      reasons.push(`Designed for ${context.userType}s`);
    }

    // Score based on institution popularity
    if (context.institution) {
      // This would require tracking institution-specific tool usage
      score += 5;
    }

    // Bonus for high-quality tools
    if (tool.stats.rating >= 4.5) {
      score += 10;
      reasons.push('Highly rated by users');
    }

    if (tool.verified) {
      score += 5;
      reasons.push('Verified by HIVE');
    }

    if (score > 10) {
      recommendations.push({
        toolId: tool.toolId,
        name: tool.name,
        description: tool.description,
        category: tool.category,
        tags: tool.tags,
        rating: tool.stats.rating,
        downloads: tool.stats.downloads,
        ownerId: tool.ownerId,
        ownerName: tool.ownerName || 'Unknown',
        pricing: tool.pricing,
        recommendationReason: reasons[0] || 'Recommended for you',
        relevanceScore: score,
        isVerified: tool.verified,
        isFeatured: tool.featured,
        screenshots: tool.screenshots
      });
    }
  }

  return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

// Collaborative filtering recommendations (based on similar users)
async function generateCollaborativeRecommendations(
  context: RecommendationContext,
  tools: any[]
): Promise<ToolRecommendation[]> {
  // Find users with similar tool usage patterns
  const similarUsers = await findSimilarUsers(context);
  
  // Get tools used by similar users that current user hasn't installed
  const collaborativeTools = new Map<string, { tool: any; score: number; userCount: number }>();

  for (const similarUser of similarUsers) {
    const userInstallationsSnapshot = await adminDb
      .collection('toolInstallations')
      .where('installerId', '==', similarUser.userId)
      .where('status', '==', 'active')
      .get();

    const userToolIds = userInstallationsSnapshot.docs.map(doc => doc.data().toolId);

    for (const toolId of userToolIds) {
      if (!context.installedToolIds?.includes(toolId)) {
        const tool = tools.find(t => t.toolId === toolId);
        if (tool) {
          const existing = collaborativeTools.get(toolId);
          if (existing) {
            existing.score += similarUser.similarity * 10;
            existing.userCount++;
          } else {
            collaborativeTools.set(toolId, {
              tool,
              score: similarUser.similarity * 10,
              userCount: 1
            });
          }
        }
      }
    }
  }

  // Convert to recommendations
  const recommendations: ToolRecommendation[] = [];
  
  for (const [toolId, data] of collaborativeTools) {
    const { tool, score, userCount } = data;
    
    if (score > 5 && userCount >= 2) {
      recommendations.push({
        toolId: tool.toolId,
        name: tool.name,
        description: tool.description,
        category: tool.category,
        tags: tool.tags,
        rating: tool.stats.rating,
        downloads: tool.stats.downloads,
        ownerId: tool.ownerId,
        ownerName: tool.ownerName || 'Unknown',
        pricing: tool.pricing,
        recommendationReason: `Used by ${userCount} similar users`,
        relevanceScore: score + (userCount * 5),
        isVerified: tool.verified,
        isFeatured: tool.featured,
        screenshots: tool.screenshots
      });
    }
  }

  return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

// Trending recommendations (based on recent popularity)
async function generateTrendingRecommendations(tools: any[]): Promise<ToolRecommendation[]> {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Get recent installation events
  const recentInstallsSnapshot = await adminDb
    .collection('analytics_events')
    .where('eventType', '==', 'tool_installed')
    .where('timestamp', '>=', weekAgo.toISOString())
    .get();

  const installCounts = recentInstallsSnapshot.docs.reduce((acc, doc) => {
    const toolId = doc.data().toolId;
    acc[toolId] = (acc[toolId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Score tools based on recent activity
  const trendingTools = tools
    .map(tool => {
      const recentInstalls = installCounts[tool.toolId] || 0;
      const trendScore = recentInstalls * 10 + (tool.stats.rating * 5);
      
      return {
        toolId: tool.toolId,
        name: tool.name,
        description: tool.description,
        category: tool.category,
        tags: tool.tags,
        rating: tool.stats.rating,
        downloads: tool.stats.downloads,
        ownerId: tool.ownerId,
        ownerName: tool.ownerName || 'Unknown',
        pricing: tool.pricing,
        recommendationReason: `Trending with ${recentInstalls} recent installs`,
        relevanceScore: trendScore,
        isVerified: tool.verified,
        isFeatured: tool.featured,
        screenshots: tool.screenshots
      };
    })
    .filter(tool => tool.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);

  return trendingTools;
}

// Category-based recommendations
async function generateCategoryRecommendations(
  context: RecommendationContext,
  tools: any[]
): Promise<ToolRecommendation[]> {
  // Determine user's preferred categories based on installed tools
  const categoryPreferences = new Map<string, number>();
  
  for (const toolId of context.installedToolIds || []) {
    const tool = tools.find(t => t.toolId === toolId);
    if (tool) {
      const count = categoryPreferences.get(tool.category) || 0;
      categoryPreferences.set(tool.category, count + 1);
    }
  }

  // Get top tools from preferred categories
  const recommendations: ToolRecommendation[] = [];
  
  for (const [category, preference] of categoryPreferences) {
    const categoryTools = tools
      .filter(tool => tool.category === category)
      .filter(tool => !context.installedToolIds?.includes(tool.toolId))
      .sort((a, b) => b.stats.rating - a.stats.rating)
      .slice(0, 5);

    for (const tool of categoryTools) {
      recommendations.push({
        toolId: tool.toolId,
        name: tool.name,
        description: tool.description,
        category: tool.category,
        tags: tool.tags,
        rating: tool.stats.rating,
        downloads: tool.stats.downloads,
        ownerId: tool.ownerId,
        ownerName: tool.ownerName || 'Unknown',
        pricing: tool.pricing,
        recommendationReason: `Top-rated ${category} tool`,
        relevanceScore: preference * 10 + tool.stats.rating * 5,
        isVerified: tool.verified,
        isFeatured: tool.featured,
        screenshots: tool.screenshots
      });
    }
  }

  return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

// Helper function to find similar users
async function findSimilarUsers(context: RecommendationContext): Promise<Array<{ userId: string; similarity: number }>> {
  // Get users from same institution
  const similarUsersSnapshot = await adminDb
    .collection('users')
    .where('institution', '==', context.institution)
    .limit(100)
    .get();

  const similarUsers = [];

  for (const doc of similarUsersSnapshot.docs) {
    const userData = doc.data();
    if (userData.id === context.userId) continue;

    // Calculate similarity based on shared interests and spaces
    let similarity = 0;
    
    // Shared interests
    const sharedInterests = (userData.interests || []).filter((interest: string) =>
      context.interests?.includes(interest)
    ).length;
    similarity += sharedInterests * 0.3;

    // Shared spaces
    const userSpacesSnapshot = await adminDb
      .collection('members')
      .where('userId', '==', userData.id)
      .where('status', '==', 'active')
      .get();
    
    const userSpaceIds = userSpacesSnapshot.docs.map(doc => doc.data().spaceId);
    const sharedSpaces = userSpaceIds.filter(spaceId => context.spaceIds?.includes(spaceId)).length;
    similarity += sharedSpaces * 0.2;

    if (similarity > 0.5) {
      similarUsers.push({
        userId: userData.id,
        similarity
      });
    }
  }

  return similarUsers.sort((a, b) => b.similarity - a.similarity).slice(0, 20);
}

// Helper function to combine recommendations and remove duplicates
function combineRecommendations(recommendations: Array<ToolRecommendation & { algorithm: string }>): ToolRecommendation[] {
  const toolMap = new Map<string, ToolRecommendation>();

  for (const rec of recommendations) {
    const existing = toolMap.get(rec.toolId);
    if (existing) {
      // Combine scores and update reason if score is higher
      if (rec.relevanceScore > existing.relevanceScore) {
        toolMap.set(rec.toolId, {
          ...rec,
          relevanceScore: (existing.relevanceScore + rec.relevanceScore) * 0.6
        });
      }
    } else {
      toolMap.set(rec.toolId, rec);
    }
  }

  return Array.from(toolMap.values());
}

// Helper function to group recommendations by category
function groupByCategories(recommendations: ToolRecommendation[]) {
  const categories = new Map<string, ToolRecommendation[]>();

  for (const rec of recommendations) {
    const existing = categories.get(rec.category) || [];
    existing.push(rec);
    categories.set(rec.category, existing);
  }

  return Array.from(categories.entries()).map(([category, tools]) => ({
    category,
    title: category.charAt(0).toUpperCase() + category.slice(1),
    tools: tools.slice(0, 6) // Limit to 6 tools per category
  }));
}