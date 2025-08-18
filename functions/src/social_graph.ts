import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as logger from "firebase-functions/logger";

interface SocialGraphUserStats {
  userId: string;
  followerCount: number;
  followingCount: number;
  mutualConnectionsMap: Record<string, number>;
  influenceScore: number;
  strongConnections: string[];
  clusters: string[];
  lastUpdated: FirebaseFirestore.Timestamp;
}

/**
 * Analyze social graph for a user and update their social metrics
 */
export const analyzeSocialGraph = functions.firestore
  .onDocumentCreated("user_follows/{docId}",
    async (snapshot) => {
      try {
        const followData = snapshot.data();
        if (!followData) return null;

        const {followerId, followedId} = followData;

        if (!followerId || !followedId) {
          logger.warn("Invalid follow document data", {docId: snapshot.id});
          return null;
        }

        logger.info("Processing new follow relationship", {
          followerId,
          followedId,
        });

        // Update social graph metrics for both users
        await Promise.all([
          updateUserSocialMetrics(followerId),
          updateUserSocialMetrics(followedId),
        ]);

        // Generate mutual connections insight
        await calculateMutualConnections(followerId, followedId);

        return null;
      } catch (error) {
        logger.error("Error processing follow relationship", error);
        return null;
      }
    });

/**
 * When a follow is removed, update social metrics
 */
export const processSocialGraphChange = functions.firestore
  .onDocumentDeleted("user_follows/{docId}",
    async (snapshot) => {
      try {
        const followData = snapshot.data();
        if (!followData) return null;

        const {followerId, followedId} = followData;

        if (!followerId || !followedId) {
          return null;
        }

        logger.info("Processing removed follow relationship", {
          followerId,
          followedId,
        });

        // Update social graph metrics for both users
        await Promise.all([
          updateUserSocialMetrics(followerId),
          updateUserSocialMetrics(followedId),
        ]);

        return null;
      } catch (error) {
        logger.error("Error processing follow removal", error);
        return null;
      }
    });

/**
 * Update a user's social graph metrics
 */
async function updateUserSocialMetrics(userId: string): Promise<void> {
  try {
    const db = admin.firestore();

    // Get user's followers
    const followersQuery = await db.collection("user_follows")
      .where("followedId", "==", userId)
      .get();
    const followerIds = followersQuery.docs.map((doc) => doc.data().followerId);

    // Get who the user is following
    const followingQuery = await db.collection("user_follows")
      .where("followerId", "==", userId)
      .get();
    const followingIds = followingQuery.docs.map((doc) => doc.data().followedId);

    // Calculate mutual connections map (follower -> # of shared connections)
    const mutualConnectionsMap: Record<string, number> = {};

    // For each follower, calculate mutuals
    for (const followerId of followerIds) {
      // Skip self
      if (followerId === userId) continue;

      // Get who this follower is following
      const followerFollowingQuery = await db.collection("user_follows")
        .where("followerId", "==", followerId)
        .get();
      const followerFollowingIds = followerFollowingQuery.docs.map((doc) => doc.data().followedId);

      // Count mutual connections
      const mutualCount = followerFollowingIds.filter((id) => followingIds.includes(id)).length;

      if (mutualCount > 0) {
        mutualConnectionsMap[followerId] = mutualCount;
      }
    }

    // Calculate strong connections (followings with most mutuals)
    const strongConnectionCandidates = Object.entries(mutualConnectionsMap)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 10)
      .map(([id]) => id);

    // Calculate graph-based influence score
    const engagementQuery = await db.collection("user_activities")
      .where("targetId", "==", userId)
      .where("targetType", "==", "profile")
      .get();

    const engagementCount = engagementQuery.size;

    // Simple influence formula: Followers * 1 + (Engagements * 0.5) + (Strong connections * 2)
    const influenceScore = (followerIds.length * 1) +
                          (engagementCount * 0.5) +
                          (strongConnectionCandidates.length * 2);

    // Identify clusters by analyzing common interests among connections
    const clusters = await identifySocialClusters(userId, followerIds, followingIds);

    // Create or update social metrics document
    const socialGraphRef = db.collection("user_social_graphs").doc(userId);

    await socialGraphRef.set({
      userId,
      followerCount: followerIds.length,
      followingCount: followingIds.length,
      mutualConnectionsMap,
      influenceScore,
      strongConnections: strongConnectionCandidates,
      clusters,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
    }, {merge: true});

    // Update user profile with follower count
    await db.collection("user_profiles").doc(userId).update({
      followerCount: followerIds.length,
      followingCount: followingIds.length,
      influenceScore: Math.round(influenceScore),
    });

    logger.info("Updated social graph metrics", {
      userId,
      followerCount: followerIds.length,
      followingCount: followingIds.length,
      influenceScore,
    });
  } catch (error) {
    logger.error(`Error updating social metrics for user ${userId}`, error);
  }
}

