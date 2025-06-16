import {
  createHttpsFunction,
  FunctionContext,
  getFirestore,
  FieldValue,
  functions,
  logger,
} from "../types/firebase";

interface RequestBuilderRoleData {
  spaceId: string;
  reason?: string;
}

export const requestBuilderRole = createHttpsFunction<RequestBuilderRoleData>(
  async (data: RequestBuilderRoleData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const uid = context.auth.uid;
    const { spaceId, reason = "" } = data;

    if (!spaceId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "spaceId is required."
      );
    }

    try {
      const db = getFirestore();

      // Check if user is a member of the space
      const memberDoc = await db
        .collection("spaces")
        .doc(spaceId)
        .collection("members")
        .doc(uid)
        .get();

      if (!memberDoc.exists) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          "User must be a member of the space."
        );
      }

      const memberData = memberDoc.data();
      if (memberData?.role === "builder" || memberData?.role === "admin") {
        throw new functions.https.HttpsError(
          "already-exists",
          "User already has builder role or higher."
        );
      }

      // Check if there's already a pending request
      const existingRequest = await db
        .collection("builder_role_requests")
        .where("userId", "==", uid)
        .where("spaceId", "==", spaceId)
        .where("status", "==", "pending")
        .get();

      if (!existingRequest.empty) {
        throw new functions.https.HttpsError(
          "already-exists",
          "A request is already pending for this user."
        );
      }

      // Create the builder role request
      await db.collection("builder_role_requests").add({
        userId: uid,
        spaceId,
        reason,
        status: "pending",
        requestedAt: FieldValue.serverTimestamp(),
      });

      // Notify space admins (optional - could be done via trigger)
      logger.info(
        `Builder role request created for user ${uid} in space ${spaceId}`
      );

      return {
        success: true,
        message: "Builder role request submitted successfully.",
      };
    } catch (error) {
      logger.error("Error requesting builder role:", error);
      if (error instanceof functions.https.HttpsError) {
        throw error;
      }
      throw new functions.https.HttpsError(
        "internal",
        "Failed to submit builder role request."
      );
    }
  }
);
