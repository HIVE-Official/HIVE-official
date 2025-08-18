import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as logger from "firebase-functions/logger";

/**
 * Interfaces for recommendations
 */
interface UserProfile {
  id: string;
  interests: string[];
  major?: string;
  year?: string;
  residence?: string;
  eventCount: number;
  spaceCount: number;
  friendCount: number;
}

interface UserInteractions {
  viewedEvents: string[];
  attendedEvents: string[];
  savedEvents: string[];
  joinedSpaces: string[];
  followedUsers: string[];
}

interface EventData {
  id: string;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  location: string;
  startDate: FirebaseFirestore.Timestamp;
  organizerName: string;
  clubId?: string;
  spaceId?: string;
  popularity: number;
}

interface SpaceData {
  id: string;
  name: string;
  description: string;
  categories: string[];
  tags: string[];
  memberCount: number;
  eventCount: number;
  isPrivate: boolean;
}

interface RecommendationResult {
  id: string;
  score: number;
  reasons: string[];
  recommendationType: string;
  metadata?: Record<string, any>;
}

/**
 * Scheduled function to generate recommendations for all users
 * Runs daily at 3:00 AM
 */
export const generateRecommendations = functions.pubsub
  .schedule("0 3 * * *")
  .timeZone("America/New_York")
  .onRun(async () => {
    try {
      logger.info("Starting daily recommendation generation");

      // Get all active users (active in the last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const db = admin.firestore();
      const activeUsersSnapshot = await db.collection("user_profiles")
        .where("lastActive", ">", thirtyDaysAgo)
        .limit(500) // Process in batches to avoid timeouts
        .get();

      if (activeUsersSnapshot.empty) {
        logger.info("No active users found for recommendations");
        return null;
      }

      logger.info(`Generating recommendations for ${activeUsersSnapshot.size} users`);

      // Process users in parallel with a concurrency limit
      const promises = [];
      const concurrencyLimit = 10;
      let processedCount = 0;

      for (const userDoc of activeUsersSnapshot.docs) {
        const userId = userDoc.id;
        const userProfile = userDoc.data() as UserProfile;

        // Queue the recommendation generation task
        promises.push(generateUserRecommendations(userId, userProfile));
        processedCount++;

        // Wait for a batch to complete if we've reached the concurrency limit
        if (promises.length >= concurrencyLimit) {
          await Promise.all(promises);
          promises.length = 0; // Clear the array
          logger.info(`Processed ${processedCount} users so far`);
        }
      }

      // Process any remaining promises
      if (promises.length > 0) {
        await Promise.all(promises);
      }

      logger.info(`Recommendation generation completed for ${processedCount} users`);

      // Update metadata
      await db.collection("metadata").doc("recommendations").set({
        last_run: admin.firestore.FieldValue.serverTimestamp(),
        users_processed: processedCount,
        status: "success",
      }, {merge: true});

      return null;
    } catch (error) {
      logger.error("Error generating recommendations", error);

      // Update metadata with error
      await admin.firestore().collection("metadata").doc("recommendations").set({
        last_run: admin.firestore.FieldValue.serverTimestamp(),
        status: "error",
        error_message: error.message || "Unknown error",
      }, {merge: true});

      return null;
    }
  });

/**
 * Function to generate recommendations for a specific user
 */
