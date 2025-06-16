import {
  createHttpsFunction,
  FunctionContext,
  getFirestore,
  FieldValue,
  functions,
  logger,
} from "../types/firebase";

interface FeatureToolData {
  spaceId: string;
  toolId: string;
  featured?: boolean;
}

export const featureToolInSpace = createHttpsFunction<FeatureToolData>(
  async (data: FeatureToolData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const { spaceId, toolId, featured = true } = data;

    if (!spaceId || !toolId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "spaceId and toolId are required."
      );
    }

    try {
      const db = getFirestore();

      // Update tool featured status in space
      await db
        .collection("spaces")
        .doc(spaceId)
        .collection("tools")
        .doc(toolId)
        .update({
          featured,
          featuredAt: featured
            ? FieldValue.serverTimestamp()
            : FieldValue.delete(),
          lastModified: FieldValue.serverTimestamp(),
        });

      logger.info(
        `Tool ${toolId} featured status updated to ${featured} in space ${spaceId}`
      );
      return { success: true };
    } catch (error) {
      logger.error("Error featuring tool in space:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to update tool featured status."
      );
    }
  }
);
