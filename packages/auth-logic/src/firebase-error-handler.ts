import type { FirebaseError } from "firebase/app";
import type { AuthError } from "firebase/auth";

// User-friendly error messages for common Firebase Auth errors
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  // Authentication errors
  "auth/user-not-found":
    "No account found with this email address. Please check your email or sign up.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/user-disabled":
    "This account has been disabled. Please contact support.",
  "auth/too-many-requests": "Too many failed attempts. Please try again later.",
  "auth/operation-not-allowed":
    "This sign-in method is not enabled. Please contact support.",

  // Email verification and magic link errors
  "auth/invalid-action-code":
    "This link has expired or is invalid. Please request a new one.",
  "auth/expired-action-code":
    "This link has expired. Please request a new one.",
  "auth/invalid-continue-uri": "Invalid redirect URL. Please try again.",
  "auth/missing-action-code":
    "Missing verification code. Please check your email link.",

  // Email format and domain errors
  "auth/invalid-email-format": "Please enter a valid email address.",
  "auth/email-already-in-use":
    "An account with this email already exists. Please sign in instead.",
  "auth/weak-password": "Password should be at least 6 characters long.",

  // Network and server errors
  "auth/network-request-failed":
    "Network error. Please check your connection and try again.",
  "auth/internal-error": "Something went wrong. Please try again.",
  "auth/timeout": "Request timed out. Please try again.",

  // Custom HIVE-specific errors
  "auth/invalid-school-domain":
    "Please use your .edu email address to access HIVE.",
  "auth/school-not-supported":
    "Your school is not yet supported. Join our waitlist to be notified when it's available.",
  "auth/verification-required": "Please verify your email address to continue.",
  "auth/profile-incomplete": "Please complete your profile to access HIVE.",
};

// Firebase Functions error messages
export const FUNCTIONS_ERROR_MESSAGES: Record<string, string> = {
  "functions/cancelled": "Request was cancelled. Please try again.",
  "functions/invalid-argument":
    "Invalid information provided. Please check your input.",
  "functions/deadline-exceeded": "Request timed out. Please try again.",
  "functions/not-found": "Requested information not found.",
  "functions/already-exists": "This already exists.",
  "functions/permission-denied":
    "You don't have permission to perform this action.",
  "functions/resource-exhausted":
    "Service temporarily unavailable. Please try again later.",
  "functions/failed-precondition":
    "Unable to complete this action. Please check your information.",
  "functions/aborted": "Request was interrupted. Please try again.",
  "functions/out-of-range": "Invalid input value provided.",
  "functions/unimplemented": "This feature is not yet available.",
  "functions/internal": "Something went wrong on our end. Please try again.",
  "functions/unavailable":
    "Service temporarily unavailable. Please try again later.",
  "functions/data-loss": "Data error occurred. Please contact support.",
  "functions/unauthenticated": "Please sign in to continue.",
};

export interface UserFriendlyError {
  message: string;
  code: string;
  isRetryable: boolean;
  severity: "error" | "warning" | "info";
  action?: "retry" | "contact-support" | "check-email" | "sign-up" | "sign-in";
}

export class FirebaseErrorHandler {
  static isFirebaseError(error: unknown): error is FirebaseError {
    return (
      error instanceof Error &&
      "code" in error &&
      typeof (error as { code?: unknown }).code === "string"
    );
  }

  static isAuthError(error: unknown): error is AuthError {
    return this.isFirebaseError(error) && error.code.startsWith("auth/");
  }

  static isFunctionsError(error: unknown): error is FirebaseError {
    return this.isFirebaseError(error) && error.code.startsWith("functions/");
  }

  static getRetryableErrors(): string[] {
    return [
      "auth/network-request-failed",
      "auth/timeout",
      "auth/too-many-requests",
      "functions/deadline-exceeded",
      "functions/resource-exhausted",
      "functions/unavailable",
      "functions/aborted",
    ];
  }

