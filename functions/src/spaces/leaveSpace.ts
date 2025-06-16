import {
  createHttpsFunction,
  FunctionContext,
  getFirestore,
  FieldValue,
  functions,
  logger,
} from "../types/firebase";

interface LeaveSpaceData {
  spaceId: string;
}

export const leaveSpace = createHttpsFunction<LeaveSpaceData>(
  async (data: LeaveSpaceData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const uid = context.auth.uid;
    const { spaceId } = data;

    if (!spaceId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "spaceId is required."
      );
    }

    try {
      const db = getFirestore();

      // Check if user is a member
      const memberDoc = await db
        .collection("spaces")
        .doc(spaceId)
        .collection("members")
        .doc(uid)
        .get();

      if (!memberDoc.exists) {
        throw new functions.https.HttpsError(
          "not-found",
          "User is not a member of this space."
        );
      }

      // Remove member
      await memberDoc.ref.delete();

      // Update space member count
      await db
        .collection("spaces")
        .doc(spaceId)
        .update({
          memberCount: FieldValue.increment(-1),
        });

      logger.info(`User ${uid} left space ${spaceId}`);
      return { success: true };
    } catch (error) {
      logger.error("Error leaving space:", error);
      if (error instanceof functions.https.HttpsError) {
        throw error;
      }
      throw new functions.https.HttpsError(
        "internal",
        "Failed to leave space."
      );
    }
  }
);
