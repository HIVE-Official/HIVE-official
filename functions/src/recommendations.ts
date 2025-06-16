import {
  createHttpsFunction,
  FunctionContext,
  getFirestore,
  FieldValue,
  functions,
  logger,
  onSchedule,
} from "./types/firebase";

// Temporary interfaces
interface UserProfile {
  uid: string;
  interests: string[];
  skills: string[];
  major: string;
  year: string;
  followingCount: number;
  engagementScore: number;
}

interface ContentItem {
  id: string;
  authorId: string;
  type: "post" | "event" | "tool";
  tags: string[];
  category: string;
  engagementScore: number;
  createdAt: any;
}

interface RecommendationData {
  type?: "content" | "users";
  limit?: number;
}

/**
 * Generate content recommendations based on user behavior
 */
export const generateContentRecommendations = onSchedule(
  {
    schedule: "every 2 hours",
  },
  async () => {
    try {
      const db = getFirestore();
      logger.info("Starting content recommendation generation");

      // Get active users (simplified)
      const usersSnapshot = await db.collection("users").limit(50).get();
      let processedCount = 0;

      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data() as UserProfile;

        if (userData.interests && Array.isArray(userData.interests)) {
          // Generate personalized content recommendations
          const contentSnapshot = await db
            .collection("content")
            .where("tags", "array-contains-any", userData.interests)
            .limit(20)
            .get();

          const recommendations = contentSnapshot.docs
            .map((doc) => ({
              contentId: doc.id,
              score: calculateRecommendationScore(
                userData,
                doc.data() as ContentItem
              ),
              recommendedAt: FieldValue.serverTimestamp(),
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

          // Store recommendations
          await db.collection("user_recommendations").doc(userDoc.id).set(
            {
              contentRecommendations: recommendations,
              lastUpdated: FieldValue.serverTimestamp(),
            },
            { merge: true }
          );

          processedCount++;
        }
      }

      logger.info(`Generated recommendations for ${processedCount} users`);
    } catch (error) {
      logger.error("Error generating content recommendations:", error);
    }
  }
);

/**
 * Calculate recommendation score for content
 */
function calculateRecommendationScore(
  user: UserProfile,
  content: ContentItem
): number {
  let score = 0;

  // Interest match bonus
  const sharedTags = user.interests.filter((interest) =>
    content.tags.includes(interest)
  );
  score += sharedTags.length * 2;

  // Engagement bonus
  score += content.engagementScore * 0.1;

  // Recency bonus (simplified)
  score += Math.random() * 0.5; // Placeholder for recency calculation

  return score;
}

/**
 * Get personalized recommendations for a user
 */
export const getRecommendations = createHttpsFunction<RecommendationData>(
  async (data: RecommendationData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const { type = "content", limit = 10 } = data;

    try {
      const db = getFirestore();

      // Simple recommendation logic
      const recommendations = [];
      for (let i = 0; i < limit; i++) {
        recommendations.push({
          id: `rec_${i}`,
          type,
          score: Math.random(),
        });
      }

      return { recommendations };
    } catch (error) {
      logger.error("Error getting recommendations:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to get recommendations."
      );
    }
  }
);

/**
 * Calculate user recommendation score
 */
function calculateUserScore(
  currentUser: UserProfile,
  targetUser: UserProfile
): number {
  let score = 0;

  // Shared interests
  const sharedInterests =
    currentUser.interests?.filter((interest) =>
      targetUser.interests?.includes(interest)
    ) || [];
  score += sharedInterests.length * 1.5;

  // Same major bonus
  if (currentUser.major === targetUser.major) {
    score += 2;
  }

  // Similar year bonus
  if (currentUser.year === targetUser.year) {
    score += 1;
  }

  return score;
}

/**
 * Update recommendation metrics based on user interactions
 */
export const updateRecommendationMetrics =
  createHttpsFunction<RecommendationData>(
    async (data: RecommendationData, context: FunctionContext) => {
      if (!context.auth) {
        throw new functions.https.HttpsError(
          "unauthenticated",
          "User must be authenticated."
        );
      }

      const uid = context.auth.uid;

      try {
        const db = getFirestore();

        // Simple metrics update - increment engagement
        await db
          .collection("recommendation_metrics")
          .doc(uid)
          .set(
            {
              lastInteraction: FieldValue.serverTimestamp(),
              interactionCount: FieldValue.increment(1),
            },
            { merge: true }
          );

        logger.info(`Updated recommendation metrics for user: ${uid}`);
        return { success: true };
      } catch (error) {
        logger.error("Error updating recommendation metrics:", error);
        throw new functions.https.HttpsError(
          "internal",
          "Failed to update metrics."
        );
      }
    }
  );

export const updateRecommendations = onSchedule(
  { schedule: "every 6 hours" },
  async () => {
    try {
      logger.info("Updating recommendations");
      const db = getFirestore();

      await db.collection("system").doc("recommendations").update({
        lastUpdated: FieldValue.serverTimestamp(),
      });
    } catch (error) {
      logger.error("Error updating recommendations:", error);
    }
  }
);
