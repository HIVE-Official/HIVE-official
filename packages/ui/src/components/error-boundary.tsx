"use client";

import React, { Component, ReactNode, ErrorInfo } from "react";
import { FirebaseErrorHandler, UserFriendlyError } from "@hive/auth-logic";

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

export class FirebaseErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: "",
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to Firebase Analytics or your error reporting service
    console.error("Firebase Error Boundary caught an error:", error, errorInfo);

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

  render() {
    if (this.state.hasError && this.state.error) {
      const userFriendlyError = FirebaseErrorHandler.handleError(
        this.state.error
      );

      if (this.props.fallback) {
        return this.props.fallback(userFriendlyError, this.handleRetry);
      }

      return (
        <DefaultErrorFallback
          error={userFriendlyError}
          onRetry={this.handleRetry}
          errorId={this.state.errorId}
        />
      );
    }

    return this.props.children;
  }
}

interface DefaultErrorFallbackProps {
  error: UserFriendlyError;
  onRetry: () => void;
  errorId: string;
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
        return "❌";
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
        return "text-gray-600 border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="min-h-[200px] flex items-center justify-center p-4">
      <div
        className={`
        max-w-md w-full rounded-lg border-2 p-6 text-center space-y-4
        ${getSeverityColor(error.severity)}
      `}
      >
        <div className="text-4xl mb-2">
          {getIconForSeverity(error.severity)}
        </div>

        <h3 className="text-lg font-semibold">Something went wrong</h3>

        <p className="text-sm leading-relaxed">{error.message}</p>

        <div className="space-y-2 pt-2">
          {error.action === "retry" && error.isRetryable && (
            <button
              onClick={onRetry}
              className="w-full px-4 py-2 bg-white border border-current rounded-md hover:bg-opacity-90 transition-colors font-medium"
            >
              {FirebaseErrorHandler.getActionButtonText(error)}
            </button>
          )}

          {error.action === "contact-support" && (
            <button
              onClick={() => {
                // In a real app, this would open a support form or mailto link
                console.log("Contact support clicked", {
                  errorId,
                  errorCode: error.code,
                });
              }}
              className="w-full px-4 py-2 bg-white border border-current rounded-md hover:bg-opacity-90 transition-colors font-medium"
            >
              {FirebaseErrorHandler.getActionButtonText(error)}
            </button>
          )}

          {error.action === "sign-in" && (
            <button
              onClick={() => {
                // In a real app, this would redirect to sign-in
                window.location.href = "/auth/login";
              }}
              className="w-full px-4 py-2 bg-white border border-current rounded-md hover:bg-opacity-90 transition-colors font-medium"
            >
              {FirebaseErrorHandler.getActionButtonText(error)}
            </button>
          )}

          {error.action === "sign-up" && (
            <button
              onClick={() => {
                // In a real app, this would redirect to sign-up
                window.location.href = "/auth/signup";
              }}
              className="w-full px-4 py-2 bg-white border border-current rounded-md hover:bg-opacity-90 transition-colors font-medium"
            >
              {FirebaseErrorHandler.getActionButtonText(error)}
            </button>
          )}

          {error.action === "check-email" && (
            <div className="text-xs space-y-2">
              <p>Please check your email and click the verification link.</p>
              <button
                onClick={onRetry}
                className="w-full px-4 py-2 bg-white border border-current rounded-md hover:bg-opacity-90 transition-colors font-medium"
              >
                I've verified my email
              </button>
            </div>
          )}
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="text-xs text-left">
            <summary className="cursor-pointer font-medium">Debug Info</summary>
            <div className="mt-2 p-2 bg-white rounded border font-mono">
              <div>Error ID: {errorId}</div>
              <div>Code: {error.code}</div>
              <div>Retryable: {error.isRetryable ? "Yes" : "No"}</div>
              <div>Action: {error.action || "None"}</div>
            </div>
          </details>
        )}
      </div>
    </div>
  );
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
