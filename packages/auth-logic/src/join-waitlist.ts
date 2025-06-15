import { getFirestore, FieldValue } from "firebase-admin/firestore";

export async function joinWaitlist(email: string, schoolId: string): Promise<{ success: boolean; message?: string }> {
  if (!email || !schoolId) {
    throw new Error("Email and school ID are required.");
  }

  const db = getFirestore();
  const schoolRef = db.collection("schools").doc(schoolId);
  const waitlistRef = schoolRef.collection("waitlist_entries").doc(email);

  await db.runTransaction(async (transaction) => {
    const schoolDoc = await transaction.get(schoolRef);
    const waitlistDoc = await transaction.get(waitlistRef);

    if (!schoolDoc.exists) {
      throw new Error("School not found.");
    }
    
    if (waitlistDoc.exists) {
      // User is already on the waitlist, treat as success but do nothing.
      return;
    }

    transaction.create(waitlistRef, {
      email: email,
      joinedAt: FieldValue.serverTimestamp(),
    });

    transaction.update(schoolRef, {
      waitlistCount: FieldValue.increment(1),
    });
  });

  return { success: true };
} 