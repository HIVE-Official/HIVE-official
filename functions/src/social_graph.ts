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
  connections: string[];
  followingCount: number;
  followersCount: number;
}

interface SocialGraphData {
  userId?: string;
  targetUserId?: string;
  limit?: number;
}

/**
 * Analyze social connections and update graph metrics
 */
export const analyzeSocialConnections = onSchedule(
  {
    schedule: "every 6 hours",
  },
  async () => {
    try {
      const db = getFirestore();
      logger.info("Starting social graph analysis");

      // Basic social graph analysis logic
      const usersSnapshot = await db.collection("users").limit(100).get();
      let processedCount = 0;

      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data() as UserProfile;

        if (userData.interests && Array.isArray(userData.interests)) {
          // Calculate connection strength based on shared interests
          const connectionStrength = userData.interests.length * 0.1;

          await userDoc.ref.update({
            socialScore: connectionStrength,
            lastAnalyzed: FieldValue.serverTimestamp(),
          });

          processedCount++;
        }
      }

      logger.info(
        `Social graph analysis completed for ${processedCount} users`
      );
    } catch (error) {
      logger.error("Error in social graph analysis:", error);
    }
  }
);

/**
 * Get social graph recommendations for a user
 */
export const getSocialRecommendations = createHttpsFunction<SocialGraphData>(
  async (data: SocialGraphData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const uid = context.auth.uid;
    const { limit = 10 } = data;

    try {
      const db = getFirestore();

      // Get user's profile and interests
      const userDoc = await db.collection("users").doc(uid).get();
      const userData = userDoc.data() as UserProfile;

      if (!userData?.interests) {
        return { recommendations: [] };
      }

      // Simple recommendation logic based on shared interests
      const recommendationsSnapshot = await db
        .collection("users")
        .where("interests", "array-contains-any", userData.interests)
        .limit(limit * 2) // Get more to filter out self and existing connections
        .get();

      const recommendations = recommendationsSnapshot.docs
        .filter((doc) => doc.id !== uid) // Exclude self
        .slice(0, limit)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          connectionScore: calculateConnectionScore(
            userData.interests,
            doc.data().interests || []
          ),
        }));

      return { recommendations };
    } catch (error) {
      logger.error("Error getting social recommendations:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to get recommendations."
      );
    }
  }
);

/**
 * Calculate connection score based on shared interests
 */
function calculateConnectionScore(
  userInterests: string[],
  targetInterests: string[]
): number {
  const sharedInterests = userInterests.filter((interest) =>
    targetInterests.includes(interest)
  );
  return (
    sharedInterests.length /
    Math.max(userInterests.length, targetInterests.length)
  );
}

/**
 * Update user's social graph when they follow someone
 */
export const updateSocialGraph = createHttpsFunction<SocialGraphData>(
  async (data: SocialGraphData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const uid = context.auth.uid;
    const { targetUserId } = data;

    if (!targetUserId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "targetUserId is required."
      );
    }

    try {
      const db = getFirestore();

      // Update social connection strength
      await db
        .collection("social_connections")
        .doc(`${uid}_${targetUserId}`)
        .set({
          fromUserId: uid,
          toUserId: targetUserId,
          connectionType: "follow",
          createdAt: FieldValue.serverTimestamp(),
          strength: 1.0,
        });

      logger.info(`Updated social graph connection: ${uid} -> ${targetUserId}`);
      return { success: true };
    } catch (error) {
      logger.error("Error updating social graph:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to update social graph."
      );
    }
  }
);
