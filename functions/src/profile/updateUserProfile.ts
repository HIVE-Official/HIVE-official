import {
  createHttpsFunction,
  FunctionContext,
  getFirestore,
  functions,
} from "../types/firebase";

// Temporary UserProfileSchema - replace with @hive/validation import once workspace is fixed
// const updatableProfileFields = {
//   preferredName: "string",
//   major: "string",
//   isBuilder: "boolean",
// };

interface UpdateUserProfileData {
  preferredName?: string;
  major?: string;
  isBuilder?: boolean;
}

export const updateUserProfile = createHttpsFunction<UpdateUserProfileData>(
  async (data: UpdateUserProfileData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    // Basic validation
    const allowedFields = ["preferredName", "major", "isBuilder"];
    const updateData: Record<string, string | boolean> = {};

    for (const [key, value] of Object.entries(data)) {
      if (allowedFields.includes(key)) {
        if (typeof value === "string" || typeof value === "boolean") {
          updateData[key] = value;
        }
      }
    }

    if (Object.keys(updateData).length === 0) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "No valid fields provided for update."
      );
    }

    const uid = context.auth.uid;
    const db = getFirestore();
    const userRef = db.collection("users").doc(uid);

    await userRef.update(updateData);

    return { success: true, message: "Profile updated successfully." };
  }
);
