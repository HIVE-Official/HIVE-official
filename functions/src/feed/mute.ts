import {
  createHttpsFunction,
  FunctionContext,
  getFirestore,
  Timestamp,
  functions,
} from "../types/firebase";

interface MuteUserData {
  userIdToMute: string;
}

interface UnmuteUserData {
  userIdToUnmute: string;
}

export const muteUser = createHttpsFunction<MuteUserData>(
  async (data: MuteUserData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const { userIdToMute } = data;
    if (!userIdToMute || typeof userIdToMute !== "string") {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "A valid userIdToMute must be provided."
      );
    }

    const uid = context.auth.uid;

    if (uid === userIdToMute) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Users cannot mute themselves."
      );
    }

    const db = getFirestore();
    const muteLinkRef = db
      .collection("users")
      .doc(uid)
      .collection("mutes")
      .doc(userIdToMute);

    await muteLinkRef.set({ userId: userIdToMute, mutedAt: Timestamp.now() });

    return { status: "success" };
  }
);

export const unmuteUser = createHttpsFunction<UnmuteUserData>(
  async (data: UnmuteUserData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const { userIdToUnmute } = data;
    if (!userIdToUnmute || typeof userIdToUnmute !== "string") {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "A valid userIdToUnmute must be provided."
      );
    }

    const uid = context.auth.uid;

    const db = getFirestore();
    const muteLinkRef = db
      .collection("users")
      .doc(uid)
      .collection("mutes")
      .doc(userIdToUnmute);

    await muteLinkRef.delete();

    return { status: "success" };
  }
);
