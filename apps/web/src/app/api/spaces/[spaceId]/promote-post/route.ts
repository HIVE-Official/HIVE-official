import { NextRequest, NextResponse } from 'next/server';
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { sseRealtimeService } from '@/lib/sse-realtime-service';
import { FieldValue } from 'firebase-admin/firestore';

/**
 * Space-to-Feed Promotion System
 * Per SPEC.md:
 * - Manual promotion by space leaders
 * - Automatic velocity-based promotion
 * - Feed algorithm scoring integration
 */

// POST /api/spaces/[spaceId]/promote-post - Promote a space post to campus feed
export const POST = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);
  const { spaceId } = await context.params;

  try {
    const body = await request.json();
    const { postId, promotionType = 'manual' } = body;

    if (!postId) {
      return respond.error("Post ID is required", "BAD_REQUEST", { status: 400 });
    }

    // Get space data
    const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();
    if (!spaceDoc.exists) {
      return respond.error("Space not found", "NOT_FOUND", { status: 404 });
    }

    const spaceData = spaceDoc.data();

    // Check if user is space leader (required for manual promotion)
    if (promotionType === 'manual') {
      const memberDoc = await dbAdmin
        .collection('spaces')
        .doc(spaceId)
        .collection('members')
        .doc(userId)
        .get();

      if (!memberDoc.exists || !['owner', 'leader'].includes(memberDoc.data()?.role)) {
        return respond.error("Only space leaders can promote posts", "FORBIDDEN", { status: 403 });
      }
    }

    // Get the post to promote
    const postDoc = await dbAdmin
      .collection('spaces')
      .doc(spaceId)
      .collection('posts')
      .doc(postId)
      .get();

    if (!postDoc.exists) {
      return respond.error("Post not found", "NOT_FOUND", { status: 404 });
    }

    const postData = postDoc.data();

    // Check if post is already promoted
    const existingPromotion = await dbAdmin
      .collection('feed')
      .where('sourcePostId', '==', postId)
      .where('sourceSpaceId', '==', spaceId)
      .limit(1)
      .get();

    if (!existingPromotion.empty) {
      return respond.error("Post is already promoted to feed", "ALREADY_EXISTS", { status: 409 });
    }

    // Calculate feed score based on post metrics
    const feedScore = calculateFeedScore(postData);

    // Create feed entry with behavioral psychology elements
    const feedEntry = {
      // Original post data
      ...postData,

      // Promotion metadata
      sourceSpaceId: spaceId,
      sourcePostId: postId,
      spaceName: spaceData.name,
      spaceEmoji: spaceData.emoji || '🏫',
      spaceType: spaceData.type,

      // Promotion details
      promotionType,
      promotedBy: promotionType === 'manual' ? userId : 'system',
      promotedAt: FieldValue.serverTimestamp(),

      // Feed algorithm scoring (per SPEC.md)
      feedScore: feedScore,
      scoreBreakdown: {
        recency: postData.createdAt,
        engagement: (postData.reactions?.heart || 0) + (postData.commentCount || 0) * 2,
        author: postData.authorId,
        shareability: postData.shareCount || 0,
        persistence: calculatePersistenceScore(postData),
        variability: Math.random() * 0.2 // Random component per SPEC.md
      },

      // Behavioral psychology tracking
      psychologyMetrics: {
        panicReliefPotential: calculatePanicReliefScore(postData),
        socialProofScore: calculateSocialProofScore(postData),
        insiderKnowledgeScore: calculateInsiderScore(postData),
        viralityCoefficient: calculateViralityScore(postData)
      },

      // Campus isolation
      campusId: 'ub-buffalo',
      isActive: true,

      // Timestamps
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    };

    // Add to feed collection
    const feedRef = await dbAdmin.collection('feed').add(feedEntry);

    // Update space post with promotion status
    await dbAdmin
      .collection('spaces')
      .doc(spaceId)
      .collection('posts')
      .doc(postId)
      .update({
        isPromotedToFeed: true,
        feedPostId: feedRef.id,
        promotedAt: FieldValue.serverTimestamp()
      });

    // Update space stats
    await dbAdmin.collection('spaces').doc(spaceId).update({
      promotedPostsCount: FieldValue.increment(1),
      lastPromotedAt: FieldValue.serverTimestamp()
    });

    // Broadcast promotion to feed subscribers via SSE
    try {
      await sseRealtimeService.sendMessage({
        type: 'feed',
        channel: 'campus:feed:promoted',
        senderId: userId,
        content: {
          type: 'post_promoted',
          post: {
            id: feedRef.id,
            ...feedEntry
          },
          sourceSpace: {
            id: spaceId,
            name: spaceData.name,
            emoji: spaceData.emoji
          }
        },
        metadata: {
          timestamp: new Date().toISOString(),
          priority: 'high', // Promoted content gets high priority
          requiresAck: false,
          retryCount: 0
        }
      });
    } catch (sseError) {
      logger.warn('Failed to broadcast promoted post via SSE', { sseError, feedPostId: feedRef.id });
    }

    return respond.success({
      feedPostId: feedRef.id,
      feedScore: feedScore,
      promotionType
    }, {
      message: `Post successfully promoted to campus feed`
    });

  } catch (error) {
    logger.error('Error promoting post to feed', { error, spaceId, userId });
    return respond.error("Failed to promote post", "INTERNAL_ERROR", { status: 500 });
  }
});