async function generateUserRecommendations(
  userId: string,
  userProfile: UserProfile
): Promise<void> {
  try {
    const db = admin.firestore();
    logger.info(`Generating recommendations for user ${userId}`);

    // Get user's interactions
    const interactions = await getUserInteractions(userId);

    // Generate different types of recommendations
    const eventRecommendations = await generateEventRecommendations(
      userId, userProfile, interactions
    );

    const spaceRecommendations = await generateSpaceRecommendations(
      userId, userProfile, interactions
    );

    const peopleRecommendations = await generatePeopleRecommendations(
      userId, userProfile, interactions
    );

    // Combine all recommendations
    const allRecommendations = [
      ...eventRecommendations.map((r) => ({...r, recommendationType: "event"})),
      ...spaceRecommendations.map((r) => ({...r, recommendationType: "space"})),
      ...peopleRecommendations.map((r) => ({...r, recommendationType: "person"})),
    ];

    // Sort by score (descending) and limit to top 50
    const topRecommendations = allRecommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);

    // Store recommendations in Firestore
    const batch = db.batch();

    // Delete existing recommendations
    const existingRecsQuery = await db.collection("user_recommendations")
      .where("userId", "==", userId)
      .get();

    existingRecsQuery.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Add new recommendations
    topRecommendations.forEach((rec, index) => {
      const recDoc = db.collection("user_recommendations").doc();
      batch.set(recDoc, {
        userId,
        itemId: rec.id,
        itemType: rec.recommendationType,
        score: rec.score,
        reasons: rec.reasons,
        rank: index + 1,
        metadata: rec.metadata || {},
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        isViewed: false,
        isClicked: false,
      });
    });

    await batch.commit();
    logger.info(`Stored ${topRecommendations.length} recommendations for user ${userId}`);
  } catch (error) {
    logger.error(`Error generating recommendations for user ${userId}`, error);
  }
}

/**
 * Get a user's interaction data
 */
async function getUserInteractions(userId: string): Promise<UserInteractions> {
  const db = admin.firestore();

  // Get saved events
  const savedEventsQuery = await db.collection("saved_events")
    .where("userId", "==", userId)
    .get();
  const savedEvents = savedEventsQuery.docs.map((doc) => doc.data().eventId);

  // Get attended events
  const attendedEventsQuery = await db.collection("event_rsvps")
    .where("userId", "==", userId)
    .where("status", "==", "going")
    .get();
  const attendedEvents = attendedEventsQuery.docs.map((doc) => doc.data().eventId);

  // Get viewed events from activity log (last 100)
  const viewedEventsQuery = await db.collection("user_activities")
    .where("userId", "==", userId)
    .where("action", "==", "view_event")
    .orderBy("timestamp", "desc")
    .limit(100)
    .get();
  const viewedEvents = viewedEventsQuery.docs
    .map((doc) => doc.data().targetId)
    .filter((id) => id); // Filter out undefined/null

  // Get joined spaces
  const joinedSpacesQuery = await db.collection("space_members")
    .where("userId", "==", userId)
    .get();
  const joinedSpaces = joinedSpacesQuery.docs.map((doc) => doc.data().spaceId);

  // Get followed users
  const followedUsersQuery = await db.collection("user_follows")
    .where("followerId", "==", userId)
    .get();
  const followedUsers = followedUsersQuery.docs.map((doc) => doc.data().followedId);

  return {
    viewedEvents,
    attendedEvents,
    savedEvents,
    joinedSpaces,
    followedUsers,
  };
}

/**
 * Generate event recommendations for a user
 */
async function generateEventRecommendations(
  userId: string,
  userProfile: UserProfile,
  interactions: UserInteractions
): Promise<RecommendationResult[]> {
  const db = admin.firestore();
  const recommendations: RecommendationResult[] = [];

  // Get upcoming events
  const now = admin.firestore.Timestamp.now();
  const eventsQuery = await db.collection("events")
    .where("startDate", ">", now)
    .limit(200)
    .get();

  if (eventsQuery.empty) {
    return [];
  }

  const events = eventsQuery.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as EventData));

  // Filter out events user already interacted with
  const interactedEventIds = new Set([
    ...interactions.viewedEvents,
    ...interactions.attendedEvents,
    ...interactions.savedEvents,
  ]);

  const candidateEvents = events.filter((event) => !interactedEventIds.has(event.id));

  // Score each event
  for (const event of candidateEvents) {
    let score = 0;
    const reasons: string[] = [];

    // Interest match (highest weight)
    const interestMatch = userProfile.interests?.filter(
      (interest) => event.tags?.includes(interest) || event.categories?.includes(interest)
    );

    if (interestMatch && interestMatch.length > 0) {
      const interestScore = interestMatch.length * 20;
      score += interestScore;
      reasons.push(`Matches ${interestMatch.length} of your interests`);
    }

    // Location relevance
    if (event.location && event.location.includes(userProfile.residence || "")) {
      score += 15;
      reasons.push("Event is in your residence area");
    }

    // Popularity factor
    if (event.popularity && event.popularity > 10) {
      score += Math.min(15, event.popularity / 2);
      reasons.push("Popular among other users");
    }

    // Related to spaces/clubs user is part of
    if (event.spaceId && interactions.joinedSpaces.includes(event.spaceId)) {
      score += 25;
      reasons.push("From a space you're a member of");
    }

    // Time factor - events happening sooner get higher scores
    const daysUntilEvent = (event.startDate.seconds - now.seconds) / (60 * 60 * 24);
    if (daysUntilEvent < 3) {
      score += 10;
      reasons.push("Happening soon");
    }

    // Add to recommendations if score is above threshold
    if (score >= 15) {
      recommendations.push({
        id: event.id,
        score,
        reasons,
        recommendationType: "event",
        metadata: {
          title: event.title,
          startDate: event.startDate,
          location: event.location,
          organizerName: event.organizerName,
        },
      });
    }
  }

  return recommendations;
}

