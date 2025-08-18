import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

/**
 * Enum for event lifecycle states - must match the client-side enum
 */
enum EventLifecycleState {
  DRAFT = "draft",
  PUBLISHED = "published",
  LIVE = "live",
  COMPLETED = "completed",
  ARCHIVED = "archived"
}

/**
 * Cloud function that runs on a schedule to update event states
 * based on their temporal properties.
 *
 * This implements the event lifecycle transitions defined in the HIVE business logic:
 * Draft → Published → Live → Completed → Archived
 */
export const updateEventStates = functions.pubsub
  .schedule("every 15 minutes")
  .onRun(async (context) => {
    const firestore = admin.firestore();
    const now = admin.firestore.Timestamp.now();

    // Batch for efficient updates
    const batch = firestore.batch();
    let updateCount = 0;

    try {
      // 1. Find events that need to transition from published to live
      // (published events where current time >= start time)
      const publishedToLiveSnapshot = await firestore.collection("events")
        .where("state", "==", EventLifecycleState.PUBLISHED)
        .where("startDate", "<=", now)
        .get();

      // 2. Find events that need to transition from live to completed
      // (live events where current time >= end time)
      const liveToCompletedSnapshot = await firestore.collection("events")
        .where("state", "==", EventLifecycleState.LIVE)
        .where("endDate", "<=", now)
        .get();

      // 3. Find events that need to transition from completed to archived
      // (completed events where end time + 12 hours <= current time)
      const twelveHoursAgo = new Date(now.toMillis() - (12 * 60 * 60 * 1000));
      const completedToArchivedSnapshot = await firestore.collection("events")
        .where("state", "==", EventLifecycleState.COMPLETED)
        .where("endDate", "<=", admin.firestore.Timestamp.fromDate(twelveHoursAgo))
        .get();

      // Process published -> live transitions
      publishedToLiveSnapshot.forEach((doc) => {
        const eventRef = doc.ref;
        batch.update(eventRef, {
          state: EventLifecycleState.LIVE,
          stateUpdatedAt: now,
          stateHistory: admin.firestore.FieldValue.arrayUnion({
            state: EventLifecycleState.LIVE,
            timestamp: now,
            transitionType: "automatic",
          }),
        });
        updateCount++;
      });

      // Process live -> completed transitions
      liveToCompletedSnapshot.forEach((doc) => {
        const eventRef = doc.ref;
        batch.update(eventRef, {
          state: EventLifecycleState.COMPLETED,
          stateUpdatedAt: now,
          stateHistory: admin.firestore.FieldValue.arrayUnion({
            state: EventLifecycleState.COMPLETED,
            timestamp: now,
            transitionType: "automatic",
          }),
        });
        updateCount++;
      });

      // Process completed -> archived transitions
      completedToArchivedSnapshot.forEach((doc) => {
        const eventRef = doc.ref;
        batch.update(eventRef, {
          state: EventLifecycleState.ARCHIVED,
          stateUpdatedAt: now,
          stateHistory: admin.firestore.FieldValue.arrayUnion({
            state: EventLifecycleState.ARCHIVED,
            timestamp: now,
            transitionType: "automatic",
          }),
        });
        updateCount++;
      });

      // Commit all updates in a batch
      if (updateCount > 0) {
        await batch.commit();
        functions.logger.info(`Successfully updated ${updateCount} events:`, {
          publishedToLive: publishedToLiveSnapshot.size,
          liveToCompleted: liveToCompletedSnapshot.size,
          completedToArchived: completedToArchivedSnapshot.size,
        });
      } else {
        functions.logger.info("No event states needed updating");
      }

      return null;
    } catch (error) {
      functions.logger.error("Error updating event states:", error);
      throw error;
    }
  });

/**
 * Sanitize and validate events on creation to ensure proper state and fields
 */
export const validateEventCreation = functions.firestore
  .document("events/{eventId}")
  .onCreate(async (snapshot, context) => {
    const eventData = snapshot.data();
    const eventRef = snapshot.ref;

    try {
      // Ensure event has a valid state
      if (!eventData.state) {
        // Set initial state based on published flag
        const initialState = eventData.published === true ? EventLifecycleState.PUBLISHED : EventLifecycleState.DRAFT;

        await eventRef.update({
          state: initialState,
          stateUpdatedAt: admin.firestore.Timestamp.now(),
          stateHistory: [{
            state: initialState,
            timestamp: admin.firestore.Timestamp.now(),
            transitionType: "creation",
          }],
        });

        functions.logger.info(`Set initial state for event ${context.params.eventId} to ${initialState}`);
      }

      return null;
    } catch (error) {
      functions.logger.error(`Error in validateEventCreation for ${context.params.eventId}:`, error);
      throw error;
    }
  });

/**
 * Handle manual transitions between event states, with proper role checks
 */
export const transitionEventState = functions.https.onCall(async (data, context) => {
  // Security check: only authenticated users can call this function
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to transition event states"
    );
  }

  const {eventId, targetState} = data;
  const userId = context.auth.uid;

  if (!eventId || !targetState) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Event ID and target state are required"
    );
  }

  // Valid state transitions
  const validStates = Object.values(EventLifecycleState);
  if (!validStates.includes(targetState)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `Target state must be one of: ${validStates.join(", ")}`
    );
  }

  try {
    const firestore = admin.firestore();

    // Get the user's role
    const userDoc = await firestore.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        "User document not found"
      );
    }

    const userData = userDoc.data();
    const userRole = userData?.role || "public";

    // Get the event
    const eventDoc = await firestore.collection("events").doc(eventId).get();
    if (!eventDoc.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        "Event not found"
      );
    }

    const eventData = eventDoc.data()!;
    const currentState = eventData.state || EventLifecycleState.DRAFT;
    const isCreator = eventData.createdBy === userId;

    // Define permission matrix for state transitions
    // This enforces document-level role checks for event transitions
    let canTransition = false;

    // Only admins can transition to archived state
    if (targetState === EventLifecycleState.ARCHIVED && userRole === "admin") {
      canTransition = true;
    }
    // Regular state transitions
    else if (isCreator) {
      // Creator can transition:
      // - from draft to published
      // - back to draft from published (before event starts)
      if (
        (currentState === EventLifecycleState.DRAFT && targetState === EventLifecycleState.PUBLISHED) ||
        (currentState === EventLifecycleState.PUBLISHED && targetState === EventLifecycleState.DRAFT &&
         eventData.startDate.toMillis() > Date.now())
      ) {
        canTransition = true;
      }
    }
    // Admins can do any transition
    else if (userRole === "admin") {
      canTransition = true;
    }

    if (!canTransition) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "You do not have permission to make this state transition"
      );
    }

    // Perform the transition
    await firestore.collection("events").doc(eventId).update({
      state: targetState,
      stateUpdatedAt: admin.firestore.Timestamp.now(),
      stateHistory: admin.firestore.FieldValue.arrayUnion({
        state: targetState,
        timestamp: admin.firestore.Timestamp.now(),
        updatedBy: userId,
        transitionType: "manual",
      }),
    });

    return {success: true, message: `Event transitioned to ${targetState}`};
  } catch (error) {
    functions.logger.error("Error in transitionEventState:", error);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while transitioning the event state"
    );
  }
});
