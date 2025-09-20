export * from "./hooks/use-auth";
export * from "./firebase-error-handler";
export { default as FirebaseErrorHandler } from "./firebase-error-handler";
export * from "./session-manager";
export { AuthenticationError, handleAuthError, isNetworkError, isTemporaryError } from "./error-handler";
export * from "./errors";
export { auth } from "./firebase-config";
export declare function getCurrentUser(): Promise<void>;
//# sourceMappingURL=index.d.ts.map