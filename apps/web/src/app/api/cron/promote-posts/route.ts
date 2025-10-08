import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { FieldValue } from 'firebase-admin/firestore';

/**
 * Automatic Post Promotion Worker
 * Runs periodically to promote high-velocity posts from spaces to campus feed
 * Per SPEC.md: Velocity-based automatic promotion
 */

// Velocity thresholds for automatic promotion
const PROMOTION_THRESHOLDS = {
  engagement_per_hour: 5,     // 5+ engagements per hour
  minimum_engagement: 10,      // At least 10 total engagements
  comment_threshold: 3,        // At least 3 comments (hot thread potential)
  share_threshold: 2,          // At least 2 shares
  max_age_hours: 24           // Don't promote posts older than 24 hours
};

export async function GET(request: NextRequest) {
  // Verify this is called by a cron job or admin (in production, add proper auth)
  const authHeader = request.headers.get('authorization');

  // Simple auth check for cron job
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    logger.warn('Unauthorized cron access attempt');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const startTime = Date.now();
    let promotedCount = 0;
    let checkedCount = 0;
    const errors: any[] = [];

    // Get all active spaces
    const spacesSnapshot = await dbAdmin
      .collection('spaces')
      .where('campusId', '==', 'ub-buffalo')
      .where('isActive', '==', true)
      .get();

    logger.info(`Checking ${spacesSnapshot.size} spaces for promotable posts`);

    // Check each space for high-velocity posts
    for (const spaceDoc of spacesSnapshot.docs) {
      const spaceId = spaceDoc.id;
      const spaceData = spaceDoc.data();

      try {
        // Get recent posts that aren't already promoted
        const cutoffTime = new Date(Date.now() - PROMOTION_THRESHOLDS.max_age_hours * 60 * 60 * 1000);

        const postsQuery = await dbAdmin
          .collection('spaces')
          .doc(spaceId)
          .collection('posts')
          .where('createdAt', '>=', cutoffTime)
          .where('isPromotedToFeed', '!=', true)
          .where('isDeleted', '!=', true)
          .orderBy('createdAt', 'desc')
          .limit(10) // Check top 10 recent posts per space
          .get();

        for (const postDoc of postsQuery.docs) {
          checkedCount++;
          const postData = postDoc.data();
          const postId = postDoc.id;

          // Calculate engagement velocity
          const postAgeHours = (Date.now() - postData.createdAt.toMillis()) / (60 * 60 * 1000);
          const totalEngagement = (postData.reactions?.heart || 0) +
                                 (postData.commentCount || 0) * 2 + // Comments weighted more
                                 (postData.shareCount || 0) * 3;     // Shares weighted most

          const engagementVelocity = totalEngagement / Math.max(1, postAgeHours);

          // Check if post meets promotion criteria
          const meetsVelocity = engagementVelocity >= PROMOTION_THRESHOLDS.engagement_per_hour;
          const meetsMinimum = totalEngagement >= PROMOTION_THRESHOLDS.minimum_engagement;
          const isHotThread = postData.commentCount >= PROMOTION_THRESHOLDS.comment_threshold;
          const isViral = postData.shareCount >= PROMOTION_THRESHOLDS.share_threshold;

          if (meetsVelocity && meetsMinimum && (isHotThread || isViral)) {
            // Promote this post to feed
            const promotionResult = await promotePostToFeed(
              spaceId,
              spaceData,
              postId,
              postData,
              engagementVelocity
            );

            if (promotionResult.success) {
              promotedCount++;
              logger.info('Auto-promoted post to feed', {
                spaceId,
                postId,
                engagementVelocity,
                totalEngagement,
                feedPostId: promotionResult.feedPostId
              });
            } else {
              errors.push({
                spaceId,
                postId,
                error: promotionResult.error
              });
            }
          }
        }
      } catch (spaceError) {
        logger.error(
          `Error processing space for auto-promotion: ${spaceId}`,
          spaceError instanceof Error ? spaceError : new Error(String(spaceError))
        );
        errors.push({
          spaceId,
          error: String(spaceError)
        });
      }
    }

    const duration = Date.now() - startTime;

    // Log summary
    logger.info(
      `Auto-promotion cron job completed: ${promotedCount}/${checkedCount} posts promoted from ${spacesSnapshot.size} spaces, ${errors.length} errors, ${duration}ms`
    );

    return NextResponse.json({
      success: true,
      stats: {
        duration,
        spacesChecked: spacesSnapshot.size,
        postsChecked: checkedCount,
        postsPromoted: promotedCount,
        errors: errors.length
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Critical error in auto-promotion cron job', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to run auto-promotion',
        details: String(error)
      },
      { status: 500 }
    );
  }
}

