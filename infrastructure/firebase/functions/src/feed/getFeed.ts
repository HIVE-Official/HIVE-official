import * as functions from "firebase-functions";
import {FeedCard} from "@hive/validation";
import {Timestamp} from "firebase-admin/firestore";

export const getFeed = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
  }

  // This is a placeholder implementation.
  // In the real version, this function would:
  // 1. Get the user's follows and mutes.
  // 2. Query various content sources (posts, events, etc.).
  // 3. Filter, transform, and rank the content.
  // 4. Return a paginated list of FeedCard objects.

  const mockFeed: FeedCard[] = [
    {
      id: "1",
      type: "app_news",
      sourceId: "welcome-post",
      sourceType: "system",
      timestamp: Timestamp.now(),
      pinned: true,
      content: {
        title: "Welcome to HIVE vBETA!",
        body: "We're so excited to have you here. This is the very beginning of a new way to connect on campus. Explore, build, and share your feedback!",
        imageUrl: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&q=80",
      },
      interactionData: {likes: 10, comments: 2},
    },
    {
      id: "2",
      type: "upcoming_event",
      sourceId: "event-123",
      sourceType: "event",
      timestamp: Timestamp.now(),
      content: {
        title: "Club Fair",
        spaceName: "Student Union",
        startTime: Timestamp.fromMillis(Date.now() + 86400000), // tomorrow
        location: "Main Atrium",
      },
      interactionData: {likes: 5, comments: 0},
    },
  ];

  return {feed: mockFeed};
});