/**
 * Generate space recommendations for a user
 */
async function generateSpaceRecommendations(
  userId: string,
  userProfile: UserProfile,
  interactions: UserInteractions
): Promise<RecommendationResult[]> {
  const db = admin.firestore();
  const recommendations: RecommendationResult[] = [];

  // Get active spaces
  const spacesQuery = await db.collection("spaces")
    .where("isActive", "==", true)
    .where("isPrivate", "==", false) // Only recommend public spaces
    .limit(100)
    .get();

  if (spacesQuery.empty) {
    return [];
  }

  const spaces = spacesQuery.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as SpaceData));

  // Filter out spaces user already joined
  const joinedSpaceIds = new Set(interactions.joinedSpaces);
  const candidateSpaces = spaces.filter((space) => !joinedSpaceIds.has(space.id));

  // Score each space
  for (const space of candidateSpaces) {
    let score = 0;
    const reasons: string[] = [];

    // Interest match (highest weight)
    const interestMatch = userProfile.interests?.filter(
      (interest) => space.tags?.includes(interest) || space.categories?.includes(interest)
    );

    if (interestMatch && interestMatch.length > 0) {
      const interestScore = interestMatch.length * 15;
      score += interestScore;
      reasons.push(`Aligns with ${interestMatch.length} of your interests`);
    }

    // Member count factor (popular spaces)
    if (space.memberCount && space.memberCount > 20) {
      score += Math.min(15, space.memberCount / 10);
      reasons.push("Active community with many members");
    }

    // Event activity factor
    if (space.eventCount && space.eventCount > 5) {
      score += Math.min(15, space.eventCount * 2);
      reasons.push("Hosts regular events");
    }

    // Network effect - check if user's friends are members
    const friendsInSpaceQuery = await db.collection("space_members")
      .where("spaceId", "==", space.id)
      .where("userId", "in", interactions.followedUsers.slice(0, 10)) // Firestore limit: 10 items in 'in' query
      .get();

    if (!friendsInSpaceQuery.empty) {
      const friendCount = friendsInSpaceQuery.size;
      score += friendCount * 10;
      reasons.push(`${friendCount} people you follow are members`);
    }

    // Add to recommendations if score is above threshold
    if (score >= 15) {
      recommendations.push({
        id: space.id,
        score,
        reasons,
        recommendationType: "space",
        metadata: {
          name: space.name,
          description: space.description,
          memberCount: space.memberCount,
          eventCount: space.eventCount,
        },
      });
    }
  }

  return recommendations;
}

/**
 * Generate people recommendations for a user
 */
