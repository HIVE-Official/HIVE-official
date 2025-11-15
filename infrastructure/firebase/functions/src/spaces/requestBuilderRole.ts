import {
  functions,
  firestore,
  logger,
  assertAuthenticated,
  getDocumentData,
  type FunctionContext,
  type MemberDocument,
} from "../types/firebase";

interface RequestBuilderRoleData {
  spaceId: string;
}

export const requestBuilderRole = functions.https.onCall(
  async (data: RequestBuilderRoleData, context: FunctionContext) => {
    assertAuthenticated(context);
    const userId = context.auth.uid;

    const { spaceId } = data;
    if (!spaceId || typeof spaceId !== "string") {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with a valid 'spaceId' argument."
      );
    }

    const db = firestore();
    const memberRef = db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId);

    try {
      await db.runTransaction(async (transaction) => {
        const memberDoc = await transaction.get(memberRef);

        if (!memberDoc.exists) {
          throw new functions.https.HttpsError(
            "not-found",
            "You must be a member of this space to request a builder role."
          );
        }

        const memberData = getDocumentData<MemberDocument>(memberDoc);
        if (!memberData) {
          throw new functions.https.HttpsError(
            "not-found",
            "Member data not found."
          );
        }

        if (memberData.role !== "member") {
          throw new functions.https.HttpsError(
            "failed-precondition",
            `Your current role (${memberData.role}) does not permit this action.`
          );
        }

        transaction.update(memberRef, { role: "requested_builder" });
      });

      logger.info(
        `User ${userId} successfully requested builder role for space ${spaceId}`
      );
      return {
        success: true,
        message: "Your request has been submitted for review.",
      };
    } catch (error) {
      logger.error(
        `Error processing builder role request for user ${userId} in space ${spaceId}`,
        error as Error
      );
      if (error instanceof functions.https.HttpsError) {
        throw error;
      }
      throw new functions.https.HttpsError(
        "internal",
        "An unexpected error occurred while submitting your request."
      );
    }
  }
);
