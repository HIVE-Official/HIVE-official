import {
  createHttpsFunction,
  getFirestore,
  logger,
  FirebaseHttpsError,
  validateRequiredFields,
  type FunctionContext,
} from "../types/firebase";

export const checkHandleUniqueness = createHttpsFunction(
  async (data: { handle: string }, context: FunctionContext) => {
    try {
      validateRequiredFields(data, ["handle"]);

      const { handle } = data;

      // Validate handle format
      if (
        typeof handle !== "string" ||
        handle.length < 4 ||
        handle.length > 15
      ) {
        throw new FirebaseHttpsError(
          "invalid-argument",
          "Handle must be between 4 and 15 characters long."
        );
      }

      // Check for valid characters (alphanumeric and underscore only)
      if (!/^[a-zA-Z0-9_]+$/.test(handle)) {
        throw new FirebaseHttpsError(
          "invalid-argument",
          "Handle can only contain letters, numbers, and underscores."
        );
      }

      const db = getFirestore();
      const handleRef = db.collection("handles").doc(handle.toLowerCase());
      const doc = await handleRef.get();

      const isUnique = !doc.exists;

      logger.info("Handle uniqueness checked", {
        handle: handle.toLowerCase(),
        isUnique,
        userId: context.auth?.uid,
      });

      return { isUnique };
    } catch (error) {
      logger.error("Error checking handle uniqueness", error);
      throw error instanceof FirebaseHttpsError
        ? error
        : new FirebaseHttpsError(
            "internal",
            "Failed to check handle availability"
          );
    }
  }
);