  static handleAuthError(error: unknown): UserFriendlyError {
    if (!this.isAuthError(error)) {
      return {
        message: "An unexpected error occurred. Please try again.",
        code: "unknown",
        isRetryable: true,
        severity: "error",
        action: "retry",
      };
    }

    const message =
      AUTH_ERROR_MESSAGES[error.code] ||
      error.message ||
      "An authentication error occurred.";
    const isRetryable = this.getRetryableErrors().includes(error.code);

    let action: UserFriendlyError["action"] = "retry";
    let severity: UserFriendlyError["severity"] = "error";

    // Determine appropriate action based on error code
    switch (error.code) {
      case "auth/user-not-found":
        action = "sign-up";
        break;
      case "auth/email-already-in-use":
        action = "sign-in";
        break;
      case "auth/invalid-action-code":
      case "auth/expired-action-code":
        action = "check-email";
        break;
      case "auth/user-disabled":
        action = "contact-support";
        severity = "warning";
        break;
      case "auth/too-many-requests":
        severity = "warning";
        break;
    }

    return {
      message,
      code: error.code,
      isRetryable,
      severity,
      action,
    };
  }

  static handleFunctionsError(error: unknown): UserFriendlyError {
    if (!this.isFunctionsError(error)) {
      return {
        message: "An unexpected error occurred. Please try again.",
        code: "unknown",
        isRetryable: true,
        severity: "error",
        action: "retry",
      };
    }

    const message =
      FUNCTIONS_ERROR_MESSAGES[error.code] ||
      error.message ||
      "A server error occurred.";
    const isRetryable = this.getRetryableErrors().includes(error.code);

    let action: UserFriendlyError["action"] = "retry";
    let severity: UserFriendlyError["severity"] = "error";

    switch (error.code) {
      case "functions/unauthenticated":
        action = "sign-in";
        break;
      case "functions/permission-denied":
        action = "contact-support";
        severity = "warning";
        break;
      case "functions/data-loss":
        action = "contact-support";
        break;
    }

    return {
      message,
      code: error.code,
      isRetryable,
      severity,
      action,
    };
  }

  static handleError(error: unknown): UserFriendlyError {
    if (this.isAuthError(error)) {
      return this.handleAuthError(error);
    }

    if (this.isFunctionsError(error)) {
      return this.handleFunctionsError(error);
    }

    // Handle generic errors
    if (error instanceof Error) {
      return {
        message: error.message || "An unexpected error occurred.",
        code: "generic-error",
        isRetryable: true,
        severity: "error",
        action: "retry",
      };
    }

    return {
      message: "An unknown error occurred. Please try again.",
      code: "unknown",
      isRetryable: true,
      severity: "error",
      action: "retry",
    };
  }

  static shouldShowRetryButton(error: UserFriendlyError): boolean {
    return error.isRetryable && error.action === "retry";
  }

  static shouldContactSupport(error: UserFriendlyError): boolean {
    return error.action === "contact-support";
  }

  static getActionButtonText(error: UserFriendlyError): string {
    switch (error.action) {
      case "retry":
        return "Try Again";
      case "sign-in":
        return "Sign In";
      case "sign-up":
        return "Sign Up";
      case "check-email":
        return "Check Email";
      case "contact-support":
        return "Contact Support";
      default:
        return "Continue";
    }
  }
}

// React hook for Firebase error handling
export function useFirebaseErrorHandler() {
  const handleError = (error: unknown): UserFriendlyError => {
    return FirebaseErrorHandler.handleError(error);
  };

  const getErrorDisplay = (error: unknown) => {
    const userError = handleError(error);

    return {
      ...userError,
      actionButtonText: FirebaseErrorHandler.getActionButtonText(userError),
      shouldShowRetry: FirebaseErrorHandler.shouldShowRetryButton(userError),
      shouldContactSupport:
        FirebaseErrorHandler.shouldContactSupport(userError),
    };
  };

  return {
    handleError,
    getErrorDisplay,
  };
}

export default FirebaseErrorHandler;
