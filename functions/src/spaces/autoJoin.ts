import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const autoJoinSpaces = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (change, context) => {
    const { userId } = context.params;
    const beforeData = change.before.data();
    const afterData = change.after.data();

    const majorBefore = beforeData.major;
    const majorAfter = afterData.major;
    const residencyBefore = beforeData.residency;
    const residencyAfter = afterData.residency;

    const needsUpdate = majorBefore !== majorAfter || residencyBefore !== residencyAfter;

    if (!needsUpdate) {
      return null;
    }

    const spacesToLeave: string[] = [];
    const spacesToJoin: string[] = [];

    if (majorBefore !== majorAfter) {
      if (majorBefore) spacesToLeave.push(majorBefore);
      if (majorAfter) spacesToJoin.push(majorAfter);
    }

    if (residencyBefore !== residencyAfter) {
      if (residencyBefore) spacesToLeave.push(residencyBefore);
      if (residencyAfter) spacesToJoin.push(residencyAfter);
    }

    const batch = db.batch();

    for (const spaceName of spacesToLeave) {
      const spaceQuery = await db.collection('spaces').where('name', '==', spaceName).limit(1).get();
      if (!spaceQuery.empty) {
        const spaceId = spaceQuery.docs[0].id;
        const memberRef = db.doc(`spaces/${spaceId}/members/${userId}`);
        batch.delete(memberRef);
      }
    }

    for (const spaceName of spacesToJoin) {
      const spaceQuery = await db.collection('spaces').where('name', '==', spaceName).limit(1).get();
      if (!spaceQuery.empty) {
        const spaceId = spaceQuery.docs[0].id;
        const memberRef = db.doc(`spaces/${spaceId}/members/${userId}`);
        batch.set(memberRef, { role: 'member', joinedAt: new Date() });
      }
    }

    return batch.commit();
  }); 