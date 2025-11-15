import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as logger from "firebase-functions/logger";

// Content moderation thresholds
const TOXICITY_THRESHOLD = 0.8;
const SPAM_THRESHOLD = 0.7;
const AUTO_REMOVE_THRESHOLD = 0.95;

// Interface for reported content
interface ContentReport {
  reportId: string;
  contentId: string;
  contentType: string;
  reporterId: string;
  reason: string;
  details?: string;
  createdAt: FirebaseFirestore.Timestamp;
  status: "pending" | "reviewed" | "actioned" | "dismissed";
  reviewedBy?: string;
  reviewedAt?: FirebaseFirestore.Timestamp;
  moderationScore?: number;
}

/**
 * Handles content reports submitted by users
 */
export const processContentReport = functions.firestore
  .onDocumentCreated("content_reports/{reportId}",
    async (snapshot) => {
      try {
        const reportData = snapshot.data() as ContentReport;

        // Skip processing if mandatory fields are missing
        if (!reportData.contentId || !reportData.contentType || !reportData.reporterId) {
          logger.warn("Invalid report data", {reportId: snapshot.id});
          return null;
        }

        logger.info("Processing content report", {
          reportId: snapshot.id,
          contentType: reportData.contentType,
          contentId: reportData.contentId,
        });

        const db = admin.firestore();

        // Check if content already exists in moderation queue
        const existingModeration = await db.collection("moderation_queue")
          .where("contentId", "==", reportData.contentId)
          .where("contentType", "==", reportData.contentType)
          .limit(1)
          .get();

        if (!existingModeration.empty) {
          // Update existing moderation item
          const moderationDoc = existingModeration.docs[0];
          const moderationData = moderationDoc.data();

          // Increment report count
          await moderationDoc.ref.update({
            reportCount: admin.firestore.FieldValue.increment(1),
            latestReportId: snapshot.id,
            latestReportTimestamp: reportData.createdAt,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            priority: Math.min((moderationData.priority || 0) + 1, 5), // Increase priority up to max of 5
          });

          logger.info("Updated existing moderation queue item", {
            moderationId: moderationDoc.id,
            contentId: reportData.contentId,
          });
        } else {
          // Get the reported content
          const contentRef = getContentRef(db, reportData.contentType, reportData.contentId);

          if (!contentRef) {
            logger.warn("Invalid content type", {
              contentType: reportData.contentType,
              contentId: reportData.contentId,
            });
            return null;
          }

          const contentDoc = await contentRef.get();

          if (!contentDoc.exists) {
            logger.warn("Reported content does not exist", {
              contentType: reportData.contentType,
              contentId: reportData.contentId,
            });

            // Update report status
            await snapshot.ref.update({
              status: "dismissed",
              reviewedAt: admin.firestore.FieldValue.serverTimestamp(),
              notes: "Content no longer exists",
            });

            return null;
          }

          const contentData = contentDoc.data();
          const contentCreatorId = contentData.userId || contentData.creatorId || contentData.authorId;

          // Create new moderation queue item
          await db.collection("moderation_queue").add({
            contentId: reportData.contentId,
            contentType: reportData.contentType,
            contentText: getContentText(reportData.contentType, contentData),
            contentCreatorId,
            initialReportId: snapshot.id,
            latestReportId: snapshot.id,
            initialReportTimestamp: reportData.createdAt,
            latestReportTimestamp: reportData.createdAt,
            reportCount: 1,
            status: "pending",
            priority: 1,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          logger.info("Created new moderation queue item", {
            contentId: reportData.contentId,
            contentType: reportData.contentType,
          });

          // Schedule automatic content analysis
          await analyzeContent(reportData.contentType, reportData.contentId, contentData);
        }

        return null;
      } catch (error) {
        logger.error("Error processing content report", error);
        return null;
      }
    });

/**
 * Get reference to content based on content type
 */
function getContentRef(
  db: FirebaseFirestore.Firestore,
  contentType: string,
  contentId: string
): FirebaseFirestore.DocumentReference | null {
  switch (contentType) {
  case "post":
    return db.collection("posts").doc(contentId);
  case "comment":
    return db.collection("comments").doc(contentId);
  case "event":
    return db.collection("events").doc(contentId);
  case "space":
    return db.collection("spaces").doc(contentId);
  case "profile":
    return db.collection("user_profiles").doc(contentId);
  case "message":
    return db.collection("messages").doc(contentId);
  default:
    return null;
  }
}

/**
 * Extract text content from different content types
 */
function getContentText(contentType: string, contentData: any): string {
  switch (contentType) {
  case "post":
    return contentData.text || contentData.caption || "";
  case "comment":
    return contentData.text || "";
  case "event":
    return `${contentData.title || ""} ${contentData.description || ""}`;
  case "space":
    return `${contentData.name || ""} ${contentData.description || ""}`;
  case "profile":
    return `${contentData.displayName || ""} ${contentData.bio || ""}`;
  case "message":
    return contentData.text || "";
  default:
    return "";
  }
}

/**
 * Basic content analysis using simple patterns
 * (In production, this would use more sophisticated ML services)
 */
async function analyzeContent(
  contentType: string,
  contentId: string,
  contentData: any
): Promise<void> {
  try {
    const contentText = getContentText(contentType, contentData);

    if (!contentText) {
      logger.info("No text content to analyze", {
        contentType,
        contentId,
      });
      return;
    }

    // Simple pattern-based analysis (placeholder for actual ML service)
    // In production, use Cloud Natural Language API or similar services

    // Sample offensive patterns (extremely simplified)
    const offensivePatterns = [
      /\b(hate|kill|attack)\b/i,
      /\b(racist|sexist)\b/i,
    ];

    // Sample spam patterns (extremely simplified)
    const spamPatterns = [
      /\b(viagra|cialis|casino)\b/i,
      /\b(earn money|make cash|free offer)\b/i,
      /https?:\/\/.{1,20}\.[a-z]{2,3}\/[^\s]{3,}/gi, // Simple URL pattern
    ];

    // Check for matches
    let toxicityScore = 0;
    let spamScore = 0;

    // Check offensive patterns
    for (const pattern of offensivePatterns) {
      if (pattern.test(contentText)) {
        toxicityScore += 0.3; // Increment score for each match
      }
    }

    // Check spam patterns
    for (const pattern of spamPatterns) {
      if (pattern.test(contentText)) {
        spamScore += 0.3; // Increment score for each match
      }
    }

    // Check for all caps (potential shouting/aggressive)
    if (contentText.length > 20 && contentText === contentText.toUpperCase()) {
      toxicityScore += 0.2;
    }

    // Check for excessive punctuation/special characters
    const excessivePunctuation = /[!?]{3,}|[A-Z\s!?]{10,}/;
    if (excessivePunctuation.test(contentText)) {
      toxicityScore += 0.1;
    }

    // Cap scores at 1.0
    toxicityScore = Math.min(toxicityScore, 1.0);
    spamScore = Math.min(spamScore, 1.0);

    // Overall moderation score (higher is worse)
    const moderationScore = Math.max(toxicityScore, spamScore);

    // Update the moderation queue with scores
    const db = admin.firestore();
    const moderationQuery = await db.collection("moderation_queue")
      .where("contentId", "==", contentId)
      .where("contentType", "==", contentType)
      .limit(1)
      .get();

    if (!moderationQuery.empty) {
      const moderationDoc = moderationQuery.docs[0];

      await moderationDoc.ref.update({
        toxicityScore,
        spamScore,
        moderationScore,
        autoAnalyzedAt: admin.firestore.FieldValue.serverTimestamp(),
        // If score is very high, auto-flag as high priority
        priority: moderationScore > 0.8 ? 5 : moderationDoc.data().priority || 1,
      });

      logger.info("Updated moderation scores", {
        contentId,
        moderationScore,
        toxicityScore,
        spamScore,
      });

      // If score is above auto-removal threshold, hide content automatically
      if (moderationScore >= AUTO_REMOVE_THRESHOLD) {
        await autoHideContent(contentType, contentId, moderationDoc.id);
      }
    }
  } catch (error) {
    logger.error("Error analyzing content", error);
  }
}

/**
 * Auto-hide content that exceeds moderation thresholds
 */
async function autoHideContent(
  contentType: string,
  contentId: string,
  moderationId: string
): Promise<void> {
  try {
    logger.info("Auto-hiding content due to high moderation score", {
      contentType,
      contentId,
    });

    const db = admin.firestore();
    const contentRef = getContentRef(db, contentType, contentId);

    if (!contentRef) {
      return;
    }

    // Update content to hidden state
    await contentRef.update({
      isHidden: true,
      hiddenReason: "Automatically hidden by moderation system",
      hiddenAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Update moderation queue item
    await db.collection("moderation_queue").doc(moderationId).update({
      status: "actioned",
      actionTaken: "auto_hidden",
      actionedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Notify content creator (in production)
    // await notifyContentCreator(contentType, contentId, 'Your content has been automatically hidden for review.');

    logger.info("Content auto-hidden successfully", {
      contentType,
      contentId,
    });
  } catch (error) {
    logger.error("Error auto-hiding content", error);
  }
}

/**
 * Cloud function for moderators to review and action reported content
 */
export const moderateContent = functions.https.onCall(
  async (data, context) => {
    // Ensure the user is authenticated and has moderation permissions
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be logged in to moderate content"
      );
    }

    // Check if user has moderation privileges
    const userId = context.auth.uid;
    const db = admin.firestore();

    const userDoc = await db.collection("user_profiles").doc(userId).get();
    const userData = userDoc.data();

    if (!userData || !userData.roles || !userData.roles.includes("moderator")) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "You do not have permission to moderate content"
      );
    }

    const {moderationId, action, notes} = data;

    if (!moderationId || !action) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Missing required parameters: moderationId or action"
      );
    }

    try {
      // Get the moderation queue item
      const moderationDoc = await db.collection("moderation_queue").doc(moderationId).get();

      if (!moderationDoc.exists) {
        throw new functions.https.HttpsError(
          "not-found",
          "Moderation item not found"
        );
      }

      const moderationData = moderationDoc.data();
      const {contentType, contentId} = moderationData;

      // Update reports associated with this content
      const reportsQuery = await db.collection("content_reports")
        .where("contentId", "==", contentId)
        .where("contentType", "==", contentType)
        .where("status", "==", "pending")
        .get();

      const batch = db.batch();

      reportsQuery.forEach((doc) => {
        batch.update(doc.ref, {
          status: "reviewed",
          reviewedBy: userId,
          reviewedAt: admin.firestore.FieldValue.serverTimestamp(),
          notes: notes || "",
        });
      });

      // Update moderation queue item
      batch.update(moderationDoc.ref, {
        status: "reviewed",
        reviewedBy: userId,
        reviewedAt: admin.firestore.FieldValue.serverTimestamp(),
        action,
        notes: notes || "",
      });

      // Take action on content based on moderator decision
      const contentRef = getContentRef(db, contentType, contentId);

      if (contentRef) {
        switch (action) {
        case "hide":
          batch.update(contentRef, {
            isHidden: true,
            hiddenReason: notes || "Hidden by moderator",
            hiddenAt: admin.firestore.FieldValue.serverTimestamp(),
          });
          break;

        case "restore":
          batch.update(contentRef, {
            isHidden: false,
            hiddenReason: null,
            hiddenAt: null,
          });
          break;

        case "delete":
          // Create backup of deleted content
          const contentDoc = await contentRef.get();
          if (contentDoc.exists) {
            const deletedContent = {
              ...contentDoc.data(),
              originalId: contentId,
              contentType,
              deletedBy: userId,
              deletedAt: admin.firestore.FieldValue.serverTimestamp(),
              reason: notes || "Deleted by moderator",
            };

            batch.set(
              db.collection("deleted_content").doc(),
              deletedContent
            );

            // Delete the content
            batch.delete(contentRef);
          }
          break;

        case "warn_author":
          const contentData = (await contentRef.get()).data();
          const authorId = contentData.userId || contentData.creatorId || contentData.authorId;

          if (authorId) {
            // Create user warning
            batch.set(db.collection("user_warnings").doc(), {
              userId: authorId,
              contentId,
              contentType,
              warningText: notes || "Your content violated our community guidelines",
              moderatorId: userId,
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              isRead: false,
            });
          }
          break;
        }
      }

      // Commit all updates
      await batch.commit();

      logger.info("Content moderation completed", {
        moderationId,
        action,
        moderatedBy: userId,
      });

      return {success: true};
    } catch (error) {
      logger.error("Error moderating content", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to moderate content"
      );
    }
  }
);

