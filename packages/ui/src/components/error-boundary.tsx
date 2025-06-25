"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { logger } from "@hive/core";
// Temporary mock for Storybook compatibility
interface UserFriendlyError {
  code: string;
  message: string;
  severity: "error" | "warning" | "info";
  action: "retry" | "contact-support" | "sign-in" | "sign-up" | "check-email";
  isRetryable: boolean;
}

// Mock FirebaseErrorHandler for Storybook
const FirebaseErrorHandler = {
  handleError: (error: Error): UserFriendlyError => ({
    code: "unknown",
    message: error.message || "An unexpected error occurred",
    severity: "error" as const,
    action: "retry" as const,
    isRetryable: true,
  }),
  getActionButtonText: (error: UserFriendlyError): string => {
    switch (error.action) {
      case "retry":
        return "Try Again";
      case "contact-support":
        return "Contact Support";
      case "sign-in":
        return "Sign In";
      case "sign-up":
        return "Sign Up";
      case "check-email":
        return "Check Email";
      default:
        return "Continue";
    }
  },
};

interface Props {
  children: ReactNode;
  fallback?: (error: UserFriendlyError, retry: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: "",
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error("Firebase Error Boundary caught an error:", error, errorInfo);

    // Call the optional onError prop
    this.props.onError?.(error, errorInfo);

    // In a real app, you might want to send this to an error reporting service
    // logErrorToService(error, errorInfo, this.state.errorId);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorId: "",
    });
  };

  handleContactSupport = () => {
    logger.debug("Contact support clicked", {
      error: this.state.error,
      componentStack: this.state.componentStack,
    });
    // ... existing code ...
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const userFriendlyError = FirebaseErrorHandler.handleError(
        this.state.error
      );

      if (this.props.fallback) {
        return this.props.fallback(userFriendlyError, this.handleRetry);
      }
    }

    return this.props.children;
  }
}

// Hook for using error boundary in functional components
export function useFirebaseErrorBoundary() {
  return {
    ErrorBoundary: FirebaseErrorBoundary,
    throwError: (error: Error) => {
      throw error;
    },
  };
}

export default FirebaseErrorBoundary;
