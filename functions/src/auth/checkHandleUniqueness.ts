import * as functions from "firebase-functions";
import { getFirestore } from "firebase-admin/firestore";

export const checkHandleUniqueness = functions.https.onCall(async (data, context) => {
    const handle = data.handle;

    if (!handle || typeof handle !== 'string' || handle.length < 4 || handle.length > 15) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "Invalid handle provided."
        );
    }

    const db = getFirestore();
    const handleRef = db.collection("handles").doc(handle);
    const doc = await handleRef.get();

    return { isUnique: !doc.exists };
}); 