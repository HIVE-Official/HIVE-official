import { onRequest } from "firebase-functions/v2/https";
import { logger } from "../lib/logger";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { ActiveRitualTileSchema } from "@hive/core";

/**
 * Fetches the content for the top strip of the main feed, which includes
 * active rituals and other high-priority items.
 *
 * The function validates the fetched data against the ActiveRitualTileSchema.
 */
export const getTopStrip = onRequest(async (request, _context) => {
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
    logger.error("Error getting top strip:", error);
    throw error;
  }
});
