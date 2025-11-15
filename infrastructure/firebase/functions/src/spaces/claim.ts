import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

/**
 * Allows a user to request the 'builder' role for a 'dormant' space.
 * This function does not grant the role, but flags the user's membership
 * document for an admin to review and approve.
 */
export const requestBuilderRole = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "You must be logged in to request a role.");
  }

  const {spaceId} = data;
  const {uid} = context.auth;

  if (!spaceId) {
    throw new functions.https.HttpsError("invalid-argument", "The function must be called with a \"spaceId\".");
  }

  functions.logger.log(`User ${uid} is requesting builder role for space ${spaceId}.`);

  const spaceRef = db.collection('spaces').doc(spaceId);

  return db.runTransaction(async (transaction) => {
    const spaceDoc = await transaction.get(spaceRef);
    if (!spaceDoc.exists) {
      throw new functions.https.HttpsError("not-found", "The specified space does not exist.");
    }

    const spaceData = spaceDoc.data();
    if (spaceData?.status !== "dormant") {
      throw new functions.https.HttpsError("failed-precondition", "This space is not dormant and cannot be claimed.");
    }

    // Check flat membership first
    const flatMembershipQuery = db
      .collection('spaceMembers')
      .where('spaceId', '==', spaceId)
      .where('userId', '==', uid)
      .where('isActive', '==', true)
      .limit(1);
    const flatMembershipSnap = await transaction.get(flatMembershipQuery);

    let existingRole: string | undefined;
    if (!flatMembershipSnap.empty) {
      existingRole = flatMembershipSnap.docs[0].data().role as string | undefined;
    } else {
      // Fallback to nested membership
      const memberRef = db.collection('spaces').doc(spaceId).collection('members').doc(uid);
      const memberDoc = await transaction.get(memberRef);
      if (!memberDoc.exists) {
        throw new functions.https.HttpsError("failed-precondition", "You must be a member of the space to request the builder role.");
      }
      existingRole = memberDoc.data()?.role as string | undefined;
    }

    if (existingRole === "builder" || existingRole === "admin") {
      throw new functions.https.HttpsError("already-exists",
        "User is already a builder or admin in this space.");
    }

    // Check if there is an active builder
    const builderQuery = spaceRef.collection('members').where('role', '==', 'builder').limit(1);
    const builderSnapshot = await transaction.get(builderQuery);

    if (!builderSnapshot.empty) {
      throw new functions.https.HttpsError("failed-precondition",
        "This space already has an active builder.");
    }

    // Update the user's role claim to pending
    if (!flatMembershipSnap.empty) {
      transaction.update(flatMembershipSnap.docs[0].ref, {
        roleRequest: 'pending',
        roleRequestTimestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      const memberRef = db.collection('spaces').doc(spaceId).collection('members').doc(uid);
      transaction.update(memberRef, {
        roleRequest: 'pending',
        roleRequestTimestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    return {
      status: "success",
      message: "Your request to become a builder has been submitted for review.",
    };
  });
});
