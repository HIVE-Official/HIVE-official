import {
  functions,
  firestore,
  logger,
  getDocumentData,
  type UserDocument,
  type SpaceDocument,
} from "../types/firebase";
import { UB_MAJORS } from "@hive/core/src/constants/majors";

type SpaceType = "major" | "residential" | "interest" | "club";

interface SpaceTag {
  type: string;
  sub_type: string;
}

interface NewSpaceData {
  name: string;
  name_lowercase: string;
  description: string;
  metrics: { memberCount: number; activeMembers?: number };
  schoolId: string;
  type: SpaceType;
  tags: SpaceTag[];
  status: string;
  createdAt: FirebaseFirestore.FieldValue;
  updatedAt: FirebaseFirestore.FieldValue;
}

/**
 * Creates a new space if it doesn't exist.
 * @param transaction The Firestore transaction.
 * @param name The name of the space.
 * @param type The type of space ('major' or 'residential').
 * @param subType The sub-type (e.g., major name or residential area).
 * @param schoolId The school ID.
 * @returns The space ID.
 */
const createSpaceIfNeeded = async (
  transaction: FirebaseFirestore.Transaction,
  name: string,
  type: SpaceType,
  subType: string,
  schoolId: string
): Promise<string> => {
  const db = firestore();
  const spaceId = db.collection("spaces").doc().id;

  const newSpace: NewSpaceData = {
    name,
    name_lowercase: name.toLowerCase(),
    description:
      type === "major"
        ? `Connect with fellow ${name} students, share resources, and collaborate on projects.`
        : `Community space for ${name} residents.`,
    metrics: { memberCount: 0, activeMembers: 0 },
    schoolId,
    type,
    tags: [
      {
        type,
        sub_type: subType,
      },
    ],
    status: "activated",
    createdAt: firestore().FieldValue.serverTimestamp(),
    updatedAt: firestore().FieldValue.serverTimestamp(),
  };

  const spaceRef = db.collection("spaces").doc(spaceId);
  transaction.set(spaceRef, newSpace);

  logger.info(`Created new ${type} space: ${name} (${spaceId})`);
  return spaceId;
};

/**
 * Adds a user to a space within a transaction.
 * Creates the member document and increments the space's member count.
 * @param transaction The Firestore transaction.
 * @param userId The ID of the user to add.
 * @param spaceId The ID of the space to join.
 */
const addUserToSpace = (
  transaction: FirebaseFirestore.Transaction,
  userId: string,
  spaceId: string
) => {
  logger.info(`Transactionally adding user ${userId} to space ${spaceId}`);
  const db = firestore();
  const memberRef = db
    .collection("spaces")
    .doc(spaceId)
    .collection("members")
    .doc(userId);
  const spaceRef = db.collection("spaces").doc(spaceId);

  transaction.set(memberRef, {
    uid: userId,
    role: "member",
    joinedAt: firestore().FieldValue.serverTimestamp(),
  });

  transaction.update(spaceRef, {
    'metrics.memberCount': firestore().FieldValue.increment(1),
    'metrics.activeMembers': firestore().FieldValue.increment(1),
  });
};

export const onUserCreateAutoJoin = firestore()
  .document("users/{userId}")
  .onCreate(async (snap, context) => {
    const userData = getDocumentData<UserDocument>(snap);
    const userId = context.params.userId as string;

    if (!userData) {
      logger.error(`User data was not found for user ID: ${userId}`);
      return;
    }

    logger.info(
      `Starting auto-join process for user: ${userId}, major: ${userData.major}, school: ${userData.schoolId}`
    );

    if (!userData.major || !userData.schoolId) {
      logger.warn(
        `User ${userId} is missing major or schoolId. Skipping auto-join.`
      );
      return;
    }

    try {
      // Find if the user's major exists in our UB_MAJORS list
      const majorData = UB_MAJORS.find((m) => m.name === userData.major);
      if (!majorData) {
        logger.warn(
          `Major "${userData.major}" not found in UB_MAJORS list for user ${userId}`
        );
      }

      const db = firestore();
      await db.runTransaction(async (transaction) => {
        const spacesToJoin: string[] = [];

        // 1. Handle Major Space
        const majorSpacesQuery = db
          .collection("spaces")
          .where("type", "==", "major")
          .where("tags", "array-contains", {
            type: "major",
            sub_type: userData.major,
          })
          .limit(1);

        const majorSpacesSnapshot = await transaction.get(majorSpacesQuery);

        let majorSpaceId: string;
        if (majorSpacesSnapshot.empty) {
          // Create the major space if it doesn't exist
          const spaceName = majorData
            ? `${majorData.name} Majors`
            : `${userData.major} Majors`;
          majorSpaceId = await createSpaceIfNeeded(
            transaction,
            spaceName,
            "major",
            userData.major,
            userData.schoolId
          );
        } else {
          majorSpaceId = majorSpacesSnapshot.docs[0].id;
        }
        spacesToJoin.push(majorSpaceId);

        // 2. Handle General Residential Space (for now, just create a general one)
        const residentialSpacesQuery = db
          .collection("spaces")
          .where("type", "==", "residential")
          .where("tags", "array-contains", {
            type: "residential",
            sub_type: "general",
          })
          .limit(1);

        const residentialSpacesSnapshot = await transaction.get(
          residentialSpacesQuery
        );

        let residentialSpaceId: string;
        if (residentialSpacesSnapshot.empty) {
          // Create a general residential space if it doesn't exist
          residentialSpaceId = await createSpaceIfNeeded(
            transaction,
            "UB Community",
            "residential",
            "general",
            userData.schoolId
          );
        } else {
          residentialSpaceId = residentialSpacesSnapshot.docs[0].id;
        }
        spacesToJoin.push(residentialSpaceId);

        // 3. Add user to all spaces
        spacesToJoin.forEach((spaceId) => {
          addUserToSpace(transaction, userId, spaceId);
        });

        logger.info(
          `Successfully auto-joined user ${userId} to ${spacesToJoin.length} spaces: ${spacesToJoin.join(", ")}`
        );
      });
    } catch (error) {
      logger.error(
        `Failed to auto-join user ${userId} to spaces.`,
        error as Error
      );
    }
  });
