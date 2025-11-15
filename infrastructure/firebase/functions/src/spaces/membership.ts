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

export const joinSpace = createHttpsFunction(
  async (data: { spaceId: string }, context: FunctionContext) => {
    assertAuthenticated(context);

    validateRequiredFields(data, ["spaceId"]);

    const { spaceId } = data;
    const uid = context.auth.uid;

    const db = getFirestore();
    const spaceRef = db.collection("spaces").doc(spaceId);
    const memberRef = spaceRef.collection("members").doc(uid);

    try {
      return await db.runTransaction(async (transaction) => {
        const memberDoc = await transaction.get(memberRef);
        if (memberDoc.exists) {
          throw new FirebaseHttpsError(
            "already-exists",
            "You are already a member of this space."
          );
        }

        const spaceDoc = await transaction.get(spaceRef);
        if (!spaceDoc.exists) {
          throw new FirebaseHttpsError(
            "not-found",
            "This space does not exist."
          );
        }

        transaction.set(memberRef, {
          role: "member",
          joinedAt: FieldValue.serverTimestamp(),
        });

        transaction.update(spaceRef, {
          'metrics.memberCount': FieldValue.increment(1),
          'metrics.activeMembers': FieldValue.increment(1),
        });

        logger.info("User joined space", { userId: uid, spaceId });
        return { success: true };
      });
    } catch (error) {
      logger.error("Error joining space", error);
      throw error instanceof FirebaseHttpsError
        ? error
        : new FirebaseHttpsError("internal", "Failed to join space");
    }
  }
);

export const leaveSpace = createHttpsFunction(
  async (data: { spaceId: string }, context: FunctionContext) => {
    assertAuthenticated(context);

    validateRequiredFields(data, ["spaceId"]);

    const { spaceId } = data;
    const uid = context.auth.uid;

    const db = getFirestore();
    const spaceRef = db.collection("spaces").doc(spaceId);
    const memberRef = spaceRef.collection("members").doc(uid);

    try {
      return await db.runTransaction(async (transaction) => {
        const memberDoc = await transaction.get(memberRef);
        if (!memberDoc.exists) {
          throw new FirebaseHttpsError(
            "not-found",
            "You are not a member of this space."
          );
        }

        transaction.delete(memberRef);
        transaction.update(spaceRef, {
          'metrics.memberCount': FieldValue.increment(-1),
          'metrics.activeMembers': FieldValue.increment(-1),
        });

        logger.info("User left space", { userId: uid, spaceId });
        return { success: true };
      });
    } catch (error) {
      logger.error("Error leaving space", error);
      throw error instanceof FirebaseHttpsError
        ? error
        : new FirebaseHttpsError("internal", "Failed to leave space");
    }
  }
);
