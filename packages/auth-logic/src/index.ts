export * from './hooks/use-auth';
export { AuthProvider, useAuth } from "./hooks/use-auth";
export type { AuthUser, AuthContextType, UseAuthReturn } from "./types";
export * from "./firebase-error-handler";
export { default as FirebaseErrorHandler } from "./firebase-error-handler";
export { auth } from "./firebase-config";

// Export error handling
export * from './errors';

// Export session management
export * from './session';

// Export hooks
export * from './hooks/useAuth';
