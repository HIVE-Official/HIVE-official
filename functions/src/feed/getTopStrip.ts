import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { ActiveRitualTileSchema } from "@hive/core";
import { z } from "zod";

/**
 * Fetches the content for the top strip of the main feed, which includes
 * active rituals and other high-priority items.
 *
 * The function validates the fetched data against the ActiveRitualTileSchema.
 */
export const getTopStrip = functions.https.onCall(async (data, context) => {
  // Optional: Add authentication check if only logged-in users can see this.
  // if (!context.auth) {
  //   throw new functions.https.HttpsError(
  //     "unauthenticated",
  //     "You must be logged in to view the feed."
  //   );
  // }

  try {
    const db = admin.firestore();
    const topStripCollection = db.collection("topStripContent");

    // Fetch documents that have not expired yet.
    const now = new Date();
    const snapshot = await topStripCollection
      .where("expiresAt", ">", now)
      .orderBy("expiresAt", "asc")
      .orderBy("priority", "asc")
      .limit(10)
      .get();

    if (snapshot.empty) {
      return { success: true, data: [] };
    }

    const validationPromises = snapshot.docs.map(async (doc) => {
      const tileData = doc.data();
      const validationResult =
        await ActiveRitualTileSchema.safeParseAsync(tileData);

      if (validationResult.success) {
        return validationResult.data;
      } else {
        functions.logger.error(
          `Validation failed for document ${doc.id}:`,
          validationResult.error.flatten()
        );
        return null; // or some other way to handle invalid data
      }
    });

    const validatedData = (await Promise.all(validationPromises)).filter(
      (item) => item !== null
    );

    return { success: true, data: validatedData };
  } catch (error) {
    functions.logger.error("Error fetching top strip content:", error);
    throw new functions.https.HttpsError(
      "internal",
      "An unexpected error occurred while fetching the feed."
    );
  }
});