/**
 * Identify social clusters by analyzing interests of connections
 */
async function identifySocialClusters(
  userId: string,
  followerIds: string[],
  followingIds: string[]
): Promise<string[]> {
  try {
    const db = admin.firestore();
    const allConnectionIds = [...new Set([...followerIds, ...followingIds])];

    // Limit the number of connections to analyze to avoid timeouts
    const connectionSample = allConnectionIds.slice(0, 50);

    // Get user profiles for the connections
    const profiles = await Promise.all(
      connectionSample.map(async (id) => {
        const doc = await db.collection("user_profiles").doc(id).get();
        return doc.exists ? {id, ...doc.data()} : null;
      })
    );

    // Filter out null profiles
    const validProfiles = profiles.filter(Boolean);

    // Collect all interests
    const interestFrequency: Record<string, number> = {};

    validProfiles.forEach((profile) => {
      if (profile.interests && Array.isArray(profile.interests)) {
        profile.interests.forEach((interest) => {
          interestFrequency[interest] = (interestFrequency[interest] || 0) + 1;
        });
      }
    });

    // Find the most common interests (clusters)
    const topClusters = Object.entries(interestFrequency)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5)
      .map(([interest]) => interest);

    return topClusters;
  } catch (error) {
    logger.error("Error identifying social clusters", error);
    return [];
  }
}

/**
 * Calculate mutual connections between two users
 */
