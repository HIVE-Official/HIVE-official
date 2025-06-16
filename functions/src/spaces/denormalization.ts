import {
  getFirestore,
  FieldValue,
  logger,
  onDocumentCreated,
} from "../types/firebase";

/**
 * Denormalize space data when a new space is created
 */
export const denormalizeSpaceData = onDocumentCreated(
  "spaces/{spaceId}",
  async (event) => {
    try {
      const spaceId = event.params.spaceId;
      const spaceData = event.data?.data();

      if (!spaceData) {
        logger.warn("No space data found for denormalization");
        return;
      }

      const db = getFirestore();

      // Denormalize space data for faster queries
      await db
        .collection("space_denormalized")
        .doc(spaceId)
        .set({
          id: spaceId,
          name: spaceData.name,
          description: spaceData.description,
          memberCount: spaceData.memberCount || 0,
          isPublic: spaceData.isPublic || false,
          createdAt: spaceData.createdAt || FieldValue.serverTimestamp(),
          lastActivity: FieldValue.serverTimestamp(),
          tags: spaceData.tags || [],
          category: spaceData.category || "general",
        });

      logger.info(`Denormalized data for space: ${spaceId}`);
    } catch (error) {
      logger.error("Error denormalizing space data:", error);
    }
  }
);

/**
 * Update denormalized data when space membership changes
 */
export const updateSpaceMemberCount = onDocumentCreated(
  "spaces/{spaceId}/members/{memberId}",
  async (event) => {
    try {
      const spaceId = event.params.spaceId;
      const db = getFirestore();

      // Update denormalized member count
      await db
        .collection("space_denormalized")
        .doc(spaceId)
        .update({
          memberCount: FieldValue.increment(1),
          lastActivity: FieldValue.serverTimestamp(),
        });

      // Also update the main space document
      await db
        .collection("spaces")
        .doc(spaceId)
        .update({
          memberCount: FieldValue.increment(1),
          lastActivity: FieldValue.serverTimestamp(),
        });

      logger.info(`Updated member count for space: ${spaceId}`);
    } catch (error) {
      logger.error("Error updating space member count:", error);
    }
  }
);
