import {
  createHttpsFunction,
  FunctionContext,
  getFirestore,
  FieldValue,
  functions,
  logger,
  onSchedule,
  admin,
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
  createdAt: admin.firestore.Timestamp;
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
 * Update recommendation metrics based on user interactions
 */
export const updateRecommendationMetrics =
  createHttpsFunction<RecommendationData>(
    async (_data: RecommendationData, context: FunctionContext) => {
      if (!context.auth) {
        throw new functions.https.HttpsError(
          "unauthenticated",
          "User must be authenticated."
        );
      }

      const _uid = context.auth.uid;

      // TODO: Implement logic to update metrics based on user interaction
      // (e.g., clicks, likes, follows on recommended content/users)

      return { success: true, message: "Metrics update acknowledged." };
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

// Recommendation engine implementation
// Currently disabled for vBETA - will be implemented post-launch

export default {};