/**
 * Calculate feed score based on SPEC.md algorithm:
 * Score = (R × 0.3) + (E × 0.2) + (A × 0.2) + (S × 0.2) + (P × 0.1) + (V × random(0, 0.2))
 */
function calculateFeedScore(postData: any): number {
  const now = Date.now();
  const postAge = now - (postData.createdAt?._seconds || 0) * 1000;

  // Recency (R): 0-1 score, newer is higher
  const recencyScore = Math.max(0, 1 - (postAge / (7 * 24 * 60 * 60 * 1000))); // 7 days max

  // Engagement (E): Normalized by expected engagement
  const engagementScore = Math.min(1, (
    (postData.reactions?.heart || 0) +
    (postData.commentCount || 0) * 2 +
    (postData.shareCount || 0) * 3
  ) / 100); // 100 engagement actions = max score

  // Author credibility (A): Based on author's total engagement
  const authorScore = Math.min(1, (postData.authorEngagementTotal || 0) / 1000);

  // Shareability (S): Based on shares and saves
  const shareabilityScore = Math.min(1, (postData.shareCount || 0) / 20);

  // Persistence (P): How long people engage with it
  const persistenceScore = calculatePersistenceScore(postData);

  // Variability (V): Random component for discovery
  const variabilityScore = Math.random() * 0.2;

  // Calculate weighted score
  const score =
    (recencyScore * 0.3) +
    (engagementScore * 0.2) +
    (authorScore * 0.2) +
    (shareabilityScore * 0.2) +
    (persistenceScore * 0.1) +
    variabilityScore;

  return Math.round(score * 100) / 100; // Round to 2 decimals
}

function calculatePersistenceScore(postData: any): number {
  // Measure ongoing engagement over time
  const lastActivityAge = Date.now() - (postData.lastActivity?._seconds || 0) * 1000;
  const postAge = Date.now() - (postData.createdAt?._seconds || 0) * 1000;

  if (postAge === 0) return 0;

  // Higher score if activity continues long after creation
  const persistenceRatio = lastActivityAge / postAge;
  return Math.min(1, persistenceRatio);
}

function calculatePanicReliefScore(postData: any): number {
  // Posts that provide quick solutions score higher
  const hasSolution = postData.content?.toLowerCase().includes('solved') ||
                     postData.content?.toLowerCase().includes('fixed') ||
                     postData.content?.toLowerCase().includes('answer');

  const hasHelp = postData.content?.toLowerCase().includes('help') ||
                 postData.content?.toLowerCase().includes('anyone');

  return (hasSolution ? 0.6 : 0) + (hasHelp ? 0.4 : 0);
}

