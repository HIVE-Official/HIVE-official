import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { type User } from '@hive/core/src/domain/firestore/user';
import { type Space, type SpaceType } from '@hive/core/src/domain/firestore/space';
import { UB_MAJORS } from '@hive/core/src/constants/majors';

const db = admin.firestore();

/**
 * Creates a new space if it doesn't exist.
 * @param {admin.firestore.Transaction} transaction The Firestore transaction.
 * @param {string} name The name of the space.
 * @param {string} type The type of space ('major' or 'residential').
 * @param {string} subType The sub-type (e.g., major name or residential area).
 * @param {string} schoolId The school ID.
 * @returns {string} The space ID.
 */
const createSpaceIfNeeded = async (
  transaction: admin.firestore.Transaction,
  name: string,
  type: SpaceType,
  subType: string,
  schoolId: string,
): Promise<string> => {
  const spaceId = db.collection('spaces').doc().id;
  
  const newSpace: Omit<Space, 'id'> = {
    name,
    name_lowercase: name.toLowerCase(),
    description: type === 'major' 
      ? `Connect with fellow ${name} students, share resources, and collaborate on projects.`
      : `Community space for ${name} residents.`,
    memberCount: 0,
    schoolId,
    type,
    tags: [{
      type,
      sub_type: subType,
    }],
    status: 'activated',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const spaceRef = db.collection('spaces').doc(spaceId);
  transaction.set(spaceRef, newSpace);
  
  functions.logger.info(`Created new ${type} space: ${name} (${spaceId})`);
  return spaceId;
};

/**
 * Adds a user to a space within a transaction.
 * Creates the member document and increments the space's member count.
 * @param {admin.firestore.Transaction} transaction The Firestore transaction.
 * @param {string} userId The ID of the user to add.
 * @param {string} spaceId The ID of the space to join.
 */
const addUserToSpace = (
  transaction: admin.firestore.Transaction,
  userId: string,
  spaceId: string,
) => {
  functions.logger.info(`Transactionally adding user ${userId} to space ${spaceId}`);
  const memberRef = db.collection('spaces').doc(spaceId).collection('members').doc(userId);
  const spaceRef = db.collection('spaces').doc(spaceId);

  transaction.set(memberRef, {
    uid: userId,
    role: 'member',
    joinedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  transaction.update(spaceRef, {
    memberCount: admin.firestore.FieldValue.increment(1),
  });
};

export const onUserCreateAutoJoin = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snap, context) => {
    const user = snap.data() as User;
    const { userId } = context.params;

    if (!user) {
      functions.logger.error(`User data was not found for user ID: ${userId}`);
      return;
    }

    functions.logger.info(`Starting auto-join process for user: ${userId}, major: ${user.major}, school: ${user.schoolId}`);

    if (!user.major || !user.schoolId) {
        functions.logger.warn(`User ${userId} is missing major or schoolId. Skipping auto-join.`);
        return;
    }

    try {
        // Find if the user's major exists in our UB_MAJORS list
        const majorData = UB_MAJORS.find(m => m.name === user.major);
        if (!majorData) {
            functions.logger.warn(`Major "${user.major}" not found in UB_MAJORS list for user ${userId}`);
        }

        await db.runTransaction(async (transaction) => {
            const spacesToJoin: string[] = [];

            // 1. Handle Major Space
            const majorSpacesQuery = db.collection('spaces')
                .where('type', '==', 'major')
                .where('tags', 'array-contains', { type: 'major', sub_type: user.major })
                .limit(1);

            const majorSpacesSnapshot = await transaction.get(majorSpacesQuery);
            
            let majorSpaceId: string;
            if (majorSpacesSnapshot.empty) {
                // Create the major space if it doesn't exist
                const spaceName = majorData ? `${majorData.name} Majors` : `${user.major} Majors`;
                majorSpaceId = await createSpaceIfNeeded(
                    transaction,
                    spaceName,
                    'major',
                    user.major,
                    user.schoolId
                );
            } else {
                majorSpaceId = majorSpacesSnapshot.docs[0].id;
            }
            spacesToJoin.push(majorSpaceId);

            // 2. Handle General Residential Space (for now, just create a general one)
            const residentialSpacesQuery = db.collection('spaces')
                .where('type', '==', 'residential')
                .where('tags', 'array-contains', { type: 'residential', sub_type: 'general' })
                .limit(1);

            const residentialSpacesSnapshot = await transaction.get(residentialSpacesQuery);
            
            let residentialSpaceId: string;
            if (residentialSpacesSnapshot.empty) {
                // Create a general residential space if it doesn't exist
                residentialSpaceId = await createSpaceIfNeeded(
                    transaction,
                    'UB Community',
                    'residential',
                    'general',
                    user.schoolId
                );
            } else {
                residentialSpaceId = residentialSpacesSnapshot.docs[0].id;
            }
            spacesToJoin.push(residentialSpaceId);

            // 3. Add user to all spaces
            spacesToJoin.forEach((spaceId) => {
                addUserToSpace(transaction, userId, spaceId);
            });

            functions.logger.info(`Successfully auto-joined user ${userId} to ${spacesToJoin.length} spaces: ${spacesToJoin.join(', ')}`);
        });

    } catch (error) {
        functions.logger.error(`Failed to auto-join user ${userId} to spaces.`, error);
    }
  }); 