async function calculateMutualConnections(
  user1Id: string,
  user2Id: string
): Promise<void> {
  try {
    const db = admin.firestore();

    // Get who user1 follows
    const user1FollowingQuery = await db.collection("user_follows")
      .where("followerId", "==", user1Id)
      .get();
    const user1FollowingIds = user1FollowingQuery.docs.map((doc) => doc.data().followedId);

    // Get who user2 follows
    const user2FollowingQuery = await db.collection("user_follows")
      .where("followerId", "==", user2Id)
      .get();
    const user2FollowingIds = user2FollowingQuery.docs.map((doc) => doc.data().followedId);

    // Calculate mutual connections
    const mutualIds = user1FollowingIds.filter((id) => user2FollowingIds.includes(id));

    if (mutualIds.length > 0) {
      // Store mutual connection record
      await db.collection("mutual_connections").doc(`${user1Id}_${user2Id}`).set({
        user1Id,
        user2Id,
        mutualCount: mutualIds.length,
        mutualIds,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Also create the reverse record
      await db.collection("mutual_connections").doc(`${user2Id}_${user1Id}`).set({
        user1Id: user2Id,
        user2Id: user1Id,
        mutualCount: mutualIds.length,
        mutualIds,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      logger.info("Calculated mutual connections", {
        user1Id,
        user2Id,
        mutualCount: mutualIds.length,
      });
    }
  } catch (error) {
    logger.error("Error calculating mutual connections", error);
  }
}

/**
 * Generate social circle insights for a user (weekly scheduled job)
 */
export const generateSocialInsights = functions.pubsub
  .schedule("0 4 * * 1") // Run at 4:00 AM every Monday
  .timeZone("America/New_York")
  .onRun(async () => {
    try {
      logger.info("Starting weekly social insights generation");

      const db = admin.firestore();

      // Get active users from the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const activeUsersQuery = await db.collection("user_profiles")
        .where("lastActive", ">", thirtyDaysAgo)
        .limit(500) // Process in batches
        .get();

      if (activeUsersQuery.empty) {
        logger.info("No active users found for social insights");
        return null;
      }

      const batch = db.batch();
      const now = admin.firestore.FieldValue.serverTimestamp();
      let insightCount = 0;

      // Process each active user
      for (const userDoc of activeUsersQuery.docs) {
        const userId = userDoc.id;

        // Skip users with very small networks
        const userData = userDoc.data();
        if ((userData.followerCount || 0) < 5 && (userData.followingCount || 0) < 5) {
          continue;
        }

        // Get user's social graph
        const socialGraphDoc = await db.collection("user_social_graphs").doc(userId).get();
        if (!socialGraphDoc.exists) {
          continue;
        }

        const socialGraph = socialGraphDoc.data() as SocialGraphUserStats;

        // Generate insights based on the social graph
        const insights = [];

        // Insight 1: Network growth
        if (socialGraph.followerCount > 0) {
          // Get previous follower count from a week ago
          const lastWeekActivity = await db.collection("user_activities")
            .where("userId", "==", userId)
            .where("action", "==", "weekly_summary")
            .orderBy("timestamp", "desc")
            .limit(1)
            .get();

          if (!lastWeekActivity.empty) {
            const lastWeekData = lastWeekActivity.docs[0].data();
            const previousFollowerCount = lastWeekData.metrics?.followerCount || 0;

            if (socialGraph.followerCount > previousFollowerCount) {
              const growth = socialGraph.followerCount - previousFollowerCount;
              insights.push({
                type: "network_growth",
                title: "Your network is growing!",
                description: `You gained ${growth} new ${growth === 1 ? "follower" : "followers"} in the past week.`,
                metrics: {growth, currentCount: socialGraph.followerCount},
              });
            }
          }
        }

        // Insight 2: Most engaged followers
        if (socialGraph.followerCount > 0) {
          // Get engagement from followers
          const followerEngagements = await db.collection("user_activities")
            .where("targetId", "==", userId)
            .where("targetType", "==", "profile")
            .orderBy("timestamp", "desc")
            .limit(100)
            .get();

          const followerEngagementMap: Record<string, number> = {};

          followerEngagements.forEach((doc) => {
            const engagementData = doc.data();
            const engagerId = engagementData.userId;

            if (engagerId && engagerId !== userId) {
              followerEngagementMap[engagerId] = (followerEngagementMap[engagerId] || 0) + 1;
            }
          });

          // Get top engagers
          const topEngagers = Object.entries(followerEngagementMap)
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, 3)
            .map(([id]) => id);

          if (topEngagers.length > 0) {
            insights.push({
              type: "top_engagers",
              title: "Your most engaged followers",
              description: `${topEngagers.length} followers frequently engage with your content.`,
              metrics: {topEngagers},
            });
          }
        }

        // Insight 3: Common interest clusters
        if (socialGraph.clusters && socialGraph.clusters.length > 0) {
          insights.push({
            type: "interest_clusters",
            title: "Interest clusters in your network",
            description: `Your network has strong interests in ${socialGraph.clusters.slice(0, 3).join(", ")}.`,
            metrics: {clusters: socialGraph.clusters},
          });
        }

        // Insight 4: Influencer connection opportunities
        const influencerOpportunities = await findInfluencerOpportunities(userId, socialGraph);
        if (influencerOpportunities.length > 0) {
          insights.push({
            type: "influencer_opportunities",
            title: "Connect with influencers",
            description: `${influencerOpportunities.length} influential users share interests with you.`,
            metrics: {opportunities: influencerOpportunities},
          });
        }

        // Store insights if we have any
        if (insights.length > 0) {
          batch.set(db.collection("user_social_insights").doc(userId), {
            userId,
            insights,
            generatedAt: now,
          });

          // Create an activity record for the weekly summary
          batch.set(db.collection("user_activities").doc(), {
            userId,
            action: "weekly_summary",
            targetType: "social_insights",
            targetId: userId,
            timestamp: now,
            metrics: {
              followerCount: socialGraph.followerCount,
              followingCount: socialGraph.followingCount,
              influenceScore: socialGraph.influenceScore,
            },
          });

          insightCount++;
        }
      }

      // Commit all insights at once
      if (insightCount > 0) {
        await batch.commit();
        logger.info(`Generated social insights for ${insightCount} users`);
      } else {
        logger.info("No social insights were generated");
      }

      return null;
    } catch (error) {
      logger.error("Error generating social insights", error);
      return null;
    }
  });

/**
 * Find influencer connection opportunities for a user
 */
async function findInfluencerOpportunities(
  userId: string,
  socialGraph: SocialGraphUserStats
): Promise<Array<{id: string, score: number, mutualConnections: number}>> {
  try {
    const db = admin.firestore();

    // Get user profile to check interests
    const userDoc = await db.collection("user_profiles").doc(userId).get();
    if (!userDoc.exists) return [];

    const userData = userDoc.data();
    const userInterests = userData.interests || [];

    if (userInterests.length === 0) return [];

    // Find influencers in the user's interest areas
    const influencersQuery = await db.collection("user_social_graphs")
      .where("influenceScore", ">", 50) // Minimum influence threshold
      .orderBy("influenceScore", "desc")
      .limit(20)
      .get();

    if (influencersQuery.empty) return [];

    // Get existing following to exclude
    const followingQuery = await db.collection("user_follows")
      .where("followerId", "==", userId)
      .get();
    const followingIds = new Set(followingQuery.docs.map((doc) => doc.data().followedId));

    // Add self to exclusion list
    followingIds.add(userId);

    // Filter and score influencers
    const influencerOpportunities = [];

    for (const influencerDoc of influencersQuery.docs) {
      const influencerId = influencerDoc.id;

      // Skip if already following
      if (followingIds.has(influencerId)) continue;

      // Get influencer profile
      const influencerProfileDoc = await db.collection("user_profiles").doc(influencerId).get();
      if (!influencerProfileDoc.exists) continue;

      const influencerProfile = influencerProfileDoc.data();
      const influencerInterests = influencerProfile.interests || [];

      // Calculate interest overlap
      const sharedInterests = userInterests.filter((interest) => influencerInterests.includes(interest));

      if (sharedInterests.length === 0) continue;

      // Calculate mutual connections
      const mutualConnectionsDoc = await db.collection("mutual_connections")
        .doc(`${userId}_${influencerId}`)
        .get();

      const mutualCount = mutualConnectionsDoc.exists ? mutualConnectionsDoc.data().mutualCount : 0;

      // Score based on influence, mutual connections and shared interests
      const score = (influencerDoc.data().influenceScore * 0.5) + (mutualCount * 10) + (sharedInterests.length * 5);

      influencerOpportunities.push({
        id: influencerId,
        score,
        mutualConnections: mutualCount,
      });
    }

    // Return top 5 opportunities sorted by score
    return influencerOpportunities
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  } catch (error) {
    logger.error("Error finding influencer opportunities", error);
    return [];
  }
}

/**
 * Function to get social graph statistics for a user
 */
export const getUserSocialStats = functions.https.onCall(
  async (data, context) => {
    // Ensure the user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be logged in to access social stats"
      );
    }

    const viewerId = context.auth.uid;
    const targetUserId = data.userId || viewerId; // Default to self if no userId provided

    try {
      const db = admin.firestore();

      // Get user's social graph
      const socialGraphDoc = await db.collection("user_social_graphs").doc(targetUserId).get();

      if (!socialGraphDoc.exists) {
        return {
          followerCount: 0,
          followingCount: 0,
          mutualConnections: [],
          topClusters: [],
        };
      }

      const socialGraph = socialGraphDoc.data();

      // Get mutual connections between viewer and target (if different)
      let mutualConnections = [];

      if (viewerId !== targetUserId) {
        const mutualDoc = await db.collection("mutual_connections")
          .doc(`${viewerId}_${targetUserId}`)
          .get();

        if (mutualDoc.exists) {
          // Get profiles for mutual connections
          const mutualData = mutualDoc.data();
          const mutualUsers = await Promise.all(
            mutualData.mutualIds.slice(0, 5).map(async (id) => {
              const profileDoc = await db.collection("user_profiles").doc(id).get();

              if (profileDoc.exists) {
                const profile = profileDoc.data();
                return {
                  id,
                  displayName: profile.displayName,
                  profileImageUrl: profile.profileImageUrl,
                };
              }

              return null;
            })
          );

          mutualConnections = mutualUsers.filter(Boolean);
        }
      }

      return {
        followerCount: socialGraph.followerCount || 0,
        followingCount: socialGraph.followingCount || 0,
        influenceScore: socialGraph.influenceScore || 0,
        mutualConnectionsCount: mutualConnections.length,
        mutualConnections,
        topClusters: socialGraph.clusters || [],
      };
    } catch (error) {
      logger.error("Error getting user social stats", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to get social stats"
      );
    }
  }
);
