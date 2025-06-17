import {
  createHttpsFunction,
  getFirestore,
  logger,
  assertAuthenticated,
  FirebaseHttpsError,
  validateRequiredFields,
  FieldValue,
  type FunctionContext,
} from "../types/firebase";
import type { BlockedUserData } from "@hive/core";

interface BlockUserRequest {
  blockedUserId: string;
  reason?: string;
  isTemporary?: boolean;
  durationDays?: number; // For temporary blocks
}

interface UnblockUserRequest {
  blockedUserId: string;
}

export const blockUser = createHttpsFunction(
  async (data: BlockUserRequest, context: FunctionContext) => {
    assertAuthenticated(context);

    validateRequiredFields(data, ["blockedUserId"]);

    const { blockedUserId, reason, isTemporary = false, durationDays } = data;
    const blockerId = context.auth.uid;

    // Prevent self-blocking
    if (blockedUserId === blockerId) {
      throw new FirebaseHttpsError("invalid-argument", "Cannot block yourself");
    }

    // Validate temporary block duration
    if (
      isTemporary &&
      (!durationDays || durationDays <= 0 || durationDays > 365)
    ) {
      throw new FirebaseHttpsError(
        "invalid-argument",
        "Temporary blocks must have a duration between 1 and 365 days"
      );
    }

    const db = getFirestore();
    const blockId = `${blockerId}_${blockedUserId}`;

    try {
      return await db.runTransaction(async (transaction) => {
        // Check if blocked user exists
        const blockedUserDoc = await transaction.get(
          db.collection("users").doc(blockedUserId)
        );
        if (!blockedUserDoc.exists) {
          throw new FirebaseHttpsError(
            "not-found",
            "User to block does not exist"
          );
        }

        // Check if already blocked
        const existingBlockDoc = await transaction.get(
          db.collection("blocked_users").doc(blockId)
        );
        if (existingBlockDoc.exists) {
          throw new FirebaseHttpsError(
            "already-exists",
            "User is already blocked"
          );
        }

        // Calculate expiration time for temporary blocks
        let expiresAt: number | undefined;
        if (isTemporary && durationDays) {
          expiresAt = Date.now() + durationDays * 24 * 60 * 60 * 1000;
        }

        // Create block record
        const blockData: BlockedUserData = {
          id: blockId,
          blockerId,
          blockedId: blockedUserId,
          reason: reason?.trim(),
          blockedAt: Date.now(),
          expiresAt,
          isTemporary,
        };

        transaction.set(db.collection("blocked_users").doc(blockId), blockData);

        // Remove any existing trusted connections
        const connectionId1 = `${blockerId}_${blockedUserId}`;
        const connectionId2 = `${blockedUserId}_${blockerId}`;

        // Try to delete both possible connection documents
        transaction.delete(
          db.collection("trusted_connections").doc(connectionId1)
        );
        transaction.delete(
          db.collection("trusted_connections").doc(connectionId2)
        );

        // Remove blocked user from any shared spaces' member lists (optional - can be handled by client)
        // This could be expanded to automatically leave shared spaces

        logger.info("User blocked successfully", {
          blockerId,
          blockedUserId,
          isTemporary,
          durationDays,
        });

        return {
          success: true,
          message: isTemporary
            ? `User blocked for ${durationDays} days`
            : "User blocked successfully",
          expiresAt,
        };
      });
    } catch (error) {
      logger.error("Error blocking user", error);
      throw error instanceof FirebaseHttpsError
        ? error
        : new FirebaseHttpsError("internal", "Failed to block user");
    }
  }
);

export const unblockUser = createHttpsFunction(
  async (data: UnblockUserRequest, context: FunctionContext) => {
    assertAuthenticated(context);

    validateRequiredFields(data, ["blockedUserId"]);

    const { blockedUserId } = data;
    const blockerId = context.auth.uid;
    const blockId = `${blockerId}_${blockedUserId}`;

    const db = getFirestore();

    try {
      return await db.runTransaction(async (transaction) => {
        // Check if block exists
        const blockDoc = await transaction.get(
          db.collection("blocked_users").doc(blockId)
        );

        if (!blockDoc.exists) {
          throw new FirebaseHttpsError(
            "not-found",
            "Block relationship does not exist"
          );
        }

        // Remove block record
        transaction.delete(db.collection("blocked_users").doc(blockId));

        logger.info("User unblocked successfully", {
          blockerId,
          blockedUserId,
        });

        return {
          success: true,
          message: "User unblocked successfully",
        };
      });
    } catch (error) {
      logger.error("Error unblocking user", error);
      throw error instanceof FirebaseHttpsError
        ? error
        : new FirebaseHttpsError("internal", "Failed to unblock user");
    }
  }
);

export const getBlockedUsers = createHttpsFunction(
  async (data: {}, context: FunctionContext) => {
    assertAuthenticated(context);

    const userId = context.auth.uid;
    const db = getFirestore();

    try {
      // Get all users blocked by this user
      const blockedQuery = await db
        .collection("blocked_users")
        .where("blockerId", "==", userId)
        .get();

      const blockedUsers = blockedQuery.docs.map((doc) => {
        const data = doc.data() as BlockedUserData;

        // Check if temporary block has expired
        const isExpired =
          data.isTemporary && data.expiresAt && data.expiresAt < Date.now();

        return {
          ...data,
          isExpired,
        };
      });

      // Clean up expired blocks
      const expiredBlocks = blockedUsers.filter((block) => block.isExpired);
      if (expiredBlocks.length > 0) {
        const batch = db.batch();
        expiredBlocks.forEach((block) => {
          batch.delete(db.collection("blocked_users").doc(block.id));
        });
        await batch.commit();

        // Return only non-expired blocks
        return {
          success: true,
          blockedUsers: blockedUsers.filter((block) => !block.isExpired),
        };
      }

      return {
        success: true,
        blockedUsers,
      };
    } catch (error) {
      logger.error("Error getting blocked users", error);
      throw new FirebaseHttpsError("internal", "Failed to get blocked users");
    }
  }
);