/**
 * Cloud function to retrieve moderator dashboard metrics
 */
export const getModerationMetrics = functions.https.onCall(
  async (data, context) => {
    // Ensure the user is authenticated and has moderation permissions
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be logged in to access moderation metrics"
      );
    }

    // Check if user has moderation privileges
    const userId = context.auth.uid;
    const db = admin.firestore();

    const userDoc = await db.collection("user_profiles").doc(userId).get();
    const userData = userDoc.data();

    if (!userData || !userData.roles || !userData.roles.includes("moderator")) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "You do not have permission to access moderation metrics"
      );
    }

    try {
      // Get pending moderation items count
      const pendingItems = await db.collection("moderation_queue")
        .where("status", "==", "pending")
        .count()
        .get();

      // Get high priority items count
      const highPriorityItems = await db.collection("moderation_queue")
        .where("status", "==", "pending")
        .where("priority", ">=", 4)
        .count()
        .get();

      // Get content type breakdown
      const contentTypeBreakdown: Record<string, number> = {};
      const contentTypesQuery = await db.collection("moderation_queue")
        .where("status", "==", "pending")
        .get();

      contentTypesQuery.forEach((doc) => {
        const {contentType} = doc.data();
        contentTypeBreakdown[contentType] = (contentTypeBreakdown[contentType] || 0) + 1;
      });

      // Get recent activity
      const recentActions = await db.collection("moderation_queue")
        .where("status", "in", ["reviewed", "actioned"])
        .orderBy("reviewedAt", "desc")
        .limit(10)
        .get();

      const recentActivityItems = recentActions.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          contentType: data.contentType,
          contentId: data.contentId,
          action: data.action,
          reviewedBy: data.reviewedBy,
          reviewedAt: data.reviewedAt,
          priority: data.priority,
        };
      });

      return {
        pendingCount: pendingItems.data().count,
        highPriorityCount: highPriorityItems.data().count,
        contentTypeBreakdown,
        recentActivity: recentActivityItems,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      };
    } catch (error) {
      logger.error("Error fetching moderation metrics", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to fetch moderation metrics"
      );
    }
  }
);
