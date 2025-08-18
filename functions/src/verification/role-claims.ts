import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";

/**
 * Updates Firebase Auth custom claims when a user's verification level changes
 *
 * This is triggered by a write to the claimUpdates collection
 * It updates the user's custom claims in Firebase Auth to reflect their verification level
 */
export const updateUserRoleClaims = functions.firestore
  .document("claimUpdates/{updateId}")
  .onCreate(async (snapshot, context) => {
    const updateData = snapshot.data();
    const userId = updateData.userId;
    const verificationLevel = updateData.verificationLevel;

    if (!userId || verificationLevel === undefined) {
      console.error("Missing required fields in claim update request");
      return {success: false, error: "Missing required fields"};
    }

    try {
      // Get the user from Auth
      const user = await admin.auth().getUser(userId);

      // Convert verification level to role names
      const roleClaims: { [key: string]: boolean } = {
        // Always include the base role
        user: true,
      };

      // Add role based on verification level
      // 0 = public, 1 = verified, 2 = verified+
      if (verificationLevel >= 1) {
        roleClaims.verified = true;
      }

      if (verificationLevel >= 2) {
        roleClaims.verifiedPlus = true;
      }

      // Update custom claims
      await admin.auth().setCustomUserClaims(userId, {
        ...user.customClaims,
        roles: roleClaims,
        verificationLevel: verificationLevel,
      });

      // Mark the request as processed
      await snapshot.ref.update({
        processed: true,
        processedAt: admin.firestore.FieldValue.serverTimestamp(),
        success: true,
      });

      // Optionally, write to a user_metadata document to force a token refresh
      await admin.firestore().collection("user_metadata").doc(userId).set({
        refreshTime: admin.firestore.FieldValue.serverTimestamp(),
      }, {merge: true});

      return {success: true};
    } catch (error) {
      console.error("Error updating user claims:", error);

      // Mark the request as failed
      await snapshot.ref.update({
        processed: true,
        processedAt: admin.firestore.FieldValue.serverTimestamp(),
        success: false,
        error: error.message,
      });

      return {success: false, error: error.message};
    }
  });

/**
 * Processes verification approval or rejection
 *
 * This function is triggered when a verification request status changes
 * It updates the user's verification level in the database
 */