function calculateSocialProofScore(postData: any): number {
  // High engagement = high social proof
  const engagementCount = (postData.reactions?.heart || 0) +
                         (postData.commentCount || 0) +
                         (postData.shareCount || 0);

  return Math.min(1, engagementCount / 50);
}

function calculateInsiderScore(postData: any): number {
  // Posts with exclusive info or early announcements
  const hasExclusive = postData.content?.toLowerCase().includes('just found out') ||
                      postData.content?.toLowerCase().includes('insider') ||
                      postData.content?.toLowerCase().includes('exclusive') ||
                      postData.content?.toLowerCase().includes('early access');

  const hasLocation = postData.content?.toLowerCase().includes('room') ||
                     postData.content?.toLowerCase().includes('building') ||
                     postData.content?.toLowerCase().includes('floor');

  return (hasExclusive ? 0.7 : 0) + (hasLocation ? 0.3 : 0);
}

function calculateViralityScore(postData: any): number {
  // Measure share velocity
  const shareRate = (postData.shareCount || 0) / Math.max(1, postData.viewCount || 1);
  const commentRate = (postData.commentCount || 0) / Math.max(1, postData.viewCount || 1);

  return Math.min(1, shareRate * 5 + commentRate * 3);
}

/**
 * GET /api/spaces/[spaceId]/promote-post - Check promotion eligibility
 */
export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);
  const { spaceId } = await context.params;

  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return respond.error("Post ID is required", "BAD_REQUEST", { status: 400 });
    }

    // Get the post
    const postDoc = await dbAdmin
      .collection('spaces')
      .doc(spaceId)
      .collection('posts')
      .doc(postId)
      .get();

    if (!postDoc.exists) {
      return respond.error("Post not found", "NOT_FOUND", { status: 404 });
    }

    const postData = postDoc.data();

    // Check automatic promotion eligibility (velocity-based)
    const eligibility = {
      canPromote: false,
      reasons: [] as string[],
      score: calculateFeedScore(postData),
      metrics: {
        engagement: (postData.reactions?.heart || 0) + (postData.commentCount || 0),
        velocity: calculateVelocity(postData),
        isPromoted: postData.isPromotedToFeed || false
      }
    };

    // Check if already promoted
    if (postData.isPromotedToFeed) {
      eligibility.reasons.push('Already promoted to feed');
      return respond.success(eligibility);
    }

    // Check velocity threshold (automatic promotion)
    if (eligibility.metrics.velocity >= 0.5) {
      eligibility.canPromote = true;
      eligibility.reasons.push('High engagement velocity - eligible for automatic promotion');
    }

    // Check engagement threshold
    if (eligibility.metrics.engagement >= 10) {
      eligibility.canPromote = true;
      eligibility.reasons.push('High engagement count - eligible for promotion');
    }

    // Check if user is leader (can always promote)
    const memberDoc = await dbAdmin
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .doc(userId)
      .get();

    if (memberDoc.exists && ['owner', 'leader'].includes(memberDoc.data()?.role)) {
      eligibility.canPromote = true;
      eligibility.reasons.push('You are a space leader - can manually promote');
    }

    if (!eligibility.canPromote) {
      eligibility.reasons.push('Post needs more engagement for automatic promotion');
    }

    return respond.success(eligibility);

  } catch (error) {
    logger.error('Error checking promotion eligibility', { error, spaceId, userId });
    return respond.error("Failed to check eligibility", "INTERNAL_ERROR", { status: 500 });
  }
});

function calculateVelocity(postData: any): number {
  const postAge = (Date.now() - (postData.createdAt?._seconds || 0) * 1000) / (60 * 60 * 1000); // Hours
  if (postAge === 0) return 0;

  const engagement = (postData.reactions?.heart || 0) + (postData.commentCount || 0);
  return engagement / Math.max(1, postAge); // Engagement per hour
}