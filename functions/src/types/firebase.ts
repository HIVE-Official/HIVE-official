import * as functions from "firebase-functions";
import { onCall, CallableRequest } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

// Core Firebase services
export const firestore = () => admin.firestore();
export const getFirestore = () => admin.firestore(); // Alternative export name
export const auth = () => admin.auth();
export const storage = () => admin.storage();

// Firebase Admin exports
export { admin, functions };

// Re-export Firebase v2 functions
export { onCall, CallableRequest, onSchedule, onDocumentCreated };

// Firestore helpers
export const FieldValue = admin.firestore.FieldValue;
export const Timestamp = admin.firestore.Timestamp;

// Function context type for v2 functions
export interface FunctionContext {
  auth?: {
    uid: string;
    token?: any;
  };
  rawRequest?: any;
}

// Document type interfaces
export interface UserDocument {
  id: string;
  email: string;
  fullName: string;
  createdAt: admin.firestore.Timestamp;
  [key: string]: any;
}

export interface SpaceDocument {
  id: string;
  name: string;
  createdAt: admin.firestore.Timestamp;
  memberCount: number;
  [key: string]: any;
}

export interface MemberDocument {
  id: string;
  userId: string;
  spaceId: string;
  role: string;
  joinedAt: admin.firestore.Timestamp;
  [key: string]: any;
}

// Helper function to create HTTPS callable functions with proper v2 types
export function createHttpsFunction<T = any, R = any>(
  handler: (data: T, context: FunctionContext) => Promise<R> | R
) {
  return onCall<T>(async (request: CallableRequest<T>): Promise<R> => {
    const functionContext: FunctionContext = {
      auth: request.auth,
      rawRequest: request.rawRequest,
    };
    return handler(request.data, functionContext);
  });
}

// Authentication helper
export function assertAuthenticated(context: FunctionContext): string {
  if (!context.auth?.uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated to perform this action"
    );
  }
  return context.auth.uid;
}

// Validation helper
export function validateRequiredFields<T extends Record<string, any>>(
  data: T,
  requiredFields: (keyof T)[]
): void {
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        `Missing required field: ${String(field)}`
      );
    }
  }
}

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
