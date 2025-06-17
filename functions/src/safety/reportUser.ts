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
import type { SafetyReportData, ReportReason, ReportStatus } from "@hive/core";

interface ReportUserRequest {
  reportedUserId?: string;
  reportedContentId?: string;
  reportedContentType?: "profile" | "post" | "comment" | "message" | "space";
  reason: ReportReason;
  description: string;
  screenshots?: string[];
  additionalContext?: string;
}

export const reportUser = createHttpsFunction(
  async (data: ReportUserRequest, context: FunctionContext) => {
    assertAuthenticated(context);

    const requiredFields = ["reason", "description"];
    validateRequiredFields(data, requiredFields);

    const {
      reportedUserId,
      reportedContentId,
      reportedContentType,
      reason,
      description,
      screenshots,
      additionalContext,
    } = data;

    const reporterId = context.auth.uid;

    // Validate that either user or content is being reported
    if (!reportedUserId && !reportedContentId) {
      throw new FirebaseHttpsError(
        "invalid-argument",
        "Must specify either reportedUserId or reportedContentId"
      );
    }

    // Validate content type if content is being reported
    if (reportedContentId && !reportedContentType) {
      throw new FirebaseHttpsError(
        "invalid-argument",
        "contentType is required when reporting content"
      );
    }

    // Prevent self-reporting
    if (reportedUserId === reporterId) {
      throw new FirebaseHttpsError(
        "invalid-argument",
        "Cannot report yourself"
      );
    }

    const db = getFirestore();
    const reportId = db.collection("safety_reports").doc().id;

    try {
      return await db.runTransaction(async (transaction) => {
        // Check if user exists (if reporting a user)
        if (reportedUserId) {
          const userDoc = await transaction.get(
            db.collection("users").doc(reportedUserId)
          );
          if (!userDoc.exists) {
            throw new FirebaseHttpsError(
              "not-found",
              "Reported user does not exist"
            );
          }
        }

        // Check for duplicate reports from the same user
        const existingReports = await db
          .collection("safety_reports")
          .where("reporterId", "==", reporterId)
          .where("reportedUserId", "==", reportedUserId || null)
          .where("reportedContentId", "==", reportedContentId || null)
          .where("status", "in", ["pending", "under_review"])
          .limit(1)
          .get();

        if (!existingReports.empty) {
          throw new FirebaseHttpsError(
            "already-exists",
            "You have already reported this user/content"
          );
        }

        // Determine priority based on reason
        const highPriorityReasons: ReportReason[] = [
          "violence_threats",
          "self_harm",
          "harassment",
          "bullying",
        ];
        const priority = highPriorityReasons.includes(reason)
          ? "high"
          : "medium";

        // Create safety report
        const reportData: Partial<SafetyReportData> = {
          id: reportId,
          reporterId,
          reportedUserId: reportedUserId || undefined,
          reportedContentId: reportedContentId || undefined,
          reportedContentType: reportedContentType || undefined,
          reason,
          description: description.trim(),
          screenshots: screenshots || [],
          additionalContext: additionalContext?.trim(),
          status: "pending" as ReportStatus,
          priority,
          reportedAt: Date.now(),
        };

        transaction.set(
          db.collection("safety_reports").doc(reportId),
          reportData
        );

        // Update user safety statistics
        if (reportedUserId) {
          const userRef = db.collection("users").doc(reportedUserId);
          transaction.update(userRef, {
            reportsReceived: FieldValue.increment(1),
            lastSafetyCheck: FieldValue.serverTimestamp(),
          });

          // If high priority or multiple reports, flag for manual review
          const userDoc = await transaction.get(userRef);
          const userData = userDoc.data();
          const newReportCount = (userData?.reportsReceived || 0) + 1;

          if (priority === "high" || newReportCount >= 3) {
            transaction.update(userRef, {
              requiresManualReview: true,
              status:
                newReportCount >= 5
                  ? "under_review"
                  : userData?.status || "active",
            });
          }
        }

        // Update reporter statistics
        transaction.update(db.collection("users").doc(reporterId), {
          reportsMade: FieldValue.increment(1),
        });

        logger.info("Safety report created", {
          reportId,
          reporterId,
          reportedUserId,
          reason,
          priority,
        });

        return {
          success: true,
          reportId,
          message:
            "Report submitted successfully. Our team will review it shortly.",
        };
      });
    } catch (error) {
      logger.error("Error creating safety report", error);
      throw error instanceof FirebaseHttpsError
        ? error
        : new FirebaseHttpsError("internal", "Failed to submit report");
    }
  }
);