export const processVerificationStatusChange = functions.firestore
  .document("verificationRequests/{requestId}")
  .onUpdate(async (change, context) => {
    const beforeData = change.before.data();
    const afterData = change.after.data();

    // Skip if status hasn't changed or isn't approved/rejected
    if (beforeData.status === afterData.status ||
        (afterData.status !== "approved" && afterData.status !== "rejected")) {
      return null;
    }

    const userId = afterData.userId;

    try {
      if (afterData.status === "approved") {
        // Get the user record
        const userDoc = await admin.firestore()
          .collection("users")
          .doc(userId)
          .get();

        if (!userDoc.exists) {
          throw new Error("User document not found");
        }

        // Update the user's verification level
        await admin.firestore()
          .collection("user_verifications")
          .doc(userId)
          .set({
            userId: userId,
            level: afterData.requestedLevel,
            status: 3, // 3 = verified status
            verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
            verifiedBy: afterData.approvedBy,
          }, {merge: true});

        // Trigger a claim update
        await admin.firestore().collection("claimUpdates").add({
          userId: userId,
          verificationLevel: afterData.requestedLevel,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedBy: afterData.approvedBy,
          reason: "verification_approved",
        });

        // If this is a Verified+ approval, update space leadership
        if (afterData.requestedLevel === 2) { // 2 = verifiedPlus
          await admin.firestore()
            .collection("spaces")
            .doc(afterData.spaceId)
            .update({
              leaders: admin.firestore.FieldValue.arrayUnion(userId),
            });
        }

        // Send a notification to the user
        await admin.firestore().collection("notifications").add({
          userId: userId,
          type: "verification_approved",
          title: "Verification Approved",
          body: `Your request for ${afterData.requestedLevel === 2 ? "Verified+" : "Verified"} status has been approved!`,
          isRead: false,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      } else if (afterData.status === "rejected") {
        // Update the user's verification status back to verified
        await admin.firestore()
          .collection("user_verifications")
          .doc(userId)
          .update({
            status: 3, // 3 = verified status
            rejectedAt: admin.firestore.FieldValue.serverTimestamp(),
            rejectedBy: afterData.rejectedBy,
            rejectionReason: afterData.rejectionReason,
          });

        // Send a notification to the user
        await admin.firestore().collection("notifications").add({
          userId: userId,
          type: "verification_rejected",
          title: "Verification Request Rejected",
          body: `Your verification request was rejected. Reason: ${afterData.rejectionReason || "No reason provided"}`,
          isRead: false,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }

      return {success: true};
    } catch (error) {
      console.error("Error processing verification status change:", error);
      return {success: false, error: error.message};
    }
  });

/**
 * Callable function for Verified users to request Verified+ status for a specific Space.
 */
export const requestVerifiedPlusClaim = functions.https.onCall(async (data, context) => {
  // Ensure the user is authenticated.
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "The function must be called while authenticated.");
  }

  // Check if user is at least Verified
  if (!context.auth.token.roles?.verified) {
    throw new functions.https.HttpsError("permission-denied", "User must be Verified to request Verified+ status.");
  }

  const userId = context.auth.uid;
  const spaceId = data.spaceId;
  const evidence = data.evidence || ""; // Optional evidence field

  if (!spaceId || typeof spaceId !== "string") {
    throw new functions.https.HttpsError("invalid-argument", "The function must be called with a valid \"spaceId\" argument.");
  }

  logger.info(`Verified+ claim request received for space ${spaceId} by user ${userId}`);

  try {
    const db = admin.firestore();
    const now = admin.firestore.Timestamp.now();

    // Check if the space exists
    const spaceRef = db.collection("spaces").doc(spaceId);
    const spaceDoc = await spaceRef.get();
    if (!spaceDoc.exists) {
      throw new functions.https.HttpsError("not-found", "Specified space does not exist.");
    }

    // Check if there's already a pending or approved request for this user/space?
    const existingRequests = await db.collection("verificationRequests")
      .where("userId", "==", userId)
      .where("spaceId", "==", spaceId)
      .where("requestedLevel", "==", 2)
      .where("status", "in", ["pending", "approved"])
      .limit(1)
      .get();

    if (!existingRequests.empty) {
      throw new functions.https.HttpsError("already-exists", "A pending or approved Verified+ request already exists for this space.");
    }

    // Create the verification request document
    const requestRef = await db.collection("verificationRequests").add({
      userId: userId,
      spaceId: spaceId,
      requestedLevel: 2, // Level 2 = Verified+
      status: "pending", // Initial status
      evidence: evidence,
      createdAt: now,
      updatedAt: now,
    });

    logger.info(`Created verification request ${requestRef.id} for space ${spaceId} by user ${userId}`);
    return {success: true, requestId: requestRef.id, message: "Verified+ request submitted successfully."};
  } catch (error) {
    logger.error(`Error creating Verified+ request for space ${spaceId} by user ${userId}:`, error);
    if (error instanceof functions.https.HttpsError) {
      throw error; // Re-throw HttpsError
    }
    throw new functions.https.HttpsError("internal", "An error occurred while submitting the Verified+ request.");
  }
});

/**
 * Callable function for Admins (HIVE Staff) to approve a pending Verified+ request.
 */
export const approveVerifiedPlusClaim = functions.https.onCall(async (data, context) => {
  // Ensure the caller is an Admin.
  if (!context.auth?.token?.admin) {
    throw new functions.https.HttpsError("permission-denied", "Only HIVE Staff Admins can approve claims.");
  }

  const adminUserId = context.auth.uid; // ID of the approving admin
  const requestId = data.requestId;

  if (!requestId || typeof requestId !== "string") {
    throw new functions.https.HttpsError("invalid-argument", "The function must be called with a valid \"requestId\" argument.");
  }

  logger.info(`Verified+ claim approval attempt for request ${requestId} by admin ${adminUserId}`);

  try {
    const db = admin.firestore();
    const now = admin.firestore.Timestamp.now();

    // Get the verification request document
    const requestRef = db.collection("verificationRequests").doc(requestId);
    const requestDoc = await requestRef.get();

    if (!requestDoc.exists) {
      throw new functions.https.HttpsError("not-found", "Verification request not found.");
    }

    const requestData = requestDoc.data()!;

    // Validate request state
    if (requestData.status !== "pending") {
      throw new functions.https.HttpsError("failed-precondition", "Verification request is not in a pending state.");
    }
    if (requestData.requestedLevel !== 2) {
      throw new functions.https.HttpsError("failed-precondition", "This request is not for Verified+.");
    }

    // Update the request status to approved
    // The processVerificationStatusChange trigger will handle the rest (claims, space update, notification)
    await requestRef.update({
      status: "approved",
      approvedBy: adminUserId,
      updatedAt: now,
    });

    logger.info(`Verification request ${requestId} approved by admin ${adminUserId}`);
    return {success: true, message: "Verified+ request approved successfully."};
  } catch (error) {
    logger.error(`Error approving Verified+ request ${requestId} by admin ${adminUserId}:`, error);
    if (error instanceof functions.https.HttpsError) {
      throw error; // Re-throw HttpsError
    }
    throw new functions.https.HttpsError("internal", "An error occurred while approving the Verified+ request.");
  }
});
