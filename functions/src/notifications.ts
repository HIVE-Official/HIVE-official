import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as logger from "firebase-functions/logger";

/**
 * Sends a push notification to a specific user
 * @param userId The user ID to send the notification to
 * @param title The notification title
 * @param body The notification body
 * @param data Additional data to include with the notification
 */
async function sendNotificationToUser(
  userId: string,
  title: string,
  body: string,
  data: Record<string, string> = {}
): Promise<void> {
  try {
    // Get the user's FCM tokens from Firestore
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    if (!userDoc.exists) {
      logger.warn(`No user document found for userId: ${userId}`);
      return;
    }

    const userData = userDoc.data();
    if (!userData || !userData.fcmTokens) {
      logger.warn(`No FCM tokens found for userId: ${userId}`);
      return;
    }

    // The fcmTokens field should be a map of {tokenId: token}
    const tokens = Object.values(userData.fcmTokens || {});

    if (tokens.length === 0) {
      logger.warn(`User ${userId} has no FCM tokens registered`);
      return;
    }

    // Construct the notification message
    const message: admin.messaging.MulticastMessage = {
      tokens: tokens as string[],
      notification: {
        title,
        body,
      },
      data: {
        ...data,
        click_action: "FCM_PLUGIN_ACTIVITY",
      },
      // Configure Android specific options
      android: {
        priority: "high",
        notification: {
          clickAction: "FCM_PLUGIN_ACTIVITY",
          sound: "default",
        },
      },
      // Configure Apple specific options
      apns: {
        payload: {
          aps: {
            sound: "default",
          },
        },
      },
    };

    // Send the notification
    const response = await admin.messaging().sendMulticast(message);

    logger.info(`Notification sent to user ${userId}`, {
      success: response.successCount,
      failure: response.failureCount,
    });

    // Handle any token registration issues
    if (response.failureCount > 0) {
      const invalidTokens: string[] = [];

      response.responses.forEach((resp, idx) => {
        if (
          !resp.success &&
          resp.error?.code === "messaging/registration-token-not-registered"
        ) {
          invalidTokens.push(tokens[idx] as string);
        }
      });

      // Remove invalid tokens from the user's document
      if (invalidTokens.length > 0) {
        logger.info(
          `Removing ${invalidTokens.length} invalid tokens for user ${userId}`
        );

        // Find token IDs to remove
        const tokensToRemove = Object.entries(userData.fcmTokens)
          .filter(([, token]) => invalidTokens.includes(token as string))
          .map(([tokenId]) => tokenId);

        // Create update object to remove tokens
        const tokenUpdates: Record<string, admin.firestore.FieldValue> = {};
        tokensToRemove.forEach((tokenId) => {
          tokenUpdates[`fcmTokens.${tokenId}`] =
            admin.firestore.FieldValue.delete();
        });

        // Update the user document
        await admin
          .firestore()
          .collection("users")
          .doc(userId)
          .update(tokenUpdates);
      }
    }
  } catch (error) {
    logger.error("Error sending notification:", error);
    throw error;
  }
}

// Function to send a notification when a new message is created
export const onNewMessage = functions.firestore.onDocumentCreated(
  "messages/{messageId}",
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.warn("No message data found");
      return null;
    }

    const messageData = snapshot.data();
    if (!messageData) {
      logger.warn("No message data found");
      return null;
    }

    const { receiverId, senderId, text, senderName } = messageData;

    // Don't send notifications to the sender
    if (receiverId === senderId) {
      return null;
    }

    // Create notification content
    const title = senderName || "New message";
    const body = text.length > 100 ? `${text.substring(0, 97)}...` : text;

    // Send the notification
    await sendNotificationToUser(receiverId, title, body, {
      type: "message",
      messageId: event.params.messageId,
      senderId,
    });

    return null;
  }
);

// Function to send a notification when a new event is created
export const onNewEvent = functions.firestore.onDocumentCreated(
  "events/{eventId}",
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.warn("No event data found");
      return null;
    }

    const eventData = snapshot.data();
    if (!eventData) {
      logger.warn("No event data found");
      return null;
    }

    // Get the members of the club/space that created the event
    const { createdBy, title, description, clubId, spaceId } = eventData;

    // Determine which collection to query for members
    let memberCollection = "club_members";
    let entityId = clubId;

    if (spaceId && !clubId) {
      memberCollection = "space_members";
      entityId = spaceId;
    }

    if (!entityId) {
      logger.warn("No clubId or spaceId found for event");
      return null;
    }

    try {
      // Get all members of the club/space
      const membersSnapshot = await admin
        .firestore()
        .collection(memberCollection)
        .where("entityId", "==", entityId)
        .get();

      if (membersSnapshot.empty) {
        logger.info(
          `No members found for ${memberCollection} with ID ${entityId}`
        );
        return null;
      }

      // Prepare and send notifications to each member
      const notificationPromises = membersSnapshot.docs.map(async (doc) => {
        const memberData = doc.data();
        const userId = memberData.userId;

        // Don't send notification to the event creator
        if (userId === createdBy) {
          return;
        }

        // Create notification content
        const notificationTitle = `New Event: ${title}`;
        const notificationBody =
          description?.length > 100
            ? `${description.substring(0, 97)}...`
            : description || "Check out this new event!";

        // Send the notification
        return sendNotificationToUser(
          userId,
          notificationTitle,
          notificationBody,
          {
            type: "event",
            eventId: event.params.eventId,
            entityId,
          }
        );
      });

      await Promise.all(notificationPromises);
      logger.info(
        `Sent event notifications to ${notificationPromises.length} members`
      );
    } catch (error) {
      logger.error("Error sending event notifications:", error);
    }

    return null;
  }
);

// Function to send a notification when a user is invited to a club or space
export const onNewInvitation = functions.firestore.onDocumentCreated(
  "invitations/{invitationId}",
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.warn("No invitation data found");
      return null;
    }

    const invitationData = snapshot.data();
    if (!invitationData) {
      logger.warn("No invitation data found");
      return null;
    }

    const { userId, invitedBy, invitedByName, entityName, entityType } =
      invitationData;

    if (!userId || !invitedBy) {
      logger.warn("Missing required invitation fields");
      return null;
    }

    // Don't send notifications for self-invitations
    if (userId === invitedBy) {
      return null;
    }

    // Create notification content
    const title = `Invitation to ${entityName || `a ${entityType}`}`;
    const body = `${invitedByName || "Someone"} has invited you to join ${entityName || `their ${entityType}`}`;

    // Send the notification
    await sendNotificationToUser(userId, title, body, {
      type: "invitation",
      invitationId: event.params.invitationId,
      invitedBy,
      entityType,
    });

    return null;
  }
);
