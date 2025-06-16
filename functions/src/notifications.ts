import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {
  logger,
  type UserDocument,
  getDocumentData,
  firestore,
} from "./types/firebase";

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
    const userDoc = await firestore().collection("users").doc(userId).get();

    if (!userDoc.exists) {
      logger.warn(`No user document found for userId: ${userId}`);
      return;
    }

    const userData = getDocumentData<UserDocument>(userDoc);
    if (!userData?.fcmTokens) {
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
        await firestore().collection("users").doc(userId).update(tokenUpdates);
      }
    }
  } catch (error) {
    logger.error("Error sending notification:", error);
    throw error;
  }
}

interface MessageData {
  receiverId: string;
  senderId: string;
  text: string;
  senderName?: string;
}

interface EventData {
  createdBy: string;
  title: string;
  description?: string;
  clubId?: string;
  spaceId?: string;
}

interface InvitationData {
  invitedUserId: string;
  inviterUserId: string;
  inviterName?: string;
  spaceId?: string;
  clubId?: string;
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

    const messageData = getDocumentData<MessageData>(snapshot);
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

    const eventData = getDocumentData<EventData>(snapshot);
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
      const membersSnapshot = await firestore()
        .collection(memberCollection)
        .where("entityId", "==", entityId)
        .get();

      // Send notifications to all members except the creator
      const notificationPromises = membersSnapshot.docs
        .filter((doc) => {
          const memberData = getDocumentData(doc);
          return memberData && (memberData.userId as string) !== createdBy;
        })
        .map(async (doc) => {
          const memberData = getDocumentData(doc);
          if (!memberData) return;

          const userId = memberData.userId as string;
          const notificationTitle = `New Event: ${title}`;
          const notificationBody =
            description || "A new event has been created";

          await sendNotificationToUser(
            userId,
            notificationTitle,
            notificationBody,
            {
              type: "event",
              eventId: event.params.eventId,
              createdBy,
            }
          );
        });

      await Promise.all(notificationPromises);
      logger.info(`Event notifications sent for event ${event.params.eventId}`);
    } catch (error) {
      logger.error("Error sending event notifications:", error);
    }

    return null;
  }
);

// Function to send a notification when a new invitation is created
export const onNewInvitation = functions.firestore.onDocumentCreated(
  "invitations/{invitationId}",
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.warn("No invitation data found");
      return null;
    }

    const invitationData = getDocumentData<InvitationData>(snapshot);
    if (!invitationData) {
      logger.warn("No invitation data found");
      return null;
    }

    const { invitedUserId, inviterUserId, inviterName, spaceId, clubId } =
      invitationData;

    // Don't send notifications to the inviter
    if (invitedUserId === inviterUserId) {
      return null;
    }

    try {
      // Get the name of the space/club being invited to
      let entityName = "Unknown";
      if (spaceId) {
        const spaceDoc = await firestore()
          .collection("spaces")
          .doc(spaceId)
          .get();
        const spaceData = getDocumentData(spaceDoc);
        entityName = (spaceData?.name as string) || "Space";
      } else if (clubId) {
        const clubDoc = await firestore().collection("clubs").doc(clubId).get();
        const clubData = getDocumentData(clubDoc);
        entityName = (clubData?.name as string) || "Club";
      }

      const title = "New Invitation";
      const body = `${inviterName || "Someone"} invited you to join ${entityName}`;

      await sendNotificationToUser(invitedUserId, title, body, {
        type: "invitation",
        invitationId: event.params.invitationId,
        inviterUserId,
        entityId: spaceId || clubId || "",
      });

      logger.info(`Invitation notification sent to user ${invitedUserId}`);
    } catch (error) {
      logger.error("Error sending invitation notification:", error);
    }

    return null;
  }
);
