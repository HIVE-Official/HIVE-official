import {
  createHttpsFunction,
  FunctionContext,
  getFirestore,
  FieldValue,
  Timestamp,
  functions,
  logger,
  onDocumentCreated,
  onSchedule,
} from "./types/firebase";

interface EngagementData {
  userId?: string;
  contentId?: string;
  action?: "view" | "like" | "comment" | "share";
}

interface UserEngagement {
  userId: string;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  lastActive: typeof Timestamp;
  engagementScore: number;
}

/**
 * Track user engagement on document creation
 */
export const trackEngagement = onDocumentCreated(
  "feed/{postId}/interactions/{interactionId}",
  async (event) => {
    try {
      const interactionData = event.data?.data();

      if (!interactionData?.userId || !interactionData?.type) {
        logger.warn("Missing interaction data for engagement tracking");
        return;
      }

      const db = getFirestore();
      const userId = interactionData.userId;
      const interactionType = interactionData.type;

      // Update user engagement metrics
      const userEngagementRef = db.collection("user_engagement").doc(userId);

      const updateData: Record<string, FirebaseFirestore.FieldValue | number> =
        {
          lastActive: FieldValue.serverTimestamp(),
        };

      switch (interactionType) {
        case "like":
          updateData.totalLikes = FieldValue.increment(1);
          break;
        case "comment":
          updateData.totalComments = FieldValue.increment(1);
          break;
        case "view":
          updateData.totalViews = FieldValue.increment(1);
          break;
      }

      await userEngagementRef.set(updateData, { merge: true });

      logger.info(
        `Updated engagement for user ${userId}, action: ${interactionType}`
      );
    } catch (error) {
      logger.error("Error tracking engagement:", error);
    }
  }
);

/**
 * Calculate engagement scores for all users
 */
export const calculateEngagementScores = onSchedule(
  {
    schedule: "every 24 hours",
  },
  async () => {
    try {
      const db = getFirestore();
      logger.info("Starting engagement score calculation");

      const engagementSnapshot = await db
        .collection("user_engagement")
        .limit(100)
        .get();
      let processedCount = 0;

      for (const doc of engagementSnapshot.docs) {
        const data = doc.data() as UserEngagement;

        // Simple engagement score calculation
        const score =
          data.totalViews * 1 + data.totalLikes * 3 + data.totalComments * 5;

        await doc.ref.update({
          engagementScore: score,
          lastCalculated: FieldValue.serverTimestamp(),
        });

        processedCount++;
      }

      logger.info(`Calculated engagement scores for ${processedCount} users`);
    } catch (error) {
      logger.error("Error calculating engagement scores:", error);
    }
  }
);

/**
 * Get user engagement metrics
 */
export const getUserEngagement = createHttpsFunction<EngagementData>(
  async (data: EngagementData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const { userId = context.auth.uid } = data;

    try {
      const db = getFirestore();
      const engagementDoc = await db
        .collection("user_engagement")
        .doc(userId)
        .get();

      if (!engagementDoc.exists) {
        return {
          userId,
          totalViews: 0,
          totalLikes: 0,
          totalComments: 0,
          engagementScore: 0,
        };
      }

      return engagementDoc.data();
    } catch (error) {
      logger.error("Error getting user engagement:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to get engagement data."
      );
    }
  }
);

/**
 * Update engagement when user performs an action
 */
export const updateEngagement = createHttpsFunction<EngagementData>(
  async (data: EngagementData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const uid = context.auth.uid;
    const { action, contentId } = data;

    if (!action || !contentId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "action and contentId are required."
      );
    }

    try {
      const db = getFirestore();

      // Record the engagement action
      await db.collection("engagement_events").add({
        userId: uid,
        contentId,
        action,
        timestamp: FieldValue.serverTimestamp(),
      });

      // Update user engagement metrics
      const updateData: Record<string, FirebaseFirestore.FieldValue | number> =
        {
          lastActive: FieldValue.serverTimestamp(),
        };

      switch (action) {
        case "view":
          updateData.totalViews = FieldValue.increment(1);
          break;
        case "like":
          updateData.totalLikes = FieldValue.increment(1);
          break;
        case "comment":
          updateData.totalComments = FieldValue.increment(1);
          break;
      }

      await db
        .collection("user_engagement")
        .doc(uid)
        .set(updateData, { merge: true });

      logger.info(`Updated engagement for user ${uid}, action: ${action}`);
      return { success: true };
    } catch (error) {
      logger.error("Error updating engagement:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to update engagement."
      );
    }
  }
);
