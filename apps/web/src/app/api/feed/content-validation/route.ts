import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";

// Content validation interfaces
interface ContentValidationResult {
  isValid: boolean;
  contentType: 'tool_generated' | 'tool_enhanced' | 'space_event' | 'builder_announcement' | 'rss_import' | 'invalid';
  confidence: number; // 0-100
  validationReasons: string[];
  toolMetadata?: {
    toolId: string;
    toolName: string;
    deploymentId?: string;
    elementIds: string[];
    interactionType: string;
  };
  qualityScore: number; // 0-100
  enforcementAction: 'allow' | 'flag' | 'reject' | 'require_review';
}

interface ContentEnforcementPolicy {
  toolContentMinimum: number; // 0-100: Minimum percentage of tool content
  qualityThreshold: number; // 0-100: Minimum quality score
  validationStrict: boolean; // Strict validation mode
  allowedContentTypes: string[];
  enforcementLevel: 'strict' | 'moderate' | 'lenient';
  spaceSpecificRules: Record<string, any>;
}

interface FeedContentAnalytics {
  totalPosts: number;
  toolGeneratedCount: number;
  toolGeneratedPercentage: number;
  averageQualityScore: number;
  contentTypeDistribution: Record<string, number>;
  enforcementActions: Record<string, number>;
  validationFailures: Array<{
    reason: string;
    count: number;
    percentage: number;
  }>;
}