async function promotePostToFeed(
  spaceId: string,
  spaceData: any,
  postId: string,
  postData: any,
  velocity: number
): Promise<{ success: boolean; feedPostId?: string; error?: string }> {
  try {
    // Check if already promoted (double-check to prevent duplicates)
    const existingPromotion = await dbAdmin
      .collection('feed')
      .where('sourcePostId', '==', postId)
      .where('sourceSpaceId', '==', spaceId)
      .limit(1)
      .get();

    if (!existingPromotion.empty) {
      return { success: false, error: 'Already promoted' };
    }

    // Calculate comprehensive feed score
    const feedScore = calculateFeedScore(postData, velocity);

    // Get author data for enriched feed entry
    const authorDoc = await dbAdmin.collection('users').doc(postData.authorId).get();
    const authorData = authorDoc.exists ? authorDoc.data() : null;

    // Create feed entry with behavioral psychology elements
    const feedEntry = {
      // Original post data
      content: postData.content,
      type: postData.type,
      imageUrl: postData.imageUrl,
      linkUrl: postData.linkUrl,

      // Author info
      authorId: postData.authorId,
      author: authorData ? {
        id: postData.authorId,
        fullName: authorData.displayName,
        handle: authorData.handle,
        photoURL: authorData.photoURL,
        verified: authorData.verified || false
      } : null,

      // Space context
      sourceSpaceId: spaceId,
      sourcePostId: postId,
      spaceName: spaceData.name,
      spaceEmoji: spaceData.emoji || '🏫',
      spaceType: spaceData.type,
      spaceMemberCount: spaceData.memberCount || 0,

      // Promotion metadata
      promotionType: 'automatic',
      promotedBy: 'system',
      promotedAt: FieldValue.serverTimestamp(),
      promotionReason: `High velocity: ${velocity.toFixed(1)} engagements/hour`,

      // Feed algorithm scores
      feedScore: feedScore,
      velocityScore: velocity,
      scoreBreakdown: {
        recency: postData.createdAt,
        engagement: (postData.reactions?.heart || 0) + (postData.commentCount || 0) * 2,
        shareability: postData.shareCount || 0,
        persistence: calculatePersistenceScore(postData),
        variability: Math.random() * 0.2
      },

      // Engagement metrics (carried over)
      reactions: postData.reactions || { heart: 0 },
      reactedUsers: postData.reactedUsers || { heart: [] },
      commentCount: postData.commentCount || 0,
      shareCount: postData.shareCount || 0,
      viewCount: postData.viewCount || 0,

      // Behavioral psychology metrics
      psychologyMetrics: {
        panicReliefPotential: calculatePanicReliefScore(postData),
        socialProofScore: calculateSocialProofScore(postData, velocity),
        insiderKnowledgeScore: calculateInsiderScore(postData),
        viralityCoefficient: velocity / 10, // Normalized velocity
        urgencyFactor: calculateUrgencyFactor(postData)
      },

      // Hot thread indicator
      isHotThread: postData.commentCount >= 10,

      // Campus isolation
      campusId: 'ub-buffalo',
      isActive: true,
      isPinned: false,
      isDeleted: false,

      // Timestamps
      originalCreatedAt: postData.createdAt,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      lastActivity: postData.lastActivity || postData.createdAt
    };

    // Add to feed collection
    const feedRef = await dbAdmin.collection('feed').add(feedEntry);

    // Update original post with promotion status
    await dbAdmin
      .collection('spaces')
      .doc(spaceId)
      .collection('posts')
      .doc(postId)
      .update({
        isPromotedToFeed: true,
        feedPostId: feedRef.id,
        promotedAt: FieldValue.serverTimestamp(),
        promotionType: 'automatic',
        promotionVelocity: velocity
      });

    // Update space stats
    await dbAdmin.collection('spaces').doc(spaceId).update({
      promotedPostsCount: FieldValue.increment(1),
      lastAutoPromotedAt: FieldValue.serverTimestamp(),
      totalFeedReach: FieldValue.increment(1000) // Estimated reach boost
    });

    // Track promotion analytics
    await dbAdmin.collection('analytics').doc('feed_promotions').set({
      daily: {
        [new Date().toISOString().split('T')[0]]: {
          automatic: FieldValue.increment(1),
          totalVelocity: FieldValue.increment(velocity)
        }
      }
    }, { merge: true });

    return { success: true, feedPostId: feedRef.id };

  } catch (error) {
    logger.error(
      `Failed to promote post to feed: ${spaceId}/${postId}`,
      error instanceof Error ? error : new Error(String(error))
    );
    return { success: false, error: String(error) };
  }
}