async function generatePeopleRecommendations(
  userId: string,
  userProfile: UserProfile,
  interactions: UserInteractions
): Promise<RecommendationResult[]> {
  const db = admin.firestore();
  const recommendations: RecommendationResult[] = [];

  // Get users with similar interests
  const usersQuery = await db.collection("user_profiles")
    .limit(100)
    .get();

  if (usersQuery.empty) {
    return [];
  }

  // Filter out user themselves and users they already follow
  const followedUserIds = new Set(interactions.followedUsers);
  followedUserIds.add(userId); // Add self to exclusion list

  const candidateUsers = usersQuery.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as UserProfile))
    .filter((user) => !followedUserIds.has(user.id));

  // Score each potential connection
  for (const user of candidateUsers) {
    let score = 0;
    const reasons: string[] = [];

    // Interest match
    const interestMatch = userProfile.interests?.filter(
      (interest) => user.interests?.includes(interest)
    );

    if (interestMatch && interestMatch.length > 0) {
      const interestScore = interestMatch.length * 10;
      score += interestScore;
      reasons.push(`Shares ${interestMatch.length} interests with you`);
    }

    // Academic similarity (major, year)
    if (userProfile.major && user.major === userProfile.major) {
      score += 15;
      reasons.push("Studies the same major");
    }

    if (userProfile.year && user.year === userProfile.year) {
      score += 10;
      reasons.push("In the same year");
    }

    // Location similarity
    if (userProfile.residence && user.residence === userProfile.residence) {
      score += 15;
      reasons.push("Lives in the same residence");
    }

    // Common spaces - check if user shares spaces with candidate
    if (interactions.joinedSpaces.length > 0) {
      const userSpacesQuery = await db.collection("space_members")
        .where("userId", "==", user.id)
        .where("spaceId", "in", interactions.joinedSpaces.slice(0, 10)) // Firestore limit
        .get();

      if (!userSpacesQuery.empty) {
        const sharedSpaces = userSpacesQuery.size;
        score += sharedSpaces * 10;
        reasons.push(`Member of ${sharedSpaces} same spaces as you`);
      }
    }

    // Common event attendance
    if (interactions.attendedEvents.length > 0) {
      const userEventsQuery = await db.collection("event_rsvps")
        .where("userId", "==", user.id)
        .where("status", "==", "going")
        .where("eventId", "in", interactions.attendedEvents.slice(0, 10)) // Firestore limit
        .get();

      if (!userEventsQuery.empty) {
        const sharedEvents = userEventsQuery.size;
        score += sharedEvents * 8;
        reasons.push(`Attended ${sharedEvents} same events as you`);
      }
    }

    // Second-degree connections (friends of friends)
    const mutualConnectionsQuery = await db.collection("user_follows")
      .where("followerId", "in", interactions.followedUsers.slice(0, 10)) // Firestore limit
      .where("followedId", "==", user.id)
      .get();

    if (!mutualConnectionsQuery.empty) {
      const mutualCount = mutualConnectionsQuery.size;
      score += mutualCount * 12;
      reasons.push(`${mutualCount} mutual connections`);
    }

    // Add to recommendations if score is above threshold
    if (score >= 20) {
      recommendations.push({
        id: user.id,
        score,
        reasons,
        recommendationType: "person",
        metadata: {
          displayName: user.displayName || "User",
          major: user.major,
          year: user.year,
          profileImageUrl: user.profileImageUrl,
        },
      });
    }
  }

  return recommendations;
}

/**
 * Cloud function to track recommendation clicks
 */
export const trackRecommendationClick = functions.https.onCall(
  async (data, context) => {
    // Ensure the user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be logged in to track recommendations"
      );
    }

    const userId = context.auth.uid;
    const {recommendationId, itemId, itemType} = data;

    if (!recommendationId || !itemId || !itemType) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Missing required parameters: recommendationId, itemId, or itemType"
      );
    }

    try {
      const db = admin.firestore();

      // Update the recommendation document
      await db.collection("user_recommendations")
        .doc(recommendationId)
        .update({
          isClicked: true,
          clickedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      // Log the interaction for feedback
      await db.collection("recommendation_interactions").add({
        userId,
        recommendationId,
        itemId,
        itemType,
        action: "click",
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      logger.info("Recommendation click tracked", {
        userId,
        itemId,
        itemType,
      });

      return {success: true};
    } catch (error) {
      logger.error("Error tracking recommendation click", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to track recommendation"
      );
    }
  }
);
