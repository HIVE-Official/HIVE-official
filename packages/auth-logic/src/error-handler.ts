import { FirebaseError } from "firebase/app";

export interface AuthError {
  code: string;
  message: string;
  userMessage: string;
}

export class AuthenticationError extends Error {
  public readonly code: string;
  public readonly userMessage: string;

  constructor(code: string, message: string, userMessage: string) {
    super(message);
    this.code = code;
    this.userMessage = userMessage;
    this.name = "AuthenticationError";
  }
}

export function handleAuthError(error: unknown): AuthError {
  if (error instanceof FirebaseError) {
    const authError = handleFirebaseAuthError(error);
    return authError;
  }

  if (error instanceof AuthenticationError) {
    return {
      code: error.code,
      message: error.message,
      userMessage: error.userMessage,
    };
  }

  return {
    code: "unknown",
    message: (error as Error)?.message || "An unknown error occurred",
    userMessage: "Something went wrong. Please try again.",
  };
}

function handleFirebaseAuthError(error: FirebaseError): AuthError {
  const { code, message } = error;

  const errorMap: Record<string, string> = {
    "auth/user-not-found": "No account found with this email address.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Password is too weak. Please choose a stronger password.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/too-many-requests": "Too many failed attempts. Please try again later.",
    "auth/user-disabled": "This account has been disabled. Please contact support.",
    "auth/expired-action-code": "This link has expired. Please request a new one.",
    "auth/invalid-action-code": "This link is invalid. Please request a new one.",
    "auth/network-request-failed": "Network error. Please check your connection and try again.",
    "auth/requires-recent-login": "Please sign in again to complete this action.",
    "auth/credential-already-in-use": "This credential is already associated with another account.",
    "auth/custom-token-mismatch": "Authentication error. Please try signing in again.",
    "auth/invalid-custom-token": "Authentication error. Please try signing in again.",
    "auth/missing-email": "Email address is required.",
    "auth/invalid-credential": "Invalid credentials. Please check your information and try again.",
    "auth/operation-not-allowed": "This operation is not allowed. Please contact support.",
    "auth/unauthorized-domain": "This domain is not authorized. Please contact support.",
  };

  const userMessage = errorMap[code] || "Authentication failed. Please try again.";

  return {
    code,
    message,
    userMessage,
  };
}

export function createAuthError(code: string, userMessage: string): AuthenticationError {
  return new AuthenticationError(code, `Authentication error: ${code}`, userMessage);
}

export function isNetworkError(error: unknown): boolean {
  const err = error as { code?: string; message?: string };
  return err?.code === "auth/network-request-failed" || 
         (err?.message?.includes("network") ?? false) ||
         (err?.message?.includes("fetch") ?? false);
}

export function isTemporaryError(error: unknown): boolean {
  const temporaryCodes = [
    "auth/too-many-requests",
    "auth/network-request-failed",
    "auth/timeout",
  ];
  
  return temporaryCodes.includes((error as { code?: string })?.code || "");
}