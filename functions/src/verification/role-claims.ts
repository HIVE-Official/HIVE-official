import {
  createHttpsFunction,
  FunctionContext,
  getFirestore,
  FieldValue,
  functions,
  logger,
  onDocumentCreated,
  auth,
} from "../types/firebase";

interface SetCustomClaimsData {
  userId: string;
  claims: Record<string, string | number | boolean>;
}

/**
 * Automatically set role claims when user role changes
 */
export const updateRoleClaims = onDocumentCreated(
  "spaces/{spaceId}/members/{userId}",
  async (event) => {
    try {
      const spaceId = event.params.spaceId;
      const userId = event.params.userId;
      const memberData = event.data?.data();

      if (!memberData?.role) {
        return;
      }

      await auth().setCustomUserClaims(userId, {
        role: memberData.role,
        spaceId,
        lastUpdated: Date.now(),
      });

      logger.info(`Updated role claims for user ${userId}`);
    } catch (error) {
      logger.error("Error updating role claims:", error);
    }
  }
);

/**
 * Update global role claims when user profile changes
 */
export const updateGlobalRoleClaimsOnProfileChange = onDocumentCreated(
  "users/{userId}",
  async (event) => {
    try {
      const userId = event.params.userId;
      const userData = event.data?.data();

      if (!userData) {
        logger.warn("No user data found");
        return;
      }

      // Determine global role based on user data
      let globalRole = "user";

      if (userData.isAdmin) {
        globalRole = "admin";
      } else if (userData.isBuilder) {
        globalRole = "builder";
      } else if (userData.emailVerified) {
        globalRole = "verified_user";
      }

      // Set global custom claims
      await auth().setCustomUserClaims(userId, {
        globalRole,
        emailVerified: userData.emailVerified || false,
        lastUpdated: Date.now(),
      });

      logger.info(
        `Updated global role claims for user ${userId}: ${globalRole}`
      );
    } catch (error) {
      logger.error("Error updating global role claims:", error);
    }
  }
);

/**
 * Manually set custom claims for a user
 */
export const setCustomClaims = createHttpsFunction<SetCustomClaimsData>(
  async (data: SetCustomClaimsData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const { userId, claims } = data;

    if (!userId || !claims) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "userId and claims are required."
      );
    }

    try {
      await auth().setCustomUserClaims(userId, {
        ...claims,
        lastUpdated: Date.now(),
      });

      const db = getFirestore();
      await db.collection("claim_changes").add({
        userId,
        claims,
        changedBy: context.auth.uid,
        timestamp: FieldValue.serverTimestamp(),
      });

      return { success: true };
    } catch (error) {
      logger.error("Error setting custom claims:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to set custom claims."
      );
    }
  }
);

/**
 * Get user's current custom claims
 */
export const getUserClaims = createHttpsFunction<{ userId?: string }>(
  async (data: { userId?: string }, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const targetUserId = data.userId || context.auth.uid;

    // Users can only get their own claims unless they're admin
    if (targetUserId !== context.auth.uid) {
      const currentUserClaims = context.auth.token;
      if (
        !currentUserClaims?.globalRole ||
        currentUserClaims.globalRole !== "admin"
      ) {
        throw new functions.https.HttpsError(
          "permission-denied",
          "Cannot access other user's claims."
        );
      }
    }

    try {
      const userRecord = await auth().getUser(targetUserId);
      const customClaims = userRecord.customClaims || {};

      return {
        claims: customClaims,
        userId: targetUserId,
      };
    } catch (error) {
      logger.error("Error getting user claims:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to get user claims."
      );
    }
  }
);
