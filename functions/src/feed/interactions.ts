import {
  createHttpsFunction,
  FunctionContext,
  getFirestore,
  FieldValue,
  functions,
} from "../types/firebase";

interface LikeCardData {
  cardId: string;
}

export const likeCard = createHttpsFunction<LikeCardData>(
  async (data: LikeCardData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const { cardId } = data;
    if (!cardId || typeof cardId !== "string") {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "A valid cardId must be provided."
      );
    }

    const uid = context.auth.uid;
    const db = getFirestore();
    const cardRef = db.collection("feed").doc(cardId);
    const likeRef = cardRef.collection("likes").doc(uid);

    return db.runTransaction(async (transaction) => {
      const likeDoc = await transaction.get(likeRef);

      if (likeDoc.exists) {
        // User has already liked this card, so unlike it
        transaction.delete(likeRef);
        transaction.update(cardRef, {
          "interactionData.likes": FieldValue.increment(-1),
        });
        return { liked: false };
      } else {
        // User has not liked this card, so like it
        transaction.set(likeRef, {
          userId: uid,
          likedAt: FieldValue.serverTimestamp(),
        });
        transaction.update(cardRef, {
          "interactionData.likes": FieldValue.increment(1),
        });
        return { liked: true };
      }
    });
  }
);

interface FollowUserData {
  userIdToFollow: string;
}

export const followUser = createHttpsFunction<FollowUserData>(
  async (data: FollowUserData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const { userIdToFollow } = data;
    if (!userIdToFollow || typeof userIdToFollow !== "string") {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "A valid userIdToFollow must be provided."
      );
    }

    const uid = context.auth.uid;

    if (uid === userIdToFollow) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Users cannot follow themselves."
      );
    }

    const db = getFirestore();
    const followerRef = db.collection("users").doc(uid);
    const followedRef = db.collection("users").doc(userIdToFollow);
    const followLinkRef = followerRef.collection("follows").doc(userIdToFollow);

    return db.runTransaction(async (transaction) => {
      const followDoc = await transaction.get(followLinkRef);

      if (followDoc.exists) {
        // Already following, so we can just return.
        return { status: "already_following" };
      }

      transaction.set(followLinkRef, {
        userId: userIdToFollow,
        followedAt: FieldValue.serverTimestamp(),
      });
      transaction.update(followerRef, {
        followingCount: FieldValue.increment(1),
      });
      transaction.update(followedRef, {
        followersCount: FieldValue.increment(1),
      });

      return { status: "success" };
    });
  }
);

interface UnfollowUserData {
  userIdToUnfollow: string;
}

export const unfollowUser = createHttpsFunction<UnfollowUserData>(
  async (data: UnfollowUserData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const { userIdToUnfollow } = data;
    if (!userIdToUnfollow || typeof userIdToUnfollow !== "string") {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "A valid userIdToUnfollow must be provided."
      );
    }

    const uid = context.auth.uid;

    if (uid === userIdToUnfollow) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Users cannot unfollow themselves."
      );
    }

    const db = getFirestore();
    const followerRef = db.collection("users").doc(uid);
    const followedRef = db.collection("users").doc(userIdToUnfollow);
    const followLinkRef = followerRef
      .collection("follows")
      .doc(userIdToUnfollow);

    return db.runTransaction(async (transaction) => {
      const followDoc = await transaction.get(followLinkRef);

      if (!followDoc.exists) {
        // Not following, so we can just return.
        return { status: "not_following" };
      }

      transaction.delete(followLinkRef);
      transaction.update(followerRef, {
        followingCount: FieldValue.increment(-1),
      });
      transaction.update(followedRef, {
        followersCount: FieldValue.increment(-1),
      });

      return { status: "success" };
    });
  }
);
