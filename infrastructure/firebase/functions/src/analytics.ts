import * as functions from "firebase-functions";
import {
  admin,
  FirebaseHttpsError,
  FunctionContext,
  assertAuthenticated,
  logger,
  firestore,
  Timestamp,
  FieldValue,
} from "./types/firebase";

/**
 * Interfaces for analytics
 */
interface PlatformMetrics {
  totalUsers: number;
  activeUsers: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  totalEvents: number;
  upcomingEvents: number;
  totalSpaces: number;
  totalClubs: number;
  totalPosts: number;
  messagesSent: number;
  engagementRate: number;
  createdAt: FirebaseFirestore.Timestamp;
}

/**
 * Scheduled function to calculate and store platform metrics (daily)
 */
export const calculatePlatformMetrics = functions.pubsub
  .schedule("0 1 * * *") // Run at 1:00 AM every day
  .timeZone("America/New_York")
  .onRun(async (): Promise<null> => {
    try {
      logger.info("Starting platform metrics calculation");

      const db = firestore();
      const now = Timestamp.now();

      // Calculate time periods for active user metrics
      const oneDayAgo = new Date(now.toMillis() - 24 * 60 * 60 * 1000);
      const oneWeekAgo = new Date(now.toMillis() - 7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = new Date(now.toMillis() - 30 * 24 * 60 * 60 * 1000);

      // Query total users
      const totalUsersSnapshot = await db
        .collection("user_profiles")
        .count()
        .get();
      const totalUsers = totalUsersSnapshot.data().count;

      // Query active users
      const dailyActiveUsersSnapshot = await db
        .collection("user_profiles")
        .where("lastActive", ">", oneDayAgo)
        .count()
        .get();
      const dailyActiveUsers = dailyActiveUsersSnapshot.data().count;

      const weeklyActiveUsersSnapshot = await db
        .collection("user_profiles")
        .where("lastActive", ">", oneWeekAgo)
        .count()
        .get();
      const weeklyActiveUsers = weeklyActiveUsersSnapshot.data().count;

      const monthlyActiveUsersSnapshot = await db
        .collection("user_profiles")
        .where("lastActive", ">", oneMonthAgo)
        .count()
        .get();
      const monthlyActiveUsers = monthlyActiveUsersSnapshot.data().count;

      // Calculate engagement rate (DAU/MAU ratio)
      const engagementRate =
        monthlyActiveUsers > 0
          ? Math.round((dailyActiveUsers / monthlyActiveUsers) * 100) / 100
          : 0;

      // Query total events
      const totalEventsSnapshot = await db.collection("events").count().get();
      const totalEvents = totalEventsSnapshot.data().count;

      // Query upcoming events
      const upcomingEventsSnapshot = await db
        .collection("events")
        .where("startDate", ">", now)
        .count()
        .get();
      const upcomingEvents = upcomingEventsSnapshot.data().count;

      // Query total spaces
      const totalSpacesSnapshot = await db.collection("spaces").count().get();
      const totalSpaces = totalSpacesSnapshot.data().count;

      // Query total clubs
      const totalClubsSnapshot = await db.collection("clubs").count().get();
      const totalClubs = totalClubsSnapshot.data().count;

      // Query total posts
      const totalPostsSnapshot = await db.collection("posts").count().get();
      const totalPosts = totalPostsSnapshot.data().count;

      // Query total messages
      const totalMessagesSnapshot = await db
        .collection("messages")
        .count()
        .get();
      const messagesSent = totalMessagesSnapshot.data().count;

      // Compile metrics
      const metrics: PlatformMetrics = {
        totalUsers,
        activeUsers: {
          daily: dailyActiveUsers,
          weekly: weeklyActiveUsers,
          monthly: monthlyActiveUsers,
        },
        totalEvents,
        upcomingEvents,
        totalSpaces,
        totalClubs,
        totalPosts,
        messagesSent,
        engagementRate,
        createdAt: now,
      };

      // Store metrics in Firestore
      await db.collection("platform_metrics").add(metrics);

      // Also update the latest metrics document
      await db.collection("platform_metrics").doc("latest").set(metrics);

      logger.info("Platform metrics calculation completed", {
        totalUsers,
        dailyActiveUsers,
        weeklyActiveUsers,
        monthlyActiveUsers,
        engagementRate,
      });

      return null;
    } catch (error) {
      logger.error("Error calculating platform metrics", error);
      return null;
    }
  });

interface TrackContentViewData {
  contentId: string;
  contentType: string;
  metadata?: Record<string, unknown>;
}

/**
 * Function to track content views
 */
export const trackContentView = functions.https.onCall(
  async (data: TrackContentViewData, context: FunctionContext): Promise<{ success: boolean }> => {
    try {
      // Ensure the user is authenticated
      assertAuthenticated(context);

      const userId = context.auth.uid;
      const { contentId, contentType, metadata = {} } = data;

      if (!contentId || !contentType) {
        throw new FirebaseHttpsError(
          "invalid-argument",
          "Missing required parameters: contentId or contentType"
        );
      }

      const timestamp = FieldValue.serverTimestamp();

      // Add to user activities collection
      await firestore()
        .collection("user_activities")
        .add({
          userId,
          action: `view_${contentType}`,
          targetType: contentType,
          targetId: contentId,
          timestamp,
          metadata,
        });

      // Update view count for the content
      await updateContentViewCount(contentType, contentId);

      // Log the activity for analytics
      logger.info(`User viewed ${contentType}`, {
        userId,
        contentId,
        contentType,
      });

      return { success: true };
    } catch (error) {
      logger.error("Error tracking content view", error);
      throw new FirebaseHttpsError("internal", "Failed to track content view");
    }
  }
);

/**
 * Helper function to update content view count
 */
async function updateContentViewCount(
  contentType: string,
  contentId: string
): Promise<void> {
  try {
    const db = firestore();
    let collectionName: string;

    switch (contentType) {
      case "event":
        collectionName = "events";
        break;
      case "space":
        collectionName = "spaces";
        break;
      case "club":
        collectionName = "clubs";
        break;
      case "post":
        collectionName = "posts";
        break;
      case "profile":
        collectionName = "user_profiles";
        break;
      default:
        logger.warn(`Unknown content type: ${contentType}`);
        return;
    }

    // Update view count atomically
    await db
      .collection(collectionName)
      .doc(contentId)
      .update({
        viewCount: FieldValue.increment(1),
        lastViewed: FieldValue.serverTimestamp(),
      });

    // Also update activity metrics
    await db.collection("content_metrics").add({
      contentId,
      contentType,
      action: "view",
      timestamp: FieldValue.serverTimestamp(),
    });
  } catch (error) {
    logger.error(
      `Error updating view count for ${contentType}:${contentId}`,
      error
    );
    // Don't throw the error as this is a non-critical operation
  }
}

/**
 * Scheduled function to calculate trending content (runs every 3 hours)
 */
export const calculateTrendingContent = functions.pubsub
  .schedule("0 */3 * * *") // Run every 3 hours
  .timeZone("America/New_York")
  .onRun(async (): Promise<null> => {
    try {
      logger.info("Starting trending content calculation");

      // Calculate time window (last 24 hours)
      const db = firestore();
      const now = Timestamp.now();
      const oneDayAgo = new Date(now.toMillis() - 24 * 60 * 60 * 1000);

      // Get recent content metrics
      const metricsSnapshot = await db
        .collection("content_metrics")
        .where("timestamp", ">", oneDayAgo)
        .get();

      if (metricsSnapshot.empty) {
        logger.info("No recent content metrics found");
        return null;
      }

      interface ContentScore {
        id: string;
        type: string;
        views: number;
        likes: number;
        comments: number;
        shares: number;
        rsvps: number;
        score: number;
      }

      // Aggregate metrics by content item
      const contentScores: Record<string, ContentScore> = {};

      metricsSnapshot.forEach((doc) => {
        const data = doc.data() as Record<string, unknown>;
        const key = `${data.contentType}_${data.contentId}`;

        if (!contentScores[key]) {
          contentScores[key] = {
            id: data.contentId as string,
            type: data.contentType as string,
            views: 0,
            likes: 0,
            comments: 0,
            shares: 0,
            rsvps: 0,
            score: 0,
          };
        }

        // Increment metrics based on action type
        switch (data.action as string) {
          case "view":
            contentScores[key].views += 1;
            break;
          case "like":
            contentScores[key].likes += 1;
            break;
          case "comment":
            contentScores[key].comments += 1;
            break;
          case "share":
            contentScores[key].shares += 1;
            break;
          case "rsvp":
            contentScores[key].rsvps += 1;
            break;
        }
      });

      // Calculate engagement score for each content item
      // Weight engagements differently
      // (e.g., commenting is higher engagement than viewing)
      for (const key in contentScores) {
        if (Object.prototype.hasOwnProperty.call(contentScores, key)) {
          const item = contentScores[key];
          item.score =
            item.views * 1 +
            item.likes * 2 +
            item.comments * 4 +
            item.shares * 5 +
            item.rsvps * 3;
        }
      }

      // Convert to array and sort by score
      const sortedContent = Object.values(contentScores).sort(
        (a, b) => b.score - a.score
      );

      // Group by content type
      const trendingByType: Record<string, ContentScore[]> = {};
      for (const item of sortedContent) {
        if (!trendingByType[item.type]) {
          trendingByType[item.type] = [];
        }

        // Keep only top 20 of each type
        if (trendingByType[item.type].length < 20) {
          trendingByType[item.type].push(item);
        }
      }

      // Store trending content in Firestore
      const batch = db.batch();

      for (const type in trendingByType) {
        // Create a trending document for each content type
        const docRef = db.collection("trending").doc(type);
        batch.set(docRef, {
          items: trendingByType[type],
          updatedAt: now,
        });

        logger.info(`Found ${trendingByType[type].length} trending ${type}s`);
      }

      // Create an overall trending document
      const overallTrending = sortedContent.slice(0, 20);
      batch.set(db.collection("trending").doc("overall"), {
        items: overallTrending,
        updatedAt: now,
      });

      await batch.commit();
      logger.info("Trending content calculation completed");

      return null;
    } catch (error) {
      logger.error("Error calculating trending content", error);
      return null;
    }
  });

/**
 * Function to generate retention metrics (runs weekly)
 */
export const calculateRetentionMetrics = functions.pubsub
  .schedule("0 2 * * 0") // Run at 2:00 AM every Sunday
  .timeZone("America/New_York")
  .onRun(async (): Promise<null> => {
    try {
      logger.info("Starting retention metrics calculation");

      const db = firestore();
      const now = new Date();

      // Define time windows for cohort analysis
      const cohortWindows = [
        { days: 7, label: "1_week" },
        { days: 14, label: "2_week" },
        { days: 30, label: "1_month" },
        { days: 60, label: "2_month" },
        { days: 90, label: "3_month" },
      ];

      // Calculate week start for current cohort (start of current week)
      const currentWeekStart = new Date(now);
      const dayOfWeek = currentWeekStart.getDay();
      const diff = currentWeekStart.getDate() - dayOfWeek;
      currentWeekStart.setDate(diff);
      currentWeekStart.setHours(0, 0, 0, 0);

      // Get active users in the current week
      const activeUsersThisWeek = await db
        .collection("user_profiles")
        .where("lastActive", ">", currentWeekStart)
        .get();
      const activeUserIds = new Set(
        activeUsersThisWeek.docs.map((doc) => doc.id)
      );

      interface RetentionData {
        date: admin.firestore.Timestamp;
        totalActiveUsers: number;
        cohorts: Record<
          string,
          {
            cohortSize: number;
            activeUsers: number;
            retentionRate: number;
          }
        >;
      }

      // Analyze retention for each cohort window
      const retentionData: RetentionData = {
        date: Timestamp.fromDate(now),
        totalActiveUsers: activeUserIds.size,
        cohorts: {},
      };

      for (const window of cohortWindows) {
        // Calculate cohort start date
        const cohortStartDate = new Date(now);
        cohortStartDate.setDate(cohortStartDate.getDate() - window.days);
        cohortStartDate.setHours(0, 0, 0, 0);

        // Get users who signed up during the cohort window
        const newUsersDuringWindow = await db
          .collection("user_profiles")
          .where("createdAt", ">=", cohortStartDate)
          .where("createdAt", "<", currentWeekStart)
          .get();

        if (newUsersDuringWindow.empty) {
          retentionData.cohorts[window.label] = {
            cohortSize: 0,
            activeUsers: 0,
            retentionRate: 0,
          };
          continue;
        }

        // Calculate how many of these users are still active
        const cohortUserIds = newUsersDuringWindow.docs.map((doc) => doc.id);
        const activeInCohort = cohortUserIds.filter((id) =>
          activeUserIds.has(id)
        );

        // Calculate retention rate
        const rawRetention = activeInCohort.length / cohortUserIds.length;
        const retentionRate = Math.round(rawRetention * 100) / 100;

        retentionData.cohorts[window.label] = {
          cohortSize: cohortUserIds.length,
          activeUsers: activeInCohort.length,
          retentionRate,
        };

        logger.info(`${window.label} retention: ${retentionRate * 100}%`, {
          cohortSize: cohortUserIds.length,
          activeUsers: activeInCohort.length,
        });
      }

      // Store retention data
      await db
        .collection("analytics")
        .doc("retention")
        .collection("weekly")
        .add(retentionData);

      // Update latest retention document
      await db.collection("analytics").doc("retention").set({
        latest: retentionData,
        updatedAt: FieldValue.serverTimestamp(),
      });

      logger.info("Retention metrics calculation completed");

      return null;
    } catch (error) {
      logger.error("Error calculating retention metrics", error);
      return null;
    }
  });