function calculateFeedScore(postData: any, velocity: number): number {
  const now = Date.now();
  const postAge = now - postData.createdAt.toMillis();

  // Recency (R): 0-1 score, newer is higher
  const recencyScore = Math.max(0, 1 - (postAge / (7 * 24 * 60 * 60 * 1000)));

  // Engagement (E): Normalized by expected engagement
  const engagementScore = Math.min(1, (
    (postData.reactions?.heart || 0) +
    (postData.commentCount || 0) * 2 +
    (postData.shareCount || 0) * 3
  ) / 100);

  // Velocity bonus for automatic promotion
  const velocityBonus = Math.min(0.3, velocity / 20);

  // Calculate weighted score with velocity bonus
  const score =
    (recencyScore * 0.3) +
    (engagementScore * 0.2) +
    (velocityBonus * 0.3) + // Velocity gets significant weight for auto-promotion
    (Math.random() * 0.2);   // Variability

  return Math.round(score * 100) / 100;
}

function calculatePersistenceScore(postData: any): number {
  const lastActivityAge = Date.now() - (postData.lastActivity?.toMillis() || postData.createdAt.toMillis());
  const postAge = Date.now() - postData.createdAt.toMillis();

  if (postAge === 0) return 0;

  const persistenceRatio = 1 - (lastActivityAge / postAge);
  return Math.max(0, Math.min(1, persistenceRatio));
}

function calculatePanicReliefScore(postData: any): number {
  const keywords = ['help', 'solved', 'fixed', 'answer', 'found', 'works'];
  const content = (postData.content || '').toLowerCase();

  let score = 0;
  keywords.forEach(keyword => {
    if (content.includes(keyword)) score += 0.2;
  });

  return Math.min(1, score);
}

function calculateSocialProofScore(postData: any, velocity: number): number {
  const engagementCount = (postData.reactions?.heart || 0) +
                         (postData.commentCount || 0) +
                         (postData.shareCount || 0);

  const engagementScore = Math.min(1, engagementCount / 50);
  const velocityScore = Math.min(1, velocity / 10);

  return (engagementScore * 0.7) + (velocityScore * 0.3);
}

function calculateInsiderScore(postData: any): number {
  const insiderKeywords = ['exclusive', 'just found', 'secret', 'insider', 'early', 'first'];
  const content = (postData.content || '').toLowerCase();

  let score = 0;
  insiderKeywords.forEach(keyword => {
    if (content.includes(keyword)) score += 0.2;
  });

  return Math.min(1, score);
}

function calculateUrgencyFactor(postData: any): number {
  const urgencyKeywords = ['now', 'today', 'tonight', 'urgent', 'asap', 'limited', 'ending'];
  const content = (postData.content || '').toLowerCase();

  let score = 0;
  urgencyKeywords.forEach(keyword => {
    if (content.includes(keyword)) score += 0.15;
  });

  // Boost if it's a recent post with high engagement
  const isRecent = (Date.now() - postData.createdAt.toMillis()) < 3 * 60 * 60 * 1000; // 3 hours
  if (isRecent && postData.commentCount > 5) {
    score += 0.3;
  }

  return Math.min(1, score);
}