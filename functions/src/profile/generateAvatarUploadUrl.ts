import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { logger } from "@hive/core";

// Ensure Firebase is initialized
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const storage = admin.storage();

/**
 * Creates a signed URL that allows a client to upload a file to a specific
 * path in a Firebase Storage bucket.
 */
export const generateAvatarUploadUrl = functions.https.onCall(
  async (data, context) => {
    // 1. Authentication Check
    if (!context.auth) {
      logger.error("Authentication required for generateAvatarUploadUrl call", {
        uid: context.auth?.uid,
      });
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be logged in to upload an avatar."
      );
    }

    const uid = context.auth.uid;
    const fileType = data.fileType || "image/jpeg"; // Default to JPEG
    const fileSize = data.fileSize || 0;

    // 2. Validation
    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validImageTypes.includes(fileType)) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Invalid file type. Only JPEG, PNG, and WebP are allowed."
      );
    }

    const maxSizeBytes = 5 * 1024 * 1024; // 5MB
    if (fileSize > maxSizeBytes) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        `File size exceeds the limit of ${maxSizeBytes / 1024 / 1024}MB.`
      );
    }

    // 3. Generate File Path
    const fileExtension = fileType.split("/")[1];
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `avatars/${uid}/${fileName}`;
    const bucket = storage.bucket();

    // 4. Generate Signed URL
    const options = {
      version: "v4" as const,
      action: "write" as const,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: fileType,
    };

    try {
      const [url] = await bucket.file(filePath).getSignedUrl(options);
      logger.info("Generated signed URL for avatar upload", { uid, filePath });
      return { success: true, url, filePath };
    } catch (error) {
      logger.error("Failed to generate signed URL", { uid, error });
      throw new functions.https.HttpsError(
        "internal",
        "Could not create avatar upload URL. Please try again."
      );
    }
  }
);
