import * as functions from "firebase-functions";
import {getFirestore} from "firebase-admin/firestore";
import {getAuth} from "firebase-admin/auth";

// Note: In a real app, use a proper email sending service (e.g., SendGrid, Mailgun)
// and configure the recipient email via environment variables.
const MODERATION_EMAIL = "moderation@hive.com";

export const reportContent = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
  }

  const {contentId, contentType, reason} = data;
  if (!contentId || !contentType || !reason) {
    throw new functions.https.HttpsError("invalid-argument", "Missing required report data: contentId, contentType, and reason must be provided.");
  }

  const uid = context.auth.uid;
  const db = getFirestore();
  const auth = getAuth();

  try {
    const [reporter, contentOwnerId] = await Promise.all([
      auth.getUser(uid),
      // A simple way to find the owner of a piece of content. This might need to be more robust.
      db.collection(contentType).doc(contentId).get().then((doc) => doc.data()?.userId),
    ]);

    const reportId = db.collection("reports").doc().id;

    const report = {
      reportId,
      reporter: {
        uid: uid,
        email: reporter.email,
      },
      content: {
        id: contentId,
        type: contentType,
        ownerId: contentOwnerId || "unknown",
      },
      reason,
      status: "new",
      createdAt: new Date(),
    };

    // 1. Log the report to Firestore for tracking
    await db.collection("reports").doc(reportId).set(report);

    // 2. "Send" the email (logging to functions log for this example)
    functions.logger.info(`
            --- NEW CONTENT REPORT ---
            Report ID: ${reportId}
            Recipient: ${MODERATION_EMAIL}
            --------------------------
            Reporter UID: ${uid}
            Reporter Email: ${reporter.email}
            
            Content Type: ${contentType}
            Content ID: ${contentId}
            Content Owner UID: ${contentOwnerId || "unknown"}

            Reason:
            ${reason}
            --------------------------
        `);

    return {status: "success", reportId};
  } catch (error) {
    functions.logger.error("Error creating report:", error);
    throw new functions.https.HttpsError("internal", "An error occurred while submitting the report.");
  }
});
