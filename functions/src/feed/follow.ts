import * as functions from "firebase-functions";
import {getFirestore, FieldValue} from "firebase-admin/firestore";

export const followUser = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
  }

  const {userIdToFollow} = data;
  if (!userIdToFollow || typeof userIdToFollow !== "string") {
    throw new functions.https.HttpsError("invalid-argument", "A valid userIdToFollow must be provided.");
  }

  const uid = context.auth.uid;

  if (uid === userIdToFollow) {
    throw new functions.https.HttpsError("invalid-argument", "Users cannot follow themselves.");
  }

  const db = getFirestore();
  const followerRef = db.collection("users").doc(uid);
  const followedRef = db.collection("users").doc(userIdToFollow);
  const followLinkRef = followerRef.collection("follows").doc(userIdToFollow);

  return db.runTransaction(async (transaction) => {
    const followDoc = await transaction.get(followLinkRef);

    if (followDoc.exists) {
      // Already following, so we can just return.
      return {status: "already_following"};
    }

    transaction.set(followLinkRef, {userId: userIdToFollow, followedAt: FieldValue.serverTimestamp()});
    transaction.update(followerRef, {followingCount: FieldValue.increment(1)});
    transaction.update(followedRef, {followersCount: FieldValue.increment(1)});

    return {status: "success"};
  });
});

export const unfollowUser = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
  }

  const {userIdToUnfollow} = data;
  if (!userIdToUnfollow || typeof userIdToUnfollow !== "string") {
    throw new functions.https.HttpsError("invalid-argument", "A valid userIdToUnfollow must be provided.");
  }

  const uid = context.auth.uid;

  if (uid === userIdToUnfollow) {
    throw new functions.https.HttpsError("invalid-argument", "Users cannot unfollow themselves.");
  }

  const db = getFirestore();
  const followerRef = db.collection("users").doc(uid);
  const followedRef = db.collection("users").doc(userIdToUnfollow);
  const followLinkRef = followerRef.collection("follows").doc(userIdToUnfollow);

  return db.runTransaction(async (transaction) => {
    const followDoc = await transaction.get(followLinkRef);

    if (!followDoc.exists) {
      // Not following, so we can just return.
      return {status: "not_following"};
    }

    transaction.delete(followLinkRef);
    transaction.update(followerRef, {followingCount: FieldValue.increment(-1)});
    transaction.update(followedRef, {followersCount: FieldValue.increment(-1)});

    return {status: "success"};
  });
});
