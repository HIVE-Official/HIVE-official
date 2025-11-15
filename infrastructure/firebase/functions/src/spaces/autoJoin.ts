import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {SpaceMember} from "../../../packages/core/src/domain/member";
import {Space} from "../../../packages/core/src/domain/space";

const db = admin.firestore();

/**
 * Triggered on new user creation to automatically add them to relevant spaces
 * like their major and residential hall. This is critical for ensuring a
 * user does not have an empty experience on their first login.
 */
export const autoJoinOnCreate = functions.auth.user().onCreate(async (user) => {
  const {uid} = user;
  functions.logger.info(`Starting auto-join process for user: ${uid}`);

  try {
    // 1. Fetch the user's profile from Firestore
    const userDocRef = db.collection("users").doc(uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      functions.logger.error(`User document not found for user ${uid}. Cannot perform auto-join.`);
      return;
    }

    const userData = userDoc.data();
    if (!userData || !userData.schoolId || !userData.major) {
      functions.logger.warn(`User ${uid} is missing schoolId or major. Skipping auto-join.`);
      return;
    }

    const {schoolId, major, residency} = userData;

    // 2. Find all spaces that should be auto-joined
    const spacesToJoinQuery = db.collection("spaces")
      .where("schoolId", "==", schoolId)
      .where("tags", "array-contains-any", [
        {type: "academic", sub_type: major},
        ...(residency ? [{type: "residential", sub_type: residency}] : []),
      ]);

    const spacesSnapshot = await spacesToJoinQuery.get();

    if (spacesSnapshot.empty) {
      functions.logger.info(`No auto-join spaces found for user ${uid} with major: ${major}`);
      return;
    }

    // 3. Create a batch write to atomically join all spaces and update counts
    const batch = db.batch();
    const spacesJoined: string[] = [];

    spacesSnapshot.forEach((doc) => {
      const space = doc.data() as Space & { campusId?: string };
      functions.logger.info(`Adding user ${uid} to space ${doc.id} (${space.name})`);

      // Legacy nested membership (maintained for compatibility)
      const nestedMemberRef = db.collection("spaces").doc(doc.id).collection("members").doc(uid);
      const newMember: SpaceMember = {
        userId: uid,
        spaceId: doc.id,
        role: "member",
        joinedAt: new Date(),
      };
      batch.set(nestedMemberRef, newMember);

      // Flat membership document with campus metadata if available
      const flatMemberRef = db.collection('spaceMembers').doc();
      batch.set(flatMemberRef, {
        userId: uid,
        spaceId: doc.id,
        role: 'member',
        isActive: true,
        joinedAt: admin.firestore.FieldValue.serverTimestamp(),
        campusId: space.campusId || null,
        permissions: ['post'],
        joinMethod: 'auto',
      });

      // Increment metrics
      const spaceRef = doc.ref;
      batch.update(spaceRef, {
        'metrics.memberCount': admin.firestore.FieldValue.increment(1),
        'metrics.activeMembers': admin.firestore.FieldValue.increment(1),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      spacesJoined.push(space.name);
    });

    await batch.commit();
    functions.logger.info(`Successfully auto-joined user ${uid} to spaces: ${spacesJoined.join(", ")}`);
  } catch (error) {
    functions.logger.error(`Error in auto-join for user ${uid}:`, error);
  }
});

/**
 * Triggered on user profile updates to automatically manage their membership
 * in major- or residency-based spaces.
 */
export const autoJoinOnUpdate = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const {userId} = context.params;
    const beforeData = change.before.data();
    const afterData = change.after.data();

    // Check if relevant fields have changed
    const majorBefore = beforeData.major;
    const majorAfter = afterData.major;
    const residencyBefore = beforeData.residency;
    const residencyAfter = afterData.residency;

    const needsUpdate = majorBefore !== majorAfter || residencyBefore !== residencyAfter;

    if (!needsUpdate) {
      functions.logger.info(`No relevant profile changes for user ${userId}. Skipping space membership update.`);
      return;
    }

    functions.logger.info(`Profile changed for user ${userId}. Updating space memberships.`);

    try {
      const schoolId = afterData.schoolId;
      if (!schoolId) {
        functions.logger.warn(`User ${userId} is missing schoolId. Cannot update memberships.`);
        return;
      }

      const batch = db.batch();

      // Logic to leave old spaces
      if (majorBefore && majorBefore !== majorAfter) {
        const tagToFind = { type: 'academic', sub_type: majorBefore };
        const oldMajorSpaceQuery = await db.collection('spaces')
            .where('schoolId', '==', schoolId)
            .where('tags', 'array-contains', tagToFind)
            .limit(1).get();
        if (!oldMajorSpaceQuery.empty) {
          const spaceId = oldMajorSpaceQuery.docs[0].id;
          // Remove nested
          batch.delete(db.doc(`spaces/${spaceId}/members/${userId}`));
          // Deactivate flat
          const existingFlat = await db.collection('spaceMembers')
            .where('spaceId', '==', spaceId)
            .where('userId', '==', userId)
            .limit(1).get();
          if (!existingFlat.empty) {
            batch.update(existingFlat.docs[0].ref, { isActive: false, leftAt: admin.firestore.FieldValue.serverTimestamp() });
          }
          batch.update(db.doc(`spaces/${spaceId}`), {
            'metrics.memberCount': admin.firestore.FieldValue.increment(-1),
            'metrics.activeMembers': admin.firestore.FieldValue.increment(-1),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
      }

      // Logic to join new spaces
      if (majorAfter && majorBefore !== majorAfter) {
        const tagToFind = { type: 'academic', sub_type: majorAfter };
        const newMajorSpaceQuery = await db.collection('spaces')
            .where('schoolId', '==', schoolId)
            .where('tags', 'array-contains', tagToFind)
            .limit(1).get();
        if (!newMajorSpaceQuery.empty) {
          const spaceId = newMajorSpaceQuery.docs[0].id;
          // Add nested
          batch.set(db.doc(`spaces/${spaceId}/members/${userId}`), { userId, spaceId, role: 'member', joinedAt: new Date() });
          // Add flat
          batch.set(db.collection('spaceMembers').doc(), {
            userId, spaceId, role: 'member', isActive: true,
            joinedAt: admin.firestore.FieldValue.serverTimestamp(),
            joinMethod: 'auto'
          });
          batch.update(db.doc(`spaces/${spaceId}`), {
            'metrics.memberCount': admin.firestore.FieldValue.increment(1),
            'metrics.activeMembers': admin.firestore.FieldValue.increment(1),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
      }

      // Logic to leave old residency
      if (residencyBefore && residencyBefore !== residencyAfter) {
        const tagToFind = { type: 'residential', sub_type: residencyBefore };
        const oldResidencySpaceQuery = await db.collection('spaces')
            .where('schoolId', '==', schoolId)
            .where('tags', 'array-contains', tagToFind)
            .limit(1).get();
        if (!oldResidencySpaceQuery.empty) {
          const spaceId = oldResidencySpaceQuery.docs[0].id;
          batch.delete(db.doc(`spaces/${spaceId}/members/${userId}`));
          const existingFlat = await db.collection('spaceMembers')
            .where('spaceId', '==', spaceId)
            .where('userId', '==', userId)
            .limit(1).get();
          if (!existingFlat.empty) {
            batch.update(existingFlat.docs[0].ref, { isActive: false, leftAt: admin.firestore.FieldValue.serverTimestamp() });
          }
          batch.update(db.doc(`spaces/${spaceId}`), {
            'metrics.memberCount': admin.firestore.FieldValue.increment(-1),
            'metrics.activeMembers': admin.firestore.FieldValue.increment(-1),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
      }

      // Logic to join new residency
      if (residencyAfter && residencyBefore !== residencyAfter) {
        const tagToFind = { type: 'residential', sub_type: residencyAfter };
        const newResidencySpaceQuery = await db.collection('spaces')
            .where('schoolId', '==', schoolId)
            .where('tags', 'array-contains', tagToFind)
            .limit(1).get();
        if (!newResidencySpaceQuery.empty) {
          const spaceId = newResidencySpaceQuery.docs[0].id;
          batch.set(db.doc(`spaces/${spaceId}/members/${userId}`), { userId, spaceId, role: 'member', joinedAt: new Date() });
          batch.set(db.collection('spaceMembers').doc(), {
            userId, spaceId, role: 'member', isActive: true,
            joinedAt: admin.firestore.FieldValue.serverTimestamp(),
            joinMethod: 'auto'
          });
          batch.update(db.doc(`spaces/${spaceId}`), {
            'metrics.memberCount': admin.firestore.FieldValue.increment(1),
            'metrics.activeMembers': admin.firestore.FieldValue.increment(1),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
      }

      await batch.commit();
      functions.logger.info(`Successfully updated space memberships for user ${userId}.`);
    } catch (error) {
      functions.logger.error(`Error updating memberships for user ${userId}:`, error);
    }
  });
