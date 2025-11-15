import * as functions from "firebase-functions";
import {getFirestore} from "firebase-admin/firestore";
import {UserProfileSchema} from "@hive/validation";

// A subset of the schema that users are allowed to update
const updatableProfileFields = UserProfileSchema.pick({
  preferredName: true,
  major: true,
  isBuilder: true,
  // Note: handle and avatar are updated via separate functions
}).partial();

export const updateUserProfile = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
  }

  const parseResult = updatableProfileFields.safeParse(data);

  if (!parseResult.success) {
    throw new functions.https.HttpsError("invalid-argument", "Invalid data provided.", parseResult.error.flatten());
  }

  const uid = context.auth.uid;
  const db = getFirestore();
  const userRef = db.collection("users").doc(uid);

  await userRef.update(parseResult.data);

  return {success: true, message: "Profile updated successfully."};
});
