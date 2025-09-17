import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { type Member } from '@hive/core/src/domain/firestore/member';

const db = admin.firestore();

/**
 * Asserts that a user has the 'builder' role in a specific space.
 * Throws an HttpsError if the user is not authenticated or not a builder.
 * @param {string | undefined} uid The user's ID from context.auth.
 * @param {string} spaceId The ID of the space to check against.
 * @throwss {functions.https.HttpsError}
 */
export const assertIsBuilder = async (uid: string | undefined, spaceId: string): Promise<void> => {
  if (!uid) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You must be logged in to perform this action.',
    );
  }

  // Use flat spaceMembers collection with composite key
  const compositeKey = `${spaceId}_${uid}`;
  const memberRef = db.collection('spaceMembers').doc(compositeKey);
  const memberDoc = await memberRef.get();

  if (!memberDoc.exists) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'You are not a member of this space.',
    );
  }

  const memberData = memberDoc.data() as Member;
  if (memberData.role !== 'builder') {
    throw new functions.https.HttpsError(
      'permission-denied',
      'You must be a builder to perform this action.',
    );
  }
};

/**
 * Asserts that a user is a member of a specific space.
 * Throws an HttpsError if the user is not authenticated or not a member.
 * @param {string | undefined} uid The user's ID from context.auth.
 * @param {string} spaceId The ID of the space to check against.
 * @throwss {functions.https.HttpsError}
 */
export const assertIsMember = async (uid: string | undefined, spaceId: string): Promise<void> => {
    if (!uid) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'You must be logged in to perform this action.',
        );
    }

    // Use flat spaceMembers collection with composite key
    const compositeKey = `${spaceId}_${uid}`;
    const memberRef = db.collection('spaceMembers').doc(compositeKey);
    const memberDoc = await memberRef.get();

    if (!memberDoc.exists) {
        throw new functions.https.HttpsError(
            'permission-denied',
            'You must be a member of this space to perform this action.',
        );
    }
}; 