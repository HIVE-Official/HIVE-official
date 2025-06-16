import {
  createHttpsFunction,
  FunctionContext,
  Timestamp,
  functions,
} from "../types/firebase";

// Temporary FeedCard interface - replace with @hive/validation import once workspace is fixed
interface FeedCard {
  id: string;
  type: "app_news" | "upcoming_event" | "post" | "achievement";
  sourceId: string;
  sourceType: "system" | "event" | "post" | "user";
  timestamp: any; // Firestore Timestamp
  pinned?: boolean;
  content: {
    title?: string;
    body?: string;
    imageUrl?: string;
    spaceName?: string;
    startTime?: any; // Firestore Timestamp
    location?: string;
  };
  interactionData: {
    likes: number;
    comments: number;
  };
}

interface GetFeedData {
  limit?: number;
  cursor?: string;
}

export const getFeed = createHttpsFunction<GetFeedData>(
  async (data: GetFeedData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
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
          imageUrl:
            "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&q=80",
        },
        interactionData: { likes: 10, comments: 2 },
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
        interactionData: { likes: 5, comments: 0 },
      },
    ];

    return { feed: mockFeed };
  }
);
