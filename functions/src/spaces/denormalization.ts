import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";

/**
 * Updates the public_member_count on a space document when members are added or removed.
 *
 * Triggered on write to the members subcollection.
 */
export const updateSpaceMemberCount = functions.firestore
  .document("spaces/{spaceId}/members/{memberId}")
  .onWrite(async (change, context) => {
    const spaceId = context.params.spaceId;
    const spaceRef = admin.firestore().collection("spaces").doc(spaceId);

    // Determine if it's a creation or deletion
    const isCreate = change.after.exists && !change.before.exists;
    const isDelete = !change.after.exists && change.before.exists;

    let incrementValue = 0;
    if (isCreate) {
      incrementValue = 1;
      logger.info(`Member added to space ${spaceId}, incrementing count.`);
    } else if (isDelete) {
      incrementValue = -1;
      logger.info(`Member removed from space ${spaceId}, decrementing count.`);
    } else {
      // It's an update, no change to count needed.
      return null;
    }

    try {
      // Update the count on the parent space document.
      // FieldValue.increment handles initialization if the field doesn't exist.
      await spaceRef.update({
        public_member_count: admin.firestore.FieldValue.increment(incrementValue),
      });
      logger.info(`Successfully updated member count for space ${spaceId} by ${incrementValue}.`);
      return {success: true};
    } catch (error) {
      logger.error(`Error updating member count for space ${spaceId}:`, error);
      // Optional: Add retry logic or more robust error handling if needed
      return {success: false, error: error.message};
    }
  });
