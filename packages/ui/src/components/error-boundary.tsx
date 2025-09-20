"use client";

import React, { Component, type ReactNode, type ErrorInfo } from "react";

// Self-contained error types for Storybook compatibility
interface UserFriendlyError {
  message: string;
  code: string;
  severity: "error" | "warning" | "info";
  isRetryable: boolean;
  action?: "retry" | "contact-support" | "sign-in" | "sign-up" | "check-email"
}

// Simplified error handler for UI package
class SimpleErrorHandler {
  static handleError(error: Error): UserFriendlyError {
    // Basic error handling for UI components
    return {
      message: error.message || "An unexpected error occurred",
      code: error.name || "UNKNOWN_ERROR",
      severity: "error",
      isRetryable: true,
      action: "retry"
    }
  }

  static getActionButtonText(error: UserFriendlyError): string {
    switch (error.action) {
      case "retry": return "Try Again";
      case "contact-support": return "Contact Support";
      case "sign-in": return "Sign In";
      case "sign-up": return "Sign Up";
      case "check-email": return "Check Email";
      default: return "Continue"
    }
  }
}

interface Props {
  children: ReactNode;
  fallback?: (error: UserFriendlyError, retry: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string
}

export class FirebaseErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: "",
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to Firebase Analytics or your error reporting service
    console.error("Firebase Error Boundary caught an error:", error, errorInfo);

    // Call the optional onError prop
    this.props.onError?.(error, errorInfo);

    // In a real app, you might want to send this to an error reporting service
    // logErrorToService(error, errorInfo, this.state.errorId)
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorId: "",
    })
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const userFriendlyError = SimpleErrorHandler.handleError(
        this.state.error
      );

      if (this.props.fallback) {
        return this.props.fallback(userFriendlyError, this.handleRetry)
      }

      return (
        <DefaultErrorFallback
          error={userFriendlyError}
          onRetry={this.handleRetry}
          errorId={this.state.errorId}
        />
      )
    }

    return this.props.children
  }
}

interface DefaultErrorFallbackProps {
  error: UserFriendlyError;
  onRetry: () => void;
  errorId: string
}

function DefaultErrorFallback({
  error,
  onRetry,
  errorId,
}: DefaultErrorFallbackProps) {
  const getIconForSeverity = (severity: UserFriendlyError["severity"]) => {
    switch (severity) {
      case "error":
        return "⚠️";
      case "warning":
        return "⚡";
      case "info":
        return "ℹ️";
      default:
        return "❌"
    }
  };

  const getSeverityColor = (severity: UserFriendlyError["severity"]) => {
    switch (severity) {
      case "error":
        return "text-red-600 border-red-200 bg-red-50";
      case "warning":
        return "text-amber-600 border-amber-200 bg-amber-50";
      case "info":
        return "text-blue-600 border-blue-200 bg-blue-50";
      default:
        return "text-gray-600 border-gray-200 bg-gray-50"
    }
  };

  return (
    <div className="min-h-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--hive-background-primary)]/20 backdrop-blur-xl border border-red-500/20 rounded-xl p-6 text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-red-500/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-red-500/30 mb-4">
          <span className="text-2xl">{getIconForSeverity(error.severity)}</span>
        </div>

        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Something went wrong</h3>

        <p className="text-sm leading-relaxed text-[var(--hive-text-primary)]/70">{error.message}</p>

        <div className="space-y-2 pt-2">
          {error.action === "retry" && error.isRetryable && (
            <button
              onClick={onRetry}
              className="w-full px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-[var(--hive-text-primary)]"
            >
              {SimpleErrorHandler.getActionButtonText(error)}
            </button>
          )}

          {error.action === "contact-support" && (
            <button
              onClick={() => {
                console.log("Contact support clicked", {
                  errorId,
                  errorCode: error.code,
                })}
          })}
              className="w-full px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-[var(--hive-text-primary)]"
            >
              {SimpleErrorHandler.getActionButtonText(error)}
            </button>
          )}

          {error.action === "sign-in" && (
            <button
              onClick={() => {
                window.location.href = "/schools"
          }}
              className="w-full px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-[var(--hive-text-primary)]"
            >
              {SimpleErrorHandler.getActionButtonText(error)}
            </button>
          )}

          {error.action === "sign-up" && (
            <button
              onClick={() => {
                window.location.href = "/schools"
          }}
              className="w-full px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-[var(--hive-text-primary)]"
            >
              {SimpleErrorHandler.getActionButtonText(error)}
            </button>
          )}

          {error.action === "check-email" && (
            <div className="text-xs space-y-2">
              <p className="text-[var(--hive-text-primary)]/60">Please check your email and click the verification link.</p>
              <button
                onClick={onRetry}
                className="w-full px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-[var(--hive-text-primary)]"
              >
                I've verified my email
              </button>
            </div>
          )}
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="text-xs text-left">
            <summary className="cursor-pointer font-medium text-[var(--hive-text-primary)]/80">Debug Info</summary>
            <div className="mt-2 p-2 bg-[var(--hive-background-primary)]/40 rounded border border-white/10 font-mono text-[var(--hive-text-primary)]/60">
              <div>Error ID: {errorId}</div>
              <div>Code: {error.code}</div>
              <div>Retryable: {error.isRetryable ? "Yes" : "No"}</div>
              <div>Action: {error.action || "None"}</div>
            </div>
          </details>
        )}
      </div>
    </div>
  )
}

// Hook for using error boundary in functional components
export function useFirebaseErrorBoundary() {
  return {
    ErrorBoundary: FirebaseErrorBoundary,
    throwError: (error: Error) => {
      throw error
    },
  }
}

export default FirebaseErrorBoundary;
