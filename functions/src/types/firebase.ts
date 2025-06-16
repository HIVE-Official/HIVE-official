import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

// Core Firebase services
export const firestore = () => admin.firestore();
export const auth = () => admin.auth();
export const storage = () => admin.storage();

// Firebase Admin exports
export { admin, functions };

// Firestore helpers
export const FieldValue = admin.firestore.FieldValue;
export const Timestamp = admin.firestore.Timestamp;

// Custom error classes
export class FirebaseHttpsError extends functions.https.HttpsError {
  constructor(
    code: functions.https.FunctionsErrorCode,
    message: string,
    details?: any
  ) {
    super(code, message, details);
  }
}

// Helper to get document data with proper typing
export function getDocumentData<T extends Record<string, any>>(
  snapshot: admin.firestore.DocumentSnapshot
): T {
  const data = snapshot.data();
  if (!data) {
    throw new Error("Document does not exist");
  }
  return { id: snapshot.id, ...data } as unknown as T;
}

// Simple logger
export const logger = {
  info: (message: string, data?: any) => console.log("[INFO]", message, data),
  warn: (message: string, data?: any) => console.warn("[WARN]", message, data),
  error: (message: string, data?: any) =>
    console.error("[ERROR]", message, data),
  debug: (message: string, data?: any) => console.log("[DEBUG]", message, data),
};

export function handleFirebaseError(error: unknown): FirebaseHttpsError {
  if (error instanceof functions.https.HttpsError) {
    return error;
  }

  if (error instanceof Error) {
    return new FirebaseHttpsError("internal", error.message);
  }

  return new FirebaseHttpsError("unknown", "An unknown error occurred");
}
