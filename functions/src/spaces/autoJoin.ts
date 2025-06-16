import {
  createHttpsFunction,
  FunctionContext,
  getFirestore,
  FieldValue,
  functions,
  logger,
  onDocumentCreated,
} from "../types/firebase";

interface AutoJoinData {
  spaceId: string;
  userId?: string;
}

/**
 * Auto-join users to spaces based on criteria
 */
export const autoJoinToSpace = onDocumentCreated(
  "users/{userId}",
  async (event) => {
    try {
      const userId = event.params.userId;
      const userData = event.data?.data();

      if (!userData?.email) {
        logger.info("No email found for user, skipping auto-join");
        return;
      }

      const db = getFirestore();

      // Auto-join logic based on email domain or other criteria
      const email = userData.email as string;
      const domain = email.split("@")[1];

      // Find spaces that allow auto-join for this domain
      const spacesSnapshot = await db
        .collection("spaces")
        .where("autoJoinDomains", "array-contains", domain)
        .get();

      for (const spaceDoc of spacesSnapshot.docs) {
        const spaceId = spaceDoc.id;

        // Check if user is already a member
        const memberDoc = await db
          .collection("spaces")
          .doc(spaceId)
          .collection("members")
          .doc(userId)
          .get();

        if (!memberDoc.exists) {
          // Add user as member
          await db
            .collection("spaces")
            .doc(spaceId)
            .collection("members")
            .doc(userId)
            .set({
              userId,
              role: "member",
              joinedAt: FieldValue.serverTimestamp(),
              autoJoined: true,
            });

          // Update space member count
          await spaceDoc.ref.update({
            memberCount: FieldValue.increment(1),
          });

          logger.info(`Auto-joined user ${userId} to space ${spaceId}`);
        }
      }
    } catch (error) {
      logger.error("Error in auto-join process:", error);
    }
  }
);

/**
 * Manual join space function
 */
export const joinSpace = createHttpsFunction<AutoJoinData>(
  async (data: AutoJoinData, context: FunctionContext) => {
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

      // Check if space exists
      const spaceDoc = await db.collection("spaces").doc(spaceId).get();
      if (!spaceDoc.exists) {
        throw new functions.https.HttpsError("not-found", "Space not found.");
      }

      // Check if user is already a member
      const memberDoc = await db
        .collection("spaces")
        .doc(spaceId)
        .collection("members")
        .doc(uid)
        .get();

      if (memberDoc.exists) {
        throw new functions.https.HttpsError(
          "already-exists",
          "User is already a member."
        );
      }

      // Add user as member
      await db
        .collection("spaces")
        .doc(spaceId)
        .collection("members")
        .doc(uid)
        .set({
          userId: uid,
          role: "member",
          joinedAt: FieldValue.serverTimestamp(),
          autoJoined: false,
        });

      // Update space member count
      await spaceDoc.ref.update({
        memberCount: FieldValue.increment(1),
      });

      logger.info(`User ${uid} joined space ${spaceId}`);
      return { success: true };
    } catch (error) {
      logger.error("Error joining space:", error);
      if (error instanceof functions.https.HttpsError) {
        throw error;
      }
      throw new functions.https.HttpsError("internal", "Failed to join space.");
    }
  }
);