// POST - Validate content for feed inclusion
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const { contentItems, spaceId, enforcementLevel = 'moderate' } = body;

    if (!contentItems || !Array.isArray(contentItems)) {
      return NextResponse.json(ApiResponseHelper.error("Content items array required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Get content enforcement policy
    const policy = await getContentEnforcementPolicy(spaceId, enforcementLevel);
    
    // Validate each content item
    const validationResults = await Promise.all(
      contentItems.map(item => validateContentItem(item, policy, spaceId))
    );

    // Apply enforcement actions
    const enforcedResults = await applyEnforcementActions(validationResults, policy);

    // Generate analytics
    const analytics = generateContentAnalytics(validationResults);

    // Log validation metrics
    await logValidationMetrics(user.id, spaceId, {
      totalItems: contentItems.length,
      validItems: enforcedResults.filter(r => r.enforcementAction === 'allow').length,
      analytics
    });

    return NextResponse.json({
      success: true,
      validationResults: enforcedResults,
      analytics,
      policy: {
        toolContentMinimum: policy.toolContentMinimum,
        qualityThreshold: policy.qualityThreshold,
        enforcementLevel: policy.enforcementLevel
      }
    });
  } catch (error) {
    logger.error(
      `Error validating content at /api/feed/content-validation`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to validate content", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// GET - Get content validation analytics
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const spaceId = searchParams.get('spaceId');
    const timeRange = searchParams.get('timeRange') || '7d'; // 1d, 7d, 30d
    const includeDetails = searchParams.get('includeDetails') === 'true';

    // Calculate date range
    const days = timeRange === '1d' ? 1 : timeRange === '7d' ? 7 : 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get validation metrics
    const analytics = await getContentValidationAnalytics(spaceId || undefined, startDate, includeDetails);

    // Get current enforcement policy
    const policy = await getContentEnforcementPolicy(spaceId || undefined);

    return NextResponse.json({
      analytics,
      policy,
      timeRange,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    logger.error(
      `Error fetching validation analytics at /api/feed/content-validation`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch analytics", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Default policies by enforcement level
const DEFAULT_POLICIES: Record<string, ContentEnforcementPolicy> = {
  strict: {
    toolContentMinimum: 95, // 95% tool content required
    qualityThreshold: 80,   // High quality threshold
    validationStrict: true,
    allowedContentTypes: ['tool_generated', 'tool_enhanced'],
    enforcementLevel: 'strict',
    spaceSpecificRules: {}
  },
  moderate: {
    toolContentMinimum: 90, // 90% tool content required
    qualityThreshold: 70,   // Moderate quality threshold
    validationStrict: false,
    allowedContentTypes: ['tool_generated', 'tool_enhanced', 'space_event'],
    enforcementLevel: 'moderate',
    spaceSpecificRules: {}
  },
  lenient: {
    toolContentMinimum: 80, // 80% tool content required
    qualityThreshold: 60,   // Lower quality threshold
    validationStrict: false,
    allowedContentTypes: ['tool_generated', 'tool_enhanced', 'space_event', 'builder_announcement'],
    enforcementLevel: 'lenient',
    spaceSpecificRules: {}
  }
};

// Helper function to get content enforcement policy
async function getContentEnforcementPolicy(spaceId?: string, enforcementLevel: string = 'moderate'): Promise<ContentEnforcementPolicy> {
  try {
    if (spaceId) {
      // Check for space-specific policy
      const policyDoc = await dbAdmin.collection('contentPolicies').doc(spaceId).get();
      if (policyDoc.exists) {
        return policyDoc.data() as ContentEnforcementPolicy;
      }
    }

    return DEFAULT_POLICIES[enforcementLevel] || DEFAULT_POLICIES.moderate;
  } catch (error) {
    logger.error(
      `Error getting enforcement policy at /api/feed/content-validation`,
      error instanceof Error ? error : new Error(String(error))
    );
    // Return safe default
    return DEFAULT_POLICIES.moderate;
  }
}

// Helper function to validate individual content item
async function validateContentItem(
  contentItem: any, 
  policy: ContentEnforcementPolicy,
  spaceId?: string
): Promise<ContentValidationResult> {
  try {
    const validationReasons: string[] = [];
    let confidence = 100;
    let qualityScore = 50;
    let contentType: ContentValidationResult['contentType'] = 'invalid';
    let toolMetadata: ContentValidationResult['toolMetadata'] | undefined;

    // Check if content is tool-generated
    if (contentItem.toolId || contentItem.type === 'tool_generated') {
      contentType = 'tool_generated';
      validationReasons.push('Content generated by tool');
      confidence = 95;
      qualityScore += 30;

      // Get tool metadata
      if (contentItem.toolId) {
        const toolDoc = await dbAdmin.collection('tools').doc(contentItem.toolId).get();
        if (toolDoc.exists) {
          const tool = toolDoc.data();
          if (tool) {
            toolMetadata = {
              toolId: contentItem.toolId,
              toolName: tool.name || 'Unknown Tool',
              deploymentId: contentItem.deploymentId,
              elementIds: contentItem.elementIds || [],
              interactionType: contentItem.metadata?.action || 'unknown'
            };
            
            // Quality bonus for sophisticated tools
            const elementCount = tool.elements?.length || 0;
            qualityScore += Math.min(20, elementCount * 3);
          }
        }
      }
    }
    // Check if content is tool-enhanced
    else if (contentItem.metadata?.enhancedByTool || contentItem.type === 'tool_enhanced') {
      contentType = 'tool_enhanced';
      validationReasons.push('Content enhanced by tool interaction');
      confidence = 85;
      qualityScore += 20;
    }
    // Check if content is space event
    else if (contentItem.type === 'event' || contentItem.eventDate) {
      contentType = 'space_event';
      validationReasons.push('Space event content');
      confidence = 90;
      qualityScore += 15;
    }
    // Check if content is builder announcement
    else if (contentItem.type === 'announcement' || contentItem.isAnnouncement) {
      contentType = 'builder_announcement';
      validationReasons.push('Builder announcement');
      confidence = 80;
      qualityScore += 10;
    }
    // Check if content is RSS import
    else if (contentItem.source === 'rss' || contentItem.type === 'rss_import') {
      contentType = 'rss_import';
      validationReasons.push('RSS imported content');
      confidence = 75;
      qualityScore += 5;
    }
    else {
      contentType = 'invalid';
      validationReasons.push('Content does not meet tool-generation criteria');
      confidence = 20;
      qualityScore = 20;
    }

    // Additional quality factors
    if (contentItem.content && contentItem.content.length > 50) {
      qualityScore += 10;
      validationReasons.push('Content has sufficient length');
    }

    if (contentItem.title) {
      qualityScore += 5;
      validationReasons.push('Content has title');
    }

    if (contentItem.metadata && Object.keys(contentItem.metadata).length > 0) {
      qualityScore += 5;
      validationReasons.push('Content has metadata');
    }

    // Validation against policy
    const isAllowedType = policy.allowedContentTypes.includes(contentType);
    const meetsQualityThreshold = qualityScore >= policy.qualityThreshold;
    
    if (!isAllowedType) {
      validationReasons.push(`Content type ${contentType} not allowed by policy`);
      confidence -= 30;
    }

    if (!meetsQualityThreshold) {
      validationReasons.push(`Quality score ${qualityScore} below threshold ${policy.qualityThreshold}`);
      confidence -= 20;
    }

    // Determine enforcement action
    let enforcementAction: ContentValidationResult['enforcementAction'] = 'allow';
    
    if (!isAllowedType || !meetsQualityThreshold) {
      switch (policy.enforcementLevel) {
        case 'strict':
          enforcementAction = 'reject';
          break;
        case 'moderate':
          enforcementAction = qualityScore < 40 ? 'reject' : 'flag';
          break;
        case 'lenient':
          enforcementAction = qualityScore < 30 ? 'reject' : 'allow';
          break;
      }
    }

    // Final validation decision
    const isValid = enforcementAction === 'allow' && isAllowedType && meetsQualityThreshold;

    return {
      isValid,
      contentType,
      confidence: Math.max(0, Math.min(100, confidence)),
      validationReasons,
      toolMetadata,
      qualityScore: Math.max(0, Math.min(100, qualityScore)),
      enforcementAction
    };
  } catch (error) {
    logger.error(
      `Error validating content item at /api/feed/content-validation`,
      error instanceof Error ? error : new Error(String(error))
    );
    return {
      isValid: false,
      contentType: 'invalid',
      confidence: 0,
      validationReasons: ['Validation error occurred'],
      qualityScore: 0,
      enforcementAction: 'reject'
    };
  }
}

// Helper function to apply enforcement actions
async function applyEnforcementActions(
  validationResults: ContentValidationResult[],
  policy: ContentEnforcementPolicy
): Promise<ContentValidationResult[]> {
  // Calculate tool content percentage
  const toolContentCount = validationResults.filter(r => 
    r.contentType === 'tool_generated' || r.contentType === 'tool_enhanced'
  ).length;
  
  const toolContentPercentage = (toolContentCount / validationResults.length) * 100;

  // If tool content percentage is below minimum, prioritize tool content
  if (toolContentPercentage < policy.toolContentMinimum) {
    const toolContent = validationResults.filter(r => 
      r.contentType === 'tool_generated' || r.contentType === 'tool_enhanced'
    );
    
    const nonToolContent = validationResults.filter(r => 
      r.contentType !== 'tool_generated' && r.contentType !== 'tool_enhanced'
    );

    // Calculate how many non-tool items to reject to meet threshold
    const targetToolCount = Math.ceil(validationResults.length * (policy.toolContentMinimum / 100));
    const excessNonToolCount = Math.max(0, nonToolContent.length - (validationResults.length - targetToolCount));

    // Mark excess non-tool content for rejection, starting with lowest quality
    const sortedNonToolContent = nonToolContent.sort((a, b) => a.qualityScore - b.qualityScore);
    
    for (let i = 0; i < excessNonToolCount; i++) {
      if (sortedNonToolContent[i]) {
        sortedNonToolContent[i].enforcementAction = 'reject';
        sortedNonToolContent[i].validationReasons.push('Rejected to maintain tool content threshold');
        sortedNonToolContent[i].isValid = false;
      }
    }
  }

  return validationResults;
}

// Helper function to generate content analytics
function generateContentAnalytics(validationResults: ContentValidationResult[]): FeedContentAnalytics {
  const totalPosts = validationResults.length;
  const toolGeneratedCount = validationResults.filter(r => 
    r.contentType === 'tool_generated' || r.contentType === 'tool_enhanced'
  ).length;
  
  const toolGeneratedPercentage = totalPosts > 0 ? (toolGeneratedCount / totalPosts) * 100 : 0;
  
  const averageQualityScore = totalPosts > 0 
    ? validationResults.reduce((sum, r) => sum + r.qualityScore, 0) / totalPosts 
    : 0;

  // Content type distribution
  const contentTypeDistribution: Record<string, number> = {};
  validationResults.forEach(r => {
    contentTypeDistribution[r.contentType] = (contentTypeDistribution[r.contentType] || 0) + 1;
  });

  // Enforcement actions
  const enforcementActions: Record<string, number> = {};
  validationResults.forEach(r => {
    enforcementActions[r.enforcementAction] = (enforcementActions[r.enforcementAction] || 0) + 1;
  });

  // Validation failures
  const failureReasons: Record<string, number> = {};
  validationResults.filter(r => !r.isValid).forEach(r => {
    r.validationReasons.forEach(reason => {
      failureReasons[reason] = (failureReasons[reason] || 0) + 1;
    });
  });

  const validationFailures = Object.entries(failureReasons).map(([reason, count]) => ({
    reason,
    count,
    percentage: (count / totalPosts) * 100
  }));

  return {
    totalPosts,
    toolGeneratedCount,
    toolGeneratedPercentage,
    averageQualityScore,
    contentTypeDistribution,
    enforcementActions,
    validationFailures
  };
}

// Helper function to log validation metrics
async function logValidationMetrics(userId: string, spaceId: string | undefined, metrics: any): Promise<void> {
  try {
    await dbAdmin.collection('validationMetrics').add({
      userId,
      spaceId,
      ...metrics,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0]
    });
  } catch (error) {
    logger.error(
      `Error logging validation metrics at /api/feed/content-validation`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to get content validation analytics
async function getContentValidationAnalytics(
  spaceId: string | undefined, 
  startDate: Date, 
  includeDetails: boolean
): Promise<FeedContentAnalytics> {
  try {
    let metricsQuery = dbAdmin.collection('validationMetrics')
      .where('date', '>=', startDate.toISOString().split('T')[0])
      .orderBy('timestamp', 'desc');

    if (spaceId) {
      metricsQuery = metricsQuery.where('spaceId', '==', spaceId);
    }

    const metricsSnapshot = await metricsQuery.limit(100).get();
    const metrics = metricsSnapshot.docs.map(doc => doc.data());

    if (metrics.length === 0) {
      return {
        totalPosts: 0,
        toolGeneratedCount: 0,
        toolGeneratedPercentage: 0,
        averageQualityScore: 0,
        contentTypeDistribution: {},
        enforcementActions: {},
        validationFailures: []
      };
    }

    // Aggregate metrics
    const totalPosts = metrics.reduce((sum, m) => sum + (m.totalItems || 0), 0);
    const validItems = metrics.reduce((sum, m) => sum + (m.validItems || 0), 0);
    const toolItems = metrics.reduce((sum, m) => sum + (m.analytics?.toolGeneratedCount || 0), 0);

    const toolGeneratedPercentage = totalPosts > 0 ? (toolItems / totalPosts) * 100 : 0;
    const averageQualityScore = metrics.reduce((sum, m) => sum + (m.analytics?.averageQualityScore || 0), 0) / metrics.length;

    // Aggregate content type distribution
    const contentTypeDistribution: Record<string, number> = {};
    metrics.forEach(m => {
      if (m.analytics?.contentTypeDistribution) {
        Object.entries(m.analytics.contentTypeDistribution).forEach(([type, count]) => {
          contentTypeDistribution[type] = (contentTypeDistribution[type] || 0) + (count as number);
        });
      }
    });

    // Aggregate enforcement actions
    const enforcementActions: Record<string, number> = {};
    metrics.forEach(m => {
      if (m.analytics?.enforcementActions) {
        Object.entries(m.analytics.enforcementActions).forEach(([action, count]) => {
          enforcementActions[action] = (enforcementActions[action] || 0) + (count as number);
        });
      }
    });

    return {
      totalPosts,
      toolGeneratedCount: toolItems,
      toolGeneratedPercentage,
      averageQualityScore,
      contentTypeDistribution,
      enforcementActions,
      validationFailures: [] // Simplified for aggregated view
    };
  } catch (error) {
    logger.error(
      `Error getting validation analytics at /api/feed/content-validation`,
      error instanceof Error ? error : new Error(String(error))
    );
    return {
      totalPosts: 0,
      toolGeneratedCount: 0,
      toolGeneratedPercentage: 0,
      averageQualityScore: 0,
      contentTypeDistribution: {},
      enforcementActions: {},
      validationFailures: []
    };
  }
}