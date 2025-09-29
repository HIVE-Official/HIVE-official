import { withAuthAndErrors, type AuthenticatedRequest } from "@/lib/middleware";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import type { Space } from "@hive/core";

/**
 * SPEC.md Behavioral Psychology Algorithm:
 * Score = (AnxietyRelief × 0.4) + (SocialProof × 0.3) + (InsiderAccess × 0.3)
 */
interface BehavioralSpace extends Space {
  anxietyReliefScore: number;
  socialProofScore: number;
  insiderAccessScore: number;
  recommendationScore: number;
  joinToActiveRate: number;
  mutualConnections: number;
  friendsInSpace: number;
}

export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = request.auth!.uid;

  try {
    // Get user profile for personalization
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (!userData) {
      return respond.error("User profile not found", "NOT_FOUND", { status: 404 });
    }

    // Get user's connections and friends for social proof
    const connectionsSnapshot = await dbAdmin
      .collection('connections')
      .where('userId', '==', userId)
      .where('status', '==', 'connected')
      .get();

    const connectionIds = connectionsSnapshot.docs.map(doc => doc.data().connectedUserId);

    const friendsSnapshot = await dbAdmin
      .collection('friends')
      .where('userId', '==', userId)
      .where('status', '==', 'accepted')
      .get();

    const friendIds = friendsSnapshot.docs.map(doc => doc.data().friendId);

    // Get all spaces with campus isolation
    const spacesSnapshot = await dbAdmin
      .collection('spaces')
      .where('campusId', '==', 'ub-buffalo')
      .where('isActive', '==', true)
      .limit(100)
      .get();

    const spaces: BehavioralSpace[] = [];

    // Calculate behavioral scores for each space
    for (const spaceDoc of spacesSnapshot.docs) {
      const spaceData = spaceDoc.data() as Space;

      // Get member data for social proof calculation
      const membersSnapshot = await dbAdmin
        .collection('spaceMembers')
        .where('spaceId', '==', spaceDoc.id)
        .where('status', '==', 'active')
        .limit(100)
        .get();

      const memberIds = membersSnapshot.docs.map(doc => doc.data().userId);

      // Calculate mutual connections
      const mutualConnections = memberIds.filter(id => connectionIds.includes(id)).length;
      const friendsInSpace = memberIds.filter(id => friendIds.includes(id)).length;

      // Calculate anxiety relief score based on space activity and category
      const anxietyReliefScore = calculateAnxietyReliefScore(spaceData, userData);

      // Calculate social proof score
      const socialProofScore = calculateSocialProofScore(
        mutualConnections,
        friendsInSpace,
        spaceData.memberCount || 0
      );

      // Calculate insider access score
      const insiderAccessScore = calculateInsiderAccessScore(spaceData);

      // Overall recommendation score (SPEC.md formula)
      const recommendationScore =
        (anxietyReliefScore * 0.4) +
        (socialProofScore * 0.3) +
        (insiderAccessScore * 0.3);

      // Calculate join-to-active rate
      const joinToActiveRate = calculateJoinToActiveRate(spaceData, membersSnapshot.size);

      spaces.push({
        ...spaceData,
        id: spaceDoc.id,
        anxietyReliefScore,
        socialProofScore,
        insiderAccessScore,
        recommendationScore,
        joinToActiveRate,
        mutualConnections,
        friendsInSpace
      });
    }

    // Sort by recommendation score
    spaces.sort((a, b) => b.recommendationScore - a.recommendationScore);

    // Categorize spaces for SPEC.md sections
    const panicRelief = spaces
      .filter(s => s.anxietyReliefScore > 0.6)
      .slice(0, 5);

    const whereYourFriendsAre = spaces
      .filter(s => s.socialProofScore > 0.5 && (s.friendsInSpace > 0 || s.mutualConnections > 2))
      .slice(0, 5);

    const insiderAccess = spaces
      .filter(s => s.insiderAccessScore > 0.7)
      .slice(0, 5);

    return respond.success({
      panicRelief,
      whereYourFriendsAre,
      insiderAccess,
      recommendations: spaces.slice(0, 20), // Top 20 overall
      meta: {
        totalSpaces: spacesSnapshot.size,
        userConnections: connectionIds.length,
        userFriends: friendIds.length
      }
    });

  } catch (error) {
    logger.error('Error generating space recommendations', { error, userId });
    return respond.error("Failed to generate recommendations", "INTERNAL_ERROR", { status: 500 });
  }
});

/**
 * Calculate anxiety relief score based on space characteristics
 * Higher scores for spaces that address common student anxieties
 */
function calculateAnxietyReliefScore(space: any, user: any): number {
  let score = 0;

  // Study stress relief
  if (space.category === 'student_org' && space.tags?.includes('study')) {
    score += 0.3;
  }

  // Loneliness relief - active social spaces
  if (space.activityLevel === 'very_active' || space.activityLevel === 'active') {
    score += 0.2;
  }

  // FOMO relief - trending or popular spaces
  if (space.memberCount > 50) {
    score += 0.2;
  }

  // Major-specific anxiety relief
  if (user.major && space.tags?.includes(user.major.toLowerCase())) {
    score += 0.3;
  }

  return Math.min(score, 1);
}

/**
 * Calculate social proof score based on connections
 */
function calculateSocialProofScore(
  mutualConnections: number,
  friendsInSpace: number,
  totalMembers: number
): number {
  let score = 0;

  // Friends are highest signal
  if (friendsInSpace > 0) {
    score += Math.min(friendsInSpace * 0.2, 0.4);
  }

  // Connections are medium signal
  if (mutualConnections > 0) {
    score += Math.min(mutualConnections * 0.1, 0.3);
  }

  // Popular spaces have social proof
  if (totalMembers > 100) {
    score += 0.2;
  } else if (totalMembers > 50) {
    score += 0.1;
  }

  // Network effect bonus
  const networkRatio = (mutualConnections + friendsInSpace) / Math.max(totalMembers, 1);
  score += Math.min(networkRatio * 0.2, 0.2);

  return Math.min(score, 1);
}

/**
 * Calculate insider access score based on exclusivity
 */
function calculateInsiderAccessScore(space: any): number {
  let score = 0;

  // Join policy affects exclusivity
  if (space.joinPolicy === 'invite_only') {
    score += 0.4;
  } else if (space.joinPolicy === 'approval') {
    score += 0.2;
  }

  // Smaller spaces feel more exclusive
  if (space.memberCount < 30) {
    score += 0.3;
  } else if (space.memberCount < 50) {
    score += 0.1;
  }

  // Greek life and certain categories are inherently exclusive
  if (space.category === 'greek_life') {
    score += 0.2;
  }

  // Private spaces are exclusive
  if (space.visibility === 'members_only') {
    score += 0.1;
  }

  return Math.min(score, 1);
}

/**
 * Calculate the join-to-active member conversion rate
 * SPEC.md target: 70% for optimal behavioral change
 */
function calculateJoinToActiveRate(space: any, activeMembers: number): number {
  const totalMembers = space.memberCount || 1;
  const rate = activeMembers / totalMembers;

  // Simulate some variability for demo
  // In production, this would be calculated from real engagement data
  const variation = (Math.random() * 0.2) - 0.1; // +/- 10%

  return Math.max(0, Math.min(1, rate + variation));
}