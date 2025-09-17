export * from "./hooks/use-auth";
export * from "./firebase-error-handler";
export { default as FirebaseErrorHandler } from "./firebase-error-handler";
export * from "./session-manager";

// Export specific items from error-handler to avoid conflicts
export { AuthenticationError, handleAuthError, isNetworkError, isTemporaryError } from "./error-handler";

// Export all from errors (newer, cleaner implementation)
export * from "./errors";
// export { joinWaitlist } from "./join-waitlist"; // Server-side only, moved to API routes
export { auth } from "./firebase-config";

// Temporary stub for server-side auth - points to proper implementation
export async function getCurrentUser() {
  throw new Error("getCurrentUser is no longer exported from auth-logic. Use getCurrentUser from your server auth utilities instead.");
}
