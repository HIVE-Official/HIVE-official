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
import type { PrivacySettingsData } from "@hive/core";

interface UpdatePrivacySettingsRequest {
  privacySettings: Partial<PrivacySettingsData>;
}

export const updatePrivacySettings = createHttpsFunction(
  async (data: UpdatePrivacySettingsRequest, context: FunctionContext) => {
    assertAuthenticated(context);

    validateRequiredFields(data, ["privacySettings"]);

    const { privacySettings } = data;
    const userId = context.auth.uid;

    // Validate privacy settings structure
    const allowedFields = [
      "profileVisibility",
      "showRealName",
      "showMajor",
      "showGraduationYear",
      "showAvatarToStranger",
      "allowDirectMessages",
      "allowSpaceInvitations",
      "allowEventInvitations",
      "discoverableByEmail",
      "discoverableByHandle",
      "showInMemberLists",
      "showActivityStatus",
      "requireConnectionApproval",
      "autoBlockSuspiciousAccounts",
      "filterExplicitContent",
      "hideFromSearch",
    ];

    // Filter out any unexpected fields
    const sanitizedSettings: Partial<PrivacySettingsData> = {};
    for (const field of allowedFields) {
      if (field in privacySettings) {
        sanitizedSettings[field as keyof PrivacySettingsData] =
          privacySettings[field as keyof PrivacySettingsData];
      }
    }

    if (Object.keys(sanitizedSettings).length === 0) {
      throw new FirebaseHttpsError(
        "invalid-argument",
        "No valid privacy settings provided"
      );
    }

    const db = getFirestore();

    try {
      return await db.runTransaction(async (transaction) => {
        // Get current user data
        const userRef = db.collection("users").doc(userId);
        const userDoc = await transaction.get(userRef);

        if (!userDoc.exists) {
          throw new FirebaseHttpsError("not-found", "User profile not found");
        }

        const userData = userDoc.data();
        const currentPrivacySettings = userData?.privacySettings || {};

        // Merge with existing settings
        const updatedPrivacySettings = {
          ...currentPrivacySettings,
          ...sanitizedSettings,
        };

        // Update user document with new privacy settings
        transaction.update(userRef, {
          privacySettings: updatedPrivacySettings,
          updatedAt: FieldValue.serverTimestamp(),
        });

        // If hiding from search, we might want to update search indexes
        if (sanitizedSettings.hideFromSearch === true) {
          // This could trigger a background function to remove from search indexes
          logger.info("User opted out of search visibility", { userId });
        }

        // If profile visibility changed to private, log for analytics
        if (sanitizedSettings.profileVisibility === "private") {
          logger.info("User set profile to private", { userId });
        }

        logger.info("Privacy settings updated successfully", {
          userId,
          updatedFields: Object.keys(sanitizedSettings),
        });

        return {
          success: true,
          message: "Privacy settings updated successfully",
          updatedSettings: updatedPrivacySettings,
        };
      });
    } catch (error) {
      logger.error("Error updating privacy settings", error);
      throw error instanceof FirebaseHttpsError
        ? error
        : new FirebaseHttpsError(
            "internal",
            "Failed to update privacy settings"
          );
    }
  }
);

export const getPrivacySettings = createHttpsFunction(
  async (data: {}, context: FunctionContext) => {
    assertAuthenticated(context);

    const userId = context.auth.uid;
    const db = getFirestore();

    try {
      const userDoc = await db.collection("users").doc(userId).get();

      if (!userDoc.exists) {
        throw new FirebaseHttpsError("not-found", "User profile not found");
      }

      const userData = userDoc.data();
      const privacySettings = userData?.privacySettings || {};

      // Return default settings for any missing fields
      const defaultSettings: PrivacySettingsData = {
        profileVisibility: "school_only",
        showRealName: true,
        showMajor: true,
        showGraduationYear: false,
        showAvatarToStranger: true,
        allowDirectMessages: "connections_only",
        allowSpaceInvitations: true,
        allowEventInvitations: true,
        discoverableByEmail: false,
        discoverableByHandle: true,
        showInMemberLists: true,
        showActivityStatus: false,
        requireConnectionApproval: true,
        autoBlockSuspiciousAccounts: true,
        filterExplicitContent: true,
        hideFromSearch: false,
      };

      const completeSettings = {
        ...defaultSettings,
        ...privacySettings,
      };

      return {
        success: true,
        privacySettings: completeSettings,
      };
    } catch (error) {
      logger.error("Error getting privacy settings", error);
      throw error instanceof FirebaseHttpsError
        ? error
        : new FirebaseHttpsError("internal", "Failed to get privacy settings");
    }
  }
);
